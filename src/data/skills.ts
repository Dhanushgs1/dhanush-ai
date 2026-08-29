/**
 * Skills and technologies — the single source of truth for the Skills & Stack
 * section, the technology grid and the assistant.
 *
 * Two honesty rules govern this file:
 *  1. Every entry must be backed by the résumé or a real project. Nothing is
 *     added because it would look good.
 *  2. `status` is not decoration. USED means it has shipped in real work,
 *     BEGINNER means early-stage exposure, LEARNING means in progress —
 *     and the UI shows that distinction rather than implying expertise.
 */

export type TechStatus = "used" | "beginner" | "learning";

export type TechCategoryId =
  | "ai"
  | "programming"
  | "frameworks"
  | "tools"
  | "data"
  | "cloud"
  | "devtools";

export type Technology = {
  id: string;
  name: string;
  category: TechCategoryId;
  description: string;
  status: TechStatus;
};

export const technologyCategories: {
  id: TechCategoryId;
  title: string;
  accent: "blue" | "violet" | "cyan" | "magenta" | "emerald" | "amber";
}[] = [
  { id: "ai", title: "AI & Generative AI", accent: "blue" },
  { id: "programming", title: "Programming", accent: "violet" },
  { id: "frameworks", title: "Frameworks", accent: "violet" },
  { id: "tools", title: "AI Platforms & Tools", accent: "magenta" },
  { id: "data", title: "Database & Data", accent: "cyan" },
  { id: "cloud", title: "Cloud & Deployment", accent: "emerald" },
  { id: "devtools", title: "Developer Tools", accent: "amber" },
];

export const technologies: Technology[] = [
  // ---------------------------------------------------------------- AI
  { id: "llms", name: "LLMs", category: "ai", status: "used", description: "Applications built on top of large language models." },
  { id: "rag", name: "RAG", category: "ai", status: "used", description: "Retrieval-augmented generation over real documents." },
  { id: "agents", name: "AI Agents", category: "ai", status: "used", description: "Multi-step, tool-using autonomous workflows." },
  { id: "mcp", name: "MCP", category: "ai", status: "used", description: "Model Context Protocol servers and tool integrations." },
  { id: "prompt", name: "Prompt Engineering", category: "ai", status: "used", description: "Prompts tuned to reduce hallucination in production." },
  { id: "embeddings", name: "Embeddings", category: "ai", status: "used", description: "Vector representations that make retrieval work." },
  { id: "vectordb", name: "Vector Databases", category: "ai", status: "used", description: "Similarity search over embedded content." },
  { id: "faiss", name: "FAISS", category: "ai", status: "used", description: "Vector index behind the semantic search assistant." },

  // ------------------------------------------------------- programming
  { id: "python", name: "Python", category: "programming", status: "used", description: "Primary language for AI and backend work." },
  { id: "typescript", name: "TypeScript", category: "programming", status: "used", description: "Typed frontend and Next.js applications." },
  { id: "javascript", name: "JavaScript", category: "programming", status: "used", description: "Browser and Node runtime work." },

  // -------------------------------------------------------- frameworks
  { id: "langchain", name: "LangChain", category: "frameworks", status: "used", description: "Composing LLM calls, retrieval and tools." },
  { id: "langgraph", name: "LangGraph", category: "frameworks", status: "used", description: "Graph-structured, stateful agent workflows." },
  { id: "fastapi", name: "FastAPI", category: "frameworks", status: "used", description: "Python APIs behind AI and analytics services." },
  { id: "nextjs", name: "Next.js", category: "frameworks", status: "used", description: "App Router, server components, route handlers." },
  { id: "react", name: "React", category: "frameworks", status: "used", description: "Component-driven product interfaces." },
  { id: "tailwind", name: "Tailwind CSS", category: "frameworks", status: "used", description: "Design-system-driven styling." },

  // ------------------------------------------------------------- tools
  { id: "claude", name: "Claude", category: "tools", status: "used", description: "Anthropic's models — including the assistant on this site." },
  { id: "openai", name: "OpenAI APIs", category: "tools", status: "used", description: "Model APIs used in automation workflows." },
  { id: "n8n", name: "n8n", category: "tools", status: "used", description: "LLM-powered workflow automation with scheduled triggers." },
  { id: "cursor", name: "Cursor", category: "tools", status: "used", description: "AI-assisted development environment." },

  // -------------------------------------------------------------- data
  { id: "postgres", name: "PostgreSQL", category: "data", status: "used", description: "Relational store for analytics and app data." },
  { id: "supabase", name: "Supabase", category: "data", status: "used", description: "Postgres, auth and storage for applications." },
  { id: "rest", name: "REST APIs", category: "data", status: "used", description: "Integration surfaces between systems." },
  { id: "webhooks", name: "Webhooks", category: "data", status: "used", description: "Event triggers driving automation workflows." },

  // ------------------------------------------------------------- cloud
  { id: "vercel", name: "Vercel", category: "cloud", status: "used", description: "Deployment and hosting for Next.js apps." },
  { id: "aws", name: "AWS", category: "cloud", status: "beginner", description: "Cloud infrastructure - beginner level." },

  // ---------------------------------------------------------- devtools
  { id: "git", name: "Git", category: "devtools", status: "used", description: "Version control for everything." },
  { id: "github", name: "GitHub", category: "devtools", status: "used", description: "Repositories, reviews and collaboration." },
  { id: "docker", name: "Docker", category: "devtools", status: "beginner", description: "Containerised environments - beginner level." },
];

