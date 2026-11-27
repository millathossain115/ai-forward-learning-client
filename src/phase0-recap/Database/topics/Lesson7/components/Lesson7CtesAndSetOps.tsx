'use client';

import React, { useState } from 'react';
import { Check, Code2, Copy, GitBranch, Layers, Split, Sparkles, Table2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const RECURSIVE_TRACE = [
  {
    depth: 0,
    phaseEn: 'Anchor Member (Base Case)',
    phaseBn: 'অ্যাঙ্কর মেম্বার (বেস কেস)',
    course: 'CSE-101 • Programming',
    prereq: 'NULL (Root)',
    path: 'CSE-101',
  },
  {
    depth: 1,
    phaseEn: 'Recursive Iteration 1',
    phaseBn: 'রিকার্সিভ ধাপ ১',
    course: 'CSE-301 • DBMS',
    prereq: 'CSE-101',
    path: 'CSE-101 → CSE-301',
  },
  {
    depth: 2,
    phaseEn: 'Recursive Iteration 2',
    phaseBn: 'রিকার্সিভ ধাপ ২',
    course: 'CSE-305 • Networking',
    prereq: 'CSE-301',
    path: 'CSE-101 → CSE-301 → CSE-305',
  },
];

export default function Lesson7CtesAndSetOps() {
  const { language } = useLanguage();
  const [activeSetOp, setActiveSetOp] = useState<'UNION' | 'UNION_ALL' | 'INTERSECT' | 'EXCEPT'>('UNION');
  const [activeFunctionCat, setActiveFunctionCat] = useState<'string' | 'numeric' | 'date' | 'null'>('null');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [recursiveStep, setRecursiveStep] = useState<number>(2);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const cte1Sql = `WITH AverageGPA AS (
    SELECT AVG(GPA) AS Avg_GPA 
    FROM Students
)
SELECT Name, GPA 
FROM Students, AverageGPA
WHERE GPA > Avg_GPA;`;

  const cte2Sql = `WITH CSE_Students AS (
    SELECT Student_ID, Name, GPA 
    FROM Students 
    WHERE Department = 'CSE'
)
SELECT Name, GPA 
FROM CSE_Students 
WHERE GPA >= 3.80;`;

  const recursiveSql = `WITH RECURSIVE CoursePath AS (
    -- Anchor: Root course with no prerequisite
    SELECT Course_ID, Title, Prereq_ID, 0 AS Depth
    FROM Courses WHERE Prereq_ID IS NULL
    UNION ALL
    -- Recursive: Join next dependent course
    SELECT c.Course_ID, c.Title, c.Prereq_ID, cp.Depth + 1
    FROM Courses c
    INNER JOIN CoursePath cp ON c.Prereq_ID = cp.Course_ID
)
SELECT * FROM CoursePath;`;

  return (
    <>
      {/* PART 8: COMMON TABLE EXPRESSIONS (CTEs) */}
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Code2 className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ৮ • CTE (WITH ক্লজ)' : 'Part 8 • CTEs (WITH Clause)'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="Common Table Expressions (CTEs), Recursive CTEs & Views"
                bn="Common Table Expressions (CTEs), Recursive CTE ও Views"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="A CTE creates a temporary, named result set defined before the main query using the WITH keyword. It makes complex nested queries far easier to read, debug, and maintain."
          bn="CTE মূল কুয়েরির আগে WITH কিওয়ার্ড ব্যবহার করে একটি অস্থায়ী নামযুক্ত রেজাল্ট সেট তৈরি করে। এটি জটিল নেস্টেড কুয়েরিকে পড়া, ডিবাগ ও মেইনটেইন করা অনেক সহজ করে।"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                <DualText as="span" en="Example 1: Average GPA CTE" bn="উদাহরণ ১: গড় GPA CTE" />
              </span>
              <button
                onClick={() => handleCopy(cte1Sql, 'cte1')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'cte1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'cte1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
              {cte1Sql}
            </pre>
            <div className="rounded-lg bg-[#0b0e1b] border border-emerald-500/20 overflow-hidden">
              <div className="px-3 py-1.5 bg-emerald-950/30 border-b border-emerald-500/20 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                <Table2 className="w-3 h-3" />
                <span>Output (Avg_GPA = 3.5833 • 3 rows)</span>
              </div>
              <table className="w-full text-[11px] font-mono text-left">
                <thead className="text-cyan-300 border-b border-slate-800">
                  <tr><th className="px-3 py-1">Name</th><th className="px-3 py-1">GPA</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                  <tr><td className="px-3 py-1">Rahim</td><td className="px-3 py-1 text-emerald-400">3.80</td></tr>
                  <tr><td className="px-3 py-1">Sumaiya</td><td className="px-3 py-1 text-emerald-400">3.90</td></tr>
                  <tr><td className="px-3 py-1">Ayesha</td><td className="px-3 py-1 text-emerald-400">3.70</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                <DualText as="span" en="Example 2: Chaining & Filtering CTE" bn="উদাহরণ ২: ফিল্টারিং CTE" />
              </span>
              <button
                onClick={() => handleCopy(cte2Sql, 'cte2')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'cte2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'cte2' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
              {cte2Sql}
            </pre>
            <div className="rounded-lg bg-[#0b0e1b] border border-purple-500/20 overflow-hidden">
              <div className="px-3 py-1.5 bg-purple-950/30 border-b border-purple-500/20 text-[10px] font-mono text-purple-300 flex items-center gap-1.5">
                <Table2 className="w-3 h-3" />
                <span>Output (CSE &amp; GPA &gt;= 3.80 • 2 rows)</span>
              </div>
              <table className="w-full text-[11px] font-mono text-left">
                <thead className="text-cyan-300 border-b border-slate-800">
                  <tr><th className="px-3 py-1">Name</th><th className="px-3 py-1">GPA</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                  <tr><td className="px-3 py-1">Rahim</td><td className="px-3 py-1 text-emerald-400">3.80</td></tr>
                  <tr><td className="px-3 py-1">Sumaiya</td><td className="px-3 py-1 text-emerald-400">3.90</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recursive CTE Interactive Tracer */}
        <div className="p-4 rounded-xl bg-[#0b0e1c] border border-cyan-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
              <GitBranch className="w-4 h-4" />
              <DualText
                as="span"
                en="WITH RECURSIVE CTE — Course Prerequisite Chain"
                bn="WITH RECURSIVE CTE — কোর্স প্রিরিকুইজিট চেইন"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((d) => (
                <button
                  key={d}
                  onClick={() => setRecursiveStep(d)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                    recursiveStep === d
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {d === 0 ? 'Depth 0 (Anchor)' : `Depth ${d}`}
                </button>
              ))}
              <button
                onClick={() => handleCopy(recursiveSql, 'rec')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer ml-1"
              >
                {copiedId === 'rec' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'rec' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <pre className="p-3 bg-black/60 rounded text-[11px] font-mono text-emerald-400 overflow-x-auto">
              {recursiveSql}
            </pre>
            <div className="rounded-lg bg-[#14182d] border border-slate-800 overflow-hidden">
              <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] font-mono text-cyan-300">
                Accumulated Rows up to Depth {recursiveStep}
              </div>
              <table className="w-full text-[11px] font-mono text-left">
                <thead className="text-zinc-400 border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-1.5">Depth</th>
                    <th className="px-3 py-1.5">Course</th>
                    <th className="px-3 py-1.5">Prerequisite Path</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {RECURSIVE_TRACE.filter((r) => r.depth <= recursiveStep).map((r) => (
                    <tr key={r.depth} className={r.depth === recursiveStep ? 'bg-cyan-500/10' : ''}>
                      <td className="px-3 py-1.5 text-amber-300 font-bold">{r.depth}</td>
                      <td className="px-3 py-1.5 text-white">{r.course}</td>
                      <td className="px-3 py-1.5 text-emerald-400">{r.path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* VIEW vs CTE vs Derived Table Comparison */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
            <Layers className="w-4 h-4" />
            <DualText
              as="span"
              en="CREATE VIEW vs CTE (WITH) vs Derived Table"
              bn="CREATE VIEW বনাম CTE (WITH) বনাম Derived Table"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-sans">
              <thead className="text-[11px] font-mono text-zinc-400 border-b border-slate-800">
                <tr>
                  <th className="py-1.5 px-2.5">Feature</th>
                  <th className="py-1.5 px-2.5 text-cyan-300">Derived Table (FROM (...))</th>
                  <th className="py-1.5 px-2.5 text-emerald-300">CTE (WITH ...)</th>
                  <th className="py-1.5 px-2.5 text-purple-300">CREATE VIEW</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                <tr>
                  <td className="py-1.5 px-2.5 font-semibold text-white">Lifespan</td>
                  <td className="py-1.5 px-2.5">Single query only</td>
                  <td className="py-1.5 px-2.5">Single query only</td>
                  <td className="py-1.5 px-2.5">Persisted in DB schema</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2.5 font-semibold text-white">Reusability</td>
                  <td className="py-1.5 px-2.5">Inline, cannot reference twice</td>
                  <td className="py-1.5 px-2.5">Reusable across query + supports recursion</td>
                  <td className="py-1.5 px-2.5">Shared across all users &amp; queries</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2.5 font-semibold text-white">Best Use Case</td>
                  <td className="py-1.5 px-2.5">Quick one-off sub-aggregation</td>
                  <td className="py-1.5 px-2.5">Readable multi-step analytics &amp; trees</td>
                  <td className="py-1.5 px-2.5">Security abstraction &amp; standard reports</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PART 9: SQL SET OPERATIONS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৯ • সেট অপারেশন' : 'Part 9 • Set Operations'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="SQL Set Operations: UNION, UNION ALL, INTERSECT & EXCEPT"
                bn="SQL সেট অপারেশন: UNION, UNION ALL, INTERSECT ও EXCEPT"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Set operations combine the results of two or more independent SELECT statements (with matching column count & compatible types) into one result set:"
          bn="একই কলাম সংখ্যা ও সামঞ্জস্যপূর্ণ ডেটা টাইপযুক্ত দুটি বা ততোধিক SELECT কুয়েরির ফলাফল একত্রিত করতে সেট অপারেশন ব্যবহৃত হয়:"
        />

        <div className="flex flex-wrap gap-2">
          {(['UNION', 'UNION_ALL', 'INTERSECT', 'EXCEPT'] as const).map(op => (
            <button
              key={op}
              onClick={() => setActiveSetOp(op)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                activeSetOp === op
                  ? 'bg-indigo-600 text-white  '
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {op.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400">Query 1: CSE Students</span>
              <div className="text-xs text-zinc-300 font-mono">[101: Rahim, 103: Sumaiya, 105: Tanvir]</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400">Query 2: BBA Students + Rahim</span>
              <div className="text-xs text-zinc-300 font-mono">[102: Karim, 106: Ayesha, 101: Rahim]</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                <DualText as="span" en="Output Result Set:" bn="আউটপুট রেজাল্ট:" />
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {activeSetOp === 'UNION' && (language === 'bn' ? 'ডুপ্লিকেট বাদ (শুধু ইউনিক সারি)' : 'Duplicates Removed (Unique Rows Only)')}
                {activeSetOp === 'UNION_ALL' && (language === 'bn' ? 'ডুপ্লিকেটসহ সব (সবচেয়ে দ্রুত)' : 'Duplicates Preserved (Fastest)')}
                {activeSetOp === 'INTERSECT' && (language === 'bn' ? 'উভয় সেটে থাকা কমন সারি' : 'Shared Rows Common to Both Sets')}
                {activeSetOp === 'EXCEPT' && (language === 'bn' ? 'প্রথম সেট থেকে দ্বিতীয় সেট বাদ' : 'Left Query Minus Right Query')}
              </span>
            </div>

            <div className="font-mono text-xs text-zinc-200">
              {activeSetOp === 'UNION' && (
                <div className="space-y-1">
                  <div>101 - Rahim (Appears once)</div>
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <div>102 - Karim</div>
                  <div>106 - Ayesha</div>
                </div>
              )}
              {activeSetOp === 'UNION_ALL' && (
                <div className="space-y-1 text-amber-300">
                  <div>101 - Rahim</div>
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <div>102 - Karim</div>
                  <div>106 - Ayesha</div>
                  <div className="text-rose-400 font-bold">101 - Rahim (Duplicate row retained!)</div>
                </div>
              )}
              {activeSetOp === 'INTERSECT' && (
                <div className="text-emerald-300 font-bold">
                  <div>101 - Rahim (Present in both queries)</div>
                  <DualText
                    as="p"
                    className="text-[10px] text-zinc-400 font-sans font-normal mt-1"
                    en="* Note: INTERSECT is native in PostgreSQL/Oracle; older MySQL simulates via INNER JOIN or EXISTS."
                    bn="* নোট: PostgreSQL/Oracle-এ INTERSECT সরাসরি কাজ করে; পুরনো MySQL-এ INNER JOIN বা EXISTS দিয়ে করতে হয়।"
                  />
                </div>
              )}
              {activeSetOp === 'EXCEPT' && (
                <div className="text-cyan-300">
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <DualText
                    as="p"
                    className="text-[10px] text-zinc-400 font-sans font-normal mt-1"
                    en="* Note: EXCEPT removes Rahim because he exists in Query 2."
                    bn="* নোট: Query 2-তে থাকায় Rahim বাদ পড়েছে।"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PART 10: NULL-SAFE & CONDITIONAL ANALYTICS */}
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Sparkles className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ১০ • NULL-নিরাপদ ও কন্ডিশনাল SQL' : 'Part 10 • NULL-Safe & Conditional SQL'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="COALESCE, NULLIF & Conditional Analytics"
                bn="COALESCE, NULLIF ও কন্ডিশনাল অ্যানালিটিক্স"
              />
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {([
            { id: 'null' as const, label: 'COALESCE & NULLIF' },
            { id: 'string' as const, label: 'CASE WHEN Bucketing' },
            { id: 'date' as const, label: 'Date & Temporal' },
            { id: 'numeric' as const, label: 'Safe Math & Rounding' },
          ]).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFunctionCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
                activeFunctionCat === cat.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                  : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-3">
          {activeFunctionCat === 'null' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#0a0d14] rounded-xl border border-white/[0.08] space-y-2">
                <span className="text-cyan-300 font-mono font-medium">COALESCE(val1, val2, ... fallback)</span>
                <DualText
                  as="p"
                  className="text-zinc-400 font-sans leading-relaxed"
                  en="Returns the first non-NULL value. Replaces missing values (like Nabila's NULL Email) with safe defaults."
                  bn="তালিকার প্রথম non-NULL মান ফেরত দেয়। অনুপস্থিত মানের (যেমন Nabila-র NULL Email) বদলে নিরাপদ ডিফল্ট বসায়।"
                />
                <pre className="p-2.5 bg-black/50 rounded font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`SELECT Name, COALESCE(Email, 'No Email') AS Contact
FROM Students;`}
                </pre>
              </div>
              <div className="p-3.5 bg-[#0a0d14] rounded-xl border border-white/[0.08] space-y-2">
                <span className="text-cyan-300 font-mono font-medium">NULLIF(expr1, expr2) — Safe Division</span>
                <DualText
                  as="p"
                  className="text-zinc-400 font-sans leading-relaxed"
                  en="Returns NULL if expr1 = expr2, otherwise returns expr1. Essential to prevent division-by-zero errors in analytics."
                  bn="expr1 = expr2 হলে NULL ফেরত দেয়। অ্যানালিটিক্সে শূন্য দিয়ে ভাগ করার (division-by-zero) এরর ঠেকাতে অপরিহার্য।"
                />
                <pre className="p-2.5 bg-black/50 rounded font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`SELECT Total_Points / NULLIF(Credits, 0) AS GPA
FROM Courses;`}
                </pre>
              </div>
            </div>
          )}

          {activeFunctionCat === 'string' && (
            <div className="p-3.5 bg-[#0a0d14] rounded-xl border border-white/[0.08] space-y-2 text-xs">
              <span className="text-cyan-300 font-mono font-medium">CASE WHEN — Conditional Bucketing</span>
              <DualText
                as="p"
                className="text-zinc-400 font-sans"
                en="Classify rows dynamically inside SELECT or inside SUM(...) for conditional pivot counts."
                bn="SELECT বা SUM(...)-এর ভেতরে শর্তসাপেক্ষ ক্যাটাগরি ও পিভট গণনা করতে ব্যবহৃত হয়।"
              />
              <pre className="p-2.5 bg-black/50 rounded font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA,
  CASE WHEN GPA >= 3.80 THEN 'Dean List' WHEN GPA >= 3.50 THEN 'Honors' ELSE 'Standard' END AS Standing
FROM Students;`}
              </pre>
            </div>
          )}

          {activeFunctionCat === 'numeric' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#0a0d14] rounded-xl border border-white/[0.08]">
                <span className="text-cyan-300 font-medium">ROUND(val, decimals)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Standard rounding for averages" bn="গড় মান রাউন্ড করা" />
                <code className="text-[11px] text-emerald-300 block bg-black/40 p-1.5 rounded mt-1.5">ROUND(3.5833, 2) =&gt; 3.58</code>
              </div>
              <div className="p-3 bg-[#0a0d14] rounded-xl border border-white/[0.08]">
                <span className="text-cyan-300 font-medium">COALESCE(SUM(x), 0)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Turn empty aggregate NULL into 0" bn="খালি অ্যাগ্রিগেটের NULL-কে 0 করা" />
                <code className="text-[11px] text-emerald-300 block bg-black/40 p-1.5 rounded mt-1.5">COALESCE(SUM(Credits), 0)</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'date' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#0a0d14] rounded-xl border border-white/[0.08]">
                <span className="text-cyan-300 font-medium">YEAR(date) / DATE_TRUNC</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Group admissions by year or month" bn="বছর বা মাস অনুযায়ী গ্রুপিং" />
                <code className="text-[11px] text-emerald-300 block bg-black/40 p-1.5 rounded mt-1.5">YEAR(&apos;2024-01-15&apos;) =&gt; 2024</code>
              </div>
              <div className="p-3 bg-[#0a0d14] rounded-xl border border-white/[0.08]">
                <span className="text-cyan-300 font-medium">DATEDIFF(d1, d2)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Days elapsed since admission" bn="ভর্তির পর থেকে অতিবাহিত দিন" />
                <code className="text-[11px] text-emerald-300 block bg-black/40 p-1.5 rounded mt-1.5">DATEDIFF(CURRENT_DATE(), Admission_Date)</code>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
