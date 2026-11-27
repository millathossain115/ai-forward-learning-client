'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Clock,
  Route,
  ShieldAlert
} from 'lucide-react';
import { DijkstraStep } from './dijkstraTypes';
import { generateDijkstraSteps } from './utils/dijkstraAlgorithm';
import DijkstraCanvas from './components/DijkstraCanvas';
import DijkstraQueueDistancePanel from './components/DijkstraQueueDistancePanel';

export default function DijkstraTopic() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Precompute Dijkstra simulation from A to F
  const steps = useMemo<DijkstraStep[]>(() => generateDijkstraSteps('A', 'F'), []);

  const totalSteps = steps.length;
  const isAtEnd = currentStepIdx >= totalSteps - 1;
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = speedMode === 'slow' ? 2400 : 1300;
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < totalSteps - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSteps, speedMode]);

  return (
    <div className="flex flex-col gap-6 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-[#3d2f16] p-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 font-bold">
              Topic 11.3 • Most Popular Shortest Path Algorithm
            </span>
            <span className="text-xs text-zinc-500 font-mono">Dijkstra&apos;s Algorithm • Edge Relaxation • Min-Heap</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            ডাইকস্ট্রা অ্যালগরিদম: ওজনযুক্ত গ্রাফে সর্বনিম্ন পথ নির্ণয়
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            Google Maps বা GPS নেভিগেশনের প্রাণকেন্দ্র হলো ডাইকস্ট্রা অ্যালগরিদম। এটি একটি গ্রিডি (Greedy) কৌশল যেখানে <b>Min-Heap</b> দিয়ে ধাপে ধাপে সর্বনিম্ন দূরত্বের নোড বেছে নিয়ে <b>এজ রিল্যাক্সেশন (Edge Relaxation)</b>-এর মাধ্যমে চূড়ান্ত সর্বনিম্ন পথ তৈরি করে।
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">মূল সূত্র (Core Relaxation Formula)</span>
          <div className="text-sm font-bold text-amber-300">
            if (dist[u] + w &lt; dist[v])
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            পূর্বের পথের চেয়ে বর্তমান নোড হয়ে দূরত্ব কম হলে নতুন মান আপডেট হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">টাইম ও স্পেস জটিলতা (Complexity)</span>
          <div className="text-base font-bold text-emerald-400">
            O((V + E) log V)
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            Min-Heap প্রায়োরিটি কিউ ব্যবহার করে O(log V)-এ সর্বনিম্ন নোড এক্সট্রাক্ট করা হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">শর্ত (Pre-Condition)</span>
          <div className="text-base font-bold text-rose-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Non-Negative Weights (w &ge; 0)</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            ঋণাত্মক ওজনের এজে ডাইকস্ট্রা ব্যর্থ হয় (সেক্ষেত্রে Bellman-Ford লাগে)।
          </p>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Route className="w-4 h-4 text-amber-400" />
            <span>ডাইকস্ট্রা সিমুলেটর (A ➔ F)</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-bold">
            {currentStep.actionTag}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx((prev) => Math.max(0, prev - 1));
            }}
            disabled={isPlaying || currentStepIdx === 0}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
            title="এক ধাপ পেছনে যান"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              if (isAtEnd) {
                setCurrentStepIdx(0);
                setIsPlaying(true);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs font-mono transition-colors cursor-pointer shadow ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : isAtEnd
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : isAtEnd ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Dijkstra</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx((prev) => Math.min(totalSteps - 1, prev + 1));
            }}
            disabled={isPlaying || isAtEnd}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
            title="এক ধাপ সামনে যান"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
            title="রিসেট"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Toggle */}
          <div className="flex items-center gap-1 bg-[#101322] p-0.5 rounded-lg border border-[#1f263d] text-[10px] font-mono">
            <Clock className="w-3 h-3 text-zinc-400 ml-1" />
            <button
              onClick={() => setSpeedMode('slow')}
              className={`px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                speedMode === 'slow'
                  ? 'bg-amber-600/60 text-amber-200 font-bold border border-amber-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              0.5x
            </button>
            <button
              onClick={() => setSpeedMode('normal')}
              className={`px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-amber-600/60 text-amber-200 font-bold border border-amber-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              1.0x
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-amber-300 font-bold">{currentStepIdx + 1}</span> / {totalSteps}
          </div>
        </div>
      </div>

      {/* 4. MAIN SIMULATION ARENA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <DijkstraCanvas currentStep={currentStep} currentStepIdx={currentStepIdx} />
        <DijkstraQueueDistancePanel currentStep={currentStep} />
      </div>

      {/* 5. Real Life Scenario */}
      <RealLifeScenario
        topicName="ডাইকস্ট্রা অ্যালগরিদম (Dijkstra's Shortest Path)"
        scenarios={[
          {
            title: "১. Google Maps ও জিপিএস নেভিগেশন (Fastest Driving Route)",
            subtitle: "ট্রাফিক জ্যাম ও দূরত্বের সমন্বয়ে দ্রুততম পথ",
            analogy: "শহরে গন্তব্যে পৌঁছানোর একাধিক রাস্তা থাকে। কিছু রাস্তা সোজা হলেও জ্যাম বেশি (ওজন বেশি), কিছু রাস্তা সামান্য বাঁকা হলেও দ্রুত যাওয়া যায়।",
            whyItFits: "ডাইকস্ট্রা প্রতি মোড়ে এজ রিল্যাক্সেশন করে সর্বনিম্ন সময়ের পথটি বের করে। ঋণাত্মক সময় সম্ভব নয় বিধায় ডাইকস্ট্রার শর্ত পূরণ হয়।",
            badge: "GPS Routing",
            accentColor: "amber",
            visualTag: "Min-Heap"
          },
          {
            title: "২. ইন্টারনেট রাউটার প্যাকেট রাউটিং (OSPF Protocol)",
            subtitle: "সবচেয়ে কম লেটেন্সিতে সার্ভারে ডেটা ডেলিভারি",
            analogy: "একটি মেসেজ আমেরিকা থেকে বাংলাদেশে আসার সময় একাধিক সাবমেরিন ক্যাবল ও স্যাটেলাইট নোড পার হয়।",
            whyItFits: "ইন্টারনেটের OSPF রাউটিং প্রোটোকল ডাইকস্ট্রা অ্যালগরিদম ব্যবহার করে সর্বনিম্ন পিং/লেটেন্সির নেটওয়ার্ক পথ বেছে নেয়।",
            badge: "Packet Routing",
            accentColor: "emerald",
            visualTag: "O((V+E)logV)"
          }
        ]}
      />
    </div>
  );
}
