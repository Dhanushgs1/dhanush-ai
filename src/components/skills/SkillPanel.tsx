"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  projects,
  skillCategories,
  technologyById,
  type Skill,
} from "@/data/site";

const ACCENT_TEXT: Record<string, string> = {
  blue: "text-blue",
  violet: "text-violet-soft",
  cyan: "text-cyan",
  magenta: "text-magenta",
};

export default function SkillPanel({ skill }: { skill: Skill }) {
  const reduced = useReducedMotion();
  const category = skillCategories[skill.category];
  const related = skill.relatedProjects
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <motion.div
      key={skill.id}
      id="skill-panel"
      role="tabpanel"
      aria-label={`${skill.fullName} details`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="panel panel-blur rounded-2xl p-6 sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">Selected node</p>
        <span
          className={`rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] ${
            ACCENT_TEXT[category.accent]
          }`}
        >
          {category.label.toUpperCase()}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold tracking-tight">
        {skill.label}
      </h3>
      <p className={`mt-1 text-[13.5px] ${ACCENT_TEXT[category.accent]}`}>
        {skill.fullName}
      </p>

      <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
        {skill.description}
      </p>

      {/* technologies */}
      <div className="mt-6">
        <p className="eyebrow">Technologies I use</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skill.technologies.map((id) => {
            const technology = technologyById(id);
            if (!technology) return null;
            return (
              <span
                key={id}
                title={technology.description}
                className="rounded-lg border border-line bg-panel px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.06em] text-muted"
              >
                {technology.name}
                {technology.status !== "used" ? (
                  <span className="ml-1.5 text-amber">
                    {technology.status === "learning"
                      ? "· learning"
                      : "· beginner"}
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>

      {/* applications */}
      <div className="mt-6">
        <p className="eyebrow">Real-world applications</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {skill.applications.map((application) => (
            <li
              key={application}
              className="flex items-start gap-2 text-[13px] text-muted"
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
              {application}
            </li>
          ))}
        </ul>
      </div>

      {/* related projects */}
      {related.length > 0 ? (
        <div className="mt-6 border-t border-line pt-5">
          <p className="eyebrow">Where it is used</p>
          <ul className="mt-3 space-y-1.5">
            {related.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-panel px-3.5 py-2.5 text-[13px] transition hover:border-violet/40 hover:bg-panel-2"
                >
                  <span className="text-muted group-hover:text-text">
                    {project.title}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-violet-soft" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#projects"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet/35 bg-violet/10 px-4 py-2.5 text-[12.5px] font-medium transition hover:border-violet/60 hover:bg-violet/20"
          >
            EXPLORE ALL PROJECTS
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </motion.div>
  );
}
