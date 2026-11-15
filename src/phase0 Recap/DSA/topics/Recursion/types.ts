export type RecursionMode = 'base_case' | 'backtracking' | 'fibonacci';

export interface ReturnArcInfo {
  fromN: number;
  toN: number; // -1 for final caller
  text: string;
}

export interface BaseCaseStep {
  stepIndex: number;
  n: number;
  phase: 'push' | 'base_hit' | 'pop' | 'crash';
  activeNodeN: number;
  activeCallArrowIndex: number;
  visibleReturnArcs: ReturnArcInfo[];
  stack: { n: number; state: 'waiting' | 'base' | 'returned'; val?: number }[];
  result?: number;
  title: string;
  actionTag: string;
  desc: string;
}

export interface MazeCell {
  r: number;
  c: number;
}

export interface BacktrackStep {
  stepIndex: number;
  currentPos: MazeCell;
  action: 'choose' | 'dead_end' | 'backtrack' | 'goal';
  visitedPath: MazeCell[];
  deadEnds: MazeCell[];
  callStack: string[];
  title: string;
  actionTag: string;
  desc: string;
}

export interface TreeNode {
  id: string;
  n: number;
  x: number;
  y: number;
  parentId: string | null;
  branch?: 'left' | 'right';
  isDuplicateCall: boolean;
}

export interface TreeStep {
  stepIndex: number;
  activeNodeId: string;
  callStack: { id: string; n: number; callType: string }[];
  visitedNodeStates: Record<string, 'calling' | 'base_case' | 'returned'>;
  nodeReturnValues: Record<string, number>;
  callCounts: Record<number, number>;
  currentCallN: number;
  isRedundant: boolean;
  action: 'call' | 'base_case' | 'unwind';
  title: string;
  explanation: string;
}

export interface FactNode {
  n: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

// 4x4 Maze Grid (0: path, 1: wall, 2: goal)
export const MAZE_GRID = [
  [0, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 2] // (3,3) is goal
];
