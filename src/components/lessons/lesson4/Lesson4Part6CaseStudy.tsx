'use client';

import React, { useState } from 'react';
import { Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson4Part6CaseStudyProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson4Part6CaseStudy({ onNavigate }: Lesson4Part6CaseStudyProps) {
  const { language } = useLanguage();

  const [revealedHomework, setRevealedHomework] = useState<Record<number, boolean>>({});

  const toggleHomework = (id: number) => {
    setRevealedHomework((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const caseStudyQuestions = [
    {
      id: 1,
      qEn: '1. Identify all Candidate Keys in this table.',
      qBn: '১. এই টেবিলের সকল ক্যান্ডিডেট কী শনাক্ত করুন।',
      aEn: 'Candidate Keys: {Employee_ID} and {Email}. Both can independently and minimally identify every employee uniquely.',
      aBn: 'ক্যান্ডিডেট কীসমূহ: {Employee_ID} এবং {Email}। উভয়েই স্বতন্ত্রভাবে ও ন্যূনতম কলাম দিয়ে প্রতিটি কর্মীকে অনন্যভাবে শনাক্ত করতে পারে।',
    },
    {
      id: 2,
      qEn: '2. If Employee_ID is selected as Primary Key, what is the Alternate Key?',
      qBn: '২. Employee_ID-কে প্রাইমারি কি হিসেবে নির্বাচন করলে অল্টারনেট কি কোনটি হবে?',
      aEn: 'Alternate Key: {Email}. It was a candidate key that was not chosen as the primary identifier.',
      aBn: 'অল্টারনেট কী: {Email}। এটি একটি ক্যান্ডিডেট কি ছিল যা প্রধান কি হিসেবে মনোনীত হয়নি।',
    },
    {
      id: 3,
      qEn: '3. Is {Employee_ID + Name} a Super Key?',
      qBn: '৩. {Employee_ID + Name} কি একটি সুপার কী?',
      aEn: 'YES! Because Employee_ID is already unique, adding Name will still uniquely identify every row. Any superset of a candidate key is a Super Key.',
      aBn: 'হ্যাঁ! কারণ Employee_ID একাই ইউনিক, তার সাথে Name যোগ করলেও তা প্রতিটি সারিকে ইউনিকভাবেই বের করবে। ক্যান্ডিডেট কি-এর যেকোনো সুপারসেটই একটি সুপার কী।',
    },
    {
      id: 4,
      qEn: '4. Is {Employee_ID + Name} a Candidate Key?',
      qBn: '৪. {Employee_ID + Name} কি একটি ক্যান্ডিডেট কী হতে পারে?',
      aEn: 'NO! A Candidate Key must be minimal. Since "Name" is redundant and can be removed without losing uniqueness, {Employee_ID + Name} is not minimal.',
      aBn: 'না! ক্যান্ডিডেট কি অবশ্যই ন্যূনতম হতে হবে। যেহেতু "Name" বাদ দিলেও ইউনিকনেস বজায় থাকে, তাই এটি ন্যূনতম নয়।',
    },
    {
      id: 5,
      qEn: '5. Can Department_ID be a Foreign Key?',
      qBn: '৫. Department_ID কি একটি ফরেন কী হতে পারে?',
      aEn: 'YES! Department_ID in EMPLOYEE can reference the Dept_ID Primary Key in the DEPARTMENT table.',
      aBn: 'হ্যাঁ! EMPLOYEE টেবিলের Department_ID প্যারেন্ট টেবিল DEPARTMENT-এর Dept_ID প্রাইমারি কি-কে রেফারেন্স করতে পারে।',
    },
    {
      id: 6,
      qEn: '6. Can Department_ID contain duplicate values in EMPLOYEE?',
      qBn: '৬. EMPLOYEE টেবিলে Department_ID কি ডুপ্লিকেট মান গ্রহণ করতে পারে?',
      aEn: 'YES! Notice that Rahim and Nila both have Department_ID = D01. Foreign keys are allowed to have duplicates because multiple employees work in the same department (1:N relationship).',
      aBn: 'হ্যাঁ! রহিম ও নীলা উভয়েরই Department_ID = D01। একই বিভাগে একাধিক কর্মী কাজ করতে পারে (1:N সম্পর্ক), তাই ফরেন কীতে ডুপ্লিকেট মান সম্পূর্ণ অনুমোদিত।',
    },
    {
      id: 7,
      qEn: '7. What happens if two employees try to register with the same Employee_ID?',
      qBn: '৭. দুজন কর্মী যদি একই Employee_ID দিয়ে নিবন্ধন করতে চায়, তবে কী ঘটবে?',
      aEn: 'The DBMS rejects the second insert with a "PRIMARY KEY constraint violation" error, keeping the database consistent.',
      aBn: 'ডেটাবেস ইঞ্জিন দ্বিতীয় ইনসার্টটিকে "PRIMARY KEY constraint violation" ত্রুটি প্রদর্শন করে প্রত্যাখ্যান করবে এবং ডেটার সামঞ্জস্য রক্ষা করবে।',
    },
    {
      id: 8,
      qEn: '8. Which key would you use to uniquely identify an employee?',
      qBn: '৮. কোনো কর্মীকে স্বতন্ত্রভাবে চেনার জন্য আপনি কোন কি ব্যবহার করবেন?',
      aEn: 'Employee_ID is the recommended Primary Key (often as a compact surrogate or business identifier).',
      aBn: 'Employee_ID হলো সবচেয়ে আদর্শ প্রাইমারি কি (একটি সংক্ষিপ্ত ও নিখুঁত শনাক্তকারী)।',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৮ / ৮' : 'Part 8 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Practical Case Study: EMPLOYEE Relation Analysis"
              bn="বাস্তব কেস স্টাডি: EMPLOYEE রিলেশন বিশ্লেষণ"
            />
          </h2>
        </div>
      </div>

      <div className="text-xs text-zinc-300 leading-relaxed font-sans">
        <DualText
          en="Consider the following employee relation where both Employee_ID and Email are unique:"
          bn="নিচের কর্মী (EMPLOYEE) রিলেশনটি লক্ষ্য করুন, যেখানে Employee_ID এবং Email উভয় কলামের মানই অনন্য (Unique):"
        />
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
              <th className="py-2 px-4 text-amber-400">Employee_ID</th>
              <th className="py-2 px-4 text-cyan-400">Email</th>
              <th className="py-2 px-4 text-white">
                {language === 'bn' ? 'নাম' : 'Name'}
              </th>
              <th className="py-2 px-4 text-emerald-400">Department_ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-zinc-300">
            <tr>
              <td className="py-2 px-4 font-bold text-amber-300">E01</td>
              <td className="py-2 px-4">a@gmail.com</td>
              <td className="py-2 px-4">Rahim</td>
              <td className="py-2 px-4 text-emerald-300">D01</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-amber-300">E02</td>
              <td className="py-2 px-4">b@gmail.com</td>
              <td className="py-2 px-4">Karim</td>
              <td className="py-2 px-4 text-emerald-300">D02</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-amber-300">E03</td>
              <td className="py-2 px-4">c@gmail.com</td>
              <td className="py-2 px-4">Nila</td>
              <td className="py-2 px-4 text-emerald-300">D01</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-amber-300">E04</td>
              <td className="py-2 px-4">d@gmail.com</td>
              <td className="py-2 px-4">Sami</td>
              <td className="py-2 px-4 text-emerald-300">D03</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 8 Case Study Questions with Click to Reveal Mentor Solution */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
          {language === 'bn'
            ? 'যাচাইকৃত মেন্টর সমাধান দেখতে প্রতিটি প্রশ্নে ক্লিক করুন:'
            : 'Click each question to inspect the verified mentor analysis:'}
        </span>

        {caseStudyQuestions.map((item) => {
          const isRevealed = revealedHomework[item.id];

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-800 bg-[#121526] space-y-2 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">
                  {language === 'bn' ? item.qBn : item.qEn}
                </span>
                <button
                  onClick={() => toggleHomework(item.id)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-mono text-[11px] font-bold cursor-pointer transition-all border border-indigo-500/40 shrink-0"
                >
                  {isRevealed
                    ? language === 'bn'
                      ? 'উত্তর লুকান'
                      : 'Hide Solution'
                    : language === 'bn'
                    ? 'উত্তর দেখুন'
                    : 'Reveal Solution'}
                </button>
              </div>

              {isRevealed && (
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 font-mono">
                  💡 <strong>{language === 'bn' ? 'মেন্টর উত্তর:' : 'Mentor Answer:'}</strong>{' '}
                  {language === 'bn' ? item.aBn : item.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Roadmap Bridge Navigation */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            {language === 'bn' ? 'লেসন ৪ সম্পন্ন' : 'Lesson 4 Completed'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            {language === 'bn' ? '✓ রিলেশনাল কি ও ইন্টিগ্রিটি করায়ত্ত' : '✓ Keys & Integrity Mastered'}
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            en="What's Next: Database Systems Architecture Roadmap & ER Model"
            bn="পরবর্তী ধাপ: ডেটাবেস সিস্টেম আর্কিটেকচার ও ই-আর মডেল (ER Model)"
          />
        </h3>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Now that you have mastered Relational Keys, Foreign Key Constraints, and Referential Integrity, you are ready to explore Entity-Relationship (ER) modeling, schemas, and real-world database design!"
            bn="এখন যেহেতু আপনি রিলেশনাল কি, ফরেন কি কনস্ট্রেইন্ট এবং রেফারেন্সিয়াল ইন্টিগ্রিটি ভালোভাবে আয়ত্ত করেছেন, আপনি প্রস্তুত পরবর্তী ধাপের জন্য: এন্টিটি-রিলেশনশিপ (ER) মডেল ও বাস্তব ডেটাবেস আর্কিটেকচার ডিজাইন!"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson3')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লেসন ৩-এ ফিরে যান' : 'Back to Lesson 3'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson5')}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
          >
            <span>{language === 'bn' ? 'লেসন ৫-এ যান: ER Model' : 'Go to Lesson 5: ER Model'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
