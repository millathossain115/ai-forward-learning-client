'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const SandboxTab = dynamic(() => import('./constraints/SandboxTab'));
const CascadeTab = dynamic(() => import('./constraints/CascadeTab'));
const TableLevelTab = dynamic(() => import('./constraints/TableLevelTab'));
const MatrixTab = dynamic(() => import('./constraints/MatrixTab'));

export default function Lesson6Part7ConstraintsSandbox() {
  const { language } = useLanguage();
  const [constraintSectionTab, setConstraintSectionTab] = useState<'sandbox' | 'cascade' | 'table_level' | 'matrix'>('sandbox');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৫ • কনস্ট্রেইন্টস ও ইন্টিগ্রিটি রুলস' : 'Part 5 of 13'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="SQL Constraints & Integrity Rules Sandbox"
                bn="৫. এসকিউএল কনস্ট্রেইন্টস ও ডেটা ইন্টিগ্রিটি স্যান্ডবক্স"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Constraints enforce integrity rules at the storage engine level. If an INSERT or UPDATE violates a rule, the DBMS aborts the transaction immediately with a specific error code. Explore the interactive sandbox, cascade actions, and table-level constraints below."
          bn="কনস্ট্রেইন্টস হলো ডেটাবেসের ইঞ্জিনে তৈরি করা কিছু অলঙ্ঘনীয় নিয়ম যা ডেটার শুদ্ধতা (Data Integrity) নিশ্চিত করে। কোনো কুয়েরি নিয়ম ভঙ্গ করলে DBMS সাথে সাথে বাস্তব এরর কোডসহ তা বাতিল করে দেয়। নিচে লাইভ স্যান্ডবক্স, ক্যাস্কেড অ্যাকশন এবং কম্পোজিট কি এক্সপ্লোর করুন।"
        />

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#0a0d1e] p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
          {(
            [
              { id: 'sandbox', labelEn: 'Interactive Sandbox & Terminal', labelBn: 'ইন্টারেক্টিভ স্যান্ডবক্স ও টার্মিনাল' },
              { id: 'cascade', labelEn: 'Foreign Key & ON DELETE CASCADE', labelBn: 'ফরেন কি ও ON DELETE ক্যাস্কেডিং' },
              { id: 'table_level', labelEn: 'Column vs Table Level & Composite Keys', labelBn: 'কলাম বনাম টেবিল লেভেল ও কম্পোজিট কি' },
              { id: 'matrix', labelEn: 'Quick Comparison Matrix', labelBn: 'কনস্ট্রেইন্ট তুলনা ম্যাট্রিক্স' },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setConstraintSectionTab(tab.id);
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                constraintSectionTab === tab.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>
      {constraintSectionTab === 'sandbox' && <SandboxTab />}
      {constraintSectionTab === 'cascade' && <CascadeTab />}
      {constraintSectionTab === 'table_level' && <TableLevelTab />}
      {constraintSectionTab === 'matrix' && <MatrixTab />}
    </section>
  );
}
