'use client';

import React, { useState } from 'react';
import { Circle, Sparkles, Calculator, Layers, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part2Attributes() {
  const { language } = useLanguage();
  const [birthYear, setBirthYear] = useState<number>(2004);

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
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-5 md:p-7 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Circle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#090b14] border border-slate-800 text-xs">
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
          Right: Single Official Diagram (Keeping GeeksforGeeks images)
         ======================================================== */}
      <div className="space-y-3.5">
        {/* 3.1 Simple Attribute */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-slate-800/80 pb-2">
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
              <div className="p-2 rounded-lg bg-[#0c0e18] border border-slate-800/80 font-mono text-[11px] text-cyan-300">
                Examples: <code>Gender = 'Female'</code>, <code>Salary = 50000</code>, <code>Roll_No</code>
              </div>
            </div>

            {/* Right: Single Diagram */}
            <div className="p-3 bg-[#03060f] border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <div className="px-7 py-2 rounded-full border-2 border-cyan-400 bg-cyan-950/30 text-white font-mono font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                Gender
              </div>
              <span className="text-[10px] text-zinc-400 font-mono mt-1.5">
                Single oval = Simple Attribute
              </span>
            </div>
          </div>
        </div>

        {/* 3.2 Composite Attribute */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-slate-800/80 pb-2">
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
              <div className="p-2 rounded-lg bg-[#0c0e18] border border-slate-800/80 font-mono text-[11px] text-emerald-300">
                <div>Address &rarr; [ Street, City, State, Country ]</div>
                <div className="text-zinc-400">Name &rarr; [ First_Name, Last_Name ]</div>
              </div>
            </div>

            {/* Right: Single GeeksforGeeks Diagram */}
            <div className="p-2 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
              <img
                src="/images/gfg-composite-attr.webp"
                alt="Composite Attribute Diagram (GeeksforGeeks)"
                className="max-h-20 md:max-h-24 object-contain"
              />
              <span className="text-[10px] font-mono text-zinc-600 mt-1">
                GeeksforGeeks: Address &rarr; Street, City, State, Country
              </span>
            </div>
          </div>
        </div>

        {/* 3.3 Key Attribute */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-slate-800/80 pb-2">
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
              <div className="p-2 rounded-lg bg-[#0c0e18] border border-slate-800/80 font-mono text-[11px] text-amber-300">
                Examples: <code>Student_ID = '101'</code>, <code>Emp_ID = 'E402'</code>
              </div>
            </div>

            {/* Right: Single Diagram */}
            <div className="p-3 bg-[#03060f] border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <div className="px-7 py-2 rounded-full border-2 border-amber-400 bg-amber-950/30 text-amber-200 font-mono font-bold text-xs shadow-[0_0_12px_rgba(251,191,36,0.2)]">
                <u>Student_ID</u>
              </div>
              <span className="text-[10px] text-amber-400 font-mono mt-1.5">
                Underlined text = Key Attribute (Primary Key)
              </span>
            </div>
          </div>
        </div>

        {/* 3.4 Multivalued Attribute */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-slate-800/80 pb-2">
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
              <div className="p-2 rounded-lg bg-[#0c0e18] border border-slate-800/80 font-mono text-[11px] text-emerald-300">
                Examples: <code>Phone_No = ['017..', '019..']</code>, <code>Skills = ['React', 'SQL']</code>
              </div>
            </div>

            {/* Right: Single GeeksforGeeks Diagram */}
            <div className="p-2 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
              <img
                src="/images/gfg-multivalued-attr.webp"
                alt="Multivalued Attribute Diagram (GeeksforGeeks)"
                className="max-h-20 md:max-h-24 object-contain"
              />
              <span className="text-[10px] font-mono text-zinc-600 mt-1">
                GeeksforGeeks: Multivalued Attribute (Double Oval: Phone_No)
              </span>
            </div>
          </div>
        </div>

        {/* 3.5 Derived Attribute */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-amber-900/40 space-y-2.5">
          <div className="flex items-center justify-between font-mono border-b border-slate-800/80 pb-2">
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
              <div className="p-2.5 rounded-xl bg-[#090b14] border border-slate-800 flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-zinc-400 text-[11px]">Birth Year:</span>
                <input
                  type="number"
                  min="1950"
                  max="2026"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value) || 2004)}
                  className="w-20 px-2 py-0.5 rounded bg-[#121628] border border-slate-700 text-white font-mono text-xs text-center"
                />
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-200 font-bold text-[11px]">
                  Age: {calculatedAge}
                </span>
              </div>
            </div>

            {/* Right: Single GeeksforGeeks Diagram */}
            <div className="p-2 rounded-xl bg-white border border-slate-700 flex flex-col items-center justify-center">
              <img
                src="/images/gfg-derived-attr.webp"
                alt="Derived Attribute Diagram (GeeksforGeeks)"
                className="max-h-20 md:max-h-24 object-contain"
              />
              <span className="text-[10px] font-mono text-zinc-600 mt-1">
                GeeksforGeeks: Derived Attribute (Dashed Oval: Age from DOB)
              </span>
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

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                <th className="py-2 px-3">{language === 'bn' ? 'প্রকারভেদ' : 'Attribute Type'}</th>
                <th className="py-2 px-3">{language === 'bn' ? 'অর্থ ও বৈশিষ্ট্য' : 'Meaning'}</th>
                <th className="py-2 px-3 text-center">{language === 'bn' ? 'ইআর প্রতীক' : 'ER Notation'}</th>
                <th className="py-2 px-3">{language === 'bn' ? 'উদাহরণ' : 'Examples'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300 font-sans">
              {attributeExamTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                  <td className="py-2 px-3 font-bold text-amber-300 font-mono">
                    {language === 'bn' ? row.typeBn : row.typeEn}
                  </td>
                  <td className="py-2 px-3 text-zinc-300">
                    {language === 'bn' ? row.meaningBn : row.meaningEn}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-cyan-300">
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-800">
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
    </section>
  );
}
