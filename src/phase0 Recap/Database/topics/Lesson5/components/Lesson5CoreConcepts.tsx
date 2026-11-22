'use client';

import React, { useState } from 'react';
import { Workflow, ImageIcon, Network, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5CoreConcepts() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'tree' | 'image'>('tree');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
      {/* Header with Compact View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold uppercase tracking-wider">
              {language === 'bn' ? 'মূল উপাদান ও ধারণা' : 'Core Components & Key Concepts'}
            </span>
            <h3 className="text-sm md:text-base font-bold text-white mt-0.5">
              <DualText
                en="Core Components & Key Concepts in ER Diagrams"
                bn="ইআর ডায়াগ্রামের মূল উপাদান এবং প্রধান ধারণাসমূহ"
              />
            </h3>
          </div>
        </div>

        {/* View Toggle (Tree vs Image) */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0c1020] border border-slate-800 self-start sm:self-auto text-[11px] font-mono">
          <button
            onClick={() => setViewMode('tree')}
            className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'tree'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Network className="w-3 h-3" />
            <span>{language === 'bn' ? 'ট্রি ভিউ' : 'Tree View'}</span>
          </button>
          <button
            onClick={() => setViewMode('image')}
            className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'image'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>{language === 'bn' ? 'ডায়াগ্রাম ছবি' : 'Diagram Image'}</span>
          </button>
        </div>
      </div>

      {/* 1. Core Hierarchy Tree (Managed Vertical Overhead) */}
      {viewMode === 'tree' ? (
        <div className="p-3.5 rounded-xl bg-[#0a0d18] border border-emerald-900/30 space-y-3">
          {/* Root Node */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-1 rounded-lg bg-emerald-700 text-white font-mono font-bold text-xs shadow-md border border-emerald-500/40">
              ER Model
            </div>
            {/* Minimal Branch Connector Line */}
            <div className="w-px h-2.5 bg-emerald-600/50" />
            <div className="w-4/5 md:w-3/5 h-px bg-emerald-600/40 relative">
              <div className="absolute -left-0.5 -bottom-1 w-1 h-1 bg-emerald-500 rounded-full" />
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
              <div className="absolute -right-0.5 -bottom-1 w-1 h-1 bg-emerald-500 rounded-full" />
            </div>
          </div>

          {/* 3 Component Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Branch 1: Entity */}
            <div className="p-2.5 rounded-xl bg-[#0f1424] border border-emerald-800/40 space-y-1.5">
              <div className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-mono font-bold text-xs text-center">
                {language === 'bn' ? 'Entity (এনটিটি)' : 'Entity'}
              </div>
              <ul className="text-[11px] font-mono text-zinc-300 space-y-1 pl-1">
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Strong Entity</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Weak Entity</span>
                </li>
              </ul>
            </div>

            {/* Branch 2: Attribute */}
            <div className="p-2.5 rounded-xl bg-[#0f1424] border border-emerald-800/40 space-y-1.5">
              <div className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-mono font-bold text-xs text-center">
                {language === 'bn' ? 'Attribute (অ্যাট্রিবিউট)' : 'Attribute'}
              </div>
              <ul className="text-[11px] font-mono text-zinc-300 space-y-1 pl-1">
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Key Attribute</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Composite Attribute</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Multivalued Attribute</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Derived Attribute</span>
                </li>
              </ul>
            </div>

            {/* Branch 3: Relationship */}
            <div className="p-2.5 rounded-xl bg-[#0f1424] border border-emerald-800/40 space-y-1.5">
              <div className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-mono font-bold text-xs text-center">
                {language === 'bn' ? 'Relationship (রিলেশনশিপ)' : 'Relationship'}
              </div>
              <ul className="text-[11px] font-mono text-zinc-300 space-y-1 pl-1">
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">One to One (1:1)</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">One to Many (1:N)</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Many to One (N:1)</span>
                </li>
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <ArrowRight className="w-3 h-3 shrink-0" />
                  <span className="text-zinc-200">Many to Many (M:N)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Image View: Exact User Diagram with Controlled Height */
        <div className="p-3 rounded-xl bg-white border border-slate-700 flex items-center justify-center">
          <img
            src="/images/lesson5-er-model-hierarchy.jpg"
            alt="ER Model Hierarchy - Entity, Attribute, Relationship"
            className="w-full max-w-2xl max-h-48 md:max-h-56 object-contain"
          />
        </div>
      )}

      {/* 2. Key Concepts in ER Diagrams (Low Overhead 3-column row) */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wide block">
          {language === 'bn' ? 'প্রধান ধারণাসমূহ (Key Concepts):' : 'Key Concepts in ER Diagrams:'}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-sans">
          {/* Cardinality */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
            <div className="font-bold text-white font-mono flex items-center gap-1.5 text-[11px]">
              <span className="text-emerald-400 text-xs">●</span>
              <span>{language === 'bn' ? 'কার্ডিনালিটি (Cardinality)' : 'Cardinality'}</span>
            </div>
            <div className="text-[11px] text-zinc-300 leading-snug">
              <DualText
                en="Defines how many instances of one entity relate to another: 1:1, 1:N, or M:N."
                bn="একটি এনটিটির কতগুলো ইনস্ট্যান্স অন্যের সাথে যুক্ত হতে পারে: ১:১, ১:N, বা M:N।"
              />
            </div>
          </div>

          {/* Participation */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
            <div className="font-bold text-white font-mono flex items-center gap-1.5 text-[11px]">
              <span className="text-amber-400 text-xs">●</span>
              <span>{language === 'bn' ? 'পার্টিসিপেশন (Participation)' : 'Participation'}</span>
            </div>
            <div className="text-[11px] text-zinc-300 leading-snug">
              <DualText
                en="Shows if every instance must participate (Total / mandatory) or is optional (Partial)."
                bn="প্রতিটি ইনস্ট্যান্সের অংশগ্রহণ কি বাধ্যতামূলক (Total) নাকি ঐচ্ছিক (Partial)।"
              />
            </div>
          </div>

          {/* Design Levels */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
            <div className="font-bold text-white font-mono flex items-center gap-1.5 text-[11px]">
              <span className="text-cyan-400 text-xs">●</span>
              <span>{language === 'bn' ? 'ডিজাইন লেভেল (Design Levels)' : 'Design Levels'}</span>
            </div>
            <div className="text-[11px] text-zinc-300 leading-snug">
              <DualText
                en="Conceptual (scope) → Logical (software-independent) → Physical (SQL tables, keys, types)."
                bn="কনসেপচুয়াল (স্কোপ) → লজিক্যাল (সফটওয়্যার-নিরপেক্ষ) → ফিজিক্যাল (SQL টেবিল, কি, টাইপ)।"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
