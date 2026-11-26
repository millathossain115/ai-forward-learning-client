'use client';

import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { selectiveInterviewQuestions } from '../types';

export default function Lesson6Part20InterviewPrep() {
  const { language } = useLanguage();
  const [openExamQuestions, setOpenExamQuestions] = useState<Record<string, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllExamQ = () => {
    const all: Record<string, boolean> = {};
    for (let i = 1; i <= 10; i++) all[`sq${i}`] = true;
    setOpenExamQuestions(all);
  };

  const collapseAllExamQ = () => {
    const all: Record<string, boolean> = {};
    for (let i = 1; i <= 10; i++) all[`sq${i}`] = false;
    setOpenExamQuestions(all);
  };

  return (
    <>
{/* ========================================================
          PART 20: SELECTIVE TECHNICAL INTERVIEW QUESTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
                {language === 'bn' ? 'পার্ট ১৩ • বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রস্তুতি' : 'Part 13 of 13 • Interview Prep'}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                <DualText
                  en="Selective Technical Interview Questions (SQL & Relational Queries)"
                  bn="বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (SQL ও রিলেশনাল কুয়েরি)"
                />
              </h2>
            </div>
          </div>

          {/* Global Expand / Collapse Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={expandAllExamQ}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 transition-all cursor-pointer"
            >
              {language === 'bn' ? 'সব প্রসারিত করুন' : 'Expand All'}
            </button>
            <button
              onClick={collapseAllExamQ}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 transition-all cursor-pointer"
            >
              {language === 'bn' ? 'সব বন্ধ করুন' : 'Collapse All'}
            </button>
          </div>
        </div>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Review high-frequency SQL technical interview questions with architectural summaries, core takeaways, and model answers:"
            bn="সফটওয়্যার ইঞ্জিনিয়ারিং ইন্টারভিউ ও পরীক্ষার জন্য সর্বাধিক জিজ্ঞাসিত ১০টি টেকনিক্যাল প্রশ্নের বিস্তারিত আর্কিটেকচারাল ব্যাখ্যা ও সমাধান:"
          />
        </div>

        {/* 10 Selective Interview Questions Accordion */}
        <div className="space-y-3">
          {selectiveInterviewQuestions.map((item, idx) => {
            const isOpen = !!openExamQuestions[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-[#0e1222] overflow-hidden transition-all shadow-md hover:border-slate-700"
              >
                <button
                  onClick={() => toggleExamQ(item.id)}
                  className="w-full p-4 text-left flex items-start sm:items-center justify-between gap-3 text-xs md:text-sm font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 w-fit shrink-0">
                      Q{idx + 1} • {language === 'bn' ? item.tagBn : item.tagEn}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 w-fit shrink-0">
                      {language === 'bn' ? item.difficultyBn : item.difficultyEn}
                    </span>
                    <span className="font-semibold text-zinc-100 font-sans truncate">
                      {language === 'bn' ? item.qBn : item.qEn}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-zinc-400 shrink-0 mt-0.5 sm:mt-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 md:p-5 bg-[#090c18] border-t border-slate-800/80 space-y-3 text-xs leading-relaxed font-sans animate-in fade-in duration-150">
                    {/* Summary Card */}
                    <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">
                      <strong className="text-cyan-300 block font-mono text-[11px] uppercase tracking-wider mb-1">
                        {language === 'bn' ? 'মূল সিদ্ধান্ত ও সামারি:' : 'Architectural Summary:'}
                      </strong>
                      <p className="text-zinc-200 text-xs leading-relaxed">
                        {language === 'bn' ? item.summaryBn : item.summaryEn}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                        {language === 'bn' ? 'গুরুত্বপূর্ণ টেকনিক্যাল পয়েন্টসমূহ:' : 'Key Technical Points:'}
                      </span>
                      <ul className="space-y-1.5 pl-4 list-disc marker:text-cyan-400 text-zinc-300 text-xs">
                        {(language === 'bn' ? item.bulletsBn : item.bulletsEn).map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick SQL Cheat Sheet */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? 'ইন্টারভিউ ও পরীক্ষার জন্য কুইক সিনট্যাক্স চিটশিট' : 'Interview & Exam Syntax Quick Cheat Sheet'}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 font-mono text-[11px] text-zinc-300">
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">CREATE TABLE</span>
              <code>CREATE TABLE t (id INT PK, name VARCHAR(50));</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">INSERT INTO</span>
              <code>INSERT INTO t VALUES (1, &apos;Data&apos;);</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">SELECT + WHERE</span>
              <code>SELECT * FROM t WHERE id = 1;</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">UPDATE + WHERE</span>
              <code>UPDATE t SET name=&apos;X&apos; WHERE id=1;</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">DELETE + WHERE</span>
              <code>DELETE FROM t WHERE id=1;</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">INNER JOIN</span>
              <code>SELECT * FROM a JOIN b ON a.id = b.a_id;</code>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
