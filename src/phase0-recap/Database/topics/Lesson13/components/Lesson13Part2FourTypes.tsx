'use client';

import React, { useState } from 'react';
import { Braces, Database, KeyRound, Share2, Table as TableIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type NoSqlType = 'document' | 'keyvalue' | 'columnar' | 'graph';

const MODEL_CARDS: Record<
  NoSqlType,
  {
    title: string;
    engines: string;
    descEn: string;
    descBn: string;
    example: string;
    useCaseEn: string;
    useCaseBn: string;
  }
> = {
  document: {
    title: '1. Document Store',
    engines: 'MongoDB, CouchDB, Firestore',
    descEn: 'Stores self-describing JSON/BSON documents. Nested arrays and varying fields require zero ALTER TABLE migrations.',
    descBn: 'JSON/BSON ডকুমেন্ট আকারে ডেটা রাখে। নেস্টেড ডেটার জন্য কোনো ফিক্সড কলামের প্রয়োজন হয় না।',
    example: `{
  "_id": "stu_101",
  "name": "Rahim",
  "skills": ["SQL", "Node.js", "Docker"],
  "address": { "city": "Dhaka", "zip": 1207 }
}`,
    useCaseEn: 'E-commerce catalogs, CMS, user profiles',
    useCaseBn: 'ই-কমার্স ক্যাটালগ, CMS, ইউজার প্রোফাইল',
  },
  keyvalue: {
    title: '2. Key-Value Store',
    engines: 'Redis, DynamoDB, Memcached',
    descEn: 'Giant distributed hash map offering O(1) sub-millisecond reads/writes by unique key.',
    descBn: 'হ্যাশ ম্যাপের মতো ইউনিক Key দিয়ে O(1) সময়ে সাব-মিলিসেকেন্ডে ডেটা রিড/রাইট করে।',
    example: `SET session:u101 '{"role":"student","exp":3600}' EX 3600
GET session:u101
INCR api:rate_limit:192.168.1.5`,
    useCaseEn: 'Caching, session tokens, leaderboards, rate limiters',
    useCaseBn: 'ক্যাশিং, সেশন টোকেন, লিডারবোর্ড, রেট লিমিটার',
  },
  columnar: {
    title: '3. Wide-Column Store',
    engines: 'Apache Cassandra, HBase, ScyllaDB',
    descEn: 'Stores data by column families partitioned across nodes. Built for massive write throughput and time-ordered scans.',
    descBn: 'কলাম ফ্যামিলি অনুযায়ী ডেটা রাখে। বিশাল রাইট থ্রুপুট ও টাইম-সিরিজ ডেটার জন্য তৈরি।',
    example: `RowKey: "sensor_42:2026-11-27"
  ├── temp: 24.8°C
  ├── humidity: 61%
  └── status: "OK"`,
    useCaseEn: 'IoT telemetry, chat history, event logging',
    useCaseBn: 'IoT সেন্সর ডেটা, চ্যাট হিস্ট্রি, ইভেন্ট লগিং',
  },
  graph: {
    title: '4. Graph Database',
    engines: 'Neo4j, Amazon Neptune',
    descEn: 'Stores Entities as Nodes and Relationships as first-class Edges—eliminating expensive multi-hop SQL JOINs.',
    descBn: 'ডেটাকে Node এবং সম্পর্ককে Edge হিসেবে সংরক্ষণ করে, ফলে জটিল নেটওয়ার্ক ট্রাভার্সাল অত্যন্ত দ্রুত হয়।',
    example: `MATCH (s:Student {name: "Rahim"})-[:ENROLLED_IN]->(c:Course)
RETURN s.name, c.title;`,
    useCaseEn: 'Social networks, fraud rings, recommendation engines',
    useCaseBn: 'সোশ্যাল নেটওয়ার্ক, ফ্রড ডিটেকশন, রেকমেন্ডেশন',
  },
};

export default function Lesson13Part2FourTypes() {
  const { language } = useLanguage();
  const [activeType, setActiveType] = useState<NoSqlType>('document');
  const current = MODEL_CARDS[activeType];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • ৪টি প্রধান NoSQL ধরন' : 'Part 2 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Four Major Types of NoSQL Databases"
              bn="২. NoSQL ডেটাবেসের ৪টি প্রধান ধরন"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'document' as const, label: 'Document', icon: Braces },
          { id: 'keyvalue' as const, label: 'Key-Value', icon: KeyRound },
          { id: 'columnar' as const, label: 'Column-Family', icon: TableIcon },
          { id: 'graph' as const, label: 'Graph', icon: Share2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveType(item.id)}
              className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2 ${
                activeType === item.id
                  ? 'bg-cyan-600/25 border-cyan-400 text-white '
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-xs font-mono font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#14182d] border border-slate-700/60">
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-mono font-bold text-cyan-300">{current.title}</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-300 border border-slate-800">
              {current.engines}
            </span>
          </div>
          <DualText as="p" className="text-zinc-300 font-sans leading-relaxed" en={current.descEn} bn={current.descBn} />
          <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200">
            <strong className="font-mono text-cyan-400 mr-1">Best Use:</strong>
            <DualText as="span" en={current.useCaseEn} bn={current.useCaseBn} />
          </div>
        </div>
        <pre className="p-3.5 bg-black/60 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
          {current.example}
        </pre>
      </div>
    </section>
  );
}
