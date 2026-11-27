'use client';

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import { Play, CheckCircle2, AlertTriangle, RefreshCw, Layers } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const initialNodes: Node[] = [
  {
    id: 'A_Lint',
    position: { x: 50, y: 50 },
    data: { label: 'A: Lint Code (0.3s)' },
    style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #38bdf8', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'B_TestUnit',
    position: { x: 50, y: 160 },
    data: { label: 'B: Unit Tests (0.4s)' },
    style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #38bdf8', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'C_TestIntegration',
    position: { x: 300, y: 160 },
    data: { label: 'C: Integration Tests (0.5s)' },
    style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #64748b', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'D_Build',
    position: { x: 550, y: 100 },
    data: { label: 'D: Docker Build (0.6s)' },
    style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #64748b', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'E_DeployStaging',
    position: { x: 800, y: 100 },
    data: { label: 'E: Deploy Staging (0.4s)' },
    style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #64748b', borderRadius: '8px', padding: '10px' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-a-d', source: 'A_Lint', target: 'D_Build', animated: true },
  { id: 'e-b-c', source: 'B_TestUnit', target: 'C_TestIntegration', animated: true },
  { id: 'e-c-d', source: 'C_TestIntegration', target: 'D_Build', animated: true },
  { id: 'e-d-e', source: 'D_Build', target: 'E_DeployStaging', animated: true },
];

export default function DagVisualizer() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isCycleActive, setIsCycleActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid?: boolean;
    has_cycle?: boolean;
    cycle_path?: string[];
    topological_order?: string[];
  } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const toggleCycle = () => {
    if (isCycleActive) {
      setEdges(initialEdges);
      setIsCycleActive(false);
      setLogs((l) => [...l, 'Removed cycle. Graph is now a valid DAG.']);
    } else {
      const cyclicEdges: Edge[] = [
        ...initialEdges,
        { id: 'e-cycle', source: 'E_DeployStaging', target: 'B_TestUnit', animated: true, style: { stroke: '#ef4444' } },
      ];
      setEdges(cyclicEdges);
      setIsCycleActive(true);
      setLogs((l) => [...l, 'Added cycle edge: E_DeployStaging -> B_TestUnit!']);
    }
  };

  const validateGraph = async () => {
    try {
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, label: String(n.data.label) })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      };

      const res = await fetch(`${API_BASE_URL}/api/dsa/dag/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setValidationResult(data);

      if (data.has_cycle) {
        setLogs((l) => [
          ...l,
          `❌ [3-Color DFS] Cycle detected: ${data.cycle_path?.join(' -> ')}`,
        ]);
      } else {
        setLogs((l) => [
          ...l,
          `✅ [3-Color DFS] Valid DAG. Kahn's Topological Order: ${data.topological_order?.join(' ➔ ')}`,
        ]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setLogs((l) => [...l, `⚠️ Backend unreachable (make sure FastAPI server is running on :8000): ${msg}`]);
    }
  };

  const executePipeline = async () => {
    setIsRunning(true);
    setLogs((l) => [...l, '🚀 Initiating asynchronous DAG execution engine on FastAPI backend...']);

    try {
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, duration: 0.3 })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      };

      const res = await fetch(`${API_BASE_URL}/api/dsa/dag/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setLogs((l) => [...l, `❌ Execution blocked: ${data.detail || 'Unknown error'}`]);
      } else {
        setLogs((l) => [
          ...l,
          `🎉 Engine completed all tasks in ${data.total_time}s!`,
          `Topological execution order: ${data.topological_order?.join(' ➔ ')}`,
        ]);

        // Highlight completed nodes in green
        setNodes((currentNodes) =>
          currentNodes.map((n) => ({
            ...n,
            style: {
              ...n.style,
              background: '#064e3b',
              border: '1px solid #10b981',
            },
          }))
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setLogs((l) => [...l, `⚠️ Execution failed: ${msg}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const resetVisuals = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsCycleActive(false);
    setValidationResult(null);
    setLogs([]);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#15171e] p-4 rounded-xl border border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.5} />
          <h3 className="font-semibold text-sm text-[#f4f4f7]">Live DAG &amp; Async Engine Visualizer</h3>
          <span className="text-xs font-mono text-[#686c7d]">
            Phase 0 • Graph DSA
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleCycle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
              isCycleActive
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                : 'bg-[#1c1f29] hover:bg-[#232734] border-white/[0.08] text-[#9ca0b0] hover:text-[#f4f4f7]'
            }`}
          >
            {isCycleActive && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" strokeWidth={1.5} />}
            {isCycleActive ? 'Cycle injected (Click to remove)' : 'Inject cycle (Test 3-Color DFS)'}
          </button>

          <button
            onClick={validateGraph}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1f29] hover:bg-[#232734] border border-white/[0.08] text-xs font-medium text-[#f4f4f7] transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
            Validate DAG
          </button>

          <button
            onClick={executePipeline}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f4f4f7] hover:bg-white disabled:opacity-50 text-xs font-medium text-[#090a0d] transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
            {isRunning ? 'Running engine' : 'Run pipeline'}
          </button>

          <button
            onClick={resetVisuals}
            className="p-1.5 rounded-lg bg-[#1c1f29] hover:bg-[#232734] border border-white/[0.08] text-[#9ca0b0] hover:text-[#f4f4f7] transition-colors cursor-pointer"
            title="Reset graph"
            aria-label="Reset graph"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* React Flow Canvas */}
        <div className="lg:col-span-2 h-[420px] rounded-xl border border-white/[0.08] overflow-hidden bg-[#101116] relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <Background color="#262936" gap={16} />
            <Controls className="bg-[#15171e] border-white/[0.08] text-[#f4f4f7]" />
          </ReactFlow>

          {validationResult && (
            <div className="absolute top-3 left-3 bg-[#15171e]/95 backdrop-blur border border-white/[0.12] px-3 py-2 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-medium">
                {validationResult.has_cycle ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" strokeWidth={1.5} />
                    <span className="text-rose-400">Cyclic graph detected</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                    <span className="text-emerald-400">Valid Directed Acyclic Graph</span>
                  </>
                )}
              </div>
              {validationResult.topological_order && validationResult.topological_order.length > 0 && (
                <div className="text-[#9ca0b0] text-xs font-mono">
                  Topological order: {validationResult.topological_order.join(' ➔ ')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Execution Terminal & Log */}
        <div className="flex flex-col h-[420px] rounded-xl border border-white/[0.08] bg-[#101116] p-4">
          <div className="text-xs font-mono text-[#9ca0b0] pb-2 border-b border-white/[0.08] flex justify-between items-center">
            <span>FastAPI task engine trace</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live backend
            </span>
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-xs text-[#f4f4f7]/90 space-y-2 py-3">
            {logs.length === 0 ? (
              <p className="text-[#686c7d]">
                Press Validate DAG or Run pipeline to test graph algorithms on the backend.
              </p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  {log}
                </div>
              ))
            )}
          </div>
          <div className="pt-2 border-t border-white/[0.08] text-xs text-[#686c7d] font-mono">
            Endpoint: <code className="text-amber-400">/api/dsa/dag/execute</code>
          </div>
        </div>
      </div>
    </div>
  );
}

