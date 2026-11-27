import React from 'react';
import {
  Layers,
  ArrowRight,
  ArrowLeftRight,
  Route,
  CheckCircle2,
} from 'lucide-react';
import {
  GraphType,
  UNDIRECTED_EDGES,
  DIRECTED_EDGES,
  WEIGHTED_EDGES,
  GRAPH_NODES,
} from '../graphBasicsTypes';

interface GraphTypesSimulatorProps {
  activeType: GraphType;
  setActiveType: (t: GraphType) => void;
  activeNode: string;
  setActiveNode: (n: string) => void;
  weightedStart: string;
  weightedEnd: string;
}

export default function GraphTypesSimulator({
  activeType,
  setActiveType,
  activeNode,
  setActiveNode,
  weightedStart,
  weightedEnd,
}: GraphTypesSimulatorProps) {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] p-6 md:p-8 rounded-3xl flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f30] pb-4">
        <div className="space-y-1">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>গ্রাফের বিভিন্ন ধরন ও লাইভ সিমুলেশন (Graph Types)</span>
          </h2>
          <p className="text-xs text-zinc-400">
            সংযোগের অভিমুখ ও খরচের ওপর ভিত্তি করে গ্রাফের ৩টি প্রধান ধরন দেখুন ও ইন্টারঅ্যাক্ট করুন।
          </p>
        </div>

        {/* Tabs for 3 Graph Types */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b14] border border-[#1d2238]">
          <button
            onClick={() => setActiveType('undirected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeType === 'undirected'
                ? 'bg-indigo-600 text-white '
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>১. আনডিরেক্টেড</span>
          </button>
          <button
            onClick={() => setActiveType('directed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeType === 'directed'
                ? 'bg-indigo-600 text-white '
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>২. ডিরেক্টেড</span>
          </button>
          <button
            onClick={() => setActiveType('weighted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeType === 'weighted'
                ? 'bg-indigo-600 text-white '
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            <span>৩. ওয়েটেড</span>
          </button>
        </div>
      </div>

      {/* Dynamic Interactive Viewer for Selected Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual SVG Simulator (7 Cols) */}
        <div className="lg:col-span-7 bg-[#080a12] border border-[#1b1f33] rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#131626_1px,transparent_1px),linear-gradient(to_bottom,#131626_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

          {/* TAB 1: UNDIRECTED GRAPH SVG */}
          {activeType === 'undirected' && (
            <svg viewBox="0 0 420 250" className="w-full h-auto max-w-md z-10">
              <defs>
                <filter id="pulseUndirected" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <text x="20" y="22" fill="#818cf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                UNDIRECTED GRAPH (দ্বিমুখী সংযোগ: A ⟷ B)
              </text>

              {/* Edges with bidirectional flow */}
              {UNDIRECTED_EDGES.map((edge, idx) => {
                const isConnected = activeNode === edge.from || activeNode === edge.to;
                return (
                  <g key={idx}>
                    <line
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke={isConnected ? '#818cf8' : '#27304a'}
                      strokeWidth={isConnected ? '3' : '2'}
                      strokeDasharray={isConnected ? '6 4' : undefined}
                      className={isConnected ? '' : ''}
                    />
                  </g>
                );
              })}

              {/* Vertices */}
              {GRAPH_NODES.map((node) => {
                const isSelected = activeNode === node.id;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => setActiveNode(node.id)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill={isSelected ? '#4338ca' : '#101426'}
                      stroke={isSelected ? '#a5b4fc' : '#333f63'}
                      strokeWidth={isSelected ? '3' : '2'}
                      filter={isSelected ? 'url(#pulseUndirected)' : undefined}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="12"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}

              {/* Status Box */}
              <rect x="20" y="215" width="380" height="28" rx="6" fill="#0f1322" stroke="#1e243a" />
              <text x="30" y="233" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">
                নোড {activeNode}-এ ক্লিক করেছেন: উভয় দিকে অবাধ ট্রাভার্সাল সম্ভব ({activeNode} ⟷ প্রতিবেশি নোডসমূহ)।
              </text>
            </svg>
          )}

          {/* TAB 2: DIRECTED GRAPH SVG (DIGRAPH) */}
          {activeType === 'directed' && (
            <svg viewBox="0 0 420 250" className="w-full h-auto max-w-md z-10">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="24"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker
                  id="arrowheadInactive"
                  markerWidth="8"
                  markerHeight="6"
                  refX="24"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#334155" />
                </marker>
              </defs>

              <text x="20" y="22" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                DIRECTED GRAPH (একমুখী নির্দেশিত তীর: A ➔ B)
              </text>

              {/* Directed Edges with arrows */}
              {DIRECTED_EDGES.map((edge, idx) => {
                const isOutgoing = activeNode === edge.from;
                return (
                  <line
                    key={idx}
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke={isOutgoing ? '#38bdf8' : '#232d45'}
                    strokeWidth={isOutgoing ? '3' : '2'}
                    markerEnd={isOutgoing ? 'url(#arrowhead)' : 'url(#arrowheadInactive)'}
                    className={isOutgoing ? 'transition-colors duration-300' : ''}
                  />
                );
              })}

              {/* Vertices */}
              {GRAPH_NODES.map((node) => {
                const isSelected = activeNode === node.id;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => setActiveNode(node.id)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill={isSelected ? '#0369a1' : '#101426'}
                      stroke={isSelected ? '#7dd3fc' : '#27344f'}
                      strokeWidth={isSelected ? '3' : '2'}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="12"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}

              {/* Status Box */}
              <rect x="20" y="215" width="380" height="28" rx="6" fill="#0f1322" stroke="#1e243a" />
              <text x="30" y="233" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">
                নোড {activeNode}-এর Outgoing এজ হাইলাইট করা হয়েছে (তীরচিহ্নের দিকেই কেবল যাওয়া সম্ভব)।
              </text>
            </svg>
          )}

          {/* TAB 3: WEIGHTED GRAPH SVG */}
          {activeType === 'weighted' && (
            <svg viewBox="0 0 420 250" className="w-full h-auto max-w-md z-10">
              <text x="20" y="22" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                WEIGHTED GRAPH (দূরত্ব বা কস্টযুক্ত এজ)
              </text>

              {/* Weighted Edges */}
              {WEIGHTED_EDGES.map((edge, idx) => {
                const isPathAtoC =
                  (weightedStart === 'A' && weightedEnd === 'C' && edge.from === 'A' && edge.to === 'B') ||
                  (edge.from === 'B' && edge.to === 'C');
                return (
                  <g key={idx}>
                    <line
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke={isPathAtoC ? '#f59e0b' : '#2b3452'}
                      strokeWidth={isPathAtoC ? '3.5' : '2'}
                    />
                    <rect
                      x={edge.midX - 10}
                      y={edge.midY - 8}
                      width="20"
                      height="16"
                      rx="4"
                      fill="#181e33"
                      stroke={isPathAtoC ? '#f59e0b' : '#39466e'}
                    />
                    <text
                      x={edge.midX}
                      y={edge.midY + 4}
                      fill={isPathAtoC ? '#fcd34d' : '#94a3b8'}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {edge.weight}
                    </text>
                  </g>
                );
              })}

              {/* Vertices */}
              {GRAPH_NODES.map((node) => {
                const isStart = node.id === weightedStart;
                const isEnd = node.id === weightedEnd;
                const isMid = node.id === 'B' && weightedStart === 'A' && weightedEnd === 'C';
                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill={isStart ? '#b45309' : isEnd ? '#047857' : isMid ? '#1e293b' : '#101426'}
                      stroke={isStart ? '#fde047' : isEnd ? '#34d399' : '#374151'}
                      strokeWidth="2.5"
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill="#ffffff"
                      fontSize="12"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}

              {/* Status Box */}
              <rect x="20" y="215" width="380" height="28" rx="6" fill="#0f1322" stroke="#1e243a" />
              <text x="30" y="233" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">
                A থেকে C যাওয়ার অপটিমাল পথ: A ➔ B (4) + B ➔ C (2) = মোট খরচ (Weight) 6
              </text>
            </svg>
          )}

          <div className="text-[11px] font-mono text-zinc-400 mt-2 z-10">
            {activeType === 'undirected' && 'নোডে ক্লিক করে দ্বিমুখী সংযোগের ট্রাভার্সাল পর্যবেক্ষণ করুন'}
            {activeType === 'directed' && 'নোডে ক্লিক করে একমুখী তীরের অভিমুখ (Outgoing Edges) দেখুন'}
            {activeType === 'weighted' && 'এজের ওপর ওজন/দূরত্ব নির্দেশিত, যা Dijkstra অ্যালগরিদমের ভিত্তি'}
          </div>
        </div>

        {/* Type Explanations & Real-life Analogy (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeType === 'undirected' && (
            <div className="p-5 rounded-2xl bg-[#111424] border border-[#232a45] space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <ArrowLeftRight className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">
                  ১. আনডিরেক্টেড গ্রাফ (Undirected Graph)
                </span>
              </div>
              <h3 className="text-base font-bold text-white">দ্বিমুখী বা নিরপেক্ষ সম্পর্ক</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                যে গ্রাফে এজগুলোর কোনো নির্দিষ্ট দিক বা তীরচিহ্ন থাকে না। অর্থাৎ দুটি নোডের মধ্যে সংযোগ থাকলে যেকোনো দিক থেকেই যাতায়াত করা যায় (A ➔ B এবং B ➔ A উভয়ই সত্য)।
              </p>

              <div className="p-3 rounded-xl bg-[#090b14] border border-[#1d2238] space-y-1">
                <span className="text-[11px] font-mono text-indigo-300 font-semibold block">বাস্তব উদাহরণ:</span>
                <p className="text-xs text-zinc-400">
                  <b>Facebook ফ্রেন্ডশিপ:</b> আপনি কারও ফ্রেন্ড হওয়া মানে তিনিও আপনার ফ্রেন্ড। সম্পর্কটি সম্পূর্ণ দ্বিমুখী।
                </p>
              </div>
            </div>
          )}

          {activeType === 'directed' && (
            <div className="p-5 rounded-2xl bg-[#111424] border border-[#232a45] space-y-3">
              <div className="flex items-center gap-2 text-sky-400">
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">
                  ২. ডিরেক্টেড গ্রাফ (Directed Graph / Digraph)
                </span>
              </div>
              <h3 className="text-base font-bold text-white">সুনির্দিষ্ট একমুখী নির্দেশিত পথ</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                যে গ্রাফে প্রতিটি এজে দিকনির্দেশক তীরচিহ্ন থাকে। তীর যেদিকে মুখ করা থাকে, ট্রাভার্সাল কেবল সেদিকেই হতে পারে (যেমন: A ➔ B যাওয়া সম্ভব, কিন্তু B ➔ A যাওয়া যাবে না)।
              </p>

              <div className="p-3 rounded-xl bg-[#090b14] border border-[#1d2238] space-y-1">
                <span className="text-[11px] font-mono text-sky-300 font-semibold block">বাস্তব উদাহরণ:</span>
                <p className="text-xs text-zinc-400">
                  <b>Twitter / Instagram ফলোয়ার:</b> আপনি ইলন মাস্ককে ফলো করতে পারেন, কিন্তু তার মানে এই নয় যে তিনিও আপনাকে ফলো করছেন।
                </p>
              </div>
            </div>
          )}

          {activeType === 'weighted' && (
            <div className="p-5 rounded-2xl bg-[#111424] border border-[#232a45] space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Route className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">
                  ৩. ওয়েটেড গ্রাফ (Weighted Graph)
                </span>
              </div>
              <h3 className="text-base font-bold text-white">ওজন, দূরত্ব বা খরচযুক্ত এজ</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                যে গ্রাফে প্রতিটি এজের সাথে একটি সংখ্যাসূচক মান (Weight / Cost) যুক্ত থাকে। এটি দিয়ে দুই নোডের মধ্যবর্তী দূরত্ব, ট্রাফিকের সময় বা ব্যান্ডউইথ খরচ নির্দেশ করা হয়।
              </p>

              <div className="p-3 rounded-xl bg-[#090b14] border border-[#1d2238] space-y-1">
                <span className="text-[11px] font-mono text-amber-300 font-semibold block">বাস্তব উদাহরণ:</span>
                <p className="text-xs text-zinc-400">
                  <b>Google Maps নেভিগেশন:</b> দুই মোড়ের সংযোগকারী রাস্তার দৈর্ঘ্য (যেমন ৪ কিমি) বা পৌঁছানোর সম্ভাব্য সময়। শর্টেস্ট পাথ অ্যালগরিদম (Dijkstra) এই ওজনের ভিত্তিতেই দ্রুততম রুট বের করে।
                </p>
              </div>
            </div>
          )}

          {/* Quick summary points */}
          <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-[#1b2034] text-xs space-y-1.5 font-mono text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-300 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>গ্রাফের অন্যান্য রূপভেদ:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              • <b>Cyclic Graph:</b> যেখানে নোড ঘুরে আগের নোডে ফেরত আসা যায় (চক্র তৈরি হয়)।
              <br />
              • <b>DAG (Directed Acyclic Graph):</b> একমুখী কিন্তু কোনো চক্র বা লুপ নেই (টাস্ক শিডিউলিংয়ের ভিত্তি)।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
