/**
 * Single source of truth for every piece of content on the site.
 *
 * Rule for editing this file: only put things here that are actually true.
 * Empty arrays are honest — sections whose data is empty are not rendered at
 * all, rather than filled with placeholder or invented entries.
 */

export const profile = {
  name: "Dhanush G",
  initials: "DG",
  role: "AI Engineer",
  tagline: "AI Engineer • Generative AI Engineer",
  company: "StratAI",
  experience: "10 months",
  location: "Coimbatore, India",
  badge: "AI ENGINEER • STRATAI",
  headline: ["Building AI Systems", "That Turn Data Into Action."],
  heroIntro:
    "I build intelligent systems using LLMs, RAG, AI Agents, and modern AI technologies to solve real-world problems.",
  subtitle:
    "AI Engineer at StratAI, building practical solutions with Generative AI, LLMs, RAG, AI Agents, MCP and enterprise automation.",
  identity:
    "AI Engineer focused on Generative AI, LLM applications, RAG, AI Agents, MCP, automation, APIs, analytics and enterprise AI systems.",
  mission: "Build intelligent systems that solve real-world problems.",
  about:
    "I'm Dhanush G, an AI Engineer with 10 months of hands-on experience across three AI roles — currently Junior AI Engineer at StratAI. I build agentic AI, RAG and automation systems with LangChain, LangGraph, MCP, Python and FastAPI, running against real marketplace data.",
  /** Third-person version of `about`, used by the assistant. */
  summary:
    "Dhanush G is an AI Engineer with 10 months of hands-on experience across three AI roles, currently Junior AI Engineer at StratAI in Coimbatore. He builds agentic AI, RAG and automation systems with LangChain, LangGraph, MCP, Python and FastAPI, running against real marketplace data.",
  focus: ["Generative AI", "LLMs", "RAG", "AI Agents", "MCP"],
  enjoys: [
    "AI-powered applications",
    "Intelligent automation",
    "Enterprise AI workflows",
    "Knowledge systems",
    "Analytics + AI",
    "Agentic workflows",
  ],
  /** Actively studying — shown as "Currently learning", never as achievements. */
  learning: [
    "Claude Certified Architect — Anthropic",
    "Claude platform: Claude API, MCP servers and tool integrations",
  ],
  links: {
    github: "https://github.com/Dhanushgs1",
    linkedin: "https://www.linkedin.com/in/dhanush-gs/",
    email: "dhanushgovindhang@gmail.com",
  },
} as const;

/** Technology pills shown in the hero. Kept to things actually used. */
export const heroPills = [
  "PYTHON",
  "LLMs",
  "RAG",
  "AI AGENTS",
  "MCP",
  "N8N",
  "CLAUDE",
  "CURSOR",
  "GITHUB",
  "SUPABASE",
  "VERCEL",
  "AWS",
] as const;

export const resumePath = process.env.NEXT_PUBLIC_RESUME_PATH ?? "/resume.pdf";
export const portraitPath =
  process.env.NEXT_PUBLIC_PORTRAIT_PATH ?? "/portrait.jpg";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dhanush-portfolio.vercel.app";

export type NavItem = {
  id: string;
  label: string;
  shortLabel: string;
  icon: NavIcon;
};

export type NavIcon =
  | "dashboard"
  | "about"
  | "projects"
  | "stack"
  | "experience"
  | "skills"
  | "certifications"
  | "achievements"
  | "contact";

/**
 * Canonical section list. `AppShell` filters out sections whose data is empty,
 * so nothing links to a section that has nothing to say.
 */
export const sections: NavItem[] = [
  { id: "home", label: "Dashboard", shortLabel: "HOME", icon: "dashboard" },
  { id: "about", label: "About Me", shortLabel: "ABOUT", icon: "about" },
  { id: "projects", label: "Projects", shortLabel: "PROJECTS", icon: "projects" },
  {
    id: "experience",
    label: "Experience",
    shortLabel: "EXPERIENCE",
    icon: "experience",
  },
  { id: "skills", label: "Skills & Stack", shortLabel: "SKILLS", icon: "skills" },
  {
    id: "certifications",
    label: "Certifications",
    shortLabel: "CERTIFICATIONS",
    icon: "certifications",
  },
  {
    id: "achievements",
    label: "Achievements",
    shortLabel: "ACHIEVEMENTS",
    icon: "achievements",
  },
  { id: "contact", label: "Contact", shortLabel: "CONTACT", icon: "contact" },
];

