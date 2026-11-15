import { TopicId } from './navigation';

export interface TopicMeta {
  title: string;
  category: string;
  description: string;
}

export const TOPIC_METADATA: Record<TopicId, TopicMeta> = {
  foundations: {
    category: '0. Foundations & Roadmap',
    title: '0. DSA & Systems Foundations',
    description: 'Core engineering philosophy: why data structures and algorithms matter, situational decision guidelines, and the forward roadmap.',
  },
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
    title: '10. Graph Basics & Types',
    description: 'Vertices, edges, representations (List vs Matrix), and interactive Undirected, Directed, Weighted graph simulators.',
  },
  'graph-dag': {
    category: '3. Graphs & Algorithms',
    title: '11. Cyclic vs Directed Acyclic Graphs (DAGs)',
    description: 'Circular deadlocks vs safe DAG execution, 3-Color DFS cycle detection, and Kahn’s topological sort pipeline engine.',
  },
  'graph-dfs': {
    category: '3. Graphs & Algorithms',
    title: '11.1 Depth-First Search (DFS)',
    description: 'LIFO call stack exploration, recursive path traversal, and backtracking mechanics.',
  },
  'graph-bfs': {
    category: '3. Graphs & Algorithms',
    title: '11.2 Breadth-First Search (BFS)',
    description: 'FIFO queue traversal, concentric level waves, and unweighted shortest path guarantees.',
  },
  'graph-dijkstra': {
    category: '3. Graphs & Algorithms',
    title: '11.3 Shortest Path: Dijkstra’s Algorithm',
    description: 'Greedy Min-Heap priority queue, edge relaxation, and optimal routing on weighted graphs.',
  },
  searching: {
    category: '3. Graphs & Algorithms',
    title: '12. Searching: Linear vs Binary Search',
    description: 'Direct comparison race between sequential scans and halving search spaces.',
  },
  sorting: {
    category: '3. Graphs & Algorithms',
    title: '13.0 Sorting Overview & Decision Matrix',
    description: 'Comprehensive taxonomy: O(N²) quadratic vs O(N log N) divide & conquer, stability, and real-world selection guidelines.',
  },
  'sorting-bubble': {
    category: '3. Graphs & Algorithms',
    title: '13.1 Bubble Sort (বুদ্বুদ সোয়াপ)',
    description: 'Adjacent element comparison, floating bubble elevation, and early-exit O(N) adaptive optimization.',
  },
  'sorting-selection': {
    category: '3. Graphs & Algorithms',
    title: '13.2 Selection Sort (মিনিমাম স্ক্যানার)',
    description: 'Sorted boundary expansion, minimum champion scanner, and strictly O(N) flash-friendly write cycles.',
  },
  'sorting-insertion': {
    category: '3. Graphs & Algorithms',
    title: '13.3 Insertion Sort (তাসের পকেট সাজানো)',
    description: 'Hand of playing cards metaphor, active key card lifting, rightward shifting, and V8 engine hybrid sorts.',
  },
  'sorting-merge': {
    category: '3. Graphs & Algorithms',
    title: '13.4 Merge Sort (ডিভাইড অ্যান্ড কনকার ট্রি)',
    description: 'Recursive divide tree down to base cases, 2-pointer zipper merging, and guaranteed O(N log N) stability.',
  },
  'sorting-quick': {
    category: '3. Graphs & Algorithms',
    title: '13.5 Quick Sort (৩-জোন পিভট পার্টিশন)',
    description: 'Pivot element partitioning, 3-zone visual distribution (Left < Pivot < Right), and CPU cache locality.',
  },
  recursion: {
    category: '3. Graphs & Algorithms',
    title: '14. Recursion: Base Case & Stack Unwinding',
    description: 'Visualizing memory activation frames winding down to base conditions and returning.',
  },
  paradigms: {
    category: '3. Graphs & Algorithms',
    title: '15. The 4 Core Algorithmic Paradigms',
    description: 'Greedy approach, Divide & Conquer, Dynamic Programming memoization, and Backtracking.',
  },
  'backend-roadmap': {
    category: '4. Database & Systems',
    title: '0. Database & Systems Architecture Roadmap',
    description: 'The end-to-end sequential path from Relational Storage, Buffer Pools, Query Planners, B-Trees to Vector Databases (pgvector) and Hybrid Search.',
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
