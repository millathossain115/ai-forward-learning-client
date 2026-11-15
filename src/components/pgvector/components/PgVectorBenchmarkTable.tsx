import React from 'react';
import { Layers } from 'lucide-react';

export default function PgVectorBenchmarkTable() {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
        <Layers className="w-4 h-4 text-cyan-400" />
        pgvector Indexing Architectures Comparison
      </h3>

      <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
            <tr>
              <th className="p-3.5 font-medium">Index Structure</th>
              <th className="p-3.5 font-medium">Search Speed</th>
              <th className="p-3.5 font-medium">Build Speed</th>
              <th className="p-3.5 font-medium">Memory Usage</th>
              <th className="p-3.5 font-medium">Recall (Accuracy)</th>
              <th className="p-3.5 font-medium font-sans">Ideal Production Workload</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#171926] text-zinc-200">
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold text-zinc-100">Exact Flat Scan</td>
              <td className="p-3.5 text-rose-400">O(N) Slow</td>
              <td className="p-3.5 text-emerald-400">O(1) Instant</td>
              <td className="p-3.5 text-emerald-400">Zero Extra RAM</td>
              <td className="p-3.5 text-emerald-400 font-bold">100% Perfect</td>
              <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">
                &lt; 10,000 vectors or offline ground truth evaluation.
              </td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold text-cyan-300">IVFFlat</td>
              <td className="p-3.5 text-amber-300">O(√N) Medium</td>
              <td className="p-3.5 text-amber-300">Fast (K-Means)</td>
              <td className="p-3.5 text-emerald-400">Low RAM</td>
              <td className="p-3.5 text-amber-300">90% - 95%</td>
              <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">
                Medium datasets (100K - 1M) with limited RAM constraints.
              </td>
            </tr>
            <tr className="hover:bg-[#11131c]">
              <td className="p-3.5 font-bold text-indigo-300">HNSW</td>
              <td className="p-3.5 text-emerald-400 font-bold">O(log N) Lightning</td>
              <td className="p-3.5 text-rose-400">Slower Build</td>
              <td className="p-3.5 text-rose-400">High RAM (Graph edges)</td>
              <td className="p-3.5 text-emerald-400 font-bold">98% - 99.5%</td>
              <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">
                High-throughput RAG search, LLM tool recall, production vector search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
