'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Layers, Compass } from 'lucide-react';

export default function RamSimulationCanvas() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
        <div className="space-y-1">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ডেটা স্ট্রাকচার বনাম অ্যালগরিদম: এদের ভেতরের মেকানিজম ও পার্থক্য</span>
          </h2>
          <p className="text-xs text-zinc-400">
            মেমরি সেলে ডেটা কীভাবে থাকে এবং অ্যালগরিদম কীভাবে প্রতিটি ধাপে সিদ্ধান্ত নিয়ে গন্তব্যে পৌঁছায় তা নিচে লক্ষ্য করুন।
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
                <span>পজ করুন (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>চালান (Play)</span>
              </>
            )}
          </button>
          <button
            onClick={() => setActiveStep(0)}
            className="p-1.5 rounded-lg bg-[#141829] hover:bg-[#1c223a] border border-[#232a45] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            title="শুরু থেকে দেখুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dual Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual SVG (7 Cols) */}
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

            {/* Data Structure Layer: RAM Memory Architecture */}
            <text x="20" y="24" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              মেমরি লেআউট (Data Structure: RAM Allocation)
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
                <text x={slot.x + 8} y="66" fill="#64748b" fontSize="9" fontFamily="monospace">
                  {slot.label}
                </text>
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

            {/* Algorithm Layer: Traversal & Decision Path */}
            <text x="20" y="150" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              অ্যালগরিদমিক রুট (Algorithm: Traversal &amp; Decision)
            </text>

            <path
              d="M 70,110 C 70,190 170,190 170,110 C 170,190 270,190 270,110 C 270,190 370,190 370,110"
              fill="none"
              stroke="#2a324d"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

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

            <circle
              cx={activeStep === 0 ? 70 : activeStep === 1 ? 170 : activeStep === 2 ? 270 : 370}
              cy="110"
              r="6"
              fill="#f59e0b"
              stroke="#fff"
              strokeWidth="2"
              className="transition-all duration-500 ease-out"
            />

            <rect x="20" y="215" width="500" height="45" rx="8" fill="#101424" stroke="#1f2640" />
            <circle
              cx="38"
              cy="237"
              r="4"
              fill={activeStep === 3 ? '#10b981' : '#f59e0b'}
              className="animate-pulse"
            />
            <text x="52" y="241" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
              {activeStep === 0 && 'ধাপ ১: মেমরির শুরুতে (0x100) সার্চ অপারেশন শুরু হয়েছে।'}
              {activeStep === 1 && 'ধাপ ২: শর্ত চেক: কাঙ্ক্ষিত মান পাওয়া যায়নি, পরবর্তী মেমরি অ্যাড্রেসে জাম্প।'}
              {activeStep === 2 && 'ধাপ ৩: পয়েন্টার ধরে মেমরি সেল ভ্যালিডেশন চলমান।'}
              {activeStep === 3 && 'ধাপ ৪: কাঙ্ক্ষিত Target D খুঁজে পাওয়া গেছে! সফলভাবে সম্পন্ন।'}
            </text>
          </svg>

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

        {/* Explanations (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
            <div className="flex items-center gap-2 text-sky-400">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                ১. ডেটা স্ট্রাকচার (Data Structure)
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">মেমরিতে ডেটা রাখার নিয়ম ও বিন্যাস</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              কম্পিউটারের RAM-এ ডেটা কীভাবে সংরক্ষিত থাকবে তা ডেটা স্ট্রাকচার নির্ধারণ করে। 
              যেমন: <b>Array</b> একটানা মেমরি ব্লকে ডেটা রাখে, ফলে ইনডেক্স ধরে দ্রুত পড়া যায়; আবার <b>Linked List</b> ভিন্ন ভিন্ন মেমরি ব্লকে নোড রেখে পয়েন্টার দিয়ে যুক্ত করে।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#111425] border border-[#212742] space-y-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Compass className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                ২. অ্যালগরিদম (Algorithm)
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">সমস্যা সমাধানের সুনির্দিষ্ট ধাপ ও লজিক</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              সংরক্ষিত ডেটার ওপর কীভাবে কাজ করা হবে তা অ্যালগরিদম ঠিক করে। 
              কীভাবে সবচেয়ে কম সময়ে ডেটা সার্চ করবেন, সর্ট করবেন বা কোন পথে গেলে সর্বনিম্ন মেমরি খরচে সমাধান পাওয়া যাবে—এটিই অ্যালগরিদমের কাজ।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
