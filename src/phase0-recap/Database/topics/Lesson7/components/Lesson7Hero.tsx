'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson7Hero() {
  const { language } = useLanguage();

  return (
    <div className="rounded-2xl bg-[#0d1117] border border-white/[0.08] p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-medium">
            {language === 'bn' ? 'লেসন ৭ / ১৮' : 'Lesson 7 of 18'}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-400 border border-white/[0.08]">
            {language === 'bn' ? 'ইন্টারমিডিয়েট থেকে অ্যাডভান্সড' : 'Intermediate to Advanced'}
          </span>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-4xl font-semibold text-zinc-100 tracking-tight leading-tight">
            <DualText
              as="span"
              en="Lesson 7: Advanced SQL Queries"
              bn="লেসন ৭: অ্যাডভান্সড SQL কুয়েরিজ"
            />
          </h1>
          <p className="text-base md:text-lg font-medium text-cyan-300">
            <DualText
              as="span"
              en="Subqueries, CTEs, Window Functions & Set Ops"
              bn="Subqueries, CTE, Window Functions ও Set Operations"
            />
          </p>
        </div>

        <DualText
          as="p"
          className="text-zinc-400 text-sm max-w-3xl leading-relaxed font-sans"
          en="Go beyond basic SELECTs to solve complex relational problems with nested queries, modular CTEs, set operations, and row-preserving window analytics."
          bn="বেসিক SELECT-এর গণ্ডি পেরিয়ে নেস্টেড কুয়েরি, মডিউলার CTE, সেট অপারেশন এবং Window analytics-এর মাধ্যমে জটিল রিলেশনাল সমস্যা সমাধান শিখুন।"
        />

        <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="Correlated Subqueries & EXISTS" bn="Correlated Subquery ও EXISTS" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="CTEs & Query Execution Order" bn="CTE ও কুয়েরি এক্সিকিউশন অর্ডার" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="OVER(PARTITION BY) & RANK()" bn="OVER(PARTITION BY) ও RANK()" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-zinc-400" />
            <DualText as="span" en="Relational Division & Interview Q&A" bn="Relational Division ও ইন্টারভিউ প্রস্তুতি" />
          </div>
        </div>
      </div>
    </div>
  );
}
