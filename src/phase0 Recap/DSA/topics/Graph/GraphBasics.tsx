'use client';

import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { GraphType } from './graphBasicsTypes';
import GraphDefinitionDiagram from './components/GraphDefinitionDiagram';
import GraphTypesSimulator from './components/GraphTypesSimulator';

export default function GraphBasics() {
  // Selected interactive element in definition diagram
  const [selectedElement, setSelectedElement] = useState<'none' | 'vertex' | 'edge'>('none');

  // Selected graph type tab
  const [activeType, setActiveType] = useState<GraphType>('undirected');

  // Interactive path / node selection in Graph types
  const [activeNode, setActiveNode] = useState<string>('A');

  // Weighted path demonstration: nodes selected
  const [weightedStart] = useState<string>('A');
  const [weightedEnd] = useState<string>('C');

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. Definition Card: What is a Graph, Vertex, and Edge? */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 md:p-8 rounded-3xl flex flex-col gap-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1b1f30] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Network className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                গ্রাফ কী? (What is a Graph?)
              </h2>
            </div>
            <p className="text-xs md:text-sm text-zinc-300">
              ভার্টেক্স (নোড) এবং এজ (সংযোগকারী রেখা)-এর সমন্বয়ে গঠিত নন-লিনিয়ার ডেটা স্ট্রাকচার।
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-[#141724] border border-[#212638] text-indigo-300">
            <span>গাণিতিক রূপ: G = (V, E)</span>
          </div>
        </div>

        {/* 2-Column Layout: Visual SVG Diagram + Detailed Concepts */}
        <GraphDefinitionDiagram
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
      </div>

      {/* 2. Graph Types & Live Interactive Simulators */}
      <GraphTypesSimulator
        activeType={activeType}
        setActiveType={setActiveType}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        weightedStart={weightedStart}
        weightedEnd={weightedEnd}
      />
    </div>
  );
}
