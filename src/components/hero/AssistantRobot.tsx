"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Assistant avatar — a metallic humanoid head with an illuminated visor,
 * headphone rings and a glowing chest core. Inline SVG: no image weight, it
 * scales cleanly and follows the theme.
 */
export default function AssistantRobot({
  thinking = false,
  className,
}: {
  thinking?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="AI assistant avatar"
      animate={reduced ? undefined : { y: [0, -3.5, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="bot-shell" x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f2f6ff" />
          <stop offset="38%" stopColor="#b9c6ee" />
          <stop offset="72%" stopColor="#6d7cae" />
          <stop offset="100%" stopColor="#333e6b" />
        </linearGradient>
        <linearGradient id="bot-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#4f7dff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="bot-torso" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#c7d3f7" />
          <stop offset="60%" stopColor="#6675a6" />
          <stop offset="100%" stopColor="#2b3459" />
        </linearGradient>
        <radialGradient id="bot-halo" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#4f7dff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4f7dff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bot-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="56" r="48" fill="url(#bot-halo)" />

      {/* antenna */}
      <line x1="60" y1="11" x2="60" y2="23" stroke="#9fb0dd" strokeWidth="2.2" />
      <circle cx="60" cy="9" r="3.6" fill="#22d3ee">
        {reduced ? null : (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* torso */}
      <path
        d="M28 108c0-14.5 14.3-23 32-23s32 8.5 32 23z"
        fill="url(#bot-torso)"
      />
      <path
        d="M28 108c0-14.5 14.3-23 32-23s32 8.5 32 23z"
        fill="none"
        stroke="#cdd9ff"
        strokeOpacity="0.35"
      />
      {/* chest core */}
      <circle cx="60" cy="99" r="6.5" fill="#0b1430" opacity="0.9" />
      <circle cx="60" cy="99" r="4" fill="url(#bot-visor)">
        {reduced ? null : (
          <animate
            attributeName="opacity"
            values="1;0.45;1"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <path
        d="M42 96h9M69 96h9"
        stroke="#22d3ee"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* neck */}
      <rect x="52" y="76" width="16" height="10" rx="4" fill="#5a68941a" />
      <rect x="52" y="76" width="16" height="10" rx="4" fill="#6a789f" />

      {/* head */}
      <rect x="29" y="23" width="62" height="56" rx="21" fill="url(#bot-shell)" />
      <rect
        x="29"
        y="23"
        width="62"
        height="56"
        rx="21"
        fill="none"
        stroke="#dbe4ff"
        strokeOpacity="0.55"
      />
      {/* top shine */}
      <path
        d="M40 28h40a16 16 0 0 1 6 5H34a16 16 0 0 1 6-5Z"
        fill="url(#bot-shine)"
      />

      {/* headphone rings */}
      <rect x="20.5" y="42" width="9" height="19" rx="4.5" fill="#4d5983" />
      <rect x="22.5" y="45" width="5" height="13" rx="2.5" fill="#22d3ee" opacity="0.75" />
      <rect x="90.5" y="42" width="9" height="19" rx="4.5" fill="#4d5983" />
      <rect x="92.5" y="45" width="5" height="13" rx="2.5" fill="#22d3ee" opacity="0.75" />

      {/* visor */}
      <rect x="36" y="35" width="48" height="28" rx="14" fill="#08101f" />
      <rect
        x="37.5"
        y="36.5"
        width="45"
        height="25"
        rx="12.5"
        fill="url(#bot-visor)"
        opacity="0.92"
      />

      {/* eyes */}
      <g>
        <ellipse cx="50" cy="49" rx="5.4" ry="5.6" fill="#04101d" opacity="0.9" />
        <ellipse cx="70" cy="49" rx="5.4" ry="5.6" fill="#04101d" opacity="0.9" />
        <circle cx="50" cy="48" r="2.3" fill="#eafcff">
          {thinking && !reduced ? (
            <animate attributeName="r" values="2.3;1;2.3" dur="0.9s" repeatCount="indefinite" />
          ) : null}
        </circle>
        <circle cx="70" cy="48" r="2.3" fill="#eafcff">
          {thinking && !reduced ? (
            <animate
              attributeName="r"
              values="2.3;1;2.3"
              dur="0.9s"
              begin="0.15s"
              repeatCount="indefinite"
            />
          ) : null}
        </circle>
      </g>

      {/* visor scanline */}
      {reduced ? null : (
        <rect x="37.5" y="38" width="45" height="1.6" fill="#ffffff" opacity="0.35">
          <animate attributeName="y" values="38;58;38" dur="4.5s" repeatCount="indefinite" />
        </rect>
      )}

      {/* mouth vent */}
      <rect x="51" y="68" width="18" height="3.4" rx="1.7" fill="#5d6b96" />
      <rect x="55" y="68" width="2" height="3.4" fill="#3d496f" />
      <rect x="63" y="68" width="2" height="3.4" fill="#3d496f" />
    </motion.svg>
  );
}
