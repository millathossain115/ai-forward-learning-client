'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import {
  TableMode,
  ChainItem,
  LinearSlot,
  PipelineState,
  BUCKET_COUNT,
  PRESET_ENTRIES,
  INITIAL_CHAIN_BUCKETS,
  INITIAL_PROBING_SLOTS
} from './types';
import { computeHash } from './utils/hashUtils';
import HashPipelineBanner from './components/HashPipelineBanner';
import ChainingVisualizer from './components/ChainingVisualizer';
import HashTableOverview from './components/HashTableOverview';
import HashTableModeCard from './components/HashTableModeCard';
import HashTableControls from './components/HashTableControls';

const LinearProbingVisualizer = dynamic(() => import('./components/LinearProbingVisualizer'), {
  loading: () => (
    <div className="h-64 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
      Loading linear probing...
    </div>
  )
});
const HashSetVisualizer = dynamic(() => import('./components/HashSetVisualizer'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
      Loading hash set...
    </div>
  )
});
const HashTableRealWorld = dynamic(() => import('./components/HashTableRealWorld'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
      Loading scenarios...
    </div>
  )
});

export default function HashTableTopic() {
  const [tableMode, setTableMode] = useState<TableMode>('chaining');

  const [chainBuckets, setChainBuckets] = useState<ChainItem[][]>(INITIAL_CHAIN_BUCKETS);
  const [probingSlots, setProbingSlots] = useState<LinearSlot[]>(INITIAL_PROBING_SLOTS);
  const [setKeys, setSetKeys] = useState<string[]>(['token', 'admin', 'roll:42', 'priya', 'rahul']);

  // Separate Inputs for INSERT
  const [inputKey, setInputKey] = useState('sabbir');
  const [inputVal, setInputVal] = useState('01912-1122');
  const [insertPresetIdx, setInsertPresetIdx] = useState(0);

  // Dedicated Input for SEARCH
  const [searchKey, setSearchKey] = useState('token');

  const [message, setMessage] = useState(
    'Hash Table প্রস্তুত। বাকেট [0]-এ token ও admin-এর রিয়েল কলিশন চেইন লক্ষ্য করুন।'
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [pipelineState, setPipelineState] = useState<PipelineState>({});

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // Helper: Get list of currently stored keys for cycling search
  const getExistingKeys = (): string[] => {
    if (tableMode === 'chaining') {
      const keys = chainBuckets.flatMap((b) => b.map((item) => item.key));
      return keys.length > 0 ? keys : ['token'];
    } else if (tableMode === 'probing') {
      const keys = probingSlots.filter((s) => s.key !== null).map((s) => s.key as string);
      return keys.length > 0 ? keys : ['token'];
    } else {
      return setKeys.length > 0 ? setKeys : ['token'];
    }
  };

  // STEP-BY-STEP INSERT / PUT
  const handlePut = async () => {
    if (isAnimating || !inputKey.trim()) return;
    setIsAnimating(true);

    const key = inputKey.trim();
    const val = inputVal.trim() || 'True';
    const { rawHash, bucketIndex } = computeHash(key);

    // Step 1: Hash Calculation Pipeline
    setPipelineState({ key, rawHash, bucketIndex, step: '১. হ্যাশ গণনা' });
    setMessage(`ইনসার্ট: hash("${key}") = ${rawHash} % 7 ➔ বাকেট [${bucketIndex}]`);
    await delay(1000);

    // Advance Insert Presets
    const nextP = (insertPresetIdx + 1) % PRESET_ENTRIES.length;
    setInsertPresetIdx(nextP);
    setInputKey(PRESET_ENTRIES[nextP].key);
    setInputVal(PRESET_ENTRIES[nextP].val);
    setSearchKey(key);

    // --- CASE A: CHAINING MODE ---
    if (tableMode === 'chaining') {
      setPipelineState({ key, rawHash, bucketIndex, step: `২. বাকেট [${bucketIndex}]` });
      const currentChain = chainBuckets[bucketIndex];
      const hasCollision = currentChain.length > 0;

      if (hasCollision) {
        setMessage(
          `⚠️ কলিশন শনাক্ত! বাকেট [${bucketIndex}]-এ আগেই ডেটা রয়েছে। চেইনিংয়ের মাধ্যমে লিংকড লিস্টে যুক্ত হচ্ছে...`
        );
      } else {
        setMessage(`বাকেট [${bucketIndex}] ফাঁকা। সরাসরি O(1) সময়ে ইনসার্ট হচ্ছে...`);
      }
      await delay(1000);

      const existsIdx = currentChain.findIndex((item) => item.key === key);
      let updatedBuckets: ChainItem[][];

      if (existsIdx >= 0) {
        updatedBuckets = chainBuckets.map((b, i) =>
          i === bucketIndex
            ? b.map((item, idx) => (idx === existsIdx ? { ...item, value: val, state: 'inserted' } : item))
            : b
        );
        setMessage(`কি "${key}" আগেই ছিল, মান আপডেট করে "${val}" করা হলো।`);
      } else {
        const newItem: ChainItem = { id: Date.now().toString(), key, value: val, state: 'inserted' };
        updatedBuckets = chainBuckets.map((b, i) => (i === bucketIndex ? [...b, newItem] : b));
        setMessage(`সফল! বাকেট [${bucketIndex}]-এ ("${key}" ➔ "${val}") যুক্ত হয়েছে (O(1) Time)।`);
      }

      setChainBuckets(updatedBuckets);
      await delay(1100);
      setChainBuckets((prev) => prev.map((b) => b.map((item) => ({ ...item, state: 'idle' }))));
    }

    // --- CASE B: LINEAR PROBING MODE ---
    else if (tableMode === 'probing') {
      let probeIdx = bucketIndex;
      let probes = 0;
      let placed = false;

      while (probes < BUCKET_COUNT) {
        const slot = probingSlots[probeIdx];
        setPipelineState({ key, rawHash, bucketIndex: probeIdx, step: `স্লট [${probeIdx}] চেক` });

        if (slot.key === null || slot.key === key) {
          setMessage(
            `স্লট [${probeIdx}] খালি পাওয়া গেছে! এখানে ("${key}" ➔ "${val}") সংরক্ষণ করা হলো।`
          );
          const newSlots = [...probingSlots];
          newSlots[probeIdx] = { key, value: val, state: 'inserted' };
          setProbingSlots(newSlots);
          placed = true;
          await delay(1100);
          break;
        } else {
          setMessage(
            `স্লট [${probeIdx}] পূর্ণ ("${slot.key}")! কলিশন ➔ পরবর্তী স্লট [(probe + 1) % 7] চেক...`
          );
          const newSlots = [...probingSlots];
          newSlots[probeIdx] = { ...newSlots[probeIdx], state: 'collision' };
          setProbingSlots(newSlots);
          await delay(1100);
          probeIdx = (probeIdx + 1) % BUCKET_COUNT;
          probes++;
        }
      }

      if (!placed) {
        setMessage('⚠️ টেবিল পূর্ণ! কোনো খালি স্লট পাওয়া যায়নি (Table Overflow)।');
      }

      await delay(700);
      setProbingSlots((prev) => prev.map((s) => ({ ...s, state: 'idle' })));
    }

    // --- CASE C: HASH SET MODE ---
    else if (tableMode === 'set') {
      if (setKeys.includes(key)) {
        setMessage(`❌ সেট ডুপ্লিকেট রিজেক্ট করেছে! "${key}" কি-টি সেটে আগেই আছে।`);
      } else {
        setSetKeys((prev) => [...prev, key]);
        setMessage(`✅ ইউনিক কি হিসেবে "${key}" সফলভাবে সেটে যুক্ত করা হলো।`);
      }
      await delay(1100);
    }

    setPipelineState({});
    setIsAnimating(false);
  };

  // STEP-BY-STEP SEARCH / GET
  const handleSearch = async () => {
    if (isAnimating || !searchKey.trim()) return;
    setIsAnimating(true);

    const key = searchKey.trim();
    const { rawHash, bucketIndex } = computeHash(key);

    // Step 1: Calculate hash
    setPipelineState({ key, rawHash, bucketIndex, step: '১. হ্যাশ গণনা' });
    setMessage(`সার্চ: hash("${key}") = ${rawHash} % 7 ➔ বাকেট [${bucketIndex}] লক্ষ্য করা হলো...`);
    await delay(1000);

    // Chaining Search
    if (tableMode === 'chaining') {
      const bucket = chainBuckets[bucketIndex];

      if (bucket.length === 0) {
        setMessage(`❌ পাওয়া যায়নি! বাকেট [${bucketIndex}] সম্পূর্ণ খালি (NULL)।`);
        await delay(1400);
      } else {
        let matchFound = false;
        for (let i = 0; i < bucket.length; i++) {
          const item = bucket[i];
          setPipelineState({
            key,
            rawHash,
            bucketIndex,
            step: `চেইন আইটেম [${i + 1}/${bucket.length}] চেক`
          });

          if (item.key === key) {
            setChainBuckets((prev) =>
              prev.map((b, bI) =>
                bI === bucketIndex
                  ? b.map((it, itI) => (itI === i ? { ...it, state: 'found' } : it))
                  : b
              )
            );
            setMessage(
              `🎯 পাওয়া গেছে! বাকেট [${bucketIndex}]-এর চেইনে "${item.key}" পাওয়া গেছে ➔ মান: "${item.value}" (O(1) লুকআপ)`
            );
            matchFound = true;
            await delay(1500);
            break;
          } else {
            setChainBuckets((prev) =>
              prev.map((b, bI) =>
                bI === bucketIndex
                  ? b.map((it, itI) => (itI === i ? { ...it, state: 'comparing' } : it))
                  : b
              )
            );
            setMessage(
              `বাকেট [${bucketIndex}]-এর ১ম নোড ("${item.key}") মেলেনি, লিংকড লিস্ট ধরে পরবর্তী নোডে যাচ্ছি...`
            );
            await delay(900);
          }
        }

        if (!matchFound) {
          setMessage(
            `❌ পাওয়া যায়নি! বাকেট [${bucketIndex}]-এর সম্পূর্ণ চেইন চেক করা হয়েছে, কিন্তু "${key}" নেই।`
          );
          await delay(1200);
        }

        setChainBuckets((prev) => prev.map((b) => b.map((item) => ({ ...item, state: 'idle' }))));
      }
    }

    // Linear Probing Search
    else if (tableMode === 'probing') {
      let probeIdx = bucketIndex;
      let probes = 0;

      while (probes < BUCKET_COUNT) {
        const slot = probingSlots[probeIdx];
        setPipelineState({ key, rawHash, bucketIndex: probeIdx, step: `স্লট [${probeIdx}] চেক` });

        if (slot.key === key) {
          const newSlots = [...probingSlots];
          newSlots[probeIdx] = { ...newSlots[probeIdx], state: 'found' };
          setProbingSlots(newSlots);
          setMessage(`🎯 স্লট [${probeIdx}]-এ পাওয়া গেছে! "${key}" ➔ "${slot.value}" (O(1) Probing)`);
          await delay(1500);
          break;
        } else if (slot.key === null) {
          setMessage(`❌ স্লট [${probeIdx}] খালি (NULL)। অর্থাৎ "${key}" টেবিলে নেই।`);
          await delay(1200);
          break;
        } else {
          probeIdx = (probeIdx + 1) % BUCKET_COUNT;
          probes++;
          await delay(800);
        }
      }

      setProbingSlots((prev) => prev.map((s) => ({ ...s, state: 'idle' })));
    }

    // Set Search
    else if (tableMode === 'set') {
      const exists = setKeys.includes(key);
      if (exists) {
        setMessage(`🎯 সেটে বিদ্যমান! "${key}" হ্যাশ সেটের মধ্যে সংরক্ষিত আছে (O(1) Check)।`);
      } else {
        setMessage(`❌ সেটে নেই! "${key}" হ্যাশ সেটে পাওয়া যায়নি।`);
      }
      await delay(1400);
    }

    // Rotate searchKey to the NEXT existing key
    const existing = getExistingKeys();
    const currIdx = existing.indexOf(key);
    const nextKey = existing[(currIdx + 1) % existing.length] || existing[0];
    setSearchKey(nextKey);

    setPipelineState({});
    setIsAnimating(false);
  };

  // Reset Table
  const handleReset = () => {
    setChainBuckets(INITIAL_CHAIN_BUCKETS);
    setProbingSlots(INITIAL_PROBING_SLOTS);
    setSetKeys(['token', 'admin', 'roll:42', 'priya', 'rahul']);
    setInputKey('sabbir');
    setInputVal('01912-1122');
    setSearchKey('token');
    setMessage(
      'হ্যাশ টেবিল রিসেট করা হয়েছে। বাকেট [0]-এ token ও admin-এর রিয়েল কলিশন চেইন প্রস্তুত।'
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header & Structured Definition Card */}
      <HashTableOverview />

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
        {/* Controls Bar & Mode Selectors */}
        <HashTableControls
          tableMode={tableMode}
          onSetTableMode={(mode) => {
            setTableMode(mode);
            if (mode === 'chaining') {
              setMessage('Separate Chaining সক্রিয়: বাকেট [0]-এ token ও admin-এর চেইন লক্ষ্য করুন।');
            } else if (mode === 'probing') {
              setMessage('Linear Probing সক্রিয়: কলিশন হলে পরবর্তী খালি স্লটে ডেটা বসে।');
            } else {
              setMessage('Hash Set সক্রিয়: শুধুমাত্র ইউনিক কি-সমূহ সংরক্ষিত হবে (ডুপ্লিকেট প্রতিরোধ)।');
            }
          }}
          isAnimating={isAnimating}
          onReset={handleReset}
          inputKey={inputKey}
          setInputKey={setInputKey}
          inputVal={inputVal}
          setInputVal={setInputVal}
          onPut={handlePut}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          onSearch={handleSearch}
        />

        {/* Dynamic Mode Definition Card */}
        <HashTableModeCard tableMode={tableMode} />

        {/* Live Hash Pipeline Visual */}
        <HashPipelineBanner pipelineState={pipelineState} />

        {/* VISUALIZERS */}
        {tableMode === 'chaining' && (
          <ChainingVisualizer chainBuckets={chainBuckets} pipelineState={pipelineState} />
        )}

        {tableMode === 'probing' && (
          <LinearProbingVisualizer probingSlots={probingSlots} pipelineState={pipelineState} />
        )}

        {tableMode === 'set' && <HashSetVisualizer setKeys={setKeys} />}

        {/* Live Feedback Banner */}
        <div className="p-3 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-pink-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. Scenarios & Real World Software Usages */}
      <HashTableRealWorld />
    </div>
  );
}
