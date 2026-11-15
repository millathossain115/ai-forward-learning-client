import { BinaryStep, LinearStep } from '../types';

export function generateBinarySteps(sortedArray: number[], target: number): BinaryStep[] {
  const steps: BinaryStep[] = [];
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = sortedArray[mid];

    steps.push({
      low,
      mid,
      high,
      val: midVal,
      action: 'check',
      explanation: `ধাপ ${steps.length + 1}: রেঞ্জ [${low}..${high}]। মিডল ইনডেক্স mid = floor((${low} + ${high}) / 2) = ${mid}। Array[${mid}] = ${midVal}-এর সাথে টার্গেট ${target} মেলানো হচ্ছে।`
    });

    if (midVal === target) {
      steps.push({
        low,
        mid,
        high,
        val: midVal,
        action: 'found',
        explanation: `🎯 সফল! ইনডেক্স ${mid}-এ কাঙ্ক্ষিত মান ${target} পাওয়া গেছে। বাইনারি সার্চ সফলভাবে সমাপ্ত!`
      });
      break;
    } else if (midVal < target) {
      steps.push({
        low,
        mid,
        high,
        val: midVal,
        action: 'eliminate_left',
        explanation: `Array[${mid}] (${midVal}) < ${target}। যেহেতু অ্যারে সর্টেড, তাই ${midVal} এবং তার বামের সব মান টার্গেটের চেয়ে ছোট। বামের ৫০% অংশ বাদ দিয়ে low = mid + 1 (${mid + 1}) নির্ধারণ করা হলো।`
      });
      low = mid + 1;
    } else {
      steps.push({
        low,
        mid,
        high,
        val: midVal,
        action: 'eliminate_right',
        explanation: `Array[${mid}] (${midVal}) > ${target}। যেহেতু অ্যারে সর্টেড, তাই ${midVal} এবং তার ডানের সব মান টার্গেটের চেয়ে বড়। ডানের ৫০% অংশ বাদ দিয়ে high = mid - 1 (${mid - 1}) নির্ধারণ করা হলো।`
      });
      high = mid - 1;
    }
  }

  if (low > high) {
    steps.push({
      low,
      mid: -1,
      high,
      val: -1,
      action: 'not_found',
      explanation: `❌ অনুসন্ধান শেষ: টার্গেট ${target} এই অ্যারেতে বিদ্যমান নেই (low > high)।`
    });
  }

  return steps;
}

export function generateLinearSteps(sortedArray: number[], target: number): LinearStep[] {
  const steps: LinearStep[] = [];
  let found = false;

  for (let i = 0; i < sortedArray.length; i++) {
    const val = sortedArray[i];
    steps.push({
      currIndex: i,
      val,
      action: val === target ? 'found' : 'check',
      explanation: `ধাপ ${i + 1}: ইনডেক্স ${i} পরীক্ষা করা হচ্ছে। Array[${i}] = ${val}। ${
        val === target ? `🎯 মিলে গেছে! কাঙ্ক্ষিত ${target} পাওয়া গেছে!` : `টার্গেট ${target}-এর সাথে মেলেনি, পরবর্তী ইনডেক্সে যাওয়া হচ্ছে।`
      }`
    });

    if (val === target) {
      found = true;
      break;
    }
  }

  if (!found) {
    steps.push({
      currIndex: sortedArray.length,
      val: -1,
      action: 'not_found',
      explanation: `❌ পুরো অ্যারে শেষ পর্যন্ত স্ক্যান করা হয়েছে। টার্গেট ${target} পাওয়া যায়নি।`
    });
  }

  return steps;
}
