import {
  BaseCaseStep,
  BacktrackStep,
  TreeNode,
  TreeStep,
  FactNode,
  ReturnArcInfo
} from '../types';

export function generateBaseCaseSteps(factN: number, hasBaseCase: boolean): BaseCaseStep[] {
  const steps: BaseCaseStep[] = [];
  const stack: { n: number; state: 'waiting' | 'base' | 'returned'; val?: number }[] = [];

  if (!hasBaseCase) {
    for (let i = factN; i >= -3; i--) {
      const isCrash = i === -3;
      stack.push({ n: i, state: 'waiting' });
      const arrowIdx = factN - i - 1;

      steps.push({
        stepIndex: steps.length,
        n: i,
        phase: isCrash ? 'crash' : 'push',
        activeNodeN: i,
        activeCallArrowIndex: arrowIdx,
        visibleReturnArcs: [],
        stack: stack.map(s => ({ ...s })),
        title: isCrash
          ? `💥 স্ট্যাক ওভারফ্লো ক্র্যাশ! factorial(${i})`
          : i < 0
          ? `⚠️ কোনো বেস কেস নেই! ঋণাত্মক সংখ্যায় কল হচ্ছে: factorial(${i})`
          : `কল স্ট্যাক পুশ: factorial(${i})`,
        actionTag: isCrash ? '💥 STACK OVERFLOW' : i < 0 ? '⚠️ RUNAWAY CALL' : '⬇ CALL PUSH',
        desc: isCrash
          ? 'বেস কেস না থাকায় কোনো রিটার্ন নেই! কল স্ট্যাকের সীমা (10,000+ ফ্রেম) উপচে পড়ে মেমরি ক্র্যাশ (RangeError) ঘটল।'
          : i < 0
          ? `সাবধান! if (n <= 0) থামার শর্ত না থাকায় ফাংশনটি ঋণাত্মক সংখ্যার দিকে অনন্তকাল কল হতেই থাকবে!`
          : `factorial(${i}) কল হলো। থামার কোনো শর্ত না থাকায় এটি factorial(${i - 1})-কে কল করতেই থাকবে।`
      });
    }
    return steps;
  }

  // Safe recursion with base case
  for (let i = factN; i >= 0; i--) {
    const isBase = i === 0;
    const arrowIdx = factN - i - 1;
    stack.push({ n: i, state: isBase ? 'base' : 'waiting', val: isBase ? 1 : undefined });

    steps.push({
      stepIndex: steps.length,
      n: i,
      phase: isBase ? 'base_hit' : 'push',
      activeNodeN: i,
      activeCallArrowIndex: arrowIdx,
      visibleReturnArcs: [],
      stack: stack.map(s => ({ ...s })),
      result: isBase ? 1 : undefined,
      title: isBase
        ? `🛑 বেস কেস হিট! factorial(0) এ পৌঁছাল (Anchor)`
        : i === factN
        ? `মেইন কল: factorial(${i}) শুরু`
        : `রিকার্সিভ কল: factorial(${i}) স্ট্যাকে পুশ হলো`,
      actionTag: isBase ? '🛑 BASE CASE (ANCHOR)' : `⬇ CALL (${i})`,
      desc: isBase
        ? 'শর্ত সত্য: if (n <= 0) return 1; আর কোনো নতুন ফাংশন কল হবে না! এটিই রিকার্শনের শেষ সীমা (Anchor)। এখান থেকেই আনওয়াইন্ডিং এবং ফলাফল রিটার্ন শুরু।'
        : i === factN
        ? `মেইন প্রোগ্রাম থেকে factorial(${i}) কল হলো। সমস্যাকে ছোট করা হলো: ${i} × factorial(${i - 1})।`
        : `factorial(${i + 1}) ফ্রেমটি মেমরিতে অপেক্ষমাণ রেখে নতুন কল factorial(${i}) = ${i} × factorial(${i - 1}) পুশ হলো।`
    });
  }

  const returnArcs: ReturnArcInfo[] = [];
  let currentAccum = 1;

  for (let i = 0; i <= factN; i++) {
    if (i === 0) {
      returnArcs.push({ fromN: 0, toN: 1, text: 'Return 1' });
      const frame0 = stack.find(s => s.n === 0);
      if (frame0) {
        frame0.state = 'returned';
        frame0.val = 1;
      }

      steps.push({
        stepIndex: steps.length,
        n: 0,
        phase: 'pop',
        activeNodeN: 0,
        activeCallArrowIndex: -99,
        visibleReturnArcs: [...returnArcs],
        stack: stack.map(s => ({ ...s })),
        result: 1,
        title: `বেস কেস রিটার্ন: factorial(0) ➔ 1`,
        actionTag: '⬆ RETURN 1',
        desc: 'বেস কেস factorial(0) কোনো নতুন কল ছাড়া সরাসরি 1 রিটার্ন করে তার ফ্রেম পপ করল এবং factorial(1)-এ রেজাল্ট ফেরত দিল।'
      });
    } else {
      const prevAccum = currentAccum;
      currentAccum = currentAccum * i;
      const toN = i === factN ? -1 : i + 1;
      const text = i === 1
        ? `Return 1 x 1 = 1`
        : `Return ${i} x ${prevAccum} = ${currentAccum}`;

      returnArcs.push({ fromN: i, toN, text });
      const frame = stack.find(s => s.n === i);
      if (frame) {
        frame.state = 'returned';
        frame.val = currentAccum;
      }

      const isFinal = i === factN;
      steps.push({
        stepIndex: steps.length,
        n: i,
        phase: 'pop',
        activeNodeN: i,
        activeCallArrowIndex: -99,
        visibleReturnArcs: [...returnArcs],
        stack: stack.map(s => ({ ...s })),
        result: currentAccum,
        title: isFinal
          ? `চূড়ান্ত ফলাফল: factorial(${i}) = ${currentAccum} 🎉`
          : `রিটার্ন: factorial(${i}) = ${i} × ${prevAccum} = ${currentAccum}`,
        actionTag: isFinal ? `✅ RESULT: ${currentAccum}` : `⬆ RETURN (${currentAccum})`,
        desc: isFinal
          ? `শীর্ষ ফ্রেম factorial(${factN}) হিসাব সম্পন্ন করল: ${i} × ${prevAccum} = ${currentAccum}। সব ফ্রেম মেমরি থেকে মুক্ত হলো!`
          : `factorial(${i}) তার সাব-কলের মান পেয়ে গুণ করল: ${i} × ${prevAccum} = ${currentAccum}। ফ্রেম মুক্ত হয়ে কলার factorial(${i + 1})-এ ফিরল।`
      });
    }
  }

  return steps;
}

