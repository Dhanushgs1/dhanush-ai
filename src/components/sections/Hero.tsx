"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { heroPills, profile, projects, techStack } from "@/data/site";
import PortraitHUD from "@/components/hero/PortraitHUD";
import CountUp from "@/components/ui/CountUp";
import Magnetic from "@/components/ui/Magnetic";
import { EASE_OUT, spawnRipple, useIntroTiming } from "@/lib/motion";

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

/*
 * Boot sequence (seconds from mount, first visit of the tab). On later visits
 * the whole timeline is compressed so returning from a case study doesn't
 * make the visitor sit through it again.
 */
const T = {
  badge: 0.4,
  name: 0.6,
  tagline: 0.9,
  intro: 1.1,
  pills: 1.3,
  cta: 1.5,
  stats: 1.6,
  core: 1.7,
};

const NAME = "DHANUSH";

export default function Hero({
  portraitSrc,
}: {
  portraitSrc: string | null;
}) {
  const reduced = useReducedMotion();
  const pace = useIntroTiming();
  const at = (seconds: number) => (reduced ? 0 : seconds * pace);

  const rise = (delay: number, y = 16) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.3 : 0.7,
      delay: at(delay),
      ease: EASE_OUT,
    },
  });

  const stagger = (start: number, step: number): Variants => ({
    hidden: {},
    show: {
      transition: {
        delayChildren: at(start),
        staggerChildren: reduced ? 0 : step * pace,
      },
    },
  });

  const charVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { y: "108%" },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.75, ease: EASE_OUT },
    },
  };

  const wordVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE_OUT },
    },
  };

  const pillVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="pb-14 pt-24 md:pt-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        {/* ---------------------------------------------------- intro */}
        <div className="order-2 lg:order-1">
          <div className="parallax-hero">
            <motion.p
              {...rise(T.badge, 10)}
              className="badge-glow inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/10 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.2em] text-violet-soft"
              style={{ animationDelay: `${at(T.badge) + 0.5}s` }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              HELLO, I&apos;M
            </motion.p>

            <h1 id="hero-heading" className="relative mt-5">
              {/* soft glow behind the name gives the type some depth */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: at(T.name) }}
                className="pointer-events-none absolute -left-6 -top-6 h-32 w-72 rounded-full bg-violet/18 blur-3xl"
              />
              <span className="sr-only">{profile.name}</span>
              <motion.span
                aria-hidden="true"
                variants={stagger(T.name, 0.05)}
                initial="hidden"
                animate="show"
                className="relative flex flex-wrap text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-[3.9rem] xl:text-[4.35rem]"
              >
                {NAME.split("").map((char, index) => (
                  <span key={`${char}-${index}`} className="inline-block overflow-hidden pb-[0.06em]">
                    <motion.span variants={charVariants} className="inline-block">
                      {char}
                    </motion.span>
                  </span>
                ))}
                <span className="inline-block w-[0.28em]" />
                <span className="inline-block overflow-hidden pb-[0.06em]">
                  <motion.span variants={charVariants} className="text-gradient-live inline-block">
                    G
                  </motion.span>
                </span>
              </motion.span>

              <motion.span
                {...rise(T.tagline, 12)}
                className="relative mt-4 flex items-center gap-3"
              >
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
              </motion.span>
            </h1>

            <motion.p
              variants={stagger(T.intro, 0.018)}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {profile.heroIntro.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordVariants}
                  className="inline-block whitespace-pre"
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>

            <motion.ul
              variants={stagger(T.pills, 0.045)}
              initial="hidden"
              animate="show"
              className="mt-6 flex flex-wrap gap-1.5"
            >
              {heroPills.map((pill) => (
                <motion.li
                  key={pill}
                  variants={pillVariants}
                  className="fx-badge rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-[10.5px] tracking-[0.12em] text-muted"
                >
                  {pill}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div {...rise(T.cta)} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="#projects"
                  onPointerDown={spawnRipple}
                  className="fx-btn group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-medium text-white"
                >
                  VIEW MY WORK
                  <ArrowRight className="fx-arrow h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="#contact"
                  className="panel panel-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-medium"
                >
                  CONTACT ME
                </Link>
              </Magnetic>
              <div className="flex gap-2">
                <Magnetic max={4}>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="fx-social panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic max={4}>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="fx-social panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic max={4}>
                  <a
                    href={`mailto:${profile.links.email}`}
                    aria-label="Send an email"
                    className="fx-social panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            <motion.dl
              {...rise(T.stats)}
              className="mt-9 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line"
            >
              {metrics.map((metric, index) => (
                <div key={metric.label} className="bg-bg/85 px-4 py-3">
                  <dt className="eyebrow">{metric.label}</dt>
                  <dd className="mt-1 text-[15px] font-semibold">
                    <CountUp
                      value={metric.value}
                      delay={at(T.stats) + 0.2 + index * 0.12}
                    />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* -------------------------------------------------- portrait */}
        <div className="order-1 lg:order-2">
          <PortraitHUD portraitSrc={portraitSrc} activateAt={at(T.core)} />
        </div>
      </div>
    </section>
  );
}
