import { existsSync } from "fs";
import path from "path";
import { portraitPath, resumePath } from "@/data/site";

/**
 * Server-only checks for optional public assets. The résumé button and the
 * real portrait render only when the file exists, so the site never links to
 * something that 404s or shows a broken image.
 */
function existsInPublic(publicPath: string): boolean {
  if (/^https?:\/\//.test(publicPath)) return true;
  const relative = publicPath.replace(/^\//, "");
  if (!relative) return false;
  return existsSync(path.join(process.cwd(), "public", relative));
}

export function isResumeAvailable(): boolean {
  return existsInPublic(resumePath);
}

/**
 * Filenames people actually use when they drop a photo into /public.
 * The configured path wins; these are conveniences so any reasonable name
 * works without editing config.
 */
const PORTRAIT_CANDIDATES = [
  "portrait.jpg",
  "portrait.jpeg",
  "portrait.png",
  "portrait.webp",
  "photo.jpg",
  "photo.jpeg",
  "photo.png",
  "profile.jpg",
  "profile.jpeg",
  "profile.png",
  "dhanush.jpg",
  "dhanush.jpeg",
  "dhanush.png",
];

/** Returns the public path of the portrait, or null when none is present. */
export function resolvePortrait(): string | null {
  if (existsInPublic(portraitPath)) return portraitPath;

  for (const candidate of PORTRAIT_CANDIDATES) {
    if (existsInPublic(`/${candidate}`)) return `/${candidate}`;
  }

  return null;
}
