'use client';

import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson12Part5CapConsistency() {
  const { language } = useLanguage();
  const [capMode, setCapMode] = useState<'CP' | 'AP'>('CP');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৫ • CAP থিওরেম ও কনসিস্টেন্সি' : 'Part 5 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Brewer’s CAP Theorem & Consistency Models"
              bn="৫. Brewer-এর CAP থিওরেম ও কনসিস্টেন্সি মডেল"
            />
          </h2>
        </div>
      </div>

      {/* CAP Interactive */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCapMode('CP')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
            capMode === 'CP' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
          }`}
        >
          CP (Consistency + Partition Tolerance)
        </button>
        <button
          onClick={() => setCapMode('AP')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
            capMode === 'AP' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
          }`}
        >
          AP (Availability + Partition Tolerance)
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
        {capMode === 'CP' ? (
          <>
            <span className="text-cyan-400 font-mono font-bold uppercase">CP System (e.g., Banking, HBase, MongoDB Primary, CockroachDB)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans leading-relaxed"
              en="During a network partition, the minority partition rejects writes/reads to prevent stale or conflicting data. Consistency is strictly preserved."
              bn="নেটওয়ার্ক বিচ্ছিন্ন হলে ভুল বা পুরোনো ডেটা এড়াতে রিকোয়েস্ট রিজেক্ট করে, কিন্তু ডেটার সঠিকতা (Consistency) বজায় রাখে।"
            />
          </>
        ) : (
          <>
            <span className="text-emerald-400 font-mono font-bold uppercase">AP System (e.g., Cassandra, DynamoDB, DNS, Social Feeds)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans leading-relaxed"
              en="During a network partition, every reachable node still responds with its latest local copy (may be temporarily stale, then converges via Eventual Consistency)."
              bn="নেটওয়ার্ক বিচ্ছিন্ন হলেও প্রতিটি নোড রেসপন্স দেয় (হয়তো সাময়িক পুরোনো ডেটা), পরে Eventual Consistency দিয়ে সিঙ্ক হয়।"
            />
          </>
        )}
      </div>

      {/* Strong vs Eventual Consistency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1.5">
          <span className="font-mono font-bold text-cyan-300 uppercase">Strong Consistency</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Every read always sees the most recent committed write. Required for bank balances, ticket booking, inventory."
            bn="প্রতিটি রিড সর্বদা সর্বশেষ কমিটেড ডেটা পায়। ব্যাংকিং ও টিকেট বুকিংয়ে অপরিহার্য।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-300 uppercase">Eventual Consistency</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Replicas converge over milliseconds/seconds after writes stop. Ideal for likes, view counts, DNS, caching."
            bn="রাইট থামলে অল্প সময়ের মধ্যেই সব রেপ্লিকা সমান হয়ে যায়। সোশ্যাল মিডিয়া লাইক ও ক্যাশিংয়ের জন্য আদর্শ।"
          />
        </div>
      </div>
    </section>
  );
}
