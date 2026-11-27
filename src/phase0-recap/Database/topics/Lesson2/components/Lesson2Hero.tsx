'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Table as TableIcon } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';

interface Lesson2HeroProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson2Hero({ onNavigate }: Lesson2HeroProps) {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-[#202744] p-6 md:p-8">

      {/* Top Banner Actions: Lesson Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn'
              ? 'লেসন ২ • ডেটাবেসের স্থাপত্য ও মডেলসমূহ'
              : language === 'en'
              ? 'Lesson 2 • Architectural Blueprints'
              : 'Lesson 2 • Architectural Blueprints (স্থাপত্য নকশা)'}
          </span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            {language === 'bn' ? 'মৌলিক ডেটাবেস কোর্স' : 'Beginner Level DBMS'}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {language === 'en' && 'Lesson 2: Types of Databases and Database Models'}
            {language === 'bn' && 'লেসন ২: ডেটাবেসের প্রকারভেদ এবং ডেটাবেস মডেলসমূহ'}
            {language === 'dual' && (
              <span className="flex flex-col gap-1">
                <span>Lesson 2: Types of Databases and Database Models</span>
                <span className="text-lg md:text-xl font-bold text-indigo-300">
                  (লেসন ২: ডেটাবেসের প্রকারভেদ ও ৬টি গুরুত্বপূর্ণ মডেল)
                </span>
              </span>
            )}
          </h1>

          <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
            {(language === 'en' || language === 'dual') && (
              <p>
                Welcome to Lesson 2! In Lesson 1, we learned that Data is raw facts, Information is processed insight, a Database is an organized collection, and DBMS is the managing engine. Today, we explore how different databases organize data—from <strong>Flat Files</strong> and <strong>Hierarchical Trees</strong> to <strong>Relational Tables</strong> and modern <strong>NoSQL</strong> architectures.
              </p>
            )}
            {(language === 'bn' || language === 'dual') && (
              <p className={language === 'dual' ? 'text-xs text-indigo-300/90 border-l-2 border-indigo-500/40 pl-3 py-0.5' : ''}>
                লেসন ২-এ স্বাগতম! লেসন ১-এ আমরা জেনেছি ডেটা হলো কাঁচা তথ্য, ইনফরমেশন হলো অর্থবহ ফলাফল, ডেটাবেস হলো সুসংগঠিত সংগ্রহ এবং DBMS হলো সফটওয়্যার হাতিয়ার। আজ আমরা দেখব বিভিন্ন ডেটাবেস কীভাবে ডেটা সাজায়—
                <strong>ফ্ল্যাট ফাইল</strong> ও <strong>হায়ারার্কিক্যাল ট্রি</strong> থেকে শুরু করে <strong>রিলেশনাল টেবিল</strong> এবং আধুনিক ক্লাউড-স্কেল <strong>NoSQL</strong> আর্কিটেকচার পর্যন্ত।
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onNavigate?.('db-lesson3')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <TableIcon className="w-4 h-4" />
            <span>
              {language === 'bn' ? 'পরবর্তী: লেসন ৩ (রিলেশনাল মডেল)' : 'Next: Lesson 3 (Relational Model)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate?.('db-lesson1')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'লেসন ১-এ ফিরে যান' : 'Back to Lesson 1'}</span>
          </button>
        </div>
      </div>

      {/* Lesson 1 Quick Recap Strip */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            {language === 'bn'
              ? 'লেসন ১-এর সারসংক্ষেপ (৩০ সেকেন্ডের রিভিশন):'
              : 'Lesson 1 Recap in 30 Seconds:'}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-amber-400 block">Data (ডেটা):</strong>
            {language === 'bn' ? 'কাঁচা উপাত্ত (যেমন: ১০১, রহিম, ৩.৮০)' : 'Raw facts (e.g. 101, Rahim, 3.80)'}
          </div>
          <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-cyan-400 block">Information (তথ্য):</strong>
            {language === 'bn' ? 'প্রক্রিয়াজাত ও অর্থপূর্ণ ফলাফল' : 'Processed & meaningful context'}
          </div>
          <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-purple-400 block">Database (ডেটাবেস):</strong>
            {language === 'bn' ? 'সম্পর্কিত তথ্যের সুসংগঠিত ভাণ্ডার' : 'Organized collection of data'}
          </div>
          <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
            <strong className="text-emerald-400 block">DBMS (ডিবিএমএস):</strong>
            {language === 'bn' ? 'ডেটাবেস পরিচালনার সফটওয়্যার ইঞ্জিন' : 'The software engine managing it'}
          </div>
        </div>
      </div>
    </div>
  );
}
