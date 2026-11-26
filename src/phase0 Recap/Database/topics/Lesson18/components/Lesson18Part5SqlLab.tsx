'use client';

import React, { useState } from 'react';
import { Check, Copy, Eye, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON18_SQL_TASKS } from '../types';

export default function Lesson18Part5SqlLab() {
  const { language } = useLanguage();
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [copiedNum, setCopiedNum] = useState<number | null>(null);

  const toggle = (num: number) => {
    setRevealed((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const handleCopy = (sql: string, num: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedNum(num);
    setTimeout(() => setCopiedNum(null), 1800);
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৫ • SQL প্র্যাকটিক্যাল ল্যাব' : 'Part 5 of 6 • SQL Practical Lab'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Capstone SQL Practical Lab (Employees Schema)"
              bn="৫. ক্যাপস্টোন SQL প্র্যাকটিক্যাল ল্যাব (Employees স্কিমা)"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {LESSON18_SQL_TASKS.map((t) => (
          <div key={t.num} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-white font-sans">
                {language === 'bn' ? t.bn : t.en}
              </span>
              <button
                onClick={() => toggle(t.num)}
                className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{revealed[t.num] ? (language === 'bn' ? 'লুকান' : 'Hide') : (language === 'bn' ? 'সমাধান' : 'Solution')}</span>
              </button>
            </div>

            {revealed[t.num] && (
              <div className="relative">
                <button
                  onClick={() => handleCopy(t.sql, t.num)}
                  className="absolute right-2 top-2 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  {copiedNum === t.num ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNum === t.num ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="p-3 bg-black/60 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                  {t.sql}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
