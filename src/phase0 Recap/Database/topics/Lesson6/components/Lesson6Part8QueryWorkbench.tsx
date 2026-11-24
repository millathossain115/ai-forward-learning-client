'use client';

import React, { useState } from 'react';
import {
  Search,
  Table as TableIcon,
  Check,
  Copy,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INITIAL_STUDENTS } from '../types';

type PresetKey = 'select_all' | 'where_dept' | 'compound_and' | 'between_age' | 'order_by_gpa';

interface QueryPreset {
  id: PresetKey;
  labelEn: string;
  labelBn: string;
  tagEn: string;
  tagBn: string;
  sql: string;
  explainEn: string;
  explainBn: string;
  columns: ('id' | 'name' | 'age' | 'dept' | 'gpa')[];
  filterFn: (s: typeof INITIAL_STUDENTS[0]) => boolean;
  sortFn?: (a: typeof INITIAL_STUDENTS[0], b: typeof INITIAL_STUDENTS[0]) => number;
}

const PRESETS: QueryPreset[] = [
  {
    id: 'select_all',
    labelEn: '1. Basic SELECT (Projection)',
    labelBn: '১. মৌলিক SELECT (প্রজেকশন)',
    tagEn: 'PROJECTION',
    tagBn: 'কলাম প্রজেকশন',
    sql: `SELECT student_id, name, department, gpa
FROM students;`,
    explainEn: 'Retrieves all rows while projecting only the specified columns.',
    explainBn: 'কোনো ফিল্টার ছাড়াই নির্দিষ্ট কলামগুলো সমস্ত সারির জন্য প্রদর্শন করে।',
    columns: ['id', 'name', 'dept', 'gpa'],
    filterFn: () => true
  },
  {
    id: 'where_dept',
    labelEn: "2. WHERE Equality (Dept = 'CSE')",
    labelBn: "২. WHERE ইকুয়ালিটি (Dept = 'CSE')",
    tagEn: 'EQUALITY FILTER',
    tagBn: 'হুবহু মিল ফিল্টার',
    sql: `SELECT name, department, gpa
FROM students
WHERE department = 'CSE';`,
    explainEn: "Filters rows where department equals 'CSE' exactly (3 rows match).",
    explainBn: "শুধুমাত্র যাদের ডিপার্টমেন্ট 'CSE' তাদের সারিগুলো ফিল্টার করে (৩ জন)।",
    columns: ['name', 'dept', 'gpa'],
    filterFn: s => s.deptName === 'CSE'
  },
  {
    id: 'compound_and',
    labelEn: '3. Compound AND (CSE + GPA >= 3.85)',
    labelBn: '৩. কম্পাউন্ড AND (CSE + GPA >= ৩.৮৫)',
    tagEn: 'BOOLEAN AND',
    tagBn: 'উভয় শর্ত সত্য',
    sql: `SELECT name, department, gpa
FROM students
WHERE department = 'CSE' AND gpa >= 3.85;`,
    explainEn: 'BOTH conditions must be TRUE: Student must be in CSE AND have GPA >= 3.85.',
    explainBn: 'উভয় শর্তই সত্য হতে হবে: ডিপার্টমেন্ট CSE এবং জিপিএ ৩.৮৫ বা তার বেশি হতে হবে।',
    columns: ['name', 'dept', 'gpa'],
    filterFn: s => s.deptName === 'CSE' && s.gpa >= 3.85
  },
  {
    id: 'between_age',
    labelEn: '4. Range (Age BETWEEN 21 AND 23)',
    labelBn: '৪. রেঞ্জ ফিল্টার (বয়স ২১ থেকে ২৩)',
    tagEn: 'INCLUSIVE RANGE',
    tagBn: 'প্রান্তিক মানসহ রেঞ্জ',
    sql: `SELECT name, age, department
FROM students
WHERE age BETWEEN 21 AND 23;`,
    explainEn: 'BETWEEN is inclusive in SQL: Matches students aged 21, 22, and 23.',
    explainBn: 'SQL-এ BETWEEN মান দুটি অন্তর্ভুক্ত রাখে: ২১, ২২ এবং ২৩ বছর বয়সীদের নির্বাচন করে।',
    columns: ['name', 'age', 'dept'],
    filterFn: s => s.age >= 21 && s.age <= 23
  },
  {
    id: 'order_by_gpa',
    labelEn: '5. ORDER BY (GPA DESC)',
    labelBn: '৫. সাজানো (ORDER BY GPA DESC)',
    tagEn: 'SORTING',
    tagBn: 'অবরোহী ক্রমে সাজানো',
    sql: `SELECT name, department, gpa
FROM students
ORDER BY gpa DESC;`,
    explainEn: 'Sorts records in descending order from highest GPA to lowest GPA.',
    explainBn: 'সবচেয়ে ভালো জিপিএ থেকে শুরু করে ক্রমানুসারে নিম্ন জিপিএ অনুযায়ী সাজায়।',
    columns: ['name', 'dept', 'gpa'],
    filterFn: () => true,
    sortFn: (a, b) => b.gpa - a.gpa
  }
];

