'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles, RefreshCw } from 'lucide-react';
import { TreeStep, AVLNode } from './types';
import {
  buildAVL,
  buildRBTree,
  layoutAVLNode,
  layoutRBNode,
  flattenTree
} from './utils/treeAlgorithms';
import BalancedTreeCanvas from './components/BalancedTreeCanvas';
import BalancedTreeHeader from './components/BalancedTreeHeader';
import BalancedTreeModelCard from './components/BalancedTreeModelCard';
import BalancedTreeControls from './components/BalancedTreeControls';

const RotationGuide = dynamic(() => import('./components/RotationGuide'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading rotation playbook...
    </div>
  )
});
const BalancedTreeRealWorld = dynamic(() => import('./components/BalancedTreeRealWorld'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading scenarios...
    </div>
  )
});

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
      initialVals = [30, 20, 10];
      finalVals = [20, 10, 30];
      explanation =
        'Left-Left (LL) পরিস্থিতি: বামে হেভি হয়ে পড়ায় নোড ৩০-এর ওপর Right Rotation প্রয়োগ করে ২০-কে নতুন প্যারেন্ট করা হলো।';
    } else if (type === 'RR') {
      initialVals = [10, 20, 30];
      finalVals = [20, 10, 30];
      explanation =
        'Right-Right (RR) পরিস্থিতি: ডানে হেভি হয়ে পড়ায় নোড ১০-এর ওপর Left Rotation প্রয়োগ করে ২০-কে নতুন প্যারেন্ট করা হলো।';
    } else if (type === 'LR') {
      initialVals = [30, 10, 20];
      finalVals = [20, 10, 30];
      explanation =
        'Left-Right (LR) জিগজ্যাগ: প্রথমে বামের নোডে Left Rotation, এরপর মূল রুটে Right Rotation (Double Rotation)।';
    } else if (type === 'RL') {
      initialVals = [10, 30, 20];
      finalVals = [20, 10, 30];
      explanation =
        'Right-Left (RL) জিগজ্যাগ: প্রথমে ডানের নোডে Right Rotation, এরপর মূল রুটে Left Rotation (Double Rotation)।';
    }

    const genSteps: TreeStep[] = [
      {
        title: `Unbalanced State (${type})`,
        explanation:
          'অন-ব্যালেন্সড অবস্থা: উচ্চতার পার্থক্য ১-এর বেশি হয়ে গেছে (Balance Factor |BF| > 1)। ট্রিটি তির্যক হয়ে লিনিয়ার চেইনের মতো হয়ে যাচ্ছিল।',
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
      <BalancedTreeHeader />

      {/* 2. Interactive Simulator with Mode Filter on Top */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        {/* Controls & Filter Bar */}
        <BalancedTreeControls
          activeModel={activeModel}
          onSelectModel={setActiveModel}
          inputVal={inputVal}
          setInputVal={setInputVal}
          onInsert={() => handleInsert()}
          onTriggerPreset={triggerPreset}
          onReset={handleReset}
          isPlaying={isPlaying}
        />

        {/* Dynamic Mini-Definition Card for the Selected Filter */}
        <BalancedTreeModelCard activeModel={activeModel} />

        {/* Tree Canvas */}
        <BalancedTreeCanvas
          activeModel={activeModel}
          flatNodes={flatNodes}
          flatEdges={flatEdges}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          steps={steps}
          currentStepIndex={currentStepIndex}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onStepBack={() => {
            setIsPlaying(false);
            setCurrentStepIndex((prev) => Math.max(0, prev - 1));
          }}
          onStepForward={() => {
            setIsPlaying(false);
            if (currentStepIndex < steps.length - 1) {
              const nextIdx = currentStepIndex + 1;
              if (steps[nextIdx]?.treeValues) {
                setTreeValues(steps[nextIdx].treeValues);
              }
              setCurrentStepIndex(nextIdx);
            }
          }}
        />

        {/* Live Step Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] text-sm font-mono flex items-start gap-3.5">
          <div className="mt-0.5">
            {currentStep?.rotationType && currentStep.rotationType !== 'NONE' ? (
              <RefreshCw
                className="w-5 h-5 text-sky-400 shrink-0 animate-spin"
                style={{ animationDuration: '4s' }}
              />
            ) : (
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-100 font-bold text-xs md:text-sm">
                {currentStep?.title || `${activeModel.toUpperCase()} SIMULATOR`}
              </span>
              {currentStep && (
                <span className="text-xs text-sky-400 font-mono">
                  {currentStep.rotationType !== 'NONE'
                    ? `Rotation: ${currentStep.rotationType}`
                    : 'BST Invariant'}
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
      <RotationGuide />

      {/* 4. Real Life Analogies & Usages */}
      <BalancedTreeRealWorld />
    </div>
  );
}
