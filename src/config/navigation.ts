import React from 'react';
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
  Search,
  Terminal,
  FileCode2,
  Boxes,
  Compass,
  BarChart3,
  Scale,
  BookOpen
} from 'lucide-react';

export type TopicId =
  | 'foundations'
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
  | 'graph-dag'
  | 'graph-dfs'
  | 'graph-bfs'
  | 'graph-dijkstra'
  | 'searching'
  | 'sorting'
  | 'sorting-bubble'
  | 'sorting-selection'
  | 'sorting-insertion'
  | 'sorting-merge'
  | 'sorting-quick'
  | 'recursion'
  | 'paradigms'
  | 'backend-roadmap'
  | 'backend-sql'
  | 'backend-indexing'
  | 'backend-pgvector'
  | 'ai-llm'
  | 'ai-rag'
  | 'ai-mcp'
  | 'ai-agents'
  | 'ai-eval';

export interface NavSubItem {
  id: TopicId;
  label: string;
  tag?: string;
  status: 'ready' | 'upcoming';
}

export interface NavItem {
  id: TopicId;
  label: string;
  icon: React.ElementType;
  status: 'ready' | 'upcoming';
  tag?: string;
  subItems?: NavSubItem[];
}

export interface NavSection {
  title: string;
  phase: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: '0. Foundations & Roadmap',
    phase: 'Phase 0 • Foundations',
    items: [
      { id: 'foundations', label: '0. DSA & Systems Foundations', icon: BookOpen, status: 'ready', tag: 'Core Roadmap' },
    ],
  },
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
      { id: 'graphs', label: '10. Graph Basics & Types', icon: Network, status: 'ready', tag: 'V & E' },
      { id: 'graph-dag', label: '11. Cyclic vs DAG (Topo Sort)', icon: GitCommit, status: 'ready', tag: 'Deadlock' },
      { id: 'graph-dfs', label: '11.1 Depth-First Search (DFS)', icon: Layers, status: 'ready', tag: 'Stack' },
      { id: 'graph-bfs', label: '11.2 Breadth-First Search (BFS)', icon: ListFilter, status: 'ready', tag: 'Queue' },
      { id: 'graph-dijkstra', label: '11.3 Shortest Path (Dijkstra)', icon: Compass, status: 'ready', tag: 'Min-Heap' },
      { id: 'searching', label: '12. Searching (Linear vs Binary)', icon: Search, status: 'ready', tag: 'Race' },
      {
        id: 'sorting',
        label: '13. Sorting Algorithms',
        icon: BarChart3,
        status: 'ready',
        tag: 'Submenu',
        subItems: [
          { id: 'sorting', label: '13.0 Overview & Matrix', tag: 'Guide', status: 'ready' },
          { id: 'sorting-bubble', label: '13.1 Bubble Sort', tag: 'O(N²)', status: 'ready' },
          { id: 'sorting-selection', label: '13.2 Selection Sort', tag: 'O(N) Swaps', status: 'ready' },
          { id: 'sorting-insertion', label: '13.3 Insertion Sort', tag: 'Cards', status: 'ready' },
          { id: 'sorting-merge', label: '13.4 Merge Sort', tag: 'Tree', status: 'ready' },
          { id: 'sorting-quick', label: '13.5 Quick Sort', tag: '3-Zone', status: 'ready' },
        ]
      },
      { id: 'recursion', label: '14. Recursion & Call Stack', icon: Boxes, status: 'ready', tag: 'Unwinding' },
      { id: 'paradigms', label: '15. 4 Core Paradigms', icon: Compass, status: 'ready', tag: 'DP / Greedy' },
    ],
  },
  {
    title: '4. Database & Systems',
    phase: 'Phase 1 • Data Core',
    items: [
      { id: 'backend-roadmap', label: '0. Database Architecture Roadmap', icon: Compass, status: 'ready', tag: 'Sequence' },
      { id: 'backend-sql', label: '1. SQL & Query Planner', icon: Database, status: 'ready', tag: 'EXPLAIN' },
      { id: 'backend-indexing', label: '2. B-Tree Index Benchmarks', icon: Table, status: 'ready', tag: 'O(log N)' },
      { id: 'backend-pgvector', label: '3. pgvector & Embeddings', icon: Cpu, status: 'ready', tag: 'HNSW' },
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
