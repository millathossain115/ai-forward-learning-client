'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson13Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-emerald-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'লেসন ১৩ • NoSQL ও আধুনিক ডেটাবেস' : 'Lesson 13 of 18 • NoSQL Systems'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'MongoDB, Redis ও শার্ডিং' : 'MongoDB, Redis & Sharding'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 13: NoSQL & Modern Database Systems"
            bn="লেসন ১৩: NoSQL ও আধুনিক ডেটাবেস সিস্টেমস"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="Document, Key-Value, Columnar, Graph & Sharding"
              bn="Document, Key-Value, Columnar, Graph ও শার্ডিং"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Explore non-relational architectures built for web-scale throughput: SQL vs NoSQL trade-offs, the 4 core NoSQL models, MongoDB CRUD shell, Horizontal Sharding, BASE vs ACID, and Polyglot Persistence (Vector & Time-Series DBs)."
          bn="ওয়েব-স্কেল ডেটার জন্য তৈরি নন-রিলেশনাল ডেটাবেস শিখুন: SQL বনাম NoSQL, ৪টি প্রধান NoSQL মডেল, MongoDB CRUD, হরাইজন্টাল শার্ডিং, BASE বনাম ACID ও Polyglot Persistence।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="SQL vs NoSQL & BASE" bn="SQL বনাম NoSQL ও BASE" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="4 NoSQL Models & MongoDB CRUD" bn="৪টি মডেল ও MongoDB CRUD" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="Sharding Router & CAP" bn="শার্ডিং রাউটার ও CAP" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="Polyglot & Interview Q&A" bn="Polyglot ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
