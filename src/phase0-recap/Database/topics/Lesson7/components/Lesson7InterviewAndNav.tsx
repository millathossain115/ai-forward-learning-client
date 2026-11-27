'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INTERVIEW_QA } from '../types';

interface Lesson7InterviewAndNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson7InterviewAndNav({ onNavigate }: Lesson7InterviewAndNavProps) {
  const { language } = useLanguage();
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* PART 16: SELECTIVE INTERVIEW & EXAM Q&A */}
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <BookOpen className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ১৭ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 17 • Selective Interview Q&A'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="Selective Interview & Exam Questions"
                bn="বাছাইকৃত ইন্টারভিউ ও পরীক্ষার প্রশ্নোত্তর"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-400 leading-relaxed font-sans"
          en="Click any question below to reveal the model answer:"
          bn="উত্তর দেখতে নিচের যেকোনো প্রশ্নে ক্লিক করুন:"
        />

        <div className="space-y-2.5">
          {INTERVIEW_QA.map(item => (
            <div key={item.id} className="rounded-xl border border-white/[0.08] bg-[#131824] overflow-hidden">
              <button
                onClick={() => toggleExamQ(item.id)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-medium text-zinc-100 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? item.qBn : item.qEn}</span>
                {openExamQ[item.id] ? <ChevronUp className="w-4 h-4 stroke-[1.5] text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 stroke-[1.5] text-zinc-500 shrink-0" />}
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
            <DualText as="span" en="Next in Series • Relational Design Mastery" bn="পরবর্তী অধ্যায় • রিলেশনাল ডিজাইন" />
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">
            Module 8
          </span>
        </div>

        <h3 className="text-base font-semibold text-zinc-100">
          <DualText
            as="span"
            en="Lesson 8: Database Normalization (1NF, 2NF, 3NF, BCNF)"
            bn="লেসন ৮: ডেটাবেস নরমালাইজেশন (1NF, 2NF, 3NF, BCNF)"
          />
        </h3>

        <DualText
          as="p"
          className="text-xs text-zinc-400 leading-relaxed font-sans"
          en="In Lesson 8, we explore database normalization: eliminating data anomalies (Insertion, Update, Deletion), functional dependencies, and First, Second, Third, and Boyce-Codd Normal Forms."
          bn="লেসন ৮-এ আমরা শিখব ডেটাবেস নরমালাইজেশন: ডেটা অ্যানোমালি (Insertion, Update, Deletion) দূর করা, ফাংশনাল ডিপেনডেন্সি এবং 1NF, 2NF, 3NF ও BCNF।"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('db-lesson6')}
            className="px-4 py-2 rounded-lg bg-[#131824] hover:bg-[#1a2130] text-zinc-200 font-medium text-xs flex items-center gap-2 transition-colors border border-white/[0.08] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <DualText as="span" en="Review Lesson 6: SQL Basics" bn="লেসন ৬ রিভিউ: SQL বেসিকস" />
          </button>
          <button
            onClick={() => onNavigate?.('db-lesson8')}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <DualText as="span" en="Go to Lesson 8: Database Normalization" bn="লেসন ৮-এ যান: ডেটাবেস নরমালাইজেশন" />
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </>
  );
}
