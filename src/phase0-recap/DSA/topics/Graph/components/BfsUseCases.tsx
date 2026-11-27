'use client';

import React from 'react';
import { Cpu, Radio, Globe, Trash2, Binary, Sparkles } from 'lucide-react';

export default function BfsUseCases() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>কম্পিউটার সায়েন্সে BFS-এর ৪টি প্রধান ব্যবহার</span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-sky-950 border border-sky-800 text-sky-300">
              CS Computing
            </span>
          </h2>
          <p className="text-[11px] text-zinc-400">
            আধুনিক সিস্টেম সফটওয়্যার ও নেটওয়ার্কিংয়ে BFS-এর অপরিহার্য ভূমিকা
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Card 1: Network Routing */}
        <div className="p-3.5 rounded-xl bg-[#08101a] border border-[#1b2b42] hover:border-sky-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              ১. নেটওয়ার্ক রাউটিং ও শর্টেস্ট হপ
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-semibold">
              Shortest Path
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-sky-400 font-bold">•</span>
              <span><b>P2P, BitTorrent ও ব্লকচেইন:</b> নোডগুলোর মধ্যে মেসেজ ও ব্লক দ্রুত ব্রডকাস্ট করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-sky-400 font-bold">•</span>
              <span><b>কারণ:</b> আনওয়েটেড নেটওয়ার্কে BFS ১ম বারেই নিশ্চিত সর্বনিম্ন লিংক (Min Hops) খুঁজে পায়।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091b2c] text-sky-300 border border-sky-900/60">Gossip Protocol</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091b2c] text-sky-300 border border-sky-900/60">Min Hop Count</span>
          </div>
        </div>

        {/* Card 2: Web Crawlers */}
        <div className="p-3.5 rounded-xl bg-[#08101a] border border-[#1b2b42] hover:border-emerald-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              ২. সার্চ ইঞ্জিন ওয়েব ক্রলার (Web Crawler)
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
              Breadth Crawling
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>Googlebot / Bingbot:</b> রুট URL থেকে হাইপারলিংক ধরে সমান লেভেলে ক্রল করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>কারণ:</b> কোনো সাইটের অসীম ডিপ লিংকে না আটকে গুরুত্বপূর্ণ উচ্চ-র‍্যাঙ্ক পেজ আগে ইনডেক্স হয়।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091a14] text-emerald-300 border border-emerald-900/60">FIFO URL Queue</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091a14] text-emerald-300 border border-emerald-900/60">PageRank First</span>
          </div>
        </div>

        {/* Card 3: Garbage Collection */}
        <div className="p-3.5 rounded-xl bg-[#08101a] border border-[#1b2b42] hover:border-amber-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5 text-amber-400" />
              ৩. V8 ও JVM মেমরি গার্বেজ কালেকশন
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-semibold">
              Cheney&apos;s Copying GC
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><b>Node.js (V8) ও Java JVM:</b> হিপ মেমরির লাইভ অবজেক্ট ম্যানেজ ও কম্প্যাক্ট করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><b>কারণ:</b> রুট অবজেক্ট থেকে BFS অর্ডারে মেমরি কপি করে ডেড মেমরি নিরাপদভাবে ফাঁকা করে।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c160a] text-amber-300 border border-amber-900/60">Live Heap Copy</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c160a] text-amber-300 border border-amber-900/60">Memory Compaction</span>
          </div>
        </div>

        {/* Card 4: Tree Serialization */}
        <div className="p-3.5 rounded-xl bg-[#08101a] border border-[#1b2b42] hover:border-violet-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-violet-400" />
              ৪. ট্রি সিরিয়ালাইজেশন ও ক্যাশ
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-violet-950 border border-violet-800 text-violet-300 font-semibold">
              Level-Order Storage
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-violet-400 font-bold">•</span>
              <span><b>ডেটাবেজ ও Redis:</b> হায়ারার্কিক্যাল ট্রি বা গ্রাফকে ফ্ল্যাট অ্যারে/স্ট্রিংয়ে রূপান্তর করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-violet-400 font-bold">•</span>
              <span><b>কারণ:</b> লেভেল-বাই-লেভেল ডেটা নেটওয়ার্কে দ্রুত ট্রান্সফার এবং লিনিয়ার O(N) সময়ে পুনর্গঠনযোগ্য।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181028] text-violet-300 border border-violet-900/60">Flat Array Encoding</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181028] text-violet-300 border border-violet-900/60">Fast O(N) Rebuild</span>
          </div>
        </div>
      </div>

      {/* Compact Rule */}
      <div className="p-3 rounded-xl bg-[#081220] border border-[#1b3456] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span><b>কখন BFS:</b> আনওয়েটেড গ্রাফে সর্বনিম্ন দূরত্ব (Shortest Path), সোর্সের কাছে টার্গেট খোঁজা ও লেভেল-অর্ডার প্রসেসিং।</span>
        </div>
        <span className="font-mono text-[10px] text-sky-300 px-2 py-0.5 rounded bg-sky-950 border border-sky-800 shrink-0">
          Space: O(Width)
        </span>
      </div>
    </div>
  );
}
