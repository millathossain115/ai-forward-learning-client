import React from 'react';
import { Loader2 } from 'lucide-react';

export default function TopicSkeleton() {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-12 rounded-xl border border-white/[0.08] bg-[#101116]">
      <Loader2 className="w-6 h-6 text-[#9ca0b0] animate-spin mb-3" strokeWidth={1.5} />
      <p className="text-xs font-mono text-[#686c7d]">Loading interactive visualizer</p>
    </div>
  );
}
