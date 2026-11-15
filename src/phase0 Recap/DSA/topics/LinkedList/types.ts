export type LLNodeState =
  | 'idle'
  | 'allocating'
  | 'linking'
  | 'connected'
  | 'unlinking'
  | 'lift-delete'
  | 'bypassing'
  | 'bypassed-target'
  | 'active';

export interface LLNode {
  id: string;
  value: number;
  addr: string;
  state: LLNodeState;
}

export type ListType = 'singly' | 'doubly' | 'circular';

export const INITIAL_NODES: LLNode[] = [
  { id: '1', value: 15, addr: '0x4F12', state: 'idle' },
  { id: '2', value: 32, addr: '0x8A01', state: 'idle' },
  { id: '3', value: 78, addr: '0x1C99', state: 'idle' },
  { id: '4', value: 94, addr: '0xE320', state: 'idle' },
];

export const randomAddr = () =>
  '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
