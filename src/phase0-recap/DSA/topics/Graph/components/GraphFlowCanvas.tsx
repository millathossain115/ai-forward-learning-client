import React from 'react';
import { ReactFlow, Controls, Background, Node, Edge } from '@xyflow/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { DFSStep, KahnStep } from '../graphAlgorithms';

interface GraphFlowCanvasProps {
  rfNodes: Node[];
  rfEdges: Edge[];
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  algorithm: 'dfs' | 'kahn';
  currentStep: DFSStep | KahnStep;
}

export default function GraphFlowCanvas({
  rfNodes,
  rfEdges,
  isPlaying,
  setIsPlaying,
  stepIndex,
  setStepIndex,
  totalSteps,
  algorithm,
  currentStep,
}: GraphFlowCanvasProps) {
  return (
    <div className="lg:col-span-2 h-[480px] rounded-2xl border border-[#1e2233] bg-[#080911] overflow-hidden relative shadow-inner">
      {/* Integrated Playback Controls (Floating in Top-Left Corner) */}
      <div className="absolute top-3 left-3 z-10 bg-[#0d101e]/90 backdrop-blur-md border border-[#212742] p-1.5 rounded-xl flex items-center gap-2 shadow-2xl">
        {/* Step Back */}
        <button
          onClick={() => {
            setIsPlaying(false);
            setStepIndex((prev) => Math.max(0, prev - 1));
          }}
          disabled={stepIndex === 0 || isPlaying}
          className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
          title="এক ধাপ পেছনে যান"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={stepIndex >= totalSteps - 1}
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
            setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));
          }}
          disabled={stepIndex >= totalSteps - 1 || isPlaying}
          className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
          title="এক ধাপ সামনে যান"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        {/* Reset */}
        <button
          onClick={() => {
            setIsPlaying(false);
            setStepIndex(0);
          }}
          className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
          title="রিসেট করুন"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Step Counter */}
        <div className="text-[11px] font-mono text-zinc-400 px-1 border-l border-[#212742]">
          ধাপ <span className="text-amber-400 font-bold">{stepIndex + 1}</span> / {totalSteps}
        </div>
      </div>

      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color="#161b2c" gap={20} />
        <Controls className="bg-[#12141f] border-[#1e2233] text-zinc-200" />
      </ReactFlow>

      {/* Current Step Explanation Bottom Bar */}
      <div className="absolute bottom-3 left-3 right-3 bg-[#0d101e]/95 backdrop-blur border border-[#1f2642] p-3 rounded-xl shadow-2xl flex items-start gap-2.5">
        <div className="mt-0.5">
          {algorithm === 'dfs' && (currentStep as DFSStep)?.cyclePath ? (
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
        </div>
        <div className="flex-1 text-xs">
          <span className="font-semibold text-zinc-200 block mb-0.5 font-mono">
            {currentStep?.type || 'STEP'}
          </span>
          <p className="text-zinc-300 leading-relaxed font-sans">{currentStep?.explanation}</p>
        </div>
      </div>
    </div>
  );
}
