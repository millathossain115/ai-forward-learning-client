'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON8_INTERVIEW_QA } from '../types';

interface Lesson8Part8InterviewNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson8Part8InterviewNav({ onNavigate }: Lesson8Part8InterviewNavProps) {
  const { language } = useLanguage();
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setOpenExamQ(Object.fromEntries(LESSON8_INTERVIEW_QA.map((q) => [q.id, true])));
  };

  const collapseAll = () => {
    setOpenExamQ({});
  };

  return (
    <>
      {/* PART 8: SELECTIVE INTERVIEW QUESTIONS */}
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
              <Briefcase className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'পার্ট ৮ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 8 of 8 • Interview Prep'}
              </span>
              <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
                <DualText
                  as="span"
                  en="Selective Technical Interview Questions (Normalization)"
                  bn="৮. বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (নরমালাইজেশন)"
                />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-[#131824] hover:bg-[#1a2130] text-zinc-300 text-xs font-mono border border-white/[0.08] cursor-pointer transition-colors"
            >
              {language === 'bn' ? 'সব প্রসারিত করুন' : 'Expand All'}
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-[#131824] hover:bg-[#1a2130] text-zinc-300 text-xs font-mono border border-white/[0.08] cursor-pointer transition-colors"
            >
              {language === 'bn' ? 'সব বন্ধ করুন' : 'Collapse All'}
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {LESSON8_INTERVIEW_QA.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/[0.08] bg-[#131824] overflow-hidden">
              <button
                onClick={() => toggleExamQ(item.id)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-xs font-medium text-zinc-100 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? item.qBn : item.qEn}</span>
                {openExamQ[item.id] ? (
                  <ChevronUp className="w-4 h-4 stroke-[1.5] text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[1.5] text-zinc-500 shrink-0" />
                )}
              </button>
              {openExamQ[item.id] && (
                <div className="p-3.5 bg-[#0a0d14] border-t border-white/[0.08] text-xs text-zinc-300 leading-relaxed font-sans">
                  {language === 'bn' ? item.aBn : item.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NAVIGATION BRIDGE */}
      <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">
            <DualText as="span" en="Next in Series • Concurrency & Reliability" bn="পরবর্তী অধ্যায় • কনকারেন্সি ও নির্ভরযোগ্যতা" />
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">
            Module 9
          </span>
        </div>

        <h3 className="text-base font-semibold text-zinc-100">
          <DualText
            as="span"
            en="Lesson 9: Database Transactions & Concurrency Control"
            bn="লেসন ৯: ডেটাবেস ট্রানজ্যাকশন ও কনকারেন্সি কন্ট্রোল"
          />
        </h3>

        <DualText
          as="p"
          className="text-xs text-zinc-400 leading-relaxed font-sans"
          en="Explore transactional integrity: ACID properties, transaction state machines, COMMIT & ROLLBACK, concurrency anomalies, Two-Phase Locking (2PL), and deadlock recovery."
          bn="ট্রানজ্যাকশনাল ইন্টিগ্রিটি শিখুন: ACID প্রোপার্টি, COMMIT ও ROLLBACK, কনকারেন্সি অ্যানোমালি, 2PL এবং ডেডলক রিকভারি।"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('db-lesson7')}
            className="px-4 py-2 rounded-lg bg-[#131824] hover:bg-[#1a2130] text-zinc-200 font-medium text-xs flex items-center gap-2 transition-colors border border-white/[0.08] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>{language === 'bn' ? 'লেসন ৭: অ্যাডভান্সড SQL' : 'Review Lesson 7: Advanced SQL'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('db-lesson9')}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'পরবর্তী: লেসন ৯ (ট্রানজ্যাকশন)' : 'Go to Lesson 9: Transactions & Concurrency'}</span>
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </>
  );
}
