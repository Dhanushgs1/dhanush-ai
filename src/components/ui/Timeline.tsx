"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

/**
 * Vertical timeline whose rail fills from 0% to 100% as it scrolls through
 * the viewport, like a system coming online stage by stage.
 */
export function TimelineTrack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <ol ref={ref} className={cn("relative border-l border-line pl-6", className)}>
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scaleY }}
        className="pointer-events-none absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-violet via-blue to-cyan shadow-[0_0_8px_color-mix(in_oklab,var(--color-violet)_70%,transparent)]"
      />
      {children}
    </ol>
  );
}

/**
 * A timeline entry: its node starts dim and illuminates (with a single pulse)
 * once the entry reaches the reading zone; the content slides in beside it.
 */
export function TimelineItem({
  children,
  current = false,
  nodeClassName,
  className,
  delay = 0,
}: {
  children: ReactNode;
  current?: boolean;
  nodeClassName?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const lit = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: reduced ? 0.25 : 0.6, delay: reduced ? 0 : delay, ease: EASE_OUT }}
      className={cn("relative", className)}
    >
      <span
        className={cn(
          "absolute -left-[30px] flex h-3 w-3 items-center justify-center",
          nodeClassName,
        )}
      >
        <span
          data-lit={String(lit)}
          className="tl-node h-3 w-3 rounded-full border border-violet/50 bg-bg"
        />
        <span
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full transition-opacity duration-500",
            current || lit ? "bg-gradient-to-r from-violet to-cyan" : "bg-faint",
            lit ? "opacity-100" : "opacity-50",
          )}
        />
      </span>
      {children}
    </motion.li>
  );
}
