"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { skillCategories, type Skill } from "@/data/site";
import { cn } from "@/lib/cn";

const ACCENT_VAR: Record<string, string> = {
  blue: "var(--color-blue)",
  violet: "var(--color-violet)",
  cyan: "var(--color-cyan)",
  magenta: "var(--color-magenta)",
};

const ACCENT_CLASS: Record<string, string> = {
  blue: "border-blue/55 bg-blue/12",
  violet: "border-violet/55 bg-violet/12",
  cyan: "border-cyan/55 bg-cyan/12",
  magenta: "border-magenta/55 bg-magenta/12",
};

/** Node placement: evenly spaced on a circle, 12 o'clock first. */
function place(index: number, total: number, radius: number) {
  const angle = ((360 / total) * index - 90) * (Math.PI / 180);
  return {
    left: 50 + Math.cos(angle) * radius,
    top: 50 + Math.sin(angle) * radius,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

export default function RadialMap({
  skills,
  activeId,
  onSelect,
}: {
  skills: Skill[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const nodes = skills.map((skill, index) => ({
    ...skill,
    ...place(index, skills.length, 37),
    accent: skillCategories[skill.category].accent,
  }));

  /** Arrow keys walk the ring, so the map is usable without a mouse. */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const current = skills.findIndex((skill) => skill.id === activeId);
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next =
      (current + (forward ? 1 : -1) + skills.length) % skills.length;
    onSelect(skills[next].id);
    document.getElementById(`skill-node-${skills[next].id}`)?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="AI engineering skill map"
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className="relative mx-auto aspect-square w-full max-w-[32rem]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        {/* orbit rings */}
        <circle cx="50" cy="50" r="37" fill="none" stroke="var(--color-line)" strokeWidth="0.22" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="var(--color-line)" strokeWidth="0.18" strokeDasharray="1.5 2" />

        {/* spokes */}
        {nodes.map((node) => {
          const isActive = node.id === activeId;
          return (
            <line
              key={node.id}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke={ACCENT_VAR[node.accent]}
              strokeWidth={isActive ? 0.55 : 0.22}
              strokeOpacity={isActive ? 0.95 : 0.35}
              strokeDasharray={isActive && !reduced ? "2 2" : undefined}
              className={isActive && !reduced ? "animate-flow" : undefined}
            />
          );
        })}

        {/* node halo for the selected skill */}
        {nodes
          .filter((node) => node.id === activeId)
          .map((node) => (
            <circle
              key={`halo-${node.id}`}
              cx={node.x}
              cy={node.y}
              r="7"
              fill={ACCENT_VAR[node.accent]}
              fillOpacity="0.12"
            />
          ))}
      </svg>

      {/* centre */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-violet/40 bg-gradient-to-br from-violet/30 to-blue/15 text-center sm:h-32 sm:w-32">
          <span className="absolute inset-0 rounded-full bg-violet/20 blur-xl" />
          <span className="relative px-3 text-[12.5px] font-semibold leading-tight">
            AI ENGINEERING
          </span>
          <span className="relative mt-1 font-mono text-[9px] tracking-[0.18em] text-faint">
            CORE
          </span>
        </div>
      </div>

      {/* nodes */}
      {nodes.map((node, index) => {
        const isActive = node.id === activeId;
        return (
          <motion.button
            key={node.id}
            id={`skill-node-${node.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="skill-panel"
            tabIndex={isActive ? 0 : -1}
            aria-label={`${node.fullName} — ${skillCategories[node.category].label}`}
            onMouseEnter={() => onSelect(node.id)}
            onFocus={() => onSelect(node.id)}
            onClick={() => onSelect(node.id)}
            /* Animate on mount rather than on scroll: the map is the centre of
               this section and must never depend on an observer firing. */
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: reduced ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border px-3 py-2 font-mono text-[11px] tracking-[0.08em] transition duration-300",
              isActive
                ? `${ACCENT_CLASS[node.accent]} scale-110 text-text shadow-[0_0_28px_-6px_var(--color-violet)]`
                : "border-line bg-panel text-muted hover:scale-105 hover:border-violet/40 hover:text-text",
            )}
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
          >
            {node.label}
          </motion.button>
        );
      })}
    </div>
  );
}
