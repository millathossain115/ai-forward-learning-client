'use client';

import RealLifeScenario from '@/components/RealLifeScenario';

import React from 'react';
import GraphBasics from './GraphBasics';
import GraphVisualizer from './GraphVisualizer';
import {
  Network,
  Cpu,
  Sparkles,
  Zap,
  Table,
  Workflow,
  Boxes,
  Database
} from 'lucide-react';

const GRAPH_COMPLEXITIES = [
  {
    operation: '3-Color DFS Cycle Detection',
    bestCase: 'O(1)',
    worstCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    space: 'O(V)',
    reason: 'Recursion stack depth is bounded by V; detects back-edges to gray ancestors immediately.'
  },
  {
    operation: "Kahn's Topological Sort",
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    space: 'O(V)',
    reason: 'Initializes in-degrees over all E edges; processes zero-dependency vertices via FIFO queue.'
  },
  {
    operation: 'BFS Shortest Path (Unweighted)',
    bestCase: 'O(1)',
    worstCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    space: 'O(V)',
    reason: 'Level-order queue traversal finds minimum hop distance across unweighted edges.'
  },
  {
    operation: "Dijkstra's Shortest Path (Non-negative)",
    bestCase: 'O(V log V)',
    worstCase: 'O((V + E) log V)',
    averageCase: 'O((V + E) log V)',
    space: 'O(V)',
    reason: 'Min-Heap priority queue repeatedly relaxes neighboring distances with logarithmic cost.'
  }
];

const GRAPH_APPLICATIONS = [
  {
    icon: Workflow,
    color: 'text-indigo-400',
    title: '1. LangGraph & Agentic Cognitive Flows',
    desc: 'Modern AI agent runtimes model tool calling, planner loops, and multi-agent coordination as state graphs. Directed Acyclic Subgraphs guarantee deterministic evaluation order while controlled cycles support reflection loops.'
  },
  {
    icon: Boxes,
    color: 'text-sky-400',
    title: '2. Turborepo, Nx & Monorepo Build DAGs',
    desc: 'High-performance build systems parse package dependency graphs into DAGs. Using Kahn’s algorithm, tasks with zero pending upstream tasks execute across parallel CPU cores without race conditions.'
  },
  {
    icon: Database,
    color: 'text-emerald-400',
    title: '3. Database Foreign Keys & Deadlock Graphs',
    desc: 'RDBMS engines (PostgreSQL/MySQL) construct wait-for graphs between concurrent transactions. Cycle detection flags deadlocks in O(V + E) time, triggering safe rollbacks to preserve ACID isolation.'
  }
];

