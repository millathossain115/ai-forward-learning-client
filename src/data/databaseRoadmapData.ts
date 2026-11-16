import React from 'react';
import {
  HardDrive,
  Search,
  Database,
  Cpu,
  Sparkles,
  Split,
  BookOpen,
  Layers,
  FileText
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

/* -------------------------------------------------------------
 * 1. PROJECT-LIKE FOLDER STRUCTURE DATA WITH PARADIGM TAGS
 * -----------------------------------------------------------*/

export type ParadigmType = 'all' | 'sql' | 'nosql' | 'hybrid';

export interface ProjectFile {
  name: string;
  nameBn: string;
  ext: string;
  tag: string;
  note: string; // কী নিয়ে কাজ করে / ভেতরে কী ঘটবে
  codeSnippet?: string;
  labId?: TopicId;
  labLabel?: string;
  paradigm?: ParadigmType;
}

export interface ProjectSubFolder {
  name: string;
  nameBn: string;
  paradigm?: ParadigmType;
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
  paradigm: ParadigmType;
  subfolders: ProjectSubFolder[];
}

export const PROJECT_FOLDERS: ProjectFolder[] = [
  {
    id: 'f-foundations',
    number: '00',
    folderName: '00_database_foundations',
    titleBn: '০. ডেটাবেস পরিচিতি: ডেটাবেস কী এবং কেন প্রয়োজন?',
    icon: BookOpen,
    color: 'text-amber-400',
    summary: 'ফাইল সিস্টেম (CSV/JSON) বনাম ডেটাবেস ইঞ্জিন, মেমরি ও ডিস্কের দ্বন্দ্ব এবং ক্র্যাশ প্রটেকশন।',
    paradigm: 'all',
    subfolders: [
      {
        name: 'why_not_plain_files',
        nameBn: 'সাধারণ ফাইল সিস্টেম বনাম ডেটাবেস',
        paradigm: 'all',
        files: [
          {
            name: 'file_system_crash_risk.md',
            nameBn: 'ফাইল করাপশন ও ক্র্যাশ ঝুঁকি',
            ext: 'md',
            tag: 'Data Safety',
            paradigm: 'all',
            note: 'পাইথন দিয়ে JSON বা টেক্সট ফাইলে ডেটা লেখার সময় বিদ্যুৎ চলে গেলে বা অ্যাপ ক্র্যাশ করলে ফাইল করাপ্ট হয়ে যায়। ডেটাবেস WAL লগের মাধ্যমে এটি ১০০% রোধ করে।',
            codeSnippet: `// ❌ সাধারণ ফাইল রাইট (ঝুঁকিপূর্ণ)
with open("users.json", "w") as f:
    f.write(json_data)  # মাঝপথে বিদ্যুৎ চলে গেলে ফাইল ব্ল্যাঙ্ক বা নষ্ট!

// ✅ ডেটাবেস ট্রানজ্যাকশন (নিরাপদ)
BEGIN TRANSACTION;
INSERT INTO users ...;
COMMIT;  -- বিদ্যুৎ চলে গেলেও ডেটা সুরক্ষিত`
          },
          {
            name: 'concurrency_race_condition.md',
            nameBn: 'কনকারেন্সি ও ডেটা ওভাররাইট সমস্যা',
            ext: 'md',
            tag: 'Concurrency',
            paradigm: 'all',
            note: 'একসাথে ১০০ জন ইউজার একই JSON ফাইলে লিখতে গেলে ডেটা হারিয়ে যায় (Race Condition)। ডেটাবেস রো-লেভেল লকিং ও MVCC দিয়ে এটি সমাধান করে।',
            codeSnippet: `// একাধিক এআই এজেন্ট যখন একই সাথে চ্যাট স্টেট সেভ করতে চায়:
// ডেটাবেস প্রতিটি রিকোয়েস্ট আলাদা আইসোলেশনে এক্সিকিউট করে।`
          }
        ]
      },
      {
        name: 'core_dbms_architecture',
        nameBn: 'ডেটাবেস ইঞ্জিনের মূল দায়িত্ব',
        paradigm: 'all',
        files: [
          {
            name: 'ram_vs_disk_hierarchy.mem',
            nameBn: 'র‍্যাম বনাম ডিস্কের স্পিড গ্যাপ',
            ext: 'mem',
            tag: 'Hardware Hierarchy',
            paradigm: 'all',
            note: 'র‍্যামে ডেটা রিড করতে ১০০ ন্যানো-সেকেন্ড লাগে কিন্তু বিদ্যুৎ গেলে ডেটা থাকে না। ডিস্কে স্থায়ীভাবে থাকে কিন্তু ১০ মিলি-সেকেন্ড লাগে (১ লাখ গুণ স্লো)। ডেটাবেস এই দুটির নিখুঁত ব্যালেন্স করে।',
            codeSnippet: `[CPU Registers: 1ns]
      ↓
[RAM Buffer Cache: 100ns]  <-- Hot Pages
      ↓
[NVMe SSD Disk: 100μs]     <-- WAL Log
      ↓
[HDD / Persistent: 10ms]   <-- Cold Tables`
          },
          {
            name: 'acid_guarantees.txt',
            nameBn: 'ACID গ্যারান্টির মূলনীতি',
            ext: 'txt',
            tag: 'ACID Pillars',
            paradigm: 'all',
            note: 'Atomicity (সব হবে নয়তো কিছুই হবে না), Consistency (নিয়ম ভঙ্গ হবে না), Isolation (একে অন্যকে বিরক্ত করবে না), Durability (বিদ্যুৎ গেলেও ডেটা মুছবে না)।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-paradigm',
    number: '01',
    folderName: '01_paradigm_choice',
    titleBn: '১. প্যারাডাইম নির্বাচন: SQL বনাম NoSQL',
    icon: Split,
    color: 'text-indigo-400',
    summary: 'প্রজেক্টের ডেটা মডেল অনুযায়ী রিলেশনাল বনাম নন-রিলেশনাল ডেটাবেস নির্ধারণ।',
    paradigm: 'all',
    subfolders: [
      {
        name: 'sql_relational_path',
        nameBn: 'রিলেশনাল SQL পাথ (PostgreSQL / MySQL)',
        paradigm: 'sql',
        files: [
          {
            name: 'schema_and_acid.sql',
            nameBn: 'টেবিল স্কিমা ও রিলেশনাল মডেল',
            ext: 'sql',
            tag: 'PostgreSQL',
            paradigm: 'sql',
            note: 'কঠোর কলাম টাইপ, ফরেন কী রিলেশনশিপ এবং কোনো ডেটা করাপ্ট না হওয়ার নিশ্চয়তা। ইউজার একাউন্ট, বিলিং ও ট্রানজ্যাকশনের মূল ভিত্তি।',
            codeSnippet: `CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
          },
          {
            name: 'joins_and_foreign_keys.sql',
            nameBn: 'ফরেন কী ও রিলেশনাল জয়েন (JOIN)',
            ext: 'sql',
            tag: 'Relations',
            paradigm: 'sql',
            note: 'মাল্টিপল টেবিলকে প্রাইমারি কী দিয়ে লিংক করে দ্রুত ডেটা একত্রিত করা (1-to-Many, Many-to-Many)।',
            codeSnippet: `SELECT u.email, COUNT(m.id) as total_messages 
FROM users u 
JOIN messages m ON u.id = m.user_id 
GROUP BY u.email;`
          }
        ]
      },
      {
        name: 'nosql_systems_path',
        nameBn: 'নো-এসকিউএল পাথ (MongoDB / Redis)',
        paradigm: 'nosql',
        files: [
          {
            name: 'mongodb_document_store.json',
            nameBn: 'মঙ্গোডিবি ফ্লেক্সিবল JSON ডক',
            ext: 'json',
            tag: 'MongoDB',
            paradigm: 'nosql',
            note: 'ডায়নামিক স্কিমা; LLM চ্যাট মেসেজ, আনস্ট্রাকচার্ড এজেন্ট স্ক্র্যাচপ্যাড ও পরিবর্তনশীল মেটাডেটা স্টোরেজ।',
            codeSnippet: `// MongoDB Collection: chat_sessions
{
  "_id": "sess_8912",
  "agent_id": "support_bot",
  "context": { "user_intent": "billing_issue" },
  "messages": [
    { "role": "user", "text": "Can I get a refund?" },
    { "role": "assistant", "tokens": 42 }
  ]
}`
          },
          {
            name: 'redis_semantic_cache.py',
            nameBn: 'রেডিস ইন-মেমরি ক্যাশ ও রেট লিমিট',
            ext: 'py',
            tag: 'Redis',
            paradigm: 'nosql',
            note: 'আল্ট্রা-ফাস্ট ইন-মেমরি কী-ভ্যালু; একই প্রম্পটের উত্তর বারবার LLM-কে কল না করে মিলি-সেকেন্ডে মেমরি ক্যাশ থেকে রিটার্ন করা।',
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
    number: '02',
    folderName: '02_storage_engine',
    titleBn: '২. স্টোরেজ ও ডিস্ক আর্কিটেকচার (PostgreSQL)',
    icon: HardDrive,
    color: 'text-sky-400',
    summary: 'র‍্যাম ও হার্ডডিস্কের মধ্যে পেজ লেআউট, মেমরি ক্যাশ এবং ক্র্যাশ রিকভারি।',
    paradigm: 'sql',
    subfolders: [
      {
        name: 'page_layout',
        nameBn: 'ফাইল ও পেজ লেআউট',
        paradigm: 'sql',
        files: [
          {
            name: 'slotted_page_8kb.c',
            nameBn: '৮কেবি স্লটেড পেজ ইন্টারনালস',
            ext: 'c',
            tag: 'Memory Block',
            paradigm: 'sql',
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
            paradigm: 'sql',
            note: 'প্রতিটি রো কোন ট্রানজ্যাকশন তৈরি করেছে বা ডিলিট করেছে তার হিস্টোরি ও রোলব্যাক ট্র্যাকিং।'
          },
          {
            name: 'fillfactor_fsm.conf',
            nameBn: 'ফিলফ্যাক্টর ও ফ্রি স্পেস ম্যাপ',
            ext: 'conf',
            tag: 'Disk Free Space',
            paradigm: 'sql',
            note: 'ভবিষ্যতের আপডেটের জন্য পেজে রিজার্ভ জায়গা রাখা যাতে ফ্র্যাগমেন্টেশন না হয়।'
          }
        ]
      },
      {
        name: 'buffer_pool',
        nameBn: 'বাফার পুল ও মেমরি ক্যাশ',
        paradigm: 'sql',
        files: [
          {
            name: 'shared_buffers_ram.rs',
            nameBn: 'শেয়ার্ড বাফার্স (RAM Pool)',
            ext: 'rs',
            tag: 'RAM Hit',
            paradigm: 'sql',
            note: 'ডেটাবেসের মূল র‍্যাম এরিয়া যেখানে পেজগুলো সরাসরি ক্যাশ থাকে (~100ns স্পিড)।'
          },
          {
            name: 'dirty_pages_bgwriter.c',
            nameBn: 'ডার্টি পেজ ও ব্যাকগ্রাউন্ড ফ্ল্যাশ',
            ext: 'c',
            tag: 'Async Flush',
            paradigm: 'sql',
            note: 'র‍্যামে মডিফাই হওয়া পেজ যা ব্যাকগ্রাউন্ডে ডিস্কে আস্তে আস্তে ফ্ল্যাশ হয়।'
          },
          {
            name: 'clock_sweep_eviction.ts',
            nameBn: 'ক্লক-সুইপ পেজ রিপ্লেসমেন্ট',
            ext: 'ts',
            tag: 'Cache Policy',
            paradigm: 'sql',
            note: 'র‍্যাম ভরে গেলে কম ব্যবহৃত পেজগুলোকে সরিয়ে নতুন পেজের জন্য খালি করার অ্যালগরিদম।'
          }
        ]
      },
      {
        name: 'durability_wal',
        nameBn: 'Write-Ahead Log ও রিকভারি',
        paradigm: 'sql',
        files: [
          {
            name: 'write_ahead_log.wal',
            nameBn: 'রাইট-এহেড লগ (WAL Append)',
            ext: 'wal',
            tag: 'Crash Safe',
            paradigm: 'sql',
            note: 'ডিস্কের মূল টেবিলে লেখার আগে ক্রমিক লগ ফাইলে এন্ট্রি নিশ্চিত করা।'
          },
          {
            name: 'checkpoint_lsn_recovery.log',
            nameBn: 'চেকপয়েন্টস ও LSN ট্র্যাকিং',
            ext: 'log',
            tag: 'Fast Replay',
            paradigm: 'sql',
            note: 'লগের ইউনিক ক্রমিক নম্বর ধরে ক্র্যাশ হলে শেষ চেকপয়েন্ট থেকে রিকভার করা।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-query',
    number: '03',
    folderName: '03_query_execution_planner',
    titleBn: '৩. কুয়েরি প্ল্যানার ও এক্সিকিউশন ইঞ্জিন (SQL)',
    icon: Search,
    color: 'text-amber-400',
    summary: 'ডিক্লারেটিভ এসকিউএল থেকে কস্ট-বেসড এক্সিকিউশন ট্রি নির্ধারণ।',
    paradigm: 'sql',
    subfolders: [
      {
        name: 'lifecycle',
        nameBn: 'কুয়েরির জীবনচক্র',
        paradigm: 'sql',
        files: [
          {
            name: 'sql_parser_ast.json',
            nameBn: 'এসকিউএল পার্সার ও সিনট্যাক্স ট্রি',
            ext: 'json',
            tag: 'AST',
            paradigm: 'sql',
            note: 'SQL টেক্সট ব্যাকরণ যাচাই করে কম্পাইলারের মতো সিনট্যাক্স ট্রি তৈরি।'
          },
          {
            name: 'cost_based_optimizer.py',
            nameBn: 'কস্ট-বেসড অপ্টিমাইজার (CBO)',
            ext: 'py',
            tag: 'Cost Model',
            paradigm: 'sql',
            note: 'ডিস্ক I/O এবং CPU-র সবচেয়ে সস্তা গাণিতিক পাথ বেছে নিয়ে প্ল্যান বানানো।'
          }
        ]
      },
      {
        name: 'scan_operators',
        nameBn: 'স্ক্যান অপারেটরসমূহ',
        paradigm: 'sql',
        files: [
          {
            name: 'sequential_scan_on.sql',
            nameBn: 'সিকোয়েন্সিয়াল স্ক্যান (Seq Scan)',
            ext: 'sql',
            tag: 'O(N)',
            paradigm: 'sql',
            note: 'শুরু থেকে শেষ পর্যন্ত প্রতিটি রো একে একে চেক (ছোট টেবিলে ভালো, বড়তে স্লো)।',
            labId: 'backend-sql',
            labLabel: 'SQL কুয়েরি প্ল্যানার ল্যাবে দেখুন'
          },
          {
            name: 'index_scan_btree.sql',
            nameBn: 'ইনডেক্স স্ক্যান (B-Tree lookup)',
            ext: 'sql',
            tag: 'O(log N)',
            paradigm: 'sql',
            note: 'ইনডেক্স ট্রি থেকে সরাসরি রো-এর ঠিকানা (ctid) বের করে তাৎক্ষণিক রিড।',
            labId: 'backend-sql',
            labLabel: 'SQL কুয়েরি প্ল্যানার ল্যাবে দেখুন'
          },
          {
            name: 'bitmap_index_scan.sql',
            nameBn: 'বিটম্যাপ ইনডেক্স স্ক্যান',
            ext: 'sql',
            tag: 'Hybrid I/O',
            paradigm: 'sql',
            note: 'ইনডেক্স থেকে পাওয়া পেজ নম্বর মেমরিতে সর্ট করে ক্রমানুসারে ডিস্ক রিড।'
          }
        ]
      },
      {
        name: 'explain_analyze',
        nameBn: 'EXPLAIN ANALYZE ডিপ-ডাইভ',
        paradigm: 'sql',
        files: [
          {
            name: 'cost_startup_vs_total.explain',
            nameBn: 'স্টার্টআপ কস্ট বনাম টোটাল কস্ট',
            ext: 'explain',
            tag: 'Cost Metric',
            paradigm: 'sql',
            note: 'প্রথম রো পেতে কত খরচ আর পুরো কুয়েরি শেষ হতে মোট সম্ভাব্য খরচ কত।'
          },
          {
            name: 'buffers_workmem_spill.explain',
            nameBn: 'বাফার হিট ও ডিস্ক স্পিলিং',
            ext: 'explain',
            tag: 'Memory Audit',
            paradigm: 'sql',
            note: 'মেমরি ক্যাশ থেকে কতটুকু পড়ল এবং মেমরি কম হওয়ায় ডিস্কে স্পিল করল কিনা।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-indexing',
    number: '04',
    folderName: '04_indexing_access_paths',
    titleBn: '৪. বি-ট্রি ও সার্চ ইনডেক্সিং (SQL & Beyond)',
    icon: Database,
    color: 'text-emerald-400',
    summary: 'বইয়ের সূচিপত্রের মতো ডিস্ক-ফ্রেন্ডলি ব্যালেন্সড ট্রি দিয়ে চোখের পলকে ডেটা সার্চ।',
    paradigm: 'sql',
    subfolders: [
      {
        name: 'btree_internals',
        nameBn: 'B+ Tree স্ট্রাকচার',
        paradigm: 'sql',
        files: [
          {
            name: 'high_fanout_depth.tree',
            nameBn: 'উচ্চ ফ্যান-আউট (৩-৪ লেভেল)',
            ext: 'tree',
            tag: 'Shallow Depth',
            paradigm: 'sql',
            note: 'প্রতি নোডে শত শত কী থাকে, ফলে ট্রির গভীরতা সবসময় ছোট থাকে (কম ডিস্ক I/O)।',
            labId: 'backend-indexing',
            labLabel: 'B-Tree ইনডেক্স বেঞ্চমার্ক ল্যাব'
          },
          {
            name: 'leaf_node_chain.linked',
            nameBn: 'ডাবলি-লিঙ্কড লিফ পেজ চেইন',
            ext: 'linked',
            tag: 'Range Chain',
            paradigm: 'sql',
            note: 'সবচেয়ে নিচের লিফ পেজগুলো চেইনে যুক্ত, যা রেঞ্জ কুয়েরি (BETWEEN) দ্রুত করে।'
          }
        ]
      },
      {
        name: 'composite_indexes',
        nameBn: 'কম্পোজিট ইনডেক্স রুলস',
        paradigm: 'sql',
        files: [
          {
            name: 'leftmost_prefix_rule.sql',
            nameBn: 'বামদিকের কলামের অগ্রাধিকার নিয়ম',
            ext: 'sql',
            tag: 'Design Rule',
            paradigm: 'sql',
            note: 'ইনডেক্স (A, B) হলে WHERE A = ... কাজ করবে, কিন্তু একা WHERE B = ... কাজ করবে না।'
          },
          {
            name: 'selectivity_cardinality.sql',
            nameBn: 'সিলেক্টিভিটি ও ইউনিকনেস',
            ext: 'sql',
            tag: 'Selectivity',
            paradigm: 'sql',
            note: 'ইউনিক ভ্যালু বেশি থাকলে ইনডেক্স ভালো কাজ করে; কম ইউনিক হলে প্ল্যানার ইনডেক্স বাতিল করে।'
          },
          {
            name: 'index_only_covering.sql',
            nameBn: 'ইনডেক্স-অনলি স্ক্যান (INCLUDE)',
            ext: 'sql',
            tag: 'Zero Heap Read',
            paradigm: 'sql',
            note: 'কুয়েরির সব কলাম ইনডেক্সেই থাকলে টেবিল পেজ রিড করাই লাগে না (জিরো ডিস্ক I/O)।'
          }
        ]
      },
      {
        name: 'specialized_indexes',
        nameBn: 'অন্যান্য স্পেশালাইজড ইনডেক্স',
        paradigm: 'sql',
        files: [
          {
            name: 'gin_inverted_jsonb.sql',
            nameBn: 'জিআইএন (GIN) ইনডেক্স',
            ext: 'sql',
            tag: 'Full-Text/JSON',
            paradigm: 'sql',
            note: 'JSONB অ্যারে বা টেক্সটের প্রতি শব্দের বিপরীতে ডকুমেন্ট ম্যাপ করে রাখে।'
          },
          {
            name: 'brin_block_range.sql',
            nameBn: 'ব্রিন (BRIN) ইনডেক্স',
            ext: 'sql',
            tag: 'Big Data Logs',
            paradigm: 'sql',
            note: 'প্রতি কয়েকশো পেজের সর্বনিম্ন ও সর্বোচ্চ মান রেখে বড় টাইম-সিরিজ লগে মেমরি বাঁচায়।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-nosql-deepdive',
    number: '05',
    folderName: '05_nosql_architecture',
    titleBn: '৫. নো-এসকিউএল আর্কিটেকচার (MongoDB ও Redis)',
    icon: Layers,
    color: 'text-teal-400',
    summary: 'ডকুমেন্ট ডাটাবেস, এগ্রিগেশন পাইপলাইন এবং ইন-মেমরি ক্যাশিং মেকানিজম।',
    paradigm: 'nosql',
    subfolders: [
      {
        name: 'mongodb_architecture',
        nameBn: 'মঙ্গোডিবি আর্কিটেকচার ও কালেকশনস',
        paradigm: 'nosql',
        files: [
          {
            name: 'document_vs_relational_model.json',
            nameBn: 'ডকুমেন্ট এম্বেডিং বনাম রেফারেন্সিং',
            ext: 'json',
            tag: 'MongoDB Schema',
            paradigm: 'nosql',
            note: 'সম্পর্কিত ডেটাকে আলাদা টেবিল না করে একই JSON ডকুমেন্টে সাব-অ্যারে আকারে এম্বেড করা।'
          },
          {
            name: 'aggregation_pipeline.json',
            nameBn: 'মঙ্গোডিবি এগ্রিগেশন পাইপলাইন',
            ext: 'json',
            tag: 'Aggregation',
            paradigm: 'nosql',
            note: '$match, $group, $project ইত্যাদি মাল্টি-স্টেজ পাইপলাইনের মাধ্যমে কমপ্লেক্স ডেটা ট্রান্সফর্ম করা।'
          }
        ]
      },
      {
        name: 'redis_caching_patterns',
        nameBn: 'রেডিস ক্যাশিং প্যাটার্নস',
        paradigm: 'nosql',
        files: [
          {
            name: 'cache_aside_and_ttl.py',
            nameBn: 'ক্যাশ-অ্যাসাইড ও টিটিএল (TTL) এক্সপায়ার',
            ext: 'py',
            tag: 'Cache Pattern',
            paradigm: 'nosql',
            note: 'প্রথমে ক্যাশে চেক করা, না পেলে মূল ডেটাবেস থেকে এনে নির্দিষ্ট মেয়াদের (TTL) জন্য ক্যাশ করা।'
          },
          {
            name: 'pub_sub_and_sessions.py',
            nameBn: 'পাব/সাব ও সেশন ম্যানেজমেন্ট',
            ext: 'py',
            tag: 'Pub/Sub',
            paradigm: 'nosql',
            note: 'রিয়েলটাইম মেসেজিং ব্রডকাস্ট এবং ডিস্ট্রিবিউটেড মাইক্রোসার্ভিস সেশন স্টোর।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-vector',
    number: '06',
    folderName: '06_vector_databases_pgvector',
    titleBn: '৬. ভেক্টর ডেটাবেস ও এআই সার্চ (pgvector)',
    icon: Cpu,
    color: 'text-purple-400',
    summary: 'শব্দ বা ডকুমেন্টের ভাবার্থকে সংখ্যার ভেক্টরে রূপান্তর ও সিমিলারিটি সার্চ।',
    paradigm: 'hybrid',
    subfolders: [
      {
        name: 'embeddings_space',
        nameBn: 'হাই-ডাইমেনশনাল ভেক্টর স্পেস',
        paradigm: 'hybrid',
        files: [
          {
            name: 'dense_vectors_768d_1536d.vec',
            nameBn: 'ডেন্স এম্বেডিংস ভেক্টর',
            ext: 'vec',
            tag: 'AI Vectors',
            paradigm: 'hybrid',
            note: 'শব্দের অর্থ জ্যামিতিক স্থানাঙ্কে প্রকাশ, সমার্থক শব্দগুলো স্পেসে কাছাকাছি থাকে।'
          },
          {
            name: 'distance_metrics_cosine_l2.math',
            nameBn: 'দূরত্ব মাপার ৩টি গাণিতিক পরিমাপ',
            ext: 'math',
            tag: 'Vector Math',
            paradigm: 'hybrid',
            note: 'কোসাইন (ভেক্টরের কোণ), L2 (সরলরেখীয় দূরত্ব), ডট প্রোডাক্ট (ইনটেনসিটি)।'
          }
        ]
      },
      {
        name: 'vector_index_algorithms',
        nameBn: 'ভেক্টর ইনডেক্সিং অ্যালগরিদম',
        paradigm: 'hybrid',
        files: [
          {
            name: 'ivfflat_voronoi_cells.kmeans',
            nameBn: 'আইভিএফ-ফ্ল্যাট (IVFFlat)',
            ext: 'kmeans',
            tag: 'Voronoi Cells',
            paradigm: 'hybrid',
            note: 'ভেক্টর স্পেসকে ক্লাস্টারে ভাগ করে সার্চের পরিধি ছোট করা (মেমরি সাশ্রয়ী)।',
            labId: 'backend-pgvector',
            labLabel: 'pgvector ভেক্টর ল্যাব চালান'
          },
          {
            name: 'hnsw_multilevel_graph.hnsw',
            nameBn: 'এইচএনএসডব্লিউ (HNSW গ্রাফ)',
            ext: 'hnsw',
            tag: 'Gold Standard',
            paradigm: 'hybrid',
            note: 'মাল্টি-লেয়ার জ্যামিতিক গ্রাফ স্কিপ-লিস্ট; সাব-মিলিসেকেন্ডে ৯৮%+ নিখুঁত রেজাল্ট দেয়।',
            labId: 'backend-pgvector',
            labLabel: 'pgvector ভেক্টর ল্যাব চালান'
          },
          {
            name: 'quantization_pq_sq.compress',
            nameBn: 'ভেক্টর কোয়ান্টাইজেশন',
            ext: 'compress',
            tag: 'Compression',
            paradigm: 'hybrid',
            note: '৩২-বিট ভেক্টরকে ৮-বিটে সংকুচিত করে ৪ গুণ কম র‍্যামে কোটি ডেটা চালানো।'
          }
        ]
      }
    ]
  },
  {
    id: 'f-scaling',
    number: '07',
    folderName: '07_scaling_hybrid_rag',
    titleBn: '৭. প্রোডাকশন স্কেলিং ও হাইব্রিড RAG সিস্টেম',
    icon: Sparkles,
    color: 'text-indigo-400',
    summary: 'কনকারেন্সি কন্ট্রোল, কানেকশন পুলিং এবং ফুল-টেক্সট ও ভেক্টর মিলিয়ে শতভাগ নির্ভুল RAG।',
    paradigm: 'hybrid',
    subfolders: [
      {
        name: 'concurrency_mvcc',
        nameBn: 'কনকারেন্সি ও MVCC ইন্টারনালস',
        paradigm: 'sql',
        files: [
          {
            name: 'snapshot_isolation.sql',
            nameBn: 'স্ন্যাপশট আইসোলেশন (নন-ব্লকিং রিড)',
            ext: 'sql',
            tag: 'Non-blocking',
            paradigm: 'sql',
            note: 'রিডার কখনো রাইটারকে ব্লক করে না, প্রতি ট্রানজ্যাকশন ডেটার একটি স্থির ছবি দেখে।'
          },
          {
            name: 'autovacuum_dead_tuples.sh',
            nameBn: 'অটোভ্যাকুয়াম ও Bloat রিমুভাল',
            ext: 'sh',
            tag: 'Garbage Clean',
            paradigm: 'sql',
            note: 'ডিলিট হওয়া পুরনো ডেটার মেমরি স্পেস ব্যাকগ্রাউন্ডে পরিষ্কার করে স্পিড বজায় রাখা।'
          }
        ]
      },
      {
        name: 'connection_pooling',
        nameBn: 'কানেকশন পুলিং',
        paradigm: 'all',
        files: [
          {
            name: 'pgbouncer_transaction_mode.ini',
            nameBn: 'পিজিবাইন্সার কানেকশন পুলার',
            ext: 'ini',
            tag: 'Concurrency',
            paradigm: 'all',
            note: 'সার্ভারলেস এআই এজেন্টদের জন্য ফিক্সড পুল দিয়ে সার্ভারের র‍্যাম ক্র্যাশ ঠেকানো।'
          }
        ]
      },
      {
        name: 'hybrid_search',
        nameBn: 'হাইব্রিড RAG পাইপলাইন',
        paradigm: 'hybrid',
        files: [
          {
            name: 'rrf_rank_fusion.ts',
            nameBn: 'র‍্যাংক ফিউশন অ্যালগরিদম (RRF)',
            ext: 'ts',
            tag: 'Hybrid Fusion',
            paradigm: 'hybrid',
            note: 'BM25 কি-ওয়ার্ড স্কোর এবং HNSW ভেক্টর স্কোরকে একসাথে মিলিয়ে নিখুঁত র‍্যাংকিং।'
          },
          {
            name: 'cross_encoder_reranker.py',
            nameBn: 'ক্রস-এনকোডার রি-র‍্যাঙ্কার',
            ext: 'py',
            tag: 'Zero Hallucination',
            paradigm: 'hybrid',
            note: 'সেরা ৩০-৪০টি রেজাল্টকে ডিপ লার্নিং দিয়ে পুনরায় নিখুঁতভাবে সাজিয়ে LLM-এ পাঠানো।'
          }
        ]
      }
    ]
  }
];
