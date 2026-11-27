import React from 'react';
import { Zap, ArrowRight, Check } from 'lucide-react';

interface WordSearchCardProps {
  searchTarget: string;
  setSearchTarget: (w: string) => void;
  scanStep: number;
}

export default function WordSearchCard({
  searchTarget,
  setSearchTarget,
  scanStep,
}: WordSearchCardProps) {
  return (
    <div className="bg-[#0c0d15] border border-[#1e2233] p-5 rounded-2xl flex flex-col justify-between gap-5 hover:border-emerald-500/40 transition-colors">
      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">৩. O(Length) ওয়ার্ড সার্চ</h3>
              <span className="text-[10px] font-mono text-zinc-400">Constant Hops per Char</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
            Zero Scan
          </span>
        </div>

        {/* Interactive Input */}
        <div className="flex items-center gap-2 bg-[#121422] px-3 py-1.5 rounded-xl border border-[#20253b]">
          <span className="text-xs font-mono text-zinc-400">Target:</span>
          <input
            type="text"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="Type word: apple, cat..."
            className="w-full bg-transparent text-emerald-300 text-xs font-mono focus:outline-none"
          />
        </div>

        {/* Embedded Live Vector Animation */}
        <div className="bg-[#07080e] rounded-xl border border-[#1b1e2e] p-3 flex flex-col items-center justify-center relative min-h-[145px]">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
            Character Hop Laser Pulse
          </div>

          <div className="flex items-center gap-2 py-4">
            {searchTarget.trim().split('').map((char, idx) => {
              const isCurrent = scanStep === idx;
              const isPassed = scanStep > idx;

              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 scale-110  '
                        : isPassed
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-[#121422] text-zinc-500 border border-[#20253b]'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] opacity-70">h{idx + 1}</span>
                  </div>
                  {idx < searchTarget.trim().length - 1 && (
                    <ArrowRight
                      className={`w-3.5 h-3.5 mx-0.5 transition-colors ${
                        isPassed ? 'text-emerald-400' : 'text-zinc-600'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-zinc-400">
            {scanStep >= searchTarget.trim().length ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Word Resolved in {searchTarget.trim().length} Hops!
              </span>
            ) : (
              <span>
                Scanning character {scanStep + 1} of {searchTarget.trim().length}...
              </span>
            )}
          </div>
        </div>

        {/* Performance Metric Comparison */}
        <div className="bg-[#090a10] p-3 rounded-xl border border-[#1a1c28] space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Trie সার্চে ধাপ:</span>
            <span className="text-emerald-400 font-bold">মাত্র {searchTarget.trim().length} টি নোড হপ</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">ডাটাবেজ/লিনিয়ার স্ক্যান:</span>
            <span className="text-rose-400 font-bold">১০,০০,০০০+ তুলনা</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-zinc-400 bg-[#07080e] p-2.5 rounded-xl border border-[#161826] leading-relaxed">
        💡 <strong>কাজের ধরণ:</strong> ডিকশনারি যতই বিশাল হোক না কেন, সার্চিং সময় কেবল শব্দের অক্ষরের সংখ্যার ($L$) সমান—ডিকশনারির সাইজ $N$-এর ওপর নির্ভরশীল নয়।
      </div>
    </div>
  );
}
