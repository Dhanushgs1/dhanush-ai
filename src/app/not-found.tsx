import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BackgroundFX from "@/components/layout/BackgroundFX";

export default function NotFound() {
  return (
    <>
      <BackgroundFX />
      <main
        id="main"
        className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-5 text-center"
      >
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          This page isn&apos;t part of the system.
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          The link you followed doesn&apos;t point anywhere here. Head back to
          the work.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet to-blue px-5 py-3 text-sm font-medium text-white transition hover:brightness-110"
          >
            Back home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#projects"
            className="panel panel-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
          >
            View projects
          </Link>
        </div>
      </main>
    </>
  );
}
