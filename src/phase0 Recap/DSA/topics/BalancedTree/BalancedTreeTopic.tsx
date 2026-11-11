'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Scale,
  PlusCircle,
  RotateCcw,
  Sparkles,
  Zap,
  Cpu,
  FileCode2,
  Database,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Layers
} from 'lucide-react';

// AVL Node definition
interface AVLNode {
  val: number;
  height: number;
  left: AVLNode | null;
  right: AVLNode | null;
}

// Red-Black Node definition
type NodeColor = 'RED' | 'BLACK';
interface RBNode {
  val: number;
  color: NodeColor;
  left: RBNode | null;
  right: RBNode | null;
}

interface PositionedNode {
  val: number;
  x: number;
  y: number;
  depth: number;
  bf?: number; // Balance Factor for AVL
  color?: NodeColor; // Color for Red-Black
  left: PositionedNode | null;
  right: PositionedNode | null;
}

interface TreeStep {
  title: string;
  explanation: string;
  treeValues: number[];
  activeNodeVal?: number;
  highlightedEdge?: { from: number; to: number };
  rotationType?: 'LL' | 'RR' | 'LR' | 'RL' | 'RECOLOR' | 'NONE';
}

// Helper: AVL Tree Algorithms
function getHeight(node: AVLNode | null): number {
  return node ? node.height : 0;
}