export default function Lesson6Part8QueryWorkbench() {
  const { language } = useLanguage();
  const [activePreset, setActivePreset] = useState<PresetKey>('where_dept');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const current = PRESETS.find(p => p.id === activePreset) || PRESETS[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet('workbench-sql');
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Compute displayed rows
  let rows = INITIAL_STUDENTS.filter(current.filterFn);
  if (current.sortFn) {
    rows = [...rows].sort(current.sortFn);
  }

  return (
    <>
      {/* ========================================================
          PART 8 - 12: QUERY WORKBENCH (SELECT, WHERE, OPERATORS, ORDER BY)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-3.5">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৮ থেকে ১২ • কুয়েরি ওয়ার্কবেঞ্চ' : 'Part 8 - 12 of 20'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="Interactive SQL Query Workbench (SELECT, WHERE & ORDER BY)"
                bn="৮-১২. ইন্টারেক্টিভ এসকিউএল কুয়েরি ওয়ার্কবেঞ্চ (SELECT, WHERE ও ORDER BY)"
              />
            </h2>
          </div>
        </div>

        {/* 1-Line Sleek Execution Order Pipeline */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#090d20] border border-slate-800 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-zinc-400">
              {language === 'bn' ? 'ইঞ্জিন এক্সিকিউশন অর্ডার:' : 'Engine Execution Order:'}
            </span>
            <span className="text-cyan-300">1. FROM</span>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <span className="text-amber-300 font-bold">2. WHERE</span>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <span className="text-purple-300">3. SELECT</span>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <span className="text-emerald-300">4. ORDER BY</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-sans">
            {language === 'bn'
              ? '💡 টিপস: WHERE আগে চলে বলেই SELECT-এর এলিয়াস WHERE-এ কাজ করে না।'
              : '💡 Tip: WHERE runs before SELECT, which is why SELECT aliases cannot be used in WHERE.'}
          </span>
        </div>

        {/* 2-Column Clean Layout: Left (Presets + SQL) / Right (Result Table) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Left Column (5 Cols): Query Presets & Generated SQL */}
          <div className="lg:col-span-5 space-y-2.5">
            {/* Presets List */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">
                {language === 'bn' ? 'কুয়েরি সিনারিও বেছে নিন:' : 'Select Query Scenario:'}
              </span>
              <div className="flex flex-col gap-1">
                {PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePreset(p.id)}
                    className={`px-3 py-2 rounded-lg text-left border transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${
                      activePreset === p.id
                        ? 'bg-cyan-600/20 border-cyan-400/60 text-white shadow-sm font-bold'
                        : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="truncate">{language === 'bn' ? p.labelBn : p.labelEn}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      activePreset === p.id ? 'bg-cyan-500/30 text-cyan-300' : 'bg-black/40 text-zinc-500'
                    }`}>
                      {language === 'bn' ? p.tagBn : p.tagEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated SQL Code Box */}
            <div className="p-3 rounded-xl bg-black/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-500 font-bold uppercase">Executed SQL:</span>
                <button
                  onClick={() => handleCopy(current.sql)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 flex items-center gap-1 cursor-pointer transition-all"
                  title="Copy SQL"
                >
                  {copiedSnippet === 'workbench-sql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'workbench-sql' ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি' : 'Copy')}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{current.sql}
              </pre>
              <DualText
                as="p"
                className="text-[10.5px] text-zinc-400 font-sans border-t border-slate-800/80 pt-1.5 leading-snug"
                en={current.explainEn}
                bn={current.explainBn}
              />
            </div>
          </div>

          {/* Right Column (7 Cols): Clean Live Result Table */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0a0d1e]">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-[#14182d] text-xs font-mono">
                <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                  <TableIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'ফলাফল ডেটাসেট' : 'Query Result Set'}</span>
                </div>
                <span className="text-[10.5px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  {rows.length} {language === 'bn' ? 'টি সারি পাওয়া গেছে' : 'rows returned'}
                </span>
              </div>

              <table className="w-full text-xs text-left">
                <thead className="bg-[#10142b] text-zinc-400 font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    {current.columns.includes('id') && <th className="py-2 px-3">student_id</th>}
                    {current.columns.includes('name') && <th className="py-2 px-3"><DualText en="name" bn="নাম" /></th>}
                    {current.columns.includes('age') && <th className="py-2 px-3"><DualText en="age" bn="বয়স" /></th>}
                    {current.columns.includes('dept') && <th className="py-2 px-3"><DualText en="department" bn="বিভাগ" /></th>}
                    {current.columns.includes('gpa') && <th className="py-2 px-3"><DualText en="gpa" bn="জিপিএ" /></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 font-sans text-[11px] text-zinc-300">
                  {rows.map(student => (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                      {current.columns.includes('id') && (
                        <td className="py-2 px-3 font-mono font-bold text-cyan-400">{student.id}</td>
                      )}
                      {current.columns.includes('name') && (
                        <td className="py-2 px-3 text-white font-medium">{student.name}</td>
                      )}
                      {current.columns.includes('age') && (
                        <td className="py-2 px-3 font-mono text-zinc-300">{student.age}</td>
                      )}
                      {current.columns.includes('dept') && (
                        <td className="py-2 px-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold ${
                              student.deptName === 'CSE'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : student.deptName === 'BBA'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            }`}
                          >
                            {student.deptName}
                          </span>
                        </td>
                      )}
                      {current.columns.includes('gpa') && (
                        <td className="py-2 px-3 font-mono font-bold text-emerald-400">
                          {student.gpa.toFixed(2)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick 1-Line Insight Footer */}
            <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[10.5px] font-sans text-zinc-400 flex items-center justify-between">
              <span>
                <strong className="text-zinc-300 font-mono">WHERE vs HAVING: </strong>
                <DualText
                  en="WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY."
                  bn="WHERE প্রতিটি সারি আলাদাভাবে ফিল্টার করে, আর HAVING গ্রুপ বাই করার পর এগ্রিগেট ফিল্টার করে।"
                />
              </span>
              <span className="text-cyan-400 font-mono text-[9.5px]">Core Rule</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
