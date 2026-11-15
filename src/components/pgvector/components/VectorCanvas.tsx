import React from 'react';
import { IndexType, Centroid, VectorPoint, RankedVectorPoint } from '../types';

interface VectorCanvasProps {
  queryX: number;
  queryY: number;
  indexType: IndexType;
  activeCentroid: string | null;
  hnswHops: { fromX: number; fromY: number; toX: number; toY: number }[];
  top3: RankedVectorPoint[];
  dataset: VectorPoint[];
  centroids: Centroid[];
  canvasW: number;
  canvasH: number;
}

export default function VectorCanvas({
  queryX,
  queryY,
  indexType,
  activeCentroid,
  hnswHops,
  top3,
  dataset,
  centroids,
  canvasW,
  canvasH,
}: VectorCanvasProps) {
  return (
    <div className="lg:col-span-2 min-h-[380px] bg-[#07080e] rounded-xl border border-[#1a1d2e] p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Axis Labels */}
      <div className="absolute top-3 left-4 text-xs font-mono text-zinc-500">
        Dimension 2 (Semantic Embedding Axis)
      </div>
      <div className="absolute bottom-3 right-4 text-xs font-mono text-zinc-500">
        Dimension 1 ➔
      </div>

      <svg
        viewBox={`0 0 ${canvasW} ${canvasH}`}
        className="w-full max-w-[620px] h-[340px] select-none"
      >
        {/* Grid Background Lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#141724" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={canvasW} height={canvasH} fill="url(#grid)" />

        {/* IVFFlat Voronoi Cluster Circles */}
        {indexType === 'ivfflat' &&
          centroids.map((c) => {
            const isActive = activeCentroid === c.id;
            return (
              <g key={c.id}>
                <circle
                  cx={c.x * canvasW}
                  cy={c.y * canvasH}
                  r={85}
                  fill={c.color}
                  fillOpacity={isActive ? 0.12 : 0.04}
                  stroke={c.color}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray="4 4"
                  className={isActive ? 'animate-pulse' : ''}
                />
                <circle cx={c.x * canvasW} cy={c.y * canvasH} r={4} fill={c.color} />
                <text
                  x={c.x * canvasW}
                  y={c.y * canvasH - 10}
                  textAnchor="middle"
                  fill={c.color}
                  fontSize={9.5}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {c.label}
                </text>
              </g>
            );
          })}

        {/* HNSW Multi-Layer Skip-List Graph Hops */}
        {indexType === 'hnsw' &&
          hnswHops.map((h, i) => (
            <line
              key={i}
              x1={h.fromX * canvasW}
              y1={h.fromY * canvasH}
              x2={h.toX * canvasW}
              y2={h.toY * canvasH}
              stroke="#818cf8"
              strokeWidth={2.5}
              strokeDasharray="6 3"
              className="animate-pulse"
            />
          ))}

        {/* Distance Lines from Query to Top 3 Neighbors */}
        {top3.map((p, i) => (
          <line
            key={`line-${p.id}`}
            x1={queryX * canvasW}
            y1={queryY * canvasH}
            x2={p.x * canvasW}
            y2={p.y * canvasH}
            stroke={i === 0 ? '#06b6d4' : '#22d3ee'}
            strokeWidth={i === 0 ? 2 : 1}
            strokeOpacity={i === 0 ? 0.9 : 0.4}
            strokeDasharray="3 3"
          />
        ))}

        {/* Data Points */}
        {dataset.map((p) => {
          const isTop1 = top3[0]?.id === p.id;
          const isTop3 = top3.some((t) => t.id === p.id);
          const px = p.x * canvasW;
          const py = p.y * canvasH;

          return (
            <g key={p.id}>
              {isTop1 && (
                <circle
                  cx={px}
                  cy={py}
                  r={20}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  strokeDasharray="3 2"
                  className="animate-spin"
                  style={{ animationDuration: '4s', transformOrigin: `${px}px ${py}px` }}
                />
              )}
              <circle
                cx={px}
                cy={py}
                r={isTop3 ? 8 : 6}
                fill={p.color}
                stroke={isTop3 ? '#ffffff' : '#0f172a'}
                strokeWidth={1.5}
              />
              <text
                x={px}
                y={py + 18}
                textAnchor="middle"
                fill={isTop3 ? '#f1f5f9' : '#94a3b8'}
                fontSize={isTop3 ? 11 : 9.5}
                fontFamily="monospace"
                fontWeight={isTop3 ? 'bold' : 'normal'}
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Active Query Vector Marker */}
        <g>
          <circle
            cx={queryX * canvasW}
            cy={queryY * canvasH}
            r={16}
            fill="#ec4899"
            fillOpacity={0.25}
            className="animate-ping"
          />
          <circle
            cx={queryX * canvasW}
            cy={queryY * canvasH}
            r={8}
            fill="#f43f5e"
            stroke="#ffffff"
            strokeWidth={2}
          />
          <text
            x={queryX * canvasW}
            y={queryY * canvasH - 14}
            textAnchor="middle"
            fill="#fda4af"
            fontSize={11}
            fontFamily="monospace"
            fontWeight="bold"
          >
            📍 Query
          </text>
        </g>
      </svg>

      {/* Canvas Legend */}
      <div className="absolute top-3 right-4 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs font-mono text-zinc-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span> Query Vector
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]"></span> Top Matches
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Graph Hops
        </span>
      </div>
    </div>
  );
}
