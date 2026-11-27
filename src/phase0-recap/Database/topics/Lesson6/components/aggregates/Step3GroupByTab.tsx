'use client';

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Filter,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INITIAL_STUDENTS } from '../../types';

export default function Step3GroupByTab({ onNext }: { onNext: () => void }) {
  const { language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const departmentsData = useMemo(() => {
    const depts = ['CSE', 'BBA', 'EEE'] as const;
    return depts.map(dept => {
      const students = INITIAL_STUDENTS.filter(s => s.deptName === dept);
      const count = students.length;
      const avgGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / count).toFixed(2);
      return { dept, students, count, avgGpa };
    });
  }, []);

  return (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3.5">
            <div className="border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                <DualText
                  en="Step 3: GROUP BY (Collapsing Rows into Department Buckets)"
                  bn="ধাপ ৩: GROUP BY (সারিগুলোকে ডিপার্টমেন্ট বাকেটে রূপান্তর)"
                />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 mt-0.5"
                en="GROUP BY takes all 6 rows and sorts them into buckets by Department. Aggregate functions (COUNT, AVG) now run separately for each bucket!"
                bn="GROUP BY সমস্ত ৬টি সারিকে ডিপার্টমেন্ট অনুযায়ী আলাদা বাকেটে ভাগ করে। ফলে COUNT এবং AVG প্রতিটি ডিপার্টমেন্টের জন্য আলাদাভাবে হিসাব করা হয়!"
              />
            </div>

            {/* Generated SQL Snippet */}
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-between">
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
{`SELECT Department, COUNT(*) AS Total_Students, ROUND(AVG(GPA), 2) AS Avg_GPA
FROM Students
GROUP BY Department;`}
              </pre>
              <button
                onClick={() => handleCopy(`SELECT Department, COUNT(*) AS Total_Students, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department;`, 'step3sql')}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition"
              >
                {copiedId === 'step3sql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>

            {/* Visual Department Buckets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {departmentsData.map(d => (
                <div key={d.dept} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5 font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      {d.dept} Department
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                      {d.count} {d.count === 1 ? 'student' : 'students'}
                    </span>
                  </div>

                  {/* Student pills inside this bucket */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 block font-mono">Enrolled Students:</span>
                    <div className="flex flex-wrap gap-1">
                      {d.students.map(s => (
                        <span key={s.id} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 border border-slate-800">
                          {s.name} (GPA {s.gpa})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Group Stats */}
                  <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 text-[11px]">AVG(GPA):</span>
                    <span className="font-bold text-amber-300">{d.avgGpa}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Step Teaser */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-300">
                <strong className="text-purple-300 block mb-0.5">
                  <DualText en="The Dean's Final Filter:" bn="ডিন মহোদয়ের চূড়ান্ত শর্ত:" />
                </strong>
                <DualText
                  as="p"
                  className="text-zinc-400 text-[11px]"
                  en="'Only display departments that have at least 2 students enrolled!' Can we write WHERE COUNT(*) >= 2? No! Learn why in Step 4."
                  bn="'শুধু সেই ডিপার্টমেন্টগুলোকে দেখান যাদের অন্তত ২ জন শিক্ষার্থী আছে!' আমরা কি WHERE COUNT(*) >= 2 লিখতে পারি? না! ধাপ ৪-এ দেখুন কেন।"
                />
              </div>
              <button
                onClick={() => onNext()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-purple-600 hover:bg-purple-500 text-white transition shrink-0 cursor-pointer"
              >
                <span>Step 4: Filter with HAVING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
  );
}
