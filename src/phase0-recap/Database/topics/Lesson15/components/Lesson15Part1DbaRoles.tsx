'use client';

import React, { useState } from 'react';
import { Server, UserCheck, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson15Part1DbaRoles() {
  const { language } = useLanguage();
  const [dbaType, setDbaType] = useState<'prod' | 'dev' | 'app' | 'cloud'>('prod');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Server className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • DBA পরিচিতি ও ধরন' : 'Part 1 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Who Is a DBA? Core Responsibilities & 4 DBA Types"
              bn="১. DBA কে? মূল দায়িত্ব এবং ৪ ধরনের DBA"
            />
          </h2>
        </div>
      </div>

      {/* 8 Core Roles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        {[
          { t: '1. Installation & Patching', dEn: 'Engine setup & security updates', dBn: 'ইঞ্জিন সেটআপ ও প্যাচিং' },
          { t: '2. Security & RBAC', dEn: 'Least privilege, TLS & audits', dBn: 'RBAC, TLS ও অডিট' },
          { t: '3. Backup & PITR', dEn: 'Scheduled backups & restore drills', dBn: 'ব্যাকআপ ও রিস্টোর ড্রিল' },
          { t: '4. Performance Tuning', dEn: 'Slow query & index optimization', dBn: 'স্লো কুয়েরি টিউনিং' },
          { t: '5. HA & Failover', dEn: 'Zero/low-downtime replication', dBn: 'রেপ্লিকেশন ও ফেইলওভার' },
          { t: '6. Capacity Planning', dEn: 'Disk, RAM & IOPS forecasting', dBn: 'স্টোরেজ ও RAM পূর্বাভাস' },
          { t: '7. Schema Governance', dEn: 'Safe zero-downtime migrations', dBn: 'নিরাপদ স্কিমা মাইগ্রেশন' },
          { t: '8. 24/7 Incident Ops', dEn: 'Deadlocks & outage triage', dBn: 'আউটেজ ও ডেডলক সমাধান' },
        ].map((r) => (
          <div key={r.t} className="p-3 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-cyan-300 block">{r.t}</span>
            <p className="text-[11px] text-zinc-400 font-sans">{language === 'bn' ? r.dBn : r.dEn}</p>
          </div>
        ))}
      </div>

      {/* 4 DBA Types */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'prod' as const, label: 'Production DBA' },
          { id: 'dev' as const, label: 'Development DBA' },
          { id: 'app' as const, label: 'Application DBA' },
          { id: 'cloud' as const, label: 'Cloud / SRE DBA' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setDbaType(t.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              dbaType === t.id ? 'bg-cyan-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 text-xs text-zinc-300 font-sans flex items-start gap-2.5">
        {dbaType === 'prod' || dbaType === 'cloud' ? (
          <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        )}
        <div>
          {dbaType === 'prod' && (
            <DualText
              as="p"
              en="Production DBA: Owns 24/7 live database uptime, SLA compliance, backups, HA failovers, and incident response."
              bn="Production DBA: লাইভ ডেটাবেসের ২৪/৭ আপটাইম, ব্যাকআপ, ফেইলওভার এবং ইনসিডেন্ট রেসপন্স পরিচালনা করেন।"
            />
          )}
          {dbaType === 'dev' && (
            <DualText
              as="p"
              en="Development DBA: Focuses on logical/physical schema design, normalization, stored procedures, and index planning."
              bn="Development DBA: স্কিমা ডিজাইন, নরমালাইজেশন, স্টোর্ড প্রসিডিউর ও ইনডেক্স প্ল্যানিং করেন।"
            />
          )}
          {dbaType === 'app' && (
            <DualText
              as="p"
              en="Application DBA: Bridges backend engineers and DB engines—tuning ORM queries, N+1 issues, and connection pools."
              bn="Application DBA: ব্যাকএন্ড ডেভেলপারদের ORM কুয়েরি, N+1 সমস্যা ও কনেকশন পুল অপটিমাইজ করেন।"
            />
          )}
          {dbaType === 'cloud' && (
            <DualText
              as="p"
              en="Cloud / SRE DBA: Automates RDS/Aurora/Cloud SQL provisioning via Terraform, read-replica scaling, and cost optimization."
              bn="Cloud / SRE DBA: Terraform দিয়ে ক্লাউড DB অটোমেশন, অটো-স্কেলিং এবং কস্ট অপটিমাইজেশন করেন।"
            />
          )}
        </div>
      </div>
    </section>
  );
}
