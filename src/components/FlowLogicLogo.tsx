'use client';

import React from 'react';

interface FlowLogicLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const SIZE_MAP = {
  xs: { box: 'w-6 h-6', svg: 24, font: 'text-xs' },
  sm: { box: 'w-8 h-8', svg: 32, font: 'text-sm' },
  md: { box: 'w-10 h-10', svg: 40, font: 'text-base' },
  lg: { box: 'w-12 h-12', svg: 48, font: 'text-lg' },
  xl: { box: 'w-16 h-16', svg: 64, font: 'text-2xl' },
};

export default function FlowLogicLogo({
  size = 'md',
  className = '',
  showText = false
}: FlowLogicLogoProps) {
  const { box, svg, font } = SIZE_MAP[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Tech Vector Hex/Squircle Icon */}
      <div className={`relative ${box} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          width={svg}
          height={svg}
          className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background subtle cyber-mesh gradient */}
            <linearGradient id="fl-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141829" />
              <stop offset="50%" stopColor="#0d0f1a" />
              <stop offset="100%" stopColor="#07080e" />
            </linearGradient>

            {/* Glowing border gradient (Amber to Cyan) */}
            <linearGradient id="fl-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* F & L Path Gradient */}
            <linearGradient id="fl-core" x1="20%" y1="20%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="fl-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Squircle / Chamfered Hexagon Base */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="22"
            fill="url(#fl-bg)"
            stroke="url(#fl-border)"
            strokeWidth="3.5"
          />

          {/* Micro Grid Circuit Lines in Background */}
          <line x1="22" y1="50" x2="78" y2="50" stroke="#1c2238" strokeWidth="1" strokeDasharray="2,3" />
          <line x1="50" y1="22" x2="50" y2="78" stroke="#1c2238" strokeWidth="1" strokeDasharray="2,3" />

          {/* Core Symbol: Interlocking FL Logic Circuit */}
          {/* Main Spine (Shared Vertical Trunk) */}
          <path
            d="M 32 26 L 32 74"
            stroke="url(#fl-core)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Top 'F' Horizontal Arm */}
          <path
            d="M 32 28 L 68 28"
            stroke="url(#fl-core)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Middle 'F' Crossbar with logic step */}
          <path
            d="M 32 48 L 56 48"
            stroke="url(#fl-core)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />

          {/* Bottom 'L' Foundation Arm with data terminal */}
          <path
            d="M 32 72 L 72 72"
            stroke="url(#fl-core)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Glowing Neural Network / Database Logic Nodes (The Dots) */}
          {/* Node 1: Top Right of F */}
          <circle cx="68" cy="28" r="4.5" fill="#fde68a" filter="url(#fl-glow)" />
          <circle cx="68" cy="28" r="2.5" fill="#ffffff" />

          {/* Node 2: Mid Right of F */}
          <circle cx="56" cy="48" r="4" fill="#fbbf24" filter="url(#fl-glow)" />
          <circle cx="56" cy="48" r="2" fill="#ffffff" />

          {/* Node 3: Bottom Right of L */}
          <circle cx="72" cy="72" r="4.5" fill="#38bdf8" filter="url(#fl-glow)" />
          <circle cx="72" cy="72" r="2.5" fill="#ffffff" />

          {/* Node 4: Top Left Vertex */}
          <circle cx="32" cy="28" r="3" fill="#fbbf24" />
        </svg>
      </div>

      {/* Optional Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-zinc-100 ${font}`}>
              FORWARD<span className="text-amber-400">LEARNING</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-700/60 font-bold">
              FL DB
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Systems &amp; AI Engineering
          </span>
        </div>
      )}
    </div>
  );
}
