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
  Target
} from 'lucide-react';

// Default 8-element array matching Image 1
const DEFAULT_8_ARRAY = [5, 2, 4, 7, 1, 3, 2, 6];

const PRESETS = [
  { label: 'ছবি ১ রেফারেন্স', array: [5, 2, 4, 7, 1, 3, 2, 6] },
  { label: 'ছবি ২ ভ্যারিয়েন্ট', array: [12, 8, 9, 3, 11, 5, 4, 1] },
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

interface FinalZipperState {
  leftVals: number[];
  rightVals: number[];
  leftPtr: number | null;
  rightPtr: number | null;
  mergedOut: number[];
  comparingValLeft: number | null;
  comparingValRight: number | null;
  chosenVal: number | null;
}

interface TreeStep {
  title: string;
  phase: 'divide' | 'base' | 'merge' | 'complete';
  desc: string;
  activeNodeIds: string[];
  activeArrowIds: string[];
  revealedNodeIds: string[];
  revealedArrowIds: string[];
  finalZipper?: FinalZipperState;
  finalDisplayArray?: number[];
}

function generateTreeSteps(tree: ReturnType<typeof buildTreeStructure>): TreeStep[] {
  const { r0, r1, r2, r3, r4, r5, r6 } = tree;

  const steps: TreeStep[] = [
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
      title: 'লেভেল ৩ বেস কেস: ১ম জোড়া (Base Case)',
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
      title: 'লেভেল ৩ বেস কেস: ২য় জোড়া (Base Case)',
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
      desc: `[${r3[2][0]}] এবং [${r3[3][0]}] মিলিয়ে সাজানো জোড়া [${r4[1].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r4_1'],
      activeArrowIds: ['a_r3_r4_2', 'a_r3_r4_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3']
    },
    {
      title: 'বামের ৪-উপাদান মার্জ (Merge Left 4)',
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
      title: 'লেভেল ৩ বেস কেস: ৩য় ও ৪র্থ জোড়া',
      phase: 'base',
      desc: `ডান অংশের একক উপাদানগুলো পৃথক হলো এবং জোড়ায় মার্জ শুরু হলো।`,
      activeNodeIds: ['r3_4', 'r3_5', 'r3_6', 'r3_7'],
      activeArrowIds: ['a_r2_r3_4', 'a_r2_r3_5', 'a_r2_r3_6', 'a_r2_r3_7'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r3_6', 'r3_7'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r2_r3_6', 'a_r2_r3_7']
    },
    {
      title: 'ডানের ৪-উপাদান মার্জ (Merge Right 4)',
      phase: 'merge',
      desc: `ডান অংশের সাব-অ্যারেগুলো মিলিয়ে ডান অর্ধেক [${r5[1].join(', ')}] প্রস্তুত হলো!`,
      activeNodeIds: ['r5_1'],
      activeArrowIds: ['a_r4_r5_2', 'a_r4_r5_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3']
    }
  ];

  // Detailed 2-pointer zipper steps for the Final Grand Merge
  const left4 = r5[0];
  const right4 = r5[1];
  let i = 0;
  let j = 0;
  const finalMerged: number[] = [];

  const baseRevealedNodes = ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1', 'r6_0'];
  const baseRevealedArrows = ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3', 'a_r5_r6_0', 'a_r5_r6_1'];

  while (i < left4.length && j < right4.length) {
    const vL = left4[i];
    const vR = right4[j];
    const chooseLeft = vL <= vR;

    // Step A: Compare
    steps.push({
      title: `চূড়ান্ত মার্জিং: তুলনা ${vL} বনাম ${vR}`,
      phase: 'merge',
      desc: `বামের পয়েন্টার i (${vL}) বনাম ডানের পয়েন্টার j (${vR}) তুলনা: ${chooseLeft ? `${vL} ≤ ${vR}, ফলে বামের ${vL} আউটপুটে বসবে!` : `${vR} < ${vL}, ফলে ডানের ${vR} আউটপুটে বসবে!`} খাতা-কলমে যেভাবে ছোট মানটি নিচে নামে।`,
      activeNodeIds: ['r5_0', 'r5_1', 'r6_0'],
      activeArrowIds: ['a_r5_r6_0', 'a_r5_r6_1'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: i,
        rightPtr: j,
        mergedOut: [...finalMerged],
        comparingValLeft: vL,
        comparingValRight: vR,
        chosenVal: chooseLeft ? vL : vR
      },
      finalDisplayArray: [...finalMerged]
    });

    if (chooseLeft) {
      finalMerged.push(vL);
      i++;
    } else {
      finalMerged.push(vR);
      j++;
    }

    // Step B: Placed
    steps.push({
      title: `চূড়ান্ত মার্জিং: উপাদান ${finalMerged[finalMerged.length - 1]} স্থাপন`,
      phase: 'merge',
      desc: `চূড়ান্ত সর্টেড অ্যারের ইনডেক্স ${finalMerged.length - 1}-এ মান ${finalMerged[finalMerged.length - 1]} বসে গেল। বর্তমান আংশিক সর্টেড ফলাফল: [${finalMerged.join(', ')}]`,
      activeNodeIds: ['r6_0'],
      activeArrowIds: ['a_r5_r6_0', 'a_r5_r6_1'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: i < left4.length ? i : null,
        rightPtr: j < right4.length ? j : null,
        mergedOut: [...finalMerged],
        comparingValLeft: null,
        comparingValRight: null,
        chosenVal: null
      },
      finalDisplayArray: [...finalMerged]
    });
  }

  // Remaining left elements
  while (i < left4.length) {
    finalMerged.push(left4[i]);
    steps.push({
      title: `চূড়ান্ত মার্জিং: বামের অবশিষ্ট ${left4[i]} যোগ`,
      phase: 'merge',
      desc: `ডান পাশের উপাদান শেষ। বামের অবশিষ্ট উপাদান ${left4[i]} সরাসরি চূড়ান্ত অ্যারের শেষে যুক্ত হলো।`,
      activeNodeIds: ['r5_0', 'r6_0'],
      activeArrowIds: ['a_r5_r6_0'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: i,
        rightPtr: null,
        mergedOut: [...finalMerged],
        comparingValLeft: null,
        comparingValRight: null,
        chosenVal: null
      },
      finalDisplayArray: [...finalMerged]
    });
    i++;
  }

  // Remaining right elements
  while (j < right4.length) {
    finalMerged.push(right4[j]);
    steps.push({
      title: `চূড়ান্ত মার্জিং: ডানের অবশিষ্ট ${right4[j]} যোগ`,
      phase: 'merge',
      desc: `বাম পাশের উপাদান শেষ। ডানের অবশিষ্ট উপাদান ${right4[j]} সরাসরি চূড়ান্ত অ্যারের শেষে যুক্ত হলো।`,
      activeNodeIds: ['r5_1', 'r6_0'],
      activeArrowIds: ['a_r5_r6_1'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: null,
        rightPtr: j,
        mergedOut: [...finalMerged],
        comparingValLeft: null,
        comparingValRight: null,
        chosenVal: null
      },
      finalDisplayArray: [...finalMerged]
    });
    j++;
  }

  // Final complete step
  steps.push({
    title: 'মার্জ সর্ট সম্পূর্ণ সম্পন্ন! (Complete)',
    phase: 'complete',
    desc: `অভিনন্দন! ডিভাইড অ্যান্ড কনকার প্রক্রিয়ায় O(N log N) সময়ে পূর্ণ অ্যারে [${r6[0].join(', ')}] সফলভাবে সাজানো সমাপ্ত হয়েছে।`,
    activeNodeIds: ['r6_0'],
    activeArrowIds: [],
    revealedNodeIds: baseRevealedNodes,
    revealedArrowIds: baseRevealedArrows,
    finalDisplayArray: r6[0]
  });

  return steps;
}

export default function MergeSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [arrayData, setArrayData] = useState<number[]>(DEFAULT_8_ARRAY);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const [treeViewMode, setTreeViewMode] = useState<'stepper' | 'blueprint'>('stepper');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fixed comfortable 0.5x speed
  const FIXED_SPEED_MS = 1400;

  const tree = useMemo(() => buildTreeStructure(arrayData), [arrayData]);
  const steps = useMemo(() => generateTreeSteps(tree), [tree]);
  const currentStep = steps[stepIdx] || steps[0];
  const isAtEnd = stepIdx >= steps.length - 1;

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

  const handlePresetSelect = (arr: number[]) => {
    setIsPlaying(false);
    setArrayData(arr);
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

    const cellWidth = 22;
    const cellHeight = 24;
    const totalWidth = values.length * cellWidth;
    const xStart = xCenter - totalWidth / 2;

    const isDivide = type === 'divide';
    const fillBg = isDivide ? '#0c1a2c' : '#231805';
    const borderColor = isDivide ? '#38bdf8' : '#fbbf24';
    const textColor = isDivide ? '#e0f2fe' : '#fef08a';
    const dividerColor = isDivide ? '#1e3857' : '#573d0a';

    const activeBorderColor = isDivide ? '#67e8f9' : '#fde047';
    const activeFill = isDivide ? '#123052' : '#3d2b09';

    const pillWidth = statusLabel ? Math.max(40, statusLabel.length * 6 + 8) : 0;

    return (
      <g
        key={id}
        className="transition-all duration-300"
        style={{
          opacity: isRevealed ? 1 : 0.15,
          cursor: 'pointer'
        }}
      >
        {statusLabel && isActive && (
          <g>
            <rect
              x={xCenter - pillWidth / 2}
              y={yTop - 13}
              width={pillWidth}
              height={12}
              rx={3}
              fill={isDivide ? '#071626' : '#241503'}
              stroke={activeBorderColor}
              strokeWidth={1}
            />
            <text
              x={xCenter}
              y={yTop - 4.5}
              textAnchor="middle"
              fill={activeBorderColor}
              fontFamily="ui-monospace, monospace"
              fontSize="7"
              fontWeight="bold"
            >
              {statusLabel}
            </text>
          </g>
        )}

        {isActive && (
          <rect
            x={xStart - 2.5}
            y={yTop - 2.5}
            width={totalWidth + 5}
            height={cellHeight + 5}
            rx={6}
            fill="none"
            stroke={activeBorderColor}
            strokeWidth={1.5}
            opacity={0.7}
          />
        )}

        <rect
          x={xStart}
          y={yTop}
          width={totalWidth}
          height={cellHeight}
          rx={5}
          fill={isActive ? activeFill : fillBg}
          stroke={isActive ? activeBorderColor : borderColor}
          strokeWidth={isActive ? 2 : 1.2}
        />

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

        {values.map((v, i) => (
          <text
            key={`txt-${i}`}
            x={xStart + i * cellWidth + cellWidth / 2}
            y={yTop + cellHeight / 2 + 4}
            textAnchor="middle"
            fill={isActive ? '#ffffff' : textColor}
            fontFamily="ui-monospace, monospace"
            fontSize="10.5"
            fontWeight="bold"
          >
            {v}
          </text>
        ))}
      </g>
    );
  };

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
    const strokeColor = isDivide ? '#38bdf8' : '#10b981';
    const marker = isDivide ? 'url(#arrow-sky)' : 'url(#arrow-emerald)';

    const midY = (y1 + y2) / 2;
    const pathD = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    return (
      <path
        key={id}
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isActive ? 2 : 1.2}
        markerEnd={marker}
        style={{
          opacity: isRevealed ? (isActive ? 1 : 0.75) : 0.12,
          transition: 'all 0.3s ease'
        }}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full text-zinc-100">
      {/* 1. COMPACT UNIFIED TOP TOOLBAR (Eliminates 300px vertical overhead) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#090e17] border border-[#1b2b3f] shadow-lg">
        {/* Left: Brand Pill & Preset / Randomize */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 pr-2 border-r border-[#1a283b]">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold">
              Topic 13.4 • Merge Sort
            </span>
            <span className="text-xs font-mono font-bold text-teal-300 hidden sm:inline">
              O(N log N)
            </span>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1d3049] text-xs font-mono">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetSelect(p.array)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  JSON.stringify(arrayData) === JSON.stringify(p.array)
                    ? 'bg-sky-500/30 text-sky-200 font-bold border border-sky-500/40'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Randomize Button */}
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600/30 to-emerald-600/30 hover:from-teal-600/50 hover:to-emerald-600/50 border border-teal-500/40 text-teal-200 font-mono text-xs font-bold transition-all shadow cursor-pointer hover:scale-105"
            title="নতুন ৮টি র্যান্ডম সংখ্যা তৈরি করুন"
          >
            <Shuffle className="w-3.5 h-3.5 text-teal-300" />
            <span>Randomize</span>
          </button>
        </div>

        {/* Right: Integrated Player Controls & Tab Switcher */}
        <div className="flex items-center gap-2">
          {/* Player Controls */}
          <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1d3049]">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play'}</span>
            </button>
            <button
              onClick={() => { setIsPlaying(false); setStepIdx(Math.max(0, stepIdx - 1)); }}
              disabled={stepIdx === 0}
              className="p-1 rounded-md hover:bg-[#162538] disabled:opacity-30 text-zinc-300 cursor-pointer"
              title="Step Back"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-xs text-zinc-300 font-medium">
              {stepIdx + 1}/{steps.length}
            </span>
            <button
              onClick={() => { setIsPlaying(false); setStepIdx(Math.min(steps.length - 1, stepIdx + 1)); }}
              disabled={isAtEnd}
              className="p-1 rounded-md hover:bg-[#162538] disabled:opacity-30 text-zinc-300 cursor-pointer"
              title="Step Forward"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setIsPlaying(false); setStepIdx(0); }}
              className="p-1 rounded-md hover:bg-[#162538] text-zinc-400 hover:text-zinc-100 cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View Tab Toggle */}
          <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1d3049] text-xs font-mono">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'visualizer'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              সিমুলেশন
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কোড
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'cases'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কেস স্টাডি
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN STUDIO LAYOUT (Everything visible on 1 Screen without scrolling!) */}
      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT COLUMN: THE VISUAL CANVAS (8 cols out of 12 = 66%) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <div className="relative rounded-2xl bg-[#070b12] border border-[#162538] p-3 shadow-xl overflow-hidden flex flex-col items-center">
              {/* Tree / Blueprint Mode Pill */}
              <div className="w-full flex items-center justify-between pb-2 border-b border-[#121e2d] text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Split className="w-3.5 h-3.5 text-teal-400" />
                  <span>ডিভাইড অ্যান্ড কনকার ট্রি ভিউ (Divide Tree):</span>
                </span>
                <div className="flex items-center gap-1 bg-[#0d1624] p-0.5 rounded-lg border border-[#1a293b]">
                  <button
                    onClick={() => setTreeViewMode('stepper')}
                    className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                      treeViewMode === 'stepper' ? 'bg-teal-700 text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    স্টেপ বাই স্টেপ
                  </button>
                  <button
                    onClick={() => setTreeViewMode('blueprint')}
                    className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                      treeViewMode === 'blueprint' ? 'bg-sky-700 text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    পূর্ণ ব্লুপ্রিন্ট
                  </button>
                </div>
              </div>

              {/* Compact Scaled SVG Tree */}
              <div className="w-full flex justify-center py-1">
                <svg
                  viewBox="0 0 800 620"
                  className="w-full h-auto max-h-[480px] select-none"
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

                  {/* DIVIDE ARROWS */}
                  {renderArrow('a_r0_r1_0', 400, 48, 200, 108, 'divide')}
                  {renderArrow('a_r0_r1_1', 400, 48, 600, 108, 'divide')}

                  {renderArrow('a_r1_r2_0', 200, 132, 100, 192, 'divide')}
                  {renderArrow('a_r1_r2_1', 200, 132, 300, 192, 'divide')}
                  {renderArrow('a_r1_r2_2', 600, 132, 500, 192, 'divide')}
                  {renderArrow('a_r1_r2_3', 600, 132, 700, 192, 'divide')}

                  {renderArrow('a_r2_r3_0', 100, 216, 50, 276, 'divide')}
                  {renderArrow('a_r2_r3_1', 100, 216, 150, 276, 'divide')}
                  {renderArrow('a_r2_r3_2', 300, 216, 250, 276, 'divide')}
                  {renderArrow('a_r2_r3_3', 300, 216, 350, 276, 'divide')}
                  {renderArrow('a_r2_r3_4', 500, 216, 450, 276, 'divide')}
                  {renderArrow('a_r2_r3_5', 500, 216, 550, 276, 'divide')}
                  {renderArrow('a_r2_r3_6', 700, 216, 650, 276, 'divide')}
                  {renderArrow('a_r2_r3_7', 700, 216, 750, 276, 'divide')}

                  {/* MERGE ARROWS */}
                  {renderArrow('a_r3_r4_0', 50, 300, 100, 360, 'merge')}
                  {renderArrow('a_r3_r4_1', 150, 300, 100, 360, 'merge')}
                  {renderArrow('a_r3_r4_2', 250, 300, 300, 360, 'merge')}
                  {renderArrow('a_r3_r4_3', 350, 300, 300, 360, 'merge')}
                  {renderArrow('a_r3_r4_4', 450, 300, 500, 360, 'merge')}
                  {renderArrow('a_r3_r4_5', 550, 300, 500, 360, 'merge')}
                  {renderArrow('a_r3_r4_6', 650, 300, 700, 360, 'merge')}
                  {renderArrow('a_r3_r4_7', 750, 300, 700, 360, 'merge')}

                  {renderArrow('a_r4_r5_0', 100, 384, 200, 444, 'merge')}
                  {renderArrow('a_r4_r5_1', 300, 384, 200, 444, 'merge')}
                  {renderArrow('a_r4_r5_2', 500, 384, 600, 444, 'merge')}
                  {renderArrow('a_r4_r5_3', 700, 384, 600, 444, 'merge')}

                  {renderArrow('a_r5_r6_0', 200, 468, 400, 528, 'merge')}
                  {renderArrow('a_r5_r6_1', 600, 468, 400, 528, 'merge')}

                  {/* NODES */}
                  {renderArrayNode('r0_0', tree.r0[0], 400, 24, 'divide', 'ROOT')}

                  {renderArrayNode('r1_0', tree.r1[0], 200, 108, 'divide', 'LEFT HALF')}
                  {renderArrayNode('r1_1', tree.r1[1], 600, 108, 'divide', 'RIGHT HALF')}

                  {renderArrayNode('r2_0', tree.r2[0], 100, 192, 'divide', 'DIVIDE')}
                  {renderArrayNode('r2_1', tree.r2[1], 300, 192, 'divide', 'DIVIDE')}
                  {renderArrayNode('r2_2', tree.r2[2], 500, 192, 'divide', 'DIVIDE')}
                  {renderArrayNode('r2_3', tree.r2[3], 700, 192, 'divide', 'DIVIDE')}

                  {renderArrayNode('r3_0', tree.r3[0], 50, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_1', tree.r3[1], 150, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_2', tree.r3[2], 250, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_3', tree.r3[3], 350, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_4', tree.r3[4], 450, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_5', tree.r3[5], 550, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_6', tree.r3[6], 650, 276, 'divide', 'BASE')}
                  {renderArrayNode('r3_7', tree.r3[7], 750, 276, 'divide', 'BASE')}

                  {renderArrayNode('r4_0', tree.r4[0], 100, 360, 'merge', 'MERGED')}
                  {renderArrayNode('r4_1', tree.r4[1], 300, 360, 'merge', 'MERGED')}
                  {renderArrayNode('r4_2', tree.r4[2], 500, 360, 'merge', 'MERGED')}
                  {renderArrayNode('r4_3', tree.r4[3], 700, 360, 'merge', 'MERGED')}

                  {renderArrayNode('r5_0', tree.r5[0], 200, 444, 'merge', 'SORTED 4')}
                  {renderArrayNode('r5_1', tree.r5[1], 600, 444, 'merge', 'SORTED 4')}

                  {renderArrayNode(
                    'r6_0',
                    currentStep.finalDisplayArray && currentStep.finalDisplayArray.length > 0 && currentStep.phase !== 'complete'
                      ? currentStep.finalDisplayArray
                      : tree.r6[0],
                    400,
                    528,
                    'merge',
                    currentStep.phase === 'complete' ? 'FULLY SORTED' : 'FINAL MERGE'
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TELEMETRY & LIVE INSPECTOR DECK (4 cols out of 12 = 33%) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {/* Step Intuition & Description Card */}
            <div className="p-4 rounded-2xl bg-[#090e17] border border-[#1b2b3f] shadow-lg space-y-2">
              <div className="flex items-center justify-between border-b border-[#142336] pb-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                  ধাপ {stepIdx + 1} / {steps.length}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  currentStep.phase === 'divide'
                    ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                    : currentStep.phase === 'base'
                    ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                    : currentStep.phase === 'complete'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                }`}>
                  {currentStep.phase.toUpperCase()}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">
                {currentStep.title}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {currentStep.desc}
              </p>
            </div>

            {/* LIVE FINAL GRAND MERGE 2-POINTER INSPECTOR (When merging) */}
            {currentStep.finalZipper && (
              <div className="p-4 rounded-2xl bg-[#09111c] border-2 border-amber-500/40 shadow-xl space-y-3 animate-in fade-in">
                <div className="flex items-center gap-1.5 border-b border-[#182a40] pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    চূড়ান্ত ২-পয়েন্টার জিপার তুলনা
                  </span>
                </div>

                {/* Dual pointers comparison */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {/* Left array */}
                  <div className="p-2 rounded-xl bg-[#060c14] border border-sky-500/30 flex flex-col items-center">
                    <span className="text-[9px] text-sky-400 uppercase font-bold mb-1">পয়েন্টার i (Left)</span>
                    <div className="flex items-center gap-1">
                      {currentStep.finalZipper.leftVals.map((v, idx) => {
                        const isPtr = idx === currentStep.finalZipper?.leftPtr;
                        return (
                          <span
                            key={idx}
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold border ${
                              isPtr
                                ? 'bg-amber-500 text-black border-amber-300 scale-110 font-black'
                                : 'bg-sky-950 text-sky-200 border-sky-800 opacity-60'
                            }`}
                          >
                            {v}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right array */}
                  <div className="p-2 rounded-xl bg-[#060c14] border border-sky-500/30 flex flex-col items-center">
                    <span className="text-[9px] text-sky-400 uppercase font-bold mb-1">পয়েন্টার j (Right)</span>
                    <div className="flex items-center gap-1">
                      {currentStep.finalZipper.rightVals.map((v, idx) => {
                        const isPtr = idx === currentStep.finalZipper?.rightPtr;
                        return (
                          <span
                            key={idx}
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold border ${
                              isPtr
                                ? 'bg-amber-500 text-black border-amber-300 scale-110 font-black'
                                : 'bg-sky-950 text-sky-200 border-sky-800 opacity-60'
                            }`}
                          >
                            {v}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 8-Slot Output Tray */}
                <div className="p-2 rounded-xl bg-[#050912] border border-emerald-500/30 flex flex-col items-center space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">
                    সর্টেড ট্রে (Final Tray Filling)
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {Array.from({ length: 8 }).map((_, slotIdx) => {
                      const val = currentStep.finalZipper?.mergedOut[slotIdx];
                      const isFilled = val !== undefined;
                      const isLatest = slotIdx === (currentStep.finalZipper?.mergedOut.length ?? 0) - 1;
                      return (
                        <span
                          key={slotIdx}
                          className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-black border transition-all ${
                            isLatest
                              ? 'bg-emerald-500 text-black border-emerald-300 scale-105'
                              : isFilled
                              ? 'bg-emerald-950 text-emerald-200 border-emerald-700'
                              : 'bg-zinc-900/40 text-zinc-600 border-zinc-800 border-dashed'
                          }`}
                        >
                          {isFilled ? val : '?'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Invariants & Complexity Matrix */}
            <div className="p-3.5 rounded-2xl bg-[#090e17] border border-[#1b2b3f] text-xs font-mono space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block border-b border-[#142336] pb-1">
                মৌলিক ইনভ্যারিয়েন্ট (Invariants)
              </span>
              <div className="flex justify-between">
                <span className="text-zinc-400">Time Complexity:</span>
                <span className="text-teal-300 font-bold">O(N log N) Strict</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Auxiliary Space:</span>
                <span className="text-amber-300 font-bold">O(N) Buffer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Stability:</span>
                <span className="text-emerald-300 font-bold">100% Stable</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CODE TAB */}
      {activeTab === 'code' && (
        <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>TypeScript রিকার্সিভ মার্জ সর্ট ইমপ্লিমেন্টেশন</span>
          </h3>
          <pre className="p-3.5 rounded-xl bg-[#04070c] border border-[#142130] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // ১ উপাদান মানেই সর্টেড

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}`}
          </pre>
        </div>
      )}

      {/* 4. CASE STUDIES TAB */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 shadow-xl space-y-2">
            <h4 className="text-xs font-bold text-teal-300 uppercase font-mono">এক্সটার্নাল সর্টিং ও মেগাস্টোরেজ</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              যখন ডেটাবেসের আকার র‍্যামের চেয়ে বহুগুণ বড় হয় (যেমন ৫০০ জিবি ডেটাবেস বনাম ১৬ জিবি র‍্যাম), তখন মার্জ সর্টের <b>External 2-Way Merge</b> সরাসরি ডিস্ক ব্লক থেকে ক্রমান্বয়ে রিড করে সাজায়।
            </p>
          </div>
          <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 shadow-xl space-y-2">
            <h4 className="text-xs font-bold text-teal-300 uppercase font-mono">লিঙ্কড লিস্টের জন্য আদর্শ</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              লিঙ্কড লিস্টে কোনো অতিরিক্ত অ্যারে বরাদ্দ না নিয়ে সরাসরি পয়েন্টার রি-লিঙ্কিংয়ের মাধ্যমে $O(1)$ স্পেসেই মার্জ সর্ট করা যায়।
            </p>
          </div>
        </div>
      )}

      {/* 5. FOOTER NAVIGATION TO PREV / NEXT */}
      <div className="flex items-center justify-between pt-2 border-t border-[#152336] text-xs font-mono">
        <button
          onClick={() => onNavigate && onNavigate('sorting-insertion')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1624] hover:bg-[#162538] border border-[#1d3049] text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span>ইনসার্শন সর্ট (Insertion Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting-quick')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold transition-all shadow cursor-pointer"
        >
          <span>পরবর্তী: কুইক সর্ট (Quick Sort)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
