import { describe, it, expect } from 'vitest';
import {
  buildBST,
  insertIntoBST,
  getTreeDepth,
  layoutTree,
  flattenTree,
  generateSearchSteps,
} from '@/phase0-recap/DSA/topics/Tree/utils/bstAlgorithms';

describe('bstAlgorithms', () => {
  it('builds a BST preserving binary search tree ordering', () => {
    const root = buildBST([10, 5, 15, 3, 7, 12, 18]);
    expect(root?.val).toBe(10);
    expect(root?.left?.val).toBe(5);
    expect(root?.right?.val).toBe(15);
    expect(root?.left?.left?.val).toBe(3);
    expect(root?.left?.right?.val).toBe(7);
    expect(getTreeDepth(root)).toBe(3);
  });

  it('ignores duplicate insertions', () => {
    const root = buildBST([10, 5, 10]);
    const updated = insertIntoBST(root, 5);
    expect(updated.left?.left).toBeNull();
    expect(updated.left?.right).toBeNull();
  });

  it('lays out and flattens tree nodes and edges', () => {
    const root = buildBST([10, 5, 15]);
    const positioned = layoutTree(root, 600, 300);
    const { nodes, edges } = flattenTree(positioned);
    expect(nodes).toHaveLength(3);
    expect(edges).toHaveLength(2);
    expect(edges.map((e) => e.dir).sort()).toEqual(['left', 'right']);
  });

  it('generates search steps for found and not-found targets', () => {
    const root = buildBST([10, 5, 15, 3]);
    const foundSteps = generateSearchSteps(root, 3, 4);
    expect(foundSteps.at(-1)?.type).toBe('FOUND');

    const missingSteps = generateSearchSteps(root, 99, 4);
    expect(missingSteps.at(-1)?.type).toBe('NOT_FOUND');

    const emptySteps = generateSearchSteps(null, 10, 0);
    expect(emptySteps).toHaveLength(1);
    expect(emptySteps[0].type).toBe('NOT_FOUND');
  });
});
