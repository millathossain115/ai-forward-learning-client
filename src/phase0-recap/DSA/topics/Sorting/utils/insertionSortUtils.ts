export interface InsertionStep {
  arr: (number | null)[]; // null represents open slot where card was lifted
  keyVal: number | null;
  keyOriginalIdx: number;
  activeCompareIdx: number | null;
  sortedUpTo: number;
  shiftingIdx: number | null;
  desc: string;
  isComplete?: boolean;
}

export const INSERTION_DEFAULT_ARRAY = [43, 31, 26, 88, 12];

export function generateInsertionTrace(initialArray: number[]): InsertionStep[] {
  const steps: InsertionStep[] = [];
  const a: number[] = [...initialArray];
  const n = a.length;

  steps.push({
    arr: [...a],
    keyVal: null,
    keyOriginalIdx: 0,
    activeCompareIdx: null,
    sortedUpTo: 0,
    shiftingIdx: null,
    desc: 'শুরু: প্রথম কার্ডটি [ইনডেক্স 0] ইতিমধ্যে একা থাকায় নিজ স্থানে সর্টেড হিসেবে গণ্য হয়। ইনডেক্স ১ থেকে কি-কার্ড তোলা শুরু হবে।',
  });

  for (let i = 1; i < n; i++) {
    const key = a[i];

    // Step 1: Lift key card
    const displayArr: (number | null)[] = [...a];
    displayArr[i] = null; // empty pocket slot

    steps.push({
      arr: [...displayArr],
      keyVal: key,
      keyOriginalIdx: i,
      activeCompareIdx: i - 1,
      sortedUpTo: i - 1,
      shiftingIdx: null,
      desc: `কার্ড তোলা হলো (Lift Key): ইনডেক্স ${i}-এর কার্ড (${key})-কে হাত থেকে উপরে তুলে নেওয়া হলো। বামের সর্টেড কার্ডগুলোর সাথে তুলনা করে এর সঠিক পকেট খোঁজা হবে।`,
    });

    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      // Step 2: Shift right
      displayArr[j + 1] = a[j];
      displayArr[j] = null; // pocket moves left
      a[j + 1] = a[j];

      steps.push({
        arr: [...displayArr],
        keyVal: key,
        keyOriginalIdx: i,
        activeCompareIdx: j,
        sortedUpTo: i - 1,
        shiftingIdx: j,
        desc: `ডানে শিফট: ${a[j + 1]} > ${key}, তাই ${a[j + 1]}-কে এক ঘর ডানে সরিয়ে পকেট খালি করা হলো।`,
      });

      j--;
    }

    // Step 3: Insert into pocket
    a[j + 1] = key;
    displayArr[j + 1] = key;

    steps.push({
      arr: [...a],
      keyVal: null,
      keyOriginalIdx: i,
      activeCompareIdx: null,
      sortedUpTo: i,
      shiftingIdx: null,
      desc: `কার্ড স্থাপন (Insert): কি-কার্ড (${key})-কে ইনডেক্স ${j + 1}-এর ফাঁকা পকেটে নামিয়ে দেওয়া হলো! ইনডেক্স ০ থেকে ${i} পর্যন্ত অংশটি এখন সর্টেড।`,
    });
  }

  steps.push({
    arr: [...a],
    keyVal: null,
    keyOriginalIdx: n - 1,
    activeCompareIdx: null,
    sortedUpTo: n - 1,
    shiftingIdx: null,
    isComplete: true,
    desc: 'অভিনন্দন! খেলোয়াড়ের তাসের হাতের মতোই সমস্ত উপাদান নিজ নিজ সঠিক পকেটে ইনসার্ট হয়ে সর্টেড হয়ে গেছে!',
  });

  return steps;
}
