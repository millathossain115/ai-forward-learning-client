'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part4CardinalityParticipation() {
  const { language } = useLanguage();
  const [activeCardinality, setActiveCardinality] = useState<'1:1' | '1:N' | 'N:1' | 'M:N'>('1:N');

  const cardinalityRevisionTable = [
    { ratio: '1:1', meaningEn: 'One to One (এক-থেকে-এক)', meaningBn: 'এক-থেকে-এক', exampleEn: 'Person ↔ Passport (১ জন ব্যক্তি ↔ ১টি পাসপোর্ট)', exampleBn: 'Person ↔ Passport' },
    { ratio: '1:N', meaningEn: 'One to Many (এক-থেকে-অনেক)', meaningBn: 'এক-থেকে-অনেক', exampleEn: 'Department → Employee (১টি বিভাগ → একাধিক কর্মী)', exampleBn: 'Department → Employee' },
    { ratio: 'N:1', meaningEn: 'Many to One (অনেক-থেকে-এক)', meaningBn: 'অনেক-থেকে-এক', exampleEn: 'Employee → Department (১:N এর উল্টো দিক)', exampleBn: 'Employee → Department' },
    { ratio: 'M:N', meaningEn: 'Many to Many (অনেক-থেকে-অনেক)', meaningBn: 'অনেক-থেকে-অনেক', exampleEn: 'Student ↔ Course (একাধিক ছাত্র ↔ একাধিক কোর্স)', exampleBn: 'Student ↔ Course' },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৬ ও ৭ • কার্ডিনালিটি ও পার্টিসিপেশন' : 'Part 6 & 7 • Cardinality & Participation'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="6. Cardinality Ratio & 7. Participation Constraints"
              bn="৬. কার্ডিনালিটি অনুপাত এবং ৭. পার্টিসিপেশন শর্তাবলী (Participation Constraints)"
            />
          </h2>
        </div>
      </div>

      {/* ========================================================
          6. CARDINALITY RATIO
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-300 font-mono">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{language === 'bn' ? '৬. কার্ডিনালিটি রেশিও (সম্পর্কের অনুপাত) কী?' : '6. What is Cardinality Ratio (Relationship Cardinality)?'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Cardinality describes HOW MANY entities of one entity set can be associated with entities of another entity set. GeeksforGeeks and university DBMS standards test 4 core mapping ratios:"
            bn="কার্ডিনালিটি (Cardinality) নির্দেশ করে একটি এনটিটি সেটের কতগুলো এনটিটি অন্য এনটিটি সেটের কতগুলো এনটিটির সাথে সম্পর্কযুক্ত হতে পারে (সংখ্যাগত অনুপাত)। গিকসফরগিকস ও বিশ্ববিদ্যালয়ের সিলেবাস অনুযায়ী ৪টি প্রধান কার্ডিনালিটি ম্যাপিং রয়েছে:"
          />
        </div>

        {/* 4 Interactive Cardinality Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: '1:1', title: '1:1 (One-to-One)', subEn: 'Person ↔ Passport', subBn: 'ব্যক্তি ↔ পাসপোর্ট' },
            { id: '1:N', title: '1:N (One-to-Many)', subEn: 'Dept → Doctors', subBn: 'বিভাগ → ডাক্তার' },
            { id: 'N:1', title: 'N:1 (Many-to-One)', subEn: 'Doctors → Dept', subBn: 'ডাক্তার → বিভাগ' },
            { id: 'M:N', title: 'M:N (Many-to-Many)', subEn: 'Emp ↔ Project', subBn: 'কর্মী ↔ প্রকল্প' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCardinality(tab.id as typeof activeCardinality)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeCardinality === tab.id
                  ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/50 shadow-lg'
                  : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700 hover:text-zinc-200'
              }`}
            >
              <span className="text-xs block font-mono font-bold">{tab.title}</span>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? tab.subBn : tab.subEn}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Cardinality Display Panel */}
        <div className="p-5 md:p-6 rounded-2xl bg-[#14182e] border border-slate-800 space-y-4 font-mono text-xs">
          {activeCardinality === '1:1' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-emerald-300">
                <span className="font-bold text-sm">6.1 One-to-One (1:1) Relationship</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700">
                  Strict Pair
                </span>
              </div>

              {/* 2-Column: Left Example, Right GfG Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                  <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-700 w-full max-w-xs">
                    <span className="text-indigo-400 font-bold block text-xs">PERSON</span>
                    <span className="text-white text-xs">Rahim (NID: 9912)</span>
                  </div>
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-600 font-bold">
                      1 : 1 HAS
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-700 w-full max-w-xs">
                    <span className="text-cyan-400 font-bold block text-xs">PASSPORT</span>
                    <span className="text-white text-xs">BP-091283</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
                  <img
                    src="/images/gfg-cardinality-1-1.webp"
                    alt="One-to-One ER Diagram (GeeksforGeeks)"
                    className="max-h-40 object-contain"
                  />
                  <span className="text-[10px] font-mono text-zinc-600 mt-1">
                    GeeksforGeeks: 1:1 Mapping (Person ↔ Passport)
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                <DualText
                  en="One person can possess at most one passport, and each passport belongs strictly to one person. An entity in A relates to at most one entity in B, and vice-versa."
                  bn="একজন ব্যক্তির সর্বোচ্চ একটিমাত্র পাসপোর্ট থাকতে পারে এবং প্রতিটি পাসপোর্ট নির্দিষ্ট একজন ব্যক্তিরই হয়। A সেটের একটি এনটিটি B সেটের সর্বোচ্চ একটি এনটিটির সাথে যুক্ত থাকতে পারে।"
                />
              </div>
            </div>
          )}

          {activeCardinality === '1:N' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-amber-300">
                <span className="font-bold text-sm">6.2 One-to-Many (1:N) Relationship</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 border border-amber-700">
                  Single to Multiple
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-700 w-full max-w-xs">
                    <span className="text-amber-400 font-bold block text-xs">DEPARTMENT (1)</span>
                    <span className="text-white text-xs">Surgeon Department</span>
                  </div>
                  <div className="text-amber-400 font-bold text-xs">
                    <span className="px-2.5 py-1 rounded bg-amber-950 border border-amber-600 font-bold">
                      1 : N CONTAINS &rarr;
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-700 w-full max-w-xs">
                    <span className="text-cyan-400 font-bold block text-xs">DOCTORS (N)</span>
                    <span className="text-zinc-300 text-xs">Dr. Hasan, Dr. Nila, Dr. Karim</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
                  <img
                    src="/images/gfg-cardinality-1-n.webp"
                    alt="One-to-Many ER Diagram (GeeksforGeeks)"
                    className="max-h-40 object-contain"
                  />
                  <span className="text-[10px] font-mono text-zinc-600 mt-1">
                    GeeksforGeeks: 1:N Mapping (Department → Multiple Doctors)
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                <DualText
                  en="One department can contain multiple doctors, but each doctor belongs to strictly one department."
                  bn="একটি ডিপার্টমেন্টের অধীনে অনেকজন ডাক্তার থাকতে পারেন, কিন্তু প্রতিটি ডাক্তার কেবল একটি নির্দিষ্ট বিভাগের অন্তর্ভুক্ত হন।"
                />
              </div>
            </div>
          )}

          {activeCardinality === 'N:1' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-cyan-300">
                <span className="font-bold text-sm">6.3 Many-to-One (N:1) Relationship</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700">
                  Multiple to Single
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-700 w-full max-w-xs">
                    <span className="text-cyan-400 font-bold block text-xs">DOCTORS (N)</span>
                    <span className="text-zinc-300 text-xs">Multiple Doctors</span>
                  </div>
                  <div className="text-cyan-400 font-bold text-xs">
                    <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-600 font-bold">
                      N : 1 BELONG TO &rarr;
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-700 w-full max-w-xs">
                    <span className="text-amber-400 font-bold block text-xs">DEPARTMENT (1)</span>
                    <span className="text-white text-xs">Single Department</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
                  <img
                    src="/images/gfg-cardinality-n-1.webp"
                    alt="Many-to-One ER Diagram (GeeksforGeeks)"
                    className="max-h-40 object-contain"
                  />
                  <span className="text-[10px] font-mono text-zinc-600 mt-1">
                    GeeksforGeeks: N:1 Mapping (Multiple Doctors → 1 Department)
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                <DualText
                  en="Many entities in set A associate with a single entity in set B. This is the reverse perspective of 1:N."
                  bn="A সেটের একাধিক সত্তা B সেটের একটিমাত্র সত্তার সাথে যুক্ত হয়। এটি মূলত ১:N সম্পর্কের বিপরীতমুখী রূপ।"
                />
              </div>
            </div>
          )}

          {activeCardinality === 'M:N' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-purple-300">
                <span className="font-bold text-sm">6.4 Many-to-Many (M:N) Relationship</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 border border-purple-700">
                  Cross-Mesh
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-700 w-full max-w-xs">
                    <span className="text-purple-400 font-bold block text-xs">EMPLOYEES (M)</span>
                    <span className="text-zinc-300 text-xs">Rahim, Karim, Nila</span>
                  </div>
                  <div className="text-purple-400 font-bold text-xs flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded bg-purple-950 border border-purple-600 font-bold">
                      M : N WORKS ON
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-700 w-full max-w-xs">
                    <span className="text-pink-400 font-bold block text-xs">PROJECTS (N)</span>
                    <span className="text-zinc-300 text-xs">Database, Mobile App, Cloud</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
                  <img
                    src="/images/gfg-cardinality-m-n.webp"
                    alt="Many-to-Many ER Diagram (GeeksforGeeks)"
                    className="max-h-40 object-contain"
                  />
                  <span className="text-[10px] font-mono text-zinc-600 mt-1">
                    GeeksforGeeks: M:N Mapping (Employees ↔ Projects)
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                <DualText
                  en="One employee can work on multiple projects, and each project has multiple employees assigned. In SQL, this requires an intermediate Junction Table!"
                  bn="একজন কর্মী একাধিক প্রকল্পে কাজ করতে পারেন এবং প্রতিটি প্রকল্পে একাধিক কর্মী নিযুক্ত থাকেন। এসকিউএল-এ এটি সমাধানের জন্য একটি জাংশন টেবিল (Junction Table) প্রয়োজন হয়!"
                />
              </div>
            </div>
          )}
        </div>

        {/* Cardinality Revision Table */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
            <span>{language === 'bn' ? 'কার্ডিনালিটি অনুপাত রিভিশন টেবিল' : 'Cardinality Revision Quick Reference'}</span>
            <span className="text-[10px] text-zinc-400">Exam Must-Know</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                  <th className="py-2.5 px-4">{language === 'bn' ? 'অনুপাত (Ratio)' : 'Ratio'}</th>
                  <th className="py-2.5 px-4">{language === 'bn' ? 'অর্থ' : 'Meaning'}</th>
                  <th className="py-2.5 px-4">{language === 'bn' ? 'বাস্তব উদাহরণ' : 'Real-World Example'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300">
                {cardinalityRevisionTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                    <td className="py-2.5 px-4 font-bold text-emerald-400">
                      {row.ratio}
                    </td>
                    <td className="py-2.5 px-4 text-zinc-300">
                      {language === 'bn' ? row.meaningBn : row.meaningEn}
                    </td>
                    <td className="py-2.5 px-4 text-zinc-400">
                      {language === 'bn' ? row.exampleEn : row.exampleEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================
          7. PARTICIPATION CONSTRAINTS
         ======================================================== */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-pink-300 font-mono">
          <ShieldCheck className="w-4 h-4 text-pink-400" />
          <span>{language === 'bn' ? '৭. পার্টিসিপেশন শর্তাবলী: Total বনাম Partial' : '7. Participation Constraints: Total vs Partial'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Cardinality tells us HOW MANY entities can be related. Participation tells us whether an entity MUST participate in a relationship or if participation is OPTIONAL."
            bn="কার্ডিনালিটি আমাদের বলে একটি সত্তার সাথে 'কতগুলো' সত্তা যুক্ত হতে পারে। আর পার্টিসিপেশন কনস্ট্রেইন্ট আমাদের বলে কোনো সত্তাকে সম্পর্কের মধ্যে থাকা 'বাধ্যতামূলক (Mandatory)' নাকি 'ঐচ্ছিক (Optional)'।"
          />
        </div>

        {/* GfG Participation Diagram */}
        <div className="p-3 rounded-2xl bg-white border border-slate-700 flex flex-col items-center justify-center">
          <img
            src="/images/gfg-participation.webp"
            alt="Participation Constraints in ER Diagram (GeeksforGeeks)"
            className="max-h-48 md:max-h-56 object-contain"
          />
          <span className="text-[10px] font-mono text-zinc-600 mt-1">
            GeeksforGeeks Diagram: Total Participation (Double Line) vs Partial Participation (Single Line)
          </span>
        </div>

        {/* Total vs Partial Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Total Participation */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">7.1 Total Participation</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                ════ Double Line (দ্বৈত রেখা)
              </span>
            </div>
            <div className="text-zinc-300 font-sans leading-relaxed text-[11px]">
              <DualText
                en="Mandatory participation. EVERY entity in the entity set MUST participate in at least one relationship."
                bn="বাধ্যতামূলক অংশগ্রহণ। এনটিটি সেটের প্রতিটি সত্তাকে অবশ্যই কমপক্ষে একটি সম্পর্কে অংশগ্রহণ করতেই হবে।"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-[11px] text-emerald-300 space-y-1">
              <div><strong>Example:</strong> Every Employee <em>must</em> belong to a Department.</div>
              <div className="text-zinc-500 text-[10px]">
                {language === 'bn'
                  ? 'কোনো কর্মী বিভাগ ছাড়া একা থাকতে পারে না (Mandatory)।'
                  : 'No employee can exist in the company without an assigned department.'}
              </div>
            </div>
          </div>

          {/* Partial Participation */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-400 text-sm">7.2 Partial Participation</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
                ──── Single Line (একক রেখা)
              </span>
            </div>
            <div className="text-zinc-300 font-sans leading-relaxed text-[11px]">
              <DualText
                en="Optional participation. Only SOME entities participate; other entities might not participate at all."
                bn="ঐচ্ছিক অংশগ্রহণ। এনটিটি সেটের কেবল কিছু সত্তা অংশগ্রহণ করে; বাকিরা অংশ নাও নিতে পারে।"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-[11px] text-indigo-300 space-y-1">
              <div><strong>Example:</strong> Not every Employee supervises another employee.</div>
              <div className="text-zinc-500 text-[10px]">
                {language === 'bn'
                  ? 'সকল কর্মী সুপারভাইজার নন; জুনিয়র কর্মীরা কাউকে সুপারভাইজ করেন না।'
                  : 'Only senior staff supervise; junior employees participate in 0 supervisor relationships.'}
              </div>
            </div>
          </div>
        </div>

        {/* Total vs Partial Comparison Table */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-mono font-bold text-white">
            {language === 'bn' ? 'টোটাল বনাম পার্শিয়াল পার্টিসিপেশন পার্থক্য টেবিল' : 'Total vs Partial Participation: Core Exam Comparison'}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                  <th className="py-2.5 px-4">{language === 'bn' ? 'বৈশিষ্ট্য' : 'Feature'}</th>
                  <th className="py-2.5 px-4 text-emerald-400">{language === 'bn' ? 'টোটাল পার্টিসিপেশন (Total)' : 'Total Participation'}</th>
                  <th className="py-2.5 px-4 text-indigo-400">{language === 'bn' ? 'পার্শিয়াল পার্টিসিপেশন (Partial)' : 'Partial Participation'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300 font-sans">
                <tr className="bg-[#0f1224]/30">
                  <td className="py-2.5 px-4 font-bold text-white font-mono">
                    {language === 'bn' ? 'অংশগ্রহণের শর্ত' : 'Rule'}
                  </td>
                  <td className="py-2.5 px-4 text-emerald-300">
                    {language === 'bn' ? 'প্রতিটি এনটিটিকে অবশ্যই অংশ নিতে হবে' : 'Every entity must participate'}
                  </td>
                  <td className="py-2.5 px-4 text-indigo-300">
                    {language === 'bn' ? 'কিছু এনটিটি অংশ না-ও নিতে পারে' : 'Some entities may not participate'}
                  </td>
                </tr>
                <tr className="bg-[#0c0e18]">
                  <td className="py-2.5 px-4 font-bold text-white font-mono">
                    {language === 'bn' ? 'প্রকৃতি' : 'Nature'}
                  </td>
                  <td className="py-2.5 px-4 text-emerald-300">
                    {language === 'bn' ? 'বাধ্যতামূলক (Mandatory)' : 'Mandatory'}
                  </td>
                  <td className="py-2.5 px-4 text-indigo-300">
                    {language === 'bn' ? 'ঐচ্ছিক (Optional)' : 'Optional for some entities'}
                  </td>
                </tr>
                <tr className="bg-[#0f1224]/30">
                  <td className="py-2.5 px-4 font-bold text-white font-mono">
                    {language === 'bn' ? 'ইআর রেখা প্রতীক' : 'ER Line Notation'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-emerald-300">
                    ════ Double Line (দ্বৈত রেখা)
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-indigo-300">
                    ──── Single Line (একক রেখা)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