export function generateBacktrackSteps(): BacktrackStep[] {
  return [
    {
      stepIndex: 0,
      currentPos: { r: 0, c: 0 },
      action: 'choose',
      visitedPath: [{ r: 0, c: 0 }],
      deadEnds: [],
      callStack: ['solve(0,0)'],
      title: 'শুরু: অবস্থান (0, 0)',
      actionTag: '1. CHOOSE',
      desc: 'রোবট (0, 0) থেকে যাত্রা শুরু করল। রিকার্সিভ সিদ্ধান্ত: প্রথমে ডানে (Right) যাওয়ার চেষ্টা করবে।'
    },
    {
      stepIndex: 1,
      currentPos: { r: 0, c: 1 },
      action: 'choose',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }],
      deadEnds: [],
      callStack: ['solve(0,0)', 'solve(0,1)'],
      title: 'ডানে অগ্রসর: অবস্থান (0, 1)',
      actionTag: '2. EXPLORE',
      desc: 'ডান দিকের ঘর ফাঁকা পাওয়ায় রোবট এগিয়ে এল। এবার আবার ডানে যাওয়ার চেষ্টা করবে (0, 2)।'
    },
    {
      stepIndex: 2,
      currentPos: { r: 0, c: 2 },
      action: 'dead_end',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }],
      deadEnds: [{ r: 0, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(0,2) [BLOCKED]'],
      title: 'দেয়ালে বাধা! ডেড-এন্ড (0, 2)',
      actionTag: '🛑 DEAD END',
      desc: 'অবস্থান (0, 2)-এ দেয়াল 🧱 থাকায় সামনে যাওয়ার সুযোগ নেই। এই পথ ব্যর্থ!'
    },
    {
      stepIndex: 3,
      currentPos: { r: 0, c: 1 },
      action: 'backtrack',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }],
      deadEnds: [{ r: 0, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)'],
      title: 'ব্যাকট্র্যাক ↩: এক ধাপ পিছিয়ে আসা হলো',
      actionTag: '3. UNCHOOSE (BACKTRACK)',
      desc: 'ভুল পথ বাতিল! রোবট পূর্বাবস্থায় (0, 1)-এ ব্যাকট্র্যাক করল এবং বিকল্প দিক "নিচে" (Down) পরখ করার সিদ্ধান্ত নিল।'
    },
    {
      stepIndex: 4,
      currentPos: { r: 1, c: 1 },
      action: 'choose',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }],
      deadEnds: [{ r: 0, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(1,1)'],
      title: 'বিকল্প পথে সফল: অবস্থান (1, 1)',
      actionTag: '2. EXPLORE',
      desc: 'নিচের পথ খোলা পাওয়ায় (1, 1)-এ পৌঁছাল। ব্যাকট্র্যাকিং এভাবেই ভুল পথ বাতিল করে সঠিক পথে নিয়ে যায়।'
    },
    {
      stepIndex: 5,
      currentPos: { r: 1, c: 2 },
      action: 'choose',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }],
      deadEnds: [{ r: 0, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(1,1)', 'solve(1,2)'],
      title: 'ডানে অগ্রসর: অবস্থান (1, 2)',
      actionTag: '2. EXPLORE',
      desc: 'আবার ডানে এগিয়ে এল। এবার নিচে (2, 2) যাওয়ার চেষ্টা করবে।'
    },
    {
      stepIndex: 6,
      currentPos: { r: 2, c: 2 },
      action: 'dead_end',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }],
      deadEnds: [{ r: 0, c: 2 }, { r: 2, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(1,1)', 'solve(1,2)', 'solve(2,2) [BLOCKED]'],
      title: 'আবার দেয়াল! ডেড-এন্ড (2, 2)',
      actionTag: '🛑 DEAD END',
      desc: 'নিচে দেয়াল! তাই এই অপশনও বাতিল হলো।'
    },
    {
      stepIndex: 7,
      currentPos: { r: 1, c: 2 },
      action: 'backtrack',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }],
      deadEnds: [{ r: 0, c: 2 }, { r: 2, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(1,1)', 'solve(1,2)'],
      title: 'ব্যাকট্র্যাক ↩: বিকল্প ডানে অনুসন্ধান',
      actionTag: '3. UNCHOOSE (BACKTRACK)',
      desc: 'পিছিয়ে এসে ডানের ঘর (1, 3)-এর দিকে মোড় নিল।'
    },
    {
      stepIndex: 8,
      currentPos: { r: 1, c: 3 },
      action: 'choose',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }],
      deadEnds: [{ r: 0, c: 2 }, { r: 2, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(1,1)', 'solve(1,2)', 'solve(1,3)'],
      title: 'ডানে অগ্রসর: অবস্থান (1, 3)',
      actionTag: '2. EXPLORE',
      desc: 'ডান দিকের পথ খোলা। এখন সোজা নিচের দিকে টার্গেটের পথ পরিষ্কার!'
    },
    {
      stepIndex: 9,
      currentPos: { r: 2, c: 3 },
      action: 'choose',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 2, c: 3 }],
      deadEnds: [{ r: 0, c: 2 }, { r: 2, c: 2 }],
      callStack: ['solve(0,0)', 'solve(0,1)', 'solve(1,1)', 'solve(1,2)', 'solve(1,3)', 'solve(2,3)'],
      title: 'নিচে অগ্রসর: অবস্থান (2, 3)',
      actionTag: '2. EXPLORE',
      desc: 'টার্গেটের খুব কাছাকাছি পৌঁছে গেছে।'
    },
    {
      stepIndex: 10,
      currentPos: { r: 3, c: 3 },
      action: 'goal',
      visitedPath: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 2, c: 3 }, { r: 3, c: 3 }],
      deadEnds: [{ r: 0, c: 2 }, { r: 2, c: 2 }],
      callStack: ['GOAL REACHED!'],
      title: 'গন্তব্যে পৌঁছানো সম্পন্ন! (3, 3)',
      actionTag: '🏆 GOAL FOUND',
      desc: 'অভিনন্দন! ব্যাকট্র্যাকিংয়ের মাধ্যমে ব্যর্থ পথ বাতিল করে সফলভাবে গন্তব্যে পৌঁছানো সম্পন্ন হয়েছে।'
    }
  ];
}

