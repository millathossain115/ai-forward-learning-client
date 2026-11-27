'use client';

import React from 'react';
import { DfsStep, GRAPH_NODES, GRAPH_EDGES } from '../dfsTypes';

interface DfsCanvasProps {
  currentStep: DfsStep;
  currentStepIdx: number;
}

export default function DfsCanvas({ currentStep, currentStepIdx }: DfsCanvasProps) {
  return (
    <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 flex flex-col justify-between min-h-[460px] relative space-y-4">
      <div className="w-full flex items-center justify-center overflow-x-auto py-2 bg-[#060810] rounded-2xl border border-[#1b2238]">
        <svg viewBox="0 0 660 320" className="w-full h-auto max-h-[360px] select-none">
          <defs>
            <marker
              id="dfs-arrow-gray"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
            </marker>
            <marker
              id="dfs-arrow-active"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#818cf8" />
            </marker>
            <marker
              id="dfs-arrow-visited"
              markerWidth="8"
              markerHeight="8"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#10b981" />
            </marker>
          </defs>

          {/* Edges */}
          {GRAPH_EDGES.map((edge) => {
            const uNode = GRAPH_NODES.find((n) => n.id === edge.u)!;
            const vNode = GRAPH_NODES.find((n) => n.id === edge.v)!;
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
                stroke={isActive ? '#818cf8' : isVisited ? '#10b981' : '#1e293b'}
                strokeWidth={isActive ? 3.5 : isVisited ? 2.5 : 1.5}
                markerEnd={
                  isActive
                    ? 'url(#dfs-arrow-active)'
                    : isVisited
                    ? 'url(#dfs-arrow-visited)'
                    : 'url(#dfs-arrow-gray)'
                }
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Nodes */}
          {GRAPH_NODES.map((node) => {
            const isCurrent = currentStep.currentNode === node.id;
            const inStack = currentStep.callStack.includes(node.id);
            const isVisited = currentStep.visitedNodes.includes(node.id);

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={20}
                  fill={
                    isCurrent
                      ? '#4f46e5'
                      : inStack
                      ? '#1e1b4b'
                      : isVisited
                      ? '#064e3b'
                      : '#090d1a'
                  }
                  stroke={
                    isCurrent
                      ? '#a5b4fc'
                      : inStack
                      ? '#6366f1'
                      : isVisited
                      ? '#10b981'
                      : '#1e293b'
                  }
                  strokeWidth={isCurrent ? 3 : 2}
                  className="transition-colors duration-300"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill={isCurrent ? '#ffffff' : inStack ? '#c7d2fe' : isVisited ? '#a7f3d0' : '#94a3b8'}
                  fontWeight="bold"
                  fontSize="13"
                  fontFamily="monospace"
                  className="select-none pointer-events-none"
                >
                  {node.id}
                </text>
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
