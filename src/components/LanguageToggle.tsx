'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage, LanguageMode } from '@/context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

const OPTIONS: { id: LanguageMode; label: string; title: string }[] = [
  { id: 'en', label: 'EN', title: 'English only' },
  { id: 'bn', label: 'বাংলা', title: 'Bengali only' },
  { id: 'dual', label: 'Dual', title: 'English terms with Bengali explanations' },
];

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-[#15171e] border border-white/[0.08] ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Languages
        className="w-3.5 h-3.5 text-[#686c7d] mx-1.5 hidden sm:block shrink-0"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      {OPTIONS.map((opt) => {
        const isActive = language === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setLanguage(opt.id)}
            title={opt.title}
            className={`px-2 py-1 rounded-md text-[11px] font-mono font-medium leading-none transition-colors cursor-pointer ${
              isActive
                ? 'bg-[#f4f4f7] text-[#090a0d]'
                : 'text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
