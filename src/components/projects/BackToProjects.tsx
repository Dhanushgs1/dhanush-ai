"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useSmartBack } from "@/lib/useSmartBack";

/**
 * The project detail page's "close" affordance. Acts like the browser Back
 * button — returning to whatever page the visitor actually came from —
 * instead of always redirecting to the homepage projects section.
 */
export default function BackToProjects() {
  const goBack = useSmartBack("/#projects");

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    goBack();
  }

  return (
    <Link
      href="/#projects"
      onClick={onClick}
      className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-faint transition hover:text-text"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      ALL PROJECTS
    </Link>
  );
}
