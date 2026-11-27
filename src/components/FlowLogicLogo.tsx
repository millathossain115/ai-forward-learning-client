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
  showText = false,
}: FlowLogicLogoProps) {
  const { box, svg, font } = SIZE_MAP[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${box} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          width={svg}
          height={svg}
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="20"
            fill="#15171e"
            stroke="#2a2d3a"
            strokeWidth="3"
          />

          <line x1="22" y1="50" x2="78" y2="50" stroke="#232630" strokeWidth="1" strokeDasharray="2,3" />
          <line x1="50" y1="22" x2="50" y2="78" stroke="#232630" strokeWidth="1" strokeDasharray="2,3" />

          {/* Interlocking FL circuit */}
          <path d="M 32 26 L 32 74" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
          <path d="M 32 28 L 68 28" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
          <path d="M 32 48 L 56 48" stroke="#f59e0b" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M 32 72 L 72 72" stroke="#f4f4f7" strokeWidth="7" strokeLinecap="round" />

          <circle cx="68" cy="28" r="3.5" fill="#f59e0b" />
          <circle cx="56" cy="48" r="3.5" fill="#f59e0b" />
          <circle cx="72" cy="72" r="3.5" fill="#f4f4f7" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-semibold text-[#f4f4f7] leading-tight ${font}`}>
            Forward <span className="text-amber-400">Learning</span>
          </span>
          <span className="text-[11px] font-mono text-[#686c7d]">
            Systems &amp; AI Engineering
          </span>
        </div>
      )}
    </div>
  );
}
