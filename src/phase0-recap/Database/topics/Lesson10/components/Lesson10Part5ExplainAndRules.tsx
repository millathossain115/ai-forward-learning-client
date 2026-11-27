'use client';

import React, { useState } from 'react';
import { Gauge, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const OPT_RULES = [
  { num: 1, titleEn: '1. Index Filtered & Join Columns', titleBn: '১. WHERE ও JOIN কলামে ইনডেক্স', descEn: 'Index columns used in WHERE, JOIN ON, and ORDER BY.', descBn: 'WHERE, JOIN ON এবং ORDER BY কলামে ইনডেক্স ব্যবহার করুন।', warn: false },
  { num: 2, titleEn: '2. Avoid SELECT * in APIs', titleBn: '২. API-তে SELECT * এড়িয়ে চলুন', descEn: 'Select only needed columns to enable Covering Index scans.', descBn: 'Covering Index সুবিধা পেতে শুধু প্রয়োজনীয় কলাম নিন।', warn: false },
  { num: 3, titleEn: '3. Keep Predicates SARGable', titleBn: '৩. ইনডেক্সড কলামে ফাংশন নয়', descEn: 'Avoid YEAR(date) = 2025; use range date >= "2025-01-01" AND date < "2026-01-01".', descBn: 'YEAR(date) = 2025 না লিখে রেঞ্জ শর্ত লিখুন, নইলে ইনডেক্স কাজ করবে না।', warn: true },
  { num: 4, titleEn: '4. Filter Early with WHERE', titleBn: '৪. শুরুতেই WHERE দিয়ে ফিল্টার', descEn: 'Shrink row count before GROUP BY and ORDER BY.', descBn: 'GROUP BY বা ORDER BY-এর আগে সারি কমিয়ে আনুন।', warn: false },
  { num: 5, titleEn: '5. Index Foreign Keys', titleBn: '৫. Foreign Key-তে ইনডেক্স', descEn: 'Prevents slow nested-loop full scans during table joins.', descBn: 'জয়েন কুয়েরি দ্রুত করতে চাইল্ড টেবিলের FK ইনডেক্স করুন।', warn: false },
  { num: 6, titleEn: '6. Use LIMIT for Pagination', titleBn: '৬. পেজিনেশনে LIMIT ব্যবহার', descEn: 'Pair ORDER BY with LIMIT/OFFSET to avoid unbounded payloads.', descBn: 'বড় রেজাল্ট সেট সীমিত করতে ORDER BY + LIMIT ব্যবহার করুন।', warn: false },
  { num: 7, titleEn: '7. Avoid Unnecessary DISTINCT', titleBn: '৭. অপ্রয়োজনীয় DISTINCT বাদ দিন', descEn: 'DISTINCT triggers extra sorting/hashing overhead.', descBn: 'DISTINCT বাড়তি সর্টিং ও হ্যাশিং খরচ যোগ করে।', warn: false },
  { num: 8, titleEn: '8. Compact Data Types', titleBn: '৮. ছোট ও সঠিক ডেটা টাইপ', descEn: 'INT over BIGINT when sufficient -> more rows fit per 16KB page.', descBn: 'কম্প্যাক্ট টাইপ ব্যবহার করলে প্রতি ডিস্ক পেজে বেশি সারি ধরে।', warn: false },
  { num: 9, titleEn: '9. Refresh Optimizer Stats', titleBn: '৯. স্ট্যাটিসটিক্স আপডেট রাখা', descEn: 'Run ANALYZE TABLE so the planner picks optimal index paths.', descBn: 'ANALYZE TABLE চালিয়ে অপটিমাইজারের পরিসংখ্যান হালনাগাদ রাখুন।', warn: false },
  { num: 10, titleEn: '10. Beware of Over-Indexing', titleBn: '১০. অতিরিক্ত ইনডেক্স এড়িয়ে চলুন', descEn: 'Every extra index slows down INSERT/UPDATE/DELETE.', descBn: 'প্রতিটি বাড়তি ইনডেক্স রাইট অপারেশন ধীর করে দেয়।', warn: true },
];

export default function Lesson10Part5ExplainAndRules() {
  const { language } = useLanguage();
  const [explainHasIndex, setExplainHasIndex] = useState<boolean>(true);

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Gauge className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৫ • EXPLAIN ও ১০টি অপটিমাইজেশন নিয়ম' : 'Part 5 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="SQL EXPLAIN Plans & 10 Production Tuning Rules"
              bn="৫. SQL EXPLAIN প্ল্যান ও ১০টি প্রোডাকশন টিউনিং নিয়ম"
            />
          </h2>
        </div>
      </div>

      {/* 5 Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { num: 1, name: 'SQL Query', descEn: 'User submits text', descBn: 'কুয়েরি সাবমিট' },
          { num: 2, name: 'Parser & Lexer', descEn: 'Syntax & auth', descBn: 'সিনট্যাক্স যাচাই' },
          { num: 3, name: 'Query Optimizer', descEn: 'Cost-based plan', descBn: 'খরচ-ভিত্তিক প্ল্যান' },
          { num: 4, name: 'Execution Engine', descEn: 'Runs physical plan', descBn: 'প্ল্যান এক্সিকিউশন' },
          { num: 5, name: 'Storage Manager', descEn: 'Disk buffer pages', descBn: 'ডিস্ক পেজ পড়া' },
        ].map((st) => (
          <div key={st.num} className="p-3 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
            <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold flex items-center justify-center mx-auto">
              {st.num}
            </span>
            <div className="text-xs font-mono font-bold text-white">{st.name}</div>
            <div className="text-[9px] text-zinc-400 font-sans">{language === 'bn' ? st.descBn : st.descEn}</div>
          </div>
        ))}
      </div>

      {/* EXPLAIN Plan Simulator */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-slate-300">
            EXPLAIN SELECT * FROM STUDENT WHERE Department = &apos;CSE&apos;;
          </span>
          <button
            onClick={() => setExplainHasIndex(!explainHasIndex)}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 cursor-pointer self-start sm:self-auto"
          >
            {explainHasIndex ? 'Simulate Without Index' : 'Simulate With Index'}
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800 font-mono text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-zinc-400">
              <tr>
                <th className="py-2 px-3">id</th>
                <th className="py-2 px-3">table</th>
                <th className="py-2 px-3">type</th>
                <th className="py-2 px-3">possible_keys</th>
                <th className="py-2 px-3">key</th>
                <th className="py-2 px-3">rows</th>
              </tr>
            </thead>
            <tbody>
              {explainHasIndex ? (
                <tr className="bg-emerald-950/20 text-emerald-300">
                  <td className="py-2 px-3">1</td>
                  <td className="py-2 px-3 text-white">STUDENT</td>
                  <td className="py-2 px-3 font-bold text-emerald-400">ref (Index Scan)</td>
                  <td className="py-2 px-3">idx_department</td>
                  <td className="py-2 px-3 font-bold text-cyan-300">idx_department</td>
                  <td className="py-2 px-3 font-bold">3</td>
                </tr>
              ) : (
                <tr className="bg-rose-950/20 text-rose-300">
                  <td className="py-2 px-3">1</td>
                  <td className="py-2 px-3 text-white">STUDENT</td>
                  <td className="py-2 px-3 font-bold text-rose-400">ALL (Full Scan!)</td>
                  <td className="py-2 px-3 text-zinc-500">NULL</td>
                  <td className="py-2 px-3 text-zinc-500">NULL</td>
                  <td className="py-2 px-3 font-bold text-rose-400">1,000,000</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 10 Rules Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
          <Zap className="w-4 h-4" />
          <DualText as="span" en="10 Production SQL Tuning Rules" bn="১০টি প্রোডাকশন SQL টিউনিং নিয়ম" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {OPT_RULES.map((r) => (
            <div key={r.num} className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <span className={`font-mono font-bold ${r.warn ? 'text-rose-400' : 'text-cyan-400'}`}>
                {language === 'bn' ? r.titleBn : r.titleEn}
              </span>
              <p className="text-zinc-300 font-sans text-[11px]">
                {language === 'bn' ? r.descBn : r.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
