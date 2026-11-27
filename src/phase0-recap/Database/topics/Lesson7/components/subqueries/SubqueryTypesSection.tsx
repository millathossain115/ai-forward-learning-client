'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type SubqueryTypeId = 'single' | 'multiple_row' | 'multiple_col' | 'correlated';

interface SubqueryTypeConfig {
  id: SubqueryTypeId;
  tabLabel: string;
  tabDescEn: string;
  tabDescBn: string;
  titleEn: string;
  titleBn: string;
  innerShape: string;
  defEn: string;
  defBn: string;
  motiveEn: string;
  motiveBn: string;
  outcomeEn: string;
  outcomeBn: string;
  problemEn: string;
  problemBn: string;
  sql: string;
  headers: string[];
  rows: string[][];
  ruleEn: string;
  ruleBn: string;
  efficiencyEn: string;
  efficiencyBn: string;
}

const SUBQUERY_TYPES_DATA: SubqueryTypeConfig[] = [
  {
    id: 'single',
    tabLabel: '3.1 Single-Row',
    tabDescEn: 'Returns 1 scalar value',
    tabDescBn: 'মাত্র ১টি মান ফেরত দেয়',
    titleEn: 'Single-Row Subquery',
    titleBn: 'Single-Row Subquery উদাহরণ',
    innerShape: 'Inner returns: 3.5833 (1 scalar)',
    defEn: 'Inner query returns exactly 1 row and 1 column (a single scalar value) compared with =, >, <, >=, <=, or <>.',
    defBn: 'ভেতরের কুয়েরি ঠিক ১টি সারি ও ১টি কলামের একক মান ফেরত দেয়, যা =, >, <, >=, <= দিয়ে তুলনা হয়।',
    motiveEn: 'Use when filtering against one dynamic summary metric (like AVG, MAX, or MIN) instead of hardcoding a number.',
    motiveBn: 'হার্ডকোড না করে একটি ডায়নামিক সামারি মানের (যেমন AVG, MAX, MIN) সাথে তুলনা করতে ব্যবহৃত হয়।',
    outcomeEn: 'Computes class Avg GPA (3.5833) once, then returns the 3 students who beat it.',
    outcomeBn: 'একবার গড় GPA (3.5833) বের করে তার চেয়ে বেশি পাওয়া ৩ জন শিক্ষার্থীকে দেখায়।',
    problemEn: 'Problem: Find students scoring above the overall class average.',
    problemBn: 'সমস্যা: ক্লাসের গড় GPA-এর চেয়ে বেশি পাওয়া শিক্ষার্থী খুঁজুন।',
    sql: `SELECT Name, GPA\nFROM Students\nWHERE GPA > (SELECT AVG(GPA) FROM Students);`,
    headers: ['Name', 'GPA'],
    rows: [
      ['Rahim', '3.80'],
      ['Sumaiya', '3.90'],
      ['Ayesha', '3.70'],
    ],
    ruleEn: 'Rule: =, >, < throw an error if inner query returns >1 row.',
    ruleBn: 'নিয়ম: ভেতরের কুয়েরি ১টির বেশি সারি দিলে =, >, < এরর দেবে।',
    efficiencyEn: 'Efficiency: Fast — inner query runs once.',
    efficiencyBn: 'এফিশিয়েন্সি: দ্রুত — ভেতরের কুয়েরি একবার চলে।',
  },
  {
    id: 'multiple_row',
    tabLabel: '3.2 Multiple-Row',
    tabDescEn: '1 column, multiple rows',
    tabDescBn: '১ কলাম, একাধিক সারি',
    titleEn: 'Multiple-Row Subquery',
    titleBn: 'Multiple-Row Subquery উদাহরণ',
    innerShape: 'Inner returns: [101, 103] (2 unique IDs)',
    defEn: 'Inner query returns 1 column with multiple rows (a list of values), paired with IN, NOT IN, ANY, ALL, or EXISTS.',
    defBn: 'ভেতরের কুয়েরি ১টি কলামের একাধিক সারি (মানের তালিকা) ফেরত দেয়, যা IN, NOT IN, ANY, ALL বা EXISTS দিয়ে চেক হয়।',
    motiveEn: 'Use when checking membership against a dynamic set of IDs or values from another table without writing a JOIN.',
    motiveBn: 'JOIN না লিখেই অন্য টেবিল থেকে পাওয়া একাধিক ID বা মানের তালিকার সাথে মেলাতে ব্যবহৃত হয়।',
    outcomeEn: 'Fetches the Student_IDs who earned A or A+, then outputs their names, departments, and GPAs.',
    outcomeBn: 'A বা A+ পাওয়া Student_ID-গুলো এনে তাদের নাম, ডিপার্টমেন্ট ও GPA দেখায়।',
    problemEn: "Problem: Find all students who earned an 'A' or 'A+' grade in any course.",
    problemBn: "সমস্যা: যেকোনো কোর্সে 'A' বা 'A+' গ্রেড পাওয়া শিক্ষার্থীদের তালিকা বের করুন।",
    sql: `SELECT Name, Department, GPA\nFROM Students\nWHERE Student_ID IN (\n    SELECT Student_ID FROM Enrollments\n    WHERE Grade IN ('A', 'A+')\n);`,
    headers: ['Name', 'Department', 'GPA'],
    rows: [
      ['Rahim', 'CSE', '3.80'],
      ['Sumaiya', 'CSE', '3.90'],
    ],
    ruleEn: 'Rule: Pair with IN, NOT IN, ANY, ALL, or EXISTS.',
    ruleBn: 'নিয়ম: IN, NOT IN, ANY, ALL বা EXISTS ব্যবহার করুন।',
    efficiencyEn: 'Efficiency: Runs once; prefer EXISTS on large tables.',
    efficiencyBn: 'এফিশিয়েন্সি: একবার চলে; বড় টেবিলে EXISTS ভালো।',
  },
  {
    id: 'multiple_col',
    tabLabel: '3.3 Multi-Column',
    tabDescEn: 'Row-value tuple match',
    tabDescBn: 'একাধিক কলামের টাপল তুলনা',
    titleEn: 'Multiple-Column Subquery',
    titleBn: 'Multiple-Column Subquery উদাহরণ',
    innerShape: "Inner returns: ('CSE',3.90), ('BBA',3.70), ('EEE',3.20)",
    defEn: 'Inner query returns 2 or more columns per row, compared simultaneously as a tuple (col1, col2) IN (...).',
    defBn: 'ভেতরের কুয়েরি প্রতি সারিতে ২ বা ততোধিক কলাম ফেরত দেয়, যা (col1, col2) IN (...) টাপল হিসেবে একসাথে মিলিয়ে দেখে।',
    motiveEn: 'Use when a single column match is ambiguous—like matching both Department AND its MAX(GPA) together.',
    motiveBn: 'শুধু একটি কলাম দিয়ে মিলানো যথেষ্ট না হলে (যেমন একই সাথে Department ও তার MAX(GPA) মিলানো) এটি ব্যবহৃত হয়।',
    outcomeEn: 'Finds each department max GPA once, then returns the 3 department toppers.',
    outcomeBn: 'প্রতি ডিপার্টমেন্টের সর্বোচ্চ GPA বের করে ৩ ডিপার্টমেন্টের সেরা ৩ জনকে দেখায়।',
    problemEn: 'Problem: Find the top-scoring student in every department at once.',
    problemBn: 'সমস্যা: একসাথে প্রতি ডিপার্টমেন্টের সর্বোচ্চ GPA-ধারী শিক্ষার্থী খুঁজুন।',
    sql: `SELECT Name, Department, GPA\nFROM Students\nWHERE (Department, GPA) IN (\n    SELECT Department, MAX(GPA)\n    FROM Students GROUP BY Department\n);`,
    headers: ['Name', 'Department', 'GPA'],
    rows: [
      ['Sumaiya', 'CSE', '3.90'],
      ['Nabila', 'EEE', '3.20'],
      ['Ayesha', 'BBA', '3.70'],
    ],
    ruleEn: 'Note: Tuple IN works in MySQL, PostgreSQL & Oracle.',
    ruleBn: 'নোট: টাপল IN MySQL, PostgreSQL ও Oracle-এ কাজ করে।',
    efficiencyEn: 'Efficiency: Runs inner GROUP BY once — beats correlated.',
    efficiencyBn: 'এফিশিয়েন্সি: GROUP BY একবার চলে — correlated-এর চেয়ে দ্রুত।',
  },
  {
    id: 'correlated',
    tabLabel: '3.4 Correlated',
    tabDescEn: 'Depends on outer row',
    tabDescBn: 'বাইরের সারির ওপর নির্ভরশীল',
    titleEn: 'Correlated Subquery',
    titleBn: 'Correlated Subquery উদাহরণ',
    innerShape: 'Inner runs: once per outer row (S)',
    defEn: 'An inner query that references a column from the outer query (S.Department), so it cannot execute independently.',
    defBn: 'এমন সাবকুয়েরি যা বাইরের কুয়েরির কলাম (S.Department) ব্যবহার করে, তাই এটি স্বাধীনভাবে একা চলতে পারে না।',
    motiveEn: 'Use when each outer row must be compared against a dynamic value computed specifically for its own group.',
    motiveBn: 'বাইরের প্রতিটি সারিকে তার নিজস্ব গ্রুপের হিসাবকৃত মানের সাথে আলাদাভাবে তুলনা করতে ব্যবহৃত হয়।',
    outcomeEn: 'Evaluates each student against their own dept average (CSE 3.73, BBA 3.55, EEE 3.20) and keeps 3 rows.',
    outcomeBn: 'প্রতিটি শিক্ষার্থীকে তার নিজ ডিপার্টমেন্টের গড়ের সাথে মিলিয়ে যোগ্য ৩ জনকে আউটপুটে রাখে।',
    problemEn: "Problem: Find students beating their own department's average GPA.",
    problemBn: 'সমস্যা: নিজ ডিপার্টমেন্টের গড় GPA-এর চেয়ে বেশি পাওয়া শিক্ষার্থী খুঁজুন।',
    sql: `SELECT S.Name, S.Department, S.GPA\nFROM Students S\nWHERE S.GPA > (\n    SELECT AVG(S2.GPA) FROM Students S2\n    WHERE S2.Department = S.Department\n);`,
    headers: ['Name', 'Department', 'GPA'],
    rows: [
      ['Rahim', 'CSE', '3.80'],
      ['Sumaiya', 'CSE', '3.90'],
      ['Ayesha', 'BBA', '3.70'],
    ],
    ruleEn: 'Note: Cannot run standalone (uses outer S.Department).',
    ruleBn: 'নোট: একা চলতে পারে না (S.Department ব্যবহার করে)।',
    efficiencyEn: 'Efficiency: Re-runs per row (slower on huge tables; use CTE/JOIN).',
    efficiencyBn: 'এফিশিয়েন্সি: প্রতি সারির জন্য চলে (বড় টেবিলে CTE/JOIN ভালো)।',
  },
];

