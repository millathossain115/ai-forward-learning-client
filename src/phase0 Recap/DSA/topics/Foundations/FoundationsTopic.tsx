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
  cacheLocality: 'High' | 'Low' | 'Medium';
}

const COMPLEXITY_DATA: ComplexityMetric[] = [
  {
    name: 'Array',
    category: 'Linear / Contiguous',
    access: { val: 'O(1)', cost: 1, desc: 'সরাসরি ইনডেক্স দিয়ে তাৎক্ষণিক মেমরি অ্যাড্রেসিং' },
    search: { val: 'O(N)', cost: 3, desc: 'আন-সর্টেড হলে পুরোটা স্ক্যান করতে হয়' },
    insert: { val: 'O(N)', cost: 3, desc: 'মাঝখানে ইনসার্ট করলে বাকি উপাদানগুলো শিফট করতে হয়' },
    delete: { val: 'O(N)', cost: 3, desc: 'এলিমেন্ট ডিলিটের পর গ্যাপ পূরণ করতে শিফটিং লাগে' },
    space: { val: 'O(N)', cost: 1, desc: 'কোনো পয়েন্টার ওভারহেড নেই, একটানা মেমরি' },
    cacheLocality: 'High',
  },
  {
    name: 'Linked List',
    category: 'Pointer-Chained',
    access: { val: 'O(N)', cost: 3, desc: 'হেড থেকে পয়েন্টার ধরে নোড বাই নোড যেতে হয়' },
    search: { val: 'O(N)', cost: 3, desc: 'লিনিয়ার ট্রাভার্সাল অপরিহার্য' },
    insert: { val: 'O(1)', cost: 1, desc: 'পয়েন্টার রেফারেন্স জানা থাকলে তাৎক্ষণিক স্প্লাইসিং' },
    delete: { val: 'O(1)', cost: 1, desc: 'শুধু পয়েন্টার রি-লিঙ্ক করলেই রিমুভ সম্পন্ন' },
    space: { val: 'O(N) + Overheads', cost: 3, desc: 'প্রতিটি নোডে ডেটা ছাড়াও ৮-বাইট নেক্সট পয়েন্টার ওভারহেড' },
    cacheLocality: 'Low',
  },
  {
    name: 'Hash Table',
    category: 'Key-Value Buckets',
    access: { val: 'N/A', cost: 0, desc: 'ইনডেক্স এক্সেস প্রযোজ্য নয়, শুধু কী (Key)' },
    search: { val: 'O(1)', cost: 1, desc: 'হ্যাশ কোড দিয়ে সরাসরি মেমরি বাকেট চিহ্নিতকরণ' },
    insert: { val: 'O(1)', cost: 1, desc: 'বাকেটে সরাসরি পুট (কলিশন না থাকলে)' },
    delete: { val: 'O(1)', cost: 1, desc: 'বাকেট থেকে তাৎক্ষণিক রিমুভাল' },
    space: { val: 'O(N) + Padding', cost: 3, desc: 'কলিশন রোধে লোড ফ্যাক্টর মেনে অতিরিক্ত বাকেট বাফার রাখা লাগে' },
    cacheLocality: 'Medium',
  },
  {
    name: 'Balanced BST (AVL / RB)',
    category: 'Self-Balancing Tree',
    access: { val: 'N/A', cost: 0, desc: 'ট্রি ডিরেক্ট ইনডেক্স সাপোর্ট করে না' },
    search: { val: 'O(log N)', cost: 2, desc: 'প্রতি ধাপে সার্চ স্পেস অর্ধেক হয়ে যায়' },
    insert: { val: 'O(log N)', cost: 2, desc: 'ইনসার্টের পর প্রয়োজনে O(1) রোটেশন চালায়' },
    delete: { val: 'O(log N)', cost: 2, desc: 'ডিলিটের পর ব্যালেন্স ফ্যাক্টর বজায় রাখে' },
    space: { val: 'O(N)', cost: 2, desc: 'প্রতি নোডে Left, Right এবং Height/Color ডেটা' },
    cacheLocality: 'Low',
  },
  {
    name: 'Trie',
    category: 'Prefix Tree',
    access: { val: 'N/A', cost: 0, desc: 'ক্যারেক্টার পাথ ভিত্তিক traversal' },
    search: { val: 'O(L)', cost: 1, desc: 'L = শব্দের দৈর্ঘ্য; ডেটাবেজের মোট রেকর্ডের ওপর নির্ভর করে না' },
    insert: { val: 'O(L)', cost: 1, desc: 'অক্ষর ধরে নতুন শাখা তৈরি বা রিইউজ' },
    delete: { val: 'O(L)', cost: 1, desc: 'শব্দের শেষ ফ্ল্যাগ বন্ধ বা আনইউজড ব্রাঞ্চ ট্রিম' },
    space: { val: 'O(Σ * L * N)', cost: 4, desc: 'অ্যালফাবেট সাইজ বড় হলে মেমরির বিস্তার বাড়ে' },
    cacheLocality: 'Low',
  },
  {
    name: 'Binary Heap (PQ)',
    category: 'Priority Tree',
    access: { val: 'O(1) peek', cost: 1, desc: 'সর্বোচ্চ/সর্বনিম্ন মান সব সময় রুটে থাকে' },
    search: { val: 'O(N)', cost: 3, desc: 'হিপ কেবল প্রায়োরিটি নিশ্চিত করে, বাইনারি সার্চ নয়' },
    insert: { val: 'O(log N)', cost: 2, desc: 'নিচে যোগ করে Sift-Up অপারেশন' },
    delete: { val: 'O(log N)', cost: 2, desc: 'রুট ডিলিট করে শেষ নোড এনে Sift-Down' },
    space: { val: 'O(N)', cost: 1, desc: 'সম্পূর্ণ বাইনারি ট্রি সাধারণ অ্যারেই সংরক্ষণ করা যায়' },
    cacheLocality: 'High',
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
    title: 'Instant Lookup & Memory Locality',
    subtitle: 'তাৎক্ষণিক ডেটা রিড ও মেমরি ক্যাশিং',
    icon: Binary,
    primaryDS: 'Array (অ্যারে)',
    secondaryDS: 'Hash Table (হ্যাশ টেবিল)',
    bestFor: 'নির্দিষ্ট ইনডেক্স ধরে O(1) রিড এবং কী-ভ্যালু দিয়ে চোখের পলকে অবজেক্ট খোঁজা।',
    tradeoff: 'অ্যারে সাইজ ফিক্সড এবং শিফটিং ব্যয়বহুল; হ্যাশ টেবিলে মেমরি প্যাডিং লাগে।',
    visualType: 'grid',
  },
  {
    id: 'ordered-stream',
    title: 'Streaming & Order Pipelines',
    subtitle: 'কাজের ক্রম ও ফেয়ার শিডিউলিং',
    icon: Workflow,
    primaryDS: 'Stack (LIFO)',
    secondaryDS: 'Queue (FIFO)',
    bestFor: 'Undo/Redo ইতিহাস, ফাংশন কল ফ্রেম (Stack) এবং সার্ভার রিকোয়েস্ট বাফার (Queue)।',
    tradeoff: 'মাঝখানের কোনো উপাদান সরাসরি রিড করা যায় না; শুধু প্রান্ত দিয়ে এক্সেস।',
    visualType: 'pipeline',
  },
  {
    id: 'hierarchical',
    title: 'Hierarchies & Range Queries',
    subtitle: 'সাজানো ডেটা ও ব্যালেন্সড রেঞ্জ সার্চ',
    icon: Network,
    primaryDS: 'Balanced BST (AVL / RB)',
    secondaryDS: 'Binary Heap (Priority Queue)',
    bestFor: 'ডেটা সবসময় সাজিয়ে রাখা, রেঞ্জ কুয়েরি ($O(\\log N)$) এবং সর্বোচ্চ জরুরি টাস্ক শিডিউলিং।',
    tradeoff: 'পয়েন্টার ট্রাভার্সালে CPU ক্যাশ মিস বেশি হয়; রোটেশন ওভারহেড বিদ্যমান।',
    visualType: 'tree',
  },
  {
    id: 'prefix-network',
    title: 'Prefix Search & Network Graphs',
    subtitle: 'অটোকমপ্লিট ও নন-লিনিয়ার রিলেশনস',
    icon: Search,
    primaryDS: 'Trie (প্রিফিক্স ট্রি)',
    secondaryDS: 'Graph (ভার্টেক্স ও এজ)',
    bestFor: 'সার্চ বার ডিকশনারি সাজেশন, স্পেল চেকার এবং ম্যাপ নেভিগেশন ও ফ্রেন্ড কানেকশন।',
    tradeoff: 'ট্রাইয়ে ক্যারেক্টার টেবিল অনেক বেশি মেমরি নেয়; গ্রাফে সাইকেল হ্যান্ডলিং জটিল।',
    visualType: 'trie_graph',
  },
];

