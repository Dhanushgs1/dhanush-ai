import {
  achievements,
  certifications,
  education,
  technologies,
  experience,
  profile,
  roles,
  projects,
  skills,
  technologyGroups,
} from "@/data/site";
import { REFUSAL } from "./knowledge";

/**
 * Deterministic fallback used when no ANTHROPIC_API_KEY is configured.
 *
 * It does keyword retrieval over the same portfolio data the model would get
 * and returns sentences assembled from that data — it never generates claims.
 * When nothing matches, it says so rather than guessing.
 */

type Topic = {
  id: string;
  /** Higher wins ties: specific topics must beat the catch-all intro. */
  weight: number;
  keywords: string[];
  answer: () => string;
};

const topics: Topic[] = [
  {
    id: "who",
    weight: 1,
    keywords: ["who", "about dhanush", "tell me about", "introduce", "yourself", "background"],
    answer: () =>
      `${profile.summary} He positions himself as an ${profile.tagline}.`,
  },
  {
    id: "role",
    weight: 2,
    keywords: ["role", "current job", "work at", "company", "employer", "stratai", "position"],
    answer: () => {
      const current = roles[0];
      const past = roles
        .slice(1)
        .map((role) => `${role.title} at ${role.company} (${role.period})`)
        .join(", ");
      return `He is ${current.title} at ${current.company} (${current.period}, ${current.location}). Previously: ${past}. ${experience.description}`;
    },
  },
  {
    id: "projects",
    weight: 2,
    keywords: ["project", "built", "portfolio", "case study", "work on", "shipped"],
    answer: () => {
      const shipped = projects
        .filter((project) => project.status === "shipped")
        .map((project) => project.title);
      const inProgress = projects
        .filter((project) => project.status === "in-progress")
        .map((project) => project.title);
      const parts = [`Shipped: ${shipped.join(", ")}.`];
      if (inProgress.length) parts.push(`In progress: ${inProgress.join(", ")}.`);
      parts.push("Open any project card for the problem, architecture and his contribution.");
      return parts.join(" ");
    },
  },
  {
    id: "rag",
    weight: 3,
    keywords: ["rag", "retrieval", "embedding", "vector", "knowledge base"],
    answer: () => {
      const project = projects.find((item) => item.slug === "verified-rag-assistant");
      return `He builds retrieval-augmented generation over knowledge bases and business data — embeddings and vector search to keep answers grounded in real documents. ${
        project ? `In the ${project.title}: ${project.solution}` : ""
      }`.trim();
    },
  },
  {
    id: "mcp",
    weight: 3,
    keywords: ["mcp", "model context protocol", "tool"],
    answer: () => {
      const project = projects.find((item) => item.slug === "verified-rag-assistant");
      return `He works with Model Context Protocol integrations that connect models to real business systems as tools. ${
        project ? `${project.description}` : ""
      }`.trim();
    },
  },
  {
    id: "agents",
    weight: 3,
    keywords: ["agent", "agentic", "autonomous", "multi-step"],
    answer: () =>
      "He builds agentic workflows — systems that plan, call tools and carry a task through more than one step — combined with retrieval and MCP tools so the actions run against real data.",
  },
  {
    id: "tech",
    weight: 2,
    keywords: ["technolog", "stack", "tools", "languages", "framework", "skills", "use"],
    answer: () => {
      const groups = technologyGroups
        .map(
          (group) =>
            `${group.title}: ${group.items.map((item) => item.name).join(", ")}`,
        )
        .join(". ");
      return `${groups}.`;
    },
  },
  {
    id: "skills",
    weight: 2,
    keywords: ["skill", "expertise", "good at", "specialis", "specializ"],
    answer: () =>
      `His core areas are ${skills.map((skill) => skill.label).join(", ")} — applied to enterprise data and internal business systems.`,
  },
  {
    id: "amazon",
    weight: 3,
    keywords: ["amazon", "flipkart", "marketplace", "seller", "acos", "cpc", "ad spend"],
    answer: () => {
      const project = projects.find((item) => item.slug === "marketplace-management-agent");
      return project
        ? `${project.description} ${project.note ?? ""}`.trim()
        : REFUSAL;
    },
  },
  {
    id: "automation",
    weight: 3,
    keywords: ["n8n", "automation", "workflow", "webhook", "scheduled", "price tracking"],
    answer: () => {
      const project = projects.find(
        (item) => item.slug === "llm-workflow-automation",
      );
      return project ? project.description : REFUSAL;
    },
  },
  {
    id: "lifeos",
    weight: 3,
    keywords: ["lifeos", "life os", "personal os"],
    answer: () => {
      const project = projects.find((item) => item.slug === "lifeos");
      return project
        ? `${project.title} is currently in progress, not finished. ${project.description}`
        : REFUSAL;
    },
  },
  {
    id: "contact",
    weight: 3,
    keywords: ["contact", "reach", "email", "hire", "linkedin", "github", "get in touch"],
    answer: () =>
      `You can reach him by email at ${profile.links.email}, on GitHub at ${profile.links.github}, or on LinkedIn at ${profile.links.linkedin}.`,
  },
  {
    id: "certifications",
    weight: 3,
    keywords: ["certification", "certificate", "credential", "course"],
    answer: () =>
      (() => {
        if (certifications.length === 0) {
          return "No certifications are listed in this portfolio.";
        }
        const label = (item: (typeof certifications)[number]) =>
          `${item.name} (${item.issuer})`;
        const done = certifications
          .filter((item) => item.status !== "in-progress")
          .map(label);
        const doing = certifications
          .filter((item) => item.status === "in-progress")
          .map(label);
        const parts: string[] = [];
        if (done.length) parts.push(`Completed: ${done.join("; ")}.`);
        if (doing.length) {
          parts.push(`In progress, not yet earned: ${doing.join("; ")}.`);
        }
        return parts.join(" ");
      })(),
  },
  {
    id: "achievements",
    weight: 3,
    keywords: ["achievement", "award", "milestone", "accomplish"],
    answer: () =>
      achievements.length === 0
        ? "No achievements are listed in this portfolio."
        : achievements.map((item) => `${item.title}: ${item.detail}`).join("; "),
  },
  {
    id: "education",
    weight: 3,
    keywords: ["education", "degree", "college", "university", "study", "studied", "cgpa", "graduate"],
    answer: () =>
      `${education.degree} from ${education.institution} (${education.period}, ${education.location}), ${education.detail}.`,
  },
  {
    id: "learning",
    weight: 3,
    keywords: ["learning", "currently studying", "claude certified", "architect", "upskill"],
    answer: () =>
      `Currently learning: ${profile.learning.join("; ")}. These are in progress, not completed.`,
  },
  {
    id: "experience-length",
    weight: 3,
    keywords: ["how long", "years of experience", "how much experience", "since when"],
    answer: () =>
      `${profile.experience} of hands-on AI engineering experience across ${roles.length} roles — currently ${roles[0].title} at ${roles[0].company}.`,
  },
];

