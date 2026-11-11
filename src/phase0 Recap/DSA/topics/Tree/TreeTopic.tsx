'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Network,
  PlusCircle,
  Search,
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
  ArrowDownLeft,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

interface BSTNode {
  val: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

interface PositionedNode {
  val: number;
  x: number;
  y: number;
  depth: number;
  left: PositionedNode | null;
  right: PositionedNode | null;
}

interface TreeStep {
  type: 'COMPARE' | 'MOVE_LEFT' | 'MOVE_RIGHT' | 'FOUND' | 'NOT_FOUND' | 'INSERT_SUCCESS' | 'DUPLICATE' | 'IDLE';
  currNodeVal?: number;
  targetVal: number;
  visitedPath: number[];
  activeEdge?: { from: number; to: number };
  newTreeValues?: number[];
  action: 'insert' | 'search';
  explanation: string;
}

function insertIntoBST(root: BSTNode | null, val: number): BSTNode {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) root.left = insertIntoBST(root.left, val);
  else if (val > root.val) root.right = insertIntoBST(root.right, val);
  return root;
}

function buildBST(values: number[]): BSTNode | null {
  let root: BSTNode | null = null;
  for (const v of values) {
    root = insertIntoBST(root, v);
  }
  return root;
}

function getTreeDepth(node: BSTNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

const MAX_TREE_DEPTH = 8;
const DEFAULT_TREE = [50, 30, 70, 20, 40, 60, 85];

function layoutTree(
  root: BSTNode | null,
  width = 760,
  height = 380
): PositionedNode | null {
  if (!root) return null;

  const totalDepth = Math.max(1, getTreeDepth(root));

  // In-order traversal to calculate strictly ordered horizontal slots
  const rankMap = new Map<number, number>();
  let rank = 0;
  function inOrder(n: BSTNode | null) {
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

  function build(n: BSTNode | null, depth: number): PositionedNode | null {
    if (!n) return null;
    const r = rankMap.get(n.val) ?? 0;
    const x = totalNodes === 1 ? width / 2 : paddingX + r * stepX;
    const y = 45 + depth * stepY;
    const left = build(n.left, depth + 1);
    const right = build(n.right, depth + 1);
    return { val: n.val, x, y, depth, left, right };
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
    dir: 'left' | 'right';
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
        toVal: n.left.val,
        dir: 'left'
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
        toVal: n.right.val,
        dir: 'right'
      });
      traverse(n.right);
    }
  }

  traverse(root);
  return { nodes, edges };
}

