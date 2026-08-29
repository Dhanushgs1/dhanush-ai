import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const alt = "Dhanush G — AI Engineer & Generative AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const PILLS = ["PYTHON", "LLMs", "RAG", "AI AGENTS", "MCP", "CLAUDE"];

/**
 * Social preview card. The avatar is read from /public at build time and
 * inlined, because the renderer cannot fetch relative URLs.
 */
export default async function OpenGraphImage() {
  let avatarSrc: string | null = null;

  try {
    const file = await readFile(join(process.cwd(), "public", "og-avatar.png"));
    avatarSrc = `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    // No avatar on disk: the card still renders, just without the photo.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #04050b 0%, #0a1026 55%, #17103a 100%)",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* left: identity */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: 640,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              letterSpacing: "0.22em",
              color: "#a78bfa",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: "#22d3ee",
                display: "flex",
              }}
            />
            HELLO, I&apos;M
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.02 }}>
              DHANUSH G
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 18,
                fontSize: 25,
                letterSpacing: "0.14em",
                color: "#a78bfa",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 3,
                  background: "#8b5cf6",
                  display: "flex",
                }}
              />
              AI ENGINEER • GENERATIVE AI ENGINEER
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 24,
                lineHeight: 1.4,
                color: "#b6c0d9",
                display: "flex",
                width: 600,
              }}
            >
              I build intelligent systems using LLMs, RAG, AI Agents and modern
              AI technologies to solve real-world problems.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {PILLS.map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontSize: 18,
                  letterSpacing: "0.1em",
                  color: "#cbd5f5",
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* right: avatar in a HUD ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 400,
            height: 400,
            borderRadius: 400,
            border: "2px solid rgba(139,92,246,0.55)",
            boxShadow: "0 0 90px rgba(109,74,255,0.55)",
            background:
              "radial-gradient(circle at center, rgba(109,74,255,0.35), rgba(4,5,11,0) 70%)",
          }}
        >
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarSrc}
              alt=""
              width={368}
              height={368}
              style={{ borderRadius: 368, objectFit: "cover" }}
            />
          ) : (
            <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>
              {profile.initials}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
