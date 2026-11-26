'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, Check, Copy, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const TX_SQL = `-- Step 1: Begin transactional envelope
START TRANSACTION;

-- Step 2: Deduct from Rahim
UPDATE Accounts 
SET Balance = Balance - 5000 
WHERE Account_ID = 101;

-- Step 3: Credit to Karim
UPDATE Accounts 
SET Balance = Balance + 5000 
WHERE Account_ID = 102;

-- Step 4: Atomically persist both operations
COMMIT;

-- If an error happens midway:
-- ROLLBACK;`;

export default function Lesson9Part1TxAndAcid() {
  const { language } = useLanguage();
  const [activeAcidTab, setActiveAcidTab] = useState<'A' | 'C' | 'I' | 'D'>('A');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(TX_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      {/* PART 1: WHAT IS A TRANSACTION? */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১ • ট্রানজ্যাকশন পরিচিতি' : 'Part 1 of 7'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText as="span" en="What is a Database Transaction?" bn="১. ডেটাবেস ট্রানজ্যাকশন কী?" />
            </h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            <DualText as="span" en="Core Definition" bn="মূল সংজ্ঞা" />
          </span>
          <DualText
            as="p"
            className="text-xs text-zinc-300 leading-relaxed font-sans"
            en={<>A <strong className="text-white">database transaction</strong> is a logical unit of work containing one or more SQL operations. It is atomic: <strong className="text-emerald-300">either all operations succeed together or none take effect</strong>.</>}
            bn={<><strong className="text-white">ডেটাবেস ট্রানজ্যাকশন</strong> হলো এক বা একাধিক SQL অপারেশনের একটি অবিভাজ্য কাজের একক: <strong className="text-emerald-300">হয় সবগুলো ধাপ একসাথে সফল হবে, নয়তো একটিও কার্যকর হবে না</strong>।</>}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">
              <DualText as="span" en="Real-World Case: Bank Fund Transfer" bn="বাস্তব উদাহরণ: ব্যাংক ফান্ড ট্রান্সফার" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans leading-relaxed"
              en={<>Suppose Rahim transfers <strong>৳5,000</strong> to Karim. Total initial reserves: ৳30,000.</>}
              bn={<>ধরুন রহিম করিমকে <strong>৳৫,০০০</strong> পাঠাচ্ছেন। মোট প্রারম্ভিক ব্যালেন্স: ৳৩০,০০০।</>}
            />
            <div className="overflow-x-auto rounded-lg border border-slate-800 font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-zinc-400">
                  <tr>
                    <th className="py-1.5 px-3">Account</th>
                    <th className="py-1.5 px-3">Initial</th>
                    <th className="py-1.5 px-3 text-emerald-400">After Transfer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <tr><td className="py-1.5 px-3 text-white">Rahim (101)</td><td className="py-1.5 px-3">৳20,000</td><td className="py-1.5 px-3 text-emerald-300 font-bold">৳15,000 (-5k)</td></tr>
                  <tr><td className="py-1.5 px-3 text-white">Karim (102)</td><td className="py-1.5 px-3">৳10,000</td><td className="py-1.5 px-3 text-emerald-300 font-bold">৳15,000 (+5k)</td></tr>
                  <tr className="bg-black/30 font-bold"><td className="py-1.5 px-3 text-cyan-300">Total Sum</td><td className="py-1.5 px-3 text-cyan-300">৳30,000</td><td className="py-1.5 px-3 text-cyan-300">৳30,000 (Invariant Preserved!)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
              <strong className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <DualText as="span" en="What if the server crashes in Step 2?" bn="ধাপ ২-এ সার্ভার ক্র্যাশ করলে কী হবে?" />
              </strong>
              <DualText
                as="p"
                className="text-[11px] text-zinc-300"
                en="If ৳5,000 is deducted from Rahim before Karim receives it, transaction atomicity automatically rolls back the deduction."
                bn="রহিমের টাকা কাটার পর করিমের অ্যাকাউন্টে যোগ হওয়ার আগেই ক্র্যাশ করলে, Atomicity স্বয়ংক্রিয়ভাবে টাকাটি রোলব্যাক করে দেয়।"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">SQL Transaction Block</span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'SQL কপি' : 'Copy SQL')}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
              {TX_SQL}
            </pre>
          </div>
        </div>
      </section>

      {/* PART 2: ACID PROPERTIES */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২ • ACID প্রোপার্টি' : 'Part 2 of 7'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="ACID Properties: The 4 Pillars of Transaction Integrity"
                bn="২. ACID প্রোপার্টি: ট্রানজ্যাকশন নিরাপত্তার ৪ স্তম্ভ"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'A' as const, name: 'Atomicity', mottoEn: 'All or Nothing', mottoBn: 'হয় সব, নয় কিছুই না' },
            { id: 'C' as const, name: 'Consistency', mottoEn: 'Preserves Invariants', mottoBn: 'শুদ্ধতা বজায় রাখে' },
            { id: 'I' as const, name: 'Isolation', mottoEn: 'Independent Concurrency', mottoBn: 'স্বাধীন সমান্তরাল কাজ' },
            { id: 'D' as const, name: 'Durability', mottoEn: 'Survives Crashes', mottoBn: 'ক্র্যাশেও ডেটা স্থায়ী' },
          ].map((acid) => (
            <button
              key={acid.id}
              onClick={() => setActiveAcidTab(acid.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeAcidTab === acid.id
                  ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-base font-extrabold font-mono text-cyan-300">{acid.id} • {acid.name}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">{language === 'bn' ? acid.mottoBn : acid.mottoEn}</div>
            </button>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeAcidTab === 'A' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Atomicity: All or Nothing</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Recovery Manager</span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans leading-relaxed"
                en="A transaction cannot be partially executed. If any statement fails, all changes roll back cleanly."
                bn="ট্রানজ্যাকশন আংশিকভাবে কার্যকর হতে পারে না। কোনো ধাপ ব্যর্থ হলে আগের সব পরিবর্তন রোলব্যাক হয়।"
              />
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Rule: If (Step 1 succeeds AND Step 2 fails) ⇒ System automatically executes ROLLBACK.
              </div>
            </>
          )}
          {activeAcidTab === 'C' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Consistency: Preserving Invariants</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Integrity Subsystem</span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans leading-relaxed"
                en="The database moves from one valid constraint-satisfying state to another valid state."
                bn="ডেটাবেস একটি বৈধ অবস্থা থেকে ট্রানজ্যাকশন শেষে আরেকটি বৈধ অবস্থায় পৌঁছায়।"
              />
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Sum(Accounts) before = ৳30,000 • Sum(Accounts) after = ৳30,000.
              </div>
            </>
          )}
          {activeAcidTab === 'I' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Isolation: Concurrent Non-Interference</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Concurrency Manager</span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans leading-relaxed"
                en="Concurrent transactions execute without exposing uncommitted intermediate states to each other."
                bn="একাধিক ট্রানজ্যাকশন একসাথে চললেও কেউ কারো আনকমিটেড পরিবর্তন দেখতে পায় না।"
              />
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Enforced via Locks (2PL) or Multi-Version Concurrency Control (MVCC).
              </div>
            </>
          )}
          {activeAcidTab === 'D' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Durability: Surviving Crashes</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Write-Ahead Logging (WAL)</span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans leading-relaxed"
                en="Once COMMIT succeeds, changes are permanently persisted even if power fails immediately after."
                bn="একবার COMMIT সফল হলে, এর পরমুহূর্তে বিদ্যুৎ চলে গেলেও ডেটা কখনো হারায় না।"
              />
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                WAL records are flushed to non-volatile SSD/disk before confirming COMMIT.
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
