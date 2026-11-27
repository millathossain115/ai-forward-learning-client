'use client';

import React, { useState } from 'react';
import { Layers, Server } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson12Part2ArchTransparency() {
  const { language } = useLanguage();
  const [archTab, setArchTab] = useState<'client_server' | 'p2p' | 'three_tier'>('client_server');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Server className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • আর্কিটেকচার ও ট্রান্সপারেন্সি' : 'Part 2 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Distributed Architectures, Topologies & Transparency"
              bn="২. ডিস্ট্রিবিউটেড আর্কিটেকচার, টপোলজি ও ট্রান্সপারেন্সি"
            />
          </h2>
        </div>
      </div>

      {/* Architecture Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'client_server' as const, label: 'Client-Server' },
          { id: 'p2p' as const, label: 'Peer-to-Peer (P2P Ring)' },
          { id: 'three_tier' as const, label: '3-Tier Cloud / Microservices' },
        ].map((a) => (
          <button
            key={a.id}
            onClick={() => setArchTab(a.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              archTab === a.id ? 'bg-indigo-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 text-xs text-zinc-300 font-sans">
        {archTab === 'client_server' && (
          <DualText
            as="p"
            en="Client-Server: Application clients send queries to a coordinator server, which routes sub-queries to data servers."
            bn="Client-Server: ক্লায়েন্ট কোঅর্ডিনেটর সার্ভারে কুয়েরি পাঠায় এবং সার্ভার ডেটা নোডগুলোতে সাব-কুয়েরি রাউট করে।"
          />
        )}
        {archTab === 'p2p' && (
          <DualText
            as="p"
            en="Peer-to-Peer (P2P): Every node has equal responsibility (used in Cassandra / DynamoDB consistent-hashing rings) with zero single bottleneck."
            bn="Peer-to-Peer: প্রতিটি নোডের সমান ক্ষমতা থাকে (যেমন Cassandra রিং), কোনো কেন্দ্রীয় বটলনেক থাকে না।"
          />
        )}
        {archTab === 'three_tier' && (
          <DualText
            as="p"
            en="3-Tier Architecture: Presentation (Web/Mobile) -> Application / API Gateway -> Distributed Storage Cluster."
            bn="3-Tier: প্রেজেন্টেশন স্তর -> অ্যাপ্লিকেশন/এপিআই সার্ভার -> ডিস্ট্রিবিউটেড ডেটাবেস ক্লাস্টার।"
          />
        )}
      </div>

      {/* Homogeneous vs Heterogeneous + 4 Transparency Layers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="font-mono font-bold text-cyan-400 uppercase">Homogeneous vs Heterogeneous</span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong className="text-emerald-300">Homogeneous:</strong> All sites run the same DBMS (e.g., all PostgreSQL). Easy to manage.</li>
            <li><strong className="text-amber-300">Heterogeneous:</strong> Mixed DBMS engines (Oracle + MySQL + MongoDB) bridged via middleware/wrappers.</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
          <span className="font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> 4 Transparency Layers
          </span>
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans">
            <li><strong>Location:</strong> Query without knowing physical server IP.</li>
            <li><strong>Fragmentation:</strong> Query logical table as if unsharded.</li>
            <li><strong>Replication:</strong> Unaware of multiple replica copies.</li>
            <li><strong>Failure / Concurrency:</strong> Automatic failover &amp; isolation.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
