'use client';

import React, { useState } from 'react';
import { Workflow } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson8Part3FunctionalDep() {
  const { language } = useLanguage();
  const [activeFdType, setActiveFdType] = useState<'trivial' | 'nontrivial' | 'full' | 'partial' | 'transitive'>('partial');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • ফাংশনাল ডিপেনডেন্সি' : 'Part 3 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Functional Dependency (FD): The Mathematical Core"
              bn="৩. ফাংশনাল ডিপেনডেন্সি (FD): গাণিতিক ভিত্তি"
            />
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
        <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Concept: A → B (A determines B)</span>
        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en={<>If attribute <strong className="text-cyan-400">A</strong> uniquely determines attribute <strong className="text-purple-400">B</strong> for every tuple, we write <code className="text-emerald-400 font-mono">A → B</code>. Attribute <code className="text-cyan-300">A</code> is the <strong>determinant</strong>.</>}
          bn={<>যদি কোনো রিলেশনে অ্যাট্রিবিউট <strong className="text-cyan-400">A</strong>-এর মান অ্যাট্রিবিউট <strong className="text-purple-400">B</strong>-এর মানকে এককভাবে নির্ধারণ করে, তবে তাকে <code className="text-emerald-400 font-mono">A → B</code> লেখা হয়। এখানে <code className="text-cyan-300">A</code> হলো <strong>determinant</strong>।</>}
        />
        <div className="p-3 bg-black/40 rounded-lg text-xs font-mono text-zinc-300">
          Student_ID → Student_Name &nbsp;|&nbsp; Course_ID → Course_Name
        </div>
        <DualText
          as="p"
          className="text-[11px] text-zinc-400 font-sans"
          en="* One-way rule: Student_ID → Name is valid, but Name ↛ Student_ID because two students can share a name."
          bn="* একমুখী নিয়ম: Student_ID → Name সঠিক, কিন্তু Name ↛ Student_ID কারণ একাধিক শিক্ষার্থীর নাম এক হতে পারে।"
        />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-slate-300 uppercase">
          <DualText as="span" en="5 Essential Types of Functional Dependencies" bn="৫টি প্রধান ফাংশনাল ডিপেনডেন্সির ধরন" />
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'trivial' as const, label: '1. Trivial', formula: '(A, B) → B' },
            { id: 'nontrivial' as const, label: '2. Non-Trivial', formula: 'A → B' },
            { id: 'full' as const, label: '3. Full FD', formula: '(A, B) → C' },
            { id: 'partial' as const, label: '4. Partial FD', formula: 'A → C (2NF)' },
            { id: 'transitive' as const, label: '5. Transitive', formula: 'A → B → C (3NF)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveFdType(t.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeFdType === t.id
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{t.label}</div>
              <div className="text-[10px] text-cyan-300 mt-0.5 font-mono">{t.formula}</div>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-2">
          {activeFdType === 'trivial' && (
            <>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Trivial Functional Dependency</span>
              <DualText as="p" className="text-xs text-zinc-300 font-sans" en="Right-hand attribute is a subset of left-hand side: Y ⊆ X." bn="ডান পাশের অ্যাট্রিবিউট বাম পাশের সাবসেট হলে (Y ⊆ X) তা Trivial FD।" />
              <div className="p-3 bg-black/60 rounded font-mono text-xs text-amber-300">(Student_ID, Name) → Name</div>
            </>
          )}
          {activeFdType === 'nontrivial' && (
            <>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Non-Trivial Functional Dependency</span>
              <DualText as="p" className="text-xs text-zinc-300 font-sans" en="Right-hand attribute is NOT included in left-hand side: Y ⊈ X." bn="ডান পাশের অ্যাট্রিবিউট বাম পাশের অংশ না হলে (Y ⊈ X) তা Non-Trivial FD।" />
              <div className="p-3 bg-black/60 rounded font-mono text-xs text-amber-300">Student_ID → Student_Name</div>
            </>
          )}
          {activeFdType === 'full' && (
            <>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Full Functional Dependency</span>
              <DualText as="p" className="text-xs text-zinc-300 font-sans" en="Depends on the entire composite key; removing any key attribute breaks it." bn="পুরো কম্পোজিট কি-এর ওপর নির্ভরশীল; কোনো অংশ বাদ দিলে নির্ভরতা ভেঙে যায়।" />
              <div className="p-3 bg-black/60 rounded font-mono text-xs text-emerald-400">(Student_ID, Course_ID) → Grade</div>
            </>
          )}
          {activeFdType === 'partial' && (
            <>
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Partial Dependency (Target of 2NF)</span>
              <DualText as="p" className="text-xs text-zinc-300 font-sans" en="Non-prime attribute depends on only part of a composite candidate key." bn="নন-প্রাইম অ্যাট্রিবিউট কম্পোজিট কি-এর কেবল একটি অংশের ওপর নির্ভরশীল।" />
              <div className="p-3 bg-black/60 rounded font-mono text-xs text-rose-400">(Student_ID, Course_ID) → Student_Name [Depends ONLY on Student_ID!]</div>
            </>
          )}
          {activeFdType === 'transitive' && (
            <>
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Transitive Dependency (Target of 3NF)</span>
              <DualText as="p" className="text-xs text-zinc-300 font-sans" en="Non-key attribute determines another non-key attribute: A → B and B → C ⇒ A → C." bn="একটি নন-কি অ্যাট্রিবিউট অন্য নন-কি অ্যাট্রিবিউটকে নির্ধারণ করে: A → B এবং B → C ⇒ A → C।" />
              <div className="p-3 bg-black/60 rounded font-mono text-xs text-purple-300">Student_ID → Department_ID → Department_Name</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
