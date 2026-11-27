'use client';

import React, { useState } from 'react';
import ArrayTopic from './topics/Array/ArrayTopic';
import GraphTopic from './topics/Graph/GraphTopic';
import {
  Binary,
  GitCommit,
  Layers,
  ListFilter,
  Network,
  Clock,
  ChevronRight,
  BookMarked
} from 'lucide-react';

export type DsaTopicKey = 'array' | 'linkedlist' | 'stack' | 'queue' | 'graph';

const TOPICS = [
  {
    key: 'array' as DsaTopicKey,
    title: '1. Array',
    subtitle: 'Contiguous Memory, Indexing, Shifting',
    icon: Binary,
    status: 'Ready',
    badgeClass: 'bg-emerald-950 text-emerald-400 border-emerald-800',
  },
  {
    key: 'linkedlist' as DsaTopicKey,
    title: '2. Linked List',
    subtitle: 'Node References, Pointers, O(1) Splice',
    icon: GitCommit,
    status: 'Next',
    badgeClass: 'bg-sky-950 text-sky-400 border-sky-800',
  },
  {
    key: 'stack' as DsaTopicKey,
    title: '3. Stack',
    subtitle: 'LIFO, Call Stack, Bracket Parsing',
    icon: Layers,
    status: 'Upcoming',
    badgeClass: 'bg-slate-900 text-slate-400 border-slate-800',
  },
  {
    key: 'queue' as DsaTopicKey,
    title: '4. Queue',
    subtitle: 'FIFO, BFS, Asynchronous Buffers',
    icon: ListFilter,
    status: 'Upcoming',
    badgeClass: 'bg-slate-900 text-slate-400 border-slate-800',
  },
  {
    key: 'graph' as DsaTopicKey,
    title: '5. Graphs & DAGs',
    subtitle: '3-Color DFS, Kahn Topo Sort, Task Engines',
    icon: Network,
    status: 'Ready',
    badgeClass: 'bg-indigo-950 text-indigo-400 border-indigo-800',
  },
];

export default function DsaCurriculum() {
  const [selectedTopic, setSelectedTopic] = useState<DsaTopicKey>('array');

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Topic Horizontal Progression Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {TOPICS.map((t) => {
          const Icon = t.icon;
          const isActive = selectedTopic === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setSelectedTopic(t.key)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                isActive
                  ? 'bg-sky-500/10 border-sky-500 shadow-lg shadow-sky-500/10'
                  : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${t.badgeClass}`}>
                  {t.status}
                </span>
              </div>
              <div>
                <span className={`font-semibold text-xs block ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>
                  {t.title}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  {t.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Topic Viewport */}
      <div>
        {selectedTopic === 'array' && <ArrayTopic />}

        {selectedTopic === 'linkedlist' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <GitCommit className="w-10 h-10 text-sky-400 mb-1" />
            <h3 className="text-base font-bold text-slate-200">Topic 2: Linked List</h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Coming up next: Pointer dereferencing, Singly vs Doubly Linked Lists, O(1) node splicing,
              memory fragmentation vs cache locality, and step-by-step traversal animations.
            </p>
          </div>
        )}

        {selectedTopic === 'stack' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <Layers className="w-10 h-10 text-amber-400 mb-1" />
            <h3 className="text-base font-bold text-slate-200">Topic 3: Stack (LIFO)</h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Coming up next: Last-In-First-Out execution semantics, Call Stack frames in recursive functions,
              undo/redo buffers, and expression parsing with interactive push/pop visualizers.
            </p>
          </div>
        )}

        {selectedTopic === 'queue' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <ListFilter className="w-10 h-10 text-indigo-400 mb-1" />
            <h3 className="text-base font-bold text-slate-200">Topic 4: Queue (FIFO)</h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Coming up next: First-In-First-Out mechanics, ring buffers, BFS breadth traversal queues,
              and asynchronous message dispatchers with interactive enqueue/dequeue animations.
            </p>
          </div>
        )}

        {selectedTopic === 'graph' && <GraphTopic />}
      </div>
    </div>
  );
}

