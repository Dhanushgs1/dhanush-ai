"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { profile } from "@/data/site";
import StatusTicker from "@/components/ui/StatusTicker";
import { EASE_OUT } from "@/lib/motion";
import TechAvatar from "./TechAvatar";

/** Capability labels, pinned at the four compass points of the core. */
const LABELS = [
  { tag: "LLM", angle: -90, delay: "0s" },
  { tag: "RAG", angle: 0, delay: "-1.4s" },
  { tag: "AGENTS", angle: 90, delay: "-2.8s" },
  { tag: "MCP", angle: 180, delay: "-4.1s" },
];

/** Tiny motes orbiting at different radii and speeds (desktop only). */
const MOTES = [
  { inset: "2%", duration: "22s", reverse: false, size: 3, start: 20 },
  { inset: "9%", duration: "31s", reverse: true, size: 2, start: 140 },
  { inset: "4%", duration: "40s", reverse: false, size: 2, start: 250 },
  { inset: "11%", duration: "18s", reverse: true, size: 2.5, start: 300 },
  { inset: "7%", duration: "27s", reverse: false, size: 2, start: 80 },
];

const STATUS = [
  "LLM ONLINE",
  "RAG ACTIVE",
  "AGENT READY",
  "VECTOR SEARCH",
  "MCP CONNECTED",
] as const;

function polar(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return { x: 50 + Math.cos(radians) * radius, y: 50 + Math.sin(radians) * radius };
}

