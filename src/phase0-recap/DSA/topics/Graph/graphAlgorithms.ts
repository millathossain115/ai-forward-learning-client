export enum NodeColor {
  WHITE = 0, // Unvisited
  GRAY = 1,  // Currently in recursion stack
  BLACK = 2, // Fully processed
}

export interface DFSStep {
  type: 'ENTER_NODE' | 'CHECK_NEIGHBOR' | 'CYCLE_DETECTED' | 'EXIT_NODE' | 'FINISHED';
  currentNode: string;
  targetNeighbor?: string;
  colors: Record<string, NodeColor>;
  callStack: string[];
  cyclePath?: string[];
  explanation: string;
}

export interface KahnStep {
  type: 'INIT' | 'ENQUEUE_ZERO' | 'DEQUEUE' | 'DECREMENT_EDGE' | 'COMPLETE';
  currentNode?: string;
  targetNeighbor?: string;
  inDegrees: Record<string, number>;
  queue: string[];
  topologicalOrder: string[];
  processedNodes: string[];
  explanation: string;
}

/**
 * Step generator for 3-Color DFS Cycle Detection
 */
export function* generateDfsSteps(
  nodes: string[],
  adjacency: Record<string, string[]>
): Generator<DFSStep> {
  const colors: Record<string, NodeColor> = {};
  const parent: Record<string, string | null> = {};
  const callStack: string[] = [];

  for (const n of nodes) {
    colors[n] = NodeColor.WHITE;
    parent[n] = null;
  }

  yield {
    type: 'ENTER_NODE',
    currentNode: nodes[0] || '',
    colors: { ...colors },
    callStack: [...callStack],
    explanation: 'Initialized all nodes to WHITE (unvisited). Beginning DFS traversal.',
  };

  function* dfs(node: string): Generator<DFSStep, boolean> {
    colors[node] = NodeColor.GRAY;
    callStack.push(node);

    yield {
      type: 'ENTER_NODE',
      currentNode: node,
      colors: { ...colors },
      callStack: [...callStack],
      explanation: `Visiting node "${node}". Marked GRAY (added to recursion call stack).`,
    };

    const neighbors = adjacency[node] || [];
    for (const neighbor of neighbors) {
      yield {
        type: 'CHECK_NEIGHBOR',
        currentNode: node,
        targetNeighbor: neighbor,
        colors: { ...colors },
        callStack: [...callStack],
        explanation: `Checking directed edge (${node} ➔ ${neighbor}). Neighbor state: ${
          colors[neighbor] === NodeColor.WHITE
            ? 'WHITE (Unvisited)'
            : colors[neighbor] === NodeColor.GRAY
            ? 'GRAY (Active in Stack - CYCLE FOUND!)'
            : 'BLACK (Already Processed)'
        }.`,
      };

      if (colors[neighbor] === NodeColor.GRAY) {
        // Cycle detected: reconstruct path
        const cyclePath: string[] = [neighbor];
        let curr: string | null = node;
        while (curr && curr !== neighbor) {
          cyclePath.push(curr);
          curr = parent[curr] ?? null;
        }
        cyclePath.push(neighbor);
        cyclePath.reverse();

        yield {
          type: 'CYCLE_DETECTED',
          currentNode: node,
          targetNeighbor: neighbor,
          colors: { ...colors },
          callStack: [...callStack],
          cyclePath,
          explanation: `🚨 Back-edge to active ancestor "${neighbor}" detected! Cycle: ${cyclePath.join(' ➔ ')}.`,
        };
        return true;
      }

      if (colors[neighbor] === NodeColor.WHITE) {
        parent[neighbor] = node;
        const foundCycle = yield* dfs(neighbor);
        if (foundCycle) return true;
      }
    }

    colors[node] = NodeColor.BLACK;
    callStack.pop();

    yield {
      type: 'EXIT_NODE',
      currentNode: node,
      colors: { ...colors },
      callStack: [...callStack],
      explanation: `All branches from "${node}" explored. Marked BLACK (fully processed) and popped from recursion stack.`,
    };

    return false;
  }

  for (const n of nodes) {
    if (colors[n] === NodeColor.WHITE) {
      const hasCycle = yield* dfs(n);
      if (hasCycle) return;
    }
  }

  yield {
    type: 'FINISHED',
    currentNode: '',
    colors: { ...colors },
    callStack: [],
    explanation: '✅ DFS Complete: No back-edges found. The graph is a guaranteed Directed Acyclic Graph (DAG)!',
  };
}

