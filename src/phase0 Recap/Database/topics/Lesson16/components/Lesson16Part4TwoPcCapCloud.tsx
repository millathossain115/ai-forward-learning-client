'use client';

import React, { useState } from 'react';
import { CheckCircle2, GitMerge, Globe, Scale, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson16Part4TwoPcCapCloud() {
  const { language } = useLanguage();
  const [twopcStep, setTwopcStep] = useState<'prepare' | 'commit' | 'abort'>('prepare');
  const [capChoice, setCapChoice] = useState<'CP' | 'AP'>('CP');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <GitMerge className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • 2PC, CAP ও ক্লাউড DDBMS' : 'Part 4 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Two-Phase Commit (2PC), CAP Theorem & Cloud DDBMS"
              bn="৪. Two-Phase Commit (2PC), CAP থিওরেম ও ক্লাউড DDBMS"
            />
          </h2>
        </div>
      </div>

      {/* 2PC Simulator */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-500/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-purple-300 uppercase">Two-Phase Commit (2PC) Simulator</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTwopcStep('prepare')}
              className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${twopcStep === 'prepare' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'}`}
            >
              1. PREPARE
            </button>
            <button
              onClick={() => setTwopcStep('commit')}
              className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${twopcStep === 'commit' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'}`}
            >
              2. All YES → COMMIT
            </button>
            <button
              onClick={() => setTwopcStep('abort')}
              className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${twopcStep === 'abort' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'}`}
            >
              2. Any NO → ABORT
            </button>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono">
          {twopcStep === 'prepare' && <span className="text-indigo-300">Coordinator sends PREPARE → Participants lock rows, write WAL, and reply VOTE-YES / VOTE-NO.</span>}
          {twopcStep === 'commit' && (
            <span className="text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> All participants voted YES → Coordinator sends GLOBAL COMMIT!
            </span>
          )}
          {twopcStep === 'abort' && (
            <span className="text-rose-300 flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" /> At least one NO/timeout → Coordinator sends GLOBAL ABORT &amp; all shards roll back.
            </span>
          )}
        </div>
      </div>

      {/* CAP Theorem */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-amber-500/30 space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
            <Scale className="w-4 h-4" /> Brewer’s CAP Theorem
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCapChoice('CP')}
              className={`px-3 py-1 rounded font-mono cursor-pointer ${capChoice === 'CP' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'}`}
            >
              CP (Consistency)
            </button>
            <button
              onClick={() => setCapChoice('AP')}
              className={`px-3 py-1 rounded font-mono cursor-pointer ${capChoice === 'AP' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'}`}
            >
              AP (Availability)
            </button>
          </div>
        </div>
        {capChoice === 'CP' ? (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="CP (Spanner, CockroachDB, HBase): Rejects requests on minority partition to guarantee linearizable consistency."
            bn="CP: নেটওয়ার্ক পার্টিশনের সময় ভুল ডেটা ঠেকাতে রিকোয়েস্ট রিজেক্ট করে, কিন্তু ডেটার সঠিকতা ধরে রাখে।"
          />
        ) : (
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="AP (Cassandra, DynamoDB): Always responds with local replica data during partitions, converging later."
            bn="AP: পার্টিশনের সময়েও সিস্টেম সচল থাকে এবং পরে সব রেপ্লিকা সিঙ্ক হয়ে যায়।"
          />
        )}
      </div>

      {/* Cloud DDBMS Comparison */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
            <tr>
              <th className="py-2 px-3 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-400" /> Engine</th>
              <th className="py-2 px-3">Model</th>
              <th className="py-2 px-3">CAP Profile</th>
              <th className="py-2 px-3">Best Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans text-zinc-300">
            <tr><td className="py-2 px-3 font-mono text-cyan-300 font-bold">Google Cloud Spanner</td><td className="py-2 px-3">NewSQL</td><td className="py-2 px-3">CP (TrueTime)</td><td className="py-2 px-3">Global ACID banking</td></tr>
            <tr><td className="py-2 px-3 font-mono text-emerald-300 font-bold">CockroachDB</td><td className="py-2 px-3">Distributed SQL</td><td className="py-2 px-3">CP (Raft)</td><td className="py-2 px-3">Multi-region Postgres SQL</td></tr>
            <tr><td className="py-2 px-3 font-mono text-amber-300 font-bold">Amazon DynamoDB</td><td className="py-2 px-3">Key-Value/Doc</td><td className="py-2 px-3">AP / Tunable</td><td className="py-2 px-3">Serverless high-scale APIs</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
