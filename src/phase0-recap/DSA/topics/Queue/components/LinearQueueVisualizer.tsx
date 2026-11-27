import React from 'react';
import { QueueJob } from '../types';

interface LinearQueueVisualizerProps {
  jobs: QueueJob[];
}

export default function LinearQueueVisualizer({ jobs }: LinearQueueVisualizerProps) {
  return (
    <div className="min-h-[160px] bg-[#090a10] rounded-xl border border-[#1a1d2e] p-6 flex flex-col justify-center relative overflow-hidden">
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-2">
        <span className="text-emerald-400 flex items-center gap-1">
          ▼ HEAD (Next to Exit)
        </span>
        <span className="text-cyan-400 flex items-center gap-1">
          TAIL (Next to Enter) ▲
        </span>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto p-5 rounded-xl border border-[#22273d] bg-[#111320]/80 min-h-[110px]">
        {jobs.length === 0 ? (
          <div className="w-full text-center text-xs font-mono text-zinc-600 py-4">
            কিউ বর্তমানে খালি। ওপরের Enqueue বাটন দিয়ে জব যুক্ত করুন।
          </div>
        ) : (
          jobs.map((job, idx) => {
            const isHead = idx === 0;
            const isTail = idx === jobs.length - 1;

            let animStyle = 'transition-all duration-500';
            if (job.state === 'entering') {
              animStyle = 'translate-x-10 opacity-30 scale-90 transition-all duration-500';
            } else if (job.state === 'exiting') {
              animStyle = '-translate-x-16 opacity-0 scale-90 transition-all duration-600';
            }

            return (
              <div
                key={job.id}
                className={`flex flex-col items-center gap-1.5 shrink-0 ${animStyle}`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-xl border bg-gradient-to-r ${job.color} text-slate-950 font-mono text-xs font-bold shadow-lg min-w-[120px] text-center transition-all duration-300 ${
                    isHead ? 'ring-4 ring-emerald-400/40 scale-105 shadow-emerald-500/20' : ''
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-wider opacity-80 font-extrabold mb-0.5">
                    {isHead ? 'HEAD (১ম বের)' : isTail ? 'TAIL (শেষ)' : `#${idx + 1}`}
                  </div>
                  <div className="truncate text-xs font-semibold">{job.name}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
