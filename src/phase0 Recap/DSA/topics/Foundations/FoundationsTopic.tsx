'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
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
  Play,
  RotateCcw,
  Zap,
  Activity,
  Gauge,
  Sliders,
  Scale
} from 'lucide-react';

/* -------------------------------------------------------------
 * 1. EFFICIENCY DATA (Operations & Space)
 * -----------------------------------------------------------*/
interface ComplexityMetric {
  name: string;
  category: string;
  access: { val: string; cost: number; desc: string };
  search: { val: string; cost: number; desc: string };
  insert: { val: string; cost: number; desc: string };
  delete: { val: string; cost: number; desc: string };
  space: { val: string; cost: number; desc: string };
  cacheLocality: 'উচ্চ (High)' | 'কম (Low)' | 'মাঝারি (Medium)';
}

const COMPLEXITY_DATA: ComplexityMetric[] = [
  {
    name: 'Array',
    category: 'লিনিয়ার ও একটানা মেমরি',
    access: { val: 'O(1)', cost: 1, desc: 'সরাসরি ইনডেক্স ধরে মুহূর্তেই ডেটা রিড করা যায়' },
    search: { val: 'O(N)', cost: 3, desc: 'সর্ট করা না থাকলে পুরো অ্যারে ঘুরে খুঁজতে হয়' },
    insert: { val: 'O(N)', cost: 3, desc: 'মাঝখানে ইনসার্ট করলে পরের সব উপাদানকে এক ঘর শিফট করতে হয়' },
    delete: { val: 'O(N)', cost: 3, desc: 'ডিলিটের পর মেমরির খালি জায়গা পূরণ করতে শিফটিং লাগে' },
    space: { val: 'O(N)', cost: 1, desc: 'অতিরিক্ত কোনো পয়েন্টার ওভারহেড নেই, নিখুঁত মেমরি ব্যবহার' },
    cacheLocality: 'উচ্চ (High)',
  },
  {
    name: 'Linked List',
    category: 'পয়েন্টার চেইন',
    access: { val: 'O(N)', cost: 3, desc: 'হেড থেকে পয়েন্টার ধরে নোড বাই নোড এগিয়ে যেতে হয়' },
    search: { val: 'O(N)', cost: 3, desc: 'নির্দিষ্ট মান খুঁজতে পুরো লিস্ট ট্রাভার্স করতে হয়' },
    insert: { val: 'O(1)', cost: 1, desc: 'পয়েন্টার জানা থাকলে কোনো শিফটিং ছাড়া সাথে সাথে যুক্ত করা যায়' },
    delete: { val: 'O(1)', cost: 1, desc: 'শুধু পয়েন্টারের লিংক পরিবর্তন করলেই নোড মুছে যায়' },
    space: { val: 'O(N) + Overheads', cost: 3, desc: 'প্রতিটি নোডে মূল ডেটার পাশাপাশি নেক্সট পয়েন্টারের অতিরিক্ত মেমরি লাগে' },
    cacheLocality: 'কম (Low)',
  },
  {
    name: 'Hash Table',
    category: 'কী-ভ্যালু বাকেট',
    access: { val: 'N/A', cost: 0, desc: 'ইনডেক্স দিয়ে সরাসরি এক্সেস প্রযোজ্য নয়, শুধু কী (Key)' },
    search: { val: 'O(1)', cost: 1, desc: 'হ্যাশ ফাংশন দিয়ে সরাসরি সঠিক বাকেটে পৌঁছে ডেটা বের করা হয়' },
    insert: { val: 'O(1)', cost: 1, desc: 'কী হ্যাশ করে সাথে সাথে বাকেটে নতুন মান রাখা যায়' },
    delete: { val: 'O(1)', cost: 1, desc: 'কী দিয়ে বাকেট চিহ্নিত করে তাৎক্ষণিক ডিলিট' },
    space: { val: 'O(N) + Padding', cost: 3, desc: 'কলিশন এড়াতে বেশ কিছু খালি বাকেট ব্যাকআপ রাখতে হয়' },
    cacheLocality: 'মাঝারি (Medium)',
  },
  {
    name: 'Balanced BST (AVL / RB)',
    category: 'স্বয়ংক্রিয় ব্যালেন্সড ট্রি',
    access: { val: 'N/A', cost: 0, desc: 'ট্রি ডিরেক্ট ইনডেক্সিং সাপোর্ট করে না' },
    search: { val: 'O(log N)', cost: 2, desc: 'প্রতি ধাপে সার্চের পরিধি অর্ধেক হয়ে যায়, ফলে খুব দ্রুত খোঁজা যায়' },
    insert: { val: 'O(log N)', cost: 2, desc: 'ইনসার্ট করার পর প্রয়োজনে স্বয়ংক্রিয় রোটেশন দিয়ে ব্যালেন্স রাখে' },
    delete: { val: 'O(log N)', cost: 2, desc: 'ডিলিটের পর ট্রি ব্যালেন্সড অবস্থায় ফিরিয়ে আনা হয়' },
    space: { val: 'O(N)', cost: 2, desc: 'প্রতিটি নোডে Left, Right পয়েন্টার ও হাইট ডেটা সংরক্ষণ করতে হয়' },
    cacheLocality: 'কম (Low)',
  },
  {
    name: 'Trie',
    category: 'প্রিফিক্স ট্রি',
    access: { val: 'N/A', cost: 0, desc: 'অক্ষরের পাথ ধরে ট্রাভার্স করতে হয়' },
    search: { val: 'O(L)', cost: 1, desc: 'L = শব্দের দৈর্ঘ্য; ডেটাবেজে কোটি কোটি শব্দ থাকলেও সার্চ স্পিড কমে না' },
    insert: { val: 'O(L)', cost: 1, desc: 'অক্ষর ধরে নতুন শাখা তৈরি বা রিইউজ করা হয়' },
    delete: { val: 'O(L)', cost: 1, desc: 'শব্দের শেষ ফ্ল্যাগ রিমুভ বা অব্যবহৃত শাখা মুছে ফেলা হয়' },
    space: { val: 'O(Σ * L * N)', cost: 4, desc: 'শব্দের সংখ্যা ও অক্ষরের ভ্যারিয়েশন বাড়লে মেমরির বিস্তার বাড়ে' },
    cacheLocality: 'কম (Low)',
  },
  {
    name: 'Binary Heap (PQ)',
    category: 'প্রায়োরিটি ট্রি',
    access: { val: 'O(1) peek', cost: 1, desc: 'সবচেয়ে গুরুত্বপূর্ণ (সর্বোচ্চ বা সর্বনিম্ন) মান সব সময় শীর্ষে থাকে' },
    search: { val: 'O(N)', cost: 3, desc: 'হিপ শুধুমাত্র প্রায়োরিটি মেইনটেইন করে, সাধারণ সার্চের জন্য নয়' },
    insert: { val: 'O(log N)', cost: 2, desc: 'শেষে যোগ করে Sift-Up করে সঠিক অবস্থানে বসানো হয়' },
    delete: { val: 'O(log N)', cost: 2, desc: 'শীর্ষ নোড ডিলিট করে শেষ নোড এনে Sift-Down করা হয়' },
    space: { val: 'O(N)', cost: 1, desc: 'সম্পূর্ণ ট্রি একটি সাধারণ অ্যারেই মেমরি অপটিমাইজডভাবে রাখা যায়' },
    cacheLocality: 'উচ্চ (High)',
  },
];

