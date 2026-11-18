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
    { id: 'en', label: 'EN', title: 'English Only (Strict exam view)' },
    { id: 'bn', label: 'বাংলা', title: 'বাংলা কেবল (সম্পূর্ণ বাংলা ধারণা)' },
    { id: 'dual', label: 'Dual (উভয়)', title: 'Bilingual (English terms + Bengali intuition)' },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-2xl bg-[#0d1020] border border-[#202744] shadow-lg ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="flex items-center gap-1 px-2 text-zinc-400 text-xs font-mono">
        <Languages className="w-3.5 h-3.5 text-indigo-400" />
        <span className="hidden sm:inline text-[11px] font-semibold text-zinc-400">Language:</span>
      </div>

      <div className="flex items-center bg-[#070914] p-0.5 rounded-xl border border-slate-800">
        {options.map((opt) => {
          const isActive = language === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setLanguage(opt.id)}
              title={opt.title}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
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
