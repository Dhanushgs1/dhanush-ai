"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Counts the leading number of `value` ("5+", "10 months", "30") up from 0
 * once it scrolls into view, then pulses. The real value is server-rendered,
 * so crawlers and no-JS visitors see it; the client swaps in 0 before paint.
 * Writes textContent directly — one React render, not one per frame.
 */
export default function CountUp({
  value,
  delay = 0,
  className,
}: {
  value: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  useLayoutEffect(() => {
    if (target === null || reduced || !ref.current) return;
    ref.current.textContent = `0${suffix}`;
  }, [target, suffix, reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || target === null || reduced || !el) return;
    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = `${Math.round(latest)}${suffix}`;
      },
      onComplete: () => el.classList.add("stat-done"),
    });
    return () => controls.stop();
  }, [inView, target, suffix, delay, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
