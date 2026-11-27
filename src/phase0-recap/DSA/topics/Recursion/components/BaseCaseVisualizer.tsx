import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { BaseCaseStep, FactNode } from '../types';

interface BaseCaseVisualizerProps {
  currentBaseStep: BaseCaseStep;
  factNodes: FactNode[];
  hasBaseCase: boolean;
  factN: number;
}

export default function BaseCaseVisualizer({
  currentBaseStep,
  factNodes,
  hasBaseCase,
  factN
}: BaseCaseVisualizerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#181d2f] pb-3">
        <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>বেস কেস ক্যাসকেড ডায়াগ্রাম: factorial({factN})</span>
        </span>
        <span
          className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
            currentBaseStep.phase === 'crash'
              ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
              : currentBaseStep.phase === 'base_hit'
              ? 'bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
              : currentBaseStep.phase === 'pop'
              ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
              : 'bg-indigo-950 border-indigo-400 text-indigo-200'
          }`}
        >
          {currentBaseStep.actionTag}
        </span>
      </div>

      {/* Staircase SVG Canvas */}
      <div className="w-full flex items-center justify-center overflow-x-auto py-2 bg-[#060810] rounded-2xl border border-[#1b2238] shadow-inner">
        <svg
          viewBox="0 0 960 450"
          className="w-full h-auto min-w-[620px] max-h-[420px] select-none"
        >
          <defs>
            <marker
              id="arrow-down-green"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker
              id="arrow-return-green"
              markerWidth="8"
              markerHeight="8"
              refX="2"
              refY="3.5"
              orient="auto"
            >
              <polygon points="7 0, 0 3.5, 7 7" fill="#4ade80" />
            </marker>
            <marker
              id="arrow-crash-red"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#ef4444" />
            </marker>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-amber" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Incoming caller arrow */}
          {factNodes.length > 0 && (
            <g>
              <line
                x1={factNodes[0].x - 30}
                y1={factNodes[0].y - 20}
                x2={factNodes[0].x}
                y2={factNodes[0].y + 12}
                stroke="#22c55e"
                strokeWidth="2.5"
                markerEnd="url(#arrow-down-green)"
              />
              <text
                x={factNodes[0].x - 35}
                y={factNodes[0].y - 24}
                fill="#86efac"
                fontSize="11"
                fontWeight="bold"
                fontFamily="monospace"
              >
                main()
              </text>
            </g>
          )}

          {/* 2. Downward call arrows */}
          {factNodes.map((node, i) => {
            if (i >= factNodes.length - 1) return null;
            const nextNode = factNodes[i + 1];
            const isPassed = currentBaseStep.activeCallArrowIndex >= i;
            const isCurrent =
              currentBaseStep.activeCallArrowIndex === i && currentBaseStep.phase === 'push';
            const isCrashArrow = nextNode.n < 0;

            const startX = node.x + 65;
            const startY = node.y + node.h;
            const endX = nextNode.x + 22;
            const endY = nextNode.y;

            return (
              <line
                key={`down_arrow_${i}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isCrashArrow ? '#ef4444' : isPassed ? '#22c55e' : '#143825'}
                strokeWidth={isCurrent ? 3 : isPassed ? 2.5 : 1.5}
                strokeDasharray={isPassed ? undefined : '4 4'}
                markerEnd={
                  isCrashArrow
                    ? 'url(#arrow-crash-red)'
                    : isPassed
                    ? 'url(#arrow-down-green)'
                    : undefined
                }
                className="transition-all duration-300"
              />
            );
          })}

          {/* 3. Upward return arcs */}
          {currentBaseStep.visibleReturnArcs.map(ret => {
            if (ret.toN === -1) {
              const topNode = factNodes[0];
              const startX = topNode.x + 85;
              const startY = topNode.y;
              return (
                <g key="ret_final" className="transition-all duration-300">
                  <path
                    d={`M ${startX} ${startY} C ${startX + 30} ${startY - 35}, ${startX - 30} ${startY - 40}, ${startX - 15} ${startY - 22}`}
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2.5"
                    markerEnd="url(#arrow-return-green)"
                  />
                  <rect
                    x={startX + 32}
                    y={startY - 36}
                    width={165}
                    height={22}
                    rx={5}
                    fill="#042f1a"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                  />
                  <text
                    x={startX + 114}
                    y={startY - 21}
                    textAnchor="middle"
                    fill="#86efac"
                    fontWeight="bold"
                    fontSize="11.5"
                    fontFamily="monospace"
                  >
                    {ret.text}
                  </text>
                </g>
              );
            }

            const fromNode = factNodes.find(n => n.n === ret.fromN);
            const toNode = factNodes.find(n => n.n === ret.toN);
            if (!fromNode || !toNode) return null;

            const startX = fromNode.x + fromNode.w;
            const startY = fromNode.y + fromNode.h / 2;
            const endX = toNode.x + toNode.w;
            const endY = toNode.y + toNode.h / 2;

            const pathD = `M ${startX} ${startY} C ${startX + 55} ${startY - 10}, ${endX + 55} ${endY + 15}, ${endX} ${endY}`;

            const labelX = ret.fromN === 0 ? startX + 16 : endX + 18;
            const labelY = ret.fromN === 0 ? startY + 5 : endY - 7;
            const textWidth = ret.text.length * 7.5 + 18;

            return (
              <g key={`return_arc_${ret.fromN}`} className="transition-all duration-300">
                <path
                  d={pathD}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-return-green)"
                />
                <rect
                  x={labelX - 4}
                  y={labelY - 14}
                  width={textWidth}
                  height={20}
                  rx={4}
                  fill="#042f1a"
                  stroke="#22c55e"
                  strokeWidth="1"
                  className="shadow-md"
                />
                <text
                  x={labelX + textWidth / 2 - 4}
                  y={labelY}
                  textAnchor="middle"
                  fill="#86efac"
                  fontWeight="bold"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {ret.text}
                </text>
              </g>
            );
          })}

          {/* 4. Staircase Node Boxes */}
          {factNodes.map(node => {
            const isActive = currentBaseStep.activeNodeN === node.n;
            const isBaseNode = node.n === 0 && hasBaseCase;
            const isBaseReached =
              isBaseNode &&
              (currentBaseStep.phase === 'base_hit' || currentBaseStep.phase === 'pop');
            const isReturned = currentBaseStep.visibleReturnArcs.some(
              r => r.fromN === node.n
            );
            const isCrash = node.n < 0;

            return (
              <g key={`fact_node_${node.n}`} className="transition-all duration-300">
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={8}
                  fill={
                    isCrash
                      ? '#450a0a'
                      : isBaseReached
                      ? '#451a03'
                      : isActive
                      ? '#14532d'
                      : isReturned
                      ? '#052e16'
                      : '#0d2818'
                  }
                  stroke={
                    isCrash
                      ? '#ef4444'
                      : isBaseReached
                      ? '#f59e0b'
                      : isActive
                      ? '#4ade80'
                      : isReturned
                      ? '#16a34a'
                      : '#1f5337'
                  }
                  strokeWidth={isActive || isBaseReached || isCrash ? 2.5 : 1.5}
                  filter={
                    isBaseReached
                      ? 'url(#glow-amber)'
                      : isActive
                      ? 'url(#glow-green)'
                      : undefined
                  }
                />

                <text
                  x={node.x + node.w / 2}
                  y={node.y + node.h / 2 + 5}
                  textAnchor="middle"
                  fill={isCrash ? '#fca5a5' : isBaseReached ? '#fef08a' : '#ffffff'}
                  fontWeight="bold"
                  fontSize="13"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  Factorial ({node.n})
                </text>

                {isBaseNode && (
                  <g transform={`translate(${node.x + 10}, ${node.y - 11})`}>
                    <rect width={84} height={18} rx={4} fill="#f59e0b" className="shadow" />
                    <text
                      x={42}
                      y={13}
                      textAnchor="middle"
                      fill="#000000"
                      fontWeight="bold"
                      fontSize="9.5"
                      fontFamily="monospace"
                      className="select-none pointer-events-none"
                    >
                      BASE CASE ⚓
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 5. Stack Overflow alert card in crash mode */}
          {currentBaseStep.phase === 'crash' && (
            <g transform="translate(540, 240)">
              <rect
                x={-190}
                y={-45}
                width={380}
                height={90}
                rx={12}
                fill="#450a0a"
                stroke="#ef4444"
                strokeWidth="2.5"
                filter="url(#glow-amber)"
              />
              <text
                x={0}
                y={-15}
                textAnchor="middle"
                fill="#fee2e2"
                fontWeight="bold"
                fontSize="13"
                fontFamily="monospace"
              >
                💥 STACK OVERFLOW!
              </text>
              <text
                x={0}
                y={10}
                textAnchor="middle"
                fill="#fca5a5"
                fontSize="11"
                fontFamily="sans-serif"
              >
                RangeError: Maximum call stack size exceeded
              </text>
              <text
                x={0}
                y={30}
                textAnchor="middle"
                fill="#f87171"
                fontSize="10"
                fontFamily="sans-serif"
              >
                বেস কেস না থাকায় কোনো রিটার্ন নেই, মেমরি শেষ!
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400 px-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-3 h-0.5 bg-emerald-500 inline-block" /> ⬇ Winding (কল নামছে)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> 🛑 Base Case (থামার পয়েন্ট)
          </span>
          <span className="flex items-center gap-1.5 text-green-300">
            <span className="w-3 h-0.5 bg-green-400 inline-block" /> ⬆ Unwinding (মান রিটার্ন)
          </span>
        </div>
        {hasBaseCase && (
          <span className="text-zinc-500 text-[10px]">
            সূত্র: if (n &le; 0) return 1; else return n * fact(n - 1);
          </span>
        )}
      </div>
    </div>
  );
}
