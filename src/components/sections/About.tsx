import { BookOpen, Cpu, Fingerprint, Sparkles, Target } from "lucide-react";
import { profile } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";

const rows = [
  {
    icon: Fingerprint,
    label: "Identity",
    value: profile.name,
    detail: `${profile.location} · ${profile.company}`,
  },
  {
    icon: Cpu,
    label: "Role",
    value: profile.role,
    detail: `${profile.experience} of hands-on AI engineering`,
  },
  {
    icon: Sparkles,
    label: "Focus",
    value: profile.focus.join(" · "),
    detail: "Applied to enterprise data and internal business systems",
  },
  {
    icon: Target,
    label: "Mission",
    value: profile.mission,
    detail: "Systems that end in an action, not a chart",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        id="about"
        eyebrow="About Me"
        title={
          <>
            An AI engineer who ships{" "}
            <span className="text-gradient">working systems</span>, not demos.
          </>
        }
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Reveal>
          <div className="panel h-full rounded-2xl p-6 sm:p-7">
            <p className="eyebrow">System Profile</p>
            <dl className="mt-5 space-y-4">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex gap-3.5 border-b border-line pb-4 last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-panel-2 text-violet-soft">
                    <row.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-faint">
                      {row.label.toUpperCase()}
                    </dt>
                    <dd className="mt-1 text-[14.5px] font-medium leading-snug">
                      {row.value}
                    </dd>
                    <dd className="mt-1 text-[12.5px] text-faint">
                      {row.detail}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="flex h-full flex-col gap-4">
            <div className="panel rounded-2xl p-6 sm:p-7">
              <p className="text-[15.5px] leading-relaxed text-muted">
                {profile.about}
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-faint">
                {profile.identity}
              </p>
            </div>

            <div className="panel rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-cyan" />
                <p className="eyebrow">Currently learning</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {profile.learning.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13.5px] text-muted"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel rounded-2xl p-6 sm:p-7">
              <p className="eyebrow">What I enjoy building</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {profile.enjoys.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13.5px] text-muted"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
