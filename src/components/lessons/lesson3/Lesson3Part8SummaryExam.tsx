'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Building2,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Columns3,
  Rows3,
  Table as TableIcon,
  ShieldCheck,
  Layers,
  Sparkles,
  HelpCircle,
  Hash,
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson3Part8SummaryExamProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson3Part8SummaryExam({ onNavigate }: Lesson3Part8SummaryExamProps) {
  const { language } = useLanguage();

  // Part 12: Visual Summary Panel Highlight State
  const [activeHighlight, setActiveHighlight] = useState<
    'all' | 'degree' | 'cardinality' | 'tuple' | 'attribute' | 'domain'
  >('degree');

  const [expandedExamQuestions, setExpandedExamQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  const toggleExamQuestion = (id: number) => {
    setExpandedExamQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const examQuestions = [
    {
      id: 1,
      qEn: 'Q1. Define a relation in database terms.',
      qBn: 'প্রশ্ন ১: রিলেশনাল ডেটাবেসে রিলেশন (Relation) কাকে বলে?',
      aEn: 'A relation is a two-dimensional mathematical structure consisting of named columns (attributes) and horizontal rows (tuples) representing data about a particular entity or subject.',
      aBn: 'রিলেশন হলো একটি দ্বিমাত্রিক গাণিতিক টেবিল যা নামযুক্ত উলম্ব কলাম (অ্যাট্রিবিউট) এবং অনুভূমিক সারি (টাপল) নিয়ে গঠিত এবং কোনো নির্দিষ্ট বিষয় বা সত্তার তথ্য উপস্থাপন করে।',
    },
    {
      id: 2,
      qEn: 'Q2. What is a tuple?',
      qBn: 'প্রশ্ন ২: টাপল (Tuple) কী?',
      aEn: 'A tuple is a single row or record in a relational database table that contains specific values corresponding to each attribute in that relation.',
      aBn: 'একটি রিলেশনাল টেবিলের প্রতিটি একক সারি বা রেকর্ডকে টাপল বলে। এটি ঐ সত্তার সকল বৈশিষ্ট্যের সুনির্দিষ্ট মান ধারণ করে।',
    },
    {
      id: 3,
      qEn: 'Q3. What is an attribute?',
      qBn: 'প্রশ্ন ৩: অ্যাট্রিবিউট (Attribute) বলতে কী বোঝায়?',
      aEn: 'An attribute is a named property, characteristic, or field of an entity, represented by a column in a relational table.',
      aBn: 'অ্যাট্রিবিউট হলো কোনো এনটিটি বা সত্তার নামযুক্ত সুনির্দিষ্ট বৈশিষ্ট্য বা ফিল্ড, যা রিলেশনাল টেবিলে উলম্ব কলাম আকারে থাকে।',
    },
    {
      id: 4,
      qEn: 'Q4. Define domain in relational databases.',
      qBn: 'প্রশ্ন ৪: রিলেশনাল ডেটাবেসে ডোমেইন (Domain) বলতে কী বোঝায়?',
      aEn: 'A domain is the set of all permissible, valid atomic values that an attribute is allowed to hold (e.g. CGPA domain: 0.00 to 4.00; Age: positive integers).',
      aBn: 'ডোমেইন হলো কোনো নির্দিষ্ট অ্যাট্রিবিউটের জন্য গ্রহণযোগ্য বা অনুমোদিত বৈধ ও অবিভাজ্য মানের সেট (যেমন: সিজিপিএ ডোমেইন: ০.০০ থেকে ৪.০০; বয়স: ধনাত্মক পূর্ণসংখ্যা)।',
    },
    {
      id: 5,
      qEn: 'Q5. What is a relational schema?',
      qBn: 'প্রশ্ন ৫: রিলেশনাল স্কিমা (Relational Schema) কী?',
      aEn: 'A relational schema defines the logical blueprint or design of a relation, specifying its relation name, attribute names, data types, and integrity constraints without any actual data records.',
      aBn: 'রিলেশনাল স্কিমা হলো কোনো টেবিলের যৌক্তিক নকশা বা ব্লুপ্রিন্ট, যা টেবিলের নাম, কলামসমূহের নাম, তাদের ডেটা টাইপ ও শর্ত নির্ধারণ করে, যাতে কোনো বাস্তব ডেটা থাকে না।',
    },
    {
      id: 6,
      qEn: 'Q6. Differentiate between relational schema and relational instance.',
      qBn: 'প্রশ্ন ৬: রিলেশনাল স্কিমা ও রিলেশনাল ইনস্ট্যান্সের মধ্যকার মূল পার্থক্য লিখুন।',
      aEn: 'Schema is the static structural design (like a blank application form) that changes very rarely. Instance is the actual snapshot of records stored in the relation at a given moment in time (like completed forms), which changes frequently.',
      aBn: 'স্কিমা হলো টেবিলের স্থায়ী কাঠামোগত ব্লুপ্রিন্ট (যেমন: খালি আবেদনপত্র) যা কদাচিৎ পরিবর্তিত হয়। আর ইনস্ট্যান্স হলো নির্দিষ্ট মুহূর্তে টেবিলে রক্ষিত বাস্তব ডেটার স্ন্যাপশট (যেমন: পূরণ করা আবেদনপত্র), যা ডেটা যোগ বা পরিবর্তনের সাথে প্রতিনিয়ত পরিবর্তিত হয়।',
    },
    {
      id: 7,
      qEn: 'Q7. What is degree of a relation?',
      qBn: 'প্রশ্ন ৭: একটি রিলেশনের ডিগ্রি (Degree / Arity) কী?',
      aEn: 'Degree (also called arity) is the total number of attributes (columns) present in a relation.',
      aBn: 'একটি রিলেশন বা টেবিলে মোট যতগুলো কলাম বা অ্যাট্রিবিউট থাকে, তাকে ঐ রিলেশনের ডিগ্রি (Degree) বা অ্যারাইটি (Arity) বলে।',
    },
    {
      id: 8,
      qEn: 'Q8. What is cardinality of a relation?',
      qBn: 'প্রশ্ন ৮: একটি রিলেশনের কার্ডিনালিটি (Cardinality) কী?',
      aEn: 'Cardinality is the total number of tuples (rows) currently stored in a relation.',
      aBn: 'একটি রিলেশন বা টেবিলে নির্দিষ্ট সময়ে মোট যতগুলো রেকর্ড বা সারি জমা থাকে, তাকে তার কার্ডিনালিটি (Cardinality) বলে।',
    },
  ];

  return (
    <div className="space-y-10">
      {/* ========================================================
          PART 12: LET'S PUT EVERYTHING TOGETHER (MASTER VOCAB)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পর্ব ১২ / ১৩' : 'Part 12 of 13'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Summary Vocabulary Map (Master Breakdown)"
                bn="একনজরে রিলেশনাল মডেলের মাস্টার সামারি (Master Breakdown)"
              />
            </h2>
          </div>
        </div>

        {/* Master Breakdown Table: Employee Relation */}
        <div className="p-5 md:p-6 rounded-2xl bg-[#14182e] border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <DualText
                  en="EMPLOYEE RELATION ANALYSIS & VISUAL SUMMARY PANEL:"
                  bn="EMPLOYEE রিলেশন বিশ্লেষণ ও ইন্টারেক্টিভ ভিজ্যুয়াল সামারি প্যানেল:"
                />
              </h4>
              <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                {language === 'bn'
                  ? 'নিচের বোতামগুলোতে ক্লিক করে টেবিলে ডিগ্রি, কার্ডিনালিটি ও অ্যাট্রিবিউটের প্রভাব সরাসরি দেখুন:'
                  : 'Click the filters below to highlight Degree, Cardinality, Tuples, and Attributes directly on the table:'}
              </span>
            </div>

            {/* Interactive Highlight Controller Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', labelEn: 'All Overview', labelBn: 'সামগ্রিক ভিউ' },
                { id: 'degree', labelEn: 'Degree (4 Cols)', labelBn: 'ডিগ্রি (৪ কলাম)' },
                { id: 'cardinality', labelEn: 'Cardinality (3 Rows)', labelBn: 'কার্ডিনালিটি (৩ সারি)' },
                { id: 'attribute', labelEn: 'Attributes', labelBn: 'অ্যাট্রিবিউটসমূহ' },
                { id: 'tuple', labelEn: 'Tuples', labelBn: 'টাপলসমূহ' },
                { id: 'domain', labelEn: 'Domains', labelBn: 'ডোমেইন সীমা' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveHighlight(pill.id as typeof activeHighlight)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-all ${
                    activeHighlight === pill.id
                      ? 'bg-emerald-500 text-black shadow-md font-bold'
                      : 'bg-[#0c0e18] border border-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? pill.labelBn : pill.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Bracket Top: Degree Indicator */}
          <div
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              activeHighlight === 'degree' || activeHighlight === 'attribute'
                ? 'bg-pink-950/40 border-pink-500/60 text-pink-200 ring-1 ring-pink-500/30'
                : 'bg-[#0c0e18] border-slate-800 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Columns3 className="w-4 h-4 text-pink-400 shrink-0" />
              <span className="font-bold text-white">
                {language === 'bn' ? 'অনুভূমিক বিস্তার (Horizontal Span) ➔ ডিগ্রি (Degree):' : 'Horizontal Span ➔ Degree (Columns Count):'}
              </span>
            </div>
            <span className="font-mono text-pink-300 font-bold">
              {language === 'bn' ? '৪টি কলাম (Employee_ID, Name, Age, Salary) ➔ Degree = 4' : '4 Columns Total ➔ Degree = 4'}
            </span>
          </div>

          {/* Visual Table with Cardinality Left Guides */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                  <th className="py-2.5 px-3 text-zinc-500 text-center w-20 border-r border-slate-800/60">
                    {language === 'bn' ? 'টাপল নম্বর' : 'Tuple #'}
                  </th>
                  <th
                    className={`py-2.5 px-4 transition-colors ${
                      activeHighlight === 'degree' || activeHighlight === 'attribute'
                        ? 'bg-pink-950/40 text-pink-300 font-extrabold'
                        : 'text-amber-400'
                    }`}
                  >
                    Employee_ID
                    <span className="block text-[9px] font-normal text-zinc-500">[PK: VARCHAR(10)]</span>
                  </th>
                  <th
                    className={`py-2.5 px-4 transition-colors ${
                      activeHighlight === 'degree' || activeHighlight === 'attribute'
                        ? 'bg-pink-950/40 text-pink-300 font-extrabold'
                        : 'text-cyan-400'
                    }`}
                  >
                    Name
                    <span className="block text-[9px] font-normal text-zinc-500">[VARCHAR(50)]</span>
                  </th>
                  <th
                    className={`py-2.5 px-4 transition-colors ${
                      activeHighlight === 'degree' || activeHighlight === 'attribute'
                        ? 'bg-pink-950/40 text-pink-300 font-extrabold'
                        : 'text-purple-400'
                    }`}
                  >
                    Age
                    <span className="block text-[9px] font-normal text-zinc-500">[INT (18-65)]</span>
                  </th>
                  <th
                    className={`py-2.5 px-4 text-right transition-colors ${
                      activeHighlight === 'degree' || activeHighlight === 'attribute'
                        ? 'bg-pink-950/40 text-pink-300 font-extrabold'
                        : 'text-emerald-400'
                    }`}
                  >
                    Salary
                    <span className="block text-[9px] font-normal text-zinc-500">[DECIMAL (&gt;0)]</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                {[
                  { tupleNum: 1, id: 'E01', name: 'Rahim', age: 25, salary: '30,000' },
                  { tupleNum: 2, id: 'E02', name: 'Karim', age: 28, salary: '35,000' },
                  { tupleNum: 3, id: 'E03', name: 'Nila', age: 24, salary: '32,000' },
                ].map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      activeHighlight === 'cardinality' || activeHighlight === 'tuple'
                        ? 'bg-indigo-950/30 ring-1 ring-inset ring-indigo-500/30'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center border-r border-slate-800/60 text-indigo-400 font-bold bg-[#101322]">
                      Tuple {row.tupleNum}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-amber-300">{row.id}</td>
                    <td className="py-2.5 px-4 text-white font-sans">{row.name}</td>
                    <td className="py-2.5 px-4 text-purple-300">
                      {row.age}
                      {activeHighlight === 'domain' && (
                        <span className="ml-1 text-[9px] text-emerald-400">✓ In range</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right text-emerald-400 font-bold">
                      {row.salary}
                      {activeHighlight === 'domain' && (
                        <span className="ml-1 text-[9px] text-emerald-400">✓ Valid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dimension Bracket Bottom: Cardinality Indicator */}
          <div
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              activeHighlight === 'cardinality' || activeHighlight === 'tuple'
                ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200 ring-1 ring-indigo-500/30'
                : 'bg-[#0c0e18] border-slate-800 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Rows3 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-bold text-white">
                {language === 'bn' ? 'উলম্ব গভীরতা (Vertical Depth) ➔ কার্ডিনালিটি (Cardinality):' : 'Vertical Depth ➔ Cardinality (Rows Count):'}
              </span>
            </div>
            <span className="font-mono text-indigo-300 font-bold">
              {language === 'bn' ? '৩টি সম্পূর্ণ রেকর্ড ➔ Cardinality = 3' : '3 Total Recorded Tuples ➔ Cardinality = 3'}
            </span>
          </div>

          {/* Contextual Educational Deep-Dive Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/30 via-slate-900 to-purple-950/20 border border-slate-800 text-xs font-sans text-zinc-300 space-y-1">
            <span className="font-mono font-bold text-amber-300 uppercase text-[11px] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {activeHighlight === 'degree' && (language === 'bn' ? 'ডিগ্রি (Degree) কী মনে রাখবেন:' : 'Key Takeaway: Degree')}
              {activeHighlight === 'cardinality' && (language === 'bn' ? 'কার্ডিনালিটি (Cardinality) কী মনে রাখবেন:' : 'Key Takeaway: Cardinality')}
              {activeHighlight === 'attribute' && (language === 'bn' ? 'অ্যাট্রিবিউট (Attribute) কী মনে রাখবেন:' : 'Key Takeaway: Attributes')}
              {activeHighlight === 'tuple' && (language === 'bn' ? 'টাপল (Tuple) কী মনে রাখবেন:' : 'Key Takeaway: Tuples')}
              {activeHighlight === 'domain' && (language === 'bn' ? 'ডোমেইন (Domain) কী মনে রাখবেন:' : 'Key Takeaway: Domains')}
              {activeHighlight === 'all' && (language === 'bn' ? 'মাস্টার সামারি মূল ধারণা:' : 'Key Takeaway: Master Summary')}
            </span>
            <div className="text-[11px] leading-relaxed text-zinc-300">
              {activeHighlight === 'degree' && (
                <DualText
                  en="Degree is the number of attributes (columns). Notice that even if all rows are deleted, Degree remains 4 because the schema columns do not change."
                  bn="ডিগ্রি হলো কলামের মোট সংখ্যা। মনে রাখবেন, টেবিলের সব রো মুছে দিলেও ডিগ্রি ৪-ই থাকবে, কারণ স্কিমার কলাম মুছে যায় না।"
                />
              )}
              {activeHighlight === 'cardinality' && (
                <DualText
                  en="Cardinality is the dynamic count of tuples (rows). It changes every time an employee is hired (inserted) or resigns (deleted)."
                  bn="কার্ডিনালিটি হলো সংরক্ষিত সারির লাইভ সংখ্যা। নতুন কর্মী যোগ হলে এটি বাড়বে, আর পদত্যাগ করলে এটি কমবে।"
                />
              )}
              {activeHighlight === 'attribute' && (
                <DualText
                  en="Each attribute represents a distinct named entity property. No two attributes can have duplicate names within the same table."
                  bn="প্রতিটি অ্যাট্রিবিউট সত্তার একটি সুনির্দিষ্ট বৈশিষ্ট্য প্রকাশ করে। একই টেবিলে দুটি কলামের নাম কখনোই এক হতে পারে না।"
                />
              )}
              {activeHighlight === 'tuple' && (
                <DualText
                  en="A tuple is a single atomic record representing one entire employee entity with all their attribute values together."
                  bn="একটি টাপল হলো একজন কর্মীর সমস্ত তথ্যের অবিভাজ্য একক অনুভূমিক রেকর্ড।"
                />
              )}
              {activeHighlight === 'domain' && (
                <DualText
                  en="Every cell must strictly satisfy its attribute's domain. For example, Age cannot be negative or text, and Salary must be greater than zero."
                  bn="প্রতিটি ঘরকে অবশ্যই তার কলামের ডোমেইন মানতে হবে। যেমন: বয়স কখনোই ঋণাত্মক বা টেক্সট হতে পারবে না।"
                />
              )}
              {activeHighlight === 'all' && (
                <DualText
                  en="In this EMPLOYEE relation, Degree = 4 (fixed columns) and Cardinality = 3 (current stored records). Keys distinguish duplicate names."
                  bn="এই EMPLOYEE টেবিলে ডিগ্রি = ৪ (স্থায়ী কলাম) এবং কার্ডিনালিটি = ৩ (বর্তমান সংরক্ষিত রেকর্ড)।"
                />
              )}
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'রিলেশনের নাম (Table)' : 'Relation Name'}
              </span>
              <span className="text-white font-bold">EMPLOYEE</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'ডিগ্রি (কলাম সংখ্যা)' : 'Degree (Columns)'}
              </span>
              <span className="text-pink-400 font-bold">
                {language === 'bn' ? '৪টি কলাম (Attributes)' : '4 Attributes'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'কার্ডিনালিটি (সারি সংখ্যা)' : 'Cardinality (Rows)'}
              </span>
              <span className="text-indigo-400 font-bold">
                {language === 'bn' ? '৩টি সারি (Tuples)' : '3 Tuples'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'নমুনা টাপল' : 'Sample Tuple'}
              </span>
              <span className="text-emerald-300 font-bold">E01, Rahim, 25</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 13: UNIVERSITY EXAM PREPARATION (Q&A STUDY GUIDE)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পর্ব ১৩ / ১৩' : 'Part 13 of 13'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="University Exam Preparation (Short & Long Q&A)"
                bn="বিশ্ববিদ্যালয় পরীক্ষার প্রশ্নোত্তর ও প্রস্তুতি গাইড"
              />
            </h2>
          </div>
        </div>

        <div className="text-xs text-zinc-400 font-sans">
          <DualText
            en="Click on each question to review the concise, high-scoring university examination answers:"
            bn="পরীক্ষায় সর্বোচ্চ নম্বর পাওয়ার উপযোগী সংক্ষিপ্ত ও নির্ভুল উত্তর দেখতে প্রতিটি প্রশ্নে ক্লিক করুন:"
          />
        </div>

        {/* 8 Short Exam Questions Accordion */}
        <div className="space-y-3">
          {examQuestions.map((item) => {
            const isExpanded = expandedExamQuestions[item.id];

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-[#121526] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExamQuestion(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs md:text-sm font-bold text-white font-sans">
                    {language === 'bn' ? item.qBn : item.qEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-slate-800/60 bg-black/30">
                    <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
                      {language === 'bn' ? item.aBn : item.aEn}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Descriptive Exam Topics Box */}
        <div className="p-4 rounded-xl bg-[#14182e] border border-slate-800 space-y-2 text-xs font-sans">
          <span className="font-bold text-amber-300 font-mono uppercase block">
            <DualText
              en="Long Descriptive Questions to Practice for Exams (5–10 Marks):"
              bn="পরীক্ষার জন্য বড় বর্ণনামূলক প্রশ্নসমূহ (৫–১০ নম্বর):"
            />
          </span>
          <ul className="list-disc list-inside text-zinc-300 space-y-1 text-[11px] leading-relaxed">
            <li>
              {language === 'bn'
                ? 'একটি উপযুক্ত বিশ্ববিদ্যালয়ের উদাহরণসহ রিলেশনাল ডেটাবেস মডেল ব্যাখ্যা করুন।'
                : 'Explain the relational database model with a suitable university example.'}
            </li>
            <li>
              {language === 'bn'
                ? 'বাস্তব জীবনের উদাহরণসহ রিলেশন, টাপল এবং অ্যাট্রিবিউটের মধ্যকার পার্থক্য বর্ণনা করুন।'
                : 'Differentiate between relation, tuple, and attribute with real-world scenarios.'}
            </li>
            <li>
              {language === 'bn'
                ? 'একটি আদর্শ রিলেশনাল টেবিলের ৭টি মৌলিক বৈশিষ্ট্য বিস্তারিত লিখুন।'
                : 'Explain the 7 core properties of a relational table.'}
            </li>
            <li>
              {language === 'bn'
                ? 'NULL কী? NULL, শূন্য (০) এবং ফাঁকা স্ট্রিং (“”)-এর মধ্যে পার্থক্য স্পষ্টভাবে ব্যাখ্যা করুন।'
                : 'What is NULL? Differentiate clearly between NULL, zero (0), and empty string (“”).'}
            </li>
          </ul>
        </div>

        {/* Bottom Roadmap Bridge Navigation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              {language === 'bn' ? 'লেসন ৩ সম্পন্ন' : 'Lesson 3 Completed'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              {language === 'bn' ? '✓ রিলেশনাল ভিত্তি দৃঢ় হলো' : '✓ Relational Foundations Solidified'}
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            <DualText
              en="What's Next: Keys and Relational Constraints"
              bn="পরবর্তী ধাপ: ডিবিএমএস-এ কি (Keys) এবং কনস্ট্রেইন্ট"
            />
          </h3>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Now that you thoroughly understand relations, tuples, attributes, schemas, domains, degree, and cardinality, you are fully equipped for Lesson 4: Super Key, Candidate Key, Primary Key, and Foreign Key!"
              bn="এখন যেহেতু আপনি রিলেশন, টাপল, অ্যাট্রিবিউট, স্কিমা, ডোমেইন, ডিগ্রি ও কার্ডিনালিটি সম্পূর্ণ আত্মস্থ করেছেন, আপনি প্রস্তুত লেসন ৪-এর জন্য: সুপার কি, ক্যান্ডিডেট কি, প্রাইমারি কি এবং ফরেন কি!"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson2')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'লেসন ২-এ ফিরে যান' : 'Back to Lesson 2'}</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson4')}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              <span>
                {language === 'bn' ? 'লেসন ৪-এ যান: Keys in DBMS' : 'Go to Lesson 4: Keys in DBMS'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
