# 🚀 AI Engineering Interactive Roadmap & Systems Platform

An interactive visual platform covering the end-to-end journey from **Algorithmic Foundations (DSA)** $\rightarrow$ **Database & Systems Architecture** $\rightarrow$ **Vector Databases, LLMs, RAG, MCP, and Autonomous Agents**.

Built as a zero-dependency, high-performance, 100% client-side React SPA.

---

## 🗺️ Complete Roadmap Curriculum

### Phase 0 • Foundations & Computational Thinking (DSA)
- **1. Linear Data Structures**:
  - `Array`: Memory pointer arithmetic ($Base + i \times Size$), cache locality, and element shifting.
  - `Linked List`: Singly, Doubly, and Circular pointer-chaining animations with zero-shifting insertion.
  - `Stack (LIFO)`: Execution call stack frames, undo buffers, and parser stacks.
  - `Queue (FIFO)`: Ring buffer mechanics, event loops, and asynchronous message queues.
- **2. Fast Access & Hierarchies**:
  - `Priority Queue & Binary Heap`: Min/Max Heap rebalancing, sift-up, and sift-down operations.
  - `Hash Table`: Hash functions, modulo arrays, and separate chaining collision resolution.
  - `Binary Search Tree (BST)`: Dynamic SVG tree layout with step-by-step traversal, branch decisions ($<, >$), and subtree pruning.
  - `Trie (Prefix Tree)`: Character token prefix routing and autocomplete trees.
- **3. Graphs & Algorithms**:
  - `Graphs & DAGs`: 3-Color DFS cycle detection and Kahn's topological sort for dependency resolution.
  - `Searching`: Sequential scan vs Binary Search split race with comparisons counter.
  - `Sorting`: Interactive animated bar race (Bubble Sort, Insertion Sort, Quick Sort).
  - `Recursion`: Call stack activation frames winding down to base conditions.
  - `Algorithmic Paradigms`: Greedy, Divide & Conquer, Dynamic Programming, and Backtracking.

### Phase 1 • Database Internals & Systems Engineering
- `SQL & Query Planner`: Interactive query plan analysis comparing full table scans against composite B-Tree indexes.
- `B-Tree Indexing`: Latency drops and composite index selectivity on high-throughput workloads.
- `pgvector & High-Dimensional Vectors`: IVFFlat vs HNSW indexing for storing and querying vector embeddings in PostgreSQL.

### Phase 2 • Forward AI Engineering (LLMs, RAG, MCP, Agents)
- `LLM APIs & Token Streaming`: Structured JSON outputs, function calling, temperature tuning, and Server-Sent Events (SSE).
- `RAG (Retrieval Augmented Generation)`: Semantic chunking, dense vector retrieval, hybrid BM25 search, and cross-encoder rerankers.
- `Model Context Protocol (MCP)`: Custom MCP tools and resource servers connecting LLMs to databases and local environments.
- `Autonomous AI Agents & Workflows`: ReAct loops, LangGraph stateful DAGs, human-in-the-loop validation, and memory persistence.
- `Evaluation & Observability`: Faithfulness, answer relevance metrics, latency tracking, and regression harnesses.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (Turbopack) & React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Graph Visualizer**: [@xyflow/react](https://reactflow.dev)
- **Icons**: [Lucide React](https://lucide.dev)
- **Language**: TypeScript 5

---

## ⚡ Quickstart

```bash
# 1. Clone repository
git clone https://github.com/<your-username>/ai-engineering-roadmap.git
cd ai-engineering-roadmap

# 2. Install dependencies
npm install

# 3. Start local development
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Static Production Build

```bash
npm run build
```

Client-only architecture: deploy directly to **Vercel**, **GitHub Pages**, **Netlify**, or **Cloudflare Pages** without needing a backend server.
