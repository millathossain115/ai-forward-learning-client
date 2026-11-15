export const TREE_PRESET_1 = [20, 2, 9, 7, 12, 15, 1, 6, 8];

export interface FinalAssemblyState {
  stage: 'left' | 'pivot' | 'right' | 'complete';
  leftBlock: number[];
  pivotVal: number;
  rightBlock: number[];
  assembledSoFar: number[];
}

export interface TreePartitionStep {
  title: string;
  desc: string;
  activePivotVal: number | null;
  revealedNodeIds: string[];
  revealedArrowIds: string[];
  activeNodeIds: string[];
  activeArrowIds: string[];
  finalAssembly?: FinalAssemblyState;
}

export interface BarSortStep {
  arr: number[];
  pivotIdx: number;
  comparingIdx: number;
  partitionStart: number;
  partitionEnd: number;
  sortedIndices: number[];
  desc: string;
}

export function generateBarTrace(initial: number[]): BarSortStep[] {
  const steps: BarSortStep[] = [];
  const arr = [...initial];
  const sorted = new Set<number>();

  steps.push({
    arr: [...arr],
    pivotIdx: -1,
    comparingIdx: -1,
    partitionStart: 0,
    partitionEnd: arr.length - 1,
    sortedIndices: [],
    desc: 'প্রাথমিক অবিন্যস্ত বার অ্যারে প্রস্তুত। "Play" চাপুন।'
  });

  function quick(low: number, high: number) {
    if (low >= high) {
      if (low >= 0 && low < arr.length) sorted.add(low);
      return;
    }

    const pivotVal = arr[high];
    let i = low - 1;

    steps.push({
      arr: [...arr],
      pivotIdx: high,
      comparingIdx: -1,
      partitionStart: low,
      partitionEnd: high,
      sortedIndices: Array.from(sorted),
      desc: `পার্টিশন শুরু: রেঞ্জ [${low}..${high}]। পিভট = ${pivotVal} (নীল রঙে চিহ্নিত)।`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        arr: [...arr],
        pivotIdx: high,
        comparingIdx: j,
        partitionStart: low,
        partitionEnd: high,
        sortedIndices: Array.from(sorted),
        desc: `উপাদান ${arr[j]} (লাল) বনাম পিভট ${pivotVal} তুলনা করা হচ্ছে।`
      });

      if (arr[j] <= pivotVal) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          arr: [...arr],
          pivotIdx: high,
          comparingIdx: j,
          partitionStart: low,
          partitionEnd: high,
          sortedIndices: Array.from(sorted),
          desc: `${arr[i]} ≤ ${pivotVal}, তাই এটি ছোটদের সীমানা ইনডেক্স ${i}-এ সোয়াপ হলো!`
        });
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    const pivotFinalIndex = i + 1;
    sorted.add(pivotFinalIndex);

    steps.push({
      arr: [...arr],
      pivotIdx: pivotFinalIndex,
      comparingIdx: -1,
      partitionStart: low,
      partitionEnd: high,
      sortedIndices: Array.from(sorted),
      desc: `পিভট ${pivotVal} তার চূড়ান্ত সঠিক অবস্থান ইনডেক্স ${pivotFinalIndex}-এ স্থায়ী লক হলো!`
    });

    quick(low, pivotFinalIndex - 1);
    quick(pivotFinalIndex + 1, high);
  }

  quick(0, arr.length - 1);

  for (let k = 0; k < arr.length; k++) sorted.add(k);

  steps.push({
    arr: [...arr],
    pivotIdx: -1,
    comparingIdx: -1,
    partitionStart: 0,
    partitionEnd: arr.length - 1,
    sortedIndices: Array.from(sorted),
    desc: 'অভিনন্দন! কুইক সর্ট ইন-প্লেস O(N log N) সময়ে সম্পূর্ণভাবে সমাপ্ত হয়েছে।'
  });

  return steps;
}

