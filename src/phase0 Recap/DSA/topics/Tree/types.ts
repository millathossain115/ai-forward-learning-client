export interface BSTNode {
  val: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export interface PositionedNode {
  val: number;
  x: number;
  y: number;
  depth: number;
  left: PositionedNode | null;
  right: PositionedNode | null;
}

export interface TreeStep {
  type: 'COMPARE' | 'MOVE_LEFT' | 'MOVE_RIGHT' | 'FOUND' | 'NOT_FOUND' | 'INSERT_SUCCESS' | 'DUPLICATE' | 'IDLE';
  currNodeVal?: number;
  targetVal: number;
  visitedPath: number[];
  activeEdge?: { from: number; to: number };
  newTreeValues?: number[];
  action: 'insert' | 'search';
  explanation: string;
}

export const MAX_TREE_DEPTH = 8;
export const DEFAULT_TREE = [50, 30, 70, 20, 40, 60, 85];
