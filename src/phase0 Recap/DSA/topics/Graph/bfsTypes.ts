export interface BfsNode {
  id: string;
  x: number;
  y: number;
}

export interface BfsEdge {
  u: string;
  v: string;
}

export interface BfsStep {
  stepIndex: number;
  action: 'START' | 'DEQUEUE' | 'ENQUEUE_NEIGHBOR' | 'ALREADY_SEEN' | 'COMPLETE';
  currentNode: string;
  targetNeighbor?: string;
  queue: string[];
  visitedNodes: string[];
  distances: Record<string, number>;
  activeEdge?: string;
  visitedEdges: string[];
  title: string;
  actionTag: string;
  desc: string;
}

export const GRAPH_NODES: BfsNode[] = [
  { id: 'A', x: 90, y: 160 },    // Level 0
  { id: 'B', x: 230, y: 70 },   // Level 1
  { id: 'C', x: 230, y: 250 },  // Level 1
  { id: 'D', x: 380, y: 70 },   // Level 2
  { id: 'E', x: 380, y: 250 },  // Level 2
  { id: 'F', x: 530, y: 110 },  // Level 3
  { id: 'G', x: 530, y: 220 }   // Level 3
];

export const GRAPH_EDGES: BfsEdge[] = [
  { u: 'A', v: 'B' },
  { u: 'A', v: 'C' },
  { u: 'B', v: 'D' },
  { u: 'B', v: 'E' },
  { u: 'C', v: 'E' },
  { u: 'D', v: 'F' },
  { u: 'E', v: 'G' },
  { u: 'F', v: 'G' }
];

export const ADJACENCY: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['E'],
  D: ['F'],
  E: ['G'],
  F: ['G'],
  G: []
};