export function generateRandomBarArray(count = 36): number[] {
  const arr: number[] = [];
  for (let i = 0; i < count; i++) {
    const base = Math.floor(100 - (i / count) * 85);
    const jitter = Math.floor(Math.random() * 12) - 6;
    arr.push(Math.max(12, Math.min(98, base + jitter)));
  }
  return arr;
}

export const QUICK_SORT_TREE_STEPS: TreePartitionStep[] = [
  {
    title: 'ধাপ ১: মূল অ্যারে ও পিভট নির্বাচন (Pivot = 8)',
    desc: 'প্রাথমিক অ্যারে [20, 2, 9, 7, 12, 15, 1, 6, 8]। শেষ উপাদান 8-কে পিভট নির্বাচন করা হলো। এর ভিত্তিতে অ্যারে < 8 এবং >= 8 এ বিভক্ত হবে।',
    activePivotVal: 8,
    revealedNodeIds: ['root'],
    revealedArrowIds: [],
    activeNodeIds: ['root'],
    activeArrowIds: []
  },
  {
    title: 'ধাপ ২: লেভেল ১ পার্টিশন সমাপ্ত (Pivot 8 locked in center)',
    desc: 'পার্টিশনের ফলে 8-এর চেয়ে ছোট মান [2, 7, 1, 6] বামে, পিভট 8 ঠিক মাঝখানে লক এবং বড় মান [15, 9, 20, 12] ডানে স্থান নিয়েছে।',
    activePivotVal: 8,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right'],
    activeNodeIds: ['l1_left', 'l1_pivot', 'l1_right'],
    activeArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right']
  },
  {
    title: 'ধাপ ৩: বাম শাখা পার্টিশন (Pivot = 6)',
    desc: 'বামের সাব-অ্যারে [2, 7, 1, 6]-কে নিয়ে কাজ শুরু। এর পিভট 6। < 6 হলে বামে [2, 1], পিভট 6 মাঝে, এবং >= 6 হলে ডানে [7]।',
    activePivotVal: 6,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr'],
    activeNodeIds: ['l2_l_left', 'l2_l_pivot', 'l2_l_right'],
    activeArrowIds: ['a_l1_ll', 'a_l1_lp', 'a_l1_lr']
  },
  {
    title: 'ধাপ ৪: বেস কেস সাব-পার্টিশন (Pivot = 1)',
    desc: '[2, 1]-এর পিভট 1। 1 লক হলো এবং >= 1 হওয়ায় 2 ডানে বসলো। বাম পাশের সমস্ত উপাদান সম্পূর্ণ সর্টেড!',
    activePivotVal: 1,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2'],
    activeNodeIds: ['l3_pivot_1', 'l3_val_2'],
    activeArrowIds: ['a_l2_p1', 'a_l2_v2']
  },
  {
    title: 'ধাপ ৫: ডান শাখা পার্টিশন (Pivot = 12)',
    desc: 'এখন ডানের সাব-অ্যারে [15, 9, 20, 12]-এ পিভট 12। < 12 মান [9] বামে, পিভট 12 মাঝে এবং >= 12 মান [15, 20] ডানে গেল।',
    activePivotVal: 12,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr'],
    activeNodeIds: ['l2_r_left', 'l2_r_pivot', 'l2_r_right'],
    activeArrowIds: ['a_l1_rl', 'a_l1_rp', 'a_l1_rr']
  },
  {
    title: 'ধাপ ৬: শেষ সাব-পার্টিশন (Pivot = 20)',
    desc: '[15, 20]-এর পিভট 20। < 20 মান 15 বামে এবং 20 তার স্থানে লক হলো।',
    activePivotVal: 20,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
    activeNodeIds: ['l3_val_15', 'l3_pivot_20'],
    activeArrowIds: ['a_l2_v15', 'a_l2_p20']
  },
  {
    title: 'ধাপ ৭ (সংযোজন ১): বাম উপ-শাখা সংগ্রহ [১, ২, ৬, ৭]',
    desc: 'পিভট ৮-এর বামের সমস্ত উপাদান রিকার্সিভ পার্টিশন শেষে সর্টেড হয়ে গেছে: [১, ২, ৬, ৭]। এটি চূড়ান্ত সর্টেড অ্যারের প্রথম ভাগে অবস্থান নেবে।',
    activePivotVal: null,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
    activeNodeIds: ['l3_pivot_1', 'l3_val_2', 'l2_l_pivot', 'l2_l_right'],
    activeArrowIds: [],
    finalAssembly: {
      stage: 'left',
      leftBlock: [1, 2, 6, 7],
      pivotVal: 8,
      rightBlock: [9, 12, 15, 20],
      assembledSoFar: [1, 2, 6, 7]
    }
  },
  {
    title: 'ধাপ ৮ (সংযোজন ২): কেন্দ্রীয় পিভট ৮ নিশ্চিত',
    desc: 'মূল পিভট ৮ তার চূড়ান্ত অপরিবর্তনীয় অবস্থানে কেন্দ্রে নিশ্চিত হলো। এর বামে শুধুই ছোট মান [১, ২, ৬, ৭] এবং ডানে শুধুই বড় মান [৯, ১২, ১৫, ২০]।',
    activePivotVal: 8,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
    activeNodeIds: ['l1_pivot'],
    activeArrowIds: [],
    finalAssembly: {
      stage: 'pivot',
      leftBlock: [1, 2, 6, 7],
      pivotVal: 8,
      rightBlock: [9, 12, 15, 20],
      assembledSoFar: [1, 2, 6, 7, 8]
    }
  },
  {
    title: 'ধাপ ৯ (সংযোজন ৩): ডান উপ-শাখা সংগ্রহ [৯, ১২, ১৫, ২০]',
    desc: 'পিভট ৮-এর ডানের রিকার্সিভ পার্টিশনও সম্পন্ন হয়ে প্রস্তুত: [৯, ১২, ১৫, ২০]। এটি পিভটের ঠিক পর থেকে যুক্ত হচ্ছে।',
    activePivotVal: null,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
    activeNodeIds: ['l2_r_left', 'l2_r_pivot', 'l3_val_15', 'l3_pivot_20'],
    activeArrowIds: [],
    finalAssembly: {
      stage: 'right',
      leftBlock: [1, 2, 6, 7],
      pivotVal: 8,
      rightBlock: [9, 12, 15, 20],
      assembledSoFar: [1, 2, 6, 7, 8, 9, 12, 15, 20]
    }
  },
  {
    title: 'ধাপ ১০: চূড়ান্ত পূর্ণাঙ্গ সংযোজন সমাপ্ত (Left + Pivot + Right)',
    desc: 'খাতা-কলমে যেভাবে ৩টি অংশকে জোড়া দিই: বামের সর্টেড অংশ [১, ২, ৬, ৭] + মূল পিভট [৮] + ডানের সর্টেড অংশ [৯, ১২, ১৫, ২০] মিলিয়ে সম্পূর্ণ সর্টেড অ্যারে [১, ২, ৬, ৭, ৮, ৯, ১২, ১৫, ২০] প্রস্তুত!',
    activePivotVal: 8,
    revealedNodeIds: ['root', 'l1_left', 'l1_pivot', 'l1_right', 'l2_l_left', 'l2_l_pivot', 'l2_l_right', 'l3_pivot_1', 'l3_val_2', 'l2_r_left', 'l2_r_pivot', 'l2_r_right', 'l3_val_15', 'l3_pivot_20'],
    revealedArrowIds: ['a_root_left', 'a_root_pivot', 'a_root_right', 'a_l1_ll', 'a_l1_lp', 'a_l1_lr', 'a_l2_p1', 'a_l2_v2', 'a_l1_rl', 'a_l1_rp', 'a_l1_rr', 'a_l2_v15', 'a_l2_p20'],
    activeNodeIds: ['root', 'l1_pivot'],
    activeArrowIds: [],
    finalAssembly: {
      stage: 'complete',
      leftBlock: [1, 2, 6, 7],
      pivotVal: 8,
      rightBlock: [9, 12, 15, 20],
      assembledSoFar: [1, 2, 6, 7, 8, 9, 12, 15, 20]
    }
  }
];
