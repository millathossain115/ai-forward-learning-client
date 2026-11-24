'use client';

import React from 'react';
import { Code2, Database, Server, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part1WhatIsSql() {
  const { language } = useLanguage();


  return (
    <>
{/* ========================================================
          PART 1: WHAT IS SQL?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১ • এসকিউএল পরিচিতি' : 'Part 1 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="What is SQL? (Structured Query Language)"
                bn="১. এসকিউএল (SQL) কী এবং এটি কেন ব্যবহৃত হয়?"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
              <h3 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <DualText en="Standard Definition" bn="মানসম্মত সংজ্ঞা (Standard Definition)" />
              </h3>
              <DualText
                as="p"
                className="text-xs text-zinc-300 leading-relaxed font-sans"
                en={<><strong className="text-white">SQL</strong> stands for <span className="text-cyan-400 font-semibold">Structured Query Language</span>. It is the standardized, declarative computer language used to communicate with and manipulate <strong className="text-indigo-300">Relational Database Management Systems (RDBMS)</strong>.</>}
                bn={<><strong className="text-white">SQL</strong>-এর পূর্ণরূপ হলো <span className="text-cyan-400 font-semibold">Structured Query Language</span>। এটি রিলেশনাল ডেটাবেস ম্যানেজমেন্ট সিস্টেম (<strong className="text-indigo-300">RDBMS</strong>)-এর সাথে যোগাযোগ, ডেটা কোয়েরি ও ডেটাবেস পরিচালনার জন্য ব্যবহৃত আন্তর্জাতিক আদর্শ ও ঘোষণামূলক (declarative) ভাষা।</>}
              />
              <DualText
                as="p"
                className="text-xs text-zinc-400 leading-relaxed font-sans"
                en="It allows software engineers and analysts to create databases, define schemas, insert data, query records with filtering, modify rows, and secure user permissions."
                bn="এর মাধ্যমে সফটওয়্যার ইঞ্জিনিয়ার ও ডেটা অ্যানালিস্টরা ডেটাবেস তৈরি, টেবিল স্কিমা নির্ধারণ, ডেটা ইনসার্ট, জটিল ফিল্টারিং কোয়েরি, রেকর্ড আপডেট এবং নিরাপত্তা অনুমতি নিয়ন্ত্রণ করতে পারেন।"
              />
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-2">
              <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase">
                <DualText en="Real-World Analogy" bn="বাস্তব জীবনের রূপক (Analogy)" />
              </h3>
              <DualText
                as="p"
                className="text-xs text-zinc-300 leading-relaxed font-sans"
                en={<>Think of <strong>English</strong> as a human language. People in the UK, USA, Australia, and Canada speak English with small local dialect variations. Similarly:</>}
                bn={<><strong>ইংরেজি</strong> ভাষার কথা ভাবুন। যুক্তরাজ্য, যুক্তরাষ্ট্র বা কানাডার মানুষ নিজস্ব কিছু আঞ্চলিক উচ্চারণ বা ডায়ালেক্টসহ ইংরেজি বলে। একইভাবে:</>}
              />
              <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc marker:text-indigo-400">
                <li>
                  <DualText
                    en={<><strong>SQL</strong> is the standard language specification.</>}
                    bn={<><strong>SQL</strong> হলো মূল আদর্শ ভাষার স্পেসিফিকেশন।</>}
                  />
                </li>
                <li>
                  <DualText
                    en={<><strong>MySQL, PostgreSQL, Oracle, SQLite, and MS SQL Server</strong> are different database engines that &quot;speak&quot; SQL.</>}
                    bn={<><strong>MySQL, PostgreSQL, Oracle, SQLite, MS SQL Server</strong> হলো বিভিন্ন ডেটাবেস ইঞ্জিন যারা এই SQL ভাষায় কথা বলে।</>}
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* RDBMS Comparison Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
              <DualText en="Popular RDBMS Engines That Speak SQL" bn="জনপ্রিয় RDBMS ইঞ্জিনসমূহ" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* MySQL */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/mysql.svg" alt="MySQL Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-300 font-mono block">MySQL</span>
                    <span className="text-[10px] font-mono text-zinc-500">Web & Cloud Standard</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="The world's most popular open-source web database. Powers WordPress, Facebook, YouTube."
                  bn="বিশ্বের সবচেয়ে জনপ্রিয় ওপেন-সোর্স ডেটাবেস। WordPress, Facebook, YouTube ইত্যাদিতে ব্যবহৃত হয়।"
                />
              </div>

              {/* PostgreSQL */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-indigo-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/postgresql.svg" alt="PostgreSQL Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-300 font-mono block">PostgreSQL</span>
                    <span className="text-[10px] font-mono text-zinc-500">Object-Relational DBMS</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="Advanced enterprise-grade object-relational DBMS with rich extensions (JSON, pgvector)."
                  bn="অত্যন্ত শক্তিশালী এন্টারপ্রাইজ গ্রেড অবজেক্ট-রিলেশনাল DBMS যাতে আধুনিক এক্সটেনশন (JSON, pgvector) রয়েছে।"
                />
              </div>

              {/* Oracle Database */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-rose-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/oracle.svg" alt="Oracle Database Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-300 font-mono block">Oracle Database</span>
                    <span className="text-[10px] font-mono text-zinc-500">Enterprise High-Scale</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="Mission-critical high-throughput database used by global banks, telecom, and airlines."
                  bn="বিশ্বের ব্যাংক, টেলিকম ও বিমান সংস্থায় ব্যবহৃত উচ্চ ক্ষমতাসম্পন্ন মিশন-ক্রিটিক্যাল ডেটাবেস।"
                />
              </div>

              {/* SQLite */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-emerald-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/sqlite.svg" alt="SQLite Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-300 font-mono block">SQLite</span>
                    <span className="text-[10px] font-mono text-zinc-500">Embedded Serverless</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="Serverless, single-file database embedded inside every smartphone, browser, and macOS/Windows app."
                  bn="সার্ভারহীন, একক ফাইলের ডেটাবেস যা প্রতিটি স্মার্টফোন, ব্রাউজার ও অ্যাপে এম্বেড করা থাকে।"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-zinc-400 font-mono">
              <span className="text-emerald-400 font-bold">
                <DualText en="SQL Syntax Sample:" bn="এসকিউএল সিনট্যাক্স নমুনা:" />
              </span>
              <div className="mt-1 text-slate-300 bg-black/40 p-2 rounded">
                SELECT * FROM Students WHERE Department = &apos;CSE&apos;;
              </div>
              <DualText
                as="p"
                className="mt-1 text-zinc-500"
                en='Meaning: "Please retrieve all columns and all records from the Students table where the department is CSE."'
                bn='অর্থ: "Students টেবিল থেকে এমন সকল কলাম ও রেকর্ড তুলে আনো যাদের ডিপার্টমেন্ট হলো CSE।"'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
