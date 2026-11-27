'use client';

import React from 'react';

export default function MergeSortCases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 space-y-2">
        <h4 className="text-xs font-bold text-teal-300 uppercase font-mono">এক্সটার্নাল সর্টিং ও মেগাস্টোরেজ</h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          যখন ডেটাবেসের আকার র‍্যামের চেয়ে বহুগুণ বড় হয় (যেমন ৫০০ জিবি ডেটাবেস বনাম ১৬ জিবি র‍্যাম), তখন মার্জ সর্টের <b>External 2-Way Merge</b> সরাসরি ডিস্ক ব্লক থেকে ক্রমান্বয়ে রিড করে সাজায়।
        </p>
      </div>
      <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 space-y-2">
        <h4 className="text-xs font-bold text-teal-300 uppercase font-mono">লিঙ্কড লিস্টের জন্য আদর্শ</h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          লিঙ্কড লিস্টে কোনো অতিরিক্ত অ্যারে বরাদ্দ না নিয়ে সরাসরি পয়েন্টার রি-লিঙ্কিংয়ের মাধ্যমে $O(1)$ স্পেসেই মার্জ সর্ট করা যায়।
        </p>
      </div>
    </div>
  );
}
