/**
 * Ambient background: aurora wash, drifting grid, circuit traces and a seeded
 * particle field. Seeded — not random — so server and client markup match.
 */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = seeded(20260829);

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: random() * 100,
  top: random() * 100,
  size: 1 + random() * 2,
  delay: random() * 6,
  duration: 5 + random() * 6,
  bright: random() > 0.7,
}));

export default function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div className="absolute -left-[16%] -top-[20%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-violet)_28%,transparent),transparent_62%)] blur-2xl animate-sweep" />
      <div className="absolute -right-[14%] top-[4%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-blue)_24%,transparent),transparent_64%)] blur-2xl" />
      <div className="absolute bottom-[-22%] left-[22%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-cyan)_18%,transparent),transparent_66%)] blur-2xl" />

      <div className="absolute inset-0 mask-fade-b opacity-60">
        <div className="grid-bg absolute inset-x-0 -top-[64px] h-[calc(100%+128px)] animate-drift" />
      </div>

      {/* circuit traces */}
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

      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`absolute rounded-full animate-twinkle ${
              p.bright ? "bg-cyan/70" : "bg-violet-soft/45"
            }`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_38%,var(--color-bg)_100%)]" />
    </div>
  );
}
