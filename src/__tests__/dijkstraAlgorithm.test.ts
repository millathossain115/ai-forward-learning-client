import { describe, it, expect } from 'vitest';
import { generateDijkstraSteps } from '@/phase0-recap/DSA/topics/Graph/utils/dijkstraAlgorithm';

describe('dijkstraAlgorithm', () => {
  it('finds the shortest path from A to F on the default weighted graph', () => {
    const steps = generateDijkstraSteps('A', 'F');
    const finalStep = steps.at(-1);
    expect(finalStep?.action).toBe('COMPLETE');
    expect(finalStep?.finalPath[0]).toBe('A');
    expect(finalStep?.finalPath.at(-1)).toBe('F');
    expect(finalStep?.distances.F).toBeLessThan(Infinity);
  });

  it('computes exact shortest distance on a custom graph', () => {
    const customAdj = {
      A: [{ node: 'B', w: 2 }, { node: 'C', w: 10 }],
      B: [{ node: 'C', w: 3 }],
      C: [{ node: 'F', w: 1 }],
      D: [],
      E: [],
      F: [],
    };
    const steps = generateDijkstraSteps('A', 'F', customAdj);
    const finalStep = steps.at(-1);
    expect(finalStep?.finalPath).toEqual(['A', 'B', 'C', 'F']);
    expect(finalStep?.distances.F).toBe(6);
  });
});
