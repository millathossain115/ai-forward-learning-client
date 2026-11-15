import React from 'react';
import { FocusedNodes, getNodeCoord } from '../types';

interface HeapTreeCanvasProps {
  heap: number[];
  isMaxHeap: boolean;
  focusedNodes: FocusedNodes;
  isAnimating: boolean;
  maxHeapSize: number;
}

export default function HeapTreeCanvas({
  heap,
  isMaxHeap,
  focusedNodes,
  isAnimating,
  maxHeapSize,
}: HeapTreeCanvasProps) {
  return (
    <div className="relative w-full h-[360px] sm:h-[400px] bg-[#090a10] rounded-xl border border-[#1a1d2e] overflow-hidden select-none p-4 flex flex-col justify-between">
      {/* Header Tag inside Canvas */}
      <div className="flex items-center justify-between text-[11px] font-mono z-10">
        <span className="text-amber-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          {isMaxHeap ? 'MAX-HEAP (রুট = সর্বোচ্চ মান)' : 'MIN-HEAP (রুট = সর্বনিম্ন মান)'}
        </span>
        <span className="text-zinc-500 text-[10px]">
          উচ্চতা: ৪ স্তর • মোট নোড: {heap.length} / {maxHeapSize}
        </span>
      </div>

      {/* SVG Connecting Branches */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {heap.map((_, idx) => {
          if (idx === 0) return null;
          const parentIdx = Math.floor((idx - 1) / 2);
          const fromCoord = getNodeCoord(parentIdx);
          const toCoord = getNodeCoord(idx);

          // Highlight branch if both child and parent are in active comparison
          const isComparingBranch =
            (focusedNodes.child === idx && focusedNodes.parent === parentIdx) ||
            (focusedNodes.child === parentIdx && focusedNodes.parent === idx);

          return (
            <line
              key={'branch_' + idx}
              x1={`${fromCoord.x}%`}
              y1={`${fromCoord.y + 3}%`}
              x2={`${toCoord.x}%`}
              y2={`${toCoord.y - 3}%`}
              stroke={isComparingBranch ? '#f59e0b' : '#282d46'}
              strokeWidth={isComparingBranch ? '3.5' : '2'}
              strokeDasharray={isComparingBranch ? 'none' : '4 3'}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Render Tree Nodes with Selective Focus */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {heap.map((val, idx) => {
          const coord = getNodeCoord(idx);
          const isRoot = idx === 0;

          // Check if this node is involved in current action
          const isFocusedChild = focusedNodes.child === idx;
          const isFocusedParent = focusedNodes.parent === idx;
          const isFocusedExtract = focusedNodes.extract === idx;
          const isFocused = isFocusedChild || isFocusedParent || isFocusedExtract;
          const isAnyFocus =
            isAnimating &&
            (focusedNodes.child !== undefined ||
              focusedNodes.parent !== undefined ||
              focusedNodes.extract !== undefined);

          // Dim nodes NOT currently involved to eliminate visual confusion
          const dimClass =
            isAnyFocus && !isFocused
              ? 'opacity-35 scale-95 transition-all duration-500'
              : 'opacity-100 transition-all duration-500';

          const isDenseLevel = coord.level >= 3;
          const sizeCls = isDenseLevel
            ? 'w-8 h-8 sm:w-9 sm:h-9 text-[10px] sm:text-xs'
            : 'w-10 h-10 sm:w-11 sm:h-11 text-xs sm:text-sm';

          let nodeClass = 'bg-[#141624] border-[#292d47] text-zinc-200';

          if (isFocusedExtract) {
            nodeClass =
              'bg-rose-600 border-rose-300 text-white scale-125 shadow-xl shadow-rose-500/50 ring-4 ring-rose-400/50';
          } else if (isFocused && focusedNodes.type === 'swap') {
            nodeClass =
              'bg-purple-600 border-purple-300 text-white font-extrabold scale-125 shadow-xl shadow-purple-500/50 ring-4 ring-purple-400/50';
          } else if (isFocused && focusedNodes.type === 'compare') {
            if (isFocusedChild) {
              nodeClass =
                'bg-cyan-500 border-cyan-200 text-slate-950 font-extrabold scale-115 shadow-xl shadow-cyan-500/50 ring-4 ring-cyan-400/40 animate-pulse';
            } else {
              nodeClass =
                'bg-amber-500 border-amber-200 text-slate-950 font-extrabold scale-115 shadow-xl shadow-amber-500/50 ring-4 ring-amber-400/40 animate-pulse';
            }
          } else if (isFocused && focusedNodes.type === 'settled') {
            nodeClass =
              'bg-emerald-500 border-emerald-300 text-slate-950 font-extrabold scale-110 shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-400/30';
          } else if (isRoot) {
            nodeClass =
              'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 font-extrabold border-amber-300 ring-2 ring-amber-400/30';
          }

          return (
            <div
              key={idx}
              style={{
                left: `${coord.x}%`,
                top: `${coord.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute rounded-xl border flex flex-col items-center justify-center font-mono shadow-md pointer-events-auto ${sizeCls} ${nodeClass} ${dimClass}`}
            >
              <span className="text-[7px] uppercase tracking-wider opacity-75 font-semibold leading-none">
                {isFocusedChild && isAnimating
                  ? 'CHILD'
                  : isFocusedParent && isAnimating
                  ? 'PARENT'
                  : `[${idx}]`}
              </span>
              <span className="font-bold mt-0.5 leading-none">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {heap.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-xs font-mono text-zinc-600">
          হিপ সম্পূর্ণ খালি। ওপরের Insert বাটন দিয়ে মান যোগ করুন।
        </div>
      )}
    </div>
  );
}
