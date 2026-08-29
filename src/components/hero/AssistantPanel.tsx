"use client";

import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { assistantSuggestions, profile } from "@/data/site";
import { cn } from "@/lib/cn";
import AssistantRobot from "./AssistantRobot";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  /** true when the answer came from the local grounded fallback, not the model */
  offline?: boolean;
};

const GREETING = `Hi! I'm ${profile.name}'s AI Assistant. How can I help you today?`;

export default function AssistantPanel({
  onClose,
  autoFocus = false,
}: {
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    const history = messages
      .filter((message) => message.id !== 0)
      .map((message) => ({ role: message.role, content: message.text }));

    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", text: trimmed },
    ]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, history }),
      });
      const data: { answer?: string; source?: string; message?: string } =
        await response.json();

      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          text:
            data.answer ??
            data.message ??
            "I don't have that information in Dhanush's portfolio.",
          offline: data.source === "local",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          text: "I couldn't reach the assistant service just now. Please try again.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <section
      aria-label="AI assistant"
      className="chat-surface panel-blur relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      {/* header */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
        <AssistantRobot thinking={busy} className="h-11 w-11 shrink-0" />
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.18em] text-text">
            AI ASSISTANT
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-emerald">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            {busy ? "THINKING…" : "ONLINE"}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-violet-soft" />
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close assistant"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-faint transition hover:bg-panel hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* transcript */}
      <div
        ref={listRef}
        className="min-h-[13rem] flex-1 space-y-3 overflow-y-auto px-4 py-4"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[92%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed",
              message.role === "assistant"
                ? "border border-line bg-panel text-muted"
                : "ml-auto border border-violet/30 bg-violet/12 text-text",
            )}
          >
            {message.text}
            {message.offline ? (
              <span className="mt-1.5 block font-mono text-[9.5px] tracking-[0.12em] text-faint">
                ANSWERED FROM PORTFOLIO DATA
              </span>
            ) : null}
          </div>
        ))}
        {busy ? (
          <div className="flex items-center gap-1.5 px-1" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-violet-soft animate-blink"
                style={{ animationDelay: `${dot * 0.18}s` }}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* suggestions */}
      <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
        {assistantSuggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            onClick={() => void ask(suggestion.question)}
            disabled={busy}
            className="rounded-lg border border-line bg-panel px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted transition hover:border-violet/40 hover:text-text disabled:opacity-50"
          >
            {suggestion.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* input */}
      <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
        <label htmlFor="assistant-input" className="sr-only">
          Ask about {profile.name}
        </label>
        <input
          id="assistant-input"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`Ask me about ${profile.name.split(" ")[0]}...`}
          maxLength={500}
          className="min-w-0 flex-1 rounded-xl border border-line bg-panel px-3 py-2.5 text-[13px] text-text placeholder:text-faint focus:border-violet/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send question"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet to-blue text-white transition hover:brightness-110 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