/* -------------------------------------------------------------
 * 2. VISUAL ARCHITECTURE DOMAINS
 * -----------------------------------------------------------*/
interface DomainCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  primaryDS: string;
  secondaryDS: string;
  bestFor: string;
  tradeoff: string;
  visualType: 'grid' | 'pipeline' | 'tree' | 'trie_graph';
}

const DOMAINS: DomainCard[] = [
  {
    id: 'direct-access',
    title: 'তাৎক্ষণিক এক্সেস ও মেমরি স্পিড',
    subtitle: 'ইনডেক্স ধরে দ্রুত রিড ও কী-ভ্যালু সার্চ',
    icon: Binary,
    primaryDS: 'Array (অ্যারে)',
    secondaryDS: 'Hash Table (হ্যাশ টেবিল)',
    bestFor: 'নির্দিষ্ট ইনডেক্স ধরে সাথে সাথে মান পড়তে এবং আইডি বা নাম দিয়ে চোখের পলকে ডেটা খুঁজে পেতে।',
    tradeoff: 'অ্যারের সাইজ ফিক্সড এবং এলিমেন্ট শিফট করা ব্যয়বহুল; হ্যাশ টেবিলে অতিরিক্ত খালি বাকেট মেমরি লাগে।',
    visualType: 'grid',
  },
  {
    id: 'ordered-stream',
    title: 'ধারাবাহিক প্রসেসিং ও বাফার',
    subtitle: 'কাজের ক্রম ও সারিবদ্ধ শিডিউলিং',
    icon: Workflow,
    primaryDS: 'Stack (LIFO)',
    secondaryDS: 'Queue (FIFO)',
    bestFor: 'আন্ডু/রিডু হিস্ট্রি, ফাংশন কল ফ্রেম (Stack) এবং ওয়েব সার্ভারের রিকোয়েস্ট কিউ বা প্রিন্টার লাইন (Queue)।',
    tradeoff: 'মাঝখানের উপাদান সরাসরি পড়া যায় না; কেবল প্রান্ত দিয়ে ডেটা প্রবেশ ও বের করা যায়।',
    visualType: 'pipeline',
  },
  {
    id: 'hierarchical',
    title: 'ক্রমবিন্যাস ও সাজানো ডেটা',
    subtitle: 'হায়ারার্কি, রেঞ্জ সার্চ ও অগ্রাধিকার',
    icon: Network,
    primaryDS: 'Balanced BST (AVL / RB)',
    secondaryDS: 'Binary Heap (Priority Queue)',
    bestFor: 'ডেটা সব সময় সর্টেড রাখা, রেঞ্জ অনুযায়ী মান খোঁজা ($O(\\log N)$) এবং জরুরি কাজকে সবার আগে প্রসেস করা।',
    tradeoff: 'পয়েন্টার ঘুরে ঘুরে খোঁজার কারণে CPU ক্যাশ মিস বেশি হতে পারে।',
    visualType: 'tree',
  },
  {
    id: 'prefix-network',
    title: 'প্রিফিক্স সার্চ ও নেটওয়ার্ক গ্রাফ',
    subtitle: 'অটোকমপ্লিট ও পারস্পরিক সম্পর্ক',
    icon: Search,
    primaryDS: 'Trie (প্রিফিক্স ট্রি)',
    secondaryDS: 'Graph (গ্রাফ)',
    bestFor: 'সার্চ বক্সে শব্দের সাজেশন ও বানান সংশোধন (Trie); সোশ্যাল নেটওয়ার্কে ফ্রেন্ড রিকমেন্ডেশন ও গুগল ম্যাপ রুট (Graph)।',
    tradeoff: 'ট্রাইয়ে প্রচুর ক্যারেক্টার পয়েন্টার থাকায় মেমরি বেশি লাগে; গ্রাফে সাইকেল ম্যানেজমেন্ট কিছুটা জটিল।',
    visualType: 'trie_graph',
  },
];

