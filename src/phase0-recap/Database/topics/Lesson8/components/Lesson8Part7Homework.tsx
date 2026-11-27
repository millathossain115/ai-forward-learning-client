'use client';

import React, { useState } from 'react';
import { Building2, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON8_EXERCISES } from '../types';

export default function Lesson8Part7Homework() {
  const { language } = useLanguage();
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
          <Building2 className="w-4 h-4 stroke-[1.5]" />
        </div>
        <div>
          <span className="text-[11px] font-mono text-zinc-400">
            {language === 'bn' ? 'পার্ট ৭ • অনুশীলন ও সমাধান' : 'Part 7 of 8'}
          </span>
          <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
            <DualText
              as="span"
              en="Normalization Practice Lab & Solutions"
              bn="৭. নরমালাইজেশন প্র্যাকটিস ল্যাব ও সমাধান"
            />
          </h2>
        </div>
      </div>

      <DualText
        as="p"
        className="text-xs text-zinc-400 leading-relaxed font-sans"
        en="Solve these 4 decomposition problems and click Solution to verify your 1NF, 2NF, and 3NF steps:"
        bn="নিচের ৪টি ডিকম্পোজিশন সমস্যা সমাধান করুন এবং আপনার উত্তর যাচাই করতে সমাধান বাটনে ক্লিক করুন:"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {LESSON8_EXERCISES.map((ex) => (
          <div key={ex.id} className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-zinc-100 font-sans">
                  {language === 'bn' ? ex.titleBn : ex.titleEn}
                </span>
                <button
                  onClick={() => toggleSolution(ex.id)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-cyan-500/15 text-zinc-300 hover:text-cyan-300 border border-white/[0.08] text-[11px] font-mono cursor-pointer flex items-center gap-1 shrink-0 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>{revealedSolutions[ex.id] ? (language === 'bn' ? 'লুকান' : 'Hide') : (language === 'bn' ? 'সমাধান' : 'Solution')}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {language === 'bn' ? ex.problemBn : ex.problemEn}
              </p>
            </div>
            {revealedSolutions[ex.id] && (
              <pre className="p-3 bg-[#0a0d14] rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto border border-white/[0.08]">
                {ex.sol}
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
