"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Illustrated "tech" avatar used in place of a photo: a stylised developer
 * bust — headphones, glasses with a code reflection, hoodie — drawn as vector
 * art so it stays crisp, themable and weightless.
 */
export default function TechAvatar({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Illustrated avatar of an AI engineer wearing headphones and glasses"
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#141b3d" />
          <stop offset="55%" stopColor="#0c1230" />
          <stop offset="100%" stopColor="#080c22" />
        </linearGradient>
        <linearGradient id="av-skin" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#b07a51" />
          <stop offset="55%" stopColor="#94603c" />
          <stop offset="100%" stopColor="#6f452a" />
        </linearGradient>
        <linearGradient id="av-hair" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#2b2438" />
          <stop offset="60%" stopColor="#181528" />
          <stop offset="100%" stopColor="#0d0b18" />
        </linearGradient>
        <linearGradient id="av-hoodie" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#4a3fd0" />
          <stop offset="45%" stopColor="#2f2a8f" />
          <stop offset="100%" stopColor="#181a52" />
        </linearGradient>
        <linearGradient id="av-lens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="av-cans" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a6798" />
          <stop offset="100%" stopColor="#262e52" />
        </linearGradient>
        <radialGradient id="av-glow" cx="50%" cy="42%" r="52%">
          <stop offset="0%" stopColor="#6d5cff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6d5cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* backdrop */}
      <rect width="400" height="400" fill="url(#av-bg)" />
      <circle cx="200" cy="176" r="150" fill="url(#av-glow)" />
      <g stroke="#8b5cf6" strokeOpacity="0.14" strokeWidth="1" fill="none">
        <path d="M0 300h96l26-26h74" />
        <path d="M400 268h-84l-24 24h-70" />
        <path d="M0 96h58l22 22" />
        <path d="M400 108h-62l-20 20" />
      </g>
      <g fill="#22d3ee" fillOpacity="0.5">
        <circle cx="122" cy="274" r="2.5" />
        <circle cx="292" cy="292" r="2.5" />
        <circle cx="80" cy="118" r="2" />
        <circle cx="318" cy="128" r="2" />
      </g>

      {/* shoulders / hoodie */}
      <path
        d="M92 400c0-52 44-82 108-82s108 30 108 82z"
        fill="url(#av-hoodie)"
      />
      {/* hood collar */}
      <path
        d="M136 330c14-20 34-30 64-30s50 10 64 30c-18 14-40 21-64 21s-46-7-64-21Z"
        fill="#20205e"
      />
      {/* zip + strings */}
      <path
        d="M200 322v78"
        stroke="#0f1236"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M180 336c-4 22-6 38-4 54M220 336c4 22 6 38 4 54"
        stroke="#c9d2ff"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* chest chip */}
      <rect x="238" y="352" width="26" height="20" rx="5" fill="#0d1236" />
      <rect x="243" y="357" width="16" height="10" rx="2.5" fill="url(#av-lens)" />

      {/* neck */}
      <path d="M176 268h48v44c0 10-48 10-48 0z" fill="#7d4f31" />

      {/* head */}
      <ellipse cx="200" cy="198" rx="61" ry="74" fill="url(#av-skin)" />
      {/* ears */}
      <ellipse cx="140" cy="206" rx="10" ry="15" fill="#8a5936" />
      <ellipse cx="260" cy="206" rx="10" ry="15" fill="#8a5936" />

      {/* hair — volume on top with a swept quiff */}
      <path
        d="M141 190c-6-30 2-56 22-70 14-10 32-14 48-11 26 4 44 20 48 44 2 12 1 25-2 37-3-12-8-21-15-27-6 8-16 12-30 13-22 2-40-2-52-10-8 8-14 15-17 24Z"
        fill="url(#av-hair)"
      />
      <path
        d="M186 110c14-6 34-5 48 6 8 6 13 14 16 23-9-12-21-20-36-23-10-2-19-4-28-6Z"
        fill="#443a63"
        fillOpacity="0.75"
      />
      <path
        d="M152 150c4-16 15-27 30-33-11 10-18 21-21 35-2 8-3 15-3 22-4-8-7-16-6-24Z"
        fill="#3a3350"
        fillOpacity="0.6"
      />

      {/* eyebrows */}
      <path
        d="M165 174c9-6 22-6 30-1M205 173c8-5 21-5 30 1"
        stroke="#241f33"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* eyes */}
      <ellipse cx="177" cy="196" rx="6.5" ry="6" fill="#23202e" />
      <ellipse cx="223" cy="196" rx="6.5" ry="6" fill="#23202e" />
      <circle cx="179" cy="194" r="2" fill="#ffffff" fillOpacity="0.85" />
      <circle cx="225" cy="194" r="2" fill="#ffffff" fillOpacity="0.85" />

      {/* glasses */}
      <g>
        <rect x="150" y="180" width="52" height="34" rx="12" fill="url(#av-lens)" />
        <rect x="198" y="180" width="52" height="34" rx="12" fill="url(#av-lens)" />
        <g stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="2.4" fill="none">
          <rect x="150" y="180" width="52" height="34" rx="12" />
          <rect x="198" y="180" width="52" height="34" rx="12" />
          <path d="M202 194h-4M150 190h-14M250 190h14" strokeLinecap="round" />
        </g>
        {/* code reflection */}
        <g
          stroke="#eafcff"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M158 190h14M158 197h22M158 204h10" />
          <path d="M206 190h18M206 197h11M206 204h20" />
        </g>
      </g>

      {/* nose + mouth */}
      <path
        d="M200 206c-3 10-6 15-2 18 2 2 6 2 8 0"
        stroke="#6b4128"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M185 243c10 8 20 8 30 0"
        stroke="#54301d"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* light beard along the jaw */}
      <path
        d="M147 216c2 26 12 44 26 53 9 6 18 9 27 9s18-3 27-9c14-9 24-27 26-53 3 26-2 45-14 58-11 12-24 18-39 18s-28-6-39-18c-12-13-17-32-14-58Z"
        fill="#1d1a2b"
        fillOpacity="0.42"
      />
      <path
        d="M184 232c5-3 11-3 16 0-5 4-11 4-16 0Z"
        fill="#1d1a2b"
        fillOpacity="0.5"
      />

      {/* headphones */}
      <path
        d="M126 204c0-46 33-82 74-82s74 36 74 82"
        stroke="url(#av-cans)"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="106" y="186" width="34" height="58" rx="16" fill="url(#av-cans)" />
      <rect x="260" y="186" width="34" height="58" rx="16" fill="url(#av-cans)" />
      <rect x="114" y="196" width="18" height="38" rx="9" fill="#0f1533" />
      <rect x="268" y="196" width="18" height="38" rx="9" fill="#0f1533" />
      <rect
        x="119"
        y="204"
        width="8"
        height="22"
        rx="4"
        fill="#22d3ee"
        fillOpacity="0.85"
      >
        {reduced ? null : (
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2.8s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      <rect
        x="273"
        y="204"
        width="8"
        height="22"
        rx="4"
        fill="#22d3ee"
        fillOpacity="0.85"
      >
        {reduced ? null : (
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2.8s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* mic boom */}
      <path
        d="M292 230c14 16 12 38-6 48"
        stroke="#5a6798"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="284" cy="282" r="7" fill="#8b5cf6" />
    </motion.svg>
  );
}
