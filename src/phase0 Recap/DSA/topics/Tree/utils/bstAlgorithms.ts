import { BSTNode, PositionedNode, TreeStep, MAX_TREE_DEPTH } from '../types';

export function insertIntoBST(root: BSTNode | null, val: number): BSTNode {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) root.left = insertIntoBST(root.left, val);
  else if (val > root.val) root.right = insertIntoBST(root.right, val);
  return root;
}

export function buildBST(values: number[]): BSTNode | null {
  let root: BSTNode | null = null;
  for (const v of values) {
    root = insertIntoBST(root, v);
  }
  return root;
}

export function getTreeDepth(node: BSTNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

export function layoutTree(
  root: BSTNode | null,
  width = 760,
  height = 380
): PositionedNode | null {
  if (!root) return null;

  const totalDepth = Math.max(1, getTreeDepth(root));

  // In-order traversal to calculate strictly ordered horizontal slots
  const rankMap = new Map<number, number>();
  let rank = 0;
  function inOrder(n: BSTNode | null) {
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

  function build(n: BSTNode | null, depth: number): PositionedNode | null {
    if (!n) return null;
    const r = rankMap.get(n.val) ?? 0;
    const x = totalNodes === 1 ? width / 2 : paddingX + r * stepX;
    const y = 45 + depth * stepY;
    const left = build(n.left, depth + 1);
    const right = build(n.right, depth + 1);
    return { val: n.val, x, y, depth, left, right };
  }

  return build(root, 0);
}

export interface FlattenedEdge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromVal: number;
  toVal: number;
  dir: 'left' | 'right';
}

export function flattenTree(root: PositionedNode | null): {
  nodes: PositionedNode[];
  edges: FlattenedEdge[];
} {
  const nodes: PositionedNode[] = [];
  const edges: FlattenedEdge[] = [];

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
        toVal: n.left.val,
        dir: 'left'
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
        toVal: n.right.val,
        dir: 'right'
      });
      traverse(n.right);
    }
  }

  traverse(root);
  return { nodes, edges };
}

export function generateSearchSteps(bstRoot: BSTNode | null, searchVal: number, treeLength: number): TreeStep[] {
  if (treeLength === 0 || !bstRoot) {
    return [
      {
        type: 'NOT_FOUND',
        targetVal: searchVal,
        visitedPath: [],
        action: 'search',
        explanation: 'Tree is empty. Cannot search.'
      }
    ];
  }

  const generatedSteps: TreeStep[] = [];
  const path: number[] = [];
  let curr: BSTNode | null = bstRoot;

  while (curr) {
    path.push(curr.val);
    const currVal = curr.val;

    if (searchVal === currVal) {
      generatedSteps.push({
        type: 'COMPARE',
        currNodeVal: currVal,
        targetVal: searchVal,
        visitedPath: [...path],
        action: 'search',
        explanation: `Comparing target ${searchVal} with node ${currVal}: They are equal! Value located.`
      });
      generatedSteps.push({
        type: 'FOUND',
        currNodeVal: currVal,
        targetVal: searchVal,
        visitedPath: [...path],
        action: 'search',
        explanation: `🎯 MATCH FOUND! Target ${searchVal} discovered at depth ${path.length - 1} in ${path.length} comparison(s) (O(log N)).`
      });
      break;
    } else if (searchVal < currVal) {
      generatedSteps.push({
        type: 'COMPARE',
        currNodeVal: currVal,
        targetVal: searchVal,
        visitedPath: [...path],
        action: 'search',
        explanation: `Evaluating ${searchVal} < ${currVal}: Target is SMALLER ➔ Discard right subtree and branch LEFT ↙`
      });

      if (curr.left) {
        generatedSteps.push({
          type: 'MOVE_LEFT',
          currNodeVal: curr.left.val,
          targetVal: searchVal,
          visitedPath: [...path, curr.left.val],
          activeEdge: { from: currVal, to: curr.left.val },
          action: 'search',
          explanation: `Following left branch (${currVal} ➔ ${curr.left.val}) ↙`
        });
        curr = curr.left;
      } else {
        generatedSteps.push({
          type: 'NOT_FOUND',
          currNodeVal: currVal,
          targetVal: searchVal,
          visitedPath: [...path],
          action: 'search',
          explanation: `❌ Node ${currVal} has NO left child (NULL pointer). Target ${searchVal} does not exist in BST.`
        });
        break;
      }
    } else {
      generatedSteps.push({
        type: 'COMPARE',
        currNodeVal: currVal,
        targetVal: searchVal,
        visitedPath: [...path],
        action: 'search',
        explanation: `Evaluating ${searchVal} > ${currVal}: Target is LARGER ➔ Discard left subtree and branch RIGHT ↘`
      });

      if (curr.right) {
        generatedSteps.push({
          type: 'MOVE_RIGHT',
          currNodeVal: curr.right.val,
          targetVal: searchVal,
          visitedPath: [...path, curr.right.val],
          activeEdge: { from: currVal, to: curr.right.val },
          action: 'search',
          explanation: `Following right branch (${currVal} ➔ ${curr.right.val}) ↘`
        });
        curr = curr.right;
      } else {
        generatedSteps.push({
          type: 'NOT_FOUND',
          currNodeVal: currVal,
          targetVal: searchVal,
          visitedPath: [...path],
          action: 'search',
          explanation: `❌ Node ${currVal} has NO right child (NULL pointer). Target ${searchVal} does not exist in BST.`
        });
        break;
      }
    }
  }

  return generatedSteps;
}

