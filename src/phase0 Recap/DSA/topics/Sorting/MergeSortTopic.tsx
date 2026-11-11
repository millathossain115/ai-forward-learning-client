'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  HardDrive,
  ShieldCheck,
  Split,
  Shuffle,
  Layers,
  GitBranch,
  Network,
  Eye,
  Sliders
} from 'lucide-react';

// Default 8-element array matching Image 1
const DEFAULT_8_ARRAY = [5, 2, 4, 7, 1, 3, 2, 6];

const PRESETS = [
  { label: 'ছবি ১ (ডায়াগ্রাম রেফারেন্স)', array: [5, 2, 4, 7, 1, 3, 2, 6] },
  { label: 'ছবি ২ (৭/৮ সংখ্যা ভ্যারিয়েন্ট)', array: [12, 8, 9, 3, 11, 5, 4, 1] },
  { label: 'ক্লাসিক টেক্সটবুক', array: [38, 27, 43, 3, 9, 82, 10, 19] }
];

// Helper to build 7-level tree data for 8 elements
function buildTreeStructure(initial: number[]) {
  const arr = initial.slice(0, 8);
  while (arr.length < 8) arr.push(Math.floor(Math.random() * 80) + 10);

  // Divide Rows
  const r0 = [arr];
  const r1 = [arr.slice(0, 4), arr.slice(4, 8)];
  const r2 = [arr.slice(0, 2), arr.slice(2, 4), arr.slice(4, 6), arr.slice(6, 8)];
  const r3 = [[arr[0]], [arr[1]], [arr[2]], [arr[3]], [arr[4]], [arr[5]], [arr[6]], [arr[7]]];

  // Helper merge function
  const merge = (l: number[], r: number[]) => {
    const res: number[] = [];
    let i = 0, j = 0;
    while (i < l.length && j < r.length) {
      if (l[i] <= r[j]) { res.push(l[i]); i++; }
      else { res.push(r[j]); j++; }
    }
    while (i < l.length) { res.push(l[i]); i++; }
    while (j < r.length) { res.push(r[j]); j++; }
    return res;
  };

  // Merge Rows
  const r4 = [
    merge(r3[0], r3[1]),
    merge(r3[2], r3[3]),
    merge(r3[4], r3[5]),
    merge(r3[6], r3[7])
  ];
  const r5 = [
    merge(r4[0], r4[1]),
    merge(r4[2], r4[3])
  ];
  const r6 = [
    merge(r5[0], r5[1])
  ];

  return { r0, r1, r2, r3, r4, r5, r6 };
}

interface TreeStep {
  title: string;
  phase: 'divide' | 'base' | 'merge' | 'complete';
  desc: string;
  activeNodeIds: string[];
  activeArrowIds: string[];
  revealedNodeIds: string[];
  revealedArrowIds: string[];
}

