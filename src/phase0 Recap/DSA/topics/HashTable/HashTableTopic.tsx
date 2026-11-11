'use client';

import React, { useState } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Database,
  PlusCircle,
  Search,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Server,
  Hash,
  Link as LinkIcon,
  Key,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface ChainItem {
  id: string;
  key: string;
  value: string;
  state?: 'idle' | 'hashing' | 'comparing' | 'found' | 'inserted' | 'collision';
}

interface LinearSlot {
  key: string | null;
  value: string | null;
  state?: 'idle' | 'probed' | 'found' | 'inserted' | 'collision';
}

const BUCKET_COUNT = 7;

// Pre-calculated deterministic hash:
// token   -> bucket 0
// admin   -> bucket 0 (Collision!)
// roll:42 -> bucket 1
// priya   -> bucket 3
// rahul   -> bucket 4
// sabbir  -> bucket 6
// login   -> bucket 0
const PRESET_ENTRIES = [
  { key: 'sabbir', val: '01912-1122' },
  { key: 'login', val: 'Active_2026' },
  { key: 'tanvir', val: '01552-3344' },
  { key: 'cache', val: 'HTML_Page' },
  { key: 'token', val: 'Bearer_JWT' },
  { key: 'admin', val: 'SuperUser' },
  { key: 'rahul', val: '01711-9876' }
];

// Initial chaining state strictly aligned with hash function
const INITIAL_CHAIN_BUCKETS: ChainItem[][] = [
  [
    { id: '1', key: 'token', value: 'Bearer_JWT', state: 'idle' },
    { id: '2', key: 'admin', value: 'SuperUser', state: 'idle' } // real collision at bucket 0!
  ],
  [
    { id: '3', key: 'roll:42', value: 'GPA_5.00', state: 'idle' }
  ],
  [],
  [
    { id: '4', key: 'priya', value: '01819-5432', state: 'idle' }
  ],
  [
    { id: '5', key: 'rahul', value: '01711-9876', state: 'idle' }
  ],
  [],
  []
];

// Initial linear probing state strictly aligned with hash function + probing
const INITIAL_PROBING_SLOTS: LinearSlot[] = [
  { key: 'token', value: 'Bearer_JWT', state: 'idle' },
  { key: 'admin', value: 'SuperUser', state: 'idle' }, // probed from 0 to 1, but roll:42 placed after
  { key: 'roll:42', value: 'GPA_5.00', state: 'idle' }, // probed from 1 to 2
  { key: 'priya', value: '01819-5432', state: 'idle' },
  { key: 'rahul', value: '01711-9876', state: 'idle' },
  { key: null, value: null, state: 'idle' },
  { key: null, value: null, state: 'idle' }
];

