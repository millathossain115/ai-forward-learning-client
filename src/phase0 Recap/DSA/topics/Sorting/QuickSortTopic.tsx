'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  Target,
  Shuffle,
  GitBranch,
  BarChart3,
  Terminal
} from 'lucide-react';

// ==========================================
// 1. DATA MODELS & PRESETS
// ==========================================

const TREE_PRESET_1 = [20, 2, 9, 7, 12, 15, 1, 6, 8];

interface FinalAssemblyState {
  stage: 'left' | 'pivot' | 'right' | 'complete';
  leftBlock: number[];
  pivotVal: number;
  rightBlock: number[];
  assembledSoFar: number[];
}

interface TreePartitionStep {
  title: string;
  desc: string;
  activePivotVal: number | null;
  revealedNodeIds: string[];
  revealedArrowIds: string[];
  activeNodeIds: string[];
  activeArrowIds: string[];
  finalAssembly?: FinalAssemblyState;
}

interface BarSortStep {
  arr: number[];
  pivotIdx: number;
  comparingIdx: number;
  partitionStart: number;
  partitionEnd: number;
  sortedIndices: number[];
  desc: string;
}

function generateBarTrace(initial: number[]): BarSortStep[] {
  const steps: BarSortStep[] = [];
  const arr = [...initial];
  const sorted = new Set<number>();

  steps.push({
    arr: [...arr],
    pivotIdx: -1,
    comparingIdx: -1,
    partitionStart: 0,
    partitionEnd: arr.length - 1,
    sortedIndices: [],
    desc: 'প্রাথমিক অবিন্যস্ত বার অ্যারে প্রস্তুত। "Play" চাপুন।'
  });

  function quick(low: number, high: number) {
    if (low >= high) {
      if (low >= 0 && low < arr.length) sorted.add(low);
      return;
    }

    const pivotVal = arr[high];
    let i = low - 1;

    steps.push({
      arr: [...arr],
      pivotIdx: high,
      comparingIdx: -1,
      partitionStart: low,
      partitionEnd: high,
      sortedIndices: Array.from(sorted),
      desc: `পার্টিশন শুরু: রেঞ্জ [${low}..${high}]। পিভট = ${pivotVal} (নীল রঙে চিহ্নিত)।`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        arr: [...arr],
        pivotIdx: high,
        comparingIdx: j,
        partitionStart: low,
        partitionEnd: high,
        sortedIndices: Array.from(sorted),
        desc: `উপাদান ${arr[j]} (লাল) বনাম পিভট ${pivotVal} তুলনা করা হচ্ছে।`
      });

      if (arr[j] <= pivotVal) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          arr: [...arr],
          pivotIdx: high,
          comparingIdx: j,
          partitionStart: low,
          partitionEnd: high,
          sortedIndices: Array.from(sorted),
          desc: `${arr[i]} ≤ ${pivotVal}, তাই এটি ছোটদের সীমানা ইনডেক্স ${i}-এ সোয়াপ হলো!`
        });
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    const pivotFinalIndex = i + 1;
    sorted.add(pivotFinalIndex);

    steps.push({
      arr: [...arr],
      pivotIdx: pivotFinalIndex,
      comparingIdx: -1,
      partitionStart: low,
      partitionEnd: high,
      sortedIndices: Array.from(sorted),
      desc: `পিভট ${pivotVal} তার চূড়ান্ত সঠিক অবস্থান ইনডেক্স ${pivotFinalIndex}-এ স্থায়ী লক হলো!`
    });

    quick(low, pivotFinalIndex - 1);
    quick(pivotFinalIndex + 1, high);
  }

  quick(0, arr.length - 1);

  for (let k = 0; k < arr.length; k++) sorted.add(k);

  steps.push({
    arr: [...arr],
    pivotIdx: -1,
    comparingIdx: -1,
    partitionStart: 0,
    partitionEnd: arr.length - 1,
    sortedIndices: Array.from(sorted),
    desc: 'অভিনন্দন! কুইক সর্ট ইন-প্লেস O(N log N) সময়ে সম্পূর্ণভাবে সমাপ্ত হয়েছে।'
  });

  return steps;
}

