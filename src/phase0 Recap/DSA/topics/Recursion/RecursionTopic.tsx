'use client';

import RealLifeScenario from '@/components/RealLifeScenario';

import React, { useState } from 'react';
import {
  Boxes,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowDown,
  ArrowUp,
  Cpu,
  FileCode2
} from 'lucide-react';

interface CallFrame {
  n: number;
  phase: 'calling' | 'base_case' | 'returning';
  returnedValue?: number;
}

export default function RecursionTopic() {
  const [targetN, setTargetN] = useState<number>(4);
  const [frames, setFrames] = useState<CallFrame[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState('Select an integer N to simulate recursive call stack winding and unwinding.');

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const runFactorial = async () => {
    setIsRunning(true);
    setResult(null);
    setFrames([]);
    setMessage(`Invoking factorial(${targetN}). Watch stack frames wind down to base case...`);

    // 1. Winding down phase
    const stack: CallFrame[] = [];
    for (let i = targetN; i >= 1; i--) {
      const isBase = i === 1;
      stack.unshift({ n: i, phase: isBase ? 'base_case' : 'calling' });
      setFrames([...stack]);
      await sleep(400);
    }

    setMessage('Base case reached: factorial(1) returns 1! Now unwinding call stack upwards...');
    await sleep(500);

    // 2. Unwinding & returning phase
    let currentVal = 1;
    for (let i = 0; i < stack.length; i++) {
      const frame = stack[i];
      currentVal = currentVal * frame.n;
      stack[i] = { ...frame, phase: 'returning', returnedValue: currentVal };
      setFrames([...stack]);
      await sleep(500);
    }

    setResult(currentVal);
    setIsRunning(false);
    setMessage(`🎉 Recursion Complete! factorial(${targetN}) = ${currentVal}. All activation frames successfully popped.`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-500/20">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100">Recursion: Base Case &amp; Call Stack Unwinding</h2>
            <span className="text-[11px] font-mono text-purple-400">Self-Referential Functions • Memory Activation Frames</span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          Recursion solves problems by dividing them into smaller instances of the same problem.
          Every recursive function <b>must have a Base Case</b> to stop infinite recursion; otherwise,
          the function allocates activation frames until triggering a fatal <b>Stack Overflow</b>.
        </p>
      </div>

      {/* Real-Life Scenarios */}
            <RealLifeScenario
        topicName="রিকার্শন ও ব্যাকট্র্যাকিং (Recursion and Backtracking)"
        scenarios={[
          {
            title: "১. রাশিয়ান পুতুল (Russian Matryoshka Nesting Dolls)",
            subtitle: "পুতুলের ভেতর পুতুল, যতক্ষণ না ক্ষুদ্রতম পুতুলটি আসছে",
            badge: "Base Case and Call Stack",
            visualTag: "Self-Similarity",
            accentColor: "violet",
            analogy:
              "একটি বড় পুতুল খুললে তার ভেতরে হুবহু একই রকম কিন্তু একটু ছোট পুতুল পাওয়া যায়। এভাবে খুলতে খুলতে সবচেয়ে ক্ষুদ্রতম নিরেট পুতুলটি আসলে থামা হয় (Base Case)। এরপর এক এক করে বন্ধ করে আগের অবস্থায় ফিরে আসা হয় (Call Stack Unwinding)।",
            whyItFits:
              "সমস্যাটি নিজেকেই ছোট আকারে পুনরাবৃত্তি করে, এবং নির্দিষ্ট বেস কেসে পৌঁছে কাজ শেষ করে ব্যাকট্র্যাক করে ফিরে আসে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800">Doll(3)</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800">Doll(2)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-purple-500 text-slate-950 font-bold">Doll(1) [Base]</span>
                <span>↩ Return</span>
              </div>
            ),
          },
          {
            title: "২. গোলকধাঁধা থেকে বের হওয়ার পথ খোঁজা (Maze Navigation)",
            subtitle: "দেয়ালে আটকালে এক পা পিছিয়ে এসে অন্য পথে হাঁটা",
            badge: "Backtracking",
            visualTag: "Try, Fail and Revert",
            accentColor: "amber",
            analogy:
              "আপনি গোলকধাঁধায় হেঁটে সামনে গেলেন, যদি দেখেন কানাগলি বা দেয়াল, তবে এক পা পিছিয়ে এসে (Backtrack) অন্য গলিতে পা বাড়ান।",
            whyItFits:
              "সম্ভাব্য সব পথ পরখ করে দেখা, ভুল হলে পূর্বাবস্থায় ফেরা — এটাই ব্যাকট্র্যাকিং অ্যালগরিদম।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800">সামনে গেলাম</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300">দেয়াল 🛑</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">পিছিয়ে অন্য মোড়ে ↩</span>
              </div>
            ),
          },
        ]}
      />

      {/* 2. Interactive Call Stack Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#090a10] px-2.5 py-1 rounded-lg border border-[#1a1c29]">
              <span className="text-[11px] font-mono text-zinc-400">Compute Factorial(N):</span>
              <input
                type="number"
                min={1}
                max={6}
                value={targetN}
                onChange={e => setTargetN(Math.min(6, Math.max(1, Number(e.target.value))))}
                disabled={isRunning}
                className="w-12 bg-[#141624] text-purple-300 text-xs px-2 py-0.5 rounded border border-[#23273d] text-center font-mono"
              />
            </div>

            <button
              onClick={runFactorial}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 font-semibold text-xs text-white shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Run Recursion
            </button>
          </div>

          {result !== null && (
            <div className="text-xs font-mono text-purple-300 font-bold">
              Result: {targetN}! = {result}
            </div>
          )}
        </div>

        {/* Visual Stack Frames Display */}
        <div className="min-h-[220px] bg-[#090a10] rounded-xl border border-[#1a1d2e] p-6 flex flex-col items-center justify-center gap-2">
          {frames.length === 0 ? (
            <div className="text-xs font-mono text-zinc-600">
              Stack is idle. Click &quot;Run Recursion&quot; to observe the stack frames.
            </div>
          ) : (
            frames.map((frame, idx) => (
              <div
                key={idx}
                className={`w-full max-w-md p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition-all animate-in zoom-in-95 ${
                  frame.phase === 'base_case'
                    ? 'bg-amber-950/60 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
                    : frame.phase === 'returning'
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200'
                    : 'bg-[#151829] border-[#292f4c] text-purple-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold">factorial({frame.n})</span>
                  {frame.phase === 'base_case' && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      BASE CASE (n=1)
                    </span>
                  )}
                </div>

                <div className="text-[11px]">
                  {frame.returnedValue !== undefined ? (
                    <span className="text-emerald-300 font-bold">Returns {frame.returnedValue}</span>
                  ) : (
                    <span className="text-zinc-500">Waiting for child return...</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Live Feedback Banner */}
        <div className="p-3.5 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-purple-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <FileCode2 className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs font-bold text-zinc-200">1. Deeply Nested JSON Parsing</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Parsing recursive trees like arbitrary JSON objects, Markdown documents, or folder directories requires recursive depth descent.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Zap className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-bold text-zinc-200">2. Divide &amp; Conquer Algorithms</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Merge Sort, Quick Sort, and Fast Fourier Transforms (FFT) all rely on recursion to break problems in half until simple base cases.
          </p>
        </div>
      </div>
    </div>
  );
}
