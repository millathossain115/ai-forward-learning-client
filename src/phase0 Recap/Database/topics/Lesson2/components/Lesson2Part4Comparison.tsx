'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson2Part4Comparison() {
  const { language } = useLanguage();

  const rows = [
    {
      model: 'Flat File',
      enStructure: 'Single file (.csv, .tsv)',
      bnStructure: 'একক ফাইল (.csv, .tsv)',
      enChar: 'Simple tabular records, zero foreign keys',
      bnChar: 'সহজ টেবুলার রেকর্ড, কোনো ফরেন কি বা লিঙ্ক নেই',
      example: 'Excel, CSV',
      isHighlight: false,
    },
    {
      model: 'Hierarchical',
      enStructure: 'Tree structure (বৃক্ষ কাঠামো)',
      bnStructure: 'বৃক্ষ কাঠামো (Tree structure)',
      enChar: '1 parent to multiple children (1:N)',
      bnChar: '১টি প্যারেন্টের একাধিক চাইল্ড, কিন্তু চাইল্ডের ১টিই প্যারেন্ট',
      example: 'IBM IMS, Windows Registry',
      isHighlight: false,
    },
    {
      model: 'Network',
      enStructure: 'Graph of linked records',
      bnStructure: 'আন্তঃসংযুক্ত নোড ও লিঙ্ক',
      enChar: 'Multiple parents and children (M:N)',
      bnChar: 'একাধিক প্যারেন্ট ও একাধিক চাইল্ড (M:N সম্পর্ক)',
      example: 'IDMS, CODASYL',
      isHighlight: false,
    },
    {
      model: 'Relational',
      enStructure: 'Tables (Relations)',
      bnStructure: 'দ্বিমাত্রিক টেবিল (রিলেশন)',
      enChar: 'Rows, columns, Primary & Foreign Keys',
      bnChar: 'সারি, কলাম, প্রাইমারি কি ও ফরেন কি যোগসূত্র',
      example: 'PostgreSQL, MySQL, Oracle',
      isHighlight: true,
    },
    {
      model: 'Object-Oriented',
      enStructure: 'OOP Objects',
      bnStructure: 'অবজেক্ট ও ক্লাস',
      enChar: 'Attributes combined with callable methods',
      bnChar: 'ডেটা ও ফাংশন একই সাথে ক্যাপসুলে সংরক্ষিত',
      example: 'db4o, ObjectDB',
      isHighlight: false,
    },
    {
      model: 'NoSQL',
      enStructure: 'JSON, KV, Columns, Graphs',
      bnStructure: 'JSON ডকুমেন্ট, কি-ভ্যালু, গ্রাফ, কলাম',
      enChar: 'Schema-less, horizontally distributed',
      bnChar: 'নমনীয় স্কিমা, ক্লাউড স্কেলিং ও অত্যন্ত দ্রুতগতি',
      example: 'MongoDB, Redis, Neo4j, Cassandra',
      isHighlight: false,
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৪ / ৫' : 'Part 4 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Comparing All 6 Database Models"
              bn="৬টি ডেটাবেস মডেলের তুলনামূলক বিশ্লেষণ"
            />
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
              <th className="py-2.5 px-4 font-bold text-indigo-400">
                {language === 'bn' ? 'মডেল (Model)' : 'Model'}
              </th>
              <th className="py-2.5 px-4 font-bold text-amber-400">
                {language === 'bn' ? 'গঠন (Structure)' : 'Structure'}
              </th>
              <th className="py-2.5 px-4 font-bold text-white">
                {language === 'bn' ? 'প্রধান বৈশিষ্ট্য (Key Feature)' : 'Main Characteristic'}
              </th>
              <th className="py-2.5 px-4 font-bold text-cyan-400">
                {language === 'bn' ? 'উদাহরণ (Example)' : 'Primary Example'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-zinc-300">
            {rows.map((row, idx) => (
              <tr key={idx} className={row.isHighlight ? 'bg-indigo-950/20 font-semibold' : ''}>
                <td className={`py-2.5 px-4 font-bold ${row.isHighlight ? 'text-indigo-300' : 'text-white'}`}>
                  {row.model}
                </td>
                <td className={`py-2.5 px-4 ${row.isHighlight ? 'text-indigo-300' : ''}`}>
                  {language === 'bn' ? row.bnStructure : row.enStructure}
                </td>
                <td className={`py-2.5 px-4 ${row.isHighlight ? 'text-indigo-200' : ''}`}>
                  {language === 'bn' ? row.bnChar : row.enChar}
                </td>
                <td className="py-2.5 px-4 text-cyan-300 font-bold">
                  {row.example}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
