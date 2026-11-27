'use client';

import React, { useState } from 'react';
import {
  Layers,
  FileSpreadsheet,
  FolderTree,
  Network,
  Table as TableIcon,
  Gamepad2,
  Boxes,
  FileCode2,
  Sparkles,
  Hash,
  Share2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import NetworkModelVisualizer from './NetworkModelVisualizer';
import RelationalModelVisualizer from './RelationalModelVisualizer';
import OopModelVisualizer from './OopModelVisualizer';
import NoSqlModelVisualizer from './NoSqlModelVisualizer';

export default function Lesson2Part3SixModels() {
  const { language } = useLanguage();

  const [activeModel, setActiveModel] = useState<
    'flat' | 'hierarchical' | 'network' | 'relational' | 'oop' | 'nosql'
  >('relational');

  const tabs = [
    { id: 'flat' as const, enLabel: '1. Flat File', bnLabel: '১. ফ্ল্যাট ফাইল', icon: FileSpreadsheet, enTag: 'Single File', bnTag: 'একক ফাইল' },
    { id: 'hierarchical' as const, enLabel: '2. Hierarchical', bnLabel: '২. হায়ারার্কিক্যাল', icon: FolderTree, enTag: 'Tree Structure', bnTag: 'বৃক্ষ কাঠামো' },
    { id: 'network' as const, enLabel: '3. Network', bnLabel: '৩. নেটওয়ার্ক', icon: Network, enTag: 'Graph of Links', bnTag: 'বহু লিঙ্কযুক্ত' },
    { id: 'relational' as const, enLabel: '4. Relational', bnLabel: '৪. রিলেশনাল', icon: TableIcon, enTag: 'Tables & Keys', bnTag: 'টেবিল ও কি' },
    { id: 'oop' as const, enLabel: '5. Object-Oriented', bnLabel: '৫. অবজেক্ট ওরিয়েন্টেড', icon: Gamepad2, enTag: 'OOP Objects', bnTag: 'অবজেক্ট ও মেথড' },
    { id: 'nosql' as const, enLabel: '6. NoSQL Models', bnLabel: '৬. নো-এসকিউএল', icon: Boxes, enTag: 'Flexible Scale', bnTag: 'নমনীয় স্কেলিং' },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৩ / ৫' : 'Part 3 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="The 6 Important Database Models"
              bn="৬টি গুরুত্বপূর্ণ ডেটাবেস মডেল (গভীর বিশ্লেষণ)"
            />
          </h2>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModel === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveModel(tab.id)}
              className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 '
                  : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </div>
              <div>
                <h4 className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                  {language === 'bn' ? tab.bnLabel : tab.enLabel}
                </h4>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {language === 'bn' ? tab.bnTag : tab.enTag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------
          MODEL 1: FLAT FILE
         ---------------------------------------------------- */}
      {activeModel === 'flat' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Model 01</span>
              <h3 className="text-base font-bold text-white">
                <DualText
                  en="Flat File Database Model"
                  bn="ফ্ল্যাট ফাইল ডেটাবেস মডেল (Flat File Model)"
                />
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
              {language === 'bn' ? 'সবচেয়ে সহজ ফরম্যাট' : 'Simplest Format'}
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A flat-file database stores data in a single file (such as a CSV or TSV spreadsheet) without built-in relational links or foreign keys."
              bn="সংজ্ঞা: ফ্ল্যাট-ফাইল ডেটাবেস এমন এক ধরণের কাঠামো যেখানে সমস্ত ডেটা কোনো লিঙ্ক বা রিলেশনশিপ ছাড়াই একটিমাত্র ফাইলে (যেমন CSV বা এক্সেল স্প্রেডশিট) সংরক্ষিত থাকে।"
            />
          </div>

          {/* Students.csv Live Representation */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Example File: Students.csv</span>
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2 px-4 text-amber-400">ID</th>
                    <th className="py-2 px-4 text-cyan-400">Name</th>
                    <th className="py-2 px-4 text-purple-400">Department</th>
                    <th className="py-2 px-4 text-emerald-400 text-right">CGPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  <tr><td className="py-2 px-4">101</td><td className="py-2 px-4">Rahim</td><td className="py-2 px-4">CSE</td><td className="py-2 px-4 text-right">3.80</td></tr>
                  <tr><td className="py-2 px-4">102</td><td className="py-2 px-4">Karim</td><td className="py-2 px-4">BBA</td><td className="py-2 px-4 text-right">3.65</td></tr>
                  <tr><td className="py-2 px-4">103</td><td className="py-2 px-4">Nila</td><td className="py-2 px-4">EEE</td><td className="py-2 px-4 text-right">3.90</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pros and Cons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
              <span className="font-bold text-emerald-400 font-mono block">
                {language === 'bn' ? '✓ সুবিধাসমূহ (Advantages):' : '✓ Advantages:'}
              </span>
              <ul className="list-disc list-inside text-zinc-300 space-y-0.5">
                <li>{language === 'bn' ? 'তৈরি করা ও বোঝা খুব সহজ' : 'Simple to understand and create'}</li>
                <li>{language === 'bn' ? 'কোনো ভারী সফটওয়্যার বা ইঞ্জিন দরকার নেই' : 'No complex database engine installation required'}</li>
                <li>{language === 'bn' ? 'ছোট সিঙ্গেল-পারপাস হিসাবের জন্য আদর্শ (যেমন মুদি দোকানের খাতা)' : 'Ideal for small single-purpose datasets'}</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
              <span className="font-bold text-rose-400 font-mono block">
                {language === 'bn' ? '✗ সীমাবদ্ধতাসমূহ (Disadvantages):' : '✗ Disadvantages:'}
              </span>
              <ul className="list-disc list-inside text-zinc-300 space-y-0.5">
                <li>{language === 'bn' ? 'ডেটা ডুপ্লিকেশন ও অসঙ্গতি ঘটে' : 'Data duplication and inconsistency occur easily'}</li>
                <li>{language === 'bn' ? 'একাধিক ফাইলের মধ্যে কোনো সম্পর্ক বা ফরেন কি থাকে না' : 'Zero relationships between multiple datasets'}</li>
                <li>{language === 'bn' ? 'একসাথে একাধিক ব্যবহারকারীর জন্য লক বা সিকিউরিটি নেই' : 'No concurrency control or granular security locks'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODEL 2: HIERARCHICAL MODEL
         ---------------------------------------------------- */}
      {activeModel === 'hierarchical' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">Model 02</span>
              <h3 className="text-base font-bold text-white">
                <DualText
                  en="Hierarchical Database Model"
                  bn="হায়ারার্কিক্যাল বা বৃক্ষ ডেটাবেস মডেল (Hierarchical Model)"
                />
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
              1 Parent &rarr; N Children
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A hierarchical database model organizes data in a tree-like structure using parent-child relationships. A parent can have multiple children, but each child has strictly only one parent."
              bn="সংজ্ঞা: এই মডেলে ডেটা গাছের মতো শাখা-প্রশাখায় (Tree-like structure) সাজানো থাকে। এখানে প্যারেন্ট-চাইল্ড সম্পর্ক থাকে—একটি প্যারেন্টের একাধিক চাইল্ড থাকতে পারে, কিন্তু প্রতিটি চাইল্ডের কেবলমাত্র একটিই প্যারেন্ট থাকতে পারে।"
            />
          </div>

          {/* Tree Structure Visualizer */}
          <div className="p-5 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">
              {language === 'bn'
                ? 'বৃক্ষ বা ফোল্ডার কাঠামো (Tree Hierarchy Visualizer):'
                : 'Tree Hierarchy Representation (Like PC Folders):'}
            </span>
            <div className="p-4 rounded-lg bg-black/50 border border-slate-800 text-zinc-300 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <FolderTree className="w-4 h-4" /> [Root Parent] University
              </div>
              <div className="pl-6 space-y-2 border-l-2 border-indigo-500/30 ml-2">
                <div className="text-sky-300 font-semibold flex items-center gap-1.5">
                  📁 CSE Department
                </div>
                <div className="pl-6 space-y-1 border-l-2 border-sky-500/30 ml-2 text-zinc-400">
                  <div>👤 Student 101 (Rahim) &rarr; 📚 Course CSE201</div>
                  <div>👤 Student 102 (Sami) &rarr; 📚 Course CSE101</div>
                </div>

                <div className="text-sky-300 font-semibold flex items-center gap-1.5 pt-1">
                  📁 BBA Department
                </div>
                <div className="pl-6 space-y-1 border-l-2 border-sky-500/30 ml-2 text-zinc-400">
                  <div>👤 Student 103 (Karim) &rarr; 📚 Course MKT101</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pros & Cons & Historical Landmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
              <span className="font-bold text-emerald-400 font-mono block">
                {language === 'bn' ? '✓ সুবিধাসমূহ (Advantages):' : '✓ Advantages:'}
              </span>
              <p className="text-zinc-300 leading-snug">
                {language === 'bn'
                  ? 'এক প্যারেন্ট থেকে সন্তানের দিকে ডেটা খোঁজা অত্যন্ত দ্রুত ও সহজ।'
                  : 'Fast 1:N navigations, clear corporate hierarchies, easy parent-to-child lookups.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
              <span className="font-bold text-rose-400 font-mono block">
                {language === 'bn' ? '✗ সীমাবদ্ধতাসমূহ (Disadvantages):' : '✗ Disadvantages:'}
              </span>
              <p className="text-zinc-300 leading-snug">
                {language === 'bn'
                  ? 'একটি সন্তানের একাধিক অভিভাবক থাকতে পারে না! বাস্তব জীবনের মেনি-টু-মেনি রিলেশনশিপ এতে ফুটিয়ে তোলা যায় না।'
                  : 'A child cannot have multiple parents! Representing many-to-many causes massive data duplication.'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-[11px] text-zinc-400 font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>
              <strong>Historical Landmark:</strong> IBM IMS (Information Management System) launched for NASA&apos;s Apollo program in 1968.
            </span>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODEL 3: NETWORK MODEL
         ---------------------------------------------------- */}
      {activeModel === 'network' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Model 03</span>
              <h3 className="text-base font-bold text-white">
                <DualText
                  en="Network Database Model"
                  bn="নেটওয়ার্ক ডেটাবেস মডেল (Network Database Model)"
                />
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              N Parents &harr; N Children (M:N)
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: The network database model organizes data as records connected through links, allowing a child record to have multiple parents. It was designed to solve the rigidity of hierarchical trees."
              bn="সংজ্ঞা: নেটওয়ার্ক মডেলে ডেটা নোড এবং পয়েন্টার বা লিঙ্কের মাধ্যমে যুক্ত থাকে, যেখানে একটি চাইল্ড রেকর্ডের একাধিক প্যারেন্ট থাকতে পারে। এটি হায়ারার্কিক্যাল মডেলের সীমাবদ্ধতা দূর করতে তৈরি হয়েছিল।"
            />
          </div>

          {/* Interactive Network Model Pointer Diagram */}
          <NetworkModelVisualizer />

          {/* Pros, Cons, Milestone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
              <span className="font-bold text-emerald-400 font-mono block">
                {language === 'bn' ? '✓ সুবিধাসমূহ:' : '✓ Advantages:'}
              </span>
              <p className="text-zinc-300 leading-snug">
                {language === 'bn'
                  ? 'জটিল মেনি-টু-মেনি (M:N) সম্পর্ক স্বাভাবিকভাবে ফুটিয়ে তুলতে সক্ষম।'
                  : 'Naturally models complex many-to-many relationships without duplicate records.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
              <span className="font-bold text-rose-400 font-mono block">
                {language === 'bn' ? '✗ সীমাবদ্ধতাসমূহ:' : '✗ Disadvantages:'}
              </span>
              <p className="text-zinc-300 leading-snug">
                {language === 'bn'
                  ? 'পয়েন্টারের জাল অত্যন্ত জটিল; একটি লিঙ্ক ভেঙে গেলে পুরো ডেটাবেস ব্রাউজিং নষ্ট হয়ে যেত।'
                  : 'Extreme pointer complexity; if a pointer breaks, navigating the database corrupts.'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-[11px] text-zinc-400 font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <strong>Historical Landmark:</strong> IDMS (Integrated Database Management System) standardized by CODASYL in 1971.
            </span>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODEL 4: RELATIONAL MODEL (HERO MODEL)
         ---------------------------------------------------- */}
      {activeModel === 'relational' && (
        <RelationalModelVisualizer />
      )}

      {/* ----------------------------------------------------
          MODEL 5: OBJECT-ORIENTED MODEL
         ---------------------------------------------------- */}
      {activeModel === 'oop' && (
        <OopModelVisualizer />
      )}

      {/* ----------------------------------------------------
          MODEL 6: NOSQL MODELS
         ---------------------------------------------------- */}
      {activeModel === 'nosql' && (
        <NoSqlModelVisualizer />
      )}
    </section>
  );
}
