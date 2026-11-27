'use client';

import React from 'react';
import { Clock, LifeBuoy, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson11Part6RecoveryRpoRto() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <LifeBuoy className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৫ • রিকভারি, PITR, RPO ও RTO' : 'Part 5 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Crash Recovery (WAL/PITR) & Disaster Targets (RPO vs RTO)"
              bn="৫. ক্র্যাশ রিকভারি (WAL/PITR) ও ডিজাস্টার টার্গেট (RPO বনাম RTO)"
            />
          </h2>
        </div>
      </div>

      {/* PITR + WAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Point-In-Time Recovery (PITR)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Restore last Full Backup + replay WAL / Binary Logs right up to the exact second BEFORE an accidental DELETE or DROP TABLE."
            bn="সর্বশেষ Full ব্যাকআপ রিস্টোর করে দুর্ঘটনার ঠিক আগের সেকেন্ড পর্যন্ত WAL/Binary Log রিপ্লে করে ডেটা ফিরিয়ে আনা।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="font-mono font-bold text-purple-400 uppercase">3 Failure Categories</span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong>Transaction Failure:</strong> Constraint error / deadlock → UNDO.</li>
            <li><strong>System Crash:</strong> OS/power loss → WAL REDO + UNDO.</li>
            <li><strong>Media Failure:</strong> Disk corruption → Restore Backup + PITR.</li>
          </ul>
        </div>
      </div>

      {/* RPO vs RTO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1.5">
          <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> RPO (Recovery Point Objective)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Max acceptable data loss measured in time. Example: RPO = 30 min on a 2:00 PM crash means recovering all data up to at least 1:30 PM."
            bn="সর্বোচ্চ কতটুকু সময়ের ডেটা হারানো মেনে নেওয়া যাবে। যেমন ২:০০টায় ক্র্যাশে RPO = ৩০ মিনিট মানে অন্তত ১:৩০ পর্যন্ত ডেটা ফেরানো।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-1.5">
          <span className="font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> RTO (Recovery Time Objective)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Max acceptable downtime. Example: RTO = 3 hours on a 2:00 PM outage means the database must be online by 5:00 PM."
            bn="সর্বোচ্চ কতক্ষণ সিস্টেম বন্ধ থাকতে পারবে। যেমন ২:০০টায় ডাউনে RTO = ৩ ঘণ্টা মানে বিকেল ৫:০০টার মধ্যে সার্ভার সচল করা।"
          />
        </div>
      </div>
    </section>
  );
}