/** Skill-graph node categories drive the accent colours on the radial map. */
export type SkillCategory = "core-ai" | "development" | "data" | "orchestration";

export type Skill = {
  id: string;
  label: string;
  fullName: string;
  category: SkillCategory;
  description: string;
  /** Technology ids from the list above. */
  technologies: string[];
  /** Only applications that a real project actually demonstrates. */
  applications: string[];
  /** Project slugs from `projects` in site.ts. */
  relatedProjects: string[];
};

export const skillCategories: Record<
  SkillCategory,
  { label: string; accent: "blue" | "violet" | "cyan" | "magenta" }
> = {
  "core-ai": { label: "Core AI", accent: "blue" },
  development: { label: "Development", accent: "violet" },
  data: { label: "Data", accent: "cyan" },
  orchestration: { label: "Orchestration", accent: "magenta" },
};

export const skills: Skill[] = [
  {
    id: "llms",
    label: "LLMs",
    fullName: "Large Language Models",
    category: "core-ai",
    description:
      "Building applications on top of language models — generating listings and insights, answering seller queries, and interpreting data inside automation workflows.",
    technologies: ["claude", "openai", "langchain", "prompt", "python"],
    applications: [
      "Chatbots and virtual assistants",
      "AI-generated marketplace insights",
      "Automation steps that interpret data",
      "Document understanding",
    ],
    relatedProjects: [
      "marketplace-management-agent",
      "verified-rag-assistant",
      "llm-workflow-automation",
      "ai-hr-application",
    ],
  },
  {
    id: "rag",
    label: "RAG",
    fullName: "Retrieval-Augmented Generation",
    category: "core-ai",
    description:
      "Retrieving the relevant material before generating an answer, so responses trace back to real documents instead of model memory.",
    technologies: ["faiss", "embeddings", "vectordb", "langchain", "fastapi"],
    applications: [
      "Seller queries answered from product catalogues",
      "Policy document question answering",
      "Knowledge-base assistants",
    ],
    relatedProjects: ["verified-rag-assistant", "marketplace-management-agent"],
  },
  {
    id: "agents",
    label: "AI Agents",
    fullName: "Agentic AI Systems",
    category: "orchestration",
    description:
      "Systems that plan, call tools and carry a task through several steps — used for autonomous marketplace operations rather than single prompt-response calls.",
    technologies: ["langgraph", "langchain", "python", "mcp"],
    applications: [
      "Autonomous marketplace operations",
      "Multi-agent orchestration",
      "Dynamic repricing decisions",
    ],
    relatedProjects: ["marketplace-management-agent", "lifeos"],
  },
  {
    id: "mcp",
    label: "MCP",
    fullName: "Model Context Protocol",
    category: "orchestration",
    description:
      "Exposing business systems to a model as tools, so an assistant can reach live data instead of guessing at it.",
    technologies: ["mcp", "python", "fastapi", "claude"],
    applications: [
      "Tool-based AI interactions",
      "Live business data access",
      "Persistent knowledge workflows",
    ],
    relatedProjects: ["verified-rag-assistant"],
  },
  {
    id: "embeddings",
    label: "Embeddings",
    fullName: "Vector Embeddings",
    category: "data",
    description:
      "Turning documents into vectors so that meaning, not keywords, decides what gets retrieved.",
    technologies: ["embeddings", "faiss", "vectordb", "python"],
    applications: [
      "Semantic search over documents",
      "Context assembly for retrieval",
    ],
    relatedProjects: ["verified-rag-assistant"],
  },
  {
    id: "vectordb",
    label: "Vector DB",
    fullName: "Vector Databases",
    category: "data",
    description:
      "Storing and searching embeddings at speed — FAISS backs the semantic search in the verified RAG assistant.",
    technologies: ["faiss", "vectordb", "postgres"],
    applications: ["Similarity search", "Document retrieval pipelines"],
    relatedProjects: ["verified-rag-assistant"],
  },
  {
    id: "python",
    label: "Python",
    fullName: "Python Engineering",
    category: "development",
    description:
      "The language behind the agents, the retrieval pipelines and the services that expose them.",
    technologies: ["python", "fastapi", "langchain", "langgraph"],
    applications: [
      "Backend services",
      "Data processing pipelines",
      "Agent orchestration",
    ],
    relatedProjects: [
      "marketplace-management-agent",
      "verified-rag-assistant",
      "llm-workflow-automation",
    ],
  },
  {
    id: "apis",
    label: "APIs",
    fullName: "APIs & Integrations",
    category: "development",
    description:
      "The contracts that hold the systems together — marketplace integrations, document endpoints and automation triggers.",
    technologies: ["fastapi", "rest", "webhooks", "supabase", "n8n"],
    applications: [
      "Marketplace platform integrations",
      "Document upload and query endpoints",
      "Automation webhooks and scheduled triggers",
    ],
    relatedProjects: [
      "marketplace-management-agent",
      "llm-workflow-automation",
      "ai-hr-application",
    ],
  },
];

/** Lookup helper used by the skill panel. */
export function technologyById(id: string): Technology | undefined {
  return technologies.find((technology) => technology.id === id);
}

/** Grouped view of the technology list, used by the overview grid. */
export const technologyGroups = technologyCategories
  .map((category) => ({
    ...category,
    items: technologies.filter((item) => item.category === category.id),
  }))
  .filter((group) => group.items.length > 0);

export const technologyCount = technologies.length;
