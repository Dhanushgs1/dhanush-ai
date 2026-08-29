import { Building2, GraduationCap } from "lucide-react";
import { education, journey, roles } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        id="experience"
        eyebrow="Experience"
        title={
          <>
            Ten months of building AI{" "}
            <span className="text-gradient">in production settings</span>.
          </>
        }
        lead="Three roles across agentic marketplace automation, LLM workflow automation and RAG chatbots."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        {/* ------------------------------------------------ role timeline */}
        <ol className="relative border-l border-line pl-6">
          {roles.map((role, index) => (
            <Reveal
              as="li"
              key={`${role.company}-${role.period}`}
              delay={index * 0.05}
              className="relative pb-6 last:pb-0"
            >
              <span className="absolute -left-[30px] top-5 flex h-3 w-3 items-center justify-center">
                <span className="h-3 w-3 rounded-full border border-violet/50 bg-bg" />
                <span
                  className={`absolute h-1.5 w-1.5 rounded-full ${
                    role.current
                      ? "bg-gradient-to-r from-violet to-cyan"
                      : "bg-faint"
                  }`}
                />
              </span>

              <article className="panel panel-hover relative overflow-hidden rounded-2xl p-5 sm:p-6">
                {role.current ? (
                  <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet via-blue to-transparent" />
                ) : null}

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel-2 text-violet-soft">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold leading-tight">
                        {role.title}
                      </h3>
                      <p className="mt-0.5 text-[13.5px] text-violet-soft">
                        {role.company} · {role.location}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] ${
                      role.current
                        ? "border-emerald/35 bg-emerald/10 text-emerald"
                        : "border-line bg-panel text-muted"
                    }`}
                  >
                    {role.period.toUpperCase()}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>

        <div className="space-y-8">
          {/* ---------------------------------------------------- education */}
          <Reveal>
            <div className="panel rounded-2xl p-6">
              <p className="eyebrow">Education</p>
              <div className="mt-4 flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel-2 text-cyan">
                  <GraduationCap className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug">
                    {education.degree}
                  </h3>
                  <p className="mt-1 text-[13.5px] text-muted">
                    {education.institution}
                  </p>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-faint">
                    {education.period} · {education.location} ·{" "}
                    {education.detail}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------------ journey */}
          <div>
            <Reveal>
              <p className="eyebrow">AI engineering journey</p>
            </Reveal>
            <ol className="relative mt-5 border-l border-line pl-6">
              {journey.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.step}
                  delay={index * 0.04}
                  className="relative pb-5 last:pb-0"
                >
                  <span className="absolute -left-[30px] top-1.5 flex h-3 w-3 items-center justify-center">
                    <span className="h-3 w-3 rounded-full border border-violet/50 bg-bg" />
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
                  </span>
                  <h3 className="text-[14px] font-medium">{item.step}</h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-faint">
                    {item.detail}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
