export interface FocusedNodes {
  child?: number;
  parent?: number;
  extract?: number;
  type?: 'compare' | 'swap' | 'settled' | 'extract';
}

export const INITIAL_MAX_HEAP = [95, 75, 60, 45, 50]; // 5 initial nodes
export const INITIAL_MIN_HEAP = [15, 30, 45, 65, 55];
export const PRESET_INPUTS = [88, 92, 40, 78, 99, 20, 68, 85, 33, 94, 52, 18, 105];
export const MAX_HEAP_SIZE = 15; // 4 complete binary tree levels

// Dynamic mathematical coordinates for up to 15 nodes (Levels 0, 1, 2, 3)
export const getNodeCoord = (i: number) => {
  const level = Math.floor(Math.log2(i + 1));
  const levelCount = Math.pow(2, level);
  const posInLevel = i - (levelCount - 1);
  const x = ((posInLevel + 0.5) / levelCount) * 100;
  const yLevels = [11, 35, 62, 88];
  const y = yLevels[level] ?? 88;
  return { x, y, level };
};