function generateRandomBarArray(count = 36): number[] {
  const arr: number[] = [];
  for (let i = 0; i < count; i++) {
    const base = Math.floor(100 - (i / count) * 85);
    const jitter = Math.floor(Math.random() * 12) - 6;
    arr.push(Math.max(12, Math.min(98, base + jitter)));
  }
  return arr;
}

export default function QuickSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const [visualMode, setVisualMode] = useState<'tree' | 'bars'>('tree');

  // TREE MODE STATE
  const [treeStepIdx, setTreeStepIdx] = useState<number>(0);
  const [isTreePlaying, setIsTreePlaying] = useState<boolean>(false);
  const treeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BAR VISUALIZER STATE
  const [barArray, setBarArray] = useState<number[]>(() => generateRandomBarArray(36));
  const [barStepIdx, setBarStepIdx] = useState<number>(0);
  const [isBarPlaying, setIsBarPlaying] = useState<boolean>(false);
  const barTimerRef = useRef<NodeJS.Timeout | null>(null);

  const FIXED_TREE_SPEED_MS = 1400; // comfortable 0.5x
  const FIXED_BAR_SPEED_MS = 60;

  const barTrace = useMemo(() => generateBarTrace(barArray), [barArray]);
  const currentBarStep = barTrace[barStepIdx] || barTrace[0];

  const treeSteps = useMemo<TreePartitionStep[]>(() => [
    {
      title: 'ধাপ ১: মূল অ্যারে ও পিভট নির্বাচন (Pivot = 8)',
      desc: 'প্রাথমিক অ্যারে [20, 2, 9, 7, 12, 15, 1, 6, 8]। শেষ উপাদান 8-কে পিভট নির্বাচন করা হলো। এর ভিত্তিতে অ্যারে < 8 এবং >= 8 এ বিভক্ত হবে।',
      activePivotVal: 8,
      revealedNodeIds: ['root'],
      revealedArrowIds: [],
      activeNodeIds: ['root'],
      activeArrowIds: []
    },
    {
      title: 'ধাপ ২: লেভেল ১ পার্টিশন সমাপ্ত (Pivot 8 locked in center)',
      desc: 'পার্টিশনের ফলে 8-এর চেয়ে ছোট মান [2, 7, 1, 6] বামে, পিভট 8 ঠিক মাঝখানে লক এবং বড় মান [15, 9, 20, 12] ডানে স্থান নিয়েছে।',
      activePivotVal: 8,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right'],
      activeNodeIds: ['l1_left', 'l1_pivot', 'l1_right'],
      activeArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right']
    },
    {
      title: 'ধাপ ৩: বাম শাখা পার্টিশন (Pivot = 6)',
      desc: 'বামের সাব-অ্যারে [2, 7, 1, 6]-কে নিয়ে কাজ শুরু। এর পিভট 6। < 6 হলে বামে [2, 1], পিভট 6 মাঝে, এবং >= 6 হলে ডানে [7]।',
      activePivotVal: 6,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr'],
      activeNodeIds: ['l2_l_left', 'l2_l_pivot', 'l2_l_right'],
      activeArrowIds: ['a_l1_ll', 'a_l1_lp', 'a_l1_lr']
    },
    {
      title: 'ধাপ ৪: বেস কেস সাব-পার্টিশন (Pivot = 1)',
      desc: '[2, 1]-এর পিভট 1। 1 লক হলো এবং >= 1 হওয়ায় 2 ডানে বসলো। বাম পাশের সমস্ত উপাদান সম্পূর্ণ সর্টেড!',
      activePivotVal: 1,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2'],
      activeNodeIds: ['l3_pivot_1', 'l3_val_2'],
      activeArrowIds: ['a_l2_p1', 'a_l2_v2']
    },
    {
      title: 'ধাপ ৫: ডান শাখা পার্টিশন (Pivot = 12)',
      desc: 'এখন ডানের সাব-অ্যারে [15, 9, 20, 12]-এ পিভট 12। < 12 মান [9] বামে, পিভট 12 মাঝে এবং >= 12 মান [15, 20] ডানে গেল।',
      activePivotVal: 12,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr'],
      activeNodeIds: ['l2_r_left', 'l2_r_pivot', 'l2_r_right'],
      activeArrowIds: ['a_l1_rl', 'a_l1_rp', 'a_l1_rr']
    },
    {
      title: 'ধাপ ৬: শেষ সাব-পার্টিশন (Pivot = 20)',
      desc: '[15, 20]-এর পিভট 20। < 20 মান 15 বামে এবং 20 তার স্থানে লক হলো।',
      activePivotVal: 20,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
      activeNodeIds: ['l3_val_15', 'l3_pivot_20'],
      activeArrowIds: ['a_l2_v15', 'a_l2_p20']
    },
    {
      title: 'ধাপ ৭ (সংযোজন ১): বাম উপ-শাখা সংগ্রহ [১, ২, ৬, ৭]',
      desc: 'পিভট ৮-এর বামের সমস্ত উপাদান রিকার্সিভ পার্টিশন শেষে সর্টেড হয়ে গেছে: [১, ২, ৬, ৭]। এটি চূড়ান্ত সর্টেড অ্যারের প্রথম ভাগে অবস্থান নেবে।',
      activePivotVal: null,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
      activeNodeIds: ['l3_pivot_1', 'l3_val_2', 'l2_l_pivot', 'l2_l_right'],
      activeArrowIds: [],
      finalAssembly: {
        stage: 'left',
        leftBlock: [1, 2, 6, 7],
        pivotVal: 8,
        rightBlock: [9, 12, 15, 20],
        assembledSoFar: [1, 2, 6, 7]
      }
    },
    {
      title: 'ধাপ ৮ (সংযোজন ২): কেন্দ্রীয় পিভট ৮ নিশ্চিত',
      desc: 'মূল পিভট ৮ তার চূড়ান্ত অপরিবর্তনীয় অবস্থানে কেন্দ্রে নিশ্চিত হলো। এর বামে শুধুই ছোট মান [১, ২, ৬, ৭] এবং ডানে শুধুই বড় মান [৯, ১২, ১৫, ২০]।',
      activePivotVal: 8,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
      activeNodeIds: ['l1_pivot'],
      activeArrowIds: [],
      finalAssembly: {
        stage: 'pivot',
        leftBlock: [1, 2, 6, 7],
        pivotVal: 8,
        rightBlock: [9, 12, 15, 20],
        assembledSoFar: [1, 2, 6, 7, 8]
      }
    },
    {
      title: 'ধাপ ৯ (সংযোজন ৩): ডান উপ-শাখা সংগ্রহ [৯, ১২, ১৫, ২০]',
      desc: 'পিভট ৮-এর ডানের রিকার্সিভ পার্টিশনও সম্পন্ন হয়ে প্রস্তুত: [৯, ১২, ১৫, ২০]। এটি পিভটের ঠিক পর থেকে যুক্ত হচ্ছে।',
      activePivotVal: null,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
      activeNodeIds: ['l2_r_left', 'l2_r_pivot', 'l3_val_15', 'l3_pivot_20'],
      activeArrowIds: [],
      finalAssembly: {
        stage: 'right',
        leftBlock: [1, 2, 6, 7],
        pivotVal: 8,
        rightBlock: [9, 12, 15, 20],
        assembledSoFar: [1, 2, 6, 7, 8, 9, 12, 15, 20]
      }
    },
    {
      title: 'ধাপ ১০: চূড়ান্ত পূর্ণাঙ্গ সংযোজন সমাপ্ত (Left + Pivot + Right)',
      desc: 'খাতা-কলমে যেভাবে ৩টি অংশকে জোড়া দিই: বামের সর্টেড অংশ [১, ২, ৬, ৭] + মূল পিভট [৮] + ডানের সর্টেড অংশ [৯, ১২, ১৫, ২০] মিলিয়ে সম্পূর্ণ সর্টেড অ্যারে [১, ২, ৬, ৭, ৮, ৯, ১২, ১৫, ২০] প্রস্তুত!',
      activePivotVal: 8,
      revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
      revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
      activeNodeIds: ['root', 'l1_pivot'],
      activeArrowIds: [],
      finalAssembly: {
        stage: 'complete',
        leftBlock: [1, 2, 6, 7],
        pivotVal: 8,
        rightBlock: [9, 12, 15, 20],
        assembledSoFar: [1, 2, 6, 7, 8, 9, 12, 15, 20]
      }
    }
  ], []);

  const currentTreeStep = treeSteps[treeStepIdx] || treeSteps[0];

  useEffect(() => {
    if (isTreePlaying) {
      treeTimerRef.current = setInterval(() => {
        setTreeStepIdx((prev) => {
          if (prev < treeSteps.length - 1) return prev + 1;
          setIsTreePlaying(false);
          return prev;
        });
      }, FIXED_TREE_SPEED_MS);
    } else if (treeTimerRef.current) {
      clearInterval(treeTimerRef.current);
    }
    return () => {
      if (treeTimerRef.current) clearInterval(treeTimerRef.current);
    };
  }, [isTreePlaying, treeSteps.length]);

  useEffect(() => {
    if (isBarPlaying) {
      barTimerRef.current = setInterval(() => {
        setBarStepIdx((prev) => {
          if (prev < barTrace.length - 1) return prev + 1;
          setIsBarPlaying(false);
          return prev;
        });
      }, FIXED_BAR_SPEED_MS);
    } else if (barTimerRef.current) {
      clearInterval(barTimerRef.current);
    }
    return () => {
      if (barTimerRef.current) clearInterval(barTimerRef.current);
    };
  }, [isBarPlaying, barTrace.length]);

  const handleRandomizeBars = useCallback(() => {
    setIsBarPlaying(false);
    setBarArray(generateRandomBarArray(36));
    setBarStepIdx(0);
  }, []);

  const handleRandomizeTree = () => {
    setIsTreePlaying(false);
    setTreeStepIdx(0);
  };

  const renderTreeBlock = (
    id: string,
    values: number[],
    xCenter: number,
    yTop: number,
    pivotIndex?: number,
    isStandalonePivot?: boolean,
    badgeText?: string
  ) => {
    const isRevealed = currentTreeStep.revealedNodeIds.includes(id);
    const isActive = currentTreeStep.activeNodeIds.includes(id);

    const cellW = 24;
    const cellH = 26;
    const totalW = values.length * cellW;
    const xStart = xCenter - totalW / 2;

    return (
      <g
        key={id}
        className="transition-all duration-300"
        style={{ opacity: isRevealed ? 1 : 0.12 }}
      >
        {isActive && (
          <rect
            x={xStart - 2.5}
            y={yTop - 2.5}
            width={totalW + 5}
            height={cellH + 5}
            rx={7}
            fill="none"
            stroke={isStandalonePivot ? '#fbbf24' : '#38bdf8'}
            strokeWidth={1.5}
            opacity={0.8}
          />
        )}

        <rect
          x={xStart}
          y={yTop}
          width={totalW}
          height={cellH}
          rx={5}
          fill={isStandalonePivot ? '#332004' : '#0c1a2c'}
          stroke={isStandalonePivot ? '#fbbf24' : '#38bdf8'}
          strokeWidth={isActive ? 2 : 1.2}
        />

        {values.map((_, i) => {
          if (i === 0) return null;
          const lx = xStart + i * cellW;
          return (
            <line
              key={`div-${i}`}
              x1={lx}
              y1={yTop}
              x2={lx}
              y2={yTop + cellH}
              stroke={isStandalonePivot ? '#654209' : '#1d3b5c'}
              strokeWidth={1}
            />
          );
        })}

        {values.map((v, i) => {
          const isCellPivot = pivotIndex !== undefined && pivotIndex === i;
          return (
            <g key={`c-${i}`}>
              {isCellPivot && (
                <rect
                  x={xStart + i * cellW}
                  y={yTop}
                  width={cellW}
                  height={cellH}
                  fill="#d97706"
                  opacity={0.7}
                />
              )}
              <text
                x={xStart + i * cellW + cellW / 2}
                y={yTop + cellH / 2 + 3.5}
                textAnchor="middle"
                fill={isCellPivot || isStandalonePivot ? '#fef3c7' : '#e0f2fe'}
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
              >
                {v}
              </text>
            </g>
          );
        })}

        {badgeText && (
          <g>
            <rect
              x={xCenter - (badgeText.length * 5 + 6) / 2}
              y={yTop - 13}
              width={badgeText.length * 5 + 6}
              height={11}
              rx={3}
              fill="#06111f"
              stroke={isStandalonePivot ? '#fbbf24' : '#38bdf8'}
              strokeWidth={0.8}
            />
            <text
              x={xCenter}
              y={yTop - 4.5}
              textAnchor="middle"
              fill={isStandalonePivot ? '#fde047' : '#7dd3fc'}
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
            >
              {badgeText}
            </text>
          </g>
        )}
      </g>
    );
  };

  const renderTreeArrow = (
    id: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    label?: string
  ) => {
    const isRevealed = currentTreeStep.revealedArrowIds.includes(id);
    const isActive = currentTreeStep.activeArrowIds.includes(id);

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
      <g key={id} style={{ opacity: isRevealed ? 1 : 0.12 }} className="transition-all duration-300">
        <path
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          stroke={isActive ? '#38bdf8' : '#64748b'}
          strokeWidth={isActive ? 2 : 1.2}
          markerEnd="url(#arrow-head)"
          fill="none"
        />
        {label && (
          <text
            x={midX + (x2 < x1 ? -10 : 10)}
            y={midY - 3}
            textAnchor="middle"
            fill={isActive ? '#38bdf8' : '#94a3b8'}
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full text-zinc-100">
      {/* 1. COMPACT UNIFIED TOP TOOLBAR (Zero vertical overhead) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0e0707] border border-[#2e1414] shadow-lg">
        {/* Left: Brand Pill & Visual Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 pr-2 border-r border-[#241111]">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
              Topic 13.5 • Quick Sort
            </span>
            <span className="text-xs font-mono font-bold text-rose-300 hidden sm:inline">
              O(N log N) Avg
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212] text-xs font-mono">
            <button
              onClick={() => setVisualMode('tree')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                visualMode === 'tree'
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>পার্টিশন ট্রি</span>
            </button>
            <button
              onClick={() => setVisualMode('bars')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                visualMode === 'bars'
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>লাইভ বার চার্ট</span>
            </button>
          </div>

          {/* Randomize Button */}
          <button
            onClick={visualMode === 'tree' ? handleRandomizeTree : handleRandomizeBars}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600/30 to-amber-600/30 hover:from-rose-600/50 hover:to-amber-600/50 border border-rose-500/40 text-rose-200 font-mono text-xs font-bold transition-all shadow cursor-pointer hover:scale-105"
            title="নতুন ডাটাসেট লোড বা রিসেট করুন"
          >
            <Shuffle className="w-3.5 h-3.5 text-rose-300" />
            <span>Randomize</span>
          </button>
        </div>

        {/* Right: Integrated Player Controls & Tab Switcher */}
        <div className="flex items-center gap-2">
          {/* Tree Player Controls */}
          {visualMode === 'tree' ? (
            <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212]">
              <button
                onClick={() => setIsTreePlaying(!isTreePlaying)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow"
              >
                {isTreePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTreePlaying ? 'Pause' : treeStepIdx >= treeSteps.length - 1 ? 'Replay' : 'Play'}</span>
              </button>
              <button
                onClick={() => { setIsTreePlaying(false); setTreeStepIdx(Math.max(0, treeStepIdx - 1)); }}
                disabled={treeStepIdx === 0}
                className="p-1 rounded-md hover:bg-[#201010] disabled:opacity-30 text-zinc-300 cursor-pointer"
                title="Step Back"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-mono text-xs text-zinc-300 font-medium">
                {treeStepIdx + 1}/{treeSteps.length}
              </span>
              <button
                onClick={() => { setIsTreePlaying(false); setTreeStepIdx(Math.min(treeSteps.length - 1, treeStepIdx + 1)); }}
                disabled={treeStepIdx >= treeSteps.length - 1}
                className="p-1 rounded-md hover:bg-[#201010] disabled:opacity-30 text-zinc-300 cursor-pointer"
                title="Step Forward"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { setIsTreePlaying(false); setTreeStepIdx(0); }}
                className="p-1 rounded-md hover:bg-[#201010] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212]">
              <button
                onClick={() => setIsBarPlaying(!isBarPlaying)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow"
              >
                {isBarPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isBarPlaying ? 'Pause' : barStepIdx >= barTrace.length - 1 ? 'Replay' : 'Sort Bars'}</span>
              </button>
              <button
                onClick={() => { setIsBarPlaying(false); setBarStepIdx(0); }}
                className="p-1 rounded-md hover:bg-[#201010] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                title="Reset Bars"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* View Tab Toggle */}
          <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212] text-xs font-mono">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'visualizer'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              সিমুলেশন
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কোড
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'cases'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কেস স্টাডি
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN STUDIO LAYOUT */}
      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT COLUMN: THE VISUAL CANVAS (8 cols = 66%) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            {visualMode === 'tree' ? (
              <div className="relative rounded-2xl bg-[#080d14] border border-[#182838] p-3 shadow-xl overflow-hidden flex flex-col items-center">
                {/* SVG Header Strip */}
                <div className="w-full flex items-center justify-between pb-2 border-b border-[#121e2d] text-xs font-mono">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                    <span>পার্টিশন ট্রি ভিউ (Partition Tree): [20, 2, 9, 7, 12, 15, 1, 6, 8]</span>
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-sky-300">■ সাব-অ্যারে</span>
                    <span className="text-amber-300">■ পিভট</span>
                    <span className="text-emerald-300">■ লকড</span>
                  </div>
                </div>

                {/* Compact Scaled SVG Tree */}
                <div className="w-full flex justify-center py-1 overflow-x-auto">
                  <svg viewBox="0 0 840 440" className="w-full h-auto max-h-[460px] select-none">
                    <defs>
                      <marker id="arrow-head" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M 0 0 L 6 3 L 0 6 z" fill="#38bdf8" />
                      </marker>
                    </defs>

                    {/* Level 0 -> Level 1 */}
                    {renderTreeArrow('a_root_left', 340, 58, 200, 128, '< 8')}
                    {renderTreeArrow('a_root_pivot', 420, 58, 420, 128, 'Pivot')}
                    {renderTreeArrow('a_root_right', 500, 58, 650, 128, '>= 8')}

                    {/* Level 1 (Left) -> Level 2 */}
                    {renderTreeArrow('a_l1_ll', 170, 158, 110, 233, '< 6')}
                    {renderTreeArrow('a_l1_lp', 200, 158, 200, 233, 'Pivot')}
                    {renderTreeArrow('a_l1_lr', 230, 158, 290, 233, '>= 6')}

                    {/* Level 2 (Left) -> Level 3 */}
                    {renderTreeArrow('a_l2_p1', 95, 263, 80, 338, 'Pivot')}
                    {renderTreeArrow('a_l2_v2', 125, 263, 140, 338, '>= 1')}

                    {/* Level 1 (Right) -> Level 2 */}
                    {renderTreeArrow('a_l1_rl', 620, 158, 560, 233, '< 12')}
                    {renderTreeArrow('a_l1_rp', 650, 158, 650, 233, 'Pivot')}
                    {renderTreeArrow('a_l1_rr', 680, 158, 740, 233, '>= 12')}

                    {/* Level 2 (Right) -> Level 3 */}
                    {renderTreeArrow('a_l2_v15', 725, 263, 700, 338, '< 20')}
                    {renderTreeArrow('a_l2_p20', 755, 263, 780, 338, 'Pivot')}

                    {/* NODES */}
                    {renderTreeBlock('root', TREE_PRESET_1, 420, 30, 8, false, 'ROOT')}

                    {renderTreeBlock('l1_left', [2, 7, 1, 6], 200, 130, 3, false, '< 8')}
                    {renderTreeBlock('l1_pivot', [8], 420, 130, 0, true, 'PIVOT 8')}
                    {renderTreeBlock('l1_right', [15, 9, 20, 12], 650, 130, 3, false, '>= 8')}

                    {renderTreeBlock('l2_l_left', [2, 1], 110, 235, 1, false, '< 6')}
                    {renderTreeBlock('l2_l_pivot', [6], 200, 235, 0, true, 'PIVOT 6')}
                    {renderTreeBlock('l2_l_right', [7], 290, 235, -1, false, '>= 6')}

                    {renderTreeBlock('l2_r_left', [9], 560, 235, -1, false, '< 12')}
                    {renderTreeBlock('l2_r_pivot', [12], 650, 235, 0, true, 'PIVOT 12')}
                    {renderTreeBlock('l2_r_right', [15, 20], 740, 235, 1, false, '>= 12')}

                    {renderTreeBlock('l3_pivot_1', [1], 80, 340, 0, true, 'PIVOT 1')}
                    {renderTreeBlock('l3_val_2', [2], 140, 340, -1, false, 'BASE')}

                    {renderTreeBlock('l3_val_15', [15], 700, 340, -1, false, 'BASE')}
                    {renderTreeBlock('l3_pivot_20', [20], 780, 340, 0, true, 'PIVOT 20')}
                  </svg>
                </div>
              </div>
            ) : (
              /* LIVE BAR CANVAS */
              <div className="relative rounded-2xl bg-[#07090e] border border-[#1f283d] overflow-hidden shadow-xl p-3 flex flex-col space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#1b253b] text-xs font-mono">
                  <span className="text-orange-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>লাইভ বার সর্টিং সিমুলেটর ({barArray.length} টি বার)</span>
                  </span>
                  <span className="text-zinc-400">কিবোর্ড: 'Enter' (সর্ট/পজ), 'R' (নতুন বার)</span>
                </div>

                <div className="w-full h-64 bg-[#04060a] border border-[#151f33] rounded-xl p-3 flex items-end justify-center gap-1 relative overflow-hidden">
                  {currentBarStep.arr.map((val: number, idx: number) => {
                    const isPivot = idx === currentBarStep.pivotIdx;
                    const isComparing = idx === currentBarStep.comparingIdx;
                    const isSorted = currentBarStep.sortedIndices.includes(idx);
                    const isInActivePartition = idx >= currentBarStep.partitionStart && idx <= currentBarStep.partitionEnd;

                    let barColor = 'bg-[#f97316]';
                    let barBorder = 'border-orange-500';

                    if (isSorted) {
                      barColor = 'bg-[#22c55e]';
                      barBorder = 'border-emerald-400';
                    } else if (isPivot) {
                      barColor = 'bg-[#38bdf8]';
                      barBorder = 'border-sky-300';
                    } else if (isComparing) {
                      barColor = 'bg-[#ef4444]';
                      barBorder = 'border-rose-400';
                    } else if (!isInActivePartition) {
                      barColor = 'bg-[#334155] opacity-50';
                      barBorder = 'border-slate-600';
                    }

                    return (
                      <div
                        key={idx}
                        className={`flex-1 min-w-[3px] max-w-[12px] rounded-t-sm transition-all duration-75 ${barColor} border-t ${barBorder}`}
                        style={{ height: `${val}%` }}
                      />
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-xl bg-[#0b101c] border border-[#18253b] text-xs font-mono flex items-center justify-between">
                  <span className="text-orange-300 font-bold">স্টেপ {barStepIdx + 1} / {barTrace.length}:</span>
                  <span className="text-zinc-300 truncate max-w-md">{currentBarStep.desc}</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: TELEMETRY & LIVE INSPECTOR DECK (4 cols = 34%) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {/* Step Description Card */}
            <div className="p-4 rounded-2xl bg-[#0e0707] border border-[#2e1414] shadow-lg space-y-2">
              <div className="flex items-center justify-between border-b border-[#210f0f] pb-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                  {visualMode === 'tree' ? `ধাপ ${treeStepIdx + 1} / ${treeSteps.length}` : `বার স্টেপ ${barStepIdx + 1}`}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  {visualMode === 'tree' ? (currentTreeStep.finalAssembly ? 'ASSEMBLY' : 'PARTITION') : 'IN-PLACE'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">
                {visualMode === 'tree' ? currentTreeStep.title : 'লাইভ পার্টিশনিং স্ট্যাটাস'}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {visualMode === 'tree' ? currentTreeStep.desc : currentBarStep.desc}
              </p>
            </div>

            {/* LIVE FINAL ASSEMBLY ARENA (Visible in Tree mode during assembly steps) */}
            {visualMode === 'tree' && currentTreeStep.finalAssembly && (
              <div className="p-4 rounded-2xl bg-[#09111c] border-2 border-rose-500/40 shadow-xl space-y-3 animate-in fade-in">
                <div className="flex items-center gap-1.5 border-b border-[#182a40] pb-2">
                  <Target className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider">
                    চূড়ান্ত সংযোজন (Left + Pivot + Right)
                  </span>
                </div>

                {/* 3 components */}
                <div className="space-y-2 text-xs font-mono">
                  {/* Left block */}
                  <div className="p-2 rounded-xl bg-[#060c14] border border-sky-500/30 flex items-center justify-between">
                    <span className="text-[10px] text-sky-400 uppercase font-bold">১. বামের সর্টেড (&lt; 8):</span>
                    <div className="flex items-center gap-1">
                      {currentTreeStep.finalAssembly.leftBlock.map((v, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-sky-900 border border-sky-500 text-sky-100 font-bold text-[11px]">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pivot */}
                  <div className="p-2 rounded-xl bg-[#1c1204] border border-amber-500/40 flex items-center justify-between">
                    <span className="text-[10px] text-amber-300 uppercase font-bold flex items-center gap-1">
                      <Target className="w-3 h-3 text-amber-400" />
                      <span>২. কেন্দ্রীয় পিভট:</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 border border-amber-300 text-black font-black text-xs">
                      {currentTreeStep.finalAssembly.pivotVal}
                    </span>
                  </div>

                  {/* Right block */}
                  <div className="p-2 rounded-xl bg-[#060c14] border border-rose-500/30 flex items-center justify-between">
                    <span className="text-[10px] text-rose-400 uppercase font-bold">৩. ডানের সর্টেড (&gt;= 8):</span>
                    <div className="flex items-center gap-1">
                      {currentTreeStep.finalAssembly.rightBlock.map((v, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-rose-900 border border-rose-500 text-rose-100 font-bold text-[11px]">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Combined Assembled Array */}
                <div className="p-2 rounded-xl bg-[#050912] border border-emerald-500/30 flex flex-col items-center space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">
                    সমন্বিত পূর্ণাঙ্গ সর্টেড অ্যারে
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {currentTreeStep.finalAssembly.assembledSoFar.map((v, idx) => {
                      const isP = v === currentTreeStep.finalAssembly?.pivotVal;
                      return (
                        <span
                          key={idx}
                          className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-black border ${
                            isP
                              ? 'bg-amber-500 text-black border-amber-300 scale-105'
                              : 'bg-emerald-950 text-emerald-200 border-emerald-700'
                          }`}
                        >
                          {v}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Invariants & Complexity Matrix */}
            <div className="p-3.5 rounded-2xl bg-[#0e0707] border border-[#2e1414] text-xs font-mono space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block border-b border-[#210f0f] pb-1">
                মৌলিক ইনভ্যারিয়েন্ট (Invariants)
              </span>
              <div className="flex justify-between">
                <span className="text-zinc-400">Average Time:</span>
                <span className="text-emerald-300 font-bold">O(N log N) Fast</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Auxiliary Space:</span>
                <span className="text-sky-300 font-bold">O(log N) Call Stack</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">In-Place:</span>
                <span className="text-emerald-300 font-bold">Yes (RAM Locality)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CODE TAB */}
      {activeTab === 'code' && (
        <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>TypeScript লোমুটো পার্টিশন (Lomuto Partition) কোড</span>
          </h3>
          <pre className="p-3.5 rounded-xl bg-[#04070c] border border-[#142130] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);  // বাম পাশ সর্ট
    quickSort(arr, pivotIdx + 1, high); // ডান পাশ সর্ট
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // শেষ উপাদান পিভট
  let i = low - 1; // ছোট উপাদানের সীমানা

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}
          </pre>
        </div>
      )}

      {/* 4. CASE STUDIES TAB */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 shadow-xl space-y-2">
            <h4 className="text-xs font-bold text-rose-300 uppercase font-mono">CPU Cache Locality</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              কুইক সর্ট ইন-প্লেস কাজ করে। কোনো অতিরিক্ত অ্যারে তৈরি না করায় ডেটা সরাসরি CPU L1/L2 ক্যাশে থাকে, যা মেমোরি রিডকে আলোর গতি দেয়।
            </p>
          </div>
          <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-4 shadow-xl space-y-2">
            <h4 className="text-xs font-bold text-rose-300 uppercase font-mono">Dual-Pivot Quicksort (Java & V8)</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              জাভার আধুনিক রানটাইমে ভ্লাদিমির ইয়ারোস্লাভস্কির ২-পিভট অ্যালগরিদম ব্যবহৃত হয় যা অ্যারেকে একবারে ৩ ভাগে ভাগ করে আরও ২০% গতি বাড়ায়।
            </p>
          </div>
        </div>
      )}

      {/* 5. FOOTER NAVIGATION */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2e1414] text-xs font-mono">
        <button
          onClick={() => onNavigate && onNavigate('sorting-merge')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#150a0a] hover:bg-[#201010] border border-[#2b1212] text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span>পূর্ববর্তী: মার্জ সর্ট (Merge Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold transition-all shadow cursor-pointer"
        >
          <span>সর্টিং ওভারভিউ ও ম্যাট্রিক্স</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