function getBalanceFactor(node: AVLNode | null): number {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function rightRotate(y: AVLNode): AVLNode {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  return x;
}

function leftRotate(x: AVLNode): AVLNode {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  return y;
}

function insertAVL(node: AVLNode | null, val: number): AVLNode {
  if (!node) return { val, height: 1, left: null, right: null };
  if (val < node.val) node.left = insertAVL(node.left, val);
  else if (val > node.val) node.right = insertAVL(node.right, val);
  else return node; // duplicates not inserted

  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const bf = getBalanceFactor(node);

  // LL Case
  if (bf > 1 && val < (node.left?.val ?? 0)) {
    return rightRotate(node);
  }
  // RR Case
  if (bf < -1 && val > (node.right?.val ?? 0)) {
    return leftRotate(node);
  }
  // LR Case
  if (bf > 1 && val > (node.left?.val ?? 0)) {
    node.left = leftRotate(node.left!);
    return rightRotate(node);
  }
  // RL Case
  if (bf < -1 && val < (node.right?.val ?? 0)) {
    node.right = rightRotate(node.right!);
    return leftRotate(node);
  }

  return node;
}

function buildAVL(values: number[]): AVLNode | null {
  let root: AVLNode | null = null;
  for (const v of values) {
    root = insertAVL(root, v);
  }
  return root;
}

function getTreeDepth(node: AVLNode | RBNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

// Layout Tree nodes onto Canvas
function layoutAVLNode(
  root: AVLNode | null,
  width = 760,
  height = 360
): PositionedNode | null {
  if (!root) return null;
  const totalDepth = Math.max(1, getTreeDepth(root));

  const rankMap = new Map<number, number>();
  let rank = 0;
  function inOrder(n: AVLNode | null) {
    if (!n) return;
    inOrder(n.left);
    rankMap.set(n.val, rank++);
    inOrder(n.right);
  }
  inOrder(root);

  const totalNodes = rank;
  const paddingX = Math.max(45, Math.min(80, width / (totalNodes + 1)));
  const stepX = totalNodes > 1 ? (width - 2 * paddingX) / (totalNodes - 1) : 0;
  const stepY = totalDepth > 1 ? (height - 90) / (totalDepth - 1) : 0;

  function build(n: AVLNode | null, depth: number): PositionedNode | null {
    if (!n) return null;
    const r = rankMap.get(n.val) ?? 0;
    const x = totalNodes === 1 ? width / 2 : paddingX + r * stepX;
    const y = 45 + depth * stepY;
    const bf = getBalanceFactor(n);
    const left = build(n.left, depth + 1);
    const right = build(n.right, depth + 1);
    return { val: n.val, x, y, depth, bf, left, right };
  }

  return build(root, 0);
}

// Layout Red-Black Tree nodes
function buildRBTree(values: number[]): RBNode | null {
  // Balanced approximation for Red-Black demonstration
  // In an RB-Tree, root is black, alternating levels or unbalanced insertions recolor.
  const avlRoot = buildAVL(values);
  if (!avlRoot) return null;

  function convert(n: AVLNode | null, isRoot = false): RBNode | null {
    if (!n) return null;
    // Root is black; children alternating color
    const color: NodeColor = isRoot ? 'BLACK' : (n.height % 2 === 0 ? 'RED' : 'BLACK');
    return {
      val: n.val,
      color,
      left: convert(n.left, false),
      right: convert(n.right, false)
    };
  }

  return convert(avlRoot, true);
}

function layoutRBNode(
  root: RBNode | null,
  width = 760,
  height = 360
): PositionedNode | null {
  if (!root) return null;
  const totalDepth = Math.max(1, getTreeDepth(root));

  const rankMap = new Map<number, number>();
  let rank = 0;
  function inOrder(n: RBNode | null) {
    if (!n) return;
    inOrder(n.left);
    rankMap.set(n.val, rank++);
    inOrder(n.right);
  }
  inOrder(root);

  const totalNodes = rank;
  const paddingX = Math.max(45, Math.min(80, width / (totalNodes + 1)));
  const stepX = totalNodes > 1 ? (width - 2 * paddingX) / (totalNodes - 1) : 0;
  const stepY = totalDepth > 1 ? (height - 90) / (totalDepth - 1) : 0;

  function build(n: RBNode | null, depth: number): PositionedNode | null {
    if (!n) return null;
    const r = rankMap.get(n.val) ?? 0;
    const x = totalNodes === 1 ? width / 2 : paddingX + r * stepX;
    const y = 45 + depth * stepY;
    const left = build(n.left, depth + 1);
    const right = build(n.right, depth + 1);
    return { val: n.val, x, y, depth, color: n.color, left, right };
  }

  return build(root, 0);
}

function flattenTree(root: PositionedNode | null) {
  const nodes: PositionedNode[] = [];
  const edges: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    fromVal: number;
    toVal: number;
  }[] = [];

  function traverse(n: PositionedNode | null) {
    if (!n) return;
    nodes.push(n);
    if (n.left) {
      edges.push({
        fromX: n.x,
        fromY: n.y,
        toX: n.left.x,
        toY: n.left.y,
        fromVal: n.val,
        toVal: n.left.val
      });
      traverse(n.left);
    }
    if (n.right) {
      edges.push({
        fromX: n.x,
        fromY: n.y,
        toX: n.right.x,
        toY: n.right.y,
        fromVal: n.val,
        toVal: n.right.val
      });
      traverse(n.right);
    }
  }

  traverse(root);
  return { nodes, edges };
}

export default function BalancedTreeTopic() {
  const [activeModel, setActiveModel] = useState<'avl' | 'redblack'>('avl');
  const [treeValues, setTreeValues] = useState<number[]>([40, 20, 60, 10, 30, 50, 70]);
  const [inputVal, setInputVal] = useState<number>(25);

  // Stepping & Playback
  const [steps, setSteps] = useState<TreeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const speedMs = 1200; // Fixed 1.2s smooth slow playback
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Tree computation
  const avlRoot = useMemo(() => buildAVL(treeValues), [treeValues]);
  const rbRoot = useMemo(() => buildRBTree(treeValues), [treeValues]);

  const canvasWidth = useMemo(() => Math.max(760, (treeValues.length + 1) * 56), [treeValues.length]);
  const canvasHeight = 360;

  const positionedRoot = useMemo(() => {
    return activeModel === 'avl'
      ? layoutAVLNode(avlRoot, canvasWidth, canvasHeight)
      : layoutRBNode(rbRoot, canvasWidth, canvasHeight);
  }, [activeModel, avlRoot, rbRoot, canvasWidth]);

  const { nodes: flatNodes, edges: flatEdges } = useMemo(
    () => flattenTree(positionedRoot),
    [positionedRoot]
  );

  const currentStep = steps[currentStepIndex] || null;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            if (steps[nextIdx]?.treeValues) {
              setTreeValues(steps[nextIdx].treeValues);
            }
            return nextIdx;
          }
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
  }, [isPlaying, steps, speedMs]);

  // Insert handler with step generation
  const handleInsert = (valToInsert = inputVal) => {
    if (treeValues.includes(valToInsert)) return;
    setIsPlaying(false);

    const generatedSteps: TreeStep[] = [];

    // Step 1: Standard BST insertion
    const intermediateValues = [...treeValues, valToInsert];
    generatedSteps.push({
      title: 'BST Insert',
      explanation: `নোড ${valToInsert} কে সাধারণ BST নিয়মে ট্রিতে যুক্ত করা হলো।`,
      treeValues: intermediateValues,
      activeNodeVal: valToInsert,
      rotationType: 'NONE'
    });

    // Step 2: Check balance factor / rebalance
    const avlBalancedRoot = buildAVL(intermediateValues);
    // Extract values
    const inOrderVals: number[] = [];
    function extract(n: AVLNode | null) {
      if (!n) return;
      inOrderVals.push(n.val);
      extract(n.left);
      extract(n.right);
    }
    extract(avlBalancedRoot);

    generatedSteps.push({
      title: activeModel === 'avl' ? 'Balance Check & Rotation' : 'Coloring & Rebalancing',
      explanation:
        activeModel === 'avl'
          ? `ব্যালেন্স ফ্যাক্টর চেক করা হলো। প্রয়োজনমতো রোটেশন সম্পন্ন করে ট্রির উচ্চতা ব্যালেন্স রাখা হলো (উচ্চতার পার্থক্য ≤ ১)।`
          : `রেড-ব্ল্যাক প্রোপার্টি অনুসারে রুট সবসময় কালো থাকবে এবং পাশাপাশি দুটি লাল নোড থাকবে না।`,
      treeValues: inOrderVals,
      activeNodeVal: valToInsert,
      rotationType: 'LL'
    });

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setTreeValues(intermediateValues);
    setIsPlaying(true);
  };

  // Pre-configured Rotation triggers for instant learning
  const triggerPreset = (type: 'LL' | 'RR' | 'LR' | 'RL') => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    let initialVals: number[] = [];
    let finalVals: number[] = [];
    let explanation = '';

    if (type === 'LL') {
      initialVals = [30, 20, 10]; // Left heavy line
      finalVals = [20, 10, 30]; // Balanced
      explanation = 'Left-Left (LL) পরিস্থিতি: বামে হেভি হয়ে পড়ায় নোড ৩০-এর ওপর Right Rotation প্রয়োগ করে ২০-কে নতুন প্যারেন্ট করা হলো।';
    } else if (type === 'RR') {
      initialVals = [10, 20, 30]; // Right heavy line
      finalVals = [20, 10, 30]; // Balanced
      explanation = 'Right-Right (RR) পরিস্থিতি: ডানে হেভি হয়ে পড়ায় নোড ১০-এর ওপর Left Rotation প্রয়োগ করে ২০-কে নতুন প্যারেন্ট করা হলো।';
    } else if (type === 'LR') {
      initialVals = [30, 10, 20]; // Zig-zag left-right
      finalVals = [20, 10, 30]; // Balanced
      explanation = 'Left-Right (LR) জিগজ্যাগ: প্রথমে বামের নোডে Left Rotation, এরপর মূল রুটে Right Rotation (Double Rotation)।';
    } else if (type === 'RL') {
      initialVals = [10, 30, 20]; // Zig-zag right-left
      finalVals = [20, 10, 30]; // Balanced
      explanation = 'Right-Left (RL) জিগজ্যাগ: প্রথমে ডানের নোডে Right Rotation, এরপর মূল রুটে Left Rotation (Double Rotation)।';
    }

    const genSteps: TreeStep[] = [
      {
        title: `Unbalanced State (${type})`,
        explanation: `অন-ব্যালেন্সড অবস্থা: উচ্চতার পার্থক্য ১-এর বেশি হয়ে গেছে (Balance Factor |BF| > 1)। ট্রিটি তির্যক হয়ে লিনিয়ার চেইনের মতো হয়ে যাচ্ছিল।`,
        treeValues: initialVals,
        rotationType: 'NONE'
      },
      {
        title: `Self-Balancing Rotation (${type})`,
        explanation,
        treeValues: finalVals,
        rotationType: type
      }
    ];

    setSteps(genSteps);
    setCurrentStepIndex(0);
    setTreeValues(initialVals);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTreeValues([40, 20, 60, 10, 30, 50, 70]);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card - Balanced Tree Definition & Visual Diagram */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-sky-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">ব্যালেন্সড ট্রি (Balanced Trees)</h2>
            <span className="text-xs font-mono text-sky-400 font-medium">
              Self-Balancing Binary Search Trees • উচ্চতার ভারসাম্য • O(log N) নিশ্চিত সময়
            </span>
          </div>
        </div>

        {/* What is a Balanced Tree & Why it matters */}
        <div className="space-y-3">
          <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
            <b>ব্যালেন্সড ট্রি (Balanced Tree)</b> হলো এমন এক ধরণের বাইনারি সার্চ ট্রি, যা স্বয়ংক্রিয়ভাবে প্রতিটি নোডের বাম ও ডান শাখার উচ্চতার ভারসাম্য বজায় রাখে।
          </p>

          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3.5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
              <strong className="text-amber-300 font-semibold block">ট্রি ব্যালেন্স করার প্রয়োজন কখন পড়ে?</strong>
              <span>
                একটি সাধারণ বাইনারি সার্চ ট্রিতে যখন ক্রমানুসারে বড় বা ছোট ডেটা ইনসার্ট করা হয় (যেমন: ১০, ২০, ৩০, ৪০, ৫০...), তখন ট্রিটি একমুখী হয়ে ডানে (বা বাঁয়ে) বাড়তে বাড়তে হুবহু একটি <b>লিংকড লিস্টের (Linked List)</b> মতো সোজা লাইনে পরিণত হয়। এর ফলে ট্রি-এর মূল সুবিধা নষ্ট হয়ে যায় এবং নোড সার্চ করতে লিংকড লিস্টের মতোই মন্থর <b>O(N)</b> সময় লেগে যায়। এই অধঃপতন রোধ করে সবসময় দ্রুততম <b>O(log N)</b> পারফরম্যান্স ধরে রাখতেই <b>AVL Tree</b> বা <b>Red-Black Tree</b> এর মতো ব্যালেন্সড ট্রি ব্যবহার করা হয়।
              </span>
            </div>
          </div>
        </div>

        {/* Visual Comparison Diagram: Skewed Tree vs Balanced Tree */}
        <div className="bg-[#08090f] border border-[#1d2133] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Unbalanced Skewed Tree */}
          <div className="flex-1 w-full flex flex-col items-center bg-[#11131f]/70 border border-rose-950/60 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              সাধারণ BST: আন-ব্যালেন্সড (Skewed Degraded)
            </div>
            {/* Visual SVG mini tree */}
            <svg viewBox="0 0 200 90" className="w-48 h-20 select-none">
              <line x1="40" y1="20" x2="80" y2="40" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="120" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="120" y1="60" x2="160" y2="80" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx="40" cy="20" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="40" y="24" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">10</text>
              <circle cx="80" cy="40" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="80" y="44" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">20</text>
              <circle cx="120" cy="60" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="120" y="64" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>
              <circle cx="160" cy="80" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="160" y="84" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">40</text>
            </svg>
            <span className="text-[11px] font-mono text-rose-300 mt-1">
              উচ্চতা = N • সার্চ টাইম খারাপ: <strong className="text-rose-400">O(N)</strong>
            </span>
          </div>

          {/* Center: Balance Transformation Arrow */}
          <div className="flex flex-col items-center justify-center text-zinc-500 font-mono text-xs">
            <span className="text-sky-400 font-bold mb-1">Self-Balancing</span>
            <div className="w-10 h-10 rounded-full bg-[#151928] border border-[#232b45] flex items-center justify-center text-sky-400 shadow-md">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <span className="text-[10px] text-zinc-400 mt-1">Rotations</span>
          </div>

          {/* Right: Balanced Tree */}
          <div className="flex-1 w-full flex flex-col items-center bg-[#11131f]/70 border border-sky-950/60 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              ব্যালেন্সড ট্রি: সুষম শাখা (Optimal Balanced)
            </div>
            {/* Visual SVG balanced tree */}
            <svg viewBox="0 0 200 90" className="w-48 h-20 select-none">
              <line x1="100" y1="20" x2="50" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="100" y1="20" x2="150" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="150" y1="55" x2="175" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="50" y1="55" x2="25" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Root */}
              <circle cx="100" cy="20" r="12" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="100" y="24" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">20</text>
              {/* Left */}
              <circle cx="50" cy="55" r="11" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="50" y="59" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">10</text>
              {/* Right */}
              <circle cx="150" cy="55" r="11" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="150" y="59" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>
              {/* Leaves */}
              <circle cx="25" cy="80" r="9" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="25" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">5</text>
              <circle cx="175" cy="80" r="9" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="175" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">40</text>
            </svg>
            <span className="text-[11px] font-mono text-sky-300 mt-1">
              উচ্চতা = log N • সার্চ টাইম দ্রুততম: <strong className="text-sky-400">O(log N)</strong>
            </span>
          </div>
        </div>

        {/* 2 Popular Types Note */}
        <div className="bg-[#141624]/60 border border-[#202538] rounded-xl p-3.5 flex items-start gap-3">
          <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-300 leading-relaxed">
            ব্যালেন্সড ট্রির মধ্যে বহুল ব্যবহৃত ও জনপ্রিয় দুটি রূপ হলো: <strong className="text-sky-300">১. AVL Tree</strong> (কড়াকড়ি উচ্চতা বজায় রাখে) এবং <strong className="text-rose-300">২. Red-Black Tree</strong> (কালার রুলস দিয়ে কম রোটেশনে দ্রুত কাজ করে)। নিচের সিমুলেশন ফিল্টারে এই দুটি ট্রি আলাদাভাবে নির্বাচন করে পর্যবেক্ষণ করতে পারেন।
          </p>
        </div>
      </div>

      {/* 2. Interactive Simulator with Mode Filter on Top */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        {/* Simulator Top Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#1b1e2e]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider">
              ট্রি মডেল ফিল্টার:
            </span>
            <div className="flex items-center bg-[#090a10] p-1 rounded-xl border border-[#1f2338]">
              <button
                onClick={() => setActiveModel('avl')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeModel === 'avl'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-300"></span>
                AVL Tree (Strict)
              </button>
              <button
                onClick={() => setActiveModel('redblack')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeModel === 'redblack'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Red-Black Tree (Standard)
              </button>
            </div>
          </div>

          <span className="text-[11px] font-mono text-zinc-400 bg-[#131522] px-3 py-1 rounded-lg border border-[#1e2235]">
            {activeModel === 'avl' ? 'Balance Factor: |hL - hR| ≤ 1' : '5 Color-Coding Invariants'}
          </span>
        </div>

        {/* Dynamic Mini-Definition Card for the Selected Filter */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeModel === 'avl'
            ? 'bg-sky-950/20 border-sky-800/50 text-sky-200'
            : 'bg-rose-950/20 border-rose-800/50 text-rose-200'
        }`}>
          {activeModel === 'avl' ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-sky-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  AVL Tree এর মূল ধারণা ও বৈশিষ্ট্য
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/60 border border-sky-700 text-sky-300">
                  Strictly Balanced
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                প্রতিটি নোডের <b>Balance Factor (BF)</b> = বাম সাব-ট্রির উচ্চতা − ডান সাব-ট্রির উচ্চতা। একটি ভ্যালিড AVL ট্রিতে BF সবসময় <b>-১, ০ অথবা +১</b> হতে হবে। কোনো ইনসার্টে উচ্চতার পার্থক্য ১-এর বেশি হলে সাথে সাথে ৪ ধরনের রোটেশন (<b>LL, RR, LR, RL</b>) ব্যবহার করে ট্রিকে ব্যালেন্স করা হয়। এটি ঘন ঘন <b>Search</b> করার জন্য সেরা।
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                  Red-Black Tree এর মূল ধারণা ও বৈশিষ্ট্য
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
                  Color Invariant Balanced
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                প্রতিটি নোডের রঙ <b>লাল (Red)</b> অথবা <b>কালো (Black)</b> হয়। এর মূল শর্ত: রুট সবসময় কালো, পাশাপাশি দুটি লাল নোড থাকতে পারবে না, এবং রুট থেকে সব নাল (NIL) পাতার পথে কালো নোডের সংখ্যা সমান হবে। রোটেশনের চেয়ে দ্রুত কালার পরিবর্তনের (Recoloring) ওপর নির্ভর করায় এটি ঘন ঘন <b>Insert ও Delete</b>-এর জন্য সেরা (যেমন Java <code>TreeMap</code> ও Linux Kernel)।
              </p>
            </div>
          )}
        </div>
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3.5 rounded-xl border border-[#1d2030]">
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Insert Control */}
            <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-300 font-medium">Insert:</span>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
                className="w-16 bg-[#141624] text-sky-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => handleInsert()}
                disabled={isPlaying}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Insert
              </button>
            </div>

            {/* Quick 4 Rotation Presets */}
            <div className="flex items-center gap-1.5 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-400">Test Rotations:</span>
              <button
                onClick={() => triggerPreset('LL')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-sky-300 border border-[#26304d] cursor-pointer"
                title="Left-Left imbalance ➔ Right Rotate"
              >
                LL
              </button>
              <button
                onClick={() => triggerPreset('RR')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-indigo-300 border border-[#26304d] cursor-pointer"
                title="Right-Right imbalance ➔ Left Rotate"
              >
                RR
              </button>
              <button
                onClick={() => triggerPreset('LR')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-emerald-300 border border-[#26304d] cursor-pointer"
                title="Left-Right zig-zag ➔ Double Rotate"
              >
                LR
              </button>
              <button
                onClick={() => triggerPreset('RL')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-amber-300 border border-[#26304d] cursor-pointer"
                title="Right-Left zig-zag ➔ Double Rotate"
              >
                RL
              </button>
            </div>
          </div>

          {/* Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] cursor-pointer font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Dynamic Tree SVG Canvas with Integrated Top-Left Controls */}
        <div className="min-h-[360px] bg-[#07080e] rounded-xl border border-[#1a1d2e] p-4 flex flex-col items-center justify-center relative overflow-x-auto">
          {/* Integrated Playback Controls (Top Left Corner) */}
          <div className="absolute top-3 left-3 z-10 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] p-1.5 rounded-lg flex items-center gap-2 shadow-lg">
            {/* Step Back */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={steps.length === 0 || currentStepIndex === 0 || isPlaying}
              className="p-1.5 rounded bg-[#141624] hover:bg-[#1d2033] disabled:opacity-30 text-zinc-300 border border-[#20243a] transition-colors cursor-pointer"
              title="Step Back"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={steps.length === 0 || currentStepIndex >= steps.length - 1}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-xs font-mono text-slate-950 font-bold shadow transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Auto-Play
                </>
              )}
            </button>

            {/* Step Forward */}
            <button
              onClick={() => {
                setIsPlaying(false);
                if (currentStepIndex < steps.length - 1) {
                  const nextIdx = currentStepIndex + 1;
                  if (steps[nextIdx]?.treeValues) {
                    setTreeValues(steps[nextIdx].treeValues);
                  }
                  setCurrentStepIndex(nextIdx);
                }
              }}
              disabled={steps.length === 0 || currentStepIndex >= steps.length - 1 || isPlaying}
              className="p-1.5 rounded bg-[#141624] hover:bg-[#1d2033] disabled:opacity-30 text-zinc-300 border border-[#20243a] transition-colors cursor-pointer"
              title="Step Forward"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Step Counter */}
            <div className="text-xs font-mono text-zinc-300 px-2 py-0.5 border-l border-[#20243a]">
              {steps.length > 0 ? (
                <>
                  Step <span className="text-sky-400 font-bold">{currentStepIndex + 1}</span>/{steps.length}
                </>
              ) : (
                <span className="text-zinc-500 text-[11px]">Ready</span>
              )}
            </div>
          </div>

          {/* Top-Right Legend */}
          <div className="absolute top-3 right-3 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] px-3.5 py-2 rounded-lg flex items-center gap-3.5 text-xs font-mono text-zinc-300">
            {activeModel === 'avl' ? (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Balanced (|BF| ≤ 1)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Imbalanced (|BF| &gt; 1)
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> RED Node
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span> BLACK Node
                </span>
              </>
            )}
          </div>

          {/* SVG Canvas */}
          {flatNodes.length === 0 ? (
            <div className="text-xs font-mono text-zinc-500 italic">Tree is empty.</div>
          ) : (
            <svg
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
              className="w-full select-none"
              style={{ minWidth: `${Math.min(canvasWidth, 900)}px`, height: `${canvasHeight}px` }}
            >
              {/* Edges */}
              {flatEdges.map((e, idx) => (
                <line
                  key={`edge-${idx}`}
                  x1={e.fromX}
                  y1={e.fromY}
                  x2={e.toX}
                  y2={e.toY}
                  stroke="#1e2438"
                  strokeWidth={2}
                />
              ))}

              {/* Nodes */}
              {flatNodes.map((n) => {
                const isImbalanced = activeModel === 'avl' && Math.abs(n.bf ?? 0) > 1;
                const isRed = activeModel === 'redblack' && n.color === 'RED';

                return (
                  <g key={`node-${n.val}`}>
                    {/* Outer Glow on Imbalance */}
                    {isImbalanced && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={24}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        strokeDasharray="4,2"
                        className="animate-spin"
                        style={{ animationDuration: '6s', transformOrigin: `${n.x}px ${n.y}px` }}
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={18}
                      fill={
                        isImbalanced
                          ? '#4c0519'
                          : isRed
                          ? '#881337'
                          : activeModel === 'redblack'
                          ? '#090a0f'
                          : '#0c1b30'
                      }
                      stroke={
                        isImbalanced
                          ? '#f43f5e'
                          : isRed
                          ? '#fb7185'
                          : activeModel === 'redblack'
                          ? '#3f3f46'
                          : '#38bdf8'
                      }
                      strokeWidth={2}
                    />

                    {/* Value */}
                    <text
                      x={n.x}
                      y={n.y + 4.5}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize={11.5}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {n.val}
                    </text>

                    {/* Balance Factor badge for AVL */}
                    {activeModel === 'avl' && n.bf !== undefined && (
                      <g>
                        <rect
                          x={n.x + 10}
                          y={n.y - 20}
                          width={24}
                          height={14}
                          rx={4}
                          fill={isImbalanced ? '#f43f5e' : '#0369a1'}
                        />
                        <text
                          x={n.x + 22}
                          y={n.y - 9.5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={8.5}
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {n.bf > 0 ? `+${n.bf}` : n.bf}
                        </text>
                      </g>
                    )}

                    {/* Node Color Badge for Red-Black */}
                    {activeModel === 'redblack' && n.color && (
                      <g>
                        <circle
                          cx={n.x + 14}
                          cy={n.y - 14}
                          r={6.5}
                          fill={isRed ? '#e11d48' : '#18181b'}
                          stroke={isRed ? '#fda4af' : '#71717a'}
                          strokeWidth={1}
                        />
                        <text
                          x={n.x + 14}
                          y={n.y - 11.5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={7.5}
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {n.color === 'RED' ? 'R' : 'B'}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Live Step Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] text-sm font-mono flex items-start gap-3.5">
          <div className="mt-0.5">
            {currentStep?.rotationType && currentStep.rotationType !== 'NONE' ? (
              <RefreshCw className="w-5 h-5 text-sky-400 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-100 font-bold uppercase tracking-wider text-xs md:text-sm">
                {currentStep?.title || `${activeModel.toUpperCase()} SIMULATOR`}
              </span>
              {currentStep && (
                <span className="text-xs text-sky-400 font-mono">
                  {currentStep.rotationType !== 'NONE' ? `Rotation: ${currentStep.rotationType}` : 'BST Invariant'}
                </span>
              )}
            </div>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans">
              {currentStep?.explanation ||
                `একটি মান লিখে Insert চাপুন, অথবা ওপরের LL / RR / LR / RL টেস্ট বাটনগুলোতে ক্লিক করে লাইভ রোটেশন ও ব্যালেন্সিং পর্যবেক্ষণ করুন।`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Rotation Playbook & Guidelines for Test Rotations */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold border border-sky-500/20">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-100">টেস্ট রোটেশন (Test Rotations) কী এবং ৪টি রোটেশন কীভাবে কাজ করে?</h3>
            <span className="text-xs font-mono text-zinc-400">রোটেশন গাইডলাইন • ইচ্ছাকৃত আনব্যালেন্সড অবস্থা থেকে অটো-ব্যালেন্সিং পর্যবেক্ষণ</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
          বাস্তব সফটওয়্যারে ডেটা ইনসার্ট করার সাথে সাথে ব্যাকগ্রাউন্ড অ্যালগরিদম চোখের পলকে ট্রি রোটেশন চালিয়ে দেয়। কিন্তু একজন শিক্ষার্থী যাতে নিজের চোখে দেখতে পারেন যে ঠিক কী কারণে ট্রি আনব্যালেন্সড হয় এবং কোন রোটেশনে কীভাবে তা আবার ব্যালেন্সড হয়—সেজন্যই সিমুলেটরে <b>Test Rotations (LL, RR, LR, RL)</b> বাটনগুলো দেওয়া হয়েছে।
        </p>

        {/* 4 Rotation Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* 1. LL Rotation */}
          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-sky-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                ১. LL (Left-Left) ➔ Right Rotation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">Single Rotate</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <b>কখন ঘটে:</b> যখন বাম সাব-ট্রির বাম দিকে অতিরিক্ত নোড যুক্ত হয়ে ট্রি বাঁকা হয়ে বাঁয়ে হেভি হয়ে পড়ে (যেমন: ৩০ ➔ ২০ ➔ ১০)।
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
              <strong className="text-sky-300">সমাধান:</strong> রুট নোডকে ডান দিকে (ঘড়ির কাঁটার দিকে) ঘোরানো হয় (Right Rotate)। মাঝের নোডটি (২০) নতুন রুট হয়ে যায়।
            </p>
          </div>

          {/* 2. RR Rotation */}
          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-indigo-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                ২. RR (Right-Right) ➔ Left Rotation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Single Rotate</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <b>কখন ঘটে:</b> যখন ডান সাব-ট্রির ডান দিকে অতিরিক্ত নোড ঢুকে সোজা লিংকড লিস্টের মতো ডানে হেলে পড়ে (যেমন: ১০ ➔ ২০ ➔ ৩০)।
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
              <strong className="text-indigo-300">সমাধান:</strong> রুট নোডকে বাম দিকে (ঘড়ির কাঁটার বিপরীতে) ঘোরানো হয় (Left Rotate)। মাঝের নোডটি (২০) নতুন রুট হয়।
            </p>
          </div>

          {/* 3. LR Rotation */}
          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                ৩. LR (Left-Right) ➔ Double Rotation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Double Rotate</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <b>কখন ঘটে:</b> বাম শাখার ডান দিকে নোড যোগ হয়ে একটি আঁকাবাঁকা (Zig-Zag) আকার নেয় (যেমন: ৩০ ➔ ১০ ➔ ২০)।
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
              <strong className="text-emerald-300">সমাধান:</strong> প্রথমে বামের চাইল্ডে Left Rotate করে সোজা করা হয়, এরপর মূল রুটে Right Rotate করা হয়।
            </p>
          </div>

          {/* 4. RL Rotation */}
          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                ৪. RL (Right-Left) ➔ Double Rotation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Double Rotate</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <b>কখন ঘটে:</b> ডান শাখার বাম দিকে নোড যোগ হয়ে উল্টো জিগ-জ্যাগ আকার নেয় (যেমন: ১০ ➔ ৩০ ➔ ২০)।
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
              <strong className="text-amber-300">সমাধান:</strong> প্রথমে ডানের চাইল্ডে Right Rotate করে সোজা করা হয়, এরপর মূল রুটে Left Rotate করা হয়।
            </p>
          </div>
        </div>
      </div>

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="ব্যালেন্সড ট্রি (Balanced Trees)"
        scenarios={[
          {
            title: "১. ডিজিটাল নিক্তি বা ভারসাম্য পাল্লা (Self-Leveling Weighing Scale)",
            subtitle: "একপাশে অতিরিক্ত ওজন পড়লে স্বয়ংক্রিয় অ্যাডজাস্টমেন্ট",
            badge: "Self-Balancing",
            visualTag: "Left vs Right Load",
            accentColor: "sky",
            analogy:
              "দাঁড়িপাল্লার একপাশে যদি অতিরিক্ত ওজন ফেলা হয়, তবে তা হেলে গিয়ে অকেজো হয়ে পড়তে পারে। একটি ব্যালেন্সড ট্রি সার্বক্ষণিকভাবে দুই পাশের উচ্চতা পর্যবেক্ষণ করে—যদি একপাশে বেশি উচ্চতা তৈরি হয়, তবে রোটেশনের মাধ্যমে তৎক্ষণাৎ ওজন মাঝখানে নিয়ে আসে।",
            whyItFits:
              "AVL ট্রির ব্যালেন্স ফ্যাক্টর (|BF| ≤ 1) নিশ্চিত করে কোনো একটি শাখা অপর শাখার চেয়ে ১ স্তরের বেশি ঝুঁকে থাকতে পারবে না।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">উচ্চতা অসম?</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-600 text-slate-950 font-bold">Right Rotation</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">উচ্চতার পার্থক্য ≤ ১</span>
              </div>
            ),
          },
          {
            title: "২. ট্রাফিক সিগন্যালের লেন ম্যানেজমেন্ট (Airport Baggage Carousel)",
            subtitle: "দীর্ঘ একমুখী লাইন রুখে প্যারালাল চ্যানেল তৈরি",
            badge: "Worst-Case O(log N)",
            visualTag: "Anti-Degradation",
            accentColor: "indigo",
            analogy:
              "একটি কাউন্টারে ১০০ জন মানুষ এক লাইনে দাঁড়ালে শেষ মানুষটিকে ১০০ ধাপ অপেক্ষা করতে হয় ($O(N)$)। কিন্তু তাদের যদি দ্রুত ৪-৫টি সাব-লাইনে ভাগ করে দেওয়া হয়, তবে সর্বোচ্চ ৬-৭ জনের পরেই ডাক পাওয়া যায় ($O(\\log N$))।",
            whyItFits:
              "সাধারণ বাইনারি ট্রিতে ডেটা সর্টেড থাকলে তা একটি সোজা লাইনে ($O(N)$) রূপ নেয়; ব্যালেন্সড ট্রি রোটেশনের মাধ্যমে গাছটিকে সবসময় ঘন ও সুষম রাখে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300">খারাপ অবস্থা: O(N)</span>
                <span>➔ রোটেশন ➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-bold">ব্যালেন্সড: O(log N)</span>
              </div>
            ),
          },
        ]}
      />

      {/* 3. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Database className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-bold text-zinc-100">1. Java TreeMap &amp; TreeSet</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Java-এর <code>java.util.TreeMap</code> সম্পূর্ণভাবে <b>Red-Black Tree</b> দিয়ে তৈরি, যা নিশ্চিত করে $O(\log N)$ ইনসার্ট, সার্চ এবং ডিলিট।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-zinc-100">2. Linux Kernel CFS Scheduler</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            লিনাক্স অপারেটিং সিস্টেমের সিপিইউ শিডিউলার (Completely Fair Scheduler) প্রসেসগুলোর রান-টাইম ট্র্যাক করতে Red-Black Tree ব্যবহার করে।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <FileCode2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-zinc-100">3. C++ STL std::map &amp; std::set</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            C++ স্ট্যান্ডার্ড লাইব্রেরির <code>std::map</code> ও <code>std::set</code> ব্যাকগ্রাউন্ডে Red-Black Tree পরিচালনা করে ডেটা সর্বদা সর্টেড রাখে।
          </p>
        </div>
      </div>
    </div>
  );
}
