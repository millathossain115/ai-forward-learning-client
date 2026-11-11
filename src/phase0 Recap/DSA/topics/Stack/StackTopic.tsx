'use client';

import React, { useState } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  Eye,
  Zap,
  Cpu,
  History,
  Terminal
} from 'lucide-react';

interface StackItem {
  id: string;
  label: string;
  color: string;
  state?: 'idle' | 'dropping' | 'popping' | 'peeking';
}

const PRESET_COLORS = [
  'from-violet-500 to-purple-600 border-purple-400',
  'from-sky-500 to-blue-600 border-sky-400',
  'from-emerald-500 to-teal-600 border-emerald-400',
  'from-amber-500 to-orange-600 border-amber-400',
  'from-rose-500 to-pink-600 border-rose-400',
];

const CALL_STACK_PRESETS = [
  'executeSQLQuery()',
  'formatJSONResponse()',
  'compressGzipBuffer()',
  'sendHTTPResponse()',
  'logMetricsToGrafana()',
  'cleanupSocketSession()'
];

export default function StackTopic() {
  const [items, setItems] = useState<StackItem[]>([
    { id: '1', label: 'fetchUserData()', color: PRESET_COLORS[0] },
    { id: '2', label: 'authenticateToken()', color: PRESET_COLORS[1] },
    { id: '3', label: 'verifyHMACSignature()', color: PRESET_COLORS[2] },
  ]);
  const [inputVal, setInputVal] = useState('executeSQLQuery()');
  const [presetIdx, setPresetIdx] = useState(0);
  const [message, setMessage] = useState('Stack initialized with active execution frames. LIFO order.');
  const [isOverflow, setIsOverflow] = useState(false);
  const [isUnderflow, setIsUnderflow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const MAX_CAPACITY = 6;

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handlePush = async () => {
    if (isAnimating) return;
    if (items.length >= MAX_CAPACITY) {
      setIsOverflow(true);
      setMessage('⚠️ STACK OVERFLOW! স্ট্যাকের ক্যাপাসিটি পূর্ণ। নতুন ফ্রেম রাখার মেমরি নেই।');
      setTimeout(() => setIsOverflow(false), 800);
      return;
    }

    setIsAnimating(true);
    const color = PRESET_COLORS[items.length % PRESET_COLORS.length];
    const newItem: StackItem = {
      id: Date.now().toString(),
      label: inputVal || `Frame #${items.length + 1}`,
      color,
      state: 'dropping'
    };

    setMessage(`PUSH: "${newItem.label}" ওপর থেকে জারে ড্রপ করছে (O(1) Memory Push)...`);
    setItems([newItem, ...items]);

    // Animate smoothly settling into the stack
    setTimeout(() => {
      setItems(prev => prev.map((it, idx) => idx === 0 ? { ...it, state: 'idle' } : it));
    }, 50);

    // Automatically rotate to next realistic function name for user convenience
    const nextIdx = (presetIdx + 1) % CALL_STACK_PRESETS.length;
    setPresetIdx(nextIdx);
    setInputVal(CALL_STACK_PRESETS[nextIdx]);

    await delay(600);
    setMessage(`সফল! "${newItem.label}" এখন স্ট্যাকের TOP-এ অবস্থান করছে।`);
    setIsAnimating(false);
  };

  const handlePop = async () => {
    if (isAnimating) return;
    if (items.length === 0) {
      setIsUnderflow(true);
      setMessage('⚠️ STACK UNDERFLOW! স্ট্যাক সম্পূর্ণ খালি। Pop করার মতো কোনো ফ্রেম নেই।');
      setTimeout(() => setIsUnderflow(false), 800);
      return;
    }

    setIsAnimating(true);
    const popped = items[0];
    setMessage(`POP: TOP থেকে "${popped.label}" ওপরে উঠে রিমুভ হচ্ছে (O(1) Pop)...`);

    // Animate lifting up
    setItems(prev => prev.map((it, idx) => idx === 0 ? { ...it, state: 'popping' } : it));
    await delay(600);

    setItems(prev => prev.slice(1));
    setMessage(`রিমুভ সম্পন্ন! "${popped.label}" মেমরি থেকে সরানো হলো।`);
    setIsAnimating(false);
  };

  const handlePeek = async () => {
    if (isAnimating) return;
    if (items.length === 0) {
      setMessage('স্ট্যাক খালি। Peek করার মতো কোনো উপাদান নেই।');
      return;
    }

    setIsAnimating(true);
    const topItem = items[0];
    setMessage(`PEEK: তলার উপাদানে হাত না দিয়ে শুধুমাত্র শীর্ষের "${topItem.label}" লক্ষ্য করা হলো (O(1))।`);

    setItems(prev => prev.map((it, idx) => idx === 0 ? { ...it, state: 'peeking' } : it));
    await delay(1200);

    setItems(prev => prev.map(it => ({ ...it, state: 'idle' })));
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold shadow-lg shadow-violet-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Stack: Last-In, First-Out (LIFO) Execution</h2>
            <span className="text-xs font-mono text-violet-400 font-medium">Restricted Linear Access • Push &amp; Pop at TOP</span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          A Stack enforces the <b>LIFO</b> principle: the newest item pushed into memory must be the first one popped off.
          You cannot arbitrarily access the middle or bottom of a stack without popping everything above it first.
        </p>
      </div>

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Controls & Scenarios */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            Stack Controls
          </h3>

          <div className="flex flex-col gap-2.5 bg-[#121422] p-4 rounded-xl border border-[#1e2238]">
            <label className="text-xs font-mono text-zinc-300 font-medium">Function / Frame Name:</label>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="bg-[#090a10] border border-[#23273d] text-sm font-mono text-violet-300 p-2.5 rounded-lg focus:outline-none focus:border-violet-500"
            />

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={handlePush}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 font-bold text-xs md:text-sm text-white shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
              >
                <ArrowDown className="w-4 h-4" /> PUSH O(1)
              </button>

              <button
                onClick={handlePop}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 font-bold text-xs md:text-sm text-white shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" /> POP O(1)
              </button>
            </div>

            <button
              onClick={handlePeek}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#181b2c] hover:bg-[#20253d] font-mono text-xs md:text-sm text-zinc-200 border border-[#292f4c] mt-1 cursor-pointer font-medium"
            >
              <Eye className="w-4 h-4 text-amber-400" /> PEEK (Look at TOP)
            </button>
          </div>

          <button
            onClick={() => setItems([])}
            className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-mono py-2.5 rounded-lg bg-[#151724] hover:bg-[#1d2033] text-zinc-300 border border-[#23273a] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Clear Stack
          </button>
        </div>

        {/* Right: Visual Vertical Stack Container */}
        <div className="lg:col-span-2 flex flex-col items-center justify-end min-h-[380px] bg-[#090a10] rounded-xl border border-[#1a1d2e] p-6">
          {/* Top Indicator Arrow (Dynamic, inside flow to prevent overlapping) */}
          {items.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-amber-800/80 mb-3 animate-pulse">
              <ArrowDown className="w-4 h-4 text-amber-400" />
              <span className="font-bold">TOP OF STACK</span>
              <span className="text-zinc-400 text-xs">• O(1) Access Point</span>
            </div>
          )}

          {/* Physical Stack Basket */}
          <div
            className={`w-full max-w-md border-b-4 border-l-4 border-r-4 rounded-b-2xl p-4 flex flex-col gap-2.5 min-h-[250px] justify-end bg-violet-950/5 transition-all duration-300 relative ${
              isOverflow
                ? 'border-rose-500 shadow-2xl shadow-rose-500/30 animate-shake'
                : isUnderflow
                ? 'border-amber-500 animate-shake'
                : 'border-violet-500/60'
            }`}
          >
            {/* Overflow warning banner inside basket */}
            {isOverflow && (
              <div className="absolute top-2 inset-x-4 bg-rose-950/90 border border-rose-500 text-rose-300 text-xs font-mono py-1 rounded text-center font-bold z-20 animate-bounce">
                ⚠️ STACK OVERFLOW! Capacity 6/6 Full
              </div>
            )}

            {items.length === 0 ? (
              <div className="text-center text-sm font-mono text-zinc-500 m-auto py-8">
                Stack Empty (No stack frames active)
              </div>
            ) : (
              items.map((item, idx) => {
                const isTop = idx === 0;
                let transformStyle = '';
                let extraGlow = '';

                if (item.state === 'dropping') {
                  transformStyle = '-translate-y-8 opacity-40 scale-95';
                } else if (item.state === 'popping') {
                  transformStyle = '-translate-y-12 opacity-0 scale-95 transition-all duration-500';
                } else if (item.state === 'peeking') {
                  extraGlow = 'ring-4 ring-amber-400 scale-[1.03] shadow-xl shadow-amber-400/40';
                }

                return (
                  <div
                    key={item.id}
                    className={`w-full py-3 px-4 rounded-xl border bg-gradient-to-r ${item.color} text-white font-mono text-sm flex items-center justify-between shadow-lg transition-all duration-500 ${transformStyle} ${
                      extraGlow ? extraGlow : isTop ? 'ring-2 ring-amber-400/80 shadow-amber-500/10 scale-[1.01]' : 'opacity-85'
                    }`}
                  >
                    <span className="font-semibold">{item.label}</span>
                    <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded ${
                      isTop ? 'bg-amber-400 text-slate-950 shadow' : 'bg-black/40 text-zinc-200'
                    }`}>
                      {isTop ? 'TOP (O(1))' : `Frame #${items.length - idx}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-xs font-mono text-zinc-400 mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span>Base of Stack (First Pushed / Deepest Frame)</span>
          </div>
        </div>
      </div>

      {/* 3. Live Feedback Banner */}
      <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] text-sm font-mono text-violet-300 flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
        <span className="font-sans text-sm">{message}</span>
      </div>

      {/* 4. Everyday Real-Life Analogies (বাস্তব জীবনের দৃশ্যপট) */}
      <RealLifeScenario
        topicName="স্ট্যাক (Stack - LIFO)"
        scenarios={[
          {
            title: "১. জনাকীর্ণ লিফট বা এলিভেটর (Crowded Elevator)",
            subtitle: "সবার শেষে ওঠা ব্যক্তি সবার আগে নামে",
            badge: "LIFO দৃশ্যপট",
            visualTag: "Last-In, First-Out",
            accentColor: "violet",
            analogy:
              "একটি ভিড়ভাট্টা লিফটে যখন মানুষ ওঠে, যে ব্যক্তি সবার প্রথমে ঢোকে সে স্বাভাবিকভাবেই পেছনের কোণে গিয়ে দাঁড়ায়। এরপর একের পর এক মানুষ ঢুকতে থাকে। নির্দিষ্ট ফ্লোরে লিফটের দরজা খুললে সবার শেষে যে ব্যক্তি দরজার ঠিক সামনে উঠেছিল, তাকেই সবার আগে নামতে হয় (LIFO)!",
            whyItFits:
              "লিফটের ভেতরের মানুষগুলোকে স্ট্যাকের মেমরি এলিমেন্ট মনে করলে—সবার শেষে ঢোকা ব্যক্তিটিই হলো স্ট্যাকের 'TOP', যাকে সবার আগে POP করতে হয়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono text-violet-300 py-1">
                <span className="px-2 py-1 rounded bg-violet-950/80 border border-violet-800">১ম ব্যক্তি (ভেতরে)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-violet-950/80 border border-violet-800">২য় ব্যক্তি</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-bold border border-amber-400">দরজায় (সর্বশেষ ঢোকা = ১ম বের)</span>
              </div>
            ),
          },
          {
            title: "২. রেস্তোরাঁর বুফেতে প্লেটের স্তূপ (Stack of Cafeteria Plates)",
            subtitle: "ওপরের প্লেটটি সবার শেষে রাখা কিন্তু সবার আগে নেওয়া হয়",
            badge: "Physical Pile",
            visualTag: "Push & Pop at Top",
            accentColor: "fuchsia",
            analogy:
              "বাবুর্চি যখন পরিষ্কার থালাগুলো টেবিলে সাজিয়ে রাখে, সে একটির ওপর আরেকটি প্লেট চাপিয়ে স্তূপ তৈরি করে (PUSH)। আপনি যখন খাবার নিতে যাবেন, আপনি নিচ বা মাঝখান থেকে প্লেট টানেন না, বরং স্তূপের ওপর থেকে সবচেয়ে সাম্প্রতিক রাখা প্লেটটি তুলে নেন (POP)!",
            whyItFits:
              "মাঝখান থেকে কোনো প্লেট টানতে গেলে পুরো স্তূপ ভেঙে পড়তে পারে। ঠিক একইভাবে স্ট্যাকে শুধুমাত্র ওপরের (TOP) প্লেটেই সরাসরি হাত দেওয়া যায়।",
            diagram: (
              <div className="flex flex-col-reverse items-center gap-1 text-[9px] font-mono py-1">
                <div className="w-28 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-center text-zinc-400">১ম প্লেট (তলায়)</div>
                <div className="w-28 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-center text-zinc-400">২য় প্লেট</div>
                <div className="w-28 py-0.5 rounded bg-fuchsia-600 text-white font-bold border border-fuchsia-400 text-center">৩য় প্লেট (TOP - এ হাত)</div>
              </div>
            ),
          },
        ]}
      />

      {/* 5. Real World Applications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <History className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-bold text-zinc-100">1. Browser Navigation Stack</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Every link you click pushes a URL onto the history stack. Clicking the &quot;Back&quot; button pops the current URL to reveal the previous page.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Terminal className="w-5 h-5 text-violet-400" />
          <h4 className="text-sm font-bold text-zinc-100">2. OS Thread Call Stack</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Every function call creates an activation record (local variables, return pointer) on the thread call stack. Exiting a function pops the frame.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-zinc-100">3. Bracket &amp; Syntax Matching</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Compilers match parentheses: push on opening bracket <code>(&#123;[</code> and pop on closing bracket. If stack is empty when parsing ends, syntax is valid!
          </p>
        </div>
      </div>
    </div>
  );
}
