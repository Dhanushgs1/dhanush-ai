"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Brain,
  Briefcase,
  Download,
  FolderKanban,
  LayoutDashboard,
  Layers,
  Mail,
  Menu,
  Trophy,
  User,
  X,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { profile, resumePath, type NavIcon, type NavItem } from "@/data/site";
import { cn } from "@/lib/cn";
import StatusTicker from "@/components/ui/StatusTicker";
import ThemeToggle from "./ThemeToggle";

const ICONS: Record<NavIcon, LucideIcon> = {
  dashboard: LayoutDashboard,
  about: User,
  projects: FolderKanban,
  stack: Layers,
  experience: Briefcase,
  skills: Brain,
  certifications: Award,
  achievements: Trophy,
  contact: Mail,
};

const SIDEBAR_STATUS = ["AGENT READY", "PROCESSING…", "VECTOR SEARCH", "LLM ONLINE"] as const;

/** Items that get a slot in the mobile bottom bar. */
const MOBILE_IDS = ["home", "about", "projects", "skills", "contact"];

export default function AppShell({
  items,
  resumeAvailable,
  portraitSrc = null,
}: {
  items: NavItem[];
  resumeAvailable: boolean;
  /** Rendered as the brand avatar; falls back to the DG monogram. */
  portraitSrc?: string | null;
}) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const reduced = useReducedMotion();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hrefFor = useCallback(
    (id: string) => (onHome ? `#${id}` : `/#${id}`),
    [onHome],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    let observer: IntersectionObserver | null = null;
    let timer = 0;
    let attempts = 0;

    // The shell outlives page transitions, so on the way back to the homepage
    // its sections may not be mounted yet — retry briefly until they are.
    const connect = () => {
      const targets = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (targets.length === 0 && attempts++ < 30) {
        timer = window.setTimeout(connect, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
      );
      targets.forEach((target) => observer?.observe(target));
    };

    connect();
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [items, onHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const mobileItems = items.filter((item) => MOBILE_IDS.includes(item.id));

  return (
    <>
      {/* ------------------------------------------------------- header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-line bg-bg/80 panel-blur"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="intro-fade group flex min-w-0 items-center gap-3">
            {portraitSrc ? (
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-violet/40">
                <Image
                  src={portraitSrc}
                  alt={`${profile.name} avatar`}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet/40 bg-gradient-to-br from-violet/35 to-blue/20 font-mono text-[12px] font-bold text-text">
                {profile.initials}
              </span>
            )}
            {/* Below `xs` the wordmark is dropped so the header never overflows;
                the DG mark still identifies the site. */}
            <span className="hidden min-w-0 leading-tight sm:block">
              <span className="block truncate text-[13px] font-semibold tracking-tight">
                {profile.name.toUpperCase()}
              </span>
              <span className="eyebrow block">{profile.role}</span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {resumeAvailable ? (
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-xl border border-violet/35 bg-violet/10 px-3.5 py-2 font-mono text-[11px] tracking-[0.1em] text-text transition hover:border-violet/60 hover:bg-violet/20 sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" />
                RESUME
              </a>
            ) : null}

            <ThemeToggle />

            <span
              className="hidden items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2 sm:inline-flex"
              title={`${profile.name} — available for AI work`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 animate-blink" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted">
                ONLINE
              </span>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="app-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="panel panel-hover inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted xl:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------ sidebar */}
      <aside
        aria-label="Sections"
        className="intro-slide-left fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-[248px] flex-col justify-between overflow-y-auto border-r border-line px-3 py-6 lg:flex"
      >
        <nav>
          <p className="eyebrow px-3 pb-3">Navigation</p>
          <ul className="space-y-1">
            {items.map((item) => {
              const Icon = ICONS[item.icon];
              const isActive = onHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "nav-link group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] transition",
                      isActive
                        ? "text-text"
                        : "text-faint hover:bg-panel hover:text-text",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId={reduced ? undefined : "sidebar-active"}
                        className="nav-active-bg absolute inset-0 rounded-xl border border-violet/35 glow-violet"
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 34,
                        }}
                      />
                    ) : null}
                    <Icon
                      className={cn(
                        "nav-icon relative h-4 w-4 shrink-0",
                        isActive ? "text-violet-soft" : "text-faint",
                      )}
                    />
                    <span className="nav-label relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8">
          <p className="eyebrow px-3 pb-3">Quick Actions</p>
          <div className="space-y-1.5 px-1">
            <Link
              href={hrefFor("projects")}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] text-muted transition hover:bg-panel hover:text-text"
            >
              <FolderKanban className="h-3.5 w-3.5" />
              View Projects
            </Link>
            {resumeAvailable ? (
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] text-muted transition hover:bg-panel hover:text-text"
              >
                <Download className="h-3.5 w-3.5" />
                Download Resume
              </a>
            ) : null}
            <Link
              href={hrefFor("contact")}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] text-muted transition hover:bg-panel hover:text-text"
            >
              <Mail className="h-3.5 w-3.5" />
              Contact Me
            </Link>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] text-muted transition hover:bg-panel hover:text-text"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] text-muted transition hover:bg-panel hover:text-text"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </div>
          <div className="mt-6 border-t border-line px-3 pt-4">
            <StatusTicker
              messages={SIDEBAR_STATUS}
              interval={4200}
              startDelay={2500}
            />
          </div>
        </div>
      </aside>

      {/* -------------------------------------------------- mobile sheet */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="app-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-3 top-[4.25rem] z-50 rounded-2xl border border-line bg-bg/95 p-2 panel-blur xl:hidden"
          >
            <ul className="grid gap-1 sm:grid-cols-2">
              {items.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.id}>
                    <Link
                      href={hrefFor(item.id)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] text-muted transition hover:bg-panel hover:text-text"
                    >
                      <Icon className="h-4 w-4 text-faint" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2 border-t border-line p-2">
              {resumeAvailable ? (
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-violet/35 bg-violet/10 px-3 py-2 text-[12.5px] text-text"
                >
                  <Download className="h-3.5 w-3.5" /> Resume
                </a>
              ) : null}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="panel inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] text-muted"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="panel inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] text-muted"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ---------------------------------------------- mobile bottom nav */}
      <nav
        aria-label="Quick sections"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 panel-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
          {mobileItems.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = onHome && active === item.id;
            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={hrefFor(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 transition",
                    isActive ? "text-violet-soft" : "text-faint",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span className="font-mono text-[9.5px] tracking-[0.1em]">
                    {item.shortLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