export default function FoundationsTopic() {
  // Metaphor Vector Animation State
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedOp, setSelectedOp] = useState<'search' | 'insert' | 'delete' | 'space'>('search');
  const [activeDomain, setActiveDomain] = useState<string>('direct-access');

  // Auto-play loop for the Science & Art vector simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1800);
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
            <span className="text-xs text-zinc-500 font-mono">Systems &amp; Algorithmic Thinking</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            Architecture Foundations: The Science &amp; The Art
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            কম্পিউটার সায়েন্সে <b>ডেটা স্ট্রাকচার হলো বিজ্ঞান (Science)</b>—যা নির্ধারণ করে মেমরিতে ডেটা কীভাবে বসবে; 
            এবং <b>অ্যালগরিদম হলো শিল্প (Art)</b>—যা সুনির্দিষ্ট নিখুঁত পথে সেই ডেটা থেকে সমাধান বের করে আনে।
          </p>
        </div>
      </div>

      {/* 2. LIVE VECTOR CANVAS: Data Structure (Science) vs Algorithm (Art) */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-base md:text-lg font-bold text-white">
                লাইভ ভেক্টর অ্যানিমেশন: বিজ্ঞান (কাঠামো) বনাম শিল্প (লজিক্যাল পথ)
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              মেমরির ভৌত কাঠামো (Science) এবং অপটিমাল রুটের গতিশীল আলোর রেখা (Art) একসাথে পর্যবেক্ষণ করুন।
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
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Play Motion</span>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveStep(0)}
              className="p-1.5 rounded-lg bg-[#141829] hover:bg-[#1c223a] border border-[#232a45] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Reset Animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dual Interactive SVG Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Vector SVG (7 Cols) */}
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

              {/* SCIENCE: Static Physical Memory Infrastructure */}
              <text x="20" y="24" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                PHYSICAL RAM ARCHITECTURE (THE SCIENCE)
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

              {/* ART: Algorithmic Routing Beam (Dynamic Traversal Flow) */}
              <text x="20" y="150" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                ALGORITHMIC ROUTE &amp; DECISION PATH (THE ART)
              </text>

              {/* Route connecting curve */}
              <path
                d="M 70,110 C 70,190 170,190 170,110 C 170,190 270,190 270,110 C 270,190 370,190 370,110"
                fill="none"
                stroke="#2a324d"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Active Golden Beam traversing based on activeStep */}
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

              {/* Step Status Indicator in SVG */}
              <rect x="20" y="215" width="500" height="45" rx="8" fill="#101424" stroke="#1f2640" />
              <circle
                cx="38"
                cy="237"
                r="4"
                fill={activeStep === 3 ? '#10b981' : '#f59e0b'}
                className="animate-pulse"
              />
              <text x="52" y="241" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
                {activeStep === 0 && 'ধাপ ১: অ্যালগরিদম মেমরির প্রথম সেল 0x100-এ আর্টফুল রুট শুরু করল।'}
                {activeStep === 1 && 'ধাপ ২: শর্ত চেক: Target পাওয়া যায়নি, পরবর্তী মেমরি সেলে জাম্প।'}
                {activeStep === 2 && 'ধাপ ৩: বিজ্ঞান অনুযায়ী পয়েন্টার ধরে এগিয়ে গিয়ে পরবর্তী নোড ভ্যালিডেট।'}
                {activeStep === 3 && 'ধাপ ৪: Target D সফলভাবে ম্যাচ করেছে! অপটিমাল রুটে O(1) ডিরিফারেন্স।'}
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

          {/* Conceptual Insight Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* The Science */}
            <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  ১. বিজ্ঞান (Data Structure is Science)
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">কোথায় ও কীভাবে ডেটা মেমরিতে থাকবে</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                এটি হলো ব্লুপ্রিন্ট ও আর্কিটেকচার। RAM-এর নির্দিষ্ট সেল অ্যাড্রেস (`0x100`, `0x104`), একটানা মেমরি ব্লক (Array) অথবা দূরবর্তী নোড পয়েন্টার (Linked List)—কোন ডেটা কোথায় অবস্থান করবে তা বিজ্ঞানের নিয়মে ঠিক করা হয়।
              </p>
            </div>

            {/* The Art */}
            <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  ২. শিল্প (Algorithm is Art)
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">কোন পথে ও কীভাবে ডেটা প্রসেস হবে</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                কাঠামো তৈরি হওয়ার পর সেই ডেটার ওপর কাজ করার নান্দনিক লজিক হলো অ্যালগরিদম। কীভাবে সার্চ করবেন, কোন রুটটি সবচেয়ে শর্টেস্ট হবে, কীভাবে ব্রুট-ফোর্স এড়িয়ে $O(\log N)$ লুপ পরিচালনা করবেন—এটিই ইঞ্জিনিয়ারিংয়ের মূল শিল্প।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EFFICIENCY DASHBOARD (Time & Memory Complexity Visualizer) */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base md:text-lg font-bold text-white">
                দক্ষতা ও জটিলতা বিশ্লেষণ (System Efficiency &amp; Cost Engine)
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              অপারেশনভেদে সিস্টেমের সময় (Time Complexity) এবং RAM মেমরি খরচের (Space &amp; Overheads) প্রত্যক্ষ তুলনা।
            </p>
          </div>

          {/* Operation Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b14] border border-[#1d2238]">
            {(
              [
                { id: 'search', label: 'Search' },
                { id: 'insert', label: 'Insert' },
                { id: 'delete', label: 'Delete' },
                { id: 'space', label: 'Memory / Space' },
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
                      <span>Relative Cost</span>
                      <span>
                        {isBest ? '⚡ Instant (Optimal)' : isMedium ? '⚖ Logarithmic' : '⏳ Linear / Overhead'}
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

                  {/* Operation Insight Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{currentMetric.desc}</p>
                </div>

                {/* Hardware Cache Locality Badge */}
                <div className="pt-3 border-t border-[#1a1f36] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">Hardware Cache Locality:</span>
                  <span
                    className={`font-semibold ${
                      item.cacheLocality === 'High'
                        ? 'text-emerald-400'
                        : item.cacheLocality === 'Medium'
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

      {/* 4. VISUAL ARCHITECTURE NAVIGATOR (Replacing Plain Filter List) */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <h2 className="text-base md:text-lg font-bold text-white">
                ব্যবহারিক আর্কিটেকচার নেভিগেটর: কোন পরিস্থিতিতে কোনটি?
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              সমস্যার ধরন অনুযায়ী ৪টি প্রধান ইঞ্জিনিয়ারিং ডোমেইন নির্বাচন করে ভিজ্যুয়াল তুলনা দেখুন।
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
                  <span className="text-[10px] font-mono text-zinc-500">Domain</span>
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

        {/* Selected Domain Visual Comparison Canvas */}
        <div className="bg-[#090b14] border border-[#1d2238] rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Visual Diagram Representation */}
          <div className="lg:col-span-5 bg-[#0e101c] border border-[#232a45] rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Visual Structure Comparison
            </span>

            {/* Dynamic mini-vector illustration depending on domain */}
            {selectedDomainData.visualType === 'grid' && (
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400">Array: Contiguous Memory</div>
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
                  <div className="text-[10px] font-mono text-sky-400">Hash Table: Key ➔ Bucket Hash</div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-[#161a2e] border border-sky-500/30 text-zinc-200">
                      &quot;user_99&quot;
                    </span>
                    <span className="text-zinc-500">➔ hash%4 ➔</span>
                    <span className="px-2 py-1 rounded bg-sky-500/20 border border-sky-400 text-sky-300 font-bold">
                      Bucket #3
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedDomainData.visualType === 'pipeline' && (
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400">Stack (LIFO): In Top ➔ Out Top</div>
                  <div className="flex flex-col-reverse gap-1 max-w-[160px] mx-auto">
                    {['Frame 1 (Base)', 'Frame 2 (Mid)', 'Frame 3 (Top ➔ Pop)'].map((frame, i) => (
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
                  <div className="text-[10px] font-mono text-emerald-400">Queue (FIFO): In Back ➔ Out Front</div>
                  <div className="flex items-center gap-1 overflow-x-auto py-1">
                    <span className="text-[10px] text-zinc-500 font-mono">In ➔</span>
                    {['Task 3', 'Task 2', 'Task 1'].map((t, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 rounded bg-[#161a2e] border border-emerald-500/30 text-xs font-mono text-zinc-200 shrink-0"
                      >
                        {t}
                      </div>
                    ))}
                    <span className="text-[10px] text-zinc-500 font-mono">➔ Out</span>
                  </div>
                </div>
              </div>
            )}

            {selectedDomainData.visualType === 'tree' && (
              <div className="space-y-4 w-full text-center">
                <div className="text-[10px] font-mono text-sky-400">Balanced BST &amp; Heap Invariant</div>
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
                  Left &lt; Root &lt; Right strictly balanced to guarantee O(log N)
                </div>
              </div>
            )}

            {selectedDomainData.visualType === 'trie_graph' && (
              <div className="space-y-3 w-full text-center">
                <div className="text-[10px] font-mono text-purple-400">Trie Prefix &amp; Cyclic Graph</div>
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
                  Search speed O(L) proportional only to character length L
                </div>
              </div>
            )}
          </div>

          {/* Right Textual & Strategic Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                Primary: {selectedDomainData.primaryDS}
              </span>
              <span className="text-xs text-zinc-500 font-mono">vs</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
                Alternative: {selectedDomainData.secondaryDS}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-zinc-300">
                <b className="text-white block mb-0.5">কখন এটি বেছে নেবেন:</b>
                {selectedDomainData.bestFor}
              </div>

              <div className="text-xs text-zinc-400">
                <b className="text-amber-400 block mb-0.5">ট্রেড-অফ ও সীমাবদ্ধতা:</b>
                {selectedDomainData.tradeoff}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1a1f33] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>বিস্তারিত কোড ও লাইভ ভিজ্যুয়ালাইজারের জন্য সাইডবারে যান</span>
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
              মেমরি পয়েন্টার, লিনিয়ার ও নন-লিনিয়ার ডেটা স্ট্রাকচার (Array, Stack, Queue, Hash Table, Tree, Trie, Graph) এবং ৪টি কোর অ্যালগরিদমিক প্যারাডাইম।
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
