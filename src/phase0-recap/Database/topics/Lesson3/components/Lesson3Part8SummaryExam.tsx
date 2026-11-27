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

  const [expandedExamQuestions, setExpandedExamQuestions] = useState<Record<number, boolean>>({});

  const toggleExamQuestion = (id: number) => {
    setExpandedExamQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const interviewQuestions = [
    {
      id: 1,
      qEn: 'Q1. Schema vs Instance: which changes on ALTER TABLE vs INSERT?',
      qBn: 'প্রশ্ন ১: Schema বনাম Instance — ALTER TABLE এবং INSERT-এ কোনটি পরিবর্তিত হয়?',
      aEn: 'ALTER TABLE modifies the Relational Schema (column definitions/constraints). INSERT, UPDATE, and DELETE modify the Relational Instance (the live rows) while the Schema stays unchanged.',
      aBn: 'ALTER TABLE রিলেশনাল স্কিমা (কলাম বা কনস্ট্রেইন্ট) পরিবর্তন করে। আর INSERT, UPDATE ও DELETE স্কিমা অপরিবর্তিত রেখে কেবল রিলেশনাল ইনস্ট্যান্স (লাইভ সারি) পরিবর্তন করে।',
    },
    {
      id: 2,
      qEn: 'Q2. Why does WHERE Phone = NULL return 0 rows even when NULLs exist?',
      qBn: 'প্রশ্ন ২: টেবিলে NULL মান থাকা সত্ত্বেও WHERE Phone = NULL কেন ০টি সারি ফেরত দেয়?',
      aEn: 'Because NULL represents an unknown value, any comparison with "=" evaluates to UNKNOWN in SQL 3-valued logic (not TRUE). Always use WHERE Phone IS NULL or IS NOT NULL.',
      aBn: 'NULL একটি অজানা মান হওয়ায় "=" দিয়ে তুলনা করলে SQL-এ ফলাফল UNKNOWN আসে (TRUE নয়)। তাই সর্বদা WHERE Phone IS NULL বা IS NOT NULL ব্যবহার করতে হয়।',
    },
    {
      id: 3,
      qEn: 'Q3. How does NULL behave differently from 0 or "" in AVG() and COUNT()?',
      qBn: 'প্রশ্ন ৩: AVG() এবং COUNT()-এ NULL, 0 এবং ""-এর আচরণ কীভাবে আলাদা?',
      aEn: 'COUNT(*) counts all rows including NULLs, whereas COUNT(col) and AVG(col) skip NULLs completely. Numeric 0 is included in AVG() denominator, and "" counts as a non-NULL string (except in Oracle).',
      aBn: 'COUNT(*) NULL-সহ সব সারি গুনে, কিন্তু COUNT(col) ও AVG(col) NULL-কে সম্পূর্ণ বাদ দেয়। অন্যদিকে ০ সংখ্যাটি AVG()-এর হিসাবে যুক্ত হয় এবং "" নন-নাল স্ট্রিং হিসেবে গণ্য হয় (Oracle ব্যতীত)।',
    },
    {
      id: 4,
      qEn: 'Q4. If you run DELETE FROM Students, what happens to Degree and Cardinality?',
      qBn: 'প্রশ্ন ৪: DELETE FROM Students চালালে টেবিলের Degree এবং Cardinality-তে কী পরিবর্তন হয়?',
      aEn: 'Cardinality drops to 0 because all tuples (rows) are removed. Degree stays unchanged (e.g., 5) because the table attributes (columns) defined in the Schema remain intact.',
      aBn: 'সব সারি মুছে যাওয়ায় Cardinality ০ হয়ে যায়। কিন্তু স্কিমার কলামগুলো অক্ষুণ্ণ থাকায় Degree অপরিবর্তিত থাকে।',
    },
    {
      id: 5,
      qEn: 'Q5. What is an Atomic Value (1NF), and why are comma-separated values in a cell bad?',
      qBn: 'প্রশ্ন ৫: Atomic Value (1NF) কী এবং এক ঘরে কমা-দিয়ে একাধিক মান রাখা কেন ক্ষতিকর?',
      aEn: 'Atomic means indivisible (one value per cell). Storing "0171, 0182" in one cell violates 1NF, breaks indexing, prevents foreign key joins, and forces slow string pattern matching.',
      aBn: 'Atomic অর্থ অবিভাজ্য (প্রতি ঘরে একটিমাত্র মান)। এক ঘরে "0171, 0182" রাখলে 1NF ভঙ্গ হয়, ইনডেক্সিং ও জয়েন কাজ করে না এবং সার্চ ধীর হয়ে যায়।',
    },
    {
      id: 6,
      qEn: 'Q6. Why are duplicate tuples disallowed in the Relational Model, and how do DBMSs enforce it?',
      qBn: 'প্রশ্ন ৬: রিলেশনাল মডেলে ডুপ্লিকেট টাপল নিষিদ্ধ কেন এবং বাস্তব DBMS কীভাবে এটি নিশ্চিত করে?',
      aEn: 'In E.F. Codd’s set theory, a relation is a mathematical set (no duplicate elements, order-independent). Real SQL tables enforce uniqueness using a PRIMARY KEY or UNIQUE constraint.',
      aBn: 'ই. এফ. কডের সেট থিওরি অনুযায়ী রিলেশন একটি সেট, যেখানে ডুপ্লিকেট উপাদান থাকে না। বাস্তব DBMS-এ PRIMARY KEY বা UNIQUE কনস্ট্রেইন্ট দিয়ে এটি নিশ্চিত করা হয়।',
    },
  ];

  return (
    <div className="space-y-10">
      {/* ========================================================
          PART 8: LET'S PUT EVERYTHING TOGETHER (MASTER VOCAB)
         ======================================================== */}
      <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পর্ব ৮ / ৯' : 'Part 8 of 9'}
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
        <div className="p-5 md:p-6 rounded-2xl bg-[#14182e] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
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
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors ${
                    activeHighlight === pill.id
                      ? 'bg-emerald-500 text-black  font-bold'
                      : 'bg-[#101116] border border-white/[0.08] text-zinc-400 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? pill.labelBn : pill.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Bracket Top: Degree Indicator */}
          <div
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-colors ${
              activeHighlight === 'degree' || activeHighlight === 'attribute'
                ? 'bg-pink-950/40 border-pink-500/60 text-pink-200 ring-1 ring-pink-500/30'
                : 'bg-[#101116] border-white/[0.08] text-zinc-400'
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
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
                  <th className="py-2.5 px-3 text-zinc-500 text-center w-20 border-r border-white/[0.08]">
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
              <tbody className="divide-y divide-white/[0.08] text-zinc-300">
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
                    <td className="py-2.5 px-3 text-center border-r border-white/[0.08] text-indigo-400 font-bold bg-[#101116]">
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
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-colors ${
              activeHighlight === 'cardinality' || activeHighlight === 'tuple'
                ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200 ring-1 ring-indigo-500/30'
                : 'bg-[#101116] border-white/[0.08] text-zinc-400'
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
          <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] text-xs font-sans text-zinc-300 space-y-1">
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
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'রিলেশনের নাম (Table)' : 'Relation Name'}
              </span>
              <span className="text-white font-bold">EMPLOYEE</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'ডিগ্রি (কলাম সংখ্যা)' : 'Degree (Columns)'}
              </span>
              <span className="text-pink-400 font-bold">
                {language === 'bn' ? '৪টি কলাম (Attributes)' : '4 Attributes'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'কার্ডিনালিটি (সারি সংখ্যা)' : 'Cardinality (Rows)'}
              </span>
              <span className="text-indigo-400 font-bold">
                {language === 'bn' ? '৩টি সারি (Tuples)' : '3 Tuples'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 block">
                {language === 'bn' ? 'নমুনা টাপল' : 'Sample Tuple'}
              </span>
              <span className="text-emerald-300 font-bold">E01, Rahim, 25</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9: SELECTIVE INTERVIEW QUESTIONS ONLY
         ======================================================== */}
      <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পর্ব ৯ / ৯ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 9 of 9 • Selective Interview Q&A'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Selective Interview Questions (Relational Model)"
                bn="বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর (রিলেশনাল মডেল)"
              />
            </h2>
          </div>
        </div>

        <div className="text-xs text-zinc-400 font-sans">
          <DualText
            en="Click any question below to reveal the concise interview answer:"
            bn="উত্তর দেখতে নিচের যেকোনো প্রশ্নে ক্লিক করুন:"
          />
        </div>

        {/* 6 Selective Interview Questions Accordion (All closed by default) */}
        <div className="space-y-3">
          {interviewQuestions.map((item) => {
            const isExpanded = expandedExamQuestions[item.id];

            return (
              <div
                key={item.id}
                className="rounded-xl border border-white/[0.08] bg-[#15171e] overflow-hidden transition-colors"
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
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-white/[0.08] bg-black/30">
                    <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
                      {language === 'bn' ? item.aBn : item.aEn}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Roadmap Bridge Navigation */}
        <div className="p-6 rounded-2xl bg-[#15171e] border border-indigo-500/40 space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold">
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
              onClick={() => onNavigate?.('db-lesson2')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-colors border border-white/[0.12] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'লেসন ২-এ ফিরে যান' : 'Back to Lesson 2'}</span>
            </button>
            <button
              onClick={() => onNavigate?.('db-lesson4')}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
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