function generateTreeSteps(tree: ReturnType<typeof buildTreeStructure>): TreeStep[] {
  const { r0, r1, r2, r3, r4, r5, r6 } = tree;

  return [
    {
      title: 'মার্জ সর্টের সূচনা (Initial Array)',
      phase: 'divide',
      desc: `৮টি উপাদানের অবিন্যস্ত মূল অ্যারে: [${r0[0].join(', ')}]। রিকার্সিভ ডিভাইড অ্যান্ড কনকার নিয়মে এটি ঠিক মাঝখান দিয়ে দুই সমান ভাগে ভাগ হবে।`,
      activeNodeIds: ['r0_0'],
      activeArrowIds: [],
      revealedNodeIds: ['r0_0'],
      revealedArrowIds: []
    },
    {
      title: 'লেভেল ১ বিভাজন (Divide into 2 Halves)',
      phase: 'divide',
      desc: `অ্যারে দুই ভাগ হলো: বামে [${r1[0].join(', ')}] এবং ডানে [${r1[1].join(', ')}]।`,
      activeNodeIds: ['r1_0', 'r1_1'],
      activeArrowIds: ['a_r0_r1_0', 'a_r0_r1_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1']
    },
    {
      title: 'লেভেল ২ বিভাজন: বাম অর্ধেক (Divide Left 4)',
      phase: 'divide',
      desc: `বামের অংশকে পুনরায় বিভক্ত করে [${r2[0].join(', ')}] এবং [${r2[1].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r2_0', 'r2_1'],
      activeArrowIds: ['a_r1_r2_0', 'a_r1_r2_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ১ম জোড়া (Base Case: Single Elements)',
      phase: 'base',
      desc: `একক উপাদান [${r3[0][0]}] এবং [${r3[1][0]}] পৃথক হলো। ১টি একক উপাদান স্বয়ংক্রিয়ভাবে সর্টেড!`,
      activeNodeIds: ['r3_0', 'r3_1'],
      activeArrowIds: ['a_r2_r3_0', 'a_r2_r3_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1']
    },
    {
      title: 'মার্জিং ১ম জোড়া (Merge Pair 1)',
      phase: 'merge',
      desc: `[${r3[0][0]}] এবং [${r3[1][0]}] তুলনা করে সাজানো জোড়া [${r4[0].join(', ')}] গঠিত হলো।`,
      activeNodeIds: ['r4_0'],
      activeArrowIds: ['a_r3_r4_0', 'a_r3_r4_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ২য় জোড়া (Base Case: Next Single Elements)',
      phase: 'base',
      desc: `পরবর্তী শাখা ভেঙে একক উপাদান [${r3[2][0]}] এবং [${r3[3][0]}] পৃথক হলো।`,
      activeNodeIds: ['r3_2', 'r3_3'],
      activeArrowIds: ['a_r2_r3_2', 'a_r2_r3_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3']
    },
    {
      title: 'মার্জিং ২য় জোড়া (Merge Pair 2)',
      phase: 'merge',
      desc: `[${r3[2][0]}] এবং [${r3[3][0]}] তুলনা করে সাজানো জোড়া [${r4[1].join(', ')}] গঠিত হলো।`,
      activeNodeIds: ['r4_1'],
      activeArrowIds: ['a_r3_r4_2', 'a_r3_r4_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3']
    },
    {
      title: 'বামের ৪-উপাদান মার্জ (Merge Left 4 elements)',
      phase: 'merge',
      desc: `সর্টেড সাব-অ্যারে [${r4[0].join(', ')}] এবং [${r4[1].join(', ')}] মিলিয়ে [${r5[0].join(', ')}] তৈরি হলো!`,
      activeNodeIds: ['r5_0'],
      activeArrowIds: ['a_r4_r5_0', 'a_r4_r5_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1']
    },
    {
      title: 'ডান অংশের বিভাজন শুরু (Divide Right Half)',
      phase: 'divide',
      desc: `ডান পাশের [${r1[1].join(', ')}]-কে ভাগ করে [${r2[2].join(', ')}] এবং [${r2[3].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r2_2', 'r2_3'],
      activeArrowIds: ['a_r1_r2_2', 'a_r1_r2_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ৩য় জোড়া (Base Case)',
      phase: 'base',
      desc: `একক উপাদান [${r3[4][0]}] এবং [${r3[5][0]}] পৃথক হলো।`,
      activeNodeIds: ['r3_4', 'r3_5'],
      activeArrowIds: ['a_r2_r3_4', 'a_r2_r3_5'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5']
    },
    {
      title: 'মার্জিং ৩য় জোড়া (Merge Pair 3)',
      phase: 'merge',
      desc: `[${r3[4][0]}] এবং [${r3[5][0]}] মিলিয়ে সাজানো জোড়া [${r4[2].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r4_2'],
      activeArrowIds: ['a_r3_r4_4', 'a_r3_r4_5'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ৪র্থ জোড়া (Base Case)',
      phase: 'base',
      desc: `একক উপাদান [${r3[6][0]}] এবং [${r3[7][0]}] পৃথক হলো।`,
      activeNodeIds: ['r3_6', 'r3_7'],
      activeArrowIds: ['a_r2_r3_6', 'a_r2_r3_7'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7']
    },
    {
      title: 'মার্জিং ৪র্থ জোড়া (Merge Pair 4)',
      phase: 'merge',
      desc: `[${r3[6][0]}] এবং [${r3[7][0]}] মিলিয়ে সাজানো জোড়া [${r4[3].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r4_3'],
      activeArrowIds: ['a_r3_r4_6', 'a_r3_r4_7'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7']
    },
    {
      title: 'ডানের ৪-উপাদান মার্জ (Merge Right 4 elements)',
      phase: 'merge',
      desc: `সর্টেড সাব-অ্যারে [${r4[2].join(', ')}] এবং [${r4[3].join(', ')}] মিলিয়ে [${r5[1].join(', ')}] তৈরি হলো!`,
      activeNodeIds: ['r5_1'],
      activeArrowIds: ['a_r4_r5_2', 'a_r4_r5_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3']
    },
    {
      title: 'চূড়ান্ত গ্র্যান্ড মার্জিং (Final Grand Merge)',
      phase: 'merge',
      desc: `বামের সর্টেড অর্ধেক [${r5[0].join(', ')}] এবং ডানের সর্টেড অর্ধেক [${r5[1].join(', ')}] মিলিয়ে চূড়ান্ত পূর্ণাঙ্গ সর্টেড অ্যারে [${r6[0].join(', ')}] প্রস্তুত!`,
      activeNodeIds: ['r6_0'],
      activeArrowIds: ['a_r5_r6_0', 'a_r5_r6_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1', 'r6_0'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3', 'a_r5_r6_0', 'a_r5_r6_1']
    },
    {
      title: 'মার্জ সর্ট সম্পূর্ণ সম্পন্ন! (Complete)',
      phase: 'complete',
      desc: `অভিনন্দন! ডিভাইড অ্যান্ড কনকার প্রক্রিয়ায় O(N log N) সময়ে পূর্ণ অ্যারে সফলভাবে সাজানো সমাপ্ত হয়েছে।`,
      activeNodeIds: ['r6_0'],
      activeArrowIds: [],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1', 'r6_0'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3', 'a_r5_r6_0', 'a_r5_r6_1']
    }
  ];
}

export default function MergeSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [arrayData, setArrayData] = useState<number[]>(DEFAULT_8_ARRAY);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const [treeViewMode, setTreeViewMode] = useState<'stepper' | 'blueprint'>('stepper');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const FIXED_SPEED_MS = 1400;

  // Build tree structure synchronously
  const tree = useMemo(() => buildTreeStructure(arrayData), [arrayData]);
  const steps = useMemo(() => generateTreeSteps(tree), [tree]);

  const currentStep = steps[stepIdx] || steps[0];
  const isAtEnd = stepIdx >= steps.length - 1;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, FIXED_SPEED_MS);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  const handlePresetSelect = (presetArr: number[]) => {
    setIsPlaying(false);
    setArrayData(presetArr);
    setStepIdx(0);
  };

  const handleRandomize = () => {
    setIsPlaying(false);
    const newArr: number[] = [];
    for (let i = 0; i < 8; i++) {
      newArr.push(Math.floor(Math.random() * 89) + 10);
    }
    setArrayData(newArr);
    setStepIdx(0);
  };

  // Node helper to render array block
  const renderArrayNode = (
    id: string,
    values: number[],
    xCenter: number,
    yTop: number,
    type: 'divide' | 'merge',
    statusLabel?: string
  ) => {
    const isBlueprint = treeViewMode === 'blueprint';
    const isRevealed = isBlueprint || currentStep.revealedNodeIds.includes(id);
    const isActive = currentStep.activeNodeIds.includes(id);

    const cellWidth = 24;
    const cellHeight = 28;
    const totalWidth = values.length * cellWidth;
    const xStart = xCenter - totalWidth / 2;

    const isDivide = type === 'divide';

    // Theme palette
    const fillBg = isDivide ? '#0c1a2c' : '#231805';
    const borderColor = isDivide ? '#38bdf8' : '#fbbf24';
    const textColor = isDivide ? '#e0f2fe' : '#fef08a';
    const dividerColor = isDivide ? '#1e3857' : '#573d0a';

    const activeBorderColor = isDivide ? '#67e8f9' : '#fde047';
    const activeFill = isDivide ? '#123052' : '#3d2b09';

    const pillWidth = statusLabel ? Math.max(44, statusLabel.length * 6.5 + 10) : 0;

    return (
      <g
        key={id}
        className="transition-all duration-300"
        style={{
          opacity: isRevealed ? 1 : 0.15,
          cursor: 'pointer'
        }}
      >
        {/* Static calm status badge pill when active - no jumping */}
        {statusLabel && isActive && (
          <g>
            <rect
              x={xCenter - pillWidth / 2}
              y={yTop - 15}
              width={pillWidth}
              height={13}
              rx={3.5}
              fill={isDivide ? '#071626' : '#241503'}
              stroke={activeBorderColor}
              strokeWidth={1}
            />
            <text
              x={xCenter}
              y={yTop - 5.5}
              textAnchor="middle"
              fill={activeBorderColor}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="7.5"
              fontWeight="bold"
              letterSpacing="0.05em"
            >
              {statusLabel}
            </text>
          </g>
        )}

        {/* Subtle steady ring when active */}
        {isActive && (
          <rect
            x={xStart - 3}
            y={yTop - 3}
            width={totalWidth + 6}
            height={cellHeight + 6}
            rx={8}
            fill="none"
            stroke={activeBorderColor}
            strokeWidth={1.5}
            opacity={0.7}
          />
        )}

        {/* Main box */}
        <rect
          x={xStart}
          y={yTop}
          width={totalWidth}
          height={cellHeight}
          rx={6}
          fill={isActive ? activeFill : fillBg}
          stroke={isActive ? activeBorderColor : borderColor}
          strokeWidth={isActive ? 2.5 : 1.5}
        />

        {/* Internal dividers */}
        {values.map((_, i) => {
          if (i === 0) return null;
          const lineX = xStart + i * cellWidth;
          return (
            <line
              key={`div-${i}`}
              x1={lineX}
              y1={yTop}
              x2={lineX}
              y2={yTop + cellHeight}
              stroke={dividerColor}
              strokeWidth={1}
            />
          );
        })}

        {/* Cell numbers */}
        {values.map((v, i) => (
          <text
            key={`txt-${i}`}
            x={xStart + i * cellWidth + cellWidth / 2}
            y={yTop + cellHeight / 2 + 4.5}
            textAnchor="middle"
            fill={isActive ? '#ffffff' : textColor}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="12"
            fontWeight="bold"
          >
            {v}
          </text>
        ))}
      </g>
    );
  };

  // Curved arrow helper
  const renderArrow = (
    id: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: 'divide' | 'merge'
  ) => {
    const isBlueprint = treeViewMode === 'blueprint';
    const isRevealed = isBlueprint || currentStep.revealedArrowIds.includes(id);
    const isActive = currentStep.activeArrowIds.includes(id);

    const isDivide = type === 'divide';
    const strokeColor = isDivide ? '#38bdf8' : '#10b981'; // Blue for divide, emerald/green for merge (Image 1 style!)
    const marker = isDivide ? 'url(#arrow-sky)' : 'url(#arrow-emerald)';

    const midY = (y1 + y2) / 2;
    const pathD = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    return (
      <path
        key={id}
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isActive ? 2.5 : 1.5}
        strokeDasharray={isActive ? 'none' : isDivide ? 'none' : 'none'}
        markerEnd={marker}
        style={{
          opacity: isRevealed ? (isActive ? 1 : 0.8) : 0.12,
          transition: 'all 0.3s ease'
        }}
      />
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121d28] via-[#0d141e] to-[#070b10] border border-[#21425b] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold">
              Topic 13.4 • Sorting Algorithm
            </span>
            <span className="text-xs text-zinc-400 font-mono">Divide &amp; Conquer Tree • 2-Pointer Zipper Merging</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>মার্জ সর্ট (Merge Sort)</span>
            <span className="text-xs font-mono font-normal px-3 py-1 rounded-full bg-[#122838] border border-teal-500/30 text-teal-300">
              Guaranteed O(N log N) Everywhere
            </span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            খাতা-কলমে যেভাবে আমরা প্রথমে একটি অ্যারেকে বারবার দুই ভাগে ভাগ করে একক সংখ্যায় নিয়ে যাই এবং পরে পাশাপাশি দুটি সাজানো গ্রুপকে পয়েন্টার দিয়ে জিপারের মতো মিলিয়ে বড় গ্রুপ তৈরি করি—নিচে ঠিক সেই খাতা-কলমের অভিজ্ঞতায় মার্জ সর্ট তুলে ধরা হলো।
          </p>
        </div>
      </div>

      {/* 2. Interactive Navigation Pills & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#201d30] pb-4">
        <div className="flex items-center gap-2 bg-[#120f1e] p-1.5 rounded-2xl border border-[#26203d]">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            🌳 রিকার্শন ট্রি সিমুলেশন (Divide &amp; Conquer Tree)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            💻 রিকার্সিভ কোড ও মার্জ ফাংশন
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            💾 এক্সটার্নাল ডিস্ক সর্ট ও কমপ্লেক্সিটি
          </button>
        </div>

        {/* Dynamic New Array Generator Button */}
        <button
          onClick={handleRandomize}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600/30 to-emerald-600/30 hover:from-teal-600/50 hover:to-emerald-600/50 border border-teal-500/40 text-teal-200 font-mono text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105"
          title="নতুন যেকোনো ৮টি র্যান্ডম সংখ্যা দিয়ে সম্পূর্ণ নতুন মার্জ ট্রি সিমুলেশন দেখুন"
        >
          <Shuffle className="w-4 h-4 text-teal-300" />
          <span>নতুন ৮ সংখ্যা তৈরি করুন (Randomize)</span>
        </button>
      </div>

      {/* 3. MAIN SIMULATION CANVAS */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="relative rounded-3xl bg-[#080d14] border border-[#182838] p-5 md:p-6 shadow-2xl overflow-hidden space-y-6">
            {/* Top Toolbar: Presets + View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#142333]">
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 font-semibold">স্যাম্পল ডেটা:</span>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetSelect(p.array)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      JSON.stringify(arrayData) === JSON.stringify(p.array)
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold shadow'
                        : 'bg-[#0f1724] border-[#1d2d42] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle: Stepper vs Blueprint */}
              <div className="flex items-center gap-1.5 bg-[#0d1624] p-1 rounded-xl border border-[#1c2e44]">
                <button
                  onClick={() => setTreeViewMode('stepper')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    treeViewMode === 'stepper'
                      ? 'bg-teal-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>ধাপে ধাপে অ্যানিমেশন</span>
                </button>
                <button
                  onClick={() => setTreeViewMode('blueprint')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    treeViewMode === 'blueprint'
                      ? 'bg-amber-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>এক নজরে সম্পূর্ণ ব্লুপ্রিন্ট</span>
                </button>
              </div>
            </div>

            {/* Playback Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play Tree'}</span>
                </button>

                <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1c2e44]">
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(Math.max(0, stepIdx - 1)); }}
                    disabled={stepIdx === 0}
                    className="p-1.5 rounded-lg hover:bg-[#152336] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                    title="Step Back"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-mono text-xs text-zinc-300 font-medium">
                    ধাপ {stepIdx + 1} / {steps.length}
                  </span>
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(Math.min(steps.length - 1, stepIdx + 1)); }}
                    disabled={isAtEnd}
                    className="p-1.5 rounded-lg hover:bg-[#152336] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                    title="Step Forward"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(0); }}
                    className="p-1.5 rounded-lg hover:bg-[#152336] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                    title="Reset to Start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                  currentStep.phase === 'divide'
                    ? 'bg-sky-950/60 border-sky-400 text-sky-200'
                    : currentStep.phase === 'base'
                    ? 'bg-purple-950/60 border-purple-400 text-purple-200'
                    : currentStep.phase === 'complete'
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow'
                    : 'bg-amber-950/70 border-amber-400 text-amber-200'
                }`}>
                  {currentStep.title}
                </span>
              </div>
            </div>

            {/* Tree Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono px-3 py-2 rounded-xl bg-[#0c1420] border border-[#162536]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-3 h-3 rounded bg-[#0c1a2c] border border-sky-400 inline-block" />
                  <span>বিভাজন শাখা (Divide Phase)</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-3 h-3 rounded bg-[#231805] border border-amber-400 inline-block" />
                  <span>মার্জিং শাখা (Conquer / Merge Phase)</span>
                </span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="text-sky-400 font-bold">↓</span> নীল তীর: Divide
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-emerald-400 font-bold">↓</span> সবুজ তীর: 2-Way Merge
                </span>
              </div>
            </div>

            {/* FULL MERGE SORT RECURSION TREE SVG CANVAS */}
            <div className="w-full bg-[#050a10] border border-[#152336] rounded-2xl p-2 md:p-4 overflow-x-auto flex justify-center shadow-inner">
              <div className="min-w-[760px] max-w-[840px] w-full">
                <svg
                  viewBox="0 0 800 630"
                  className="w-full h-auto max-h-[640px] select-none"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <marker id="arrow-sky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 z" fill="#38bdf8" />
                    </marker>
                    <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M 0 0 L 6 3 L 0 6 z" fill="#10b981" />
                    </marker>
                  </defs>

                  {/* ================= DIVIDE ARROWS (BLUE) ================= */}
                  {/* Row 0 -> Row 1 */}
                  {renderArrow('a_r0_r1_0', 400, 53, 200, 115, 'divide')}
                  {renderArrow('a_r0_r1_1', 400, 53, 600, 115, 'divide')}

                  {/* Row 1 -> Row 2 */}
                  {renderArrow('a_r1_r2_0', 200, 143, 100, 205, 'divide')}
                  {renderArrow('a_r1_r2_1', 200, 143, 300, 205, 'divide')}
                  {renderArrow('a_r1_r2_2', 600, 143, 500, 205, 'divide')}
                  {renderArrow('a_r1_r2_3', 600, 143, 700, 205, 'divide')}

                  {/* Row 2 -> Row 3 */}
                  {renderArrow('a_r2_r3_0', 100, 233, 50, 295, 'divide')}
                  {renderArrow('a_r2_r3_1', 100, 233, 150, 295, 'divide')}
                  {renderArrow('a_r2_r3_2', 300, 233, 250, 295, 'divide')}
                  {renderArrow('a_r2_r3_3', 300, 233, 350, 295, 'divide')}
                  {renderArrow('a_r2_r3_4', 500, 233, 450, 295, 'divide')}
                  {renderArrow('a_r2_r3_5', 500, 233, 550, 295, 'divide')}
                  {renderArrow('a_r2_r3_6', 700, 233, 650, 295, 'divide')}
                  {renderArrow('a_r2_r3_7', 700, 233, 750, 295, 'divide')}

                  {/* ================= MERGE ARROWS (EMERALD GREEN) ================= */}
                  {/* Row 3 -> Row 4 */}
                  {renderArrow('a_r3_r4_0', 50, 323, 100, 390, 'merge')}
                  {renderArrow('a_r3_r4_1', 150, 323, 100, 390, 'merge')}
                  {renderArrow('a_r3_r4_2', 250, 323, 300, 390, 'merge')}
                  {renderArrow('a_r3_r4_3', 350, 323, 300, 390, 'merge')}
                  {renderArrow('a_r3_r4_4', 450, 323, 500, 390, 'merge')}
                  {renderArrow('a_r3_r4_5', 550, 323, 500, 390, 'merge')}
                  {renderArrow('a_r3_r4_6', 650, 323, 700, 390, 'merge')}
                  {renderArrow('a_r3_r4_7', 750, 323, 700, 390, 'merge')}

                  {/* Row 4 -> Row 5 */}
                  {renderArrow('a_r4_r5_0', 100, 418, 200, 480, 'merge')}
                  {renderArrow('a_r4_r5_1', 300, 418, 200, 480, 'merge')}
                  {renderArrow('a_r4_r5_2', 500, 418, 600, 480, 'merge')}
                  {renderArrow('a_r4_r5_3', 700, 418, 600, 480, 'merge')}

                  {/* Row 5 -> Row 6 */}
                  {renderArrow('a_r5_r6_0', 200, 508, 400, 570, 'merge')}
                  {renderArrow('a_r5_r6_1', 600, 508, 400, 570, 'merge')}

                  {/* ================= DIVIDE NODES (BLUE) ================= */}
                  {/* Row 0 (Root) */}
                  {renderArrayNode('r0_0', tree.r0[0], 400, 25, 'divide', 'ROOT')}

                  {/* Row 1 (2 nodes) */}
                  {renderArrayNode('r1_0', tree.r1[0], 200, 115, 'divide', 'LEFT HALF')}
                  {renderArrayNode('r1_1', tree.r1[1], 600, 115, 'divide', 'RIGHT HALF')}

                  {/* Row 2 (4 nodes) */}
                  {renderArrayNode('r2_0', tree.r2[0], 100, 205, 'divide', 'DIVIDE')}
                  {renderArrayNode('r2_1', tree.r2[1], 300, 205, 'divide', 'DIVIDE')}
                  {renderArrayNode('r2_2', tree.r2[2], 500, 205, 'divide', 'DIVIDE')}
                  {renderArrayNode('r2_3', tree.r2[3], 700, 205, 'divide', 'DIVIDE')}

                  {/* Row 3 (8 single nodes - base case) */}
                  {renderArrayNode('r3_0', tree.r3[0], 50, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_1', tree.r3[1], 150, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_2', tree.r3[2], 250, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_3', tree.r3[3], 350, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_4', tree.r3[4], 450, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_5', tree.r3[5], 550, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_6', tree.r3[6], 650, 295, 'divide', 'BASE')}
                  {renderArrayNode('r3_7', tree.r3[7], 750, 295, 'divide', 'BASE')}

                  {/* ================= MERGE NODES (AMBER / GOLD) ================= */}
                  {/* Row 4 (4 sorted pairs) */}
                  {renderArrayNode('r4_0', tree.r4[0], 100, 390, 'merge', 'MERGED')}
                  {renderArrayNode('r4_1', tree.r4[1], 300, 390, 'merge', 'MERGED')}
                  {renderArrayNode('r4_2', tree.r4[2], 500, 390, 'merge', 'MERGED')}
                  {renderArrayNode('r4_3', tree.r4[3], 700, 390, 'merge', 'MERGED')}

                  {/* Row 5 (2 sorted halves) */}
                  {renderArrayNode('r5_0', tree.r5[0], 200, 480, 'merge', 'SORTED 4')}
                  {renderArrayNode('r5_1', tree.r5[1], 600, 480, 'merge', 'SORTED 4')}

                  {/* Row 6 (Final fully sorted array) */}
                  {renderArrayNode('r6_0', tree.r6[0], 400, 570, 'merge', 'FULLY SORTED')}
                </svg>
              </div>
            </div>

            {/* Pedagogical Step Explanation Box */}
            <div className="p-4 rounded-2xl bg-[#0a131e] border border-[#16273b] text-center shadow-lg space-y-1.5">
              <div className="flex items-center justify-center gap-2 text-xs font-mono">
                <span className="text-zinc-400">ধাপ {stepIdx + 1}:</span>
                <span className="text-white font-bold">{currentStep.title}</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed max-w-3xl mx-auto">
                {currentStep.desc}
              </p>
            </div>

            {/* Invariant Footer Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#0a121c] border border-[#152336] flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">TIME COMPLEXITY:</span>
                  <span className="text-teal-300 font-bold">Strictly O(N log N) Everywhere</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a121c] border border-[#152336] flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">AUXILIARY SPACE:</span>
                  <span className="text-amber-300 font-bold">O(N) Auxiliary Buffer</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a121c] border border-[#152336] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">STABILITY:</span>
                  <span className="text-emerald-300 font-bold">100% Guaranteed Stable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CODE WALKTHROUGH */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#091118] border border-[#1b3447] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>TypeScript রিকার্সিভ মার্জ সর্ট ইমপ্লিমেন্টেশন</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              মার্জ সর্টে দুটি প্রধান ফাংশন থাকে: মূল রিকার্সিভ ফাংশন যা অ্যারেকে আধাআধি বিভক্ত করে বেস কেসে নিয়ে যায়, এবং সহায়ক <code className="text-teal-400">merge()</code> ফাংশন যা দুটি সর্টেড অ্যারেকে ২-পয়েন্টার টেকনিকে একীভূত করে।
            </p>
            <pre className="p-4 rounded-2xl bg-[#050a0f] border border-[#142838] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // বেস কেস: ১ উপাদান মানেই সর্টেড

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  // ২-পয়েন্টার জিপার মার্জিং
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) { // '<=' স্ট্যাবিলিটি অক্ষুণ্ণ রাখে
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // অবশিষ্ট উপাদানগুলো শেষে যুক্ত করা
  return [...result, ...left.slice(i), ...right.slice(j)];
}`}
            </pre>
          </div>
        </div>
      )}

      {/* 5. BIG DATA & CASES */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#091118] border border-[#1b3447] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-teal-400" />
              <span>এক্সটার্নাল সর্টিং ও হার্ডডিস্ক মেগাস্টোরেজ</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              যখন ডেটার পরিমাণ এত বিশাল হয় যে তা কম্পিউটারের র‍্যামে (RAM) একবারে ধরে না (যেমন ৫০০ জিবি ডেটাবেস ডাম্প মাত্র ১৬ জিবি র‍্যামের সার্ভারে সাজাতে হবে), তখন মার্জ সর্টের <b>External 2-Way Merge Sort</b> ব্যবহার করা হয়।
            </p>
            <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                <span><b>ডিস্ক ফ্রেন্ডলি সিকোয়েনশিয়াল রিড:</b> র্যান্ডম মেমোরি জাম্প না করে সরাসরি ডিস্ক ব্লক থেকে ক্রমান্বয়ে রিড করে, যা SSD এবং HDD উভয়ের জন্যই অত্যন্ত দ্রুত।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><b>লিঙ্কড লিস্ট সর্টিং:</b> লিঙ্কড লিস্টের জন্য মার্জ সর্ট সেরা কারণ এতে পয়েন্টার পুনর্বিন্যাসের মাধ্যমে অতিরিক্ত মেমোরি ছাড়াই $O(1)$ স্পেসে সর্ট করা সম্ভব।</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-[#091118] border border-[#1b3447] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              <span>কমপ্লেক্সিটি ম্যাট্রিক্স</span>
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0e1a24] border border-[#1b3447]">
                <span className="text-zinc-400">Best Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N log N)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0e1a24] border border-[#1b3447]">
                <span className="text-zinc-400">Average Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N log N)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0e1a24] border border-[#1b3447]">
                <span className="text-zinc-400">Worst Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N log N) (কোনো স্লোডাউন নেই)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0e1a24] border border-[#1b3447]">
                <span className="text-zinc-400">Auxiliary Space:</span>
                <span className="text-amber-400 font-bold">O(N) (অতিরিক্ত বাফার প্রয়োজন)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0e1a24] border border-[#1b3447]">
                <span className="text-zinc-400">Stability:</span>
                <span className="text-emerald-400 font-bold">100% Stable</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1e1930]">
        <button
          onClick={() => onNavigate && onNavigate('sorting-insertion')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400" />
          <span>পূর্ববর্তী: ইনসার্শন সর্ট (Insertion Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting-quick')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs font-bold shadow-lg shadow-teal-600/20 transition-all cursor-pointer"
        >
          <span>পরবর্তী: কুইক সর্ট (Quick Sort)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
