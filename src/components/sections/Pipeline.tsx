"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pipeline, systemTags } from "@/data/site";

/**
 * "How I build AI systems" — the request path drawn as an architecture strip:
 * animated connectors on desktop, a vertical chain on mobile.
 */
export default function Pipeline() {
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="pipeline-heading" className="py-6">
      <div className="panel panel-blur relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2
              id="pipeline-heading"
              className="mt-2 text-xl font-semibold sm:text-2xl"
            >
              How I build AI systems
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-faint">
            A request goes in one end. A grounded answer or a recommended action
            comes out the other.
          </p>
        </div>

        <ol className="mt-8 grid gap-2.5 md:grid-cols-7 md:gap-1.5">
          {pipeline.map((stage, index) => (
            <motion.li
              key={stage.label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.45,
                delay: reduced ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="h-full rounded-xl border border-line bg-panel p-3 transition hover:border-violet/35 hover:bg-panel-2">
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-violet-soft/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1.5 text-[12.5px] font-semibold leading-tight">
                  {stage.label}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-faint">
                  {stage.detail}
                </p>
              </div>

              {index < pipeline.length - 1 ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-[7px] top-1/2 hidden h-3 w-3.5 -translate-y-1/2 md:block"
                    viewBox="0 0 14 12"
                  >
                    <line
                      x1="0"
                      y1="6"
                      x2="14"
                      y2="6"
                      stroke="var(--color-cyan)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className={reduced ? undefined : "animate-flow"}
                    />
                  </svg>
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-2.5 w-px bg-gradient-to-b from-violet/70 to-transparent md:hidden"
                  />
                </>
              ) : null}
            </motion.li>
          ))}
        </ol>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="eyebrow">Built with</span>
          {systemTags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-[10.5px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