export type Project = {
  slug: string;
  title: string;
  tag: string;
  status: "shipped" | "in-progress";
  icon: "marketplace" | "automation" | "hr" | "mcp" | "os";
  summary: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  features: string[];
  architecture: string[];
  contribution: string[];
  challenges: string[];
  accent: "violet" | "blue" | "cyan";
  note?: string;
  /** Only set these when a real public URL exists. */
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "marketplace-management-agent",
    title: "AI-Powered Marketplace Management Agent",
    tag: "Agentic AI · Marketplace",
    status: "shipped",
    icon: "marketplace",
    summary:
      "An agentic AI system that manages Amazon, Flipkart and Shopify seller accounts end to end — listings, pricing and inventory — with the analytics and action layer behind it.",
    description:
      "The flagship system built at StratAI. Marketplace data from Amazon, Flipkart and Shopify flows through a shared ingestion and analytics layer, multi-agent workflows built with LangChain and LangGraph act on it, and an AI Action Center turns each signal into a recommended next step. RAG over product catalogues and policy documents keeps seller queries grounded.",
    problem:
      "Marketplace operations are manual and the data is scattered: every platform publishes its own report formats, pricing has to be watched by hand, and dashboards show what changed without saying what to do about it.",
    solution:
      "A single agentic system: normalise every platform into one schema, run LLM agents for listing generation and dynamic repricing, and convert analytics into a Problem → Reason → Risk → Recommended Action → Status worklist.",
    result:
      "One workflow across three marketplaces, automated repricing, and analysis that ends in a recommended action instead of a chart.",
    stack: [
      "Python",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "RAG",
      "LLMs",
      "PostgreSQL",
      "Supabase",
      "Next.js",
      "TypeScript",
      "Vercel",
    ],
    features: [
      "Automated product listing generation",
      "Competitor price monitoring",
      "Dynamic repricing engine",
      "Inventory sync across marketplaces",
      "RAG over catalogues and policy documents",
      "Ad spend, CPC and ACOS analysis",
      "Search term and keyword analysis",
      "Rating and review analysis",
      "Inventory ledger, orders and returns",
      "Weekly and historical analysis",
      "AI insights summary",
      "AI Action Center with priority and risk scoring",
      "Critical / High / Medium / Low severity bands",
    ],
    architecture: [
      "Amazon · Flipkart · Shopify Data",
      "Ingestion & Normalisation",
      "Analytics Layer",
      "Multi-Agent Workflows (LangGraph)",
      "RAG / Tools",
      "AI Insights",
      "Action Center",
    ],
    contribution: [
      "Built the agentic system that manages seller accounts end to end across three marketplaces.",
      "Architected multi-agent workflows with LangChain and LangGraph for autonomous marketplace operations.",
      "Developed LLM-powered repricing engines aimed at revenue and Buy Box win-rate.",
      "Implemented the RAG pipeline that answers seller queries from product catalogues and policy documents.",
      "Designed FastAPI REST APIs for marketplace platform integrations.",
      "Built the analytics layer and the Action Center that turns each signal into a recommended action.",
    ],
    challenges: [
      "Each marketplace report arrives in its own shape and grain, so the pipeline has to reconcile them before any metric is comparable.",
      "Ad-attribution metrics and calendar-window metrics legitimately disagree — the analytics layer keeps them distinct instead of averaging the difference away.",
      "Deduplicating order data without deleting genuine repeat sales: the obvious key silently drops real rows.",
      "When review text or sales data is missing, the Action Center has to say so rather than produce a confident-looking result.",
    ],
    accent: "violet",
    note: "This is an automation and analytics layer built on top of the seller platforms themselves — not a rebuild of Seller Central, Flipkart Seller Hub or Shopify. The AI Action Center is part of this system, not a separate product.",
  },
  {
    slug: "verified-rag-assistant",
    title: "Smart Verified RAG GenAI Assistant",
    tag: "RAG · Knowledge Systems",
    status: "shipped",
    icon: "mcp",
    summary:
      "A retrieval-grounded assistant: FAISS semantic search over real documents, plus MCP tools so it can reach live business systems.",
    description:
      "A GenAI assistant built so that answers trace back to something real. Documents are embedded and searched with FAISS, retrieved context is assembled before the model is called, and MCP tool integrations let the assistant reach live business data instead of guessing. Prompts are tuned specifically to reduce hallucination.",
    problem:
      "A model on its own has no access to internal documents or live systems, so its answers cannot be grounded in either — and it will still answer confidently.",
    solution:
      "Combine FAISS-backed retrieval with MCP tool calls: pull the relevant context, call the systems that hold the truth, and constrain the prompt so unsupported answers are refused rather than invented.",
    result:
      "Assistant responses backed by retrieved documents and real tool output.",
    stack: [
      "Python",
      "LangChain",
      "FAISS",
      "FastAPI",
      "RAG",
      "Embeddings",
      "Vector Databases",
      "MCP",
      "Prompt Engineering",
    ],
    features: [
      "Semantic search with a FAISS vector database",
      "Document upload and query workflows",
      "Knowledge base retrieval and context assembly",
      "MCP tool integrations to business systems",
      "Prompt engineering to minimise hallucination",
      "REST APIs built with FastAPI",
      "Persistent knowledge workflows across sessions",
    ],
    architecture: [
      "User",
      "AI Assistant",
      "Embeddings & FAISS Retrieval",
      "Knowledge Base",
      "MCP Tools",
      "LLM",
      "Verified Response",
    ],
    contribution: [
      "Implemented semantic search using FAISS and prompt engineering to minimise hallucinations.",
      "Built RESTful APIs with FastAPI for document upload and querying workflows.",
      "Integrated MCP tools so the assistant can reach live business data.",
      "Designed the context assembly step that decides what the model actually sees.",
    ],
    challenges: [
      "Deciding what belongs in retrieved context versus a tool call, so the model gets enough grounding without drowning in it.",
      "Keeping knowledge useful across sessions instead of re-deriving it every time.",
    ],
    accent: "blue",
  },
  {
    slug: "llm-workflow-automation",
    title: "LLM Workflow Automation",
    tag: "Automation · n8n",
    status: "shipped",
    icon: "automation",
    summary:
      "LLM-powered automation workflows in n8n: price tracking, AI news monitoring and API integrations on scheduled triggers.",
    description:
      "A set of production automation workflows built with n8n during the AI Automation Intern role at StratAI. Scheduled and webhook triggers drive LLM processing steps, integrate external APIs, and write structured results into Supabase for downstream use.",
    problem:
      "Recurring monitoring work — checking prices, tracking AI news, moving data between services — eats hours and gets skipped exactly when it matters.",
    solution:
      "Model each job as an n8n workflow: a trigger, API calls, an LLM step to interpret or summarise the result, and a structured write to the database.",
    result:
      "Monitoring and reporting run on a schedule instead of by hand, with structured output ready for the next system.",
    stack: [
      "n8n",
      "OpenAI APIs",
      "Telegram API",
      "Supabase",
      "Webhooks",
      "REST APIs",
      "Python",
    ],
    features: [
      "LLM-powered automation workflows",
      "Scheduled and webhook triggers",
      "Automated price tracking",
      "AI news monitoring",
      "OpenAI and Telegram integrations",
      "Structured workflow output in Supabase",
    ],
    architecture: [
      "Trigger (schedule / webhook)",
      "n8n Workflow",
      "External APIs",
      "LLM Processing",
      "Supabase",
      "Notification / Downstream Use",
    ],
    contribution: [
      "Designed and implemented LLM-powered automation workflows using n8n.",
      "Integrated OpenAI, Telegram and external data source APIs for real-time automation.",
      "Built automated price-tracking and AI news monitoring systems with scheduled triggers.",
      "Worked with Supabase and cloud databases to store structured workflow outputs.",
    ],
    challenges: [
      "Keeping scheduled runs reliable when an upstream API fails silently rather than erroring.",
      "Shaping LLM output into a structure the next step can depend on.",
    ],
    accent: "cyan",
  },
  {
    slug: "ai-hr-application",
    title: "AI-Powered HR Application",
    tag: "Internal Business App",
    status: "shipped",
    icon: "hr",
    summary:
      "An AI-enabled internal HR application with a dashboard, employee data management and AI-assisted workflows.",
    description:
      "An internal business application for HR teams. It combines an HR dashboard and employee data management with AI-assisted workflows, backed by Supabase and deployed on Vercel.",
    problem:
      "Internal HR data lives in scattered documents and spreadsheets, so routine lookups and updates take longer than the work itself.",
    solution:
      "A single application with an HR dashboard, structured employee data and AI-assisted workflows over that data.",
    result:
      "HR data and the workflows around it live in one place instead of across files.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "LLMs",
      "Vercel",
    ],
    features: [
      "HR dashboard",
      "Employee-related data",
      "Data management",
      "AI-assisted workflows",
      "Backend integration",
      "Supabase data storage",
      "Vercel deployment",
    ],
    architecture: [
      "HR Users",
      "Application UI",
      "Backend / API Layer",
      "Supabase (PostgreSQL)",
      "AI-Assisted Workflows",
    ],
    contribution: [
      "Built application surfaces for the HR dashboard and data management.",
      "Integrated Supabase as the data layer with backend API routes.",
      "Added AI-assisted workflows over the stored data.",
      "Deployed and maintained the application on Vercel.",
    ],
    challenges: [
      "Modelling employee data so the application stays useful as fields change.",
      "Keeping AI assistance inside the boundaries of data the user is allowed to see.",
    ],
    accent: "violet",
  },
  {
    slug: "lifeos",
    title: "LifeOS",
    tag: "Personal AI OS",
    status: "in-progress",
    icon: "os",
    summary:
      "A personal AI operating system, built phase by phase — each phase verified before the next one starts.",
    description:
      "A personal AI operating system built in phases. Each phase is implemented, verified and reviewed before the next begins, so the system stays working end to end at every step rather than being wired up all at once.",
    problem:
      "Personal tooling tends to sprawl across apps, notes and scripts with no shared context between them.",
    solution:
      "A phased build of a single AI-driven system, where each phase adds one capability and is verified before the next is started.",
    result: "In progress — phases are being built and verified one at a time.",
    stack: ["LLMs", "AI Agents", "Python", "APIs"],
    features: ["Phased build", "AI-driven workflows", "Verified per phase"],
    architecture: ["Input", "AI Layer", "Workflows", "Output"],
    contribution: [
      "Designing and building the system phase by phase.",
      "Verifying each phase before starting the next.",
    ],
    challenges: [
      "Keeping scope to one phase at a time instead of building everything at once.",
    ],
    accent: "cyan",
    note: "Currently in progress. The description covers the approach, not a finished product — details will be filled in as phases land.",
  },
];


