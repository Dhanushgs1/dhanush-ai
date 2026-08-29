"use client";

import { useState } from "react";
import {
  profile,
  projects,
  skills,
  technologyCount,
  technologyGroups,
} from "@/data/site";
import RadialMap from "@/components/skills/RadialMap";
import SkillPanel from "@/components/skills/SkillPanel";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

const ACCENT_DOT: Record<string, string> = {
  blue: "bg-blue",
  violet: "bg-violet",
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  emerald: "bg-emerald",
  amber: "bg-amber",
};

const STATUS_LABEL = {
  used: null,
  beginner: "BEGINNER",
  learning: "LEARNING",
} as const;

/** Bottom metrics — every value is derived from real data, none typed by hand. */
const metrics = [
  { value: `${projects.length}+`, label: "Projects" },
  { value: profile.experience, label: "Experience" },
  { value: `${technologyCount}`, label: "Technologies" },
  { value: "Generative AI", label: "Focus" },
];

export default function Skills() {
  const [activeId, setActiveId] = useState(skills[0].id);
  const active = skills.find((skill) => skill.id === activeId) ?? skills[0];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        id="skills"
        eyebrow="Skills & Tech Stack"
        title={
          <>
            One discipline,{" "}
            <span className="text-gradient">connected parts</span>.
          </>
        }
        lead="Explore how the technologies I work with connect across AI, development, data and orchestration. Select a node to see what it means in the work — and which projects it actually runs in."
      />

      {/* ------------------------------------------- radial map + panel */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:items-center">
        <div className="order-2 lg:order-1">
          <RadialMap
            skills={skills}
            activeId={activeId}
            onSelect={setActiveId}
          />

          {/* touch-friendly selector, doubles as the mobile fallback */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {skills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => setActiveId(skill.id)}
                aria-pressed={skill.id === activeId}
                className={cn(
                  "rounded-lg border px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.08em] transition",
                  skill.id === activeId
                    ? "border-violet/45 bg-violet/12 text-text"
                    : "border-line bg-panel text-faint hover:text-text",
                )}
              >
                {skill.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SkillPanel skill={active} />
        </div>
      </div>

      {/* ----------------------------------------- technology overview */}
      <div className="mt-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Technology Overview</p>
              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                {technologyCount} technologies, grouped by what they are for
              </h3>
            </div>
            <p className="flex flex-wrap items-center gap-3 text-[12px] text-faint">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                used in real work
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                beginner / learning
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mt-8 space-y-8">
          {technologyGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 0.03}>
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      ACCENT_DOT[group.accent],
                    )}
                  />
                  <h4 className="font-mono text-[11px] tracking-[0.2em] text-muted">
                    {group.title.toUpperCase()}
                  </h4>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] text-faint">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <div className="panel panel-hover group relative h-full overflow-hidden rounded-xl px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span
                              className={cn(
                                "h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-150",
                                item.status === "used"
                                  ? ACCENT_DOT[group.accent]
                                  : "bg-amber",
                              )}
                            />
                            <span className="truncate text-[13.5px] font-medium">
                              {item.name}
                            </span>
                          </div>
                          {STATUS_LABEL[item.status] ? (
                            <span className="shrink-0 rounded border border-amber/35 bg-amber/10 px-1.5 py-0.5 font-mono text-[8.5px] tracking-[0.12em] text-amber">
                              {STATUS_LABEL[item.status]}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-faint opacity-80 transition-opacity group-hover:opacity-100">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --------------------------------------------- bottom metrics */}
      <Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-bg/85 px-5 py-5 text-center">
              <dd className="text-gradient text-[22px] font-semibold leading-none">
                {metric.value}
              </dd>
              <dt className="eyebrow mt-2 block">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
