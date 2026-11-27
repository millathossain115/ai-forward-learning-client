'use client';

import React from 'react';

import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Hero() {
  const { language } = useLanguage();


  return (
    <>
{/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-indigo-900/40 p-6 md:p-10">

        <div className="relative z-10 space-y-5">
          {/* Top row: Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {language === 'bn' ? 'লেসন ৬ • প্র্যাকটিক্যাল এসকিউএল' : 'Lesson 6 • Practical SQL'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {language === 'bn' ? 'জিরো টু কুয়েরি প্রো' : 'Zero to Query Hero'}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            <DualText
              en={
                <>
                  Lesson 6: Introduction to SQL <br className="hidden md:block" />
                  <span className="bg-[#15171e] text-[#f4f4f7]">
                    Structured Query Language
                  </span>
                </>
              }
              bn={
                <>
                  লেসন ৬: এসকিউএল (SQL) পরিচিতি <br className="hidden md:block" />
                  <span className="bg-[#15171e] text-[#f4f4f7]">
                    স্ট্রাকচার্ড কুয়েরি ল্যাঙ্গুয়েজ ও হ্যান্ডস-অন প্র্যাকটিস
                  </span>
                </>
              }
            />
          </h1>

          <div className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
            <DualText
              en="Now we transition from database theory to real-world command execution. Learn how to create databases, construct tables with constraints, query and filter records, perform joins, compute aggregates, and write high-scoring exam & interview answers."
              bn="ডেটাবেস থিওরি থেকে সরাসরি বাস্তব কমান্ড এক্সিকিউশনে পদার্পণ করুন। শিখুন কীভাবে ডেটাবেস ও কনস্ট্রেইন্টযুক্ত টেবিল তৈরি করতে হয়, রেকর্ড ফিল্টার ও সর্ট করতে হয়, টেবিল জয়েন ও এগ্রিগেট কুয়েরি চালাতে হয় এবং ইন্টারভিউ ও পরীক্ষায় সেরা উত্তর প্রস্তুত করতে হয়।"
            />
          </div>


        </div>
      </div>
    </>
  );
}
