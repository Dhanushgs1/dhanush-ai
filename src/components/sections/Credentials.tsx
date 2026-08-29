import { Award, ExternalLink, Trophy } from "lucide-react";
import { achievements, certifications } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";

/**
 * Certifications and achievements render only when there is real data.
 * Empty arrays mean the section (and its nav entry) is absent entirely —
 * an empty shell would be filler, and inventing entries is not an option.
 */

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        id="certifications"
        eyebrow="Certifications"
        title={
          <>
            Completed <span className="text-gradient">credentials</span>, plus
            what is in progress.
          </>
        }
        lead="Each card carries its real status — nothing is listed as earned before it is."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification, index) => (
          <Reveal as="article" key={certification.name} delay={(index % 3) * 0.05}>
            <div className="panel panel-hover h-full rounded-2xl p-6">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel-2 ${
                  certification.status === "in-progress"
                    ? "text-amber"
                    : "text-emerald"
                }`}
              >
                <Award className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold leading-snug">
                {certification.name}
              </h3>
              <p className="mt-1.5 text-[13px] text-muted">
                {certification.issuer}
              </p>
              <p className="mt-3 flex items-center gap-2">
                {certification.status === "in-progress" ? (
                  <span className="rounded-lg border border-amber/40 bg-amber/10 px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-amber">
                    IN PROGRESS
                  </span>
                ) : (
                  <span className="rounded-lg border border-emerald/35 bg-emerald/10 px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-emerald">
                    COMPLETED
                  </span>
                )}
                {certification.year ? (
                  <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint">
                    {certification.year}
                  </span>
                ) : null}
              </p>
              {certification.credentialUrl ? (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-violet-soft hover:text-text"
                >
                  View credential
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        id="achievements"
        eyebrow="Achievements"
        title={
          <>
            Milestones that <span className="text-gradient">actually shipped</span>.
          </>
        }
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Reveal as="article" key={achievement.title} delay={(index % 3) * 0.05}>
            <div className="panel panel-hover h-full rounded-2xl p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel-2 text-cyan">
                <Trophy className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold leading-snug">
                {achievement.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {achievement.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
