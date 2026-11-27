'use client';

import React, { useState } from 'react';
import { RotateCcw, Workflow } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson9Part3LifecycleSavepoint() {
  const { language } = useLanguage();
  const [activeLifecycleState, setActiveLifecycleState] = useState<'active' | 'partially_committed' | 'committed' | 'failed' | 'aborted'>('active');
  const [savepointStep, setSavepointStep] = useState<number>(1);

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • স্টেট ও SAVEPOINT' : 'Part 3 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Transaction Lifecycle & SAVEPOINT Control"
              bn="৩. ট্রানজ্যাকশন লাইফসাইকেল এবং COMMIT, ROLLBACK ও SAVEPOINT"
            />
          </h2>
        </div>
      </div>

      {/* 5-State Machine */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { id: 'active' as const, label: '1. Active', descEn: 'Executing', descBn: 'চলমান অবস্থা' },
          { id: 'partially_committed' as const, label: '2. Partially Committed', descEn: 'Final SQL ran', descBn: 'শেষ স্টেটমেন্ট সম্পন্ন' },
          { id: 'committed' as const, label: '3. Committed', descEn: 'Permanent', descBn: 'স্থায়ীভাবে সেভ' },
          { id: 'failed' as const, label: '4. Failed', descEn: 'Error / crash', descBn: 'ত্রুটি বা ক্র্যাশ' },
          { id: 'aborted' as const, label: '5. Aborted', descEn: 'Rolled back', descBn: 'রোলব্যাক সম্পন্ন' },
        ].map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveLifecycleState(st.id)}
            className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
              activeLifecycleState === st.id
                ? 'bg-indigo-600/30 border-indigo-400 text-white '
                : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono font-bold text-cyan-300">{st.label}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">{language === 'bn' ? st.descBn : st.descEn}</div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-indigo-900/40 text-xs text-zinc-300 font-sans">
        {activeLifecycleState === 'active' && (
          <DualText
            as="p"
            en="Active: Executing read/write operations in memory. On error → Failed; on completion → Partially Committed."
            bn="Active: মেমরিতে রিড/রাইট অপারেশন চলছে। ত্রুটি হলে Failed; সব ধাপ শেষ হলে Partially Committed-এ যায়।"
          />
        )}
        {activeLifecycleState === 'partially_committed' && (
          <DualText
            as="p"
            en="Partially Committed: Last statement ran, flushing WAL logs to disk. Disk flush ok → Committed; crash → Failed."
            bn="Partially Committed: শেষ SQL চলেছে, এখন ডিস্কে WAL লগ ফ্লাশ হচ্ছে। ফ্লাশ সফল হলে Committed, ক্র্যাশ করলে Failed।"
          />
        )}
        {activeLifecycleState === 'committed' && (
          <DualText
            as="p"
            en="Committed (Terminal): All changes are durably persisted on disk and cannot be undone."
            bn="Committed (চূড়ান্ত): সব পরিবর্তন স্থায়ীভাবে ডিস্কে সেভ হয়েছে; এটি আর রোলব্যাক করা যাবে না।"
          />
        )}
        {activeLifecycleState === 'failed' && (
          <DualText
            as="p"
            en="Failed: Constraint violation, deadlock, or crash halted execution. Recovery Manager must undo changes."
            bn="Failed: কনস্ট্রেইন্ট ভঙ্গ, ডেডলক বা ক্র্যাশের কারণে থেমে গেছে। এখন রোলব্যাক করতে হবে।"
          />
        )}
        {activeLifecycleState === 'aborted' && (
          <DualText
            as="p"
            en="Aborted (Terminal): Rollback finished; database restored to pre-transaction consistent state."
            bn="Aborted (চূড়ান্ত): রোলব্যাক শেষ; ডেটাবেস ট্রানজ্যাকশনের আগের অবস্থায় ফিরে এসেছে।"
          />
        )}
      </div>

      {/* Savepoint Stepper */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <DualText as="span" en="SAVEPOINT Execution Stepper" bn="SAVEPOINT এক্সিকিউশন স্টেপার" />
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((st) => (
              <button
                key={st}
                onClick={() => setSavepointStep(st)}
                className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                  savepointStep === st ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Step {st}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-black/60 rounded-xl font-mono text-xs text-zinc-300 space-y-2 overflow-x-auto">
          <div className={savepointStep >= 1 ? 'text-emerald-400' : 'text-zinc-600'}>
            START TRANSACTION;<br />
            UPDATE Accounts SET Balance = Balance - 1000 WHERE Account_ID = 101;
          </div>
          <div className={savepointStep >= 2 ? 'text-amber-300 font-bold' : 'text-zinc-600'}>
            SAVEPOINT step_one; -- Checkpoint created!
          </div>
          <div className={savepointStep >= 3 ? 'text-rose-400' : 'text-zinc-600'}>
            UPDATE Accounts SET Balance = Balance + 999999 WHERE Account_ID = 999; -- Erroneous Account!
          </div>
          <div className={savepointStep >= 4 ? 'text-purple-300 font-bold' : 'text-zinc-600'}>
            ROLLBACK TO SAVEPOINT step_one; -- Reverts ONLY the bad update!<br />
            COMMIT; -- Persists Account 101 deduction safely!
          </div>
        </div>

        <div className="text-xs text-zinc-400 font-sans">
          {savepointStep === 1 && (language === 'bn' ? 'ধাপ ১: অ্যাকাউন্ট ১০১ থেকে ৳১,০০০ কমানো হলো (আনকমিটেড)।' : 'Deducts ৳1,000 from Account 101 in uncommitted memory.')}
          {savepointStep === 2 && (language === 'bn' ? 'ধাপ ২: step_one নামে একটি সেভপয়েন্ট তৈরি হলো।' : 'Marks a bookmark labeled step_one.')}
          {savepointStep === 3 && (language === 'bn' ? 'ধাপ ৩: ভুল অ্যাকাউন্টে ভুল আপডেট করা হলো।' : 'Simulates an erroneous update on an invalid account.')}
          {savepointStep === 4 && (language === 'bn' ? 'ধাপ ৪: ROLLBACK TO step_one শুধু ভুল আপডেটটি মুছে প্রথম আপডেট কমিট করে!' : 'ROLLBACK TO step_one undoes only the bad update, then COMMIT saves the valid deduction!')}
        </div>
      </div>
    </section>
  );
}
