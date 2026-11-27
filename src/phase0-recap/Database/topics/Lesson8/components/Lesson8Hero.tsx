'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson8Hero() {
  const { language } = useLanguage();

  return (
    <div className="rounded-2xl bg-[#0d1117] border border-white/[0.08] p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-medium">
            {language === 'bn' ? 'লেসন ৮ / ১৮' : 'Lesson 8 of 18'}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-400 border border-white/[0.08]">
            {language === 'bn' ? 'স্কিমা ডিজাইন মাস্টারি' : 'Schema Design Mastery'}
          </span>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-4xl font-semibold text-zinc-100 tracking-tight leading-tight">
            <DualText as="span" en="Lesson 8: Database Normalization" bn="লেসন ৮: ডেটাবেস নরমালাইজেশন" />
          </h1>
          <p className="text-base md:text-lg font-medium text-cyan-300">
            <DualText
              as="span"
              en="1NF, 2NF, 3NF & BCNF Step-by-Step"
              bn="1NF, 2NF, 3NF ও BCNF ধাপে ধাপে"
            />
          </p>
        </div>

        <DualText
          as="p"
          className="text-zinc-400 text-sm max-w-3xl leading-relaxed font-sans"
          en="Eliminate data redundancy, prevent insertion, update, and deletion anomalies, and decompose monolithic tables into clean, lossless 3NF and BCNF schemas."
          bn="ডেটা ডুপ্লিকেসি দূর করুন, Insertion, Update ও Deletion অ্যানোমালি প্রতিরোধ করুন এবং বড় টেবিলকে নিখুঁত 3NF ও BCNF স্কিমায় রূপান্তর করুন।"
        />

        <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="Insertion, Update & Deletion Anomalies" bn="Insertion, Update ও Deletion অ্যানোমালি" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="Full, Partial & Transitive FDs" bn="Full, Partial ও Transitive FD" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <span>1NF → 2NF → 3NF → BCNF</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="Practice Lab & Selective Interview Q&A" bn="প্র্যাকটিস ল্যাব ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
