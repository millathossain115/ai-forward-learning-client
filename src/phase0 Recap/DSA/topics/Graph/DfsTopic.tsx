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
  Layers,
  Network
} from 'lucide-react';
import { DfsStep } from './dfsTypes';
import { generateDfsTopicSteps } from './utils/dfsAlgorithm';
import DfsCanvas from './components/DfsCanvas';
import DfsStackPanel from './components/DfsStackPanel';
import DfsUseCases from './components/DfsUseCases';

export default function DfsTopic() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Precompute deterministic DFS simulation steps starting from A
  const steps = useMemo<DfsStep[]>(() => generateDfsTopicSteps('A'), []);

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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162d] via-[#0d1021] to-[#070812] border border-[#232948] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 font-bold">
              Topic 11.1 • Graph Traversal
            </span>
            <span className="text-xs text-zinc-500 font-mono">Depth First Search • Recursion &amp; Call Stack</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            ডেপথ-ফার্স্ট সার্চ: DFS ট্রাভার্সাল, রিকার্শন ও ব্যাকট্র্যাকিং
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            DFS একটি <b>রিকার্সন-ভিত্তিক (Recursion-based)</b> সার্চ মেথড যা LIFO কল স্ট্যাক ব্যবহার করে। এটি সোর্স নোড থেকে শুরু করে একটি শাখা ধরে যতদূর সম্ভব <b>গভীরে (Deepest leaf/Dead-end)</b> পৌঁছায়। সামনে এগোনোর পথ শেষ হলে <b>ব্যাকট্র্যাক (Backtrack)</b> করে পূর্ববর্তী নোডে ফিরে বিকল্প শাখা অনুসন্ধান করে।
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">মেমরি স্ট্রাকচার (Data Structure)</span>
          <div className="text-base font-bold text-indigo-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>LIFO Call Stack</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            রিকার্শন বা এক্সপ্লিসিট স্ট্যাক দিয়ে শেষ প্রবেশকারী শাখা আগে প্রসেস হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">টাইম ও স্পেস জটিলতা (Complexity)</span>
          <div className="text-base font-bold text-emerald-400">
            Time: O(V + E) • Space: O(V)
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            প্রতিটি শীর্ষবিন্দু (V) ও ধার (E) ঠিক একবার করে স্ক্যান করা হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">ব্যবহার ক্ষেত্র (Use Cases)</span>
          <div className="text-base font-bold text-amber-300">
            সাইকেল সন্ধান, টপোলজিক্যাল সর্ট
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            Maze সলভার, কম্পোনেন্ট কানেক্টিভিটি এবং ডেডলক ডিটেকশন।
          </p>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-400" />
            <span>DFS গ্রাফ অ্যানিমেশন</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
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
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
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
                <span>Play DFS</span>
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
                  ? 'bg-indigo-600/60 text-indigo-200 font-bold border border-indigo-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              0.5x
            </button>
            <button
              onClick={() => setSpeedMode('normal')}
              className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-indigo-600/60 text-indigo-200 font-bold border border-indigo-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              1.0x
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-indigo-300 font-bold">{currentStepIdx + 1}</span> / {totalSteps}
          </div>
        </div>
      </div>

      {/* 4. MAIN SIMULATION ARENA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <DfsCanvas currentStep={currentStep} currentStepIdx={currentStepIdx} />
        <DfsStackPanel currentStep={currentStep} />
      </div>

      {/* 5. CS & Software Engineering Computing Use Cases */}
      <DfsUseCases />

      {/* 6. Real Life Scenario */}
      <RealLifeScenario
        topicName="ডেপথ-ফার্স্ট সার্চ (DFS)"
        scenarios={[
          {
            title: "১. ভুলভুলাইয়া বা গোলকধাঁধা অনুসন্ধান (Maze Exploration)",
            subtitle: "সুতো হাতে নিয়ে শেষ সীমানা পর্যন্ত হেঁটে যাওয়া",
            analogy: "একটি অন্ধকার গোলকধাঁধায় আপনি সুতোর রশি ধরে একমুখী সোজা হেঁটে শেষ সীমা পর্যন্ত গেলেন। ডেড-এন্ড পেলে সুতো ধরে এক পা পিছিয়ে এসে অন্য শাখা পরখ করলেন।",
            whyItFits: "DFS ঠিক এভাবেই LIFO কল স্ট্যাক ব্যবহার করে গভীরতম ডেড-এন্ড পর্যন্ত চলে যায় এবং ব্যাকট্র্যাক করে ফিরে আসে।",
            badge: "Backtracking",
            accentColor: "indigo",
            visualTag: "LIFO Stack"
          },
          {
            title: "২. ডিপেনডেন্সি ট্রি ও ফাইল ডিরেক্টরি ক্রলার (Folder Crawler)",
            subtitle: "সাব-ফোল্ডারের গভীরে নেমে ফাইল স্ক্যান",
            analogy: "কম্পিউটারের কোনো ফোল্ডারের ভেতরে নেস্টেড সাব-ফোল্ডার থাকলে আগে একদম ভেতরের ফাইলগুলো প্রসেস করে তবেই উপরের স্তরে ফেরা হয়।",
            whyItFits: "সার্চ ইঞ্জিন ক্রলার বা লিনাক্স find কমান্ড DFS অ্যালগরিদম দিয়ে মেমরি বাঁচিয়ে ট্রি ট্রাভার্স করে।",
            badge: "Deep Hierarchy",
            accentColor: "violet",
            visualTag: "O(V + E)"
          }
        ]}
      />
    </div>
  );
}
