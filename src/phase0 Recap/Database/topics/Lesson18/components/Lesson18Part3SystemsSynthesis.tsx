'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson18Part3SystemsSynthesis() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • সিস্টেমস ও পারফরম্যান্স রিভিশন' : 'Part 3 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Core Systems Synthesis: ACID, Indexing, NoSQL, Security & DDBMS"
              bn="৩. সিস্টেমস সারসংক্ষেপ: ACID, ইনডেক্সিং, NoSQL, সিকিউরিটি ও DDBMS"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {[
          { t: 'SQL Execution Order', d: 'FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT', c: 'text-cyan-300' },
          { t: 'ACID & Concurrency', d: 'Atomicity, Consistency, Isolation (2PL/MVCC), Durability (WAL UNDO/REDO).', c: 'text-emerald-300' },
          { t: 'Indexing & EXPLAIN', d: 'B+ Tree O(log N) range scans, Clustered (1/table), Leftmost Prefix, avoid functions on indexed cols.', c: 'text-purple-300' },
          { t: 'NoSQL & Polyglot', d: 'Document (Mongo), Key-Value (Redis), Columnar (Cassandra), Graph (Neo4j), Vector (RAG).', c: 'text-amber-300' },
          { t: 'Security & Recovery', d: 'CIA Triad, RBAC (PoLP), Prepared Statements (anti-SQLi), AES-256 + TLS, 3-2-1 Backups & PITR.', c: 'text-rose-300' },
          { t: 'DDBMS & OLAP', d: 'Horizontal/Vertical sharding, 2PC atomic commits, CAP (CP vs AP), ETL -> Star Schema.', c: 'text-indigo-300' },
        ].map((card) => (
          <div key={card.t} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
            <span className={`font-mono font-bold block ${card.c}`}>{card.t}</span>
            <p className="text-zinc-300 font-sans leading-relaxed">{card.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
