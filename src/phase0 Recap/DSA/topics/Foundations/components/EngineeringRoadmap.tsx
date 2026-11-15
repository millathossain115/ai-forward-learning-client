'use client';

import React from 'react';
import { Compass } from 'lucide-react';

export default function EngineeringRoadmap() {
  return (
    <div className="space-y-4 pt-4 border-t border-[#1b1f33]">
      <div className="flex items-center gap-2">
        <Compass className="w-5 h-5 text-sky-400" />
        <h2 className="text-xl font-bold text-white">The Forward Engineering Roadmap (লার্নিং রোডম্যাপ)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Phase 0 */}
        <div className="p-5 rounded-2xl bg-[#0f1220] border border-[#1e233b] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
              Phase 0 • Foundations &amp; DSA
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <h4 className="text-sm font-bold text-white">১. ফান্ডামেন্টালস ও অ্যালগরিদম</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            মেমরি পয়েন্টার, লিনিয়ার ও নন-লিনিয়ার ডেটা স্ট্রাকচার (Array, Stack, Queue, Hash Table, Tree, Trie, Graph) এবং কোর অ্যালগরিদমিক প্যারাডাইম।
          </p>
          <div className="pt-2 text-[11px] font-mono text-amber-400/90">✓ ১৪টি ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজার প্রস্তুত</div>
        </div>

        {/* Phase 1 */}
        <div className="p-5 rounded-2xl bg-[#0f1220] border border-[#1e233b] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold">
              Phase 1 • Database Internals
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <h4 className="text-sm font-bold text-white">২. সিস্টেমস ও ডেটাবেজ ইঞ্জিন</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            রিলেশনাল ডেটাবেজ কীভাবে কাজ করে—PostgreSQL EXPLAIN ANALYZE প্ল্যানার, B-Tree ইনডেক্সিং এবং AI এম্বেডিংসের জন্য pgvector HNSW ভেক্টর সার্চ।
          </p>
          <div className="pt-2 text-[11px] font-mono text-sky-400/90">✓ লাইভ কুয়েরি ও ইনডেক্স বেঞ্চমার্কিং</div>
        </div>

        {/* Phase 2 */}
        <div className="p-5 rounded-2xl bg-[#0f1220] border border-[#1e233b] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold">
              Phase 2 • Forward AI Core
            </span>
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
          </div>
          <h4 className="text-sm font-bold text-white">৩. ফিউচার AI ইঞ্জিনিয়ারিং</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            লার্জ ল্যাঙ্গুয়েজ মডেল (LLM) স্ট্রিমিং, হাইব্রিড RAG পাইপলাইন, অ্যানথ্রপিকের Model Context Protocol (MCP) এবং অটোনোমাস মাল্টি-এজেন্ট ফ্রেমওয়ার্ক।
          </p>
          <div className="pt-2 text-[11px] font-mono text-purple-400/90">⏳ স্পেসিফিকেশন ও মডিউল রোডম্যাপ</div>
        </div>
      </div>
    </div>
  );
}
