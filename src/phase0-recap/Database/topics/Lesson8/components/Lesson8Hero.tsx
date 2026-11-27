'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson8Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-indigo-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ৮ • ডেটাবেস নরমালাইজেশন' : 'Lesson 8 of 18 • Normalization'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'স্কিমা ডিজাইন মাস্টারি' : 'Schema Design Mastery'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText as="span" en="Lesson 8: Database Normalization" bn="লেসন ৮: ডেটাবেস নরমালাইজেশন" />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="1NF, 2NF, 3NF & BCNF Step-by-Step"
              bn="1NF, 2NF, 3NF ও BCNF ধাপে ধাপে"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Eliminate data redundancy, prevent insertion/update/deletion anomalies, master Functional Dependencies (A → B), and decompose monolithic tables into clean, lossless 3NF/BCNF schemas."
          bn="ডেটা ডুপ্লিকেসি দূর করুন, Insertion/Update/Deletion অ্যানোমালি প্রতিরোধ করুন, Functional Dependency (A → B) বুঝুন এবং বড় টেবিলকে নিখুঁত 3NF ও BCNF স্কিমায় রূপান্তর করুন।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="Insertion, Update & Deletion Anomalies" bn="Insertion, Update ও Deletion অ্যানোমালি" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="Full, Partial & Transitive FDs" bn="Full, Partial ও Transitive FD" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>1NF → 2NF → 3NF → BCNF</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="Practice Lab & Selective Interview Q&A" bn="প্র্যাকটিস ল্যাব ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
