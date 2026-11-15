export const DEFAULT_8_ARRAY = [5, 2, 4, 7, 1, 3, 2, 6];

export const PRESETS = [
  { label: 'ছবি ১ রেফারেন্স', array: [5, 2, 4, 7, 1, 3, 2, 6] },
  { label: 'ছবি ২ ভ্যারিয়েন্ট', array: [12, 8, 9, 3, 11, 5, 4, 1] },
  { label: 'ক্লাসিক টেক্সটবুক', array: [38, 27, 43, 3, 9, 82, 10, 19] }
];

export interface FinalZipperState {
  leftVals: number[];
  rightVals: number[];
  leftPtr: number | null;
  rightPtr: number | null;
  mergedOut: number[];
  comparingValLeft: number | null;
  comparingValRight: number | null;
  chosenVal: number | null;
}

export interface TreeStep {
  title: string;
  phase: 'divide' | 'base' | 'merge' | 'complete';
  desc: string;
  activeNodeIds: string[];
  activeArrowIds: string[];
  revealedNodeIds: string[];
  revealedArrowIds: string[];
  finalZipper?: FinalZipperState;
  finalDisplayArray?: number[];
}

export function buildTreeStructure(initial: number[]) {
  const arr = initial.slice(0, 8);
  while (arr.length < 8) arr.push(Math.floor(Math.random() * 80) + 10);

  // Divide Rows
  const r0 = [arr];
  const r1 = [arr.slice(0, 4), arr.slice(4, 8)];
  const r2 = [arr.slice(0, 2), arr.slice(2, 4), arr.slice(4, 6), arr.slice(6, 8)];
  const r3 = [[arr[0]], [arr[1]], [arr[2]], [arr[3]], [arr[4]], [arr[5]], [arr[6]], [arr[7]]];

  // Helper merge function
  const merge = (l: number[], r: number[]) => {
    const res: number[] = [];
    let i = 0, j = 0;
    while (i < l.length && j < r.length) {
      if (l[i] <= r[j]) { res.push(l[i]); i++; }
      else { res.push(r[j]); j++; }
    }
    while (i < l.length) { res.push(l[i]); i++; }
    while (j < r.length) { res.push(r[j]); j++; }
    return res;
  };

  // Merge Rows
  const r4 = [
    merge(r3[0], r3[1]),
    merge(r3[2], r3[3]),
    merge(r3[4], r3[5]),
    merge(r3[6], r3[7])
  ];
  const r5 = [
    merge(r4[0], r4[1]),
    merge(r4[2], r4[3])
  ];
  const r6 = [
    merge(r5[0], r5[1])
  ];

  return { r0, r1, r2, r3, r4, r5, r6 };
}

