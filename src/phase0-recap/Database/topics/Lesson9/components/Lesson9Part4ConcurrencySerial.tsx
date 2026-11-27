'use client';

import React, { useState } from 'react';
import { AlertOctagon, GitMerge } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson9Part4ConcurrencySerial() {
  const { language } = useLanguage();
  const [activeAnomaly, setActiveAnomaly] = useState<'lost_update' | 'dirty_read' | 'unrepeatable_read' | 'phantom_read'>('lost_update');
  const [scheduleType, setScheduleType] = useState<'serial' | 'conflict_serializable' | 'non_serializable'>('conflict_serializable');

  return (
    <>
      {/* PART 4: CONCURRENCY ANOMALIES */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৪ • কনকারেন্সি অ্যানোমালি' : 'Part 4 of 7'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Concurrency Control & The 4 Classic Anomalies"
                bn="৪. কনকারেন্সি কন্ট্রোল ও ৪টি প্রধান অ্যানোমালি"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="When concurrent transactions interleave without isolation, four classic data-corruption anomalies can occur:"
          bn="যথাযথ আইসোলেশন ছাড়া একাধিক ট্রানজ্যাকশন একসাথে চললে নিচের ৪টি মারাত্মক সমস্যা দেখা দেয়:"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'lost_update' as const, label: '1. Lost Update', descEn: 'Overwriting committed data', descBn: 'কমিটেড ডেটা মুছে যাওয়া' },
            { id: 'dirty_read' as const, label: '2. Dirty Read', descEn: 'Reading uncommitted rollbacks', descBn: 'আনকমিটেড ডেটা পড়া' },
            { id: 'unrepeatable_read' as const, label: '3. Unrepeatable Read', descEn: 'Values change mid-TX', descBn: 'একই সারিতে ভিন্ন মান' },
            { id: 'phantom_read' as const, label: '4. Phantom Read', descEn: 'New rows appear mid-TX', descBn: 'নতুন সারি চলে আসা' },
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAnomaly(a.id)}
              className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
                activeAnomaly === a.id
                  ? 'bg-rose-500/20 border-rose-400 text-white '
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{a.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{language === 'bn' ? a.descBn : a.descEn}</div>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-rose-900/40 space-y-3 text-xs">
          {activeAnomaly === 'lost_update' && (
            <>
              <span className="text-rose-400 font-mono font-bold uppercase">1. Lost Update Problem</span>
              <DualText
                as="p"
                className="text-zinc-300 font-sans"
                en="Initial Balance: ৳10,000. T1 withdraws ৳2,000, T2 deposits ৳3,000. Expected: ৳11,000."
                bn="শুরুতে ব্যালেন্স: ৳১০,০০০। T1 ৳২,০০০ তোলে, T2 ৳৩,০০০ জমা দেয়। সঠিক ব্যালেন্স হওয়া উচিত ৳১১,০০০।"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold block">Transaction T1</span>
                  <div>Reads 10,000 → Writes 8,000</div>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">Transaction T2</span>
                  <div className="text-rose-400 font-bold">Reads stale 10,000 → Writes 13,000 (Overwrites T1!)</div>
                </div>
              </div>
            </>
          )}
          {activeAnomaly === 'dirty_read' && (
            <>
              <span className="text-rose-400 font-mono font-bold uppercase">2. Dirty Read Problem</span>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1">
                <div>1. T1 updates balance from ৳10,000 to ৳5,000 (Uncommitted).</div>
                <div className="text-amber-300 font-bold">2. T2 reads uncommitted ৳5,000 and acts on it.</div>
                <div className="text-rose-400 font-bold">3. T1 issues ROLLBACK! Balance reverts to ৳10,000.</div>
              </div>
            </>
          )}
          {activeAnomaly === 'unrepeatable_read' && (
            <>
              <span className="text-rose-400 font-mono font-bold uppercase">3. Unrepeatable (Fuzzy) Read</span>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1">
                <div>1. T1 reads Student 101 GPA = 3.80.</div>
                <div className="text-cyan-300">2. T2 updates GPA = 3.95 and COMMITs.</div>
                <div className="text-amber-300 font-bold">3. T1 re-reads Student 101 GPA → gets 3.95!</div>
              </div>
            </>
          )}
          {activeAnomaly === 'phantom_read' && (
            <>
              <span className="text-rose-400 font-mono font-bold uppercase">4. Phantom Read Problem</span>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1">
                <div>1. T1 runs COUNT(*) WHERE Dept=&apos;CSE&apos; → 10 rows.</div>
                <div className="text-cyan-300">2. T2 inserts a new CSE student and COMMITs.</div>
                <div className="text-amber-300 font-bold">3. T1 re-runs the same query → 11 rows!</div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* PART 5: SERIALIZABILITY & PRECEDENCE GRAPHS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৫ • সিরিয়ালাইজেবিলিটি' : 'Part 5 of 7'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Transaction Schedules & Conflict Serializability"
                bn="৫. ট্রানজ্যাকশন শিডিউল ও Conflict Serializability"
              />
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setScheduleType('serial')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              scheduleType === 'serial' ? 'bg-cyan-600 text-white ' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            1. Pure Serial (T1 → T2)
          </button>
          <button
            onClick={() => setScheduleType('conflict_serializable')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              scheduleType === 'conflict_serializable' ? 'bg-emerald-600 text-white ' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            2. Conflict Serializable (Acyclic)
          </button>
          <button
            onClick={() => setScheduleType('non_serializable')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              scheduleType === 'non_serializable' ? 'bg-rose-600 text-white ' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            3. Non-Serializable (Cycle: T1 ↔ T2)
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
          {scheduleType === 'conflict_serializable' && (
            <>
              <span className="text-emerald-400 font-mono font-bold uppercase">✓ Conflict Serializable Schedule</span>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] text-cyan-300">
                Precedence Graph: (T1) ──▶ (T2) • NO cycle (Acyclic) ⇒ Equivalent to serial T1 → T2!
              </div>
            </>
          )}
          {scheduleType === 'non_serializable' && (
            <>
              <span className="text-rose-400 font-mono font-bold uppercase">✗ Cyclic Precedence Graph</span>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] text-rose-400">
                Precedence Graph: (T1) ──▶ (T2) ──▶ (T1) • CYCLE DETECTED! Not serializable.
              </div>
            </>
          )}
          {scheduleType === 'serial' && (
            <>
              <span className="text-cyan-400 font-mono font-bold uppercase">Pure Serial Schedule</span>
              <DualText
                as="p"
                className="text-zinc-300 font-sans"
                en="T1 finishes completely before T2 starts. Always correct, but wastes CPU time during I/O waits."
                bn="T1 পুরোপুরি শেষ হওয়ার পর T2 শুরু হয়। এটি শতভাগ নিরাপদ, কিন্তু থ্রুপুট কম।"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
