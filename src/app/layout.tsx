import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavigationHistoryProvider } from "@/components/layout/NavigationHistory";
import { profile, siteUrl } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-jet",
});

const title = "Dhanush G | AI Engineer";
const description =
  "AI Engineer building intelligent systems with LLMs, RAG, AI agents and modern AI technologies.";

/** Never let a malformed env value break the build. */
function metadataBase(): URL {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("https://dhanush-ai.vercel.app");
  }
}

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: { default: title, template: "%s | Dhanush G" },
  description,
  applicationName: "Dhanush G — AI Engineer",
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  keywords: [
    "AI Engineer",
    "Generative AI",
    "LLM",
    "RAG",
    "AI Agents",
    "MCP",
    "Model Context Protocol",
    "Embeddings",
    "Vector Database",
    "Python",
    "FastAPI",
    "Next.js",
    "Dhanush G",
    "StratAI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Dhanush G — AI Engineer",
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04050b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fc" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description,
  url: siteUrl,
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressCountry: profile.location },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "AI Agents",
    "Model Context Protocol",
    "Embeddings",
    "Vector Databases",
    "Python",
    "FastAPI",
  ],
};

/** Applied before paint so the chosen theme never flashes. */
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.dataset.theme=s||(m?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {/* Entrance animations start at opacity 0; without JS they would never
            play, so force everything visible for no-script visitors. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <NavigationHistoryProvider>{children}</NavigationHistoryProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
