'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Workflow,
  Table as TableIcon,
  LayoutGrid,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { ER_SYMBOLS_DATA } from './erSymbolsData';

export default function ERSymbolsReference() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'entity_attr' | 'rel_constraint'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredSymbols = ER_SYMBOLS_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn'
              ? 'পার্ট ৬ • ইআর প্রতীক ও রিলেশনাল রূপান্তর'
              : 'Part 6 • ER Symbols & Relational Table Conversion'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="6. ER Diagram Symbols Cheat Sheet & Relational Table Conversion"
              bn="৬. ইআর প্রতীক চিটশিট ও রিলেশনাল টেবিলে রূপান্তর পদ্ধতি"
            />
          </h2>
        </div>
      </div>

      {/* ========================================================
          6.1 ER DIAGRAM SYMBOLS CHEAT SHEET (UNTOUCHED)
          ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300 font-mono">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {language === 'bn'
                ? '৬.১ পিটার চেন জ্যামিতিক প্রতীকসমূহ (১২টি স্ট্যান্ডার্ড প্রতীক চিটশিট)'
                : '6.1 Peter Chen Notation Geometric Symbols (Cheat Sheet)'}
            </span>
          </div>

          {/* View Mode Toggle: Cards vs Table */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#090c18] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কার্ড ভিউ' : 'Cards View'}</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ম্যাট্রিক্স টেবিল' : 'Cheat Sheet Table'}</span>
            </button>
          </div>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Clear, high-contrast Peter Chen notation geometric figures for quick exam memorization. Every symbol is rendered with crisp vector accuracy and detailed relational properties:"
            bn="পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ পিটার চেন নোটেশনের ১২টি জ্যামিতিক প্রতীক—উচ্চ রেজোলিউশন ও স্পষ্ট ভেক্টরে সাজানো, যাতে কোনো লেখা ছোট বা অস্পষ্ট না থাকে:"
          />
        </div>

        {/* Category Filters Ribbon */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 font-bold  '
                : 'bg-[#0a0d18] text-zinc-400 border-slate-800 hover:text-zinc-200 hover:border-slate-700'
            }`}
          >
            {language === 'bn' ? 'সবগুলো প্রতীক (১২)' : 'All 12 Symbols'}
          </button>
          <button
            onClick={() => setActiveCategory('entity_attr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border ${
              activeCategory === 'entity_attr'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 font-bold  '
                : 'bg-[#0a0d18] text-zinc-400 border-slate-800 hover:text-zinc-200 hover:border-slate-700'
            }`}
          >
            {language === 'bn' ? 'এনটিটি ও অ্যাট্রিবিউট (৭)' : 'Entities & Attributes (7)'}
          </button>
          <button
            onClick={() => setActiveCategory('rel_constraint')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border ${
              activeCategory === 'rel_constraint'
                ? 'bg-purple-950/80 text-purple-300 border-purple-500/60 font-bold  '
                : 'bg-[#0a0d18] text-zinc-400 border-slate-800 hover:text-zinc-200 hover:border-slate-700'
            }`}
          >
            {language === 'bn' ? 'রিলেশনশিপ ও কনস্ট্রেইন্টস (৫)' : 'Relationships & Constraints (5)'}
          </button>
        </div>

        {/* VIEW MODE A: HIGH-LEGIBILITY RESPONSIVE CARDS */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 pt-1">
            {filteredSymbols.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#0a0d1a] border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
              >
                <div className="w-full sm:w-32 h-16 rounded-xl bg-[#050813] border border-slate-800/80 group-hover:border-slate-700 transition-colors flex items-center justify-center p-1.5 shrink-0 shadow-inner">
                  {item.svg}
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="font-mono text-xs font-bold text-white tracking-wide">
                      {language === 'bn' ? item.nameBn : item.nameEn}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.badgeColor} font-bold shrink-0`}>
                      {language === 'bn' ? item.figureBn : item.figureEn}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug font-sans">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] font-mono">
                    <span className="text-zinc-500 font-semibold">{language === 'bn' ? 'উদাহরণ:' : 'Ex:'}</span>
                    <span className="text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      {item.example}
                    </span>
                    <span className="text-zinc-500 font-normal ml-auto">
                      {item.notation}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE B: STRUCTURED CHEAT SHEET TABLE */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px] font-mono">
                  <th className="py-3 px-4 w-36">{language === 'bn' ? 'জ্যামিতিক আকার (Figure)' : 'Geometric Figure'}</th>
                  <th className="py-3 px-4 w-36 text-center">{language === 'bn' ? 'প্রতীক চিত্র (Symbol)' : 'Drawn Symbol'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'অর্থ ও তাৎপর্য (Represents)' : 'Concept & Purpose'}</th>
                  <th className="py-3 px-4 w-44">{language === 'bn' ? 'বাস্তব উদাহরণ (Real Example)' : 'Example & Notation'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs">
                {filteredSymbols.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      idx % 2 === 0 ? 'bg-[#0a0d18]' : 'bg-[#070912]'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white font-mono text-[11.5px]">
                        {language === 'bn' ? item.figureBn : item.figureEn}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        {item.notation}
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="w-28 h-12 mx-auto rounded-lg bg-[#050813] border border-slate-800 p-1 flex items-center justify-center">
                        {item.svg}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white mb-0.5">
                        {language === 'bn' ? item.nameBn : item.nameEn}
                      </div>
                      <div className="text-zinc-300 text-[11.5px] leading-relaxed">
                        {language === 'bn' ? item.descBn : item.descEn}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span className="text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50 block w-fit mb-1 font-semibold">
                        {item.example}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
