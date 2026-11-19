'use client';

import React, { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson4Part5ExamPrep() {
  const { language } = useLanguage();

  const [expandedExamQuestions, setExpandedExamQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const toggleExamQuestion = (id: number) => {
    setExpandedExamQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const examQuestions = [
    {
      id: 1,
      qEn: 'Q1. What is a Primary Key?',
      qBn: 'প্রশ্ন ১: প্রাইমারি কী (Primary Key) কাকে বলে?',
      aEn: 'A Primary Key is a selected Candidate Key that uniquely identifies each tuple in a relation. It cannot contain duplicate values and strictly cannot contain NULL values.',
      aBn: 'প্রাইমারি কি হলো কোনো টেবিলের মনোনীত ক্যান্ডিডেট কি যা প্রতিটি সারিকে অদ্বিতীয়ভাবে শনাক্ত করে। এতে কখনো ডুপ্লিকেট মান থাকতে পারে না এবং কোনোভাবেই NULL মান গ্রহণযোগ্য নয়।',
    },
    {
      id: 2,
      qEn: 'Q2. What is a Foreign Key?',
      qBn: 'প্রশ্ন ২: ফরেন কী (Foreign Key) কী এবং এর কাজ কী?',
      aEn: 'A Foreign Key is an attribute or set of attributes in a relation that references a candidate key (commonly the Primary Key) of another table, enforcing referential integrity.',
      aBn: 'ফরেন কি হলো কোনো টেবিলের এমন একটি কলাম যা অন্য একটি প্যারেন্ট টেবিলের প্রাইমারি কি-কে রেফারেন্স করে এবং দুই টেবিলের মধ্যে রেফারেন্সিয়াল ইন্টিগ্রিটি বজায় রাখে।',
    },
    {
      id: 3,
      qEn: 'Q3. Define Candidate Key.',
      qBn: 'প্রশ্ন ৩: ক্যান্ডিডেট কী (Candidate Key)-এর সংজ্ঞা দাও।',
      aEn: 'A Candidate Key is a minimal Super Key that uniquely identifies each tuple in a relation without any redundant attributes.',
      aBn: 'ক্যান্ডিডেট কি হলো এমন একটি ন্যূনতম (Minimal) সুপার কি যা কোনো অতিরিক্ত বা অপ্রয়োজনীয় কলাম ছাড়াই টেবিলের প্রতিটি সারিকে অনন্যভাবে শনাক্ত করতে পারে।',
    },
    {
      id: 4,
      qEn: 'Q4. What is a Super Key?',
      qBn: 'প্রশ্ন ৪: সুপার কী (Super Key) কাকে বলে?',
      aEn: 'A Super Key is an attribute or combination of attributes that uniquely identifies each tuple in a relation. It may contain redundant or unnecessary attributes.',
      aBn: 'সুপার কি হলো এক বা একাধিক কলামের যেকোনো কম্বিনেশন যা একটি সারিকে ইউনিকভাবে শনাক্ত করতে পারে। এতে অতিরিক্ত বা অনাবশ্যক কলামও থাকতে পারে।',
    },
    {
      id: 5,
      qEn: 'Q5. What is an Alternate Key?',
      qBn: 'প্রশ্ন ৫: অল্টারনেট কী (Alternate Key) বলতে কী বোঝায়?',
      aEn: 'An Alternate Key is a Candidate Key that has not been selected as the Primary Key of the table.',
      aBn: 'টেবিলের একাধিক ক্যান্ডিডেট কি-এর মধ্য থেকে যেগুলোকে প্রাইমারি কি হিসেবে বেছে নেওয়া হয়নি, তাদের অল্টারনেট বা বিকল্প কি বলে।',
    },
    {
      id: 6,
      qEn: 'Q6. What is a Composite Key?',
      qBn: 'প্রশ্ন ৬: কম্পোজিট কী (Composite Key) কী?',
      aEn: 'A Composite Key is a key formed by combining two or more attributes together to collectively identify each tuple uniquely.',
      aBn: 'কম্পোজিট কি হলো দুই বা ততোধিক কলামের সমষ্টি যা যৌথভাবে কোনো টেবিলের প্রতিটি সারিকে অদ্বিতীয়ভাবে শনাক্ত করতে ব্যবহৃত হয়।',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৬ / ৮' : 'Part 6 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="University Exam Preparation (Short & Long Q&A)"
              bn="বিশ্ববিদ্যালয় পরীক্ষার প্রশ্নোত্তর ও প্রস্তুতি গাইড"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {examQuestions.map((item) => {
          const isExpanded = expandedExamQuestions[item.id];

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-[#121526] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExamQuestion(item.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <span className="text-xs md:text-sm font-bold text-white font-sans">
                  {language === 'bn' ? item.qBn : item.qEn}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-slate-800/60 bg-black/30">
                  <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
                    {language === 'bn' ? item.aBn : item.aEn}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
