'use client';

import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SQL_PIPELINE_STORY_STEPS } from '../types';

interface SqlPipelineArchifyDiagramProps {
  activeStep: number;
  onSelectStep: (step: number) => void;
  fullscreen?: boolean;
}

interface NodeBox {
  step: number;
  x: number;
  y: number;
  w: number;
  h: number;
  titleEn: string;
  titleBn: string;
  subEn: string;
  subBn: string;
  latency: string;
  color: string;
  badgeBg: string;
}

const NODES: NodeBox[] = [
  {
    step: 1,
    x: 42,
    y: 78,
    w: 196,
    h: 92,
    titleEn: '01. Client / Portal',
    titleBn: '০১. ক্লায়েন্ট / পোর্টাল',
    subEn: 'TCP Socket • Raw SQL',
    subBn: 'TCP সকেট • Raw SQL',
    latency: '0.4 ms',
    color: '#38bdf8',
    badgeBg: '#0c2438',
  },
  {
    step: 2,
    x: 332,
    y: 78,
    w: 192,
    h: 92,
    titleEn: '02. Parser & Lexer',
    titleBn: '০২. পার্সার ও লেক্সার',
    subEn: 'Tokenize ➔ Syntax AST',
    subBn: 'টোকেন ➔ সিনট্যাক্স AST',
    latency: '0.2 ms',
    color: '#818cf8',
    badgeBg: '#1b1d3d',
  },
  {
    step: 3,
    x: 556,
    y: 78,
    w: 192,
    h: 92,
    titleEn: '03. Catalog & Binder',
    titleBn: '০৩. ক্যাটালগ ও বাইন্ডার',
    subEn: 'Schema & Permissions',
    subBn: 'স্কিমা ও অনুমতি যাচাই',
    latency: '0.3 ms',
    color: '#fbbf24',
    badgeBg: '#2e220d',
  },
  {
    step: 4,
    x: 424,
    y: 222,
    w: 232,
    h: 96,
    titleEn: '04. Cost Optimizer',
    titleBn: '০৪. কস্ট অপ্টিমাইজার',
    subEn: 'CBO • Index Scan (1.4)',
    subBn: 'CBO • ইন্ডেক্স প্ল্যান',
    latency: '0.8 ms',
    color: '#c084fc',
    badgeBg: '#29173d',
  },
  {
    step: 5,
    x: 842,
    y: 78,
    w: 228,
    h: 92,
    titleEn: '05. Query Executor',
    titleBn: '০৫. কোয়েরি এক্সিকিউটর',
    subEn: 'Volcano Iterator Engine',
    subBn: 'ভলকানো ইটারেটর ইঞ্জিন',
    latency: '0.5 ms',
    color: '#34d399',
    badgeBg: '#0d2b22',
  },
  {
    step: 6,
    x: 842,
    y: 204,
    w: 228,
    h: 92,
    titleEn: '06. Buffer Pool / I/O',
    titleBn: '০৬. বাফার পুল / ডিস্ক',
    subEn: 'RAM Page Cache Hit',
    subBn: 'RAM পেজ ক্যাশ হিট',
    latency: '0.1 ms',
    color: '#22d3ee',
    badgeBg: '#0b2933',
  },
  {
    step: 7,
    x: 42,
    y: 266,
    w: 196,
    h: 92,
    titleEn: '07. Result Stream',
    titleBn: '০৭. রেজাল্ট স্ট্রিম',
    subEn: 'Tuples ➔ Portal UI',
    subBn: 'সারি ➔ পোর্টাল স্ক্রিন',
    latency: '0.2 ms',
    color: '#34d399',
    badgeBg: '#0d2b22',
  },
];

interface EdgeDef {
  from: number;
  to: number;
  d: string;
  label: string;
  lx: number;
  ly: number;
}

