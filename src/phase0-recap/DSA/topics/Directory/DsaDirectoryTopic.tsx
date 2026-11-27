'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Binary,
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Search,
  X,
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DsaDirectoryTopicProps {
  onNavigate?: (id: TopicId, sectionId?: string) => void;
}

interface DsaSubTopic {
  title: string;
  topicId?: TopicId;
  sectionId?: string;
}

interface DsaTopicNode {
  title: string;
  topicId: TopicId;
  sectionId?: string;
  children?: (string | DsaSubTopic)[];
}

interface DsaCategory {
  id: string;
  defaultTopicId: TopicId;
  title: string;
  accent: string;
  badgeBg: string;
  topics: DsaTopicNode[];
}

const DSA_DIRECTORY: DsaCategory[] = [
  {
    id: 'P0',
    defaultTopicId: 'foundations',
    title: '0. Foundations & Roadmap',
    accent: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    topics: [
      {
        title: '0. DSA & Systems Foundations',
        topicId: 'foundations',
        children: [
          { title: 'Data Structure vs Algorithm (RAM Simulation)', topicId: 'foundations', sectionId: 'dsa-ram' },
          { title: 'Efficiency Dashboard: Time & Memory Complexity', topicId: 'foundations', sectionId: 'dsa-complexity' },
          { title: 'Practical Domain Architecture Navigator', topicId: 'foundations', sectionId: 'dsa-domains' },
          { title: 'Complete Forward Engineering Roadmap', topicId: 'foundations', sectionId: 'dsa-roadmap' },
        ],
      },
    ],
  },
  {
    id: 'P1',
    defaultTopicId: 'array',
    title: '1. Linear Data Structures',
    accent: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    topics: [
      {
        title: '1. Array (Contiguous RAM)',
        topicId: 'array',
        children: ['Hardware Pointer Arithmetic & Cache Locality', 'Element Shifting Simulation'],
      },
      {
        title: '2. Linked List (Pointers)',
        topicId: 'linkedlist',
        children: ['Singly & Doubly Linked Nodes', 'O(1) Head/Tail Splicing & Pointer Dereferencing'],
      },
      {
        title: '3. Stack (LIFO Frames)',
        topicId: 'stack',
        children: ['LIFO Push / Pop Execution', 'Call Stack Frames & Undo History'],
      },
      {
        title: '4. Queue (FIFO Buffers)',
        topicId: 'queue',
        children: ['FIFO Processing Pipelines', 'Message Brokers & Rate Limiters'],
      },
    ],
  },
  {
    id: 'P2',
    defaultTopicId: 'heap',
    title: '2. Fast Access & Hierarchies',
    accent: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    topics: [
      {
        title: '5. Priority Queue & Heap',
        topicId: 'heap',
        children: ['Complete Binary Tree & O(1) Peek', 'O(log N) Sift-Up / Sift-Down'],
      },
      {
        title: '6. Hash Table & Set',
        topicId: 'hashtable',
        children: ['Hash Functions & Modulo Buckets', 'Separate Chaining Collision Resolution'],
      },
      {
        title: '7. Tree & Binary Search Tree (BST)',
        topicId: 'tree',
        children: ['Hierarchical Branching & Left < Root < Right Invariant', 'Logarithmic Search & Traversals'],
      },
      {
        title: '8. Balanced Tree (AVL / Red-Black)',
        topicId: 'balanced-tree',
        children: ['Self-Balancing Trees & Balance Factor', 'Rotation Maneuvers (LL, RR, LR, RL)'],
      },
      {
        title: '9. Trie (Prefix Tree)',
        topicId: 'trie',
        children: ['Prefix Matching & Autocomplete', 'Spell Checker & O(Length) Word Search'],
      },
    ],
  },
  {
    id: 'P3',
    defaultTopicId: 'graphs',
    title: '3. Graphs & Algorithms',
    accent: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    topics: [
      {
        title: '10. Graph Basics & Types',
        topicId: 'graphs',
        children: ['Vertices, Edges & Representations (List vs Matrix)', 'Undirected, Directed & Weighted Graph Simulators'],
      },
      {
        title: '11. Cyclic vs DAG (Topological Sort)',
        topicId: 'graph-dag',
        children: ['Circular Deadlocks vs Safe DAG Execution', "3-Color DFS Cycle Detection & Kahn's Topological Sort"],
      },
      {
        title: '11.1 Depth-First Search (DFS)',
        topicId: 'graph-dfs',
        children: ['LIFO Call Stack Traversal & Backtracking'],
      },
      {
        title: '11.2 Breadth-First Search (BFS)',
        topicId: 'graph-bfs',
        children: ['FIFO Queue Waves & Unweighted Shortest Path'],
      },
      {
        title: '11.3 Shortest Path (Dijkstra)',
        topicId: 'graph-dijkstra',
        children: ['Greedy Min-Heap Priority Queue & Edge Relaxation'],
      },
      {
        title: '12. Searching (Linear vs Binary)',
        topicId: 'searching',
        children: ['Sequential Scan vs Halving Search Space Race'],
      },
      {
        title: '13. Sorting Algorithms',
        topicId: 'sorting',
        children: [
          { title: '13.0 Sorting Overview & Decision Matrix', topicId: 'sorting' },
          { title: '13.1 Bubble Sort — O(N²)', topicId: 'sorting-bubble' },
          { title: '13.2 Selection Sort — O(N) Swaps', topicId: 'sorting-selection' },
          { title: '13.3 Insertion Sort — Playing Cards', topicId: 'sorting-insertion' },
          { title: '13.4 Merge Sort — Divide & Conquer Tree', topicId: 'sorting-merge' },
          { title: '13.5 Quick Sort — 3-Zone Pivot Partition', topicId: 'sorting-quick' },
        ],
      },
      {
        title: '14. Recursion & Call Stack',
        topicId: 'recursion',
        children: ['Recursion, Base Case & Stack Unwinding'],
      },
      {
        title: '15. 4 Core Algorithmic Paradigms',
        topicId: 'paradigms',
        children: ['Greedy, Divide & Conquer, Dynamic Programming & Backtracking'],
      },
    ],
  },
];

