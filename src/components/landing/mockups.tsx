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
// Coordinate system: x = ((lon + 8.2) / 10.2) * 180,  y = ((60.9 - lat) / 11.1) * 220
// This matches the real estate map page so pins sit correctly on the outline.

const UK_OUTLINE =
  // Clockwise from John o'Groats (NE Scotland) → east coast south → west coast north → Scotland west → north coast back
  'M 89,44 L 107,63 L 106,73 L 100,82 L 93,88 L 111,102 L 120,117 L 134,129 ' +
  'L 147,145 L 151,156 L 168,164 L 168,179 L 167,196 L 165,198 L 162,201 ' +
  'L 143,202 L 112,204 L 101,208 L 78,213 L 44,217 ' +
  'L 57,207 L 64,197 L 72,195 L 85,192 L 93,190 ' +
  'L 88,187 L 75,184 L 57,183 L 65,173 L 74,161 L 67,157 L 62,145 ' +
  'L 77,147 L 90,148 L 92,146 L 91,137 L 88,130 L 82,121 L 86,114 ' +
  'L 82,110 L 55,113 L 46,102 L 62,96 L 63,89 L 50,84 ' +
  'L 37,77 L 43,71 L 49,59 L 55,53 L 57,45 ' +
  'L 67,48 L 83,38 L 89,44 Z';

// Major Morrisons store cities — lat/lon → SVG coords via above formula
const MAP_PINS = [
  // Scotland
  { x: 70,  y: 100, c: '#dc2626' }, // Glasgow (at risk)
  { x: 88,  y: 98,  c: '#16a34a' }, // Edinburgh
  // NE England
  { x: 116, y: 117, c: '#16a34a' }, // Newcastle
  { x: 120, y: 119, c: '#16a34a' }, // Sunderland
  // Yorkshire
  { x: 117, y: 141, c: '#f59e0b' }, // Leeds (on site)
  { x: 114, y: 141, c: '#16a34a' }, // Bradford
  { x: 126, y: 138, c: '#16a34a' }, // York
  { x: 139, y: 142, c: '#f59e0b' }, // Hull (on site)
  { x: 119, y: 149, c: '#2563eb' }, // Sheffield
  // NW England
  { x: 105, y: 147, c: '#16a34a' }, // Manchester
  { x: 92,  y: 148, c: '#16a34a' }, // Liverpool
  // Midlands
  { x: 111, y: 167, c: '#2563eb' }, // Birmingham
  { x: 124, y: 158, c: '#16a34a' }, // Nottingham
  { x: 125, y: 164, c: '#7c3aed' }, // Leicester
  // East
  { x: 147, y: 172, c: '#16a34a' }, // Cambridge
  { x: 163, y: 164, c: '#2563eb' }, // Norwich
  // South
  { x: 143, y: 186, c: '#16a34a' }, // London
  { x: 99,  y: 187, c: '#f59e0b' }, // Bristol (on site)
  { x: 89,  y: 187, c: '#7c3aed' }, // Cardiff
  { x: 120, y: 198, c: '#2563eb' }, // Southampton
  { x: 142, y: 199, c: '#16a34a' }, // Brighton
  { x: 82,  y: 201, c: '#16a34a' }, // Exeter
];

export function MapMockup() {
  return (
    <MockShell title="Live Estate Map" badge="Live" badgeClass="bg-emerald-100 text-emerald-700" pulse>
      <div className="flex gap-3 p-3">
        <div className="relative flex-1 overflow-hidden rounded-lg" style={{ minHeight: 220 }}>
          <svg viewBox="0 0 180 220" className="h-full w-full" style={{ minHeight: 220 }}>
            {/* OSM-style water background */}
            <rect width={180} height={220} fill="#d4e8f5" />

            {/* Subtle lat/lon grid */}
            {[51, 52, 53, 54, 55, 56, 57, 58].map((lat) => {
              const y = ((60.9 - lat) / 11.1) * 220;
              return <line key={lat} x1={0} y1={y} x2={180} y2={y} stroke="#c0d8ec" strokeWidth={0.4} />;
            })}
            {[-5, -4, -3, -2, -1, 0, 1].map((lon) => {
              const x = ((lon + 8.2) / 10.2) * 180;
              return <line key={lon} x1={x} y1={0} x2={x} y2={220} stroke="#c0d8ec" strokeWidth={0.4} />;
            })}

            {/* UK land mass */}
            <path d={UK_OUTLINE} fill="#f2ede6" stroke="#b8c9a0" strokeWidth={0.9} strokeLinejoin="round" />

            {/* At-risk pulse ring (Glasgow) */}
            <circle cx={70} cy={100} r={5} fill="#dc2626" opacity={0.18}>
              <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Store pins */}
            {MAP_PINS.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={2.4} fill={p.c} stroke="white" strokeWidth={0.8} />
            ))}

            {/* Highlighted selected pin — London */}
            <circle cx={143} cy={186} r={4.5} fill="none" stroke="#16a34a" strokeWidth={1.2} opacity={0.6} />
            <circle cx={143} cy={186} r={2.8} fill="#16a34a" stroke="white" strokeWidth={1} />

            {/* Tooltip for London */}
            <g>
              <rect x={108} y={174} width={60} height={15} rx={3} fill="#0a2417" opacity={0.9} />
              <text x={138} y={184} fill="white" fontSize={6} fontWeight="600" textAnchor="middle">
                Morrisons London SE
              </text>
            </g>

            {/* Scale indicator */}
            <g>
              <line x1={8} y1={213} x2={28} y2={213} stroke="#94a3b8" strokeWidth={1} />
              <text x={18} y={210} fill="#94a3b8" fontSize={5} textAnchor="middle">50 mi</text>
            </g>
          </svg>
        </div>

        <div className="flex w-24 flex-col justify-center gap-1.5">
          {[
            { c: '#16a34a', l: 'Complete',    n: 127 },
            { c: '#f59e0b', l: 'On Site',     n: 34  },
            { c: '#2563eb', l: 'Design',       n: 52  },
            { c: '#7c3aed', l: 'Procurement',  n: 41  },
            { c: '#dc2626', l: 'At Risk',      n: 6   },
            { c: '#94a3b8', l: 'Not Started',  n: 152 },
          ].map((l) => (
            <div key={l.l} className="flex items-center gap-1.5">
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: l.c }} />
              <span className="text-[9px] text-slate-500">{l.l}</span>
              <span className="ml-auto font-mono text-[9px] text-slate-400">{l.n}</span>
            </div>
          ))}
          <div className="mt-1 border-t border-slate-100 pt-1.5">
            <p className="text-[9px] text-slate-400">Total estate</p>
            <p className="text-base font-black text-slate-800">412</p>
          </div>
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
