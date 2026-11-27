import { DijkstraStep, HeapItem, ADJACENCY } from '../dijkstraTypes';

export function generateDijkstraSteps(
  startNode: string = 'A',
  targetNode: string = 'F',
  adjacency: Record<string, { node: string; w: number }[]> = ADJACENCY
): DijkstraStep[] {
  const list: DijkstraStep[] = [];
  const dist: Record<string, number> = {
    A: 0,
    B: Infinity,
    C: Infinity,
    D: Infinity,
    E: Infinity,
    F: Infinity
  };
  const prev: Record<string, string | null> = {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null
  };
  const visitedSet = new Set<string>();
  const pq: HeapItem[] = [{ node: startNode, dist: 0 }];
  const relaxedEdgeSet = new Set<string>();

  list.push({
    stepIndex: 0,
    action: 'INIT',
    currentNode: startNode,
    distances: { ...dist },
    visited: [],
    priorityQueue: [...pq],
    previous: { ...prev },
    relaxedEdges: [],
    finalPath: [],
    title: `প্রারম্ভিক অবস্থা: dist[${startNode}] = 0, বাকি সব ∞`,
    actionTag: '1. INITIALIZE',
    desc: `সোর্স নোড ${startNode}-এর দূরত্ব 0 এবং অন্য সব নোডের দূরত্ব অসীম (∞) ধরা হলো। Min-Heap প্রায়োরিটি কিউতে (${startNode}, 0) যোগ হলো।`
  });

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const { node: curr, dist: currentD } = pq.shift()!;

    if (visitedSet.has(curr)) continue;
    visitedSet.add(curr);

    list.push({
      stepIndex: list.length,
      action: 'PICK_MIN',
      currentNode: curr,
      distances: { ...dist },
      visited: Array.from(visitedSet),
      priorityQueue: [...pq],
      previous: { ...prev },
      relaxedEdges: Array.from(relaxedEdgeSet),
      finalPath: [],
      title: `Min-Heap থেকে সর্বনিম্ন নোড চয়ন ➔ ${curr} (দূরত্ব: ${currentD})`,
      actionTag: `2. PICK MIN (${curr})`,
      desc: `অবিজিটেড নোডগুলোর মধ্যে ${curr}-এর দূরত্ব সর্বনিম্ন (${currentD})। এটি ফাইনাল হলো এবং এর সংলগ্ন এজ রিল্যাক্স করা হবে।`
    });

    if (curr === targetNode) break;

    for (const edge of adjacency[curr] || []) {
      const neighbor = edge.node;
      const weight = edge.w;
      const edgeKey = `${curr}-${neighbor}`;
      const newDist = currentD + weight;

      if (newDist < dist[neighbor]) {
        const oldDist = dist[neighbor];
        dist[neighbor] = newDist;
        prev[neighbor] = curr;
        pq.push({ node: neighbor, dist: newDist });
        relaxedEdgeSet.add(edgeKey);

        list.push({
          stepIndex: list.length,
          action: 'RELAX_EDGE',
          currentNode: curr,
          targetNeighbor: neighbor,
          edgeWeight: weight,
          distances: { ...dist },
          visited: Array.from(visitedSet),
          priorityQueue: [...pq],
          previous: { ...prev },
          activeEdge: edgeKey,
          relaxedEdges: Array.from(relaxedEdgeSet),
          finalPath: [],
          title: `এজ রিল্যাক্সেশন ⚡: (${curr} ➔ ${neighbor})`,
          actionTag: '3. RELAX EDGE',
          desc: `ছোট পথ পাওয়া গেছে! ${currentD} + ${weight} = ${newDist} < ${oldDist === Infinity ? '∞' : oldDist}। dist[${neighbor}] আপডেট হলো ${newDist}-এ এবং প্যারেন্ট হলো ${curr}।`
        });
      } else {
        list.push({
          stepIndex: list.length,
          action: 'NO_RELAX',
          currentNode: curr,
          targetNeighbor: neighbor,
          edgeWeight: weight,
          distances: { ...dist },
          visited: Array.from(visitedSet),
          priorityQueue: [...pq],
          previous: { ...prev },
          activeEdge: edgeKey,
          relaxedEdges: Array.from(relaxedEdgeSet),
          finalPath: [],
          title: `রিল্যাক্সেশনের প্রয়োজন নেই: (${curr} ➔ ${neighbor})`,
          actionTag: 'KEEP CURRENT',
          desc: `বিকল্প দূরত্ব ${currentD} + ${weight} = ${newDist} বর্তমান দূরত্বের (${dist[neighbor]}) চেয়ে ছোট নয়। কোনো পরিবর্তন নেই।`
        });
      }
    }
  }

  // Reconstruct shortest path from startNode to targetNode
  const finalRoute: string[] = [];
  let p: string | null = targetNode;
  while (p) {
    finalRoute.push(p);
    p = prev[p];
  }
  finalRoute.reverse();

  list.push({
    stepIndex: list.length,
    action: 'COMPLETE',
    currentNode: targetNode,
    distances: { ...dist },
    visited: Array.from(visitedSet),
    priorityQueue: [],
    previous: { ...prev },
    relaxedEdges: Array.from(relaxedEdgeSet),
    finalPath: finalRoute,
    title: `ডাইকস্ট্রা সম্পূর্ণ! সর্বনিম্ন দূরত্ব = ${dist[targetNode]} 🎉`,
    actionTag: '✅ FINAL PATH FOUND',
    desc: `সোর্স ${startNode} থেকে গন্তব্য ${targetNode} পর্যন্ত সর্বোত্তম পথ: ${finalRoute.join(' ➔ ')}। মোট ওজন (Cost) = ${dist[targetNode]}।`
  });

  return list;
}
