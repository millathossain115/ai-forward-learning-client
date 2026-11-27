'use client';

import React from 'react';
import {
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INITIAL_STUDENTS } from '../../types';

export default function Step1RecordsTab({ onNext }: { onNext: () => void }) {
  const { language } = useLanguage();

  return (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  <DualText en="Step 1: The Raw Students Table" bn="ধাপ ১: স্টুডেন্টস টেবিলের মূল সারিগুলো" />
                </span>
                <DualText
                  as="p"
                  className="text-xs text-zinc-300 mt-0.5"
                  en="The university registrar stores individual student records. Each student is a separate, independent row."
                  bn="বিশ্ববিদ্যালয়ের রেজিস্ট্রারে প্রতিটি শিক্ষার্থীর রেকর্ড সংরক্ষিত থাকে। এখানে প্রতিটি সারি একক শিক্ষার্থীর ডেটা।"
                />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start sm:self-auto">
                SELECT * FROM Students;
              </span>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Student ID</th>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Department</th>
                    <th className="p-2.5">Age</th>
                    <th className="p-2.5">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                  {INITIAL_STUDENTS.map(s => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-2.5 text-zinc-400">#{s.id}</td>
                      <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        {s.name}
                      </td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px]">
                          {s.deptName}
                        </span>
                      </td>
                      <td className="p-2.5 text-zinc-300">{s.age} yrs</td>
                      <td className="p-2.5 font-bold text-amber-300">{s.gpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transition Question */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-300">
                <strong className="text-purple-300 block mb-0.5">
                  <DualText en="The Registrar Problem:" bn="রেজিস্ট্রারের মূল সমস্যা:" />
                </strong>
                <DualText
                  as="p"
                  className="text-zinc-400 text-[11px]"
                  en="The Dean doesn't have time to read 10,000 individual student rows. The Dean asks: 'What is the average GPA of all students? Who scored highest?'"
                  bn="ডিন মহোদয়ের পক্ষে ১০,০০০ শিক্ষার্থীর একক সারি দেখা সম্ভব নয়। ডিন জানতে চান: 'সব শিক্ষার্থীর গড় জিপিএ কত? কে সর্বোচ্চ নম্বর পেয়েছে?'"
                />
              </div>
              <button
                onClick={() => onNext()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-purple-600 hover:bg-purple-500 text-white transition shrink-0 cursor-pointer"
              >
                <span>Step 2: Aggregate Them</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
  );
}
