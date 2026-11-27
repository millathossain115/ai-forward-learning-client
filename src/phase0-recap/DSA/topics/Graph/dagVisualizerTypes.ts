export interface Preset {
  id: string;
  name: string;
  badge: string;
  badgeType: 'emerald' | 'rose' | 'sky';
  recommendedAlgo: 'dfs' | 'kahn';
  summary: string;
  purpose: string;
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: { source: string; target: string }[];
}

export const PRESETS: Preset[] = [
  {
    id: 'pipeline',
    name: '১. সফটওয়্যার রিলিজ পাইপলাইন (Valid DAG)',
    badge: 'বৈধ DAG • চক্রহীন',
    badgeType: 'emerald',
    recommendedAlgo: 'kahn',
    summary: 'Lint ➔ Unit Test ➔ Integration Test ➔ Build ➔ Deploy ক্রম।',
    purpose: 'এতে কোনো চক্র নেই। কান-এর অ্যালগরিদম প্রতিটি পূর্বশর্ত মেনে নিখুঁত এক্সেকিউশন অর্ডার বের করে।',
    nodes: [
      { id: 'A_Lint', label: 'A: Lint Code', x: 50, y: 60 },
      { id: 'B_TestUnit', label: 'B: Unit Tests', x: 50, y: 180 },
      { id: 'C_TestIntegration', label: 'C: Integration Tests', x: 280, y: 180 },
      { id: 'D_Build', label: 'D: Build Container', x: 520, y: 120 },
      { id: 'E_Deploy', label: 'E: Deploy Staging', x: 760, y: 120 },
    ],
    edges: [
      { source: 'A_Lint', target: 'D_Build' },
      { source: 'B_TestUnit', target: 'C_TestIntegration' },
      { source: 'C_TestIntegration', target: 'D_Build' },
      { source: 'D_Build', target: 'E_Deploy' },
    ],
  },
  {
    id: 'deadlock',
    name: '২. সার্কুলার ডেডলক (Deadlock Cycle)',
    badge: 'ডেডলক সাইকেল • লুপ ঝুঁকি',
    badgeType: 'rose',
    recommendedAlgo: 'dfs',
    summary: '৪টি AI টাস্ক একে অপরের ওপর চক্রাকারে আটকে আছে (Circular Wait)।',
    purpose: '৩-কালার DFS দিয়ে ট্রাভার্সাল চলাকালে GRAY নোডে ব্যাক-এজ পেলেই সাথে সাথে লাল ডেডলক সাইকেল শনাক্ত হবে।',
    nodes: [
      { id: 'Task_1', label: 'Task 1: Fetch Prompts', x: 80, y: 80 },
      { id: 'Task_2', label: 'Task 2: Embed Chunks', x: 340, y: 80 },
      { id: 'Task_3', label: 'Task 3: Rerank Results', x: 340, y: 220 },
      { id: 'Task_4', label: 'Task 4: Synthesize Output', x: 80, y: 220 },
    ],
    edges: [
      { source: 'Task_1', target: 'Task_2' },
      { source: 'Task_2', target: 'Task_3' },
      { source: 'Task_3', target: 'Task_4' },
      { source: 'Task_4', target: 'Task_1' }, // Deadlock cycle!
    ],
  },
  {
    id: 'diamond',
    name: '৩. ডায়মন্ড কনকারেন্সি (Diamond DAG)',
    badge: 'প্যারালাল ব্রাঞ্চিং • কনকারেন্ট',
    badgeType: 'sky',
    recommendedAlgo: 'kahn',
    summary: 'একটি টাস্ক থেকে দুটি প্যারালাল ওয়ার্কার চালু হয়ে শেষে জয়ন হওয়া।',
    purpose: 'একসাথে একাধিক নোডের In-Degree 0 হওয়া এবং স্বাধীন টাস্কগুলো সমান্তরালে এক্সেকিউট হওয়া পর্যবেক্ষণ করা।',
    nodes: [
      { id: 'Start', label: 'Start: Ingest Document', x: 60, y: 140 },
      { id: 'Branch_A', label: 'Worker A: Extract Entities', x: 320, y: 60 },
      { id: 'Branch_B', label: 'Worker B: Generate Summary', x: 320, y: 220 },
      { id: 'Join', label: 'Join: Commit to Vector DB', x: 600, y: 140 },
    ],
    edges: [
      { source: 'Start', target: 'Branch_A' },
      { source: 'Start', target: 'Branch_B' },
      { source: 'Branch_A', target: 'Join' },
      { source: 'Branch_B', target: 'Join' },
    ],
  },
];
