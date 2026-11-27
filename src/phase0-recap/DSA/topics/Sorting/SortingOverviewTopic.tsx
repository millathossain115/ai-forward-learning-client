'use client';

import React from 'react';
import {
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  HardDrive,
  ShieldCheck,
  Crown,
  Layers,
  Split,
  Target,
  Shuffle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SortingOverviewProps {
  onNavigate?: (id: string) => void;
}

export default function SortingOverviewTopic({ onNavigate }: SortingOverviewProps) {
  const ALGORITHMS = [
    {
      id: 'sorting-bubble',
      name: '১. বাবল সর্ট (Bubble Sort)',
      category: 'Small Data / Quadratic O(N²)',
      metaphor: 'ফুটন্ত পানির বুদ্বুদ (Adjacent Element Swapping)',
      bestTime: 'O(N)',
      avgTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stable: 'Yes',
      theme: 'from-fuchsia-950/40 via-[#150f24] to-[#0c0817]',
      border: 'border-fuchsia-800/40 hover:border-fuchsia-500',
      badge: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
      btnBg: 'bg-fuchsia-600 hover:bg-fuchsia-500',
      desc: 'পাশাপাশি দুটি উপাদানের তুলনা করে বড় সংখ্যাটিকে বুদ্বুদের মতো ক্রমান্বয়ে ডানদিকে ঠেলে দেয়। অপ্টিমাইজড ফ্ল্যাগে এটি O(N) সময়ে শেষ হতে পারে।'
    },
    {
      id: 'sorting-selection',
      name: '২. সিলেকশন সর্ট (Selection Sort)',
      category: 'Small Data / Quadratic O(N²)',
      metaphor: 'মিনিমাম স্ক্যানার ও ইন-প্লেস বাউন্ডারি',
      bestTime: 'O(N²)',
      avgTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stable: 'No',
      theme: 'from-amber-950/40 via-[#1e150d] to-[#0f0a06]',
      border: 'border-amber-800/40 hover:border-amber-500',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      btnBg: 'bg-amber-600 hover:bg-amber-500',
      desc: 'প্রতি পাসে অবিন্যস্ত অংশ থেকে সর্বনিম্ন উপাদানটি খুঁজে বের করে সর্টেড জোনের শুরুতে বসায়। এতে মোট সোয়াপের সংখ্যা কঠোরভাবে মাত্র O(N) হওয়ায় ফ্ল্যাশ মেমোরির জন্য আদর্শ।'
    },
    {
      id: 'sorting-insertion',
      name: '৩. ইনসার্শন সর্ট (Insertion Sort)',
      category: 'Small Data / Adaptive O(N²)',
      metaphor: 'খেলোয়াড়ের তাসের হাত (Shift & Insert)',
      bestTime: 'O(N)',
      avgTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stable: 'Yes',
      theme: 'from-indigo-950/40 via-[#111628] to-[#090b14]',
      border: 'border-indigo-800/40 hover:border-indigo-500',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      btnBg: 'bg-indigo-600 hover:bg-indigo-500',
      desc: 'তাসের হাতের মতোই নতুন একটি কি-কার্ড তুলে নিয়ে বড়গুলোকে ডানে শিফট করে সঠিক পকেটে ঢুকিয়ে দেয়। লাইভ স্ট্রিমিং ডেটা ও ক্ষুদ্র সাব-অ্যারেতে (N ≤ 32) এটি অপ্রতিরোধ্য।'
    },
    {
      id: 'sorting-merge',
      name: '৪. মার্জ সর্ট (Merge Sort)',
      category: 'Large Data / Logarithmic O(N log N)',
      metaphor: 'ডিভাইড ট্রি ও ২-পয়েন্টার জিপার মার্জিং',
      bestTime: 'O(N log N)',
      avgTime: 'O(N log N)',
      worstTime: 'O(N log N)',
      space: 'O(N)',
      stable: 'Yes',
      theme: 'from-teal-950/40 via-[#0c1822] to-[#060c12]',
      border: 'border-teal-800/40 hover:border-teal-500',
      badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      btnBg: 'bg-teal-600 hover:bg-teal-500',
      desc: 'অ্যারেকে বারবার দুই ভাগে ভাগ করে বেস কেসে নিয়ে যায়, তারপর ২-পয়েন্টার দিয়ে জিপারের মতো মার্জ করে। যেকোনো পরিস্থিতিতেই এটি O(N log N) নিশ্চিত করে।'
    },
    {
      id: 'sorting-quick',
      name: '৫. কুইক সর্ট (Quick Sort)',
      category: 'Large Data / In-Place O(N log N)',
      metaphor: '৩-জোন পিভট পার্টিশন ও ক্যাশ লোকালিটি',
      bestTime: 'O(N log N)',
      avgTime: 'O(N log N)',
      worstTime: 'O(N²)',
      space: 'O(log N)',
      stable: 'No',
      theme: 'from-rose-950/40 via-[#200f0f] to-[#100707]',
      border: 'border-rose-800/40 hover:border-rose-500',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      btnBg: 'bg-rose-600 hover:bg-rose-500',
      desc: 'একটি পিভট নির্বাচন করে ছোটগুলোকে বামে এবং বড়গুলোকে ডানে ভাগ করে। অতিরিক্ত মেমোরি ছাড়াই সরাসরি RAM ক্যাশের মধ্যে ইন-প্লেস সর্ট করায় এটি বাস্তবে সবচেয়ে দ্রুত চলে।'
    }
  ];

  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#181528] via-[#100d1e] to-[#090712] border border-[#342752] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Topic 13 • Sorting Algorithms Architecture
            </span>
            <span className="text-xs text-zinc-400 font-mono">5 Dedicated Deep-Dive Modules</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            সর্টিং অ্যালগরিদম মাস্টারক্লাস: নিজস্ব মেকানিজম ও পেজ-বাই-পেজ সিমুলেশন
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            একই পেজে গাদাগাদি করে সমস্ত সর্টিং দেখানোর বদলে প্রতিটির জন্য নিচে আলাদা স্বতন্ত্র ডেডিকেটেড পেজ তৈরি করা হয়েছে। প্রতিটি অ্যালগরিদমের নিজস্ব দৃশ্যমান রূপক—যেমন তাসের পকেট ইনসার্শন, ডিভাইড ট্রি এবং ৩-জোন পার্টিশন—অনুধাবন করতে নিচের যেকোনো মডিউলে প্রবেশ করুন।
          </p>
        </div>
      </div>

      {/* 2. THE 5 DEDICATED ALGORITHM MODULE CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>স্বতন্ত্র সর্টিং পেজগুলো এক্সপ্লোর করুন (Choose an Algorithm):</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-400">সাইডবার সাব-মেনু থেকেও সরাসরি প্রবেশ করা যায়</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALGORITHMS.map((algo) => (
            <div
              key={algo.id}
              onClick={() => onNavigate && onNavigate(algo.id)}
              className={`group relative rounded-3xl bg-gradient-to-br ${algo.theme} border ${algo.border} p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer hover:-translate-y-1`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${algo.badge}`}>
                    {algo.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">O(1) Memory</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {algo.name}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {algo.desc}
                </p>

                {/* Complexity Pills */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-zinc-400 block text-[10px]">গড় সময় (Avg):</span>
                    <span className="text-amber-300 font-bold">{algo.avgTime}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-zinc-400 block text-[10px]">স্ট্যাবিলিটি:</span>
                    <span className={algo.stable === 'Yes' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {algo.stable === 'Yes' ? '✓ Stable' : '✗ Unstable'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200">
                  {algo.metaphor}
                </span>
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-white shadow-md transition-all ${algo.btnBg}`}
                >
                  <span>সিমুলেশন দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. COMPARATIVE DECISION MATRIX TABLE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-bold">
            তুলনামূলক কমপ্লেক্সিটি ও বৈশিষ্ট্য তালিকা (Comparative Complexity Matrix)
          </h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[#2b2545] bg-[#0d0b17] shadow-2xl">
          <table className="w-full text-left text-xs font-mono text-zinc-300">
            <thead className="bg-[#151224] text-[11px] uppercase tracking-wider text-zinc-400 border-b border-[#251e3a]">
              <tr>
                <th className="py-3 px-4">অ্যালগরিদম</th>
                <th className="py-3 px-4">সেরা সময় (Best)</th>
                <th className="py-3 px-4">গড় সময় (Avg)</th>
                <th className="py-3 px-4">সবচেয়ে খারাপ (Worst)</th>
                <th className="py-3 px-4">মেমোরি (Space)</th>
                <th className="py-3 px-4">স্ট্যাবিলিটি (Stable)</th>
                <th className="py-3 px-4">ইন-প্লেস (In-Place)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1933]">
              <tr className="hover:bg-[#161226]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-fuchsia-300">বাবল সর্ট (Bubble)</td>
                <td className="py-3 px-4 text-emerald-400">O(N) (Optimized)</td>
                <td className="py-3 px-4 text-amber-400">O(N²)</td>
                <td className="py-3 px-4 text-rose-400">O(N²)</td>
                <td className="py-3 px-4 text-emerald-400">O(1)</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ (Stable)</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ</td>
              </tr>
              <tr className="hover:bg-[#161226]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-amber-300">সিলেকশন সর্ট (Selection)</td>
                <td className="py-3 px-4 text-rose-400">O(N²)</td>
                <td className="py-3 px-4 text-amber-400">O(N²)</td>
                <td className="py-3 px-4 text-rose-400">O(N²)</td>
                <td className="py-3 px-4 text-emerald-400">O(1)</td>
                <td className="py-3 px-4 text-rose-400">না (Unstable)</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ</td>
              </tr>
              <tr className="hover:bg-[#161226]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-indigo-300">ইনসার্শন সর্ট (Insertion)</td>
                <td className="py-3 px-4 text-emerald-400">O(N)</td>
                <td className="py-3 px-4 text-amber-400">O(N²)</td>
                <td className="py-3 px-4 text-rose-400">O(N²)</td>
                <td className="py-3 px-4 text-emerald-400">O(1)</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ (Stable)</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ</td>
              </tr>
              <tr className="hover:bg-[#161226]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-teal-300">মার্জ সর্ট (Merge)</td>
                <td className="py-3 px-4 text-emerald-400">O(N log N)</td>
                <td className="py-3 px-4 text-emerald-400">O(N log N)</td>
                <td className="py-3 px-4 text-emerald-400">O(N log N)</td>
                <td className="py-3 px-4 text-amber-400">O(N) Auxiliary</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ (Stable)</td>
                <td className="py-3 px-4 text-rose-400">না (অতিরিক্ত অ্যারে)</td>
              </tr>
              <tr className="hover:bg-[#161226]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-rose-300">কুইক সর্ট (Quick)</td>
                <td className="py-3 px-4 text-emerald-400">O(N log N)</td>
                <td className="py-3 px-4 text-emerald-400">O(N log N)</td>
                <td className="py-3 px-4 text-rose-400">O(N²)</td>
                <td className="py-3 px-4 text-emerald-400">O(log N) Stack</td>
                <td className="py-3 px-4 text-rose-400">না (Unstable)</td>
                <td className="py-3 px-4 text-emerald-400">হ্যাঁ (In-Place)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. REAL-WORLD PRODUCTION DECISION GUIDE */}
      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>বাস্তব ইঞ্জিনিয়ারিং ডিসিশন গাইডলাইন: কোন অ্যালগরিদম কখন বেছে নেবেন?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-[#141022] border border-[#261d3d] space-y-1.5">
            <span className="text-indigo-400 font-bold block">১. যখন ডেটাসেট ক্ষুদ্র (N ≤ 32) বা প্রায় সাজানো:</span>
            <p className="text-zinc-300 leading-relaxed font-sans">
              <b>ইনসার্শন সর্ট (Insertion Sort)</b> বেছে নিন। কারণ এতে রিকার্শন বা পার্টিশনের কোনো ওভারহেড নেই এবং প্রায় সর্টেড ডেটায় এটি সরাসরি $O(N)$ গতি দেয়।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#141022] border border-[#261d3d] space-y-1.5">
            <span className="text-amber-400 font-bold block">২. যখন মেমোরি রাইট ক্ষতিকর (EEPROM / Flash Memory):</span>
            <p className="text-zinc-300 leading-relaxed font-sans">
              <b>সিলেকশন সর্ট (Selection Sort)</b> বেছে নিন। কারণ পুরো সর্টিংয়ে এটি সর্বোচ্চ মাত্র $N-1$ টি সোয়াপ (Memory Write) করে, যা ফ্ল্যাশ চিপের জীবনকাল বাঁচায়।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#141022] border border-[#261d3d] space-y-1.5">
            <span className="text-teal-400 font-bold block">৩. যখন শতভাগ গ্যারান্টিযুক্ত O(N log N) ও স্ট্যাবিলিটি প্রয়োজন:</span>
            <p className="text-zinc-300 leading-relaxed font-sans">
              <b>মার্জ সর্ট (Merge Sort)</b> বেছে নিন। বিশেষ করে ই-কমার্স অর্ডার বা ব্যাংক ট্রানজেকশনে যেখানে সমমানের রেকর্ডের আদি ক্রম অক্ষুণ্ণ রাখা বাধ্যতামূলক।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#141022] border border-[#261d3d] space-y-1.5">
            <span className="text-rose-400 font-bold block">৪. যখন সর্বোচ্চ মেমোরি ক্যাশ গতি ও সাধারণ ডেটাসেট:</span>
            <p className="text-zinc-300 leading-relaxed font-sans">
              <b>কুইক সর্ট (Quick Sort)</b> বা ডুয়াল-পিভট বেছে নিন। অতিরিক্ত মেমোরি না নিয়ে সরাসরি ইন-প্লেস র‍্যাম ক্যাশ ব্যবহার করায় এটি সর্বাধিক কার্যকর।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
