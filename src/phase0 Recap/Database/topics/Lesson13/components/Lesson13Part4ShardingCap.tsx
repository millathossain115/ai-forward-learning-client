'use client';

import React, { useMemo, useState } from 'react';
import { Server, Split } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson13Part4ShardingCap() {
  const { language } = useLanguage();
  const [shardUserId, setShardUserId] = useState<number>(1042);

  const targetShard = useMemo(() => (Math.abs(shardUserId) % 3) + 1, [shardUserId]);

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Split className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • স্কেলিং, শার্ডিং ও BASE' : 'Part 4 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Scaling (Vertical vs Horizontal), Sharding Router & BASE"
              bn="৪. স্কেলিং (Vertical বনাম Horizontal), শার্ডিং রাউটার ও BASE"
            />
          </h2>
        </div>
      </div>

      {/* Vertical vs Horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-amber-300 uppercase">Vertical Scaling (Scale-Up)</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Upgrade CPU, RAM, and NVMe SSD on a single server. Simple ACID, but hits physical hardware cost limits."
            bn="একই সার্ভারে CPU, RAM ও SSD বাড়ানো। সহজ, তবে হার্ডওয়্যারের একটি নির্দিষ্ট সীমা আছে।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-300 uppercase">Horizontal Scaling (Scale-Out / Sharding)</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Add more commodity servers and partition rows across shards. Virtually unlimited scale for reads and writes."
            bn="একাধিক সার্ভার যোগ করে ডেটা শার্ডে ভাগ করা। রিড ও রাইট উভয় দিকেই বিশাল স্কেল করা যায়।"
          />
        </div>
      </div>

      {/* Interactive Shard Router */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono font-bold text-purple-300 uppercase flex items-center gap-1.5">
            <Server className="w-4 h-4" />
            <DualText as="span" en="Live Shard Key Router: Shard = (user_id mod 3) + 1" bn="লাইভ Shard Key রাউটার: Shard = (user_id mod 3) + 1" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">user_id:</span>
            <input
              type="number"
              value={shardUserId}
              onChange={(e) => setShardUserId(parseInt(e.target.value, 10) || 0)}
              className="w-28 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`p-3 rounded-xl border text-center transition-all ${
                targetShard === s
                  ? 'bg-emerald-950/30 border-emerald-400 text-emerald-300 font-bold shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-zinc-500'
              }`}
            >
              <div>Shard #{s}</div>
              <div className="text-[10px] mt-0.5">
                {targetShard === s ? `← Routed user_id ${shardUserId}` : 'Idle'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BASE */}
      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 text-xs space-y-1">
        <span className="font-mono font-bold text-cyan-300 uppercase">BASE Model (Distributed NoSQL)</span>
        <DualText
          as="p"
          className="text-zinc-300 font-sans"
          en="Basically Available (responds even during partial failures), Soft State (state may change over time without input), Eventual Consistency (converges once writes stop)."
          bn="Basically Available (আংশিক ত্রুটিতেও রেসপন্স দেয়), Soft State এবং Eventual Consistency (সময়ের সাথে সব নোড সিঙ্ক হয়)।"
        />
      </div>
    </section>
  );
}
