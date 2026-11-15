import React from 'react';
import { FocusedNodes } from '../types';

interface HeapArrayViewProps {
  heap: number[];
  maxHeapSize: number;
  focusedNodes: FocusedNodes;
  isAnimating: boolean;
}

export default function HeapArrayView({
  heap,
  maxHeapSize,
  focusedNodes,
  isAnimating,
}: HeapArrayViewProps) {
  return (
    <div className="bg-[#10121d] p-3.5 rounded-xl border border-[#1c1f30] flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
          Underlying 1D Array Storage ({maxHeapSize}টি স্লট)
        </span>
        <span className="text-[10px] font-mono text-amber-400">
          Left = 2i + 1 | Right = 2i + 2 | Parent = ⌊(i - 1) / 2⌋
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="grid grid-cols-15 min-w-[700px] gap-1 bg-[#090a12] p-2 rounded-lg border border-[#1b1e2f]">
          {Array.from({ length: maxHeapSize }).map((_, idx) => {
            const hasVal = idx < heap.length;
            const val = hasVal ? heap[idx] : null;
            const isFocused =
              focusedNodes.child === idx ||
              focusedNodes.parent === idx ||
              focusedNodes.extract === idx;
            const isRoot = idx === 0;

            let arrBox = 'bg-[#131522] border-[#22263b] text-zinc-600';
            if (hasVal) {
              if (isFocused && isAnimating) {
                arrBox = 'bg-amber-500/30 border-amber-400 text-amber-300 ring-2 ring-amber-400/50 scale-105';
              } else if (isRoot) {
                arrBox = 'bg-amber-950/40 border-amber-500/60 text-amber-300 font-bold';
              } else {
                arrBox = 'bg-[#181a28] border-[#2d324d] text-zinc-200';
              }
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[8px] font-mono text-zinc-500">[{idx}]</span>
                <div
                  className={`w-full h-9 rounded-lg border flex items-center justify-center text-[11px] font-mono font-bold transition-all ${arrBox}`}
                >
                  {hasVal ? val : '—'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
