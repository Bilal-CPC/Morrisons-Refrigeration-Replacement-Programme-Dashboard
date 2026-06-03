'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Brain,
  PoundSterling,
  Leaf,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  CheckCircle2,
  Store,
  Map,
} from 'lucide-react';

// ─── Store Register Mockup ─────────────────────────────────────────────────────

const REGISTER_ROWS = [
  { id: 'MRS-001', name: 'Leeds Kirkstall',       stage: 'On Site',    sc: 'bg-amber-500',   ss: 'bg-amber-100 text-amber-700',   tag: 'OS', budget: '£420k', pct: 68 },
  { id: 'MRS-020', name: 'Hull Bransholme',        stage: 'At Risk',    sc: 'bg-red-500',     ss: 'bg-red-100 text-red-700',       tag: 'AR', budget: '£430k', pct: 82 },
  { id: 'MRS-005', name: 'Manchester Eccles',      stage: 'Complete',   sc: 'bg-emerald-500', ss: 'bg-emerald-100 text-emerald-700', tag: 'C', budget: '£395k', pct: 100 },
  { id: 'MRS-007', name: 'Birmingham Erdington',   stage: 'In Design',  sc: 'bg-blue-500',    ss: 'bg-blue-100 text-blue-700',     tag: 'D', budget: '£415k', pct: 22 },
  { id: 'MRS-012', name: 'Cardiff Roath',          stage: 'Procurement',sc: 'bg-violet-500',  ss: 'bg-violet-100 text-violet-700', tag: 'P', budget: '£400k', pct: 41 },
];

