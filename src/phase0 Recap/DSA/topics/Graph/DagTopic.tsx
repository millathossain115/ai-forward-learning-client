'use client';

import React, { useState } from 'react';
import GraphVisualizer from './GraphVisualizer';
import {
  GitCommit,
  RotateCcw,
  Workflow,
  Cpu,
  Table,
  Sparkles,
  Zap,
  Boxes,
  Database,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';

const GRAPH_COMPLEXITIES = [
  {
    operation: '3-Color DFS Cycle Detection',
    bestCase: 'O(1)',
    worstCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    space: 'O(V)',
    reason: 'রিকর্শন স্ট্যাক সাইজ সর্বোচ্চ V; ব্যাক-এজ পেলেই সাথে সাথে সাইকেল চিহ্নিত করে O(1)-এ থেমে যেতে পারে।'
  },
  {
    operation: "Kahn's Topological Sort",
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    space: 'O(V)',
    reason: 'সব এজের In-Degree হিসাব করে এবং 0 In-Degree নোডগুলোকে FIFO কিউ দিয়ে প্রসেস করে।'
  },
  {
    operation: 'BFS Shortest Path (Unweighted DAG)',
    bestCase: 'O(1)',
    worstCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    space: 'O(V)',
    reason: 'লেভেল-বাই-লেভেল ট্রাভার্সাল দিয়ে সর্বনিম্ন হপ দূরত্ব বের করে।'
  },
  {
    operation: "Dijkstra's Shortest Path (Weighted DAG)",
    bestCase: 'O(V log V)',
    worstCase: 'O((V + E) log V)',
    averageCase: 'O((V + E) log V)',
    space: 'O(V)',
    reason: 'Min-Heap প্রায়োরিটি কিউ ব্যবহার করে সংলগ্ন দূরত্বের রিল্যাক্সেশন সম্পন্ন করে।'
  }
];

const DAG_APPLICATIONS = [
  {
    icon: Workflow,
    color: 'text-indigo-400',
    title: '১. AI এজেন্ট ও LangGraph ওয়ার্কফ্লো',
    desc: 'আধুনিক মাল্টি-এজেন্ট সিস্টেমে টুল কলিং, প্ল্যানার লুপ ও ডিসিশন ট্রাকে ডিরেক্টেড অ্যাসাইক্লিক সাবগ্রাফ (DAG) দিয়ে সুশৃঙ্খল এক্সিকিউশন নিশ্চিত করা হয়, আর নির্দিষ্ট রিফ্লেকশন লুপে সাইকেল হ্যান্ডেল করা হয়।'
  },
  {
    icon: Boxes,
    color: 'text-sky-400',
    title: '২. Turborepo & Monorepo বিল্ড পাইপলাইন',
    desc: 'বড় সফটওয়্যার প্রজেক্টে প্যাকেজের ডিপেন্ডেন্সি গ্রাফ তৈরি করে Kahn অ্যালগরিদমের মাধ্যমে স্বাধীন টাস্কগুলো মাল্টিপল CPU কোরে প্যারালালে রান করানো হয়।'
  },
  {
    icon: Database,
    color: 'text-emerald-400',
    title: '৩. ডেটাবেজ ডেডলক রেজোলিউশন (Wait-for Graphs)',
    desc: 'PostgreSQL বা MySQL কনকারেন্ট ট্রানজ্যাকশনের মধ্যে রিসোর্স লক চেক করতে Wait-for গ্রাফে ৩-কালার DFS দিয়ে সাইকেল খুঁজে বের করে এবং ডেডলক হলে রোলব্যাক করায়।'
  }
];

export default function DagTopic() {
  const [activeTab, setActiveTab] = useState<'compare' | 'cycle' | 'kahn'>('compare');

  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13162b] via-[#0d0f1b] to-[#070912] border border-[#232945] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
              Topic 11 • Graphs &amp; Pipelines
            </span>
            <span className="text-xs text-zinc-500 font-mono">Dependency Resolution &amp; Topo Sort</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            সাইক্লিক গ্রাফ বনাম ডিএজি (Cyclic vs DAG)
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            ডিরেক্টেড গ্রাফে চক্র (Cycle) থাকলে ডেডলক ও অসীম লুপ তৈরি হয়। পক্ষান্তরে <b>DAG (Directed Acyclic Graph)</b> কোনো চক্র ছাড়াই একমুখী কার্যপ্রবাহ বজায় রাখে, যা আধুনিক টাস্ক শিডিউলিং ও AI এজেন্ট আর্কিটেকচারের মূল মেরুদণ্ড।
          </p>
        </div>
      </div>

      {/* 2. Visual Comparison: Cyclic Deadlock vs Acyclic Workflow (Animated Vector Canvas) */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 md:p-8 rounded-3xl flex flex-col gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f30] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>ভিজ্যুয়াল তুলনা: সাইক্লিক ডেডলক বনাম ডিএজি লিনিয়ার ফ্লো</span>
            </h2>
            <p className="text-xs text-zinc-400">
              চক্র থাকলে কাজের অন্তহীন অপেক্ষা বনাম চক্রহীন গ্রাফে সুশৃঙ্খল এক্সেকিউশন।
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-[#141724] border border-[#212638] text-indigo-300">
            <span>কোর রুল: DAG &rArr; No Back-Edges</span>
          </div>
        </div>

        {/* 2 Side-by-Side Visual Vector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Cyclic Graph (Deadlock Loop) */}
          <div className="p-5 rounded-2xl bg-[#090b14] border border-rose-500/30 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-sm font-bold">১. সাইক্লিক গ্রাফ (Cyclic: ডেডলক চক্র)</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
                Infinite Loop Risk
              </span>
            </div>

            {/* SVG Illustration: A -> B -> C -> A */}
            <div className="w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 280 180" className="w-full max-w-[240px] h-auto">
                <defs>
                  <marker id="arrowRose" markerWidth="7" markerHeight="6" refX="21" refY="3" orient="auto">
                    <polygon points="0 0, 7 3, 0 6" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Circular Directed Edges */}
                <path d="M 80,60 L 200,60" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowRose)" strokeDasharray="4 3" />
                <path d="M 200,60 L 140,140" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowRose)" strokeDasharray="4 3" />
                <path d="M 140,140 L 80,60" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowRose)" strokeDasharray="4 3" />

                {/* Nodes */}
                {[
                  { id: 'T1', label: 'টাস্ক ১', x: 80, y: 60 },
                  { id: 'T2', label: 'টাস্ক ২', x: 200, y: 60 },
                  { id: 'T3', label: 'টাস্ক ৩', x: 140, y: 140 },
                ].map((n) => (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r="18" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                    <text x={n.x} y={n.y + 4} fill="#ffe4e6" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                      {n.id}
                    </text>
                  </g>
                ))}

                {/* Central Deadlock indicator */}
                <circle cx="140" cy="85" r="14" fill="#881337" opacity="0.8" />
                <text x="140" y="89" fill="#fecdd3" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  DEADLOCK
                </text>
              </svg>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              টাস্ক ১ নির্ভর করে টাস্ক ৩-এর ওপর, টাস্ক ৩ নির্ভর করে টাস্ক ২-এর ওপর, আর টাস্ক ২ আবার নির্ভর করে টাস্ক ১-এর ওপর! ফলে কেউই কাজ শুরু করতে পারে না—যাকে <b>Circular Dependency Deadlock</b> বলে।
            </p>
          </div>

          {/* Card 2: Directed Acyclic Graph (DAG) */}
          <div className="p-5 rounded-2xl bg-[#090b14] border border-emerald-500/30 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-sm font-bold">২. ডিএজি (DAG: সুশৃঙ্খল সমাধান)</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                Schedulable &amp; Safe
              </span>
            </div>

            {/* SVG Illustration: A -> B -> C (Linear flow) */}
            <div className="w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 280 180" className="w-full max-w-[240px] h-auto">
                <defs>
                  <marker id="arrowEmerald" markerWidth="7" markerHeight="6" refX="21" refY="3" orient="auto">
                    <polygon points="0 0, 7 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {/* Directed Edges with no cycles */}
                <path d="M 60,90 L 140,90" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />
                <path d="M 140,90 L 220,90" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />
                <path d="M 60,90 C 100,30 180,30 220,90" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowEmerald)" />

                {/* Nodes */}
                {[
                  { id: 'Compile', label: '1. Compile', x: 60, y: 90 },
                  { id: 'Test', label: '2. Test', x: 140, y: 90 },
                  { id: 'Deploy', label: '3. Deploy', x: 220, y: 90 },
                ].map((n) => (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r="18" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x={n.x} y={n.y + 4} fill="#d1fae5" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      {n.id.substring(0, 3)}
                    </text>
                  </g>
                ))}

                {/* Topological order label */}
                <text x="140" y="150" fill="#6ee7b7" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Topo Order: 1 ➔ 2 ➔ 3
                </text>
              </svg>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              এতে কোনো চক্র নেই। তীরগুলো সব সময় একমুখী। টাস্কগুলোর একটি স্পষ্ট অগ্রাধিকার ক্রম (Topological Sort) থাকে, যার ফলে টাস্ক ১ শেষ হলে টাস্ক ২ এবং তারপর নির্বিঘ্নে টাস্ক ৩ সম্পন্ন হতে পারে।
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 2 Core Algorithmic Engines (3-Color DFS vs Kahn Topo Sort) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3-Color DFS */}
        <div className="p-6 rounded-3xl bg-[#0f111a] border border-[#1e2233] space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">৩-কালার DFS দিয়ে সাইকেল শনাক্তকরণ</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            গ্রাফের প্রতিটি নোডকে ৩টি রঙে চিহ্নিত করে ডেডলক সাইকেল ধরা হয়:
          </p>
          <ul className="text-xs text-zinc-300 space-y-2 pt-1 font-mono">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-600 border border-slate-400" />
              <span><b>WHITE:</b> নোডটি এখনো এক্সপ্লোর করা হয়নি (Unvisited)।</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300" />
              <span><b>GRAY:</b> বর্তমানে রিকর্শন স্ট্যাকে প্রসেসিংরত (In Current Path)।</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300" />
              <span><b>BLACK:</b> নোড ও তার সব শাখা সম্পূর্ণ প্রসেসড (Finished)।</span>
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-[#090b14] border border-[#1d2238] text-[11px] font-mono text-amber-300">
            💡 মূল নিয়ম: DFS চলাকালীন যদি কোনো নোডের প্রতিবেশী <b>GRAY</b> রঙের হয়, তার মানে গ্রাফে একটি ব্যাক-এজ (Back-Edge) রয়েছে &mdash; অর্থাৎ <b>Cycle Detected!</b>
          </div>
        </div>

        {/* Kahn's Algorithm */}
        <div className="p-6 rounded-3xl bg-[#0f111a] border border-[#1e2233] space-y-3">
          <div className="flex items-center gap-2 text-sky-400">
            <Workflow className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">কান-এর টপোলজিক্যাল সর্ট (Kahn&apos;s Algorithm)</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            In-Degree (কোনো নোডের ওপর কতটি নোড ইনকামিং নির্ভর করে) হিসাব করে টাস্ক রান করানো হয়:
          </p>
          <ul className="text-xs text-zinc-300 space-y-2 pt-1 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-sky-400 font-bold">১.</span>
              <span>যেসব নোডের ইন-ডিগ্রি 0 (কারও ওপর নির্ভর করে না), তাদের একটি কিউতে (FIFO Queue) রাখা হয়।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 font-bold">২.</span>
              <span>কিউ থেকে নোড বের করে এক্সেকিউট করা হয় এবং তার আউটগোয়িং এজের প্রতিবেশীদের ইন-ডিগ্রি ১ কমানো হয়।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400 font-bold">৩.</span>
              <span>নতুন নোডের ইন-ডিগ্রি 0 হলেই সেটি কিউতে যোগ হয়। এভাবে লিনিয়ার এক্সেকিউশন অর্ডার পাওয়া যায়।</span>
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-[#090b14] border border-[#1d2238] text-[11px] font-mono text-sky-300">
            💡 মূল নিয়ম: সব নোড প্রসেস হওয়ার আগেই কিউ খালি হয়ে গেলে গ্রাফে ডেডলক সাইকেল রয়েছে।
          </div>
        </div>
      </div>

      {/* 4. Interactive Simulation Playground */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            ইন্টারঅ্যাক্টিভ গ্রাফ পাইপলাইন ও সাইকেল চেকার (Live Engine)
          </h3>
          <span className="text-[11px] text-zinc-400 font-mono">
            DFS Cycle Check O(V + E) • Kahn Topo Sort O(V + E)
          </span>
        </div>
        <GraphVisualizer />
      </div>

      {/* 5. Time & Space Complexity Benchmark Table */}
      <div className="bg-[#0f111a] border border-[#1e2233] rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Table className="w-4 h-4 text-zinc-400" />
          Time &amp; Space Complexity Benchmarks
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
              <tr>
                <th className="p-3.5 font-medium">Algorithm</th>
                <th className="p-3.5 font-medium">Best</th>
                <th className="p-3.5 font-medium">Worst</th>
                <th className="p-3.5 font-medium">Average</th>
                <th className="p-3.5 font-medium">Aux Space</th>
                <th className="p-3.5 font-medium font-sans">ইনভ্যারিয়েন্ট ও কারণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171926] text-zinc-200">
              {GRAPH_COMPLEXITIES.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#11131c]">
                  <td className="p-3.5 font-medium text-zinc-100">{c.operation}</td>
                  <td className="p-3.5 text-emerald-400">{c.bestCase}</td>
                  <td className="p-3.5 text-rose-400">{c.worstCase}</td>
                  <td className="p-3.5 text-amber-300">{c.averageCase}</td>
                  <td className="p-3.5 text-sky-400">{c.space}</td>
                  <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">{c.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Real-World Systems & AI Engineering Applications */}
      <div className="flex flex-col gap-3.5">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          বাস্তব সিস্টেমস ও AI ইঞ্জিনিয়ারিংয়ে ব্যবহার (Production Usages)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DAG_APPLICATIONS.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-2xl space-y-2.5 hover:border-[#2b3047] transition-colors"
              >
                <Icon className={`w-5 h-5 ${app.color}`} />
                <h4 className="text-sm md:text-base font-bold text-zinc-100">{app.title}</h4>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                  {app.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
