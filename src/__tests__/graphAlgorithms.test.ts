import { describe, it, expect } from 'vitest';
import {
  generateDfsSteps,
  generateKahnSteps,
} from '@/phase0-recap/DSA/topics/Graph/graphAlgorithms';

describe('graphAlgorithms', () => {
  it('detects cycles with 3-color DFS', () => {
    const nodes = ['A', 'B', 'C'];
    const cyclicAdj = {
      A: ['B'],
      B: ['C'],
      C: ['A'],
    };
    const steps = Array.from(generateDfsSteps(nodes, cyclicAdj));
    const cycleStep = steps.find((s) => s.type === 'CYCLE_DETECTED');
    expect(cycleStep).toBeDefined();
    expect(cycleStep?.cyclePath).toEqual(['A', 'B', 'C', 'A']);
  });

  it('completes DFS without cycle on a DAG', () => {
    const nodes = ['A', 'B', 'C'];
    const dagAdj = {
      A: ['B', 'C'],
      B: ['C'],
      C: [],
    };
    const steps = Array.from(generateDfsSteps(nodes, dagAdj));
    expect(steps.some((s) => s.type === 'CYCLE_DETECTED')).toBe(false);
    expect(steps.at(-1)?.type).toBe('FINISHED');
  });

  it("computes valid topological order with Kahn's algorithm", () => {
    const nodes = ['A', 'B', 'C', 'D'];
    const dagAdj = {
      A: ['B', 'C'],
      B: ['D'],
      C: ['D'],
      D: [],
    };
    const steps = Array.from(generateKahnSteps(nodes, dagAdj));
    const last = steps.at(-1);
    expect(last?.type).toBe('COMPLETE');
    expect(last?.topologicalOrder).toHaveLength(4);
    expect(last?.topologicalOrder[0]).toBe('A');
    expect(last?.topologicalOrder[3]).toBe('D');
  });
});
