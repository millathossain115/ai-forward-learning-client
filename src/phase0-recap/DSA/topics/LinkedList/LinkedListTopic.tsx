'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import RealLifeScenario from '@/components/RealLifeScenario';
import { GitCommit, Sparkles } from 'lucide-react';
import { LLNode, ListType, INITIAL_NODES, randomAddr } from './types';
import LinearLinkedListCanvas from './components/LinearLinkedListCanvas';
import LinkedListControls from './components/LinkedListControls';

const CircularLinkedListCanvas = dynamic(() => import('./components/CircularLinkedListCanvas'), {
  loading: () => (
    <div className="h-64 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading circular list canvas...
    </div>
  )
});

export default function LinkedListTopic() {
  const [nodes, setNodes] = useState<LLNode[]>(INITIAL_NODES);
  const [listType, setListType] = useState<ListType>('singly');
  const [inputValue, setInputValue] = useState(45);
  const [insertIdx, setInsertIdx] = useState(2);
  const [message, setMessage] = useState(
    'ইন্টারঅ্যাক্টিভ লিংকড লিস্ট খেলার মাঠ। Singly, Doubly ও Circular মোডে পয়েন্টার লিঙ্কিং দেখুন।'
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDoubly = listType === 'doubly';
  const isCircular = listType === 'circular';

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // INSERT AT HEAD WITH STEP-BY-STEP LINKING ANIMATION
  const handleInsertHead = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newAddr = randomAddr();
    const oldHeadAddr = nodes.length > 0 ? nodes[0].addr : 'NULL';

    // Step 1: Allocate Node in Heap (unlinked)
    const newNode: LLNode = {
      id: Date.now().toString(),
      value: inputValue,
      addr: newAddr,
      state: 'allocating',
    };

    setNodes([newNode, ...nodes]);
    setMessage(
      `ধাপ ১: মেমরির ঠিকানায় (${newAddr}) নতুন নোড তৈরি হলো [মান: ${inputValue}, next: ?]। এখনো লিস্টের সাথে যুক্ত হয়নি।`
    );
    await delay(1200);

    // Step 2: Point New Node's Next to current Head
    setNodes(prev => [{ ...prev[0], state: 'linking' }, ...prev.slice(1)]);
    setMessage(
      `ধাপ ২ (পয়েন্টার জোড়া): নতুন নোডের Next পয়েন্টারে পুরনো Head-এর ঠিকানা (${oldHeadAddr}) লিখে দেওয়া হলো! (NewNode.next = Head)`
    );
    await delay(1400);

    // Step 3: Update HEAD Pointer to point to New Node
    setNodes(prev => [
      { ...prev[0], state: 'connected' },
      ...prev.slice(1).map(n => ({ ...n, state: 'idle' as const })),
    ]);
    setMessage(
      `ধাপ ৩ (হেড আপডেট): HEAD লেবেলটি এখন নতুন নোডকে নির্দেশ করছে। কোনো ডেটা শিফটিং ছাড়াই মাত্র ৩টি পয়েন্টার অ্যাসাইনমেন্টে O(1) ইনসার্ট সম্পন্ন!`
    );
    await delay(1200);

    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setIsAnimating(false);
  };

  // INSERT AT TAIL WITH TRAVERSAL & LINKING ANIMATION
  const handleInsertTail = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newAddr = randomAddr();
    const lastIdx = nodes.length - 1;

    // Step 1: Allocate Node
    const newNode: LLNode = {
      id: Date.now().toString(),
      value: inputValue,
      addr: newAddr,
      state: 'allocating',
    };

    setMessage(`ধাপ ১: নতুন নোড ${newAddr} তৈরি করা হলো। এখন শেষ নোডের কাছে পৌঁছাতে হবে...`);
    setNodes([...nodes, newNode]);
    await delay(1200);

    // Step 2: Traverse / Reach Tail
    if (lastIdx >= 0) {
      setActiveIdx(lastIdx);
      setMessage(`ধাপ ২: বর্তমান শেষ নোড [${nodes[lastIdx].value}]-এর Next আগে ছিল NULL।`);
      await delay(1200);
    }

    // Step 3: Connect Tail's Next to New Node
    setNodes(prev => {
      const copy = [...prev];
      if (lastIdx >= 0) {
        copy[lastIdx] = { ...copy[lastIdx], state: 'linking' };
      }
      copy[copy.length - 1] = { ...copy[copy.length - 1], state: 'connected' };
      return copy;
    });
    setMessage(`ধাপ ৩ (চেইন যুক্ত): শেষ নোডের next পয়েন্টার আপডেট করে নতুন নোড ${newAddr}-এর সাথে জুড়ে দেওয়া হলো!`);
    await delay(1400);

    setActiveIdx(null);
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setMessage(`টেইলে ইনসার্ট সফল! নতুন নোডটি এখন লিস্টের সর্বশেষ উপাদান (next: NULL)।`);
    setIsAnimating(false);
  };

  // INSERT AT SPECIFIC INDEX WITH SPLICING ANIMATION
  const handleInsertAt = async () => {
    if (isAnimating) return;
    const targetIdx = Math.max(0, Math.min(nodes.length, insertIdx));
    if (targetIdx === 0) {
      await handleInsertHead();
      return;
    }
    if (targetIdx >= nodes.length) {
      await handleInsertTail();
      return;
    }

    setIsAnimating(true);
    const newAddr = randomAddr();
    const prevNode = nodes[targetIdx - 1];
    const nextNode = nodes[targetIdx];

    // Step 1: Traverse to index
    setMessage(`ধাপ ১: ইনডেক্স [${targetIdx}]-এ পৌঁছানোর জন্য হেড থেকে ট্রাভার্স করা হচ্ছে...`);
    for (let i = 0; i < targetIdx; i++) {
      setActiveIdx(i);
      await delay(700);
    }

    // Step 2: Allocate floating node
    const newNode: LLNode = {
      id: Date.now().toString(),
      value: inputValue,
      addr: newAddr,
      state: 'allocating',
    };
    const updated = [...nodes];
    updated.splice(targetIdx, 0, newNode);
    setNodes(updated);
    setMessage(
      `ধাপ ২: নতুন নোড (${newAddr}) তৈরি হলো [মান: ${inputValue}]। এখন [${prevNode.value}] এবং [${nextNode.value}] এর মাঝখানে একে জুড়তে হবে।`
    );
    await delay(1300);

    // Step 3: Link New Node -> Next Node
    updated[targetIdx] = { ...updated[targetIdx], state: 'linking' };
    setNodes([...updated]);
    setMessage(
      `ধাপ ৩: নতুন নোডের Next পয়েন্টার যুক্ত হলো পরের নোড [${nextNode.value}] (${nextNode.addr})-এর সাথে।`
    );
    await delay(1400);

    // Step 4: Link Prev Node -> New Node
    updated[targetIdx - 1] = { ...updated[targetIdx - 1], state: 'linking' };
    updated[targetIdx] = { ...updated[targetIdx], state: 'connected' };
    setNodes([...updated]);
    setMessage(
      `ধাপ ৪: পূর্বের নোড [${prevNode.value}]-এর Next পয়েন্টার সরাসরি নতুন নোড ${newAddr}-কে পয়েন্ট করল। মাঝখানে স্প্লাইসিং O(1) সম্পন্ন!`
    );
    await delay(1400);

    setActiveIdx(null);
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setIsAnimating(false);
  };

  // DELETE NODE WITH STEP-BY-STEP LIFTING & BYPASS PATH ANIMATION
  const handleDeleteAt = async (idx: number) => {
    if (isAnimating || nodes.length <= 1) return;
    setIsAnimating(true);

    const targetNode = nodes[idx];
    const prevNode = idx > 0 ? nodes[idx - 1] : null;
    const nextNode = idx < nodes.length - 1 ? nodes[idx + 1] : null;

    // Step 1: Lift targeted node upwards out of chain
    setActiveIdx(idx);
    setNodes(prev => prev.map((n, i) => (i === idx ? { ...n, state: 'lift-delete' } : n)));
    setMessage(
      `ধাপ ১ (নোড পৃথকীকরণ): ইনডেক্স [${idx}]-এর নোড [${targetNode.value}] চেইন থেকে ওপরের দিকে আলাদা করা হলো। সংযোগ বিচ্ছিন্ন হচ্ছে...`
    );
    await delay(1400);

    // Step 2: Show direct bypass linkage between Prev Node and Next Node
    if (prevNode) {
      setNodes(prev =>
        prev.map((n, i) => {
          if (i === idx - 1) return { ...n, state: 'bypassing' };
          if (i === idx + 1) return { ...n, state: 'bypassed-target' };
          return n;
        })
      );
      setMessage(
        `ধাপ ২ (নতুন পাথ তৈরি): পূর্বের নোড [${prevNode.value}] এবং পরের নোড [${nextNode ? nextNode.value : 'NULL'}] উভয়েই সক্রিয় হয়ে একে অপরের সাথে পয়েন্টার ব্রিজ তৈরি করল!`
      );
    } else {
      setNodes(prev =>
        prev.map((n, i) => {
          if (i === idx + 1) return { ...n, state: 'bypassed-target' };
          return n;
        })
      );
      setMessage(
        `ধাপ ২ (হেড শিফট): ১ম নোড বিচ্ছিন্ন হওয়ায় HEAD পয়েন্টার সরাসরি পরবর্তী নোড [${nextNode ? nextNode.value : 'NULL'}]-কে নির্দেশ করছে।`
      );
    }
    await delay(1600);

    // Step 3: Remove lifted target node and finalize clean chain
    const remaining = nodes.filter((_, i) => i !== idx);
    setNodes(remaining.map(n => ({ ...n, state: 'idle' })));
    setActiveIdx(null);
    setMessage(
      `ধাপ ৩ (মেমরি রিলিজ): নোড [${targetNode.value}] মেমরি থেকে মুক্ত (Free)। কোনো উপাদান না ঠেলে শুধু পয়েন্টার বাইপাস করেই O(1) ডিলিট সম্পন্ন!`
    );

    await delay(1000);
    setIsAnimating(false);
  };

  // TRAVERSE LIST (CIRCULAR AWARE)
  const handleTraverse = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (isCircular) {
      setMessage('সার্কুলার ট্রাভার্স শুরু: হেড থেকে টেল হয়ে আবারও লুপ ব্যাক করে হেডে (লুপ সাইকেল) পৌঁছাবে...');
      for (let i = 0; i < nodes.length; i++) {
        setActiveIdx(i);
        setNodes(prev => prev.map((n, idx) => ({ ...n, state: idx === i ? 'active' : 'idle' })));
        setMessage(`সার্কুলার ট্রাভার্স: নোড [${nodes[i].value}] (Address: ${nodes[i].addr})।`);
        await delay(800);
      }
      setMessage(
        `🔄 সাইকেল সম্পূর্ণ! শেষ নোডের Next পয়েন্টার আবার শুরুতে Head (Address: ${nodes[0].addr})-এ ফিরে এসেছে! কোনো NULL নেই।`
      );
      setActiveIdx(0);
      setNodes(prev => prev.map((n, idx) => ({ ...n, state: idx === 0 ? 'active' : 'idle' })));
      await delay(1200);
    } else {
      setMessage('হেড থেকে শুরু করে পয়েন্টার ধরে ধরে এক নোড থেকে অন্য নোডে ট্রাভার্স করা হচ্ছে O(N)...');
      for (let i = 0; i < nodes.length; i++) {
        setActiveIdx(i);
        setNodes(prev => prev.map((n, idx) => ({ ...n, state: idx === i ? 'active' : 'idle' })));
        setMessage(
          `পয়েন্টার জাম্প: নোড [${nodes[i].value}] (Address: ${nodes[i].addr}) রিড করা হলো। পরবর্তী নোডের ঠিকানা: ${
            i < nodes.length - 1 ? nodes[i + 1].addr : 'NULL'
          }`
        );
        await delay(800);
      }
      setMessage('ট্রাভার্স সম্পন্ন! চেইনের শেষ প্রান্ত (NULL পয়েন্টার)-এ পৌঁছে থেমে গেছে।');
    }

    setActiveIdx(null);
    setNodes(prev => prev.map(n => ({ ...n, state: 'idle' })));
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#15171e] text-slate-950 flex items-center justify-center font-bold">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Linked List: Pointer-Chained Dynamic Memory</h2>
            <span className="text-xs font-mono text-emerald-400 font-medium">
              Heap-Allocated Nodes • Zero Shifting Insertion
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          Unlike an Array which demands a continuous contiguous block in RAM, a Linked List stores items anywhere in heap memory.
          Each node consists of two parts: <b>[Data]</b> and a <b>[Next Pointer]</b> holding the hexadecimal RAM address of the subsequent node.
        </p>
      </div>

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls Bar */}
        <LinkedListControls
          listType={listType}
          setListType={setListType}
          inputValue={inputValue}
          setInputValue={setInputValue}
          insertIdx={insertIdx}
          setInsertIdx={setInsertIdx}
          nodesLength={nodes.length}
          isAnimating={isAnimating}
          onInsertHead={handleInsertHead}
          onInsertTail={handleInsertTail}
          onInsertAt={handleInsertAt}
          onTraverse={handleTraverse}
          onReset={() => setNodes(INITIAL_NODES)}
        />

        {/* Visual Node Chain: Dual Mode (Linear Multi-row vs Real Circular Ring) */}
        {isCircular ? (
          <CircularLinkedListCanvas
            nodes={nodes}
            activeIdx={activeIdx}
            isAnimating={isAnimating}
            onDeleteAt={handleDeleteAt}
          />
        ) : (
          <LinearLinkedListCanvas
            nodes={nodes}
            isDoubly={isDoubly}
            activeIdx={activeIdx}
            isAnimating={isAnimating}
            onDeleteAt={handleDeleteAt}
          />
        )}

        {/* Live Telemetry Banner */}
        <div className="p-3 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-sans text-xs sm:text-sm">{message}</span>
        </div>
      </div>

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="লিংকড লিস্ট (Linked List)"
        scenarios={[
          {
            title: "১. গুপ্তধনের চিরকুট ও ক্লু (Treasure Hunt Clues)",
            subtitle: "একটি সূত্র থেকে পরবর্তী সূত্রের গোপন ঠিকানা পাওয়া",
            badge: "Pointer Chaining",
            visualTag: "Node = Data + Pointer",
            accentColor: "emerald",
            analogy:
              "গুপ্তধন খোঁজার খেলায় আপনি প্রথমে ১ম চিরকুটটি পান। সেই চিরকুটে লেখা থাকে: 'আলমারির পেছনের ড্রয়ারে যাও (Next Address)'। ২য় চিরকুটে লেখা: 'বাগানের আমগাছের নিচে যাও'। আপনি চাইলে সরাসরি শেষ চিরকুটে লাফ দিতে পারেন না, কারণ ৪র্থ চিরকুটটি কোথায় আছে তা একমাত্র ৩য় চিরকুটই জানে!",
            whyItFits:
              "লিংকড লিস্টের প্রতিটি নোড মেমরির যেকোনাে ঠিকানায় ছড়ানো থাকে। প্রতিটি নোড তার পরবর্তী নোডের হেক্সাডেসিমাল অ্যাড্রেস (Pointer) সাথে বহন করে।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-2 py-1 rounded bg-[#161a29] border border-emerald-500/50">ক্লু ১ (অ্যাড্রেস 0x4F)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-[#161a29] border border-emerald-500/50">ক্লু ২ (অ্যাড্রেস 0x8A)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold">গুপ্তধন</span>
              </div>
            ),
          },
          {
            title: "২. ট্রেনের বগির কাপলিং বা হুক (Train Carriages)",
            subtitle: "মাঝের বগি খুলে ফেলতে বা জুড়তে অন্য বগিগুলো সরাতে হয় না",
            badge: "Physical Hook",
            visualTag: "O(1) Insertion / Deletion",
            accentColor: "sky",
            analogy:
              "ট্রেনের যেকোনো বগি খুলে নিতে চাইলে শুধু আগের ও পরের বগির মাঝের লোহার হুক বা শিকলটি (Pointer) খুলে সরাসরি জোড়া দিয়ে দিলেই হয়। পেছনের ১০টি বগিকে এক ইঞ্চিও ঠেলতে হয় না!",
            whyItFits:
              "অ্যারেতে যেমন ইনসার্ট বা ডিলিট করতে পুরো লাইনকে সরাতে (Shift) হয়, লিংকড লিস্টে কেবল পয়েন্টার বিচ্ছিন্ন ও পুনর্সংযুক্ত করলেই কাজ শেষ হয়।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">ইঞ্জিন</span>
                <span>-[হুক]-</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">বগি ১</span>
                <span>-[হুক]-</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">নতুন বগি</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
