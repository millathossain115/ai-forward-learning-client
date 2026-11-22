'use client';

import React, { useState } from 'react';
import { Circle, Sparkles, Calculator, Layers, HelpCircle, CheckCircle2, ArrowDown } from 'lucide-react';
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
      exampleEn: 'Age, Gender, Salary, Student_ID',
      exampleBn: 'Age, Gender, Salary, Student_ID',
    },
    {
      typeEn: 'Composite Attribute',
      typeBn: 'কম্পোজিট অ্যাট্রিবিউট (যৌগিক)',
      meaningEn: 'Can be divided into smaller meaningful sub-parts',
      meaningBn: 'একাধিক অর্থপূর্ণ উপ-অংশে বিভক্ত করা যায়',
      notationEn: 'Main Oval branching to Sub-Ovals',
      notationBn: 'মূল ওভাল থেকে শাখা ওভাল',
      exampleEn: 'Name (First, Last), Address (Street, City)',
      exampleBn: 'Name (First, Last), Address (Street, City)',
    },
    {
      typeEn: 'Single-Valued Attribute',
      typeBn: 'সিঙ্গল-ভ্যালুড অ্যাট্রিবিউট (একক মান)',
      meaningEn: 'Has strictly one atomic value per entity instance',
      meaningBn: 'একটি এনটিটির জন্য কেবল একটি নির্দিষ্ট মান থাকে',
      notationEn: 'Single Oval',
      notationBn: 'একক ডিম্বাকৃতি (Single Oval)',
      exampleEn: 'Student_ID, Date_of_Birth, Blood_Group',
      exampleBn: 'Student_ID, Date_of_Birth, Blood_Group',
    },
    {
      typeEn: 'Multivalued Attribute',
      typeBn: 'মাল্টিভ্যালুড অ্যাট্রিবিউট (বহুমানবিশিষ্ট)',
      meaningEn: 'Can hold multiple values for a single entity instance',
      meaningBn: 'একটি এনটিটির একই সাথে একাধিক মান থাকতে পারে',
      notationEn: 'Double Oval (দ্বৈত ওভাল)',
      notationBn: 'ডাবল ওভাল বা দ্বৈত ডিম্বাকৃতি',
      exampleEn: 'Phone_Number, Email_Address, Skills',
      exampleBn: 'Phone_Number, Email_Address, Skills',
    },
    {
      typeEn: 'Derived Attribute',
      typeBn: 'ডিরাইভড অ্যাট্রিবিউট (লব্ধ/গণনাকৃত)',
      meaningEn: 'Calculated dynamically from another stored attribute',
      meaningBn: 'সরাসরি স্টোর না করে অন্য অ্যাট্রিবিউট থেকে গণনা করা হয়',
      notationEn: 'Dashed Oval (ড্যাশড ওভাল)',
      notationBn: 'ভাঙা দাগের ডিম্বাকৃতি (Dashed Oval)',
      exampleEn: 'Age (calculated from Date_of_Birth)',
      exampleBn: 'Age (Date_of_Birth থেকে গণনাকৃত)',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Circle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • অ্যাট্রিবিউট ও প্রকারভেদ' : 'Part 3 • Attributes & 5 Core Types'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="3. What are Attributes? & Their 5 Core Types"
              bn="৩. অ্যাট্রিবিউট কী? এবং এর ৫টি প্রধান প্রকারভেদ"
            />
          </h2>
        </div>
      </div>

      {/* Intro Definition */}
      <div className="space-y-3 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
        <DualText
          en="An Attribute is a property or characteristic of an entity. For example, a Student entity in a university database may possess: Student_ID, Name, Age, Email, Address, and Phone. Think of it this way: Entity = Student, Attributes = Student's individual properties."
          bn="অ্যাট্রিবিউট (Attribute) হলো কোনো এনটিটির গুণ, বৈশিষ্ট্য বা বৈশিষ্ট্যসূচক তথ্য। যেমন, একটি বিশ্ববিদ্যালয়ে Student এনটিটির বৈশিষ্ট্য হতে পারে: Student_ID, Name, Age, Email, Address এবং Phone। সহজভাবে ভাবুন: এনটিটি = শিক্ষার্থী, অ্যাট্রিবিউট = শিক্ষার্থীর বিভিন্ন তথ্য বা বৈশিষ্ট্য।"
        />

        <div className="p-3.5 rounded-xl bg-[#090b14] border border-slate-800 flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-400">
            {language === 'bn' ? 'ইআর ডায়াগ্রামে অ্যাট্রিবিউট প্রতীক:' : 'ER Diagram Symbol for Attribute:'}
          </span>
          <span className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-500 text-amber-300 font-bold">
            ( OVAL / ELLIPSE (ডিম্বাকৃতি) ) = Attribute
          </span>
        </div>
      </div>

      {/* 5 Attribute Types Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-sans">
        {/* ========================================================
            3.1 Simple Attribute
           ======================================================== */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="font-bold text-white text-sm">3.1 Simple Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-black/50 text-cyan-300 border border-cyan-800 font-mono font-bold">
              Single Oval
            </span>
          </div>

          <div className="text-zinc-300 text-[11px] leading-relaxed">
            <DualText
              en="A simple attribute cannot be divided into smaller meaningful components for the purpose of the database."
              bn="যে অ্যাট্রিবিউটকে ডেটাবেসের প্রয়োজনে আর কোনো অর্থপূর্ণ ক্ষুদ্র উপ-অংশে ভাগ করা যায় না, তাকে সিম্পল বা সরল অ্যাট্রিবিউট বলে।"
            />
          </div>

          {/* Reference Diagram Box: Single Oval */}
          <div className="p-5 rounded-2xl bg-[#03060f] border border-slate-800 text-center space-y-3 shadow-inner">
            <div className="text-[11px] font-mono font-bold text-zinc-300 text-left border-b border-slate-800/80 pb-1.5">
              {language === 'bn' ? 'ইআর ডায়াগ্রাম প্রতীক: Single oval' : 'ER Diagram notation: Single oval.'}
            </div>

            <div className="flex justify-center items-center py-4">
              <div className="px-8 py-2 rounded-full border-2 border-cyan-400 bg-cyan-950/30 text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                Gender
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 font-mono pt-1">
              Single oval = Simple Attribute (Indivisible)
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-amber-300">
            Examples: <code>Age = 22</code>, <code>Gender = 'Female'</code>, <code>Salary = 50000</code>
          </div>
        </div>

        {/* ========================================================
            3.2 Composite Attribute (Matching Screenshot 1)
           ======================================================== */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="font-bold text-white text-sm">3.2 Composite Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 font-mono font-bold">
              Main Oval + Sub-Ovals
            </span>
          </div>

          <div className="text-zinc-300 text-[11px] leading-relaxed">
            <DualText
              en="A composite attribute can be divided into smaller meaningful sub-attributes."
              bn="যে অ্যাট্রিবিউটকে একাধিক অর্থপূর্ণ ক্ষুদ্র উপ-অংশে ভাগ করা সম্ভব, তাকে কম্পোজিট বা যৌগিক অ্যাট্রিবিউট বলা হয়।"
            />
          </div>

          {/* Reference Diagram Box: Composite Attribute (Name) */}
          <div className="p-5 rounded-2xl bg-[#03060f] border border-slate-800 text-center space-y-3 shadow-inner">
            <div className="text-[11px] font-mono font-bold text-zinc-300 text-left border-b border-slate-800/80 pb-1.5">
              {language === 'bn' ? 'কম্পোজিট অ্যাট্রিবিউট: Name' : 'Composite Attribute: Name'}
            </div>

            <div className="py-2 flex flex-col items-center space-y-1.5">
              {/* Main Attribute Oval */}
              <div className="px-8 py-2 rounded-full border-2 border-emerald-500 bg-emerald-950/40 text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                Name
              </div>

              {/* Connecting Down Arrow */}
              <div className="text-emerald-400 font-bold text-base my-0.5">&darr;</div>

              {/* Sub-Attribute Leaves */}
              <div className="flex justify-between items-center w-full max-w-sm px-2 text-xs font-mono text-zinc-200">
                <span className="px-2 py-1 rounded bg-[#0c1020] border border-slate-800 text-zinc-300">
                  First Name
                </span>
                <span className="px-2 py-1 rounded bg-[#0c1020] border border-slate-800 text-zinc-300">
                  Middle Name
                </span>
                <span className="px-2 py-1 rounded bg-[#0c1020] border border-slate-800 text-zinc-300">
                  Last Name
                </span>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 font-mono pt-1">
              Branches into meaningful sub-components
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-0.5">
            <div>Address &rarr; [ House_No, Street, City, Postal_Code ]</div>
          </div>
        </div>

        {/* ========================================================
            3.3 Single-Valued & Key Attribute
           ======================================================== */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="font-bold text-white text-sm">3.3 Single-Valued &amp; Key Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-black/50 text-amber-300 border border-amber-800 font-mono font-bold">
              Underlined Text
            </span>
          </div>

          <div className="text-zinc-300 text-[11px] leading-relaxed">
            <DualText
              en="Has strictly one value for each entity. When it uniquely identifies the entity, it becomes the Primary Key (underlined)."
              bn="প্রতিটি সত্তার জন্য কেবল একটি মান থাকে। যখন এটি সত্তাকে অনন্যভাবে শনাক্ত করে, তখন এটি প্রাইমারি কি হিসেবে আন্ডারলাইন করা হয়।"
            />
          </div>

          {/* Reference Diagram Box: Key Attribute */}
          <div className="p-5 rounded-2xl bg-[#03060f] border border-slate-800 text-center space-y-3 shadow-inner">
            <div className="text-[11px] font-mono font-bold text-zinc-300 text-left border-b border-slate-800/80 pb-1.5">
              {language === 'bn' ? 'ইআর ডায়াগ্রাম প্রতীক: Underlined text in oval' : 'ER Diagram notation: Underlined text in oval.'}
            </div>

            <div className="flex justify-center items-center py-4">
              <div className="px-8 py-2 rounded-full border-2 border-amber-400 bg-amber-950/30 text-amber-200 font-mono font-bold text-sm shadow-[0_0_15px_rgba(251,191,36,0.25)]">
                <u>Student_ID</u>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 font-mono pt-1">
              Underlined text = Key Attribute (Primary Key)
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-indigo-300">
            Examples: <code>Student_ID = '101'</code>, <code>Date_of_Birth = '2004-05-12'</code>
          </div>
        </div>

        {/* ========================================================
            3.4 Multivalued Attribute (Matching Screenshot 2)
           ======================================================== */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="font-bold text-white text-sm">3.4 Multivalued Attribute</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700 font-mono font-bold">
              (( Double Oval ))
            </span>
          </div>

          <div className="text-zinc-300 text-[11px] leading-relaxed">
            <DualText
              en="An attribute that can have multiple values for a single entity instance (e.g. multiple phone numbers)."
              bn="যে অ্যাট্রিবিউটের একটি নির্দিষ্ট এনটিটির জন্য একাধিক মান থাকতে পারে (যেমন: এক শিক্ষার্থীর একাধিক ফোন নম্বর)।"
            />
          </div>

          {/* Reference Diagram Box: Double Oval (Exact Screenshot 2) */}
          <div className="p-5 rounded-2xl bg-[#03060f] border border-slate-800 text-center space-y-3 shadow-inner">
            <div className="text-[11px] font-mono font-bold text-zinc-300 text-left border-b border-slate-800/80 pb-1.5">
              {language === 'bn' ? 'ইআর ডায়াগ্রাম প্রতীক: Double oval' : 'ER Diagram notation: Double oval.'}
            </div>

            {/* Pristine Double Oval matching Screenshot 2 */}
            <div className="flex justify-center items-center py-4">
              <div className="p-1 rounded-full border-2 border-emerald-500 bg-transparent inline-block shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                <div className="px-8 py-2 rounded-full border border-emerald-400 bg-emerald-950/40 text-white font-mono font-bold text-sm">
                  Phone Number
                </div>
              </div>
            </div>

            <div className="text-[11px] text-zinc-300 font-sans pt-1">
              Double oval = Multivalued Attribute
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-emerald-300">
            Examples: <code>Phone_Numbers</code>, <code>Email_Addresses</code>, <code>Skills</code>
          </div>
        </div>
      </div>

      {/* ========================================================
          3.5 Derived Attribute (Matching Screenshot 3 + Simulator)
         ======================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121526] via-[#101426] to-[#0c0e18] border border-amber-800/40 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm md:text-base font-mono">
              3.5 Derived Attribute (Dashed Oval &amp; Interactive Simulator)
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-600/50 text-[10px] font-mono font-bold w-fit">
            - - Dashed Oval (ভাঙা দাগের ওভাল) - -
          </span>
        </div>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="A derived attribute is not stored directly in the database. Instead, its value is calculated dynamically from another attribute whenever requested. Example: Age can be derived from Date_of_Birth and current year (2026)."
            bn="ডিরাইভড অ্যাট্রিবিউট সরাসরি টেবিলে স্টোর করা হয় না। বরং অন্য কোনো সংরক্ষিত অ্যাট্রিবিউট থেকে প্রয়োজন অনুযায়ী তাৎক্ষণিকভাবে গণনা করা হয়। উদাহরণ: Date_of_Birth এবং বর্তমান বছর (২০২৬) থেকে Age স্বয়ংক্রিয়ভাবে হিসাব করা যায়।"
          />
        </div>

        {/* Reference Diagram Box: Dashed Oval (Exact Screenshot 3) */}
        <div className="p-5 rounded-2xl bg-[#03060f] border border-slate-800 text-center space-y-3 shadow-inner">
          <div className="text-[11px] font-mono font-bold text-zinc-300 text-left border-b border-slate-800/80 pb-1.5">
            {language === 'bn' ? 'ইআর ডায়াগ্রাম প্রতীক: Dashed oval' : 'ER Diagram notation: Dashed oval.'}
          </div>

          {/* Pristine Dashed Oval matching Screenshot 3 */}
          <div className="flex justify-center items-center py-4">
            <div className="px-10 py-2.5 rounded-full border-2 border-dashed border-amber-500 bg-amber-950/30 text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              Age
            </div>
          </div>

          <div className="text-[11px] text-zinc-300 font-sans pt-1">
            Dashed oval = Derived Attribute
          </div>
        </div>

        {/* Live Simulator Widget */}
        <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">
              {language === 'bn' ? 'সংরক্ষিত অ্যাট্রিবিউট (Date of Birth Year):' : 'Stored Attribute (Birth Year):'}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1950"
                max="2026"
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value) || 2004)}
                className="w-24 bg-[#14182a] border border-amber-700/60 rounded px-2.5 py-1 text-center text-white text-xs font-bold focus:outline-none focus:border-amber-400"
              />
              <span className="text-zinc-500 text-[10px]">Year</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {language === 'bn' ? 'ডিরাইভড অ্যাট্রিবিউট (Age in 2026):' : 'Derived Attribute (Age in 2026):'}
            </span>
            <div className="px-3 py-1 rounded-lg bg-amber-950 border border-amber-500 text-amber-200 font-bold text-sm">
              {calculatedAge} {language === 'bn' ? 'বছর' : 'years old'}
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 font-sans italic">
            Formula: <code>Age = 2026 - Date_of_Birth</code>
          </div>
        </div>
      </div>

      {/* Attribute Types: Exam Revision Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            {language === 'bn' ? 'অ্যাট্রিবিউট প্রকারভেদ: পরীক্ষার রিভিশন টেবিল' : 'Attribute types: Exam revision table'}
          </span>
          <span className="text-[10px] font-mono text-zinc-400">Must Memorize</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                <th className="py-2.5 px-4">{language === 'bn' ? 'প্রকারভেদ' : 'Attribute Type'}</th>
                <th className="py-2.5 px-4">{language === 'bn' ? 'অর্থ ও বৈশিষ্ট্য' : 'Meaning'}</th>
                <th className="py-2.5 px-4 text-center">{language === 'bn' ? 'ইআর প্রতীক' : 'ER Notation'}</th>
                <th className="py-2.5 px-4">{language === 'bn' ? 'উদাহরণ' : 'Examples'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300 font-sans">
              {attributeExamTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                  <td className="py-3 px-4 font-bold text-amber-300 font-mono">
                    {language === 'bn' ? row.typeBn : row.typeEn}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {language === 'bn' ? row.meaningBn : row.meaningEn}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-cyan-300">
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-800">
                      {language === 'bn' ? row.notationBn : row.notationEn}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-400">
                    {language === 'bn' ? row.exampleBn : row.exampleEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Important Classification Note */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 font-sans leading-relaxed">
          <strong className="text-amber-300 font-mono block mb-0.5">
            {language === 'bn' ? '💡 গুরুত্বপূর্ণ কনসেপচুয়াল পয়েন্ট:' : '💡 Important Conceptual Distinction:'}
          </strong>
          <DualText
            en="Simple vs Composite classifies whether an attribute can be broken down into sub-parts. Single-valued vs Multivalued classifies how many values it can hold. Derived classifies how its value is obtained. These are orthogonal ways of categorizing attributes!"
            bn="সিম্পল বনাম কম্পোজিট নির্দেশ করে অ্যাট্রিবিউটকে ভাগ করা যায় কি না। সিঙ্গল বনাম মাল্টিভ্যালুড নির্দেশ করে একটি এনটিটিতে কতটি মান বসতে পারে। আর ডিরাইভড নির্দেশ করে মানটি কীভাবে তৈরি হচ্ছে। এগুলো অ্যাট্রিবিউটকে শ্রেণীবদ্ধ করার ভিন্ন ভিন্ন দৃষ্টিকোণ!"
          />
        </div>
      </div>
    </section>
  );
}
