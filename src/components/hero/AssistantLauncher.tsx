"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AssistantPanel from "./AssistantPanel";
import AssistantRobot from "./AssistantRobot";

const PROMPT = "ASK ME ANYTHING";

/** Types `text` out once after `delay` ms; full text when motion is reduced. */
function useTypewriter(text: string, delay: number, enabled: boolean) {
  // The full string is server-rendered; the client restarts it from empty
  // before paint (the launcher is still invisible at that point).
  const [count, setCount] = useState(text.length);

  useLayoutEffect(() => {
    if (enabled) setCount(0);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let timer = window.setTimeout(function step() {
      setCount((current) => {
        if (current < text.length) timer = window.setTimeout(step, 65);
        return Math.min(current + 1, text.length);
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [enabled, delay, text.length]);

  return text.slice(0, count);
}

/**
 * The assistant is not part of the page content — it lives behind a floating
 * launcher and opens only when a visitor asks for it.
 */
export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const typed = useTypewriter(PROMPT, 1300, !reduced);

  // Escape closes, and focus returns to the launcher.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="AI assistant"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={
              reduced
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 420, damping: 32, mass: 0.8 }
            }
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[7.5rem] right-4 z-50 flex h-[min(70vh,32rem)] w-[min(24rem,calc(100vw-2rem))] flex-col lg:bottom-24 lg:right-6"
          >
            <AssistantPanel autoFocus onClose={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={
          reduced
            ? undefined
            : { scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 22 } }
        }
        whileTap={reduced ? undefined : { scale: 0.97, transition: { duration: 0.1 } }}
        transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.6 }}
        className="chat-surface panel-blur group fixed bottom-[5.25rem] right-4 z-50 flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-3.5 shadow-[0_18px_50px_-24px_var(--color-violet)] transition-[border-color,box-shadow] duration-300 hover:border-violet/45 hover:shadow-[0_18px_60px_-16px_var(--color-violet)] lg:bottom-6 lg:right-6"
      >
        <span className="relative">
          {/* pulse ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-violet/25 blur-md transition duration-300 group-hover:scale-125 group-hover:bg-violet/45"
          />
          {/* the robot perks up on hover */}
          <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-6">
            <AssistantRobot className="h-10 w-10" />
          </span>
        </span>
        <span className="text-left leading-tight">
          <span className="block font-mono text-[10.5px] tracking-[0.16em] text-text">
            AI ASSISTANT
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.14em] text-emerald">
            <span className="relative flex h-1.5 w-1.5">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
            </span>
            {open ? (
              "OPEN"
            ) : (
              <span className="relative whitespace-pre">
                {/* reserves the final width so the widget never reflows */}
                <span className="invisible">
                  {PROMPT}
                  <span className="ml-0.5 inline-block w-[5px]" />
                </span>
                <span className="absolute inset-0 flex items-center">
                  {typed}
                  <span aria-hidden="true" className="typing-caret ml-0.5 inline-block h-[9px] w-[5px] bg-emerald/80" />
                </span>
              </span>
            )}
          </span>
        </span>
      </motion.button>
    </>
  );
}