const EDGES: EdgeDef[] = [
  { from: 1, to: 2, d: 'M 238 124 L 326 124', label: 'TCP / SQL', lx: 282, ly: 114 },
  { from: 2, to: 3, d: 'M 524 124 L 550 124', label: 'AST', lx: 537, ly: 114 },
  { from: 3, to: 4, d: 'M 652 170 L 652 196 L 540 196 L 540 216', label: 'Bound Tree', lx: 604, ly: 189 },
  { from: 4, to: 5, d: 'M 656 270 L 792 270 L 792 124 L 836 124', label: 'Physical Plan', lx: 744, ly: 261 },
  { from: 5, to: 6, d: 'M 956 170 L 956 198', label: 'GetPage()', lx: 992, ly: 187 },
  { from: 6, to: 7, d: 'M 842 250 L 764 250 L 764 366 L 284 366 L 284 312 L 244 312', label: 'Tuple Stream (Result Rows)', lx: 520, ly: 356 },
];

export default function SqlPipelineArchifyDiagram({
  activeStep,
  onSelectStep,
  fullscreen = false,
}: SqlPipelineArchifyDiagramProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeStep >= 7) {
      const stopTimer = window.setTimeout(() => setIsPlaying(false), 0);
      return () => window.clearTimeout(stopTimer);
    }
    const timer = window.setInterval(() => {
      onSelectStep(activeStep + 1);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeStep, onSelectStep]);

  const currentStory =
    SQL_PIPELINE_STORY_STEPS.find((s) => s.step === activeStep) || SQL_PIPELINE_STORY_STEPS[0];
  const activeNode = NODES.find((n) => n.step === activeStep) || NODES[0];

  return (
    <div
      className={`rounded-xl border border-white/[0.1] bg-[#0b0d14] ${
        fullscreen ? 'p-5 space-y-4' : 'p-3.5 md:p-4 space-y-3.5'
      }`}
    >
      {/* Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#121624] border border-sky-500/25 text-sky-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Client Tier
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#171526] border border-purple-500/25 text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Compiler &amp; CBO
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#101c1c] border border-emerald-500/25 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Storage &amp; Execution
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              onSelectStep(activeStep <= 1 ? 7 : activeStep - 1);
            }}
            className="p-1.5 rounded-lg bg-[#151822] hover:bg-[#1e2230] border border-white/[0.1] text-[#9ca0b0] hover:text-[#f4f4f7] transition-colors cursor-pointer"
            title="Previous stage"
            aria-label="Previous stage"
          >
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isPlaying && activeStep >= 7) {
                onSelectStep(1);
              }
              setIsPlaying((p) => !p);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-amber-500/15 border-amber-400/50 text-amber-300'
                : 'bg-[#f4f4f7] hover:bg-white border-transparent text-[#090a0d]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" strokeWidth={1.5} />
                <span>{language === 'bn' ? 'বিরতি' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" strokeWidth={1.5} />
                <span>{language === 'bn' ? 'পাইপলাইন চালান' : 'Simulate Flow'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              onSelectStep(activeStep >= 7 ? 1 : activeStep + 1);
            }}
            className="p-1.5 rounded-lg bg-[#151822] hover:bg-[#1e2230] border border-white/[0.1] text-[#9ca0b0] hover:text-[#f4f4f7] transition-colors cursor-pointer"
            title="Next stage"
            aria-label="Next stage"
          >
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              onSelectStep(1);
            }}
            className="p-1.5 rounded-lg bg-[#151822] hover:bg-[#1e2230] border border-white/[0.1] text-[#9ca0b0] hover:text-[#f4f4f7] transition-colors cursor-pointer"
            title="Reset to Step 1"
            aria-label="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Interactive SVG Architecture Canvas */}
      <div className="w-full overflow-x-auto rounded-xl border border-white/[0.08] bg-[#080a10]">
        <svg
          viewBox="0 0 1110 412"
          className={`w-full h-auto ${fullscreen ? 'min-w-[900px]' : 'min-w-[760px]'}`}
          role="img"
          aria-label="Interactive SQL Internal Query Processing Pipeline Architecture"
        >
          <defs>
            {/* Subtle dot grid pattern */}
            <pattern id="archify-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#1e2436" />
            </pattern>

            {/* Active node glow */}
            <filter id="archify-glow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={activeNode.color} floodOpacity="0.35" />
            </filter>

            {/* Arrow markers */}
            <marker id="arrow-idle" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
            </marker>
            <marker id="arrow-done" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fbbf24" />
            </marker>
          </defs>

          {/* Background Grid */}
          <rect x="0" y="0" width="1110" height="412" fill="url(#archify-grid)" />

          {/* ZONE 1: Client Tier */}
          <rect x="20" y="20" width="240" height="372" rx="14" fill="#0d111c" fillOpacity="0.92" stroke="#1e293b" strokeWidth="1.5" />
          <path d="M 20 34 Q 20 20 34 20 L 246 20 Q 260 20 260 34 L 260 54 L 20 54 Z" fill="#111a2b" />
          <text x="36" y="41" fill="#7dd3fc" fontSize="11.5" fontWeight="600" fontFamily="monospace">
            CLIENT &amp; PORTAL TIER
          </text>
          {/* Return feedback arrow inside Client Tier (7 -> UI) */}
          <text x="140" y="222" textAnchor="middle" fill="#64748b" fontSize="10.5" fontFamily="monospace">
            Web App Socket Pool
          </text>

          {/* ZONE 2: SQL Query Compiler */}
          <rect x="308" y="20" width="464" height="320" rx="14" fill="#0f111d" fillOpacity="0.92" stroke="#272640" strokeWidth="1.5" />
          <path d="M 308 34 Q 308 20 322 20 L 758 20 Q 772 20 772 34 L 772 54 L 308 54 Z" fill="#17162b" />
          <text x="326" y="41" fill="#c4b5fd" fontSize="11.5" fontWeight="600" fontFamily="monospace">
            SQL QUERY COMPILER &amp; OPTIMIZER
          </text>

          {/* CBO Plan Choice Pill inside Zone 2 */}
          <rect x="332" y="246" width="74" height="48" rx="8" fill="#141826" stroke="#1e293b" strokeDasharray="3 3" />
          <text x="369" y="266" textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="monospace">Seq Scan</text>
          <text x="369" y="281" textAnchor="middle" fill="#f87171" fontSize="9.5" fontFamily="monospace">Cost 84.0</text>
          <line x1="406" y1="270" x2="424" y2="270" stroke="#334155" strokeDasharray="3 3" />

          {/* ZONE 3: Execution & Storage Engine */}
          <rect x="820" y="20" width="272" height="372" rx="14" fill="#0c1318" fillOpacity="0.92" stroke="#1b3038" strokeWidth="1.5" />
          <path d="M 820 34 Q 820 20 834 20 L 1078 20 Q 1092 20 1092 34 L 1092 54 L 820 54 Z" fill="#102127" />
          <text x="838" y="41" fill="#6ee7b7" fontSize="11.5" fontWeight="600" fontFamily="monospace">
            EXECUTION &amp; STORAGE
          </text>

          {/* Disk / B+ Tree Cylinder at bottom of Zone 3 */}
          <g transform="translate(856, 318)">
            <ellipse cx="100" cy="12" rx="88" ry="10" fill="#0f1d24" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1.2" />
            <path d="M 12 12 L 12 46 A 88 10 0 0 0 188 46 L 188 12" fill="#0a1419" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1.2" />
            <ellipse cx="100" cy="12" rx="88" ry="10" fill="#12242d" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.2" />
            <text x="100" y="38" textAnchor="middle" fill="#a5f3fc" fontSize="11" fontFamily="monospace" fontWeight="600">
              students.ibd (B+ Tree)
            </text>
            <line x1="100" y1="-22" x2="100" y2="2" stroke="#22d3ee" strokeOpacity="0.4" strokeDasharray="3 3" />
          </g>

          {/* Directed Edges */}
          {EDGES.map((edge) => {
            const isCurrentEdge = activeStep === edge.from || activeStep === edge.to;
            const isDoneEdge = activeStep > edge.to;
            const strokeColor = isCurrentEdge
              ? '#fbbf24'
              : isDoneEdge
                ? '#34d399'
                : '#334155';
            const marker = isCurrentEdge
              ? 'url(#arrow-active)'
              : isDoneEdge
                ? 'url(#arrow-done)'
                : 'url(#arrow-idle)';

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={edge.d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isCurrentEdge ? 2.5 : 1.75}
                  strokeDasharray={isCurrentEdge ? '6 4' : undefined}
                  markerEnd={marker}
                >
                  {isCurrentEdge && isPlaying && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="20"
                      to="0"
                      dur="0.7s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>

                {/* Edge Label Pill */}
                <rect
                  x={edge.lx - edge.label.length * 3.3 - 6}
                  y={edge.ly - 10}
                  width={edge.label.length * 6.6 + 12}
                  height={16}
                  rx="4"
                  fill="#0b0e17"
                  stroke={isCurrentEdge ? '#fbbf24' : '#1e293b'}
                  strokeOpacity={isCurrentEdge ? 0.6 : 0.9}
                  strokeWidth="1"
                />
                <text
                  x={edge.lx}
                  y={edge.ly + 1}
                  textAnchor="middle"
                  fill={isCurrentEdge ? '#fde68a' : '#94a3b8'}
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Interactive Stage Nodes */}
          {NODES.map((node) => {
            const isActive = activeStep === node.step;
            const isDone = node.step < activeStep;
            const title = language === 'bn' ? node.titleBn : node.titleEn;
            const sub = language === 'bn' ? node.subBn : node.subEn;

            return (
              <g
                key={node.step}
                onClick={() => {
                  setIsPlaying(false);
                  onSelectStep(node.step);
                }}
                style={{ cursor: 'pointer' }}
                filter={isActive ? 'url(#archify-glow)' : undefined}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="11"
                  fill={isActive ? node.badgeBg : isDone ? '#111822' : '#11131c'}
                  stroke={isActive ? node.color : isDone ? '#10b981' : '#262b3d'}
                  strokeOpacity={isActive ? 1 : isDone ? 0.45 : 0.9}
                  strokeWidth={isActive ? 2.2 : 1.25}
                />

                {/* Top accent bar */}
                <rect
                  x={node.x + 1}
                  y={node.y + 1}
                  width={node.w - 2}
                  height={4}
                  rx="3"
                  fill={node.color}
                  fillOpacity={isActive ? 0.95 : isDone ? 0.5 : 0.22}
                />

                {/* Status & Latency row */}
                <rect
                  x={node.x + 12}
                  y={node.y + 14}
                  width={isActive ? 54 : isDone ? 44 : 44}
                  height={16}
                  rx="4"
                  fill={isActive ? node.color : '#1b2030'}
                  fillOpacity={isActive ? 0.2 : 1}
                />
                <text
                  x={node.x + (isActive ? 39 : 34)}
                  y={node.y + 25}
                  textAnchor="middle"
                  fill={isActive ? node.color : isDone ? '#34d399' : '#64748b'}
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  {isActive ? 'ACTIVE' : isDone ? 'DONE' : 'WAIT'}
                </text>

                <text
                  x={node.x + node.w - 12}
                  y={node.y + 25}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {node.latency}
                </text>

                {/* Title */}
                <text
                  x={node.x + 12}
                  y={node.y + 52}
                  fill="#f8fafc"
                  fontSize="12.5"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {title}
                </text>

                {/* Subtitle / IO */}
                <text
                  x={node.x + 12}
                  y={node.y + 72}
                  fill={isActive ? '#e2e8f0' : '#94a3b8'}
                  fontSize="10.5"
                  fontFamily="monospace"
                >
                  {sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Focused Stage Inspector Passport */}
      <div className="rounded-xl border border-white/[0.1] bg-[#131620] p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-semibold" style={{ color: activeNode.color }}>
              Stage 0{currentStory.step} / 07
            </span>
            <span className="text-[#686c7d]">•</span>
            <span className="text-[#9ca0b0]">
              {language === 'bn' ? currentStory.tagBn : currentStory.tagEn}
            </span>
          </div>
          <p className="text-xs text-[#f4f4f7] leading-relaxed">
            {language === 'bn' ? currentStory.engineBn : currentStory.engineEn}
          </p>
        </div>

        <div className="shrink-0 px-3 py-2 rounded-lg bg-[#090a0d] border border-white/[0.08] font-mono text-[11px] text-emerald-300 max-w-full md:max-w-xs truncate">
          {currentStory.payloadCode}
        </div>
      </div>
    </div>
  );
}
