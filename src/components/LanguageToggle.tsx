'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage, LanguageMode } from '@/context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const options: { id: LanguageMode; label: string; title: string }[] = [
    { id: 'en', label: 'EN', title: 'English only' },
    { id: 'bn', label: 'বাংলা', title: 'Bengali only' },
    { id: 'dual', label: 'Dual (উভয়)', title: 'English terms with Bengali explanations' },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-lg bg-[#15171e] border border-white/[0.08] ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="flex items-center gap-1.5 px-2 text-[#9ca0b0] text-xs font-mono">
        <Languages className="w-4 h-4 text-[#686c7d]" strokeWidth={1.5} />
        <span className="hidden sm:inline text-xs font-medium text-[#9ca0b0]">Language</span>
      </div>

      <div className="flex items-center gap-0.5 bg-[#090a0d] p-0.5 rounded-md border border-white/[0.06]">
        {options.map((opt) => {
          const isActive = language === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setLanguage(opt.id)}
              title={opt.title}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
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
    </div>
  );
}
