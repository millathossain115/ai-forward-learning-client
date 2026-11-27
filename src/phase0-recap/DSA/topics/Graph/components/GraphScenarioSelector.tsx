import React from 'react';
import { Workflow } from 'lucide-react';
import { Preset } from '../dagVisualizerTypes';

interface GraphScenarioSelectorProps {
  presets: Preset[];
  selectedPresetIndex: number;
  onSelectPreset: (idx: number) => void;
}

export default function GraphScenarioSelector({
  presets,
  selectedPresetIndex,
  onSelectPreset,
}: GraphScenarioSelectorProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-400 font-semibold flex items-center gap-1.5">
          <Workflow className="w-3.5 h-3.5 text-indigo-400" />
          <span>সিমুলেশন সিনারিও নির্বাচন করুন (Select Test Scenario):</span>
        </span>
        <span className="text-[11px] font-mono text-zinc-400">ডিফল্ট স্পিড: 0.5x (Slow Smooth)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {presets.map((p, idx) => {
          const isSelected = selectedPresetIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPreset(idx)}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2.5 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#15182d] border-indigo-500  '
                  : 'bg-[#0f111a] border-[#1d2235] hover:border-[#2b334d] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className={`text-xs font-bold leading-snug ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  {p.name}
                </h4>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full shrink-0 font-bold border ${
                    p.badgeType === 'emerald'
                      ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300'
                      : p.badgeType === 'rose'
                      ? 'bg-rose-950/80 border-rose-700/80 text-rose-300'
                      : 'bg-sky-950/80 border-sky-700/80 text-sky-300'
                  }`}
                >
                  {p.badge}
                </span>
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed font-sans line-clamp-2">
                {p.summary}
              </p>

              <div className="pt-2 border-t border-[#1e243a] text-[10px] font-mono text-indigo-300 flex items-center justify-between">
                <span>উদ্দেশ্য: {p.badgeType === 'rose' ? 'সাইকেল ধরা' : 'টপোলজিক্যাল রান'}</span>
                <span className={isSelected ? 'text-amber-400 font-bold' : 'text-zinc-500'}>
                  {isSelected ? '✓ নির্বাচিত' : 'ক্লিক করুন'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
