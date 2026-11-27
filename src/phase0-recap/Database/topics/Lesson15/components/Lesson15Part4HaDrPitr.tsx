'use client';

import React, { useState } from 'react';
import { Archive, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson15Part4HaDrPitr() {
  const { language } = useLanguage();
  const [failoverStep, setFailoverStep] = useState<'normal' | 'failover'>('normal');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৪ • HA, ফেইলওভার ও PITR' : 'Part 4 of 6'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="High Availability (HA), Automatic Failover & Disaster Recovery"
                bn="৪. হাই অ্যাভেইলেবিলিটি (HA), ফেইলওভার ও ডিজাস্টার রিকভারি"
              />
            </h2>
          </div>
        </div>

        <button
          onClick={() => setFailoverStep(failoverStep === 'normal' ? 'failover' : 'normal')}
          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold cursor-pointer self-start sm:self-auto"
        >
          {failoverStep === 'normal' ? 'Simulate Primary Crash → Failover' : 'Reset to Healthy Primary'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className={`p-4 rounded-xl border ${failoverStep === 'normal' ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'}`}>
          <div className="font-bold text-white">Node A (AZ-1)</div>
          <div className={failoverStep === 'normal' ? 'text-emerald-400 mt-1' : 'text-rose-400 mt-1'}>
            {failoverStep === 'normal' ? '● ACTIVE PRIMARY (Serving Reads & Writes)' : '✕ OFFLINE (Hardware Failure)'}
          </div>
        </div>
        <div className={`p-4 rounded-xl border ${failoverStep === 'failover' ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-[#14182d] border-slate-800'}`}>
          <div className="font-bold text-white">Node B (AZ-2)</div>
          <div className={failoverStep === 'failover' ? 'text-emerald-400 mt-1 font-bold' : 'text-cyan-300 mt-1'}>
            {failoverStep === 'failover' ? '● PROMOTED TO NEW PRIMARY (Failover Complete!)' : '○ SYNC STANDBY (Receiving WAL Stream)'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <Archive className="w-3.5 h-3.5" /> HA vs DR
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="HA handles local server crashes in seconds via Multi-AZ Standby. DR handles full-region disasters via cross-region backups & PITR."
            bn="HA লোকাল সার্ভার ক্র্যাশে কয়েক সেকেন্ডেই স্ট্যান্ডবাই চালু করে। DR বড় আঞ্চলিক বিপর্যয়ে অন্য রিজিয়ন থেকে ব্যাকআপ রিস্টোর করে।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Restore Drills
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="DBAs regularly test restoring backups into staging to verify zero corruption and confirm RTO/RPO targets."
            bn="ব্যাকআপ আসলেই কাজ করে কি না তা যাচাই করতে DBA-রা নিয়মিত স্টেজিং সার্ভারে রিস্টোর টেস্ট করেন।"
          />
        </div>
      </div>
    </section>
  );
}
