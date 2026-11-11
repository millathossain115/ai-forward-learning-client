'use client';

import React, { useState } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  ListFilter,
  PlusCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  Cpu,
  Clock,
  Server,
  Repeat,
  Layers,
  CircleDot,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';

interface QueueJob {
  id: string;
  name: string;
  color: string;
  state?: 'idle' | 'entering' | 'exiting';
}

interface CircularSlot {
  id: string;
  value: string | null;
  color: string;
  state?: 'idle' | 'entering' | 'exiting' | 'active';
}

const JOB_PALETTE = [
  'from-cyan-500 to-blue-600 border-cyan-400 text-slate-950',
  'from-emerald-500 to-teal-600 border-emerald-400 text-slate-950',
  'from-amber-500 to-orange-600 border-amber-400 text-slate-950',
  'from-fuchsia-500 to-pink-600 border-fuchsia-400 text-slate-950',
  'from-indigo-500 to-purple-600 border-indigo-400 text-slate-950',
  'from-rose-500 to-red-600 border-rose-400 text-slate-950',
];

const REAL_WORLD_QUEUE_JOBS = [
  'Print_Ticket',
  'Send_OTP',
  'Save_Avatar',
  'Charge_Card',
  'Sync_Chat',
  'Send_Email',
  'Encode_Video',
  'Cache_Query'
];

