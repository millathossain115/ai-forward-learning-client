export interface SelectionStep {
  arr: number[];
  i: number;
  j: number;
  minIdx: number;
  sortedUpTo: number; // Index up to which array is strictly sorted
  isScanning: boolean;
  isSwapping: boolean;
  desc: string;
  isComplete?: boolean;
}

export const SELECTION_DEFAULT_ARRAY = [64, 25, 12, 22, 11];

export function generateSelectionTrace(initialArray: number[]): SelectionStep[] {
  const steps: SelectionStep[] = [];
  const a = [...initialArray];
  const n = a.length;

  steps.push({
    arr: [...a],
    i: 0,
    j: 0,
    minIdx: 0,
    sortedUpTo: -1,
    isScanning: false,
    isSwapping: false,
    desc: 'শুরু: প্রাথমিক অ্যারে। সিলেকশন সর্ট পুরো অ্যারেকে দুটি অংশে ভাগ করে: বামে সর্টেড জোন এবং ডানে আন-সর্টেড জোন। প্রতি পাসে আন-সর্টেড জোন থেকে সর্বনিম্ন মানটি খুঁজে বের করা হয়।',
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      arr: [...a],
      i,
      j: i,
      minIdx,
      sortedUpTo: i - 1,
      isScanning: true,
      isSwapping: false,
      desc: `ধাপ ${i + 1} শুরু: ইনডেক্স ${i} এর মান (${a[i]})-কে সাময়িক সর্বনিম্ন (Minimum) ধরে স্ক্যান শুরু করা হলো।`,
    });

    for (let j = i + 1; j < n; j++) {
      const isNewMin = a[j] < a[minIdx];
      if (isNewMin) {
        minIdx = j;
      }

      steps.push({
        arr: [...a],
        i,
        j,
        minIdx,
        sortedUpTo: i - 1,
        isScanning: true,
        isSwapping: false,
        desc: `স্ক্যানিং ইনডেক্স ${j} (${a[j]}): ${
          isNewMin
            ? `নতুন সর্বনিম্ন মান পাওয়া গেছে! নতুন চ্যাম্পিয়ন মিনিমাম = ${a[j]} (ইনডেক্স ${j})`
            : `মানটি বর্তমান সর্বনিম্ন (${a[minIdx]}) থেকে বড়, তাই স্ক্যানিং সামনে এগোবে।`
        }`,
      });
    }

    // Perform swap if minIdx != i
    if (minIdx !== i) {
      const temp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = temp;

      steps.push({
        arr: [...a],
        i,
        j: n - 1,
        minIdx: i,
        sortedUpTo: i,
        isScanning: false,
        isSwapping: true,
        desc: `সোয়াপ সম্পন্ন! সর্বনিম্ন মান ${a[i]}-কে আন-সর্টেড জোনের শুরুতে (ইনডেক্স ${i}) নিয়ে আসা হলো। সর্টেড জোনের পরিধি ১ ঘর বাড়ল।`,
      });
    } else {
      steps.push({
        arr: [...a],
        i,
        j: n - 1,
        minIdx: i,
        sortedUpTo: i,
        isScanning: false,
        isSwapping: false,
        desc: `ইনডেক্স ${i} এর উপাদান (${a[i]}) নিজেই সর্বনিম্ন ছিল, তাই কোনো সোয়াপের প্রয়োজন হয়নি। এটি সর্টেড জোনে যুক্ত হলো।`,
      });
    }
  }

  steps.push({
    arr: [...a],
    i: n - 1,
    j: n - 1,
    minIdx: n - 1,
    sortedUpTo: n - 1,
    isScanning: false,
    isSwapping: false,
    isComplete: true,
    desc: 'অভিনন্দন! সিলেকশন সর্ট সম্পন্ন হয়েছে। সবকটি উপাদান চূড়ান্ত সঠিক স্থানে সুবিন্যস্ত।',
  });

  return steps;
}
