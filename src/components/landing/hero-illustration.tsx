'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { LogoFull } from '@/components/logo';

/** A faux screenshot of the app shell shown in the hero. */
export function HeroIllustration() {
  const nav = [
    { label: 'Overview', active: false },
    { label: 'Store Register', active: true, badge: '412' },
    { label: 'Estate Map', active: false },
    { label: 'Financials', active: false },
    { label: 'AI Insights', active: false, ai: true },
  ];
  const rows = [
    { tag: 'OS', label: 'Leeds Kirkstall', status: 'On Site', rc: 'bg-amber-500', sc: 'bg-amber-100 text-amber-700' },
    { tag: 'AR', label: 'Hull Bransholme', status: 'At Risk', rc: 'bg-red-500', sc: 'bg-red-100 text-red-700' },
    { tag: 'C', label: 'Manchester Eccles', status: 'Complete', rc: 'bg-emerald-500', sc: 'bg-emerald-100 text-emerald-700' },
    { tag: 'D', label: 'Birmingham Erdington', status: 'In Design', rc: 'bg-blue-500', sc: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-morrison-200/40 via-gold-100/30 to-transparent blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="mx-4 flex-1">
            <div className="mx-auto h-5 w-56 rounded bg-slate-200" />
          </div>
        </div>
        <div className="flex" style={{ height: 440 }}>
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0 space-y-1 border-r border-slate-100 bg-white p-3">
            <div className="mb-3 px-1">
              <LogoFull variant="light" />
            </div>
            <div className="mb-2 rounded-lg bg-slate-50 px-2.5 py-2 text-[10px] font-semibold text-slate-700">
              Refrigeration Transition ▾
            </div>
            {nav.map((item) => (
              <div
                key={item.label}
                className={cn(
                  'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px]',
                  item.active ? 'bg-morrison-600 font-medium text-white' : 'text-slate-500',
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-gold-500 px-1.5 text-[9px] font-bold text-morrison-900">
                    {item.badge}
                  </span>
                )}
                {item.ai && (
                  <span className="rounded-full bg-gold-100 px-1.5 text-[9px] font-bold text-gold-600">AI</span>
                )}
              </div>
            ))}
          </div>
          {/* Main */}
          <div className="flex flex-1 flex-col overflow-hidden bg-slate-50/50">
            <div className="border-b border-slate-100 bg-white px-4 pb-2 pt-3">
              <div className="mb-2 flex items-center gap-1 text-[9px] text-slate-400">
                <span>Refrigeration Transition Programme</span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className="font-semibold text-slate-700">Store Register</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">127 complete</span>
                  <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">34 on site</span>
                  <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-700">6 at risk</span>
                </div>
                <div className="flex h-5 w-16 items-center justify-center rounded bg-morrison-600 text-[8px] font-bold text-white">
                  Export
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 overflow-hidden p-3">
              {rows.map((h) => (
                <div key={h.label} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
                  <div className={cn('flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-[8px] font-black text-white', h.rc)}>
                    {h.tag}
                  </div>
                  <span className="flex-1 truncate text-[10px] font-medium text-slate-700">{h.label}</span>
                  <span className={cn('flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold', h.sc)}>{h.status}</span>
                </div>
              ))}
            </div>
            {/* Mini KPI strip */}
            <div className="grid grid-cols-4 gap-2 px-3 pb-3">
              {[
                { l: 'Stores', v: '412' },
                { l: 'Complete', v: '31%' },
                { l: 'Budget', v: '£50m' },
                { l: 'Saving', v: '£3m' },
              ].map((k) => (
                <div key={k.l} className="rounded-lg border border-slate-200 bg-white p-2 text-center shadow-sm">
                  <p className="text-[12px] font-black text-morrison-700">{k.v}</p>
                  <p className="text-[8px] text-slate-400">{k.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
