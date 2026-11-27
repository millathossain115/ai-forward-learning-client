'use client';

import React, { useState } from 'react';
import {
  XCircle,
  Sparkles,
  Layers,
  AlertTriangle,
  Database,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function SurrogateKeyTab() {
  const { language } = useLanguage();
  const [activeKeyArch, setActiveKeyArch] = useState<'surrogate' | 'natural'>('surrogate');

  return (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-indigo-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Database className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="8. Natural Key and Surrogate Key (ন্যাচারাল ও সারোগেট কী)"
                    bn="৮. ন্যাচারাল কী এবং সারোগেট কী (Natural & Surrogate Keys)"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="The real-world business identifier vs the artificial, high-performance database sequence."
                  bn="বাস্তব জগতের বিজনেস আইডি বনাম ডেটাবেস ইঞ্জিনের উচ্চ ক্ষমতাসম্পন্ন কৃত্রিম সিকোয়েন্স।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Architectural Design Pattern
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800/80 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="The Architectural Dilemma: Real-World Meaning vs Database Performance"
                bn="আর্কিটেকচারাল সিদ্ধান্ত: বাস্তব অর্থ বনাম ডেটাবেস পারফরম্যান্স"
              />
            </div>
            <DualText
              en="A Natural Key is an attribute that exists in the real world outside the database (e.g. National ID, Passport Number, Vehicle License Plate, Book ISBN). While intuitive, using natural keys as Primary Keys causes severe scalability issues: they are long strings (17+ characters), waste index RAM, and if a citizen legally corrects a misprinted NID, the database must acquire table locks and execute expensive CASCADE UPDATE operations across millions of child records! Therefore, modern software engineering uses a Surrogate Key (a synthetic, sequential Integer or UUID) as the Primary Key for joins, while enforcing a UNIQUE constraint on the Natural Key as an Alternate Key."
              bn="ন্যাচারাল কী (Natural Key) হলো বাস্তব জগতে বিদ্যমান কোনো পরিচিতি নম্বর (যেমন: জাতীয় পরিচয়পত্র NID, পাসপোর্ট নম্বর, বইয়ের ISBN বা গাড়ির লাইসেন্স প্লেট)। আপাতদৃষ্টিতে এদেরকে সরাসরি প্রাইমারি কি হিসেবে ব্যবহার করা সহজ মনে হলেও, এটি বড় সিস্টেমে মারাত্মক পারফরম্যান্স ঘাটতি ঘটায়: কারণ এগুলো দীর্ঘ স্ট্রিং (১৭+ অক্ষর), ইনডেক্স মেমরি অপচয় করে এবং সরকারিভাবে কোনো নাগরিকের NID সংশোধন হলে লক্ষ লক্ষ চাইল্ড টেবিলে লক পড়ে ক্যাসকেড আপডেট চালাতে হয়! তাই আধুনিক সফটওয়্যার আর্কিটেকচারে সর্বদা একটি সারোগেট কী (কৃত্রিম ইন্টিজার বা UUID) দিয়ে প্রাইমারি কি ও জয়েন পরিচালনা করা হয়, এবং ন্যাচারাল আইডিকে অল্টারনেট কী (UNIQUE) হিসেবে সুরক্ষিত রাখা হয়।"
            />
          </div>

          {/* Interactive Architectural Model Switcher */}
          <div className="p-4 rounded-xl bg-[#0a0d1a] border border-indigo-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <DualText
                  en="Select Architectural Design Pattern to Benchmark:"
                  bn="তুলনা করার জন্য আর্কিটেকচারাল প্যাটার্ন নির্বাচন করুন:"
                />
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                {activeKeyArch === 'surrogate'
                  ? language === 'bn'
                    ? 'আধুনিক শিল্পমান সক্রিয়'
                    : 'Modern Industry Standard Active'
                  : language === 'bn'
                  ? 'ঐতিহ্যবাহী ন্যাচারাল প্যাটার্ন সক্রিয়'
                  : 'Traditional Natural Pattern Active'}
              </span>
            </div>

            {/* Architecture Selector Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setActiveKeyArch('surrogate')}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
                  activeKeyArch === 'surrogate'
                    ? 'bg-emerald-500/15 border-emerald-400  '
                    : 'bg-[#121526] border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ⚡ {language === 'bn' ? 'প্যাটার্ন ১: সারোগেট কী আর্কিটেকচার' : 'Pattern 1: Surrogate Key Architecture'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {language === 'bn'
                    ? 'PK: id INT AUTO_INCREMENT (৪ বাইট), NID হলো অল্টারনেট কী (UNIQUE)। জয়েন বিদ্যুৎগতির!'
                    : 'PK: id INT AUTO_INCREMENT (4 Bytes), NID is Unique Alternate Key. Lightning-fast joins!'}
                </p>
              </button>

              <button
                onClick={() => setActiveKeyArch('natural')}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
                  activeKeyArch === 'natural'
                    ? 'bg-amber-500/15 border-amber-400  '
                    : 'bg-[#121526] border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    📜 {language === 'bn' ? 'প্যাটার্ন ২: ন্যাচারাল কী আর্কিটেকচার' : 'Pattern 2: Natural Key Architecture'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    TRADITIONAL
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {language === 'bn'
                    ? 'PK: nid VARCHAR(17) (১৭+ বাইট)। চাইল্ড টেবিলের ফরেন কি এবং ইনডেক্স মেমরি স্ফীত হয়।'
                    : 'PK: nid VARCHAR(17) (17+ Bytes). Bloats child foreign key indexes and slows down string joins.'}
                </p>
              </button>
            </div>
          </div>

          {/* Dynamic Architecture Deep-Dive Display */}
          {activeKeyArch === 'surrogate' ? (
            <div className="space-y-4">
              {/* Architecture Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    🚀 {language === 'bn' ? 'জয়েন স্পিড: O(log N) ইন্টিজার' : 'Join Speed: O(log N) Int'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'সিপিইউ রেজিস্টারে ৩২-বিট ইন্টিজার সরাসরি হার্ডওয়্যার সাইকেলে তুলনা হয়। স্ট্রিং স্ক্যান করতে হয় না।'
                      : 'CPU compares 4-byte integers in a single hardware cycle. Zero string character iterations.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    💾 {language === 'bn' ? 'ইনডেক্স আকার: মাত্র ৪ বাইট' : 'Index Size: Only 4 Bytes'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'B-Tree ইনডেক্স নোডগুলো ক্ষুদ্রাতিক্ষুদ্র হওয়ায় পুরো ইনডেক্স র‍্যামের L2/L3 ক্যাশে ফিট থাকে।'
                      : 'Ultra-compact B-Tree nodes maximize cache locality, fitting entire indexes into RAM cache.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    🛡️ {language === 'bn' ? 'জিরো ক্যাসকেড ঝুঁকি' : 'Zero Cascade Burden'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'গ্রাহকের NID-তে ভুল সংশোধন হলেও মাত্র ১টি রো আপডেট হয়। কোনো চাইল্ড অর্ডারে হাত দিতে হয় না।'
                      : 'If a user fixes a typo in their legal NID, only 1 row updates. Millions of child orders remain untouched!'}
                  </p>
                </div>
              </div>

              {/* Surrogate SQL Schema */}
              <div className="p-4 rounded-xl bg-[#090b14] border border-emerald-500/30 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {language === 'bn'
                      ? 'সারোগেট প্যাটার্নের স্কিমা (বাস্তবসম্মত প্রোডাকশন আর্কিটেকচার):'
                      : 'Production Surrogate Architecture Schema (High Scale):'}
                  </span>
                  <span className="text-[10px] text-emerald-400">Industry Standard</span>
                </div>

                <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
                  <span className="text-zinc-500">-- Parent: High performance 4-byte surrogate PK + Natural Unique constraint</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">CUSTOMER</span> (<br />
                  {'  '}id   <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-emerald-400 font-bold">PRIMARY KEY</span>,  <span className="text-zinc-500">-- 👑 Surrogate PK (4 Bytes, Immutable)</span><br />
                  {'  '}nid  <span className="text-cyan-400">VARCHAR(17)</span> <span className="text-purple-400 font-bold">UNIQUE NOT NULL</span>,    <span className="text-zinc-500">-- 🔑 Natural Alternate Key (Business Lookup)</span><br />
                  {'  '}name <span className="text-cyan-400">VARCHAR(100)</span><br />
                  );<br /><br />
                  <span className="text-zinc-500">-- Child: Millions of rows store a lightweight 4-byte integer FK</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">ORDERS</span> (<br />
                  {'  '}order_id    <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-emerald-400 font-bold">PRIMARY KEY</span>,<br />
                  {'  '}customer_id <span className="text-cyan-400">INT</span> <span className="text-emerald-400 font-bold">REFERENCES CUSTOMER(id)</span>, <span className="text-zinc-500">-- ⚡ 4-byte FK! Blazing fast joins!</span><br />
                  {'  '}total_amount <span className="text-cyan-400">DECIMAL(10,2)</span><br />
                  );
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Natural Architecture Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    ⚠️ {language === 'bn' ? 'জয়েন ওভারহেড: স্ট্রিং তুলনা' : 'Join Overhead: String Comparisons'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'প্রতিটি জয়েন অপারেশনে ১৭-অক্ষরের স্ট্রিং বাইট-বাই-বাইট মেলাতে গিয়ে অতিরিক্ত CPU সময় লাগে।'
                      : 'Joining tables requires character-by-character string matching on 17+ bytes per row.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    📦 {language === 'bn' ? 'ইনডেক্স ব্লোটিং: ১৭+ বাইট' : 'Index Bloat: 17+ Bytes'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'চাইল্ড টেবিল এবং প্রতিটি ইনডেক্সে দীর্ঘ NID স্ট্রিং বারবার জমা হয়ে ডিস্ক ও র‍্যামের জায়গা দখল করে।'
                      : 'The full 17+ character NID string repeats in every child table and every secondary B-Tree node.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    💥 {language === 'bn' ? 'ক্যাসকেডিং লকিং ঝুঁকি' : 'Cascade Lock Contention'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'কোনো নাগরিকের NID সংশোধন হলে ON UPDATE CASCADE দিয়ে সংশ্লিষ্ট ১০ লক্ষ অর্ডারে টেবিল লক পড়ে!'
                      : 'Correcting a mistyped NID triggers ON UPDATE CASCADE, locking child tables to rewrite millions of rows!'}
                  </p>
                </div>
              </div>

              {/* Natural SQL Schema */}
              <div className="p-4 rounded-xl bg-[#090b14] border border-amber-500/30 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
                  <span className="text-amber-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {language === 'bn'
                      ? 'ঐতিহ্যবাহী ন্যাচারাল কী স্কিমা (চাইল্ড টেবিলে ১৭ বাইটের বোঝা):'
                      : 'Traditional Natural Key Schema (17+ Byte String Overhead in Child Tables):'}
                  </span>
                  <span className="text-[10px] text-amber-400">Traditional / Fragile</span>
                </div>

                <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
                  <span className="text-zinc-500">-- Parent: Using real-world 17-digit NID directly as Primary Key</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">CUSTOMER</span> (<br />
                  {'  '}nid  <span className="text-cyan-400">VARCHAR(17)</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>, <span className="text-zinc-500">-- 📜 Natural PK (17+ Bytes, Mutable by Govt)</span><br />
                  {'  '}name <span className="text-cyan-400">VARCHAR(100)</span><br />
                  );<br /><br />
                  <span className="text-zinc-500">-- Child: Every single order stores the heavy 17-byte string!</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">ORDERS</span> (<br />
                  {'  '}order_id     <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
                  {'  '}customer_nid <span className="text-cyan-400">VARCHAR(17)</span> <span className="text-amber-400 font-bold">REFERENCES CUSTOMER(nid)</span> <span className="text-rose-400">ON UPDATE CASCADE</span>,<br />
                  {'  '}total_amount <span className="text-cyan-400">DECIMAL(10,2)</span><br />
                  );
                </pre>
              </div>
            </div>
          )}

          {/* Golden Rule Summary Banner */}
          <div className="p-4 rounded-xl bg-[#15171e] border border-indigo-500/40 text-xs font-sans flex items-start sm:items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </span>
            <div className="space-y-1">
              <span className="text-indigo-200 font-bold block">
                {language === 'bn'
                  ? 'ইন্ডাস্ট্রি গোল্ডেন রুল (Database Architect Recommendation):'
                  : 'Industry Golden Rule (Database Architect Recommendation):'}
              </span>
              <div className="text-zinc-300 text-[11px] leading-relaxed">
                <DualText
                  en="“Always use an internal, surrogate integer (or UUID) as your Primary Key for physical table relationships and joins. Always enforce a UNIQUE constraint on your natural business identifier (NID, Email, SKU) as an Alternate Key for fast, collision-free business lookups!”"
                  bn="“টেবিলগুলোর মাঝে শারীরিক সম্পর্ক ও দ্রুতগতির জয়েনের জন্য সর্বদা একটি অভ্যন্তরীণ সারোগেট ইন্টিজার (বা UUID)-কে প্রাইমারি কি হিসেবে রাখুন। আর বাস্তব জগতের পরিচিতিকে (NID, Email, SKU) অল্টারনেট কী হিসেবে UNIQUE কনস্ট্রেইন্ট দিয়ে সুরক্ষিত রাখুন!”"
                />
              </div>
            </div>
          </div>
        </div>
  );
}
