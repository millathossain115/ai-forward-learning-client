'use client';

import React, { useState } from 'react';
import { Layers, Server } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson16Part2ArchTransparency() {
  const { language } = useLanguage();
  const [archTab, setArchTab] = useState<'p2p' | 'three_tier' | 'client_server'>('p2p');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Server className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • আর্কিটেকচার ও ৪টি ট্রান্সপারেন্সি' : 'Part 2 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="DDBMS Architectures, Homogeneous/Heterogeneous & Transparencies"
              bn="২. DDBMS আর্কিটেকচার, টপোলজি ও ৪টি ট্রান্সপারেন্সি"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'p2p' as const, label: 'Peer-to-Peer (Symmetric)' },
          { id: 'three_tier' as const, label: 'Three-Tier Architecture' },
          { id: 'client_server' as const, label: 'Client-Server DDBMS' },
        ].map((a) => (
          <button
            key={a.id}
            onClick={() => setArchTab(a.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              archTab === a.id ? 'bg-indigo-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 text-xs text-zinc-300 font-sans">
        {archTab === 'p2p' && (
          <DualText
            as="p"
            en="Peer-to-Peer: Every node acts as both coordinator and storage peer (e.g., Cassandra/CockroachDB). Zero single bottleneck."
            bn="Peer-to-Peer: প্রতিটি নোড সমানভাবে কুয়েরি ও স্টোরেজ সামলায়—কোনো কেন্দ্রীয় বটলনেক নেই।"
          />
        )}
        {archTab === 'three_tier' && (
          <DualText
            as="p"
            en="Three-Tier: Client Tier → Application/API Middleware Tier → Distributed Data Tier. Clean separation of business logic and storage."
            bn="Three-Tier: ক্লায়েন্ট → অ্যাপ্লিকেশন/মিডলওয়্যার → ডিস্ট্রিবিউটেড ডেটাবেস ক্লাস্টার।"
          />
        )}
        {archTab === 'client_server' && (
          <DualText
            as="p"
            en="Client-Server: Client submits SQL to a central coordinator server which dispatches sub-queries to remote data servers."
            bn="Client-Server: ক্লায়েন্ট কোঅর্ডিনেটর সার্ভারে কুয়েরি পাঠায় এবং সার্ভার রিমোট ডেটা নোড থেকে ডেটা আনে।"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="font-mono font-bold text-cyan-400 uppercase">Homogeneous vs Heterogeneous</span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong className="text-emerald-300">Homogeneous:</strong> Same DBMS software at all sites.</li>
            <li><strong className="text-amber-300">Heterogeneous:</strong> Different DBMS engines linked via wrappers/gateways.</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> 4 Distribution Transparencies
          </span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong>Location:</strong> Hide physical site/IP.</li>
            <li><strong>Fragmentation:</strong> Hide horizontal/vertical splits.</li>
            <li><strong>Replication:</strong> Hide replica copies.</li>
            <li><strong>Concurrency &amp; Failure:</strong> Hide locks &amp; failovers.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