export default function DsaDirectoryTopic({ onNavigate }: DsaDirectoryTopicProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DSA_DIRECTORY.map((g) => [g.id, true]))
  );

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedGroups(Object.fromEntries(DSA_DIRECTORY.map((g) => [g.id, true])));
  };

  const collapseAll = () => {
    setExpandedGroups(Object.fromEntries(DSA_DIRECTORY.map((g) => [g.id, false])));
  };

  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DSA_DIRECTORY;

    return DSA_DIRECTORY.map((group) => {
      const groupMatches = group.title.toLowerCase().includes(q);
      if (groupMatches) return group;

      const matchingTopics = group.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.children?.some((c) => {
            const label = typeof c === 'string' ? c : c.title;
            return label.toLowerCase().includes(q);
          })
      );
      if (matchingTopics.length === 0) return null;
      return { ...group, topics: matchingTopics };
    }).filter((item): item is DsaCategory => item !== null);
  }, [searchQuery]);

  const totalTopics = DSA_DIRECTORY.reduce((acc, g) => acc + g.topics.length, 0);

  return (
    <div className="w-full space-y-6 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      {/* Directory Header */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-5 md:p-7 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                  DSA &amp; Algorithms Directory
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {DSA_DIRECTORY.length} Phases • {totalTopics} Modules
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white mt-1 tracking-tight font-mono">
                DATA STRUCTURES &amp; ALGORITHMS
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Click any module or subtopic below to jump directly to that page or section.
              </p>
            </div>
          </div>

          {/* Quick Jump Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {DSA_DIRECTORY.map((group) => (
              <button
                key={group.id}
                onClick={() => onNavigate?.(group.defaultTopicId)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition-colors cursor-pointer hover:brightness-125 ${group.badgeBg}`}
                title={group.title}
              >
                {group.id}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Tree Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter arrays, trees, graphs, sorting, DP..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#0a0d18] border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-[#14182d] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-zinc-300 cursor-pointer transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-[#14182d] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-zinc-300 cursor-pointer transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </section>

      {/* Clickable Hierarchy Tree */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-3">
        {filteredGroups.length === 0 ? (
          <div className="py-10 text-center text-xs font-mono text-zinc-400">
            No matching DSA modules or topics found for &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredGroups.map((group) => {
            const isOpen = searchQuery.trim() ? true : !!expandedGroups[group.id];
            return (
              <div
                key={group.id}
                className="rounded-xl bg-[#0b0e1a] border border-slate-800/90 overflow-hidden"
              >
                {/* Category Folder Row */}
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[#121629] border-b border-slate-800/70">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex items-center gap-2.5 text-left flex-1 min-w-0 cursor-pointer group"
                  >
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                    {isOpen ? (
                      <FolderOpen className={`w-4 h-4 shrink-0 ${group.accent}`} />
                    ) : (
                      <Folder className={`w-4 h-4 shrink-0 ${group.accent}`} />
                    )}
                    <span className="text-xs md:text-sm font-bold font-mono text-white group-hover:text-amber-300 transition-colors truncate">
                      {group.title}
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate?.(group.defaultTopicId)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border flex items-center gap-1 shrink-0 cursor-pointer transition-colors hover:brightness-125 ${group.badgeBg}`}
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Nested Topics */}
                {isOpen && (
                  <div className="px-4 py-2.5 space-y-1">
                    {group.topics.map((topic, idx) => (
                      <div key={idx} className="pl-3 border-l border-slate-800/90">
                        <button
                          onClick={() => onNavigate?.(topic.topicId, topic.sectionId)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-mono text-zinc-300 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer group"
                        >
                          <FileText className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 shrink-0" />
                          <span className="flex-1">{topic.title}</span>
                          <ArrowRight className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-amber-400 transition-opacity shrink-0" />
                        </button>

                        {topic.children && topic.children.length > 0 && (
                          <div className="ml-5 pl-3 border-l border-slate-800/70 space-y-0.5 py-0.5">
                            {topic.children.map((sub, sIdx) => {
                              const label = typeof sub === 'string' ? sub : sub.title;
                              const targetTopic =
                                typeof sub === 'string' ? topic.topicId : sub.topicId ?? topic.topicId;
                              const targetSection =
                                typeof sub === 'string' ? topic.sectionId : sub.sectionId ?? topic.sectionId;
                              return (
                                <button
                                  key={sIdx}
                                  onClick={() => onNavigate?.(targetTopic, targetSection)}
                                  className="w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-left text-[11px] font-mono text-zinc-400 hover:text-amber-300 hover:bg-slate-800/40 transition-colors cursor-pointer"
                                >
                                  <span className="text-slate-600">└─</span>
                                  <span>{label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
