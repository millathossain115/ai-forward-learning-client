import React from 'react';
import { ArrowRight, Trash2 } from 'lucide-react';
import { LLNode } from '../types';

interface LinearLinkedListCanvasProps {
  nodes: LLNode[];
  isDoubly: boolean;
  activeIdx: number | null;
  isAnimating: boolean;
  onDeleteAt: (idx: number) => void;
}

export default function LinearLinkedListCanvas({
  nodes,
  isDoubly,
  activeIdx,
  isAnimating,
  onDeleteAt,
}: LinearLinkedListCanvasProps) {
  return (
    <div className="py-6 px-3 flex flex-wrap items-center gap-y-6 gap-x-3 min-h-[160px] bg-[#090a10] rounded-xl border border-[#161826]">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-950/70 text-amber-300 border border-amber-800 font-bold shadow">
          HEAD
        </span>
        <ArrowRight className="w-4 h-4 text-emerald-400" />
      </div>

      {nodes.map((node, idx) => {
        const isLast = idx === nodes.length - 1;
        const nextAddr = !isLast ? nodes[idx + 1].addr : 'NULL';
        const prevAddr = idx > 0 ? nodes[idx - 1].addr : 'NULL';
        const isActive = activeIdx === idx;

        let cardBorder = 'border-[#25293d] bg-[#131624]';
        let badgeText = '';
        let extraTransform = '';

        if (node.state === 'allocating') {
          cardBorder = 'border-amber-400 bg-amber-950/40 animate-pulse scale-105';
          badgeText = 'মেমরি বরাদ্দ';
        } else if (node.state === 'linking') {
          cardBorder = 'border-sky-400 bg-sky-950/40 ring-4 ring-sky-500/20 scale-105';
          badgeText = 'পয়েন্টার জোড়া হচ্ছে';
        } else if (node.state === 'connected') {
          cardBorder = 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-500/20 scale-105';
          badgeText = 'সংযুক্ত';
        } else if (node.state === 'lift-delete') {
          cardBorder = 'border-rose-500 bg-rose-950/70 ring-4 ring-rose-500/30 opacity-90 shadow-xl shadow-rose-500/20';
          extraTransform = '-translate-y-6 scale-95 transition-transform duration-700';
          badgeText = 'আলাদা করা হচ্ছে ⬆';
        } else if (node.state === 'bypassing') {
          cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 shadow-lg shadow-cyan-500/20 scale-105';
          badgeText = 'বাইপাস আউট ➔';
        } else if (node.state === 'bypassed-target') {
          cardBorder = 'border-cyan-400 bg-cyan-950/60 ring-4 ring-cyan-500/30 shadow-lg shadow-cyan-500/20 scale-105';
          badgeText = '➔ বাইপাস ইন';
        } else if (isActive) {
          cardBorder = 'border-emerald-400 bg-emerald-950/70 ring-4 ring-emerald-500/20 scale-105';
        }

        return (
          <div key={node.id} className={`flex items-center gap-2 shrink-0 transition-all duration-700 ${extraTransform}`}>
            {/* Single Node Card */}
            <div className={`flex flex-col rounded-xl border p-2.5 transition-all shadow-lg ${cardBorder}`}>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-1 border-b border-[#202438] pb-1 gap-2">
                <span className="text-emerald-400 font-semibold">{node.addr}</span>
                {badgeText && (
                  <span className="text-[8px] font-sans px-1 rounded bg-[#090a12] text-amber-300 border border-amber-500/30">
                    {badgeText}
                  </span>
                )}
                <button
                  onClick={() => onDeleteAt(idx)}
                  disabled={isAnimating}
                  className="text-rose-400 hover:text-rose-300 p-0.5 disabled:opacity-30 transition-colors"
                  title="Delete Node"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              {/* Node Body: Data + Pointer Box */}
              <div className="flex items-stretch gap-1">
                <div className="w-12 h-11 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex flex-col items-center justify-center">
                  <span className="text-[8px] text-zinc-400 font-mono">data</span>
                  <span className="text-sm font-bold font-mono text-emerald-300">{node.value}</span>
                </div>

                <div className={`w-14 h-11 rounded-lg flex flex-col items-center justify-center px-1 border transition-colors ${
                  node.state === 'linking' ? 'bg-sky-500/30 border-sky-400' : 'bg-teal-500/15 border-teal-500/40'
                }`}>
                  <span className="text-[8px] text-zinc-400 font-mono">next</span>
                  <span className="text-[9px] font-bold font-mono text-teal-300 truncate w-full text-center">
                    {nextAddr}
                  </span>
                </div>

                {isDoubly && (
                  <div className="w-14 h-11 rounded-lg bg-indigo-500/15 border border-indigo-500/40 flex flex-col items-center justify-center px-1">
                    <span className="text-[8px] text-zinc-400 font-mono">prev</span>
                    <span className="text-[9px] font-bold font-mono text-indigo-300 truncate w-full text-center">
                      {prevAddr}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Arrow Pointer to Next Node */}
            {!isLast ? (
              <div className="flex flex-col items-center text-teal-400 px-0.5">
                <span className="text-[9px] font-mono leading-none">{isDoubly ? '⇄' : '➔'}</span>
                <div className={`h-[2px] w-5 transition-all duration-300 ${
                  node.state === 'linking' ? 'bg-sky-400 shadow-sm shadow-sky-400' : 'bg-teal-500/60'
                }`} />
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[9px] font-mono px-2 py-1 rounded bg-rose-950/40 text-rose-300 border border-rose-900 shrink-0">
                NULL
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
