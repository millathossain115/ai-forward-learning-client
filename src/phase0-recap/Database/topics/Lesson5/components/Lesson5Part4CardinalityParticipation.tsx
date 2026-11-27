'use client';

import React, { useState, useEffect } from 'react';
import { Layers, ShieldCheck, Sparkles, CheckCircle2, Maximize2, X, Database, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part4CardinalityParticipation() {
  const { language } = useLanguage();
  const [activeCardinality, setActiveCardinality] = useState<'1:1' | '1:N' | 'N:1' | 'M:N'>('1:1');
  const [modalImage, setModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage]);

  const cardinalityData = {
    '1:1': {
      titleEn: '1:1 (One-to-One) Ratio',
      titleBn: '১:১ (One-to-One) সম্পর্ক',
      badge: 'Strict Pair',
      image: '/images/cardinality-1-1.png',
      descEn: 'One entity in A associates with at most one entity in B, and each entity in B links to at most one in A.',
      descBn: 'A সেটের একটি সত্তা B সেটের সর্বোচ্চ একটি সত্তার সাথে এবং B সেটের একটি সত্তাও A-এর সর্বোচ্চ একটির সাথেই যুক্ত হতে পারে।',
      exampleTitle: 'Person ↔ Passport',
      exampleEn: 'Each citizen has at most one passport, and each passport belongs to strictly one citizen.',
      exampleBn: 'একজন নাগরিকের সর্বোচ্চ একটি পাসপোর্ট থাকে এবং প্রতিটি পাসপোর্ট একক নাগরিকের নামে ইস্যু হয়।',
      sqlRuleEn: 'Add UNIQUE FOREIGN KEY in either table (typically the optional side).',
      sqlRuleBn: 'যেকোনো একটি টেবিলে UNIQUE FOREIGN KEY যোগ করে খুব সহজে ম্যাপিং করা যায়।',
      borderColor: 'border-emerald-500/40',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
    },
    '1:N': {
      titleEn: '1:N (One-to-Many) Ratio',
      titleBn: '১:N (One-to-Many) সম্পর্ক',
      badge: 'Single to Multiple',
      image: '/images/cardinality-1-n.png',
      descEn: 'One entity in A associates with multiple entities in B, but each entity in B links to at most one in A.',
      descBn: 'A সেটের একটি সত্তা B সেটের একাধিক সত্তার সাথে যুক্ত হতে পারে, কিন্তু B সেটের প্রতিটি সত্তা A-এর কেবল একটিতেই যুক্ত হয়।',
      exampleTitle: 'Department → Doctors',
      exampleEn: 'One department employs multiple doctors, but each doctor belongs to strictly one department.',
      exampleBn: 'একটি বিভাগে বহু ডাক্তার কাজ করতে পারেন, কিন্তু একজন ডাক্তার নির্দিষ্ট একটি বিভাগেরই অন্তর্ভুক্ত।',
      sqlRuleEn: 'Place the Primary Key of (1-side) as a FOREIGN KEY in the (N-side) table.',
      sqlRuleBn: '(১-সাইড)-এর প্রাইমারি কি-কে (N-সাইড) টেবিলে FOREIGN KEY হিসেবে রাখা হয়।',
      borderColor: 'border-amber-500/40',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
    },
    'N:1': {
      titleEn: 'N:1 (Many-to-One) Ratio',
      titleBn: 'N:১ (Many-to-One) সম্পর্ক',
      badge: 'Multiple to Single',
      image: '/images/cardinality-n-1.png',
      descEn: 'Multiple entities in A link to a single entity in B. This is the reverse directional perspective of 1:N.',
      descBn: 'A সেটের একাধিক সত্তা B সেটের একটিমাত্র সত্তার সাথে যুক্ত হয় (এটি মূলত ১:N সম্পর্কের বিপরীত রূপ)।',
      exampleTitle: 'Doctors → Department',
      exampleEn: 'Many doctors converge into a single parent department.',
      exampleBn: 'একাধিক ডাক্তার মিলে একই মূল বিভাগের অধীনে কাজ করেন।',
      sqlRuleEn: 'Foreign key resides in the many-side (Doctors) referencing Department.',
      sqlRuleBn: 'অনেক-সাইডের টেবিলে (Doctors) ডিপার্টমেন্টের Foreign Key যুক্ত থাকে।',
      borderColor: 'border-cyan-500/40',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60',
    },
    'M:N': {
      titleEn: 'M:N (Many-to-Many) Ratio',
      titleBn: 'M:N (Many-to-Many) সম্পর্ক',
      badge: 'Cross-Mesh',
      image: '/images/cardinality-m-n.png',
      descEn: 'An entity in A can relate to multiple entities in B, and vice-versa. Most flexible binary association.',
      descBn: 'A সেটের একটি সত্তা B সেটের একাধিক সত্তার সাথে এবং B সেটের একটি সত্তাও A-এর একাধিক সত্তার সাথে যুক্ত হতে পারে।',
      exampleTitle: 'Student ↔ Course',
      exampleEn: 'A student can enroll in multiple courses, and each course has many enrolled students.',
      exampleBn: 'একজন শিক্ষার্থী বহু কোর্সে পড়তে পারেন এবং প্রতিটি কোর্সে বহু শিক্ষার্থী ভর্তি থাকে।',
      sqlRuleEn: 'CANNOT be stored directly in two tables. REQUIRES a Junction (Bridge) Table with Composite PK!',
      sqlRuleBn: 'সরাসরি দুটি টেবিলে রাখা যায় না; ডেটাবেসে রূপান্তরের জন্য একটি Junction (Bridge) Table বাধ্যতামূলক!',
      borderColor: 'border-purple-500/40',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
    },
  };

  const current = cardinalityData[activeCardinality];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-3xl p-5 md:p-7 space-y-7">
      {/* Section Header: Unified & Professional */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৫ • কাঠামোগত শর্তাবলী' : 'Part 5 • Structural Constraints'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="5. Structural Constraints: Cardinality Ratio & Participation Constraints"
                bn="৫. কাঠামোগত শর্তাবলী: কার্ডিনালিটি অনুপাত এবং পার্টিসিপেশন শর্ত"
              />
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-[#101426] text-emerald-300 border border-emerald-800/60 font-bold">
            Ratio (Max)
          </span>
          <span className="px-2 py-0.5 rounded bg-[#101426] text-pink-300 border border-pink-800/60 font-bold">
            Participation (Min)
          </span>
        </div>
      </div>

      {/* ========================================================
          5.1 CARDINALITY RATIO (Interactive Tabs + Visual Asset)
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-300 font-mono">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'bn'
                ? '৫.১ কার্ডিনালিটি অনুপাত (Mapping Cardinalities: 1:1, 1:N, N:1, M:N)'
                : '5.1 Cardinality Ratio (Mapping Cardinalities: 1:1, 1:N, N:1, M:N)'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">Maximum Limits</span>
        </div>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Cardinality specifies the maximum number of relationship instances that an entity can participate in. Below are the 4 standard binary mapping ratios with Chen notation and set mapping models:"
            bn="কার্ডিনালিটি নির্দেশ করে একটি এনটিটি অপর এনটিটির সর্বোচ্চ (Maximum) কতগুলো ইনস্ট্যান্সের সাথে যুক্ত হতে পারে। নিচে চেন নোটেশন ও সেট ম্যাপিং উভয়সহ ৪টি অনুপাত তুলে ধরা হলো:"
          />
        </div>

        {/* 4 Compact Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['1:1', '1:N', 'N:1', 'M:N'] as const).map((key) => {
            const item = cardinalityData[key];
            const isActive = activeCardinality === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCardinality(key)}
                className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer font-mono ${
                  isActive
                    ? 'bg-[#12192e] border-emerald-500 text-white font-bold ring-1 ring-emerald-500/50 '
                    : 'bg-[#101116] border-white/[0.08] text-zinc-400 hover:border-white/[0.12] hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={isActive ? 'text-emerald-300 font-bold' : 'text-zinc-300'}>{key}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 border border-white/[0.08] text-zinc-400">
                    {item.badge}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 font-sans mt-0.5 truncate">
                  {item.exampleTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Ratio 2-Column Showcase */}
        <div className="p-4 md:p-5 rounded-2xl bg-[#101116] border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Left Column: Context, Examples & SQL Rule (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="font-mono font-bold text-white text-sm">
                  {language === 'bn' ? current.titleBn : current.titleEn}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${current.badgeColor}`}>
                  {current.badge}
                </span>
              </div>

              <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                <DualText en={current.descEn} bn={current.descBn} />
              </div>

              {/* Real World Scenario Box */}
              <div className="p-3 rounded-xl bg-[#070913] border border-white/[0.08] space-y-1 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold block">
                  {language === 'bn' ? 'বাস্তব দৃশ্যপট:' : 'Real-World Scenario:'}
                </span>
                <div className="font-mono font-bold text-emerald-300 text-xs">
                  {current.exampleTitle}
                </div>
                <div className="text-[11px] text-zinc-400 font-sans leading-snug">
                  <DualText en={current.exampleEn} bn={current.exampleBn} />
                </div>
              </div>

              {/* SQL Relational Mapping Rule */}
              <div className="p-2.5 rounded-xl bg-[#0f1426] border border-cyan-900/40 text-xs space-y-1">
                <div className="text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{language === 'bn' ? 'SQL রিলেশনাল রূপান্তর নিয়ম:' : 'SQL Relational Mapping Rule:'}</span>
                </div>
                <div className="text-[11px] text-zinc-300 font-sans leading-snug">
                  <DualText en={current.sqlRuleEn} bn={current.sqlRuleBn} />
                </div>
              </div>
            </div>

            {/* Right Column: High-Resolution Thematic Diagram Preview (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div
                onClick={() =>
                  setModalImage({
                    src: current.image,
                    title: `${current.titleEn} (Chen Notation & Set Mapping)`,
                    desc: `${current.exampleTitle} — ${current.descEn}`,
                  })
                }
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0B0F19] border border-white/[0.08] transition-colors hover:border-emerald-500/50 hover: hover: p-2.5 flex flex-col items-center justify-center"
              >
                <img
                  src={current.image}
                  alt={current.titleEn}
                  className="w-full h-auto max-h-56 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/70 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="w-full mt-2 pt-1.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="text-emerald-300 font-semibold">{current.exampleTitle}</span>
                  <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors">Click to expand full screen ⤢</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          5.2 PARTICIPATION CONSTRAINTS (Total vs Partial)
         ======================================================== */}
      <div className="space-y-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-pink-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>
              {language === 'bn'
                ? '৫.২ পার্টিসিপেশন শর্তাবলী (Total ════ বনাম Partial ────)'
                : '5.2 Participation Constraints (Total vs Partial Participation)'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">Minimum Limits</span>
        </div>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="While Cardinality sets the MAXIMUM associations, Participation Constraint determines the MINIMUM: whether every instance MUST participate (Total / Mandatory) or whether participation is OPTIONAL (Partial):"
            bn="কার্ডিনালিটি যেখানে সর্বোচ্চ (Maximum) সীমা ঠিক করে, পার্টিসিপেশন ঠিক করে সর্বনিম্ন (Minimum) সীমা: কোনো সম্পর্কে প্রতিটি সত্তার অংশগ্রহণ কি বাধ্যতামূলক (Total / Mandatory) নাকি ঐচ্ছিক (Partial / Optional):"
          />
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Conceptual Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {/* Total Participation Card */}
            <div className="p-3.5 rounded-2xl bg-[#091510] border border-emerald-500/40 space-y-1.5">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-emerald-300">
                  {language === 'bn' ? '১. টোটাল পার্টিসিপেশন (Mandatory)' : '1. Total Participation'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                  ════ Double Line
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                <DualText
                  en="Every single entity instance must participate in the relationship. Minimum Cardinality ≥ 1. E.g. Every employee MUST belong to a department."
                  bn="প্রতিটি সত্তাকে অবশ্যই সম্পর্কে অংশ নিতে হবে। সর্বনিম্ন কার্ডিনালিটি ≥ ১। যেমন: প্রতিটি কর্মীকে অবশ্যই কোনো না কোনো বিভাগে থাকতেই হবে।"
                />
              </div>
              <div className="text-[10px] font-mono text-emerald-400 pt-1 border-t border-emerald-900/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Min Cardinality = 1 (বাধ্যতামূলক)</span>
              </div>
            </div>

            {/* Partial Participation Card */}
            <div className="p-3.5 rounded-2xl bg-[#0c0f24] border border-indigo-500/40 space-y-1.5">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-indigo-300">
                  {language === 'bn' ? '২. পার্শিয়াল পার্টিসিপেশন (Optional)' : '2. Partial Participation'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold">
                  ──── Single Line
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                <DualText
                  en="Only some entity instances participate in the relationship. Minimum Cardinality = 0. E.g. Not all employees are managers."
                  bn="সবার অংশগ্রহণ জরুরি নয়; কিছু সত্তা অংশ নিতে পারে আবার নাও নিতে পারে। সর্বনিম্ন কার্ডিনালিটি = ০। যেমন: সব কর্মী ম্যানেজার নন।"
                />
              </div>
              <div className="text-[10px] font-mono text-indigo-400 pt-1 border-t border-indigo-900/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Min Cardinality = 0 (ঐচ্ছিক)</span>
              </div>
            </div>

            {/* Core Exam Takeaway Pill */}
            <div className="p-2.5 rounded-xl bg-[#070b16] border border-white/[0.08] text-[10px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Exam Formula: (Min, Max) = (0/1, 1/N)</span>
              <span className="text-pink-400 font-semibold">Notation Rule</span>
            </div>
          </div>

          {/* Right Column: High-Resolution Thematic Participation Diagram (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/participation-constraints.png',
                  title: 'Participation Constraints: Total vs Partial (Chen Notation)',
                  desc: 'Total (Double Line ════: EMPLOYEE belongs to DEPARTMENT) vs Partial (Single Line ────: EMPLOYEE manages DEPARTMENT)',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0B0F19] border border-white/[0.08] transition-colors hover:border-pink-500/50 hover: hover: p-2.5 flex flex-col items-center justify-center"
            >
              <img
                src="/images/participation-constraints.png"
                alt="Participation Constraints Diagram"
                className="w-full h-auto max-h-56 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/70 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-pink-300" />
              </div>
              <div className="w-full mt-2 pt-1.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="text-pink-300 font-semibold">Total (════) vs Partial (────) Notation</span>
                <span className="text-zinc-500 group-hover:text-pink-400 transition-colors">Click to expand full screen ⤢</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          FULL-SCREEN IMAGE MODAL / LIGHTBOX
         ======================================================== */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
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
                  {modalImage.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">{modalImage.desc}</p>
              </div>
              <button
                onClick={() => setModalImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/[0.12]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center p-2 rounded-xl bg-[#060911] border border-white/[0.08]">
              <img
                src={modalImage.src}
                alt={modalImage.title}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
              <span>Press ESC or click anywhere outside to close</span>
              <span className="text-emerald-400 font-semibold">High-Resolution Thematic Asset</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
