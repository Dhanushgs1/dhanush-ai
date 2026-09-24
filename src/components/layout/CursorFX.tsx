"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, [data-cursor]";

/**
 * Desktop-only pointer layer. One rAF-throttled listener publishes the
 * pointer as CSS variables (--mx/--my in px, --mxn/--myn in -1..1) that the
 * background light and parallax layers read, and drives a glowing dot with a
 * trailing ring. Touch devices and reduced-motion users get none of it.
 */
export default function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement.style;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let frame = 0;
    let visible = false;

    const tick = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      root.setProperty("--mx", `${x}px`);
      root.setProperty("--my", `${y}px`);
      root.setProperty("--mxn", ((x / window.innerWidth) * 2 - 1).toFixed(3));
      root.setProperty("--myn", ((y / window.innerHeight) * 2 - 1).toFixed(3));

      // Keep easing the ring until it settles, then stop scheduling frames.
      frame =
        Math.abs(x - ringX) + Math.abs(y - ringY) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        dotRef.current?.style.setProperty("opacity", "1");
        ringRef.current?.style.setProperty("opacity", "1");
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const hovering = Boolean(target?.closest?.(INTERACTIVE));
      ringRef.current?.setAttribute("data-hover", String(hovering));
    };

    const onLeave = () => {
      visible = false;
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      for (const name of ["--mx", "--my", "--mxn", "--myn"]) root.removeProperty(name);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" style={{ opacity: 0 }} />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}
