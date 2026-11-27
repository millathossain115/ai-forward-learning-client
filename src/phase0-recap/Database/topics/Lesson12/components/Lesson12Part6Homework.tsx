'use client';

import React, { useState } from 'react';
import { Building2, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON12_EXERCISES } from '../types';

export default function Lesson12Part6Homework() {
  const { language } = useLanguage();
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৬ • প্র্যাকটিস ল্যাব' : 'Part 6 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Distributed Systems Practice Lab"
              bn="৬. ডিস্ট্রিবিউটেড সিস্টেমস প্র্যাকটিস ল্যাব"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {LESSON12_EXERCISES.map((ex) => (
          <div key={ex.id} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">
                  {language === 'bn' ? ex.titleBn : ex.titleEn}
                </span>
                <button
                  onClick={() => toggleSolution(ex.id)}
                  className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{revealedSolutions[ex.id] ? (language === 'bn' ? 'লুকান' : 'Hide') : (language === 'bn' ? 'সমাধান' : 'Solution')}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {language === 'bn' ? ex.problemBn : ex.problemEn}
              </p>
            </div>
            {revealedSolutions[ex.id] && (
              <pre className="p-3 bg-black/60 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                {ex.sol}
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
