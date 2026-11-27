'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Boxes, FileCode2, Hash, Table as TableIcon, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type NoSqlSubTab = 'document' | 'key-value' | 'column' | 'graph';

const DocumentDbTab = dynamic(() => import('./nosql/DocumentDbTab'));
const KeyValueDbTab = dynamic(() => import('./nosql/KeyValueDbTab'));
const ColumnFamilyTab = dynamic(() => import('./nosql/ColumnFamilyTab'));
const GraphDbTab = dynamic(() => import('./nosql/GraphDbTab'));

const TABS = [
  { id: 'document', labelEn: '1. Document (MongoDB)', labelBn: '১. ডকুমেন্ট (MongoDB)', icon: FileCode2 },
  { id: 'key-value', labelEn: '2. Key-Value (Redis)', labelBn: '২. কী-ভ্যালু (Redis)', icon: Hash },
  { id: 'column', labelEn: '3. Column-Family (Cassandra)', labelBn: '৩. কলাম-ফ্যামিলি', icon: TableIcon },
  { id: 'graph', labelEn: '4. Graph (Neo4j)', labelBn: '৪. গ্রাফ (Neo4j)', icon: Share2 },
] as const;

export default function NoSqlModelVisualizer() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<NoSqlSubTab>('document');

  return (
    <div className="p-5 md:p-7 rounded-2xl bg-[#101116] border border-cyan-500/40 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
            <Boxes className="w-4 h-4 text-cyan-400" />
            <DualText
              en="NoSQL Database Models (Polyglot Persistence & Distributed Scale)"
              bn="নো-এসকিউএল ডেটাবেস মডেলসমূহ (পলিপ্লট ও ক্লাউড স্কেলিং আর্কিটেকচার)"
            />
          </span>
          <div className="text-[11px] text-zinc-400 font-sans mt-0.5">
            {language === 'bn'
              ? 'আধুনিক ওয়েব স্কেলিংয়ের জন্য ৪ ধরনের NoSQL স্টোরেজ ইঞ্জিন ও লাইভ আর্কিটেকচার'
              : '4 Modern Non-Relational Engines for Hyperscale Web, Cache & Graph Analytics'}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-[#15171e] p-1 rounded-xl border border-white/[0.08] text-[11px] font-mono">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'document' && <DocumentDbTab />}
      {activeTab === 'key-value' && <KeyValueDbTab />}
      {activeTab === 'column' && <ColumnFamilyTab />}
      {activeTab === 'graph' && <GraphDbTab />}
    </div>
  );
}
