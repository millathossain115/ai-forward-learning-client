'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson7Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-cyan-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ৭ • অ্যাডভান্সড SQL কুয়েরিজ' : 'Lesson 7 of 18 • Advanced SQL Queries'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'ইন্টারমিডিয়েট থেকে অ্যাডভান্সড' : 'Intermediate to Advanced'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 7: Advanced SQL Queries"
            bn="লেসন ৭: অ্যাডভান্সড SQL কুয়েরিজ"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="Subqueries, CTEs, Window Functions & Set Ops"
              bn="Subqueries, CTE, Window Functions ও Set Operations"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Level up from basic queries to complex relational problem solving: Single-row & multiple-row subqueries, correlated inner-outer evaluations, Common Table Expressions (WITH), set operations (UNION / INTERSECT / EXCEPT), and non-collapsing Window Functions."
          bn="বেসিক কুয়েরি থেকে জটিল রিলেশনাল সমস্যা সমাধানে উন্নীত হোন: Single-row ও Multiple-row subquery, Correlated কুয়েরি, Common Table Expressions (WITH), সেট অপারেশন (UNION / INTERSECT / EXCEPT) এবং Window Functions।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="Correlated Subqueries & EXISTS" bn="Correlated Subquery ও EXISTS" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="CTEs & Query Execution Order" bn="CTE ও কুয়েরি এক্সিকিউশন অর্ডার" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="OVER(PARTITION BY) & RANK()" bn="OVER(PARTITION BY) ও RANK()" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="Relational Division & Interview Q&A" bn="Relational Division ও ইন্টারভিউ প্রস্তুতি" />
          </div>
        </div>
      </div>
    </div>
  );
}
