"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Mail,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { heroPills, profile, projects, techStack } from "@/data/site";
import PortraitHUD from "@/components/hero/PortraitHUD";

/** Counts derived from the real content in site.ts — never hand-written. */
const techCount = techStack.reduce(
  (total, group) => total + group.items.length,
  0,
);

const metrics = [
  { label: "Projects", value: `${projects.length}+` },
  { label: "Experience", value: profile.experience },
  { label: "Technologies", value: `${techCount}+` },
];

export default function Hero({
  portraitSrc,
}: {
  portraitSrc: string | null;
}) {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.3 : 0.65,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="pb-14 pt-24 md:pt-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        {/* ---------------------------------------------------- intro */}
        <div className="order-2 lg:order-1">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/10 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.2em] text-violet-soft"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            HELLO, I&apos;M
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            id="hero-heading"
            className="relative mt-5"
          >
            {/* soft glow behind the name gives the type some depth */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-6 h-32 w-72 rounded-full bg-violet/18 blur-3xl"
            />
            <span className="relative block text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-[3.9rem] xl:text-[4.35rem]">
              DHANUSH{" "}
              <span className="text-gradient">G</span>
            </span>

            <span className="relative mt-4 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-gradient-to-r from-violet to-cyan" />
              <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] sm:text-[13px]">
                {profile.tagline.split("•").map((part, index, all) => (
                  <span key={part} className="flex items-center gap-x-2.5 whitespace-nowrap">
                    <span className="text-violet-soft">{part.trim()}</span>
                    {index < all.length - 1 ? (
                      <span aria-hidden="true" className="text-faint">
                        &bull;
                      </span>
                    ) : null}
                  </span>
                ))}
              </span>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.ul {...rise(0.26)} className="mt-6 flex flex-wrap gap-1.5">
            {heroPills.map((pill) => (
              <li
                key={pill}
                className="rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-[10.5px] tracking-[0.12em] text-muted"
              >
                {pill}
              </li>
            ))}
          </motion.ul>

          <motion.div {...rise(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet to-blue px-5 py-3 text-[13.5px] font-medium text-white shadow-[0_18px_45px_-22px_var(--color-violet)] transition hover:brightness-110"
            >
              VIEW MY WORK
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="panel panel-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-medium"
            >
              CONTACT ME
            </Link>
            <div className="flex gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="panel panel-hover inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="panel panel-hover inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.links.email}`}
                aria-label="Send an email"
                className="panel panel-hover inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.dl
            {...rise(0.38)}
            className="mt-9 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-bg/85 px-4 py-3">
                <dt className="eyebrow">{metric.label}</dt>
                <dd className="mt-1 text-[15px] font-semibold">{metric.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* -------------------------------------------------- portrait */}
        <div className="order-1 lg:order-2">
          <PortraitHUD portraitSrc={portraitSrc} />
        </div>
      </div>
    </section>
  );
}
