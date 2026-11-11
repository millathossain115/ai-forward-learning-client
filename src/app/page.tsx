'use client';

import React, { useState, useEffect } from 'react';
import Sidebar, { TopicId } from '@/components/Sidebar';
import ArrayTopic from '@/phase0 Recap/DSA/topics/Array/ArrayTopic';
import LinkedListTopic from '@/phase0 Recap/DSA/topics/LinkedList/LinkedListTopic';
import StackTopic from '@/phase0 Recap/DSA/topics/Stack/StackTopic';
import QueueTopic from '@/phase0 Recap/DSA/topics/Queue/QueueTopic';
import HeapTopic from '@/phase0 Recap/DSA/topics/Heap/HeapTopic';
import HashTableTopic from '@/phase0 Recap/DSA/topics/HashTable/HashTableTopic';
import TreeTopic from '@/phase0 Recap/DSA/topics/Tree/TreeTopic';
import BalancedTreeTopic from '@/phase0 Recap/DSA/topics/BalancedTree/BalancedTreeTopic';
import TrieTopic from '@/phase0 Recap/DSA/topics/Trie/TrieTopic';
import SearchingTopic from '@/phase0 Recap/DSA/topics/Searching/SearchingTopic';
import SortingTopic from '@/phase0 Recap/DSA/topics/Sorting/SortingTopic';
import RecursionTopic from '@/phase0 Recap/DSA/topics/Recursion/RecursionTopic';
import ParadigmsTopic from '@/phase0 Recap/DSA/topics/Paradigms/ParadigmsTopic';
import GraphTopic from '@/phase0 Recap/DSA/topics/Graph/GraphTopic';
import DatabasePlayground from '@/components/DatabasePlayground';
import PgVectorTopic from '@/components/PgVectorTopic';
import {
  Server,
  Command,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const TOPIC_METADATA: Record<TopicId, { title: string; category: string; description: string }> = {
  array: {
    category: '1. Linear Data Structures',
    title: 'Array & Contiguous Memory Architecture',
    description: 'Hardware pointer arithmetic, cache locality, and element shifting simulation.',
  },
  linkedlist: {
    category: '1. Linear Data Structures',
    title: 'Linked List (Singly & Doubly)',
    description: 'Pointer dereferencing, heap-allocated nodes, and O(1) head/tail splicing.',
  },
  stack: {
    category: '1. Linear Data Structures',
    title: 'Stack (LIFO Execution)',
    description: 'Last-In-First-Out access, call stack frames in recursion, and undo history.',
  },
  queue: {
    category: '1. Linear Data Structures',
    title: 'Queue (FIFO Buffers)',
    description: 'First-In-First-Out processing pipelines, message brokers, and rate limiters.',
  },
  heap: {
    category: '2. Fast Access & Hierarchies',
    title: 'Priority Queue & Binary Heap',
    description: 'Complete binary tree, O(1) top-priority peek, and O(log N) sift-up/down.',
  },
  hashtable: {
    category: '2. Fast Access & Hierarchies',
    title: 'Hash Table & Set (O(1) Lookup)',
    description: 'Hash functions, modulo bucket arrays, and separate chaining collision resolution.',
  },
  tree: {
    category: '2. Fast Access & Hierarchies',
    title: 'Tree & Binary Search Tree (BST)',
    description: 'Hierarchical branching, Left < Root < Right BST invariant, and logarithmic search.',
  },
  'balanced-tree': {
    category: '2. Fast Access & Hierarchies',
    title: 'Balanced Trees: AVL & Red-Black Trees',
    description: 'Self-balancing trees, rotation maneuvers (LL, RR, LR, RL), and strict O(log N) worst-case performance guarantee.',
  },
  trie: {
    category: '2. Fast Access & Hierarchies',
    title: 'Trie: Prefix Tree & Autocomplete',
    description: 'Character-based prefix matching, dictionary tokenizers, and subword retrieval.',
  },
  graphs: {
    category: '3. Graphs & Algorithms',
    title: 'Graphs: Cyclic vs Directed Acyclic Graphs (DAGs)',
    description: 'Cycle detection via 3-Color DFS (White/Gray/Black) vs Kahn topological sort for deadlock-free DAG task execution.',
  },
  searching: {
    category: '3. Graphs & Algorithms',
    title: 'Searching: Linear vs Binary Search',
    description: 'Direct comparison race between sequential scans and halving search spaces.',
  },
  sorting: {
    category: '3. Graphs & Algorithms',
    title: 'Sorting Algorithms: Bar Race',
    description: 'Animated comparisons and swaps for Bubble Sort, Insertion Sort, and Divide & Conquer.',
  },
  recursion: {
    category: '3. Graphs & Algorithms',
    title: 'Recursion: Base Case & Stack Unwinding',
    description: 'Visualizing memory activation frames winding down to base conditions and returning.',
  },
  paradigms: {
    category: '3. Graphs & Algorithms',
    title: 'The 4 Core Algorithmic Paradigms',
    description: 'Greedy approach, Divide & Conquer, Dynamic Programming memoization, and Backtracking.',
  },
  'backend-sql': {
    category: '4. Database & Systems',
    title: 'SQL & Query Planner (EXPLAIN ANALYZE)',
    description: 'Interactive execution plans, sequential scans vs B-Tree searches on 5,000 synthetic rows.',
  },
  'backend-indexing': {
    category: '4. Database & Systems',
    title: 'B-Tree Indexing Benchmarks',
    description: 'Measuring latency drops and composite index selectivity on high-throughput tables.',
  },
  'backend-pgvector': {
    category: '4. Database & Systems',
    title: 'pgvector & High-Dimensional Vectors',
    description: 'IVFFlat vs HNSW indexing for storing and querying AI embeddings directly in PostgreSQL.',
  },
  'ai-llm': {
    category: '5. Forward AI Engineering',
    title: 'LLM APIs & Token Streaming',
    description: 'Structured JSON outputs, function calling, temperature tuning, and Server-Sent Events (SSE).',
  },
  'ai-rag': {
    category: '5. Forward AI Engineering',
    title: 'RAG (Retrieval Augmented Generation)',
    description: 'Semantic chunking, dense vector retrieval, hybrid BM25 search, and cross-encoder rerankers.',
  },
  'ai-mcp': {
    category: '5. Forward AI Engineering',
    title: 'Model Context Protocol (MCP)',
    description: 'Building custom MCP tools and resource servers to connect local databases to LLMs.',
  },
  'ai-agents': {
    category: '5. Forward AI Engineering',
    title: 'Autonomous AI Agents & Workflows',
    description: 'ReAct loops, LangGraph stateful DAGs, human-in-the-loop validation, and memory persistence.',
  },
  'ai-eval': {
    category: '5. Forward AI Engineering',
    title: 'Evaluation & Observability',
    description: 'Faithfulness, answer relevance metrics, latency tracking, and regression harnesses.',
  },
};

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('array');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sync topic from URL query param on load & browser back/forward buttons
  useEffect(() => {
    const syncTopicFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const topic = params.get('topic') as TopicId | null;
      if (topic && topic in TOPIC_METADATA) {
        setActiveTopic(topic);
      }
    };

    syncTopicFromUrl();
    window.addEventListener('popstate', syncTopicFromUrl);
    return () => window.removeEventListener('popstate', syncTopicFromUrl);
  }, []);

  const handleSelectTopic = (id: TopicId) => {
    setActiveTopic(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('topic', id);
      window.history.pushState({ topic: id }, '', url.toString());
    }
  };

  const meta = TOPIC_METADATA[activeTopic] || {
    category: 'Phase 0 • Recap',
    title: 'Topic',
    description: 'Module content.',
  };

  // Dynamically update browser tab title to match sidebar active topic
  useEffect(() => {
    if (meta.title) {
      document.title = `${meta.title} | FlowLogic DB Platform`;
    }
  }, [meta.title]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090a0f] text-zinc-100 antialiased font-sans">
      {/* 1. Left Collapsible Sidebar */}
      <Sidebar
        activeTopic={activeTopic}
        onSelectTopic={handleSelectTopic}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0b0c13]">
        {/* Minimalist Top App Bar */}
        <header className="h-14 border-b border-[#1b1d2b] px-6 flex items-center justify-between bg-[#0b0c13]/80 backdrop-blur z-20 shrink-0">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2.5 font-mono">
            <span className="text-xs md:text-sm text-zinc-400">{meta.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-sm md:text-base text-zinc-100 font-semibold">{meta.title}</span>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-4 text-xs md:text-sm font-mono">
            {/* Pure Client-Side Mode Badge */}
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
              <span className="text-xs font-medium text-emerald-400">Client Engine Active</span>
            </div>

            <div className="h-4 w-[1px] bg-[#1e202e]" />

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#131520] border border-[#1e2130] text-xs text-zinc-400">
              <Command className="w-3.5 h-3.5" />
              <span>K</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Workspace */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Active Topic Router */}
            {activeTopic === 'array' && <ArrayTopic />}
            {activeTopic === 'linkedlist' && <LinkedListTopic />}
            {activeTopic === 'stack' && <StackTopic />}
            {activeTopic === 'queue' && <QueueTopic />}
            {activeTopic === 'heap' && <HeapTopic />}
            {activeTopic === 'hashtable' && <HashTableTopic />}
            {activeTopic === 'tree' && <TreeTopic />}
            {activeTopic === 'balanced-tree' && <BalancedTreeTopic />}
            {activeTopic === 'trie' && <TrieTopic />}
            {activeTopic === 'searching' && <SearchingTopic />}
            {activeTopic === 'sorting' && <SortingTopic />}
            {activeTopic === 'recursion' && <RecursionTopic />}
            {activeTopic === 'paradigms' && <ParadigmsTopic />}

            {activeTopic === 'graphs' && <GraphTopic />}

            {(activeTopic === 'backend-sql' || activeTopic === 'backend-indexing') && (
              <div className="space-y-6">
                <div className="border-b border-[#1e2130] pb-4">
                  <h2 className="text-xl font-bold text-zinc-100">{meta.title}</h2>
                  <p className="text-xs text-zinc-400 mt-1">{meta.description}</p>
                </div>
                <DatabasePlayground />
              </div>
            )}

            {activeTopic === 'backend-pgvector' && <PgVectorTopic />}

            {/* Upcoming Chapters (Phase 1 AI Core) */}
            {[
              'ai-llm',
              'ai-rag',
              'ai-mcp',
              'ai-agents',
              'ai-eval',
            ].includes(activeTopic) && (
              <div className="p-8 rounded-xl border border-[#1b1e2e] bg-[#0f111a] flex flex-col items-center text-center max-w-xl mx-auto my-12">
                <div className="w-10 h-10 rounded-lg bg-[#161826] border border-[#23273d] flex items-center justify-center text-amber-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1b1f33] text-amber-400 border border-amber-500/20 mb-2">
                  Phase 1 Milestone
                </span>
                <h3 className="text-base font-bold text-zinc-100">{meta.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {meta.description}
                </p>
                <div className="mt-6 pt-4 border-t border-[#1e2236] w-full text-center">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Module specification defined. Reserved for Python FastAPI AI integration.
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
