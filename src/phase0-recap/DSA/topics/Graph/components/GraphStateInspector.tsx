import React from 'react';
import { ListOrdered } from 'lucide-react';
import { DFSStep, KahnStep } from '../graphAlgorithms';

interface GraphStateInspectorProps {
  algorithm: 'dfs' | 'kahn';
  currentStep: DFSStep | KahnStep;
}

export default function GraphStateInspector({
  algorithm,
  currentStep,
}: GraphStateInspectorProps) {
  return (
    <div className="flex flex-col h-[480px] rounded-2xl border border-[#1e2233] bg-[#0f111a] p-4">
      <div className="text-xs font-mono text-zinc-400 pb-3 border-b border-[#1e2233] flex justify-between items-center">
        <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
          <ListOrdered className="w-4 h-4 text-indigo-400" />
          {algorithm === 'dfs' ? 'DFS কল স্ট্যাক (Call Stack O(V))' : 'কান-এর কিউ ও ইন-ডিগ্রি'}
        </span>
        <span className="text-[10px] text-emerald-400 font-mono">লাইভ মেমরি</span>
      </div>

      <div className="flex-1 overflow-y-auto py-3 space-y-3">
        {algorithm === 'dfs' ? (
          <div>
            <div className="text-[11px] text-zinc-400 font-medium mb-2 font-mono">
              অ্যাক্টিভ কল স্ট্যাক (Top to Bottom):
            </div>
            {((currentStep as DFSStep)?.callStack || []).length === 0 ? (
              <div className="p-3 rounded-xl bg-[#090b14] border border-[#1e2233] text-xs text-zinc-500 italic">
                স্ট্যাক খালি রয়েছে।
              </div>
            ) : (
              <div className="flex flex-col-reverse gap-1.5">
                {((currentStep as DFSStep)?.callStack || []).map((frame, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-800/80 font-mono text-xs text-amber-300 flex items-center justify-between"
                  >
                    <span className="font-bold">dfs(&quot;{frame}&quot;)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-200">
                      GRAY (প্রসেসিংরত)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* FIFO Queue */}
            <div>
              <div className="text-[11px] text-zinc-400 font-medium mb-1.5 font-mono">
                রেডি কিউ (ইন-ডিগ্রি == ০):
              </div>
              <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#090b14] border border-[#1e2233] min-h-[44px] items-center">
                {((currentStep as KahnStep)?.queue || []).length === 0 ? (
                  <span className="text-xs text-zinc-500 italic">কিউ খালি রয়েছে</span>
                ) : (
                  ((currentStep as KahnStep)?.queue || []).map((q, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-800 font-mono text-xs text-sky-300 font-bold"
                    >
                      {q}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* In-Degree Table */}
            <div>
              <div className="text-[11px] text-zinc-400 font-medium mb-1.5 font-mono">
                ইন-ডিগ্রি গণনা (In-Degree Counts):
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries((currentStep as KahnStep)?.inDegrees || {}).map(([node, deg]) => (
                  <div
                    key={node}
                    className={`p-2 rounded-xl border text-xs font-mono flex items-center justify-between ${
                      deg === 0
                        ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-300 font-bold'
                        : 'bg-[#090a10] border-[#1e2233] text-zinc-300'
                    }`}
                  >
                    <span className="truncate max-w-[90px]">{node}</span>
                    <span className="font-bold px-1.5 py-0.5 rounded bg-[#12141f] border border-[#1e2233]">
                      {deg}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Topological Order */}
            <div>
              <div className="text-[11px] text-zinc-400 font-medium mb-1.5 font-mono">
                টপোলজিক্যাল এক্সেকিউশন ক্রম:
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-900/60 text-xs font-mono text-indigo-300 leading-relaxed">
                {((currentStep as KahnStep)?.topologicalOrder || []).length === 0
                  ? 'এখনও কোনো নোড সম্পন্ন হয়নি।'
                  : ((currentStep as KahnStep)?.topologicalOrder || []).join(' ➔ ')}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#1e2233] text-[11px] text-zinc-400 font-sans">
        {algorithm === 'dfs'
          ? '৩-কালার DFS দিয়ে রিকর্শন স্ট্যাকের পূর্বপুরুষ (GRAY) নোডে ব্যাক-এজ খুঁজে সাইকেল শনাক্ত করা হয়।'
          : 'কান-এর অ্যালগরিদমে 0 ইনকামিং এজ যুক্ত নোডগুলো কিউ থেকে বের করে সুশৃঙ্খল এক্সেকিউশন অর্ডার তৈরি করা হয়।'}
      </div>
    </div>
  );
}
