'use client';

import React, { useState } from 'react';
import { KeyRound, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson18Part2DesignSynthesis() {
  const { language } = useLanguage();
  const [tab, setTab] = useState<'keys' | 'er' | 'norm'>('keys');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • ডেটা মডেলিং ও নরমালাইজেশন' : 'Part 2 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Relational Design Synthesis: Keys, ER Model & Normalization"
              bn="২. রিলেশনাল ডিজাইন রিভিশন: Keys, ER মডেল ও নরমালাইজেশন"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'keys' as const, label: 'Keys Hierarchy' },
          { id: 'er' as const, label: 'ER Modeling & Cardinality' },
          { id: 'norm' as const, label: '1NF → 2NF → 3NF → BCNF' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              tab === t.id ? 'bg-purple-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
        {tab === 'keys' && (
          <>
            <span className="font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" /> Key Types &amp; Referential Integrity
            </span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans leading-relaxed"
              en="Super Key (unique) -> Candidate Key (minimal superkey) -> Primary Key (chosen, non-NULL) & Alternate Keys. Foreign Key links child rows to parent PKs enforcing Referential Integrity."
              bn="Super Key -> Candidate Key (ন্যূনতম) -> Primary Key (অবশ্যই নন-NULL) ও Alternate Key। Foreign Key প্যারেন্ট টেবিলের সাথে সম্পর্ক রক্ষা করে।"
            />
          </>
        )}
        {tab === 'er' && (
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Strong Entity (Rectangle, own PK) vs Weak Entity (Double Rectangle, partial key + identifying relationship). M:N relationships always convert to a separate Junction Table with composite PK."
            bn="Strong Entity (নিজস্ব PK) বনাম Weak Entity (প্যারেন্টের ওপর নির্ভরশীল)। M:N সম্পর্ক টেবিলে রূপান্তরের সময় সবসময় একটি জাংশন টেবিল তৈরি হয়।"
          />
        )}
        {tab === 'norm' && (
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="1NF: Atomic cells. 2NF: No partial dependency on composite key. 3NF: No transitive (non-key -> non-key) dependency. BCNF: Every determinant X in (X -> Y) must be a superkey."
            bn="1NF: একক মান। 2NF: Partial FD নেই। 3NF: Transitive FD নেই। BCNF: প্রতিটি ডিটারমিন্যান্ট অবশ্যই একটি সুপারকি।"
          />
        )}
      </div>
    </section>
  );
}
