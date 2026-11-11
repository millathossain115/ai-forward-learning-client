'use client';

import React, { useState, useMemo } from 'react';
import {
  Binary,
  GitCommit,
  Layers,
  ListFilter,
  Network,
  Database,
  Table,
  Cpu,
  Sparkles,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal,
  FileCode2,
  Boxes,
  Compass,
  BarChart3,
  TrendingDown,
  Scale
} from 'lucide-react';

export type TopicId =
  | 'array'
  | 'linkedlist'
  | 'stack'
  | 'queue'
  | 'heap'
  | 'hashtable'
  | 'tree'
  | 'balanced-tree'
  | 'trie'
  | 'graphs'
  | 'searching'
  | 'sorting'
  | 'recursion'
  | 'paradigms'
  | 'backend-sql'
  | 'backend-indexing'
  | 'backend-pgvector'
  | 'ai-llm'
  | 'ai-rag'
  | 'ai-mcp'
  | 'ai-agents'
  | 'ai-eval';

interface NavItem {
  id: TopicId;
  label: string;
  icon: React.ElementType;
  status: 'ready' | 'upcoming';
  tag?: string;
}

interface NavSection {
  title: string;
  phase: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: '1. Linear Data Structures',
    phase: 'Phase 0 • Recap',
    items: [
      { id: 'array', label: '1. Array (Contiguous RAM)', icon: Binary, status: 'ready', tag: 'O(1) index' },
      { id: 'linkedlist', label: '2. Linked List (Pointers)', icon: GitCommit, status: 'ready', tag: 'Chaining' },
      { id: 'stack', label: '3. Stack (LIFO Frames)', icon: Layers, status: 'ready', tag: 'Push/Pop' },
      { id: 'queue', label: '4. Queue (FIFO Buffers)', icon: ListFilter, status: 'ready', tag: 'Pipelines' },
    ],
  },
  {
    title: '2. Fast Access & Hierarchies',
    phase: 'Phase 0 • Recap',
    items: [
      { id: 'heap', label: '5. Priority Queue & Heap', icon: Boxes, status: 'ready', tag: 'Sift-Up/Down' },
      { id: 'hashtable', label: '6. Hash Table & Set', icon: Database, status: 'ready', tag: 'O(1) hash' },
      { id: 'tree', label: '7. Tree & BST', icon: Network, status: 'ready', tag: 'O(log N)' },
      { id: 'balanced-tree', label: '8. Balanced Tree (AVL / Red-Black)', icon: Scale, status: 'ready', tag: 'Rotations' },
      { id: 'trie', label: '9. Trie (Prefix Tree)', icon: Search, status: 'ready', tag: 'Autocomplete' },
    ],
  },
  {
    title: '3. Graphs & Algorithms',
    phase: 'Phase 0 • Recap',
    items: [
      { id: 'graphs', label: '10. Graphs: Cyclic vs DAGs', icon: Network, status: 'ready', tag: 'Cycle Check' },
      { id: 'searching', label: '11. Searching (Linear vs Binary)', icon: Search, status: 'ready', tag: 'Race' },
      { id: 'sorting', label: '12. Sorting Visualizer', icon: BarChart3, status: 'ready', tag: 'O(N log N)' },
      { id: 'recursion', label: '13. Recursion & Call Stack', icon: Boxes, status: 'ready', tag: 'Unwinding' },
      { id: 'paradigms', label: '14. 4 Core Paradigms', icon: Compass, status: 'ready', tag: 'DP / Greedy' },
    ],
  },
  {
    title: '4. Database & Systems',
    phase: 'Phase 0 • Recap',
    items: [
      { id: 'backend-sql', label: 'SQL & Query Planner', icon: Database, status: 'ready', tag: 'EXPLAIN' },
      { id: 'backend-indexing', label: 'B-Tree Index Benchmarks', icon: Table, status: 'ready', tag: 'O(log N)' },
      { id: 'backend-pgvector', label: 'pgvector & Embeddings', icon: Cpu, status: 'upcoming', tag: 'HNSW' },
    ],
  },
  {
    title: '5. Forward AI Engineering',
    phase: 'Phase 1 • AI Core',
    items: [
      { id: 'ai-llm', label: 'LLM APIs & Streaming', icon: FileCode2, status: 'upcoming', tag: 'Tokens' },
      { id: 'ai-rag', label: 'RAG & Retrieval', icon: Sparkles, status: 'upcoming', tag: 'Dense Vectors' },
      { id: 'ai-mcp', label: 'Model Context Protocol', icon: Terminal, status: 'upcoming', tag: 'MCP SDK' },
      { id: 'ai-agents', label: 'Agentic DAGs & Loops', icon: Bot, status: 'upcoming', tag: 'ReAct' },
      { id: 'ai-eval', label: 'AI Evaluation & Evals', icon: CheckCircle2, status: 'upcoming', tag: 'RAGAS' },
    ],
  },
];

