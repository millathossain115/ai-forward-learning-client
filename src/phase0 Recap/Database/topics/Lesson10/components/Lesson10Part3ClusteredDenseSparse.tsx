'use client';

import React, { useState } from 'react';
import { Layers, Minimize2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson10Part3ClusteredDenseSparse() {
  const { language } = useLanguage();
  const [activeClusterTab, setActiveClusterTab] = useState<'clustered' | 'non_clustered'>('clustered');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • Clustered, Non-Clustered, Dense ও Sparse' : 'Part 3 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Clustered vs. Non-Clustered & Dense vs. Sparse Indexes"
              bn="৩. Clustered বনাম Non-Clustered এবং Dense বনাম Sparse ইনডেক্স"
            />
          </h2>
        </div>
      </div>

      {/* Clustered vs Non-Clustered */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveClusterTab('clustered')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
            activeClusterTab === 'clustered' ? 'bg-purple-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          Clustered Index (Physical Data Order)
        </button>
        <button
          onClick={() => setActiveClusterTab('non_clustered')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
            activeClusterTab === 'non_clustered' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          Non-Clustered Index (Secondary Pointer)
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3 text-xs">
        {activeClusterTab === 'clustered' ? (
          <>
            <span className="text-purple-400 font-mono font-bold uppercase">Clustered Index: The Table IS the Index!</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans leading-relaxed"
              en="Dictates the actual physical on-disk storage order of rows. Leaf nodes hold the actual data rows (no extra pointer hop)."
              bn="ডিস্কে সারির প্রকৃত ক্রম নির্ধারণ করে। লিফ নোডে সরাসরি ডেটা সারি সংরক্ষিত থাকে।"
            />
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-zinc-300 space-y-1">
              <div>• Max Count: Strictly <strong>1 Clustered Index per table</strong> (InnoDB Primary Key).</div>
              <div>• Fast range queries (<code className="text-emerald-400">BETWEEN 100 AND 500</code>).</div>
            </div>
          </>
        ) : (
          <>
            <span className="text-cyan-400 font-mono font-bold uppercase">Non-Clustered Index: Auxiliary Structure</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans leading-relaxed"
              en="Separate from physical row order. Stores sorted keys + RowID/PK pointers to fetch the full row (unless it is a Covering Index)."
              bn="মূল সারির ক্রম থেকে আলাদা। এতে সর্টেড কি এবং মূল সারির পয়েন্টার থাকে।"
            />
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-zinc-300 space-y-1">
              <div>• Max Count: <strong>Multiple per table</strong> (Email, Department, etc.).</div>
              <div>• Covering Index: When all SELECT columns exist in the index, table lookup is skipped!</div>
            </div>
          </>
        )}
      </div>

      {/* Dense vs Sparse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2 text-xs">
          <span className="text-cyan-400 font-mono font-bold uppercase flex items-center gap-1.5">
            <Minimize2 className="w-3.5 h-3.5" /> Dense Index
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Index entry for every single search-key value. Fast direct lookup, higher memory cost."
            bn="প্রতিটি সার্চ-কি মানের জন্য আলাদা ইনডেক্স এন্ট্রি থাকে। দ্রুত খোঁজা যায়, তবে মেমোরি বেশি লাগে।"
          />
          <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-zinc-300">
            101 → Row 101 &nbsp;|&nbsp; 102 → Row 102 &nbsp;|&nbsp; 103 → Row 103
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2 text-xs">
          <span className="text-amber-400 font-mono font-bold uppercase flex items-center gap-1.5">
            <Minimize2 className="w-3.5 h-3.5" /> Sparse Index
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="One entry per physical disk block (Block Anchor). Tiny memory footprint; requires sorted file."
            bn="প্রতিটি ডিস্ক ব্লকের প্রথম মানের জন্য মাত্র একটি এন্ট্রি থাকে। মেমোরি কম লাগে, তবে ফাইল সর্টেড হতে হয়।"
          />
          <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-zinc-300">
            101 → Block 1 (101–110) &nbsp;|&nbsp; 111 → Block 2 (111–120)
          </div>
        </div>
      </div>
    </section>
  );
}
