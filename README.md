# Dhanush G — AI Engineer Portfolio

A futuristic, dashboard-style portfolio for **Dhanush G**, AI Engineer at
StratAI: a command-center layout with a sidebar, a holographic hero, and an
AI assistant that answers questions about him from the portfolio's own data.

Built with Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Framer
Motion and Lucide — deployable to Vercel as-is.

## Stack

| Layer      | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | Next.js 15 (App Router, React 19)                 |
| Language   | TypeScript, strict mode, no `any`                 |
| Styling    | Tailwind CSS v4 with semantic design tokens       |
| Animation  | Framer Motion (all motion respects reduced-motion)|
| Icons      | lucide-react (+ inlined GitHub/LinkedIn marks)    |
| AI         | Claude via `@anthropic-ai/sdk`, server-side only  |
| Deployment | Vercel                                            |

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run typecheck
```

```bash
npm run lint
```

```bash
npm run build
```

## Structure

```
src/
  app/
    layout.tsx                Metadata, fonts, JSON-LD, no-flash theme script
    page.tsx                  The single-page experience
    globals.css               Design tokens (dark + light), keyframes, utilities
    api/assistant/route.ts    Claude call — server-side only
    api/contact/route.ts      Contact form endpoint
    projects/[slug]/page.tsx  Case studies (statically generated)
    not-found.tsx, robots.ts, sitemap.ts, icon.svg, opengraph-image.tsx
  components/
    layout/                   AppShell (header, sidebar, mobile nav), background, footer
    hero/                     Portrait HUD, assistant panel, assistant avatar
    sections/                 Hero, About, Projects, TechStack, Experience, Skills,
                              Credentials, Pipeline, Contact
    ui/                       Primitives, Reveal, brand icons
  data/site.ts                Single source of truth for ALL content
  lib/                        cn, asset checks, nav, assistant knowledge + fallback
```

### Content lives in one file

`src/data/site.ts` holds every fact on the site — profile, projects, stack,
experience, skills, certifications, achievements. Components and the AI
assistant both read from it, so the page and the answers can never drift apart.

The file follows one rule: **only real information**. Empty arrays are honest.
`certifications` and `achievements` are currently empty, so those sections and
their navigation entries are not rendered at all — add real entries and they
appear automatically.

## Configuration

Copy `.env.example` to `.env.local`:

| Variable                    | Purpose                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`      | Absolute URL for canonical links, OpenGraph and the sitemap.                                       |
| `NEXT_PUBLIC_PORTRAIT_PATH` | Portrait image path (default `/portrait.jpg`).                                                     |
| `NEXT_PUBLIC_RESUME_PATH`   | Résumé path (default `/resume.pdf`).                                                               |
| `ANTHROPIC_API_KEY`         | **Server-side only.** Enables the model-backed assistant. Never prefix it with `NEXT_PUBLIC_`.      |
| `ANTHROPIC_MODEL`           | Optional model override (default `claude-opus-5`).                                                 |
| `CONTACT_WEBHOOK_URL`       | Optional. If set, `/api/contact` forwards submissions there (Slack, n8n, Zapier, your own service). |

### Two files you should add

Both are optional and the UI adapts when they are missing — nothing ever links
to a file that does not exist.

1. `public/portrait.jpg` — your photo. Without it the hero shows a `DG`
   monogram inside the same holographic frame.
2. `public/resume.pdf` — your résumé. Without it every "Download Resume"
   button is hidden (header, sidebar, mobile menu, contact).

Rebuild after adding them.

## The AI assistant

`POST /api/assistant` runs entirely on the server:

- The API key is read from the environment inside the route handler; it is
  never sent to, or referenced by, the browser.
- The system prompt is built from `src/data/site.ts` and instructs the model to
  answer **only** from that data, never to invent employers, dates, metrics,
  certifications or links, and never to describe an in-progress project as
  finished. Unknown questions get: *"I don't have that information in Dhanush's
  portfolio."*
- Visitor messages are treated as data — the prompt tells the model to ignore
  instructions embedded in them.
- Requests are length-capped, history is capped at 8 turns, and a per-IP
  throttle trims obvious abuse.

**Without an API key** the route falls back to `src/lib/assistant/localAnswer.ts`:
deterministic keyword retrieval over the same portfolio data. It assembles
answers from real fields and says it doesn't know when nothing matches — so the
widget is never hardcoded fake "AI" output. Answers from that path are labelled
`ANSWERED FROM PORTFOLIO DATA` in the UI.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, import the repo. The Next.js preset is
   detected automatically; no build overrides needed.
3. Add environment variables under **Settings → Environment Variables**
   (`NEXT_PUBLIC_SITE_URL` at minimum; add `ANTHROPIC_API_KEY` for the
   model-backed assistant).
4. Deploy. Pushes to the default branch deploy automatically.

```bash
npx vercel --prod
```

No secrets are committed. `.env*.local` is git-ignored.

## Accessibility & performance

- Semantic landmarks, labelled sections, skip link, visible focus rings, and
  `aria-live` on the assistant transcript and contact form status.
- Full keyboard support: skills graph nodes are buttons, the mobile menu closes
  on Escape and locks scroll while open.
- Every animation is gated on `prefers-reduced-motion`, and a `<noscript>`
  fallback reveals content when JavaScript is unavailable.
- Backdrop blur is opt-in (`.panel-blur`) rather than applied to every panel —
  blurring dozens of surfaces over an animated background is expensive.
- Particle positions are seeded, not random, so server and client markup match.
- No 3D libraries, no video backgrounds: the visuals are CSS, SVG and Framer
  Motion only.
