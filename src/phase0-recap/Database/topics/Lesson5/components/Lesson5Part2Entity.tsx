'use client';

import React, { useState, useEffect } from 'react';
import { User, Layers, Shield, AlertCircle, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part2Entity() {
  const { language } = useLanguage();
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

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-4 md:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
              {language === 'bn' ? 'পার্ট ২ • এনটিটি ও প্রকারভেদ' : 'Part 2 • Entity & Entity Types'}
            </span>
            <h3 className="text-sm md:text-base font-bold text-white mt-0.5">
              <DualText
                en="2. What is an Entity? & Entity Types (Strong vs Weak)"
                bn="২. এনটিটি কী এবং এনটিটির প্রকারভেদ (স্ট্রং ও উইক)"
              />
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-700/60 font-bold">
            Strong: Single ▭
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-700/60 font-bold">
            Weak: Double ⧉
          </span>
        </div>
      </div>

      {/* Intro Definition & Quick Examples */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-[#080b16] border border-white/[0.08] text-xs font-sans">
        <div className="text-zinc-300 leading-relaxed">
          <DualText
            en="An Entity is any real-world person, place, object, or concept stored in a database. In Chen ER notation, entities are drawn as sharp 90-degree rectangles (0px radius)."
            bn="এনটিটি (Entity) হলো বাস্তব জগতের যেকোনো স্বতন্ত্র ব্যক্তি, বস্তু, স্থান বা ধারণা যার তথ্য ডেটাবেসে রাখা হয়। চেন নোটেশনে এনটিটি সবসময় সোজা কোণবিশিষ্ট আয়তক্ষেত্র (0px রেডিয়াস) দিয়ে আঁকা হয়।"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1 shrink-0 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded bg-[#101426] border border-white/[0.08] text-zinc-300">
            Student <span className="text-amber-400">(Rahim)</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#101426] border border-white/[0.08] text-zinc-300">
            Course <span className="text-cyan-400">(DBMS)</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#101426] border border-white/[0.08] text-zinc-300">
            Department
          </span>
        </div>
      </div>

      {/* ========================================================
          ENTITY TYPES: 2-COLUMN VIEW (Strong vs Weak Entity)
          With Generated High-Resolution Diagrams & Fullscreen Modal
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* 1. Strong Entity Card */}
        <div className="p-3.5 rounded-2xl bg-[#0b0e1b] border border-cyan-900/40 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
              <span className="font-mono font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                {language === 'bn' ? '১. স্ট্রং এনটিটি (Strong Entity)' : '1. Strong Entity Type'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-bold">
                Single Rectangle ▭
              </span>
            </div>
            <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="Has its own Primary Key (underlined oval) to uniquely identify instances. Exists independently without relying on any other entity (e.g. EMPLOYEE with Emp_ID)."
                bn="যার নিজস্ব প্রাইমারি কি (আন্ডারলাইন ওভাল) থাকে এবং প্রতিটি ইনস্ট্যান্সকে অনন্যভাবে শনাক্ত করতে পারে। অন্য কোনো সত্তার ওপর নির্ভরশীল নয় (যেমন: Emp_ID সহ EMPLOYEE)।"
              />
            </div>
          </div>

          {/* Strong Entity Diagram Preview */}
          <div
            onClick={() =>
              setModalImage({
                src: '/images/entity-strong.png',
                title: 'Strong Entity Diagram (Chen Notation)',
                desc: 'Single Sharp Rectangle ▭: Has its own Primary Key (Emp_ID) with independent existence.',
              })
            }
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#070A14] border border-cyan-500/30 transition-colors hover:border-cyan-400 hover: hover: p-2 flex flex-col items-center justify-center"
          >
            <img
              src="/images/entity-strong.png"
              alt="Strong Entity Diagram"
              className="w-full h-auto max-h-36 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
            </div>
            <div className="w-full mt-1.5 pt-1 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="text-cyan-300 font-semibold">Single Rectangle [ EMPLOYEE ]</span>
              <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">Click to expand ⤢</span>
            </div>
          </div>
        </div>

        {/* 2. Weak Entity Card */}
        <div className="p-3.5 rounded-2xl bg-[#0b0e1b] border border-amber-900/40 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
              <span className="font-mono font-bold text-amber-300 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                {language === 'bn' ? '২. উইক এনটিটি (Weak Entity)' : '2. Weak Entity Type'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-bold">
                Double Rectangle ⧉
              </span>
            </div>
            <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="Does NOT have its own Primary Key. Identified via Owner PK + Partial Key (dashed underline) through an Identifying Relationship (double diamond << >>)."
                bn="যার নিজস্ব কোনো প্রাইমারি কি থাকে না। স্ট্রং সত্তার ওপর নির্ভরশীল এবং পার্শিয়াল কি (ড্যাশড আন্ডারলাইন) ও আইডেন্টিফায়িং রিলেশন (ডাবল ডায়মন্ড) দিয়ে শনাক্ত হয়।"
              />
            </div>
          </div>

          {/* Weak Entity Diagram Preview */}
          <div
            onClick={() =>
              setModalImage({
                src: '/images/entity-weak.png',
                title: 'Weak Entity Diagram (Chen Notation)',
                desc: 'Double Sharp Rectangle ⧉: DEPENDENT (Employee Family/Child) entity connected to EMPLOYEE via DEPENDS identifying relationship with Dependent_Name Partial Key.',
              })
            }
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#070A14] border border-amber-500/30 transition-colors hover:border-amber-400 hover: hover: p-2 flex flex-col items-center justify-center"
          >
            <img
              src="/images/entity-weak.png"
              alt="Weak Entity Diagram"
              className="w-full h-auto max-h-36 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="w-full mt-1.5 pt-1 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="text-amber-300 font-semibold">Double Rectangle [[ DEPENDENT (Family) ]]</span>
              <span className="text-zinc-500 group-hover:text-amber-400 transition-colors">Click to expand ⤢</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Distinction: Entity vs Entity Type vs Entity Set (3-Column Row) */}
      <div className="space-y-2 pt-2 border-t border-white/[0.08]">
        <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          {language === 'bn' ? 'পার্থক্য: Entity বনাম Entity Type বনাম Entity Set' : 'Crucial Distinction: Entity vs Entity Type vs Entity Set'}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-sans">
          <div className="p-2.5 rounded-xl bg-[#090d1c] border border-amber-900/40 space-y-0.5">
            <div className="flex items-center justify-between font-mono">
              <span className="text-amber-400 font-bold text-[11px]">1. Entity (সত্তা)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                Instance
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-snug">
              {language === 'bn'
                ? 'একটি নির্দিষ্ট একক অস্তিত্ব, যেমন শিক্ষার্থী "Rahim" (ID: 101)।'
                : 'A single specific object instance, e.g. Student "Rahim" (ID: 101).'}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-[#090d1c] border border-cyan-900/40 space-y-0.5">
            <div className="flex items-center justify-between font-mono">
              <span className="text-cyan-400 font-bold text-[11px]">2. Entity Type (টাইপ)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                Schema
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-snug">
              {language === 'bn'
                ? 'সমজাতীয় এনটিটিগুলোর ক্যাটাগরি বা ব্লুপ্রিন্ট, যেমন "STUDENT"।'
                : 'The common category/schema blueprint, e.g. "STUDENT".'}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-[#090d1c] border border-purple-900/40 space-y-0.5">
            <div className="flex items-center justify-between font-mono">
              <span className="text-purple-400 font-bold text-[11px]">3. Entity Set (সেট)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800">
                Collection
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-snug">
              {language === 'bn'
                ? 'একই বৈশিষ্ট্যের সকল এনটিটির সমষ্টি, যেমন "সকল শিক্ষার্থী"।'
                : 'Collection of all similar entities, e.g. "All students".'}
            </p>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Modal / Lightbox */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-2xl bg-[#0B0F19] border border-cyan-500/40 p-4 md:p-6 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm md:text-base font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-cyan-400">▣</span>
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
              <span className="text-cyan-400 font-semibold">High-Resolution Thematic Asset</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
