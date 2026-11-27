'use client';

import React, { useState } from 'react';
import { Brain, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type MiningTech = 'classification' | 'clustering' | 'association' | 'regression' | 'anomaly';

const MINING_DETAILS: Record<MiningTech, { title: string; descEn: string; descBn: string; ex: string }> = {
  classification: {
    title: '1. Classification (Supervised)',
    descEn: 'Assigns records to predefined discrete labels using Decision Trees, Random Forest, or Logistic Regression.',
    descBn: 'লেবেলযুক্ত ডেটা থেকে শিখে নতুন ডেটাকে নির্দিষ্ট ক্যাটাগরিতে ভাগ করে (যেমন Spam/Not Spam)।',
    ex: 'Predict: Will student drop out? -> {High Risk, Low Risk}',
  },
  clustering: {
    title: '2. Clustering (Unsupervised)',
    descEn: 'Groups unlabeled records into natural clusters based on similarity (e.g., K-Means, DBSCAN).',
    descBn: 'কোনো লেবেল ছাড়াই সাদৃশ্যের ভিত্তিতে ডেটাকে গ্রুপ করে (যেমন K-Means)।',
    ex: 'Group customers into: Bargain Hunters, VIP Spenders, Occasional Buyers',
  },
  association: {
    title: '3. Association Rules (Market Basket)',
    descEn: 'Discovers co-occurrence rules using Support & Confidence (Apriori / FP-Growth).',
    descBn: 'একটি পণ্যের সাথে আরেকটি পণ্য কেনার প্রবণতা খুঁজে বের করে (Market Basket Analysis)।',
    ex: '{Bread, Milk} -> {Butter} (Support: 18%, Confidence: 74%)',
  },
  regression: {
    title: '4. Regression (Numeric Prediction)',
    descEn: 'Predicts continuous numerical values from historical features.',
    descBn: 'পূর্ববর্তী ডেটা বিশ্লেষণ করে ধারাবাহিক সংখ্যাসূচক মান অনুমান করে।',
    ex: 'Predict next semester enrollment count or house price ($)',
  },
  anomaly: {
    title: '5. Anomaly / Outlier Detection',
    descEn: 'Flags rare deviations from normal patterns—critical for fraud and intrusion detection.',
    descBn: 'স্বাভাবিক প্যাটার্ন থেকে বিচ্যুত অস্বাভাবিক ডেটা (যেমন কার্ড জালিয়াতি) শনাক্ত করে।',
    ex: 'Flag $4,500 transaction at 3:15 AM from an unrecognized country',
  },
};

export default function Lesson17Part3MiningKdd() {
  const { language } = useLanguage();
  const [tech, setTech] = useState<MiningTech>('classification');
  const current = MINING_DETAILS[tech];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Brain className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • ডেটা মাইনিং ও KDD' : 'Part 3 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Data Mining Techniques, KDD Process & DW vs. DM"
              bn="৩. ডেটা মাইনিং টেকনিক, KDD প্রক্রিয়া ও DW বনাম DM"
            />
          </h2>
        </div>
      </div>

      {/* 5 Mining Techniques */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MINING_DETAILS) as MiningTech[]).map((k) => (
          <button
            key={k}
            onClick={() => setTech(k)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize cursor-pointer ${
              tech === k ? 'bg-emerald-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-500/30 space-y-2 text-xs">
        <span className="text-emerald-300 font-mono font-bold uppercase">{current.title}</span>
        <DualText as="p" className="text-zinc-300 font-sans" en={current.descEn} bn={current.descBn} />
        <div className="p-2.5 bg-black/50 rounded font-mono text-[11px] text-cyan-300">{current.ex}</div>
      </div>

      {/* 8-Step KDD */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-purple-300 uppercase flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5" /> 8 Steps of KDD (Knowledge Discovery in Databases)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center font-mono text-[11px]">
          {['1. Selection', '2. Cleaning', '3. Integration', '4. Transform', '5. Data Mining', '6. Pattern Eval', '7. Visualize', '8. Action'].map((s) => (
            <div key={s} className="p-2.5 rounded-xl bg-[#14182d] border border-slate-800 text-zinc-200 font-bold">
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
