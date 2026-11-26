'use client';

import React, { useState } from 'react';
import { RefreshCw, Split } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson12Part3FragReplication() {
  const { language } = useLanguage();
  const [fragTab, setFragTab] = useState<'horizontal' | 'vertical' | 'hybrid'>('horizontal');
  const [repMode, setRepMode] = useState<'sync' | 'async'>('sync');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Split className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • ফ্র্যাগমেন্টেশন ও রেপ্লিকেশন' : 'Part 3 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Data Fragmentation (Sharding) & Replication"
              bn="৩. ডেটা ফ্র্যাগমেন্টেশন (শার্ডিং) ও রেপ্লিকেশন"
            />
          </h2>
        </div>
      </div>

      {/* Fragmentation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'horizontal' as const, label: 'Horizontal (By Rows)' },
          { id: 'vertical' as const, label: 'Vertical (By Columns)' },
          { id: 'hybrid' as const, label: 'Hybrid (Rows + Columns)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFragTab(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              fragTab === f.id ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
        {fragTab === 'horizontal' && (
          <>
            <span className="text-emerald-400 font-mono font-bold uppercase">Horizontal Fragmentation (Row Sharding)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Splits table by rows (e.g., Dept = 'CSE' on Node 1, Dept = 'BBA' on Node 2). Reconstruct with UNION ALL."
              bn="সারি অনুযায়ী টেবিল ভাগ করে (যেমন CSE নোড ১-এ, BBA নোড ২-এ)। UNION ALL দিয়ে জোড়া দেওয়া হয়।"
            />
          </>
        )}
        {fragTab === 'vertical' && (
          <>
            <span className="text-cyan-400 font-mono font-bold uppercase">Vertical Fragmentation (Column Splitting)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Splits table by columns while keeping Primary Key in every fragment. Reconstruct with INNER JOIN on PK."
              bn="কলাম অনুযায়ী ভাগ করে (প্রতিটি অংশে Primary Key থাকে)। JOIN করে পুরো সারি ফেরত পাওয়া যায়।"
            />
          </>
        )}
        {fragTab === 'hybrid' && (
          <>
            <span className="text-purple-400 font-mono font-bold uppercase">Hybrid Fragmentation</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Combines Horizontal + Vertical splitting for massive enterprise tables across regions and security zones."
              bn="বিশাল টেবিলে একই সাথে Horizontal ও Vertical উভয় বিভাজন প্রয়োগ করা হয়।"
            />
          </>
        )}
      </div>

      {/* Replication Mode */}
      <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Primary-to-Replica Replication
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setRepMode('sync')}
              className={`px-3 py-1 rounded font-mono text-[11px] cursor-pointer ${
                repMode === 'sync' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'
              }`}
            >
              Synchronous
            </button>
            <button
              onClick={() => setRepMode('async')}
              className={`px-3 py-1 rounded font-mono text-[11px] cursor-pointer ${
                repMode === 'async' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'
              }`}
            >
              Asynchronous
            </button>
          </div>
        </div>
        {repMode === 'sync' ? (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Synchronous: Primary waits for Replica ACK before committing to client. Zero data loss, higher write latency."
            bn="Synchronous: রেপ্লিকা থেকে নিশ্চিতকরণ না আসা পর্যন্ত ক্লায়েন্ট অপেক্ষা করে। কোনো ডেটা হারায় না।"
          />
        ) : (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Asynchronous: Primary commits immediately and streams WAL logs later. Fast writes, slight replication lag."
            bn="Asynchronous: প্রাইমারিতে লিখেই রেসপন্স দেয়, পরে রেপ্লিকায় সিঙ্ক হয়। গতি বেশি, তবে সামান্য ল্যাগ থাকে।"
          />
        )}
      </div>
    </section>
  );
}
