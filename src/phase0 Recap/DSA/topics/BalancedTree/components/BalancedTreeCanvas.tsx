import React from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { PositionedNode, TreeStep } from '../types';

interface BalancedTreeCanvasProps {
  activeModel: 'avl' | 'redblack';
  flatNodes: PositionedNode[];
  flatEdges: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    fromVal: number;
    toVal: number;
  }[];
  canvasWidth: number;
  canvasHeight: number;
  steps: TreeStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
}

export default function BalancedTreeCanvas({
  activeModel,
  flatNodes,
  flatEdges,
  canvasWidth,
  canvasHeight,
  steps,
  currentStepIndex,
  isPlaying,
  onTogglePlay,
  onStepBack,
  onStepForward
}: BalancedTreeCanvasProps) {
  return (
    <div className="min-h-[360px] bg-[#07080e] rounded-xl border border-[#1a1d2e] p-4 flex flex-col items-center justify-center relative overflow-x-auto">
      {/* Integrated Playback Controls (Top Left Corner) */}
      <div className="absolute top-3 left-3 z-10 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] p-1.5 rounded-lg flex items-center gap-2 shadow-lg">
        <button
          onClick={onStepBack}
          disabled={steps.length === 0 || currentStepIndex === 0 || isPlaying}
          className="p-1.5 rounded bg-[#141624] hover:bg-[#1d2033] disabled:opacity-30 text-zinc-300 border border-[#20243a] transition-colors cursor-pointer"
          title="Step Back"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onTogglePlay}
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

        <button
          onClick={onStepForward}
          disabled={steps.length === 0 || currentStepIndex >= steps.length - 1 || isPlaying}
          className="p-1.5 rounded bg-[#141624] hover:bg-[#1d2033] disabled:opacity-30 text-zinc-300 border border-[#20243a] transition-colors cursor-pointer"
          title="Step Forward"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

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
  );
}
