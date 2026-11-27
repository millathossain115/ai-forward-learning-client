import React from 'react';
import { Clock, HardDrive } from 'lucide-react';

export default function SelectionSortCases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>কমপ্লেক্সিটি ম্যাট্রিক্স</span>
        </h3>
        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Best Case Time:</span>
            <span className="text-rose-400 font-bold">O(N²) (কারণ পুরো আন-সর্টেড স্ক্যান করতেই হয়)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Average Case Time:</span>
            <span className="text-amber-400 font-bold">O(N²)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Worst Case Time:</span>
            <span className="text-rose-400 font-bold">O(N²)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Memory Swaps (Writes):</span>
            <span className="text-emerald-400 font-bold">Strictly O(N) — সর্বোচ্চ N-1 টি সোয়াপ</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Stability:</span>
            <span className="text-rose-400 font-bold">Unstable (দূরপাল্লার সোয়াপে সমমানের ক্রম নষ্ট হতে পারে)</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-sky-400" />
          <span>হার্ডওয়্যার ও ফ্ল্যাশ মেমোরির বিশেষ সুবিধা</span>
        </h3>
        <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <span>
              <b>EEPROM ও Flash Memory:</b> ফ্ল্যাশ স্টোরেজে রিড অপারেশন সস্তা কিন্তু রাইট অপারেশন হার্ডওয়্যার ক্ষয় (Wear-out) করে। যেহেতু সিলেকশন সর্টে সর্বোচ্চ $N-1$ টি রাইট হয়, তাই যেখানে মেমোরি রাইট সীমিত করা বাধ্যতামূলক সেখানে এটি অত্যন্ত উপযোগী।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>
              <b>সহজ মেমোরি সীমাবদ্ধতা:</b> এক্সট্রা কোনো মেমোরি বরাদ্দ নেয় না ($O(1)$ auxiliary space)।
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