/**
 * Step generator for Kahn's Algorithm (Topological Sort)
 */
export function* generateKahnSteps(
  nodes: string[],
  adjacency: Record<string, string[]>
): Generator<KahnStep> {
  const inDegrees: Record<string, number> = {};
  for (const n of nodes) inDegrees[n] = 0;

  for (const u of nodes) {
    for (const v of adjacency[u] || []) {
      inDegrees[v] = (inDegrees[v] || 0) + 1;
    }
  }

  yield {
    type: 'INIT',
    inDegrees: { ...inDegrees },
    queue: [],
    topologicalOrder: [],
    processedNodes: [],
    explanation: "Computed in-degrees for all nodes (in-degree = number of incoming prerequisite edges).",
  };

  const queue: string[] = nodes.filter((n) => inDegrees[n] === 0);
  yield {
    type: 'ENQUEUE_ZERO',
    inDegrees: { ...inDegrees },
    queue: [...queue],
    topologicalOrder: [],
    processedNodes: [],
    explanation: `Found initial source nodes with in-degree = 0: [${queue.join(', ')}]. Pushed to execution queue.`,
  };

  const topologicalOrder: string[] = [];
  const processedNodes: string[] = [];

  while (queue.length > 0) {
    const curr = queue.shift()!;
    topologicalOrder.push(curr);
    processedNodes.push(curr);

    yield {
      type: 'DEQUEUE',
      currentNode: curr,
      inDegrees: { ...inDegrees },
      queue: [...queue],
      topologicalOrder: [...topologicalOrder],
      processedNodes: [...processedNodes],
      explanation: `Dequeued ready task "${curr}". Added to topological order. Removing its outgoing edges.`,
    };

    for (const downstream of adjacency[curr] || []) {
      inDegrees[downstream] -= 1;
      const becameZero = inDegrees[downstream] === 0;

      yield {
        type: 'DECREMENT_EDGE',
        currentNode: curr,
        targetNeighbor: downstream,
        inDegrees: { ...inDegrees },
        queue: [...queue],
        topologicalOrder: [...topologicalOrder],
        processedNodes: [...processedNodes],
        explanation: `Decremented in-degree of downstream task "${downstream}" to ${inDegrees[downstream]}.${
          becameZero ? ' In-degree reached 0! Ready to execute.' : ''
        }`,
      };

      if (becameZero) {
        queue.push(downstream);
        yield {
          type: 'ENQUEUE_ZERO',
          currentNode: downstream,
          inDegrees: { ...inDegrees },
          queue: [...queue],
          topologicalOrder: [...topologicalOrder],
          processedNodes: [...processedNodes],
          explanation: `Pushed "${downstream}" into execution queue (all prerequisites met).`,
        };
      }
    }
  }

  const isDag = topologicalOrder.length === nodes.length;
  yield {
    type: 'COMPLETE',
    inDegrees: { ...inDegrees },
    queue: [],
    topologicalOrder: [...topologicalOrder],
    processedNodes: [...processedNodes],
    explanation: isDag
      ? `🎉 Kahn's Topological Sort Complete! Linear execution order: ${topologicalOrder.join(' ➔ ')}.`
      : `⚠️ Only ${topologicalOrder.length}/${nodes.length} nodes resolved. Graph contains an unresolved cycle!`,
  };
}

