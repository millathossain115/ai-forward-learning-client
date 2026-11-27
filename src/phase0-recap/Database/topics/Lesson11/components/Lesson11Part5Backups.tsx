'use client';

import React, { useState } from 'react';
import { Archive, HardDrive } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson11Part5Backups() {
  const { language } = useLanguage();
  const [backupTab, setBackupTab] = useState<'full' | 'incremental' | 'differential'>('full');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Archive className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • ব্যাকআপ স্ট্র্যাটেজি ও 3-2-1 নিয়ম' : 'Part 4 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Database Backup Types, 3-2-1 Rule & Replication"
              bn="৪. ডেটাবেস ব্যাকআপের ধরন, 3-2-1 নিয়ম ও রেপ্লিকেশন"
            />
          </h2>
        </div>
      </div>

      {/* Backup Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'full' as const, label: 'Full Backup' },
          { id: 'incremental' as const, label: 'Incremental Backup' },
          { id: 'differential' as const, label: 'Differential Backup' },
        ].map((b) => (
          <button
            key={b.id}
            onClick={() => setBackupTab(b.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              backupTab === b.id ? 'bg-cyan-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
        {backupTab === 'full' && (
          <>
            <span className="text-cyan-400 font-mono font-bold uppercase">Full Backup (Sunday Baseline)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Copies the entire database. Slowest backup & largest storage, but fastest single-step restore."
              bn="সম্পূর্ণ ডেটাবেস কপি করে। ব্যাকআপ নিতে সময় বেশি লাগে, কিন্তু রিস্টোর সবচেয়ে দ্রুত হয়।"
            />
          </>
        )}
        {backupTab === 'incremental' && (
          <>
            <span className="text-emerald-400 font-mono font-bold uppercase">Incremental Backup (Changes Since Last Backup)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Copies only changes since the last backup of ANY type. Fastest backup & smallest size, but slowest restore (needs Full + every Incremental)."
              bn="শেষ যেকোনো ব্যাকআপের পরের পরিবর্তনটুকু নেয়। ব্যাকআপ দ্রুততম, কিন্তু রিস্টোরে সব ধাপ লাগে।"
            />
          </>
        )}
        {backupTab === 'differential' && (
          <>
            <span className="text-purple-400 font-mono font-bold uppercase">Differential Backup (Changes Since Last Full)</span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Copies all changes since the last Full backup. Balanced backup speed; restore needs only Full + latest Differential."
              bn="শেষ Full ব্যাকআপের পরের সব পরিবর্তন নেয়। রিস্টোর করতে শুধু Full + সর্বশেষ Differential লাগে।"
            />
          </>
        )}
      </div>

      {/* 3-2-1 Rule & Replication Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-2">
          <span className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5" /> The 3-2-1 Backup Rule
          </span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong>3 Copies:</strong> 1 primary + 2 backups.</li>
            <li><strong>2 Media Types:</strong> e.g., Local SSD + Cloud Object Storage (S3).</li>
            <li><strong>1 Offsite:</strong> Stored in a separate geographic region.</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
          <span className="font-mono font-bold text-rose-400 uppercase">Replication ≠ Backup!</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="If someone accidentally runs DROP TABLE Students, replication immediately drops the table on all replicas too! Only isolated backups can restore lost data."
            bn="ভুলবশত DROP TABLE চালালে রেপ্লিকেশন সাথে সাথে সব রেপ্লিকাতেও টেবিল মুছে দেয়! তাই হারানো ডেটা ফেরাতে আলাদা ব্যাকআপ লাগবেই।"
          />
        </div>
      </div>
    </section>
  );
}
