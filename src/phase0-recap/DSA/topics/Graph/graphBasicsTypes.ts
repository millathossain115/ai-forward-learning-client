export type GraphType = 'undirected' | 'directed' | 'weighted';

export interface DefinitionEdge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
}

export interface DefinitionVertex {
  id: string;
  x: number;
  y: number;
  label: string;
}

export const DEFINITION_EDGES: DefinitionEdge[] = [
  { x1: 90, y1: 60, x2: 290, y2: 60, id: 'e1', label: 'Edge 1' },
  { x1: 290, y1: 60, x2: 290, y2: 180, id: 'e2', label: 'Edge 2' },
  { x1: 290, y1: 180, x2: 90, y2: 180, id: 'e3', label: 'Edge 3' },
  { x1: 90, y1: 180, x2: 90, y2: 60, id: 'e4', label: 'Edge 4' },
  { x1: 90, y1: 60, x2: 290, y2: 180, id: 'e5', label: 'Diagonal Edge' },
];

export const DEFINITION_VERTICES: DefinitionVertex[] = [
  { id: 'V1', x: 90, y: 60, label: 'V1' },
  { id: 'V2', x: 290, y: 60, label: 'V2' },
  { id: 'V3', x: 290, y: 180, label: 'V3' },
  { id: 'V4', x: 90, y: 180, label: 'V4' },
];

export const UNDIRECTED_EDGES = [
  { from: 'A', to: 'B', x1: 90, y1: 70, x2: 210, y2: 70 },
  { from: 'B', to: 'C', x1: 210, y1: 70, x2: 330, y2: 70 },
  { from: 'B', to: 'D', x1: 210, y1: 70, x2: 210, y2: 190 },
  { from: 'A', to: 'D', x1: 90, y1: 70, x2: 210, y2: 190 },
  { from: 'C', to: 'D', x1: 330, y1: 70, x2: 210, y2: 190 },
];

export const DIRECTED_EDGES = [
  { from: 'A', to: 'B', x1: 90, y1: 70, x2: 210, y2: 70 },
  { from: 'B', to: 'C', x1: 210, y1: 70, x2: 330, y2: 70 },
  { from: 'B', to: 'D', x1: 210, y1: 70, x2: 210, y2: 190 },
  { from: 'D', to: 'A', x1: 210, y1: 190, x2: 90, y2: 70 },
  { from: 'C', to: 'D', x1: 330, y1: 70, x2: 210, y2: 190 },
];

export const WEIGHTED_EDGES = [
  { from: 'A', to: 'B', weight: 4, x1: 90, y1: 70, x2: 210, y2: 70, midX: 150, midY: 60 },
  { from: 'B', to: 'C', weight: 2, x1: 210, y1: 70, x2: 330, y2: 70, midX: 270, midY: 60 },
  { from: 'B', to: 'D', weight: 5, x1: 210, y1: 70, x2: 210, y2: 190, midX: 220, midY: 130 },
  { from: 'A', to: 'D', weight: 8, x1: 90, y1: 70, x2: 210, y2: 190, midX: 140, midY: 145 },
  { from: 'C', to: 'D', weight: 3, x1: 330, y1: 70, x2: 210, y2: 190, midX: 280, midY: 145 },
];

export const GRAPH_NODES = [
  { id: 'A', label: 'A (User 1)', x: 90, y: 70 },
  { id: 'B', label: 'B (User 2)', x: 210, y: 70 },
  { id: 'C', label: 'C (User 3)', x: 330, y: 70 },
  { id: 'D', label: 'D (User 4)', x: 210, y: 190 },
];
