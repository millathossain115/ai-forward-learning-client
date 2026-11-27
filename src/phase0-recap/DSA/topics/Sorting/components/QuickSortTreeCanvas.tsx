'use client';

import React from 'react';
import { GitBranch } from 'lucide-react';
import { TREE_PRESET_1, TreePartitionStep } from '../utils/quickSortUtils';

interface QuickSortTreeCanvasProps {
  currentTreeStep: TreePartitionStep;
}

export default function QuickSortTreeCanvas({ currentTreeStep }: QuickSortTreeCanvasProps) {
  const renderTreeBlock = (
    id: string,
    values: number[],
    xCenter: number,
    yTop: number,
    pivotIndex?: number,
    isStandalonePivot?: boolean,
    badgeText?: string
  ) => {
    const isRevealed = currentTreeStep.revealedNodeIds.includes(id);
    const isActive = currentTreeStep.activeNodeIds.includes(id);

    const cellW = 24;
    const cellH = 26;
    const totalW = values.length * cellW;
    const xStart = xCenter - totalW / 2;

    return (
      <g
        key={id}
        className="transition-all duration-300"
        style={{ opacity: isRevealed ? 1 : 0.12 }}
      >
        {isActive && (
          <rect
            x={xStart - 2.5}
            y={yTop - 2.5}
            width={totalW + 5}
            height={cellH + 5}
            rx={7}
            fill="none"
            stroke={isStandalonePivot ? '#fbbf24' : '#38bdf8'}
            strokeWidth={1.5}
            opacity={0.8}
          />
        )}

        <rect
          x={xStart}
          y={yTop}
          width={totalW}
          height={cellH}
          rx={5}
          fill={isStandalonePivot ? '#332004' : '#0c1a2c'}
          stroke={isStandalonePivot ? '#fbbf24' : '#38bdf8'}
          strokeWidth={isActive ? 2 : 1.2}
        />

        {values.map((_, i) => {
          if (i === 0) return null;
          const lx = xStart + i * cellW;
          return (
            <line
              key={`div-${i}`}
              x1={lx}
              y1={yTop}
              x2={lx}
              y2={yTop + cellH}
              stroke={isStandalonePivot ? '#654209' : '#1d3b5c'}
              strokeWidth={1}
            />
          );
        })}

        {values.map((v, i) => {
          const isCellPivot = pivotIndex !== undefined && pivotIndex === i;
          return (
            <g key={`c-${i}`}>
              {isCellPivot && (
                <rect
                  x={xStart + i * cellW}
                  y={yTop}
                  width={cellW}
                  height={cellH}
                  fill="#d97706"
                  opacity={0.7}
                />
              )}
              <text
                x={xStart + i * cellW + cellW / 2}
                y={yTop + cellH / 2 + 3.5}
                textAnchor="middle"
                fill={isCellPivot || isStandalonePivot ? '#fef3c7' : '#e0f2fe'}
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="bold"
              >
                {v}
              </text>
            </g>
          );
        })}

        {badgeText && (
          <g>
            <rect
              x={xCenter - (badgeText.length * 5 + 6) / 2}
              y={yTop - 13}
              width={badgeText.length * 5 + 6}
              height={11}
              rx={3}
              fill="#06111f"
              stroke={isStandalonePivot ? '#fbbf24' : '#38bdf8'}
              strokeWidth={0.8}
            />
            <text
              x={xCenter}
              y={yTop - 4.5}
              textAnchor="middle"
              fill={isStandalonePivot ? '#fde047' : '#7dd3fc'}
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
            >
              {badgeText}
            </text>
          </g>
        )}
      </g>
    );
  };

  const renderTreeArrow = (
    id: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    label?: string
  ) => {
    const isRevealed = currentTreeStep.revealedArrowIds.includes(id);
    const isActive = currentTreeStep.activeArrowIds.includes(id);

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
      <g key={id} style={{ opacity: isRevealed ? 1 : 0.12 }} className="transition-all duration-300">
        <path
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          stroke={isActive ? '#38bdf8' : '#64748b'}
          strokeWidth={isActive ? 2 : 1.2}
          markerEnd="url(#arrow-head)"
          fill="none"
        />
        {label && (
          <text
            x={midX + (x2 < x1 ? -10 : 10)}
            y={midY - 3}
            textAnchor="middle"
            fill={isActive ? '#38bdf8' : '#94a3b8'}
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="relative rounded-2xl bg-[#080d14] border border-[#182838] p-3 shadow-xl overflow-hidden flex flex-col items-center">
      {/* SVG Header Strip */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-[#121e2d] text-xs font-mono">
        <span className="text-zinc-400 flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-sky-400" />
          <span>পার্টিশন ট্রি ভিউ (Partition Tree): [20, 2, 9, 7, 12, 15, 1, 6, 8]</span>
        </span>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-sky-300">■ সাব-অ্যারে</span>
          <span className="text-amber-300">■ পিভট</span>
          <span className="text-emerald-300">■ লকড</span>
        </div>
      </div>

      {/* Compact Scaled SVG Tree */}
      <div className="w-full flex justify-center py-1 overflow-x-auto">
        <svg viewBox="0 0 840 440" className="w-full h-auto max-h-[460px] select-none">
          <defs>
            <marker id="arrow-head" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Level 0 -> Level 1 */}
          {renderTreeArrow('a_root_left', 340, 58, 200, 128, '< 8')}
          {renderTreeArrow('a_root_pivot', 420, 58, 420, 128, 'Pivot')}
          {renderTreeArrow('a_root_right', 500, 58, 650, 128, '>= 8')}

          {/* Level 1 (Left) -> Level 2 */}
          {renderTreeArrow('a_l1_ll', 170, 158, 110, 233, '< 6')}
          {renderTreeArrow('a_l1_lp', 200, 158, 200, 233, 'Pivot')}
          {renderTreeArrow('a_l1_lr', 230, 158, 290, 233, '>= 6')}

          {/* Level 2 (Left) -> Level 3 */}
          {renderTreeArrow('a_l2_p1', 95, 263, 80, 338, 'Pivot')}
          {renderTreeArrow('a_l2_v2', 125, 263, 140, 338, '>= 1')}

          {/* Level 1 (Right) -> Level 2 */}
          {renderTreeArrow('a_l1_rl', 620, 158, 560, 233, '< 12')}
          {renderTreeArrow('a_l1_rp', 650, 158, 650, 233, 'Pivot')}
          {renderTreeArrow('a_l1_rr', 680, 158, 740, 233, '>= 12')}

          {/* Level 2 (Right) -> Level 3 */}
          {renderTreeArrow('a_l2_v15', 725, 263, 700, 338, '< 20')}
          {renderTreeArrow('a_l2_p20', 755, 263, 780, 338, 'Pivot')}

          {/* NODES */}
          {renderTreeBlock('root', TREE_PRESET_1, 420, 30, 8, false, 'ROOT')}

          {renderTreeBlock('l1_left', [2, 7, 1, 6], 200, 130, 3, false, '< 8')}
          {renderTreeBlock('l1_pivot', [8], 420, 130, 0, true, 'PIVOT 8')}
          {renderTreeBlock('l1_right', [15, 9, 20, 12], 650, 130, 3, false, '>= 8')}

          {renderTreeBlock('l2_l_left', [2, 1], 110, 235, 1, false, '< 6')}
          {renderTreeBlock('l2_l_pivot', [6], 200, 235, 0, true, 'PIVOT 6')}
          {renderTreeBlock('l2_l_right', [7], 290, 235, -1, false, '>= 6')}

          {renderTreeBlock('l2_r_left', [9], 560, 235, -1, false, '< 12')}
          {renderTreeBlock('l2_r_pivot', [12], 650, 235, 0, true, 'PIVOT 12')}
          {renderTreeBlock('l2_r_right', [15, 20], 740, 235, 1, false, '>= 12')}

          {renderTreeBlock('l3_pivot_1', [1], 80, 340, 0, true, 'PIVOT 1')}
          {renderTreeBlock('l3_val_2', [2], 140, 340, -1, false, 'BASE')}

          {renderTreeBlock('l3_val_15', [15], 700, 340, -1, false, 'BASE')}
          {renderTreeBlock('l3_pivot_20', [20], 780, 340, 0, true, 'PIVOT 20')}
        </svg>
      </div>
    </div>
  );
}
