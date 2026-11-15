import React from 'react';
import { Server, Clock, Cpu } from 'lucide-react';

export default function QueueApplications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
        <Server className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-bold text-zinc-200">1. LLM API Rate Limiter</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          When multiple requests arrive, they wait in a FIFO queue to prevent rate limit spikes.
        </p>
      </div>

      <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
        <Clock className="w-4 h-4 text-emerald-400" />
        <h4 className="text-xs font-bold text-zinc-200">2. Message Brokers (Kafka / RabbitMQ)</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Producer enqueues events; background workers dequeue and process them asynchronously.
        </p>
      </div>

      <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
        <Cpu className="w-4 h-4 text-indigo-400" />
        <h4 className="text-xs font-bold text-zinc-200">3. OS Audio & Device Ring Buffers</h4>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Sound cards and network chips stream data in fixed circular ring buffers with zero reallocation.
        </p>
      </div>
    </div>
  );
}
