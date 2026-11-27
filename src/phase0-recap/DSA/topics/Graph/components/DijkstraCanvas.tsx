'use client';

import React from 'react';
import { DijkstraStep, GRAPH_NODES, GRAPH_EDGES } from '../dijkstraTypes';

interface DijkstraCanvasProps {
  currentStep: DijkstraStep;
  currentStepIdx: number;
}

export default function DijkstraCanvas({ currentStep, currentStepIdx }: DijkstraCanvasProps) {
  return (
    <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 flex flex-col justify-between min-h-[460px] relative space-y-4">
      <div className="w-full flex items-center justify-center overflow-x-auto py-2 bg-[#060810] rounded-2xl border border-[#1b2238]">
        <svg viewBox="0 0 680 320" className="w-full h-auto max-h-[360px] select-none">
          <defs>
            <marker
              id="dijk-arrow-gray"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
            </marker>
            <marker
              id="dijk-arrow-active"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
            </marker>
            <marker
              id="dijk-arrow-path"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#10b981" />
            </marker>
          </defs>

          {/* Edges with weight pills */}
          {GRAPH_EDGES.map((edge) => {
            const uNode = GRAPH_NODES.find((n) => n.id === edge.u)!;
            const vNode = GRAPH_NODES.find((n) => n.id === edge.v)!;
            const edgeKey = `${edge.u}-${edge.v}`;
            const isActive = currentStep.activeEdge === edgeKey;

            // Check if this edge is in the final shortest path
            const isInFinalPath =
              currentStep.finalPath.length > 1 &&
              currentStep.finalPath.some((node, i) => {
                return (
                  i < currentStep.finalPath.length - 1 &&
                  currentStep.finalPath[i] === edge.u &&
                  currentStep.finalPath[i + 1] === edge.v
                );
              });

            const isRelaxed = currentStep.relaxedEdges.includes(edgeKey);
            const midX = (uNode.x + vNode.x) / 2;
            const midY = (uNode.y + vNode.y) / 2;

            return (
              <g key={edgeKey}>
                <line
                  x1={uNode.x}
                  y1={uNode.y}
                  x2={vNode.x}
                  y2={vNode.y}
                  stroke={
                    isInFinalPath
                      ? '#10b981'
                      : isActive
                      ? '#f59e0b'
                      : isRelaxed
                      ? '#059669'
                      : '#1e293b'
                  }
                  strokeWidth={isInFinalPath ? 4 : isActive ? 3.5 : isRelaxed ? 2.5 : 1.5}
                  markerEnd={
                    isInFinalPath
                      ? 'url(#dijk-arrow-path)'
                      : isActive
                      ? 'url(#dijk-arrow-active)'
                      : 'url(#dijk-arrow-gray)'
                  }
                  className="transition-colors duration-300"
                />

                {/* Edge Weight Pill */}
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x={-11}
                    y={-9}
                    width={22}
                    height={18}
                    rx={4}
                    fill={isActive ? '#78350f' : isInFinalPath ? '#064e3b' : '#0a0d18'}
                    stroke={isActive ? '#f59e0b' : isInFinalPath ? '#10b981' : '#1e293b'}
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    fill={isActive ? '#fef08a' : isInFinalPath ? '#a7f3d0' : '#94a3b8'}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {edge.w}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Nodes */}
          {GRAPH_NODES.map((node) => {
            const isCurrent = currentStep.currentNode === node.id;
            const isVisited = currentStep.visited.includes(node.id);
            const isInFinalPath = currentStep.finalPath.includes(node.id);
            const dist = currentStep.distances[node.id];

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={22}
                  fill={
                    isInFinalPath
                      ? '#064e3b'
                      : isCurrent
                      ? '#b45309'
                      : isVisited
                      ? '#1e293b'
                      : '#0a0e1c'
                  }
                  stroke={
                    isInFinalPath
                      ? '#10b981'
                      : isCurrent
                      ? '#fbbf24'
                      : isVisited
                      ? '#475569'
                      : '#1e293b'
                  }
                  strokeWidth={isInFinalPath || isCurrent ? 3 : 2}
                  className="transition-colors duration-300"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill={isCurrent || isInFinalPath ? '#ffffff' : '#cbd5e1'}
                  fontWeight="bold"
                  fontSize="14"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  {node.id}
                </text>

                {/* Distance Badge Below Node */}
                <g transform="translate(0, 30)">
                  <rect
                    x={-20}
                    y={-8}
                    width={40}
                    height={16}
                    rx={4}
                    fill="#060913"
                    stroke={dist !== Infinity ? '#10b981' : '#334155'}
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill={dist !== Infinity ? '#34d399' : '#64748b'}
                    fontSize="9.5"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {dist === Infinity ? '∞' : dist}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Explanation Step Card */}
      <div className="p-4 rounded-2xl bg-[#0b0e1a] border border-[#1b2238] space-y-1">
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
