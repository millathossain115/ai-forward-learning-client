export type TableMode = 'chaining' | 'probing' | 'set';

export interface ChainItem {
  id: string;
  key: string;
  value: string;
  state?: 'idle' | 'hashing' | 'comparing' | 'found' | 'inserted' | 'collision';
}

export interface LinearSlot {
  key: string | null;
  value: string | null;
  state?: 'idle' | 'probed' | 'found' | 'inserted' | 'collision';
}

export interface PipelineState {
  key?: string;
  rawHash?: number;
  bucketIndex?: number;
  step?: string;
}

export const BUCKET_COUNT = 7;

export const PRESET_ENTRIES = [
  { key: 'sabbir', val: '01912-1122' },
  { key: 'login', val: 'Active_2026' },
  { key: 'tanvir', val: '01552-3344' },
  { key: 'cache', val: 'HTML_Page' },
  { key: 'token', val: 'Bearer_JWT' },
  { key: 'admin', val: 'SuperUser' },
  { key: 'rahul', val: '01711-9876' }
];

export const INITIAL_CHAIN_BUCKETS: ChainItem[][] = [
  [
    { id: '1', key: 'token', value: 'Bearer_JWT', state: 'idle' },
    { id: '2', key: 'admin', value: 'SuperUser', state: 'idle' } // collision at bucket 0
  ],
  [
    { id: '3', key: 'roll:42', value: 'GPA_5.00', state: 'idle' }
  ],
  [],
  [
    { id: '4', key: 'priya', value: '01819-5432', state: 'idle' }
  ],
  [
    { id: '5', key: 'rahul', value: '01711-9876', state: 'idle' }
  ],
  [],
  []
];

export const INITIAL_PROBING_SLOTS: LinearSlot[] = [
  { key: 'token', value: 'Bearer_JWT', state: 'idle' },
  { key: 'admin', value: 'SuperUser', state: 'idle' },
  { key: 'roll:42', value: 'GPA_5.00', state: 'idle' },
  { key: 'priya', value: '01819-5432', state: 'idle' },
  { key: 'rahul', value: '01711-9876', state: 'idle' },
  { key: null, value: null, state: 'idle' },
  { key: null, value: null, state: 'idle' }
];
