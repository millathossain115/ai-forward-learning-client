'use client';

import React, { useState } from 'react';
import { Check, Code, Copy, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const PRACTICE_PROBLEMS = [
  {
    num: 1,
    tag: 'Subquery',
    en: 'Find students whose GPA is strictly higher than the overall average GPA.',
    bn: 'সকল শিক্ষার্থীর গড় GPA-এর চেয়ে বেশি GPA পাওয়া শিক্ষার্থীদের খুঁজুন।',
    sql: `SELECT Name, GPA\nFROM Students\nWHERE GPA > (SELECT AVG(GPA) FROM Students);`,
    out: 'Returns: Rahim (3.80), Sumaiya (3.90), Ayesha (3.70)',
  },
  {
    num: 2,
    tag: 'Correlated',
    en: 'Find students earning higher GPA than their own department average.',
    bn: 'নিজ ডিপার্টমেন্টের গড় GPA-এর চেয়ে বেশি GPA পাওয়া শিক্ষার্থীদের বের করুন।',
    sql: `SELECT s1.Name, s1.Department, s1.GPA\nFROM Students s1\nWHERE s1.GPA > (\n  SELECT AVG(s2.GPA) FROM Students s2\n  WHERE s2.Department = s1.Department\n);`,
    out: 'Returns: Rahim (CSE), Sumaiya (CSE), Ayesha (BBA)',
  },
  {
    num: 3,
    tag: 'NOT EXISTS',
    en: 'Find courses that have zero enrollments (NULL-safe anti-join).',
    bn: 'কোনো শিক্ষার্থী এনরোল করেনি এমন কোর্সগুলো খুঁজে বের করুন (NOT EXISTS)।',
    sql: `SELECT c.Course_Code, c.Course_Name\nFROM Courses c\nWHERE NOT EXISTS (\n  SELECT 1 FROM Enrollments e\n  WHERE e.Course_ID = c.Course_ID\n);`,
    out: 'Returns empty set on current seed data (all 4 courses have enrollments).',
  },
  {
    num: 4,
    tag: 'ROW_NUMBER()',
    en: 'Get the single highest-GPA student from each department.',
    bn: 'প্রতিটি ডিপার্টমেন্ট থেকে সর্বোচ্চ GPA-ধারী ১ জন শিক্ষার্থী বের করুন।',
    sql: `WITH Ranked AS (\n  SELECT Name, Department, GPA,\n    ROW_NUMBER() OVER (PARTITION BY Department ORDER BY GPA DESC) AS rn\n  FROM Students\n)\nSELECT Name, Department, GPA FROM Ranked WHERE rn = 1;`,
    out: 'Returns: Sumaiya (CSE, 3.90), Ayesha (BBA, 3.70), Nabila (EEE, 3.20)',
  },
  {
    num: 5,
    tag: 'CASE WHEN',
    en: 'Count Dean List (GPA >= 3.80) vs Other students per department.',
    bn: 'প্রতিটি ডিপার্টমেন্টে Dean List (GPA >= 3.80) বনাম অন্যান্য শিক্ষার্থীর সংখ্যা গণনা করুন।',
    sql: `SELECT Department,\n  SUM(CASE WHEN GPA >= 3.80 THEN 1 ELSE 0 END) AS Dean_List,\n  SUM(CASE WHEN GPA < 3.80 THEN 1 ELSE 0 END) AS Others\nFROM Students\nGROUP BY Department;`,
    out: 'CSE: 2 Dean / 1 Other • BBA: 0 / 2 • EEE: 0 / 1',
  },
  {
    num: 6,
    tag: 'LAG()',
    en: 'Compare each student GPA against the previously admitted student.',
    bn: 'ভর্তির তারিখ অনুযায়ী পূর্ববর্তী শিক্ষার্থীর সাথে বর্তমান শিক্ষার্থীর GPA তুলনা করুন।',
    sql: `SELECT Name, Admission_Date, GPA,\n  GPA - LAG(GPA) OVER (ORDER BY Admission_Date) AS GPA_Delta\nFROM Students;`,
    out: 'Sumaiya (NULL), Rahim (-0.10), Tanvir (-0.30), Karim (-0.10), Ayesha (+0.30), Nabila (-0.50)',
  },
];

export default function Lesson7PracticeLab() {
  const { language } = useLanguage();
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [copiedNum, setCopiedNum] = useState<number | null>(null);

  const toggle = (num: number) => {
    setRevealed((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const handleCopy = (sql: string, num: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedNum(num);
    setTimeout(() => setCopiedNum(null), 1800);
  };

  return (
    <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
          <Code className="w-4 h-4 stroke-[1.5]" />
        </div>
        <div>
          <span className="text-[11px] font-mono text-zinc-400">
            {language === 'bn' ? 'পার্ট ১৬ • অ্যাডভান্সড প্র্যাকটিস ল্যাব' : 'Part 16 • Practice Lab'}
          </span>
          <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
            <DualText
              as="span"
              en="Advanced SQL Practice Lab (University Schema)"
              bn="অ্যাডভান্সড SQL প্র্যাকটিস ল্যাব (ইউনিভার্সিটি স্কিমা)"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {PRACTICE_PROBLEMS.map((prob) => (
          <div
            key={prob.num}
            className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2.5 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="inline-block text-[11px] font-mono text-zinc-400">
                  #{prob.num} • {prob.tag}
                </span>
                <p className="text-xs font-medium text-zinc-100 font-sans leading-snug">
                  <DualText as="span" en={prob.en} bn={prob.bn} />
                </p>
              </div>
              <button
                onClick={() => toggle(prob.num)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-cyan-500/15 text-zinc-300 hover:text-cyan-300 border border-white/[0.08] text-[11px] font-mono cursor-pointer flex items-center gap-1 shrink-0 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{revealed[prob.num] ? (language === 'bn' ? 'লুকান' : 'Hide') : (language === 'bn' ? 'সমাধান' : 'Solution')}</span>
              </button>
            </div>

            {revealed[prob.num] && (
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <button
                    onClick={() => handleCopy(prob.sql, prob.num)}
                    className="absolute right-2 top-2 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                  >
                    {copiedNum === prob.num ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedNum === prob.num ? 'Copied' : 'Copy'}</span>
                  </button>
                  <pre className="p-3 bg-black/60 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                    {prob.sql}
                  </pre>
                </div>
                <div className="text-[11px] font-mono text-cyan-300 bg-[#0a0d1a] px-2.5 py-1.5 rounded border border-slate-800">
                  {prob.out}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
