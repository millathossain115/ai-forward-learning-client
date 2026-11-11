'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Search,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
  Cpu,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sliders,
  Divide
} from 'lucide-react';

const SORTED_ARRAY = [4, 12, 19, 27, 35, 42, 58, 64, 71, 83, 91, 99];

type SearchMode = 'binary' | 'linear' | 'race';

interface BinaryStep {
  low: number;
  mid: number;
  high: number;
  val: number;
  action: 'check' | 'eliminate_left' | 'eliminate_right' | 'found' | 'not_found';
  explanation: string;
}

interface LinearStep {
  currIndex: number;
  val: number;
  action: 'check' | 'mismatch' | 'found' | 'not_found';
  explanation: string;
}

export default function SearchingTopic() {
  const [activeMode, setActiveMode] = useState<SearchMode>('binary');
  const [target, setTarget] = useState<number>(83);

  // Step indices
  const [binaryStepIdx, setBinaryStepIdx] = useState<number>(0);
  const [linearStepIdx, setLinearStepIdx] = useState<number>(0);

  // Auto-play state & timer
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const speedMs = 1200; // Comfortable 1.2s slow readable step interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute Binary Search Steps synchronously via useMemo
  const binarySteps = useMemo<BinaryStep[]>(() => {
    const steps: BinaryStep[] = [];
    let low = 0;
    let high = SORTED_ARRAY.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = SORTED_ARRAY[mid];

      steps.push({
        low,
        mid,
        high,
        val: midVal,
        action: 'check',
        explanation: `ধাপ ${steps.length + 1}: রেঞ্জ [${low}..${high}]। মিডল ইনডেক্স mid = floor((${low} + ${high}) / 2) = ${mid}। Array[${mid}] = ${midVal}-এর সাথে টার্গেট ${target} মেলানো হচ্ছে।`
      });

      if (midVal === target) {
        steps.push({
          low,
          mid,
          high,
          val: midVal,
          action: 'found',
          explanation: `🎯 সফল! ইনডেক্স ${mid}-এ কাঙ্ক্ষিত মান ${target} পাওয়া গেছে। বাইনারি সার্চ সফলভাবে সমাপ্ত!`
        });
        break;
      } else if (midVal < target) {
        steps.push({
          low,
          mid,
          high,
          val: midVal,
          action: 'eliminate_left',
          explanation: `Array[${mid}] (${midVal}) < ${target}। যেহেতু অ্যারে সর্টেড, তাই ${midVal} এবং তার বামের সব মান টার্গেটের চেয়ে ছোট। বামের ৫০% অংশ বাদ দিয়ে low = mid + 1 (${mid + 1}) নির্ধারণ করা হলো।`
        });
        low = mid + 1;
      } else {
        steps.push({
          low,
          mid,
          high,
          val: midVal,
          action: 'eliminate_right',
          explanation: `Array[${mid}] (${midVal}) > ${target}। যেহেতু অ্যারে সর্টেড, তাই ${midVal} এবং তার ডানের সব মান টার্গেটের চেয়ে বড়। ডানের ৫০% অংশ বাদ দিয়ে high = mid - 1 (${mid - 1}) নির্ধারণ করা হলো।`
        });
        high = mid - 1;
      }
    }

    if (low > high) {
      steps.push({
        low,
        mid: -1,
        high,
        val: -1,
        action: 'not_found',
        explanation: `❌ অনুসন্ধান শেষ: টার্গেট ${target} এই অ্যারেতে বিদ্যমান নেই (low > high)।`
      });
    }

    return steps;
  }, [target]);

  // Compute Linear Search Steps synchronously via useMemo
  const linearSteps = useMemo<LinearStep[]>(() => {
    const steps: LinearStep[] = [];
    let found = false;

    for (let i = 0; i < SORTED_ARRAY.length; i++) {
      const val = SORTED_ARRAY[i];
      steps.push({
        currIndex: i,
        val,
        action: val === target ? 'found' : 'check',
        explanation: `ধাপ ${i + 1}: ইনডেক্স ${i} পরীক্ষা করা হচ্ছে। Array[${i}] = ${val}। ${
          val === target ? `🎯 মিলে গেছে! কাঙ্ক্ষিত ${target} পাওয়া গেছে!` : `টার্গেট ${target}-এর সাথে মেলেনি, পরবর্তী ইনডেক্সে যাওয়া হচ্ছে।`
        }`
      });

      if (val === target) {
        found = true;
        break;
      }
    }

    if (!found) {
      steps.push({
        currIndex: SORTED_ARRAY.length,
        val: -1,
        action: 'not_found',
        explanation: `❌ পুরো অ্যারে শেষ পর্যন্ত স্ক্যান করা হয়েছে। টার্গেট ${target} পাওয়া যায়নি।`
      });
    }

    return steps;
  }, [target]);

  const handleTargetChange = (newTarget: number) => {
    setIsPlaying(false);
    setTarget(newTarget);
    setBinaryStepIdx(0);
    setLinearStepIdx(0);
  };

  // Handle active mode change or reset
  const handleModeChange = (mode: SearchMode) => {
    setIsPlaying(false);
    setActiveMode(mode);
    setBinaryStepIdx(0);
    setLinearStepIdx(0);
  };

  // Auto-play timer loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (activeMode === 'binary') {
          setBinaryStepIdx(prev => {
            if (prev < binarySteps.length - 1) return prev + 1;
            setIsPlaying(false);
            return prev;
          });
        } else if (activeMode === 'linear') {
          setLinearStepIdx(prev => {
            if (prev < linearSteps.length - 1) return prev + 1;
            setIsPlaying(false);
            return prev;
          });
        } else {
          // Race Mode: advance both step by step
          setBinaryStepIdx(prevB => {
            const nextB = prevB < binarySteps.length - 1 ? prevB + 1 : prevB;
            return nextB;
          });
          setLinearStepIdx(prevL => {
            const nextL = prevL < linearSteps.length - 1 ? prevL + 1 : prevL;
            return nextL;
          });
        }
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeMode, binarySteps.length, linearSteps.length]);

  // Current active steps for display with safe fallbacks
  const currentBinaryStep = binarySteps[binaryStepIdx] || binarySteps[0] || {
    low: 0,
    mid: 0,
    high: 0,
    val: 0,
    action: 'check',
    explanation: ''
  };
  const currentLinearStep = linearSteps[linearStepIdx] || linearSteps[0] || {
    currIndex: 0,
    val: 0,
    action: 'check',
    explanation: ''
  };

  const isAtEnd =
    activeMode === 'binary'
      ? binaryStepIdx >= binarySteps.length - 1
      : activeMode === 'linear'
      ? linearStepIdx >= linearSteps.length - 1
      : binaryStepIdx >= binarySteps.length - 1 && linearStepIdx >= linearSteps.length - 1;

  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12192a] via-[#0d121f] to-[#070912] border border-[#212c48] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold">
              Topic 12 • Core Search Algorithms
            </span>
            <span className="text-xs text-zinc-500 font-mono">Sequential O(N) vs Divide &amp; Conquer O(log N)</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            সার্চিং অ্যালগরিদম: লিনিয়ার ও বাইনারি সার্চ
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            মেমরিতে সংরক্ষিত ডেটা থেকে কোনো নির্দিষ্ট মান খুঁজে বের করার বিজ্ঞান হলো সার্চিং। 
            আনসর্টেড ডেটায় লিনিয়ার সার্চ প্রতিটি মান একের পর এক স্ক্যান করে, যেখানে সর্টেড ডেটায় বাইনারি সার্চ প্রতি ধাপে অর্ধেক ডেটা বাদ দিয়ে লগারিদমিক গতিতে টার্গেট খুঁজে পায়।
          </p>
        </div>
      </div>

      {/* 2. Clear Conceptual Definition Cards: What is Linear & What is Binary? */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Linear Search */}
        <div className="p-6 rounded-3xl bg-[#0f111a] border border-[#1e2233] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-rose-400">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-white">লিনিয়ার সার্চ (Linear Search)</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300">
              Time: O(N)
            </span>
          </div>

          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            অ্যারের প্রথম উপাদান (ইন্ডেক্স 0) থেকে শুরু করে শেষ পর্যন্ত একের পর এক প্রতিটি ঘরের সাথে কাঙ্ক্ষিত মান মেলানো হয়।
          </p>

          <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-[#1a1f33]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>কোনো শর্ত নেই:</b> ডেটা সাজানো (Sorted) বা এলোমেলো (Unsorted)—যেকোনো ডেটাসেটেই কাজ করে।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>সহজ বাস্তবায়ন:</b> কোনো অতিরিক্ত মেমরি ওভারহেড বা পয়েন্টার হিসাব লাগে না।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold shrink-0">✕</span>
              <span><b>বড় ডেটায় ধীরগতি:</b> ১০ লাখ ডেটা থাকলে মানটি খুঁজে পেতে সর্বোচ্চ ১০ লাখ বারই চেক করতে হতে পারে ($O(N)$)।</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Binary Search */}
        <div className="p-6 rounded-3xl bg-[#0f111a] border border-[#1e2233] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-white">বাইনারি সার্চ (Binary Search)</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300">
              Time: O(log N)
            </span>
          </div>

          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            <b>Divide and Conquer নীতি:</b> প্রতি ধাপে মাঝের উপাদান (Mid) পরীক্ষা করে এবং এক লাফেই বাকি ডেটার অর্ধেক (৫০%) অংশ বাদ দিয়ে দেয়!
          </p>

          <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-[#1a1f33]">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">⚠️</span>
              <span><b>কঠোর পূর্বশর্ত:</b> অ্যারের ডেটা অবশ্যই পূর্বে থেকেই <b>সর্ট করা (Sorted)</b> থাকতে হবে।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>লগারিদমিক সুপারস্পিড:</b> ১০ লাখ ডেটার ভেতর কাঙ্ক্ষিত মান খুঁজে পেতে সর্বোচ্চ মাত্র <b>২০টি ধাপ</b> লাগে ($\log_2 10^6 \approx 20$)!</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><b>৩টি পয়েন্টার:</b> <code>Low</code>, <code>Mid</code>, এবং <code>High</code> পয়েন্টার দিয়ে সার্চ এরিয়া ছোট করা হয়।</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. INTERACTIVE SIMULATION LAB: Dedicated Modes for Linear, Binary & Race */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>ইন্টারঅ্যাক্টিভ সার্চ ল্যাব: আলাদা আলাদা পর্যবেক্ষণ ও রেস</span>
            </h2>
            <p className="text-xs text-zinc-400">
              লিনিয়ার সার্চ এবং বাইনারি সার্চকে আলাদাভাবে ধাপে ধাপে পর্যবেক্ষণ করুন অথবা একসাথে রেস চালিয়ে গতির পার্থক্য দেখুন।
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b14] border border-[#1d2238]">
            <button
              onClick={() => handleModeChange('binary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeMode === 'binary'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
              }`}
            >
              ১. বাইনারি সার্চ (বিশদ)
            </button>
            <button
              onClick={() => handleModeChange('linear')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeMode === 'linear'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
              }`}
            >
              ২. লিনিয়ার সার্চ (ধাপে ধাপে)
            </button>
            <button
              onClick={() => handleModeChange('race')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeMode === 'race'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
              }`}
            >
              ৩. তুলনামূলক রেস (Side-by-Side)
            </button>
          </div>
        </div>

        {/* Target Selection & Quick Preset Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#090b14] p-3.5 rounded-2xl border border-[#1d2238]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-300 font-semibold">টার্গেট সংখ্যা নির্বাচন করুন:</span>
            <select
              value={target}
              onChange={e => handleTargetChange(Number(e.target.value))}
              className="bg-[#121524] border border-[#232a45] text-xs font-mono font-bold text-sky-300 px-3 py-1.5 rounded-xl focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {SORTED_ARRAY.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400">কুইক টেস্ট:</span>
            {[19, 58, 83, 99].map(num => (
              <button
                key={num}
                onClick={() => handleTargetChange(num)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  target === num
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-[#121524] border-[#1f2642] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN VISUAL SIMULATION CANVAS */}
        <div className="bg-[#080911] border border-[#1d2238] rounded-2xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between space-y-6">
          {/* Integrated Playback Controls (Floating Top-Left Overlay) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b1f33]">
            <div className="bg-[#0d101e]/90 backdrop-blur-md border border-[#212742] p-1.5 rounded-xl flex items-center gap-2 shadow-xl">
              {/* Step Back */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  if (activeMode === 'binary') setBinaryStepIdx(prev => Math.max(0, prev - 1));
                  else if (activeMode === 'linear') setLinearStepIdx(prev => Math.max(0, prev - 1));
                  else {
                    setBinaryStepIdx(prev => Math.max(0, prev - 1));
                    setLinearStepIdx(prev => Math.max(0, prev - 1));
                  }
                }}
                disabled={isPlaying || (activeMode === 'binary' ? binaryStepIdx === 0 : activeMode === 'linear' ? linearStepIdx === 0 : binaryStepIdx === 0 && linearStepIdx === 0)}
                className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
                title="এক ধাপ পেছনে যান"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={isAtEnd}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs font-mono transition-all cursor-pointer shadow ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
                } disabled:opacity-30`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Auto-Play (0.5x Slow)</span>
                  </>
                )}
              </button>

              {/* Step Forward */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  if (activeMode === 'binary') setBinaryStepIdx(prev => Math.min(binarySteps.length - 1, prev + 1));
                  else if (activeMode === 'linear') setLinearStepIdx(prev => Math.min(linearSteps.length - 1, prev + 1));
                  else {
                    setBinaryStepIdx(prev => Math.min(binarySteps.length - 1, prev + 1));
                    setLinearStepIdx(prev => Math.min(linearSteps.length - 1, prev + 1));
                  }
                }}
                disabled={isPlaying || isAtEnd}
                className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
                title="এক ধাপ সামনে যান"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              {/* Reset */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setBinaryStepIdx(0);
                  setLinearStepIdx(0);
                }}
                className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
                title="শুরু থেকে দেখুন"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Step Indicator */}
              <div className="text-[11px] font-mono text-zinc-400 px-1 border-l border-[#212742]">
                {activeMode === 'binary' ? (
                  <>ধাপ <span className="text-emerald-400 font-bold">{binaryStepIdx + 1}</span> / {binarySteps.length}</>
                ) : activeMode === 'linear' ? (
                  <>ধাপ <span className="text-rose-400 font-bold">{linearStepIdx + 1}</span> / {linearSteps.length}</>
                ) : (
                  <>বাইনারি: <span className="text-emerald-400 font-bold">{binaryStepIdx + 1}</span> | লিনিয়ার: <span className="text-rose-400 font-bold">{linearStepIdx + 1}</span></>
                )}
              </div>
            </div>

            {/* Pointers Legend */}
            {activeMode === 'binary' && (
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-sky-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-sky-400" /> Low Pointer
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Mid Element
                </span>
                <span className="flex items-center gap-1 text-purple-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> High Pointer
                </span>
              </div>
            )}
          </div>

          {/* VIEW MODE 1: BINARY SEARCH IN-DEPTH VIEW */}
          {activeMode === 'binary' && (
            <div className="space-y-6">
              {/* Formula & Range Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0e1120] border border-[#1d233c] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">বর্তমান রেঞ্জ:</span>
                  <span className="text-sky-300 font-bold">Low = {currentBinaryStep.low}</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-purple-300 font-bold">High = {currentBinaryStep.high}</span>
                </div>
                <div className="text-amber-300 font-bold">
                  mid = floor(({currentBinaryStep.low} + {currentBinaryStep.high}) / 2) = {currentBinaryStep.mid}
                </div>
                <div className="text-zinc-300">
                  Array[{currentBinaryStep.mid}] = <b className="text-white text-sm">{currentBinaryStep.val}</b>
                </div>
              </div>

              {/* Array Cells with Pointer Tags */}
              <div className="space-y-2">
                {/* Top Pointers Line */}
                <div className="grid grid-cols-12 gap-1.5 text-center text-[10px] font-mono font-bold">
                  {SORTED_ARRAY.map((_, i) => {
                    const isLow = currentBinaryStep.low === i;
                    const isMid = currentBinaryStep.mid === i;
                    const isHigh = currentBinaryStep.high === i;
                    return (
                      <div key={i} className="h-5 flex items-center justify-center">
                        {isMid ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shadow">MID</span>
                        ) : isLow ? (
                          <span className="px-1.5 py-0.5 rounded bg-sky-500 text-slate-950">LOW</span>
                        ) : isHigh ? (
                          <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">HIGH</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {/* Array Boxes */}
                <div className="grid grid-cols-12 gap-1.5">
                  {SORTED_ARRAY.map((v, i) => {
                    const isMid = currentBinaryStep.mid === i;
                    const isFound = isMid && currentBinaryStep.action === 'found';
                    const inRange = i >= currentBinaryStep.low && i <= currentBinaryStep.high;

                    return (
                      <div
                        key={i}
                        className={`h-14 rounded-xl border font-mono flex flex-col items-center justify-center transition-all ${
                          isFound
                            ? 'bg-emerald-500 text-slate-950 font-black ring-4 ring-emerald-500/40 scale-105 shadow-xl'
                            : isMid
                            ? 'bg-amber-400 text-slate-950 font-black ring-4 ring-amber-400/30 scale-105 shadow-lg'
                            : inRange
                            ? 'bg-[#13172b] border-[#293354] text-zinc-100 font-bold hover:border-sky-500'
                            : 'bg-[#090b14] border-[#141829] text-zinc-600 opacity-30 line-through'
                        }`}
                      >
                        <span className="text-xs md:text-sm">{v}</span>
                        <span className="text-[9px] opacity-70">[{i}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: LINEAR SEARCH IN-DEPTH VIEW */}
          {activeMode === 'linear' && (
            <div className="space-y-6">
              <div className="p-3 rounded-xl bg-[#0e1120] border border-[#1d233c] font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="text-zinc-400">বর্তমান অবস্থান: </span>
                  <span className="text-rose-400 font-bold">ইন্ডেক্স {currentLinearStep.currIndex}</span>
                </div>
                <div>
                  মান: <b className="text-white text-sm">{currentLinearStep.val}</b>
                </div>
                <div className="text-zinc-400">
                  মোট ধাপ: <b className="text-rose-400">{linearStepIdx + 1}</b>
                </div>
              </div>

              {/* Array Cells with Linear Scanner Pointer */}
              <div className="space-y-2">
                {/* Pointer indicator */}
                <div className="grid grid-cols-12 gap-1.5 text-center text-[10px] font-mono font-bold">
                  {SORTED_ARRAY.map((_, i) => (
                    <div key={i} className="h-5 flex items-center justify-center">
                      {currentLinearStep.currIndex === i && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white shadow">SCAN</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Array Boxes */}
                <div className="grid grid-cols-12 gap-1.5">
                  {SORTED_ARRAY.map((v, i) => {
                    const isCurrent = currentLinearStep.currIndex === i;
                    const isFound = isCurrent && currentLinearStep.action === 'found';
                    const isPassed = i < currentLinearStep.currIndex;

                    return (
                      <div
                        key={i}
                        className={`h-14 rounded-xl border font-mono flex flex-col items-center justify-center transition-all ${
                          isFound
                            ? 'bg-emerald-500 text-slate-950 font-black ring-4 ring-emerald-500/40 scale-105 shadow-xl'
                            : isCurrent
                            ? 'bg-rose-500 text-white font-black ring-4 ring-rose-500/30 scale-105 shadow-lg'
                            : isPassed
                            ? 'bg-[#0b0d18] border-[#181d30] text-zinc-500 opacity-40'
                            : 'bg-[#13172b] border-[#293354] text-zinc-100 font-bold'
                        }`}
                      >
                        <span className="text-xs md:text-sm">{v}</span>
                        <span className="text-[9px] opacity-70">[{i}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: SIDE-BY-SIDE COMPARATIVE RACE */}
          {activeMode === 'race' && (
            <div className="space-y-6">
              {/* Lane 1: Binary Search */}
              <div className="p-4 rounded-xl bg-[#090b14] border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    বাইনারি সার্চ (Binary Search O(log N))
                  </span>
                  <span className="text-zinc-300 font-bold">
                    ধাপ: <span className="text-emerald-400 text-sm">{binaryStepIdx + 1}</span> (বাকি ৫০% এলিমিনেট)
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-1 pt-1">
                  {SORTED_ARRAY.map((v, i) => {
                    const isMid = currentBinaryStep.mid === i;
                    const isFound = isMid && currentBinaryStep.action === 'found';
                    const inRange = i >= currentBinaryStep.low && i <= currentBinaryStep.high;

                    return (
                      <div
                        key={i}
                        className={`h-10 rounded-lg border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                          isFound
                            ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-500'
                            : isMid
                            ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400'
                            : inRange
                            ? 'bg-[#13172b] border-[#293354] text-zinc-200'
                            : 'bg-[#090a10] border-[#151928] text-zinc-700 opacity-20 line-through'
                        }`}
                      >
                        {v}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lane 2: Linear Search */}
              <div className="p-4 rounded-xl bg-[#090b14] border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    লিনিয়ার সার্চ (Linear Search O(N))
                  </span>
                  <span className="text-zinc-300 font-bold">
                    ধাপ: <span className="text-rose-400 text-sm">{linearStepIdx + 1}</span> (১টি করে স্ক্যান)
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-1 pt-1">
                  {SORTED_ARRAY.map((v, i) => {
                    const isCurrent = currentLinearStep.currIndex === i;
                    const isFound = isCurrent && currentLinearStep.action === 'found';
                    const isPassed = i < currentLinearStep.currIndex;

                    return (
                      <div
                        key={i}
                        className={`h-10 rounded-lg border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                          isFound
                            ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-500'
                            : isCurrent
                            ? 'bg-rose-500 text-white ring-2 ring-rose-500'
                            : isPassed
                            ? 'bg-[#090a10] border-[#151928] text-zinc-600 opacity-30'
                            : 'bg-[#13172b] border-[#293354] text-zinc-200'
                        }`}
                      >
                        {v}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Current Step Explanation Box */}
          <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-[#1f2642] flex items-start gap-3">
            <div className="mt-0.5">
              {(activeMode === 'binary' ? currentBinaryStep.action === 'found' : currentLinearStep.action === 'found') ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
              )}
            </div>
            <div className="text-xs text-zinc-200 leading-relaxed font-sans">
              <span className="font-bold text-white block mb-0.5 font-mono">
                {activeMode === 'binary'
                  ? `বাইনারি সার্চ লজিক (${currentBinaryStep.action.toUpperCase()})`
                  : activeMode === 'linear'
                  ? `লিনিয়ার সার্চ লজিক (${currentLinearStep.action.toUpperCase()})`
                  : 'রেস অ্যানালাইসিস'}
              </span>
              <p>
                {activeMode === 'binary'
                  ? currentBinaryStep.explanation
                  : activeMode === 'linear'
                  ? currentLinearStep.explanation
                  : `বাইনারি সার্চ ${binaryStepIdx + 1} ধাপে এবং লিনিয়ার সার্চ ${linearStepIdx + 1} ধাপে অবস্থান করছে। বাইনারি সার্চ প্রতি ধাপে অর্ধেক ডেটা বাদ দিয়ে অনেক দ্রুত লক্ষ্যে পৌঁছায়।`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Efficiency Growth Table: Linear O(N) vs Binary O(log N) */}
      <div className="bg-[#0f111a] border border-[#1e2233] rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <TrendingDown className="w-4 h-4 text-emerald-400" />
          <span>ডেটার পরিমাণ বাড়লে স্টেপ সংখ্যার তুলনামূলক বৃদ্ধি (Growth Comparison)</span>
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
              <tr>
                <th className="p-3.5 font-medium">অ্যারের আকার (N)</th>
                <th className="p-3.5 font-medium text-rose-400">লিনিয়ার সার্চ সর্বোচ্চ ধাপ (N)</th>
                <th className="p-3.5 font-medium text-emerald-400">বাইনারি সার্চ সর্বোচ্চ ধাপ (log₂ N)</th>
                <th className="p-3.5 font-medium font-sans">দক্ষতার পার্থক্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171926] text-zinc-200">
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১০ টি</td>
                <td className="p-3.5 text-rose-400">১০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400">৪ টি ধাপ</td>
                <td className="p-3.5 text-zinc-300 text-xs font-sans">ছোট ডেটায় প্রায় সমান</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১,০০০ টি</td>
                <td className="p-3.5 text-rose-400">১,০০০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400">১০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">১০০ গুণ বেশি দ্রুত!</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১,০০,০০০ টি (১ লাখ)</td>
                <td className="p-3.5 text-rose-400">১,০০,০০০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400">১৭ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">~৬,০০০ গুণ বেশি দ্রুত!</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১০,০০,০০০ টি (১০ লাখ)</td>
                <td className="p-3.5 text-rose-400">১০,০০,০০০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400">২০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">৫০,০০০ গুণ বেশি দ্রুত!</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১,০০,০০,০০,০০০ (১০০ কোটি)</td>
                <td className="p-3.5 text-rose-400">১০০ কোটি ধাপ (CPU ফ্রিজ!)</td>
                <td className="p-3.5 text-emerald-400">মাত্র ৩০ টি ধাপ</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">চোখের পলকে সম্পন্ন!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Real-Life Production Engineering Scenarios */}
      <RealLifeScenario
        topicName="সার্চিংয়ের বাস্তব প্রয়োগ (Real-World Applications)"
        scenarios={[
          {
            title: "১. Git Bisect: ১,০০০ কমিটের মধ্যে বাগ খুঁজে বের করা",
            subtitle: "সফটওয়্যারে বাগ ঢুকিয়ে দেওয়া নির্দিষ্ট কমিট চিহ্নিতকরণ",
            badge: "Binary Search on Git History",
            visualTag: "O(log N) bisect",
            accentColor: "emerald",
            analogy:
              "প্রজেক্টে ১,০০০ কমিট আগে কোড ঠিক ছিল কিন্তু বর্তমানে কোনো একটি কমিটে বাগ তৈরি হয়েছে। প্রতি কমিট ম্যানুয়ালি রান না করে git bisect মাঝের ৫০০তম কমিট টেস্ট করে। বাগ থাকলে আগের ২৫০তম, না থাকলে ৭৫০তম—এভাবে মাত্র ১০টি টেস্টেই মূল কালপ্রিট কমিট বের হয়ে যায়!",
            whyItFits:
              "গিট কমিট হিস্ট্রি কালানুক্রমিকভাবে সর্টেড থাকে, তাই বাইনারি সার্চ এখানে সরাসরি প্রযোজ্য।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">Commit 1 (Good)</span>
                <span>➔ 500 (Bad) ➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">Commit 248 (Bug Found!)</span>
              </div>
            ),
          },
          {
            title: "২. ডেটাবেজ B-Tree ইনডেক্স রেঞ্জ সার্চ",
            subtitle: "SQL WHERE age BETWEEN 25 AND 35 কুয়েরি",
            badge: "Database Indexing",
            visualTag: "Binary Range Scan",
            accentColor: "sky",
            analogy:
              "১০ লাখ ইউজারের টেবিলে বয়স ২৫ থেকে ৩৫-এর ইউজারদের খুঁজতে ডেটাবেজ টেবিলের প্রতিটি সারি লিনিয়ারলি পড়ে না। B-Tree ইনডেক্সে বাইনারি সার্চ চালিয়ে মাত্র ২০টি ধাপে প্রথম ২৫ বছরের সারিতে পৌঁছে যায় এবং দ্রুত ফলাফল দেয়।",
            whyItFits:
              "ইনডেক্সিং মূলত ডিস্কে ডেটাকে সর্টেড অবস্থায় রাখে যাতে লিনিয়ার স্ক্যানের বদলে বাইনারি সার্চ চালানো যায়।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">Root Node</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">Mid Leaf (25)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">O(log N) Range Match</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