export default function PortraitHUD({
  portraitSrc,
  activateAt = 0,
}: {
  /** Resolved public path of the photo, or null when none has been added. */
  portraitSrc: string | null;
  /** Seconds after mount at which the orbital system powers on. */
  activateAt?: number;
}) {
  const reduced = useReducedMotion();
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /** Labels lean toward — and light up for — a nearby pointer. */
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    for (const label of labelRefs.current) {
      if (!label) continue;
      const rect = label.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const near = distance < 110;
      label.dataset.near = String(near);
      const pull = near ? (1 - distance / 110) * 6 : 0;
      label.style.translate = near
        ? `${((dx / distance) * pull).toFixed(1)}px ${((dy / distance) * pull).toFixed(1)}px`
        : "";
    }
  }

  function onPointerLeave() {
    for (const label of labelRefs.current) {
      if (!label) continue;
      label.dataset.near = "false";
      label.style.translate = "";
    }
  }

  const power = (step: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.86 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: reduced ? 0.3 : 1.1,
      delay: reduced ? 0 : activateAt + step * 0.14,
      ease: EASE_OUT,
    },
  });

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0.3 : 0.9, delay: reduced ? 0 : 0.2, ease: EASE_OUT }}
      className="relative mx-auto w-full max-w-[24rem]"
    >
      <div
        className="relative aspect-square w-full"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {/* breathing radial glow */}
        <motion.div {...power(0)} className="absolute inset-[8%]">
          <div className="core-glow h-full w-full rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-violet)_38%,transparent),transparent_66%)] blur-2xl" />
        </motion.div>

        {/* --------------------------------------------- orbital rings */}
        <div className="parallax-core absolute inset-0">
          {/* outer ring — breathes, turns clockwise */}
          <motion.div {...power(1)} className="absolute inset-0">
            <div className="core-breathe h-full w-full">
              <div
                className="h-full w-full rounded-full border border-dashed border-violet/30 animate-orbit"
                style={{ animationDuration: "64s" }}
              />
            </div>
          </motion.div>

          {/* fine dotted ring — counter-clockwise, carries two nodes */}
          <motion.div {...power(2)} className="rm-hide absolute inset-[3%] hidden sm:block">
            <div
              className="relative h-full w-full rounded-full border border-dotted border-cyan/25 animate-orbit-rev"
              style={{ animationDuration: "82s" }}
            >
              <span className="core-node absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" />
              <span className="core-node absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-soft" />
            </div>
          </motion.div>

          {/* cyan ring — counter-clockwise, one travelling node */}
          <motion.div {...power(3)} className="absolute inset-[6%]">
            <div
              className="relative h-full w-full rounded-full border border-cyan/20 animate-orbit-rev"
              style={{ animationDuration: "44s" }}
            >
              <span className="core-node absolute left-[14.6%] top-[14.6%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" />
            </div>
          </motion.div>

          {/* segmented arc ring — clockwise */}
          <motion.div {...power(4)} className="absolute inset-[10%]">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full animate-orbit"
              style={{ animationDuration: "26s" }}
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                stroke="var(--color-violet-soft)"
                strokeOpacity="0.45"
                strokeWidth="0.6"
                strokeDasharray="18 9 4 9"
                strokeLinecap="round"
              />
              <circle cx="50" cy="1" r="1.3" fill="var(--color-violet-soft)" />
            </svg>
          </motion.div>

          {/* intermittent radar sweep around the portrait */}
          <div className="rm-hide core-intermittent absolute inset-[8%]" style={{ animationDelay: `${activateAt + 1}s` }}>
            <div
              className="h-full w-full rounded-full animate-orbit"
              style={{
                animationDuration: "4.5s",
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, color-mix(in oklab, var(--color-cyan) 55%, transparent) 355deg, transparent 360deg)",
                WebkitMask:
                  "radial-gradient(circle, transparent 84%, #000 85%, #000 98%, transparent 99%)",
                mask: "radial-gradient(circle, transparent 84%, #000 85%, #000 98%, transparent 99%)",
              }}
            />
          </div>

          {/* orbiting motes */}
          {reduced
            ? null
            : MOTES.map((mote) => (
                <motion.div
                  key={`${mote.inset}-${mote.duration}`}
                  {...power(5)}
                  className="absolute hidden sm:block"
                  style={{ inset: mote.inset }}
                >
                  <div
                    className={`h-full w-full ${mote.reverse ? "animate-orbit-rev" : "animate-orbit"}`}
                    style={{ animationDuration: mote.duration, rotate: `${mote.start}deg` }}
                  >
                    <span
                      className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-cyan/80 shadow-[0_0_6px_1px_color-mix(in_oklab,var(--color-cyan)_60%,transparent)]"
                      style={{ width: mote.size, height: mote.size }}
                    />
                  </div>
                </motion.div>
              ))}
        </div>

        {/* --------------------------------------------- portrait disc */}
        <div className="absolute inset-[14%] overflow-hidden rounded-full border border-violet/30 bg-bg-2 shadow-[0_0_60px_-18px_var(--color-violet)]">
          {portraitSrc ? (
            <Image
              src={portraitSrc}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 768px) 60vw, 340px"
              /* Faces sit above centre in most portraits, so bias the crop up. */
              className="object-cover object-[50%_22%]"
            />
          ) : (
            <TechAvatar className="h-full w-full" />
          )}

          {/* scan sweep */}
          {reduced ? null : (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan/25 to-transparent animate-scan" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>

        {/* ------------------------------------- connectors + labels */}
        <motion.svg
          {...power(6)}
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          {LABELS.map((label, index) => {
            const from = polar(label.angle, 36.5);
            const to = polar(label.angle, 45);
            return (
              <g key={label.tag}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--color-cyan)"
                  strokeOpacity="0.45"
                  strokeWidth="0.35"
                  strokeDasharray="1.2 1.2"
                  className={reduced ? undefined : "animate-flow"}
                />
                <circle cx={from.x} cy={from.y} r="0.8" fill="var(--color-cyan)" fillOpacity="0.8" />
                {reduced ? null : (
                  <circle r="0.7" fill="#fff">
                    <animate
                      attributeName="cx"
                      values={`${to.x};${from.x}`}
                      dur="2.6s"
                      begin={`${index * 0.65}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`${to.y};${from.y}`}
                      dur="2.6s"
                      begin={`${index * 0.65}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;0"
                      dur="2.6s"
                      begin={`${index * 0.65}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </motion.svg>

        <div className="parallax-labels absolute inset-0">
        <motion.div {...power(7)} className="absolute inset-0">
          {LABELS.map((label, index) => {
            const point = polar(label.angle, 49);
            return (
              <span
                key={label.tag}
                className="core-anchor absolute -translate-x-1/2 -translate-y-1/2"
                style={{ "--x": `${point.x}%`, top: `${point.y}%` } as CSSProperties}
              >
                <span
                  ref={(node) => {
                    labelRefs.current[index] = node;
                  }}
                  className="core-label block"
                  style={{
                    animationDelay: label.delay,
                    transition: "translate 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                  } as CSSProperties}
                  data-near="false"
                >
                  <span className="block rounded-md border border-line bg-bg/85 px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-muted">
                    {label.tag}
                  </span>
                </span>
              </span>
            );
          })}
        </motion.div>
        </div>

        {/* corner brackets */}
        {[
          "left-0 top-0 border-l border-t",
          "right-0 top-0 border-r border-t",
          "left-0 bottom-0 border-b border-l",
          "right-0 bottom-0 border-b border-r",
        ].map((position) => (
          <span
            key={position}
            className={`pointer-events-none absolute h-5 w-5 border-violet/40 ${position}`}
          />
        ))}
      </div>

      {/* holographic platform */}
      <div className="relative -mt-3 flex flex-col items-center">
        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
        <div className="mt-1 h-10 w-3/4 rounded-[100%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-cyan)_22%,transparent),transparent_70%)] blur-md" />
        <p className="-mt-4 font-mono text-[10px] tracking-[0.2em] text-faint">
          {profile.role.toUpperCase()}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : activateAt + 1.1 }}
          className="mt-2"
        >
          <StatusTicker messages={STATUS} interval={3400} />
        </motion.div>
      </div>
    </motion.div>
  );
}
