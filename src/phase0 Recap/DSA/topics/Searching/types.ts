export const SORTED_ARRAY = [4, 12, 19, 27, 35, 42, 58, 64, 71, 83, 91, 99];

export type SearchMode = 'binary' | 'linear' | 'race';

export interface BinaryStep {
  low: number;
  mid: number;
  high: number;
  val: number;
  action: 'check' | 'eliminate_left' | 'eliminate_right' | 'found' | 'not_found';
  explanation: string;
}

export interface LinearStep {
  currIndex: number;
  val: number;
  action: 'check' | 'mismatch' | 'found' | 'not_found';
  explanation: string;
}
