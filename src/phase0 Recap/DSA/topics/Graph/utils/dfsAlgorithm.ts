import { DfsStep, ADJACENCY } from '../dfsTypes';

export function generateDfsTopicSteps(
  startNode: string = 'A',
  adjacency: Record<string, string[]> = ADJACENCY
): DfsStep[] {
  const list: DfsStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [];
  const traversedEdges = new Set<string>();

  list.push({
    stepIndex: 0,
    action: 'START',
    currentNode: startNode,
    callStack: [startNode],
    visitedNodes: [startNode],
    visitedEdges: [],
    title: `শুরু: সোর্স নোড ${startNode} তে DFS শুরু`,
    actionTag: `1. START DFS(${startNode})`,
    desc: `DFS শুরু হলো নোড ${startNode} থেকে। ${startNode} নোডটি কল স্ট্যাকে (Call Stack) পুশ করা হলো এবং ভিজিটেড হিসেবে চিহ্নিত হলো।`
  });
  visited.add(startNode);
  stack.push(startNode);

  function dfs(node: string) {
    const neighbors = adjacency[node] || [];
    for (const neighbor of neighbors) {
      const edgeKey = `${node}-${neighbor}`;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
        traversedEdges.add(edgeKey);

        list.push({
          stepIndex: list.length,
          action: 'VISIT',
          currentNode: neighbor,
          targetNeighbor: neighbor,
          callStack: [...stack],
          visitedNodes: Array.from(visited),
          visitedEdges: Array.from(traversedEdges),
          activeEdge: edgeKey,
          title: `গভীরে প্রবেশ ➔ ${node} থেকে ${neighbor}`,
          actionTag: `2. DIVE DFS(${neighbor})`,
          desc: `এজ (${node} ➔ ${neighbor}) ধরে নিচে নামা হলো। ${neighbor} কে স্ট্যাকে পুশ করে আরও গভীরে যাওয়া হচ্ছে।`
        });

        dfs(neighbor);

        // Backtrack step
        stack.pop();
        list.push({
          stepIndex: list.length,
          action: 'BACKTRACK',
          currentNode: node,
          targetNeighbor: neighbor,
          callStack: [...stack],
          visitedNodes: Array.from(visited),
          visitedEdges: Array.from(traversedEdges),
          activeEdge: edgeKey,
          title: `ব্যাকট্র্যাক ↩: ${neighbor} থেকে ${node}-এ ফেরা`,
          actionTag: `3. BACKTRACK TO ${node}`,
          desc: `${neighbor}-এর সব শাখা ঘোরা শেষ! স্ট্যাক থেকে পপ করে পূর্বের নোড ${node}-এ ফিরে আসা হলো।`
        });
      } else {
        list.push({
          stepIndex: list.length,
          action: 'EXPLORE_EDGE',
          currentNode: node,
          targetNeighbor: neighbor,
          callStack: [...stack],
          visitedNodes: Array.from(visited),
          visitedEdges: Array.from(traversedEdges),
          activeEdge: edgeKey,
          title: `সংলগ্ন নোড চেক: (${node} ➔ ${neighbor})`,
          actionTag: 'ALREADY VISITED',
          desc: `নোড ${neighbor} ইতিমধ্যে ভিজিট করা হয়েছে। তাই পুনরায় কল না করে পরবর্তী প্রতিবেশী চেক করা হচ্ছে।`
        });
      }
    }
  }

  dfs(startNode);

  list.push({
    stepIndex: list.length,
    action: 'COMPLETE',
    currentNode: startNode,
    callStack: [],
    visitedNodes: Array.from(visited),
    visitedEdges: Array.from(traversedEdges),
    title: 'DFS ট্রাভার্সাল সম্পূর্ণ! 🎉',
    actionTag: '✅ COMPLETE',
    desc: 'গ্রাফের সব পৌঁছানোযোগ্য নোড গভীরে গিয়ে সফলভাবে এক্সপ্লোর করা হয়েছে। কল স্ট্যাক খালি।'
  });

  return list;
}
