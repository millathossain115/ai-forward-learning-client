'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Boxes,
  PlusCircle,
  ArrowUp,
  RotateCcw,
  Sparkles,
  Binary,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react';
import {
  FocusedNodes,
  INITIAL_MAX_HEAP,
  INITIAL_MIN_HEAP,
  PRESET_INPUTS,
  MAX_HEAP_SIZE,
} from './types';
import HeapTreeCanvas from './components/HeapTreeCanvas';
import HeapArrayView from './components/HeapArrayView';

const HeapApplications = dynamic(() => import('./components/HeapApplications'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading heap applications...
    </div>
  )
});

export default function HeapTopic() {
  const [isMaxHeap, setIsMaxHeap] = useState<boolean>(true);
  const [heap, setHeap] = useState<number[]>(INITIAL_MAX_HEAP);
  const [inputVal, setInputVal] = useState<number>(88);
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [message, setMessage] = useState('Max-Heap প্রস্তুত। ধাপে ধাপে Sift-Up ও Sift-Down অ্যানিমেশন দেখতে বাটন চাপুন।');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeStepText, setActiveStepText] = useState<string>('অপেক্ষমাণ');

  // Specific node highlights
  const [focusedNodes, setFocusedNodes] = useState<FocusedNodes>({});

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Switch between Max-Heap and Min-Heap
  const handleModeSwitch = (maxMode: boolean) => {
    if (isAnimating) return;
    setIsMaxHeap(maxMode);
    setFocusedNodes({});
    setActiveStepText('মোড পরিবর্তন');
    if (maxMode) {
      setHeap([...INITIAL_MAX_HEAP]);
      setMessage('Max-Heap সক্রিয়: রুটে সবসময় সর্বোচ্চ মান (Maximum) সংরক্ষিত থাকবে।');
    } else {
      setHeap([...INITIAL_MIN_HEAP]);
      setMessage('Min-Heap সক্রিয়: রুটে সবসময় সর্বনিম্ন মান (Minimum) সংরক্ষিত থাকবে।');
    }
  };

  // DELIBERATE STEP-BY-STEP INSERT & SIFT-UP
  const handleInsert = async () => {
    if (isAnimating) return;
    if (heap.length >= MAX_HEAP_SIZE) {
      setMessage(`⚠️ ট্রির উচ্চতা সীমা পূর্ণ (৪টি স্তর / ১৫টি নোড)। নতুন নোড যোগ করতে প্রথমে Extract করুন।`);
      return;
    }

    setIsAnimating(true);
    const val = inputVal;
    const workingHeap = [...heap, val];
    let curr = workingHeap.length - 1;

    // Advance preset input for next click
    const nextP = (presetIdx + 1) % PRESET_INPUTS.length;
    setPresetIdx(nextP);
    setInputVal(PRESET_INPUTS[nextP]);

    // Step 1: Insert at the very end of complete binary tree
    setHeap([...workingHeap]);
    setActiveStepText('ধাপ ১: নতুন লিফ যোগ');
    setFocusedNodes({ child: curr, type: 'compare' });
    setMessage(`ধাপ ১: নতুন মান [${val}] ট্রির একদম শেষে ইনডেক্স [${curr}]-এ যুক্ত হলো।`);
    await delay(1400);

    // Step 2: Sift-up (Bubble-up) step by step with clear focus
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      const childVal = workingHeap[curr];
      const parentVal = workingHeap[parent];
      const shouldSwap = isMaxHeap ? childVal > parentVal : childVal < parentVal;

      setActiveStepText(`ধাপ ২: প্যারেন্ট [${parentVal}] বনাম চাইল্ড [${childVal}]`);
      setFocusedNodes({ child: curr, parent, type: 'compare' });

      setMessage(
        `তুলনা: চাইল্ড [${childVal}] কি প্যারেন্ট [${parentVal}]-এর চেয়ে ${isMaxHeap ? 'বড়' : 'ছোট'}? ${
          shouldSwap
            ? `হ্যাঁ (${childVal} ${isMaxHeap ? '>' : '<'} ${parentVal})! হিপের শর্ত মানতে সোয়াপ (Swap) হচ্ছে...`
            : `না (${childVal} ${isMaxHeap ? '<=' : '>='} ${parentVal})। সঠিক অবস্থানে আছে, আর সোয়াপ লাগবে না।`
        }`
      );
      await delay(1600);

      if (shouldSwap) {
        // Animate swap between ONLY these 2 nodes
        setActiveStepText(`ধাপ ৩: স্থান বদল (Swap [${childVal}] ⇄ [${parentVal}])`);
        setFocusedNodes({ child: curr, parent, type: 'swap' });
        await delay(600);

        const tmp = workingHeap[curr];
        workingHeap[curr] = workingHeap[parent];
        workingHeap[parent] = tmp;
        setHeap([...workingHeap]);

        setMessage(`স্থান বদল সম্পন্ন! [${val}] এখন ওপরে ইনডেক্স [${parent}]-এ উঠেছে।`);
        await delay(1400);

        curr = parent;
        setFocusedNodes({ child: curr, type: 'compare' });
      } else {
        break;
      }
    }

    // Sift-up Complete
    setActiveStepText('সম্পন্ন: সঠিক স্তরে স্থিত');
    setFocusedNodes({ child: curr, type: 'settled' });
    setMessage(`সফল! উপাদান [${val}] তার সঠিক স্তরে সুরক্ষিত হয়েছে। O(log N) সময়ে ইনসার্ট সমাপ্ত।`);
    await delay(1200);

    setFocusedNodes({});
    setActiveStepText('প্রস্তুত');
    setIsAnimating(false);
  };

  // DELIBERATE STEP-BY-STEP EXTRACT TOP PRIORITY & SIFT-DOWN
  const handleExtract = async () => {
    if (isAnimating) return;
    if (heap.length === 0) {
      setMessage('⚠️ হিপ খালি! এক্সট্র্যাক্ট করার মতো কোনো উপাদান নেই।');
      return;
    }

    setIsAnimating(true);
    const rootVal = heap[0];

    // Case: Sole node
    if (heap.length === 1) {
      setActiveStepText('একক রুট নিষ্কাশন');
      setFocusedNodes({ extract: 0, type: 'extract' });
      setMessage(`একমাত্র রুট উপাদান [${rootVal}] নিষ্কাশন করা হলো।`);
      await delay(1200);
      setHeap([]);
      setFocusedNodes({});
      setActiveStepText('প্রস্তুত');
      setIsAnimating(false);
      return;
    }

    // Step 1: Highlight extraction of root
    setActiveStepText(`ধাপ ১: রুট [${rootVal}] নিষ্কাশন`);
    setFocusedNodes({ extract: 0, type: 'extract' });
    setMessage(`ধাপ ১: রুট থেকে শীর্ষ উপাদান [${rootVal}] নিষ্কাশন করা হচ্ছে (O(1) Pop)... বাকি নোডগুলো দেখুন এখনও অপরিবর্তিত।`);
    await delay(1600);

    // Step 2: Move last leaf element to root
    const workingHeap = [...heap];
    const lastLeaf = workingHeap.pop()!;
    workingHeap[0] = lastLeaf;

    setHeap([...workingHeap]);
    setActiveStepText(`ধাপ ২: শেষ লিফ [${lastLeaf}] রুটে প্রতিস্থাপন`);
    setFocusedNodes({ child: 0, type: 'swap' });
    setMessage(`ধাপ ২: ট্রির শেষ উপাদান [${lastLeaf}]-কে রুটে এনে খালি স্থান পূরণ করা হলো। এখন ধাপে ধাপে নিচে নামানো (Sift-Down) হবে...`);
    await delay(1600);

    // Step 3: Sift-down step by step
    let curr = 0;
    while (true) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let target = curr;

      // Highlight parent and its children
      setActiveStepText(`ধাপ ৩: প্যারেন্ট [${workingHeap[curr]}] বনাম চাইল্ড তুলনা`);
      setFocusedNodes({ parent: curr, child: left < workingHeap.length ? left : undefined, type: 'compare' });

      if (left < workingHeap.length) {
        const swapLeft = isMaxHeap ? workingHeap[left] > workingHeap[target] : workingHeap[left] < workingHeap[target];
        if (swapLeft) target = left;
      }
      if (right < workingHeap.length) {
        const swapRight = isMaxHeap ? workingHeap[right] > workingHeap[target] : workingHeap[right] < workingHeap[target];
        if (swapRight) target = right;
      }

      const parentVal = workingHeap[curr];
      if (target !== curr) {
        const targetVal = workingHeap[target];
        setMessage(
          `তুলনা: প্যারেন্ট [${parentVal}]-এর চেয়ে চাইল্ড [${targetVal}] ${isMaxHeap ? 'বড়' : 'ছোট'}। সুতরাং এদের মধ্যে সোয়াপ হবে...`
        );
        await delay(1600);

        setActiveStepText(`ধাপ ৪: নিচে নামছে (Swap [${parentVal}] ⇄ [${targetVal}])`);
        setFocusedNodes({ parent: curr, child: target, type: 'swap' });
        await delay(600);

        const tmp = workingHeap[curr];
        workingHeap[curr] = workingHeap[target];
        workingHeap[target] = tmp;
        setHeap([...workingHeap]);

        setMessage(`সোয়াপ সম্পন্ন! [${parentVal}] নিচে ইনডেক্স [${target}]-এ নেমে গেল।`);
        await delay(1400);

        curr = target;
      } else {
        setMessage(`হিপ প্রপার্টি নিশ্চিত হলো: প্যারেন্ট [${parentVal}] তার নিচের চাইল্ডদের চেয়ে ${isMaxHeap ? 'বড়' : 'ছোট'}। সিফট-ডাউন শেষ!`);
        await delay(1200);
        break;
      }
    }

    setActiveStepText('সম্পন্ন: হিপ ব্যালেন্সড');
    setFocusedNodes({ child: curr, type: 'settled' });
    setMessage(`সফল! শীর্ষ উপাদান [${rootVal}] বের করে O(log N) সময়ে ট্রির ব্যালেন্স ঠিক করা হলো।`);
    await delay(1200);

    setFocusedNodes({});
    setActiveStepText('প্রস্তুত');
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header & Definition Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4 shadow-black/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#15171e] text-slate-950 flex items-center justify-center font-bold">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              Priority Queue &amp; Binary Heap (বাইনারি হিপ)
            </h2>
            <span className="text-[11px] font-mono text-amber-400">
              Complete Binary Tree • O(1) Top Priority Access • O(log N) Reshape
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          <b>হিপ (Heap)</b> হলো একটি বিশেষ <b>কমপ্লিট বাইনারি ট্রি</b>, যেখানে সবসময় সর্বোচ্চ জরুরি উপাদানটি <b>রুট নোড [0]-এ O(1) সময়ে</b> পাওয়া যায়। নতুন ডেটা ইনসার্ট বা এক্সট্র্যাক্ট করলে ট্রি ধাপে ধাপে সোয়াপ হয়ে মাত্র <b>O(log N)</b> সময়ে ব্যালেন্সড হয়।
        </p>

        {/* 3 Structured Explanatory Mini-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#0a0b12] border border-[#1f2336] p-3.5 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
              <Binary className="w-3.5 h-3.5 text-cyan-400" />
              <span>১. কমপ্লিট বাইনারি ট্রি</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              ট্রির স্তরগুলো বাম থেকে ডানে পূর্ণ থাকে। কোনো পয়েন্টার ছাড়াই সরাসরি মেমরির সাধারণ ১-ডি অ্যারেতে ম্যাপ করা যায়।
            </p>
          </div>

          <div className="bg-[#0a0b12] border border-amber-500/30 p-3.5 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>২. Max-Heap (ম্যাক্স-হিপ)</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Parent ≥ Child
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              প্যারেন্ট সবসময় চাইল্ডের চেয়ে বড়। ফলে <b>রুট নোড [0]-এ সবসময় সর্বোচ্চ সংখ্যাটি (Max)</b> সুরক্ষিত থাকে।
            </p>
          </div>

          <div className="bg-[#0a0b12] border border-orange-500/30 p-3.5 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-300">
                <TrendingDown className="w-3.5 h-3.5 text-orange-400" />
                <span>৩. Min-Heap (মিন-হিপ)</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-300 border border-orange-500/30">
                Parent ≤ Child
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              প্যারেন্ট সবসময় চাইল্ডের চেয়ে ছোট। ফলে <b>রুট নোড [0]-এ সবসময় সর্বনিম্ন সংখ্যাটি (Min)</b> সুরক্ষিত থাকে।
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Simulator with Focused Step-by-Step Animation */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Toggle: Max-Heap vs Min-Heap */}
            <div className="flex items-center gap-1 bg-[#090a10] p-1 rounded-lg border border-[#1e2235]">
              <button
                onClick={() => handleModeSwitch(true)}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-colors ${
                  isMaxHeap
                    ? 'bg-amber-400 text-slate-950  '
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Max-Heap (সর্বোচ্চ উপরে)
              </button>
              <button
                onClick={() => handleModeSwitch(false)}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-colors ${
                  !isMaxHeap
                    ? 'bg-orange-500 text-slate-950  shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Min-Heap (সর্বনিম্ন উপরে)
              </button>
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-1.5 bg-[#090a10] px-2.5 py-1 rounded-lg border border-[#1a1c29]">
              <span className="text-[11px] font-mono text-zinc-400">মান:</span>
              <input
                type="number"
                value={inputVal}
                onChange={e => setInputVal(Number(e.target.value))}
                className="w-16 bg-[#141624] text-amber-300 text-xs px-2 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Actions: Insert & Extract (Capacity: Up to 15 nodes!) */}
            <button
              onClick={handleInsert}
              disabled={isAnimating || heap.length >= MAX_HEAP_SIZE}
              className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors disabled:opacity-40"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Insert &amp; Sift-Up O(log N)
            </button>

            <button
              onClick={handleExtract}
              disabled={isAnimating || heap.length === 0}
              className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold transition-colors disabled:opacity-40"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Extract Root O(1)➔O(log N)
            </button>
          </div>

          <button
            onClick={() => handleModeSwitch(isMaxHeap)}
            disabled={isAnimating}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-300 border border-[#292c42]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> রিসেট
          </button>
        </div>

        {/* Step Progress Tracker Pill */}
        <div className="flex items-center justify-between bg-[#10121d] px-4 py-2 rounded-xl border border-[#1e2235] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">বর্তমান অবস্থা:</span>
            <span className="font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              {isAnimating && <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />}
              {activeStepText}
            </span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {isAnimating ? 'ধাপে ধাপে ফোকাসড অ্যানিমেশন চলমান...' : 'পরবর্তী ক্লিকের জন্য প্রস্তুত'}
          </div>
        </div>

        {/* Tree Representation Visualizer */}
        <HeapTreeCanvas
          heap={heap}
          isMaxHeap={isMaxHeap}
          focusedNodes={focusedNodes}
          isAnimating={isAnimating}
          maxHeapSize={MAX_HEAP_SIZE}
        />

        {/* Backing 1D Array Storage View (15 Slots) */}
        <HeapArrayView
          heap={heap}
          maxHeapSize={MAX_HEAP_SIZE}
          focusedNodes={focusedNodes}
          isAnimating={isAnimating}
        />

        {/* Live Step-by-Step Feedback Banner */}
        <div className="p-3.5 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="প্রায়োরিটি কিউ ও বাইনারি হিপ (Priority Queue & Heap)"
        scenarios={[
          {
            title: "১. হাসপাতালের জরুরি বিভাগ বা ট্রায়াজ (ER Emergency Triage)",
            subtitle: "আগে আসার চেয়ে রোগের তীব্রতাই এখানে প্রধান নিয়ম",
            badge: "Priority Invariant",
            visualTag: "Min/Max Priority Root",
            accentColor: "rose",
            analogy:
              "হাসপাতালের এমার্জেন্সিতে একজন রোগী ২ ঘণ্টা আগে হাত কেটে বসে আছেন, আর এইমাত্র একজন রোগী আশঙ্কাজনক হার্ট অ্যাটাক নিয়ে ঢুকলেন। চিকিৎসক কখনোই 'আগে আসলে আগে পাবেন' নিয়ম মানবেন না। হার্ট অ্যাটাকের রোগী সাথে সাথে রুট পজিশনে চলে যাবেন এবং আগে চিকিৎসা পাবেন (O(1) Extract-Max)!",
            whyItFits:
              "বাইনারি হিপের রুট নোডে সবসময় সর্বোচ্চ প্রায়োরিটির আইটেমটি থাকে। নতুন ক্রিটিক্যাল রোগী ঢুকলে তাকে সিফট-আপ করে সবার ওপরে তুলে দেওয়া হয়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-1 rounded bg-rose-500 text-slate-950 font-bold border border-rose-400">রুট: হার্ট অ্যাটাক (Severity 99)</span>
                <span>&gt;</span>
                <span className="px-2 py-1 rounded bg-amber-950/80 border border-amber-800 text-amber-300">হাড় ফ্র্যাকচার (65)</span>
                <span>&gt;</span>
                <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">মাথাব্যথা (10)</span>
              </div>
            ),
          },
          {
            title: "২. বিমানবন্দরের ভিআইপি বোর্ডিং গেট (VIP Priority Boarding)",
            subtitle: "টিকিটের ক্যাটাগরি অনুসারে বিমানে আরোহণ",
            badge: "Tiered Sorting",
            visualTag: "O(log N) Sift",
            accentColor: "amber",
            analogy:
              "ইকোনমি ক্লাসের ২০০ জন যাত্রী লাইনে দাঁড়িয়ে থাকা সত্ত্বেও যদি একজন ফার্স্ট ক্লাস যাত্রী বা বিশেষ চাহিদাসম্পন্ন ব্যক্তি আসেন, বিমানবালা তাকে সাথে সাথে সবার আগে বিমানে প্রবেশের অনুমতি দেন।",
            whyItFits:
              "কম্পিউটার অপারেটিং সিস্টেমের সিপিইউ প্রসেস শিডিউলার ঠিক এইভাবেই জরুরি ব্যাকগ্রাউন্ড থ্রেডগুলোকে সাধারণ অ্যাপ্লিকেশনের আগে এক্সিকিউট করে।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">ভিআইপি (Priority 1)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">বিজনেস ক্লাস</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">ইকোনমি ক্লাস</span>
              </div>
            ),
          },
        ]}
      />

      {/* 4. Real-World Applications */}
      <HeapApplications />
    </div>
  );
}
