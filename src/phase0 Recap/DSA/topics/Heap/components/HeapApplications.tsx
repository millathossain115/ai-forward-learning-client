import React from 'react';
import { Activity, Cpu, Zap } from 'lucide-react';

export default function HeapApplications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
        <Activity className="w-4 h-4 text-rose-400" />
        <h4 className="text-xs font-bold text-zinc-200">1. Hospital Emergency Triage</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Patients are assigned severity scores (1 = critical trauma, 5 = minor ache). The ER doctor always treats the min-heap root, regardless of arrival order.
        </p>
      </div>

      <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
        <Cpu className="w-4 h-4 text-amber-400" />
        <h4 className="text-xs font-bold text-zinc-200">2. OS CPU Process Scheduler</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Operating systems use priority heaps (e.g. Linux CFS scheduler) to pick the thread with highest priority or least runtime executed.
        </p>
      </div>

      <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
        <Zap className="w-4 h-4 text-sky-400" />
        <h4 className="text-xs font-bold text-zinc-200">3. Dijkstra Shortest Path</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Dijkstra’s algorithm extracts the closest unvisited node in $O(\log V)$ time using a Min-Heap instead of $O(V)$ linear searching.
        </p>
      </div>
    </div>
  );
}
