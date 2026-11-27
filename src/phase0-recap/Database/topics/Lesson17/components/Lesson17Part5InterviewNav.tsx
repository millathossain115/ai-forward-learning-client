'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON17_INTERVIEW_QA } from '../types';

interface Lesson17Part5InterviewNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson17Part5InterviewNav({ onNavigate }: Lesson17Part5InterviewNavProps) {
  const { language } = useLanguage();
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setOpenExamQ(Object.fromEntries(LESSON17_INTERVIEW_QA.map((q) => [q.id, true])));
  };

  const collapseAll = () => {
    setOpenExamQ({});
  };

  return (
    <>
      {/* PART 5: SELECTIVE INTERVIEW QUESTIONS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                {language === 'bn' ? 'পার্ট ৫ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 5 of 5 • Interview Prep'}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                <DualText
                  as="span"
                  en="Selective Technical Interview Questions (DW & Data Mining)"
                  bn="৫. বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (DW ও মাইনিং)"
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
          {LESSON17_INTERVIEW_QA.map((item) => (
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
      <div className="p-6 rounded-2xl bg-[#15171e] border border-cyan-500/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 font-bold">
            <DualText as="span" en="Final Capstone • Complete Revision" bn="সর্বশেষ অধ্যায় • পূর্ণাঙ্গ রিভিশন" />
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
            Module 18 Preview
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            as="span"
            en="Lesson 18: Complete DBMS Revision & Mock Exam"
            bn="লেসন ১৮: সম্পূর্ণ DBMS রিভিশন ও মক পরীক্ষা"
          />
        </h3>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Synthesize all 17 lessons from Data & ER Modeling to Normalization, ACID, Indexing, Security, and Distributed Systems."
          bn="লেসন ১ থেকে ১৭ পর্যন্ত সব টপিকের চূড়ান্ত রিভিশন ও ৬০ নম্বরের মক পরীক্ষা।"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson16')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লেসন ১৬: DDBMS' : 'Review Lesson 16: DDBMS'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson18')}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'পরবর্তী: লেসন ১৮ (ফাইনাল রিভিশন)' : 'Go to Lesson 18: Final Revision'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
