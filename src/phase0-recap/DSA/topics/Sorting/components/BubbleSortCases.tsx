import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function BubbleSortCases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-fuchsia-400" />
          <span>টাইম ও স্পেস কমপ্লেক্সিটি</span>
        </h3>
        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Best Case Time:</span>
            <span className="text-emerald-400 font-bold">O(N) (যখন অ্যারে অলরেডি সর্টেড)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Average Case Time:</span>
            <span className="text-amber-400 font-bold">O(N²)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Worst Case Time:</span>
            <span className="text-rose-400 font-bold">O(N²) (যখন অ্যারে উল্টো সাজানো)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Auxiliary Space:</span>
            <span className="text-emerald-400 font-bold">O(1) (In-Place Memory)</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
            <span className="text-zinc-400">Stability:</span>
            <span className="text-emerald-400 font-bold">Stable (সমান মানের ক্রম বজায় থাকে)</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>কখন বাবল সর্ট ব্যবহার করবেন?</span>
        </h3>
        <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <span>
              <b>একাডেমিক ভিত্তি বোঝা:</b> যে কোনো শিক্ষার্থীকে সর্টিং অ্যালগরিদমের মৌলিক ধারণা ও পাশাপাশি সোয়াপিং শেখানোর ক্ষেত্রে এটি সবচেয়ে সহজ।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <span>
              <b>প্রায় সাজানো ছোট ডেটাসেট:</b> যখন ডেটার ৯০% ইতিমধ্যে সর্টেড এবং উপাদান সংখ্যা খুব কম ($N &lt; 20$)।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
            <span>
              <b>বাস্তব উৎপাদনে পরিহার্য:</b> বৃহদাকার ডেটাসেটের জন্য কখনোই বাবল সর্ট ব্যবহার করা হয় না কারণ এর $O(N^2)$ গতি অত্যন্ত ধীর। কুইক সর্ট বা মার্জ সর্ট এখানে আদর্শ।
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
