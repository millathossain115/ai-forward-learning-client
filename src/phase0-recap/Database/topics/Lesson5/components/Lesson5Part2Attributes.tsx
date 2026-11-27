'use client';

import React, { useState, useEffect } from 'react';
import { Circle, Sparkles, Calculator, Layers, CheckCircle2, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part2Attributes() {
  const { language } = useLanguage();
  const [birthYear, setBirthYear] = useState<number>(2004);
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

  const calculatedAge = 2026 - birthYear;

  const attributeExamTable = [
    {
      typeEn: 'Simple Attribute',
      typeBn: 'সিম্পল অ্যাট্রিবিউট (সরল)',
      meaningEn: 'Cannot be meaningfully divided into smaller sub-components',
      meaningBn: 'আর কোনো অর্থপূর্ণ ক্ষুদ্র অংশে বিভক্ত করা যায় না',
      notationEn: 'Single Oval',
      notationBn: 'একক ডিম্বাকৃতি (Single Oval)',
      exampleEn: 'Age, Gender, Salary',
      exampleBn: 'Age, Gender, Salary',
    },
    {
      typeEn: 'Composite Attribute',
      typeBn: 'কম্পোজিট অ্যাট্রিবিউট (যৌগিক)',
      meaningEn: 'Can be divided into smaller meaningful sub-parts',
      meaningBn: 'একাধিক অর্থপূর্ণ উপ-অংশে বিভক্ত করা যায়',
      notationEn: 'Main Oval branching to Sub-Ovals',
      notationBn: 'মূল ওভাল থেকে শাখা ওভাল',
      exampleEn: 'Address (Street, City), Name (First, Last)',
      exampleBn: 'Address (Street, City), Name (First, Last)',
    },
    {
      typeEn: 'Key Attribute',
      typeBn: 'কী অ্যাট্রিবিউট (প্রাইমারি কি)',
      meaningEn: 'Uniquely identifies each entity instance in an entity set',
      meaningBn: 'এনটিটি সেটের প্রতিটি সত্তাকে অনন্যভাবে শনাক্ত করে',
      notationEn: 'Underlined text in oval (<u>A</u>)',
      notationBn: 'আন্ডারলাইনযুক্ত ওভাল (<u>A</u>)',
      exampleEn: 'Student_ID, Employee_ID',
      exampleBn: 'Student_ID, Employee_ID',
    },
    {
      typeEn: 'Multivalued Attribute',
      typeBn: 'মাল্টিভ্যালুড অ্যাট্রিবিউট (বহুমান)',
      meaningEn: 'Can hold multiple values for a single entity instance',
      meaningBn: 'একটি এনটিটির একই সাথে একাধিক মান থাকতে পারে',
      notationEn: 'Double Oval (( ))',
      notationBn: 'ডাবল ওভাল (( ))',
      exampleEn: 'Phone_Number, Email_Address, Skills',
      exampleBn: 'Phone_Number, Email_Address, Skills',
    },
    {
      typeEn: 'Derived Attribute',
      typeBn: 'ডিরাইভড অ্যাট্রিবিউট (গণনাকৃত)',
      meaningEn: 'Calculated dynamically from another stored attribute',
      meaningBn: 'সরাসরি স্টোর না করে অন্য অ্যাট্রিবিউট থেকে গণনা করা হয়',
      notationEn: 'Dashed Oval - -',
      notationBn: 'ভাঙা দাগের ডিম্বাকৃতি (Dashed Oval)',
      exampleEn: 'Age (calculated from Date_of_Birth)',
      exampleBn: 'Age (Date_of_Birth থেকে গণনাকৃত)',
    },
  ];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-3xl p-5 md:p-7 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Circle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • অ্যাট্রিবিউট ও প্রকারভেদ' : 'Part 3 • Attributes & Types'}
          </span>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            <DualText
              en="3. What are Attributes? & Attribute Types"
              bn="৩. অ্যাট্রিবিউট কী এবং এর প্রকারভেদ"
            />
          </h2>
        </div>
      </div>

      {/* Intro Definition & Symbol Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#101116] border border-white/[0.08] text-xs">
        <div className="text-zinc-300 font-sans leading-relaxed max-w-2xl">
          <DualText
            en="An Attribute is a property characterizing an entity (e.g., Student has Student_ID, Name, Age). Represented by an Oval/Ellipse in Chen ER notation."
            bn="অ্যাট্রিবিউট হলো কোনো এনটিটির গুণ বা বৈশিষ্ট্য (যেমন: Student-এর Student_ID, Name, Age)। ইআর ডায়াগ্রামে ডিম্বাকৃতি (Oval/Ellipse) দিয়ে আঁকা হয়।"
          />
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-amber-950/50 border border-amber-500/50 text-amber-300 font-mono font-bold text-xs shrink-0 text-center">
          ( OVAL ⬭ ) = Attribute
        </div>
      </div>

      {/* ========================================================
          ATTRIBUTE TYPES (Organized as low-overhead 2-column cards)
          Left: Definition, Key Rules & Examples
          Right: High-Resolution Thematic Image with Fullscreen Popup
         ======================================================== */}
      <div className="space-y-3.5">
        {/* 3.1 Simple Attribute */}
        <div className="p-4 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-white/[0.08] pb-2">
            <span className="font-bold text-white text-xs md:text-sm">3.1 Simple (Atomic) Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800 font-mono font-bold">
              Single Oval
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            {/* Left: Definition */}
            <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="Atomic attribute that cannot be divided into smaller meaningful components for database storage."
                bn="যে অ্যাট্রিবিউটকে আর কোনো অর্থপূর্ণ ক্ষুদ্র উপ-অংশে ভাগ করা সম্ভব নয় (একক অবিভাজ্য মান)।"
              />
              <div className="p-2 rounded-lg bg-[#101116] border border-white/[0.08] font-mono text-[11px] text-cyan-300">
                Examples: <code>Gender = &apos;Female&apos;</code>, <code>Salary = 50000</code>, <code>Roll_No</code>
              </div>
            </div>

            {/* Right: Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/attr-simple-attribute.png',
                  title: 'Simple (Atomic) Attribute Diagram',
                  desc: 'Single Oval ⬭: Atomic attribute that cannot be divided further (e.g. Gender, Salary, Roll_No).',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30 bg-[#0B0F19] transition-colors hover:border-cyan-400 hover: hover:"
            >
              <img
                src="/images/attr-simple-attribute.png"
                alt="Simple Attribute Diagram"
                className="w-full h-auto max-h-36 sm:max-h-40 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="px-3 py-1 bg-[#090a0d] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-cyan-300 font-semibold font-mono">Single Oval (Atomic)</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3.2 Composite Attribute */}
        <div className="p-4 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-white/[0.08] pb-2">
            <span className="font-bold text-white text-xs md:text-sm">3.2 Composite Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 font-mono font-bold">
              Main Oval + Sub-Ovals
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            {/* Left: Definition */}
            <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="An attribute composed of multiple sub-attributes, each carrying independent meaning."
                bn="যে অ্যাট্রিবিউট একাধিক অর্থপূর্ণ উপ-অ্যাট্রিবিউটের সমন্বয়ে গঠিত হয় (যেমন ঠিকানা বা নাম)।"
              />
              <div className="p-2 rounded-lg bg-[#101116] border border-white/[0.08] font-mono text-[11px] text-emerald-300">
                <div>Address &rarr; [ Street, City, State, Country ]</div>
                <div className="text-zinc-400">Name &rarr; [ First_Name, Last_Name ]</div>
              </div>
            </div>

            {/* Right: Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/attr-composite-attribute.png',
                  title: 'Composite Attribute Diagram',
                  desc: 'Hierarchy of Ovals: Main attribute (Address) branches into multiple independent sub-attributes.',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0B0F19] transition-colors hover:border-emerald-400 hover: hover:"
            >
              <img
                src="/images/attr-composite-attribute.png"
                alt="Composite Attribute Diagram"
                className="w-full h-auto max-h-36 sm:max-h-40 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <div className="px-3 py-1 bg-[#090a0d] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-emerald-300 font-semibold font-mono">Main Oval ➔ Sub-Ovals</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3.3 Key Attribute */}
        <div className="p-4 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-white/[0.08] pb-2">
            <span className="font-bold text-white text-xs md:text-sm">3.3 Key Attribute (Primary Key)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800 font-mono font-bold">
              <u>Underlined Text</u>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            {/* Left: Definition */}
            <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="Uniquely identifies each entity in the entity set. Drawn with an underlined name and converts to PRIMARY KEY in SQL."
                bn="এনটিটি সেটের প্রতিটি সত্তাকে স্বতন্ত্রভাবে শনাক্ত করে। আন্ডারলাইনযুক্ত নাম দিয়ে আঁকা হয় এবং SQL-এ প্রাইমারি কি হয়।"
              />
              <div className="p-2 rounded-lg bg-[#101116] border border-white/[0.08] font-mono text-[11px] text-amber-300">
                Examples: <code>Student_ID = &apos;101&apos;</code>, <code>Emp_ID = &apos;E402&apos;</code>
              </div>
            </div>

            {/* Right: Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/attr-key-attribute.png',
                  title: 'Key Attribute (Primary Key) Diagram',
                  desc: 'Underlined text in oval: Uniquely identifies each entity instance in an entity set (Primary Key).',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-amber-500/30 bg-[#0B0F19] transition-colors hover:border-amber-400 hover: hover:"
            >
              <img
                src="/images/attr-key-attribute.png"
                alt="Key Attribute Diagram"
                className="w-full h-auto max-h-36 sm:max-h-40 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="px-3 py-1 bg-[#090a0d] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-amber-300 font-semibold font-mono"><u>Underlined</u> (Primary Key)</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3.4 Multivalued Attribute */}
        <div className="p-4 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-white/[0.08] pb-2">
            <span className="font-bold text-white text-xs md:text-sm">3.4 Multivalued Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700 font-mono font-bold">
              (( Double Oval ))
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            {/* Left: Definition */}
            <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="An attribute capable of holding multiple values for a single entity (e.g. multiple phone numbers, skills)."
                bn="যে অ্যাট্রিবিউটের একটিমাত্র সত্তার জন্য একাধিক মান থাকতে পারে (যেমন: শিক্ষার্থীর একাধিক ফোন নম্বর বা দক্ষতা)।"
              />
              <div className="p-2 rounded-lg bg-[#101116] border border-white/[0.08] font-mono text-[11px] text-emerald-300">
                Examples: <code>Phone_No = [&apos;017..&apos;, &apos;019..&apos;]</code>, <code>Skills = [&apos;React&apos;, &apos;SQL&apos;]</code>
              </div>
            </div>

            {/* Right: Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/attr-multivalued-attribute.png',
                  title: 'Multivalued Attribute Diagram',
                  desc: 'Double Concentric Oval (( )): Capable of holding multiple values for a single entity instance.',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0B0F19] transition-colors hover:border-emerald-400 hover: hover:"
            >
              <img
                src="/images/attr-multivalued-attribute.png"
                alt="Multivalued Attribute Diagram"
                className="w-full h-auto max-h-36 sm:max-h-40 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <div className="px-3 py-1 bg-[#090a0d] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-emerald-300 font-semibold font-mono">Double Oval (( ))</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3.5 Derived Attribute */}
        <div className="p-4 rounded-2xl bg-[#15171e] border border-amber-900/40 space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-xs md:text-sm">3.5 Derived Attribute</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-600/50 font-mono font-bold">
              - - Dashed Oval - -
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            {/* Left: Definition & Compact Simulator */}
            <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="Not stored in database tables. Calculated dynamically on the fly from another stored attribute."
                bn="সরাসরি টেবিলে সংরক্ষণ করা হয় না; অন্য কোনো সংরক্ষিত অ্যাট্রিবিউট থেকে স্বয়ংক্রিয়ভাবে গণনা করা হয়।"
              />

              {/* Compact Age Calculator */}
              <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08] flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-zinc-400 text-[11px]">Birth Year:</span>
                <input
                  type="number"
                  min="1950"
                  max="2026"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value) || 2004)}
                  className="w-20 px-2 py-0.5 rounded bg-[#121628] border border-white/[0.12] text-white font-mono text-xs text-center"
                />
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-200 font-bold text-[11px]">
                  Age: {calculatedAge}
                </span>
              </div>
            </div>

            {/* Right: Thematic Image with Fullscreen Popup Trigger */}
            <div
              onClick={() =>
                setModalImage({
                  src: '/images/attr-derived-attribute.png',
                  title: 'Derived Attribute Diagram',
                  desc: 'Dashed Oval - -: Dynamically computed on query from stored attribute (e.g. Age computed from Date_of_Birth).',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-amber-500/30 bg-[#0B0F19] transition-colors hover:border-amber-400 hover: hover:"
            >
              <img
                src="/images/attr-derived-attribute.png"
                alt="Derived Attribute Diagram"
                className="w-full h-auto max-h-36 sm:max-h-40 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="px-3 py-1 bg-[#090a0d] border-t border-white/[0.08] flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-amber-300 font-semibold font-mono">- - Dashed Oval - -</span>
                <span className="flex items-center gap-1 text-zinc-500 font-sans">Click to expand ⤢</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attribute Types: Compact Exam Revision Table */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            {language === 'bn' ? 'অ্যাট্রিবিউট প্রকারভেদ সংক্ষেপ টেবিল' : 'Attribute Types Quick Reference Table'}
          </span>
          <span className="text-[10px] font-mono text-zinc-400">Core Summary</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#101116]">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#15171e] text-zinc-300 border-b border-white/[0.08] text-[11px]">
                <th className="py-2 px-3">{language === 'bn' ? 'প্রকারভেদ' : 'Attribute Type'}</th>
                <th className="py-2 px-3">{language === 'bn' ? 'অর্থ ও বৈশিষ্ট্য' : 'Meaning'}</th>
                <th className="py-2 px-3 text-center">{language === 'bn' ? 'ইআর প্রতীক' : 'ER Notation'}</th>
                <th className="py-2 px-3">{language === 'bn' ? 'উদাহরণ' : 'Examples'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08] text-[11px] text-zinc-300 font-sans">
              {attributeExamTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#101116]'}>
                  <td className="py-2 px-3 font-bold text-amber-300 font-mono">
                    {language === 'bn' ? row.typeBn : row.typeEn}
                  </td>
                  <td className="py-2 px-3 text-zinc-300">
                    {language === 'bn' ? row.meaningBn : row.meaningEn}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-cyan-300">
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-white/[0.08]">
                      {language === 'bn' ? row.notationBn : row.notationEn}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-zinc-400">
                    {language === 'bn' ? row.exampleBn : row.exampleEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            className="relative max-w-4xl w-full rounded-2xl bg-[#0B0F19] border border-amber-500/40 p-4 md:p-6 space-y-3"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm md:text-base font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">▣</span>
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

            {/* Modal Image Body */}
            <div className="flex items-center justify-center p-2 rounded-xl bg-[#060911] border border-white/[0.08]">
              <img
                src={modalImage.src}
                alt={modalImage.title}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
              <span>Press ESC or click anywhere outside to close</span>
              <span className="text-amber-400 font-semibold">High-Resolution Thematic Asset</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
