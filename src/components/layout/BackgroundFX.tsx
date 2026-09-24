import type { CSSProperties } from "react";

/**
 * Ambient background in three depth layers that drift at different speeds
 * (and shift by different amounts with the pointer), so the page reads as a
 * space rather than a flat backdrop:
 *
 *   background — aurora wash + grid drifting on both axes
 *   midground  — slow particle field + circuit traces carrying data pulses
 *   foreground — a few glowing data nodes and faint light beams
 *
 * Everything is CSS transform/opacity animation — no canvas, no JS loop.
 * Seeded — not random — so server and client markup match.
 */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = seeded(20260829);

const particles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: random() * 100,
  top: random() * 100,
  size: 1 + random() * 2,
  delay: -random() * 20,
  duration: 16 + random() * 18,
  dx: (random() - 0.5) * 40,
  dy: -10 - random() * 30,
  bright: random() > 0.72,
  // Half the field is desktop-only: phones get a lighter scene.
  desktopOnly: i % 2 === 1,
}));

const nodes = [
  { left: 14, top: 22, delay: 0, duration: 7 },
  { left: 82, top: 16, delay: -2.5, duration: 8 },
  { left: 68, top: 72, delay: -4, duration: 6.5 },
  { left: 26, top: 80, delay: -1.2, duration: 9 },
  { left: 92, top: 48, delay: -3.3, duration: 7.5 },
];

const vars = (values: Record<string, string>) => values as CSSProperties;

export default function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* ---------------------------------------------- background layer */}
      <div className="intro-dawn absolute -inset-8 parallax-bg">
        {/* The grid fades out toward the bottom through a colour overlay
            rather than mask-image: a mask would force the moving grid to be
            re-rasterised every frame instead of just composited. */}
        <div className="grid-bg absolute -inset-[64px] opacity-60 bg-grid-drift" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_42%,var(--color-bg)_100%)]" />

        <div className="absolute -left-[16%] -top-[20%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-violet)_28%,transparent),transparent_62%)] blur-2xl animate-sweep" />
        <div className="absolute -right-[14%] top-[4%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-blue)_24%,transparent),transparent_64%)] blur-2xl" />
        <div className="absolute bottom-[-22%] left-[22%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-cyan)_18%,transparent),transparent_66%)] blur-2xl" />
      </div>

      {/* cursor-following light (fine pointers only — vars stay centred otherwise) */}
      <div className="cursor-light absolute left-0 top-0 hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-violet)_13%,transparent),transparent_65%)] lg:block rm-hide" />

      {/* ----------------------------------------------- midground layer */}
      <div className="absolute -inset-8 parallax-mid">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.16]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
          fill="none"
        >
          <path
            d="M0 140 H240 L300 200 H520 L560 160 H900 L960 220 H1200"
            stroke="var(--color-violet)"
            strokeWidth="1"
          />
          <path
            d="M0 620 H180 L250 550 H470 L530 610 H820 L880 545 H1200"
            stroke="var(--color-cyan)"
            strokeWidth="1"
          />
          <circle cx="300" cy="200" r="3" fill="var(--color-violet)" />
          <circle cx="960" cy="220" r="3" fill="var(--color-blue)" />
          <circle cx="250" cy="550" r="3" fill="var(--color-cyan)" />
          <circle cx="880" cy="545" r="3" fill="var(--color-cyan)" />
        </svg>

        {/* data pulses travelling the traces */}
        <svg
          className="rm-hide absolute inset-0 h-full w-full opacity-70"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
          fill="none"
        >
          <path
            d="M0 140 H240 L300 200 H520 L560 160 H900 L960 220 H1200"
            stroke="var(--color-violet-soft)"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="bg-trace"
            style={vars({ "--dur": "11s", "--delay": "-3s" })}
          />
          <path
            d="M0 620 H180 L250 550 H470 L530 610 H820 L880 545 H1200"
            stroke="var(--color-cyan)"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="bg-trace"
            style={vars({ "--dur": "14s", "--delay": "-8s" })}
          />
        </svg>

        {particles.map((p) => (
          <span
            key={p.id}
            className={`bg-particle rm-hide absolute rounded-full ${
              p.bright ? "bg-cyan/70" : "bg-violet-soft/45"
            } ${p.desktopOnly ? "hidden sm:block" : ""}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              ...vars({
                "--dx": `${p.dx.toFixed(1)}px`,
                "--dy": `${p.dy.toFixed(1)}px`,
                "--dur": `${p.duration.toFixed(1)}s`,
                "--delay": `${p.delay.toFixed(1)}s`,
              }),
            }}
          />
        ))}
      </div>

      {/* ---------------------------------------------- foreground layer */}
      <div className="rm-hide absolute -inset-8 hidden parallax-fg md:block">
        {nodes.map((node) => (
          <span
            key={`${node.left}-${node.top}`}
            className="bg-node absolute h-1.5 w-1.5 rounded-full bg-cyan/80 shadow-[0_0_12px_3px_color-mix(in_oklab,var(--color-cyan)_45%,transparent)]"
            style={{
              left: `${node.left}%`,
              top: `${node.top}%`,
              ...vars({ "--dur": `${node.duration}s`, "--delay": `${node.delay}s` }),
            }}
          />
        ))}

        <span
          className="bg-beam absolute left-0 top-[18%] h-px w-[40vw] bg-gradient-to-r from-transparent via-violet-soft/25 to-transparent"
          style={vars({ "--dur": "26s", "--delay": "-6s" })}
        />
        <span
          className="bg-beam absolute left-0 top-[64%] h-px w-[34vw] bg-gradient-to-r from-transparent via-cyan/20 to-transparent"
          style={vars({ "--dur": "32s", "--delay": "-19s" })}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_38%,var(--color-bg)_100%)]" />
    </div>
  );
}
