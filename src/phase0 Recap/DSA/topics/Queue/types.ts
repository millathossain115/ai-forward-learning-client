export interface QueueJob {
  id: string;
  name: string;
  color: string;
  state?: 'idle' | 'entering' | 'exiting';
}

export interface CircularSlot {
  id: string;
  value: string | null;
  color: string;
  state?: 'idle' | 'entering' | 'exiting' | 'active';
}

export type QueueMode = 'linear' | 'circular';

export const JOB_PALETTE = [
  'from-cyan-500 to-blue-600 border-cyan-400 text-slate-950',
  'from-emerald-500 to-teal-600 border-emerald-400 text-slate-950',
  'from-amber-500 to-orange-600 border-amber-400 text-slate-950',
  'from-fuchsia-500 to-pink-600 border-fuchsia-400 text-slate-950',
  'from-indigo-500 to-purple-600 border-indigo-400 text-slate-950',
  'from-rose-500 to-red-600 border-rose-400 text-slate-950',
];

export const REAL_WORLD_QUEUE_JOBS = [
  'Print_Ticket',
  'Send_OTP',
  'Save_Avatar',
  'Charge_Card',
  'Sync_Chat',
  'Send_Email',
  'Encode_Video',
  'Cache_Query',
];

export const MAX_CAPACITY = 6;

export const INITIAL_JOBS: QueueJob[] = [
  { id: '1', name: 'Order_Food', color: JOB_PALETTE[0] },
  { id: '2', name: 'Check_Balance', color: JOB_PALETTE[1] },
  { id: '3', name: 'Print_Bill', color: JOB_PALETTE[2] },
];

export const INITIAL_CIRCULAR_SLOTS: CircularSlot[] = [
  { id: 's0', value: 'Print_Ticket', color: JOB_PALETTE[0], state: 'idle' },
  { id: 's1', value: 'Send_OTP', color: JOB_PALETTE[1], state: 'idle' },
  { id: 's2', value: 'Save_Avatar', color: JOB_PALETTE[2], state: 'idle' },
  { id: 's3', value: null, color: '', state: 'idle' },
  { id: 's4', value: null, color: '', state: 'idle' },
  { id: 's5', value: null, color: '', state: 'idle' },
];
