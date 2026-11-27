'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Undo2,
  Compass,
  Flame,
  Clock
} from 'lucide-react';
import { RecursionMode } from './types';
import {
  generateBaseCaseSteps,
  generateBacktrackSteps,
  generateFibTree,
  generateFactNodes
} from './utils/recursionGenerators';
import BaseCaseVisualizer from './components/BaseCaseVisualizer';
import RecursionInspector from './components/RecursionInspector';

const BacktrackingVisualizer = dynamic(() => import('./components/BacktrackingVisualizer'), {
  loading: () => (
    <div className="h-96 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading backtracking visualizer...
    </div>
  )
});
const FibonacciVisualizer = dynamic(() => import('./components/FibonacciVisualizer'), {
  loading: () => (
    <div className="h-96 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading tree visualizer...
    </div>
  )
});

export default function RecursionTopic() {
  const [activeMode, setActiveMode] = useState<RecursionMode>('base_case');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasBaseCase, setHasBaseCase] = useState<boolean>(true);
  const [factN, setFactN] = useState<number>(5);
  const [fibN, setFibN] = useState<number>(4);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulation Generators
  const baseCaseSteps = useMemo(() => generateBaseCaseSteps(factN, hasBaseCase), [factN, hasBaseCase]);
  const backtrackSteps = useMemo(() => generateBacktrackSteps(), []);
  const { nodes: fibTreeNodes, steps: fibSteps } = useMemo(() => generateFibTree(fibN), [fibN]);
  const factNodes = useMemo(() => generateFactNodes(factN, hasBaseCase), [factN, hasBaseCase]);

  // Current active step tracking
  const activeStepsCount =
    activeMode === 'base_case'
      ? baseCaseSteps.length
      : activeMode === 'backtracking'
      ? backtrackSteps.length
      : fibSteps.length;

  const isAtEnd = currentStepIdx >= activeStepsCount - 1;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      const baseDelay = activeMode === 'backtracking' ? 2400 : 2000;
      const intervalMs = speedMode === 'slow' ? baseDelay : Math.floor(baseDelay * 0.65);

      timerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < activeStepsCount - 1) return prev + 1;
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
  }, [isPlaying, activeStepsCount, activeMode, speedMode]);

  const handleModeChange = (mode: RecursionMode) => {
    setIsPlaying(false);
    setActiveMode(mode);
    setCurrentStepIdx(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const currentBaseStep = baseCaseSteps[currentStepIdx] || baseCaseSteps[0];
  const currentBacktrackStep = backtrackSteps[currentStepIdx] || backtrackSteps[0];
  const currentFibStep = fibSteps[currentStepIdx] || fibSteps[0];

  return (
    <div className="flex flex-col gap-6 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-[#2d224d] p-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 font-bold">
              Topic 13 • Core Recursion &amp; Backtracking
            </span>
            <span className="text-xs text-zinc-500 font-mono">Base Case Anchor • Choose &amp; Unchoose • Call Stack</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            রিকার্শন ও ব্যাকট্র্যাকিং: মূল ভিত্তি ও সিমুলেটর
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            রিকার্শনে সবচেয়ে গুরুত্বপূর্ণ দুটি বিষয় হলো: <b>বেস কেস (থামার শর্ত)</b> এবং <b>ব্যাকট্র্যাকিং (ভুল হলে পূর্বাবস্থায় ফেরা)</b>। নিচের ইন্টারঅ্যাক্টিভ সিমুলেটরে ধাপে ধাপে দুটি বিষয় পরিষ্কারভাবে পর্যবেক্ষণ করুন।
          </p>
        </div>
      </div>

      {/* 2. Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#202742] space-y-2">
          <div className="flex items-center gap-2 text-purple-400">
            <RefreshCw className="w-4 h-4" />
            <h3 className="font-bold text-sm text-white">১. রিকার্শন (Recursion)</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            একটি ফাংশন বড় সমস্যাকে একই ধরনের ছোট সাব-প্রবলেমে ভেঙে <b>নিজেকেই বারবার কল করে</b> সমাধান করে।
          </p>
          <div className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2 py-1 rounded-lg border border-purple-800/40">
            fact(n) = n × fact(n - 1)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#202742] space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldAlert className="w-4 h-4" />
            <h3 className="font-bold text-sm text-white">২. বেস কেস (Base Case)</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            রিকার্শন <b>থামার নির্দিষ্ট শর্ত</b>। এটি ছাড়া ফাংশন অনন্তকাল কল হয়ে মেমরিতে <b>Stack Overflow</b> ক্র্যাশ ঘটায়।
          </p>
          <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2 py-1 rounded-lg border border-amber-800/40">
            if (n &lt;= 1) return 1; // STOP
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#202742] space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Undo2 className="w-4 h-4" />
            <h3 className="font-bold text-sm text-white">৩. ব্যাকট্র্যাকিং (Backtracking)</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            সম্ভাব্য পথে এগিয়ে গিয়ে <b>ডেড-এন্ড (বাধা) পেলে এক পা পিছিয়ে এসে (Undo)</b> অন্য বিকল্প পথ খোঁজার কৌশল।
          </p>
          <div className="text-[11px] font-mono text-rose-300 bg-rose-950/40 px-2 py-1 rounded-lg border border-rose-800/40">
            Choose ➔ Explore ➔ Unchoose ↩
          </div>
        </div>
      </div>

      {/* 3. Studio Mode Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#07080f] border border-[#1a1e30]">
          <button
            onClick={() => handleModeChange('base_case')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
              activeMode === 'base_case'
                ? 'bg-amber-600 text-white '
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span>১. বেস কেস ও কল স্ট্যাক</span>
          </button>

          <button
            onClick={() => handleModeChange('backtracking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
              activeMode === 'backtracking'
                ? 'bg-rose-600 text-white '
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-rose-300" />
            <span>২. ব্যাকট্র্যাকিং মেজ সিমুলেটর</span>
          </button>

          <button
            onClick={() => handleModeChange('fibonacci')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
              activeMode === 'fibonacci'
                ? 'bg-purple-600 text-white '
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-purple-300" />
            <span>৩. ফিবোনাচ্চি ট্রি ও ডুপ্লিকেট কল</span>
          </button>
        </div>

        {activeMode === 'base_case' && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#101322] p-0.5 rounded-lg border border-[#1f263d] text-xs font-mono">
              <span className="text-[10px] text-zinc-400 px-1.5 font-sans">ইনপুট:</span>
              {[5, 4, 3].map(n => (
                <button
                  key={n}
                  onClick={() => {
                    setFactN(n);
                    setCurrentStepIdx(0);
                    setIsPlaying(false);
                  }}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer font-bold ${
                    factN === n
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title={`factorial(${n}) সিমুলেশন`}
                >
                  n={n}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setHasBaseCase(!hasBaseCase);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono border transition-colors cursor-pointer ${
                hasBaseCase
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold '
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{hasBaseCase ? 'বেস কেস: সক্রিয় (নিরাপদ)' : 'বেস কেস ছাড়া (ক্র্যাশ ডেমো)'}</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(prev => Math.max(0, prev - 1));
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
                : 'bg-purple-600 hover:bg-purple-500 text-white'
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
                <span>Play Step-by-Step</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(prev => Math.min(activeStepsCount - 1, prev + 1));
            }}
            disabled={isPlaying || isAtEnd}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
            title="এক ধাপ সামনে যান"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
            title="শুরু থেকে দেখুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 bg-[#101322] p-0.5 rounded-lg border border-[#1f263d] text-[10px] font-mono">
            <Clock className="w-3 h-3 text-zinc-400 ml-1" />
            <button
              onClick={() => setSpeedMode('slow')}
              className={`px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                speedMode === 'slow'
                  ? 'bg-purple-600/50 text-purple-200 font-bold border border-purple-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="ধীর গতি (আরামদায়ক পর্যবেক্ষণ)"
            >
              0.5x ধীর
            </button>
            <button
              onClick={() => setSpeedMode('normal')}
              className={`px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-purple-600/50 text-purple-200 font-bold border border-purple-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="স্বাভাবিক গতি"
            >
              1.0x
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-purple-300 font-bold">{currentStepIdx + 1}</span> / {activeStepsCount}
          </div>
        </div>
      </div>

      {/* 4. Main Simulation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Visual Stage */}
        <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 md:p-6 flex flex-col justify-between min-h-[490px] relative overflow-hidden space-y-5">
          {activeMode === 'base_case' && (
            <BaseCaseVisualizer
              currentBaseStep={currentBaseStep}
              factNodes={factNodes}
              hasBaseCase={hasBaseCase}
              factN={factN}
            />
          )}

          {activeMode === 'backtracking' && (
            <BacktrackingVisualizer currentBacktrackStep={currentBacktrackStep} />
          )}

          {activeMode === 'fibonacci' && (
            <FibonacciVisualizer
              fibTreeNodes={fibTreeNodes}
              currentFibStep={currentFibStep}
              fibN={fibN}
              onSelectFibN={n => {
                setFibN(n);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
            />
          )}

          {/* Unified Step Explanation Card */}
          <div className="p-4 rounded-2xl bg-[#0b0e1a] border border-[#1b2238] space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-400">ধাপ {currentStepIdx + 1}:</span>
              <span className="text-white font-bold">
                {activeMode === 'base_case'
                  ? currentBaseStep.title
                  : activeMode === 'backtracking'
                  ? currentBacktrackStep.title
                  : currentFibStep.title}
              </span>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
              {activeMode === 'base_case'
                ? currentBaseStep.desc
                : activeMode === 'backtracking'
                ? currentBacktrackStep.desc
                : currentFibStep.explanation}
            </p>
          </div>
        </div>

        {/* Right Info Column */}
        <RecursionInspector
          activeMode={activeMode}
          currentBaseStep={currentBaseStep}
          currentBacktrackStep={currentBacktrackStep}
          currentFibStep={currentFibStep}
        />
      </div>

      {/* 5. Production Engineering Real-Life Scenarios */}
      <RealLifeScenario
        topicName="রিকার্শন ও ব্যাকট্র্যাকিং (Recursion & Backtracking)"
        scenarios={[
          {
            title: "১. রাশিয়ান পুতুল (Matryoshka Nesting Dolls)",
            subtitle: "পুতুলের ভেতর পুতুল, যতক্ষণ না ক্ষুদ্রতম পুতুলটি আসছে",
            badge: "Base Case & Stack",
            visualTag: "Self-Similarity",
            accentColor: "violet",
            analogy:
              "একটি বড় পুতুল খুললে তার ভেতরে হুবহু একই কিন্তু ছোট পুতুল পাওয়া যায়। ক্ষুদ্রতম নিরেট পুতুলটি আসলে থামা হয় (Base Case)। এরপর ক্রমান্বয়ে বন্ধ করে আগের অবস্থায় ফেরা হয় (Unwinding)।",
            whyItFits: "সমস্যাটি ছোট আকারে পুনরাবৃত্তি করে বেস কেসে পৌঁছে স্ট্যাক আনওয়াইন্ড করে ফিরে আসে।"
          },
          {
            title: "২. গোলকধাঁধা থেকে বের হওয়ার পথ (Maze Pathfinding)",
            subtitle: "দেয়ালে আটকালে এক পা পিছিয়ে এসে অন্য পথে হাঁটা",
            badge: "Backtracking",
            visualTag: "Choose, Explore, Unchoose",
            accentColor: "amber",
            analogy:
              "গোলকধাঁধায় হেঁটে সামনে গিয়ে যদি দেয়াল বা কানাগলি দেখেন, তবে এক পা পিছিয়ে এসে (Backtrack) অন্য গলিতে পা বাড়ান।",
            whyItFits: "সম্ভাব্য পথ যাচাই করা, ভুল হলে পূর্বাবস্থায় ফেরা — এটাই ব্যাকট্র্যাকিং।"
          }
        ]}
      />
    </div>
  );
}
