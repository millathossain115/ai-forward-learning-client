'use client';

import React from 'react';
import { Cpu, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson13Part5ModernProsCons() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৫ • আধুনিক ডেটাবেস ও Polyglot ব্যবহার' : 'Part 5 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Modern Databases (NewSQL, Vector, Time-Series) & Trade-offs"
              bn="৫. আধুনিক ডেটাবেস (NewSQL, Vector, Time-Series) ও সীমাবদ্ধতা"
            />
          </h2>
        </div>
      </div>

      {/* Modern Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1.5">
          <span className="font-mono font-bold text-cyan-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Vector Databases
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Pinecone, Milvus, pgvector: Store high-dimensional AI embeddings for RAG semantic search."
            bn="Pinecone, Milvus, pgvector: AI এমবেডিং ও RAG সেমান্টিক সার্চের জন্য ব্যবহৃত হয়।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> NewSQL (Distributed SQL)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="CockroachDB, Google Spanner, TiDB: Combines horizontal sharding with full ACID SQL."
            bn="CockroachDB, Spanner: হরাইজন্টাল শার্ডিংয়ের সাথে পূর্ণ ACID SQL সুবিধা দেয়।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-purple-500/30 space-y-1.5">
          <span className="font-mono font-bold text-purple-300">Time-Series DBs</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="InfluxDB, TimescaleDB: Optimized for timestamped metrics, server monitoring, and IoT sensors."
            bn="InfluxDB, TimescaleDB: সার্ভার মনিটরিং ও IoT টাইম-স্ট্যাম্পড ডেটার জন্য তৈরি।"
          />
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-400 uppercase">Advantages of NoSQL</span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li>Effortless horizontal scaling across commodity nodes.</li>
            <li>Schema agility for rapid product iteration.</li>
            <li>Ultra-fast key-value or pre-joined document reads.</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
          <span className="font-mono font-bold text-rose-400 uppercase">Disadvantages of NoSQL</span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li>Weak multi-record ACID support compared to RDBMS.</li>
            <li>No standardized cross-engine query language like SQL.</li>
            <li>Data duplication when denormalizing documents.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
