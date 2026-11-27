import React from 'react';
import { Layers, Undo2, ShieldAlert } from 'lucide-react';
import { RecursionMode, BaseCaseStep, BacktrackStep, TreeStep } from '../types';

interface RecursionInspectorProps {
  activeMode: RecursionMode;
  currentBaseStep: BaseCaseStep;
  currentBacktrackStep: BacktrackStep;
  currentFibStep: TreeStep;
}

export default function RecursionInspector({
  activeMode,
  currentBaseStep,
  currentBacktrackStep,
  currentFibStep
}: RecursionInspectorProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4">
      {/* Card 1: Dynamic Call Stack Frame Inspector */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>কল স্ট্যাক ফ্রেম (Active Call Stack)</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
            LIFO
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {activeMode === 'backtracking' ? (
            currentBacktrackStep.callStack.slice().reverse().map((fn, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl border flex items-center justify-between ${
                  idx === 0
                    ? 'bg-rose-950/50 border-rose-400 text-rose-200 font-bold'
                    : 'bg-[#101322] border-[#1c2238] text-zinc-400'
                }`}
              >
                <span>{fn}</span>
                <span className="text-[10px] text-zinc-500">
                  {idx === 0 ? 'Top Frame' : `Depth #${currentBacktrackStep.callStack.length - idx}`}
                </span>
              </div>
            ))
          ) : activeMode === 'base_case' ? (
            currentBaseStep.stack.slice().reverse().map((frame, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl border flex items-center justify-between ${
                  idx === 0
                    ? 'bg-amber-950/50 border-amber-400 text-amber-200 font-bold'
                    : 'bg-[#101322] border-[#1c2238] text-zinc-400'
                }`}
              >
                <span>factorial({frame.n})</span>
                <span className="text-[10px] text-zinc-500">
                  {frame.val !== undefined ? `val: ${frame.val}` : 'Waiting'}
                </span>
              </div>
            ))
          ) : (
            currentFibStep.callStack.slice().reverse().map((item, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl border flex items-center justify-between ${
                  idx === 0
                    ? 'bg-purple-950/50 border-purple-400 text-purple-200 font-bold'
                    : 'bg-[#101322] border-[#1c2238] text-zinc-400'
                }`}
              >
                <span>{item.callType}</span>
                <span className="text-[10px] text-zinc-500">Top</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Card 2: Backtracking Core Mechanism Formula */}
      {activeMode === 'backtracking' ? (
        <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 text-xs">
          <span className="font-mono font-bold text-white flex items-center gap-1.5">
            <Undo2 className="w-3.5 h-3.5 text-rose-400" />
            <span>ব্যাকট্র্যাকিংয়ের ৩টি মূল নিয়ম</span>
          </span>
          <ul className="space-y-2 text-zinc-300 font-sans leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
              <span><b>১. পছন্দ (Choose):</b> সম্ভাব্য একটি পথে পা বাড়ানো (Path Add)।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span><b>২. অনুসন্ধান (Explore):</b> রিকার্শনে আরও ভেতরে যাওয়া।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
              <span><b>৩. বাতিল (Unchoose):</b> ডেড-এন্ড পেলে পদক্ষেপ প্রত্যাহার (Undo) করে অন্য বিকল্প চেষ্টা করা।</span>
            </li>
          </ul>
        </div>
      ) : (
        <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 text-xs">
          <span className="font-mono font-bold text-white flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>বেস কেস কেন বাধ্যতামূলক?</span>
          </span>
          <ul className="space-y-2 text-zinc-300 font-sans leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span><b>অ্যানকর (Anchor):</b> রিকার্সিভ কলের অন্তহীন সিলসিলা থামাতে নির্দিষ্ট শর্ত ($N \le 1$)।</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
              <span><b>স্ট্যাক ওভারফ্লো প্রতিরোধ:</b> বেস কেস ছাড়া কল স্ট্যাক মেমরি উপচে পড়ে প্রোগ্রাম ক্র্যাশ করে।</span>
            </li>
          </ul>
        </div>
      )}

      {/* Card 3: Code Reference Snippet */}
      <div className="bg-[#060810] border border-[#1b2238] rounded-2xl p-3.5 space-y-2 text-xs font-mono">
        <span className="text-zinc-400 text-[11px] block">কোড স্ট্রাকচার:</span>
        <pre className="text-[11px] text-zinc-300 leading-relaxed overflow-x-auto">
{activeMode === 'backtracking'
  ? `function solve(r, c) {
  if (isGoal(r, c)) return true; // Base
  if (isWall(r, c)) return false; // Dead

  path.push([r, c]); // 1. Choose
  if (solve(r, c + 1)) return true; // 2. Explore
  if (solve(r + 1, c)) return true;

  path.pop(); // 3. Unchoose (Backtrack!)
  return false;
}`
  : `function fact(n) {
  if (n <= 1) return 1; // 🛑 Base Case
  return n * fact(n - 1); // ⬇ Recurse
}`}
        </pre>
      </div>
    </div>
  );
}
