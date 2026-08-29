import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ Panel */

export function Panel({
  className,
  blur = false,
  hover = false,
  children,
  ...rest
}: ComponentProps<"div"> & { blur?: boolean; hover?: boolean }) {
  return (
    <div
      className={cn(
        "panel",
        blur && "panel-blur",
        hover && "panel-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------- Eyebrow */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-violet" />
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------- Pill */

export function Pill({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "violet" | "cyan" | "emerald" | "amber";
}) {
  const tones = {
    neutral: "border-line bg-panel text-muted",
    violet: "border-violet/35 bg-violet/10 text-violet-soft",
    cyan: "border-cyan/35 bg-cyan/10 text-cyan",
    emerald: "border-emerald/35 bg-emerald/10 text-emerald",
    amber: "border-amber/35 bg-amber/10 text-amber",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[11px] tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ Button */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-violet to-blue px-5 py-3 text-white shadow-[0_18px_45px_-22px_var(--color-violet)] hover:brightness-110",
  ghost:
    "panel panel-hover px-5 py-3 text-text/90 hover:text-text",
  outline:
    "border border-violet/35 bg-violet/10 px-5 py-3 text-text hover:border-violet/60 hover:bg-violet/20",
  icon: "panel panel-hover h-10 w-10 text-muted hover:text-text",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export function ButtonLink({
  href,
  variant = "primary",
  external,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "ref">) {
  const classes = cn(buttonBase, buttonVariants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(buttonBase, buttonVariants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  id: string;
}) {
  return (
    <div>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2
        id={`${id}-heading`}
        className="max-w-3xl text-[1.9rem] font-semibold leading-[1.12] sm:text-4xl md:text-[2.7rem]"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
