import React from 'react';
import { Flame } from 'lucide-react';
import { TreeNode, TreeStep } from '../types';

interface FibonacciVisualizerProps {
  fibTreeNodes: TreeNode[];
  currentFibStep: TreeStep;
  fibN: number;
  onSelectFibN: (n: number) => void;
}

export default function FibonacciVisualizer({
  fibTreeNodes,
  currentFibStep,
  fibN,
  onSelectFibN
}: FibonacciVisualizerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#181d2f] pb-3">
        <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
          <Flame className="w-4 h-4 text-purple-400" />
          <span>ফিবোনাচ্চি রিকার্শন ট্রি: fib({fibN})</span>
        </span>
        <div className="flex items-center gap-1">
          {[3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => onSelectFibN(n)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-mono cursor-pointer border ${
                fibN === n
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-[#101322] border-[#1d2338] text-zinc-400'
              }`}
            >
              n={n}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Tree */}
      <div className="w-full flex items-center justify-center overflow-x-auto py-2">
        <svg viewBox="0 0 800 340" className="w-full h-auto max-h-[360px] select-none">
          {/* Tree Lines */}
          {fibTreeNodes.map(node => {
            if (!node.parentId) return null;
            const parent = fibTreeNodes.find(p => p.id === node.parentId);
            if (!parent) return null;
            const isParentVisited = Boolean(currentFibStep.visitedNodeStates[parent.id]);
            const isNodeVisited = Boolean(currentFibStep.visitedNodeStates[node.id]);
            const isEdgeActive = isParentVisited && isNodeVisited;

            return (
              <line
                key={`edge_${node.id}`}
                x1={parent.x}
                y1={parent.y + 16}
                x2={node.x}
                y2={node.y - 16}
                stroke={isEdgeActive ? (node.isDuplicateCall ? '#f43f5e' : '#a855f7') : '#222842'}
                strokeWidth={isEdgeActive ? 2.5 : 1.5}
              />
            );
          })}

          {/* Tree Nodes */}
          {fibTreeNodes.map(node => {
            const state = currentFibStep.visitedNodeStates[node.id];
            const isActive = currentFibStep.activeNodeId === node.id;
            const retVal = currentFibStep.nodeReturnValues[node.id];

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={18}
                  className={`transition-all duration-300 ${
                    state === 'base_case'
                      ? 'fill-amber-500 stroke-amber-300 stroke-2'
                      : state === 'returned'
                      ? 'fill-[#092b1b] stroke-emerald-400 stroke-2'
                      : isActive
                      ? 'fill-purple-600 stroke-purple-300 stroke-2'
                      : state === 'calling'
                      ? 'fill-[#22173f] stroke-purple-400 stroke-2'
                      : 'fill-[#0d101c] stroke-[#222840] stroke-1 opacity-40'
                  }`}
                />
                <text
                  textAnchor="middle"
                  dy="4"
                  className="font-mono text-[11px] font-bold fill-white select-none pointer-events-none"
                >
                  f({node.n})
                </text>
                {retVal !== undefined && (
                  <g transform="translate(0, 26)">
                    <rect
                      x={-14}
                      y={-7}
                      width={28}
                      height={14}
                      rx={3}
                      fill="#06331a"
                      stroke="#10b981"
                      strokeWidth={1}
                    />
                    <text
                      textAnchor="middle"
                      dy="3.5"
                      className="font-mono text-[8.5px] font-bold fill-emerald-300"
                    >
                      ={retVal}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
