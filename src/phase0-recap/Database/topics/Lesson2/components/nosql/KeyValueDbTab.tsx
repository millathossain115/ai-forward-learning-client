'use client';

import React, { useState } from 'react';
import {
  Hash,
  Zap,
} from 'lucide-react';
import DualText from '@/components/DualText';
import { KV_DATA } from './nosqlData';

export default function KeyValueDbTab() {
  const [lookupKey, setLookupKey] = useState<string>('student:101');
  const [cacheHits, setCacheHits] = useState<number>(42);

  return (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Model 06-B</span>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Hash className="w-4 h-4 text-amber-400" />
              <DualText
                en="Key-Value Store (In-Memory Microsecond Cache & Session Store)"
                bn="কি-ভ্যালু স্টোর (ইন-মেমোরি মাইক্রোসেকেন্ড ক্যাশ ও সেশন ইঞ্জিন)"
              />
            </h4>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Redis acts as an ultra-fast in-memory hash map. Key lookups take O(1) constant time (~0.3 milliseconds). Perfect for university student session logins, shopping carts, and real-time active user tracking."
              bn="Redis মেমোরিতে (RAM) হ্যাশ-ম্যাপ আকারে ডেটা রাখে। কি-দিয়ে অনুসন্ধান O(1) ধ্রুবক সময়ে (প্রায় ০.৩ মিলি-সেকেন্ড) সম্পন্ন হয়। দ্রুতগতির সেশন ও ক্যাশিংয়ের জন্য এটি বিশ্বজুড়ে ব্যবহৃত হয়।"
            />
          </div>

          {/* Key Selection and Live Inspector */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-amber-900/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Redis RAM Cache (Click Key to Simulate Instant GET):
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Cache Hit Ratio: <strong className="text-emerald-400">99.8%</strong> (Hits: {cacheHits})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(KV_DATA).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setLookupKey(key);
                    setCacheHits((prev) => prev + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                    lookupKey === key
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 font-bold ring-1 ring-amber-400'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-slate-700'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Simulated Redis Response Terminal */}
            <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-slate-800 pb-1.5">
                <span>redis-cli &gt; GET {lookupKey}</span>
                <span className="text-emerald-400 font-bold">Latency: 0.28ms (RAM Hit)</span>
              </div>
              <div className="text-emerald-300 font-bold text-xs pt-1 break-all">
                {KV_DATA[lookupKey]?.value}
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                <span>Data Type: {KV_DATA[lookupKey]?.type}</span>
                <span>Time-To-Live (TTL): {KV_DATA[lookupKey]?.ttl}</span>
              </div>
            </div>
          </div>
        </div>
  );
}
