import { BUCKET_COUNT } from '../types';

export function computeHash(key: string, bucketCount: number = BUCKET_COUNT): { rawHash: number; bucketIndex: number } {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const bucketIndex = hash % bucketCount;
  return { rawHash: hash, bucketIndex };
}
