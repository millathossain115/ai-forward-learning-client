import React from 'react';
import { Repeat, Layers, Zap } from 'lucide-react';
import { CircularSlot } from '../types';

interface CircularQueueVisualizerProps {
  circularSlots: CircularSlot[];
  cqFront: number;
  cqRear: number;
  cqCount: number;
  maxCapacity: number;
}

export default function CircularQueueVisualizer({
  circularSlots,
  cqFront,
  cqRear,
  cqCount,
  maxCapacity,
}: CircularQueueVisualizerProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Pointer Status Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-[#111322] border border-emerald-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">FRONT (বের হওয়ার মুখ):</span>
          <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            ইনডেক্স [{cqFront}]
          </span>
        </div>
        <div className="bg-[#111322] border border-amber-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">REAR (ঢোকার মুখ):</span>
          <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            ইনডেক্স [{cqRear}]
          </span>
        </div>
        <div className="bg-[#111322] border border-cyan-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">ব্যবহৃত স্লট:</span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {cqCount} / {maxCapacity}
          </span>
        </div>
        <div className="bg-[#111322] border border-purple-500/30 px-3 py-2 rounded-xl flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">পরবর্তী Enqueue:</span>
          <span className="text-xs font-mono font-bold text-purple-400">
            ({cqRear} + 1) % {maxCapacity} = {(cqRear + 1) % maxCapacity}
          </span>
        </div>
      </div>

      {/* Circular Orbit & Linear Ring Buffer Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left/Center: 360-Degree Circular Visual Ring */}
        <div className="lg:col-span-6 relative w-full h-[340px] flex items-center justify-center bg-[#090a10] rounded-2xl border border-[#1e2235] p-4 overflow-hidden select-none">
          {/* Background Rotating Guide Circle */}
          <div className="absolute w-[220px] h-[220px] rounded-full border-2 border-dashed border-amber-500/20 flex items-center justify-center pointer-events-none animate-spin-slow">
            <div className="w-3 h-3 rounded-full bg-amber-500/40 absolute -top-1.5" />
          </div>

          {/* Center Hub */}
          <div className="w-28 h-28 rounded-full bg-[#15171e] border border-[#2b304c] flex flex-col items-center justify-center text-center p-2 z-10 shadow-black/60">
            <Repeat className="w-5 h-5 text-amber-400 mb-0.5" />
            <span className="text-[10px] font-mono font-bold text-amber-300">Modulo % {maxCapacity}</span>
            <span className="text-[9px] font-mono text-zinc-400">Ring Buffer</span>
          </div>

          {/* 6 Circularly Distributed Slots */}
          {circularSlots.map((slot, idx) => {
            const angleDeg = idx * 60 - 90; // 0 deg is at top
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 108; // px
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);

            const isFront = cqCount > 0 && idx === cqFront;
            const isRear = cqCount > 0 && idx === cqRear;
            const isOccupied = slot.value !== null;

            let borderCls = 'border-[#262a40] bg-[#10121d]';
            if (slot.state === 'entering') {
              borderCls = 'border-amber-400 bg-amber-500/20 scale-110  ';
            } else if (slot.state === 'exiting') {
              borderCls = 'border-red-400 bg-red-500/20 scale-90 opacity-40';
            } else if (isOccupied) {
              borderCls = 'border-cyan-500/50 bg-[#12182b]';
            }

            return (
              <div
                key={slot.id}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute w-24 h-14 rounded-xl border flex flex-col items-center justify-center transition-colors duration-500 z-20  p-1 ${borderCls}`}
              >
                <div className="flex items-center justify-between w-full px-1 text-[9px] font-mono">
                  <span className="text-zinc-500 font-bold">[{idx}]</span>
                  <div className="flex items-center gap-0.5">
                    {isFront && (
                      <span className="px-1 py-0.2 rounded bg-emerald-500 text-slate-950 font-bold text-[8px] leading-tight">
                        F
                      </span>
                    )}
                    {isRear && (
                      <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[8px] leading-tight">
                        R
                      </span>
                    )}
                  </div>
                </div>

                <div className="truncate w-full text-center text-[10px] font-mono font-bold mt-0.5">
                  {isOccupied ? (
                    <span className="text-cyan-300">{slot.value}</span>
                  ) : (
                    <span className="text-zinc-600 font-normal italic">খালি (FREE)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Underlying Array View & Modulo Explanation */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="bg-[#090a10] border border-[#1a1d2e] p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                মেমরিতে 1D Contiguous Array চিত্র:
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Array[{maxCapacity}]</span>
            </div>

            {/* 1D Array Slots */}
            <div className="grid grid-cols-6 gap-1.5 bg-[#111320] p-2.5 rounded-lg border border-[#1f2336]">
              {circularSlots.map((slot, idx) => {
                const isFront = cqCount > 0 && idx === cqFront;
                const isRear = cqCount > 0 && idx === cqRear;
                const isOccupied = slot.value !== null;

                return (
                  <div key={'arr_' + idx} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-mono text-zinc-400">[{idx}]</span>
                    <div
                      className={`w-full h-12 rounded-lg border flex flex-col items-center justify-center p-1 text-center transition-colors ${
                        isOccupied
                          ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-bold'
                          : 'bg-black/40 border-zinc-800 text-zinc-600'
                      } ${isFront ? 'ring-2 ring-emerald-400' : ''} ${isRear ? 'ring-2 ring-amber-400' : ''}`}
                    >
                      <span className="text-[9px] font-mono truncate w-full">
                        {isOccupied ? slot.value : '—'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 items-center min-h-[28px]">
                      {isFront && (
                        <span className="text-[8px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1 rounded">
                          Front
                        </span>
                      )}
                      {isRear && (
                        <span className="text-[8px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 rounded">
                          Rear
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation card of recycling */}
            <div className="text-[11px] text-zinc-300 bg-[#121524] p-3 rounded-lg border border-[#20253d] flex flex-col gap-1.5 leading-relaxed">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                কীভাবে মেমরি রি-সাইকেল হয়?
              </div>
              <p className="text-zinc-400 text-[11px]">
                লিনিয়ার কিউতে ডিকিউ করার পর মেমরি অপচয় (False Overflow) হতো। সার্কুলার কিউতে{' '}
                <code className="text-cyan-300 font-mono">(Rear + 1) % {maxCapacity}</code> সূত্র দিয়ে টেল {maxCapacity - 1} থেকে ঘুরে শূন্য ইনডেক্সে এসে খালি স্লট পুনরায় ব্যবহার করে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
