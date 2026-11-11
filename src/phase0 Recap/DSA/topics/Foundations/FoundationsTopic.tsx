'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Cpu,
  Layers,
  Database,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Boxes,
  Network,
  GitCommit,
  Binary,
  Table,
  Workflow,
  Bot,
  Compass
} from 'lucide-react';

interface Scenario {
  title: string;
  problem: string;
  recommended: string;
  timeComplexity: string;
  why: string;
  icon: React.ElementType;
  tag: string;
}

const SCENARIOS: Scenario[] = [
  {
    title: 'ইন্ডেক্স ধরে তাৎক্ষণিক রিড (Instant Random Access)',
    problem: 'নির্দিষ্ট পজিশনের (যেমন ১০ম বা ৫০০তম) এলিমেন্ট কোনো সার্চ বা লুপ ছাড়া মুহূর্তেই পাওয়া প্রয়োজন।',
    recommended: 'Array (অ্যারে)',
    timeComplexity: 'O(1)',
    why: 'অ্যারের উপাদানগুলো মেমরিতে একটানা (Contiguous) সাজানো থাকে। তাই বেস পয়েন্টারের সাথে ইন্ডেক্স গুণ করে সরাসরি মেমরি অ্যাড্রেস ডিরিফারেন্স করা যায়।',
    icon: Binary,
    tag: 'Cache Locality'
  },
  {
    title: 'মাঝখানে দ্রুত ডেটা ইনসার্ট বা ডিলিট (Frequent Splicing)',
    problem: 'বাকি এলিমেন্টগুলোকে মেমরিতে শিফট না করে দ্রুত নোড যুক্ত বা ডিলিট করতে হবে।',
    recommended: 'Linked List (লিঙ্কড লিস্ট)',
    timeComplexity: 'O(1) (পয়েন্টার জানা থাকলে)',
    why: 'লিঙ্কড লিস্টের প্রতিটি নোড মেমরির আলাদা জায়গায় থাকে এবং পয়েন্টার দিয়ে যুক্ত থাকে। তাই শুধু পয়েন্টার রি-লিঙ্ক করলেই কাজ শেষ, কোনো মেমরি শিফটিং লাগে না।',
    icon: GitCommit,
    tag: 'Dynamic Sizing'
  },
  {
    title: 'আন্ডু-রিডু বা ব্যাক বাটন হিস্ট্রি (LIFO Execution)',
    problem: 'সবশেষে যে কাজটি বা স্ক্রিনটি ভিজিট করা হয়েছে, ব্যাক প্রেস করলে সবার আগে সেটি ফিরিয়ে আনতে হবে।',
    recommended: 'Stack (স্ট্যাক)',
    timeComplexity: 'O(1) push/pop',
    why: 'লাস্ট-ইন ফার্স্ট-আউট (LIFO) আর্কিটেকচার। ফাংশন কল স্ট্যাক এবং রিভার্সাল ট্র্যাকিংয়ের জন্য এটি সবচেয়ে নিরাপদ ও দ্রুততম।',
    icon: Layers,
    tag: 'LIFO Buffer'
  },
  {
    title: 'টাস্ক কিউ বা মেসেজ ব্রোকার (FIFO Pipelines)',
    problem: 'যে রিকোয়েস্ট আগে এসেছে তাকে আগে সার্ভিস দিতে হবে (প্রিন্টার লাইন, ওয়েব সার্ভার রিকোয়েস্ট কিউ)।',
    recommended: 'Queue (কিউ)',
    timeComplexity: 'O(1) enqueue/dequeue',
    why: 'ফার্স্ট-ইন ফার্স্ট-আউট (FIFO) নীতি মেনে কোনো রিকোয়েস্টকে স্টারভেশনে পড়তে দেয় না এবং কাজের স্বাভাবিক ক্রম বজায় রাখে।',
    icon: Workflow,
    tag: 'Fair Scheduling'
  },
  {
    title: 'কী-ভ্যালু দিয়ে চোখের পলকে ডেটা রিট্রিভ (Instant Key Lookup)',
    problem: 'হাজার হাজার ইউজারের মধ্যে ইউজারনেম বা আইডি দিয়ে ১ মিলি-সেকেন্ডেরও কম সময়ে রেকর্ড বের করা বা ডুপ্লিকেট রোধ করা।',
    recommended: 'Hash Table / Set (হ্যাশ টেবিল)',
    timeComplexity: 'O(1) গড়পড়তা',
    why: 'হ্যাশ ফাংশন দিয়ে স্ট্রিং বা কি-কে সাথে সাথে অ্যারে বাকটের ইন্ডেক্সে কনভার্ট করে মেমরিতে রিচ করা যায়।',
    icon: Database,
    tag: 'Key-Value Engine'
  },
  {
    title: 'রিয়েল-টাইম সর্বোচ্চ বা সর্বনিম্ন প্রায়োরিটি হ্যান্ডলিং',
    problem: 'হাসপাতালের জরুরি বিভাগ, ওএস প্রসেস শিডিউলিং বা জিপিএস পাথফাইন্ডিংয়ে সব সময় সবচেয়ে গুরুত্বপূর্ণ আইটেমটি সবার আগে চাই।',
    recommended: 'Priority Queue / Heap (হিপ)',
    timeComplexity: 'O(1) peek, O(log N) push/pop',
    why: 'বাইনারি হিপের রুট সব সময় সর্বোচ্চ (Max-Heap) বা সর্বনিম্ন (Min-Heap) ভ্যালু ধারণ করে, পুরো ডেটাসেট বারবার সর্ট করতে হয় না।',
    icon: Boxes,
    tag: 'Priority Scheduler'
  },
  {
    title: 'হায়ারার্কিক্যাল ডেটা ও রেঞ্জ সার্চ (Sorted Range Queries)',
    problem: 'ডেটা সবসময় সাজানো থাকতে হবে, $O(\\log N)$ সার্চ লাগবে এবং রেঞ্জ কুয়েরি (যেমন ৫০ থেকে ১০০-এর মধ্যের মান) দ্রুত দরকার।',
    recommended: 'Balanced BST (AVL / Red-Black Tree / B-Tree)',
    timeComplexity: 'O(log N)',
    why: 'স্বয়ংক্রিয় রোটেশনের মাধ্যমে ট্রি কখনোই বাঁকা হয়ে ওয়ান-ওয়ে লিস্টে রূপ নেয় না। ডেটাবেজ ইনডেক্সিংয়ের প্রধান ভিত্তি।',
    icon: Network,
    tag: 'Index Engine'
  },
  {
    title: 'সার্চ বার অটোকমপ্লিট ও ডিকশনারি স্পেল-চেকার',
    problem: 'ইউজার কোনো শব্দের ৩টি অক্ষর টাইপ করলেই সেই প্রিফিক্স দিয়ে শুরু হওয়া সব শব্দ সাজেস্ট করতে হবে।',
    recommended: 'Trie (প্রিফিক্স ট্রি)',
    timeComplexity: 'O(L) (L = শব্দের দৈর্ঘ্য)',
    why: 'শব্দের দৈর্ঘ্য যত বড়, সার্চ তত দ্রুত। পুরো ডিকশনারির মোট শব্দের সংখ্যার ($N$) ওপর সার্চ স্পিড মোটেও নির্ভর করে না।',
    icon: Search,
    tag: 'Prefix Search'
  },
  {
    title: 'সোশ্যাল নেটওয়ার্ক ও নেভিগেশন ম্যাপ (Connected Relations)',
    problem: 'দুইজন ইউজারের মধ্যে মিউচুয়াল ফ্রেন্ড বের করা, সবচেয়ে কম দূরত্বের রাস্তা বের করা বা সার্কুলার ডিপেন্ডেন্সি শনাক্ত করা।',
    recommended: 'Graph (গ্রাফ - Adjacency List)',
    timeComplexity: 'O(V + E) BFS / DFS',
    why: 'ভার্টেক্স ও এজের মাধ্যমে যেকোনো নন-লিনিয়ার জটিল সম্পর্ক এবং রিয়েল-ওয়ার্ল্ড নেটওয়ার্ক নিখুঁতভাবে মডেল করা যায়।',
    icon: Network,
    tag: 'Network Model'
  }
];

