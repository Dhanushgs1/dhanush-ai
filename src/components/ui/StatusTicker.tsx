"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A quiet system-status readout that cycles through real component states
 * ("RAG ACTIVE", "MCP CONNECTED"...). Pauses when off screen, and sits still
 * for reduced-motion visitors.
 */
export default function StatusTicker({
  messages,
  interval = 3200,
  startDelay = 0,
  className,
}: {
  messages: readonly string[];
  interval?: number;
  startDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (started) return;
    const timer = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(timer);
  }, [started, startDelay]);

  useEffect(() => {
    if (!inView || reduced || !started) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % messages.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [inView, reduced, started, interval, messages.length]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] text-faint",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
      </span>
      <span className="relative inline-grid overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={messages[index]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="whitespace-nowrap"
          >
            {messages[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