export type Role = {
  title: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
};

/** Roles, titles and dates exactly as they appear on the résumé. */
export const roles: Role[] = [
  {
    title: "Junior AI Engineer",
    company: "StratAI",
    period: "May 2026 — Present",
    location: "Onsite, Coimbatore",
    current: true,
    highlights: [
      "Building an AI-agent-based Marketplace Management System that automates product listings, dynamic pricing and inventory sync across Amazon, Flipkart and Shopify.",
      "Architecting multi-agent workflows with LangChain and LangGraph for autonomous marketplace operations.",
      "Developing LLM-powered repricing engines aimed at revenue and Buy Box win-rate.",
    ],
  },
  {
    title: "AI Automation Intern",
    company: "StratAI",
    period: "Feb 2026 — Apr 2026",
    location: "Onsite, Coimbatore",
    highlights: [
      "Designed and implemented LLM-powered automation workflows using n8n.",
      "Integrated OpenAI, Telegram and external data source APIs for real-time automation.",
      "Built automated price-tracking and AI news monitoring systems with scheduled triggers.",
      "Worked with Supabase and cloud databases to store structured workflow outputs.",
    ],
  },
  {
    title: "AI Intern",
    company: "Soul Creationz",
    period: "Nov 2025 — Jan 2026",
    location: "Remote, Coimbatore",
    highlights: [
      "Developed LLM-based AI chatbots for business and customer-support automation.",
      "Built RAG question-answering systems over business documents.",
      "Built backend APIs with FastAPI for chatbot integration and query processing.",
      "Optimised prompts to reduce hallucination and improve contextual relevance.",
    ],
  },
];

