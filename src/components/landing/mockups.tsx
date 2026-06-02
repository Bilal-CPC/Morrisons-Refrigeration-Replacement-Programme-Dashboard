'use client';

import { cn } from '@/lib/utils';
import {
  Store,
  Map,
  Brain,
  PoundSterling,
  Leaf,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';

// ─── Store Register Mockup ─────────────────────────────────────────────────────

export function StoreRegisterMockup() {
  const rows = [
    { id: 'MRS-001', name: 'Leeds Kirkstall', stage: 'On Site', sc: 'bg-amber-500', ss: 'bg-amber-100 text-amber-700', tag: 'OS' },
    { id: 'MRS-020', name: 'Hull Bransholme', stage: 'At Risk', sc: 'bg-red-500', ss: 'bg-red-100 text-red-700', tag: 'AR' },
    { id: 'MRS-005', name: 'Manchester Eccles', stage: 'Complete', sc: 'bg-emerald-500', ss: 'bg-emerald-100 text-emerald-700', tag: 'C' },
    { id: 'MRS-007', name: 'Birmingham Erdington', stage: 'In Design', sc: 'bg-blue-500', ss: 'bg-blue-100 text-blue-700', tag: 'D' },
    { id: 'MRS-012', name: 'Cardiff Roath', stage: 'Procurement', sc: 'bg-violet-500', ss: 'bg-violet-100 text-violet-700', tag: 'P' },
  ];
  return (
    <MockShell title="Store Register" badge="412 stores" badgeClass="bg-emerald-100 text-emerald-700">
      <div className="space-y-2 p-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 transition-colors hover:border-morrison-200 hover:bg-morrison-50"
          >
            <div className={cn('flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-[9px] font-black text-white', r.sc)}>
              {r.tag}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-800">{r.name}</p>
              <p className="text-[10px] text-slate-400">{r.id}</p>
            </div>
            <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', r.ss)}>{r.stage}</span>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
          </div>
        ))}
      </div>
    </MockShell>
  );
}

// ─── UK Map Mockup ─────────────────────────────────────────────────────────────

export function MapMockup() {
  const pins = [
    { x: 48, y: 30, c: '#16a34a' },
    { x: 55, y: 38, c: '#d97706' },
    { x: 60, y: 28, c: '#16a34a' },
    { x: 45, y: 45, c: '#2563eb' },
    { x: 52, y: 52, c: '#dc2626' },
    { x: 62, y: 48, c: '#16a34a' },
    { x: 50, y: 62, c: '#7c3aed' },
    { x: 58, y: 68, c: '#16a34a' },
    { x: 40, y: 35, c: '#2563eb' },
    { x: 65, y: 58, c: '#d97706' },
    { x: 55, y: 75, c: '#94a3b8' },
    { x: 47, y: 22, c: '#16a34a' },
  ];
  return (
    <MockShell title="Live Estate View" badge="Live" badgeClass="bg-emerald-100 text-emerald-700" pulse>
      <div className="flex gap-3 p-3">
        <div className="relative flex-1 rounded-lg bg-blue-50" style={{ minHeight: 200 }}>
          <svg viewBox="0 0 100 100" className="h-full w-full" style={{ minHeight: 200 }}>
            <path
              d="M 45 8 L 58 12 L 64 22 L 60 30 L 66 42 L 58 52 L 62 62 L 54 74 L 46 80 L 40 70 L 44 58 L 38 46 L 42 34 L 36 24 L 44 14 Z"
              fill="#dbeafe"
              stroke="#bfdbfe"
              strokeWidth={0.8}
            />
            {pins.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={2} fill={p.c} stroke="white" strokeWidth={0.6} />
            ))}
          </svg>
        </div>
        <div className="flex w-24 flex-col justify-center gap-1.5">
          {[
            { c: '#16a34a', l: 'Complete', n: 127 },
            { c: '#d97706', l: 'On Site', n: 34 },
            { c: '#2563eb', l: 'Design', n: 52 },
            { c: '#dc2626', l: 'At Risk', n: 6 },
          ].map((l) => (
            <div key={l.l} className="flex items-center gap-1.5">
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: l.c }} />
              <span className="text-[9px] text-slate-500">{l.l}</span>
              <span className="ml-auto font-mono text-[9px] text-slate-400">{l.n}</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

// ─── AI Insights Mockup ────────────────────────────────────────────────────────

export function AIMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#0a2417' }}>
        <Brain className="h-4 w-4" style={{ color: '#ffc72c' }} />
        <span className="text-xs font-semibold text-white">AI Programme Intelligence</span>
        <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white">
          Live
        </span>
      </div>
      <div className="space-y-2.5 p-3">
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wide text-red-700">Supply Chain</span>
            <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">94% confidence</span>
          </div>
          <p className="text-xs font-semibold text-slate-800">Compressor lead times extended — Northern Region</p>
          <p className="mt-0.5 text-[10px] text-slate-500">12 upcoming project starts at risk</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Weather Signal</span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">Forecast</span>
          </div>
          <p className="text-xs font-semibold text-slate-800">Cold snap risk — Scotland Q4 2026</p>
          <p className="mt-0.5 text-[10px] text-slate-500">7 stores in commissioning affected</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-morrison-200 bg-morrison-50 p-2.5">
          <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-morrison-600" />
          <span className="flex-1 text-[11px] text-morrison-800">Which stores are forecast to exceed budget?</span>
          <ArrowRight className="h-3 w-3 flex-shrink-0 text-morrison-500" />
        </div>
      </div>
    </div>
  );
}

