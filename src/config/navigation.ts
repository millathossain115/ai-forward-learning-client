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
  BookOpen,
  KeyRound,
  Workflow,
  ShieldCheck,
  Server,
  GraduationCap
} from 'lucide-react';

export type TopicId =
  | 'dsa-directory'
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
  | 'db-directory'
  | 'db-lesson1'
  | 'db-lesson2'
  | 'db-lesson3'
  | 'db-lesson4'
  | 'db-lesson5'
  | 'db-lesson6'
  | 'db-lesson7'
  | 'db-lesson8'
  | 'db-lesson9'
  | 'db-lesson10'
  | 'db-lesson11'
  | 'db-lesson12'
  | 'db-lesson13'
  | 'db-lesson14'
  | 'db-lesson15'
  | 'db-lesson16'
  | 'db-lesson17'
  | 'db-lesson18'
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
    title: '0. Directories',
    phase: 'Course Navigation',
    items: [
      { id: 'dsa-directory', label: 'DSA & Algorithms Directory', icon: Binary, status: 'ready', tag: 'DSA' },
      { id: 'db-directory', label: 'Database & DBMS Directory', icon: Database, status: 'ready', tag: 'DBMS' },
    ],
  },
  {
    title: '1. Foundations & Roadmap',
    phase: 'Phase 0 • Foundations',
    items: [
      { id: 'foundations', label: '0. DSA & Systems Foundations', icon: BookOpen, status: 'ready', tag: 'Core Roadmap' },
    ],
  },
  {
    title: '2. Linear Data Structures',
    phase: 'Phase 0 • Recap',
    items: [
      { id: 'array', label: '1. Array (Contiguous RAM)', icon: Binary, status: 'ready', tag: 'O(1) index' },
      { id: 'linkedlist', label: '2. Linked List (Pointers)', icon: GitCommit, status: 'ready', tag: 'Chaining' },
      { id: 'stack', label: '3. Stack (LIFO Frames)', icon: Layers, status: 'ready', tag: 'Push/Pop' },
      { id: 'queue', label: '4. Queue (FIFO Buffers)', icon: ListFilter, status: 'ready', tag: 'Pipelines' },
    ],
  },
  {
    title: '3. Fast Access & Hierarchies',
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
    title: '4. Graphs & Algorithms',
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
    title: '5. DB Foundations & Modeling',
    phase: 'Phase 1 • Data Core',
    items: [
      { id: 'db-lesson1', label: '1. Lesson 1: Data, Information, DB & DBMS', icon: BookOpen, status: 'ready', tag: 'Beginner' },
      { id: 'db-lesson2', label: '2. Lesson 2: Database Models & Types', icon: Layers, status: 'ready', tag: 'Models' },
      { id: 'db-lesson3', label: '3. Lesson 3: Relational Database Model', icon: Table, status: 'ready', tag: 'Relations' },
      { id: 'db-lesson4', label: '4. Lesson 4: Keys in DBMS', icon: KeyRound, status: 'ready', tag: 'Keys & FK' },
      { id: 'db-lesson5', label: '5. Lesson 5: ER Model & Diagrams', icon: Workflow, status: 'ready', tag: 'ER Model' },
    ],
  },
  {
    title: '6. SQL & Schema Design',
    phase: 'Phase 1 • Data Core',
    items: [
      { id: 'db-lesson6', label: '6. Lesson 6: Introduction to SQL', icon: Terminal, status: 'ready', tag: 'SQL Basics' },
      { id: 'db-lesson7', label: '7. Lesson 7: Advanced SQL Queries', icon: FileCode2, status: 'ready', tag: 'Subqueries & CTEs' },
      { id: 'db-lesson8', label: '8. Lesson 8: Database Normalization', icon: Layers, status: 'ready', tag: '1NF to BCNF' },
    ],
  },
  {
    title: '7. Internals, Recovery & DDBMS',
    phase: 'Phase 1 • Data Core',
    items: [
      { id: 'db-lesson9', label: '9. Lesson 9: Transactions & Concurrency', icon: ShieldCheck, status: 'ready', tag: 'ACID & 2PL' },
      { id: 'db-lesson10', label: '10. Lesson 10: Indexing & Query Optimization', icon: Search, status: 'ready', tag: 'B+ Tree & EXPLAIN' },
      { id: 'db-lesson11', label: '11. Lesson 11: Security, Backup & Recovery', icon: ShieldCheck, status: 'ready', tag: 'RBAC, WAL & PITR' },
      { id: 'db-lesson12', label: '12. Lesson 12: Distributed Databases & DDBMS', icon: Network, status: 'ready', tag: '2PC, CAP & Sharding' },
    ],
  },
  {
    title: '8. Modern DB, DBA & Exam Prep',
    phase: 'Phase 1 • Data Core',
    items: [
      { id: 'db-lesson13', label: '13. Lesson 13: NoSQL & Modern Database Systems', icon: Boxes, status: 'ready', tag: 'MongoDB, Redis & Sharding' },
      { id: 'db-lesson14', label: '14. Lesson 14: Database Security & Authorization', icon: ShieldCheck, status: 'ready', tag: 'CIA, RBAC & SQLi' },
      { id: 'db-lesson15', label: '15. Lesson 15: Database Administration & Management (DBA)', icon: Server, status: 'ready', tag: 'DBA Ops, HA & DR' },
      { id: 'db-lesson16', label: '16. Lesson 16: Distributed Databases & DDBMS', icon: Network, status: 'ready', tag: 'Fragmentation, 2PC & CAP' },
      { id: 'db-lesson17', label: '17. Lesson 17: Data Warehousing & Data Mining', icon: Layers, status: 'ready', tag: 'ETL, OLAP & KDD' },
      { id: 'db-lesson18', label: '18. Lesson 18: Complete DBMS Revision & Mock Exam', icon: GraduationCap, status: 'ready', tag: 'Final Review & 60-Mark Exam' },
    ],
  },
  {
    title: '9. Forward AI Engineering',
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
