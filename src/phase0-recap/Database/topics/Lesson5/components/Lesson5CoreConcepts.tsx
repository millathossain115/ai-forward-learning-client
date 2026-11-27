'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, Sparkles, ImageIcon, Network, ArrowRight, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5CoreConcepts() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'tree' | 'image'>('tree');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <section className="space-y-4">
      {/* 2-Column Side-by-Side Responsive Layout for Low Vertical Overhead */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* ========================================================
            CARD 1: CORE COMPONENTS (৩টি মূল উপাদান)
           ======================================================== */}
        <div className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-4 md:p-5 flex flex-col justify-between space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                  {language === 'bn' ? 'পার্ট ১ • স্থাপত্য উপাদান' : 'Part A • Architecture'}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white mt-0.5">
                  <DualText
                    en="1. Core Components in ER Diagrams"
                    bn="১. ইআর ডায়াগ্রামের ৩টি মূল উপাদান"
                  />
                </h3>
              </div>
            </div>

            {/* Compact View Toggle (Tree vs Image) */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0c1020] border border-white/[0.08] text-[10px] font-mono">
              <button
                onClick={() => setViewMode('tree')}
                className={`px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'tree'
                    ? 'bg-emerald-600 text-white '
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Network className="w-3 h-3" />
                <span>{language === 'bn' ? 'ট্রি' : 'Tree'}</span>
              </button>
              <button
                onClick={() => setViewMode('image')}
                className={`px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  viewMode === 'image'
                    ? 'bg-emerald-600 text-white '
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>{language === 'bn' ? 'ছবি' : 'Image'}</span>
              </button>
            </div>
          </div>

          {/* Body */}
          {viewMode === 'tree' ? (
            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              {/* 3 Components Mini Cards */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {/* 1. Entity */}
                <div className="p-2.5 rounded-xl bg-[#090d1c] border border-cyan-900/40 space-y-1.5 flex flex-col">
                  <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1">
                    <span className="text-cyan-400">▭</span> Entity
                  </span>
                  <ul className="text-[10px] font-mono text-zinc-300 space-y-1 flex-1">
                    <li className="flex items-center gap-1 text-cyan-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">Strong</span>
                    </li>
                    <li className="flex items-center gap-1 text-cyan-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">Weak</span>
                    </li>
                  </ul>
                  <span className="text-[9px] font-mono text-zinc-500 border-t border-white/[0.08] pt-1">
                    {language === 'bn' ? 'বাস্তব বস্তু' : 'Real Objects'}
                  </span>
                </div>

                {/* 2. Attribute */}
                <div className="p-2.5 rounded-xl bg-[#090d1c] border border-amber-900/40 space-y-1.5 flex flex-col">
                  <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                    <span className="text-amber-400">⬭</span> Attribute
                  </span>
                  <ul className="text-[10px] font-mono text-zinc-300 space-y-1 flex-1">
                    <li className="flex items-center gap-1 text-amber-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">Key (PK)</span>
                    </li>
                    <li className="flex items-center gap-1 text-amber-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">Composite</span>
                    </li>
                    <li className="flex items-center gap-1 text-amber-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">Multi</span>
                    </li>
                    <li className="flex items-center gap-1 text-amber-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">Derived</span>
                    </li>
                  </ul>
                  <span className="text-[9px] font-mono text-zinc-500 border-t border-white/[0.08] pt-1">
                    {language === 'bn' ? 'বৈশিষ্ট্যাবলী' : 'Properties'}
                  </span>
                </div>

                {/* 3. Relationship */}
                <div className="p-2.5 rounded-xl bg-[#090d1c] border border-purple-900/40 space-y-1.5 flex flex-col">
                  <span className="text-[11px] font-mono font-bold text-purple-300 flex items-center gap-1">
                    <span className="text-purple-400">◇</span> Relation
                  </span>
                  <ul className="text-[10px] font-mono text-zinc-300 space-y-1 flex-1">
                    <li className="flex items-center gap-1 text-purple-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">1:1</span>
                    </li>
                    <li className="flex items-center gap-1 text-purple-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">1:N</span>
                    </li>
                    <li className="flex items-center gap-1 text-purple-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">N:1</span>
                    </li>
                    <li className="flex items-center gap-1 text-purple-400">
                      <span>&bull;</span>
                      <span className="text-zinc-300">M:N</span>
                    </li>
                  </ul>
                  <span className="text-[9px] font-mono text-zinc-500 border-t border-white/[0.08] pt-1">
                    {language === 'bn' ? 'সংযোগ' : 'Associations'}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#080b16] border border-white/[0.08] text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Chen ER: ▭ Entity • ⬭ Attribute • ◇ Relationship</span>
                <span className="text-emerald-400 font-semibold">Hierarchy</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsModalOpen(true)}
              className="group relative cursor-pointer p-2 rounded-xl bg-white border border-white/[0.12] flex flex-col items-center justify-center transition-colors hover:border-emerald-400 flex-1 min-h-[140px]"
            >
              <img
                src="/images/lesson5-er-model-hierarchy.jpg"
                alt="ER Model Hierarchy"
                className="w-full max-h-36 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-zinc-600 mt-1 flex items-center gap-1 group-hover:text-emerald-700">
                Click to view full-screen ⤢
              </span>
            </div>
          )}
        </div>

        {/* ========================================================
            CARD 2: KEY CONCEPTS (৩টি প্রধান ধারণা)
           ======================================================== */}
        <div className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-4 md:p-5 flex flex-col justify-between space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                  {language === 'bn' ? 'পার্ট ২ • নিয়ম ও সীমাবদ্ধতা' : 'Part B • Rules & Constraints'}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white mt-0.5">
                  <DualText
                    en="2. Key Concepts in ER Diagrams"
                    bn="২. ইআর ডায়াগ্রামের ৩টি মূল ধারণা"
                  />
                </h3>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono font-bold">
              Constraints
            </span>
          </div>

          {/* 3 Equal Concept Rows */}
          <div className="space-y-2 flex-1 flex flex-col justify-between text-xs font-sans">
            {/* Concept 1: Cardinality */}
            <div className="p-2.5 rounded-xl bg-[#101116] border border-emerald-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white font-mono flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{language === 'bn' ? '১. কার্ডিনালিটি (Cardinality)' : '1. Cardinality'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold">
                  1:1 • 1:N • M:N
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 leading-snug">
                <DualText
                  en="Defines how many instances of one entity relate to another instance."
                  bn="একটি সত্তা অপর সত্তার সর্বোচ্চ কতগুলো ইনস্ট্যান্সের সাথে যুক্ত হতে পারে তার সংখ্যা।"
                />
              </div>
            </div>

            {/* Concept 2: Participation */}
            <div className="p-2.5 rounded-xl bg-[#101116] border border-amber-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white font-mono flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{language === 'bn' ? '২. পার্টিসিপেশন (Participation)' : '2. Participation'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-semibold">
                  Total (══) • Partial (──)
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 leading-snug">
                <DualText
                  en="Shows if every instance must participate (Total / mandatory) or is optional (Partial)."
                  bn="প্রতিটি ইনস্ট্যান্সের অংশগ্রহণ কি বাধ্যতামূলক (Total / ডাবল দাগ) নাকি ঐচ্ছিক (Partial / সিঙ্গেল দাগ)।"
                />
              </div>
            </div>

            {/* Concept 3: Design Levels */}
            <div className="p-2.5 rounded-xl bg-[#101116] border border-cyan-900/40 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white font-mono flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{language === 'bn' ? '৩. ডিজাইন লেভেল (Design Levels)' : '3. Design Levels'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold">
                  Conceptual → Logical → Physical
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 leading-snug">
                <DualText
                  en="Moves from high-level scope to software-independent model, then target SQL tables & data types."
                  bn="হাই-লেভেল স্কোপ থেকে শুরু হয়ে সফটওয়্যার-নিরপেক্ষ লজিক্যাল মডেল এবং শেষে বাস্তব SQL টেবিল।"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Modal for Hierarchy */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-2xl bg-[#0B0F19] border border-emerald-500/40 p-4 md:p-6 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm md:text-base font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">▣</span>
                  {language === 'bn' ? 'ইআর মডেল হায়ারার্কি ডায়াগ্রাম' : 'ER Model Hierarchy Diagram'}
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Entity (Strong/Weak), Attribute (Key/Composite/Multi/Derived), Relationship (1:1, 1:N, N:1, M:N)
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/[0.12]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center p-3 rounded-xl bg-white border border-white/[0.12]">
              <img
                src="/images/lesson5-er-model-hierarchy.jpg"
                alt="ER Model Hierarchy"
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
              <span>Press ESC or click anywhere outside to close</span>
              <span className="text-emerald-400 font-semibold">Full Screen View</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
