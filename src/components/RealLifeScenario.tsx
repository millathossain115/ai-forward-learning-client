'use client';

import React from 'react';
import { Sparkles, LucideIcon, ArrowRight } from 'lucide-react';

export interface ScenarioItem {
  title: string;
  subtitle: string;
  analogy: string;
  whyItFits: string;
  badge: string;
  accentColor: string; // e.g. 'emerald', 'sky', 'violet', 'amber', 'rose'
  visualTag: string; // e.g. 'LIFO', 'FIFO', 'O(1) Index', 'Pointer'
  diagram?: React.ReactNode;
}

interface RealLifeScenarioProps {
  topicName: string;
  scenarios: ScenarioItem[];
}

export default function RealLifeScenario({ topicName, scenarios }: RealLifeScenarioProps) {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-zinc-100 uppercase tracking-wider font-mono">
              বাস্তব জীবনের দৃশ্যপট • Everyday Real-Life Analogies
            </h3>
            <span className="text-xs md:text-sm text-zinc-300 font-sans block mt-0.5">
              দৈনন্দিন জীবনের অভিজ্ঞতার সাথে {topicName}-এর নিখুঁত সংযোগ
            </span>
          </div>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#181a28] text-amber-300 border border-amber-500/30 font-medium">
          User-Friendly Visual Mental Model
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {scenarios.map((sc, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[#1e2236] bg-[#0a0b12] p-5 flex flex-col justify-between gap-4 hover:border-[#2f354f] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-[#161826] text-amber-400 border border-[#262a42] font-semibold">
                  {sc.badge}
                </span>
                <span className="text-xs font-mono text-zinc-300 font-medium bg-[#111320] px-2.5 py-1 rounded border border-[#1b1e2e]">
                  {sc.visualTag}
                </span>
              </div>

              <h4 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                {sc.title}
              </h4>
              <span className="text-xs text-zinc-400 font-mono block mt-0.5 mb-3">{sc.subtitle}</span>

              <p className="text-sm text-zinc-200 leading-relaxed font-sans bg-[#0f111d] p-3.5 rounded-xl border border-[#1a1d2e]">
                {sc.analogy}
              </p>
            </div>

            {sc.diagram && (
              <div className="bg-[#121422] p-3 rounded-lg border border-[#1d2033] flex items-center justify-center text-xs md:text-sm">
                {sc.diagram}
              </div>
            )}

            <div className="pt-2.5 border-t border-[#171928] text-xs md:text-sm text-zinc-300">
              <span className="text-amber-400 font-semibold font-mono mr-1.5">কেন এটি মিলে:</span>
              <span className="leading-relaxed font-sans">{sc.whyItFits}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
