'use client';

import RealLifeScenario from '@/components/RealLifeScenario';

import React, { useState, useEffect } from 'react';
import {
  TrendingDown,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  BarChart3,
  Cpu
} from 'lucide-react';

const INITIAL_BARS = [45, 12, 85, 32, 89, 21, 64, 53, 98, 15, 76, 38];

export default function SortingTopic() {
  const [bars, setBars] = useState<number[]>(INITIAL_BARS);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'insertion' | 'selection'>('bubble');
  const [message, setMessage] = useState('Select an algorithm and click Start Sort to watch comparisons and swaps live.');

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const shuffleBars = () => {
    if (isSorting) return;
    const shuffled = [...bars].sort(() => Math.random() - 0.5);
    setBars(shuffled);
    setActiveIndices([]);
    setMessage('Array shuffled. Ready for sorting.');
  };

  // 1. Bubble Sort
  const runBubbleSort = async () => {
    setIsSorting(true);
    const arr = [...bars];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await sleep(150);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setBars([...arr]);
        }
      }
    }

    setActiveIndices([]);
    setIsSorting(false);
    setMessage('🎉 Bubble Sort Complete! O(N²) worst-case time complexity.');
  };

  // 2. Insertion Sort
  const runInsertionSort = async () => {
    setIsSorting(true);
    const arr = [...bars];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        setActiveIndices([j, j + 1]);
        arr[j + 1] = arr[j];
        setBars([...arr]);
        await sleep(150);
        j--;
      }
      arr[j + 1] = key;
      setBars([...arr]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    setMessage('🎉 Insertion Sort Complete! Great for nearly-sorted data O(N) best case.');
  };

  const handleStartSort = () => {
    if (algorithm === 'bubble') runBubbleSort();
    else if (algorithm === 'insertion') runInsertionSort();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100">Sorting Algorithms: Comparative Race Visualizer</h2>
            <span className="text-[11px] font-mono text-amber-400">Bubble Sort • Insertion Sort • Merge &amp; Quick Sort</span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          Sorting is fundamental to high-speed retrieval. While quadratic sorts ($O(N^2)$ like Bubble and Insertion)
          compare adjacent items repeatedly, divide-and-conquer algorithms (Merge &amp; Quick Sort) achieve optimal <b>O(N log N)</b> performance.
        </p>
      </div>

      {/* Real-Life Scenarios */}
            <RealLifeScenario
        topicName="সর্টিং অ্যালগরিদম (Sorting Algorithms)"
        scenarios={[
          {
            title: "১. হাতের খেলার তাস ক্রমানুসারে সাজানো (Playing Cards)",
            subtitle: "নতুন কার্ড এলে বাঁহাতের সঠিক স্লটে গুঁজে দেওয়া",
            badge: "Insertion Sort",
            visualTag: "O(N²) Adaptive",
            accentColor: "amber",
            analogy:
              "তাসের খেলায় হাতে নতুন তাস আসলে আমরা বাঁহাতের সাজানো কার্ডগুলোর মাঝে সঠিক স্লটটি খুঁজে সেখানে গুঁজে দেই। ডানের কার্ডগুলো সামান্য ডানে সরে গিয়ে জায়গা করে দেয়।",
            whyItFits:
              "বাস্তবে মানুষ ছোট ডেটাসেট সাজাতে Insertion Sort-ই স্বজ্ঞাতভাবে ব্যবহার করে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 py-1">
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800">[3, 7, 9]</span>
                <span>+ তাস 5 ➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">[3, 5, 7, 9]</span>
              </div>
            ),
          },
          {
            title: "২. স্কুলের অ্যাসেম্বলিতে ছাত্রদের উচ্চতা অনুসারে দাঁড় করানো",
            subtitle: "পাশাপাশি দুইজনের তুলনা করে লম্বা জনকে ডানে পাঠানো",
            badge: "Bubble Sort",
            visualTag: "Adjacent Swapping",
            accentColor: "emerald",
            analogy:
              "পিটি শিক্ষক দুই বন্ধুকে পাশাপাশি দাঁড় করিয়ে বলেন: 'যে লম্বা সে ডানে যাও।' এভাবে এক প্রান্ত থেকে অন্য প্রান্তে ক্রমাগত পাশাপাশি অদলবদল (swap) চলতে থাকে।",
            whyItFits:
              "পাশাপাশি দুটি মান তুলনা করে বড়টিকে ডানদিকে বা শেষে পাঠিয়ে দেওয়া হলো খাঁটি বাবল সর্টের বাস্তব রূপ।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">A (5ft 4in)</span>
                <span>↔</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">B (5ft 1in)</span>
                <span>Swap ➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">লম্বা জন শেষে</span>
              </div>
            ),
          },
        ]}
      />

      {/* 2. Interactive Bar Visualizer */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Algorithm:</span>
            <select
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value as any)}
              disabled={isSorting}
              className="bg-[#090a10] border border-[#23273d] text-xs font-mono text-amber-300 px-3 py-1.5 rounded-lg focus:outline-none"
            >
              <option value="bubble">Bubble Sort O(N²)</option>
              <option value="insertion">Insertion Sort O(N²)</option>
            </select>

            <button
              onClick={handleStartSort}
              disabled={isSorting}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {isSorting ? 'Sorting...' : 'Start Sort'}
            </button>
          </div>

          <button
            onClick={shuffleBars}
            disabled={isSorting}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] disabled:opacity-40 text-zinc-300 border border-[#292c42]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Shuffle Bars
          </button>
        </div>

        {/* Animated Bar Chart Viewport */}
        <div className="h-64 bg-[#090a10] rounded-xl border border-[#1a1d2e] p-6 flex items-end justify-center gap-2 sm:gap-3">
          {bars.map((val, idx) => {
            const isComparing = activeIndices.includes(idx);
            const heightPercent = Math.max(10, Math.min(100, (val / 100) * 100));

            return (
              <div key={idx} className="flex-1 max-w-[40px] flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-mono text-zinc-400">{val}</span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-150 ${
                    isComparing
                      ? 'bg-rose-500 ring-2 ring-rose-400/80 shadow-lg shadow-rose-500/30'
                      : 'bg-gradient-to-t from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[9px] font-mono text-zinc-600">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Live Feedback Banner */}
        <div className="p-3.5 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-zinc-200">1. SQL ORDER BY &amp; External Sort</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Databases use External Merge Sort when sorting gigabytes of records that cannot fit into RAM memory simultaneously.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Cpu className="w-4 h-4 text-rose-400" />
          <h4 className="text-xs font-bold text-zinc-200">2. Hybrid Sorts (Timsort)</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Python (<code>sorted()</code>) and V8 JavaScript (<code>Array.prototype.sort</code>) use <b>Timsort</b>: a hybrid combining Merge Sort with Insertion Sort for real-world speed.
          </p>
        </div>
      </div>
    </div>
  );
}
