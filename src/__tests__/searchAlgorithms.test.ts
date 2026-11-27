import { describe, it, expect } from 'vitest';
import {
  generateBinarySteps,
  generateLinearSteps,
} from '@/phase0-recap/DSA/topics/Searching/utils/searchAlgorithms';

describe('searchAlgorithms', () => {
  const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

  it('finds an existing target with binary search', () => {
    const steps = generateBinarySteps(sorted, 23);
    const last = steps.at(-1);
    expect(last?.action).toBe('found');
    expect(last?.mid).toBe(5);
  });

  it('reports not_found when target is missing in binary search', () => {
    const steps = generateBinarySteps(sorted, 40);
    expect(steps.at(-1)?.action).toBe('not_found');
  });

  it('finds an existing target with linear search', () => {
    const steps = generateLinearSteps(sorted, 16);
    const last = steps.at(-1);
    expect(last?.action).toBe('found');
    expect(last?.currIndex).toBe(4);
  });

  it('reports not_found when target is missing in linear search', () => {
    const steps = generateLinearSteps(sorted, 999);
    expect(steps.at(-1)?.action).toBe('not_found');
  });
});