export default function QueueTopic() {
  // Default Queue is strictly Linear Queue as requested
  const [queueMode, setQueueMode] = useState<'linear' | 'circular'>('linear');

  // Linear Queue State
  const [jobs, setJobs] = useState<QueueJob[]>([
    { id: '1', name: 'Order_Food', color: JOB_PALETTE[0] },
    { id: '2', name: 'Check_Balance', color: JOB_PALETTE[1] },
    { id: '3', name: 'Print_Bill', color: JOB_PALETTE[2] },
  ]);
  const [jobInput, setJobInput] = useState('Print_Ticket');
  const [presetIdx, setPresetIdx] = useState(0);
  const [message, setMessage] = useState('Linear Queue প্রস্তুত। First-In, First-Out (FIFO) নিয়মে একমুখী পাইপলাইন।');
  const [isAnimating, setIsAnimating] = useState(false);
  const MAX_CAPACITY = 6;

  // Circular Queue State (Fixed Ring Buffer of 6 Slots)
  const [circularSlots, setCircularSlots] = useState<CircularSlot[]>([
    { id: 's0', value: 'Print_Ticket', color: JOB_PALETTE[0], state: 'idle' },
    { id: 's1', value: 'Send_OTP', color: JOB_PALETTE[1], state: 'idle' },
    { id: 's2', value: 'Save_Avatar', color: JOB_PALETTE[2], state: 'idle' },
    { id: 's3', value: null, color: '', state: 'idle' },
    { id: 's4', value: null, color: '', state: 'idle' },
    { id: 's5', value: null, color: '', state: 'idle' },
  ]);
  const [cqFront, setCqFront] = useState<number>(0);
  const [cqRear, setCqRear] = useState<number>(2);
  const [cqCount, setCqCount] = useState<number>(3);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // LINEAR QUEUE ENQUEUE
  const handleLinearEnqueue = async () => {
    if (isAnimating) return;
    if (jobs.length >= MAX_CAPACITY) {
      setMessage('⚠️ LINEAR OVERFLOW! বাফার পূর্ণ (Capacity: 6)। নতুন উপাদান যোগ করতে প্রথমে Dequeue করুন।');
      return;
    }

    setIsAnimating(true);
    const color = JOB_PALETTE[jobs.length % JOB_PALETTE.length];
    const newJob: QueueJob = {
      id: Date.now().toString(),
      name: jobInput || `Job #${jobs.length + 1}`,
      color,
      state: 'entering'
    };

    setMessage(`ENQUEUE: "${newJob.name}" পেছনের TAIL-এ যুক্ত হচ্ছে (O(1))...`);
    setJobs(prev => [...prev, newJob]);

    const nextIdx = (presetIdx + 1) % REAL_WORLD_QUEUE_JOBS.length;
    setPresetIdx(nextIdx);
    setJobInput(REAL_WORLD_QUEUE_JOBS[nextIdx]);

    await delay(700);
    setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, state: 'idle' } : j));
    setMessage(`সফল! "${newJob.name}" এখন কিউ-এর লাইনে অপেক্ষা করছে।`);
    setIsAnimating(false);
  };

  // LINEAR QUEUE DEQUEUE
  const handleLinearDequeue = async () => {
    if (isAnimating) return;
    if (jobs.length === 0) {
      setMessage('⚠️ LINEAR UNDERFLOW! কিউ সম্পূর্ণ খালি। প্রসেস করার মতো কোনো জব নেই।');
      return;
    }

    setIsAnimating(true);
    const processed = jobs[0];
    setMessage(`DEQUEUE: HEAD থেকে "${processed.name}" সবার আগে এক্সিকিউট হয়ে বের হচ্ছে (FIFO O(1))...`);

    setJobs(prev => prev.map((j, idx) => idx === 0 ? { ...j, state: 'exiting' } : j));
    await delay(650);

    setJobs(prev => prev.slice(1));
    setMessage(`প্রসেস সম্পন্ন! "${processed.name}" বের হয়ে গেছে। পরবর্তী জব HEAD-এ আসল।`);
    setIsAnimating(false);
  };

  // CIRCULAR QUEUE ENQUEUE
  const handleCircularEnqueue = async () => {
    if (isAnimating) return;
    if (cqCount >= MAX_CAPACITY) {
      setMessage(`⚠️ CIRCULAR OVERFLOW! বাফারের সব ${MAX_CAPACITY}টি স্লট পূর্ণ।`);
      return;
    }

    setIsAnimating(true);
    const nextRear = cqCount === 0 ? cqFront : (cqRear + 1) % MAX_CAPACITY;
    const valueToAdd = jobInput || `Task_${Date.now() % 1000}`;
    const color = JOB_PALETTE[nextRear % JOB_PALETTE.length];

    const isWrapAround = cqCount > 0 && nextRear === 0 && cqRear === MAX_CAPACITY - 1;

    if (isWrapAround) {
      setMessage(`🔄 সার্কুলার র‍্যাপ: Rear শেষ স্লট ${cqRear} থেকে ঘুরে ইনডেক্স 0-এ ফিরে এল: (5 + 1) % 6 = 0!`);
    } else {
      setMessage(`ENQUEUE: স্লট [${nextRear}]-এ বসানো হচ্ছে: Rear = (Rear + 1) % 6 = ${nextRear}...`);
    }

    setCircularSlots(prev => prev.map((slot, idx) => {
      if (idx === nextRear) {
        return { ...slot, value: valueToAdd, color, state: 'entering' };
      }
      return slot;
    }));
    setCqRear(nextRear);
    setCqCount(prev => prev + 1);

    const nextPreset = (presetIdx + 1) % REAL_WORLD_QUEUE_JOBS.length;
    setPresetIdx(nextPreset);
    setJobInput(REAL_WORLD_QUEUE_JOBS[nextPreset]);

    await delay(750);
    setCircularSlots(prev => prev.map((slot, idx) => idx === nextRear ? { ...slot, state: 'idle' } : slot));
    setMessage(`সফল! "${valueToAdd}" স্লট [${nextRear}]-এ বসেছে (O(1))।`);
    setIsAnimating(false);
  };

  // CIRCULAR QUEUE DEQUEUE
  const handleCircularDequeue = async () => {
    if (isAnimating) return;
    if (cqCount === 0) {
      setMessage('⚠️ CIRCULAR UNDERFLOW! রিং বাফার সম্পূর্ণ খালি।');
      return;
    }

    setIsAnimating(true);
    const leavingVal = circularSlots[cqFront].value;
    const leavingFront = cqFront;
    const nextFront = (cqFront + 1) % MAX_CAPACITY;

    setMessage(`DEQUEUE: Front স্লট [${leavingFront}] থেকে "${leavingVal}" প্রসেস হচ্ছে...`);

    setCircularSlots(prev => prev.map((slot, idx) => idx === leavingFront ? { ...slot, state: 'exiting' } : slot));
    await delay(700);

    setCircularSlots(prev => prev.map((slot, idx) => idx === leavingFront ? { ...slot, value: null, color: '', state: 'idle' } : slot));
    setCqFront(nextFront);
    setCqCount(prev => prev - 1);

    setMessage(`ডি-কিউ সম্পন্ন! স্লট [${leavingFront}] ফাঁকা হলো। নতুন Front ইনডেক্স: ${nextFront}।`);
    setIsAnimating(false);
  };

  // RESET CIRCULAR QUEUE
  const handleResetCircular = () => {
    setCircularSlots([
      { id: 's0', value: 'Print_Ticket', color: JOB_PALETTE[0], state: 'idle' },
      { id: 's1', value: 'Send_OTP', color: JOB_PALETTE[1], state: 'idle' },
      { id: 's2', value: 'Save_Avatar', color: JOB_PALETTE[2], state: 'idle' },
      { id: 's3', value: null, color: '', state: 'idle' },
      { id: 's4', value: null, color: '', state: 'idle' },
      { id: 's5', value: null, color: '', state: 'idle' },
    ]);
    setCqFront(0);
    setCqRear(2);
    setCqCount(3);
    setMessage('সার্কুলার কিউ রিসেট করা হয়েছে। ৩টি প্রাথমিক উপাদান সহ বাফার প্রস্তুত।');
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card (Clean Definition - No Switcher Here) */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
            <ListFilter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              Queue: First-In, First-Out (FIFO) Architecture
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">
              Asynchronous Buffering • Fair Scheduling • O(1) Operations
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          কিউ (Queue) একটি <b>FIFO</b> (First-In, First-Out) ডেটা পাইপলাইন, যেখানে উপাদান প্রবেশ করে পেছনের <b>TAIL</b> (Enqueue) প্রান্তে এবং সবার আগে বের হয় সামনের <b>HEAD</b> (Dequeue) প্রান্ত দিয়ে।
        </p>
      </div>

      {/* 2. Interactive Simulator (Filter Switcher Located Right Inside Simulator Controls) */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls Bar with Switcher & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Toggle: Linear (Default) vs Circular */}
            <div className="flex items-center gap-1 bg-[#090a10] p-1 rounded-lg border border-[#1e2235]">
              <button
                onClick={() => {
                  setQueueMode('linear');
                  setMessage('Linear Queue: সাধারণ একমুখী পাইপলাইন। ফ্রন্ট থেকে বের হয়, টেইল-এ প্রবেশ করে।');
                }}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  queueMode === 'linear'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <ArrowRight className="w-3.5 h-3.5" /> Linear Queue
              </button>
              <button
                onClick={() => {
                  setQueueMode('circular');
                  setMessage('সার্কুলার কিউ (Ring Buffer): মডিউলো (% Capacity) দিয়ে মেমরির রি-সাইক্লিং দেখুন।');
                }}
                disabled={isAnimating}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  queueMode === 'circular'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" /> Circular Queue 🔄
              </button>
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-1.5 bg-[#090a10] px-2.5 py-1 rounded-lg border border-[#1a1c29]">
              <span className="text-[11px] font-mono text-zinc-400">নাম:</span>
              <input
                type="text"
                value={jobInput}
                onChange={e => setJobInput(e.target.value)}
                className="w-32 bg-[#141624] text-cyan-300 text-xs px-2 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Action Buttons */}
            {queueMode === 'circular' ? (
              <>
                <button
                  onClick={handleCircularEnqueue}
                  disabled={isAnimating}
                  className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> ENQUEUE O(1)
                </button>
                <button
                  onClick={handleCircularDequeue}
                  disabled={isAnimating}
                  className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <ArrowRight className="w-3.5 h-3.5" /> DEQUEUE O(1)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLinearEnqueue}
                  disabled={isAnimating}
                  className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-md transition-all disabled:opacity-50"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> ENQUEUE (Tail) O(1)
                </button>
                <button
                  onClick={handleLinearDequeue}
                  disabled={isAnimating}
                  className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md transition-all disabled:opacity-50"
                >
                  <ArrowRight className="w-3.5 h-3.5" /> DEQUEUE (Head) O(1)
                </button>
              </>
            )}
          </div>

          <button
            onClick={queueMode === 'circular' ? handleResetCircular : () => setJobs([])}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-300 border border-[#292c42]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {queueMode === 'circular' ? 'রিসেট বাফার' : 'ক্লিয়ার কিউ'}
          </button>
        </div>

        {/* SIMULATOR CANVAS */}
        {queueMode === 'circular' ? (
          <div className="flex flex-col gap-5">
            {/* Pointer Status Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-[#111322] border border-emerald-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">FRONT (বের হওয়ার মুখ):</span>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  ইনডেক্স [{cqFront}]
                </span>
              </div>
              <div className="bg-[#111322] border border-amber-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">REAR (ঢোকার মুখ):</span>
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  ইনডেক্স [{cqRear}]
                </span>
              </div>
              <div className="bg-[#111322] border border-cyan-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">ব্যবহৃত স্লট:</span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {cqCount} / {MAX_CAPACITY}
                </span>
              </div>
              <div className="bg-[#111322] border border-purple-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">পরবর্তী Enqueue:</span>
                <span className="text-xs font-mono font-bold text-purple-400">
                  ({cqRear} + 1) % 6 = {(cqRear + 1) % 6}
                </span>
              </div>
            </div>

            {/* Circular Orbit & Linear Ring Buffer Representation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Left/Center: 360-Degree Circular Visual Ring */}
              <div className="lg:col-span-6 relative w-full h-[340px] flex items-center justify-center bg-[#090a10] rounded-2xl border border-[#1e2235] p-4 overflow-hidden select-none">
                {/* Background Rotating Guide Circle */}
                <div className="absolute w-[220px] h-[220px] rounded-full border-2 border-dashed border-amber-500/20 flex items-center justify-center pointer-events-none animate-spin-slow">
                  <div className="w-3 h-3 rounded-full bg-amber-500/40 absolute -top-1.5" />
                </div>

                {/* Center Hub */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#121422] to-[#0a0b12] border border-[#2b304c] flex flex-col items-center justify-center text-center p-2 z-10 shadow-xl shadow-black/60">
                  <Repeat className="w-5 h-5 text-amber-400 mb-0.5 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-amber-300">Modulo % 6</span>
                  <span className="text-[9px] font-mono text-zinc-400">Ring Buffer</span>
                </div>

                {/* 6 Circularly Distributed Slots */}
                {circularSlots.map((slot, idx) => {
                  const angleDeg = idx * 60 - 90; // 0 deg is at top
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const radius = 108; // px
                  const x = radius * Math.cos(angleRad);
                  const y = radius * Math.sin(angleRad);

                  const isFront = cqCount > 0 && idx === cqFront;
                  const isRear = cqCount > 0 && idx === cqRear;
                  const isOccupied = slot.value !== null;

                  let borderCls = 'border-[#262a40] bg-[#10121d]';
                  if (slot.state === 'entering') {
                    borderCls = 'border-amber-400 bg-amber-500/20 scale-110 shadow-lg shadow-amber-500/30';
                  } else if (slot.state === 'exiting') {
                    borderCls = 'border-red-400 bg-red-500/20 scale-90 opacity-40';
                  } else if (isOccupied) {
                    borderCls = 'border-cyan-500/50 bg-[#12182b]';
                  }

                  return (
                    <div
                      key={slot.id}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className={`absolute w-24 h-14 rounded-xl border flex flex-col items-center justify-center transition-all duration-500 z-20 shadow-md p-1 ${borderCls}`}
                    >
                      <div className="flex items-center justify-between w-full px-1 text-[9px] font-mono">
                        <span className="text-zinc-500 font-bold">[{idx}]</span>
                        <div className="flex items-center gap-0.5">
                          {isFront && (
                            <span className="px-1 py-0.2 rounded bg-emerald-500 text-slate-950 font-bold text-[8px] leading-tight">
                              F
                            </span>
                          )}
                          {isRear && (
                            <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[8px] leading-tight">
                              R
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="truncate w-full text-center text-[10px] font-mono font-bold mt-0.5">
                        {isOccupied ? (
                          <span className="text-cyan-300">{slot.value}</span>
                        ) : (
                          <span className="text-zinc-600 font-normal italic">খালি (FREE)</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Underlying Array View & Modulo Explanation */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                <div className="bg-[#090a10] border border-[#1a1d2e] p-4 rounded-xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      মেমরিতে 1D Contiguous Array চিত্র:
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Array[6]</span>
                  </div>

                  {/* 1D Array Slots */}
                  <div className="grid grid-cols-6 gap-1.5 bg-[#111320] p-2.5 rounded-lg border border-[#1f2336]">
                    {circularSlots.map((slot, idx) => {
                      const isFront = cqCount > 0 && idx === cqFront;
                      const isRear = cqCount > 0 && idx === cqRear;
                      const isOccupied = slot.value !== null;

                      return (
                        <div key={'arr_' + idx} className="flex flex-col items-center gap-1">
                          <span className="text-[9px] font-mono text-zinc-400">[{idx}]</span>
                          <div
                            className={`w-full h-12 rounded-lg border flex flex-col items-center justify-center p-1 text-center transition-all ${
                              isOccupied
                                ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-bold'
                                : 'bg-black/40 border-zinc-800 text-zinc-600'
                            } ${isFront ? 'ring-2 ring-emerald-400' : ''} ${isRear ? 'ring-2 ring-amber-400' : ''}`}
                          >
                            <span className="text-[9px] font-mono truncate w-full">
                              {isOccupied ? slot.value : '—'}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5 items-center min-h-[28px]">
                            {isFront && (
                              <span className="text-[8px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1 rounded">
                                Front
                              </span>
                            )}
                            {isRear && (
                              <span className="text-[8px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 rounded">
                                Rear
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation card of recycling */}
                  <div className="text-[11px] text-zinc-300 bg-[#121524] p-3 rounded-lg border border-[#20253d] flex flex-col gap-1.5 leading-relaxed">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      কীভাবে মেমরি রি-সাইকেল হয়?
                    </div>
                    <p className="text-zinc-400 text-[11px]">
                      লিনিয়ার কিউতে ডিকিউ করার পর মেমরি অপচয় (False Overflow) হতো। সার্কুলার কিউতে <code className="text-cyan-300 font-mono">(Rear + 1) % 6</code> সূত্র দিয়ে টেল ৫ থেকে ঘুরে শূন্য ইনডেক্সে এসে খালি স্লট পুনরায় ব্যবহার করে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* LINEAR QUEUE VIEW (DEFAULT) */
          <div className="min-h-[160px] bg-[#090a10] rounded-xl border border-[#1a1d2e] p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-2">
              <span className="text-emerald-400 flex items-center gap-1">
                ▼ HEAD (Next to Exit)
              </span>
              <span className="text-cyan-400 flex items-center gap-1">
                TAIL (Next to Enter) ▲
              </span>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto p-5 rounded-xl border border-[#22273d] bg-[#111320]/80 min-h-[110px]">
              {jobs.length === 0 ? (
                <div className="w-full text-center text-xs font-mono text-zinc-600 py-4">
                  কিউ বর্তমানে খালি। ওপরের Enqueue বাটন দিয়ে জব যুক্ত করুন।
                </div>
              ) : (
                jobs.map((job, idx) => {
                  const isHead = idx === 0;
                  const isTail = idx === jobs.length - 1;

                  let animStyle = 'transition-all duration-500';
                  if (job.state === 'entering') {
                    animStyle = 'translate-x-10 opacity-30 scale-90 transition-all duration-500';
                  } else if (job.state === 'exiting') {
                    animStyle = '-translate-x-16 opacity-0 scale-90 transition-all duration-600';
                  }

                  return (
                    <div
                      key={job.id}
                      className={`flex flex-col items-center gap-1.5 shrink-0 ${animStyle}`}
                    >
                      <div
                        className={`px-3.5 py-2.5 rounded-xl border bg-gradient-to-r ${job.color} text-slate-950 font-mono text-xs font-bold shadow-lg min-w-[120px] text-center transition-all duration-300 ${
                          isHead ? 'ring-4 ring-emerald-400/40 scale-105 shadow-emerald-500/20' : ''
                        }`}
                      >
                        <div className="text-[9px] uppercase tracking-wider opacity-80 font-extrabold mb-0.5">
                          {isHead ? 'HEAD (১ম বের)' : isTail ? 'TAIL (শেষ)' : `#${idx + 1}`}
                        </div>
                        <div className="truncate text-xs font-semibold">{job.name}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Live Feedback Banner */}
        <div className="p-3.5 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-cyan-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. CONCISE & ULTRA-CLEAN COMPARISON: Circular Queue vs Circular Linked List */}
      <div className="bg-[#0f111a] border border-[#23273e] p-5 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-bold">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">
                Circular Queue বনাম Circular Linked List — একনজরে মূল পার্থক্য
              </h3>
              <span className="text-[10px] font-mono text-zinc-400">
                দুটোই চক্রাকার, কিন্তু গঠন ও ব্যবহারের ধরন ভিন্ন
              </span>
            </div>
          </div>
        </div>

        {/* 4 Clean Visual Comparison Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Circular Queue (Ring Buffer) */}
          <div className="bg-[#0b0c16] border border-amber-500/25 p-4 rounded-xl flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-amber-500/20">
              <span className="text-xs font-bold font-mono text-amber-300 flex items-center gap-1.5">
                <CircleDot className="w-3.5 h-3.5 text-amber-400" /> Circular Queue (রিং বাফার)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                অ্যারে + মডিউলো
              </span>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">মেমরি:</span>
                <span className="font-mono font-bold text-zinc-200">ফিক্সড অ্যারে (RAM ব্লক)</span>
              </div>
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">চক্রাকার লজিক:</span>
                <span className="font-mono font-bold text-amber-300">(i + 1) % N গণিত</span>
              </div>
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">এক্সেস নিয়ম:</span>
                <span className="font-mono font-bold text-zinc-200">কঠোর FIFO (Front & Rear)</span>
              </div>
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">মেমরি খরচ:</span>
                <span className="font-mono font-bold text-emerald-400">০ অতিরিক্ত পয়েন্টার (দ্রুত ক্যাশ)</span>
              </div>
            </div>
          </div>

          {/* Circular Linked List */}
          <div className="bg-[#0b0c16] border border-cyan-500/25 p-4 rounded-xl flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
              <span className="text-xs font-bold font-mono text-cyan-300 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> Circular Linked List
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                নোড পয়েন্টার
              </span>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">মেমরি:</span>
                <span className="font-mono font-bold text-zinc-200">ডায়নামিক নোড (হিপ মেমরি)</span>
              </div>
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">চক্রাকার লজিক:</span>
                <span className="font-mono font-bold text-cyan-300">Tail.next = Head পয়েন্টার</span>
              </div>
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">এক্সেস নিয়ম:</span>
                <span className="font-mono font-bold text-zinc-200">যেকোনো নোডে অবাধ যাতায়াত</span>
              </div>
              <div className="flex items-center justify-between bg-[#121422] p-2 rounded-lg border border-[#1d2238]">
                <span className="text-zinc-400 text-[11px]">মেমরি খরচ:</span>
                <span className="font-mono font-bold text-amber-300">প্রতি নোডে পয়েন্টার ওভারহেড</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="কিউ (Queue - FIFO)"
        scenarios={[
          {
            title: "১. টিকিট কাউন্টার বা ব্যাংকের লাইন (Ticket Counter Line)",
            subtitle: "আগে আসলে আগে পাবেন নীতি (First-Come, First-Served)",
            badge: "FIFO দৃশ্যপট",
            visualTag: "First-In, First-Out",
            accentColor: "cyan",
            analogy:
              "সিনেমার টিকিট কাউন্টারে যে দর্শক সবার আগে লাইনে দাঁড়িয়েছেন (HEAD), টিকিট মাস্টার সবার আগে তাঁকেই টিকিট দিয়ে বিদায় করেন (Dequeue)। নতুন যে দর্শক আসেন, তিনি লাইনের পেছনে (TAIL) যুক্ত হন (Enqueue)।",
            whyItFits:
              "কিউয়ের প্রধান নীতি হলো ন্যায্যতা (Fairness)। যে ডাটা বা প্রসেস আগে লাইনে আসবে, রিসোর্স সবার আগে সে-ই পাবে।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300 py-1">
                <span className="px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold border border-emerald-400">১ম ব্যক্তি (HEAD ➔ বের হচ্ছে)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-800">২য় ব্যক্তি</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-800">নতুন আসা (TAIL)</span>
              </div>
            ),
          },
          {
            title: "২. ট্রাফিক সিগন্যালের রাউন্ড-রবিন ও সার্কুলার রিং বাফার",
            subtitle: "ধারাবাহিক ঘূর্ণমান সাইকেল (Circular Ring Flow)",
            badge: "Ring Buffer",
            visualTag: "Continuous Recycling",
            accentColor: "amber",
            analogy:
              "৪ রাস্তার মোড়ের ট্রাফিক সিগন্যালে উত্তর ➔ পূর্ব ➔ দক্ষিণ ➔ পশ্চিম পর্যায়ক্রমে সবুজ বাতি পায়। পশ্চিম শেষ হওয়ার পর আবার উত্তরে ফিরে আসে। সার্কুলার কিউ ঠিক এভাবেই শেষ স্লট পার হয়ে শূন্য ইনডেক্সে ঘুরে আসে।",
            whyItFits:
              "কম্পিউটার অপারেটিং সিস্টেমে CPU Round-Robin প্রসেস শিডিউলিং করতে সার্কুলার কিউ ব্যবহার করা হয়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300 py-1">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">উত্তর [০]</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">পূর্ব [১]</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">দক্ষিণ [২]</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">পশ্চিম [৩]</span>
                <span>↺</span>
              </div>
            ),
          },
        ]}
      />

      {/* 5. Real World Applications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Server className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold text-zinc-200">1. LLM API Rate Limiter</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            When multiple requests arrive, they wait in a FIFO queue to prevent rate limit spikes.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Clock className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-zinc-200">2. Message Brokers (Kafka / RabbitMQ)</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Producer enqueues events; background workers dequeue and process them asynchronously.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-bold text-zinc-200">3. OS Audio & Device Ring Buffers</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Sound cards and network chips stream data in fixed circular ring buffers with zero reallocation.
          </p>
        </div>
      </div>
    </div>
  );
}