export function generateFibTree(fibN: number): { nodes: TreeNode[]; steps: TreeStep[] } {
  const nodes: TreeNode[] = [];
  const steps: TreeStep[] = [];
  const seenInputs = new Set<number>();
  let counter = 0;

  function buildTree(n: number, x: number, y: number, spread: number, parentId: string | null, branch?: 'left' | 'right'): string {
    const id = `node_${counter++}`;
    const isDuplicate = seenInputs.has(n);
    seenInputs.add(n);

    nodes.push({
      id,
      n,
      x,
      y,
      parentId,
      branch,
      isDuplicateCall: isDuplicate && n > 1
    });

    if (n > 2) {
      buildTree(n - 1, x - spread, y + 80, spread * 0.52, id, 'left');
      buildTree(n - 2, x + spread, y + 80, spread * 0.52, id, 'right');
    }
    return id;
  }

  const initialSpread = fibN === 5 ? 180 : fibN === 4 ? 150 : 120;
  buildTree(fibN, 400, 45, initialSpread, null);

  const activeStack: { id: string; n: number; callType: string }[] = [];
  const visitedStates: Record<string, 'calling' | 'base_case' | 'returned'> = {};
  const returnVals: Record<string, number> = {};
  const callCounts: Record<number, number> = {};

  function recordStep(
    activeId: string,
    callN: number,
    isRedundant: boolean,
    action: 'call' | 'base_case' | 'unwind',
    title: string,
    explanation: string
  ) {
    steps.push({
      stepIndex: steps.length,
      activeNodeId: activeId,
      callStack: activeStack.map(s => ({ ...s })),
      visitedNodeStates: { ...visitedStates },
      nodeReturnValues: { ...returnVals },
      callCounts: { ...callCounts },
      currentCallN: callN,
      isRedundant,
      action,
      title,
      explanation
    });
  }

  function simulateFib(nodeId: string, n: number): number {
    callCounts[n] = (callCounts[n] || 0) + 1;
    const isRedundant = callCounts[n] > 1 && n > 1;

    visitedStates[nodeId] = 'calling';
    activeStack.push({ id: nodeId, n, callType: `fib(${n})` });

    recordStep(
      nodeId,
      n,
      isRedundant,
      'call',
      `ফাংশন কল: fib(${n})`,
      isRedundant
        ? `সতর্কতা: fib(${n}) পূর্বেও হিসাব করা হয়েছিল! কোনো মেমোইজেশন না থাকায় এটি আবারও হিসাব হচ্ছে ($O(2^N)$ অপচয়)।`
        : `fib(${n}) কল হলো। এটি fib(${n - 1}) এবং fib(${n - 2}) দুটি শাখায় বিভক্ত হবে।`
    );

    let result = 0;
    if (n <= 2) {
      result = 1;
      visitedStates[nodeId] = 'base_case';
      returnVals[nodeId] = 1;
      recordStep(
        nodeId,
        n,
        false,
        'base_case',
        `বেস কেস অর্জিত: fib(${n}) = 1`,
        `n = ${n} হওয়ায় বেস কেস হিট করেছে। আর কোনো শাখা তৈরি হবে না, সরাসরি ১ রিটার্ন হবে।`
      );
    } else {
      const leftChild = nodes.find(c => c.parentId === nodeId && c.branch === 'left');
      const rightChild = nodes.find(c => c.parentId === nodeId && c.branch === 'right');

      const leftRes = leftChild ? simulateFib(leftChild.id, n - 1) : 1;
      const rightRes = rightChild ? simulateFib(rightChild.id, n - 2) : 1;

      result = leftRes + rightRes;
      visitedStates[nodeId] = 'returned';
      returnVals[nodeId] = result;

      recordStep(
        nodeId,
        n,
        false,
        'unwind',
        `রিটার্ন: fib(${n}) = ${result}`,
        `বাম শাখা (${leftRes}) এবং ডান শাখা (${rightRes}) যোগ হয়ে fib(${n}) = ${result} হিসেবে রেজাল্ট রিটার্ন হলো।`
      );
    }

    activeStack.pop();
    return result;
  }

  if (nodes[0]) simulateFib(nodes[0].id, fibN);
  return { nodes, steps };
}

export function generateFactNodes(factN: number, hasBaseCase: boolean): FactNode[] {
  if (!hasBaseCase) {
    const list: number[] = [];
    for (let i = factN; i >= -3; i--) list.push(i);
    const stepX = 85;
    const stepY = 38;
    return list.map((val, idx) => ({
      n: val,
      x: 35 + idx * stepX,
      y: 35 + idx * stepY,
      w: 115,
      h: 36
    }));
  }

  const list: number[] = [];
  for (let i = factN; i >= 0; i--) list.push(i);
  const stepX = factN === 5 ? 115 : factN === 4 ? 135 : 160;
  const stepY = factN === 5 ? 60 : factN === 4 ? 70 : 85;
  return list.map((val, idx) => ({
    n: val,
    x: 45 + idx * stepX,
    y: 45 + idx * stepY,
    w: 135,
    h: 42
  }));
}
