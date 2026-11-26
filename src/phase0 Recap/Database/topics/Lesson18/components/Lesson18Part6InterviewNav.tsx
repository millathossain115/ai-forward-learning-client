'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON18_INTERVIEW_QA } from '../types';

interface Lesson18Part6InterviewNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson18Part6InterviewNav({ onNavigate }: Lesson18Part6InterviewNavProps) {
  const { language } = useLanguage();
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setOpenExamQ(Object.fromEntries(LESSON18_INTERVIEW_QA.map((q) => [q.id, true])));
  };

  const collapseAll = () => {
    setOpenExamQ({});
  };

  return (
    <>
      {/* PART 6: SELECTIVE INTERVIEW QUESTIONS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
                {language === 'bn' ? 'পার্ট ৬ • সিনিয়র DBMS ইন্টারভিউ প্রস্তুতি' : 'Part 6 of 6 • Final Interview Prep'}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                <DualText
                  as="span"
                  en="Selective Technical Interview Questions (Full-Stack DBMS)"
                  bn="৬. বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (সম্পূর্ণ DBMS)"
                />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 cursor-pointer"
            >
              {language === 'bn' ? 'সব প্রসারিত করুন' : 'Expand All'}
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 cursor-pointer"
            >
              {language === 'bn' ? 'সব বন্ধ করুন' : 'Collapse All'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {LESSON18_INTERVIEW_QA.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
              <button
                onClick={() => toggleExamQ(item.id)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-xs font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? item.qBn : item.qEn}</span>
                {openExamQ[item.id] ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>
              {openExamQ[item.id] && (
                <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans">
                  {language === 'bn' ? item.aBn : item.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NAVIGATION BRIDGE */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-amber-500/40 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <DualText as="span" en="Phase 1 Complete • Data Core Mastered" bn="ফেজ ১ সম্পন্ন • ডেটা কোর মাস্টারি" />
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            18 / 18 Lessons
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            as="span"
            en="Ready for Forward AI Engineering or Full Directory Review"
            bn="পরবর্তী AI ইঞ্জিনিয়ারিং অথবা সম্পূর্ণ ডিরেক্টরি রিভিউ করুন"
          />
        </h3>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson17')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লেসন ১৭: ডেটা ওয়্যারহাউজিং' : 'Review Lesson 17: Data Warehousing'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-basics')}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
          >
            <span>{language === 'bn' ? 'ডাটাবেস ডিরেক্টরিতে ফিরে যান' : 'Back to Database & DBMS Directory'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
