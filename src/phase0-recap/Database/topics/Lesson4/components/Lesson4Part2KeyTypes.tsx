'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  KeyRound,
  Lock,
  Link2,
  Sparkles,
  Layers,
  Database,
  Hash,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type KeyTypeId =
  | 'super'
  | 'candidate'
  | 'primary'
  | 'alternate'
  | 'foreign'
  | 'composite'
  | 'unique'
  | 'surrogate';

const TabLoadingFallback = () => (
  <div className="p-6 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-4">
    <div className="h-6 w-1/3 bg-slate-800 rounded" />
    <div className="h-32 w-full bg-slate-800/60 rounded-xl" />
  </div>
);

const SuperKeyTab = dynamic(() => import('./keys/SuperKeyTab'), { loading: TabLoadingFallback });
const CandidateKeyTab = dynamic(() => import('./keys/CandidateKeyTab'), { loading: TabLoadingFallback });
const PrimaryKeyTab = dynamic(() => import('./keys/PrimaryKeyTab'), { loading: TabLoadingFallback });
const AlternateKeyTab = dynamic(() => import('./keys/AlternateKeyTab'), { loading: TabLoadingFallback });
const ForeignKeyTab = dynamic(() => import('./keys/ForeignKeyTab'), { loading: TabLoadingFallback });
const CompositeKeyTab = dynamic(() => import('./keys/CompositeKeyTab'), { loading: TabLoadingFallback });
const UniqueKeyTab = dynamic(() => import('./keys/UniqueKeyTab'), { loading: TabLoadingFallback });
const SurrogateKeyTab = dynamic(() => import('./keys/SurrogateKeyTab'), { loading: TabLoadingFallback });

const KEY_TABS = [
  { id: 'super', num: '1', labelEn: 'Super Key', labelBn: 'সুপার কী', tagEn: 'All Unique Sets', tagBn: 'সকল অনন্য কম্বিনেশন', icon: KeyRound },
  { id: 'candidate', num: '2', labelEn: 'Candidate Key', labelBn: 'ক্যান্ডিডেট কী', tagEn: 'Minimal Super Key', tagBn: 'ন্যূনতম সুপার কী', icon: Sparkles },
  { id: 'primary', num: '3', labelEn: 'Primary Key', labelBn: 'প্রাইমারি কী', tagEn: 'Main ID (NOT NULL)', tagBn: 'প্রধান অনন্য আইডি', icon: Lock },
  { id: 'alternate', num: '4', labelEn: 'Alternate Key', labelBn: 'অল্টারনেট কী', tagEn: 'Remaining Candidates', tagBn: 'বিকল্প ক্যান্ডিডেটসমূহ', icon: Layers },
  { id: 'foreign', num: '5', labelEn: 'Foreign Key', labelBn: 'ফরেন কী', tagEn: 'Parent ← Child Link', tagBn: 'রেফারেন্সিয়াল ইন্টিগ্রিটি', icon: Link2 },
  { id: 'composite', num: '6', labelEn: 'Composite Key', labelBn: 'কম্পোজিট কী', tagEn: '≥ 2 Combined Columns', tagBn: 'একাধিক কলামের কি', icon: Hash },
  { id: 'unique', num: '7', labelEn: 'Unique Key', labelBn: 'ইউনিক কী', tagEn: 'No Duplicates (NULL OK)', tagBn: 'ডুপ্লিকেটহীন (NULL অনুমোদন)', icon: ShieldCheck },
  { id: 'surrogate', num: '8', labelEn: 'Natural & Surrogate', labelBn: 'ন্যাচারাল ও সারোগেট', tagEn: 'Real vs Synthetic ID', tagBn: 'বাস্তব বনাম কৃত্রিম আইডি', icon: Database },
] as const;

export default function Lesson4Part2KeyTypes() {
  const { language } = useLanguage();
  const [activeKeyType, setActiveKeyType] = useState<KeyTypeId>('super');

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
                {language === 'bn' ? 'পর্ব ২ / ৬' : 'Part 2 of 6'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold hidden sm:inline">
                Interactive Multi-Key Workbench
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="The Types of Keys in DBMS"
                bn="ডিবিএমএস-এ বিভিন্ন ধরনের কী (Types of Keys in DBMS)"
              />
            </h2>
          </div>
        </div>

        <div className="text-xs font-mono text-zinc-400 bg-[#15171e] px-3 py-1.5 rounded-xl border border-white/[0.08] self-start sm:self-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            {language === 'bn' ? 'সক্রিয় কী:' : 'Active Key:'}{' '}
            <strong className="text-white">
              {KEY_TABS.find((t) => t.id === activeKeyType)?.[language === 'bn' ? 'labelBn' : 'labelEn']}
            </strong>
          </span>
        </div>
      </div>

      {/* 8 Key Selector Tabs (Full-Width Responsive Grid Across Top) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {KEY_TABS.map((tab) => {
          const isActive = activeKeyType === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveKeyType(tab.id)}
              className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between gap-2 group ${
                isActive
                  ? 'bg-[#15171e] border-indigo-500 text-white ring-1 ring-indigo-500/60  '
                  : 'bg-[#101116] border-white/[0.08] text-zinc-400 hover:border-white/[0.12] hover:bg-[#101116] hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                    isActive
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                      : 'bg-black/40 border-white/[0.08] text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isActive ? 'text-indigo-400' : 'text-zinc-500'
                  }`}
                >
                  #{tab.num}
                </span>
              </div>

              <div>
                <span
                  className={`text-xs font-bold block truncate ${
                    isActive ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {language === 'bn' ? tab.labelBn : tab.labelEn}
                </span>
                <span
                  className={`text-[10px] font-mono block truncate ${
                    isActive ? 'text-indigo-300/80 font-medium' : 'text-zinc-500'
                  }`}
                >
                  {language === 'bn' ? tab.tagBn : tab.tagEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {activeKeyType === 'super' && <SuperKeyTab />}
      {activeKeyType === 'candidate' && <CandidateKeyTab />}
      {activeKeyType === 'primary' && <PrimaryKeyTab />}
      {activeKeyType === 'alternate' && <AlternateKeyTab />}
      {activeKeyType === 'foreign' && <ForeignKeyTab />}
      {activeKeyType === 'composite' && <CompositeKeyTab />}
      {activeKeyType === 'unique' && <UniqueKeyTab />}
      {activeKeyType === 'surrogate' && <SurrogateKeyTab />}
    </section>
  );
}
