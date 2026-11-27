'use client';

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Filter,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INITIAL_STUDENTS } from '../../types';

type HavingFilter = 'NONE' | 'COUNT_GE_2' | 'AVG_GE_36';

export default function Step4HavingTab({ onRestart }: { onRestart: () => void }) {
  const { language } = useLanguage();
  const [havingFilter, setHavingFilter] = useState<'NONE' | 'COUNT_GE_2' | 'AVG_GE_36'>('COUNT_GE_2');
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

      let isPassed = true;
      let rejectReasonEn = '';
      let rejectReasonBn = '';

      if (havingFilter === 'COUNT_GE_2') {
        if (count < 2) {
          isPassed = false;
          rejectReasonEn = 'Has only 1 student (needs ≥ 2)';
          rejectReasonBn = 'শিক্ষার্থী মাত্র ১ জন (ন্যূনতম ২ প্রয়োজন)';
        }
      } else if (havingFilter === 'AVG_GE_36') {
        if (parseFloat(avgGpa) < 3.60) {
          isPassed = false;
          rejectReasonEn = 'Avg GPA 3.33 is below 3.60';
          rejectReasonBn = 'গড় জিপিএ ৩.৩৩ (৩.৬০ এর কম)';
        }
      }

      return {
        dept,
        students,
        count,
        avgGpa,
        isPassed,
        rejectReasonEn,
        rejectReasonBn
      };
    });
  }, [havingFilter]);

  const step4Sql = useMemo(() => {
    switch (havingFilter) {
      case 'NONE':
        return `SELECT Department, COUNT(*) AS Total, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department;`;
      case 'COUNT_GE_2':
        return `SELECT Department, COUNT(*) AS Total, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department\nHAVING COUNT(*) >= 2;`;
      case 'AVG_GE_36':
        return `SELECT Department, COUNT(*) AS Total, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department\nHAVING AVG(GPA) >= 3.60;`;
    }
  }, [havingFilter]);

  return (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3.5">
            <div className="border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                <DualText
                  en="Step 4: The HAVING Clause (Filtering Group Summaries)"
                  bn="ধাপ ৪: HAVING ক্লজ (গ্রুপ সামারির ওপর ফিল্টারিং)"
                />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 mt-0.5"
                en="WHERE filters individual rows BEFORE grouping. HAVING filters summarized groups AFTER grouping."
                bn="WHERE গ্রুপিংয়ের আগেই একক সারি ফিল্টার করে। আর HAVING গ্রুপিং সম্পন্ন হওয়ার পর গ্রুপ সামারিকে ফিল্টার করে।"
              />
            </div>

            {/* Interactive HAVING condition toggles */}
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-zinc-300 font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                <DualText en="Apply Group Condition:" bn="গ্রুপের শর্ত প্রয়োগ করুন:" />
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'NONE' as HavingFilter, label: 'All 3 Departments', desc: 'No HAVING' },
                  { id: 'COUNT_GE_2' as HavingFilter, label: 'HAVING COUNT(*) >= 2', desc: 'Filters EEE' },
                  { id: 'AVG_GE_36' as HavingFilter, label: 'HAVING AVG(GPA) >= 3.60', desc: 'Filters BBA' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setHavingFilter(opt.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      havingFilter === opt.id
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-black/50 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen: SQL on Left, Live Result on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Left: Dynamic Query with Explanation */}
              <div className="lg:col-span-5 flex flex-col justify-between p-3 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      Executable SQL Query
                    </span>
                    <button
                      onClick={() => handleCopy(step4Sql, 'step4sql')}
                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition"
                    >
                      {copiedId === 'step4sql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-500/20 leading-relaxed">
{step4Sql}
                  </pre>
                </div>

                <div className="p-2 rounded bg-purple-950/20 border border-purple-500/20 text-[11px] text-zinc-300">
                  <strong className="text-purple-300 block mb-0.5">
                    <DualText en="Why not WHERE?" bn="WHERE কেন ব্যবহার করা গেল না?" />
                  </strong>
                  <DualText
                    as="p"
                    className="text-zinc-400 leading-snug"
                    en="WHERE cannot evaluate COUNT(*) because rows are not grouped yet when WHERE executes! Only HAVING can inspect aggregate results."
                    bn="WHERE কখনো COUNT(*) এর মান চেক করতে পারে না কারণ WHERE যখন রান হয় তখন গ্রুপিং তৈরিই হয়নি! একমাত্র HAVING-ই অ্যাগ্রিগেট চেক করতে পারে।"
                  />
                </div>
              </div>

              {/* Right: Live Filtered Table */}
              <div className="lg:col-span-7 rounded-xl border border-slate-800 overflow-hidden bg-black/30">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">Department</th>
                      <th className="p-2.5">Count</th>
                      <th className="p-2.5">Avg GPA</th>
                      <th className="p-2.5 text-right">HAVING Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {departmentsData.map(d => (
                      <tr
                        key={d.dept}
                        className={`transition ${
                          d.isPassed ? 'bg-emerald-500/5 text-zinc-200' : 'opacity-40 bg-rose-500/5 text-zinc-500'
                        }`}
                      >
                        <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${d.isPassed ? 'bg-purple-400' : 'bg-zinc-600'}`} />
                          {d.dept}
                        </td>
                        <td className="p-2.5 font-bold text-cyan-300">{d.count}</td>
                        <td className="p-2.5 font-bold text-amber-300">{d.avgGpa}</td>
                        <td className="p-2.5 text-right">
                          {d.isPassed ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                              <XCircle className="w-3 h-3" /> Discarded
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Restart or Review */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => onRestart()}
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Restart Story from Step 1</span>
              </button>
              <span className="text-emerald-400 text-[11px]">
                🎉 You now understand: Rows ➔ Aggregates ➔ GROUP BY ➔ HAVING!
              </span>
            </div>
          </div>
  );
}
