import Link from "next/link";
import {
  Mail,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { profile, type NavItem } from "@/data/site";

export default function Footer({ items }: { items: NavItem[] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[15px] font-semibold">{profile.name}</p>
            <p className="mt-1.5 text-[13px] text-faint">
              {profile.role} at {profile.company} · {profile.mission}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="font-mono text-[11px] tracking-[0.1em] text-faint transition hover:text-text"
              >
                {item.shortLabel}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="panel panel-hover inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="panel panel-hover inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              aria-label="Send an email"
              className="panel panel-hover inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="rule my-7" />

        <p className="font-mono text-[10.5px] tracking-[0.08em] text-faint">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js,
          TypeScript, Tailwind CSS, Framer Motion and the Claude API.
        </p>
      </div>
    </footer>
  );
}
