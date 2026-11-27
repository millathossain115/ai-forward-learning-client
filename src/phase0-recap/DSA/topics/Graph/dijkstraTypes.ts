export interface WeightedNode {
  id: string;
  x: number;
  y: number;
}

export interface WeightedEdge {
  u: string;
  v: string;
  w: number;
}

export interface HeapItem {
  node: string;
  dist: number;
}

export interface DijkstraStep {
  stepIndex: number;
  action: 'INIT' | 'PICK_MIN' | 'RELAX_EDGE' | 'NO_RELAX' | 'COMPLETE';
  currentNode: string;
  targetNeighbor?: string;
  edgeWeight?: number;
  distances: Record<string, number>;
  visited: string[];
  priorityQueue: HeapItem[];
  previous: Record<string, string | null>;
  activeEdge?: string;
  relaxedEdges: string[];
  finalPath: string[];
  title: string;
  actionTag: string;
  desc: string;
}

export const GRAPH_NODES: WeightedNode[] = [
  { id: 'A', x: 100, y: 160 },
  { id: 'B', x: 250, y: 70 },
  { id: 'C', x: 250, y: 250 },
  { id: 'D', x: 420, y: 70 },
  { id: 'E', x: 420, y: 250 },
  { id: 'F', x: 570, y: 160 }
];

export const GRAPH_EDGES: WeightedEdge[] = [
  { u: 'A', v: 'B', w: 4 },
  { u: 'A', v: 'C', w: 2 },
  { u: 'C', v: 'B', w: 1 },
  { u: 'B', v: 'D', w: 5 },
  { u: 'C', v: 'D', w: 8 },
  { u: 'C', v: 'E', w: 10 },
  { u: 'D', v: 'E', w: 2 },
  { u: 'D', v: 'F', w: 6 },
  { u: 'E', v: 'F', w: 3 }
];

export const ADJACENCY: Record<string, { node: string; w: number }[]> = {
  A: [{ node: 'C', w: 2 }, { node: 'B', w: 4 }],
  B: [{ node: 'D', w: 5 }],
  C: [{ node: 'B', w: 1 }, { node: 'D', w: 8 }, { node: 'E', w: 10 }],
  D: [{ node: 'E', w: 2 }, { node: 'F', w: 6 }],
  E: [{ node: 'F', w: 3 }],
  F: []
};
