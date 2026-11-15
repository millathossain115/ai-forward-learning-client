import React from 'react';
import { Compass, Footprints, Flag } from 'lucide-react';
import { BacktrackStep, MAZE_GRID } from '../types';

interface BacktrackingVisualizerProps {
  currentBacktrackStep: BacktrackStep;
}

export default function BacktrackingVisualizer({
  currentBacktrackStep
}: BacktrackingVisualizerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#181d2f] pb-3">
        <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-rose-400" />
          <span>ব্যাকট্র্যাকিং গোলকধাঁধা (৪×৪ গ্রিড মেজ সিমুলেটর)</span>
        </span>
        <span
          className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
            currentBacktrackStep.action === 'dead_end'
              ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
              : currentBacktrackStep.action === 'backtrack'
              ? 'bg-amber-950 border-amber-500 text-amber-200'
              : currentBacktrackStep.action === 'goal'
              ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow'
              : 'bg-sky-950 border-sky-400 text-sky-200'
          }`}
        >
          {currentBacktrackStep.actionTag}
        </span>
      </div>

      {/* 4x4 Grid Visualization */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-[#060810] border border-[#1b2238] shadow-inner max-w-sm w-full">
          {MAZE_GRID.map((row, r) =>
            row.map((cellVal, c) => {
              const isCurrent =
                currentBacktrackStep.currentPos.r === r &&
                currentBacktrackStep.currentPos.c === c;
              const isInPath = currentBacktrackStep.visitedPath.some(
                p => p.r === r && p.c === c
              );
              const isDeadEnd = currentBacktrackStep.deadEnds.some(
                p => p.r === r && p.c === c
              );
              const isWall = cellVal === 1;
              const isGoal = cellVal === 2;

              return (
                <div
                  key={`${r}-${c}`}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative font-mono text-xs transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400 shadow-lg scale-105 z-10'
                      : isDeadEnd
                      ? 'bg-rose-950/60 border-rose-700 text-rose-400 opacity-60'
                      : isInPath
                      ? 'bg-sky-950/70 border-sky-400 text-sky-300'
                      : isWall
                      ? 'bg-[#181d2e] border-[#29324d] text-zinc-600 pattern-diagonal-lines'
                      : 'bg-[#0d101d] border-[#1e253d] text-zinc-500'
                  }`}
                >
                  {isWall ? (
                    <span className="text-zinc-600 text-lg select-none">🧱</span>
                  ) : isGoal ? (
                    <span className="text-emerald-400 text-base select-none">🏁</span>
                  ) : isCurrent ? (
                    <Footprints className="w-5 h-5 text-amber-300 animate-bounce" />
                  ) : isInPath ? (
                    <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                  ) : isDeadEnd ? (
                    <span className="text-rose-400 font-bold text-xs select-none">✕</span>
                  ) : (
                    <span className="text-[10px] text-zinc-600">
                      {r},{c}
                    </span>
                  )}

                  {r === 0 && c === 0 && !isCurrent && (
                    <span className="absolute bottom-1 text-[8px] text-sky-400/80">Start</span>
                  )}
                  {isGoal && !isCurrent && (
                    <span className="absolute bottom-1 text-[8px] text-emerald-400/80">Goal</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-400">
        <span className="flex items-center gap-1 text-sky-400">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> সক্রিয় পথ (Visited)
        </span>
        <span className="flex items-center gap-1 text-amber-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> বর্তমান অবস্থান 🐾
        </span>
        <span className="flex items-center gap-1 text-rose-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" /> ডেড-এন্ড (ভুল পথ)
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> গন্তব্য 🚩
        </span>
      </div>
    </div>
  );
}