export default function FoundationsTopic() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedOp, setSelectedOp] = useState<'search' | 'insert' | 'delete' | 'space'>('search');
  const [activeDomain, setActiveDomain] = useState<string>('direct-access');

  // Auto-play loop for the simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const selectedDomainData = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  return (
    <div className="space-y-12 text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121626] via-[#0c0e18] to-[#070910] border border-[#232942] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Phase 0 • Foundations &amp; Roadmap
            </span>
            <span className="text-xs text-zinc-500 font-mono">Core Mechanics</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            ডেটা স্ট্রাকচার ও অ্যালগরিদমের মূল ভিত্তি
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            মেমরিতে ডেটা কীভাবে সাজিয়ে রাখা হয় (Data Structure) এবং সেই ডেটা ব্যবহার করে কীভাবে নিখুঁত ধাপে সমস্যা সমাধান করা হয় (Algorithm)—এদের যৌথ সমন্বয়েই আধুনিক সফটওয়্যার আর্কিটেকচার গড়ে ওঠে।
          </p>
        </div>
      </div>

      {/* 2. INTERACTIVE SIMULATION: Data Structure vs Algorithm */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ডেটা স্ট্রাকচার বনাম অ্যালগরিদম: এদের ভেতরের মেকানিজম ও পার্থক্য</span>
            </h2>
            <p className="text-xs text-zinc-400">
              মেমরি সেলে ডেটা কীভাবে থাকে এবং অ্যালগরিদম কীভাবে প্রতিটি ধাপে সিদ্ধান্ত নিয়ে গন্তব্যে পৌঁছায় তা নিচে লক্ষ্য করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141829] hover:bg-[#1c223a] border border-[#232a45] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-sm bg-amber-400" />
                  <span>পজ করুন (Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>চালান (Play)</span>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveStep(0)}
              className="p-1.5 rounded-lg bg-[#141829] hover:bg-[#1c223a] border border-[#232a45] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="শুরু থেকে দেখুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dual Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual SVG (7 Cols) */}
          <div className="lg:col-span-7 bg-[#080911] border border-[#1b1f33] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#131626_1px,transparent_1px),linear-gradient(to_bottom,#131626_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

            <svg viewBox="0 0 540 280" className="w-full h-auto max-w-lg z-10">
              <defs>
                <linearGradient id="artRay" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Data Structure Layer: RAM Memory Architecture */}
              <text x="20" y="24" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                মেমরি লেআউট (Data Structure: RAM Allocation)
              </text>

              {/* Memory slots with addresses */}
              {[
                { x: 30, label: '0x100', val: 'Key: A', active: activeStep >= 0 },
                { x: 130, label: '0x104', val: 'Key: B', active: activeStep >= 1 },
                { x: 230, label: '0x108', val: 'Key: C', active: activeStep >= 2 },
                { x: 330, label: '0x10C', val: 'Target: D', active: activeStep >= 3 },
                { x: 430, label: '0x110', val: 'Key: E', active: false },
              ].map((slot, i) => (
                <g key={i}>
                  {/* Slot Container */}
                  <rect
                    x={slot.x}
                    y="50"
                    width="80"
                    height="60"
                    rx="10"
                    fill={slot.active ? '#182038' : '#0c0e18'}
                    stroke={slot.active ? '#38bdf8' : '#232942'}
                    strokeWidth={slot.active ? '2' : '1'}
                    className="transition-colors duration-300"
                  />
                  {/* Address Badge */}
                  <text x={slot.x + 8} y="66" fill="#64748b" fontSize="9" fontFamily="monospace">
                    {slot.label}
                  </text>
                  {/* Value */}
                  <text
                    x={slot.x + 40}
                    y="88"
                    fill={slot.active ? '#f8fafc' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {slot.val}
                  </text>
                </g>
              ))}

              {/* Algorithm Layer: Traversal & Decision Path */}
              <text x="20" y="150" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                অ্যালগরিদমিক রুট (Algorithm: Traversal &amp; Decision)
              </text>

              {/* Route connecting curve */}
              <path
                d="M 70,110 C 70,190 170,190 170,110 C 170,190 270,190 270,110 C 270,190 370,190 370,110"
                fill="none"
                stroke="#2a324d"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Dynamic Path Beam */}
              <path
                d={
                  activeStep === 0
                    ? 'M 70,110 L 70,170'
                    : activeStep === 1
                    ? 'M 70,110 C 70,190 170,190 170,110'
                    : activeStep === 2
                    ? 'M 70,110 C 70,190 170,190 170,110 C 170,190 270,190 270,110'
                    : 'M 70,110 C 70,190 170,190 170,110 C 170,190 270,190 270,110 C 270,190 370,190 370,110'
                }
                fill="none"
                stroke="url(#artRay)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#glowGold)"
                className="transition-all duration-500 ease-out"
              />

              {/* Current Scan Pointer Orb */}
              <circle
                cx={activeStep === 0 ? 70 : activeStep === 1 ? 170 : activeStep === 2 ? 270 : 370}
                cy="110"
                r="6"
                fill="#f59e0b"
                stroke="#fff"
                strokeWidth="2"
                className="transition-all duration-500 ease-out"
              />

              {/* Step Status Message */}
              <rect x="20" y="215" width="500" height="45" rx="8" fill="#101424" stroke="#1f2640" />
              <circle
                cx="38"
                cy="237"
                r="4"
                fill={activeStep === 3 ? '#10b981' : '#f59e0b'}
                className="animate-pulse"
              />
              <text x="52" y="241" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
                {activeStep === 0 && 'ধাপ ১: মেমরির শুরুতে (0x100) সার্চ অপারেশন শুরু হয়েছে।'}
                {activeStep === 1 && 'ধাপ ২: শর্ত চেক: কাঙ্ক্ষিত মান পাওয়া যায়নি, পরবর্তী মেমরি অ্যাড্রেসে জাম্প।'}
                {activeStep === 2 && 'ধাপ ৩: পয়েন্টার ধরে মেমরি সেল ভ্যালিডেশন চলমান।'}
                {activeStep === 3 && 'ধাপ ৪: কাঙ্ক্ষিত Target D খুঁজে পাওয়া গেছে! সফলভাবে সম্পন্ন।'}
              </text>
            </svg>

            {/* Bottom step pills */}
            <div className="flex items-center gap-2 mt-3 z-10">
              {[0, 1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeStep === step ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50' : 'w-2 bg-[#252c47]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Simple & Clear Explanations (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1: Data Structure */}
            <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  ১. ডেটা স্ট্রাকচার (Data Structure)
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">মেমরিতে ডেটা রাখার নিয়ম ও বিন্যাস</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                কম্পিউটারের RAM-এ ডেটা কীভাবে সংরক্ষিত থাকবে তা ডেটা স্ট্রাকচার নির্ধারণ করে। 
                যেমন: <b>Array</b> একটানা মেমরি ব্লকে ডেটা রাখে, ফলে ইনডেক্স ধরে দ্রুত পড়া যায়; আবার <b>Linked List</b> ভিন্ন ভিন্ন মেমরি ব্লকে নোড রেখে পয়েন্টার দিয়ে যুক্ত করে।
              </p>
            </div>

            {/* Card 2: Algorithm */}
            <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  ২. অ্যালগরিদম (Algorithm)
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">সমস্যা সমাধানের সুনির্দিষ্ট ধাপ ও লজিক</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                সংরক্ষিত ডেটার ওপর কীভাবে কাজ করা হবে তা অ্যালগরিদম ঠিক করে। 
                কীভাবে সবচেয়ে কম সময়ে ডেটা সার্চ করবেন, সর্ট করবেন বা কোন পথে গেলে সর্বনিম্ন মেমরি খরচে সমাধান পাওয়া যাবে—এটিই অ্যালগরিদমের কাজ।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EFFICIENCY DASHBOARD (Time & Memory Complexity) */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <span>দক্ষতা ও মেমরি জটিলতা বিশ্লেষণ (Time &amp; Memory Complexity)</span>
            </h2>
            <p className="text-xs text-zinc-400">
              বিভিন্ন অপারেশনে সিস্টেমের সময় (Time) এবং RAM মেমরি ব্যবহারের (Memory/Space) সরাসরি তুলনা।
            </p>
          </div>

          {/* Operation Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b14] border border-[#1d2238]">
            {(
              [
                { id: 'search', label: 'Search (খোঁজা)' },
                { id: 'insert', label: 'Insert (যোগ)' },
                { id: 'delete', label: 'Delete (মুছে ফেলা)' },
                { id: 'space', label: 'Memory (মেমরি খরচ)' },
              ] as const
            ).map((op) => (
              <button
                key={op.id}
                onClick={() => setSelectedOp(op.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedOp === op.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Efficiency Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPLEXITY_DATA.map((item, idx) => {
            const currentMetric =
              selectedOp === 'search'
                ? item.search
                : selectedOp === 'insert'
                ? item.insert
                : selectedOp === 'delete'
                ? item.delete
                : item.space;

            const isBest = currentMetric.cost === 1;
            const isMedium = currentMetric.cost === 2;
            const isHeavy = currentMetric.cost >= 3;

            return (
              <div
                key={idx}
                className="bg-[#111425] border border-[#1e243d] rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-[#2d365a] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="text-[10px] font-mono text-zinc-500 block">{item.category}</span>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isBest
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                          : isMedium
                          ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300'
                          : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {currentMetric.val}
                    </span>
                  </div>

                  {/* Visual Cost Meter Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>কাজের গতি ও খরচ</span>
                      <span>
                        {isBest ? '⚡ সর্বোচ্চ দ্রুত (O(1))' : isMedium ? '⚖ মাঝারি (O(log N))' : '⏳ ধীর (O(N))'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#0a0c16] overflow-hidden p-0.5 border border-[#1b2036]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isBest ? 'w-1/4 bg-emerald-400' : isMedium ? 'w-1/2 bg-sky-400' : 'w-4/5 bg-amber-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Operation Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{currentMetric.desc}</p>
                </div>

                {/* Hardware Cache Locality */}
                <div className="pt-3 border-t border-[#1a1f36] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">মেমরি ক্যাশ এক্সেস:</span>
                  <span
                    className={`font-semibold ${
                      item.cacheLocality === 'উচ্চ (High)'
                        ? 'text-emerald-400'
                        : item.cacheLocality === 'মাঝারি (Medium)'
                        ? 'text-sky-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {item.cacheLocality}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. VISUAL ARCHITECTURE NAVIGATOR */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>ব্যবহারিক প্রয়োগ: কোন প্রয়োজনে কোন ডেটা স্ট্রাকচার?</span>
            </h2>
            <p className="text-xs text-zinc-400">
              বাস্তব কাজের ৪টি প্রধান ক্ষেত্র নির্বাচন করে ডেটা স্ট্রাকচারের সুবিধা ও সীমাবদ্ধতা সরাসরি দেখুন।
            </p>
          </div>
        </div>

        {/* 4 Domain Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isSelected = domain.id === activeDomain;

            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomain(domain.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181d33] border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-[#101322] border-[#1c2238] hover:bg-[#141829] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-[#15192b] text-zinc-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">ক্ষেত্র</span>
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {domain.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{domain.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Visual Comparison */}
        <div className="bg-[#090b14] border border-[#1d2238] rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Diagram */}
          <div className="lg:col-span-5 bg-[#0e101c] border border-[#232a45] rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
              তুলনামূলক চিত্র (Visual Preview)
            </span>

            {/* Dynamic illustration */}
            {selectedDomainData.visualType === 'grid' && (
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400">Array: মেমরিতে একটানা ব্লক</div>
                  <div className="grid grid-cols-4 gap-1">
                    {['[0] 10', '[1] 20', '[2] 30', '[3] 40'].map((val, i) => (
                      <div
                        key={i}
                        className="p-2 rounded bg-[#161a2e] border border-amber-500/30 text-center text-xs font-mono font-bold text-zinc-100"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-sky-400">Hash Table: কী ➔ হ্যাশ করে বাকেটে রাখা</div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-[#161a2e] border border-sky-500/30 text-zinc-200">
                      &quot;user_99&quot;
                    </span>
                    <span className="text-zinc-500">➔ hash%4 ➔</span>
                    <span className="px-2 py-1 rounded bg-sky-500/20 border border-sky-400 text-sky-300 font-bold">
                      বাকেট #3
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedDomainData.visualType === 'pipeline' && (
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400">Stack (LIFO): ওপরে ইন ➔ ওপর থেকেই আউট</div>
                  <div className="flex flex-col-reverse gap-1 max-w-[160px] mx-auto">
                    {['ফ্রেম ১ (নিচে)', 'ফ্রেম ২ (মাঝে)', 'ফ্রেম ৩ (ওপরে ➔ Pop)'].map((frame, i) => (
                      <div
                        key={i}
                        className="py-1 px-2 rounded bg-[#161a2e] border border-amber-500/30 text-center text-xs font-mono font-bold text-zinc-200"
                      >
                        {frame}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400">Queue (FIFO): পেছনে ইন ➔ সামনে আউট</div>
                  <div className="flex items-center gap-1 overflow-x-auto py-1">
                    <span className="text-[10px] text-zinc-500 font-mono">ইন ➔</span>
                    {['টাস্ক ৩', 'টাস্ক ২', 'টাস্ক ১'].map((t, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 rounded bg-[#161a2e] border border-emerald-500/30 text-xs font-mono text-zinc-200 shrink-0"
                      >
                        {t}
                      </div>
                    ))}
                    <span className="text-[10px] text-zinc-500 font-mono">➔ আউট</span>
                  </div>
                </div>
              </div>
            )}

            {selectedDomainData.visualType === 'tree' && (
              <div className="space-y-4 w-full text-center">
                <div className="text-[10px] font-mono text-sky-400">ব্যালেন্সড ট্রি ও হিপের কাঠামো</div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                    50
                  </div>
                  <div className="flex gap-8">
                    <div className="w-8 h-8 rounded-full bg-[#181d33] border border-sky-400/50 flex items-center justify-center font-mono text-xs text-zinc-200">
                      25
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#181d33] border border-sky-400/50 flex items-center justify-center font-mono text-xs text-zinc-200">
                      75
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  Left &lt; Root &lt; Right নিয়ম মেনে O(log N) নিশ্চিত করে
                </div>
              </div>
            )}

            {selectedDomainData.visualType === 'trie_graph' && (
              <div className="space-y-3 w-full text-center">
                <div className="text-[10px] font-mono text-purple-400">প্রিফিক্স ট্রি ও নেটওয়ার্ক গ্রাফ</div>
                <div className="flex items-center justify-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#181d33] text-zinc-200 border border-zinc-700">R</span>
                  <span>➔</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d33] text-zinc-200 border border-zinc-700">C</span>
                  <span>➔</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500">A</span>
                  <span>➔</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500">
                    R (car)
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  শব্দের দৈর্ঘ্যের (L) ওপর নির্ভর করে O(L) গতিতে সার্চ
                </div>
              </div>
            )}
          </div>

          {/* Right Explanations */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                প্রথম পছন্দ: {selectedDomainData.primaryDS}
              </span>
              <span className="text-xs text-zinc-500 font-mono">বনাম</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
                বিকল্প: {selectedDomainData.secondaryDS}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-zinc-300">
                <b className="text-white block mb-0.5">কখন এটি ব্যবহার করবেন:</b>
                {selectedDomainData.bestFor}
              </div>

              <div className="text-xs text-zinc-400">
                <b className="text-amber-400 block mb-0.5">সীমাবদ্ধতা বা ট্রেড-অফ:</b>
                {selectedDomainData.tradeoff}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1a1f33] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>টপিকের ইন্টারঅ্যাক্টিভ সিমুলেশনের জন্য সাইডবার থেকে সিলেক্ট করুন</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                Explore Modules <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. THE COMPLETE FORWARD ENGINEERING ROADMAP */}
      <div className="space-y-4 pt-4 border-t border-[#1b1f33]">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl font-bold text-white">The Forward Engineering Roadmap (লার্নিং রোডম্যাপ)</h2>
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
              মেমরি পয়েন্টার, লিনিয়ার ও নন-লিনিয়ার ডেটা স্ট্রাকচার (Array, Stack, Queue, Hash Table, Tree, Trie, Graph) এবং কোর অ্যালগরিদমিক প্যারাডাইম।
            </p>
            <div className="pt-2 text-[11px] font-mono text-amber-400/90">✓ ১৪টি ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজার প্রস্তুত</div>
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
            <div className="pt-2 text-[11px] font-mono text-sky-400/90">✓ লাইভ কুয়েরি ও ইনডেক্স বেঞ্চমার্কিং</div>
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
            <div className="pt-2 text-[11px] font-mono text-purple-400/90">⏳ স্পেসিফিকেশন ও মডিউল রোডম্যাপ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
