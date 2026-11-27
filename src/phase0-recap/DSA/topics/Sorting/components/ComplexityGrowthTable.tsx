'use client';

import React from 'react';
import { TrendingDown } from 'lucide-react';

export default function ComplexityGrowthTable() {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] rounded-3xl p-6 md:p-8 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 font-mono">
        <TrendingDown className="w-4 h-4 text-emerald-400" />
        <span>ডেটার পরিমাণ বাড়লে অপারেশনের তুলনামূলক বৃদ্ধি (Complexity Growth)</span>
      </h3>

      <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
            <tr>
              <th className="p-3.5 font-medium">উপাদান সংখ্যা (N)</th>
              <th className="p-3.5 font-medium text-amber-400">ছোট ডেটা: O(N²) বাবল/সিলেকশন/ইনসার্শন</th>
              <th className="p-3.5 font-medium text-sky-400">বড় ডেটা: O(N log₂ N) মার্জ/কুইক</th>
              <th className="p-3.5 font-medium font-sans">দক্ষতার পার্থক্য</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#171926] text-zinc-200">
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১০ টি</td>
              <td className="p-3.5 text-amber-400">১০০ টি অপারেশন</td>
              <td className="p-3.5 text-sky-400">৩৩ টি অপারেশন</td>
              <td className="p-3.5 text-zinc-300 text-xs font-sans">ছোট ডেটায় তেমন পার্থক্য বোঝা যায় না</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১,০০০ টি</td>
              <td className="p-3.5 text-amber-400">১০,০০,০০০ (১০ লাখ)</td>
              <td className="p-3.5 text-sky-400">১০,০০০ টি অপারেশন</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">১০০ গুণ বেশি দ্রুত!</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১,০০,০০০ টি (১ লাখ)</td>
              <td className="p-3.5 text-rose-400">১০,০০,০০,০০,০০০ (১ হাজার কোটি!)</td>
              <td className="p-3.5 text-emerald-400">১৭,০০,০০০ (১৭ লাখ)</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">~৬,০০০ গুণ বেশি দ্রুত!</td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold">১০,০০,০০০ টি (১০ লাখ)</td>
              <td className="p-3.5 text-rose-400">১,০০,০০,০০,০০,০০০ (CPU হ্যাং!)</td>
              <td className="p-3.5 text-emerald-400">২,০০,০০,০০০ (২ কোটি)</td>
              <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">৫০,০০০ গুণ বেশি দ্রুত!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
