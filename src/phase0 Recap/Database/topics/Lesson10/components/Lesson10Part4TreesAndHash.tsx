'use client';

import React, { useMemo, useState } from 'react';
import { AlertTriangle, Hash, Workflow } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson10Part4TreesAndHash() {
  const { language } = useLanguage();
  const [treeTab, setTreeTab] = useState<'btree' | 'bplus'>('bplus');
  const [hashInputKey, setHashInputKey] = useState<number>(113);

  const computedHashBucket = useMemo(() => Math.abs(hashInputKey) % 10, [hashInputKey]);

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • B+ Tree ও Hash ইনডেক্সিং' : 'Part 4 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="B-Tree vs. B+ Tree Architecture & Hash Indexing"
              bn="৪. B-Tree বনাম B+ Tree আর্কিটেকচার এবং Hash ইনডেক্সিং"
            />
          </h2>
        </div>
      </div>

      {/* Tree Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTreeTab('bplus')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
            treeTab === 'bplus' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          B+ Tree (Industry Standard)
        </button>
        <button
          onClick={() => setTreeTab('btree')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
            treeTab === 'btree' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          Standard B-Tree
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4 text-xs">
        {treeTab === 'bplus' ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-mono font-bold uppercase">B+ Tree: High Branching Factor &amp; Linked Leaves</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Optimal for Range Queries</span>
            </div>
            <div className="p-4 bg-black/60 rounded-xl font-mono text-[11px] space-y-2 text-zinc-300">
              <div className="text-center text-cyan-300 font-bold">[Root Node: 50 | 100]</div>
              <div className="text-center text-zinc-500">↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓</div>
              <div className="text-center text-indigo-300">[Internal: 20] &nbsp;&nbsp;&nbsp; [Internal: 70] &nbsp;&nbsp;&nbsp; [Internal: 120]</div>
              <div className="text-center text-zinc-500">↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓</div>
              <div className="p-2 bg-emerald-950/30 border border-emerald-500/40 rounded text-emerald-300 text-center font-bold">
                [Leaf: 10, 20] ↔ [Leaf: 50, 70] ↔ [Leaf: 100, 120] (Doubly-Linked!)
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-white block font-mono">1. Shorter Height</strong>
                <DualText as="span" className="text-[11px] text-zinc-400" en="Internal nodes store only keys + pointers." bn="ইন্টারনাল নোডে শুধু key ও পয়েন্টার থাকে।" />
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-white block font-mono">2. Fast Range Scans</strong>
                <DualText as="span" className="text-[11px] text-zinc-400" en="Follow doubly-linked leaves sequentially." bn="লিফ নোড লিংকড থাকায় রেঞ্জ কুয়েরি দ্রুত হয়।" />
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-white block font-mono">3. Uniform Depth</strong>
                <DualText as="span" className="text-[11px] text-zinc-400" en="All leaves sit at identical depth." bn="সব লিফ নোড সমান গভীরতায় থাকে।" />
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-indigo-400 font-mono font-bold uppercase">Standard B-Tree: Keys &amp; Data at All Levels</span>
            <div className="p-3 bg-black/60 rounded font-mono text-[11px] text-zinc-400 space-y-1">
              <div>• Pro: Search stops early if key is in root/internal node.</div>
              <div>• Con: Lower branching factor (data pointers occupy internal node space).</div>
              <div>• Con: Leaves are not linked; range scans require costly tree traversal.</div>
            </div>
          </>
        )}
      </div>

      {/* Hash Indexing Playground */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
            <Hash className="w-4 h-4" />
            <DualText as="span" en="Hash Index Calculator: h(k) = k mod 10 (O(1) Equality)" bn="Hash ইনডেক্স ক্যালকুলেটর: h(k) = k mod 10" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Key (k):</span>
            <input
              type="number"
              value={hashInputKey}
              onChange={(e) => setHashInputKey(parseInt(e.target.value, 10) || 0)}
              className="w-24 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div>
            <span>Calculation: </span>
            <span className="text-white font-bold">{hashInputKey}</span>
            <span> mod 10 = </span>
            <span className="text-emerald-400 font-extrabold text-sm">{computedHashBucket}</span>
          </div>
          <span className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Assigned Bucket: #{computedHashBucket}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1 font-sans">
          <strong className="flex items-center gap-1.5 font-mono">
            <AlertTriangle className="w-3.5 h-3.5" /> Hash Collision &amp; Limitation
          </strong>
          <DualText
            as="p"
            className="text-[11px] text-zinc-300"
            en="Keys 101 and 111 both map to bucket #1 (resolved via Chaining or Open Addressing). Note: Hash indexes only support =, NOT range queries (>, BETWEEN)."
            bn="১০১ এবং ১১১ উভয়ই বাকেট #১-এ পড়ে (Chaining দিয়ে সমাধান হয়)। মনে রাখবেন: Hash ইনডেক্স শুধু = সাপোর্ট করে, রেঞ্জ কুয়েরি নয়।"
          />
        </div>
      </div>
    </section>
  );
}