interface SidebarProps {
  activeTopic: TopicId;
  onSelectTopic: (id: TopicId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeTopic,
  onSelectTopic,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredSections = useMemo(() => {
    if (!filterQuery.trim()) return NAV_SECTIONS;
    const q = filterQuery.toLowerCase();
    return NAV_SECTIONS.map(sec => ({
      ...sec,
      items: sec.items.filter(
        it => it.label.toLowerCase().includes(q) || it.tag?.toLowerCase().includes(q)
      ),
    })).filter(sec => sec.items.length > 0);
  }, [filterQuery]);

  if (collapsed) {
    return (
      <aside className="w-14 border-r border-[#1e202e] bg-[#0c0d14] flex flex-col justify-between py-4 items-center shrink-0">
        <button
          onClick={onToggleCollapse}
          className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-[#181a26] rounded-md transition-colors"
          title="Expand Sidebar"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {NAV_SECTIONS.flatMap(s => s.items)
            .filter(i => i.status === 'ready')
            .map(item => {
              const Icon = item.icon;
              const isActive = activeTopic === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTopic(item.id)}
                  className={`p-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#1e2233] text-amber-400 border border-amber-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#161822]'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
        </div>

        <div className="text-[10px] font-mono text-zinc-600">v0.1</div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r border-[#1e202e] bg-[#0c0d14] flex flex-col justify-between shrink-0 select-none">
      {/* Top Header */}
      <div className="flex flex-col border-b border-[#1b1d2a]">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#1c1f2e] border border-[#2c3047] flex items-center justify-center font-mono text-sm font-bold text-amber-400">
              FL
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-zinc-100 block">
                FORWARD LEARNING
              </span>
              <span className="text-xs font-mono text-zinc-400 block">
                Systems &amp; AI Engineering
              </span>
            </div>
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-[#181a26] rounded-md transition-colors"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Input */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#13151f] border border-[#1f2233] text-sm">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Filter topics..."
              className="bg-transparent text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none w-full font-mono"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="text-xs text-zinc-400 hover:text-zinc-200 font-mono"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Topics Tree */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-4">
        {filteredSections.map(sec => {
          const isSecCollapsed = collapsedSections[sec.title];
          return (
            <div key={sec.title} className="space-y-1">
              <button
                onClick={() => toggleSection(sec.title)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                <span className="uppercase tracking-wider font-mono text-xs text-zinc-400">
                  {sec.title}
                </span>
                {isSecCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </button>

              {!isSecCollapsed && (
                <div className="space-y-1 pt-0.5">
                  {sec.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTopic === item.id;
                    const isReady = item.status === 'ready';

                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectTopic(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group cursor-pointer ${
                          isActive
                            ? 'bg-[#181a27] text-zinc-100 font-semibold border border-[#2a2e44] shadow-sm'
                            : 'text-zinc-300 hover:text-zinc-100 hover:bg-[#12141f]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-amber-400' : 'text-zinc-400 group-hover:text-zinc-200'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {item.tag && (
                            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#13141f] text-zinc-300 border border-[#1e202e]">
                              {item.tag}
                            </span>
                          )}
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isReady ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-zinc-700'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-[#1b1d2a] text-xs font-mono text-zinc-400 flex items-center justify-between">
        <span>Workspace: FL DB</span>
        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Active
        </span>
      </div>
    </aside>
  );
}