export default function FoundationsTopic() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const currentScenario = SCENARIOS[selectedScenarioIndex];

  return (
    <div className="space-y-10 text-zinc-100">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121626] via-[#0c0e18] to-[#070910] border border-[#232942] p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Phase 0 • Foundations &amp; Roadmap
            </span>
            <span className="text-xs text-zinc-500 font-mono">Core Engineering Philosophy</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            DSA &amp; Systems Architecture Foundations
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-3xl leading-relaxed">
            কোনো কোড লেখার আগে বোঝা জরুরি কেন মেমরিতে ডেটা বিন্যাস ও অ্যালগরিদমিক অপটিমাইজেশন প্রয়োজন। 
            সঠিক ডেটা স্ট্রাকচার নির্বাচন না করলে বিশ্বের সবচেয়ে শক্তিশালী সার্ভারও স্কেলিং করতে গিয়ে ভেঙে পড়ে।
          </p>
        </div>
      </div>

      {/* 2 Core Definitions: What is DS & What is Algo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What is a Data Structure */}
        <div className="bg-[#0f1220] border border-[#1e233b] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-amber-400">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">১. ডেটা স্ট্রাকচার কী এবং কেন দরকার?</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              <b>ডেটা স্ট্রাকচার (Data Structure)</b> হলো কম্পিউটারের মেমরি (RAM)-তে ডেটাকে এমন একটি সুনির্দিষ্ট আর্কিটেকচারে বিন্যস্ত করে রাখা, 
              যাতে পরবর্তীতে সেই ডেটা সবচেয়ে কম সময়ে এবং সর্বনিম্ন মেমরি খরচে এক্সেস ও পরিবর্তন করা যায়।
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-[#1a1f33]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>ক্যাশ লোকালিটি (Cache Locality):</b> একটানা মেমরি ব্লকে ডেটা সাজালে CPU ক্যাশ লাইন সহজেই ডেটা লোড করতে পারে।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>স্পেস অপটিমাইজেশন:</b> অপ্রয়োজনীয় মেমরি ফ্র্যাগমেন্টেশন ও পয়েন্টার ওভারহেড থেকে রক্ষা করে।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>বিশেষায়িত অপারেশন:</b> কোনো ডেটায় তাৎক্ষণিক সার্চ লাগে, আবার কোনোটিতে সিকোয়েনশিয়াল প্রসেসিং।</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: What is an Algorithm */}
        <div className="bg-[#0f1220] border border-[#1e233b] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-sky-400">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">২. অ্যালগরিদম কী এবং কেন দরকার?</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              <b>অ্যালগরিদম (Algorithm)</b> হলো কোনো একটি নির্দিষ্ট সমস্যার নিখুঁত সমাধান করার জন্য সুনির্দিষ্ট গাণিতিক ও লজিক্যাল ধাপের সমষ্টি।
              এটি ডেটা স্ট্রাকচারের ভেতরে থাকা ডেটাকে প্রসেস করে কাঙ্ক্ষিত ফলাফল বের করে আনে।
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-[#1a1f33]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><b>টাইম কমপ্লেক্সিটি মিনিমাইজেশন:</b> $O(N^2)$ ব্রুট-ফোর্স সমাধানকে $O(N \log N)$ বা $O(\log N)$-এ নামিয়ে আনা।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><b>সার্ভার কস্ট হ্রাস:</b> অপটিমাল অ্যালগরিদম কোটি কোটি রিকোয়েস্টে সিপিইউ ব্যবহার ৯০% পর্যন্ত কমিয়ে দেয়।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><b>স্কেলেবিলিটি গ্যারান্টি:</b> ইউজারের ডেটা ১০ গুণ বাড়লে সিস্টেমের রেসপন্স টাইম যাতে ১০ গুণ বা ১০০ গুণ ধীর না হয়।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-World Situational Guidelines Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1b1f33] pb-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>রিয়েল-ওয়ার্ল্ড ডিসিশন গাইডলাইন: কোন পরিস্থিতিতে কোন ডেটা স্ট্রাকচার?</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              একটি নির্দিষ্ট সমস্যা সমাধানের জন্য সঠিক ডেটা স্ট্রাকচার নির্বাচন করার ব্যবহারিক গাইডলাইন।
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#141829] border border-[#212740] text-amber-400">
            {SCENARIOS.length} টি কমন রিয়েল-লাইফ কেস
          </span>
        </div>

        {/* Interactive Scenario Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Selection List */}
          <div className="lg:col-span-5 space-y-2">
            {SCENARIOS.map((sc, idx) => {
              const Icon = sc.icon;
              const isSelected = idx === selectedScenarioIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedScenarioIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#181d33] border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-[#0f1220]/70 border-[#1a1f33] hover:bg-[#141829] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <span className={`text-xs font-semibold truncate ${isSelected ? 'text-zinc-100' : 'text-zinc-300'}`}>
                      {sc.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0b0d17] border border-[#1e233a] text-zinc-400 shrink-0 ml-2">
                    {sc.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Guideline Card */}
          <div className="lg:col-span-7 bg-[#101324] border border-[#232944] rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                    প্রয়োজনীয় পরিস্থিতি
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mt-1.5">
                    {currentScenario.title}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500 block">টাইম কমপ্লেক্সিটি</span>
                  <span className="text-xs md:text-sm font-mono font-bold text-emerald-400">
                    {currentScenario.timeComplexity}
                  </span>
                </div>
              </div>

              {/* Problem Description */}
              <div className="p-3.5 rounded-xl bg-[#0b0d18] border border-[#1a1e33] space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 font-semibold block">সমস্যা:</span>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {currentScenario.problem}
                </p>
              </div>

              {/* Recommendation Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-sky-500/5 to-transparent border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                    সুপারিশকৃত সমাধান:
                  </span>
                  <span className="text-sm font-bold text-white">
                    {currentScenario.recommended}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-zinc-200 leading-relaxed pl-6">
                  {currentScenario.why}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a1e33] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>টপিক এক্সপ্লোর করতে সাইডবার মেন্যু ব্যবহার করুন</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                Explore Topic <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The Complete Forward Engineering Roadmap */}
      <div className="space-y-4 pt-4 border-t border-[#1b1f33]">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-400" />
            <span>The Forward Engineering Roadmap (লার্নিং রোডম্যাপ)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            কম্পিউটার সায়েন্সের কোর আর্কিটেকচার থেকে আধুনিক প্রোডাকশন সিস্টেম এবং AI ইঞ্জিনিয়ারিং পর্যন্ত ৩টি প্রধান ধাপ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phase 0 */}
          <div className="p-5 rounded-2xl bg-[#0f1220] border border-[#1e233b] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                Phase 0 • Foundations &amp; DSA
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">১. ফান্ডামেন্টালস ও অ্যালগরিদম</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              মেমরি পয়েন্টার, লিনিয়ার ও নন-লিনিয়ার ডেটা স্ট্রাকচার (Array, Stack, Queue, Hash Table, Tree, Trie, Graph) এবং ৪টি কোর অ্যালগরিদমিক প্যারাডাইম।
            </p>
            <div className="pt-2 text-[11px] font-mono text-amber-400/90">
              ✓ ১৪টি ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজার প্রস্তুত
            </div>
          </div>

          {/* Phase 1 */}
          <div className="p-5 rounded-2xl bg-[#0f1220] border border-[#1e233b] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold">
                Phase 1 • Database Internals
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">২. সিস্টেমস ও ডেটাবেজ ইঞ্জিন</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              রিলেশনাল ডেটাবেজ কীভাবে কাজ করে—PostgreSQL EXPLAIN ANALYZE প্ল্যানার, B-Tree ইনডেক্সিং এবং AI এম্বেডিংসের জন্য pgvector HNSW ভেক্টর সার্চ।
            </p>
            <div className="pt-2 text-[11px] font-mono text-sky-400/90">
              ✓ লাইভ কুয়েরি ও ইনডেক্স বেঞ্চমার্কিং
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-5 rounded-2xl bg-[#0f1220] border border-[#1e233b] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold">
                Phase 2 • Forward AI Core
              </span>
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
            </div>
            <h4 className="text-sm font-bold text-white">৩. ফিউচার AI ইঞ্জিনিয়ারিং</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              লার্জ ল্যাঙ্গুয়েজ মডেল (LLM) স্ট্রিমিং, হাইব্রিড RAG পাইপলাইন, অ্যানথ্রপিকের Model Context Protocol (MCP) এবং অটোনোমাস মাল্টি-এজেন্ট ফ্রেমওয়ার্ক।
            </p>
            <div className="pt-2 text-[11px] font-mono text-purple-400/90">
              ⏳ স্পেসিফিকেশন ও মডিউল রোডম্যাপ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
