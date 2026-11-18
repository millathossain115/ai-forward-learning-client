'use client';

import React from 'react';
import { useLanguage, LanguageMode } from '@/context/LanguageContext';

interface DualTextProps {
  en: React.ReactNode;
  bn: React.ReactNode;
  modeOverride?: LanguageMode;
  inline?: boolean;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  enClassName?: string;
  bnClassName?: string;
}

export default function DualText({
  en,
  bn,
  modeOverride,
  inline = false,
  as: Component = 'div',
  className = '',
  enClassName = '',
  bnClassName = '',
}: DualTextProps) {
  const { language } = useLanguage();
  const currentMode = modeOverride || language;

  if (currentMode === 'en') {
    return <Component className={`${className} ${enClassName}`.trim()}>{en}</Component>;
  }

  if (currentMode === 'bn') {
    return <Component className={`${className} ${bnClassName}`.trim()}>{bn}</Component>;
  }

  // Dual mode (Bilingual)
  if (inline) {
    return (
      <Component className={className}>
        <span className={enClassName}>{en}</span>
        <span className={`ml-1.5 text-zinc-400 font-normal ${bnClassName}`.trim()}>({bn})</span>
      </Component>
    );
  }

  return (
    <Component className={`space-y-1 ${className}`.trim()}>
      <div className={enClassName}>{en}</div>
      <div
        className={`text-xs text-indigo-300/90 font-sans border-l-2 border-indigo-500/40 pl-2.5 py-0.5 leading-relaxed ${bnClassName}`.trim()}
      >
        {bn}
      </div>
    </Component>
  );
}
