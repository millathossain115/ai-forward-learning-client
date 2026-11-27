'use client';

import React from 'react';
import { TrendingDown } from 'lucide-react';

export default function SearchGrowthTable() {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] rounded-3xl p-6 md:p-8 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 font-mono">
        <TrendingDown className="w-4 h-4 text-emerald-400" />
        <span>ডেটার পরিমাণ বাড়লে স্টেপ সংখ্যার তুলনামূলক বৃদ্ধি (Growth Comparison)</span>
      </h3>

      <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
            <tr>
              <th className="p-3.5 font-medium">অ্যারের আকার (N)</th>
              <th className="p-3.5 font-medium text-rose-400">লিনিয়ার সার্চ সর্বোচ্চ ধাপ (N)</th>
              <th className="p-3.5 font-medium text-emerald-400">বাইনারি সার্চ সর্বোচ্চ ধাপ (log₂ N)</th>
              <th className="p-3.5 font-medium font-sans">দক্ষতার পার্থক্য</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#171926] text-zinc-200">
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১০ টি</td>
              <td className="p-3.5 text-rose-400">১০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400">৪ টি ধাপ</td>
              <td className="p-3.5 text-zinc-300 text-xs font-sans">ছোট ডেটায় প্রায় সমান</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১,০০০ টি</td>
              <td className="p-3.5 text-rose-400">১,০০০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400">১০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">১০০ গুণ বেশি দ্রুত!</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১,০০,০০০ টি (১ লাখ)</td>
              <td className="p-3.5 text-rose-400">১,০০,০০০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400">১৭ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">~৬,০০০ গুণ বেশি দ্রুত!</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১০,০০,০০০ টি (১০ লাখ)</td>
              <td className="p-3.5 text-rose-400">১০,০০,০০০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400">২০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">৫০,০০০ গুণ বেশি দ্রুত!</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১,০০,০০,০০,০০০ (১০০ কোটি)</td>
              <td className="p-3.5 text-rose-400">১০০ কোটি ধাপ (CPU ফ্রিজ!)</td>
              <td className="p-3.5 text-emerald-400">মাত্র ৩০ টি ধাপ</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">চোখের পলকে সম্পন্ন!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
