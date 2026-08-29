"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AssistantPanel from "./AssistantPanel";
import AssistantRobot from "./AssistantRobot";

/**
 * The assistant is not part of the page content — it lives behind a floating
 * launcher and opens only when a visitor asks for it.
 */
export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
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
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="chat-surface panel-blur group fixed bottom-[5.25rem] right-4 z-50 flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-3.5 shadow-[0_18px_50px_-24px_var(--color-violet)] transition hover:border-violet/45 lg:bottom-6 lg:right-6"
      >
        <span className="relative">
          {/* pulse ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-violet/25 blur-md transition group-hover:bg-violet/40"
          />
          <AssistantRobot className="relative h-10 w-10" />
        </span>
        <span className="text-left leading-tight">
          <span className="block font-mono text-[10.5px] tracking-[0.16em] text-text">
            AI ASSISTANT
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.14em] text-emerald">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            {open ? "OPEN" : "ASK ME ANYTHING"}
          </span>
        </span>
      </motion.button>
    </>
  );
}
