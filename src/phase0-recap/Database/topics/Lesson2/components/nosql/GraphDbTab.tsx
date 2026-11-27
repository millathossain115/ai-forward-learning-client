'use client';

import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
} from 'lucide-react';
import DualText from '@/components/DualText';
import { GRAPH_NODE_DETAILS } from './nosqlData';

export default function GraphDbTab() {
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('rahim');
  const activeGraph = GRAPH_NODE_DETAILS[selectedGraphNode] || GRAPH_NODE_DETAILS.rahim;

  return (
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
  );
}
