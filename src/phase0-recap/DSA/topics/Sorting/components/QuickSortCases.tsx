'use client';

import React from 'react';

export default function QuickSortCases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 space-y-2">
        <h4 className="text-xs font-bold text-rose-300 uppercase font-mono">CPU Cache Locality</h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          কুইক সর্ট ইন-প্লেস কাজ করে। কোনো অতিরিক্ত অ্যারে তৈরি না করায় ডেটা সরাসরি CPU L1/L2 ক্যাশে থাকে, যা মেমোরি রিডকে আলোর গতি দেয়।
        </p>
      </div>
      <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 space-y-2">
        <h4 className="text-xs font-bold text-rose-300 uppercase font-mono">Dual-Pivot Quicksort (Java & V8)</h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          জাভার আধুনিক রানটাইমে ভ্লাদিমির ইয়ারোস্লাভস্কির ২-পিভট অ্যালগরিদম ব্যবহৃত হয় যা অ্যারেকে একবারে ৩ ভাগে ভাগ করে আরও ২০% গতি বাড়ায়।
        </p>
      </div>
    </div>
  );
}
