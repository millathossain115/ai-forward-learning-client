'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Sparkles, Workflow, ArrowRight, Layers, Box, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part3Relationships() {
  const { language } = useLanguage();

  // Full-screen Image Modal / Lightbox State
  const [modalImage, setModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage]);

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Share2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • রিলেশনশিপ ও ডিগ্রি' : 'Part 4 • Relationships & Degree'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="4. Relationships & Degree of Relationship"
              bn="৪. রিলেশনশিপ এবং রিলেশনশিপের ডিগ্রি (Degree of Relationship)"
            />
          </h2>
        </div>
      </div>

      {/* ========================================================
          4.1 WHAT IS A RELATIONSHIP & RELATIONSHIP SET?
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-purple-300 font-mono">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{language === 'bn' ? '৪.১ রিলেশনশিপ (সম্পর্ক) ও রিলেশনশিপ সেট কী?' : '4.1 What is a Relationship & Relationship Set?'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="A Relationship describes how two or more entities are associated with each other. Real-world systems are not isolated silos; entities continually interact through relationships (represented by diamonds ◇ in Chen notation):"
            bn="রিলেশনশিপ (Relationship) হলো দুই বা ততোধিক এনটিটির মধ্যকার যৌক্তিক সংযোগ বা পারস্পরিক মিথস্ক্রিয়া। বাস্তব জগতে এনটিটিগুলো কখনো বিচ্ছিন্ন থাকে না, তারা সম্পর্কের মাধ্যমে পরস্পরের সাথে যুক্ত থাকে (চেন নোটেশনে রম্বস বা ডায়মন্ড ◇ দিয়ে দেখানো হয়):"
          />
        </div>

        {/* Visual Mapping Model: Entity Sets vs Relationship Set (Textbook Bipartite Mapping) */}
        <div className="p-4 md:p-5 rounded-2xl bg-[#090D18] border border-purple-500/30 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wide">
              {language === 'bn' ? 'ম্যাপিং মডেল: এনটিটি সেটদ্বয় বনাম রিলেশনশিপ সেট' : 'Mapping Model: Entity Sets vs Relationship Set'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60 font-semibold w-fit">
              Textbook Bipartite Graph
            </span>
          </div>

          {/* Visual Interactive Diagram / Graph Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            {/* Entity Set 1 (STUDENT) */}
            <div className="p-3.5 rounded-xl bg-[#0e1428] border border-cyan-800/60 space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-cyan-900/50 pb-1.5 font-mono">
                <span className="text-xs font-bold text-cyan-300">Entity Set E₁: STUDENT</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">Entities</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-1.5 rounded-lg bg-[#070b16] border border-cyan-900/40 text-cyan-200 flex items-center justify-between">
                  <span>e₁: Rahim</span>
                  <span className="text-[10px] text-zinc-500 font-sans">ID: 101</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#070b16] border border-cyan-900/40 text-cyan-200 flex items-center justify-between">
                  <span>e₂: Karim</span>
                  <span className="text-[10px] text-zinc-500 font-sans">ID: 102</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#070b16] border border-cyan-900/40 text-cyan-200 flex items-center justify-between">
                  <span>e₃: Sumaiya</span>
                  <span className="text-[10px] text-zinc-500 font-sans">ID: 103</span>
                </div>
              </div>
              <div className="text-[10px] text-cyan-400/80 font-sans pt-1 border-t border-cyan-950">
                {language === 'bn' ? 'সকল শিক্ষার্থীর সংগ্রহ (E₁)' : 'Collection of student entities'}
              </div>
            </div>

            {/* Relationship Set R (ENROLLS) */}
            <div className="p-3.5 rounded-xl bg-[#170e28] border border-purple-800/60 space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-purple-900/50 pb-1.5 font-mono">
                <span className="text-xs font-bold text-purple-300">Relationship Set R: ENROLLS</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">Tuples</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-1.5 rounded-lg bg-[#0d071a] border border-purple-900/40 text-purple-200 flex items-center justify-between">
                  <span>r₁ = (e₁, c₁)</span>
                  <span className="text-[10px] text-amber-400 font-sans">Rahim → DBMS</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#0d071a] border border-purple-900/40 text-purple-200 flex items-center justify-between">
                  <span>r₂ = (e₂, c₁)</span>
                  <span className="text-[10px] text-amber-400 font-sans">Karim → DBMS</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#0d071a] border border-purple-900/40 text-purple-200 flex items-center justify-between">
                  <span>r₃ = (e₃, c₂)</span>
                  <span className="text-[10px] text-amber-400 font-sans">Sumaiya → Netw.</span>
                </div>
              </div>
              <div className="text-[10px] text-purple-300/80 font-sans pt-1 border-t border-purple-950">
                {language === 'bn' ? 'একক সম্পর্কগুলোর সমষ্টি (R)' : 'Set of all association instances'}
              </div>
            </div>

            {/* Entity Set 2 (COURSE) */}
            <div className="p-3.5 rounded-xl bg-[#0a1e1b] border border-emerald-800/60 space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-emerald-900/50 pb-1.5 font-mono">
                <span className="text-xs font-bold text-emerald-300">Entity Set E₂: COURSE</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Entities</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-1.5 rounded-lg bg-[#051110] border border-emerald-900/40 text-emerald-200 flex items-center justify-between">
                  <span>c₁: DBMS</span>
                  <span className="text-[10px] text-zinc-500 font-sans">CS-301</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#051110] border border-emerald-900/40 text-emerald-200 flex items-center justify-between">
                  <span>c₂: Networking</span>
                  <span className="text-[10px] text-zinc-500 font-sans">CS-302</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#051110] border border-emerald-900/40 text-emerald-200 flex items-center justify-between">
                  <span>c₃: OS</span>
                  <span className="text-[10px] text-zinc-500 font-sans">CS-303</span>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400/80 font-sans pt-1 border-t border-emerald-950">
                {language === 'bn' ? 'সকল কোর্সের সংগ্রহ (E₂)' : 'Collection of course entities'}
              </div>
            </div>
          </div>

          {/* Mathematical Definition Callout */}
          <div className="p-3 rounded-xl bg-[#060914] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="text-zinc-300 text-[11px] font-sans">
              <span className="text-purple-300 font-mono font-bold">Mathematical Formulation: </span>
              {language === 'bn'
                ? 'রিলেশনশিপ সেট R হলো E₁ ও E₂ এনটিটি সেটদ্বয়ের কার্তেসীয় গুণজ (Cartesian Product)-এর একটি উপসেট।'
                : 'A relationship set R is a mathematical relation on n ≥ 2 entity sets, formally defined as R ⊆ E₁ × E₂.'}
            </div>
            <span className="px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 border border-purple-800 text-[11px] shrink-0 font-bold">
              R ⊆ E₁ × E₂
            </span>
          </div>
        </div>

        {/* 2-Column: Relationship Instance vs Relationship Set */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-[#121526] border border-cyan-900/40 space-y-1.5">
            <div className="flex items-center justify-between font-mono">
              <span className="text-cyan-300 font-bold text-xs">১. রিলেশনশিপ ইনস্ট্যান্স (Instance)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Single Tuple
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              {language === 'bn'
                ? 'নির্দিষ্ট মুহূর্তে দুই বা ততোধিক সত্তার মধ্যকার একটি একক সংযোগ। যেমন: শিক্ষার্থী Rahim এবং DBMS কোর্সের মধ্যকার একক লিংক r₁ = (Rahim, DBMS)।'
                : 'A single individual association between specific entity instances at any point in time, e.g. tuple (Rahim, DBMS).'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121526] border border-purple-900/40 space-y-1.5">
            <div className="flex items-center justify-between font-mono">
              <span className="text-purple-300 font-bold text-xs">২. রিলেশনশিপ সেট (Relationship Set)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Full Collection
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              {language === 'bn'
                ? 'একই সম্পর্কের অধীনস্থ সকল রিলেশনশিপ ইনস্ট্যান্সের সমগ্র সংগ্রহ। যেমন: সকল ছাত্রের সকল কোর্সে ভর্তির পূর্ণাঙ্গ সেট হলো "ENROLLS"।'
                : 'The entire mathematical collection of all similar relationship instances of that type, e.g. the entire "ENROLLS" set.'}
            </p>
          </div>
        </div>

        {/* 3 Real-World Notation Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-[#121526] border border-slate-800 space-y-1.5">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">University</div>
            <div className="p-2 rounded-xl bg-[#0c0e18] border border-cyan-800/40 text-cyan-300 text-center font-bold text-[11px]">
              [ Student ] ── &lt; ENROLLS &gt; ── [ Course ]
            </div>
            <div className="text-[10px] text-zinc-400 font-sans text-center">
              {language === 'bn' ? 'শিক্ষার্থী কোর্সে ভর্তি হয়' : 'Student enrolls in academic course'}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121526] border border-slate-800 space-y-1.5">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">Faculty</div>
            <div className="p-2 rounded-xl bg-[#0c0e18] border border-amber-800/40 text-amber-300 text-center font-bold text-[11px]">
              [ Teacher ] ── &lt; TEACHES &gt; ── [ Course ]
            </div>
            <div className="text-[10px] text-zinc-400 font-sans text-center">
              {language === 'bn' ? 'শিক্ষক কোর্স পাঠদান করেন' : 'Faculty teaches course'}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121526] border border-slate-800 space-y-1.5">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">Hospital</div>
            <div className="p-2 rounded-xl bg-[#0c0e18] border border-purple-800/40 text-purple-300 text-center font-bold text-[11px]">
              [ Doctor ] ── &lt; TREATS &gt; ── [ Patient ]
            </div>
            <div className="text-[10px] text-zinc-400 font-sans text-center">
              {language === 'bn' ? 'ডাক্তার রোগীর চিকিৎসা করেন' : 'Doctor diagnoses patient'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          4.2 DEGREE OF RELATIONSHIP (Unary, Binary, Ternary, N-ary)
          High-Quality Thematic Image Assets with Full-Screen Modal!
         ======================================================== */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-300 font-mono">
          <Workflow className="w-4 h-4 text-cyan-400" />
          <span>{language === 'bn' ? '৪.২ ডিগ্রি অফ রিলেশনশিপ (Degree of Relationship)' : '4.2 Degree of Relationship'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="The Degree of a Relationship indicates the number of entity types participating in that relationship. Click any diagram to view full-screen:"
            bn="ডিগ্রি অফ রিলেশনশিপ (Degree of a Relationship) বলতে একটি সম্পর্কে কতগুলো ভিন্ন এনটিটি টাইপ অংশগ্রহণ করছে তার সংখ্যা বোঝায়। ফুল-স্ক্রিন দেখতে যেকোনো ছবিতে ক্লিক করুন:"
          />
        </div>

        {/* 4 Degrees Detailed Cards with Thematic High-Resolution Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* 4.2.1 Unary Relationship (Degree 1 • Recursive) */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#121526] border border-amber-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-amber-400 font-bold uppercase text-xs md:text-sm">
                  4.2.1 Unary Relationship (Degree 1 • Recursive)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 font-mono">
                  Degree 1
                </span>
              </div>
              <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                <DualText
                  en="A relationship between entities of the SAME entity type. An entity relates to another instance of itself."
                  bn="একই এনটিটি টাইপের বিভিন্ন সত্তার মধ্যকার সম্পর্ক। এখানে একই এনটিটি টাইপ দুটি ভিন্ন ভূমিকায় (যেমন ম্যানেজার ও কর্মী) যুক্ত হয়।"
                />
              </div>
            </div>

            {/* Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/degree-unary-relationship.png',
                  title: 'Unary Relationship (Degree 1 • Recursive) Diagram',
                  desc: 'Degree = 1: Employee entity connected to MANAGES relationship in dual roles (Manager & Subordinate).',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-amber-500/30 bg-[#0B0F19] transition-all hover:border-amber-400 hover:shadow-lg hover:shadow-amber-950/40"
            >
              <img
                src="/images/degree-unary-relationship.png"
                alt="Unary Recursive Relationship Diagram"
                className="w-full h-auto max-h-48 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="px-3 py-1.5 bg-[#070A12] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-amber-300 font-semibold">[Degree 1] Employee ↔ Manages ↔ Employee</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>

          {/* 4.2.2 Binary Relationship (Degree 2) */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#121526] border border-cyan-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-bold uppercase text-xs md:text-sm">
                  4.2.2 Binary Relationship (Degree 2)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 font-mono">
                  Degree 2 (Most Common)
                </span>
              </div>
              <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                <DualText
                  en="A relationship between TWO distinct entity types. The overwhelming majority of database relationships are binary."
                  bn="দুটি ভিন্ন এনটিটি টাইপের মধ্যকার দ্বিপাক্ষিক সম্পর্ক। ডেটাবেস ডিজাইনে সবচেয়ে বেশি ব্যবহৃত রিলেশনশিপ হলো বাইনারি।"
                />
              </div>
            </div>

            {/* Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/degree-binary-relationship.png',
                  title: 'Binary Relationship (Degree 2) Diagram',
                  desc: 'Degree = 2: Two distinct entities (Student and Course) connected via ENROLLS relationship.',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30 bg-[#0B0F19] transition-all hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-950/40"
            >
              <img
                src="/images/degree-binary-relationship.png"
                alt="Binary Relationship Diagram"
                className="w-full h-auto max-h-48 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="px-3 py-1.5 bg-[#070A12] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-cyan-300 font-semibold">[Degree 2] Student ── Enrolls ── Course</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>

          {/* 4.2.3 Ternary Relationship (Degree 3) */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#121526] border border-purple-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-purple-400 font-bold uppercase text-xs md:text-sm">
                  4.2.3 Ternary Relationship (Degree 3)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 font-mono">
                  Degree 3
                </span>
              </div>
              <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                <DualText
                  en="A relationship connecting THREE distinct entity types simultaneously in one tripartite association."
                  bn="একই সাথে তিনটি ভিন্ন ভিন্ন এনটিটি টাইপের মধ্যকার ত্রিপাক্ষিক সমন্বিত সম্পর্ক।"
                />
              </div>
            </div>

            {/* Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/degree-ternary-relationship.png',
                  title: 'Ternary Relationship (Degree 3) Diagram',
                  desc: 'Degree = 3: Three entities (Supplier, Part, and Project) linked simultaneously via SUPPLIES relationship.',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-purple-500/30 bg-[#0B0F19] transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-950/40"
            >
              <img
                src="/images/degree-ternary-relationship.png"
                alt="Ternary Relationship Diagram"
                className="w-full h-auto max-h-48 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
              </div>
              <div className="px-3 py-1.5 bg-[#070A12] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-purple-300 font-semibold">[Degree 3] Supplier + Part + Project</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>

          {/* 4.2.4 N-ary Relationship (Degree N) */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#121526] border border-pink-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-pink-400 font-bold uppercase text-xs md:text-sm">
                  4.2.4 N-ary Relationship (Degree N)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30 font-mono">
                  Degree N (General)
                </span>
              </div>
              <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                <DualText
                  en="A general relationship involving N entity types simultaneously (e.g. Contract involving Company, Bank, Lawyer, and Client)."
                  bn="একই সাথে N-সংখ্যক এনটিটি টাইপের মধ্যকার সাধারণ সম্পর্ক (যেমন: কোম্পানি, ব্যাংক, আইনজীবী ও ক্লায়েন্টের মধ্যকার চুক্তি)।"
                />
              </div>
            </div>

            {/* Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/degree-n-ary-relationship.png',
                  title: 'N-ary Relationship (Degree N) Diagram',
                  desc: 'Degree = N: General case connecting N distinct entity sets simultaneously.',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-pink-500/30 bg-[#0B0F19] transition-all hover:border-pink-400 hover:shadow-lg hover:shadow-pink-950/40"
            >
              <img
                src="/images/degree-n-ary-relationship.png"
                alt="N-ary Relationship Diagram"
                className="w-full h-auto max-h-48 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-pink-300" />
              </div>
              <div className="px-3 py-1.5 bg-[#070A12] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-pink-300 font-semibold">[Degree N] E1, E2, ... En Connected</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
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
            className="relative max-w-4xl w-full rounded-2xl bg-[#0B0F19] border border-cyan-500/40 p-4 md:p-6 shadow-2xl space-y-3"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm md:text-base font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-cyan-400">▣</span>
                  {modalImage.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">{modalImage.desc}</p>
              </div>
              <button
                onClick={() => setModalImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition-all cursor-pointer border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex items-center justify-center p-2 rounded-xl bg-[#060911] border border-slate-800/80">
              <img
                src={modalImage.src}
                alt={modalImage.title}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
              <span>Press ESC or click anywhere outside to close</span>
              <span className="text-cyan-400 font-semibold">High-Resolution Thematic Asset</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
