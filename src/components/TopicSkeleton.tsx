import React from 'react';
import { Loader2 } from 'lucide-react';

export default function TopicSkeleton() {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-12 rounded-xl border border-[#1b1e2e] bg-[#0c0e17]/60 animate-pulse">
      <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
      <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase">Loading Interactive Visualizer...</p>
    </div>
  );
}
