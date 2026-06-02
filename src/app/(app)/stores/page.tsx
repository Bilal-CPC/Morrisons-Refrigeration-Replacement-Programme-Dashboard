'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CheckCircle2, Circle, AlertCircle, MapPin, Calendar, PoundSterling, User, HardHat } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STORES, STAGE_META, RAG_META, Store, StoreStage } from '@/lib/data';
import { cn, formatGBP } from '@/lib/utils';

const STAGES: (StoreStage | 'All')[] = ['All', 'Complete', 'OnSite', 'Design', 'Procurement', 'AtRisk', 'NotStarted'];

export default function StoresPage() {
  const [filter, setFilter] = useState<StoreStage | 'All'>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Store | null>(null);

  const filtered = useMemo(() => {
    return STORES.filter((s) => {
      const matchStage = filter === 'All' || s.stage === filter;
      const matchQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase()) ||
        s.region.toLowerCase().includes(query.toLowerCase());
      return matchStage && matchQuery;
    });
  }, [filter, query]);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Store Register</h1>
          <p className="mt-1 text-sm text-slate-500">{STORES.length} of 412 stores shown · live programme data</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores…"
            className="h-9 w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-morrison-400"
          />
        </div>
      </div>

      {/* Filter pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STAGES.map((stage) => {
          const isActive = filter === stage;
          const count = stage === 'All' ? STORES.length : STORES.filter((s) => s.stage === stage).length;
          return (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                isActive ? 'border-morrison-600 bg-morrison-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              )}
            >
              {stage === 'All' ? 'All Stores' : STAGE_META[stage].label}
              <span className={cn('rounded-full px-1.5 text-xs font-bold', isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500')}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[100px_1fr_120px_110px_110px_90px] gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>Store ID</span>
          <span>Store</span>
          <span>Stage</span>
          <span className="text-right">Budget</span>
          <span className="text-right">Forecast</span>
          <span className="text-center">Status</span>
        </div>
        <div className="divide-y divide-slate-50">
          {filtered.map((s, i) => {
            const meta = STAGE_META[s.stage];
            const rag = RAG_META[s.status];
            const over = s.forecast > s.budget;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.4) }}
                onClick={() => setSelected(s)}
                className="grid w-full grid-cols-[100px_1fr_120px_110px_110px_90px] items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-morrison-50"
              >
                <span className="font-mono text-xs text-slate-400">{s.id}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
                  <p className="text-[11px] text-slate-400">{s.region}</p>
                </div>
                <span className={cn('w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold', meta.bg, meta.text)}>{meta.label}</span>
                <span className="text-right text-sm font-medium text-slate-600">{formatGBP(s.budget)}</span>
                <span className={cn('text-right text-sm font-semibold', over ? 'text-red-600' : 'text-emerald-600')}>
                  {formatGBP(s.forecast)}
                </span>
                <span className="flex justify-center">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: rag.color }} />
                </span>
              </motion.button>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-slate-400">No stores match your filters.</div>
          )}
        </div>
      </Card>

      {/* Detail drawer */}
      <StoreDrawer store={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function StoreDrawer({ store, onClose }: { store: Store | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {store && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-[420px] flex-col overflow-y-auto bg-white shadow-2xl"
            initial={{ x: 440 }}
            animate={{ x: 0 }}
            exit={{ x: 440 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="px-5 py-4" style={{ background: '#0a2417' }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-xs text-white/50">{store.id}</span>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', RAG_META[store.status].bg, RAG_META[store.status].text)}>
                      {store.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold leading-tight text-white">Morrisons {store.name}</h2>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                    <MapPin className="h-3 w-3" />
                    {store.region}
                    <span className="mx-1">·</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                      style={{ background: STAGE_META[store.stage].color }}
                    >
                      {STAGE_META[store.stage].label}
                    </span>
                  </div>
                </div>
                <button onClick={onClose} className="p-1 text-white/50 transition-colors hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-5">
              {/* Financials */}
              <section>
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Financial Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3.5">
                    <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <PoundSterling className="h-3.5 w-3.5" /> Budget
                    </div>
                    <div className="text-xl font-bold text-slate-800">{formatGBP(store.budget)}</div>
                  </div>
                  <div className={cn('rounded-xl p-3.5', store.forecast <= store.budget ? 'bg-emerald-50' : 'bg-red-50')}>
                    <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <PoundSterling className="h-3.5 w-3.5" /> Forecast
                    </div>
                    <div className={cn('text-xl font-bold', store.forecast <= store.budget ? 'text-emerald-700' : 'text-red-700')}>
                      {formatGBP(store.forecast)}
                    </div>
                    <div className={cn('mt-0.5 text-xs font-semibold', store.forecast <= store.budget ? 'text-emerald-600' : 'text-red-600')}>
                      {store.forecast <= store.budget
                        ? `${formatGBP(store.budget - store.forecast)} saving`
                        : `${formatGBP(store.forecast - store.budget)} overrun`}
                    </div>
                  </div>
                </div>
              </section>

              {/* Timeline */}
              <section>
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Timeline</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Start', value: store.start },
                    { label: 'Completion', value: store.completion },
                  ].map((t) => (
                    <div key={t.label} className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3">
                      <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                      <div>
                        <div className="text-xs font-medium text-slate-500">{t.label}</div>
                        <div className="mt-0.5 text-sm font-semibold text-slate-800">{t.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Milestones */}
              <section>
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Milestones</h3>
                <div className="flex flex-col gap-2">
                  {store.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {m.done ? (
                        <CheckCircle2 className="h-[18px] w-[18px] flex-shrink-0 text-emerald-500" />
                      ) : m.active ? (
                        <AlertCircle className="h-[18px] w-[18px] flex-shrink-0 text-amber-500" />
                      ) : (
                        <Circle className="h-[18px] w-[18px] flex-shrink-0 text-slate-300" />
                      )}
                      <span className={cn('text-sm', m.done ? 'text-slate-700 line-through' : m.active ? 'font-semibold text-amber-700' : 'text-slate-400')}>
                        {m.label}
                      </span>
                      {m.active && <Badge variant="amber" className="ml-auto">In Progress</Badge>}
                    </div>
                  ))}
                </div>
              </section>

              {/* Risks */}
              {store.risks.length > 0 && (
                <section>
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Risks</h3>
                  <div className="flex flex-col gap-2">
                    {store.risks.map((r, i) => (
                      <div key={i} className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3">
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span className="text-sm text-red-700">{r}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Team */}
              <section>
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Team</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { role: 'Project Manager', person: store.pm, icon: User },
                    { role: 'Contractor', person: store.contractor, icon: HardHat },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <div key={t.role} className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0">
                        <span className="text-xs font-medium text-slate-500">{t.role}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                            <Icon className="h-3 w-3 text-slate-500" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{t.person}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
