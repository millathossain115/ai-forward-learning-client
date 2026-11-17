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
  'backend-basics': {
    category: '4. Database & Systems',
    title: '0. Database 101: Zero to Hero',
    description: 'Relational database fundamentals: University scenario, tables, rows/tuples, columns/attributes, keys (PK, FK, Candidate, Composite), relationships (1:1, 1:N, M:N), constraints, indexes, views, and Database vs DBMS.',
  },
  'backend-lesson1': {
    category: '4. Database & Systems',
    title: '1. Lesson 1: Understanding Data, Information, Database, and DBMS',
    description: 'Beginner level • Lesson 1 of your DBMS journey. Start from absolute zero: What is Data, Information, Database, DBMS, University scenario, Mobile banking balance simulation flow, and Summary matrix.',
  },
  'backend-lesson2': {
    category: '4. Database & Systems',
    title: '2. Lesson 2: Types of Databases and Database Models',
    description: 'Beginner level • Lesson 2: Why different databases exist, blueprint concepts, 6 models (Flat File, Hierarchical, Network, Relational, Object-Oriented, NoSQL), comparison matrix, and key exam questions.',
  },
  'backend-lesson3': {
    category: '4. Database & Systems',
    title: '3. Lesson 3: Introduction to Relational Databases',
    description: 'Beginner level • Lesson 3: What is a relation, tuple, attribute, domain validator, relational schema vs instance, degree, cardinality, NULL values, and 7 core relational properties.',
  },
  'backend-lesson4': {
    category: '4. Database & Systems',
    title: '4. Lesson 4: Keys in DBMS – Complete Beginner\'s Guide',
    description: 'Beginner level • Lesson 4: Why keys are essential, 8 key types (Super, Candidate, Primary, Alternate, Foreign, Composite, Unique, Natural vs Surrogate), referential integrity tester, and exam prep.',
  },
  'backend-lesson5': {
    category: '4. Database & Systems',
    title: '5. Lesson 5: Entity Relationship (ER) Model',
    description: 'Beginner level • University exam prep: Entities, attributes (simple, composite, multivalued, derived), relationships, degree, cardinality (1:1, 1:N, M:N), participation constraints, strong vs weak entities, and ER-to-table conversion.',
  },
  'backend-lesson6': {
    category: '4. Database & Systems',
    title: '6. Lesson 6: Introduction to SQL (Structured Query Language)',
    description: 'Beginner level • University exam prep: DDL, DML, DQL, DCL, TCL, table creation, constraints, WHERE filtering, operators, ORDER BY, aggregate functions, GROUP BY, HAVING, and SQL joins.',
  },
  'backend-lesson7': {
    category: '4. Database & Systems',
    title: '7. Lesson 7: Advanced SQL Queries',
    description: 'Intermediate level • University exam prep: Subqueries, correlated subqueries, IN/EXISTS, ANY/ALL, Common Table Expressions (CTEs), set operations (UNION, INTERSECT, EXCEPT), window functions (ROW_NUMBER, RANK, DENSE_RANK), and relational division.',
  },
  'backend-lesson8': {
    category: '4. Database & Systems',
    title: '8. Lesson 8: Database Normalization',
    description: 'Beginner to University Exam Level: Database normalization, data redundancy and consistency, insertion/update/deletion anomalies, functional dependencies (trivial, full, partial, transitive), 1NF, 2NF, 3NF, BCNF, and normalized SQL schemas.',
  },
  'backend-lesson9': {
    category: '4. Database & Systems',
    title: '9. Lesson 9: Database Transactions & Concurrency Control',
    description: 'Beginner to University Exam Level: Database transactions, ACID properties, transaction lifecycle, lost update, dirty read, unrepeatable read, phantom read, conflict serializability, Two-Phase Locking (2PL), deadlock Coffman conditions, isolation levels, and Write-Ahead Log recovery.',
  },
  'backend-lesson10': {
    category: '4. Database & Systems',
    title: '10. Lesson 10: Database Indexing & Query Optimization',
    description: 'Beginner to University Exam Level: Full table scan vs index lookup, primary vs secondary, clustered vs non-clustered, dense vs sparse, B-Tree vs B+ Tree, hash indexing, 5-stage query processing engine, EXPLAIN plans, and 10 query optimization rules.',
  },
  'backend-lesson11': {
    category: '4. Database & Systems',
    title: '11. Lesson 11: Database Security, Authorization, Backup & Recovery',
    description: 'Beginner to University Exam Level: Confidentiality, Integrity, Availability (CIA Triad), Authentication vs Authorization, RBAC, Least Privilege, SQL GRANT and REVOKE, SQL injection prevention, Full/Incremental/Differential backups, Transaction/System/Media failures, UNDO & REDO, WAL, Checkpoints, PITR, Disaster Recovery (RPO & RTO), 3-2-1 backup rule, and interactive MCQ test.',
  },
  'backend-lesson12': {
    category: '4. Database & Systems',
    title: '12. Lesson 12: Distributed Databases & Distributed DBMS',
    description: 'Beginner to University Exam Level: Distributed databases and DDBMS, Centralized vs Distributed, Client-Server vs Peer-to-Peer vs Three-Tier architectures, Homogeneous vs Heterogeneous systems, 4 Distribution Transparencies, Horizontal/Vertical/Hybrid Fragmentation, Data Replication & Allocation, Two-Phase Commit (2PC), Brewer’s CAP Theorem, and Strong vs Eventual Consistency.',
  },
  'backend-roadmap': {
    category: '4. Database & Systems',
    title: '13. Database & Systems Architecture Roadmap',
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
