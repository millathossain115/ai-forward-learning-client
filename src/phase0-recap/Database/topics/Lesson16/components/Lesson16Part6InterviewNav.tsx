'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { LESSON16_INTERVIEW_QA } from '../types';

interface Lesson16Part6InterviewNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson16Part6InterviewNav({ onNavigate }: Lesson16Part6InterviewNavProps) {
  const { language } = useLanguage();
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setOpenExamQ(Object.fromEntries(LESSON16_INTERVIEW_QA.map((q) => [q.id, true])));
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
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                {language === 'bn' ? 'পার্ট ৬ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 6 of 6 • Interview Prep'}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                <DualText
                  as="span"
                  en="Selective Technical Interview Questions (DDBMS & Cloud)"
                  bn="৬. বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (DDBMS)"
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
          {LESSON16_INTERVIEW_QA.map((item) => (
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
            <DualText as="span" en="Next in Series • Analytics & BI" bn="পরবর্তী অধ্যায় • অ্যানালিটিক্স ও BI" />
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
            Module 17 Preview
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            as="span"
            en="Lesson 17: Data Warehousing & Data Mining"
            bn="লেসন ১৭: ডেটা ওয়্যারহাউজিং ও ডেটা মাইনিং"
          />
        </h3>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Explore OLTP vs OLAP, ETL pipelines, Star & Snowflake schemas, and Data Mining KDD techniques."
          bn="OLTP বনাম OLAP, ETL পাইপলাইন, Star ও Snowflake স্কিমা এবং ডেটা মাইনিং শিখুন।"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson15')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লেসন ১৫: DBA' : 'Review Lesson 15: DBA Operations'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson17')}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'পরবর্তী: লেসন ১৭ (ডেটা ওয়্যারহাউজিং)' : 'Go to Lesson 17: Data Warehousing'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