/** Short keywords must match whole words, so "rag" never fires on "storage". */
function matches(text: string, keyword: string): boolean {
  if (keyword.length > 4) return text.includes(keyword);
  return new RegExp(`\\b${keyword}\\b`).test(text);
}

const STATUS_PHRASE: Record<string, string> = {
  used: "used in real work",
  beginner: "at beginner level, not professional experience",
  learning: "currently being learned, not completed",
};

/**
 * Direct hit on a technology name ("does he know AWS?") answers from that
 * entry, including its honest status, before the broader topic matching runs.
 */
function answerAboutTechnologies(question: string): string | null {
  // Plain substring scan with manual word boundaries — technology names like
  // "Next.js" and "REST APIs" would need escaping inside a RegExp.
  const isWordChar = (char: string | undefined) =>
    Boolean(char && /[a-z0-9]/.test(char));

  const mentions = (name: string) => {
    const needle = name.toLowerCase();
    const index = question.indexOf(needle);
    if (index === -1) return false;
    return (
      !isWordChar(question[index - 1]) &&
      !isWordChar(question[index + needle.length])
    );
  };

  const named = technologies.filter((technology) => mentions(technology.name));

  if (named.length === 0) return null;

  return named
    .slice(0, 3)
    .map(
      (technology) =>
        `${technology.name}: ${technology.description} (${STATUS_PHRASE[technology.status]})`,
    )
    .join(" ");
}

export function answerLocally(question: string): string {
  const normalised = question.toLowerCase();

  const direct = answerAboutTechnologies(normalised);
  if (direct) return direct;

  const scored = topics
    .map((topic) => ({
      topic,
      score: topic.keywords.reduce(
        (total, keyword) =>
          matches(normalised, keyword) ? total + keyword.length : total,
        0,
      ),
    }))
    .filter((entry) => entry.score > 0)
    // Specificity first: "tell me about his RAG experience" is a RAG question,
    // even though the generic "tell me about" phrase is the longer match.
    .sort(
      (a, b) => b.topic.weight - a.topic.weight || b.score - a.score,
    );

  if (scored.length === 0) {
    return `${REFUSAL} You can ask about his role, projects, RAG and MCP work, technology stack, or how to contact him.`;
  }

  return scored[0].topic.answer();
}
