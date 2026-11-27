'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import FlowLogicLogo from '@/components/FlowLogicLogo';
import {
  ChevronDown,
  ChevronRight,
  Search,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

import {
  TopicId,
  NavSubItem,
  NavItem,
  NavSection,
  NAV_SECTIONS
} from '@/config/navigation';

export type { TopicId, NavSubItem, NavItem, NavSection };
export { NAV_SECTIONS };

interface SidebarProps {
  activeTopic: TopicId;
  onSelectTopic?: (id: TopicId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeTopic,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const sec of NAV_SECTIONS) {
      const containsActive = sec.items.some(
        it => it.id === activeTopic || it.subItems?.some(sub => sub.id === activeTopic)
      );
      initial[sec.title] = !containsActive;
    }
    return initial;
  });
  const [expandedSubmenus, setExpandedSubmenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const sec of NAV_SECTIONS) {
      for (const it of sec.items) {
        if (it.subItems?.some(sub => sub.id === activeTopic)) {
          initial[it.id] = true;
        }
      }
    }
    return initial;
  });

  const [prevActiveTopic, setPrevActiveTopic] = useState<TopicId>(activeTopic);
  const activeItemRef = useRef<HTMLDivElement | null>(null);

  // Sync mega-menu section & submenu expansion when activeTopic changes without an effect render pass
  if (activeTopic !== prevActiveTopic) {
    setPrevActiveTopic(activeTopic);

    const targetSection = NAV_SECTIONS.find(sec =>
      sec.items.some(
        it => it.id === activeTopic || it.subItems?.some(sub => sub.id === activeTopic)
      )
    );
    if (targetSection && collapsedSections[targetSection.title] !== false) {
      setCollapsedSections(prev => ({
        ...prev,
        [targetSection.title]: false,
      }));
    }

    const parentItem = NAV_SECTIONS.flatMap(s => s.items).find(
      it => it.subItems?.some(sub => sub.id === activeTopic)
    );
    if (parentItem && !expandedSubmenus[parentItem.id]) {
      setExpandedSubmenus(prev => ({
        ...prev,
        [parentItem.id]: true,
      }));
    }
  }

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeTopic]);

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleSubmenu = (itemId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedSubmenus(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const filteredSections = useMemo(() => {
    if (!filterQuery.trim()) return NAV_SECTIONS;
    const q = filterQuery.toLowerCase();
    return NAV_SECTIONS.map(sec => ({
      ...sec,
      items: sec.items.filter(
        it =>
          it.label.toLowerCase().includes(q) ||
          it.tag?.toLowerCase().includes(q) ||
          it.subItems?.some(s => s.label.toLowerCase().includes(q) || s.tag?.toLowerCase().includes(q))
      ),
    })).filter(sec => sec.items.length > 0);
  }, [filterQuery]);

  if (collapsed) {
    return (
      <aside className="w-14 border-r border-white/[0.08] bg-[#090a0d] flex flex-col justify-between py-4 items-center shrink-0">
        <div className="flex flex-col items-center gap-3">
          <FlowLogicLogo size="xs" />
          <button
            onClick={onToggleCollapse}
            className="p-2 text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-[#15171e] rounded-lg transition-colors cursor-pointer"
            title="Expand sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto">
          {NAV_SECTIONS.flatMap(s => s.items)
            .filter(i => i.status === 'ready')
            .map(item => {
              const Icon = item.icon;
              const isActive = activeTopic === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/topics/${item.id}`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#1c1f29] text-amber-400 border border-white/[0.14]'
                      : 'text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-[#15171e]'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              );
            })}
        </div>

        <div className="text-[11px] font-mono text-[#686c7d]">v0.1</div>
      </aside>
    );
  }

  return (
    <aside className="w-72 border-r border-white/[0.08] bg-[#090a0d] flex flex-col justify-between shrink-0 select-none">
      {/* Top Header */}
      <div className="flex flex-col border-b border-white/[0.08]">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FlowLogicLogo size="sm" />
            <div>
              <span className="font-semibold text-sm text-[#f4f4f7] block leading-tight">
                Forward Learning
              </span>
              <span className="text-xs font-mono text-[#686c7d] block">
                Systems &amp; AI Engineering
              </span>
            </div>
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-2 text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-[#15171e] rounded-lg transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Filter Input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#15171e] border border-white/[0.08] text-sm focus-within:border-white/[0.2]">
            <Search className="w-4 h-4 text-[#686c7d] shrink-0" strokeWidth={1.5} />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Filter"
              className="bg-transparent text-[#f4f4f7] placeholder-[#686c7d] text-xs focus:outline-none w-full font-mono"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="text-xs text-[#9ca0b0] hover:text-[#f4f4f7] font-mono cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Topics Tree */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {filteredSections.map(sec => {
          const isSecCollapsed = !filterQuery.trim() && collapsedSections[sec.title];
          return (
            <div key={sec.title} className="space-y-1">
              <button
                onClick={() => toggleSection(sec.title)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium text-[#9ca0b0] hover:text-[#f4f4f7] transition-colors cursor-pointer"
              >
                <span className="font-mono text-xs text-[#686c7d]">
                  {sec.title}
                </span>
                {isSecCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-[#686c7d]" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#686c7d]" strokeWidth={1.5} />
                )}
              </button>

              {!isSecCollapsed && (
                <div className="space-y-0.5 pt-1">
                  {sec.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTopic === item.id;
                    const isReady = item.status === 'ready';
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isSubActive = hasSubItems && item.subItems!.some(sub => sub.id === activeTopic);
                    const isSubExpanded = expandedSubmenus[item.id] || isSubActive;

                    return (
                      <div
                        key={item.id}
                        ref={isActive || isSubActive ? activeItemRef : undefined}
                        className="space-y-0.5"
                      >
                        <Link
                          href={`/topics/${item.id}`}
                          onClick={() => {
                            if (hasSubItems) {
                              toggleSubmenu(item.id);
                            }
                          }}
                          className={`w-full h-9 flex items-center justify-between px-2.5 rounded-lg text-xs transition-colors group cursor-pointer ${
                            isActive || isSubActive
                              ? 'bg-[#1c1f29] text-[#f4f4f7] font-medium border border-white/[0.12]'
                              : 'text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-[#15171e]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isActive || isSubActive ? 'text-amber-400' : 'text-[#686c7d] group-hover:text-[#9ca0b0]'
                              }`}
                              strokeWidth={1.5}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {item.tag && (
                              <span className="text-[11px] font-mono text-[#686c7d]">
                                {item.tag}
                              </span>
                            )}
                            {hasSubItems ? (
                              <span
                                onClick={(e) => toggleSubmenu(item.id, e)}
                                className="p-0.5 text-[#686c7d] hover:text-[#f4f4f7]"
                              >
                                {isSubExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                                )}
                              </span>
                            ) : (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isReady ? 'bg-emerald-400' : 'bg-[#2a2d3a]'
                                }`}
                              />
                            )}
                          </div>
                        </Link>

                        {/* Submenu Dropdown Items */}
                        {hasSubItems && isSubExpanded && (
                          <div className="border-l border-white/[0.08] ml-4 pl-2.5 space-y-0.5 py-1">
                            {item.subItems!.map(sub => {
                              const isChildActive = activeTopic === sub.id;
                              return (
                                <Link
                                  key={sub.id}
                                  href={`/topics/${sub.id}`}
                                  className={`w-full h-8 flex items-center justify-between px-2.5 rounded-lg text-xs font-mono transition-colors group cursor-pointer ${
                                    isChildActive
                                      ? 'bg-[#1c1f29] text-amber-400 font-medium border border-white/[0.12]'
                                      : 'text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-[#15171e]'
                                  }`}
                                >
                                  <span className="truncate">{sub.label}</span>
                                  {sub.tag && (
                                    <span className="text-[11px] text-[#686c7d]">
                                      {sub.tag}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-3 border-t border-white/[0.08] text-xs font-mono text-[#686c7d] flex items-center justify-between">
        <span>Forward Learning</span>
        <span className="text-[#9ca0b0] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Active
        </span>
      </div>
    </aside>
  );
}
