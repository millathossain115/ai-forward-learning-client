'use client';

import React from 'react';
import { Split } from 'lucide-react';
import { TreeStep } from '../utils/mergeSortUtils';

interface MergeSortTreeCanvasProps {
  tree: {
    r0: number[][];
    r1: number[][];
    r2: number[][];
    r3: number[][];
    r4: number[][];
    r5: number[][];
    r6: number[][];
  };
  currentStep: TreeStep;
  treeViewMode: 'stepper' | 'blueprint';
  onSetTreeViewMode: (mode: 'stepper' | 'blueprint') => void;
}

export default function MergeSortTreeCanvas({
  tree,
  currentStep,
  treeViewMode,
  onSetTreeViewMode
}: MergeSortTreeCanvasProps) {
  // Node helper to render array block
  const renderArrayNode = (
    id: string,
    values: number[],
    xCenter: number,
    yTop: number,
    type: 'divide' | 'merge',
    statusLabel?: string
  ) => {
    const isBlueprint = treeViewMode === 'blueprint';
    const isRevealed = isBlueprint || currentStep.revealedNodeIds.includes(id);
    const isActive = currentStep.activeNodeIds.includes(id);

    const cellWidth = 22;
    const cellHeight = 24;
    const totalWidth = values.length * cellWidth;
    const xStart = xCenter - totalWidth / 2;

    const isDivide = type === 'divide';
    const fillBg = isDivide ? '#0c1a2c' : '#231805';
    const borderColor = isDivide ? '#38bdf8' : '#fbbf24';
    const textColor = isDivide ? '#e0f2fe' : '#fef08a';
    const dividerColor = isDivide ? '#1e3857' : '#573d0a';

    const activeBorderColor = isDivide ? '#67e8f9' : '#fde047';
    const activeFill = isDivide ? '#123052' : '#3d2b09';

    const pillWidth = statusLabel ? Math.max(40, statusLabel.length * 6 + 8) : 0;

    return (
      <g
        key={id}
        className="transition-all duration-300"
        style={{
          opacity: isRevealed ? 1 : 0.15,
          cursor: 'pointer'
        }}
      >
        {statusLabel && isActive && (
          <g>
            <rect
              x={xCenter - pillWidth / 2}
              y={yTop - 13}
              width={pillWidth}
              height={12}
              rx={3}
              fill={isDivide ? '#071626' : '#241503'}
              stroke={activeBorderColor}
              strokeWidth={1}
            />
            <text
              x={xCenter}
              y={yTop - 4.5}
              textAnchor="middle"
              fill={activeBorderColor}
              fontFamily="ui-monospace, monospace"
              fontSize="7"
              fontWeight="bold"
            >
              {statusLabel}
            </text>
          </g>
        )}

        {isActive && (
          <rect
            x={xStart - 2.5}
            y={yTop - 2.5}
            width={totalWidth + 5}
            height={cellHeight + 5}
            rx={6}
            fill="none"
            stroke={activeBorderColor}
            strokeWidth={1.5}
            opacity={0.7}
          />
        )}

        <rect
          x={xStart}
          y={yTop}
          width={totalWidth}
          height={cellHeight}
          rx={5}
          fill={isActive ? activeFill : fillBg}
          stroke={isActive ? activeBorderColor : borderColor}
          strokeWidth={isActive ? 2 : 1.2}
        />

        {values.map((_, i) => {
          if (i === 0) return null;
          const lineX = xStart + i * cellWidth;
          return (
            <line
              key={`div-${i}`}
              x1={lineX}
              y1={yTop}
              x2={lineX}
              y2={yTop + cellHeight}
              stroke={dividerColor}
              strokeWidth={1}
            />
          );
        })}

        {values.map((v, i) => (
          <text
            key={`txt-${i}`}
            x={xStart + i * cellWidth + cellWidth / 2}
            y={yTop + cellHeight / 2 + 4}
            textAnchor="middle"
            fill={isActive ? '#ffffff' : textColor}
            fontFamily="ui-monospace, monospace"
            fontSize="10.5"
            fontWeight="bold"
          >
            {v}
          </text>
        ))}
      </g>
    );
  };

  const renderArrow = (
    id: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: 'divide' | 'merge'
  ) => {
    const isBlueprint = treeViewMode === 'blueprint';
    const isRevealed = isBlueprint || currentStep.revealedArrowIds.includes(id);
    const isActive = currentStep.activeArrowIds.includes(id);

    const isDivide = type === 'divide';
    const strokeColor = isDivide ? '#38bdf8' : '#10b981';
    const marker = isDivide ? 'url(#arrow-sky)' : 'url(#arrow-emerald)';

    const midY = (y1 + y2) / 2;
    const pathD = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    return (
      <path
        key={id}
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isActive ? 2 : 1.2}
        markerEnd={marker}
        style={{
          opacity: isRevealed ? (isActive ? 1 : 0.75) : 0.12,
          transition: 'all 0.3s ease'
        }}
      />
    );
  };

  return (
    <div className="relative rounded-2xl bg-[#070b12] border border-[#162538] p-3 shadow-xl overflow-hidden flex flex-col items-center">
      {/* Tree / Blueprint Mode Pill */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-[#121e2d] text-xs font-mono">
        <span className="text-zinc-400 flex items-center gap-1.5">
          <Split className="w-3.5 h-3.5 text-teal-400" />
          <span>ডিভাইড অ্যান্ড কনকার ট্রি ভিউ (Divide Tree):</span>
        </span>
        <div className="flex items-center gap-1 bg-[#0d1624] p-0.5 rounded-lg border border-[#1a293b]">
          <button
            onClick={() => onSetTreeViewMode('stepper')}
            className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
              treeViewMode === 'stepper' ? 'bg-teal-700 text-white font-bold' : 'text-zinc-400'
            }`}
          >
            স্টেপ বাই স্টেপ
          </button>
          <button
            onClick={() => onSetTreeViewMode('blueprint')}
            className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
              treeViewMode === 'blueprint' ? 'bg-sky-700 text-white font-bold' : 'text-zinc-400'
            }`}
          >
            পূর্ণ ব্লুপ্রিন্ট
          </button>
        </div>
      </div>

      {/* Compact Scaled SVG Tree */}
      <div className="w-full flex justify-center py-1">
        <svg
          viewBox="0 0 800 620"
          className="w-full h-auto max-h-[480px] select-none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <marker id="arrow-sky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#10b981" />
            </marker>
          </defs>

          {/* DIVIDE ARROWS */}
          {renderArrow('a_r0_r1_0', 400, 48, 200, 108, 'divide')}
          {renderArrow('a_r0_r1_1', 400, 48, 600, 108, 'divide')}

          {renderArrow('a_r1_r2_0', 200, 132, 100, 192, 'divide')}
          {renderArrow('a_r1_r2_1', 200, 132, 300, 192, 'divide')}
          {renderArrow('a_r1_r2_2', 600, 132, 500, 192, 'divide')}
          {renderArrow('a_r1_r2_3', 600, 132, 700, 192, 'divide')}

          {renderArrow('a_r2_r3_0', 100, 216, 50, 276, 'divide')}
          {renderArrow('a_r2_r3_1', 100, 216, 150, 276, 'divide')}
          {renderArrow('a_r2_r3_2', 300, 216, 250, 276, 'divide')}
          {renderArrow('a_r2_r3_3', 300, 216, 350, 276, 'divide')}
          {renderArrow('a_r2_r3_4', 500, 216, 450, 276, 'divide')}
          {renderArrow('a_r2_r3_5', 500, 216, 550, 276, 'divide')}
          {renderArrow('a_r2_r3_6', 700, 216, 650, 276, 'divide')}
          {renderArrow('a_r2_r3_7', 700, 216, 750, 276, 'divide')}

          {/* MERGE ARROWS */}
          {renderArrow('a_r3_r4_0', 50, 300, 100, 360, 'merge')}
          {renderArrow('a_r3_r4_1', 150, 300, 100, 360, 'merge')}
          {renderArrow('a_r3_r4_2', 250, 300, 300, 360, 'merge')}
          {renderArrow('a_r3_r4_3', 350, 300, 300, 360, 'merge')}
          {renderArrow('a_r3_r4_4', 450, 300, 500, 360, 'merge')}
          {renderArrow('a_r3_r4_5', 550, 300, 500, 360, 'merge')}
          {renderArrow('a_r3_r4_6', 650, 300, 700, 360, 'merge')}
          {renderArrow('a_r3_r4_7', 750, 300, 700, 360, 'merge')}

          {renderArrow('a_r4_r5_0', 100, 384, 200, 444, 'merge')}
          {renderArrow('a_r4_r5_1', 300, 384, 200, 444, 'merge')}
          {renderArrow('a_r4_r5_2', 500, 384, 600, 444, 'merge')}
          {renderArrow('a_r4_r5_3', 700, 384, 600, 444, 'merge')}

          {renderArrow('a_r5_r6_0', 200, 468, 400, 528, 'merge')}
          {renderArrow('a_r5_r6_1', 600, 468, 400, 528, 'merge')}

          {/* NODES */}
          {renderArrayNode('r0_0', tree.r0[0], 400, 24, 'divide', 'ROOT')}

          {renderArrayNode('r1_0', tree.r1[0], 200, 108, 'divide', 'LEFT HALF')}
          {renderArrayNode('r1_1', tree.r1[1], 600, 108, 'divide', 'RIGHT HALF')}

          {renderArrayNode('r2_0', tree.r2[0], 100, 192, 'divide', 'DIVIDE')}
          {renderArrayNode('r2_1', tree.r2[1], 300, 192, 'divide', 'DIVIDE')}
          {renderArrayNode('r2_2', tree.r2[2], 500, 192, 'divide', 'DIVIDE')}
          {renderArrayNode('r2_3', tree.r2[3], 700, 192, 'divide', 'DIVIDE')}

          {renderArrayNode('r3_0', tree.r3[0], 50, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_1', tree.r3[1], 150, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_2', tree.r3[2], 250, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_3', tree.r3[3], 350, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_4', tree.r3[4], 450, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_5', tree.r3[5], 550, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_6', tree.r3[6], 650, 276, 'divide', 'BASE')}
          {renderArrayNode('r3_7', tree.r3[7], 750, 276, 'divide', 'BASE')}

          {renderArrayNode('r4_0', tree.r4[0], 100, 360, 'merge', 'MERGED')}
          {renderArrayNode('r4_1', tree.r4[1], 300, 360, 'merge', 'MERGED')}
          {renderArrayNode('r4_2', tree.r4[2], 500, 360, 'merge', 'MERGED')}
          {renderArrayNode('r4_3', tree.r4[3], 700, 360, 'merge', 'MERGED')}

          {renderArrayNode('r5_0', tree.r5[0], 200, 444, 'merge', 'SORTED 4')}
          {renderArrayNode('r5_1', tree.r5[1], 600, 444, 'merge', 'SORTED 4')}

          {renderArrayNode(
            'r6_0',
            currentStep.finalDisplayArray &&
              currentStep.finalDisplayArray.length > 0 &&
              currentStep.phase !== 'complete'
              ? currentStep.finalDisplayArray
              : tree.r6[0],
            400,
            528,
            'merge',
            currentStep.phase === 'complete' ? 'FULLY SORTED' : 'FINAL MERGE'
          )}
        </svg>
      </div>
    </div>
  );
}
