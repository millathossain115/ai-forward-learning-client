'use client';

import React from 'react';
import { PipelineState } from '../types';

interface HashPipelineBannerProps {
  pipelineState: PipelineState;
}

export default function HashPipelineBanner({ pipelineState }: HashPipelineBannerProps) {
  return (
    <div className="flex items-center justify-between bg-[#10121d] px-3.5 py-2 rounded-xl border border-[#1e2235] text-xs font-mono">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-zinc-500">হ্যাশ পাইপলাইন:</span>
        {pipelineState.key ? (
          <div className="flex items-center gap-1.5 text-zinc-200">
            <span className="px-2 py-0.5 rounded bg-pink-950/60 border border-pink-500/40 text-pink-300 font-bold">
              Key: &quot;{pipelineState.key}&quot;
            </span>
            <span>➔</span>
            <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold">
              Hash: {pipelineState.rawHash}
            </span>
            <span>➔ % 7 ➔</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
              বাকেট [{pipelineState.bucketIndex}]
            </span>
          </div>
        ) : (
          <span className="text-zinc-400 italic">PUT বা GET বাটনে ক্লিক করে লাইভ হ্যাশ রেজাল্ট দেখুন</span>
        )}
      </div>
      {pipelineState.step && (
        <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[10px]">
          {pipelineState.step}
        </span>
      )}
    </div>
  );
}
