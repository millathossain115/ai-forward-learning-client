'use client';

import React from 'react';
import { BfsStep, GRAPH_NODES, GRAPH_EDGES } from '../bfsTypes';

interface BfsCanvasProps {
  currentStep: BfsStep;
  currentStepIdx: number;
}

export default function BfsCanvas({ currentStep, currentStepIdx }: BfsCanvasProps) {
  return (
    <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 flex flex-col justify-between min-h-[460px] shadow-2xl relative space-y-4">
      <div className="w-full flex items-center justify-center overflow-x-auto py-2 bg-[#060810] rounded-2xl border border-[#1b2238]">
        <svg viewBox="0 0 660 320" className="w-full h-auto max-h-[360px] select-none">
          <defs>
            <marker
              id="bfs-arrow-gray"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
            </marker>
            <marker
              id="bfs-arrow-active"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#38bdf8" />
            </marker>
            <marker
              id="bfs-arrow-visited"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#10b981" />
            </marker>
          </defs>

          {/* Level Guides / Ripples */}
          <text x={90} y={30} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
            Level 0
          </text>
          <text x={230} y={30} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
            Level 1
          </text>
          <text x={380} y={30} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
            Level 2
          </text>
          <text x={530} y={30} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
            Level 3
          </text>

          {/* Vertical Level Dash Lines */}
          {[90, 230, 380, 530].map(lx => (
            <line
              key={lx}
              x1={lx}
              y1={40}
              x2={lx}
              y2={290}
              stroke="#161f30"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Edges */}
          {GRAPH_EDGES.map(edge => {
            const uNode = GRAPH_NODES.find(n => n.id === edge.u)!;
            const vNode = GRAPH_NODES.find(n => n.id === edge.v)!;
            const edgeKey = `${edge.u}-${edge.v}`;
            const isActive = currentStep.activeEdge === edgeKey;
            const isVisited = currentStep.visitedEdges.includes(edgeKey);

            return (
              <line
                key={edgeKey}
                x1={uNode.x}
                y1={uNode.y}
                x2={vNode.x}
                y2={vNode.y}
                stroke={isActive ? '#38bdf8' : isVisited ? '#10b981' : '#1e293b'}
                strokeWidth={isActive ? 3.5 : isVisited ? 2.5 : 1.5}
                markerEnd={
                  isActive
                    ? 'url(#bfs-arrow-active)'
                    : isVisited
                    ? 'url(#bfs-arrow-visited)'
                    : 'url(#bfs-arrow-gray)'
                }
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {GRAPH_NODES.map(node => {
            const isCurrent = currentStep.currentNode === node.id;
            const inQueue = currentStep.queue.includes(node.id);
            const isVisited = currentStep.visitedNodes.includes(node.id);
            const dist = currentStep.distances[node.id];

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={20}
                  fill={
                    isCurrent
                      ? '#0284c7'
                      : inQueue
                      ? '#0c4a6e'
                      : isVisited
                      ? '#064e3b'
                      : '#090d1a'
                  }
                  stroke={
                    isCurrent
                      ? '#38bdf8'
                      : inQueue
                      ? '#0284c7'
                      : isVisited
                      ? '#10b981'
                      : '#1e293b'
                  }
                  strokeWidth={isCurrent ? 3 : 2}
                  className="transition-all duration-300"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill={isCurrent ? '#ffffff' : inQueue ? '#bae6fd' : isVisited ? '#a7f3d0' : '#94a3b8'}
                  fontWeight="bold"
                  fontSize="13"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  {node.id}
                </text>

                {/* Distance Badge */}
                {dist !== undefined && (
                  <g transform="translate(0, 28)">
                    <rect x={-14} y={-7} width={28} height={14} rx={3} fill="#082f49" stroke="#0284c7" strokeWidth={1} />
                    <text textAnchor="middle" dy="3.5" fill="#7dd3fc" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      d={dist}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Explanation Step Card */}
      <div className="p-4 rounded-2xl bg-[#0b0e1a] border border-[#1b2238] shadow-lg space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-400">ধাপ {currentStepIdx + 1}:</span>
          <span className="text-white font-bold">{currentStep.title}</span>
        </div>
        <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
          {currentStep.desc}
        </p>
      </div>
    </div>
  );
}