export function generateInsertSteps(
  bstRoot: BSTNode | null,
  treeValues: number[],
  inputVal: number
): { steps: TreeStep[]; immediateNewTree?: number[] } {
  if (treeValues.includes(inputVal)) {
    return {
      steps: [
        {
          type: 'DUPLICATE',
          targetVal: inputVal,
          visitedPath: [inputVal],
          currNodeVal: inputVal,
          action: 'insert',
          explanation: `Value ${inputVal} already exists in BST! BST requires unique keys to maintain ordering invariants.`
        }
      ]
    };
  }

  if (treeValues.length === 0) {
    const nextTree = [inputVal];
    return {
      steps: [
        {
          type: 'INSERT_SUCCESS',
          targetVal: inputVal,
          currNodeVal: inputVal,
          visitedPath: [inputVal],
          newTreeValues: nextTree,
          action: 'insert',
          explanation: `Tree was empty. Inserted ${inputVal} directly as the root node!`
        }
      ],
      immediateNewTree: nextTree
    };
  }

  // Check tree depth limitation
  const tempRoot = buildBST([...treeValues, inputVal]);
  if (getTreeDepth(tempRoot) > MAX_TREE_DEPTH) {
    return {
      steps: [
        {
          type: 'DUPLICATE',
          targetVal: inputVal,
          visitedPath: [],
          action: 'insert',
          explanation: `Insertion of ${inputVal} would exceed max visual display depth (${MAX_TREE_DEPTH} levels). Tree height is currently limited to ${MAX_TREE_DEPTH} levels.`
        }
      ]
    };
  }

  const generatedSteps: TreeStep[] = [];
  const path: number[] = [];
  let curr = bstRoot;

  while (curr) {
    path.push(curr.val);
    const currVal = curr.val;

    if (inputVal < currVal) {
      generatedSteps.push({
        type: 'COMPARE',
        currNodeVal: currVal,
        targetVal: inputVal,
        visitedPath: [...path],
        action: 'insert',
        explanation: `Comparing new value ${inputVal} < ${currVal}: Belongs in LEFT subtree ↙`
      });

      if (curr.left) {
        generatedSteps.push({
          type: 'MOVE_LEFT',
          currNodeVal: curr.left.val,
          targetVal: inputVal,
          visitedPath: [...path, curr.left.val],
          activeEdge: { from: currVal, to: curr.left.val },
          action: 'insert',
          explanation: `Navigating to left child (${currVal} ➔ ${curr.left.val}) ↙`
        });
        curr = curr.left;
      } else {
        const nextTree = [...treeValues, inputVal];
        generatedSteps.push({
          type: 'INSERT_SUCCESS',
          currNodeVal: inputVal,
          targetVal: inputVal,
          visitedPath: [...path, inputVal],
          activeEdge: { from: currVal, to: inputVal },
          newTreeValues: nextTree,
          action: 'insert',
          explanation: `🎉 Empty slot found! Attached ${inputVal} as LEFT child of ${currVal} in O(log N) comparisons.`
        });
        break;
      }
    } else {
      generatedSteps.push({
        type: 'COMPARE',
        currNodeVal: currVal,
        targetVal: inputVal,
        visitedPath: [...path],
        action: 'insert',
        explanation: `Comparing new value ${inputVal} > ${currVal}: Belongs in RIGHT subtree ↘`
      });

      if (curr.right) {
        generatedSteps.push({
          type: 'MOVE_RIGHT',
          currNodeVal: curr.right.val,
          targetVal: inputVal,
          visitedPath: [...path, curr.right.val],
          activeEdge: { from: currVal, to: curr.right.val },
          action: 'insert',
          explanation: `Navigating to right child (${currVal} ➔ ${curr.right.val}) ↘`
        });
        curr = curr.right;
      } else {
        const nextTree = [...treeValues, inputVal];
        generatedSteps.push({
          type: 'INSERT_SUCCESS',
          currNodeVal: inputVal,
          targetVal: inputVal,
          visitedPath: [...path, inputVal],
          activeEdge: { from: currVal, to: inputVal },
          newTreeValues: nextTree,
          action: 'insert',
          explanation: `🎉 Empty slot found! Attached ${inputVal} as RIGHT child of ${currVal} in O(log N) comparisons.`
        });
        break;
      }
    }
  }

  return { steps: generatedSteps };
}
