'use client';

import React from 'react';
import {
  Table as TableIcon,
} from 'lucide-react';
import DualText from '@/components/DualText';

export default function ColumnFamilyTab() {
  return (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">Model 06-C</span>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-purple-400" />
              <DualText
                en="Column-Family Store (Sparse Distributed Storage in Apache Cassandra)"
                bn="কলাম-ফ্যামিলি স্টোর (অ্যাপাচি ক্যাসান্ড্রা ডিস্ট্রিবিউটেড স্থাপত্য)"
              />
            </h4>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Unlike relational tables where every row must have the exact same columns (filling unused cells with NULLs), Cassandra organizes data into dynamic column families. Each row key can store different columns with individual timestamps, making it capable of billions of sensor writes across hundreds of distributed cloud server nodes."
              bn="রিলেশনাল টেবিলের মতো প্রতিটি সারিতে একই কলাম থাকার বাধ্যবাধকতা নেই। ক্যাসান্ড্রায় প্রতিটি রো কী-এর অধীনে ইচ্ছামতো ডায়নামিক কলাম ও টাইমস্ট্যাম্প যোগ করা যায়, যা সার্ভার ক্লাস্টারে প্রতি সেকেন্ডে লক্ষ লক্ষ ডেটা রাইট করতে সক্ষম।"
            />
          </div>

          {/* Sparse Column Matrix Demo */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-purple-900/40 space-y-3 font-mono text-xs">
            <span className="text-purple-300 font-bold uppercase text-[11px]">
              Column Family: StudentActivityLogs (Sparse Dynamic Columns):
            </span>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-black/60">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#141228] border-b border-purple-900/50 text-zinc-300 text-[11px]">
                    <th className="py-2.5 px-3 text-purple-400 font-bold">Row Key (Partition)</th>
                    <th className="py-2.5 px-3 text-cyan-300">col: login_ip</th>
                    <th className="py-2.5 px-3 text-emerald-300">col: last_course</th>
                    <th className="py-2.5 px-3 text-amber-300">col: device_type</th>
                    <th className="py-2.5 px-3 text-pink-300">col: quiz_score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-[11px]">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">Student:101:2026-11</td>
                    <td className="py-2.5 px-3 text-zinc-300">103.205.71.2</td>
                    <td className="py-2.5 px-3 text-cyan-300">C01 (DBMS)</td>
                    <td className="py-2.5 px-3 text-amber-300">MacOS / Chrome</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">96 / 100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">Student:102:2026-11</td>
                    <td className="py-2.5 px-3 text-zinc-300">192.168.1.45</td>
                    <td className="py-2.5 px-3 text-cyan-300">C01 (DBMS)</td>
                    <td className="py-2.5 px-3 text-zinc-500 italic">[no column]</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">88 / 100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">Student:103:2026-11</td>
                    <td className="py-2.5 px-3 text-zinc-300">182.48.90.12</td>
                    <td className="py-2.5 px-3 text-zinc-500 italic">[no column]</td>
                    <td className="py-2.5 px-3 text-amber-300">Android / App</td>
                    <td className="py-2.5 px-3 text-zinc-500 italic">[no column]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-purple-200 text-[11px] font-sans leading-relaxed">
              Notice: Student 103 does not have a <code>last_course</code> column, and Student 102 has no <code>device_type</code> column. No empty NULL storage waste occurs!
            </div>
          </div>
        </div>
  );
}
