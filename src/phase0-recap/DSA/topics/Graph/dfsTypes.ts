export interface DfsNode {
  id: string;
  x: number;
  y: number;
}

export interface DfsEdge {
  u: string;
  v: string;
}

export interface DfsStep {
  stepIndex: number;
  action: 'START' | 'VISIT' | 'EXPLORE_EDGE' | 'BACKTRACK' | 'COMPLETE';
  currentNode: string;
  targetNeighbor?: string;
  callStack: string[];
  visitedNodes: string[];
  visitedEdges: string[]; // "u-v"
  activeEdge?: string;
  title: string;
  actionTag: string;
  desc: string;
}

export const GRAPH_NODES: DfsNode[] = [
  { id: 'A', x: 120, y: 160 },
  { id: 'B', x: 260, y: 70 },
  { id: 'C', x: 260, y: 250 },
  { id: 'D', x: 400, y: 70 },
  { id: 'E', x: 400, y: 250 },
  { id: 'F', x: 540, y: 110 },
  { id: 'G', x: 540, y: 220 }
];

export const GRAPH_EDGES: DfsEdge[] = [
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
