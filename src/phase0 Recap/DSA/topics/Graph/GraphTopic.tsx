'use client';

import React, { useState } from 'react';
import GraphBasics from './GraphBasics';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Network,
  Share2,
  Table,
  CheckCircle2,
  Grid,
  List
} from 'lucide-react';

export default function GraphTopic() {
  const [repView, setRepView] = useState<'list' | 'matrix'>('list');

  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13162b] via-[#0d0f1b] to-[#070912] border border-[#232945] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
              Topic 10 • Non-Linear Topologies
            </span>
            <span className="text-xs text-zinc-500 font-mono">Vertices, Edges &amp; Connectivity</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            গ্রাফ পরিচিতি ও প্রকারভেদ (Graph Basics &amp; Types)
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            বাস্তব পৃথিবীর যেকোনো পরস্পর সংযুক্ত সম্পর্ক (যেমন: সোশ্যাল মিডিয়া ফ্রেন্ডলিস্ট, সড়কের মোড় ও হাইওয়ে ম্যাপ কিংবা ইন্টারনেট কেবল নেটওয়ার্ক) সংরক্ষণের জন্য গ্রাফ হলো সবচেয়ে শক্তিশালী নন-লিনিয়ার ডেটা স্ট্রাকচার।
          </p>
        </div>
      </div>

      {/* 2. Core Basics: Vertex, Edge & 3 Types with Interactive Simulators */}
      <GraphBasics />

      {/* 3. Representation in Memory: Adjacency List vs Adjacency Matrix */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 md:p-8 rounded-3xl flex flex-col gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f30] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>মেমরিতে গ্রাফ কীভাবে রাখা হয়? (Graph Representation in RAM)</span>
            </h2>
            <p className="text-xs text-zinc-400">
              কম্পিউটারের মেমরিতে গ্রাফ সংরক্ষণের দুটি প্রধান উপায়: অ্যাডজাসেন্সি লিস্ট ও অ্যাডজাসেন্সি ম্যাট্রিক্স।
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b14] border border-[#1d2238]">
            <button
              onClick={() => setRepView('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                repView === 'list'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Adjacency List (লিস্ট)</span>
            </button>
            <button
              onClick={() => setRepView('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                repView === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Adjacency Matrix (ম্যাট্রিক্স)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display of Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Code / Table Block (6 Cols) */}
          <div className="lg:col-span-6 bg-[#080a12] border border-[#1b1f33] rounded-2xl p-5 flex flex-col justify-center font-mono text-xs">
            {repView === 'list' ? (
              <div className="space-y-2">
                <div className="text-zinc-400 text-[11px] pb-1 border-b border-zinc-800">
                  // Adjacency List: O(V + E) Space (Sparse গ্রাফে সেরা)
                </div>
                <div className="p-3 rounded-xl bg-[#0e1222] border border-[#1e2642] space-y-1 text-indigo-300">
                  <div>&quot;A&quot;: [&quot;B&quot;, &quot;C&quot;]</div>
                  <div>&quot;B&quot;: [&quot;A&quot;, &quot;C&quot;, &quot;D&quot;]</div>
                  <div>&quot;C&quot;: [&quot;A&quot;, &quot;B&quot;, &quot;D&quot;]</div>
                  <div>&quot;D&quot;: [&quot;B&quot;, &quot;C&quot;]</div>
                </div>
                <div className="text-[11px] text-emerald-400 pt-1">
                  ✓ কেবল যে নোডগুলোর সাথে সংযোগ আছে শুধু সেগুলোই মেমরিতে থাকে।
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-zinc-400 text-[11px] pb-1 border-b border-zinc-800">
                  // Adjacency Matrix: O(V²) Space (Dense গ্রাফে দ্রুত চেক)
                </div>
                <div className="p-3 rounded-xl bg-[#0e1222] border border-[#1e2642] overflow-x-auto">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="text-zinc-400 border-b border-zinc-800">
                        <th className="p-1"></th>
                        <th className="p-1">A</th>
                        <th className="p-1">B</th>
                        <th className="p-1">C</th>
                        <th className="p-1">D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-indigo-200">
                      <tr><td className="p-1 text-zinc-400 font-bold">A</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
                      <tr><td className="p-1 text-zinc-400 font-bold">B</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                      <tr><td className="p-1 text-zinc-400 font-bold">C</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
                      <tr><td className="p-1 text-zinc-400 font-bold">D</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-sky-400 pt-1">
                  ✓ Matrix[i][j] দিয়ে O(1) সময়ে চেক করা যায় দুটি নোড যুক্ত কিনা।
                </div>
              </div>
            )}
          </div>

          {/* Explanation Card (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {repView === 'list'
                    ? 'অ্যাডজাসেন্সি লিস্ট কেন প্রোডাকশনে বেশি ব্যবহৃত হয়?'
                    : 'অ্যাডজাসেন্সি ম্যাট্রিক্স কখন উপযুক্ত?'}
                </span>
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {repView === 'list'
                  ? 'বাস্তব জীবনের অধিকাংশ গ্রাফই স্পার্স (Sparse Graph)—অর্থাৎ মোট সম্ভাব্য এজের তুলনায় আসল এজ অনেক কম থাকে। ফেসবুকের ৩০০ কোটি ব্যবহারকারীর প্রত্যেকে যদি গড়ে ৫০০ জনের বন্ধু হয়, ম্যাট্রিক্স বানালে বিলিয়ন বিলিয়ন খালি 0 মেমরিতে অপচয় হতো। তাই অ্যাডজাসেন্সি লিস্ট মেমরি অপটিমাইজেশনের জন্য সেরা।'
                  : 'যখন গ্রাফের নোড সংখ্যা খুব কম কিন্তু তাদের মধ্যে প্রায় সবাই সবার সাথে যুক্ত থাকে (Dense Graph), তখন ম্যাট্রিক্স ব্যবহার করা হয়। এতে কোনো দুটি নোড সরাসরি কানেক্টেড কিনা তা কোনো লুপ ছাড়া সাথে সাথে O(1) সময়ে চেক করা যায়।'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Real-Life Scenarios */}
      <RealLifeScenario
        topicName="গ্রাফের বাস্তব ব্যবহার (Real-Life Applications of Graphs)"
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
            title: "২. সোশ্যাল মিডিয়া ফ্রেন্ড সাজেশন ও নেটওয়ার্ক গ্রাফ",
            subtitle: "মিউচুয়াল ফ্রেন্ড ও ডিগ্রি অফ সেপারেশন",
            badge: "Undirected Graph",
            visualTag: "BFS Traversal",
            accentColor: "emerald",
            analogy:
              "ফেসবুকে আপনার বন্ধুদের বন্ধুদের (Friends of Friends) খুঁজে বের করতে গ্রাফের ব্রেডথ-ফার্স্ট সার্চ (BFS) চালানো হয়। দুই স্তরের নোড চেক করলেই 'People You May Know' বের হয়ে আসে!",
            whyItFits:
              "আনডিরেক্টেড গ্রাফ দ্বিমুখী সম্পর্ক সহজে ট্রাভার্স করতে দেয় এবং সোশ্যাল কানেকশনের দূরত্ব পরিমাপ করে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">ইউজার (আপনি)</span>
                <span>⟷</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">ফ্রেন্ড A</span>
                <span>⟷</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">ফ্রেন্ড B (সাজেশন)</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
