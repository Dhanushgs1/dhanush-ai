"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { pipeline, systemTags } from "@/data/site";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

/** Time a data packet spends on each stage. */
const STEP_MS = 850;
/** Pause on "Response" before the next request enters. */
const HOLD_MS = 1500;

const PHASES = [
  { label: "Request", stages: [0, 1] },
  { label: "Processing", stages: [2, 3] },
  { label: "Intelligence", stages: [4, 5] },
  { label: "Response", stages: [6] },
];

/**
 * "How I build AI systems" — the request path drawn as a live architecture
 * strip. A data packet runs along a bus above the stages; each stage lights
 * up as the packet reaches it, then settles once it has been processed. The
 * loop runs only while the section is on screen, and not at all for
 * reduced-motion visitors.
 */
export default function Pipeline() {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { amount: 0.35 });
  const [step, setStep] = useState(-1);
  const [resetting, setResetting] = useState(false);
  const last = pipeline.length - 1;
  const running = step >= 0;

  useEffect(() => {
    if (!inView || reduced) return;
    let timer: number;

    if (step < 0) {
      timer = window.setTimeout(() => setStep(0), 350);
    } else if (step < last) {
      timer = window.setTimeout(() => setStep((s) => s + 1), STEP_MS);
    } else {
      timer = window.setTimeout(() => {
        // Jump back without animating the packet backwards across the bus.
        setResetting(true);
        setStep(0);
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(() => setResetting(false)),
        );
      }, HOLD_MS);
    }
    return () => window.clearTimeout(timer);
  }, [inView, reduced, step, last]);

  const stateOf = (index: number) =>
    !running ? "idle" : index === step ? "active" : index < step ? "done" : "idle";

  const phase = PHASES.find((p) => (p.stages as number[]).includes(step));
  const busTransition = resetting
    ? "none"
    : `transform ${STEP_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease`;

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

        {/* live phase readout */}
        <div
          aria-hidden="true"
          className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9.5px] tracking-[0.18em]"
        >
          {PHASES.map((p, index) => (
            <Fragment key={p.label}>
              <span
                className={cn(
                  "transition-colors duration-500",
                  phase?.label === p.label ? "text-cyan" : "text-faint/70",
                )}
              >
                {phase?.label === p.label && p.label !== "Response"
                  ? `${p.label.toUpperCase()}…`
                  : p.label.toUpperCase()}
              </span>
              {index < PHASES.length - 1 ? (
                <span className="text-faint/40">→</span>
              ) : null}
            </Fragment>
          ))}
        </div>

        <ol ref={listRef} className="relative mt-7 grid gap-2.5 md:grid-cols-7 md:gap-1.5">
          {/* data bus (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-3 hidden h-px -translate-y-1/2 bg-line-strong md:block"
          >
            <div
              className="absolute inset-0 origin-left bg-gradient-to-r from-violet via-blue to-cyan"
              style={{
                transform: `scaleX(${running ? (step + 0.5) / pipeline.length : 0})`,
                opacity: resetting || !running ? 0 : 0.8,
                transition: busTransition,
              }}
            />
            <div
              className="absolute left-0 top-0"
              style={{
                width: `${100 / pipeline.length}%`,
                transform: `translateX(${Math.max(step, 0) * 100}%)`,
                opacity: running && !resetting ? 1 : 0,
                transition: busTransition,
              }}
            >
              <span className="pipe-packet absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </div>
          </div>

          {pipeline.map((stage, index) => (
            <motion.li
              key={stage.label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : index * 0.07,
                ease: EASE_OUT,
              }}
              className="relative"
            >
              <div
                data-state={stateOf(index)}
                className="pipe-card relative h-full rounded-xl border border-line bg-panel p-3 hover:border-violet/35 hover:bg-panel-2"
              >
                <span
                  aria-hidden="true"
                  className="pipe-port absolute left-1/2 -top-3 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line-strong md:block"
                />
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
                    className={cn(
                      "mx-auto block h-2.5 w-px transition-colors duration-500 md:hidden",
                      running && index < step
                        ? "bg-cyan shadow-[0_0_6px_var(--color-cyan)]"
                        : "bg-gradient-to-b from-violet/70 to-transparent",
                    )}
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
              className="fx-badge rounded-lg border border-line bg-panel px-2.5 py-1 font-mono text-[10.5px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
