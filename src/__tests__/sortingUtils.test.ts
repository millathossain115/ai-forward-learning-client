import { describe, it, expect } from 'vitest';
import { buildTreeStructure } from '@/phase0-recap/DSA/topics/Sorting/utils/mergeSortUtils';
import { generateBarTrace } from '@/phase0-recap/DSA/topics/Sorting/utils/quickSortUtils';

describe('sortingUtils', () => {
  it('merges an 8-element array into sorted order in buildTreeStructure', () => {
    const tree = buildTreeStructure([38, 27, 43, 3, 9, 82, 10, 19]);
    expect(tree.r6[0]).toEqual([3, 9, 10, 19, 27, 38, 43, 82]);
  });

  it('sorts an array completely in quickSort generateBarTrace', () => {
    const trace = generateBarTrace([20, 2, 9, 7, 12, 15, 1, 6, 8]);
    const last = trace.at(-1);
    expect(last?.arr).toEqual([1, 2, 6, 7, 8, 9, 12, 15, 20]);
  });
});
