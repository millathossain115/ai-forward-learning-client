'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  GitBranch,
  Search,
  CheckCircle2,
  Sliders,
  Scale,
  Info
} from 'lucide-react';

/* -------------------------------------------------------------
 * TYPES & ALGORITHM METADATA
 * -----------------------------------------------------------*/
type AlgoKey = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

interface AlgoMeta {
  id: AlgoKey;
  name: string;
  category: 'ছোট ডেটা (Small Data O(N²))' | 'বড় ডেটা (Divide & Conquer O(N log N))';
  badge: string;
  badgeType: 'amber' | 'sky';
  timeComplexity: string;
  spaceComplexity: string;
  analogy: string;
  mechanic: string;
}

const ALGOS: AlgoMeta[] = [
  {
    id: 'bubble',
    name: '১. বাবল সর্ট (Bubble Sort)',
    category: 'ছোট ডেটা (Small Data O(N²))',
    badge: 'বড় মান বুদবুদের মতো ডানে ভাসানো',
    badgeType: 'amber',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    analogy: 'পানির নিচের ভারী বুদবুদ যেমন ভাসতে ভাসতে উপরে ওঠে, তেমনি বড় সংখ্যাগুলো ধাপে ধাপে ডানে সরে যায়।',
    mechanic: 'পাশাপাশি দুটি স্লট তুলনা করা হয়; বামের মান বড় হলে তাদের অদলবদল (Swap) ঘটে।'
  },
  {
    id: 'selection',
    name: '২. সিলেকশন সর্ট (Selection Sort)',
    category: 'ছোট ডেটা (Small Data O(N²))',
    badge: 'সর্বনিম্ন মান খুঁজে সামনে আনা',
    badgeType: 'amber',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    analogy: 'এলোমেলো ফলের স্তূপ থেকে প্রতিবার সবচেয়ে ছোট ফলটি বেছে নিয়ে সারির শুরুতে রাখা।',
    mechanic: 'অ্যারের সাজানো অংশ (বাম) ও অগোছালো অংশ (ডান) থাকে। অগোছালো অংশের সর্বনিম্ন মানটি বেছে এনে বামে বসানো হয়।'
  },
  {
    id: 'insertion',
    name: '৩. ইনসার্শন সর্ট (Insertion Sort)',
    category: 'ছোট ডেটা (Small Data O(N²))',
    badge: 'তাসের মতো সঠিক স্লটে ইনসার্ট',
    badgeType: 'amber',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    analogy: 'হাতের তাসের খেলায় নতুন কার্ড এলে আগের সাজানো কার্ডগুলোর মাঝে সঠিক জায়গায় ঢুকিয়ে দেওয়া।',
    mechanic: 'একটি করে উপাদান হাতে তুলে (Key) নেওয়া হয় এবং আগের সাজানো উপাদানগুলোকে ডানে সরিয়ে সঠিক পকেটে বসানো হয়।'
  },
  {
    id: 'merge',
    name: '৪. মার্জ সর্ট (Merge Sort)',
    category: 'বড় ডেটা (Divide & Conquer O(N log N))',
    badge: 'বিভক্ত ট্রি ও জিপার মার্জিং',
    badgeType: 'sky',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    analogy: 'একটি বড় বইয়ের পৃষ্ঠাগুলোকে দুই ভাগে ভাগ করে সাজানো এবং পরে দুই স্তূপ থেকে ছোট ছোট করে একত্র করা।',
    mechanic: 'অ্যারেকে অর্ধেক করে ভেঙে একক উপাদানে নামিয়ে আনা হয়, তারপর দুটি করে সাজানো খণ্ড একত্রে মার্জ করা হয়।'
  },
  {
    id: 'quick',
    name: '৫. কুইক সর্ট (Quick Sort)',
    category: 'বড় ডেটা (Divide & Conquer O(N log N))',
    badge: 'পিভট পার্টিশন (ছোট বামে, বড় ডানে)',
    badgeType: 'sky',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(log N)',
    analogy: 'শ্রেণীকক্ষে একজন ছাত্রকে কেন্দ্রবিন্দু (Pivot) ধরে তার চেয়ে খাটোদের বামে ও লম্বা-দের ডানে ভাগ করা।',
    mechanic: 'পিভট নির্বাচন করে বাকিদের দুটি জোনে (ছোট জোন ও বড় জোন) ভাগ করা হয় এবং মাঝে পিভটটি স্থায়ী করা হয়।'
  }
];

