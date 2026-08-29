"use client";

import {
  Download,
  Mail,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { useState } from "react";
import type { FormEvent } from "react";
import { profile, resumePath } from "@/data/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-panel px-4 py-3 text-[14px] text-text placeholder:text-faint transition focus:border-violet/50 focus:outline-none";

export default function Contact({
  resumeAvailable,
}: {
  resumeAvailable: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailtoHref = `mailto:${profile.links.email}?subject=${encodeURIComponent(
    `Portfolio enquiry from ${form.name || "a visitor"}`,
  )}&body=${encodeURIComponent(form.message)}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { ok?: boolean; delivered?: boolean; message?: string } =
        await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try email.");
        return;
      }

      if (data.delivered) {
        setStatus("sent");
        setMessage(data.message ?? "Message sent. I'll get back to you.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("fallback");
        setMessage(
          data.message ??
            "The form inbox isn't connected yet — send it straight to my email instead.",
        );
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please use the email link instead.");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-[1.9rem] font-semibold leading-[1.1] sm:text-4xl md:text-[2.6rem]"
          >
            LET&apos;S BUILD{" "}
            <span className="text-gradient">THE FUTURE</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            I&apos;m always open to discussing AI opportunities, interesting
            projects, and intelligent systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-[13.5px]"
            >
              <Github className="h-4 w-4" />
              GITHUB
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-[13.5px]"
            >
              <Linkedin className="h-4 w-4" />
              LINKEDIN
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              className="panel panel-hover inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-[13.5px]"
            >
              <Mail className="h-4 w-4" />
              EMAIL
            </a>
            {resumeAvailable ? (
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-violet/35 bg-violet/10 px-4 py-3 text-[13.5px] transition hover:border-violet/60 hover:bg-violet/20"
              >
                <Download className="h-4 w-4" />
                RESUME
              </a>
            ) : null}
          </div>

          <p className="mt-8 font-mono text-[11.5px] tracking-[0.1em] text-faint">
            {profile.role} · {profile.company} · {profile.location}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="panel panel-blur rounded-2xl p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="eyebrow mb-2 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow mb-2 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="eyebrow mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={4000}
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              placeholder="What are you trying to build?"
              className={cn(inputClass, "resize-y")}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-blue px-5 py-3 text-[14px] font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "SENDING…" : "GET IN TOUCH"}
          </button>

          <div aria-live="polite" className="min-h-[1.5rem]">
            {message ? (
              <p
                className={cn(
                  "mt-4 text-[13px] leading-relaxed",
                  status === "error"
                    ? "text-amber"
                    : status === "sent"
                      ? "text-emerald"
                      : "text-muted",
                )}
              >
                {message}{" "}
                {status === "fallback" || status === "error" ? (
                  <a
                    href={mailtoHref}
                    className="underline decoration-violet/60 underline-offset-4 hover:text-text"
                  >
                    Open email
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
