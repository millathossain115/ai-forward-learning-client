'use client';

import React from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { PositionedNode, TreeStep } from '../types';
import { FlattenedEdge } from '../utils/bstAlgorithms';

interface TreeCanvasProps {
  flatNodes: PositionedNode[];
  flatEdges: FlattenedEdge[];
  canvasWidth: number;
  canvasHeight: number;
  nodeRadius: number;
  steps: TreeStep[];
  currentStepIndex: number;
  currentStep: TreeStep | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
}

export default function TreeCanvas({
  flatNodes,
  flatEdges,
  canvasWidth,
  canvasHeight,
  nodeRadius,
  steps,
  currentStepIndex,
  currentStep,
  isPlaying,
  onPlayPause,
  onStepBack,
  onStepForward,
}: TreeCanvasProps) {
  return (
    <div className="min-h-[380px] bg-[#07080e] rounded-xl border border-[#1a1d2e] p-4 flex flex-col items-center justify-center relative overflow-x-auto">
      {/* Integrated Playback Controls (Top-Left Corner) */}
      <div className="absolute top-3 left-3 z-10 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] p-1.5 rounded-lg flex items-center gap-2 shadow-lg">
        {/* Step Back */}
        <button
          onClick={onStepBack}
          disabled={steps.length === 0 || currentStepIndex === 0 || isPlaying}
          className="p-1.5 rounded bg-[#141624] hover:bg-[#1d2033] disabled:opacity-30 text-zinc-300 border border-[#20243a] transition-colors cursor-pointer"
          title="Step Back"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={onPlayPause}
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
          onClick={onStepForward}
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
                      {currentStep?.action === 'insert' ? 'COMPARE' : 'EVALUATING'}
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
  );
}
