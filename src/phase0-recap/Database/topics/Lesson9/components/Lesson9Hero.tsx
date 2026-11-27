'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson9Hero() {
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
            {language === 'bn' ? 'লেসন ৯ • ট্রানজ্যাকশন ও কনকারেন্সি' : 'Lesson 9 of 18 • Transactions'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'ACID, 2PL ও রিকভারি' : 'ACID, 2PL & Recovery'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 9: Transactions & Concurrency Control"
            bn="লেসন ৯: ডেটাবেস ট্রানজ্যাকশন ও কনকারেন্সি কন্ট্রোল"
          />
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            <DualText
              as="span"
              en="ACID, Serializability, 2PL, Deadlocks & WAL"
              bn="ACID, Serializability, 2PL, ডেডলক ও WAL রিকভারি"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Master how production databases guarantee zero data loss and concurrent safety: ACID properties, transaction state machines, COMMIT/ROLLBACK/SAVEPOINT, concurrency anomalies, Two-Phase Locking, Isolation Levels, and WAL recovery."
          bn="প্রোডাকশন ডেটাবেস কীভাবে ডেটা লস ছাড়াই হাজারো সমান্তরাল কুয়েরি নিরাপদে চালায় তা শিখুন: ACID, ট্রানজ্যাকশন স্টেট মেশিন, COMMIT/ROLLBACK/SAVEPOINT, কনকারেন্সি অ্যানোমালি, 2PL, আইসোলেশন লেভেল ও WAL।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="ACID & State Lifecycle" bn="ACID ও স্টেট লাইফসাইকেল" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="Dirty, Unrepeatable & Phantom Reads" bn="Dirty, Unrepeatable ও Phantom Read" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="2PL, Deadlocks & Isolation Matrix" bn="2PL, ডেডলক ও আইসোলেশন ম্যাট্রিক্স" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="WAL (UNDO/REDO) & Interview Q&A" bn="WAL (UNDO/REDO) ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