export default function GraphTopic() {
  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Graph Basics: Definition, Vertices, Edges & 3 Types with Interactive Visualizers */}
      <GraphBasics />

      {/* 2. DAG & Cycle Detection Overview */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#181a26] text-indigo-400 flex items-center justify-center border border-[#262a3f]">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">সাইকেল ডিটেকশন ও ডিএজি (DAGs &amp; Cycle Resolution)</h2>
            <span className="text-xs text-zinc-400 font-mono font-medium">Topic 10 • Non-Linear Topologies &amp; Dependency Scheduling</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-4xl">
          <b>DAG (Directed Acyclic Graph)</b> হলো এমন একটি ডিরেক্টেড গ্রাফ যাতে কোনো চক্র বা সাইকেল (Deadlock) থাকে না। 
          টাস্ক শিডিউলিং, বিল্ড সিস্টেম (যেমন: Turborepo) এবং অটোনোমাস AI এজেন্ট ওয়ার্কফ্লোতে কাজের সঠিক ক্রম নির্ধারণে এটি ব্যবহৃত হয়।
        </p>

        {/* Invariant Highlights Box */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] font-mono text-xs md:text-sm text-indigo-300 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-400">Cycle Invariant:</span>
            <span className="font-semibold text-zinc-100">Edge(u, v) is a Back-Edge &hArr; Color(v) == GRAY</span>
          </div>
          <span className="text-xs text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-800/60 font-mono font-medium">
            Kahn Topological Sort: &sum; in_degree = 0 &rArr; Executable
          </span>
        </div>
      </div>

      {/* Real-Life Scenarios */}
            <RealLifeScenario
        topicName="গ্রাফ, সাইকেল ও ডিএজি (Graph, Cycles and DAG)"
        scenarios={[
          {
            title: "১. গুগল ম্যাপসের রোড নেটওয়ার্ক ও ট্রাফিক জ্যাম",
            subtitle: "শহরের মোড়গুলো নোড এবং রাস্তাগুলো কানেক্টিং এজ",
            badge: "Weighted Directed Graph",
            visualTag: "Shortest Path (Dijkstra)",
            accentColor: "sky",
            analogy:
              "শহরের প্রতিটি মোড় বা ইন্টারসেকশন হলো Node, আর সংযোগকারী রাস্তাগুলো হলো Edge। একমুখী রাস্তা মানে Directed Edge, আর জ্যামের সময় হলো Edge-এর Weight। Dijkstra দিয়েই গুগল দ্রুততম রুট বের করে!",
            whyItFits:
              "বাস্তব বিশ্বের ইন্টারকানেক্টেড সিস্টেম (রাস্তা, ফেসবুক ফ্রেন্ডশিপ, ইন্টারনেট কেবল) গ্রাফ ছাড়া অন্য কোনো ডেটা স্ট্রাকচারে উপস্থাপন অসম্ভব।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">উত্তরা মোড়</span>
                <span>➔ (12km) ➔</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">বনানী</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">গুলশান (গন্তব্য)</span>
              </div>
            ),
          },
          {
            title: "২. বিশ্ববিদ্যালয়ের কোর্স প্রি-রিকুইজিট বা বিরিয়ানি রান্নার রেসিপি",
            subtitle: "পূর্বশর্তের ধারাবাহিক শৃঙ্খলা — চক্র থাকলে ডেডলক!",
            badge: "DAG (Directed Acyclic Graph)",
            visualTag: "Topological Sort",
            accentColor: "emerald",
            analogy:
              "CSE101 না করে CSE201 করা যায় না, আবার ভাত না ফুটিয়ে বিরিয়ানি দমে বসানো যায় না। এগুলোতে কাজের সঠিক ক্রম (Topological Sort) থাকতে হয়। চক্র (Cycle) থাকলে ডেডলক হয়ে ছাত্র কোনোদিন পাস করতে পারবে না!",
            whyItFits:
              "DAG নিশ্চিত করে ডিপেন্ডেন্সি চেইনে কোনো অন্তহীন লুপ নেই, ফলে কাজগুলো সুশৃঙ্খল ধাপে সম্পন্ন করা যায়।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">CSE 101</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">CSE 201 (DSA)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">CSE 301 (Algorithms)</span>
              </div>
            ),
          },
        ]}
      />

      {/* 2. Interactive Simulation Playground */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Interactive Graph Visualizer &amp; Pipeline Engine
          </h3>
          <span className="text-[11px] text-zinc-400 font-mono">
            DFS Cycle Check O(V + E) • Kahn Topo Sort O(V + E)
          </span>
        </div>
        <GraphVisualizer />
      </div>

      {/* 3. Time & Space Complexity Benchmark Table */}
      <div className="bg-[#0f111a] border border-[#1e2233] rounded-2xl p-6 flex flex-col gap-4">
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
                <th className="p-3.5 font-medium font-sans">Algorithmic Invariant</th>
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

      {/* 4. Real-World Systems & AI Engineering Applications */}
      <div className="flex flex-col gap-3.5">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          Production &amp; AI Engineering Usages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GRAPH_APPLICATIONS.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2.5 hover:border-[#2b3047] transition-colors"
              >
                <Icon className={`w-5 h-5 ${app.color}`} />
                <h4 className="text-sm md:text-base font-bold text-zinc-100">{app.title}</h4>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
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