export function StoreRegisterMockup() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>('MRS-001');

  return (
    <MockShell title="Site Register" badge="412 stores" badgeClass="bg-emerald-100 text-emerald-700">
      <div className="space-y-1.5 p-3">
        {REGISTER_ROWS.map((r) => {
          const isActive  = active === r.id;
          const isHovered = hovered === r.id;
          return (
            <motion.div
              key={r.id}
              onHoverStart={() => setHovered(r.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setActive(r.id)}
              animate={{ scale: isHovered ? 1.015 : 1 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors',
                isActive
                  ? 'border-morrison-300 bg-morrison-50 shadow-sm'
                  : isHovered
                  ? 'border-slate-200 bg-white shadow-sm'
                  : 'border-slate-100 bg-slate-50',
              )}
            >
              <div className={cn('flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-[9px] font-black text-white', r.sc)}>
                {r.tag}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-800">{r.name}</p>
                <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className={cn('h-full rounded-full', r.sc)}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
              <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', r.ss)}>{r.stage}</span>
              <ChevronRight className={cn('h-3.5 w-3.5 flex-shrink-0 transition-colors', isActive ? 'text-morrison-500' : 'text-slate-300')} />
            </motion.div>
          );
        })}
      </div>
      {/* Detail drawer */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="grid grid-cols-3 gap-2 p-3">
              {[{ l: 'Budget', v: REGISTER_ROWS.find(r => r.id === active)?.budget ?? '' },
                { l: 'Stage', v: REGISTER_ROWS.find(r => r.id === active)?.stage ?? '' },
                { l: 'ID', v: active }].map((s) => (
                <div key={s.l} className="rounded-lg bg-slate-50 p-2 text-center">
                  <p className="text-[9px] text-slate-400">{s.l}</p>
                  <p className="text-[11px] font-bold text-slate-800">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MockShell>
  );
}

// ─── AI Insights Mockup ────────────────────────────────────────────────────────

const AI_ITEMS = [
  { sev: 'red',   tag: 'Supply Chain', conf: '94%', text: 'Compressor lead times extended — Northern Region', stores: 12 },
  { sev: 'amber', tag: 'Weather Signal', conf: 'Forecast', text: 'Cold snap risk — Scotland Q4 2026', stores: 7 },
  { sev: 'green', tag: 'Opportunity', conf: '88%', text: 'Cost saving identified — batch tender NW region', stores: 6 },
];

export function AIMockup() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#0a2417' }}>
        <Brain className="h-4 w-4" style={{ color: '#ffc72c' }} />
        <span className="text-xs font-semibold text-white">AI Programme Intelligence</span>
        <span className="ml-auto animate-pulse rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white">Live</span>
      </div>
      <div className="space-y-1.5 p-3">
        {AI_ITEMS.map((item, i) => {
          const isOpen = expanded === i;
          const border = item.sev === 'red' ? 'border-red-200 bg-red-50' : item.sev === 'amber' ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50';
          const tagCol = item.sev === 'red' ? 'text-red-700' : item.sev === 'amber' ? 'text-amber-700' : 'text-emerald-700';
          const confCol = item.sev === 'red' ? 'bg-red-100 text-red-700' : item.sev === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
          return (
            <motion.div
              key={i}
              onClick={() => setExpanded(isOpen ? null : i)}
              whileHover={{ scale: 1.01 }}
              className={cn('cursor-pointer rounded-lg border p-3 transition-shadow hover:shadow-sm', border)}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-[10px] font-bold uppercase tracking-wide', tagCol)}>{item.tag}</span>
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', confCol)}>{item.conf}</span>
              </div>
              <p className="mt-0.5 text-xs font-semibold text-slate-800">{item.text}</p>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-1.5 text-[10px] text-slate-500">{item.stores} stores flagged · Intervention recommended</p>
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-morrison-600">
                      View affected stores <ArrowRight className="h-3 w-3" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        whileHover={{ backgroundColor: '#f0fdf4' }}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-morrison-200 bg-morrison-50 mx-3 mb-3 p-2.5 transition-colors"
      >
        <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-morrison-600" />
        <span className="flex-1 text-[11px] text-morrison-800">Which stores are forecast to exceed budget?</span>
        <ArrowRight className="h-3 w-3 flex-shrink-0 text-morrison-500" />
      </motion.div>
    </div>
  );
}

// ─── Funnel Mockup ─────────────────────────────────────────────────────────────

const FUNNEL_STAGES = [
  { l: 'Identification', n: 412, w: 100, c: 'bg-slate-700' },
  { l: 'Feasibility',    n: 385, w: 93,  c: 'bg-morrison-700' },
  { l: 'Design',         n: 341, w: 83,  c: 'bg-blue-500' },
  { l: 'Tender',         n: 289, w: 70,  c: 'bg-violet-500' },
  { l: 'Construction',   n: 161, w: 39,  c: 'bg-amber-500' },
  { l: 'Handover',       n: 127, w: 31,  c: 'bg-emerald-500' },
];

export function FunnelMockup() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <MockShell title="Delivery Funnel" badge="8 stages" badgeClass="bg-slate-200 text-slate-600">
      <div className="space-y-2 p-4">
        {FUNNEL_STAGES.map((s) => (
          <motion.div
            key={s.l}
            onHoverStart={() => setHovered(s.l)}
            onHoverEnd={() => setHovered(null)}
            className="flex cursor-default items-center gap-2"
          >
            <span className="w-20 flex-shrink-0 text-right text-[10px] text-slate-500">{s.l}</span>
            <div className="h-5 flex-1 overflow-hidden rounded bg-slate-100">
              <motion.div
                className={cn('flex h-full items-center justify-end rounded pr-2', s.c)}
                initial={{ width: 0 }}
                animate={{ width: `${s.w}%` }}
                transition={{ duration: 0.9, delay: 0.1 }}
                style={{ filter: hovered === s.l ? 'brightness(1.15)' : 'brightness(1)' }}
              >
                <AnimatePresence>
                  {hovered === s.l && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-bold text-white"
                    >
                      {s.n}
                    </motion.span>
                  )}
                </AnimatePresence>
                {hovered !== s.l && <span className="text-[10px] font-bold text-white">{s.n}</span>}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </MockShell>
  );
}

// ─── Financial Mockup ──────────────────────────────────────────────────────────

const FIN_BARS = [
  { l: 'Approved Budget', v: '£50m', w: 100, c: 'bg-slate-700' },
  { l: 'Forecast Cost',   v: '£47m', w: 94,  c: 'bg-emerald-500' },
  { l: 'Committed',       v: '£34m', w: 68,  c: 'bg-amber-500' },
  { l: 'Spend to Date',   v: '£22m', w: 44,  c: 'bg-blue-500' },
];

export function FinancialMockup() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <MockShell title="Financial Dashboard" badge="£3m saving" badgeClass="bg-emerald-100 text-emerald-700">
      <div className="space-y-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: 'Budget',   v: '£50m', cls: 'text-slate-800 bg-slate-50' },
            { l: 'Forecast', v: '£47m', cls: 'text-emerald-600 bg-emerald-50' },
            { l: 'Savings',  v: '£3m',  cls: 'text-emerald-600 bg-emerald-50' },
          ].map((s) => (
            <motion.div
              key={s.l}
              whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              className={cn('rounded-lg p-2 text-center', s.cls)}
            >
              <p className="text-sm font-black">{s.v}</p>
              <p className="text-[9px] font-medium text-slate-500">{s.l}</p>
            </motion.div>
          ))}
        </div>
        {FIN_BARS.map((b) => (
          <div key={b.l} onMouseEnter={() => setHovered(b.l)} onMouseLeave={() => setHovered(null)}>
            <div className="mb-1 flex items-center justify-between">
              <span className={cn('text-[10px] transition-colors', hovered === b.l ? 'font-semibold text-slate-700' : 'text-slate-500')}>{b.l}</span>
              <motion.span animate={{ scale: hovered === b.l ? 1.1 : 1 }} className="text-[10px] font-bold text-slate-700">{b.v}</motion.span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className={cn('h-full rounded-full', b.c)}
                initial={{ width: 0 }}
                animate={{ width: `${b.w}%` }}
                transition={{ duration: 0.9 }}
                style={{ filter: hovered === b.l ? 'brightness(1.1)' : 'brightness(1)' }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-600">
          <TrendingDown className="h-3 w-3" />
          <span className="font-semibold">Forecast £3m under approved budget</span>
        </div>
      </div>
    </MockShell>
  );
}

// ─── Sustainability Mockup ─────────────────────────────────────────────────────

const SUSTAIN_TILES = [
  { l: 'Carbon Saved', v: '18,700', u: 'tCO₂e', color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 31 },
  { l: 'Energy Cut',   v: '12%',    u: '',       color: 'text-amber-600',   bg: 'bg-amber-50',   bar: 12 },
  { l: 'Cost Saving',  v: '£7.3m',  u: '/yr',    color: 'text-blue-600',    bg: 'bg-blue-50',    bar: 73 },
  { l: 'Converted',    v: '127',    u: '/412',   color: 'text-morrison-700',bg: 'bg-morrison-50',bar: 31 },
];

export function SustainabilityMockup() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <MockShell title="Carbon & Sustainability" badge="On target" badgeClass="bg-emerald-100 text-emerald-700">
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {SUSTAIN_TILES.map((t, i) => (
          <motion.div
            key={t.l}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            animate={{ y: hovered === i ? -3 : 0, boxShadow: hovered === i ? '0 6px 16px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)' }}
            transition={{ duration: 0.2 }}
            className={cn('cursor-default rounded-lg p-3', t.bg)}
          >
            <Leaf className={cn('mb-1.5 h-3.5 w-3.5 opacity-60', t.color)} />
            <p className={cn('text-lg font-black leading-none', t.color)}>
              {t.v}{t.u && <span className="text-xs font-semibold"> {t.u}</span>}
            </p>
            <p className="mt-1 text-[10px] font-medium text-slate-500">{t.l}</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/60">
              <motion.div
                className={cn('h-full rounded-full', t.color.replace('text-', 'bg-'))}
                initial={{ width: 0 }}
                animate={{ width: `${t.bar}%` }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-slate-100 px-4 pb-3 pt-2">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        <span className="text-[10px] font-medium text-slate-500">F-Gas compliant · Net Zero 2035 on track</span>
      </div>
    </MockShell>
  );
}

// ─── Shared mock chrome ────────────────────────────────────────────────────────

function MockShell({
  title, badge, badgeClass, pulse, children,
}: {
  title: string; badge: string; badgeClass: string; pulse?: boolean; children: React.ReactNode;
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