export default function SortingTopic() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoKey>('bubble');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const speedMs = 1200; // 0.5x readable speed
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active algorithm info
  const algo = ALGOS.find(a => a.id === selectedAlgo) || ALGOS[0];

  /* -----------------------------------------------------------
   * 1. BUBBLE SORT TRACE: [45, 12, 85, 32, 21]
   * ---------------------------------------------------------*/
  const bubbleTrace = useMemo(() => [
    { arr: [45, 12, 85, 32, 21], pair: [0, 1], swapped: false, sorted: [], desc: 'শুরু: ইনডেক্স ০ (৪৫) ও ১ (১২) তুলনা হচ্ছে। ৪৫ > ১২, তাই অদলবদল (Swap) প্রয়োজন।' },
    { arr: [12, 45, 85, 32, 21], pair: [0, 1], swapped: true, sorted: [], desc: 'অদলবদল সম্পন্ন: ১২ আগে এল এবং ৪৫ ডানে সরে গেল।' },
    { arr: [12, 45, 85, 32, 21], pair: [1, 2], swapped: false, sorted: [], desc: 'তুলনা: ইনডেক্স ১ (৪৫) ও ২ (৮৫)। ৪৫ < ৮৫, কোনো সোয়াপ দরকার নেই।' },
    { arr: [12, 45, 85, 32, 21], pair: [2, 3], swapped: false, sorted: [], desc: 'তুলনা: ইনডেক্স ২ (৮৫) ও ৩ (৩২)। ৮৫ > ৩২, অদলবদল করা হচ্ছে।' },
    { arr: [12, 45, 32, 85, 21], pair: [2, 3], swapped: true, sorted: [], desc: 'অদলবদল সম্পন্ন: ৮৫ ডানে এক ধাপ এগুলো।' },
    { arr: [12, 45, 32, 85, 21], pair: [3, 4], swapped: false, sorted: [], desc: 'তুলনা: ইনডেক্স ৩ (৮৫) ও ৪ (২১)। ৮৫ > ২১, অদলবদল করা হচ্ছে।' },
    { arr: [12, 45, 32, 21, 85], pair: [3, 4], swapped: true, sorted: [4], desc: 'পাস ১ শেষ: সর্বোচ্চ মান ৮৫ বুদবুদের মতো সবার শেষে (ইনডেক্স ৪) স্থায়ীভাবে বসে গেল!' },
    { arr: [12, 45, 32, 21, 85], pair: [1, 2], swapped: false, sorted: [4], desc: 'পাস ২: ৪৫ ও ৩২ তুলনা। ৪৫ > ৩২, অদলবদল হবে।' },
    { arr: [12, 32, 45, 21, 85], pair: [1, 2], swapped: true, sorted: [4], desc: 'অদলবদল সম্পন্ন।' },
    { arr: [12, 32, 45, 21, 85], pair: [2, 3], swapped: false, sorted: [4], desc: 'তুলনা: ৪৫ ও ২১। ৪৫ > ২১, অদলবদল হবে।' },
    { arr: [12, 32, 21, 45, 85], pair: [2, 3], swapped: true, sorted: [3, 4], desc: 'পাস ২ শেষ: দ্বিতীয় সর্বোচ্চ মান ৪৫ তার সঠিক স্থানে স্থির হলো।' },
    { arr: [12, 21, 32, 45, 85], pair: [], swapped: false, sorted: [0, 1, 2, 3, 4], desc: '🎉 বাবল সর্ট সম্পন্ন: সম্পূর্ণ অ্যারে আরোহী ক্রমানুসারে সাজানো হয়েছে!' }
  ], []);

  /* -----------------------------------------------------------
   * 2. SELECTION SORT TRACE: [64, 25, 12, 22, 11]
   * ---------------------------------------------------------*/
  const selectionTrace = useMemo(() => [
    { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 0, minIdx: 0, desc: 'পাস ১ শুরু: সর্বনিম্ন মান খোঁজার জন্য ইনডেক্স ০ (৬৪)-কে প্রাথমিক সর্বনিম্ন ধরা হলো।' },
    { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 1, minIdx: 1, desc: 'স্ক্যান: ২৫ < ৬৪, তাই বর্তমান সর্বনিম্ন মান ২৫ (ইনডেক্স ১)।' },
    { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 2, minIdx: 2, desc: 'স্ক্যান: ১২ < ২৫, নতুন সর্বনিম্ন মান ১২ (ইনডেক্স ২)।' },
    { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 4, minIdx: 4, desc: 'স্ক্যান: ১১ < ১২, চূড়ান্ত সর্বনিম্ন মান ১১ (ইনডেক্স ৪)।' },
    { arr: [11, 25, 12, 22, 64], sortedUntil: 0, scanIdx: -1, minIdx: 0, desc: 'সোয়াপ: সর্বনিম্ন মান ১১-কে শুরুতে (ইনডেক্স ০) আনা হলো। ইনডেক্স ০ এখন সাজানো জোন।' },
    { arr: [11, 25, 12, 22, 64], sortedUntil: 0, scanIdx: 2, minIdx: 2, desc: 'পাস ২ শুরু: অগোছালো অংশের সর্বনিম্ন মান ১২ (ইনডেক্স ২) শনাক্ত হলো।' },
    { arr: [11, 12, 25, 22, 64], sortedUntil: 1, scanIdx: -1, minIdx: 1, desc: 'সোয়াপ: ১২-কে ইনডেক্স ১-এ আনা হলো। সাজানো জোন সম্প্রসারিত হলো।' },
    { arr: [11, 12, 22, 25, 64], sortedUntil: 2, scanIdx: -1, minIdx: 2, desc: 'পাস ৩: পরবর্তী সর্বনিম্ন ২২-কে ইনডেক্স ২-এ স্থান দেওয়া হলো।' },
    { arr: [11, 12, 22, 25, 64], sortedUntil: 4, scanIdx: -1, minIdx: 4, desc: '🎉 সিলেকশন সর্ট সম্পন্ন: সর্বনিম্ন মানগুলো ক্রমান্বয়ে সাজানো হয়েছে!' }
  ], []);

  /* -----------------------------------------------------------
   * 3. INSERTION SORT TRACE: [31, 41, 59, 26, 41]
   * ---------------------------------------------------------*/
  const insertionTrace = useMemo(() => [
    { arr: [31, 41, 59, 26, 41], sortedCount: 1, handKey: null, shiftIdx: -1, desc: 'শুরু: প্রথম কার্ড ৩১ নিজের অবস্থানে সাজানো আছে। ইনডেক্স ১ থেকে কাজ শুরু হবে।' },
    { arr: [31, 41, 59, 26, 41], sortedCount: 2, handKey: 41, shiftIdx: -1, desc: 'হাতে নেওয়া কার্ড Key = ৪১। ৩১ < ৪১, তাই ৪১ তার নিজের অবস্থানেই থাকবে।' },
    { arr: [31, 41, 59, 26, 41], sortedCount: 3, handKey: 59, shiftIdx: -1, desc: 'হাতে নেওয়া কার্ড Key = ৫৯। পূর্বের সব কার্ড ছোট, তাই ৫৯ ওখানেই স্থির থাকবে।' },
    { arr: [31, 41, 59, null, 41], sortedCount: 3, handKey: 26, shiftIdx: 2, desc: 'হাতে নেওয়া কার্ড Key = ২৬। পূর্বের কার্ড ৫৯ > ২৬, তাই ৫৯-কে এক ঘর ডানে সরানো হলো।' },
    { arr: [31, null, 41, 59, 41], sortedCount: 3, handKey: 26, shiftIdx: 1, desc: '৪১ > ২৬, তাই ৪১-কেও এক ঘর ডানে সরানো হলো।' },
    { arr: [null, 31, 41, 59, 41], sortedCount: 3, handKey: 26, shiftIdx: 0, desc: '৩১ > ২৬, ৩১-কেও এক ঘর ডানে শিফট করা হলো। শুরুর স্লটটি এখন খালি!' },
    { arr: [26, 31, 41, 59, 41], sortedCount: 4, handKey: null, shiftIdx: -1, desc: 'পকেট ইনসার্ট: খালি স্লটে ২৬ বসিয়ে দেওয়া হলো!' },
    { arr: [26, 31, 41, 41, 59], sortedCount: 5, handKey: null, shiftIdx: -1, desc: '🎉 ইনসার্শন সর্ট সম্পন্ন: তাসের মতো প্রতিটি মান নিজের সঠিক পকেটে বসেছে!' }
  ], []);

  /* -----------------------------------------------------------
   * 4. MERGE SORT TRACE: Progressive Divide & Conquer Tree
   * ---------------------------------------------------------*/
  const mergeTrace = useMemo(() => [
    {
      level: 0,
      state: 'initial',
      layers: {
        root: [38, 27, 43, 3],
        leftSplit: null,
        rightSplit: null,
        singletons: null,
        mergedHalves: null,
        final: null
      },
      desc: 'ধাপ ১ (মূল অ্যারে): [৩৮, ২৭, ৪৩, ৩] কে দুটি সমান ভাগে বিভক্ত করার পরিকল্পনা।'
    },
    {
      level: 1,
      state: 'split_1',
      layers: {
        root: [38, 27, 43, 3],
        leftSplit: [38, 27],
        rightSplit: [43, 3],
        singletons: null,
        mergedHalves: null,
        final: null
      },
      desc: 'ধাপ ২ (Divide): বাম খণ্ড [৩৮, ২৭] এবং ডান খণ্ড [৪৩, ৩] এ বিভক্ত করা হলো।'
    },
    {
      level: 2,
      state: 'split_2',
      layers: {
        root: [38, 27, 43, 3],
        leftSplit: [38, 27],
        rightSplit: [43, 3],
        singletons: [[38], [27], [43], [3]],
        mergedHalves: null,
        final: null
      },
      desc: 'ধাপ ৩ (Base Case): প্রতিটি উপাদান একক সংখ্যায় নেমে এসেছে: [৩৮], [২৭], [৪৩], [৩]। প্রতিটি একক উপাদান সর্টেড।'
    },
    {
      level: 3,
      state: 'merge_small',
      layers: {
        root: [38, 27, 43, 3],
        leftSplit: [27, 38], // merged
        rightSplit: [3, 43],  // merged
        singletons: [[38], [27], [43], [3]],
        mergedHalves: [[27, 38], [3, 43]],
        final: null
      },
      desc: 'ধাপ ৪ (Conquer - প্রথম মার্জ): [৩৮] ও [২৭] মার্জ হয়ে হলো [২৭, ৩৮]; আর [৪৩] ও [৩] মার্জ হয়ে হলো [৩, ৪৩]।'
    },
    {
      level: 4,
      state: 'merge_final',
      layers: {
        root: [3, 27, 38, 43],
        leftSplit: [27, 38],
        rightSplit: [3, 43],
        singletons: null,
        mergedHalves: [[27, 38], [3, 43]],
        final: [3, 27, 38, 43]
      },
      desc: 'ধাপ ৫ (চূড়ান্ত মার্জ): দুই খণ্ড [২৭, ৩৮] এবং [৩, ৪৩] এর মধ্যে জিপার মার্জ চালিয়ে চূড়ান্ত সর্টেড অ্যারে [৩, ২৭, ৩৮, ৪৩] তৈরি হলো!'
    }
  ], []);

  /* -----------------------------------------------------------
   * 5. QUICK SORT TRACE: Pivot & Dynamic 3-Zone Partition
   * ---------------------------------------------------------*/
  const quickTrace = useMemo(() => [
    {
      arr: [38, 82, 10, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      leftZone: [],
      rightZone: [],
      desc: 'ধাপ ১ (পিভট নির্বাচন): শেষ উপাদান ২৭-কে পিভট নির্ধারণ করা হলো। লক্ষ্য: ২৭-এর চেয়ে ছোটগুলো বামে, বড়গুলো ডানে যাবে।'
    },
    {
      arr: [38, 82, 10, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 0,
      leftZone: [],
      rightZone: [38],
      desc: 'উপাদান ৩৮ > ২৭, তাই ৩৮ বড়দের জোন (Right Zone)-এ যাবে।'
    },
    {
      arr: [38, 82, 10, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 1,
      leftZone: [],
      rightZone: [38, 82],
      desc: 'উপাদান ৮২ > ২৭, ৮২-ও বড়দের জোন (Right Zone)-এ যাবে।'
    },
    {
      arr: [10, 82, 38, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 2,
      leftZone: [10],
      rightZone: [38, 82],
      desc: 'উপাদান ১০ < ২৭, তাই ১০-কে ছোটদের জোন (Left Zone)-এ সোয়াপ করে সামনে আনা হলো!'
    },
    {
      arr: [10, 82, 38, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 3,
      leftZone: [10],
      rightZone: [38, 82, 43],
      desc: 'উপাদান ৪৩ > ২৭, এটিও বড়দের জোন (Right Zone)-এ থাকবে।'
    },
    {
      arr: [10, 27, 38, 43, 82],
      pivotIdx: 1,
      pivotVal: 27,
      leftZone: [10],
      rightZone: [38, 43, 82],
      placed: true,
      desc: 'ধাপ ২ (পিভট স্থাপন): পিভট ২৭-কে দুই জোনের ঠিক মাঝখানে (ইনডেক্স ১) স্থায়ী করা হলো! বামে শুধুই ছোট [১০], ডানে শুধুই বড় [৩৮, ৪৩, ৮২]।'
    },
    {
      arr: [10, 27, 38, 43, 82],
      pivotIdx: -1,
      pivotVal: -1,
      leftZone: [10],
      rightZone: [38, 43, 82],
      placed: true,
      desc: 'ধাপ ৩: উভয় পাশে রিকার্সিভ পার্টিশন চালিয়ে সম্পূর্ণ অ্যারে সর্টেড: [১০, ২৭, ৩৮, ৪৩, ৮২]!'
    }
  ], []);

  // Determine current active trace length
  const activeTraceLength = useMemo(() => {
    switch (selectedAlgo) {
      case 'bubble': return bubbleTrace.length;
      case 'selection': return selectionTrace.length;
      case 'insertion': return insertionTrace.length;
      case 'merge': return mergeTrace.length;
      case 'quick': return quickTrace.length;
    }
  }, [selectedAlgo, bubbleTrace, selectionTrace, insertionTrace, mergeTrace, quickTrace]);

  // Handle switching algorithm
  const handleSelectAlgo = (key: AlgoKey) => {
    setIsPlaying(false);
    setSelectedAlgo(key);
    setStepIdx(0);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < activeTraceLength - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeTraceLength, speedMs]);

  const isAtEnd = stepIdx >= activeTraceLength - 1;

  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1429] via-[#100d1c] to-[#080710] border border-[#33224f] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Topic 13 • Sorting Algorithms
            </span>
            <span className="text-xs text-zinc-500 font-mono">Dedicated Visual Metaphors</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            সর্টিং অ্যালগরিদম: নিজস্ব মেকানিজম ও ভিজ্যুয়াল সিমুলেশন
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            প্রতিটি সর্টিং অ্যালগরিদমের নিজস্ব স্বকীয় গাণিতিক সৌন্দর্য রয়েছে। সাধারণ বার চার্টের কৃত্রিম রূপ বাদ দিয়ে প্রতিটি অ্যালগরিদমের মূল তত্ত্ব অনুযায়ী—যেমন <b>তাসের পকেট ইনসার্শন</b>, <b>মার্জ সর্টের ডিভাইড ট্রি</b> এবং <b>কুইক সর্টের পিভট জোন</b>—আলাদাভাবে নিচে সাজানো হয়েছে।
          </p>
        </div>
      </div>

      {/* 2. THE 5 DEDICATED ALGORITHM SELECTOR CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>সর্টিং অ্যালগরিদম বেছে নিন (Choose Algorithm):</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-400">ডিফল্ট স্পিড: ০.৫x (আরামদায়ক ১.২ সেকেন্ড)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ALGOS.map((item) => {
            const isSelected = selectedAlgo === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectAlgo(item.id)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#18152e] border-amber-500/80 shadow-lg shadow-amber-500/15'
                    : 'bg-[#0f111a] border-[#1d2235] hover:border-[#2f3856] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        item.badgeType === 'amber'
                          ? 'bg-amber-950/80 border-amber-700/80 text-amber-300'
                          : 'bg-sky-950/80 border-sky-700/80 text-sky-300'
                      }`}
                    >
                      {item.timeComplexity}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">{item.spaceComplexity} mem</span>
                  </div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {item.name}
                  </h4>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {item.badge}
                </p>

                <div className="pt-2 border-t border-[#1e243a] text-[10px] font-mono text-amber-400/90 flex items-center justify-between">
                  <span>{isSelected ? '✓ সক্রিয় ক্যানভাস' : 'দেখতে ক্লিক করুন'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DEDICATED VISUAL CANVAS FOR THE SELECTED ALGORITHM */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        {/* Top Control Overlay & Context */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{algo.name}: নিজস্ব ভিজ্যুয়াল সিমুলেশন</span>
            </h2>
            <p className="text-xs text-zinc-400">{algo.mechanic}</p>
          </div>

          {/* Integrated Playback Controls */}
          <div className="bg-[#0d101e]/90 backdrop-blur-md border border-[#212742] p-1.5 rounded-xl flex items-center gap-2 shadow-xl">
            {/* Step Back */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx((prev) => Math.max(0, prev - 1));
              }}
              disabled={stepIdx === 0 || isPlaying}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
              title="এক ধাপ পেছনে যান"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={isAtEnd}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs font-mono transition-all cursor-pointer shadow ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
              } disabled:opacity-30`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>

            {/* Step Forward */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx((prev) => Math.min(activeTraceLength - 1, prev + 1));
              }}
              disabled={isAtEnd || isPlaying}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
              title="এক ধাপ সামনে যান"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx(0);
              }}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
              title="রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Step indicator */}
            <div className="text-[11px] font-mono text-zinc-400 px-1 border-l border-[#212742]">
              ধাপ <span className="text-amber-400 font-bold">{stepIdx + 1}</span> / {activeTraceLength}
            </div>
          </div>
        </div>

        {/* =========================================================
            CANVAS 1: BUBBLE SORT (Adjacent Bubble Swapper)
           ========================================================= */}
        {selectedAlgo === 'bubble' && (
          <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-amber-400 font-bold">Bubble Swapping Slots:</span>
              <span>বড় মানগুলো প্রতি পাসে ডানে বুদবুদের মতো ভেসে ওঠে</span>
            </div>

            {/* Bubble Balls */}
            <div className="flex items-center justify-center gap-4 py-8">
              {bubbleTrace[stepIdx].arr.map((val: number, idx: number) => {
                const isComparing = bubbleTrace[stepIdx].pair.includes(idx);
                const isSorted = bubbleTrace[stepIdx].sorted.includes(idx);
                const isSwapped = bubbleTrace[stepIdx].swapped && isComparing;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-mono text-base font-black transition-all duration-300 ${
                        isSorted
                          ? 'bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 ring-4 ring-emerald-500/30 scale-105 shadow-xl'
                          : isSwapped
                          ? 'bg-rose-500 text-white ring-4 ring-rose-400/50 scale-110 shadow-2xl animate-bounce'
                          : isComparing
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40 scale-110 shadow-lg'
                          : 'bg-[#15192c] border-2 border-[#283252] text-zinc-200'
                      }`}
                    >
                      {val}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{bubbleTrace[stepIdx].desc}</span>
            </div>
          </div>
        )}

        {/* =========================================================
            CANVAS 2: SELECTION SORT (Sorted Zone vs Unsorted Search)
           ========================================================= */}
        {selectedAlgo === 'selection' && (
          <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">
                সাজানো জোন (Sorted) ➔ <span className="text-sky-400">অগোছালো জোন (Unsorted Scanner)</span>
              </span>
              <span className="text-zinc-400">সর্বনিম্ন মান নির্বাচন করে সামনে আনা</span>
            </div>

            {/* Split Cards */}
            <div className="flex items-center justify-center gap-3 py-6">
              {selectionTrace[stepIdx].arr.map((val: number, idx: number) => {
                const isSorted = idx <= selectionTrace[stepIdx].sortedUntil;
                const isScanning = selectionTrace[stepIdx].scanIdx === idx;
                const isMin = selectionTrace[stepIdx].minIdx === idx;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-14 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                        isSorted
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10'
                          : isMin
                          ? 'bg-amber-400 border-amber-300 text-slate-950 ring-4 ring-amber-400/40 scale-105 shadow-xl'
                          : isScanning
                          ? 'bg-sky-600 border-sky-400 text-white ring-2 ring-sky-400'
                          : 'bg-[#121626] border-[#222a44] text-zinc-300'
                      }`}
                    >
                      <span className="text-[10px] opacity-75">{isSorted ? 'SORTED' : isMin ? 'MIN' : 'UNSORT'}</span>
                      <span className="text-base">{val}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{selectionTrace[stepIdx].desc}</span>
            </div>
          </div>
        )}

        {/* =========================================================
            CANVAS 3: INSERTION SORT (Playing Card Pocket Insertion)
           ========================================================= */}
        {selectedAlgo === 'insertion' && (
          <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold">Hand of Cards (খেলোয়াড়ের তাসের হাত):</span>
              <span className="text-zinc-400">নতুন কার্ড তুলে আগের সাজানো স্লটে গুঁজে দেওয়া</span>
            </div>

            {/* Hand Key Floating Card */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 flex items-center justify-center">
                {insertionTrace[stepIdx].handKey !== null ? (
                  <div className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow-lg animate-pulse flex items-center gap-1.5">
                    <span>হাতে তোলা Key কার্ড: {insertionTrace[stepIdx].handKey}</span>
                  </div>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-500">সব কার্ড বর্তমানে ডেক বা টেবিলে সাজানো</span>
                )}
              </div>

              {/* Cards in Deck */}
              <div className="flex items-center justify-center gap-3">
                {insertionTrace[stepIdx].arr.map((val: number | null, idx: number) => {
                  const isEmptySlot = val === null;
                  const isSorted = idx < insertionTrace[stepIdx].sortedCount;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-14 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                          isEmptySlot
                            ? 'border-dashed border-amber-400/60 bg-amber-500/10 text-amber-300'
                            : isSorted
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow'
                            : 'bg-[#121626] border-[#222a44] text-zinc-300'
                        }`}
                      >
                        <span className="text-[10px] opacity-75">{isEmptySlot ? 'SLOT' : 'CARD'}</span>
                        <span className="text-base">{isEmptySlot ? '___' : val}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{insertionTrace[stepIdx].desc}</span>
            </div>
          </div>
        )}

        {/* =========================================================
            CANVAS 4: MERGE SORT (Divide & Conquer Hierarchical Tree)
           ========================================================= */}
        {selectedAlgo === 'merge' && (
          <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[340px] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-sky-400 font-bold">Divide &amp; Conquer Hierarchical Tree:</span>
              <span className="text-zinc-400">টুকরো করা (Divide) ➔ পুনরায় একত্র করে সাজানো (Merge)</span>
            </div>

            {/* Dynamic Hierarchical Tree View */}
            <div className="flex flex-col items-center gap-4 py-3">
              {/* Root Layer */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#12172a] border border-sky-500/40">
                <span className="text-xs font-mono font-bold text-sky-300">
                  [{mergeTrace[stepIdx].layers.root.join(', ')}]
                </span>
              </div>

              {/* Arrow down if split */}
              {mergeTrace[stepIdx].layers.leftSplit && (
                <div className="flex items-center gap-16 text-zinc-500 text-xs font-mono">
                  <span>↙ Divide</span>
                  <span>Divide ↘</span>
                </div>
              )}

              {/* Halves Layer */}
              {mergeTrace[stepIdx].layers.leftSplit && (
                <div className="flex items-center gap-10">
                  <div className="px-3 py-1.5 rounded-xl bg-[#141b33] border border-indigo-500/50 font-mono text-xs text-indigo-300 font-bold">
                    [{mergeTrace[stepIdx].layers.leftSplit.join(', ')}]
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-[#141b33] border border-indigo-500/50 font-mono text-xs text-indigo-300 font-bold">
                    [{mergeTrace[stepIdx].layers.rightSplit.join(', ')}]
                  </div>
                </div>
              )}

              {/* Singletons Base Layer */}
              {mergeTrace[stepIdx].layers.singletons && (
                <div className="flex items-center gap-4 pt-2">
                  {mergeTrace[stepIdx].layers.singletons.map((s: number[], i: number) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs text-amber-300"
                    >
                      {s[0]}
                    </div>
                  ))}
                </div>
              )}

              {/* Final Sorted Result Banner */}
              {mergeTrace[stepIdx].layers.final && (
                <div className="mt-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 font-mono text-sm font-bold flex items-center gap-2 shadow-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>চূড়ান্ত মার্জড সর্টেড অ্যারে: [{mergeTrace[stepIdx].layers.final.join(', ')}]</span>
                </div>
              )}
            </div>

            {/* Explanation */}
            <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{mergeTrace[stepIdx].desc}</span>
            </div>
          </div>
        )}

        {/* =========================================================
            CANVAS 5: QUICK SORT (Pivot Partitioning 3-Zone View)
           ========================================================= */}
        {selectedAlgo === 'quick' && (
          <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold">3-Zone Pivot Partitioning:</span>
              <span className="text-zinc-400">ছোটগুলো বাম জোনে, পিভট মাঝে, বড়গুলো ডান জোনে</span>
            </div>

            {/* 3-Zone Visual Partition Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
              {/* Left Zone (< Pivot) */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-700/50 flex flex-col items-center justify-center min-h-[110px] space-y-2">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
                  Left Zone (&lt; Pivot)
                </span>
                <div className="flex items-center gap-2">
                  {(!quickTrace[stepIdx].leftZone || quickTrace[stepIdx].leftZone.length === 0) ? (
                    <span className="text-xs text-zinc-500 italic">এখনও কোনো ছোট মান নেই</span>
                  ) : (
                    quickTrace[stepIdx].leftZone.map((v: number, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-900 border border-indigo-600 text-xs font-mono font-bold text-indigo-200">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Center Zone: Pivot */}
              <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-400 flex flex-col items-center justify-center min-h-[110px] space-y-2 shadow-lg shadow-amber-500/10">
                <span className="text-[10px] font-mono text-amber-300 uppercase font-bold tracking-wider">
                  🎯 মূল পিভট (Pivot)
                </span>
                <div className="text-2xl font-mono font-black text-white">
                  {quickTrace[stepIdx].pivotVal > 0 ? quickTrace[stepIdx].pivotVal : '✓'}
                </div>
              </div>

              {/* Right Zone (> Pivot) */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-700/50 flex flex-col items-center justify-center min-h-[110px] space-y-2">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider">
                  Right Zone (&gt; Pivot)
                </span>
                <div className="flex items-center gap-2">
                  {(!quickTrace[stepIdx].rightZone || quickTrace[stepIdx].rightZone.length === 0) ? (
                    <span className="text-xs text-zinc-500 italic">এখনও কোনো বড় মান নেই</span>
                  ) : (
                    quickTrace[stepIdx].rightZone.map((v: number, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-900 border border-rose-600 text-xs font-mono font-bold text-rose-200">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Overall Array View below */}
            <div className="flex items-center justify-center gap-2 pt-1 border-t border-[#1b2034]">
              {quickTrace[stepIdx].arr.map((val: number, idx: number) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold ${
                    quickTrace[stepIdx].pivotIdx === idx
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400'
                      : 'bg-[#121626] border border-[#212a44] text-zinc-300'
                  }`}
                >
                  {val}
                </span>
              ))}
            </div>

            {/* Explanation */}
            <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{quickTrace[stepIdx].desc}</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Efficiency Growth Table: Quadratic O(N^2) vs Log-Linear O(N log N) */}
      <div className="bg-[#0f111a] border border-[#1e2233] rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <TrendingDown className="w-4 h-4 text-emerald-400" />
          <span>ডেটার পরিমাণ বাড়লে অপারেশনের তুলনামূলক বৃদ্ধি (Complexity Growth)</span>
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
              <tr>
                <th className="p-3.5 font-medium">উপাদান সংখ্যা (N)</th>
                <th className="p-3.5 font-medium text-amber-400">ছোট ডেটা: O(N²) বাবল/সিলেকশন/ইনসার্শন</th>
                <th className="p-3.5 font-medium text-sky-400">বড় ডেটা: O(N log₂ N) মার্জ/কুইক</th>
                <th className="p-3.5 font-medium font-sans">দক্ষতার পার্থক্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171926] text-zinc-200">
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১০ টি</td>
                <td className="p-3.5 text-amber-400">১০০ টি অপারেশন</td>
                <td className="p-3.5 text-sky-400">৩৩ টি অপারেশন</td>
                <td className="p-3.5 text-zinc-300 text-xs font-sans">ছোট ডেটায় তেমন পার্থক্য বোঝা যায় না</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১,০০০ টি</td>
                <td className="p-3.5 text-amber-400">১০,০০,০০০ (১০ লাখ)</td>
                <td className="p-3.5 text-sky-400">১০,০০০ টি অপারেশন</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">১০০ গুণ বেশি দ্রুত!</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১,০০,০০০ টি (১ লাখ)</td>
                <td className="p-3.5 text-rose-400">১০,০০,০০,০০,০০০ (১ হাজার কোটি!)</td>
                <td className="p-3.5 text-emerald-400">১৭,০০,০০০ (১৭ লাখ)</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">~৬,০০০ গুণ বেশি দ্রুত!</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold">১০,০০,০০০ টি (১০ লাখ)</td>
                <td className="p-3.5 text-rose-400">১,০০,০০,০০,০০,০০০ (CPU হ্যাং!)</td>
                <td className="p-3.5 text-emerald-400">২,০০,০০,০০০ (২ কোটি)</td>
                <td className="p-3.5 text-emerald-400 text-xs font-sans font-bold">৫০,০০০ গুণ বেশি দ্রুত!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Real-Life Production Engineering Scenarios */}
      <RealLifeScenario
        topicName="সর্টিং অ্যালগরিদমের বাস্তব প্রয়োগ (Real-World Scenarios)"
        scenarios={[
          {
            title: "১. হাতের খেলার তাস ক্রমানুসারে সাজানো (Playing Cards)",
            subtitle: "নতুন কার্ড এলে বাঁহাতের সঠিক স্লটে গুঁজে দেওয়া",
            badge: "Insertion Sort (Small Data)",
            visualTag: "Adaptive O(N)",
            accentColor: "amber",
            analogy:
              "তাসের খেলায় হাতে নতুন কার্ড আসলে আমরা বাঁহাতের সাজানো কার্ডগুলোর মাঝে সঠিক স্লটটি খুঁজে সেখানে গুঁজে দেই। ডানের কার্ডগুলো সামান্য ডানে সরে গিয়ে জায়গা করে দেয়। ছোট ডেটাসেটে এটি দ্রুততম!",
            whyItFits:
              "বাস্তবে মানুষ স্বজ্ঞাতভাবে ছোট ডেটা বা প্রায় সাজানো ডেটায় Insertion Sort ব্যবহার করে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 py-1">
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800">[3, 7, 9]</span>
                <span>+ তাস 5 ➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">[3, 5, 7, 9]</span>
              </div>
            ),
          },
          {
            title: "২. ডেটাবেজে গিগাবাইট পরিমাণ ডেটা সাজানো (SQL ORDER BY)",
            subtitle: "র‍্যামের বাইরে ডিস্কে থাকা কোটি কোটি রেকর্ডের এক্সটার্নাল সর্ট",
            badge: "Merge Sort (External)",
            visualTag: "O(N log N) Stable",
            accentColor: "sky",
            analogy:
              "ডেটাবেজে যখন ১০০ গিগাবাইটের টেবিল সর্ট করতে হয় যা ১৬ জিবি র‍্যামে ধরে না, তখন ডেটাবেজ এক্সটার্নাল মার্জ সর্ট ব্যবহার করে। ছোট ছোট চাঙ্ক ডিস্কে সর্ট করে নিয়ে পরে মার্জ করে ফেলে।",
            whyItFits:
              "মার্জ সর্টের স্থিতিশীলতা (Stability) এবং সিকোয়েনশিয়াল রিড-রাইট প্যাটার্ন ডেটাবেজ ইঞ্জিনের জন্য অপরিহার্য।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">Chunk 1</span>
                <span>+</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">Chunk 2</span>
                <span>➔ Merge ➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">Sorted File</span>
              </div>
            ),
          },
          {
            title: "৩. ভি৮ জাভাস্ক্রিপ্ট ও পাইথনে বিল্ট-ইন সর্ট (Timsort & Quicksort)",
            subtitle: "প্রোগ্রামিং ল্যাঙ্গুয়েজের Array.prototype.sort() মেকানিজম",
            badge: "Quick Sort / Timsort",
            visualTag: "High Cache Locality",
            accentColor: "emerald",
            analogy:
              "জাভাস্ক্রিপ্ট বা পাইথনের মতো আধুনিক প্রোগ্রামিং ল্যাঙ্গুয়েজ সাধারণ একটি অ্যালগরিদমের ওপর নির্ভর করে না। বড় অংশের জন্য কুইক/মার্জ সর্ট চালায় এবং খণ্ডগুলো যখন ছোট (যেমন ৩২-এর নিচে) হয়ে যায়, তখন ইনসার্শন সর্ট দিয়ে শেষ করে। একে বলে হাইব্রিড সর্ট!",
            whyItFits:
              "CPU ক্যাশ লোকালিটি এবং প্র্যাকটিক্যাল গতির সমন্বয়ে কুইক সর্টের নীতি আধুনিক সফটওয়্যারের প্রাণ।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">Divide &amp; Conquer</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">Optimal Speed</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
