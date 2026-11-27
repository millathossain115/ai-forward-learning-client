'use client';

import React, { useState } from 'react';
import {
  Sliders,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function AnyAllOperatorsSection() {
  const { language } = useLanguage();
  const [anyAllOperator, setAnyAllOperator] = useState<'ANY' | 'ALL'>('ANY');

  return (
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৬ • ANY এবং ALL' : 'Part 6 • ANY & ALL'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText as="span" en="ANY and ALL Comparison Operators" bn="ANY এবং ALL তুলনামূলক অপারেটর" />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="ANY (equivalent to SOME) and ALL modify relational comparison operators (>, <, >=, <=, =) when comparing against a subquery result list."
          bn="Subquery থেকে আসা একাধিক মানের তালিকার সাথে তুলনা করতে >, <, >=, <=, = অপারেটরের সাথে ANY বা ALL ব্যবহৃত হয়।"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAnyAllOperator('ANY')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              anyAllOperator === 'ANY'
                ? 'bg-cyan-600 text-white  '
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            GPA &gt; ANY (BBA GPAs)
          </button>
          <button
            onClick={() => setAnyAllOperator('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              anyAllOperator === 'ALL'
                ? 'bg-purple-600 text-white  '
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            GPA &gt; ALL (BBA GPAs)
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
            <span>Inner Subquery: </span>
            <span className="text-amber-300">SELECT GPA FROM Students WHERE Department = &apos;BBA&apos;</span>
            <span className="text-emerald-400 font-bold ml-2">=&gt; [3.40, 3.70]</span>
          </div>

          {anyAllOperator === 'ANY' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">GPA &gt; ANY [3.40, 3.70]</span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText as="span" en="Equivalent: GPA > 3.40 OR GPA > 3.70 (GPA > MIN)" bn="অর্থ: GPA > 3.40 অথবা GPA > 3.70 (সর্বনিম্নের চেয়ে বড়)" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="Any student whose GPA is higher than at least one BBA student qualifies."
                bn="যেকোনো শিক্ষার্থীর GPA যদি BBA-এর অন্তত একজনের চেয়ে বেশি হয়, তবেই সে নির্বাচিত হবে।"
              />
              <div className="p-3 rounded bg-black/50 text-xs font-mono text-emerald-400">
                Qualified: Sumaiya (3.90), Rahim (3.80), Ayesha (3.70), Tanvir (3.50)
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase">GPA &gt; ALL [3.40, 3.70]</span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText as="span" en="Equivalent: GPA > 3.40 AND GPA > 3.70 (GPA > MAX)" bn="অর্থ: GPA > 3.40 এবং GPA > 3.70 (সর্বোচ্চের চেয়ে বড়)" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="A student's GPA must exceed every single BBA student (strictly > 3.70)."
                bn="শিক্ষার্থীর GPA অবশ্যই BBA-এর প্রতিটি শিক্ষার্থীর চেয়ে (অর্থাৎ 3.70-এর চেয়ে) বেশি হতে হবে।"
              />
              <div className="p-3 rounded bg-black/50 text-xs font-mono text-emerald-400">
                Qualified: Sumaiya (3.90), Rahim (3.80)
              </div>
            </div>
          )}
        </div>
      </section>
  );
}
