import React from 'react';
import { MapPin, Share2 } from 'lucide-react';
import { DEFINITION_EDGES, DEFINITION_VERTICES } from '../graphBasicsTypes';

interface GraphDefinitionDiagramProps {
  selectedElement: 'none' | 'vertex' | 'edge';
  setSelectedElement: (el: 'none' | 'vertex' | 'edge') => void;
}

export default function GraphDefinitionDiagram({
  selectedElement,
  setSelectedElement,
}: GraphDefinitionDiagramProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Interactive Vector Diagram (6 Cols) */}
      <div className="lg:col-span-6 bg-[#080a12] border border-[#1b1f33] rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#131626_1px,transparent_1px),linear-gradient(to_bottom,#131626_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

        <svg viewBox="0 0 380 240" className="w-full h-auto max-w-sm z-10">
          <defs>
            <filter id="glowVertex" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connecting Edges */}
          {DEFINITION_EDGES.map((edge) => (
            <line
              key={edge.id}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke={selectedElement === 'edge' ? '#818cf8' : '#2b3452'}
              strokeWidth={selectedElement === 'edge' ? '3.5' : '2'}
              className="transition-colors duration-300"
            />
          ))}

          {/* Edge Label Callout Pointer */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedElement(selectedElement === 'edge' ? 'none' : 'edge')}
          >
            <rect x="150" y="45" width="70" height="22" rx="6" fill="#141829" stroke="#3b4668" />
            <text x="185" y="60" fill="#a5b4fc" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              Edge (এজ)
            </text>
          </g>

          {/* Vertices (Nodes) */}
          {DEFINITION_VERTICES.map((v) => (
            <g
              key={v.id}
              className="cursor-pointer group"
              onClick={() => setSelectedElement(selectedElement === 'vertex' ? 'none' : 'vertex')}
            >
              <circle
                cx={v.x}
                cy={v.y}
                r="20"
                fill={selectedElement === 'vertex' ? '#312e81' : '#121626'}
                stroke={selectedElement === 'vertex' ? '#818cf8' : '#3e4a70'}
                strokeWidth={selectedElement === 'vertex' ? '3' : '2'}
                filter={selectedElement === 'vertex' ? 'url(#glowVertex)' : undefined}
                className="transition-colors duration-300"
              />
              <text
                x={v.x}
                y={v.y + 4}
                fill={selectedElement === 'vertex' ? '#ffffff' : '#cbd5e1'}
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {v.label}
              </text>
            </g>
          ))}

          {/* Vertex Callout Pointer */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedElement(selectedElement === 'vertex' ? 'none' : 'vertex')}
          >
            <rect x="35" y="10" width="110" height="22" rx="6" fill="#1e1b4b" stroke="#6366f1" />
            <text x="90" y="25" fill="#c7d2fe" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              Vertex (ভার্টেক্স)
            </text>
          </g>
        </svg>

        {/* Interactive hint */}
        <span className="text-[11px] font-mono text-zinc-400 mt-2 z-10">
          ডায়াগ্রামের ভার্টেক্স বা এজে ক্লিক করে বিস্তারিত হাইলাইট দেখুন
        </span>
      </div>

      {/* Core Concept Breakdown (6 Cols) */}
      <div className="lg:col-span-6 space-y-4">
        {/* Vertex Card */}
        <div
          onClick={() => setSelectedElement('vertex')}
          className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
            selectedElement === 'vertex'
              ? 'bg-[#15182e] border-indigo-500  '
              : 'bg-[#101322] border-[#1d2338] hover:border-[#2a3350]'
          }`}
        >
          <div className="flex items-center gap-2.5 text-indigo-400 mb-1.5">
            <MapPin className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">১. ভার্টেক্স বা নোড (Vertex / Node)</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            গ্রাফের প্রতিটি একক ডেটা পয়েন্ট বা এনটিটিকে <b>ভার্টেক্স (Vertex)</b> বলে। বহুবচনে একে <i>Vertices</i> বলা হয়। 
            বাস্তব জীবনে এটি হতে পারে একজন ফেসবুক ব্যবহারকারী, একটি শহরের লোকেশন কিংবা কম্পিউটার নেটওয়ার্কের একটি রাউটার।
          </p>
          <div className="mt-2 text-[11px] font-mono text-indigo-300">
            ডায়াগ্রামে Vertices V = &#123; V1, V2, V3, V4 &#125; (মোট ৪টি নোড)
          </div>
        </div>

        {/* Edge Card */}
        <div
          onClick={() => setSelectedElement('edge')}
          className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
            selectedElement === 'edge'
              ? 'bg-[#15182e] border-indigo-500  '
              : 'bg-[#101322] border-[#1d2338] hover:border-[#2a3350]'
          }`}
        >
          <div className="flex items-center gap-2.5 text-sky-400 mb-1.5">
            <Share2 className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">২. এজ বা সংযোগ রেখা (Edge / Link)</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            যেকোনো দুটি ভার্টেক্সের মধ্যবর্তী সংযোগপথ বা সম্পর্ককে <b>এজ (Edge)</b> বলে। 
            যেমন: দুজন মানুষের মধ্যে বন্ধুত্ব, দুটি শহরের সংযোগকারী হাইওয়ে রাস্তা, বা ওয়েব সার্ভারের মধ্যকার ডেটা ক্যাবল।
          </p>
          <div className="mt-2 text-[11px] font-mono text-sky-300">
            ডায়াগ্রামে Edges E = &#123; (V1,V2), (V2,V3), (V3,V4), (V4,V1), (V1,V3) &#125;
          </div>
        </div>
      </div>
    </div>
  );
}
