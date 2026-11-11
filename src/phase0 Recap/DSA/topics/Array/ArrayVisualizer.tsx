'use client';

import React, { useState, useRef } from 'react';
import {
  Search,
  PlusCircle,
  Trash2,
  Crosshair,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface CellItem {
  val: number | null;
  state: 'idle' | 'focus' | 'comparing' | 'found' | 'shifting-right' | 'shifting-left' | 'target-vacant';
}

const INITIAL_ARRAY = [25, 42, 18, 93, 56, 37];
const BASE_ADDRESS = 0x1000;
const ELEMENT_SIZE = 4; // 4 bytes

export default function ArrayVisualizer() {
  const [cells, setCells] = useState<CellItem[]>(() =>
    INITIAL_ARRAY.map((v) => ({ val: v, state: 'idle' }))
  );
  const [accessIdx, setAccessIdx] = useState<number>(2);
  const [searchVal, setSearchVal] = useState<number>(93);
  const [insertVal, setInsertVal] = useState<number>(77);
  const [insertIdx, setInsertIdx] = useState<number>(2);
  const [deleteIdx, setDeleteIdx] = useState<number>(2);

  // Animation & Feedback state
  const [activeCellIdx, setActiveCellIdx] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>(
    'অ্যারে প্রস্তুত। ইনসার্ট, ডিলিট বা সার্চে ক্লিক করলেই লাইভ শিফটিং অ্যানিমেশন সরাসরি দেখতে পাবেন।'
  );
  const [complexityTag, setComplexityTag] = useState<string>('Ready');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // 1. DIRECT ACCESS O(1)
  const handleAccess = async () => {
    if (isAnimating || cells.length === 0) return;
    setIsAnimating(true);
    const k = Math.max(0, Math.min(cells.length - 1, accessIdx));
    const targetAddr = `0x${(BASE_ADDRESS + k * ELEMENT_SIZE).toString(16).toUpperCase()}`;

    setCells((prev) =>
      prev.map((c, idx) => ({ ...c, state: idx === k ? 'found' : 'idle' }))
    );
    setActiveCellIdx(k);
    setComplexityTag('O(1) Constant Time');
    setStatusMessage(
      `সরাসরি ইনডেক্স অ্যাক্সেস: সূত্র Base (0x1000) + [${k} × 4 Bytes] = ${targetAddr}। কোন খোঁজাখুঁজি ছাড়াই O(1) সময়ে ${cells[k].val} পাওয়া গেছে!`
    );

    await delay(1800);
    setCells((prev) => prev.map((c) => ({ ...c, state: 'idle' })));
    setActiveCellIdx(null);
    setIsAnimating(false);
  };

  // 2. SEARCH BY VALUE O(N)
  const handleSearch = async () => {
    if (isAnimating || cells.length === 0) return;
    setIsAnimating(true);
    setComplexityTag('O(N) Linear Scan');
    setStatusMessage(`সার্চ শুরু: ${searchVal} খুঁজতে এক এক করে প্রতিটি ঘরে তাকানো হচ্ছে...`);

    let found = false;
    for (let i = 0; i < cells.length; i++) {
      setActiveCellIdx(i);
      setCells((prev) =>
        prev.map((c, idx) => ({ ...c, state: idx === i ? 'comparing' : 'idle' }))
      );
      setStatusMessage(`ঘর [${i}] চেক করা হচ্ছে: মান ${cells[i].val}...`);

      if (cells[i].val === searchVal) {
        await delay(1100);
        setCells((prev) =>
          prev.map((c, idx) => ({ ...c, state: idx === i ? 'found' : 'idle' }))
        );
        setStatusMessage(`মিলে গেছে! ইনডেক্স [${i}]-এ কাঙ্ক্ষিত মান ${searchVal} পাওয়া গেছে। মোট ধাপ: ${i + 1}টি।`);
        found = true;
        break;
      }
      await delay(1000);
    }

    if (!found) {
      setCells((prev) => prev.map((c) => ({ ...c, state: 'idle' })));
      setStatusMessage(`মান ${searchVal} এই অ্যারেতে নেই। Worst Case: পুরো অ্যারে চেক করতে হয়েছে O(N)।`);
    }

    await delay(1800);
    setCells((prev) => prev.map((c) => ({ ...c, state: 'idle' })));
    setActiveCellIdx(null);
    setIsAnimating(false);
  };

  // 3. INSERTION WITH RIGHT SHIFTING O(N)
  const handleInsert = async () => {
    if (isAnimating) return;
    if (cells.length >= 8) {
      setStatusMessage('অ্যারের সাইজ পূর্ণ (সর্বোচ্চ ৮টি দেখানো হচ্ছে)। কিছু ডিলিট করে চেষ্টা করুন।');
      return;
    }

    setIsAnimating(true);
    const k = Math.max(0, Math.min(cells.length, insertIdx));
    setComplexityTag('O(N) Shifting');
    setStatusMessage(
      `ইনসার্ট [${k}]: ইনডেক্স ${k}-এ ${insertVal} ঢোকাতে হবে। তাই শেষের উপাদান থেকে এক এক করে ডানে সরাতে হবে!`
    );
    await delay(1200);

    // Expand working copy with an empty slot at the end
    let working: CellItem[] = [...cells, { val: null, state: 'idle' }];
    setCells([...working]);

    // Animate shifting from end down to k
    for (let i = working.length - 2; i >= k; i--) {
      setActiveCellIdx(i);
      // Highlight the movement
      working[i].state = 'shifting-right';
      setCells([...working]);
      setStatusMessage(`ডানে শিফটিং: [${i}] এর মান ${working[i].val} এক ঘর ডানে [${i + 1}]-এ যাচ্ছে...`);
      await delay(1100);

      // Move value to i + 1, make i vacant
      working[i + 1] = { val: working[i].val, state: 'idle' };
      working[i] = { val: null, state: 'target-vacant' };
      setCells([...working]);
      await delay(400);
    }

    // Now insert the new value into the open slot at k
    setActiveCellIdx(k);
    working[k] = { val: insertVal, state: 'found' };
    setCells([...working]);
    setStatusMessage(`সফল! ইনডেক্স [${k}] ফাঁকা হয়ে যাওয়ায় সেখানে ${insertVal} বসানো হলো।`);

    await delay(1600);
    setCells(working.map((c) => ({ ...c, state: 'idle' })));
    setActiveCellIdx(null);
    setIsAnimating(false);
  };

  // 4. DELETION WITH STEP-BY-STEP LEFT SHIFTING O(N)
  const handleDelete = async () => {
    if (isAnimating || cells.length === 0) return;
    setIsAnimating(true);
    const k = Math.max(0, Math.min(cells.length - 1, deleteIdx));
    const deletedVal = cells[k].val;
    setComplexityTag('O(N) Shifting');

    let working: CellItem[] = [...cells];

    // Step 1: Vacate the targeted index (show blank gap)
    setActiveCellIdx(k);
    working[k] = { val: null, state: 'target-vacant' };
    setCells([...working]);
    setStatusMessage(
      `ধাপ ১ (মুছে ফেলা): ইনডেক্স [${k}] এর মান ${deletedVal} মেমরি থেকে মুছে দেওয়া হলো। এখন এই ঘরটি ফাঁকা (Vacant)!`
    );
    await delay(1400);

    // Step 2: Animate shifting each subsequent element one by one to the left
    for (let i = k + 1; i < working.length; i++) {
      const movingVal = working[i].val;
      setActiveCellIdx(i);

      // Show upcoming cell preparing to shift left
      working[i].state = 'shifting-left';
      setCells([...working]);
      setStatusMessage(
        `ধাপ ২ (বাঁয়ে শিফট): ইনডেক্স [${i}] এর মান ${movingVal} বাঁয়ের ফাঁকা ঘর [${i - 1}]-এ সরে আসছে...`
      );
      await delay(1200);

      // Actual shift into previous slot; current slot becomes vacant
      working[i - 1] = { val: movingVal, state: 'idle' };
      working[i] = { val: null, state: 'target-vacant' };
      setCells([...working]);
      await delay(500);
    }

    // Step 3: Remove the final vacant slot from the array tail
    working.pop();
    setCells(working.map((c) => ({ ...c, state: 'idle' })));
    setActiveCellIdx(null);
    setStatusMessage(`ডিলিট ও শিফটিং সম্পন্ন! ফাঁকা স্থান পূরণ হয়ে অ্যারের নতুন সাইজ: ${working.length}।`);

    await delay(1500);
    setIsAnimating(false);
  };

  const handleReset = () => {
    if (isAnimating) return;
    setCells(INITIAL_ARRAY.map((v) => ({ val: v, state: 'idle' })));
    setActiveCellIdx(null);
    setStatusMessage('অ্যারে ডিফল্ট অবস্থায় রিসেট করা হয়েছে।');
    setComplexityTag('Ready');
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Visual Array Stage */}
      <div className="rounded-2xl border border-[#1e2235] bg-[#0c0d15] p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            মেমোরিতে উপাদান ও শিফটিং দৃশ্যপট
          </span>
          <div className="flex items-center gap-3 text-zinc-400">
            <span>উপাদান সংখ্যা: <span className="text-amber-400 font-bold">{cells.filter(c => c.val !== null).length}</span></span>
            <button
              onClick={handleReset}
              disabled={isAnimating}
              className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#161826] hover:bg-[#202336] text-zinc-300 border border-[#2b3047] disabled:opacity-40"
            >
              <RotateCcw className="w-3 h-3" /> রিসেট
            </button>
          </div>
        </div>

        {/* The Array Grid */}
        <div className="overflow-x-auto py-4">
          <div className="flex items-end justify-center sm:justify-start gap-2.5 min-w-max px-2">
            {cells.map((cell, idx) => {
              const state = cell.state;
              const isPointer = activeCellIdx === idx;
              const hexAddr = `0x${(BASE_ADDRESS + idx * ELEMENT_SIZE).toString(16).toUpperCase()}`;

              let boxStyle = 'bg-[#121422] border-[#22263d] text-zinc-100';
              let badge = '';

              if (state === 'target-vacant') {
                boxStyle = 'bg-rose-950/20 border-dashed border-rose-500/60 text-rose-400 animate-pulse';
                badge = 'ফাঁকা ঘর';
              } else if (state === 'found') {
                boxStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20 scale-105';
                badge = 'লক্ষ্য';
              } else if (state === 'comparing') {
                boxStyle = 'bg-amber-950/80 border-amber-400 text-amber-300 scale-105';
                badge = 'চেক হচ্ছে';
              } else if (state === 'shifting-right') {
                boxStyle = 'bg-orange-950/80 border-orange-500 text-orange-300 translate-x-2 transition-transform';
                badge = 'ডানে শিফট ➔';
              } else if (state === 'shifting-left') {
                boxStyle = 'bg-blue-950/80 border-blue-500 text-blue-300 -translate-x-3 transition-transform duration-500';
                badge = '⬅ বাঁয়ে শিফট';
              }

              return (
                <div key={idx} className="flex flex-col items-center relative transition-all duration-300">
                  {/* Active Pointer */}
                  {isPointer && (
                    <div className="absolute -top-6 flex flex-col items-center z-10 animate-bounce">
                      <span className="text-[9px] font-mono px-1 rounded bg-amber-400 text-slate-950 font-bold">
                        i={idx}
                      </span>
                      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-amber-400" />
                    </div>
                  )}

                  {/* Top Index */}
                  <span className="text-[11px] font-mono text-zinc-500 mb-1 font-semibold">[{idx}]</span>

                  {/* Cell Box */}
                  <div
                    className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${boxStyle}`}
                  >
                    <span className="text-base font-bold font-mono">
                      {cell.val !== null ? cell.val : '—'}
                    </span>
                    {badge && (
                      <span className="text-[7.5px] font-mono tracking-tight font-semibold mt-0.5 opacity-90">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Address */}
                  <span className="text-[9px] font-mono text-zinc-500 mt-1">{hexAddr}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Status Banner */}
        <div className="bg-[#090a10] border border-[#1b1e2e] p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
          <p className="text-zinc-200 text-xs sm:text-sm font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            {statusMessage}
          </p>
          <span className="shrink-0 px-2 py-0.5 rounded font-mono text-[10px] bg-[#141624] text-amber-300 border border-amber-500/30">
            {complexityTag}
          </span>
        </div>
      </div>

      {/* Direct One-Click Operation Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* 1. Direct Access */}
        <div className="bg-[#0f111a] border border-[#1e2233] p-3 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              অ্যাক্সেস (Index)
            </span>
            <span className="text-[9px] font-mono px-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
              O(1)
            </span>
          </div>
          <div className="flex items-end gap-1.5">
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-mono text-zinc-400 font-medium">ইনডেক্স (Idx)</label>
              <input
                type="number"
                min={0}
                max={Math.max(0, cells.length - 1)}
                value={accessIdx}
                disabled={isAnimating}
                onChange={(e) => setAccessIdx(parseInt(e.target.value) || 0)}
                className="w-16 bg-[#08090f] border border-[#25293d] rounded p-1 text-xs font-mono text-zinc-100 text-center focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleAccess}
              disabled={isAnimating}
              className="flex-1 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium disabled:opacity-40 transition-colors h-[26px]"
            >
              মান দেখুন
            </button>
          </div>
        </div>

        {/* 2. Search */}
        <div className="bg-[#0f111a] border border-[#1e2233] p-3 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-amber-400" />
              সার্চ (Value)
            </span>
            <span className="text-[9px] font-mono px-1 rounded bg-amber-950/60 text-amber-400 border border-amber-800">
              O(N)
            </span>
          </div>
          <div className="flex items-end gap-1.5">
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-mono text-zinc-400 font-medium">টার্গেট মান (Val)</label>
              <input
                type="number"
                value={searchVal}
                disabled={isAnimating}
                onChange={(e) => setSearchVal(parseInt(e.target.value) || 0)}
                className="w-16 bg-[#08090f] border border-[#25293d] rounded p-1 text-xs font-mono text-zinc-100 text-center focus:border-amber-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isAnimating}
              className="flex-1 py-1 rounded bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium disabled:opacity-40 transition-colors h-[26px]"
            >
              খুঁজুন
            </button>
          </div>
        </div>

        {/* 3. Insert */}
        <div className="bg-[#0f111a] border border-[#1e2233] p-3 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
              ইনসার্ট (ডানে শিফট)
            </span>
            <span className="text-[9px] font-mono px-1 rounded bg-sky-950/60 text-sky-400 border border-sky-800">
              O(N)
            </span>
          </div>
          <div className="flex items-end gap-1.5">
            {/* Value Input */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-mono text-zinc-400 font-medium">মান (Val)</label>
              <input
                type="number"
                value={insertVal}
                disabled={isAnimating}
                onChange={(e) => setInsertVal(parseInt(e.target.value) || 0)}
                className="w-14 bg-[#08090f] border border-[#25293d] rounded p-1 text-xs font-mono text-zinc-100 text-center focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* At Separator */}
            <span className="text-[10px] font-mono text-zinc-500 pb-1">@</span>

            {/* Index Input */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-mono text-zinc-400 font-medium">ইনডেক্স (Idx)</label>
              <input
                type="number"
                min={0}
                max={cells.length}
                value={insertIdx}
                disabled={isAnimating}
                onChange={(e) => setInsertIdx(parseInt(e.target.value) || 0)}
                className="w-14 bg-[#08090f] border border-[#25293d] rounded p-1 text-xs font-mono text-zinc-100 text-center focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleInsert}
              disabled={isAnimating}
              className="flex-1 py-1 rounded bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-mono font-medium disabled:opacity-40 transition-colors h-[26px]"
            >
              যোগ
            </button>
          </div>
        </div>

        {/* 4. Delete */}
        <div className="bg-[#0f111a] border border-[#1e2233] p-3 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              ডিলিট (বাঁয়ে শিফট)
            </span>
            <span className="text-[9px] font-mono px-1 rounded bg-rose-950/60 text-rose-400 border border-rose-800">
              O(N)
            </span>
          </div>
          <div className="flex items-end gap-1.5">
            <div className="flex flex-col gap-0.5">
              <label className="text-[9px] font-mono text-zinc-400 font-medium">ইনডেক্স (Idx)</label>
              <input
                type="number"
                min={0}
                max={Math.max(0, cells.length - 1)}
                value={deleteIdx}
                disabled={isAnimating}
                onChange={(e) => setDeleteIdx(parseInt(e.target.value) || 0)}
                className="w-16 bg-[#08090f] border border-[#25293d] rounded p-1 text-xs font-mono text-zinc-100 text-center focus:border-rose-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleDelete}
              disabled={isAnimating}
              className="flex-1 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-mono font-medium disabled:opacity-40 transition-colors h-[26px]"
            >
              মুছুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