/** The current role, used where a single headline position is needed. */
/* ---------------------------------------------------------------- skills --
 * The skills and technology model lives in `skills.ts`. It is re-exported here
 * so every consumer keeps importing from one place.
 * ------------------------------------------------------------------------ */
export {
  skills,
  skillCategories,
  technologies,
  technologyById,
  technologyCategories,
  technologyCount,
  technologyGroups,
} from "./skills";
export type {
  Skill,
  SkillCategory,
  TechStatus,
  Technology,
  TechCategoryId,
} from "./skills";

import { technologyGroups as groups } from "./skills";

export type TechCategory = {
  id: string;
  title: string;
  items: { name: string; note: string }[];
};

/** Flattened view kept for the assistant knowledge base. */
export const techStack: TechCategory[] = groups.map((group) => ({
  id: group.id,
  title: group.title,
  items: group.items.map((item) => ({
    name: item.name,
    note: item.description,
  })),
}));

export const experience = {
  company: roles[0].company,
  role: roles[0].title,
  duration: "10 months total",
  description:
    "Working on practical AI systems: agentic marketplace automation, LLM applications, RAG workflows, MCP tool integrations, Python and FastAPI services, and the analytics that sit behind them.",
  responsibilities: [
    "Agentic AI systems",
    "Multi-agent orchestration",
    "MCP servers & tool integrations",
    "LangChain / LangGraph workflows",
    "RAG architecture",
    "Prompt engineering",
    "LLM-powered automation",
    "FastAPI & REST APIs",
    "Marketplace automation",
    "Supabase & cloud databases",
  ],
} as const;

