'use client';

import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const EMPLOYEE_ROWS = [
  { id: 'E01', nid: 'NID-8801', email: 'rahim@corp.com', name: 'Rahim', deptId: 'D01', mgrId: null, phone: '01711-110011' },
  { id: 'E02', nid: 'NID-8802', email: 'karim@corp.com', name: 'Karim', deptId: 'D02', mgrId: 'E01', phone: '01811-220022' },
  { id: 'E03', nid: 'NID-8803', email: 'nila@corp.com', name: 'Nila', deptId: 'D01', mgrId: 'E01', phone: null },
  { id: 'E04', nid: 'NID-8804', email: 'rahim.s@corp.com', name: 'Rahim', deptId: 'D03', mgrId: 'E02', phone: '01911-440044' },
];

export default function Lesson4Part6CaseStudy() {
  const { language } = useLanguage();
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const caseStudyQuestions = [
    {
      id: 1,
      qEn: '1. Identify all Candidate Keys (and why Full_Name fails).',
      qBn: '১. সকল ক্যান্ডিডেট কী শনাক্ত করুন (Full_Name কেন নয়?)।',
      aEn: 'Candidate Keys: {Employee_ID}, {National_ID}, {Email}. All 3 are minimal & unique. {Full_Name} fails because "Rahim" repeats (E01 & E04).',
      aBn: 'Candidate Keys: {Employee_ID}, {National_ID}, {Email} — প্রতিটি ন্যূনতম ও ইউনিক। Full_Name হবে না কারণ "Rahim" দুবার আছে (E01 ও E04)।',
    },
    {
      id: 2,
      qEn: '2. If Employee_ID is Primary Key, what are the Alternate Keys?',
      qBn: '২. Employee_ID প্রাইমারি কি হলে অল্টারনেট কি কোনগুলো?',
      aEn: 'Alternate Keys: {National_ID} and {Email}. Employee_ID is preferred as PK because it is compact, internal, and immutable.',
      aBn: 'Alternate Keys: {National_ID} ও {Email}। Employee_ID ছোট ও অপরিবর্তনীয় হওয়ায় Primary Key হিসেবে সেরা।',
    },
    {
      id: 3,
      qEn: '3. Is {Employee_ID, Full_Name} a Super Key or Candidate Key?',
      qBn: '৩. {Employee_ID, Full_Name} কি সুপার কী নাকি ক্যান্ডিডেট কী?',
      aEn: 'Super Key only! It uniquely identifies rows, but fails minimality for Candidate Key because Full_Name is redundant.',
      aBn: 'শুধু Super Key! Full_Name অপ্রয়োজনীয় হওয়ায় এটি ন্যূনতম নয়, তাই Candidate Key নয়।',
    },
    {
      id: 4,
      qEn: '4. Find both Foreign Keys in this EMPLOYEE relation.',
      qBn: '৪. এই EMPLOYEE টেবিলে দুটি Foreign Key খুঁজে বের করুন।',
      aEn: '1) Department_ID -> DEPARTMENT(Dept_ID) (duplicates like D01 allowed). 2) Manager_ID -> EMPLOYEE(Employee_ID) (Self-Referencing FK; NULL for CEO E01).',
      aBn: '১) Department_ID -> DEPARTMENT(Dept_ID) (ডুপ্লিকেট D01 বৈধ)। ২) Manager_ID -> EMPLOYEE(Employee_ID) (সেলফ-ফরেন কি; CEO E01-এর জন্য NULL)।',
    },
    {
      id: 5,
      qEn: '5. Why can Phone be NULL if marked UNIQUE, while Employee_ID cannot?',
      qBn: '৫. Phone UNIQUE হলে NULL নেওয়া যায়, কিন্তু Employee_ID কেন পারে না?',
      aEn: 'UNIQUE allows NULLs (Nila has NULL Phone) since NULL != NULL, whereas a Primary Key strictly enforces NOT NULL + UNIQUE.',
      aBn: 'UNIQUE কনস্ট্রেইন্টে NULL অনুমোদিত (Nila-র Phone NULL), কিন্তু Primary Key-তে NOT NULL ও UNIQUE দুটোই বাধ্যতামূলক।',
    },
    {
      id: 6,
      qEn: '6. If employees work on multiple projects, how do we key EMPLOYEE_PROJECT?',
      qBn: '৬. কর্মীরা একাধিক প্রজেক্টে কাজ করলে EMPLOYEE_PROJECT-এর কি কী হবে?',
      aEn: 'Use a Composite Primary Key: (Employee_ID, Project_ID) so one employee cannot be assigned twice to the same project.',
      aBn: 'Composite Primary Key: (Employee_ID, Project_ID) ব্যবহার করতে হবে, যাতে একই কর্মী এক প্রজেক্টে দুবার যুক্ত না হয়।',
    },
  ];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-5 md:p-7 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৫ / ৬ • বাস্তব কেস স্টাডি' : 'Part 5 of 6 • Case Study'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Practical Case Study: EMPLOYEE Relation Analysis"
              bn="বাস্তব কেস স্টাডি: EMPLOYEE রিলেশন বিশ্লেষণ"
            />
          </h2>
        </div>
      </div>

      <DualText
        as="p"
        className="text-xs text-zinc-300 leading-relaxed font-sans"
        en="Analyze this enriched EMPLOYEE relation featuring Surrogate ID, Natural ID, Unique Email, Nullable Phone, Department FK, and Self-Referencing Manager FK:"
        bn="নিচের সমৃদ্ধ EMPLOYEE টেবিলটি বিশ্লেষণ করুন যেখানে Surrogate ID, Natural ID, Unique Email, Nullable Phone, Department FK ও Manager Self-FK রয়েছে:"
      />

      {/* Enriched Employee Table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300 text-[11px]">
              <th className="py-2 px-3 text-amber-400">Employee_ID (PK)</th>
              <th className="py-2 px-3 text-purple-300">National_ID</th>
              <th className="py-2 px-3 text-cyan-400">Email</th>
              <th className="py-2 px-3 text-white">Full_Name</th>
              <th className="py-2 px-3 text-emerald-400">Department_ID (FK)</th>
              <th className="py-2 px-3 text-pink-300">Manager_ID (Self-FK)</th>
              <th className="py-2 px-3 text-indigo-300">Phone (UNIQUE)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08] text-zinc-300 text-[11px]">
            {EMPLOYEE_ROWS.map((row) => (
              <tr key={row.id} className="hover:bg-slate-800/30">
                <td className="py-2 px-3 font-bold text-amber-300">{row.id}</td>
                <td className="py-2 px-3 text-purple-200">{row.nid}</td>
                <td className="py-2 px-3 text-cyan-200">{row.email}</td>
                <td className="py-2 px-3 text-white font-sans font-medium">{row.name}</td>
                <td className="py-2 px-3 text-emerald-300">{row.deptId}</td>
                <td className="py-2 px-3">
                  {row.mgrId ?? (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      NULL
                    </span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {row.phone ?? (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      NULL
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compact 2-Column Interactive Case Study Questions (Low Vertical Overhead) */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono font-bold text-zinc-400 block">
          {language === 'bn'
            ? 'উত্তর দেখতে যেকোনো প্রশ্নে ক্লিক করুন:'
            : 'Click any question to reveal the key analysis:'}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {caseStudyQuestions.map((item) => {
            const isOpen = !!revealed[item.id];
            return (
              <div
                key={item.id}
                className="rounded-xl border border-white/[0.08] bg-[#15171e] overflow-hidden"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full p-3 text-left flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs font-bold text-white font-sans leading-snug">
                    {language === 'bn' ? item.qBn : item.qEn}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-2 border-t border-white/[0.08] bg-emerald-950/15 text-[11px] text-emerald-200 leading-relaxed font-sans">
                    {language === 'bn' ? item.aBn : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
