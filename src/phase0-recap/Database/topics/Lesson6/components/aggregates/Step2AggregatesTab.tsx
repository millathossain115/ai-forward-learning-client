'use client';

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Calculator,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INITIAL_STUDENTS } from '../../types';

export default function Step2AggregatesTab({ onNext }: { onNext: () => void }) {
  const { language } = useLanguage();
  const [activeAgg, setActiveAgg] = useState<'COUNT' | 'AVG' | 'MAX' | 'MIN' | 'SUM'>('AVG');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ages = useMemo(() => INITIAL_STUDENTS.map(s => s.age), []);
  const gpas = useMemo(() => INITIAL_STUDENTS.map(s => s.gpa), []);

  const aggInfo = useMemo(() => {
    switch (activeAgg) {
      case 'COUNT':
        return {
          titleEn: 'COUNT(*): Count All Matching Rows',
          titleBn: 'COUNT(*): মোট সারির সংখ্যা গণনা',
          calcEn: 'Counts every row in the table: 1 + 1 + 1 + 1 + 1 + 1 = 6',
          calcBn: 'টেবিলের প্রতিটি সারি গণনা করে: ১ + ১ + ১ + ১ + ১ + ১ = ৬',
          result: '6 Students',
          sql: 'SELECT COUNT(*) AS total_students FROM Students;',
          targetCol: 'all'
        };
      case 'AVG':
        return {
          titleEn: 'AVG(GPA): Calculate Arithmetic Mean',
          titleBn: 'AVG(GPA): গাণিতিক গড় নির্ণয়',
          calcEn: '(3.80 + 3.45 + 3.92 + 3.60 + 3.20 + 3.85) ÷ 6 = 3.64',
          calcBn: '(৩.৮০ + ৩.৪৫ + ৩.৯২ + ৩.৬০ + ৩.২০ + ৩.৮৫) ÷ ৬ = ৩.৬৪',
          result: '3.64 Avg GPA',
          sql: 'SELECT ROUND(AVG(GPA), 2) AS avg_gpa FROM Students;',
          targetCol: 'gpa'
        };
      case 'MAX':
        return {
          titleEn: 'MAX(GPA): Find Highest Value',
          titleBn: 'MAX(GPA): সর্বোচ্চ মান খুঁজে বের করা',
          calcEn: 'Scans all GPAs: highest is 3.92 (Sumaiya, CSE)',
          calcBn: 'সব জিপিএ স্ক্যান করে: সর্বোচ্চ হলো ৩.৯২ (সুমাইয়া, CSE)',
          result: '3.92 Top GPA',
          sql: 'SELECT MAX(GPA) AS highest_gpa FROM Students;',
          targetCol: 'max_gpa'
        };
      case 'MIN':
        return {
          titleEn: 'MIN(Age): Find Lowest Value',
          titleBn: 'MIN(Age): সর্বনিম্ন মান খুঁজে বের করা',
          calcEn: 'Scans all ages: lowest is 20 years (Farhana, CSE)',
          calcBn: 'সকল বয়স স্ক্যান করে: সর্বনিম্ন হলো ২০ বছর (ফারহানা, CSE)',
          result: '20 Years',
          sql: 'SELECT MIN(Age) AS youngest_age FROM Students;',
          targetCol: 'min_age'
        };
      case 'SUM':
        return {
          titleEn: 'SUM(Age): Add Up All Values',
          titleBn: 'SUM(Age): সকল মানের সর্বমোট যোগফল',
          calcEn: '22 + 23 + 21 + 22 + 24 + 20 = 132 years combined',
          calcBn: '২২ + ২৩ + ২১ + ২২ + ২৪ + ২০ = ১৩২ বছর (মোট যোগফল)',
          result: '132 Years',
          sql: 'SELECT SUM(Age) AS total_years FROM Students;',
          targetCol: 'age'
        };
    }
  }, [activeAgg]);

  return (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3.5">
            <div className="border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                <DualText
                  en="Step 2: Aggregate Functions (Multiple Rows ➔ 1 Summary Value)"
                  bn="ধাপ ২: অ্যাগ্রিগেট ফাংশন (বহু সারি ➔ ১টি সামারি মান)"
                />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 mt-0.5"
                en="Click any function below to see how it takes all student rows and crushes them into a single answer:"
                bn="নিচের যেকোনো ফাংশনে ক্লিক করে দেখুন কীভাবে সব সারি একত্র করে একটি নির্দিষ্ট ফলাফলে রূপান্তর করা হয়:"
              />
            </div>

            {/* 5 Function Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['COUNT', 'AVG', 'MAX', 'MIN', 'SUM'] as const).map(fn => {
                const isActive = activeAgg === fn;
                return (
                  <button
                    key={fn}
                    onClick={() => setActiveAgg(fn)}
                    className={`p-2 rounded-lg text-left transition border cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 border-purple-400 text-white '
                        : 'bg-black/40 border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-bold block">{fn}()</span>
                    <span className="text-[10px] opacity-80 truncate block">
                      {fn === 'COUNT' && 'Count rows'}
                      {fn === 'AVG' && 'Mean GPA'}
                      {fn === 'MAX' && 'Highest GPA'}
                      {fn === 'MIN' && 'Lowest Age'}
                      {fn === 'SUM' && 'Total Years'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Calculation Spotlight Banner */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">{aggInfo.titleEn}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                    Result: {aggInfo.result}
                  </span>
                </div>
                <div className="text-xs text-zinc-300 font-mono flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{language === 'bn' ? aggInfo.calcBn : aggInfo.calcEn}</span>
                </div>
              </div>

              {/* Code snippet with copy */}
              <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs font-mono self-stretch md:self-auto justify-between">
                <code className="text-emerald-300">{aggInfo.sql}</code>
                <button
                  onClick={() => handleCopy(aggInfo.sql, 'aggsql')}
                  className="p-1 rounded hover:bg-slate-800 text-zinc-400 hover:text-white transition"
                  title="Copy SQL"
                >
                  {copiedId === 'aggsql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Interactive Data Table with Dynamic Row/Column Highlights */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Department</th>
                    <th className={`p-2 transition ${activeAgg === 'MIN' || activeAgg === 'SUM' ? 'bg-purple-900/40 text-purple-200' : ''}`}>
                      Age {activeAgg === 'MIN' && '🔍 (MIN checks here)'} {activeAgg === 'SUM' && '➕ (SUM adds here)'}
                    </th>
                    <th className={`p-2 transition ${activeAgg === 'AVG' || activeAgg === 'MAX' ? 'bg-purple-900/40 text-purple-200' : ''}`}>
                      GPA {activeAgg === 'AVG' && '📊 (AVG computes here)'} {activeAgg === 'MAX' && '🏆 (MAX checks here)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {INITIAL_STUDENTS.map((s, idx) => {
                    const isMax = activeAgg === 'MAX' && s.gpa === 3.92;
                    const isMin = activeAgg === 'MIN' && s.age === 20;

                    return (
                      <tr
                        key={s.id}
                        className={`transition ${
                          isMax ? 'bg-amber-500/20 text-white font-bold' : isMin ? 'bg-cyan-500/20 text-white font-bold' : ''
                        }`}
                      >
                        <td className="p-2 text-zinc-500 font-mono">{idx + 1}</td>
                        <td className="p-2 font-bold text-white flex items-center gap-1.5">
                          {s.name}
                          {isMax && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">👑 Highest</span>}
                          {isMin && <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">🌱 Youngest</span>}
                        </td>
                        <td className="p-2 text-zinc-400">{s.deptName}</td>
                        <td className={`p-2 ${activeAgg === 'MIN' || activeAgg === 'SUM' ? 'font-bold text-cyan-300 bg-purple-950/20' : ''}`}>
                          {s.age}
                        </td>
                        <td className={`p-2 ${activeAgg === 'AVG' || activeAgg === 'MAX' ? 'font-bold text-amber-300 bg-purple-950/20' : ''}`}>
                          {s.gpa.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Next Step Teaser */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-300">
                <strong className="text-purple-300 block mb-0.5">
                  <DualText en="The Next Question from the Dean:" bn="ডিন মহোদয়ের পরবর্তী প্রশ্ন:" />
                </strong>
                <DualText
                  as="p"
                  className="text-zinc-400 text-[11px]"
                  en="'Wait! Don\'t give me 1 overall number for the whole university! Which department has the best students? Compare CSE vs BBA vs EEE!'"
                  bn="'দাঁড়ান! পুরো ইউনিভার্সিটির জন্য ১টি গড় মান দিয়ে কী হবে? কোন ডিপার্টমেন্টের শিক্ষার্থীরা সবচেয়ে ভালো করছে? CSE, BBA ও EEE কে আলাদা করে দেখান!'"
                />
              </div>
              <button
                onClick={() => onNext()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-purple-600 hover:bg-purple-500 text-white transition shrink-0 cursor-pointer"
              >
                <span>Step 3: GROUP BY Department</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
  );
}