export function generateTreeSteps(tree: ReturnType<typeof buildTreeStructure>): TreeStep[] {
  const { r0, r1, r2, r3, r4, r5, r6 } = tree;

  const steps: TreeStep[] = [
    {
      title: 'মার্জ সর্টের সূচনা (Initial Array)',
      phase: 'divide',
      desc: `৮টি উপাদানের অবিন্যস্ত মূল অ্যারে: [${r0[0].join(', ')}]। রিকার্সিভ ডিভাইড অ্যান্ড কনকার নিয়মে এটি ঠিক মাঝখান দিয়ে দুই সমান ভাগে ভাগ হবে।`,
      activeNodeIds: ['r0_0'],
      activeArrowIds: [],
      revealedNodeIds: ['r0_0'],
      revealedArrowIds: []
    },
    {
      title: 'লেভেল ১ বিভাজন (Divide into 2 Halves)',
      phase: 'divide',
      desc: `অ্যারে দুই ভাগ হলো: বামে [${r1[0].join(', ')}] এবং ডানে [${r1[1].join(', ')}]।`,
      activeNodeIds: ['r1_0', 'r1_1'],
      activeArrowIds: ['a_r0_r1_0', 'a_r0_r1_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1']
    },
    {
      title: 'লেভেল ২ বিভাজন: বাম অর্ধেক (Divide Left 4)',
      phase: 'divide',
      desc: `বামের অংশকে পুনরায় বিভক্ত করে [${r2[0].join(', ')}] এবং [${r2[1].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r2_0', 'r2_1'],
      activeArrowIds: ['a_r1_r2_0', 'a_r1_r2_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ১ম জোড়া (Base Case)',
      phase: 'base',
      desc: `একক উপাদান [${r3[0][0]}] এবং [${r3[1][0]}] পৃথক হলো। ১টি একক উপাদান স্বয়ংক্রিয়ভাবে সর্টেড!`,
      activeNodeIds: ['r3_0', 'r3_1'],
      activeArrowIds: ['a_r2_r3_0', 'a_r2_r3_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1']
    },
    {
      title: 'মার্জিং ১ম জোড়া (Merge Pair 1)',
      phase: 'merge',
      desc: `[${r3[0][0]}] এবং [${r3[1][0]}] তুলনা করে সাজানো জোড়া [${r4[0].join(', ')}] গঠিত হলো।`,
      activeNodeIds: ['r4_0'],
      activeArrowIds: ['a_r3_r4_0', 'a_r3_r4_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ২য় জোড়া (Base Case)',
      phase: 'base',
      desc: `পরবর্তী শাখা ভেঙে একক উপাদান [${r3[2][0]}] এবং [${r3[3][0]}] পৃথক হলো।`,
      activeNodeIds: ['r3_2', 'r3_3'],
      activeArrowIds: ['a_r2_r3_2', 'a_r2_r3_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3']
    },
    {
      title: 'মার্জিং ২য় জোড়া (Merge Pair 2)',
      phase: 'merge',
      desc: `[${r3[2][0]}] এবং [${r3[3][0]}] মিলিয়ে সাজানো জোড়া [${r4[1].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r4_1'],
      activeArrowIds: ['a_r3_r4_2', 'a_r3_r4_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3']
    },
    {
      title: 'বামের ৪-উপাদান মার্জ (Merge Left 4)',
      phase: 'merge',
      desc: `সর্টেড সাব-অ্যারে [${r4[0].join(', ')}] এবং [${r4[1].join(', ')}] মিলিয়ে [${r5[0].join(', ')}] তৈরি হলো!`,
      activeNodeIds: ['r5_0'],
      activeArrowIds: ['a_r4_r5_0', 'a_r4_r5_1'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1']
    },
    {
      title: 'ডান অংশের বিভাজন শুরু (Divide Right Half)',
      phase: 'divide',
      desc: `ডান পাশের [${r1[1].join(', ')}]-কে ভাগ করে [${r2[2].join(', ')}] এবং [${r2[3].join(', ')}] তৈরি হলো।`,
      activeNodeIds: ['r2_2', 'r2_3'],
      activeArrowIds: ['a_r1_r2_2', 'a_r1_r2_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3']
    },
    {
      title: 'লেভেল ৩ বেস কেস: ৩য় ও ৪র্থ জোড়া',
      phase: 'base',
      desc: `ডান অংশের একক উপাদানগুলো পৃথক হলো এবং জোড়ায় মার্জ শুরু হলো।`,
      activeNodeIds: ['r3_4', 'r3_5', 'r3_6', 'r3_7'],
      activeArrowIds: ['a_r2_r3_4', 'a_r2_r3_5', 'a_r2_r3_6', 'a_r2_r3_7'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r3_6', 'r3_7'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r2_r3_6', 'a_r2_r3_7']
    },
    {
      title: 'ডানের ৪-উপাদান মার্জ (Merge Right 4)',
      phase: 'merge',
      desc: `ডান অংশের সাব-অ্যারেগুলো মিলিয়ে ডান অর্ধেক [${r5[1].join(', ')}] প্রস্তুত হলো!`,
      activeNodeIds: ['r5_1'],
      activeArrowIds: ['a_r4_r5_2', 'a_r4_r5_3'],
      revealedNodeIds: ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1'],
      revealedArrowIds: ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3']
    }
  ];

  const left4 = r5[0];
  const right4 = r5[1];
  let i = 0;
  let j = 0;
  const finalMerged: number[] = [];

  const baseRevealedNodes = ['r0_0', 'r1_0', 'r1_1', 'r2_0', 'r2_1', 'r3_0', 'r3_1', 'r4_0', 'r3_2', 'r3_3', 'r4_1', 'r5_0', 'r2_2', 'r2_3', 'r3_4', 'r3_5', 'r4_2', 'r3_6', 'r3_7', 'r4_3', 'r5_1', 'r6_0'];
  const baseRevealedArrows = ['a_r0_r1_0', 'a_r0_r1_1', 'a_r1_r2_0', 'a_r1_r2_1', 'a_r2_r3_0', 'a_r2_r3_1', 'a_r3_r4_0', 'a_r3_r4_1', 'a_r2_r3_2', 'a_r2_r3_3', 'a_r3_r4_2', 'a_r3_r4_3', 'a_r4_r5_0', 'a_r4_r5_1', 'a_r1_r2_2', 'a_r1_r2_3', 'a_r2_r3_4', 'a_r2_r3_5', 'a_r3_r4_4', 'a_r3_r4_5', 'a_r2_r3_6', 'a_r2_r3_7', 'a_r3_r4_6', 'a_r3_r4_7', 'a_r4_r5_2', 'a_r4_r5_3', 'a_r5_r6_0', 'a_r5_r6_1'];

  while (i < left4.length && j < right4.length) {
    const vL = left4[i];
    const vR = right4[j];
    const chooseLeft = vL <= vR;

    steps.push({
      title: `চূড়ান্ত মার্জিং: তুলনা ${vL} বনাম ${vR}`,
      phase: 'merge',
      desc: `বামের পয়েন্টার i (${vL}) বনাম ডানের পয়েন্টার j (${vR}) তুলনা: ${chooseLeft ? `${vL} ≤ ${vR}, ফলে বামের ${vL} আউটপুটে বসবে!` : `${vR} < ${vL}, ফলে ডানের ${vR} আউটপুটে বসবে!`} খাতা-কলমে যেভাবে ছোট মানটি নিচে নামে।`,
      activeNodeIds: ['r5_0', 'r5_1', 'r6_0'],
      activeArrowIds: ['a_r5_r6_0', 'a_r5_r6_1'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: i,
        rightPtr: j,
        mergedOut: [...finalMerged],
        comparingValLeft: vL,
        comparingValRight: vR,
        chosenVal: chooseLeft ? vL : vR
      },
      finalDisplayArray: [...finalMerged]
    });

    if (chooseLeft) {
      finalMerged.push(vL);
      i++;
    } else {
      finalMerged.push(vR);
      j++;
    }

    steps.push({
      title: `চূড়ান্ত মার্জিং: উপাদান ${finalMerged[finalMerged.length - 1]} স্থাপন`,
      phase: 'merge',
      desc: `চূড়ান্ত সর্টেড অ্যারের ইনডেক্স ${finalMerged.length - 1}-এ মান ${finalMerged[finalMerged.length - 1]} বসে গেল। বর্তমান আংশিক সর্টেড ফলাফল: [${finalMerged.join(', ')}]`,
      activeNodeIds: ['r6_0'],
      activeArrowIds: ['a_r5_r6_0', 'a_r5_r6_1'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: i < left4.length ? i : null,
        rightPtr: j < right4.length ? j : null,
        mergedOut: [...finalMerged],
        comparingValLeft: null,
        comparingValRight: null,
        chosenVal: null
      },
      finalDisplayArray: [...finalMerged]
    });
  }

  while (i < left4.length) {
    finalMerged.push(left4[i]);
    steps.push({
      title: `চূড়ান্ত মার্জিং: বামের অবশিষ্ট ${left4[i]} যোগ`,
      phase: 'merge',
      desc: `ডান পাশের উপাদান শেষ। বামের অবশিষ্ট উপাদান ${left4[i]} সরাসরি চূড়ান্ত অ্যারের শেষে যুক্ত হলো।`,
      activeNodeIds: ['r5_0', 'r6_0'],
      activeArrowIds: ['a_r5_r6_0'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: i,
        rightPtr: null,
        mergedOut: [...finalMerged],
        comparingValLeft: null,
        comparingValRight: null,
        chosenVal: null
      },
      finalDisplayArray: [...finalMerged]
    });
    i++;
  }

  while (j < right4.length) {
    finalMerged.push(right4[j]);
    steps.push({
      title: `চূড়ান্ত মার্জিং: ডানের অবশিষ্ট ${right4[j]} যোগ`,
      phase: 'merge',
      desc: `বাম পাশের উপাদান শেষ। ডানের অবশিষ্ট উপাদান ${right4[j]} সরাসরি চূড়ান্ত অ্যারের শেষে যুক্ত হলো।`,
      activeNodeIds: ['r5_1', 'r6_0'],
      activeArrowIds: ['a_r5_r6_1'],
      revealedNodeIds: baseRevealedNodes,
      revealedArrowIds: baseRevealedArrows,
      finalZipper: {
        leftVals: [...left4],
        rightVals: [...right4],
        leftPtr: null,
        rightPtr: j,
        mergedOut: [...finalMerged],
        comparingValLeft: null,
        comparingValRight: null,
        chosenVal: null
      },
      finalDisplayArray: [...finalMerged]
    });
    j++;
  }

  steps.push({
    title: 'মার্জ সর্ট সম্পূর্ণ সম্পন্ন! (Complete)',
    phase: 'complete',
    desc: `অভিনন্দন! ডিভাইড অ্যান্ড কনকার প্রক্রিয়ায় O(N log N) সময়ে পূর্ণ অ্যারে [${r6[0].join(', ')}] সফলভাবে সাজানো সমাপ্ত হয়েছে।`,
    activeNodeIds: ['r6_0'],
    activeArrowIds: [],
    revealedNodeIds: baseRevealedNodes,
    revealedArrowIds: baseRevealedArrows,
    finalDisplayArray: r6[0]
  });

  return steps;
}
