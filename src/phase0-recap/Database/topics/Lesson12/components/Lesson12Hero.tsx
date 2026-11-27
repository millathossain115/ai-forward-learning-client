'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson12Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-cyan-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১২ • ডিস্ট্রিবিউটেড ডেটাবেস' : 'Lesson 12 of 18 • DDBMS'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'CAP, 2PC ও শার্ডিং' : 'CAP, 2PC & Sharding'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 12: Distributed Databases & DDBMS"
            bn="লেসন ১২: ডিস্ট্রিবিউটেড ডেটাবেস ও DDBMS"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="Fragmentation, Replication, 2PC & CAP Theorem"
              bn="ফ্র্যাগমেন্টেশন, রেপ্লিকেশন, 2PC ও CAP থিওরেম"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Scale databases horizontally across global nodes: DDBMS architectures, Distribution Transparency, Horizontal/Vertical fragmentation, Primary-Replica sync, Two-Phase Commit (2PC), Brewer's CAP Theorem, and Consistency models."
          bn="বিশ্বব্যাপী একাধিক নোডে ডেটাবেস স্কেল করা শিখুন: DDBMS আর্কিটেকচার, ট্রান্সপারেন্সি, ফ্র্যাগমেন্টেশন, রেপ্লিকেশন, Two-Phase Commit (2PC), CAP থিওরেম ও কনসিস্টেন্সি মডেল।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="DDBMS & Transparency" bn="DDBMS ও ট্রান্সপারেন্সি" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="Fragmentation & Replication" bn="ফ্র্যাগমেন্টেশন ও রেপ্লিকেশন" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="2PC Simulator & CAP" bn="2PC সিমুলেটর ও CAP" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="Practice Lab & Interview Q&A" bn="প্র্যাকটিস ল্যাব ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
