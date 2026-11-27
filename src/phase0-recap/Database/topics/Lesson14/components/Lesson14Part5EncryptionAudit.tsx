'use client';

import React from 'react';
import { Activity, Lock, Network } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson14Part5EncryptionAudit() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৫ • এনক্রিপশন ও অডিটিং' : 'Part 5 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Database Encryption (At Rest vs In Transit) & Forensic Auditing"
              bn="৫. এনক্রিপশন (At Rest বনাম In Transit) ও ফরেনসিক অডিটিং"
            />
          </h2>
        </div>
      </div>

      {/* Encryption */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1.5">
          <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Encryption at Rest (AES-256 / TDE)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Encrypts data files, backups, and WAL logs stored on disk so physical drive theft yields unreadable ciphertext."
            bn="ডিস্ক ফাইল, ব্যাকআপ ও WAL লগ AES-256 দিয়ে এনক্রিপ্ট করে রাখে যেন হার্ডড্রাইভ চুরি হলেও ডেটা পড়া না যায়।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" /> Encryption in Transit (TLS 1.3)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Encrypts network traffic between app servers and DB engine, blocking packet sniffers & Man-in-the-Middle attacks."
            bn="অ্যাপ সার্ভার ও ডেটাবেসের মধ্যকার নেটওয়ার্ক ট্রাফিক TLS 1.3 দিয়ে এনক্রিপ্ট করে।"
          />
        </div>
      </div>

      {/* Forensic Audit Log */}
      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
        <span className="text-xs font-mono font-bold text-purple-300 uppercase flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" />
          <DualText as="span" en="Forensic Audit Trail (Who, What, When, Where)" bn="ফরেনসিক অডিট লগ (কে, কী, কখন, কোথা থেকে)" />
        </span>
        <div className="overflow-x-auto rounded-lg border border-slate-800 font-mono text-[11px]">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-zinc-400">
              <tr>
                <th className="py-1.5 px-3">Timestamp</th>
                <th className="py-1.5 px-3">User / Role</th>
                <th className="py-1.5 px-3">Action</th>
                <th className="py-1.5 px-3">Target</th>
                <th className="py-1.5 px-3">Source IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr>
                <td className="py-1.5 px-3">2026-11-27 02:10:04</td>
                <td className="py-1.5 px-3 text-cyan-300">dr_hasan (teacher)</td>
                <td className="py-1.5 px-3 text-emerald-400">UPDATE</td>
                <td className="py-1.5 px-3">EXAM_MARKS (id=101)</td>
                <td className="py-1.5 px-3">10.20.4.18</td>
              </tr>
              <tr>
                <td className="py-1.5 px-3">2026-11-27 02:11:19</td>
                <td className="py-1.5 px-3 text-rose-400">guest_user</td>
                <td className="py-1.5 px-3 text-rose-400">DENIED (SELECT)</td>
                <td className="py-1.5 px-3">PAYMENTS</td>
                <td className="py-1.5 px-3">185.44.12.9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