export default function HashTableTopic() {
  const [tableMode, setTableMode] = useState<'chaining' | 'probing' | 'set'>('chaining');

  const [chainBuckets, setChainBuckets] = useState<ChainItem[][]>(INITIAL_CHAIN_BUCKETS);
  const [probingSlots, setProbingSlots] = useState<LinearSlot[]>(INITIAL_PROBING_SLOTS);
  const [setKeys, setSetKeys] = useState<string[]>(['token', 'admin', 'roll:42', 'priya', 'rahul']);

  // Separate Inputs for INSERT
  const [inputKey, setInputKey] = useState('sabbir');
  const [inputVal, setInputVal] = useState('01912-1122');
  const [insertPresetIdx, setInsertPresetIdx] = useState(0);

  // Dedicated Input for SEARCH (Pre-filled with valid existing key!)
  const [searchKey, setSearchKey] = useState('token');

  const [message, setMessage] = useState('Hash Table প্রস্তুত। বাকেট [0]-এ token ও admin-এর রিয়েল কলিশন চেইন লক্ষ্য করুন।');
  const [isAnimating, setIsAnimating] = useState(false);
  const [pipelineState, setPipelineState] = useState<{
    key?: string;
    rawHash?: number;
    bucketIndex?: number;
    step?: string;
  }>({});

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Compute ASCII sum hash
  const computeHash = (key: string): { rawHash: number; bucketIndex: number } => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    const bucketIndex = hash % BUCKET_COUNT;
    return { rawHash: hash, bucketIndex };
  };

  // Helper: Get list of currently stored keys for cycling search
  const getExistingKeys = (): string[] => {
    if (tableMode === 'chaining') {
      const keys = chainBuckets.flatMap(b => b.map(item => item.key));
      return keys.length > 0 ? keys : ['token'];
    } else if (tableMode === 'probing') {
      const keys = probingSlots.filter(s => s.key !== null).map(s => s.key as string);
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

    // Also update searchKey to newly inserted key
    setSearchKey(key);

    // --- CASE A: CHAINING MODE ---
    if (tableMode === 'chaining') {
      setPipelineState({ key, rawHash, bucketIndex, step: `২. বাকেট [${bucketIndex}]` });
      const currentChain = chainBuckets[bucketIndex];
      const hasCollision = currentChain.length > 0;

      if (hasCollision) {
        setMessage(`⚠️ কলিশন শনাক্ত! বাকেট [${bucketIndex}]-এ আগেই ডেটা রয়েছে। চেইনিংয়ের মাধ্যমে লিংকড লিস্টে যুক্ত হচ্ছে...`);
      } else {
        setMessage(`বাকেট [${bucketIndex}] ফাঁকা। সরাসরি O(1) সময়ে ইনসার্ট হচ্ছে...`);
      }
      await delay(1000);

      const existsIdx = currentChain.findIndex(item => item.key === key);
      let updatedBuckets: ChainItem[][];

      if (existsIdx >= 0) {
        updatedBuckets = chainBuckets.map((b, i) =>
          i === bucketIndex
            ? b.map((item, idx) => idx === existsIdx ? { ...item, value: val, state: 'inserted' } : item)
            : b
        );
        setMessage(`কি "${key}" আগেই ছিল, মান আপডেট করে "${val}" করা হলো।`);
      } else {
        const newItem: ChainItem = { id: Date.now().toString(), key, value: val, state: 'inserted' };
        updatedBuckets = chainBuckets.map((b, i) => i === bucketIndex ? [...b, newItem] : b);
        setMessage(`সফল! বাকেট [${bucketIndex}]-এ ("${key}" ➔ "${val}") যুক্ত হয়েছে (O(1) Time)।`);
      }

      setChainBuckets(updatedBuckets);
      await delay(1100);
      setChainBuckets(prev => prev.map(b => b.map(item => ({ ...item, state: 'idle' }))));
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
          setMessage(`স্লট [${probeIdx}] খালি পাওয়া গেছে! এখানে ("${key}" ➔ "${val}") সংরক্ষণ করা হলো।`);
          const newSlots = [...probingSlots];
          newSlots[probeIdx] = { key, value: val, state: 'inserted' };
          setProbingSlots(newSlots);
          placed = true;
          await delay(1100);
          break;
        } else {
          setMessage(`স্লট [${probeIdx}] পূর্ণ ("${slot.key}")! কলিশন ➔ পরবর্তী স্লট [(probe + 1) % 7] চেক...`);
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
      setProbingSlots(prev => prev.map(s => ({ ...s, state: 'idle' })));
    }

    // --- CASE C: HASH SET MODE ---
    else if (tableMode === 'set') {
      if (setKeys.includes(key)) {
        setMessage(`❌ সেট ডুপ্লিকেট রিজেক্ট করেছে! "${key}" কি-টি সেটে আগেই আছে।`);
      } else {
        setSetKeys(prev => [...prev, key]);
        setMessage(`✅ ইউনিক কি হিসেবে "${key}" সফলভাবে সেটে যুক্ত করা হলো।`);
      }
      await delay(1100);
    }

    setPipelineState({});
    setIsAnimating(false);
  };

  // STEP-BY-STEP SEARCH / GET WITH STEP-BY-STEP CHAIN TRAVERSAL
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
        // Step 2: Traverse chain step-by-step
        let matchFound = false;
        for (let i = 0; i < bucket.length; i++) {
          const item = bucket[i];
          setPipelineState({ key, rawHash, bucketIndex, step: `চেইন আইটেম [${i + 1}/${bucket.length}] চেক` });

          if (item.key === key) {
            // Found!
            setChainBuckets(prev => prev.map((b, bI) =>
              bI === bucketIndex
                ? b.map((it, itI) => itI === i ? { ...it, state: 'found' } : it)
                : b
            ));
            setMessage(`🎯 পাওয়া গেছে! বাকেট [${bucketIndex}]-এর চেইনে "${item.key}" পাওয়া গেছে ➔ মান: "${item.value}" (O(1) লুকআপ)`);
            matchFound = true;
            await delay(1500);
            break;
          } else {
            // Comparing & not matched, move to next node in chain
            setChainBuckets(prev => prev.map((b, bI) =>
              bI === bucketIndex
                ? b.map((it, itI) => itI === i ? { ...it, state: 'comparing' } : it)
                : b
            ));
            setMessage(`বাকেট [${bucketIndex}]-এর ১ম নোড ("${item.key}") মেলেনি, লিংকড লিস্ট ধরে পরবর্তী নোডে যাচ্ছি...`);
            await delay(900);
          }
        }

        if (!matchFound) {
          setMessage(`❌ পাওয়া যায়নি! বাকেট [${bucketIndex}]-এর সম্পূর্ণ চেইন চেক করা হয়েছে, কিন্তু "${key}" নেই।`);
          await delay(1200);
        }

        setChainBuckets(prev => prev.map(b => b.map(item => ({ ...item, state: 'idle' }))));
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

      setProbingSlots(prev => prev.map(s => ({ ...s, state: 'idle' })));
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

    // Automatically rotate searchKey to the NEXT existing key so the user can just click GET again!
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
    setMessage('হ্যাশ টেবিল রিসেট করা হয়েছে। বাকেট [0]-এ token ও admin-এর রিয়েল কলিশন চেইন প্রস্তুত।');
  };

  const totalChainItems = chainBuckets.reduce((acc, b) => acc + b.length, 0);
  const loadFactor = (totalChainItems / BUCKET_COUNT).toFixed(2);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header & Structured Definition Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-5 sm:p-6 rounded-2xl flex flex-col gap-4 shadow-xl shadow-black/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold shadow-lg shadow-pink-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              Hash Table, Map &amp; Set (হ্যাশ টেবিল ও ম্যাপ)
            </h2>
            <span className="text-[11px] font-mono text-pink-400">
              O(1) Average Access • Hash Function • Collision Resolution (Chaining vs Open Addressing)
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          <b>হ্যাশ টেবিল (Hash Table)</b> হলো এমন এক ডেটা স্ট্রাকচার যা লক্ষ লক্ষ ডেটার মধ্যেও একটি নির্দিষ্ট উপাদানকে লিনিয়ার খোঁজাখুঁজি ছাড়াই <b>সরাসরি O(1) বা চোখের পলকে</b> বের করতে পারে। এটি কোনো কী (Key)-কে একটি গাণিতিক <b>হ্যাশ ফাংশনের</b> মাধ্যমে ইনডেক্সে রূপান্তর করে ডেটা সংরক্ষণ করে।
        </p>

        {/* 4 Explanatory Concept Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-pink-400" /> ১. Key-Value পেয়ার
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              নাম বা আইডি হলো "Key", আর বিপরীতে থাকা নম্বর বা প্রোফাইল হলো "Value"।
            </p>
          </div>

          <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-amber-400" /> ২. হ্যাশ ফাংশন
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              স্ট্রিং কি-কে ইনডেক্সে রূপান্তর করে: <code className="text-amber-300 font-mono">hash(key) % N</code>।
            </p>
          </div>

          <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> ৩. কলিশন (Collision)
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              ভিন্ন দুটি Key একই বাকেট পেলে Chaining বা Probing দিয়ে সমাধান হয়।
            </p>
          </div>

          <div className="bg-[#0a0b12] border border-[#1f2336] p-3 rounded-xl flex flex-col gap-1">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ৪. Map বনাম Set
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Map কি ও মান দুটিই রাখে; কিন্তু Set কেবল অনন্য (Unique) কি জমা রাখে।
            </p>
          </div>
        </div>
      </div>

      {/* 2. Compact & Reorganized Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
        {/* Tier 1: Mode Selector Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-2.5 rounded-xl border border-[#1d2030]">
          <div className="flex items-center gap-1 bg-[#090a10] p-1 rounded-lg border border-[#1e2235]">
            <button
              onClick={() => {
                setTableMode('chaining');
                setMessage('Separate Chaining সক্রিয়: বাকেট [0]-এ token ও admin-এর চেইন লক্ষ্য করুন।');
              }}
              disabled={isAnimating}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                tableMode === 'chaining'
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Chaining (লিংকড লিস্ট 🔗)
            </button>
            <button
              onClick={() => {
                setTableMode('probing');
                setMessage('Linear Probing সক্রিয়: কলিশন হলে পরবর্তী খালি স্লটে ডেটা বসে।');
              }}
              disabled={isAnimating}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                tableMode === 'probing'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Linear Probing (পরবর্তী স্লট ➔)
            </button>
            <button
              onClick={() => {
                setTableMode('set');
                setMessage('Hash Set সক্রিয়: শুধুমাত্র ইউনিক কি-সমূহ সংরক্ষিত হবে (ডুপ্লিকেট প্রতিরোধ)।');
              }}
              disabled={isAnimating}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                tableMode === 'set'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Hash Set (ইউনিক কি 🎯)
            </button>
          </div>

          <button
            onClick={handleReset}
            disabled={isAnimating}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-300 border border-[#292c42]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> রিসেট
          </button>
        </div>

        {/* Dynamic Mode Definition Card right below Mode Selector */}
        <div className="bg-[#090a10] border border-[#1d2238] p-3 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm">
          {tableMode === 'chaining' && (
            <div className="flex items-start gap-2.5 text-xs text-zinc-300 w-full animate-in fade-in duration-300">
              <div className="w-6 h-6 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                <LinkIcon className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-pink-300 font-mono text-[11px]">Separate Chaining (লিংকড লিস্ট চেইনিং):</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  দুটি ভিন্ন কি (যেমন: <code className="text-pink-300">token</code> ও <code className="text-pink-300">admin</code>) একই বাকেট [0]-এ কলিশন ঘটালে সেখানে একটি <b>লিংকড লিস্ট চেইন</b> তৈরি হয়। সার্চের সময় হ্যাশ ফাংশন প্রথমে বাকেট [0]-এ যায়, তারপর চেইন ট্রাভার্স করে কাঙ্ক্ষিত নোডটি বের করে।
                </p>
              </div>
            </div>
          )}

          {tableMode === 'probing' && (
            <div className="flex items-start gap-2.5 text-xs text-zinc-300 w-full animate-in fade-in duration-300">
              <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-amber-300 font-mono text-[11px]">Linear Probing (ওপেন অ্যাড্রেসিং / পরবর্তী খালি ঘর):</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  এখানে কোনো লিংকড লিস্ট থাকে না। কাঙ্ক্ষিত বাকেটটি যদি অন্য ডেটা দিয়ে আগে থেকেই পূর্ণ থাকে, তবে পরবর্তী ক্রমান্বয়িক ইনডেক্স <code className="text-amber-300 font-mono">(Index + 1) % 7</code> স্ক্যান করে প্রথম যে খালি স্লটটি পাওয়া যায়, ডেটা সেখানেই বসে যায়।
                </p>
              </div>
            </div>
          )}

          {tableMode === 'set' && (
            <div className="flex items-start gap-2.5 text-xs text-zinc-300 w-full animate-in fade-in duration-300">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-emerald-300 font-mono text-[11px]">Hash Set (অনন্য কি কালেকশন):</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  হ্যাশ সেট কোনো Value রাখে না; এটি কেবল <b>ইউনিক বা অনন্য Key</b> জমা রাখে। নতুন কি দেওয়ার সাথে সাথে হ্যাশ ফাংশন দিয়ে <code className="text-emerald-300 font-mono">O(1)</code> সময়ে দেখা হয় এটি আগেই আছে কিনা—থাকলে ডুপ্লিকেট হিসেবে বাতিল করে দেয়।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tier 2: SEPARATE INSERT & SEARCH CONTROLS (Dedicated Input Fields!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030] items-center">
          {/* Section A: INSERT CONTROLS (Left side) */}
          <div className="lg:col-span-7 flex flex-wrap items-center gap-2 border-b lg:border-b-0 lg:border-r border-[#1f2336] pb-2.5 lg:pb-0 lg:pr-3">
            <span className="text-[11px] font-mono text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
              <PlusCircle className="w-3.5 h-3.5 text-pink-400" /> ইনসার্ট:
            </span>

            <div className="flex items-center gap-1.5 bg-[#090a10] px-2 py-1 rounded-lg border border-[#1a1c29]">
              <span className="text-[10px] font-mono text-zinc-400">Key:</span>
              <input
                type="text"
                value={inputKey}
                onChange={e => setInputKey(e.target.value)}
                className="w-20 bg-[#141624] text-pink-300 text-xs px-1.5 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-pink-500"
              />
            </div>

            {tableMode !== 'set' && (
              <div className="flex items-center gap-1.5 bg-[#090a10] px-2 py-1 rounded-lg border border-[#1a1c29]">
                <span className="text-[10px] font-mono text-zinc-400">Val:</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="w-20 bg-[#141624] text-rose-300 text-xs px-1.5 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            )}

            <button
              onClick={handlePut}
              disabled={isAnimating}
              className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold shadow-md shadow-pink-600/20 transition-all disabled:opacity-40 shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" /> PUT
            </button>
          </div>

          {/* Section B: SEARCH CONTROLS (Right side with Auto-Advancing Existing Keys!) */}
          <div className="lg:col-span-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Search className="w-3.5 h-3.5 text-rose-400" /> সার্চ:
            </span>

            <div className="flex items-center gap-1.5 bg-[#090a10] px-2.5 py-1 rounded-lg border border-[#1a1c29] flex-1 min-w-[130px]">
              <span className="text-[10px] font-mono text-zinc-400">Key:</span>
              <input
                type="text"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                className="w-full bg-[#141624] text-rose-300 text-xs px-2 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-rose-500"
                placeholder="Search key..."
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={isAnimating}
              className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md shadow-rose-600/20 transition-all disabled:opacity-40 shrink-0"
            >
              <Search className="w-3.5 h-3.5" /> GET O(1)
            </button>
          </div>
        </div>

        {/* Live Hash Pipeline Visual (Step Indicator) */}
        <div className="flex items-center justify-between bg-[#10121d] px-3.5 py-2 rounded-xl border border-[#1e2235] text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500">হ্যাশ পাইপলাইন:</span>
            {pipelineState.key ? (
              <div className="flex items-center gap-1.5 text-zinc-200">
                <span className="px-2 py-0.5 rounded bg-pink-950/60 border border-pink-500/40 text-pink-300 font-bold">
                  Key: &quot;{pipelineState.key}&quot;
                </span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold">
                  Hash: {pipelineState.rawHash}
                </span>
                <span>➔ % 7 ➔</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
                  বাকেট [{pipelineState.bucketIndex}]
                </span>
              </div>
            ) : (
              <span className="text-zinc-400 italic">PUT বা GET বাটনে ক্লিক করে লাইভ হ্যাশ রেজাল্ট দেখুন</span>
            )}
          </div>
          {pipelineState.step && (
            <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[10px]">
              {pipelineState.step}
            </span>
          )}
        </div>

        {/* COMPACT BUCKET VISUALIZER (2-Column Balanced Grid - Fits Viewport With ZERO Scroll!) */}
        {tableMode === 'chaining' && (
          <div className="bg-[#090a10] rounded-xl border border-[#1a1d2e] p-3.5 sm:p-4 flex flex-col gap-2.5">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>Bucket Array (৭টি বাকেট • ২-কলাম ভিউ)</span>
              <span className="text-pink-400">Index = hash(key) % 7</span>
            </div>

            {/* 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {chainBuckets.map((chain, bIdx) => {
                const isTargetBucket = pipelineState.bucketIndex === bIdx;
                return (
                  <div
                    key={bIdx}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border transition-all duration-300 min-h-[46px] ${
                      isTargetBucket
                        ? 'bg-pink-950/40 border-pink-500 ring-2 ring-pink-500/30'
                        : 'bg-[#121422] border-[#1e2236]'
                    }`}
                  >
                    {/* Compact Bucket Cell */}
                    <div className="w-12 h-7 rounded-lg bg-[#1a1d30] border border-[#282d4d] flex items-center justify-center font-mono font-bold text-xs text-pink-300 shrink-0">
                      [{bIdx}]
                    </div>

                    <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />

                    {/* Compact Linked List Chained Nodes */}
                    <div className="flex flex-wrap items-center gap-1.5 flex-1 overflow-x-auto py-0.5">
                      {chain.length === 0 ? (
                        <span className="text-[10px] font-mono text-zinc-600 italic">খালি (NULL)</span>
                      ) : (
                        chain.map((item, itemIdx) => {
                          let itemBadge = 'bg-[#1c1f33] border-pink-500/40 text-zinc-200';
                          if (item.state === 'inserted') {
                            itemBadge = 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold scale-105 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400';
                          } else if (item.state === 'found') {
                            itemBadge = 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold scale-105 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 animate-pulse';
                          } else if (item.state === 'comparing') {
                            itemBadge = 'bg-amber-500/30 border-amber-400 text-amber-300 ring-2 ring-amber-400/40 animate-pulse';
                          }

                          return (
                            <React.Fragment key={item.id || itemIdx}>
                              {itemIdx > 0 && <span className="text-pink-500 font-bold text-[10px]">➔</span>}
                              <div
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] font-mono transition-all duration-300 shrink-0 ${itemBadge}`}
                              >
                                <span className="font-semibold text-pink-300">{item.key}</span>
                                <span className="opacity-50">:</span>
                                <span className="text-emerald-300">{item.value}</span>
                              </div>
                            </React.Fragment>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}

              {/* 8th Slot in Grid: Summary & Load Factor Mini Card for Perfect Balance */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-pink-500/20 bg-pink-950/15 text-xs font-mono min-h-[46px]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-zinc-400 text-[11px]">লোড ফ্যাক্টর:</span>
                  <span className="text-pink-300 font-bold">{totalChainItems}/7 ({loadFactor})</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  O(1) Optimal
                </span>
              </div>
            </div>
          </div>
        )}

        {tableMode === 'probing' && (
          /* 2. LINEAR PROBING VISUALIZER (Horizontal 7-slot array) */
          <div className="bg-[#090a10] rounded-xl border border-[#1a1d2e] p-3.5 sm:p-4 flex flex-col gap-2.5">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>Open Addressing: Linear Probing Array (কোনো লিংকড লিস্ট নেই)</span>
              <span className="text-amber-400">Collision: (Index + 1) % 7</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 bg-[#111320] p-2 rounded-xl border border-[#1f2336]">
              {probingSlots.map((slot, idx) => {
                const isTarget = pipelineState.bucketIndex === idx;
                const isOccupied = slot.key !== null;

                let cardStyle = 'bg-black/30 border-zinc-800 text-zinc-600';
                if (slot.state === 'inserted') {
                  cardStyle = 'bg-amber-500 border-amber-300 text-slate-950 font-bold scale-105 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400';
                } else if (slot.state === 'found') {
                  cardStyle = 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold scale-105 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 animate-pulse';
                } else if (slot.state === 'collision') {
                  cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-300 ring-2 ring-rose-500/40';
                } else if (isOccupied) {
                  cardStyle = 'bg-[#181b2e] border-pink-500/40 text-zinc-200';
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">[{idx}]</span>
                    <div
                      className={`w-full h-14 rounded-lg border p-1 flex flex-col items-center justify-center text-center font-mono transition-all duration-300 ${cardStyle} ${
                        isTarget ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      {isOccupied ? (
                        <>
                          <span className="text-xs font-bold truncate w-full text-pink-300">{slot.key}</span>
                          <span className="text-[9px] truncate w-full opacity-75 text-emerald-300">{slot.value}</span>
                        </>
                      ) : (
                        <span className="text-[10px] italic text-zinc-600">খালি</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tableMode === 'set' && (
          /* 3. HASH SET VISUALIZER */
          <div className="bg-[#090a10] rounded-xl border border-[#1a1d2e] p-3.5 sm:p-4 flex flex-col gap-2.5">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>Hash Set Pool (শুধুমাত্র অনন্য কী-সমূহ সংরক্ষিত)</span>
              <span className="text-emerald-400">শূন্য ডুপ্লিকেট • O(1) Exists Check</span>
            </div>

            <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#111320] border border-[#1f2336] min-h-[64px] items-center">
              {setKeys.length === 0 ? (
                <span className="text-xs font-mono text-zinc-600 italic">সেট খালি।</span>
              ) : (
                setKeys.map((k, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>&quot;{k}&quot;</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Live Feedback Banner */}
        <div className="p-3 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-pink-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. ULTRA-RELATABLE DAY-TO-DAY REAL-LIFE SCENARIOS */}
      <RealLifeScenario
        topicName="হ্যাশ টেবিল ও ম্যাপ (Hash Table - O(1))"
        scenarios={[
          {
            title: "১. ফোনের কন্টাক্ট লিস্ট ও কলার আইডি (Phonebook & Caller ID)",
            subtitle: "কল আসার সাথে সাথে চোখের পলকে নাম ভেসে ওঠা",
            badge: "Instant O(1) Key Lookup",
            visualTag: "Zero Searching Delay",
            accentColor: "pink",
            analogy:
              "আপনার ফোনে হাজার হাজার নম্বর সেভ আছে। যখন বন্ধু 'সাকিব' কল দেয়, স্ক্রিনে সাথে সাথে 'সাকিব' ভেসে ওঠে। ফোন কখনোই পুরো কন্টাক্ট লিস্ট এক এক করে লাইন ধরে খোঁজে না; ফোন নম্বরটিকে 'Key' বানিয়ে হ্যাশ টেবিলের মাধ্যমে সরাসরি ১ মিলি-সেকেন্ডে নাম টেনে আনে!",
            whyItFits:
              "ফোন নম্বর (Key) ➔ হ্যাশ ফাংশন ➔ সরাসরি মেমরি অ্যাড্রেস থেকে ব্যক্তির নাম (Value) রিটার্ন করা হয়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-1 rounded bg-[#1f1628] border border-pink-500/50 text-pink-300 font-bold">ইনকামিং নম্বর &quot;01711...&quot;</span>
                <span>➔ Hash() ➔</span>
                <span className="px-2 py-1 rounded bg-pink-500 text-slate-950 font-bold">স্ক্রিনে: &quot;সাকিব&quot; (O(1) Access)</span>
              </div>
            ),
          },
          {
            title: "২. রোল নম্বর দিয়ে বোর্ড পরীক্ষার রেজাল্ট খোঁজা (Exam Roll Lookup)",
            subtitle: "লাখ লাখ শিক্ষার্থীর রেজাল্টের মধ্যে নিজের রেজাল্ট এক সেকেন্ডে পাওয়া",
            badge: "Direct Index Bucket",
            visualTag: "Single Hit Query",
            accentColor: "cyan",
            analogy:
              "এসএসসি বা এইচএসসি পরীক্ষায় ২০ লাখ পরীক্ষার্থী অংশ নেয়। শিক্ষা বোর্ডের ওয়েবসাইটে নিজের ৬ সংখ্যার রোল নম্বর দিয়ে সাবমিট করলেই মুহূর্তে আপনার রেজাল্ট শিট চলে আসে। সার্ভার কখনোই ২০ লাখ খাতা বা রোল একের পর এক সার্চ করে না; রোল নাম্বারটিই হ্যাশ টেবিলের চাবি হিসেবে কাজ করে।",
            whyItFits:
              "রোল নম্বর (Key) হ্যাশ ফাংশনে দিয়ে সরাসরি নির্দিষ্ট ডেটাবেস বাকেট থেকে রেজাল্ট কার্ড তুলে আনা হয়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">রোল &quot;458920&quot;</span>
                <span>➔ Map[Roll] ➔</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">GPA 5.00 (Golden)</span>
              </div>
            ),
          },
          {
            title: "৩. জিম বা সুইমিং পুলের লকার চাবি (Locker Key & Box)",
            subtitle: "চাবির নম্বর দেখেই নির্দিষ্ট বাক্সে পৌঁছানো",
            badge: "1-to-1 Mapping",
            visualTag: "Direct Bucket Access",
            accentColor: "amber",
            analogy:
              "জিমে গেলে আপনাকে একটি টোকেন বা চাবি দেওয়া হয় যাতে লেখা থাকে '৪২'। আপনি কখনোই কারো লকার খুলে দেখেন না যে কোনটি আপনার—সরাসরি ৪২ নম্বর লকারে গিয়ে চাবি ঘুরিয়ে নিজের ব্যাগ বের করে ফেলেন।",
            whyItFits:
              "চাবির সংখ্যাটিই সরাসরি মেমরি বাকেটের ইনডেক্স। কোনো সার্চিং বা সময় নষ্ট ছাড়া সোজা নিজের স্লটে পৌঁছানোই হ্যাশ টেবিলের মূল সৌন্দর্য।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">লকার কি #৪২</span>
                <span>➔ সোজা ৪২ নম্বর খোপ ➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-amber-300">আপনার ব্যাগ ও জুতো</span>
              </div>
            ),
          },
        ]}
      />

      {/* 4. Real World Software Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Server className="w-4 h-4 text-pink-400" />
          <h4 className="text-xs font-bold text-zinc-200">১. Redis ইন-মেমরি ক্যাশ</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            রেডিস মূলত একটি বিশাল ডিস্ট্রিবিউটেড হ্যাশ ম্যাপ। ইউজার সেশন, অথেনটিকেশন টোকেন ও পেজ ক্যাশ সাব-মিলি-সেকেন্ডে O(1) সময়ে ফেচ করা হয়।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-zinc-200">২. ইমেইল ও ইউজারনেম ইউনিকনেস (Hash Set)</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            রেজিস্ট্রেশনের সময় ইমেইলটি আগে নেওয়া হয়েছে কিনা তা যাচাই করতে ডেটাবেস হ্যাশ সেট ব্যবহার করে O(1) সময়ে চেক করে।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-zinc-200">৩. কম্পাইলার সিম্বল টেবিল (Symbol Table)</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            জাভাস্ক্রিপ্ট, পাইথন বা সি++ কম্পাইলার ভ্যারিয়েবল ও ফাংশনের নাম মেমরির হ্যাশ টেবিলে রেখে দ্রুত টাইপ ও স্কোপ চেক করে।
          </p>
        </div>
      </div>
    </div>
  );
}