export default function SubqueryTypesSection() {
  const { language } = useLanguage();
  const [activeSubqueryType, setActiveSubqueryType] = useState<SubqueryTypeId>('single');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const activeConfig = SUBQUERY_TYPES_DATA.find(t => t.id === activeSubqueryType) || SUBQUERY_TYPES_DATA[0];

  useEffect(() => {
    if (!isPopupOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPopupOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPopupOpen]);

  return (
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Layers className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ৩ • সাবকুয়েরির ধরন' : 'Part 3 • Subquery Types'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="4 Types of Subqueries: Single-Row, Multi-Row, Multi-Column & Correlated"
                bn="৪ ধরনের Subquery: Single-Row, Multi-Row, Multi-Column ও Correlated"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SUBQUERY_TYPES_DATA.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubqueryType(t.id)}
              className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
                activeSubqueryType === t.id
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-zinc-100'
                  : 'bg-[#131824] border-white/[0.08] text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <div className="text-xs font-mono font-medium">{t.tabLabel}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                {language === 'bn' ? t.tabDescBn : t.tabDescEn}
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText as="span" en={activeConfig.titleEn} bn={activeConfig.titleBn} />
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0d1117] border border-white/[0.08] text-zinc-300">
                {activeConfig.innerShape}
              </span>
              <button
                onClick={() => setIsPopupOpen(true)}
                title={language === 'bn' ? 'পপ-আপ ভিউ' : 'Open Popup View'}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0d1117] hover:bg-[#1a2130] border border-white/[0.08] text-[11px] font-mono text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3 h-3 stroke-[1.5]" />
                <span>{language === 'bn' ? 'পপ-আপ' : 'Pop-up'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0a0d14] border border-white/[0.06] space-y-0.5">
              <span className="text-[11px] font-mono text-cyan-300 font-medium">
                {language === 'bn' ? 'সংজ্ঞা' : 'Definition'}
              </span>
              <DualText as="p" className="text-zinc-400 font-sans leading-relaxed" en={activeConfig.defEn} bn={activeConfig.defBn} />
            </div>
            <div className="p-2.5 rounded-lg bg-[#0a0d14] border border-white/[0.06] space-y-0.5">
              <span className="text-[11px] font-mono text-cyan-300 font-medium">
                {language === 'bn' ? 'উদ্দেশ্য (কেন ব্যবহার)' : 'Motive (Why use it)'}
              </span>
              <DualText as="p" className="text-zinc-400 font-sans leading-relaxed" en={activeConfig.motiveEn} bn={activeConfig.motiveBn} />
            </div>
            <div className="p-2.5 rounded-lg bg-[#0a0d14] border border-white/[0.06] space-y-0.5">
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                {language === 'bn' ? 'ফলাফল' : 'Outcome'}
              </span>
              <DualText as="p" className="text-zinc-400 font-sans leading-relaxed" en={activeConfig.outcomeEn} bn={activeConfig.outcomeBn} />
            </div>
          </div>

          <DualText
            as="p"
            className="text-xs text-zinc-200 font-sans font-medium"
            en={activeConfig.problemEn}
            bn={activeConfig.problemBn}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
            <pre className="p-3 bg-[#0a0d14] rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-white/[0.06] flex items-center">
              {activeConfig.sql}
            </pre>

            <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#0a0d14]">
              <div className="px-3 py-1.5 bg-[#0d1117] border-b border-white/[0.08] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Output</span>
                <span className="text-emerald-400">{activeConfig.rows.length} rows</span>
              </div>
              <table className="w-full text-xs text-left font-mono">
                <thead className="text-zinc-400 border-b border-white/[0.06]">
                  <tr>
                    {activeConfig.headers.map(h => (
                      <th key={h} className="py-1.5 px-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-zinc-200 tabular-nums">
                  {activeConfig.rows.map((r, i) => (
                    <tr key={i}>
                      {r.map((cell, ci) => (
                        <td key={ci} className={`py-1.5 px-3 ${ci === 0 ? 'font-sans text-zinc-100' : ci === r.length - 1 ? 'text-emerald-400' : 'text-cyan-300'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono pt-1.5 border-t border-white/[0.06]">
            <DualText as="span" className="text-zinc-400" en={activeConfig.ruleEn} bn={activeConfig.ruleBn} />
            <DualText as="span" className="text-cyan-300" en={activeConfig.efficiencyEn} bn={activeConfig.efficiencyBn} />
          </div>
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div
            onClick={() => setIsPopupOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-[#0d1117] border border-white/[0.12] shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-[11px] font-mono text-cyan-300">{activeConfig.innerShape}</span>
                  <h3 className="text-base font-semibold text-zinc-100 mt-0.5">
                    <DualText as="span" en={activeConfig.titleEn} bn={activeConfig.titleBn} />
                  </h3>
                </div>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="p-1.5 rounded-lg bg-[#131824] hover:bg-[#1a2130] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-[#0a0d14] border border-white/[0.06] space-y-0.5">
                  <span className="text-[11px] font-mono text-cyan-300 font-medium">
                    {language === 'bn' ? 'সংজ্ঞা' : 'Definition'}
                  </span>
                  <DualText as="p" className="text-zinc-400 font-sans leading-relaxed" en={activeConfig.defEn} bn={activeConfig.defBn} />
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0d14] border border-white/[0.06] space-y-0.5">
                  <span className="text-[11px] font-mono text-cyan-300 font-medium">
                    {language === 'bn' ? 'উদ্দেশ্য (কেন ব্যবহার)' : 'Motive (Why use it)'}
                  </span>
                  <DualText as="p" className="text-zinc-400 font-sans leading-relaxed" en={activeConfig.motiveEn} bn={activeConfig.motiveBn} />
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0d14] border border-white/[0.06] space-y-0.5">
                  <span className="text-[11px] font-mono text-emerald-400 font-medium">
                    {language === 'bn' ? 'ফলাফল' : 'Outcome'}
                  </span>
                  <DualText as="p" className="text-zinc-400 font-sans leading-relaxed" en={activeConfig.outcomeEn} bn={activeConfig.outcomeBn} />
                </div>
              </div>

              <DualText
                as="p"
                className="text-xs text-zinc-200 font-sans font-medium"
                en={activeConfig.problemEn}
                bn={activeConfig.problemBn}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <pre className="p-4 bg-[#0a0d14] rounded-xl text-sm font-mono text-emerald-400 overflow-x-auto border border-white/[0.08] leading-relaxed">
                  {activeConfig.sql}
                </pre>

                <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0d14]">
                  <div className="px-4 py-2 bg-[#131824] border-b border-white/[0.08] text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>Output Table</span>
                    <span className="text-emerald-400">{activeConfig.rows.length} rows</span>
                  </div>
                  <table className="w-full text-sm text-left font-mono">
                    <thead className="text-zinc-400 border-b border-white/[0.08] text-xs">
                      <tr>
                        {activeConfig.headers.map(h => (
                          <th key={h} className="py-2.5 px-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-zinc-200 tabular-nums">
                      {activeConfig.rows.map((r, i) => (
                        <tr key={i}>
                          {r.map((cell, ci) => (
                            <td key={ci} className={`py-2.5 px-4 ${ci === 0 ? 'font-sans text-zinc-100' : ci === r.length - 1 ? 'text-emerald-400' : 'text-cyan-300'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <DualText as="span" className="text-zinc-400" en={activeConfig.ruleEn} bn={activeConfig.ruleBn} />
                <DualText as="span" className="text-cyan-300" en={activeConfig.efficiencyEn} bn={activeConfig.efficiencyBn} />
              </div>
            </div>
          </div>
        )}
      </section>
  );
}
