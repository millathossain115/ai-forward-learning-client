'use client';

import React, { useState } from 'react';
import {
  Boxes,
  FileCode2,
  Hash,
  Table as TableIcon,
  Share2,
  Sparkles,
  CheckCircle2,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type NoSqlSubTab = 'document' | 'key-value' | 'column' | 'graph';

export default function NoSqlModelVisualizer() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<NoSqlSubTab>('document');

  // Document tab state: toggle between visual diagram (Image 1) and raw JSON
  const [docView, setDocView] = useState<'diagram' | 'json'>('diagram');

  // Key-Value interactive state
  const [lookupKey, setLookupKey] = useState<string>('student:101');
  const [cacheHits, setCacheHits] = useState<number>(42);

  // Graph tab interactive state (Image 2)
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('rahim');

  // University Key-Value Store
  const kvData: Record<string, { value: string; ttl: string; type: string }> = {
    'student:101': {
      value: '{"name": "Rahim", "dept": "CSE", "cgpa": 3.80, "status": "Active"}',
      ttl: 'No Expiry',
      type: 'HASH / STRING',
    },
    'student:102': {
      value: '{"name": "Karim", "dept": "BBA", "cgpa": 3.65, "status": "Active"}',
      ttl: 'No Expiry',
      type: 'HASH / STRING',
    },
    'course:C01': {
      value: '{"name": "Database Systems", "instructor": "Mr. Ali", "enrolled": 48}',
      ttl: 'No Expiry',
      type: 'HASH',
    },
    'session:rahim_auth': {
      value: 'Token: "jwt_991823" • Role: Student • IP: 103.205.71.2',
      ttl: '840 seconds',
      type: 'STRING (Volatile)',
    },
  };

  // Graph nodes properties
  const graphNodeDetails: Record<
    string,
    { label: string; type: string; color: string; properties: Record<string, string>; relations: string[] }
  > = {
    rahim: {
      label: 'Rahim (Student)',
      type: 'Student (Node)',
      color: 'bg-emerald-500 text-white',
      properties: {
        student_id: '101',
        name: 'Rahim',
        dept: 'CSE',
        cgpa: '3.80',
      },
      relations: [
        'enrolled_in → Database Systems (C01)',
        'enrolled_in → Discrete Mathematics (C02)',
        'study_partner → Karim',
      ],
    },
    karim: {
      label: 'Karim (Student)',
      type: 'Student (Node)',
      color: 'bg-emerald-500 text-white',
      properties: {
        student_id: '102',
        name: 'Karim',
        dept: 'BBA',
        cgpa: '3.65',
      },
      relations: [
        'enrolled_in → Database Systems (C01)',
        'study_partner → Rahim',
      ],
    },
    dbCourse: {
      label: 'Database Systems',
      type: 'Course (Node)',
      color: 'bg-cyan-500 text-slate-950 font-bold',
      properties: {
        course_id: 'C01',
        title: 'Database Systems',
        credits: '3.0',
        semester: 'Spring 2026',
      },
      relations: [
        'taught_by ← Mr. Ali',
        'enrolled_by ← Rahim',
        'enrolled_by ← Karim',
      ],
    },
    mathCourse: {
      label: 'Discrete Mathematics',
      type: 'Course (Node)',
      color: 'bg-cyan-500 text-slate-950 font-bold',
      properties: {
        course_id: 'C02',
        title: 'Discrete Mathematics',
        credits: '3.0',
        semester: 'Spring 2026',
      },
      relations: [
        'taught_by ← Ms. Sara',
        'enrolled_by ← Rahim',
      ],
    },
    mrAli: {
      label: 'Mr. Ali (Professor)',
      type: 'Professor (Node)',
      color: 'bg-purple-500 text-white',
      properties: {
        faculty_id: 'T01',
        name: 'Mr. Ali',
        designation: 'Associate Professor',
        dept: 'CSE',
      },
      relations: [
        'teaches → Database Systems (C01)',
      ],
    },
  };

  const activeGraph = graphNodeDetails[selectedGraphNode] || graphNodeDetails.rahim;

  return (
    <div className="p-5 md:p-7 rounded-2xl bg-[#090b17] border border-cyan-500/40 space-y-6 shadow-2xl">
      {/* Header and Sub-Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Boxes className="w-4 h-4 text-cyan-400" />
            <DualText
              en="NoSQL Database Models (Polyglot Persistence & Distributed Scale)"
              bn="নো-এসকিউএল ডেটাবেস মডেলসমূহ (পলিপ্লট ও ক্লাউড স্কেলিং আর্কিটেকচার)"
            />
          </span>
          <div className="text-[11px] text-zinc-400 font-sans mt-0.5">
            <DualText
              en="Explore the 4 major non-relational database types: Document, Key-Value, Column-Family, and Graph."
              bn="অ-রিলেশনাল ডেটাবেসের ৪টি প্রধান ধরণ দেখুন: ডকুমেন্ট, কি-ভ্যালু, কলাম-ফ্যামিলি এবং প্রোপার্টি গ্রাফ।"
            />
          </div>
        </div>

        {/* 4 NoSQL Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
          {[
            { id: 'document' as const, label: '1. Document', engine: 'MongoDB' },
            { id: 'key-value' as const, label: '2. Key-Value', engine: 'Redis' },
            { id: 'column' as const, label: '3. Column', engine: 'Cassandra' },
            { id: 'graph' as const, label: '4. Graph', engine: 'Neo4j' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-1 ring-cyan-500/40 shadow-sm'
                  : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <span className="block text-xs">{tab.label}</span>
              <span className="text-[10px] text-cyan-300 font-normal">{tab.engine}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          SUB-TAB 1: DOCUMENT DATABASE (MONGODB) - INSPIRED BY IMAGE 1
         ======================================================== */}
      {activeTab === 'document' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Model 06-A</span>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <DualText
                  en="Document Model (Embedded Document & Reference Architecture)"
                  bn="ডকুমেন্ট ডেটাবেস মডেল (এমবেডেড সাব-ডকুমেন্ট আর্কিটেকচার)"
                />
              </h4>
            </div>

            <div className="flex items-center gap-1.5 bg-black/40 border border-slate-800 rounded-lg p-0.5 font-mono text-[11px]">
              <button
                onClick={() => setDocView('diagram')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  docView === 'diagram' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Visual Schema (Image 1 Style)
              </button>
              <button
                onClick={() => setDocView('json')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  docView === 'json' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Raw JSON Document
              </button>
            </div>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="In a document store like MongoDB, data that belongs together is stored together in a single BSON/JSON document. Instead of creating 3 normalized tables and running expensive SQL JOINs, the student record directly embeds their enrolled courses array, grades, and profile metadata!"
              bn="MongoDB-র মতো ডকুমেন্ট ডেটাবেসে সম্পর্কিত সমস্ত ডেটা একটিমাত্র BSON/JSON ডকুমেন্টে একসাথে সংরক্ষিত থাকে। ৩টি আলাদা টেবিলে ভাগ করে স্লো SQL JOIN করার বদলে শিক্ষার্থী তার কোর্সের তালিকা ও গ্রেড অ্যারে হিসেবে নিজের ডকুমেন্টের ভেতরেই ধারণ করে!"
            />
          </div>

          {docView === 'diagram' ? (
            /* Visual Schema Diagram inspired directly by Image 1 */
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[740px] p-6 rounded-2xl bg-[#070914] border border-cyan-900/40 relative">
                <div className="text-center mb-4">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    University Enrollment Document Architecture (MongoDB Collection)
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Left Column: Department & Faculty Documents */}
                  <div className="col-span-3 space-y-3">
                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1 shadow-md">
                      <div className="bg-blue-600 text-white font-bold py-1 px-2 rounded text-center text-[11px]">
                        Department
                      </div>
                      <div className="text-zinc-300 text-[11px] pt-1 space-y-0.5">
                        <div>+id: &quot;D_CSE&quot;</div>
                        <div>+name: &quot;Comp Science&quot;</div>
                        <div>+building: &quot;Academic 1&quot;</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1 shadow-md">
                      <div className="bg-blue-600 text-white font-bold py-1 px-2 rounded text-center text-[11px]">
                        Faculty (Instructor)
                      </div>
                      <div className="text-zinc-300 text-[11px] pt-1 space-y-0.5">
                        <div>+id: &quot;T01&quot;</div>
                        <div>+name: &quot;Mr. Ali&quot;</div>
                        <div>+title: &quot;Assoc. Prof&quot;</div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Central Student Document with Embedded Arrays (Like Competition in Image 1) */}
                  <div className="col-span-6">
                    <div className="rounded-2xl border-2 border-cyan-400 bg-[#0b162b] p-4 text-xs font-mono space-y-2.5 shadow-2xl ring-2 ring-cyan-500/30">
                      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-1.5 px-3 rounded-lg text-center text-xs flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Student Document (Collection Root)</span>
                      </div>

                      <div className="bg-black/50 rounded-xl p-3 border border-cyan-900/50 space-y-1 text-zinc-200 text-[11px]">
                        <div className="text-cyan-300 font-bold">+ _id: ObjectId(&quot;673b01a...&quot;)</div>
                        <div>+ studentId: &quot;101&quot;</div>
                        <div>+ name: &quot;Rahim&quot;</div>
                        <div>+ deptId: &quot;D_CSE&quot; (Reference)</div>
                        <div className="text-amber-300 font-semibold pt-1">
                          + enrolledCourses [ ] (Embedded Array):
                        </div>
                        <div className="pl-3 border-l-2 border-amber-500/40 text-[10.5px] text-zinc-300 space-y-0.5">
                          <div>&bull; &#123; courseId: &quot;C01&quot;, name: &quot;Database Systems&quot;, grade: &quot;A&quot; &#125;</div>
                          <div>&bull; &#123; courseId: &quot;C02&quot;, name: &quot;Discrete Math&quot;, grade: &quot;A-&quot; &#125;</div>
                        </div>
                        <div className="text-emerald-300 font-semibold pt-1">
                          + skills [ ]: [&quot;Python&quot;, &quot;SQL&quot;, &quot;Docker&quot;, &quot;Neo4j&quot;]
                        </div>
                        <div className="text-purple-300 font-semibold">
                          + contactInfo &#123; email, phone, city: &quot;Dhaka&quot; &#125;
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Courses Collection Documents */}
                  <div className="col-span-3 space-y-3">
                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1 shadow-md">
                      <div className="bg-blue-600 text-white font-bold py-1 px-2 rounded text-center text-[11px]">
                        Course C01
                      </div>
                      <div className="text-zinc-300 text-[11px] pt-1 space-y-0.5">
                        <div>+id: &quot;C01&quot;</div>
                        <div>+title: &quot;DBMS&quot;</div>
                        <div>+credits: 3.0</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1 shadow-md">
                      <div className="bg-blue-600 text-white font-bold py-1 px-2 rounded text-center text-[11px]">
                        Course C02
                      </div>
                      <div className="text-zinc-300 text-[11px] pt-1 space-y-0.5">
                        <div>+id: &quot;C02&quot;</div>
                        <div>+title: &quot;Math&quot;</div>
                        <div>+credits: 3.0</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-center font-mono text-[11px] text-zinc-400">
                  <span className="text-cyan-400 font-bold">&larr; Embedded Sub-documents &rarr;</span>
                  <span className="ml-2">All student data loaded in a single disk read without JOIN overhead.</span>
                </div>
              </div>
            </div>
          ) : (
            /* Raw JSON representation */
            <div className="p-4 rounded-xl bg-black/70 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-cyan-400 font-bold block">// MongoDB Collection: students.find(&#123; studentId: &quot;101&quot; &#125;)</span>
              <pre className="text-emerald-300 text-[11px] leading-relaxed overflow-x-auto p-3 rounded-lg bg-black/40 border border-slate-800">
{`{
  "_id": "673b01a189f2",
  "studentId": "101",
  "name": "Rahim",
  "department": "CSE",
  "cgpa": 3.80,
  "enrolledCourses": [
    {
      "courseId": "C01",
      "name": "Database Systems",
      "instructor": "Mr. Ali",
      "semester": "Spring 2026",
      "grade": "A"
    },
    {
      "courseId": "C02",
      "name": "Discrete Mathematics",
      "instructor": "Ms. Sara",
      "semester": "Spring 2026",
      "grade": "A-"
    }
  ],
  "skills": ["Python", "SQL", "Docker", "Neo4j"],
  "social_links": {
    "github": "github.com/rahim",
    "linkedin": "linkedin.com/in/rahim"
  }
}`}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: KEY-VALUE STORE (REDIS)
         ======================================================== */}
      {activeTab === 'key-value' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Model 06-B</span>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Hash className="w-4 h-4 text-amber-400" />
              <DualText
                en="Key-Value Store (In-Memory Microsecond Cache & Session Store)"
                bn="কি-ভ্যালু স্টোর (ইন-মেমোরি মাইক্রোসেকেন্ড ক্যাশ ও সেশন ইঞ্জিন)"
              />
            </h4>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Redis acts as an ultra-fast in-memory hash map. Key lookups take O(1) constant time (~0.3 milliseconds). Perfect for university student session logins, shopping carts, and real-time active user tracking."
              bn="Redis মেমোরিতে (RAM) হ্যাশ-ম্যাপ আকারে ডেটা রাখে। কি-দিয়ে অনুসন্ধান O(1) ধ্রুবক সময়ে (প্রায় ০.৩ মিলি-সেকেন্ড) সম্পন্ন হয়। দ্রুতগতির সেশন ও ক্যাশিংয়ের জন্য এটি বিশ্বজুড়ে ব্যবহৃত হয়।"
            />
          </div>

          {/* Key Selection and Live Inspector */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-amber-900/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Redis RAM Cache (Click Key to Simulate Instant GET):
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Cache Hit Ratio: <strong className="text-emerald-400">99.8%</strong> (Hits: {cacheHits})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(kvData).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setLookupKey(key);
                    setCacheHits((prev) => prev + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                    lookupKey === key
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 font-bold ring-1 ring-amber-400'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-slate-700'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Simulated Redis Response Terminal */}
            <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-slate-800 pb-1.5">
                <span>redis-cli &gt; GET {lookupKey}</span>
                <span className="text-emerald-400 font-bold">Latency: 0.28ms (RAM Hit)</span>
              </div>
              <div className="text-emerald-300 font-bold text-xs pt-1 break-all">
                {kvData[lookupKey]?.value}
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                <span>Data Type: {kvData[lookupKey]?.type}</span>
                <span>Time-To-Live (TTL): {kvData[lookupKey]?.ttl}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: COLUMN-FAMILY (APACHE CASSANDRA)
         ======================================================== */}
      {activeTab === 'column' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">Model 06-C</span>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-purple-400" />
              <DualText
                en="Column-Family Store (Sparse Distributed Storage in Apache Cassandra)"
                bn="কলাম-ফ্যামিলি স্টোর (অ্যাপাচি ক্যাসান্ড্রা ডিস্ট্রিবিউটেড স্থাপত্য)"
              />
            </h4>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Unlike relational tables where every row must have the exact same columns (filling unused cells with NULLs), Cassandra organizes data into dynamic column families. Each row key can store different columns with individual timestamps, making it capable of billions of sensor writes across hundreds of distributed cloud server nodes."
              bn="রিলেশনাল টেবিলের মতো প্রতিটি সারিতে একই কলাম থাকার বাধ্যবাধকতা নেই। ক্যাসান্ড্রায় প্রতিটি রো কী-এর অধীনে ইচ্ছামতো ডায়নামিক কলাম ও টাইমস্ট্যাম্প যোগ করা যায়, যা সার্ভার ক্লাস্টারে প্রতি সেকেন্ডে লক্ষ লক্ষ ডেটা রাইট করতে সক্ষম।"
            />
          </div>

          {/* Sparse Column Matrix Demo */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-purple-900/40 space-y-3 font-mono text-xs">
            <span className="text-purple-300 font-bold uppercase text-[11px]">
              Column Family: StudentActivityLogs (Sparse Dynamic Columns):
            </span>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-black/60">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#141228] border-b border-purple-900/50 text-zinc-300 text-[11px]">
                    <th className="py-2.5 px-3 text-purple-400 font-bold">Row Key (Partition)</th>
                    <th className="py-2.5 px-3 text-cyan-300">col: login_ip</th>
                    <th className="py-2.5 px-3 text-emerald-300">col: last_course</th>
                    <th className="py-2.5 px-3 text-amber-300">col: device_type</th>
                    <th className="py-2.5 px-3 text-pink-300">col: quiz_score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-[11px]">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">Student:101:2026-11</td>
                    <td className="py-2.5 px-3 text-zinc-300">103.205.71.2</td>
                    <td className="py-2.5 px-3 text-cyan-300">C01 (DBMS)</td>
                    <td className="py-2.5 px-3 text-amber-300">MacOS / Chrome</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">96 / 100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">Student:102:2026-11</td>
                    <td className="py-2.5 px-3 text-zinc-300">192.168.1.45</td>
                    <td className="py-2.5 px-3 text-cyan-300">C01 (DBMS)</td>
                    <td className="py-2.5 px-3 text-zinc-500 italic">[no column]</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">88 / 100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-white">Student:103:2026-11</td>
                    <td className="py-2.5 px-3 text-zinc-300">182.48.90.12</td>
                    <td className="py-2.5 px-3 text-zinc-500 italic">[no column]</td>
                    <td className="py-2.5 px-3 text-amber-300">Android / App</td>
                    <td className="py-2.5 px-3 text-zinc-500 italic">[no column]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-purple-200 text-[11px] font-sans leading-relaxed">
              Notice: Student 103 does not have a <code>last_course</code> column, and Student 102 has no <code>device_type</code> column. No empty NULL storage waste occurs!
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: GRAPH DATABASE (NEO4J) - DIRECTLY INSPIRED BY IMAGE 2
         ======================================================== */}
      {activeTab === 'graph' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Model 06-D</span>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <DualText
                en="Property Graph Model (Neo4j: Nodes, Labeled Edges & Properties)"
                bn="প্রোপার্টি গ্রাফ মডেল (Neo4j: নোড, রিলেশনশিপ এজ ও প্রোপার্টিজ)"
              />
            </h4>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Graph databases excel at heavily interconnected networks. Instead of joining foreign keys, data is stored as Nodes (Entities), Directed Edges (Relationships), and Key-Value Properties on both nodes and edges (as depicted in reference Image 2). Click any node to inspect its properties and connected edges!"
              bn="গ্রাফ ডেটাবেস পারস্পরিক সংযুক্ত নেটওয়ার্কের জন্য সেরা। এখানে টেবিল জয়েন করার দরকার পড়ে না; ডেটা সরাসরি নোড (এনটিটি), নির্দেশিত এজ (সম্পর্ক) এবং প্রোপার্টি আকারে সংরক্ষিত থাকে। যেকোনো নোডে ক্লিক করে তার প্রোপার্টি ও সম্পর্কগুলো দেখুন।"
            />
          </div>

          {/* Interactive Graph Canvas matching Image 2 style */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px] p-6 rounded-2xl bg-[#060814] border border-emerald-900/40 relative">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  University Social &amp; Academic Property Graph:
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Active Node: <strong className="text-emerald-400">{activeGraph.label}</strong>
                </span>
              </div>

              {/* SVG Canvas for Property Graph */}
              <svg viewBox="0 0 760 360" className="w-full h-auto select-none">
                <defs>
                  <marker id="graph-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                  </marker>
                  <marker id="graph-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                  </marker>
                </defs>

                {/* Relationship Edges with explicit text labels like Image 2 */}
                {/* 1. Rahim (x=240, y=140) -> Database Systems (x=460, y=90) */}
                <line
                  x1="240"
                  y1="140"
                  x2="460"
                  y2="90"
                  stroke={selectedGraphNode === 'rahim' || selectedGraphNode === 'dbCourse' ? '#34d399' : '#334155'}
                  strokeWidth={selectedGraphNode === 'rahim' || selectedGraphNode === 'dbCourse' ? 2.5 : 1}
                  markerEnd={selectedGraphNode === 'rahim' || selectedGraphNode === 'dbCourse' ? 'url(#graph-arrow-active)' : 'url(#graph-arrow)'}
                />
                <rect x="315" y="100" width="95" height="18" rx="4" fill="#0d1f1d" stroke="#059669" strokeWidth="1" />
                <text x="362" y="113" fill="#6ee7b7" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  enrolled_in
                </text>

                {/* 2. Rahim (x=240, y=140) -> Karim (x=240, y=280) */}
                <line
                  x1="240"
                  y1="140"
                  x2="240"
                  y2="280"
                  stroke={selectedGraphNode === 'rahim' || selectedGraphNode === 'karim' ? '#34d399' : '#334155'}
                  strokeWidth={selectedGraphNode === 'rahim' || selectedGraphNode === 'karim' ? 2.5 : 1}
                  markerEnd={selectedGraphNode === 'rahim' || selectedGraphNode === 'karim' ? 'url(#graph-arrow-active)' : 'url(#graph-arrow)'}
                />
                <rect x="180" y="200" width="120" height="18" rx="4" fill="#0d1f1d" stroke="#059669" strokeWidth="1" />
                <text x="240" y="213" fill="#6ee7b7" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  study_partner
                </text>

                {/* 3. Karim (x=240, y=280) -> Database Systems (x=460, y=90) */}
                <line
                  x1="240"
                  y1="280"
                  x2="460"
                  y2="90"
                  stroke={selectedGraphNode === 'karim' || selectedGraphNode === 'dbCourse' ? '#34d399' : '#334155'}
                  strokeWidth={selectedGraphNode === 'karim' || selectedGraphNode === 'dbCourse' ? 2.5 : 1}
                  markerEnd={selectedGraphNode === 'karim' || selectedGraphNode === 'dbCourse' ? 'url(#graph-arrow-active)' : 'url(#graph-arrow)'}
                />
                <rect x="370" y="175" width="95" height="18" rx="4" fill="#0d1f1d" stroke="#059669" strokeWidth="1" />
                <text x="417" y="188" fill="#6ee7b7" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  enrolled_in
                </text>

                {/* 4. Rahim (x=240, y=140) -> Discrete Math (x=460, y=230) */}
                <line
                  x1="240"
                  y1="140"
                  x2="460"
                  y2="230"
                  stroke={selectedGraphNode === 'rahim' || selectedGraphNode === 'mathCourse' ? '#34d399' : '#334155'}
                  strokeWidth={selectedGraphNode === 'rahim' || selectedGraphNode === 'mathCourse' ? 2.5 : 1}
                  markerEnd={selectedGraphNode === 'rahim' || selectedGraphNode === 'mathCourse' ? 'url(#graph-arrow-active)' : 'url(#graph-arrow)'}
                />
                <rect x="325" y="170" width="95" height="18" rx="4" fill="#0d1f1d" stroke="#059669" strokeWidth="1" />
                <text x="372" y="183" fill="#6ee7b7" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  enrolled_in
                </text>

                {/* 5. Mr. Ali (x=660, y=90) -> Database Systems (x=460, y=90) */}
                <line
                  x1="660"
                  y1="90"
                  x2="460"
                  y2="90"
                  stroke={selectedGraphNode === 'mrAli' || selectedGraphNode === 'dbCourse' ? '#a855f7' : '#334155'}
                  strokeWidth={selectedGraphNode === 'mrAli' || selectedGraphNode === 'dbCourse' ? 2.5 : 1}
                  markerEnd={selectedGraphNode === 'mrAli' || selectedGraphNode === 'dbCourse' ? 'url(#graph-arrow-active)' : 'url(#graph-arrow)'}
                />
                <rect x="525" y="78" width="70" height="18" rx="4" fill="#201030" stroke="#a855f7" strokeWidth="1" />
                <text x="560" y="91" fill="#d8b4fe" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  teaches
                </text>

                {/* Circular Nodes (Matching Image 2 Style: Green User Circles, Light Cyan Post/Course Circles) */}

                {/* Node 1: Rahim (Green Circular Node) */}
                <g onClick={() => setSelectedGraphNode('rahim')} className="cursor-pointer">
                  <circle
                    cx="240"
                    cy="140"
                    r="45"
                    fill={selectedGraphNode === 'rahim' ? '#059669' : '#10b981'}
                    stroke={selectedGraphNode === 'rahim' ? '#34d399' : '#047857'}
                    strokeWidth={selectedGraphNode === 'rahim' ? 3 : 1.5}
                    className="transition-all hover:scale-105"
                  />
                  <text x="240" y="136" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    Rahim
                  </text>
                  <text x="240" y="152" fill="#d1fae5" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                    (Student)
                  </text>
                </g>

                {/* Node 2: Karim (Green Circular Node) */}
                <g onClick={() => setSelectedGraphNode('karim')} className="cursor-pointer">
                  <circle
                    cx="240"
                    cy="280"
                    r="45"
                    fill={selectedGraphNode === 'karim' ? '#059669' : '#10b981'}
                    stroke={selectedGraphNode === 'karim' ? '#34d399' : '#047857'}
                    strokeWidth={selectedGraphNode === 'karim' ? 3 : 1.5}
                    className="transition-all hover:scale-105"
                  />
                  <text x="240" y="276" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    Karim
                  </text>
                  <text x="240" y="292" fill="#d1fae5" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                    (Student)
                  </text>
                </g>

                {/* Node 3: Database Systems (Light Cyan Node like Post in Image 2) */}
                <g onClick={() => setSelectedGraphNode('dbCourse')} className="cursor-pointer">
                  <circle
                    cx="460"
                    cy="90"
                    r="46"
                    fill={selectedGraphNode === 'dbCourse' ? '#06b6d4' : '#0891b2'}
                    stroke={selectedGraphNode === 'dbCourse' ? '#67e8f9' : '#0e7490'}
                    strokeWidth={selectedGraphNode === 'dbCourse' ? 3 : 1.5}
                    className="transition-all hover:scale-105"
                  />
                  <text x="460" y="85" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    Database
                  </text>
                  <text x="460" y="99" fill="#cffafe" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                    (Course: C01)
                  </text>
                </g>

                {/* Node 4: Discrete Math (Light Cyan Node) */}
                <g onClick={() => setSelectedGraphNode('mathCourse')} className="cursor-pointer">
                  <circle
                    cx="460"
                    cy="230"
                    r="46"
                    fill={selectedGraphNode === 'mathCourse' ? '#06b6d4' : '#0891b2'}
                    stroke={selectedGraphNode === 'mathCourse' ? '#67e8f9' : '#0e7490'}
                    strokeWidth={selectedGraphNode === 'mathCourse' ? 3 : 1.5}
                    className="transition-all hover:scale-105"
                  />
                  <text x="460" y="225" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    Math
                  </text>
                  <text x="460" y="239" fill="#cffafe" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                    (Course: C02)
                  </text>
                </g>

                {/* Node 5: Mr. Ali (Purple Professor Node) */}
                <g onClick={() => setSelectedGraphNode('mrAli')} className="cursor-pointer">
                  <circle
                    cx="660"
                    cy="90"
                    r="45"
                    fill={selectedGraphNode === 'mrAli' ? '#9333ea' : '#7e22ce'}
                    stroke={selectedGraphNode === 'mrAli' ? '#d8b4fe' : '#6b21a8'}
                    strokeWidth={selectedGraphNode === 'mrAli' ? 3 : 1.5}
                    className="transition-all hover:scale-105"
                  />
                  <text x="660" y="86" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                    Mr. Ali
                  </text>
                  <text x="660" y="102" fill="#f3e8ff" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                    (Professor)
                  </text>
                </g>

                {/* Floating Properties Box for Student (Exactly as in Image 2) */}
                <g>
                  <rect
                    x="20"
                    y="105"
                    width="145"
                    height="75"
                    rx="6"
                    fill="#151226"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                  />
                  <text x="30" y="123" fill="#e9d5ff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Properties:
                  </text>
                  <text x="30" y="139" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                    student_id: &quot;101&quot;
                  </text>
                  <text x="30" y="153" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                    dept: &quot;CSE&quot;
                  </text>
                  <text x="30" y="167" fill="#34d399" fontSize="9.5" fontFamily="monospace">
                    cgpa: 3.80
                  </text>
                  <line x1="165" y1="140" x2="195" y2="140" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
                </g>
              </svg>
            </div>
          </div>

          {/* Node Inspector Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            {/* Properties Card */}
            <div className="p-4 rounded-xl bg-[#0c0e18] border border-emerald-900/50 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Selected Node Properties ({activeGraph.type}):
              </span>
              <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 text-[11px] text-zinc-300 space-y-1">
                {Object.entries(activeGraph.properties).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-zinc-500">{k}:</span>
                    <span className="text-emerald-300 font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traversed Edges */}
            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                Connected Relationship Edges:
              </span>
              <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 text-[11px] space-y-1">
                {activeGraph.relations.map((rel, idx) => (
                  <div key={idx} className="text-zinc-300 font-mono">
                    &bull; <span className="text-cyan-300">{rel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
