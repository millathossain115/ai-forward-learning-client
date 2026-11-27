import React from 'react';
import { Trash2 } from 'lucide-react';
import { LLNode } from '../types';

interface CircularLinkedListCanvasProps {
  nodes: LLNode[];
  activeIdx: number | null;
  isAnimating: boolean;
  onDeleteAt: (idx: number) => void;
}

export default function CircularLinkedListCanvas({
  nodes,
  activeIdx,
  isAnimating,
  onDeleteAt,
}: CircularLinkedListCanvasProps) {
  return (
    <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center bg-[#090a10] rounded-xl border border-[#1e2235] overflow-hidden p-4 select-none">
      {/* Center Hub Indicator */}
      <div className="absolute w-28 h-28 rounded-full border border-dashed border-amber-500/30 flex flex-col items-center justify-center bg-amber-500/5 text-center p-2 z-0 pointer-events-none">
        <span className="text-[11px] font-mono font-bold text-amber-400">Circular Ring</span>
        <span className="text-[9px] text-zinc-500">Zero Null Pointer</span>
        <span className="text-[8px] text-amber-300/80 mt-1">⟲ Endless Loop</span>
      </div>

      {/* Circular Orbit Path SVG Background */}
      <svg className="absolute w-full h-full pointer-events-none z-0">
        <circle
          cx="50%"
          cy="50%"
          r="130"
          fill="none"
          stroke="rgba(245, 158, 11, 0.15)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Nodes Positioned along Circle Perimeter using Trigonometry */}
      {nodes.map((node, idx) => {
        const total = nodes.length;
        const angle = ((2 * Math.PI) / total) * idx - Math.PI / 2;
        const radius = 130;
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);

        const isFirst = idx === 0;
        const isLast = idx === total - 1;
        const nextAddr = isLast ? nodes[0].addr : nodes[idx + 1].addr;
        const isActive = activeIdx === idx;

        let cardBorder = 'border-[#25293d] bg-[#131624]';
        let badgeText = '';

        if (node.state === 'allocating') {
          cardBorder = 'border-amber-400 bg-amber-950/40 animate-pulse scale-110';
          badgeText = 'মেমরি বরাদ্দ';
        } else if (node.state === 'linking') {
          cardBorder = 'border-sky-400 bg-sky-950/40 ring-4 ring-sky-500/30 scale-110';
          badgeText = 'পয়েন্টার জোড়া';
        } else if (node.state === 'connected') {
          cardBorder = 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-500/20 scale-110';
          badgeText = 'সংযুক্ত';
        } else if (node.state === 'lift-delete') {
          cardBorder = 'border-rose-500 bg-rose-950/70 scale-90 opacity-80';
          badgeText = 'আলাদা';
        } else if (node.state === 'bypassing') {
          cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 scale-110';
          badgeText = 'বাইপাস আউট';
        } else if (node.state === 'bypassed-target') {
          cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 scale-110';
          badgeText = 'বাইপাস ইন';
        } else if (isActive) {
          cardBorder = 'border-amber-400 bg-amber-950/80 ring-4 ring-amber-400/40 scale-115 shadow-xl shadow-amber-500/30';
        }

        return (
          <div
            key={node.id}
            className="absolute transition-all duration-700 z-10 flex flex-col items-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {/* Floating HEAD Tag */}
            {isFirst && (
              <span className="absolute -top-5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-extrabold shadow">
                HEAD ➔
              </span>
            )}

            {/* Node Card */}
            <div className={`flex flex-col rounded-xl border p-2 transition-all shadow-md ${cardBorder} w-28`}>
              <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 mb-0.5 border-b border-[#202438] pb-0.5">
                <span className="text-amber-300 font-semibold">{node.addr}</span>
                {badgeText && (
                  <span className="text-[7.5px] font-sans px-1 rounded bg-[#090a12] text-amber-300">
                    {badgeText}
                  </span>
                )}
                <button
                  onClick={() => onDeleteAt(idx)}
                  disabled={isAnimating}
                  className="text-rose-400 hover:text-rose-300 p-0.5 disabled:opacity-30"
                  title="Delete Node"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>

              <div className="flex items-stretch gap-1">
                <div className="flex-1 h-9 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex flex-col items-center justify-center">
                  <span className="text-[7.5px] text-zinc-400 font-mono">val</span>
                  <span className="text-xs font-bold font-mono text-emerald-300">{node.value}</span>
                </div>
                <div className="flex-1 h-9 rounded-md bg-amber-500/15 border border-amber-500/30 flex flex-col items-center justify-center px-0.5">
                  <span className="text-[7.5px] text-zinc-400 font-mono">next</span>
                  <span className="text-[8.5px] font-bold font-mono text-amber-300 truncate w-full text-center">
                    {nextAddr}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
