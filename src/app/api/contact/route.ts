import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, message: "Name, email and message are all required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "That email address doesn't look valid." },
      { status: 400 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  // No webhook configured: accept the submission but tell the visitor
  // honestly that it was not delivered, and offer the email route.
  if (!webhook) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      message:
        "The form inbox isn't connected yet, so this wasn't delivered — send it straight to my email instead.",
    });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "portfolio-contact-form",
        name,
        email,
        message,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);

    return NextResponse.json({
      ok: true,
      delivered: true,
      message: "Message sent. I'll get back to you.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message: "Couldn't deliver the message right now. Please use email.",
      },
      { status: 502 },
    );
  }
}
