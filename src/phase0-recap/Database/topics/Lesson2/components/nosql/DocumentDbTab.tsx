'use client';

import React, { useState } from 'react';
import {
  FileCode2,
  Sparkles,
} from 'lucide-react';
import DualText from '@/components/DualText';

export default function DocumentDbTab() {
  const [docView, setDocView] = useState<'diagram' | 'json'>('diagram');

  return (
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

            <div className="flex items-center gap-1.5 bg-black/40 border border-white/[0.08] rounded-lg p-0.5 font-mono text-[11px]">
              <button
                onClick={() => setDocView('diagram')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  docView === 'diagram' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Visual Schema (Image 1 Style)
              </button>
              <button
                onClick={() => setDocView('json')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
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
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    University Enrollment Document Architecture (MongoDB Collection)
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Left Column: Department & Faculty Documents */}
                  <div className="col-span-3 space-y-3">
                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1">
                      <div className="bg-blue-600 text-white font-bold py-1 px-2 rounded text-center text-[11px]">
                        Department
                      </div>
                      <div className="text-zinc-300 text-[11px] pt-1 space-y-0.5">
                        <div>+id: &quot;D_CSE&quot;</div>
                        <div>+name: &quot;Comp Science&quot;</div>
                        <div>+building: &quot;Academic 1&quot;</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1">
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
                    <div className="rounded-2xl border-2 border-cyan-400 bg-[#0b162b] p-4 text-xs font-mono space-y-2.5 ring-2 ring-cyan-500/30">
                      <div className="bg-[#15171e] text-white font-bold py-1.5 px-3 rounded-lg text-center text-xs flex items-center justify-center gap-1.5">
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
                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1">
                      <div className="bg-blue-600 text-white font-bold py-1 px-2 rounded text-center text-[11px]">
                        Course C01
                      </div>
                      <div className="text-zinc-300 text-[11px] pt-1 space-y-0.5">
                        <div>+id: &quot;C01&quot;</div>
                        <div>+title: &quot;DBMS&quot;</div>
                        <div>+credits: 3.0</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-blue-500/60 bg-[#0e162c] p-3 text-xs font-mono space-y-1">
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

                <div className="mt-4 pt-3 border-t border-white/[0.08] text-center font-mono text-[11px] text-zinc-400">
                  <span className="text-cyan-400 font-bold">&larr; Embedded Sub-documents &rarr;</span>
                  <span className="ml-2">All student data loaded in a single disk read without JOIN overhead.</span>
                </div>
              </div>
            </div>
          ) : (
            /* Raw JSON representation */
            <div className="p-4 rounded-xl bg-black/70 border border-white/[0.08] font-mono text-xs space-y-2">
              <span className="text-cyan-400 font-bold block">{'// MongoDB Collection: students.find({ studentId: "101" })'}</span>
              <pre className="text-emerald-300 text-[11px] leading-relaxed overflow-x-auto p-3 rounded-lg bg-black/40 border border-white/[0.08]">
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
  );
}
