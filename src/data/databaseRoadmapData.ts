import React from 'react';
import {
  HardDrive,
  Search,
  Database,
  Cpu,
  Sparkles,
  Split
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

/* -------------------------------------------------------------
 * PROJECT-LIKE FOLDER STRUCTURE DATA
 * -----------------------------------------------------------*/

export interface ProjectFile {
  name: string;
  nameBn: string;
  ext: string;
  tag: string;
  note: string; // কী নিয়ে কাজ করে / ভেতরে কী ঘটবে
  codeSnippet?: string;
  labId?: TopicId;
  labLabel?: string;
}

export interface ProjectSubFolder {
  name: string;
  nameBn: string;
  files: ProjectFile[];
}

export interface ProjectFolder {
  id: string;
  number: string;
  folderName: string;
  titleBn: string;
  icon: React.ElementType;
  color: string;
  summary: string;
  subfolders: ProjectSubFolder[];
}

export const PROJECT_FOLDERS: ProjectFolder[] = [
  {
    id: 'f-paradigm',
    number: '00',
    folderName: '00_paradigm_choice',
    titleBn: 'প্যারাডাইম নির্বাচন (SQL বনাম NoSQL)',
    icon: Split,
    color: 'text-indigo-400',
    summary: 'প্রজেক্টের ডেটা মডেল অনুযায়ী রিলেশনাল বনাম নন-রিলেশনাল ডেটাবেস নির্ধারণ।',
    subfolders: [
      {
        name: 'sql_relational',
        nameBn: 'রিলেশনাল পাথ (PostgreSQL / MySQL)',
        files: [
          {
            name: 'schema_and_acid.sql',
            nameBn: 'টেবিল স্কিমা ও এসিআইডি ট্রানজ্যাকশন',
            ext: 'sql',
            tag: 'ACID',
            note: 'কঠোর কলাম টাইপ, ফরেন কী রিলেশনশিপ এবং কোনো ডেটা করাপ্ট না হওয়ার নিশ্চয়তা।',
            codeSnippet: `CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
          },
          {
            name: 'joins_and_relations.sql',
            nameBn: 'ফরেন কী ও রিলেশনাল জয়েন',
            ext: 'sql',
            tag: 'Relations',
            note: 'মাল্টিপল টেবিলকে প্রাইমারি কী দিয়ে লিংক করে দ্রুত ডেটা একত্রিত করা।',
            codeSnippet: `SELECT u.email, COUNT(m.id) as total_messages 
FROM users u 
JOIN messages m ON u.id = m.user_id 
GROUP BY u.email;`
          }
        ]
      },
      {
        name: 'nosql_systems',
        nameBn: 'নো-এসকিউএল পাথ (MongoDB / Redis)',
        files: [
          {
            name: 'mongodb_document_store.json',
            nameBn: 'মঙ্গোডিবি ফ্লেক্সিবল JSON ডক',
            ext: 'json',
            tag: 'MongoDB',
            note: 'ডায়নামিক স্কিমা; LLM চ্যাট মেসেজ ও এজেন্টের পরিবর্তনশীল মেমরি পেলোড সংরক্ষণ।',
            codeSnippet: `// MongoDB Collection: chat_sessions
{
  "_id": "sess_8912",
  "agent_id": "support_bot",
  "messages": [
    { "role": "user", "text": "Hello" },
    { "role": "assistant", "tokens": 42 }
  ]
}`
          },
          {
            name: 'redis_semantic_cache.py',
            nameBn: 'রেডিস ইন-মেমরি ক্যাশ ও রেট লিমিট',
            ext: 'py',
            tag: 'Redis',
            note: 'আল্ট্রা-ফাস্ট কী-ভ্যালু স্টোর; ঘন ঘন আসা একই প্রম্পটকে মেমরিতে ক্যাশ করে নিমেষেই রেসপন্স।',
            codeSnippet: `# Redis Semantic Prompt Caching
prompt_hash = sha256(user_prompt)
cached_answer = redis_client.get(f"prompt:{prompt_hash}")
if cached_answer:
    return cached_answer  # < 1ms response`
          }
        ]
      }
    ]
  },
  {
    id: 'f-storage',
    number: '01',
    folderName: '01_storage_engine',
    titleBn: 'স্টোরেজ ও ডিস্ক আর্কিটেকচার',
    icon: HardDrive,
    color: 'text-sky-400',
    summary: 'র‍্যাম ও হার্ডডিস্কের মধ্যে পেজ লেআউট, মেমরি ক্যাশ এবং ক্র্যাশ রিকভারি।',
    subfolders: [
      {
        name: 'page_layout',
        nameBn: 'ফাইল ও পেজ লেআউট',
        files: [
          {
            name: 'slotted_page_8kb.c',
            nameBn: '৮কেবি স্লটেড পেজ ইন্টারনালস',
            ext: 'c',
            tag: 'Memory Block',
            note: 'পেজের শুরুতে হেডার অফসেট থাকে, নিচ থেকে মূল রো-ডেটা উপরের দিকে বাড়ে।',
            codeSnippet: `// PostgreSQL PageLayout
typedef struct PageHeaderData {
    PageXLogRecPtr pd_lsn;      // LSN for WAL
    uint16         pd_lower;    // offset to start of free space
    uint16         pd_upper;    // offset to end of free space
} PageHeaderData;`
          },
          {
            name: 'tuple_header_xmin_xmax.sql',
            nameBn: 'টাপল হেডার (xmin/xmax)',
            ext: 'sql',
            tag: 'MVCC Header',
            note: 'প্রতিটি রো কোন ট্রানজ্যাকশন তৈরি করেছে বা ডিলিট করেছে তার হিস্টোরি ও রোলব্যাক ট্র্যাকিং।'
          },
          {
            name: 'fillfactor_fsm.conf',
            nameBn: 'ফিলফ্যাক্টর ও ফ্রি স্পেস ম্যাপ',
            ext: 'conf',
            tag: 'Disk Free Space',
            note: 'ভবিষ্যতের আপডেটের জন্য পেজে রিজার্ভ জায়গা রাখা যাতে ফ্র্যাগমেন্টেশন না হয়।'
          }
        ]
      },
      {
        name: 'buffer_pool',
        nameBn: 'বাফার পুল ও মেমরি ক্যাশ',
        files: [
          {
            name: 'shared_buffers_ram.rs',
            nameBn: 'শেয়ার্ড বাফার্স (RAM Pool)',
            ext: 'rs',
            tag: 'RAM Hit',
            note: 'ডেটাবেসের মূল র‍্যাম এরিয়া যেখানে পেজগুলো সরাসরি ক্যাশ থাকে (~100ns স্পিড)।'
          },
          {
            name: 'dirty_pages_bgwriter.c',
            nameBn: 'ডার্টি পেজ ও ব্যাকগ্রাউন্ড ফ্ল্যাশ',
            ext: 'c',
            tag: 'Async Flush',
            note: 'র‍্যামে মডিফাই হওয়া পেজ যা ব্যাকগ্রাউন্ডে ডিস্কে আস্তে আস্তে ফ্ল্যাশ হয়।'
          },
          {
            name: 'clock_sweep_eviction.ts',
            nameBn: 'ক্লক-সুইপ পেজ রিপ্লেসমেন্ট',
            ext: 'ts',
            tag: 'Cache Policy',
            note: 'র‍্যাম ভরে গেলে কম ব্যবহৃত পেজগুলোকে সরিয়ে নতুন পেজের জন্য খালি করার অ্যালগরিদম।'
          }
        ]
      },
      {
        name: 'durability_wal',
        nameBn: 'Write-Ahead Log ও রিকভারি',
        files: [
          {
            name: 'write_ahead_log.wal',
            nameBn: 'রাইট-এহেড লগ (WAL Append)',
            ext: 'wal',
            tag: 'Crash Safe',
            note: 'ডিস্কের মূল টেবিলে লেখার আগে ক্রমিক লগ ফাইলে এন্ট্রি নিশ্চিত করা।'
          },
          {
            name: 'checkpoint_lsn_recovery.log',
            nameBn: 'চেকপয়েন্টস ও LSN ট্র্যাকিং',
            ext: 'log',
            tag: 'Fast Replay',
            note: 'লগের ইউনিক ক্রমিক নম্বর ধরে ক্র্যাশ হলে শেষ চেকপয়েন্ট থেকে রিকভার করা।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-query',
    number: '02',
    folderName: '02_query_execution_planner',
    titleBn: 'কুয়েরি প্ল্যানার ও এক্সিকিউশন ইঞ্জিন',
    icon: Search,
    color: 'text-amber-400',
    summary: 'ডিক্লারেটিভ এসকিউএল থেকে কস্ট-বেসড এক্সিকিউশন ট্রি নির্ধারণ।',
    subfolders: [
      {
        name: 'lifecycle',
        nameBn: 'কুয়েরির জীবনচক্র',
        files: [
          {
            name: 'sql_parser_ast.json',
            nameBn: 'এসকিউএল পার্সার ও সিনট্যাক্স ট্রি',
            ext: 'json',
            tag: 'AST',
            note: 'SQL টেক্সট ব্যাকরণ যাচাই করে কম্পাইলারের মতো সিনট্যাক্স ট্রি তৈরি।'
          },
          {
            name: 'cost_based_optimizer.py',
            nameBn: 'কস্ট-বেসড অপ্টিমাইজার (CBO)',
            ext: 'py',
            tag: 'Cost Model',
            note: 'ডিস্ক I/O এবং CPU-র সবচেয়ে সস্তা গাণিতিক পাথ বেছে নিয়ে প্ল্যান বানানো।'
          }
        ]
      },
      {
        name: 'scan_operators',
        nameBn: 'স্ক্যান অপারেটরসমূহ',
        files: [
          {
            name: 'sequential_scan_on.sql',
            nameBn: 'সিকোয়েন্সিয়াল স্ক্যান (Seq Scan)',
            ext: 'sql',
            tag: 'O(N)',
            note: 'শুরু থেকে শেষ পর্যন্ত প্রতিটি রো একে একে চেক (ছোট টেবিলে ভালো, বড়তে স্লো)।',
            labId: 'backend-sql',
            labLabel: 'SQL কুয়েরি প্ল্যানার ল্যাবে দেখুন'
          },
          {
            name: 'index_scan_btree.sql',
            nameBn: 'ইনডেক্স স্ক্যান (B-Tree lookup)',
            ext: 'sql',
            tag: 'O(log N)',
            note: 'ইনডেক্স ট্রি থেকে সরাসরি রো-এর ঠিকানা (ctid) বের করে তাৎক্ষণিক রিড।',
            labId: 'backend-sql',
            labLabel: 'SQL কুয়েরি প্ল্যানার ল্যাবে দেখুন'
          },
          {
            name: 'bitmap_index_scan.sql',
            nameBn: 'বিটম্যাপ ইনডেক্স স্ক্যান',
            ext: 'sql',
            tag: 'Hybrid I/O',
            note: 'ইনডেক্স থেকে পাওয়া পেজ নম্বর মেমরিতে সর্ট করে ক্রমানুসারে ডিস্ক রিড।'
          }
        ]
      },
      {
        name: 'explain_analyze',
        nameBn: 'EXPLAIN ANALYZE ডিপ-ডাইভ',
        files: [
          {
            name: 'cost_startup_vs_total.explain',
            nameBn: 'স্টার্টআপ কস্ট বনাম টোটাল কস্ট',
            ext: 'explain',
            tag: 'Cost Metric',
            note: 'প্রথম রো পেতে কত খরচ আর পুরো কুয়েরি শেষ হতে মোট সম্ভাব্য খরচ কত।'
          },
          {
            name: 'buffers_workmem_spill.explain',
            nameBn: 'বাফার হিট ও ডিস্ক স্পিলিং',
            ext: 'explain',
            tag: 'Memory Audit',
            note: 'মেমরি ক্যাশ থেকে কতটুকু পড়ল এবং মেমরি কম হওয়ায় ডিস্কে স্পিল করল কিনা।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-indexing',
    number: '03',
    folderName: '03_indexing_access_paths',
    titleBn: 'বি-ট্রি ও সার্চ ইনডেক্সিং',
    icon: Database,
    color: 'text-emerald-400',
    summary: 'বইয়ের সূচিপত্রের মতো ডিস্ক-ফ্রেন্ডলি ব্যালেন্সড ট্রি দিয়ে চোখের পলকে ডেটা সার্চ।',
    subfolders: [
      {
        name: 'btree_internals',
        nameBn: 'B+ Tree স্ট্রাকচার',
        files: [
          {
            name: 'high_fanout_depth.tree',
            nameBn: 'উচ্চ ফ্যান-আউট (৩-৪ লেভেল)',
            ext: 'tree',
            tag: 'Shallow Depth',
            note: 'প্রতি নোডে শ-খানেক কী থাকে, ফলে ট্রির গভীরতা সবসময় ছোট থাকে (কম ডিস্ক I/O)।',
            labId: 'backend-indexing',
            labLabel: 'B-Tree ইনডেক্স বেঞ্চমার্ক ল্যাব'
          },
          {
            name: 'leaf_node_chain.linked',
            nameBn: 'ডাবলি-লিঙ্কড লিফ পেজ চেইন',
            ext: 'linked',
            tag: 'Range Chain',
            note: 'সবচেয়ে নিচের লিফ পেজগুলো চেইনে যুক্ত, যা রেঞ্জ কুয়েরি (BETWEEN) দ্রুত করে।'
          }
        ]
      },
      {
        name: 'composite_indexes',
        nameBn: 'কম্পোজিট ইনডেক্স রুলস',
        files: [
          {
            name: 'leftmost_prefix_rule.sql',
            nameBn: 'বামদিকের কলামের অগ্রাধিকার নিয়ম',
            ext: 'sql',
            tag: 'Design Rule',
            note: 'ইনডেক্স (A, B) হলে WHERE A = ... কাজ করবে, কিন্তু একা WHERE B = ... কাজ করবে না।'
          },
          {
            name: 'selectivity_cardinality.sql',
            nameBn: 'সিলেক্টিভিটি ও ইউনিকনেস',
            ext: 'sql',
            tag: 'Selectivity',
            note: 'ইউনিক ভ্যালু বেশি থাকলে ইনডেক্স ভালো কাজ করে; কম ইউনিক হলে প্ল্যানার ইনডেক্স বাতিল করে।'
          },
          {
            name: 'index_only_covering.sql',
            nameBn: 'ইনডেক্স-অনলি স্ক্যান (INCLUDE)',
            ext: 'sql',
            tag: 'Zero Heap Read',
            note: 'কুয়েরির সব কলাম ইনডেক্সেই থাকলে টেবিল পেজ রিড করাই লাগে না (জিরো ডিস্ক I/O)।'
          }
        ]
      },
      {
        name: 'specialized_indexes',
        nameBn: 'অন্যান্য স্পেশালাইজড ইনডেক্স',
        files: [
          {
            name: 'gin_inverted_jsonb.sql',
            nameBn: 'জিআইএন (GIN) ইনডেক্স',
            ext: 'sql',
            tag: 'Full-Text/JSON',
            note: 'JSONB অ্যারে বা টেক্সটের প্রতি শব্দের বিপরীতে ডকুমেন্ট ম্যাপ করে রাখে।'
          },
          {
            name: 'brin_block_range.sql',
            nameBn: 'ব্রিন (BRIN) ইনডেক্স',
            ext: 'sql',
            tag: 'Big Data Logs',
            note: 'প্রতি কয়েকশো পেজের সর্বনিম্ন ও সর্বোচ্চ মান রেখে বড় টাইম-সিরিজ লগে মেমরি বাঁচায়।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-vector',
    number: '04',
    folderName: '04_vector_databases_pgvector',
    titleBn: 'ভেক্টর ডেটাবেস ও এআই সার্চ (pgvector)',
    icon: Cpu,
    color: 'text-purple-400',
    summary: 'শব্দ বা ডকুমেন্টের ভাবার্থকে সংখ্যার ভেক্টরে রূপান্তর ও সিমিলারিটি সার্চ।',
    subfolders: [
      {
        name: 'embeddings_space',
        nameBn: 'হাই-ডাইমেনশনাল ভেক্টর স্পেস',
        files: [
          {
            name: 'dense_vectors_768d_1536d.vec',
            nameBn: 'ডেন্স এম্বেডিংস ভেক্টর',
            ext: 'vec',
            tag: 'AI Vectors',
            note: 'শব্দের অর্থ জ্যামিতিক স্থানাঙ্কে প্রকাশ, সমার্থক শব্দগুলো স্পেসে কাছাকাছি থাকে।'
          },
          {
            name: 'distance_metrics_cosine_l2.math',
            nameBn: 'দূরত্ব মাপার ৩টি গাণিতিক পরিমাপ',
            ext: 'math',
            tag: 'Vector Math',
            note: 'কোসাইন (ভেক্টরের কোণ), L2 (সরলরেখীয় দূরত্ব), ডট প্রোডাক্ট (ইনটেনসিটি)।'
          }
        ]
      },
      {
        name: 'vector_index_algorithms',
        nameBn: 'ভেক্টর ইনডেক্সিং অ্যালগরিদম',
        files: [
          {
            name: 'ivfflat_voronoi_cells.kmeans',
            nameBn: 'আইভিএফ-ফ্ল্যাট (IVFFlat)',
            ext: 'kmeans',
            tag: 'Voronoi Cells',
            note: 'ভেক্টর স্পেসকে ক্লাস্টারে ভাগ করে সার্চের পরিধি ছোট করা (মেমরি সাশ্রয়ী)।',
            labId: 'backend-pgvector',
            labLabel: 'pgvector ভেক্টর ল্যাব চালান'
          },
          {
            name: 'hnsw_multilevel_graph.hnsw',
            nameBn: 'এইচএনএসডব্লিউ (HNSW গ্রাফ)',
            ext: 'hnsw',
            tag: 'Gold Standard',
            note: 'মাল্টি-লেয়ার জ্যামিতিক গ্রাফ স্কিপ-লিস্ট; সাব-মিলিসেকেন্ডে ৯৮%+ নিখুঁত রেজাল্ট দেয়।',
            labId: 'backend-pgvector',
            labLabel: 'pgvector ভেক্টর ল্যাব চালান'
          },
          {
            name: 'quantization_pq_sq.compress',
            nameBn: 'ভেক্টর কোয়ান্টাইজেশন',
            ext: 'compress',
            tag: 'Compression',
            note: '৩২-বিট ভেক্টরকে ৮-বিটে সংকুচিত করে ৪ গুণ কম র‍্যামে কোটি ডেটা চালানো।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-scaling',
    number: '05',
    folderName: '05_scaling_hybrid_rag',
    titleBn: 'প্রোডাকশন স্কেলিং ও হাইব্রিড RAG সিস্টেম',
    icon: Sparkles,
    color: 'text-indigo-400',
    summary: 'কনকারেন্সি কন্ট্রোল, কানেকশন পুলিং এবং ফুল-টেক্সট ও ভেক্টর মিলিয়ে শতভাগ নির্ভুল RAG।',
    subfolders: [
      {
        name: 'concurrency_mvcc',
        nameBn: 'কনকারেন্সি ও MVCC ইন্টারনালস',
        files: [
          {
            name: 'snapshot_isolation.sql',
            nameBn: 'স্ন্যাপশট আইসোলেশন (নন-ব্লকিং রিড)',
            ext: 'sql',
            tag: 'Non-blocking',
            note: 'রিডার কখনো রাইটারকে ব্লক করে না, প্রতি ট্রানজ্যাকশন ডেটার একটি স্থির ছবি দেখে।'
          },
          {
            name: 'autovacuum_dead_tuples.sh',
            nameBn: 'অটোভ্যাকুয়াম ও Bloat রিমুভাল',
            ext: 'sh',
            tag: 'Garbage Clean',
            note: 'ডিলিট হওয়া পুরনো ডেটার মেমরি স্পেস ব্যাকগ্রাউন্ডে পরিষ্কার করে স্পিড বজায় রাখা।'
          }
        ]
      },
      {
        name: 'connection_pooling',
        nameBn: 'কানেকশন পুলিং',
        files: [
          {
            name: 'pgbouncer_transaction_mode.ini',
            nameBn: 'পিজিবাইন্সার কানেকশন পুলার',
            ext: 'ini',
            tag: 'Concurrency',
            note: 'সার্ভারলেস এআই এজেন্টদের জন্য ফিক্সড পুল দিয়ে সার্ভারের র‍্যাম ক্র্যাশ ঠেকানো।'
          }
        ]
      },
      {
        name: 'hybrid_search',
        nameBn: 'হাইব্রিড RAG পাইপলাইন',
        files: [
          {
            name: 'rrf_rank_fusion.ts',
            nameBn: 'র‍্যাংক ফিউশন অ্যালগরিদম (RRF)',
            ext: 'ts',
            tag: 'Hybrid Fusion',
            note: 'BM25 কি-ওয়ার্ড স্কোর এবং HNSW ভেক্টর স্কোরকে একসাথে মিলিয়ে নিখুঁত র‍্যাংকিং।'
          },
          {
            name: 'cross_encoder_reranker.py',
            nameBn: 'ক্রস-এনকোডার রি-র‍্যাঙ্কার',
            ext: 'py',
            tag: 'Zero Hallucination',
            note: 'সেরা ৩০-৪০টি রেজাল্টকে ডিপ লার্নিং দিয়ে পুনরায় নিখুঁতভাবে সাজিয়ে LLM-এ পাঠানো।'
          }
        ]
      }
    ]
  }
];
