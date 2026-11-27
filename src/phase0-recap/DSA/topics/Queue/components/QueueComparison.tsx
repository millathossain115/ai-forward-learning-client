import React from 'react';
import { Repeat, CircleDot, Link as LinkIcon } from 'lucide-react';

export default function QueueComparison() {
  return (
    <div className="bg-[#0f111a] border border-[#23273e] p-5 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#15171e] text-slate-950 flex items-center justify-center font-bold">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">
              Circular Queue বনাম Circular Linked List — একনজরে মূল পার্থক্য
            </h3>
            <span className="text-[10px] font-mono text-zinc-400">
              দুটোই চক্রাকার, কিন্তু গঠন ও ব্যবহারের ধরন ভিন্ন
            </span>
          </div>
        </div>
      </div>

      {/* 4 Clean Visual Comparison Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Circular Queue (Ring Buffer) */}
        <div className="bg-[#0b0c16] border border-amber-500/25 p-4 rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-amber-500/20">
            <span className="text-xs font-bold font-mono text-amber-300 flex items-center gap-1.5">
              <CircleDot className="w-3.5 h-3.5 text-amber-400" /> Circular Queue (রিং বাফার)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              অ্যারে + মডিউলো
            </span>
          </div>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">মেমরি:</span>
              <span className="font-mono font-bold text-zinc-200">ফিক্সড অ্যারে (RAM ব্লক)</span>
            </div>
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">চক্রাকার লজিক:</span>
              <span className="font-mono font-bold text-amber-300">(i + 1) % N গণিত</span>
            </div>
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">এক্সেস নিয়ম:</span>
              <span className="font-mono font-bold text-zinc-200">কঠোর FIFO (Front & Rear)</span>
            </div>
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">মেমরি খরচ:</span>
              <span className="font-mono font-bold text-emerald-400">০ অতিরিক্ত পয়েন্টার (দ্রুত ক্যাশ)</span>
            </div>
          </div>
        </div>

        {/* Circular Linked List */}
        <div className="bg-[#0b0c16] border border-cyan-500/25 p-4 rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
            <span className="text-xs font-bold font-mono text-cyan-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> Circular Linked List
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              নোড পয়েন্টার
            </span>
          </div>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">মেমরি:</span>
              <span className="font-mono font-bold text-zinc-200">ডায়নামিক নোড (হিপ মেমরি)</span>
            </div>
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">চক্রাকার লজিক:</span>
              <span className="font-mono font-bold text-cyan-300">Tail.next = Head পয়েন্টার</span>
            </div>
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">এক্সেস নিয়ম:</span>
              <span className="font-mono font-bold text-zinc-200">যেকোনো নোডে অবাধ যাতায়াত</span>
            </div>
            <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
              <span className="text-zinc-400 text-[11px]">মেমরি খরচ:</span>
              <span className="font-mono font-bold text-amber-300">প্রতি নোডে পয়েন্টার ওভারহেড</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
