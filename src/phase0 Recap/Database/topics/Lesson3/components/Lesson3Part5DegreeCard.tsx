'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part5DegreeCard() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৬ ও ৭ / ১৩' : 'Part 6 & 7 of 13'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Degree vs Cardinality (Crucial Exam Concept)"
              bn="ডিগ্রি (Degree) বনাম কার্ডিনালিটি (Cardinality) — পরীক্ষার জন্য অত্যন্ত জরুরি"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Degree Card */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-pink-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-pink-400 uppercase">
              <DualText en="1. Degree (Arity)" bn="১. ডিগ্রি বা অ্যারাইটি (Degree / Arity)" />
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">
              {language === 'bn' ? 'কলামের মোট সংখ্যা' : 'Columns Count'}
            </span>
          </div>
          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: The degree of a relation is the total number of attributes (columns) it contains."
              bn="সংজ্ঞা: কোনো রিলেশন বা টেবিলে মোট যতগুলো কলাম বা অ্যাট্রিবিউট থাকে, তাকে ঐ রিলেশনের ডিগ্রি (Degree) বলে।"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono">
            <div className="text-pink-300 font-bold">
              {language === 'bn' ? 'STUDENT টেবিলের অ্যাট্রিবিউটসমূহ:' : 'STUDENT Table Attributes:'}
            </div>
            <div className="text-zinc-400 mt-1">1. Student_ID, 2. Name, 3. Age, 4. Department, 5. CGPA</div>
            <div className="text-white font-bold mt-2 pt-2 border-t border-slate-800">
              → Degree = <span className="text-pink-400 text-sm">5</span>
            </div>
          </div>
        </div>

        {/* Cardinality Card */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              <DualText en="2. Cardinality" bn="২. কার্ডিনালিটি (Cardinality)" />
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
              {language === 'bn' ? 'সারির মোট সংখ্যা' : 'Rows Count'}
            </span>
          </div>
          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: The cardinality of a relation is the total number of tuples (rows) it currently contains."
              bn="সংজ্ঞা: কোনো রিলেশন বা টেবিলে একটি নির্দিষ্ট সময়ে মোট যতগুলো সারি বা টাপল জমা থাকে, তাকে তার কার্ডিনালিটি (Cardinality) বলে।"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono">
            <div className="text-indigo-300 font-bold">
              {language === 'bn' ? 'STUDENT টেবিলের বর্তমান টাপলসমূহ:' : 'STUDENT Table Tuples:'}
            </div>
            <div className="text-zinc-400 mt-1">Rahim, Karim, Nila, Sami (4 records stored)</div>
            <div className="text-white font-bold mt-2 pt-2 border-t border-slate-800">
              → Cardinality = <span className="text-indigo-400 text-sm">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Trick Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/30 to-indigo-950/30 border border-slate-700 text-xs font-mono flex flex-col sm:flex-row items-center justify-around gap-3 text-center">
        <div>
          <span className="text-zinc-400 block text-[10px]">
            {language === 'bn' ? 'সহজ টেকনিক:' : 'Short Memory Trick:'}
          </span>
          <span className="text-pink-300 font-bold text-sm">
            Degree = Columns (কলামের সংখ্যা)
          </span>
        </div>
        <div className="hidden sm:block text-slate-700 text-lg">|</div>
        <div>
          <span className="text-zinc-400 block text-[10px]">
            {language === 'bn' ? 'সহজ টেকনিক:' : 'Short Memory Trick:'}
          </span>
          <span className="text-indigo-300 font-bold text-sm">
            Cardinality = Rows (সারির সংখ্যা)
          </span>
        </div>
      </div>
    </section>
  );
}
