'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson16Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1228] via-[#121c42] to-[#070b1a] border border-cyan-900/40 p-6 md:p-10 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১৬ • ডিস্ট্রিবিউটেড DB ও DDBMS' : 'Lesson 16 of 18 • DDBMS'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'ফ্র্যাগমেন্টেশন, 2PC ও CAP' : 'Fragmentation, 2PC & CAP'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 16: Distributed Databases & DDBMS"
            bn="লেসন ১৬: ডিস্ট্রিবিউটেড ডেটাবেস ও DDBMS"
          />
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            <DualText
              as="span"
              en="Architectures, Transparencies, 2PC & Cloud Scale"
              bn="আর্কিটেকচার, ট্রান্সপারেন্সি, 2PC ও ক্লাউড স্কেল"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Master enterprise distributed database engineering: Centralized vs Distributed trade-offs, P2P/3-Tier/Client-Server architectures, Homogeneous vs Heterogeneous DDBMS, 4 Transparencies, Fragmentation, 2PC, CAP Theorem, and Cloud DDBMS."
          bn="ডিস্ট্রিবিউটেড ডেটাবেস ইঞ্জিনিয়ারিং শিখুন: সেন্ট্রালাইজড বনাম ডিস্ট্রিবিউটেড, P2P/3-Tier/Client-Server, Homogeneous বনাম Heterogeneous, ৪টি ট্রান্সপারেন্সি, ফ্র্যাগমেন্টেশন, 2PC ও CAP থিওরেম।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="P2P, 3-Tier & Transparencies" bn="P2P, 3-Tier ও ট্রান্সপারেন্সি" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="Fragmentation & Replication" bn="ফ্র্যাগমেন্টেশন ও রেপ্লিকেশন" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="2PC & CAP Theorem" bn="2PC ও CAP থিওরেম" />
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
