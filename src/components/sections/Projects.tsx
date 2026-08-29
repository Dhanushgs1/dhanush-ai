"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Plug,
  ShoppingCart,
  Workflow,
  Users,
} from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useState } from "react";
import { projects, type Project } from "@/data/site";
import { SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

const ICONS: Record<Project["icon"], LucideIcon> = {
  marketplace: ShoppingCart,
  automation: Workflow,
  hr: Users,
  mcp: Plug,
  os: Boxes,
};

const ACCENTS = {
  violet: { glow: "color-mix(in oklab, var(--color-violet) 18%, transparent)", text: "text-violet-soft" },
  blue: { glow: "color-mix(in oklab, var(--color-blue) 18%, transparent)", text: "text-blue" },
  cyan: { glow: "color-mix(in oklab, var(--color-cyan) 16%, transparent)", text: "text-cyan" },
} as const;

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured: boolean;
}) {
  const reduced = useReducedMotion();
  const Icon = ICONS[project.icon];
  const accent = ACCENTS[project.accent];
  const [pointer, setPointer] = useState({ x: 50, y: 0 });

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <motion.article
      onMouseMove={onMove}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : (index % 2) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "panel panel-hover group relative overflow-hidden rounded-2xl p-5 sm:p-7",
        featured && "lg:col-span-2",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(520px circle at ${pointer.x}% ${pointer.y}%, ${accent.glow}, transparent 62%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel-2",
              accent.text,
            )}
          >
            <Icon className="h-5 w-5" />
          </span>

          <div className="flex items-center gap-2">
            {project.status === "in-progress" ? (
              <span className="rounded-lg border border-amber/40 bg-amber/10 px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-amber">
                IN PROGRESS
              </span>
            ) : (
              <span className="rounded-lg border border-emerald/35 bg-emerald/10 px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-emerald">
                SHIPPED
              </span>
            )}
            <span className="font-mono text-[11px] text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <p className={cn("mt-5 font-mono text-[10px] tracking-[0.18em]", accent.text)}>
          {project.tag.toUpperCase()}
        </p>
        <h3
          className={cn(
            "mt-2 font-semibold tracking-tight",
            featured ? "text-2xl" : "text-xl",
          )}
        >
          {project.title}
        </h3>

        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* architecture preview */}
        <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {project.architecture
            .slice(0, featured ? 6 : 4)
            .map((step, stepIndex, all) => (
              <span key={step} className="flex items-center gap-1.5">
                <span className="rounded-md border border-line bg-panel px-2 py-1 font-mono text-[10px] text-faint">
                  {step}
                </span>
                {stepIndex < all.length - 1 ? (
                  <span className="text-[10px] text-faint/60">→</span>
                ) : null}
              </span>
            ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-panel-2 px-2 py-1 text-[11.5px] text-muted"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 ? (
            <span className="px-1 py-1 text-[11.5px] text-faint">
              +{project.stack.length - 6}
            </span>
          ) : null}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-violet/30 bg-violet/10 px-4 py-2.5 text-[12.5px] font-medium transition hover:border-violet/60 hover:bg-violet/20"
          >
            VIEW PROJECT
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span className="sr-only">— {project.title}</span>
          </Link>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-[12.5px] text-muted transition hover:text-text"
            >
              <Github className="h-3.5 w-3.5" />
              GITHUB
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        id="projects"
        eyebrow="Featured Projects"
        title={
          <>
            Systems built on{" "}
            <span className="text-gradient">real business data</span>.
          </>
        }
        lead="Each case study covers the problem, the approach, the architecture, what I contributed and what was hard about it."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
