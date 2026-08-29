"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/site";
import TechAvatar from "./TechAvatar";

const ORBIT_TAGS = ["LLM", "RAG", "MCP", "AGENTS"];

export default function PortraitHUD({
  portraitSrc,
}: {
  /** Resolved public path of the photo, or null when none has been added. */
  portraitSrc: string | null;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0.3 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[24rem]"
    >
      <div className="relative aspect-square w-full">
        {/* glow */}
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-violet)_34%,transparent),transparent_66%)] blur-2xl" />

        {/* rotating rings */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed border-violet/25 ${
            reduced ? "" : "animate-orbit"
          }`}
          style={{ animationDuration: "58s" }}
        />
        <div
          className={`absolute inset-[6%] rounded-full border border-cyan/20 ${
            reduced ? "" : "animate-orbit-rev"
          }`}
          style={{ animationDuration: "44s" }}
        />

        {/* orbiting tags */}
        <div
          className={`absolute inset-0 ${reduced ? "" : "animate-orbit"}`}
          style={{ animationDuration: "38s" }}
        >
          {ORBIT_TAGS.map((tag, index) => {
            const angle = (360 / ORBIT_TAGS.length) * index - 90;
            const radians = (angle * Math.PI) / 180;
            const left = 50 + Math.cos(radians) * 50;
            const top = 50 + Math.sin(radians) * 50;
            return (
              <span
                key={tag}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span
                  className={`block ${reduced ? "" : "animate-orbit-rev"}`}
                  style={{ animationDuration: "38s" }}
                >
                  <span className="block rounded-md border border-line bg-bg/80 px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-muted">
                    {tag}
                  </span>
                </span>
              </span>
            );
          })}
        </div>

        {/* portrait disc */}
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

          {/* HUD grid overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
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
      </div>
    </motion.div>
  );
}
