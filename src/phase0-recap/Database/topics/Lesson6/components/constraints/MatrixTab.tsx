'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function MatrixTab() {
  const { language } = useLanguage();

  return (
          <div className="overflow-x-auto rounded-lg border border-slate-800/90 bg-[#0a0d1e]">
            <table className="w-full text-left text-[11px] font-sans">
              <thead>
                <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-300 font-mono text-[10px]">
                  <th className="py-1.5 px-2.5 font-bold text-amber-300">Constraint</th>
                  <th className="py-1.5 px-2.5 font-bold text-slate-300">Integrity Rule</th>
                  <th className="py-1.5 px-2.5 font-bold text-cyan-300">Multiple Allowed?</th>
                  <th className="py-1.5 px-2.5 font-bold text-rose-300">Allows NULL?</th>
                  <th className="py-1.5 px-2.5 font-bold text-purple-300">Auto Index?</th>
                  <th className="py-1.5 px-2.5 font-bold text-emerald-300">Syntax Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-zinc-300 text-[10.5px]">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-amber-400">PRIMARY KEY</td>
                  <td className="py-1.5 px-2.5">Uniquely identifies each row; never duplicate or null</td>
                  <td className="py-1.5 px-2.5 font-mono text-rose-400">No (Only 1)</td>
                  <td className="py-1.5 px-2.5 font-mono text-rose-400">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Clustered)</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">id INT PRIMARY KEY</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">UNIQUE</td>
                  <td className="py-1.5 px-2.5">All column values must be distinct across table</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (In MySQL)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Unique Index)</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">email VARCHAR(100) UNIQUE</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-rose-400">NOT NULL</td>
                  <td className="py-1.5 px-2.5">Prohibits empty or missing value; mandatory attribute</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-rose-400">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-zinc-500">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">name VARCHAR(50) NOT NULL</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400">CHECK</td>
                  <td className="py-1.5 px-2.5">Enforces inline boolean condition on all inserted values</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (NULL passes check)</td>
                  <td className="py-1.5 px-2.5 font-mono text-zinc-500">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">CHECK (age &gt;= 16)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-purple-400">DEFAULT</td>
                  <td className="py-1.5 px-2.5">Provides fallback value when column is omitted in INSERT</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Default can be NULL)</td>
                  <td className="py-1.5 px-2.5 font-mono text-zinc-500">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">country DEFAULT &apos;BD&apos;</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-400">FOREIGN KEY</td>
                  <td className="py-1.5 px-2.5">Maintains referential integrity to a parent Primary Key</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Allows orphan nulls)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Foreign Index)</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">FOREIGN KEY (d_id) REFERENCES dept(id)</td>
                </tr>
              </tbody>
            </table>
          </div>
  );
}
