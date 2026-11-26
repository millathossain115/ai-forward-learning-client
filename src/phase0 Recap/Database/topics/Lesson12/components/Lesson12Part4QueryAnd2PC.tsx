'use client';

import React, { useState } from 'react';
import { CheckCircle2, GitMerge, Workflow, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson12Part4QueryAnd2PC() {
  const { language } = useLanguage();
  const [twopcStep, setTwopcStep] = useState<'prepare' | 'commit' | 'abort'>('prepare');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <GitMerge className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • ডিস্ট্রিবিউটেড কুয়েরি ও 2PC' : 'Part 4 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Distributed Query Processing & Two-Phase Commit (2PC)"
              bn="৪. ডিস্ট্রিবিউটেড কুয়েরি প্রসেসিং ও Two-Phase Commit (2PC)"
            />
          </h2>
        </div>
      </div>

      {/* 6-Stage Query Pipeline */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
          <Workflow className="w-3.5 h-3.5" /> 6-Stage Distributed Query Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
          {[
            { n: 1, t: 'Query Parse' },
            { n: 2, t: 'Decompose' },
            { n: 3, t: 'Localize' },
            { n: 4, t: 'Global Opt' },
            { n: 5, t: 'Parallel Exec' },
            { n: 6, t: 'Merge Results' },
          ].map((s) => (
            <div key={s.n} className="p-2.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold flex items-center justify-center mx-auto">
                {s.n}
              </span>
              <div className="text-[11px] font-mono font-bold text-white">{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2PC Interactive Simulator */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-purple-300 uppercase">
            <DualText as="span" en="Two-Phase Commit (2PC) Simulator" bn="Two-Phase Commit (2PC) সিমুলেটর" />
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTwopcStep('prepare')}
              className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                twopcStep === 'prepare' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'
              }`}
            >
              Phase 1: PREPARE
            </button>
            <button
              onClick={() => setTwopcStep('commit')}
              className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                twopcStep === 'commit' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'
              }`}
            >
              Phase 2: All YES → COMMIT
            </button>
            <button
              onClick={() => setTwopcStep('abort')}
              className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                twopcStep === 'abort' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'
              }`}
            >
              Phase 2: One NO → ABORT
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono space-y-2">
          {twopcStep === 'prepare' && (
            <>
              <div className="text-indigo-300 font-bold">Coordinator → Node A &amp; Node B: &ldquo;PREPARE TO COMMIT?&rdquo;</div>
              <div className="text-zinc-300">Participants write to WAL, acquire locks, and reply READY / VOTE-YES (or VOTE-NO).</div>
            </>
          )}
          {twopcStep === 'commit' && (
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All nodes voted YES → Coordinator broadcasts GLOBAL COMMIT! Both shards commit atomically.</span>
            </div>
          )}
          {twopcStep === 'abort' && (
            <div className="flex items-center gap-2 text-rose-300 font-bold">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Node B voted NO → Coordinator broadcasts GLOBAL ABORT! Both shards roll back &amp; release locks.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
