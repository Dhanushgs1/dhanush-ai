import { achievements, certifications, sections, type NavItem } from "@/data/site";

/** Sections that actually have content to show. */
export function visibleSections(): NavItem[] {
  return sections.filter((section) => {
    if (section.id === "certifications") return certifications.length > 0;
    if (section.id === "achievements") return achievements.length > 0;
    return true;
  });
}
