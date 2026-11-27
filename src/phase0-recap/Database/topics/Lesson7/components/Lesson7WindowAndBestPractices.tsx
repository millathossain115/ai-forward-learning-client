'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA, DEPT_AVERAGES } from '../types';

export default function Lesson7WindowAndBestPractices() {
  const { language } = useLanguage();
  const [windowDemoMode, setWindowDemoMode] = useState<'window' | 'groupby'>('window');
  const [hasRankingTies, setHasRankingTies] = useState<boolean>(false);
  const [advWindowTab, setAdvWindowTab] = useState<'topn' | 'lag' | 'running'>('topn');

  return (
    <>
      {/* PART 14: WINDOW FUNCTIONS */}
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Sparkles className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ১৪ • উইন্ডো ফাংশন' : 'Part 14 • Window Functions'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="Window Functions: OVER, PARTITION BY, RANK & DENSE_RANK"
                bn="Window Functions: OVER, PARTITION BY, RANK ও DENSE_RANK"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-400 leading-relaxed font-sans"
          en="Unlike GROUP BY (which collapses multiple rows into one summary row), Window Functions compute aggregates across related rows while preserving every individual row."
          bn="GROUP BY যেমন একাধিক সারিকে ভেঙে একটি সামারি সারিতে পরিণত করে, Window Functions তা করে না—বরং প্রতিটি ব্যক্তিগত সারি অক্ষুণ্ণ রেখেই গ্রুপভিত্তিক হিসাব দেখায়।"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setWindowDemoMode('window')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
              windowDemoMode === 'window'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
            }`}
          >
            Window: OVER (PARTITION BY Department)
          </button>
          <button
            onClick={() => setWindowDemoMode('groupby')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
              windowDemoMode === 'groupby'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
            }`}
          >
            Traditional GROUP BY Department
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
          {windowDemoMode === 'window' ? (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Student GPA</th>
                  <th className="py-2.5 px-3 text-cyan-400">Dept_Avg (Preserves Row)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {STUDENTS_DATA.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-white font-medium">{s.name}</td>
                    <td className="py-2 px-3 font-mono">{s.dept}</td>
                    <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                    <td className="py-2 px-3 font-mono text-cyan-300 font-bold">
                      {DEPT_AVERAGES[s.dept].toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3 text-amber-400">Dept_Avg (Collapsed Rows)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {Object.entries(DEPT_AVERAGES).map(([dept, avg]) => (
                  <tr key={dept} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono font-bold text-white">{dept}</td>
                    <td className="py-2 px-3 font-mono text-amber-300 font-bold">{avg.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              <DualText
                as="span"
                en="Ranking Functions: ROW_NUMBER() vs RANK() vs DENSE_RANK()"
                bn="র‍্যাংকিং ফাংশন: ROW_NUMBER() বনাম RANK() বনাম DENSE_RANK()"
              />
            </span>
            <button
              onClick={() => setHasRankingTies(!hasRankingTies)}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 cursor-pointer"
            >
              {hasRankingTies
                ? (language === 'bn' ? 'স্বাভাবিক GPA দেখুন' : 'View Distinct GPAs')
                : (language === 'bn' ? 'সমান GPA সিমুলেট করুন (দুটি 3.90)' : 'Simulate Tied GPAs (Two 3.90s)')}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">GPA</th>
                  <th className="py-2.5 px-3 text-indigo-400">ROW_NUMBER()</th>
                  <th className="py-2.5 px-3 text-amber-400">RANK() (Gaps)</th>
                  <th className="py-2.5 px-3 text-emerald-400">DENSE_RANK() (No Gaps)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {hasRankingTies ? (
                  <>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-white">Rahim</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">3.90 (Tied)</td>
                      <td className="py-2 px-3 text-indigo-300">1</td>
                      <td className="py-2 px-3 text-amber-300 font-bold">1</td>
                      <td className="py-2 px-3 text-emerald-300 font-bold">1</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-white">Karim</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">3.90 (Tied)</td>
                      <td className="py-2 px-3 text-indigo-300">2</td>
                      <td className="py-2 px-3 text-amber-300 font-bold">1</td>
                      <td className="py-2 px-3 text-emerald-300 font-bold">1</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-white">Sumaiya</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">3.70</td>
                      <td className="py-2 px-3 text-indigo-300">3</td>
                      <td className="py-2 px-3 text-amber-400 font-bold bg-amber-500/10">3 (Skipped 2)</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold bg-emerald-500/10">2 (Continuous)</td>
                    </tr>
                  </>
                ) : (
                  STUDENTS_DATA.slice()
                    .sort((a, b) => b.gpa - a.gpa)
                    .map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 text-white">{s.name}</td>
                        <td className="py-2 px-3 text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                        <td className="py-2 px-3 text-indigo-300">{idx + 1}</td>
                        <td className="py-2 px-3 text-amber-300">{idx + 1}</td>
                        <td className="py-2 px-3 text-emerald-300">{idx + 1}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advanced Window Functions Lab: ROW_NUMBER Top-N, LAG/LEAD, Running Total */}
        <div className="p-4 rounded-xl bg-[#0b0e1c] border border-purple-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <DualText
                as="span"
                en="Interactive Window Lab: Top-N per Group, LAG/LEAD & Running Total"
                bn="ইন্টারঅ্যাক্টিভ উইন্ডো ল্যাব: Top-N, LAG/LEAD ও Running Total"
              />
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'topn' as const, label: 'ROW_NUMBER() Top-1/Dept' },
                { id: 'lag' as const, label: 'LAG() / LEAD() Delta' },
                { id: 'running' as const, label: 'Running Avg / Sum' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAdvWindowTab(t.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                    advWindowTab === t.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <pre className="p-3 bg-black/60 rounded text-[11px] font-mono text-emerald-400 overflow-x-auto">
              {advWindowTab === 'topn' &&
`WITH Ranked AS (
  SELECT Name, Department, GPA,
    ROW_NUMBER() OVER (
      PARTITION BY Department ORDER BY GPA DESC
    ) AS rn
  FROM Students
)
SELECT Name, Department, GPA
FROM Ranked WHERE rn = 1;`}
              {advWindowTab === 'lag' &&
`SELECT Name, Admission_Date, GPA,
  LAG(GPA) OVER (ORDER BY Admission_Date) AS Prev_GPA,
  ROUND(GPA - LAG(GPA) OVER (ORDER BY Admission_Date), 2) AS Delta
FROM Students;`}
              {advWindowTab === 'running' &&
`SELECT Name, Admission_Date, GPA,
  ROUND(AVG(GPA) OVER (
    ORDER BY Admission_Date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS Running_Avg_GPA
FROM Students;`}
            </pre>

            <div className="rounded-lg bg-[#14182d] border border-slate-800 overflow-hidden">
              {advWindowTab === 'topn' && (
                <table className="w-full text-[11px] font-mono text-left">
                  <thead className="bg-slate-900 text-cyan-300 border-b border-slate-800">
                    <tr><th className="px-3 py-1.5">Name</th><th className="px-3 py-1.5">Department</th><th className="px-3 py-1.5">GPA</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                    <tr><td className="px-3 py-1.5">Sumaiya</td><td className="px-3 py-1.5">CSE</td><td className="px-3 py-1.5 text-emerald-400">3.90</td></tr>
                    <tr><td className="px-3 py-1.5">Ayesha</td><td className="px-3 py-1.5">BBA</td><td className="px-3 py-1.5 text-emerald-400">3.70</td></tr>
                    <tr><td className="px-3 py-1.5">Nabila</td><td className="px-3 py-1.5">EEE</td><td className="px-3 py-1.5 text-emerald-400">3.20</td></tr>
                  </tbody>
                </table>
              )}
              {advWindowTab === 'lag' && (
                <table className="w-full text-[11px] font-mono text-left">
                  <thead className="bg-slate-900 text-cyan-300 border-b border-slate-800">
                    <tr><th className="px-3 py-1.5">Name</th><th className="px-3 py-1.5">GPA</th><th className="px-3 py-1.5">Prev_GPA</th><th className="px-3 py-1.5">Delta</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                    {[...STUDENTS_DATA]
                      .sort((a, b) => a.admissionDate.localeCompare(b.admissionDate))
                      .map((s, i, arr) => {
                        const prev = i > 0 ? arr[i - 1].gpa : null;
                        const delta = prev !== null ? (s.gpa - prev).toFixed(2) : 'NULL';
                        return (
                          <tr key={s.id}>
                            <td className="px-3 py-1">{s.name}</td>
                            <td className="px-3 py-1 text-emerald-400">{s.gpa.toFixed(2)}</td>
                            <td className="px-3 py-1 text-zinc-400">{prev !== null ? prev.toFixed(2) : 'NULL'}</td>
                            <td className={`px-3 py-1 font-bold ${delta.startsWith('-') ? 'text-rose-400' : 'text-cyan-300'}`}>
                              {delta !== 'NULL' && !delta.startsWith('-') ? `+${delta}` : delta}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
              {advWindowTab === 'running' && (
                <table className="w-full text-[11px] font-mono text-left">
                  <thead className="bg-slate-900 text-cyan-300 border-b border-slate-800">
                    <tr><th className="px-3 py-1.5">Name</th><th className="px-3 py-1.5">Admission</th><th className="px-3 py-1.5">GPA</th><th className="px-3 py-1.5">Running_Avg</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                    {[...STUDENTS_DATA]
                      .sort((a, b) => a.admissionDate.localeCompare(b.admissionDate))
                      .map((s, i, arr) => {
                        const running = arr.slice(0, i + 1).reduce((acc, x) => acc + x.gpa, 0) / (i + 1);
                        return (
                          <tr key={s.id}>
                            <td className="px-3 py-1">{s.name}</td>
                            <td className="px-3 py-1 text-zinc-400">{s.admissionDate}</td>
                            <td className="px-3 py-1 text-emerald-400">{s.gpa.toFixed(2)}</td>
                            <td className="px-3 py-1 text-purple-300 font-bold">{running.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PART 15: SQL QUERY PERFORMANCE & OPTIMIZATION */}
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ১৫ • কুয়েরি পারফরম্যান্স ও অপটিমাইজেশন' : 'Part 15 • Query Performance & Optimization'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText as="span" en="SQL Query Performance & Optimization" bn="SQL কুয়েরি পারফরম্যান্স ও অপটিমাইজেশন" />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText as="span" en="1. Avoid SELECT * in Production Queries" bn="১. প্রোডাকশন কুয়েরিতে SELECT * এড়িয়ে চলুন" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              en="Fetching unnecessary columns wastes network bandwidth, blocks covering indexes, and slows down sorting."
              bn="অপ্রয়োজনীয় কলাম আনলে নেটওয়ার্ক ব্যান্ডউইথ নষ্ট হয় এবং সর্টিং ধীর হয়ে যায়।"
            />
          </div>
          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText as="span" en="2. Keep WHERE Predicates Sargable" bn="২. WHERE শর্ত Sargable রাখুন" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              en="Avoid wrapping indexed columns in functions like YEAR(Admission_Date) = 2024; use range checks (>= '2024-01-01') instead."
              bn="WHERE-এ কলামের ওপর ফাংশন (যেমন YEAR(col) = 2024) না বসিয়ে রেঞ্জ তুলনা (>= '2024-01-01') ব্যবহার করুন।"
            />
          </div>
          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText as="span" en="3. Prefer EXISTS & UNION ALL" bn="৩. EXISTS ও UNION ALL অগ্রাধিকার দিন" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              en="EXISTS short-circuits on the first match and is NULL-safe; UNION ALL skips expensive duplicate sorting when rows are already distinct."
              bn="EXISTS প্রথম মিল পেলেই থামে এবং NULL-নিরাপদ; ডুপ্লিকেট না থাকলে UNION ALL অযথা সর্টিং এড়ায়।"
            />
          </div>
          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText as="span" en="4. Replace Deep Subqueries with CTEs" bn="৪. জটিল Subquery-র বদলে CTE ব্যবহার" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-400 font-sans leading-relaxed"
              en="Break multi-step analytics into named WITH blocks and clear table aliases (S, C, E) so queries stay readable and debuggable."
              bn="একাধিক ধাপের কুয়েরিকে WITH ব্লক ও পরিষ্কার Alias (S, C, E) দিয়ে ভাগ করলে ডিবাগ করা সহজ হয়।"
            />
          </div>
        </div>
      </section>
    </>
  );
}
