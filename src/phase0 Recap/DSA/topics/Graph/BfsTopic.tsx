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
  ListFilter,
  Network
} from 'lucide-react';
import { BfsStep } from './bfsTypes';
import { generateBfsSteps } from './utils/bfsAlgorithm';
import BfsCanvas from './components/BfsCanvas';
import BfsQueueDistancePanel from './components/BfsQueueDistancePanel';
import BfsUseCases from './components/BfsUseCases';

export default function BfsTopic() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Precompute BFS steps starting from A
  const steps = useMemo<BfsStep[]>(() => generateBfsSteps('A'), []);

  const totalSteps = steps.length;
  const isAtEnd = currentStepIdx >= totalSteps - 1;
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = speedMode === 'slow' ? 2200 : 1200;
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1829] via-[#091220] to-[#050912] border border-[#1b2f4d] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/35 text-sky-300 font-bold">
              Topic 11.2 • Graph Traversal
            </span>
            <span className="text-xs text-zinc-500 font-mono">Breadth First Search • FIFO Queue • Shortest Hops</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            ব্রেডথ-ফার্স্ট সার্চ: BFS ও লেভেল-বাই-লেভেল ট্রাভার্সাল
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            DFS যেখানে গভীরতম পথ ধরে আগে যায়, BFS সেখানে <b>লেভেল-বাই-লেভেল (Concentric Waves)</b> নিকটবর্তী সব প্রতিবেশীকে আগে প্রসেস করে। এটি <b>FIFO কিউ (Queue)</b> ব্যবহার করে পরিচালিত হয় এবং আনওয়েটেড গ্রাফে সোর্স থেকে যেকোনো নোডের <b>সর্বনিম্ন হপ দূরত্বের (Shortest Path) গ্যারান্টি</b> দেয়।
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">মেমরি স্ট্রাকচার (Data Structure)</span>
          <div className="text-base font-bold text-sky-300 flex items-center gap-1.5">
            <ListFilter className="w-4 h-4 text-sky-400" />
            <span>FIFO Queue</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            First-In-First-Out কিউ ব্যবহার করে যে নোড আগে দেখা হয়, তার প্রতিবেশীরা আগে প্রসেস হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">টাইম ও স্পেস জটিলতা (Complexity)</span>
          <div className="text-base font-bold text-emerald-400">
            Time: O(V + E) • Space: O(V)
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            প্রতিটি নোড কিউতে সর্বোচ্চ একবার এনকিউ ও ডিকিউ হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">বিশেষত্ব (Core Invariant)</span>
          <div className="text-base font-bold text-amber-300">
            Shortest Path (Unweighted)
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            ওজনহীন গ্রাফে বা গ্রিড ম্যাপে সর্বনিম্ন দূরত্ব (Shortest Hops) পাওয়ার মোক্ষম অস্ত্র।
          </p>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-400" />
            <span>BFS লেভেল সিমুলেটর</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-bold">
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
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs font-mono transition-all cursor-pointer shadow ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : isAtEnd
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-sky-600 hover:bg-sky-500 text-white'
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
                <span>Play BFS</span>
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
              className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                speedMode === 'slow'
                  ? 'bg-sky-600/60 text-sky-200 font-bold border border-sky-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              0.5x
            </button>
            <button
              onClick={() => setSpeedMode('normal')}
              className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-sky-600/60 text-sky-200 font-bold border border-sky-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              1.0x
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-sky-300 font-bold">{currentStepIdx + 1}</span> / {totalSteps}
          </div>
        </div>
      </div>

      {/* 4. MAIN SIMULATION ARENA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <BfsCanvas currentStep={currentStep} currentStepIdx={currentStepIdx} />
        <BfsQueueDistancePanel currentStep={currentStep} />
      </div>

      {/* 5. CS & Software Engineering Computing Use Cases */}
      <BfsUseCases />

      {/* 6. Real Life Scenario */}
      <RealLifeScenario
        topicName="ব্রেডথ-ফার্স্ট সার্চ (BFS)"
        scenarios={[
          {
            title: "১. পানিতে ঢিল মারার পর বৃত্তাকার ঢেউ (Ripples in a Pond)",
            subtitle: "কেন্দ্রবিন্দু থেকে ধাপে ধাপে সমদূরত্বে বিস্তার",
            analogy: "শান্ত পানিতে একটি ঢিল ফেললে ঢেউগুলো সমান দূরত্ব বজায় রেখে বৃত্তাকারে চারপাশে ছড়ায়; ১ম বৃত্তের পর ২য় বৃত্ত, তারপর ৩য় বৃত্ত।",
            whyItFits: "BFS সোর্স নোড থেকে ঠিক একইভাবে Level 0, Level 1, Level 2 হিসেবে সমদূরত্বে সব প্রতিবেশীকে আগে ভিজিট করে।",
            badge: "Concentric Waves",
            accentColor: "sky",
            visualTag: "FIFO Queue"
          },
          {
            title: "২. সোশ্যাল নেটওয়ার্কে পরিচিতির দূরত্ব (Degrees of Separation)",
            subtitle: "LinkedIn 1st, 2nd ও 3rd ডিগ্রি কানেকশন",
            analogy: "আপনার সরাসরি বন্ধুরা 1st Connection (দূরত্ব ১), তাদের বন্ধুরা Mutual Friends বা 2nd Connection (দূরত্ব ২)।",
            whyItFits: "ওজনহীন গ্রাফে বা সামাজিক নেটওয়ার্কে সর্বনিম্ন কয়টি লিংকের মাধ্যমে কারো কাছে পৌঁছানো যায় তা নির্ণয়ে BFS আদর্শ।",
            badge: "Shortest Hops",
            accentColor: "emerald",
            visualTag: "O(V + E)"
          }
        ]}
      />
    </div>
  );
}
