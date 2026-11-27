'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson15Part2NocMonitor() {
  const { language } = useLanguage();
  const [nocState, setNocState] = useState<'healthy' | 'incident'>('healthy');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২ • NOC মনিটরিং ও টিউনিং' : 'Part 2 of 6'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Database Monitoring Center (NOC) & Performance Tuning"
                bn="২. ডেটাবেস মনিটরিং সেন্টার (NOC) ও পারফরম্যান্স টিউনিং"
              />
            </h2>
          </div>
        </div>

        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => setNocState('healthy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              nocState === 'healthy' ? 'bg-emerald-600 text-white' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            Healthy Baseline
          </button>
          <button
            onClick={() => setNocState('incident')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              nocState === 'incident' ? 'bg-rose-600 text-white' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            Simulate Traffic Spike
          </button>
        </div>
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
          <span className="text-[11px] text-zinc-400">CPU Utilization</span>
          <div className={`text-xl font-extrabold ${nocState === 'healthy' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {nocState === 'healthy' ? '28%' : '96%'}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
          <span className="text-[11px] text-zinc-400">Buffer Pool Hit Ratio</span>
          <div className={`text-xl font-extrabold ${nocState === 'healthy' ? 'text-cyan-300' : 'text-amber-400'}`}>
            {nocState === 'healthy' ? '99.6%' : '74.2%'}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
          <span className="text-[11px] text-zinc-400">Active Connections</span>
          <div className={`text-xl font-extrabold ${nocState === 'healthy' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {nocState === 'healthy' ? '42 / 200' : '198 / 200'}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
          <span className="text-[11px] text-zinc-400">Replica Lag</span>
          <div className={`text-xl font-extrabold ${nocState === 'healthy' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {nocState === 'healthy' ? '12 ms' : '14.5 sec'}
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
        nocState === 'healthy'
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
      }`}>
        {nocState === 'healthy' ? (
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        )}
        <div className="font-sans">
          {nocState === 'healthy' ? (
            <DualText
              as="p"
              en="All SLOs green: 99.6% queries served from RAM buffer pool, low lock contention, and near-zero replication lag."
              bn="সব মেট্রিক স্বাভাবিক: ৯৯.৬% কুয়েরি RAM থেকেই সার্ভ হচ্ছে এবং রেপ্লিকেশন ল্যাগ ১২ মিলিসেকেন্ড।"
            />
          ) : (
            <DualText
              as="p"
              en="ALERT: Connection pool near exhaustion (198/200) and cache hit ratio dropped! DBA Action: Enable PgBouncer pooling, add missing index on hot WHERE column, and offload reads to Read Replica."
              bn="সতর্কতা: কনেকশন পুল প্রায় পূর্ণ এবং ক্যাশ হিট রেশিও কমে গেছে! সমাধান: PgBouncer চালু করুন, মিসিং ইনডেক্স যোগ করুন এবং রিড রেপ্লিকা ব্যবহার করুন।"
            />
          )}
        </div>
      </div>
    </section>
  );
}
