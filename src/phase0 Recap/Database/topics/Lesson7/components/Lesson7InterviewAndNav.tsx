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
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৬ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 16 • Selective Interview Q&A'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
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
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Click any question below to reveal the model answer:"
          bn="উত্তর দেখতে নিচের যেকোনো প্রশ্নে ক্লিক করুন:"
        />

        <div className="space-y-3">
          {INTERVIEW_QA.map(item => (
            <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
              <button
                onClick={() => toggleExamQ(item.id)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? item.qBn : item.qEn}</span>
                {openExamQ[item.id] ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-cyan-500/40 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <DualText as="span" en="Next in Series • Relational Design Mastery" bn="পরবর্তী অধ্যায় • রিলেশনাল ডিজাইন" />
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
            Module 8 Preview
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            as="span"
            en="Lesson 8: Database Normalization (1NF, 2NF, 3NF, BCNF)"
            bn="লেসন ৮: ডেটাবেস নরমালাইজেশন (1NF, 2NF, 3NF, BCNF)"
          />
        </h3>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="In Lesson 8, we explore database normalization: eliminating data anomalies (Insertion, Update, Deletion), functional dependencies, and First, Second, Third, and Boyce-Codd Normal Forms."
          bn="লেসন ৮-এ আমরা শিখব ডেটাবেস নরমালাইজেশন: ডেটা অ্যানোমালি (Insertion, Update, Deletion) দূর করা, ফাংশনাল ডিপেনডেন্সি এবং 1NF, 2NF, 3NF ও BCNF।"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson6')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <DualText as="span" en="Review Lesson 6: SQL Basics" bn="লেসন ৬ রিভিউ: SQL বেসিকস" />
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson8')}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
          >
            <DualText as="span" en="Go to Lesson 8: Database Normalization" bn="লেসন ৮-এ যান: ডেটাবেস নরমালাইজেশন" />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
