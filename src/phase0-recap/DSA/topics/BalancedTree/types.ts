export interface AVLNode {
  val: number;
  height: number;
  left: AVLNode | null;
  right: AVLNode | null;
}

export type NodeColor = 'RED' | 'BLACK';

export interface RBNode {
  val: number;
  color: NodeColor;
  left: RBNode | null;
  right: RBNode | null;
}

export interface PositionedNode {
  val: number;
  x: number;
  y: number;
  depth: number;
  bf?: number; // Balance Factor for AVL
  color?: NodeColor; // Color for Red-Black
  left: PositionedNode | null;
  right: PositionedNode | null;
}

export interface TreeStep {
  title: string;
  explanation: string;
  treeValues: number[];
  activeNodeVal?: number;
  highlightedEdge?: { from: number; to: number };
  rotationType?: 'LL' | 'RR' | 'LR' | 'RL' | 'RECOLOR' | 'NONE';
}
