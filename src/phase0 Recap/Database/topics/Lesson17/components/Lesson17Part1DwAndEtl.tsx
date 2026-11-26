'use client';

import React, { useState } from 'react';
import { Database, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson17Part1DwAndEtl() {
  const { language } = useLanguage();
  const [etlStep, setEtlStep] = useState<'extract' | 'transform' | 'load'>('extract');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • ডেটা ওয়্যারহাউস ও ETL পাইপলাইন' : 'Part 1 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="What Is a Data Warehouse & The ETL Pipeline"
              bn="১. ডেটা ওয়্যারহাউস কী এবং ETL পাইপলাইন"
            />
          </h2>
        </div>
      </div>

      {/* 4 Inmon Traits */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        {[
          { t: '1. Subject-Oriented', dEn: 'Organized by Sales, Students, Finance', dBn: 'বিষয়ভিত্তিকভাবে সাজানো' },
          { t: '2. Integrated', dEn: 'Unified naming, units & schemas', dBn: 'সমন্বিত ফরম্যাট ও একক' },
          { t: '3. Time-Variant', dEn: 'Stores 5–10 years of history', dBn: 'দীর্ঘমেয়াদী ঐতিহাসিক ডেটা' },
          { t: '4. Non-Volatile', dEn: 'Read-only historical snapshots', dBn: 'অপরিবর্তনযোগ্য ঐতিহাসিক সারি' },
        ].map((item) => (
          <div key={item.t} className="p-3 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-cyan-300 block">{item.t}</span>
            <p className="text-[11px] text-zinc-400 font-sans">{language === 'bn' ? item.dBn : item.dEn}</p>
          </div>
        ))}
      </div>

      {/* Interactive ETL Pipeline */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> ETL Pipeline Stepper (Extract → Transform → Load)
          </span>
          <div className="flex gap-1.5">
            {(['extract', 'transform', 'load'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setEtlStep(s)}
                className={`px-3 py-1 rounded text-xs font-mono uppercase cursor-pointer ${
                  etlStep === s ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-zinc-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-slate-800 text-xs font-sans text-zinc-300">
          {etlStep === 'extract' && (
            <DualText
              as="p"
              en="Extract: Pull raw records from disparate OLTP silos (Admissions MySQL, Finance ERP, LMS Logs, CSVs)."
              bn="Extract: বিভিন্ন সোর্স ডেটাবেস (MySQL, ERP, CSV, লগ) থেকে কাঁচা ডেটা সংগ্রহ করা হয়।"
            />
          )}
          {etlStep === 'transform' && (
            <DualText
              as="p"
              en="Transform: Clean NULLs, standardize dates (YYYY-MM-DD), deduplicate IDs, and pre-aggregate metrics."
              bn="Transform: অসঙ্গতি দূর করা, তারিখ ও একক একরকম করা এবং ডুপ্লিকেট বাদ দেওয়া হয়।"
            />
          )}
          {etlStep === 'load' && (
            <DualText
              as="p"
              en="Load: Batch-insert clean data into Star/Snowflake Fact & Dimension tables for BI dashboards."
              bn="Load: পরিষ্কার ডেটা ওয়্যারহাউসের Fact ও Dimension টেবিলে লোড করা হয়।"
            />
          )}
        </div>
      </div>
    </section>
  );
}
