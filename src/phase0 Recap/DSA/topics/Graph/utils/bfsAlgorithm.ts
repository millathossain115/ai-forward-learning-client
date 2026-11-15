import { BfsStep, ADJACENCY } from '../bfsTypes';

export function generateBfsSteps(
  startNode: string = 'A',
  adjacency: Record<string, string[]> = ADJACENCY
): BfsStep[] {
  const list: BfsStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [];
  const distances: Record<string, number> = {};
  const traversedEdges: string[] = [];

  // Step 0: Start node
  visited.add(startNode);
  queue.push(startNode);
  distances[startNode] = 0;

  list.push({
    stepIndex: 0,
    action: 'START',
    currentNode: startNode,
    queue: [...queue],
    visitedNodes: Array.from(visited),
    distances: { ...distances },
    visitedEdges: [],
    title: `শুরু: সোর্স নোড ${startNode} কিউতে এনকিউ (Level 0)`,
    actionTag: `1. ENQUEUE ${startNode}`,
    desc: `BFS শুরু হলো নোড ${startNode} থেকে। FIFO কিউতে ${startNode} যোগ করা হলো এবং এর দূরত্ব dist[${startNode}] = 0 নির্ধারণ করা হলো।`
  });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    const currDist = distances[curr];

    list.push({
      stepIndex: list.length,
      action: 'DEQUEUE',
      currentNode: curr,
      queue: [...queue],
      visitedNodes: Array.from(visited),
      distances: { ...distances },
      visitedEdges: [...traversedEdges],
      title: `কিউ থেকে ডিকিউ ➔ নোড ${curr} (দূরত্ব: ${currDist})`,
      actionTag: `2. DEQUEUE ${curr}`,
      desc: `কিউয়ের সামনে থাকা নোড ${curr} প্রসেস করার জন্য বের করা হলো। এবার এর সংলগ্ন প্রতিবেশীদের দেখা হবে।`
    });

    const neighbors = adjacency[curr] || [];
    for (const neighbor of neighbors) {
      const edgeKey = `${curr}-${neighbor}`;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances[neighbor] = currDist + 1;
        queue.push(neighbor);
        traversedEdges.push(edgeKey);

        list.push({
          stepIndex: list.length,
          action: 'ENQUEUE_NEIGHBOR',
          currentNode: curr,
          targetNeighbor: neighbor,
          queue: [...queue],
          visitedNodes: Array.from(visited),
          distances: { ...distances },
          activeEdge: edgeKey,
          visitedEdges: [...traversedEdges],
          title: `নতুন প্রতিবেশী এনকিউ ➔ ${neighbor} (Level ${currDist + 1})`,
          actionTag: `3. ENQUEUE ${neighbor}`,
          desc: `নোড ${neighbor} প্রথমবার দেখা গেল। এটি কিউয়ের পেছনে রাখা হলো এবং সর্বনিম্ন হপ দূরত্ব dist[${neighbor}] = ${currDist + 1} সেট হলো।`
        });
      } else {
        list.push({
          stepIndex: list.length,
          action: 'ALREADY_SEEN',
          currentNode: curr,
          targetNeighbor: neighbor,
          queue: [...queue],
          visitedNodes: Array.from(visited),
          distances: { ...distances },
          activeEdge: edgeKey,
          visitedEdges: [...traversedEdges],
          title: `ইতিমধ্যে দেখা হয়েছে ➔ নোড ${neighbor}`,
          actionTag: 'ALREADY VISITED',
          desc: `নোড ${neighbor} পূর্বের কোনো লেভেলে আগেই কিউতে যোগ করা হয়েছে। তাই বাদ দেওয়া হলো।`
        });
      }
    }
  }

  list.push({
    stepIndex: list.length,
    action: 'COMPLETE',
    currentNode: '',
    queue: [],
    visitedNodes: Array.from(visited),
    distances: { ...distances },
    visitedEdges: [...traversedEdges],
    title: 'BFS ট্রাভার্সাল সম্পূর্ণ! 🎉',
    actionTag: '✅ COMPLETE',
    desc: `কিউ শূন্য হয়েছে। সোর্স ${startNode} থেকে প্রতিটি নোডের সর্বনিম্ন হপ দূরত্ব হিসাব করা সম্পন্ন হয়েছে।`
  });

  return list;
}
