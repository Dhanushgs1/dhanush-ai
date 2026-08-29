import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { buildKnowledgeBase, buildSystemPrompt } from "@/lib/assistant/knowledge";
import { answerLocally } from "@/lib/assistant/localAnswer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Portfolio assistant.
 *
 * The Claude call happens here, server-side — ANTHROPIC_API_KEY never reaches
 * the browser. With no key configured the route falls back to deterministic
 * retrieval over the same portfolio data, so the widget still answers honestly
 * instead of shipping hardcoded "AI" replies.
 */

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-5";
const MAX_QUESTION = 500;
const MAX_HISTORY = 8;

type Turn = { role: "user" | "assistant"; content: string };

// Best-effort in-process throttle. Serverless instances are short-lived, so
// this trims obvious abuse rather than acting as a hard guarantee.
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 12;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 500) {
      for (const [id, value] of hits) if (now > value.resetAt) hits.delete(id);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > LIMIT;
}

function parseHistory(value: unknown): Turn[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is Turn =>
        typeof item === "object" &&
        item !== null &&
        (("role" in item && (item as Turn).role === "user") ||
          (item as Turn).role === "assistant") &&
        typeof (item as Turn).content === "string",
    )
    .slice(-MAX_HISTORY)
    .map((turn) => ({
      role: turn.role,
      content: turn.content.slice(0, MAX_QUESTION),
    }));
}

export async function POST(request: Request) {
  let payload: { question?: unknown; history?: unknown };

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const question =
    typeof payload.question === "string"
      ? payload.question.trim().slice(0, MAX_QUESTION)
      : "";

  if (!question) {
    return NextResponse.json({ error: "Ask a question." }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        answer:
          "That's a lot of questions at once — give it a minute and ask again.",
        source: "local",
      },
      { status: 429 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ answer: answerLocally(question), source: "local" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const history = parseHistory(payload.history);

    const response = await client.messages.create({
      model: MODEL,
      // Answers are intentionally 2-4 sentences; a small cap keeps the widget
      // snappy and cheap. The system prompt asks for that length too.
      max_tokens: 1024,
      // Cache the (large, stable) portfolio system prompt across visitors.
      cache_control: { type: "ephemeral" },
      system: buildSystemPrompt(buildKnowledgeBase()),
      thinking: { type: "adaptive" },
      output_config: { effort: "low" },
      messages: [...history, { role: "user", content: question }],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({
        answer: answerLocally(question),
        source: "local",
      });
    }

    const answer = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!answer) {
      return NextResponse.json({ answer: answerLocally(question), source: "local" });
    }

    return NextResponse.json({ answer, source: "model" });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { answer: answerLocally(question), source: "local" },
        { status: 200 },
      );
    }

    console.error("Assistant request failed:", error);
    return NextResponse.json({ answer: answerLocally(question), source: "local" });
  }
}
