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

      const res = await fetch('http://localhost:8000/api/dsa/dag/validate', {
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

      const res = await fetch('http://localhost:8000/api/dsa/dag/execute', {
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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-slate-100">Live DAG & Async Engine Visualizer</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
            Phase 0: Graph DSA & Workflow Architecture
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleCycle}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              isCycleActive
                ? 'bg-red-950/60 border-red-700 text-red-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            {isCycleActive ? '⚠️ Cycle Injected (Click to Remove)' : 'Inject Cycle (Test 3-Color DFS)'}
          </button>

          <button
            onClick={validateGraph}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            Validate DAG
          </button>

          <button
            onClick={executePipeline}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-xs font-medium text-white transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? 'Running Engine...' : 'Run Pipeline'}
          </button>

          <button
            onClick={resetVisuals}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset Graph"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* React Flow Canvas */}
        <div className="lg:col-span-2 h-[420px] rounded-xl border border-slate-800 overflow-hidden bg-slate-950/60 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <Background color="#334155" gap={16} />
            <Controls className="bg-slate-900 border-slate-800 text-slate-200" />
          </ReactFlow>

          {validationResult && (
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-700 px-3 py-2 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-medium">
                {validationResult.has_cycle ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-400">Cyclic Graph Detected</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Valid Directed Acyclic Graph</span>
                  </>
                )}
              </div>
              {validationResult.topological_order && validationResult.topological_order.length > 0 && (
                <div className="text-slate-300 text-[11px]">
                  Topological Sort: {validationResult.topological_order.join(' ➔ ')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Execution Terminal & Log */}
        <div className="flex flex-col h-[420px] rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="text-xs font-mono text-slate-400 pb-2 border-b border-slate-800 flex justify-between items-center">
            <span>FastAPI Task Engine Trace</span>
            <span className="text-[10px] text-emerald-400">● Live Backend</span>
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-xs text-slate-300 space-y-2 py-3">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic">
                Press &quot;Validate DAG&quot; or &quot;Run Pipeline&quot; to test graph algorithms on the backend.
              </p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  {log}
                </div>
              ))
            )}
          </div>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
            Backend Endpoint: <code className="text-sky-400">/api/dsa/dag/execute</code>
          </div>
        </div>
      </div>
    </div>
  );
}

