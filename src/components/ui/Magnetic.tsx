"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Wraps an interactive element so it leans slightly toward the pointer. */
export default function Magnetic({
  children,
  strength,
  max,
  className,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const magnetic = useMagnetic<HTMLSpanElement>(strength, max);

  return (
    <span
      {...magnetic}
      className={cn("inline-flex", className)}
      style={{ transition: "translate 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </span>
  );
}
