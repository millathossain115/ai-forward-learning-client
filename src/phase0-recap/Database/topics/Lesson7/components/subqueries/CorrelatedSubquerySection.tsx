'use client';

import React, { useState } from 'react';
import {
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA, DEPT_AVERAGES } from '../../types';

export default function CorrelatedSubquerySection() {
  const { language } = useLanguage();
  const [correlatedActiveStudentIdx, setCorrelatedActiveStudentIdx] = useState<number>(0);
  const currentCorrelatedStudent = STUDENTS_DATA[correlatedActiveStudentIdx];
  const currentDeptAvg = DEPT_AVERAGES[currentCorrelatedStudent.dept];
  const isCorrelatedQualified = currentCorrelatedStudent.gpa > currentDeptAvg;

  return (
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Zap className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ৭ • কোরিলেটেড সাবকুয়েরি' : 'Part 7 • Correlated Subqueries'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="Correlated Subqueries: Row-by-Row Execution Tracer"
                bn="Correlated Subqueries: সারি ধরে ধরে এক্সিকিউশন ট্রেসার"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="A correlated subquery cannot run alone. It takes the current outer row value as input, computes the matching department average, and compares them:"
          bn="Correlated subquery একা চলতে পারে না। এটি বাইরের বর্তমান সারির মান ইনপুট নিয়ে সংশ্লিষ্ট ডিপার্টমেন্টের গড় হিসাব করে এবং তুলনা করে:"
        />

        <pre className="p-3 rounded-lg bg-black/60 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Find students with GPA higher than their own department's average:
SELECT S.Name, S.Department, S.GPA 
FROM Students S
WHERE S.GPA > (
    SELECT AVG(S2.GPA) 
    FROM Students S2 
    WHERE S2.Department = S.Department  -- Correlated link!
);`}
        </pre>

        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            <DualText
              as="span"
              en="Click a Student to Trace Outer vs Inner Execution:"
              bn="Outer ও Inner কুয়েরির ধাপ দেখতে একজন শিক্ষার্থী বেছে নিন:"
            />
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STUDENTS_DATA.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCorrelatedActiveStudentIdx(idx)}
                className={`p-2.5 rounded-lg text-left border transition-colors cursor-pointer ${
                  correlatedActiveStudentIdx === idx
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-zinc-100'
                    : 'bg-[#131824] border-white/[0.08] text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <div className="text-xs font-medium font-mono">{s.name}</div>
                <div className="text-[11px] text-zinc-400 tabular-nums">{s.dept} • GPA {s.gpa.toFixed(2)}</div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                  <DualText as="span" en="1. Outer Query Current Row (S):" bn="১. Outer Query বর্তমান সারি (S):" />
                </span>
                <div className="text-sm font-bold text-white font-mono">
                  {currentCorrelatedStudent.name} (ID: {currentCorrelatedStudent.id}, Dept: {currentCorrelatedStudent.dept}, GPA: {currentCorrelatedStudent.gpa.toFixed(2)})
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  <DualText as="span" en="2. Inner Query Dept Average (S2):" bn="২. Inner Query ডিপার্টমেন্ট গড় (S2):" />
                </span>
                <div className="text-sm font-bold text-cyan-300 font-mono">
                  {currentCorrelatedStudent.dept} Avg = {currentDeptAvg.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="font-mono text-xs">
                <span>Comparison: </span>
                <span className="text-white font-bold">{currentCorrelatedStudent.gpa.toFixed(2)}</span>
                <span> &gt; </span>
                <span className="text-cyan-300 font-bold">{currentDeptAvg.toFixed(4)}</span>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                isCorrelatedQualified
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {isCorrelatedQualified
                  ? (language === 'bn' ? 'নির্বাচিত (আউটপুটে থাকবে)' : 'Qualified (Included in Output)')
                  : (language === 'bn' ? 'বাদ পড়েছে (শর্ত পূরণ করেনি)' : 'Disqualified (Filtered Out)')}
              </span>
            </div>
          </div>
        </div>
      </section>
  );
}
