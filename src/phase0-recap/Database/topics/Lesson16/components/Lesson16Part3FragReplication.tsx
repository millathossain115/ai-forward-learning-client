'use client';

import React, { useState } from 'react';
import { RefreshCw, Split } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson16Part3FragReplication() {
  const { language } = useLanguage();
  const [fragTab, setFragTab] = useState<'horizontal' | 'vertical' | 'hybrid'>('horizontal');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Split className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • ফ্র্যাগমেন্টেশন ও রেপ্লিকেশন' : 'Part 3 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Data Fragmentation (3 Rules) & Primary-Replica Replication"
              bn="৩. ডেটা ফ্র্যাগমেন্টেশন (৩টি নিয়ম) ও রেপ্লিকেশন"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'horizontal' as const, label: 'Horizontal (Rows → UNION)' },
          { id: 'vertical' as const, label: 'Vertical (Cols + PK → JOIN)' },
          { id: 'hybrid' as const, label: 'Hybrid (Combined)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFragTab(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              fragTab === f.id ? 'bg-emerald-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
        {fragTab === 'horizontal' && (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Horizontal Fragmentation splits rows by predicate (e.g., Region = 'Asia' vs 'EU'). Reconstruct losslessly with UNION."
            bn="Horizontal ফ্র্যাগমেন্টেশন শর্ত অনুযায়ী সারি ভাগ করে। UNION দিয়ে মূল টেবিল ফেরত পাওয়া যায়।"
          />
        )}
        {fragTab === 'vertical' && (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Vertical Fragmentation splits columns across sites while keeping the Primary Key in each fragment. Reconstruct with INNER JOIN."
            bn="Vertical ফ্র্যাগমেন্টেশন প্রতিটি অংশে Primary Key রেখে কলাম ভাগ করে। INNER JOIN দিয়ে জোড়া দেওয়া হয়।"
          />
        )}
        {fragTab === 'hybrid' && (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Hybrid Fragmentation applies vertical splitting followed by horizontal splitting (or vice versa) for large global tables."
            bn="Hybrid-এ একই সাথে Horizontal ও Vertical উভয় বিভাজন ব্যবহার করা হয়।"
          />
        )}
        <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-cyan-300">
          3 Correctness Rules: Completeness • Reconstruction • Disjointness
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 text-xs space-y-1.5">
        <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Primary-Replica Replication
        </span>
        <DualText
          as="p"
          className="text-zinc-300 font-sans"
          en="Full Replication stores copies at every site (fast reads, slower writes). Partial Replication places hot shards only where needed."
          bn="Full Replication-এ সব সাইটে কপি থাকে (রিড দ্রুত, রাইট ধীর); Partial Replication-এ শুধু প্রয়োজনীয় সাইটে কপি রাখা হয়।"
        />
      </div>
    </section>
  );
}
