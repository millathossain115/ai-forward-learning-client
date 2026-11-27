'use client';

import React from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import { Database, Cpu, FileCode2 } from 'lucide-react';

export default function BalancedTreeRealWorld() {
  return (
    <div className="flex flex-col gap-6">
      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="ব্যালেন্সড ট্রি (Balanced Trees)"
        scenarios={[
          {
            title: '১. ডিজিটাল নিক্তি বা ভারসাম্য পাল্লা (Self-Leveling Weighing Scale)',
            subtitle: 'একপাশে অতিরিক্ত ওজন পড়লে স্বয়ংক্রিয় অ্যাডজাস্টমেন্ট',
            badge: 'Self-Balancing',
            visualTag: 'Left vs Right Load',
            accentColor: 'sky',
            analogy:
              'দাঁড়িপাল্লার একপাশে যদি অতিরিক্ত ওজন ফেলা হয়, তবে তা হেলে গিয়ে অকেজো হয়ে পড়তে পারে। একটি ব্যালেন্সড ট্রি সার্বক্ষণিকভাবে দুই পাশের উচ্চতা পর্যবেক্ষণ করে—যদি একপাশে বেশি উচ্চতা তৈরি হয়, তবে রোটেশনের মাধ্যমে তৎক্ষণাৎ ওজন মাঝখানে নিয়ে আসে।',
            whyItFits:
              'AVL ট্রির ব্যালেন্স ফ্যাক্টর (|BF| ≤ 1) নিশ্চিত করে কোনো একটি শাখা অপর শাখার চেয়ে ১ স্তরের বেশি ঝুঁকে থাকতে পারবে না।',
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">উচ্চতা অসম?</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-600 text-slate-950 font-bold">
                  Right Rotation
                </span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                  উচ্চতার পার্থক্য ≤ ১
                </span>
              </div>
            )
          },
          {
            title: '২. ট্রাফিক সিগন্যালের লেন ম্যানেজমেন্ট (Airport Baggage Carousel)',
            subtitle: 'দীর্ঘ একমুখী লাইন রুখে প্যারালাল চ্যানেল তৈরি',
            badge: 'Worst-Case O(log N)',
            visualTag: 'Anti-Degradation',
            accentColor: 'indigo',
            analogy:
              'একটি কাউন্টারে ১০০ জন মানুষ এক লাইনে দাঁড়ালে শেষ মানুষটিকে ১০০ ধাপ অপেক্ষা করতে হয় ($O(N)$)। কিন্তু তাদের যদি দ্রুত ৪-৫টি সাব-লাইনে ভাগ করে দেওয়া হয়, তবে সর্বোচ্চ ৬-৭ জনের পরেই ডাক পাওয়া যায় ($O(\\log N$))।',
            whyItFits:
              'সাধারণ বাইনারি ট্রিতে ডেটা সর্টেড থাকলে তা একটি সোজা লাইনে ($O(N)$) রূপ নেয়; ব্যালেন্সড ট্রি রোটেশনের মাধ্যমে গাছটিকে সবসময় ঘন ও সুষম রাখে।',
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300">
                  খারাপ অবস্থা: O(N)
                </span>
                <span>➔ রোটেশন ➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-bold">
                  ব্যালেন্সড: O(log N)
                </span>
              </div>
            )
          }
        ]}
      />

      {/* Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Database className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-bold text-zinc-100">1. Java TreeMap &amp; TreeSet</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Java-এর <code>java.util.TreeMap</code> সম্পূর্ণভাবে <b>Red-Black Tree</b> দিয়ে তৈরি, যা
            নিশ্চিত করে $O(\log N)$ ইনসার্ট, সার্চ এবং ডিলিট।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-zinc-100">2. Linux Kernel CFS Scheduler</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            লিনাক্স অপারেটিং সিস্টেমের সিপিইউ শিডিউলার (Completely Fair Scheduler) প্রসেসগুলোর রান-টাইম
            ট্র্যাক করতে Red-Black Tree ব্যবহার করে।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <FileCode2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-zinc-100">3. C++ STL std::map &amp; std::set</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            C++ স্ট্যান্ডার্ড লাইব্রেরির <code>std::map</code> ও <code>std::set</code> ব্যাকগ্রাউন্ডে
            Red-Black Tree পরিচালনা করে ডেটা সর্বদা সর্টেড রাখে।
          </p>
        </div>
      </div>
    </div>
  );
}