export default function TreeTopic() {
  const [treeValues, setTreeValues] = useState<number[]>(DEFAULT_TREE);
  const [inputVal, setInputVal] = useState<number>(65);
  const [searchVal, setSearchVal] = useState<number>(40);

  // Animation & Stepping State
  const [steps, setSteps] = useState<TreeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const speedMs = 1200; // Fixed default slow animation speed (1.2s)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Build current positioned tree
  const bstRoot = useMemo(() => buildBST(treeValues), [treeValues]);
  const treeDepth = useMemo(() => Math.max(1, getTreeDepth(bstRoot)), [bstRoot]);
  const canvasWidth = useMemo(() => Math.max(760, (treeValues.length + 1) * 54), [treeValues.length]);
  const canvasHeight = useMemo(() => Math.max(380, 80 + treeDepth * 55), [treeDepth]);

  const positionedRoot = useMemo(
    () => layoutTree(bstRoot, canvasWidth, canvasHeight),
    [bstRoot, canvasWidth, canvasHeight]
  );
  const { nodes: flatNodes, edges: flatEdges } = useMemo(
    () => flattenTree(positionedRoot),
    [positionedRoot]
  );

  const nodeRadius = treeDepth >= 7 || treeValues.length >= 14 ? 15 : 18;

  const currentStep = steps[currentStepIndex] || null;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            // If the next step has newTreeValues, commit them to tree
            if (steps[nextIdx]?.newTreeValues) {
              setTreeValues(steps[nextIdx].newTreeValues!);
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

  // Generate Search Steps
  const startSearch = () => {
    setIsPlaying(false);
    if (treeValues.length === 0) {
      setSteps([
        {
          type: 'NOT_FOUND',
          targetVal: searchVal,
          visitedPath: [],
          action: 'search',
          explanation: 'Tree is empty. Cannot search.'
        }
      ]);
      setCurrentStepIndex(0);
      return;
    }

    const generatedSteps: TreeStep[] = [];
    const path: number[] = [];
    let curr = bstRoot;

    while (curr) {
      path.push(curr.val);
      const currVal = curr.val;

      if (searchVal === currVal) {
        generatedSteps.push({
          type: 'COMPARE',
          currNodeVal: currVal,
          targetVal: searchVal,
          visitedPath: [...path],
          action: 'search',
          explanation: `Comparing target ${searchVal} with node ${currVal}: They are equal! Value located.`
        });
        generatedSteps.push({
          type: 'FOUND',
          currNodeVal: currVal,
          targetVal: searchVal,
          visitedPath: [...path],
          action: 'search',
          explanation: `🎯 MATCH FOUND! Target ${searchVal} discovered at depth ${path.length - 1} in ${path.length} comparison(s) (O(log N)).`
        });
        break;
      } else if (searchVal < currVal) {
        generatedSteps.push({
          type: 'COMPARE',
          currNodeVal: currVal,
          targetVal: searchVal,
          visitedPath: [...path],
          action: 'search',
          explanation: `Evaluating ${searchVal} < ${currVal}: Target is SMALLER ➔ Discard right subtree and branch LEFT ↙`
        });

        if (curr.left) {
          generatedSteps.push({
            type: 'MOVE_LEFT',
            currNodeVal: curr.left.val,
            targetVal: searchVal,
            visitedPath: [...path, curr.left.val],
            activeEdge: { from: currVal, to: curr.left.val },
            action: 'search',
            explanation: `Following left branch (${currVal} ➔ ${curr.left.val}) ↙`
          });
          curr = curr.left;
        } else {
          generatedSteps.push({
            type: 'NOT_FOUND',
            currNodeVal: currVal,
            targetVal: searchVal,
            visitedPath: [...path],
            action: 'search',
            explanation: `❌ Node ${currVal} has NO left child (NULL pointer). Target ${searchVal} does not exist in BST.`
          });
          break;
        }
      } else {
        generatedSteps.push({
          type: 'COMPARE',
          currNodeVal: currVal,
          targetVal: searchVal,
          visitedPath: [...path],
          action: 'search',
          explanation: `Evaluating ${searchVal} > ${currVal}: Target is LARGER ➔ Discard left subtree and branch RIGHT ↘`
        });

        if (curr.right) {
          generatedSteps.push({
            type: 'MOVE_RIGHT',
            currNodeVal: curr.right.val,
            targetVal: searchVal,
            visitedPath: [...path, curr.right.val],
            activeEdge: { from: currVal, to: curr.right.val },
            action: 'search',
            explanation: `Following right branch (${currVal} ➔ ${curr.right.val}) ↘`
          });
          curr = curr.right;
        } else {
          generatedSteps.push({
            type: 'NOT_FOUND',
            currNodeVal: currVal,
            targetVal: searchVal,
            visitedPath: [...path],
            action: 'search',
            explanation: `❌ Node ${currVal} has NO right child (NULL pointer). Target ${searchVal} does not exist in BST.`
          });
          break;
        }
      }
    }

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  // Generate Insertion Steps
  const startInsert = () => {
    setIsPlaying(false);

    if (treeValues.includes(inputVal)) {
      setSteps([
        {
          type: 'DUPLICATE',
          targetVal: inputVal,
          visitedPath: [inputVal],
          currNodeVal: inputVal,
          action: 'insert',
          explanation: `Value ${inputVal} already exists in BST! BST requires unique keys to maintain ordering invariants.`
        }
      ]);
      setCurrentStepIndex(0);
      return;
    }

    if (treeValues.length === 0) {
      const nextTree = [inputVal];
      setSteps([
        {
          type: 'INSERT_SUCCESS',
          targetVal: inputVal,
          currNodeVal: inputVal,
          visitedPath: [inputVal],
          newTreeValues: nextTree,
          action: 'insert',
          explanation: `Tree was empty. Inserted ${inputVal} directly as the root node!`
        }
      ]);
      setTreeValues(nextTree);
      setCurrentStepIndex(0);
      return;
    }

    // Check tree depth limitation for clean diagram rendering
    const tempRoot = buildBST([...treeValues, inputVal]);
    if (getTreeDepth(tempRoot) > MAX_TREE_DEPTH) {
      setSteps([
        {
          type: 'DUPLICATE',
          targetVal: inputVal,
          visitedPath: [],
          action: 'insert',
          explanation: `Insertion of ${inputVal} would exceed max visual display depth (${MAX_TREE_DEPTH} levels). Tree height is currently limited to ${MAX_TREE_DEPTH} levels.`
        }
      ]);
      setCurrentStepIndex(0);
      return;
    }

    const generatedSteps: TreeStep[] = [];
    const path: number[] = [];
    let curr = bstRoot;

    while (curr) {
      path.push(curr.val);
      const currVal = curr.val;

      if (inputVal < currVal) {
        generatedSteps.push({
          type: 'COMPARE',
          currNodeVal: currVal,
          targetVal: inputVal,
          visitedPath: [...path],
          action: 'insert',
          explanation: `Comparing new value ${inputVal} < ${currVal}: Belongs in LEFT subtree ↙`
        });

        if (curr.left) {
          generatedSteps.push({
            type: 'MOVE_LEFT',
            currNodeVal: curr.left.val,
            targetVal: inputVal,
            visitedPath: [...path, curr.left.val],
            activeEdge: { from: currVal, to: curr.left.val },
            action: 'insert',
            explanation: `Navigating to left child (${currVal} ➔ ${curr.left.val}) ↙`
          });
          curr = curr.left;
        } else {
          // Found insertion location!
          const nextTree = [...treeValues, inputVal];
          generatedSteps.push({
            type: 'INSERT_SUCCESS',
            currNodeVal: inputVal,
            targetVal: inputVal,
            visitedPath: [...path, inputVal],
            activeEdge: { from: currVal, to: inputVal },
            newTreeValues: nextTree,
            action: 'insert',
            explanation: `🎉 Empty slot found! Attached ${inputVal} as LEFT child of ${currVal} in O(log N) comparisons.`
          });
          break;
        }
      } else {
        generatedSteps.push({
          type: 'COMPARE',
          currNodeVal: currVal,
          targetVal: inputVal,
          visitedPath: [...path],
          action: 'insert',
          explanation: `Comparing new value ${inputVal} > ${currVal}: Belongs in RIGHT subtree ↘`
        });

        if (curr.right) {
          generatedSteps.push({
            type: 'MOVE_RIGHT',
            currNodeVal: curr.right.val,
            targetVal: inputVal,
            visitedPath: [...path, curr.right.val],
            activeEdge: { from: currVal, to: curr.right.val },
            action: 'insert',
            explanation: `Navigating to right child (${currVal} ➔ ${curr.right.val}) ↘`
          });
          curr = curr.right;
        } else {
          // Found insertion location!
          const nextTree = [...treeValues, inputVal];
          generatedSteps.push({
            type: 'INSERT_SUCCESS',
            currNodeVal: inputVal,
            targetVal: inputVal,
            visitedPath: [...path, inputVal],
            activeEdge: { from: currVal, to: inputVal },
            newTreeValues: nextTree,
            action: 'insert',
            explanation: `🎉 Empty slot found! Attached ${inputVal} as RIGHT child of ${currVal} in O(log N) comparisons.`
          });
          break;
        }
      }
    }

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTreeValues(DEFAULT_TREE);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card - Simplified & Clear Visual Definition */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">ট্রি ও বাইনারি সার্চ ট্রি (Tree & BST)</h2>
            <span className="text-xs font-mono text-emerald-400 font-medium">হায়ারার্কিকাল ডেটা স্ট্রাকচার • Left &lt; Root &lt; Right • O(log N) দ্রুত গতি</span>
          </div>
        </div>

        {/* 3 Quick Visual Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ১. ট্রি স্ট্রাকচার (Tree)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              কোনো সরল রৈখিক তালিকা নয়, বরং <b>রুট (Root)</b> থেকে শাখা ও পাতার মতো নোডগুলো পরস্পরের সাথে যুক্ত থাকে।
            </p>
          </div>

          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-lime-400 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-lime-400"></span>
              ২. BST-এর মূল নিয়ম (Ordering Rule)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              যেকোনো নোডের <b>বাম শাখা (Left &lt; Node)</b> সবসময় ছোট, এবং <b>ডান শাখা (Right &gt; Node)</b> সবসময় বড় হবে।
            </p>
          </div>

          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              ৩. কেন O(log N) দ্রুত?
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              প্রতিটি তুলনার পর ট্রি-এর পুরো অর্ধেক শাখা বাদ হয়ে যায়, তাই লক্ষ লক্ষ ডেটাতেও মাত্র কয়েক ধাপে সঠিক নোড মিলে যায়।
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
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
                className="w-16 bg-[#141624] text-emerald-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={startInsert}
                disabled={isPlaying}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Insert
              </button>
            </div>

            {/* Search Control */}
            <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-300 font-medium">Search:</span>
              <input
                type="number"
                value={searchVal}
                onChange={(e) => setSearchVal(Number(e.target.value))}
                className="w-16 bg-[#141624] text-lime-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-lime-500"
              />
              <button
                onClick={startSearch}
                disabled={isPlaying}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-lime-500 hover:bg-lime-400 disabled:opacity-40 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>

          {/* Reset & Presets */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] cursor-pointer font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Reset Tree
            </button>
          </div>
        </div>

        {/* Dynamic Tree SVG Canvas with Integrated Top-Left Controls */}
        <div className="min-h-[380px] bg-[#07080e] rounded-xl border border-[#1a1d2e] p-4 flex flex-col items-center justify-center relative overflow-x-auto">
          {/* Integrated Playback Controls (Top-Left Corner) */}
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
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-xs font-mono text-slate-950 font-bold shadow transition-all cursor-pointer"
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
                  if (steps[nextIdx]?.newTreeValues) {
                    setTreeValues(steps[nextIdx].newTreeValues!);
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
                  Step <span className="text-emerald-400 font-bold">{currentStepIndex + 1}</span>/{steps.length}
                </>
              ) : (
                <span className="text-zinc-500 text-[11px]">Ready</span>
              )}
            </div>
          </div>
          {flatNodes.length === 0 ? (
            <div className="text-xs font-mono text-zinc-500 italic">Tree is empty. Insert a value to start.</div>
          ) : (
            <svg
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
              className="w-full select-none"
              style={{ minWidth: `${Math.min(canvasWidth, 960)}px`, height: `${canvasHeight}px` }}
            >
              {/* Definitions for arrow markers / filters */}
              <defs>
                <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Tree Edges */}
              {flatEdges.map((e, idx) => {
                const isActiveEdge =
                  currentStep?.activeEdge?.from === e.fromVal &&
                  currentStep?.activeEdge?.to === e.toVal;

                const isTraversed =
                  currentStep?.visitedPath.includes(e.fromVal) &&
                  currentStep?.visitedPath.includes(e.toVal);

                const midX = (e.fromX + e.toX) / 2;
                const midY = (e.fromY + e.toY) / 2;

                return (
                  <g key={`edge-${idx}`}>
                    <line
                      x1={e.fromX}
                      y1={e.fromY}
                      x2={e.toX}
                      y2={e.toY}
                      stroke={
                        isActiveEdge
                          ? '#f59e0b'
                          : isTraversed
                          ? '#10b981'
                          : '#1e2438'
                      }
                      strokeWidth={isActiveEdge ? 3.5 : isTraversed ? 2.5 : 2}
                      strokeDasharray={isActiveEdge ? '6,3' : 'none'}
                      className={isActiveEdge ? 'animate-pulse' : ''}
                    />
                    {/* Directional Inequality Pill (e.g., < or >) */}
                    <rect
                      x={midX - 9}
                      y={midY - 8}
                      width={18}
                      height={16}
                      rx={4}
                      fill="#0d101a"
                      stroke={isActiveEdge ? '#f59e0b' : '#232940'}
                      strokeWidth={1}
                    />
                    <text
                      x={midX}
                      y={midY + 3.5}
                      textAnchor="middle"
                      fill={isActiveEdge ? '#fbbf24' : isTraversed ? '#34d399' : '#64748b'}
                      fontSize={10}
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {e.dir === 'left' ? '<' : '>'}
                    </text>
                  </g>
                );
              })}

              {/* Tree Nodes */}
              {flatNodes.map((n) => {
                const isCurrent = currentStep?.currNodeVal === n.val;
                const isVisited = currentStep?.visitedPath.includes(n.val);
                const isFound = currentStep?.type === 'FOUND' && currentStep?.currNodeVal === n.val;
                const isNewlyInserted =
                  currentStep?.type === 'INSERT_SUCCESS' && currentStep?.currNodeVal === n.val;

                // Step index of visit
                const visitIndex = currentStep?.visitedPath.indexOf(n.val);

                return (
                  <g key={`node-${n.val}`} className="transition-all duration-300">
                    {/* Outer Glow Ring for Current / Found */}
                    {(isCurrent || isFound || isNewlyInserted) && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={nodeRadius + 6}
                        fill="none"
                        stroke={
                          isFound || isNewlyInserted
                            ? '#10b981'
                            : '#f59e0b'
                        }
                        strokeWidth={2}
                        strokeDasharray="4,2"
                        className="animate-spin"
                        style={{ animationDuration: '6s', transformOrigin: `${n.x}px ${n.y}px` }}
                      />
                    )}

                    {/* Node Body Circle */}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={nodeRadius}
                      fill={
                        isFound || isNewlyInserted
                          ? '#064e3b'
                          : isCurrent
                          ? '#451a03'
                          : isVisited
                          ? '#0b261a'
                          : '#0f1322'
                      }
                      stroke={
                        isFound || isNewlyInserted
                          ? '#34d399'
                          : isCurrent
                          ? '#f59e0b'
                          : isVisited
                          ? '#10b981'
                          : '#28304a'
                      }
                      strokeWidth={isCurrent || isFound || isNewlyInserted ? 2.5 : 1.5}
                      filter={
                        isFound || isNewlyInserted
                          ? 'url(#glow-emerald)'
                          : isCurrent
                          ? 'url(#glow-amber)'
                          : undefined
                      }
                    />

                    {/* Node Value Label */}
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      fill={
                        isFound || isNewlyInserted
                          ? '#f0fdf4'
                          : isCurrent
                          ? '#fef08a'
                          : isVisited
                          ? '#a7f3d0'
                          : '#cbd5e1'
                      }
                      fontSize={11}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {n.val}
                    </text>

                    {/* Step Sequence Badge (1, 2, 3...) */}
                    {isVisited && visitIndex !== undefined && visitIndex >= 0 && (
                      <g>
                        <circle
                          cx={n.x + 14}
                          cy={n.y - 14}
                          r={7.5}
                          fill="#10b981"
                        />
                        <text
                          x={n.x + 14}
                          y={n.y - 11.5}
                          textAnchor="middle"
                          fill="#022c22"
                          fontSize={8.5}
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {visitIndex + 1}
                        </text>
                      </g>
                    )}

                    {/* Status Pill on top of current active node */}
                    {isCurrent && (
                      <g>
                        <rect
                          x={n.x - 30}
                          y={n.y - 32}
                          width={60}
                          height={14}
                          rx={4}
                          fill="#451a03"
                          stroke="#f59e0b"
                          strokeWidth={1}
                        />
                        <text
                          x={n.x}
                          y={n.y - 22}
                          textAnchor="middle"
                          fill="#fbbf24"
                          fontSize={8.5}
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {currentStep.action === 'insert' ? 'COMPARE' : 'EVALUATING'}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {/* Subtree Pruning Guide Legend */}
          <div className="absolute top-3 right-3 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] px-3.5 py-2 rounded-lg flex items-center gap-3.5 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> Active Comparing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Visited Path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e2438]"></span> Pruned / Unvisited
            </span>
          </div>
        </div>

        {/* Live Step Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] text-sm font-mono flex items-start gap-3.5">
          <div className="mt-0.5">
            {currentStep?.type === 'FOUND' || currentStep?.type === 'INSERT_SUCCESS' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : currentStep?.type === 'NOT_FOUND' || currentStep?.type === 'DUPLICATE' ? (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-100 font-bold uppercase tracking-wider text-xs md:text-sm">
                {currentStep?.type || 'READY'}
              </span>
              {currentStep && (
                <span className="text-xs text-zinc-400 font-mono">
                  {currentStep.action === 'insert' ? 'BST Insertion' : 'BST Search'} •{' '}
                  {currentStep.visitedPath.length} comparison(s)
                </span>
              )}
            </div>
            <p className="text-zinc-200 text-sm leading-relaxed font-sans">
              {currentStep?.explanation ||
                'একটি সংখ্যা লিখে Insert চাপুন ধাপে ধাপে যোগ করতে, অথবা Search দিয়ে O(log N) ডিরেকশনাল অনুসন্ধান পর্যবেক্ষণ করুন।'}
            </p>
          </div>
        </div>
      </div>

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="ট্রি ও বাইনারি সার্চ ট্রি (Tree & BST)"
        scenarios={[
          {
            title: "১. ২০ প্রশ্নের সংখ্যা অনুমান খেলা (Guessing Game: Higher or Lower)",
            subtitle: "প্রতিটি হ্যাঁ/না উত্তরে অর্ধেক সম্ভাবনা উড়িয়ে দেওয়া",
            badge: "Binary Partition",
            visualTag: "Halving Decisions",
            accentColor: "emerald",
            analogy:
              "১ থেকে ১০০ এর মধ্যে বন্ধু একটি সংখ্যা ভাবল। আপনি জিজ্ঞেস করলেন: 'সংখ্যাটি কি ৫০-এর চেয়ে বড়?' বন্ধু বলল: 'হ্যাঁ'। সাথে সাথে ১ থেকে ৫০ পর্যন্ত অর্ধেক সংখ্যা বাতিল! এরপর জিজ্ঞেস করলেন: 'সংখ্যাটি কি ৭৫-এর চেয়ে বড়?' এইভাবে সর্বোচ্চ ৭টি প্রশ্নে ১০০টি সংখ্যার মধ্য থেকে সঠিক সংখ্যাটি বের করা যায় ($O(\\log_2 N$)!",
            whyItFits:
              "বাইনারি সার্চ ট্রিতে (BST) রুট থেকে প্রতিবার বাঁয়ে (ছোট) বা ডানে (বড়) সিদ্ধান্ত নিলে অর্ধেক সার্চ স্পেস তাৎক্ষণিক বাদ হয়ে যায়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">রুট (৫০)</span>
                <span>➔ বড়? ➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">ডান শাখা (৭৫)</span>
                <span>➔ ছোট? ➔</span>
                <span className="px-2 py-0.5 rounded bg-lime-400 text-slate-950 font-bold">বাঁ শাখা (৬৫)</span>
              </div>
            ),
          },
          {
            title: "২. পারিবারিক বংশলতিকা বা কোম্পানি হায়ারার্কি (Family Tree / Org Chart)",
            subtitle: "শেকড় থেকে শাখা-প্রশাখা বেয়ে ছড়িয়ে পড়া কাঠামো",
            badge: "Hierarchy",
            visualTag: "Parent-Child Links",
            accentColor: "lime",
            analogy:
              "একটি পরিবারের বংশলতিকায় দাদা হলেন মূল রুট (Root Node)। তাঁর থেকে বাবা ও চাচা হলেন চাইল্ড নোড। আবার বাবার থেকে আপনি ও আপনার ভাই হলেন পরবর্তী লিফ নোড। পুরো পরিবার একটি সুন্দর গাছ বা ট্রি স্ট্রাকচারে বিন্যস্ত।",
            whyItFits:
              "ট্রি ডেটা স্ট্রাকচার সম্পর্কের স্তরবিন্যাস বা হায়ারার্কি (যেমন ফোল্ডার ও সাব-ফোল্ডার, বা কোম্পানির সিইও থেকে জুনিয়র ইঞ্জিনিয়ার) নিখুঁতভাবে ধারণ করে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-slate-950 font-bold">সিইও (Root)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-[#1c2236] text-emerald-300">ম্যানেজার</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-[#141624] text-zinc-400">ইঞ্জিনিয়ার (Leaf)</span>
              </div>
            ),
          },
        ]}
      />

      {/* 3. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-zinc-100">1. Database B-Trees (SQL Indexes)</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Postgres and MySQL index tables using self-balancing B-Trees. Querying 10,000,000 rows takes just ~3-4 disk block hops ($O(\log N)$).
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <FileCode2 className="w-5 h-5 text-lime-400" />
          <h4 className="text-sm font-bold text-zinc-100">2. Abstract Syntax Trees (AST)</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Compilers (Babel, TypeScript) and LLM code parsers convert code strings into hierarchical syntax trees before evaluating or compiling.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Cpu className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-zinc-100">3. HTML DOM (Document Object Model)</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Every webpage is a tree: <code>&lt;html&gt;</code> is root, branching into <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code> down to individual elements.
          </p>
        </div>
      </div>
    </div>
  );
}
