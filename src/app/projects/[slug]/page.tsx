import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import AssistantLauncher from "@/components/hero/AssistantLauncher";
import AppShell from "@/components/layout/AppShell";
import BackgroundFX from "@/components/layout/BackgroundFX";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import BackToProjects from "@/components/projects/BackToProjects";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/site";
import { isResumeAvailable, resolvePortrait } from "@/lib/assets";
import { visibleSections } from "@/lib/nav";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Case study not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Dhanush G`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

const blocks = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "result", label: "Outcome" },
] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  if (!project) notFound();

  const next = projects[(index + 1) % projects.length];
  const items = visibleSections();

  return (
    <>
      <BackgroundFX />
      <AppShell
        items={items}
        resumeAvailable={isResumeAvailable()}
        portraitSrc={resolvePortrait()}
      />

      <div className="lg:pl-[248px]">
        <PageTransition>
        <main
          id="main"
          className="mx-auto w-full max-w-5xl px-4 pb-28 pt-24 sm:px-6 md:pt-32 lg:pb-16"
        >
          <Reveal>
            <BackToProjects />

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-violet-soft">
                {project.tag.toUpperCase()}
              </span>
              {project.status === "in-progress" ? (
                <span className="rounded-lg border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-amber">
                  IN PROGRESS
                </span>
              ) : (
                <span className="rounded-lg border border-emerald/35 bg-emerald/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-emerald">
                  SHIPPED
                </span>
              )}
            </div>

            <h1 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-[2.8rem]">
              {project.title}
            </h1>

            <p className="mt-5 max-w-3xl text-[15.5px] leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>

            {project.repoUrl || project.liveUrl ? (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel panel-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px]"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel panel-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live demo
                  </a>
                ) : null}
              </div>
            ) : null}
          </Reveal>

          {project.note ? (
            <Reveal delay={0.05}>
              <p className="mt-8 rounded-2xl border border-cyan/25 bg-cyan/[0.06] p-4 text-[13.5px] leading-relaxed text-muted">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                  Scope
                </span>
                <span className="mt-2 block">{project.note}</span>
              </p>
            </Reveal>
          ) : null}

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {blocks.map((block, blockIndex) => (
              <Reveal as="article" key={block.key} delay={blockIndex * 0.06}>
                <div className="panel h-full rounded-2xl p-6">
                  <p className="eyebrow">{block.label}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {project[block.key]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <section className="mt-14" aria-labelledby="architecture-heading">
              <h2
                id="architecture-heading"
                className="text-xl font-semibold sm:text-2xl"
              >
                Architecture
              </h2>
              <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {project.architecture.map((step, stepIndex) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3"
                  >
                    <span className="font-mono text-[11px] text-violet-soft/80">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13.5px] text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
            <Reveal>
              <section aria-labelledby="features-heading">
                <h2 id="features-heading" className="text-xl font-semibold sm:text-2xl">
                  Key features
                </h2>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[13.5px] text-muted"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan/80" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.06}>
              <section aria-labelledby="contribution-heading">
                <h2
                  id="contribution-heading"
                  className="text-xl font-semibold sm:text-2xl"
                >
                  My contribution
                </h2>
                <ul className="mt-5 space-y-3">
                  {project.contribution.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-muted"
                    >
                      <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          <Reveal>
            <section className="mt-14" aria-labelledby="challenges-heading">
              <h2 id="challenges-heading" className="text-xl font-semibold sm:text-2xl">
                What was hard
              </h2>
              <ul className="mt-5 space-y-3">
                {project.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="panel rounded-xl p-4 text-[13.5px] leading-relaxed text-muted"
                  >
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="mt-14" aria-labelledby="stack-heading">
              <h2 id="stack-heading" className="text-xl font-semibold sm:text-2xl">
                Tech stack
              </h2>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-panel-2 px-2.5 py-1 text-[12px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={`/projects/${next.slug}`}
                className="group inline-flex items-center gap-2 text-[13.5px] text-muted transition hover:text-text"
              >
                Next case study: {next.title}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-blue px-5 py-3 text-[13.5px] font-medium text-white transition hover:brightness-110"
              >
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </main>

        <Footer items={items} />
        </PageTransition>
      </div>

      <AssistantLauncher />
    </>
  );
}
