'use client';

import React from 'react';
import { Database, Key, Hash, Link as LinkIcon, ShieldCheck } from 'lucide-react';

export default function HashTableOverview() {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] p-5 sm:p-6 rounded-2xl flex flex-col gap-4 shadow-xl shadow-black/40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold shadow-lg shadow-pink-500/20">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            Hash Table, Map &amp; Set (হ্যাশ টেবিল ও ম্যাপ)
          </h2>
          <span className="text-[11px] font-mono text-pink-400">
            O(1) Average Access • Hash Function • Collision Resolution (Chaining vs Open Addressing)
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
        <b>হ্যাশ টেবিল (Hash Table)</b> হলো এমন এক ডেটা স্ট্রাকচার যা লক্ষ লক্ষ ডেটার মধ্যেও একটি
        নির্দিষ্ট উপাদানকে লিনিয়ার খোঁজাখুঁজি ছাড়াই <b>সরাসরি O(1) বা চোখের পলকে</b> বের করতে পারে। এটি কোনো
        কী (Key)-কে একটি গাণিতিক <b>হ্যাশ ফাংশনের</b> মাধ্যমে ইনডেক্সে রূপান্তর করে ডেটা সংরক্ষণ করে।
      </p>

      {/* 4 Explanatory Concept Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
        <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
          <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-pink-400" /> ১. Key-Value পেয়ার
          </span>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            নাম বা আইডি হলো &quot;Key&quot;, আর বিপরীতে থাকা নম্বর বা প্রোফাইল হলো &quot;Value&quot;।
          </p>
        </div>

        <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-amber-400" /> ২. হ্যাশ ফাংশন
          </span>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            স্ট্রিং কি-কে ইনডেক্সে রূপান্তর করে: <code className="text-amber-300 font-mono">hash(key) % N</code>।
          </p>
        </div>

        <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> ৩. কলিশন (Collision)
          </span>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            ভিন্ন দুটি Key একই বাকেট পেলে Chaining বা Probing দিয়ে সমাধান হয়।
          </p>
        </div>

        <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ৪. Map বনাম Set
          </span>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Map কি ও মান দুটিই রাখে; কিন্তু Set কেবল অনন্য (Unique) কি জমা রাখে।
          </p>
        </div>
      </div>
    </div>
  );
}
