import React from 'react';
import { Zap, Clock } from 'lucide-react';

export default function InsertionSortCases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>বাস্তব ইঞ্জিনগুলোতে ব্যবহারের গোপন রহস্য</span>
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">
          তাত্ত্বিকভাবে $O(N^2)$ হলেও ক্ষুদ্র ডেটাসেটে ($N \le 32$) ইনসার্শন সর্ট এমনকি কুইক সর্ট বা মার্জ সর্টের চেয়েও দ্রুত কাজ করে!
        </p>
        <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            <span>
              <b>V8 JavaScript Engine (Node.js & Chrome):</b> অ্যারের দৈর্ঘ্য ১০ এর কম হলে V8 স্বয়ংক্রিয়ভাবে ইনসার্শন সর্ট ব্যবহার করে।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <span>
              <b>Python & Java (Timsort):</b> পাইথনের ডিফল্ট <code>sort()</code> এবং জাভার অবজেক্ট সর্টে মার্জ সর্ট ও ইনসার্শন সর্টের সংকর তৈরি করা হয়েছে। পার্টিশনের আকার ৩২ এর নিচে নামলেই ইনসার্শন সর্ট কার্যকর হয়।
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>কমপ্লেক্সিটি চার্ট</span>
        </h3>
        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
            <span className="text-zinc-400">Best Case Time:</span>
            <span className="text-emerald-400 font-bold">O(N) (অলরেডি সাজানো থাকলে)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
            <span className="text-zinc-400">Average Case Time:</span>
            <span className="text-amber-400 font-bold">O(N²)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
            <span className="text-zinc-400">Worst Case Time:</span>
            <span className="text-rose-400 font-bold">O(N²) (সম্পূর্ণ বিপরীত ক্রম)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
            <span className="text-zinc-400">Auxiliary Space:</span>
            <span className="text-emerald-400 font-bold">O(1) (In-Place Memory)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
            <span className="text-zinc-400">Adaptive & Online:</span>
            <span className="text-emerald-400 font-bold">Yes (লাইভ ডেটা স্ট্রিমে উপযুক্ত)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