// ─── Funnel Mockup ─────────────────────────────────────────────────────────────

export function FunnelMockup() {
  const stages = [
    { l: 'Identification', n: 412, w: 100, c: 'bg-slate-700' },
    { l: 'Feasibility', n: 385, w: 93, c: 'bg-morrison-700' },
    { l: 'Design', n: 341, w: 83, c: 'bg-blue-500' },
    { l: 'Tender', n: 289, w: 70, c: 'bg-violet-500' },
    { l: 'Construction', n: 161, w: 39, c: 'bg-amber-500' },
    { l: 'Handover', n: 127, w: 31, c: 'bg-emerald-500' },
  ];
  return (
    <MockShell title="Delivery Funnel" badge="8 stages" badgeClass="bg-slate-200 text-slate-600">
      <div className="space-y-2 p-4">
        {stages.map((s) => (
          <div key={s.l} className="flex items-center gap-2">
            <span className="w-20 flex-shrink-0 text-right text-[10px] text-slate-500">{s.l}</span>
            <div className="h-5 flex-1 overflow-hidden rounded bg-slate-100">
              <div className={cn('flex h-full items-center justify-end rounded pr-2', s.c)} style={{ width: `${s.w}%` }}>
                <span className="text-[10px] font-bold text-white">{s.n}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

// ─── Financial Mockup ──────────────────────────────────────────────────────────

export function FinancialMockup() {
  const bars = [
    { l: 'Approved Budget', v: '£50m', w: 100, c: 'bg-slate-700' },
    { l: 'Forecast Cost', v: '£47m', w: 94, c: 'bg-emerald-500' },
    { l: 'Committed', v: '£34m', w: 68, c: 'bg-amber-500' },
    { l: 'Spend to Date', v: '£22m', w: 44, c: 'bg-blue-500' },
  ];
  return (
    <MockShell title="Financial Dashboard" badge="£3m saving" badgeClass="bg-emerald-100 text-emerald-700">
      <div className="space-y-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: 'Budget', v: '£50m', c: 'text-slate-800 bg-slate-50' },
            { l: 'Forecast', v: '£47m', c: 'text-emerald-600 bg-emerald-50' },
            { l: 'Savings', v: '£3m', c: 'text-emerald-600 bg-emerald-50' },
          ].map((s) => (
            <div key={s.l} className={cn('rounded-lg p-2 text-center', s.c)}>
              <p className="text-sm font-black">{s.v}</p>
              <p className="text-[9px] font-medium text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
        {bars.map((b) => (
          <div key={b.l}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">{b.l}</span>
              <span className="text-[10px] font-bold text-slate-700">{b.v}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className={cn('h-full rounded-full', b.c)} style={{ width: `${b.w}%` }} />
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

// ─── Sustainability Mockup ─────────────────────────────────────────────────────

export function SustainabilityMockup() {
  const tiles = [
    { l: 'Carbon Saved', v: '18,700', u: 'tCO₂e', c: 'text-emerald-600 bg-emerald-50' },
    { l: 'Energy Cut', v: '12%', u: '', c: 'text-amber-600 bg-amber-50' },
    { l: 'Cost Saving', v: '£7.3m', u: '/yr', c: 'text-blue-600 bg-blue-50' },
    { l: 'Converted', v: '127', u: '/412', c: 'text-morrison-700 bg-morrison-50' },
  ];
  return (
    <MockShell title="Carbon & Sustainability" badge="On target" badgeClass="bg-emerald-100 text-emerald-700">
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {tiles.map((t) => (
          <div key={t.l} className={cn('rounded-lg p-3', t.c)}>
            <Leaf className="mb-1.5 h-3.5 w-3.5 opacity-60" />
            <p className="text-lg font-black leading-none">
              {t.v}
              {t.u && <span className="text-xs font-semibold"> {t.u}</span>}
            </p>
            <p className="mt-1 text-[10px] font-medium text-slate-500">{t.l}</p>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

// ─── Shared mock chrome ────────────────────────────────────────────────────────

function MockShell({
  title,
  badge,
  badgeClass,
  pulse,
  children,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  pulse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="text-xs font-semibold text-slate-700">{title}</span>
        <span className={cn('ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold', badgeClass)}>
          {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

// Re-export icons used by feature list
export { Store, Map, Brain, PoundSterling, Leaf, TrendingDown };
