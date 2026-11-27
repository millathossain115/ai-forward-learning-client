'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Filter,
  AlertTriangle,
  Maximize2,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA } from '../../types';

const DR_HASAN_STUDENTS = [
  { name: 'Rahim', dept: 'CSE', gpa: '3.80' },
  { name: 'Karim', dept: 'BBA', gpa: '3.40' },
  { name: 'Sumaiya', dept: 'CSE', gpa: '3.90' },
  { name: 'Ayesha', dept: 'BBA', gpa: '3.70' },
];

export default function SubqueryFlowSection() {
  const { language } = useLanguage();
  const [subqueryStep, setSubqueryStep] = useState<number>(1);
  const [isExamplePopupOpen, setIsExamplePopupOpen] = useState<boolean>(false);
  const overallAvgGpa = (STUDENTS_DATA.reduce((acc, s) => acc + s.gpa, 0) / STUDENTS_DATA.length).toFixed(4);

  useEffect(() => {
    if (!isExamplePopupOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExamplePopupOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExamplePopupOpen]);

  return (
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Terminal className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ২ • সাবকুয়েরি' : 'Part 2 • Subqueries'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="Subqueries: Query Inside Another Query"
                bn="Subqueries: একটি কুয়েরির ভেতরে আরেকটি কুয়েরি"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText as="span" en="Core definition" bn="মূল সংজ্ঞা" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 leading-relaxed font-sans"
              en="A subquery (inner/nested query) is a SQL query written inside another query (outer query). The inner query runs first and supplies intermediate data that the outer query uses to filter or compute the final result."
              bn="Subquery (inner বা nested query) হলো অন্য একটি SQL কুয়েরির (outer query) ভেতরে লেখা কুয়েরি। ভেতরের কুয়েরিটি আগে চলে একটি অন্তর্বর্তী ফলাফল তৈরি করে, যা বাইরের কুয়েরি চূড়ান্ত ফলাফল বের করতে ব্যবহার করে।"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#131824] border border-rose-500/25 space-y-2">
            <span className="text-xs font-mono font-medium text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 stroke-[1.5]" />
              <DualText as="span" en="Why not WHERE GPA > AVG(GPA)?" bn="কেন WHERE GPA > AVG(GPA) লেখা যায় না?" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 leading-relaxed font-sans"
              en="Writing WHERE GPA > AVG(GPA) throws a SQL error because WHERE filters rows before aggregates run. Hardcoding 3.58 also breaks when new students enroll. A subquery solves both dynamically."
              bn="WHERE GPA > AVG(GPA) লিখলে SQL এরর দেয়, কারণ WHERE অ্যাগ্রিগেট ফাংশনের আগে চলে। আবার 3.58 হার্ডকোড করলে নতুন ডেটা এলে ভুল হবে। Subquery ডায়নামিকভাবে সমস্যার সমাধান করে।"
            />
          </div>
        </div>

        {/* 2. How Does It Work / Flow (3-Step Execution) */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-medium text-zinc-200">
              <DualText
                as="span"
                en="2. How it works: 3-step execution flow (GPA > Average GPA)"
                bn="২. কীভাবে কাজ করে: ৩-ধাপের এক্সিকিউশন ফ্লো (GPA > গড় GPA)"
              />
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSubqueryStep(1)}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                  subqueryStep === 1 ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-medium' : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
                }`}
              >
                {language === 'bn' ? 'ধাপ ১: Inner Query' : 'Step 1: Inner Query'}
              </button>
              <button
                onClick={() => setSubqueryStep(2)}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                  subqueryStep === 2 ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-medium' : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
                }`}
              >
                {language === 'bn' ? 'ধাপ ২: মান প্রতিস্থাপন' : 'Step 2: Value Handoff'}
              </button>
              <button
                onClick={() => setSubqueryStep(3)}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                  subqueryStep === 3 ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-medium' : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
                }`}
              >
                {language === 'bn' ? 'ধাপ ৩: Outer Filter' : 'Step 3: Outer Filter'}
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
            {subqueryStep === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    <DualText as="span" en="Step 1: Inner Query Evaluates First" bn="ধাপ ১: Inner Query আগে চলে" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    <DualText as="span" en="Computes Scalar Average" bn="গড় মান হিসাব করে" />
                  </span>
                </div>
                <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400">
{`SELECT AVG(GPA) FROM Students;`}
                </pre>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-zinc-300 font-mono">
                    (3.80 + 3.40 + 3.90 + 3.20 + 3.50 + 3.70) / 6 =
                  </span>
                  <span className="text-sm font-mono font-bold text-cyan-300 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                    {overallAvgGpa}
                  </span>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 font-sans"
                  en="The database evaluates the inner query first and gets a single number: 3.5833."
                  bn="ডেটাবেস প্রথমে ভেতরের কুয়েরি চালিয়ে একটি একক মান (3.5833) বের করে।"
                />
              </div>
            )}

            {subqueryStep === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400">
                    <DualText as="span" en="Step 2: Inner Query Replaced by Result" bn="ধাপ ২: Subquery-র বদলে মান বসানো হয়" />
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">Dynamic Substitution</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase">Before (What you write):</span>
                    <pre className="text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students
WHERE GPA > (
  SELECT AVG(GPA) FROM Students
);`}
                    </pre>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-purple-500/40 space-y-1">
                    <span className="text-[10px] text-purple-300 uppercase">After (What SQL runs):</span>
                    <pre className="text-cyan-300 overflow-x-auto">
{`SELECT * FROM Students
WHERE GPA > ${overallAvgGpa};`}
                    </pre>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 font-sans"
                  en="Notice how the entire inner query disappears and turns into the plain threshold 3.5833."
                  bn="লক্ষ্য করুন, পুরো inner query-টি মুছে গিয়ে তার জায়গায় সরাসরি 3.5833 বসে গেছে।"
                />
              </div>
            )}

            {subqueryStep === 3 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    <DualText as="span" en="Step 3: Outer Query Filters Every Row" bn="ধাপ ৩: Outer Query প্রতিটি সারি যাচাই করে" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Threshold: GPA &gt; {overallAvgGpa}</span>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-zinc-300 font-mono">
                      <tr>
                        <th className="py-2 px-3">Student_ID</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Department</th>
                        <th className="py-2 px-3">GPA</th>
                        <th className="py-2 px-3 text-right">Condition (&gt; {overallAvgGpa})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {STUDENTS_DATA.map(s => {
                        const passed = s.gpa > parseFloat(overallAvgGpa);
                        return (
                          <tr key={s.id} className={passed ? 'bg-emerald-500/5' : 'opacity-45 bg-rose-500/5'}>
                            <td className="py-1.5 px-3 font-mono text-cyan-300">{s.id}</td>
                            <td className="py-1.5 px-3 text-white font-medium">{s.name}</td>
                            <td className="py-1.5 px-3 font-mono text-zinc-300">{s.dept}</td>
                            <td className="py-1.5 px-3 font-mono font-bold text-emerald-400">{s.gpa.toFixed(2)}</td>
                            <td className="py-1.5 px-3 text-right font-mono">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                passed
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              }`}>
                                {passed ? 'Kept' : 'Filtered Out'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Essential Rules (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#131824] border border-white/[0.08] space-y-1">
            <span className="font-mono font-medium text-cyan-300">1. Parentheses ( ... )</span>
            <DualText as="p" className="text-zinc-400 font-sans" en="Every subquery must be wrapped in parentheses." bn="প্রতিটি সাবকুয়েরি অবশ্যই ব্র্যাকেটের ভেতর থাকতে হবে।" />
          </div>
          <div className="p-3 rounded-xl bg-[#131824] border border-white/[0.08] space-y-1">
            <span className="font-mono font-medium text-cyan-300">2. Inner Runs First</span>
            <DualText as="p" className="text-zinc-400 font-sans" en="SQL evaluates the inner query before the outer query." bn="মূল কুয়েরির আগে ভেতরের কুয়েরিটি রান হয়।" />
          </div>
          <div className="p-3 rounded-xl bg-[#131824] border border-white/[0.08] space-y-1">
            <span className="font-mono font-medium text-cyan-300">3. No ORDER BY</span>
            <DualText as="p" className="text-zinc-400 font-sans" en="Ignored inside a subquery unless paired with LIMIT." bn="LIMIT ছাড়া সাবকুয়েরিতে ORDER BY কাজ করে না।" />
          </div>
        </div>

        {/* 4. Real-Life Problem Using All 3 Practice Tables */}
        <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-medium text-cyan-300">
              <DualText
                as="span"
                en="Real-life example: Students in Dr. Hasan's course"
                bn="বাস্তব উদাহরণ: Dr. Hasan-এর কোর্সের শিক্ষার্থী"
              />
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-400">Courses → Enrollments → Students</span>
              <button
                onClick={() => setIsExamplePopupOpen(true)}
                title={language === 'bn' ? 'বড় পপ-আপে দেখুন' : 'Open Popup View'}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0d1117] hover:bg-[#1a2130] border border-white/[0.08] text-[11px] font-mono text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3 h-3 stroke-[1.5]" />
                <span>{language === 'bn' ? 'পপ-আপ' : 'Pop-up'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
            <pre className="p-3 bg-[#0a0d14] rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-white/[0.06] flex items-center">
{`SELECT Name, Department, GPA
FROM Students
WHERE Student_ID IN (
    SELECT Student_ID FROM Enrollments
    WHERE Course_ID IN (
        SELECT Course_ID FROM Courses
        WHERE Instructor = 'Dr. Hasan'
    )
);`}
            </pre>

            <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#0a0d14]">
              <div className="px-3 py-1.5 bg-[#0d1117] border-b border-white/[0.08] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Output</span>
                <span className="text-emerald-400">4 rows</span>
              </div>
              <table className="w-full text-xs text-left font-mono">
                <thead className="text-zinc-400 border-b border-white/[0.06]">
                  <tr>
                    <th className="py-1.5 px-3">Name</th>
                    <th className="py-1.5 px-3">Department</th>
                    <th className="py-1.5 px-3 text-right">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-zinc-200 tabular-nums">
                  {DR_HASAN_STUDENTS.map(row => (
                    <tr key={row.name}>
                      <td className="py-1.5 px-3 font-sans text-zinc-100">{row.name}</td>
                      <td className="py-1.5 px-3 text-cyan-300">{row.dept}</td>
                      <td className="py-1.5 px-3 text-right text-emerald-400">{row.gpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Popup Modal for 3-Table Real-Life Example */}
        {isExamplePopupOpen && (
          <div
            onClick={() => setIsExamplePopupOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-[#0d1117] border border-white/[0.12] shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-[11px] font-mono text-cyan-300">Courses → Enrollments → Students</span>
                  <h3 className="text-base font-semibold text-zinc-100 mt-0.5">
                    <DualText
                      as="span"
                      en="Real-life example: Students in Dr. Hasan's course"
                      bn="বাস্তব উদাহরণ: Dr. Hasan-এর কোর্সের শিক্ষার্থী"
                    />
                  </h3>
                </div>
                <button
                  onClick={() => setIsExamplePopupOpen(false)}
                  className="p-1.5 rounded-lg bg-[#131824] hover:bg-[#1a2130] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <pre className="p-4 bg-[#0a0d14] rounded-xl text-sm font-mono text-emerald-400 overflow-x-auto border border-white/[0.08] leading-relaxed">
{`SELECT Name, Department, GPA
FROM Students
WHERE Student_ID IN (
    SELECT Student_ID FROM Enrollments
    WHERE Course_ID IN (
        SELECT Course_ID FROM Courses
        WHERE Instructor = 'Dr. Hasan'
    )
);`}
                </pre>

                <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0d14]">
                  <div className="px-4 py-2 bg-[#131824] border-b border-white/[0.08] text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>Output Table</span>
                    <span className="text-emerald-400">4 rows</span>
                  </div>
                  <table className="w-full text-sm text-left font-mono">
                    <thead className="text-zinc-400 border-b border-white/[0.08] text-xs">
                      <tr>
                        <th className="py-2.5 px-4">Name</th>
                        <th className="py-2.5 px-4">Department</th>
                        <th className="py-2.5 px-4 text-right">GPA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-zinc-200 tabular-nums">
                      {DR_HASAN_STUDENTS.map(row => (
                        <tr key={row.name}>
                          <td className="py-2.5 px-4 font-sans text-zinc-100">{row.name}</td>
                          <td className="py-2.5 px-4 text-cyan-300">{row.dept}</td>
                          <td className="py-2.5 px-4 text-right text-emerald-400">{row.gpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
  );
}
