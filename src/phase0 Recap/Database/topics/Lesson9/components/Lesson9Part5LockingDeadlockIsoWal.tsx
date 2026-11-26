'use client';

import React from 'react';
import { AlertTriangle, Lock, RefreshCw, Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson9Part5LockingDeadlockIsoWal() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৬ • লকিং, ডেডলক, আইসোলেশন ও WAL' : 'Part 6 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="2PL Locking, Deadlocks, Isolation Levels & WAL Recovery"
              bn="৬. 2PL লকিং, ডেডলক, আইসোলেশন লেভেল ও WAL রিকভারি"
            />
          </h2>
        </div>
      </div>

      {/* 2PL & Lock Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Lock Compatibility Matrix</span>
          <table className="w-full text-xs text-left font-mono">
            <thead className="text-zinc-400 border-b border-slate-800">
              <tr><th className="py-1.5">Requested \ Held</th><th className="py-1.5">Shared (S)</th><th className="py-1.5">Exclusive (X)</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              <tr><td className="py-2 text-white font-bold">Shared (S)</td><td className="py-2 text-emerald-400 font-bold">✓ Compatible</td><td className="py-2 text-rose-400 font-bold">✗ Wait</td></tr>
              <tr><td className="py-2 text-white font-bold">Exclusive (X)</td><td className="py-2 text-rose-400 font-bold">✗ Wait</td><td className="py-2 text-rose-400 font-bold">✗ Wait</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase">Two-Phase Locking (2PL)</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Guarantees conflict serializability: once a transaction releases a lock, it can never acquire any new lock."
            bn="একবার কোনো লক রিলিজ করলে ট্রানজ্যাকশনটি আর কোনো নতুন লক নিতে পারবে না।"
          />
          <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-amber-300">
            Phase 1 (Growing): Acquire only • Phase 2 (Shrinking): Release only.
          </div>
        </div>
      </div>

      {/* Deadlock 4 Coffman Conditions */}
      <div className="p-4 rounded-xl bg-[#14182d] border border-rose-900/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
          <AlertTriangle className="w-4 h-4" />
          <DualText as="span" en="Deadlock: 4 Coffman Conditions" bn="ডেডলকের ৪টি কফম্যান শর্ত" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { t: '1. Mutual Exclusion', dEn: 'Exclusive lock held by 1 TX', dBn: 'একটি মাত্র TX লক ধরে রাখে' },
            { t: '2. Hold & Wait', dEn: 'Holds A while requesting B', dBn: 'A ধরে রেখে B চায়' },
            { t: '3. No Preemption', dEn: 'Locks cannot be forcibly taken', dBn: 'জোর করে লক নেওয়া যায় না' },
            { t: '4. Circular Wait', dEn: 'T1 waits T2, T2 waits T1', dBn: 'চক্রাকার অপেক্ষা তৈরি হয়' },
          ].map((c) => (
            <div key={c.t} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block">{c.t}</span>
              <p className="text-[11px] text-zinc-400 mt-1">{language === 'bn' ? c.dBn : c.dEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ANSI SQL Isolation Levels */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
          <Sliders className="w-4 h-4" />
          <DualText as="span" en="ANSI SQL Isolation Levels" bn="ANSI SQL আইসোলেশন লেভেল" />
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2 px-3">Level</th>
                <th className="py-2 px-3">Dirty Read</th>
                <th className="py-2 px-3">Unrepeatable Read</th>
                <th className="py-2 px-3">Phantom Read</th>
                <th className="py-2 px-3">Engine Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-rose-400">Read Uncommitted</td>
                <td className="py-2 px-3 text-rose-400">Possible</td>
                <td className="py-2 px-3 text-rose-400">Possible</td>
                <td className="py-2 px-3 text-rose-400">Possible</td>
                <td className="py-2 px-3 text-zinc-500">Rare</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-amber-400">Read Committed</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">✓ Prevented</td>
                <td className="py-2 px-3 text-rose-400">Possible</td>
                <td className="py-2 px-3 text-rose-400">Possible</td>
                <td className="py-2 px-3 text-cyan-300 font-mono">PostgreSQL / Oracle</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">Repeatable Read</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">✓ Prevented</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">✓ Prevented</td>
                <td className="py-2 px-3 text-rose-400">Possible (Std)</td>
                <td className="py-2 px-3 text-cyan-300 font-mono">MySQL InnoDB</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-emerald-400">Serializable</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">✓ Prevented</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">✓ Prevented</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">✓ Prevented</td>
                <td className="py-2 px-3 text-zinc-400">Max Safety</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* WAL & Recovery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Write-Ahead Logging (WAL)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Log records must flush to stable storage before dirty data pages are written to disk."
            bn="ডেটা পেজ ডিস্কে লেখার আগেই সংশ্লিষ্ট লগ রেকর্ড স্থায়ী স্টোরেজে ফ্লাশ করতে হয়।"
          />
          <div className="p-2 bg-black/40 rounded font-mono text-[11px] text-zinc-400">
            &lt;T1, Account_ID, Old_Val: 10000, New_Val: 8000&gt;
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">UNDO vs REDO</span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong className="text-amber-300">REDO:</strong> &lt;T, COMMIT&gt; exists → replay changes (Durability).</li>
            <li><strong className="text-rose-400">UNDO:</strong> No &lt;T, COMMIT&gt; → restore old values (Atomicity).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
