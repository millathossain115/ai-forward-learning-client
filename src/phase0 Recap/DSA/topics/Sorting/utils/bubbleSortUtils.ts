export interface BubbleStep {
  arr: number[];
  i: number;
  j: number;
  comparing: [number, number] | null;
  swapped: boolean;
  sortedIndices: number[];
  desc: string;
  isPassEnd?: boolean;
  isComplete?: boolean;
}

export const DEFAULT_ARRAY = [45, 12, 89, 34, 23, 7];

export function generateBubbleTrace(initialArray: number[]): BubbleStep[] {
  const steps: BubbleStep[] = [];
  const a = [...initialArray];
  const n = a.length;
  const sorted: number[] = [];

  steps.push({
    arr: [...a],
    i: 0,
    j: 0,
    comparing: null,
    swapped: false,
    sortedIndices: [],
    desc: 'শুরু: প্রাথমিক অবিন্যস্ত অ্যারে। বাবল সর্ট পাশাপাশি দুটি উপাদানের তুলনা করে বড়টিকে ডানদিকে ঠেলে দেয়।',
  });

  for (let i = 0; i < n - 1; i++) {
    let anySwapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Step 1: Compare
      const willSwap = a[j] > a[j + 1];
      steps.push({
        arr: [...a],
        i,
        j,
        comparing: [j, j + 1],
        swapped: false,
        sortedIndices: [...sorted],
        desc: `পাস ${i + 1}: ইনডেক্স ${j} (${a[j]}) এবং ইনডেক্স ${j + 1} (${a[j + 1]}) তুলনা করা হচ্ছে। ${
          willSwap
            ? `${a[j]} > ${a[j + 1]}, তাই এদের অদলবদল (Swap) হবে!`
            : `${a[j]} ≤ ${a[j + 1]}, কোনো সোয়াপের প্রয়োজন নেই।`
        }`,
      });

      // Step 2: Swap if necessary
      if (willSwap) {
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
        anySwapped = true;

        steps.push({
          arr: [...a],
          i,
          j,
          comparing: [j, j + 1],
          swapped: true,
          sortedIndices: [...sorted],
          desc: `সোয়াপ সম্পন্ন! ${temp} ডানপাশে সরে গেল এবং ${a[j]} বামে আসল।`,
        });
      }
    }

    // Mark the end of this pass - the largest element bubbles to the end
    sorted.unshift(n - 1 - i);
    steps.push({
      arr: [...a],
      i,
      j: n - i - 1,
      comparing: null,
      swapped: false,
      sortedIndices: [...sorted],
      isPassEnd: true,
      desc: `পাস ${i + 1} সমাপ্ত: এই পাসের সর্বোচ্চ মান (${a[n - 1 - i]}) তার সঠিক অবস্থানে পৌঁছে লক হয়ে গেছে!`,
    });

    // Early exit if no swaps occurred
    if (!anySwapped) {
      steps.push({
        arr: [...a],
        i,
        j: 0,
        comparing: null,
        swapped: false,
        sortedIndices: a.map((_, idx) => idx),
        isComplete: true,
        desc: `স্মার্ট অপ্টিমাইজেশন (Early Exit): এই পাসে কোনো উপাদান সোয়াপ হয়নি! অর্থাৎ অ্যারে সম্পূর্ণ সর্টেড হয়ে গেছে। বাকি পাসগুলো স্কিপ করা হলো (Best Case O(N))!`,
      });
      return steps;
    }
  }

  // Mark remaining first element as sorted
  if (!sorted.includes(0)) sorted.unshift(0);

  steps.push({
    arr: [...a],
    i: n - 1,
    j: 0,
    comparing: null,
    swapped: false,
    sortedIndices: a.map((_, idx) => idx),
    isComplete: true,
    desc: 'অভিনন্দন! বাবল সর্ট সফলভাবে সমাপ্ত হয়েছে। সবকটি উপাদান ছোট থেকে বড় ক্রমে সুসজ্জিত।',
  });

  return steps;
}
