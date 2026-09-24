"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/*
 * The cinematic hero intro should play once per tab, not every time the
 * visitor comes back to the homepage from a case study. A module-level flag
 * survives client-side navigation but resets on a full reload.
 */
let introPlayed = false;

/** 1 on the first homepage view of this tab, a compressed factor afterwards. */
export function useIntroTiming() {
  const [scale] = useState(() => (introPlayed ? 0.18 : 1));
  useEffect(() => {
    introPlayed = true;
  }, []);
  return scale;
}

/** True only for a mouse-like pointer with motion allowed. */
function finePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches
  );
}

/**
 * Subtle 3D tilt toward the pointer. Writes --rx/--ry and --px/--py (pointer
 * position in %, for light reflections) straight onto the element — no React
 * state, so moving the mouse never re-renders the card.
 */
export function useTilt<T extends HTMLElement>(maxDegrees = 4) {
  const ref = useRef<T>(null);

  function onPointerMove(event: ReactPointerEvent<T>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || !finePointer()) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.dataset.tilting = "true";
    el.style.setProperty("--ry", `${((px - 0.5) * 2 * maxDegrees).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - py) * 2 * maxDegrees).toFixed(2)}deg`);
    el.style.setProperty("--px", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--py", `${(py * 100).toFixed(1)}%`);
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.dataset.tilting = "false";
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return { ref, onPointerMove, onPointerLeave };
}

/** Magnetic hover: the element leans a few px toward the pointer. */
export function useMagnetic<T extends HTMLElement>(strength = 0.22, max = 6) {
  const ref = useRef<T>(null);

  function onPointerMove(event: ReactPointerEvent<T>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || !finePointer()) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number) => Math.max(-max, Math.min(max, v * strength));
    el.style.translate = `${clamp(dx).toFixed(1)}px ${clamp(dy).toFixed(1)}px`;
  }

  function onPointerLeave() {
    if (ref.current) ref.current.style.translate = "";
  }

  return { ref, onPointerMove, onPointerLeave };
}

/** Spawns a one-shot ripple at the press point inside `event.currentTarget`. */
export function spawnRipple(event: ReactPointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = event.currentTarget;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const ripple = document.createElement("span");
  ripple.className = "fx-ripple";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  host.appendChild(ripple);
}
