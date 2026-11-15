import {
  AVLNode,
  RBNode,
  NodeColor,
  PositionedNode
} from '../types';

export function getHeight(node: AVLNode | null): number {
  return node ? node.height : 0;
}

export function getBalanceFactor(node: AVLNode | null): number {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

export function rightRotate(y: AVLNode): AVLNode {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  return x;
}

export function leftRotate(x: AVLNode): AVLNode {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  return y;
}

export function insertAVL(node: AVLNode | null, val: number): AVLNode {
  if (!node) return { val, height: 1, left: null, right: null };
  if (val < node.val) node.left = insertAVL(node.left, val);
  else if (val > node.val) node.right = insertAVL(node.right, val);
  else return node; // duplicates not inserted

  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const bf = getBalanceFactor(node);

  // LL Case
  if (bf > 1 && val < (node.left?.val ?? 0)) {
    return rightRotate(node);
  }
  // RR Case
  if (bf < -1 && val > (node.right?.val ?? 0)) {
    return leftRotate(node);
  }
  // LR Case
  if (bf > 1 && val > (node.left?.val ?? 0)) {
    node.left = leftRotate(node.left!);
    return rightRotate(node);
  }
  // RL Case
  if (bf < -1 && val < (node.right?.val ?? 0)) {
    node.right = rightRotate(node.right!);
    return leftRotate(node);
  }

  return node;
}

export function buildAVL(values: number[]): AVLNode | null {
  let root: AVLNode | null = null;
  for (const v of values) {
    root = insertAVL(root, v);
  }
  return root;
}

export function getTreeDepth(node: AVLNode | RBNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

// Layout AVL Tree nodes onto Canvas
export function layoutAVLNode(
  root: AVLNode | null,
  width = 760,
  height = 360
): PositionedNode | null {
  if (!root) return null;
  const totalDepth = Math.max(1, getTreeDepth(root));

  const rankMap = new Map<number, number>();
  let rank = 0;
  function inOrder(n: AVLNode | null) {
    if (!n) return;
    inOrder(n.left);
    rankMap.set(n.val, rank++);
    inOrder(n.right);
  }
  inOrder(root);

  const totalNodes = rank;
  const paddingX = Math.max(45, Math.min(80, width / (totalNodes + 1)));
  const stepX = totalNodes > 1 ? (width - 2 * paddingX) / (totalNodes - 1) : 0;
  const stepY = totalDepth > 1 ? (height - 90) / (totalDepth - 1) : 0;

  function build(n: AVLNode | null, depth: number): PositionedNode | null {
    if (!n) return null;
    const r = rankMap.get(n.val) ?? 0;
    const x = totalNodes === 1 ? width / 2 : paddingX + r * stepX;
    const y = 45 + depth * stepY;
    const bf = getBalanceFactor(n);
    const left = build(n.left, depth + 1);
    const right = build(n.right, depth + 1);
    return { val: n.val, x, y, depth, bf, left, right };
  }

  return build(root, 0);
}

// Layout Red-Black Tree nodes
export function buildRBTree(values: number[]): RBNode | null {
  const avlRoot = buildAVL(values);
  if (!avlRoot) return null;

  function convert(n: AVLNode | null, isRoot = false): RBNode | null {
    if (!n) return null;
    const color: NodeColor = isRoot ? 'BLACK' : (n.height % 2 === 0 ? 'RED' : 'BLACK');
    return {
      val: n.val,
      color,
      left: convert(n.left, false),
      right: convert(n.right, false)
    };
  }

  return convert(avlRoot, true);
}

export function layoutRBNode(
  root: RBNode | null,
  width = 760,
  height = 360
): PositionedNode | null {
  if (!root) return null;
  const totalDepth = Math.max(1, getTreeDepth(root));

  const rankMap = new Map<number, number>();
  let rank = 0;
  function inOrder(n: RBNode | null) {
    if (!n) return;
    inOrder(n.left);
    rankMap.set(n.val, rank++);
    inOrder(n.right);
  }
  inOrder(root);

  const totalNodes = rank;
  const paddingX = Math.max(45, Math.min(80, width / (totalNodes + 1)));
  const stepX = totalNodes > 1 ? (width - 2 * paddingX) / (totalNodes - 1) : 0;
  const stepY = totalDepth > 1 ? (height - 90) / (totalDepth - 1) : 0;

  function build(n: RBNode | null, depth: number): PositionedNode | null {
    if (!n) return null;
    const r = rankMap.get(n.val) ?? 0;
    const x = totalNodes === 1 ? width / 2 : paddingX + r * stepX;
    const y = 45 + depth * stepY;
    const left = build(n.left, depth + 1);
    const right = build(n.right, depth + 1);
    return { val: n.val, x, y, depth, color: n.color, left, right };
  }

  return build(root, 0);
}

export function flattenTree(root: PositionedNode | null) {
  const nodes: PositionedNode[] = [];
  const edges: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    fromVal: number;
    toVal: number;
  }[] = [];

  function traverse(n: PositionedNode | null) {
    if (!n) return;
    nodes.push(n);
    if (n.left) {
      edges.push({
        fromX: n.x,
        fromY: n.y,
        toX: n.left.x,
        toY: n.left.y,
        fromVal: n.val,
        toVal: n.left.val
      });
      traverse(n.left);
    }
    if (n.right) {
      edges.push({
        fromX: n.x,
        fromY: n.y,
        toX: n.right.x,
        toY: n.right.y,
        fromVal: n.val,
        toVal: n.right.val
      });
      traverse(n.right);
    }
  }

  traverse(root);
  return { nodes, edges };
}
