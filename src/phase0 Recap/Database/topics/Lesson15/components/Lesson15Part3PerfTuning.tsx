'use client';

import React from 'react';
import { Cpu, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson15Part3PerfTuning() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • পারফরম্যান্স ও রিসোর্স টিউনিং' : 'Part 3 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="DBA Performance Tuning: Buffer Pool, Slow Queries & Pooling"
              bn="৩. পারফরম্যান্স টিউনিং: Buffer Pool, স্লো কুয়েরি ও কনেকশন পুলিং"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1.5">
          <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> 1. Memory &amp; Buffer Pool
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Allocate 60–75% of dedicated DB RAM to innodb_buffer_pool_size / shared_buffers so hot pages stay cached in RAM."
            bn="ডেডিকেটেড সার্ভারের ৬০–৭৫% RAM Buffer Pool-এ দিন যেন ঘন ঘন ব্যবহৃত ডেটা RAM-এই থাকে।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-300 uppercase">2. Slow Query Log &amp; EXPLAIN</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Enable slow_query_log / pg_stat_statements to catch queries > 200ms, inspect EXPLAIN, and eliminate full table scans."
            bn="২০০ms-এর বেশি সময় নেওয়া কুয়েরি ধরতে slow_query_log চালু করুন এবং EXPLAIN দিয়ে অপটিমাইজ করুন।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-purple-500/30 space-y-1.5">
          <span className="font-mono font-bold text-purple-300 uppercase">3. Connection Pooling</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Each idle DB connection consumes ~5–10 MB RAM. Use PgBouncer/ProxySQL to multiplex thousands of app requests safely."
            bn="প্রতিটি কনেকশন মেমোরি নেয়। PgBouncer বা ProxySQL ব্যবহার করে হাজারো রিকোয়েস্ট নিরাপদে হ্যান্ডেল করুন।"
          />
        </div>
      </div>
    </section>
  );
}
