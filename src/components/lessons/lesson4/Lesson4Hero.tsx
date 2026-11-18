'use client';

import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Workflow, CheckCircle2 } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import DualText from '@/components/DualText';

interface Lesson4HeroProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson4Hero({ onNavigate }: Lesson4HeroProps) {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d1020] to-[#070810] border border-[#202744] p-6 md:p-8 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Actions: Lesson Status & Language Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn'
              ? 'লেসন ৪ • রিলেশনাল কি ও ইন্টিগ্রিটি'
              : language === 'en'
              ? 'Lesson 4 • Relational Keys & Integrity'
              : 'Lesson 4 • Relational Keys & Integrity (রিলেশনাল কি ও ইন্টিগ্রিটি)'}
          </span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            {language === 'bn' ? 'মৌলিক ডেটাবেস কোর্স' : 'Beginner Level DBMS'}
          </span>
        </div>

        <LanguageToggle />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            <DualText
              en="Lesson 4: Keys in DBMS – Complete Beginner's Guide"
              bn="লেসন ৪: ডিবিএমএস-এ কি (Keys in DBMS) – প্রাথমিক থেকে অ্যাডভান্সড পূর্ণাঙ্গ গাইড"
            />
          </h1>

          <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Welcome to Lesson 4! Today, we study one of the most critical topics in DBMS: Keys. Keys are essential because they uniquely identify records, prevent unwanted duplication, and establish unbreakable relationships between tables."
              bn="লেসন ৪-এ স্বাগতম! আজ আমরা ডিবিএমএস-এর সবচেয়ে গুরুত্বপূর্ণ বিষয় 'কি (Keys)' নিয়ে বিস্তারিত আলোচনা করব। ডেটাবেস টেবিলে প্রতিটি রেকর্ডকে অদ্বিতীয়ভাবে চেনা, ভুলবশত ডুপ্লিকেট রোধ করা এবং টেবিলগুলোর মধ্যে নির্ভরযোগ্য সংযোগ স্থাপনে কী-এর কোনো বিকল্প নেই।"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onNavigate?.('backend-lesson5')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
          >
            <Workflow className="w-4 h-4" />
            <span>
              {language === 'bn' ? 'পরবর্তী: লেসন ৫ (ই-আর মডেল)' : 'Next: Lesson 5 (ER Model)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson3')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'লেসন ৩-এ ফিরে যান' : 'Back to Lesson 3'}</span>
          </button>
        </div>
      </div>

      {/* Lesson 3 Recap Ribbon */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            {language === 'bn' ? 'লেসন ৩ থেকে দ্রুত পুনরাবৃত্তি (Recap):' : 'Quick Recap from Lesson 3:'}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-indigo-400 block">Relation:</strong>
            <span className="text-[11px] text-zinc-400">
              {language === 'bn' ? 'টেবিল (Table)' : 'Table'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-cyan-400 block">Tuple:</strong>
            <span className="text-[11px] text-zinc-400">
              {language === 'bn' ? 'রো / রেকর্ড (Row)' : 'Row / Record'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-purple-400 block">Attribute:</strong>
            <span className="text-[11px] text-zinc-400">
              {language === 'bn' ? 'কলাম / ফিল্ড (Column)' : 'Column / Field'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-pink-400 block">Degree:</strong>
            <span className="text-[11px] text-zinc-400">
              {language === 'bn' ? 'কলাম সংখ্যা' : 'Column Count'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-emerald-400 block">Cardinality:</strong>
            <span className="text-[11px] text-zinc-400">
              {language === 'bn' ? 'সারি সংখ্যা' : 'Row Count'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