export const education = {
  institution: "Aarupadai Veedu Institute of Technology",
  degree: "B.E. in Artificial Intelligence and Data Science",
  period: "2021 — 2025",
  location: "Chennai, India",
  detail: "CGPA 8.6",
} as const;

export const journey = [
  { step: "Generative AI", detail: "Working with foundation models and getting useful output out of them." },
  { step: "LLMs", detail: "LLM application development, prompt engineering and integration work." },
  { step: "RAG", detail: "Retrieval-augmented generation over knowledge bases and business data." },
  { step: "AI Agents", detail: "Agentic workflows that plan and take multi-step actions." },
  { step: "MCP", detail: "Model Context Protocol integrations that connect models to real tools." },
  { step: "AI Automation", detail: "Automating recurring analysis and business workflows end to end." },
  { step: "Enterprise AI Applications", detail: "Shipping AI systems into analytics platforms and internal business apps." },
] as const;


/** How I build AI systems — the request path, left to right. */
export const pipeline = [
  { label: "User", detail: "A question or a business trigger." },
  { label: "Application", detail: "The product surface: dashboard, app or assistant." },
  { label: "API", detail: "FastAPI / route handlers that own the contract." },
  { label: "AI Orchestration", detail: "Deciding what context and which tools the task needs." },
  { label: "RAG / Tools", detail: "Knowledge base retrieval and MCP tool calls." },
  { label: "LLM", detail: "Reasoning over the assembled, grounded context." },
  { label: "Response", detail: "An answer or a recommended action." },
] as const;

export type Certification = {
  name: string;
  issuer: string;
  /** Completion year. Omitted until a real one is supplied — never guessed. */
  year?: string;
  /** "in-progress" renders an explicit badge — never shown as earned. */
  status?: "earned" | "in-progress";
  credentialUrl?: string;
};

/**
 * No certifications are listed because none have been provided. Add real
 * entries here and the Certifications section appears automatically.
 */
export const certifications: Certification[] = [
  {
    name: "Claude Certified Architect",
    issuer: "Anthropic",
    status: "in-progress",
  },
  {
    name: "Introduction to Machine Learning and Cloud Computing",
    issuer: "NPTEL",
    status: "earned",
  },
  {
    name: "Data Analysis with Python",
    issuer: "IBM Cognitive Class",
    status: "earned",
  },
  {
    name: "AI/ML for Geodata Analysis",
    issuer: "ISRO",
    status: "earned",
  },
  {
    name: "Career Essentials in Business Analysis",
    issuer: "Microsoft & LinkedIn",
    status: "earned",
  },
];

export type Achievement = { title: string; detail: string };

/**
 * Same rule as certifications: real entries only. Empty means the section is
 * not rendered, rather than being padded with invented milestones.
 */
export const achievements: Achievement[] = [];

export const assistantSuggestions = [
  { label: "About Dhanush", question: "Tell me about Dhanush." },
  { label: "View Projects", question: "What AI projects has he built?" },
  { label: "Experience", question: "Tell me about his current role." },
  { label: "Skills", question: "What technologies does he use?" },
  { label: "RAG experience", question: "Tell me about his RAG experience." },
  { label: "MCP experience", question: "What is his MCP experience?" },
] as const;

export const systemFlow = [
  { label: "DATA", caption: "Business & marketplace data" },
  { label: "INTELLIGENCE", caption: "Processing, analytics, retrieval" },
  { label: "AI AGENT", caption: "Reasoning and planning" },
  { label: "TOOLS", caption: "MCP tools and APIs" },
  { label: "ACTION", caption: "Recommendations and automation" },
] as const;

export const systemTags = [
  "LLM",
  "RAG",
  "MCP",
  "APIs",
  "Knowledge Base",
  "Automation",
] as const;
