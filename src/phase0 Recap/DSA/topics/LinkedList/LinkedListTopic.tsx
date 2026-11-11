'use client';

import React, { useState } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  GitCommit,
  PlusCircle,
  Trash2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  Cpu,
  Link as LinkIcon,
  Unlink
} from 'lucide-react';

interface LLNode {
  id: string;
  value: number;
  addr: string;
  state: 'idle' | 'allocating' | 'linking' | 'connected' | 'unlinking' | 'lift-delete' | 'bypassing' | 'bypassed-target' | 'active';
}

const INITIAL_NODES: LLNode[] = [
  { id: '1', value: 15, addr: '0x4F12', state: 'idle' },
  { id: '2', value: 32, addr: '0x8A01', state: 'idle' },
  { id: '3', value: 78, addr: '0x1C99', state: 'idle' },
  { id: '4', value: 94, addr: '0xE320', state: 'idle' },
];

export default function LinkedListTopic() {
  const [nodes, setNodes] = useState<LLNode[]>(INITIAL_NODES);
  const [listType, setListType] = useState<'singly' | 'doubly' | 'circular'>('singly');
  const [inputValue, setInputValue] = useState(45);
  const [insertIdx, setInsertIdx] = useState(2);
  const [message, setMessage] = useState('ইন্টারঅ্যাক্টিভ লিংকড লিস্ট খেলার মাঠ। Singly, Doubly ও Circular মোডে পয়েন্টার লিঙ্কিং দেখুন।');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDoubly = listType === 'doubly';
  const isCircular = listType === 'circular';

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  const randomAddr = () => '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');

  // INSERT AT HEAD WITH STEP-BY-STEP LINKING ANIMATION
  const handleInsertHead = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newAddr = randomAddr();
    const oldHeadAddr = nodes.length > 0 ? nodes[0].addr : 'NULL';

    // Step 1: Allocate Node in Heap (unlinked)
    const newNode: LLNode = {
      id: Date.now().toString(),
      value: inputValue,
      addr: newAddr,
      state: 'allocating',
    };

    setNodes([newNode, ...nodes]);
    setMessage(`ধাপ ১: মেমরির ঠিকানায় (${newAddr}) নতুন নোড তৈরি হলো [মান: ${inputValue}, next: ?]। এখনো লিস্টের সাথে যুক্ত হয়নি।`);
    await delay(1200);

    // Step 2: Point New Node's Next to current Head
    setNodes(prev => [
      { ...prev[0], state: 'linking' },
      ...prev.slice(1)
    ]);
    setMessage(`ধাপ ২ (পয়েন্টার জোড়া): নতুন নোডের Next পয়েন্টারে পুরনো Head-এর ঠিকানা (${oldHeadAddr}) লিখে দেওয়া হলো! (NewNode.next = Head)`);
    await delay(1400);

    // Step 3: Update HEAD Pointer to point to New Node
    setNodes(prev => [
      { ...prev[0], state: 'connected' },
      ...prev.slice(1).map(n => ({ ...n, state: 'idle' as const }))
    ]);
    setMessage(`ধাপ ৩ (হেড আপডেট): HEAD লেবেলটি এখন নতুন নোডকে নির্দেশ করছে। কোনো ডেটা শিফটিং ছাড়াই মাত্র ৩টি পয়েন্টার অ্যাসাইনমেন্টে O(1) ইনসার্ট সম্পন্ন!`);
    await delay(1200);

    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setIsAnimating(false);
  };

  // INSERT AT TAIL WITH TRAVERSAL & LINKING ANIMATION
  const handleInsertTail = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newAddr = randomAddr();
    const lastIdx = nodes.length - 1;

    // Step 1: Allocate Node
    const newNode: LLNode = {
      id: Date.now().toString(),
      value: inputValue,
      addr: newAddr,
      state: 'allocating',
    };

    setMessage(`ধাপ ১: নতুন নোড ${newAddr} তৈরি করা হলো। এখন শেষ নোডের কাছে পৌঁছাতে হবে...`);
    setNodes([...nodes, newNode]);
    await delay(1200);

    // Step 2: Traverse / Reach Tail
    if (lastIdx >= 0) {
      setActiveIdx(lastIdx);
      setMessage(`ধাপ ২: বর্তমান শেষ নোড [${nodes[lastIdx].value}]-এর Next আগে ছিল NULL।`);
      await delay(1200);
    }

    // Step 3: Connect Tail's Next to New Node
    setNodes(prev => {
      const copy = [...prev];
      if (lastIdx >= 0) {
        copy[lastIdx] = { ...copy[lastIdx], state: 'linking' };
      }
      copy[copy.length - 1] = { ...copy[copy.length - 1], state: 'connected' };
      return copy;
    });
    setMessage(`ধাপ ৩ (চেইন যুক্ত): শেষ নোডের next পয়েন্টার আপডেট করে নতুন নোড ${newAddr}-এর সাথে জুড়ে দেওয়া হলো!`);
    await delay(1400);

    setActiveIdx(null);
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setMessage(`টেইলে ইনসার্ট সফল! নতুন নোডটি এখন লিস্টের সর্বশেষ উপাদান (next: NULL)।`);
    setIsAnimating(false);
  };

  // INSERT AT SPECIFIC INDEX WITH SPLICING ANIMATION
  const handleInsertAt = async () => {
    if (isAnimating) return;
    const targetIdx = Math.max(0, Math.min(nodes.length, insertIdx));
    if (targetIdx === 0) {
      await handleInsertHead();
      return;
    }
    if (targetIdx >= nodes.length) {
      await handleInsertTail();
      return;
    }

    setIsAnimating(true);
    const newAddr = randomAddr();
    const prevNode = nodes[targetIdx - 1];
    const nextNode = nodes[targetIdx];

    // Step 1: Traverse to index
    setMessage(`ধাপ ১: ইনডেক্স [${targetIdx}]-এ পৌঁছানোর জন্য হেড থেকে ট্রাভার্স করা হচ্ছে...`);
    for (let i = 0; i < targetIdx; i++) {
      setActiveIdx(i);
      await delay(700);
    }

    // Step 2: Allocate floating node
    const newNode: LLNode = {
      id: Date.now().toString(),
      value: inputValue,
      addr: newAddr,
      state: 'allocating',
    };
    const updated = [...nodes];
    updated.splice(targetIdx, 0, newNode);
    setNodes(updated);
    setMessage(`ধাপ ২: নতুন নোড (${newAddr}) তৈরি হলো [মান: ${inputValue}]। এখন [${prevNode.value}] এবং [${nextNode.value}] এর মাঝখানে একে জুড়তে হবে।`);
    await delay(1300);

    // Step 3: Link New Node -> Next Node
    updated[targetIdx] = { ...updated[targetIdx], state: 'linking' };
    setNodes([...updated]);
    setMessage(`ধাপ ৩: নতুন নোডের Next পয়েন্টার যুক্ত হলো পরের নোড [${nextNode.value}] (${nextNode.addr})-এর সাথে।`);
    await delay(1400);

    // Step 4: Link Prev Node -> New Node
    updated[targetIdx - 1] = { ...updated[targetIdx - 1], state: 'linking' };
    updated[targetIdx] = { ...updated[targetIdx], state: 'connected' };
    setNodes([...updated]);
    setMessage(`ধাপ ৪: পূর্বের নোড [${prevNode.value}]-এর Next পয়েন্টার সরাসরি নতুন নোড ${newAddr}-কে পয়েন্ট করল। মাঝখানে স্প্লাইসিং O(1) সম্পন্ন!`);
    await delay(1400);

    setActiveIdx(null);
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setIsAnimating(false);
  };

  // DELETE NODE WITH STEP-BY-STEP LIFTING & BYPASS PATH ANIMATION
  const handleDeleteAt = async (idx: number) => {
    if (isAnimating || nodes.length <= 1) return;
    setIsAnimating(true);

    const targetNode = nodes[idx];
    const prevNode = idx > 0 ? nodes[idx - 1] : null;
    const nextNode = idx < nodes.length - 1 ? nodes[idx + 1] : null;

    // Step 1: Lift targeted node upwards out of chain
    setActiveIdx(idx);
    setNodes(prev => prev.map((n, i) => i === idx ? { ...n, state: 'lift-delete' } : n));
    setMessage(`ধাপ ১ (নোড পৃথকীকরণ): ইনডেক্স [${idx}]-এর নোড [${targetNode.value}] চেইন থেকে ওপরের দিকে আলাদা করা হলো। সংযোগ বিচ্ছিন্ন হচ্ছে...`);
    await delay(1400);

    // Step 2: Show direct bypass linkage between Prev Node and Next Node (both light up together)
    if (prevNode) {
      setNodes(prev => prev.map((n, i) => {
        if (i === idx - 1) return { ...n, state: 'bypassing' };
        if (i === idx + 1) return { ...n, state: 'bypassed-target' };
        return n;
      }));
      setMessage(`ধাপ ২ (নতুন পাথ তৈরি): পূর্বের নোড [${prevNode.value}] এবং পরের নোড [${nextNode ? nextNode.value : 'NULL'}] উভয়েই সক্রিয় হয়ে একে অপরের সাথে পয়েন্টার ব্রিজ তৈরি করল!`);
    } else {
      setNodes(prev => prev.map((n, i) => {
        if (i === idx + 1) return { ...n, state: 'bypassed-target' };
        return n;
      }));
      setMessage(`ধাপ ২ (হেড শিফট): ১ম নোড বিচ্ছিন্ন হওয়ায় HEAD পয়েন্টার সরাসরি পরবর্তী নোড [${nextNode ? nextNode.value : 'NULL'}]-কে নির্দেশ করছে।`);
    }
    await delay(1600);

    // Step 3: Remove lifted target node and finalize clean chain
    const remaining = nodes.filter((_, i) => i !== idx);
    setNodes(remaining.map(n => ({ ...n, state: 'idle' })));
    setActiveIdx(null);
    setMessage(`ধাপ ৩ (মেমরি রিলিজ): নোড [${targetNode.value}] মেমরি থেকে মুক্ত (Free)। কোনো উপাদান না ঠেলে শুধু পয়েন্টার বাইপাস করেই O(1) ডিলিট সম্পন্ন!`);

    await delay(1000);
    setIsAnimating(false);
  };

  // TRAVERSE LIST (CIRCULAR AWARE)
  const handleTraverse = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (isCircular) {
      setMessage('সার্কুলার ট্রাভার্স শুরু: হেড থেকে টেল হয়ে আবারও লুপ ব্যাক করে হেডে (লুপ সাইকেল) পৌঁছাবে...');
      // Traverse nodes once + loop back to head
      for (let i = 0; i < nodes.length; i++) {
        setActiveIdx(i);
        setNodes(prev => prev.map((n, idx) => ({ ...n, state: idx === i ? 'active' : 'idle' })));
        setMessage(`সার্কুলার ট্রাভার্স: নোড [${nodes[i].value}] (Address: ${nodes[i].addr})।`);
        await delay(800);
      }
      // Loop back to head step
      setMessage(`🔄 সাইকেল সম্পূর্ণ! শেষ নোডের Next পয়েন্টার আবার শুরুতে Head (Address: ${nodes[0].addr})-এ ফিরে এসেছে! কোনো NULL নেই।`);
      setActiveIdx(0);
      setNodes(prev => prev.map((n, idx) => ({ ...n, state: idx === 0 ? 'active' : 'idle' })));
      await delay(1200);
    } else {
      setMessage('হেড থেকে শুরু করে পয়েন্টার ধরে ধরে এক নোড থেকে অন্য নোডে ট্রাভার্স করা হচ্ছে O(N)...');
      for (let i = 0; i < nodes.length; i++) {
        setActiveIdx(i);
        setNodes(prev => prev.map((n, idx) => ({ ...n, state: idx === i ? 'active' : 'idle' })));
        setMessage(`পয়েন্টার জাম্প: নোড [${nodes[i].value}] (Address: ${nodes[i].addr}) রিড করা হলো। পরবর্তী নোডের ঠিকানা: ${i < nodes.length - 1 ? nodes[i + 1].addr : 'NULL'}`);
        await delay(800);
      }
      setMessage('ট্রাভার্স সম্পন্ন! চেইনের শেষ প্রান্ত (NULL পয়েন্টার)-এ পৌঁছে থেমে গেছে।');
    }

    setActiveIdx(null);
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Linked List: Pointer-Chained Dynamic Memory</h2>
            <span className="text-xs font-mono text-emerald-400 font-medium">Heap-Allocated Nodes • Zero Shifting Insertion</span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          Unlike an Array which demands a continuous contiguous block in RAM, a Linked List stores items anywhere in heap memory.
          Each node consists of two parts: <b>[Data]</b> and a <b>[Next Pointer]</b> holding the hexadecimal RAM address of the subsequent node.
        </p>
      </div>

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3.5 rounded-xl border border-[#1d2030]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Singly vs Doubly vs Circular Toggle */}
            <div className="flex items-center gap-1 bg-[#090a10] p-1 rounded-lg border border-[#1e2235] text-xs md:text-sm">
              <button
                onClick={() => setListType('singly')}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md font-mono transition-all text-xs md:text-sm ${listType === 'singly' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                Singly
              </button>
              <button
                onClick={() => setListType('doubly')}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md font-mono transition-all text-xs md:text-sm ${listType === 'doubly' ? 'bg-teal-400 text-slate-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                Doubly
              </button>
              <button
                onClick={() => setListType('circular')}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md font-mono transition-all text-xs md:text-sm ${listType === 'circular' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                Circular 🔄
              </button>
            </div>

            {/* Input with Label */}
            <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-300 font-medium">মান:</span>
              <input
                type="number"
                value={inputValue}
                disabled={isAnimating}
                onChange={e => setInputValue(Number(e.target.value))}
                className="w-14 bg-[#141624] text-emerald-300 text-sm px-2 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Head & Tail Insert Buttons together */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleInsertHead}
                disabled={isAnimating}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md disabled:opacity-40 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Head O(1)
              </button>
              <button
                onClick={handleInsertTail}
                disabled={isAnimating}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold shadow-md disabled:opacity-40 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Tail
              </button>
            </div>

            {/* Insert At Specific Index Card placed right after Head & Tail */}
            <div className="flex items-center gap-1.5 bg-[#090a10] p-1.5 rounded-lg border border-[#1e2235]">
              <span className="text-xs font-mono text-zinc-300">@ Idx:</span>
              <input
                type="number"
                min={0}
                max={nodes.length}
                value={insertIdx}
                disabled={isAnimating}
                onChange={e => setInsertIdx(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-12 bg-[#141624] text-sky-300 text-sm px-1.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={handleInsertAt}
                disabled={isAnimating}
                className="flex items-center gap-1 text-xs md:text-sm font-mono px-3 py-1 rounded bg-sky-600/30 hover:bg-sky-600/40 text-sky-300 border border-sky-500/40 font-semibold disabled:opacity-40 transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Insert @
              </button>
            </div>

            <button
              onClick={handleTraverse}
              disabled={isAnimating}
              className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md disabled:opacity-40 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Traverse
            </button>
          </div>

          <button
            onClick={() => setNodes(INITIAL_NODES)}
            disabled={isAnimating}
            className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] disabled:opacity-40 cursor-pointer font-medium"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Visual Node Chain: Dual Mode (Linear Multi-row vs Real Circular Ring) */}
        {isCircular ? (
          <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center bg-[#090a10] rounded-xl border border-[#1e2235] overflow-hidden p-4 select-none">
            {/* Center Hub Indicator */}
            <div className="absolute w-28 h-28 rounded-full border border-dashed border-amber-500/30 flex flex-col items-center justify-center bg-amber-500/5 text-center p-2 z-0 pointer-events-none">
              <span className="text-[11px] font-mono font-bold text-amber-400">Circular Ring</span>
              <span className="text-[9px] text-zinc-500">Zero Null Pointer</span>
              <span className="text-[8px] text-amber-300/80 mt-1">⟲ Endless Loop</span>
            </div>

            {/* Circular Orbit Path SVG Background */}
            <svg className="absolute w-full h-full pointer-events-none z-0">
              <circle
                cx="50%"
                cy="50%"
                r="130"
                fill="none"
                stroke="rgba(245, 158, 11, 0.15)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Nodes Positioned along Circle Perimeter using Trigonometry */}
            {nodes.map((node, idx) => {
              const total = nodes.length;
              // Angle in radians: start at top (-90 deg) and go clockwise
              const angle = ((2 * Math.PI) / total) * idx - Math.PI / 2;
              // Responsive radius (smaller on mobile)
              const radius = 130;
              const x = Math.round(Math.cos(angle) * radius);
              const y = Math.round(Math.sin(angle) * radius);

              const isFirst = idx === 0;
              const isLast = idx === total - 1;
              const nextAddr = isLast ? nodes[0].addr : nodes[idx + 1].addr;
              const isActive = activeIdx === idx;

              let cardBorder = 'border-[#25293d] bg-[#131624]';
              let badgeText = '';

              if (node.state === 'allocating') {
                cardBorder = 'border-amber-400 bg-amber-950/40 animate-pulse scale-110';
                badgeText = 'মেমরি বরাদ্দ';
              } else if (node.state === 'linking') {
                cardBorder = 'border-sky-400 bg-sky-950/40 ring-4 ring-sky-500/30 scale-110';
                badgeText = 'পয়েন্টার জোড়া';
              } else if (node.state === 'connected') {
                cardBorder = 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-500/20 scale-110';
                badgeText = 'সংযুক্ত';
              } else if (node.state === 'lift-delete') {
                cardBorder = 'border-rose-500 bg-rose-950/70 scale-90 opacity-80';
                badgeText = 'আলাদা';
              } else if (node.state === 'bypassing') {
                cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 scale-110';
                badgeText = 'বাইপাস আউট';
              } else if (node.state === 'bypassed-target') {
                cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 scale-110';
                badgeText = 'বাইপাস ইন';
              } else if (isActive) {
                cardBorder = 'border-amber-400 bg-amber-950/80 ring-4 ring-amber-400/40 scale-115 shadow-xl shadow-amber-500/30';
              }

              return (
                <div
                  key={node.id}
                  className="absolute transition-all duration-700 z-10 flex flex-col items-center"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* Floating HEAD Tag */}
                  {isFirst && (
                    <span className="absolute -top-5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-extrabold shadow">
                      HEAD ➔
                    </span>
                  )}

                  {/* Node Card */}
                  <div className={`flex flex-col rounded-xl border p-2 transition-all shadow-md ${cardBorder} w-28`}>
                    <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 mb-0.5 border-b border-[#202438] pb-0.5">
                      <span className="text-amber-300 font-semibold">{node.addr}</span>
                      {badgeText && (
                        <span className="text-[7.5px] font-sans px-1 rounded bg-[#090a12] text-amber-300">
                          {badgeText}
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteAt(idx)}
                        disabled={isAnimating}
                        className="text-rose-400 hover:text-rose-300 p-0.5 disabled:opacity-30"
                        title="Delete Node"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <div className="flex items-stretch gap-1">
                      <div className="flex-1 h-9 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex flex-col items-center justify-center">
                        <span className="text-[7.5px] text-zinc-400 font-mono">val</span>
                        <span className="text-xs font-bold font-mono text-emerald-300">{node.value}</span>
                      </div>
                      <div className="flex-1 h-9 rounded-md bg-amber-500/15 border border-amber-500/30 flex flex-col items-center justify-center px-0.5">
                        <span className="text-[7.5px] text-zinc-400 font-mono">next</span>
                        <span className="text-[8.5px] font-bold font-mono text-amber-300 truncate w-full text-center">
                          {nextAddr}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Visual Node Chain: Multi-row wrapping layout, zero horizontal scroll */
          <div className="py-6 px-3 flex flex-wrap items-center gap-y-6 gap-x-3 min-h-[160px] bg-[#090a10] rounded-xl border border-[#161826]">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-950/70 text-amber-300 border border-amber-800 font-bold shadow">
                HEAD
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </div>

            {nodes.map((node, idx) => {
              const isLast = idx === nodes.length - 1;
              const nextAddr = !isLast ? nodes[idx + 1].addr : 'NULL';
              const prevAddr = idx > 0 ? nodes[idx - 1].addr : 'NULL';
              const isActive = activeIdx === idx;

              let cardBorder = 'border-[#25293d] bg-[#131624]';
              let badgeText = '';
              let extraTransform = '';

              if (node.state === 'allocating') {
                cardBorder = 'border-amber-400 bg-amber-950/40 animate-pulse scale-105';
                badgeText = 'মেমরি বরাদ্দ';
              } else if (node.state === 'linking') {
                cardBorder = 'border-sky-400 bg-sky-950/40 ring-4 ring-sky-500/20 scale-105';
                badgeText = 'পয়েন্টার জোড়া হচ্ছে';
              } else if (node.state === 'connected') {
                cardBorder = 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-500/20 scale-105';
                badgeText = 'সংযুক্ত';
              } else if (node.state === 'lift-delete') {
                cardBorder = 'border-rose-500 bg-rose-950/70 ring-4 ring-rose-500/30 opacity-90 shadow-xl shadow-rose-500/20';
                extraTransform = '-translate-y-6 scale-95 transition-transform duration-700';
                badgeText = 'আলাদা করা হচ্ছে ⬆';
              } else if (node.state === 'bypassing') {
                cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 shadow-lg shadow-cyan-500/20 scale-105';
                badgeText = 'বাইপাস আউট ➔';
              } else if (node.state === 'bypassed-target') {
                cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 shadow-lg shadow-cyan-500/20 scale-105';
                badgeText = '➔ বাইপাস ইন';
              } else if (isActive) {
                cardBorder = 'border-emerald-400 bg-emerald-950/70 ring-4 ring-emerald-500/20 scale-105';
              }

              return (
                <div key={node.id} className={`flex items-center gap-2 shrink-0 transition-all duration-700 ${extraTransform}`}>
                  {/* Single Node Card */}
                  <div className={`flex flex-col rounded-xl border p-2.5 transition-all shadow-lg ${cardBorder}`}>
                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-1 border-b border-[#202438] pb-1 gap-2">
                      <span className="text-emerald-400 font-semibold">{node.addr}</span>
                      {badgeText && (
                        <span className="text-[8px] font-sans px-1 rounded bg-[#090a12] text-amber-300 border border-amber-500/30">
                          {badgeText}
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteAt(idx)}
                        disabled={isAnimating}
                        className="text-rose-400 hover:text-rose-300 p-0.5 disabled:opacity-30 transition-colors"
                        title="Delete Node"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Node Body: Data + Pointer Box */}
                    <div className="flex items-stretch gap-1">
                      <div className="w-12 h-11 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex flex-col items-center justify-center">
                        <span className="text-[8px] text-zinc-400 font-mono">data</span>
                        <span className="text-sm font-bold font-mono text-emerald-300">{node.value}</span>
                      </div>

                      <div className={`w-14 h-11 rounded-lg flex flex-col items-center justify-center px-1 border transition-colors ${
                        node.state === 'linking' ? 'bg-sky-500/30 border-sky-400' : 'bg-teal-500/15 border-teal-500/40'
                      }`}>
                        <span className="text-[8px] text-zinc-400 font-mono">next</span>
                        <span className="text-[9px] font-bold font-mono text-teal-300 truncate w-full text-center">
                          {nextAddr}
                        </span>
                      </div>

                      {isDoubly && (
                        <div className="w-14 h-11 rounded-lg bg-indigo-500/15 border border-indigo-500/40 flex flex-col items-center justify-center px-1">
                          <span className="text-[8px] text-zinc-400 font-mono">prev</span>
                          <span className="text-[9px] font-bold font-mono text-indigo-300 truncate w-full text-center">
                            {prevAddr}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow Pointer to Next Node */}
                  {!isLast ? (
                    <div className="flex flex-col items-center text-teal-400 px-0.5">
                      <span className="text-[9px] font-mono leading-none">{isDoubly ? '⇄' : '➔'}</span>
                      <div className={`h-[2px] w-5 transition-all duration-300 ${
                        node.state === 'linking' ? 'bg-sky-400 shadow-sm shadow-sky-400' : 'bg-teal-500/60'
                      }`} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[9px] font-mono px-2 py-1 rounded bg-rose-950/40 text-rose-300 border border-rose-900 shrink-0">
                      NULL
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Live Telemetry Banner */}
        <div className="p-3 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-sans text-xs sm:text-sm">{message}</span>
        </div>
      </div>

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="লিংকড লিস্ট (Linked List)"
        scenarios={[
          {
            title: "১. গুপ্তধনের চিরকুট ও ক্লু (Treasure Hunt Clues)",
            subtitle: "একটি সূত্র থেকে পরবর্তী সূত্রের গোপন ঠিকানা পাওয়া",
            badge: "Pointer Chaining",
            visualTag: "Node = Data + Pointer",
            accentColor: "emerald",
            analogy:
              "গুপ্তধন খোঁজার খেলায় আপনি প্রথমে ১ম চিরকুটটি পান। সেই চিরকুটে লেখা থাকে: 'আলমারির পেছনের ড্রয়ারে যাও (Next Address)'। ২য় চিরকুটে লেখা: 'বাগানের আমগাছের নিচে যাও'। আপনি চাইলে সরাসরি শেষ চিরকুটে লাফ দিতে পারেন না, কারণ ৪র্থ চিরকুটটি কোথায় আছে তা একমাত্র ৩য় চিরকুটই জানে!",
            whyItFits:
              "লিংকড লিস্টের প্রতিটি নোড মেমরির যেকোনাে ঠিকানায় ছড়ানো থাকে। প্রতিটি নোড তার পরবর্তী নোডের হেক্সাডেসিমাল অ্যাড্রেস (Pointer) সাথে বহন করে।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-2 py-1 rounded bg-[#161a29] border border-emerald-500/50">ক্লু ১ (অ্যাড্রেস 0x4F)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-[#161a29] border border-emerald-500/50">ক্লু ২ (অ্যাড্রেস 0x8A)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold">গুপ্তধন</span>
              </div>
            ),
          },
          {
            title: "২. ট্রেনের বগির কাপলিং বা হুক (Train Carriages)",
            subtitle: "মাঝের বগি খুলে ফেলতে বা জুড়তে অন্য বগিগুলো সরাতে হয় না",
            badge: "Physical Hook",
            visualTag: "O(1) Insertion / Deletion",
            accentColor: "sky",
            analogy:
              "ট্রেনের যেকোনো বগি খুলে নিতে চাইলে শুধু আগের ও পরের বগির মাঝের লোহার হুক বা শিকলটি (Pointer) খুলে সরাসরি জোড়া দিয়ে দিলেই হয়। পেছনের ১০টি বগিকে এক ইঞ্চিও ঠেলতে হয় না!",
            whyItFits:
              "অ্যারেতে যেমন ইনসার্ট বা ডিলিট করতে পুরো লাইনকে সরাতে (Shift) হয়, লিংকড লিস্টে কেবল পয়েন্টার বিচ্ছিন্ন ও পুনর্সংযুক্ত করলেই কাজ শেষ হয়।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">ইঞ্জিন</span>
                <span>-[হুক]-</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">বগি ১</span>
                <span>-[হুক]-</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">নতুন বগি</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
