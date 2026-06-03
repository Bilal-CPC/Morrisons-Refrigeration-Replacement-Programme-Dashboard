'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, PoundSterling, Calendar, HardHat } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STORES, STAGE_META, RAG_META, Store, StoreStage } from '@/lib/data';
import { cn, formatGBP } from '@/lib/utils';

// Leaflet requires browser APIs — must be loaded client-side only
const EstateMap = dynamic(
  () => import('@/components/dashboard/estate-map').then((m) => m.EstateMap),
  { ssr: false, loading: () => <div className="flex h-[500px] items-center justify-center text-sm text-slate-400">Loading map…</div> }
);

export default function MapPage() {
  const [selected, setSelected] = useState<Store | null>(STORES[0]);

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Live Estate View</h1>
          <p className="mt-1 text-sm text-slate-500">412 stores nationwide · click any store to drill into its programme</p>
        </div>
        <Badge variant="green">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </Badge>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Real Leaflet map */}
        <Card className="overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h3 className="text-sm font-bold text-slate-900">National Programme Map</h3>
            <div className="flex flex-wrap items-center gap-3">
              {(Object.keys(STAGE_META) as StoreStage[]).map((stage) => {
                const count = STORES.filter((s) => s.stage === stage).length;
                return (
                  <span key={stage} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: STAGE_META[stage].color }} />
                    {STAGE_META[stage].label}
                    <span className="font-semibold text-slate-700">{count}</span>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="h-[500px] w-full">
            <EstateMap stores={STORES} selected={selected} onSelect={setSelected} />
          </div>
        </Card>

        {/* Selected store panel */}
        <Card className="overflow-hidden">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 py-4" style={{ background: '#0a2417' }}>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-xs text-white/50">{selected.id}</span>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', RAG_META[selected.status].bg, RAG_META[selected.status].text)}>
                      {selected.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Morrisons {selected.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                    <MapPin className="h-3 w-3" /> {selected.region}
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <span
                      className="inline-block rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                      style={{ background: STAGE_META[selected.stage].color }}
                    >
                      {STAGE_META[selected.stage].label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Stat icon={PoundSterling} label="Budget" value={formatGBP(selected.budget)} />
                    <Stat
                      icon={PoundSterling}
                      label="Forecast"
                      value={formatGBP(selected.forecast)}
                      tone={selected.forecast > selected.budget ? 'red' : 'green'}
                    />
                    <Stat icon={Calendar} label="Start" value={selected.start} />
                    <Stat icon={Calendar} label="Completion" value={selected.completion} />
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200">
                      <HardHat className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">Contractor</p>
                      <p className="text-sm font-semibold text-slate-800">{selected.contractor}</p>
                    </div>
                  </div>
                  {selected.milestones.length > 0 && (
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Milestones</p>
                      <div className="space-y-1.5">
                        {selected.milestones.map((m, i) => (
                          <div key={i} className={cn('flex items-center gap-2 rounded-lg px-3 py-2 text-xs',
                            m.done ? 'bg-emerald-50 text-emerald-700' : m.active ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-500')}>
                            <span className={cn('h-2 w-2 flex-shrink-0 rounded-full',
                              m.done ? 'bg-emerald-500' : m.active ? 'bg-amber-400' : 'bg-slate-300')} />
                            {m.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selected.risks.length > 0 && (
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Risks</p>
                      <div className="space-y-1.5">
                        {selected.risks.map((r, i) => (
                          <div key={i} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            {!selected && (
              <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-400">
                <MapPin className="h-8 w-8 opacity-40" />
                <p className="text-sm">Click a store on the map</p>
              </div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone?: 'red' | 'green';
}) {
  return (
    <div className={cn('rounded-xl p-3', tone === 'red' ? 'bg-red-50' : tone === 'green' ? 'bg-emerald-50' : 'bg-slate-50')}>
      <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-400">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={cn('text-sm font-bold', tone === 'red' ? 'text-red-700' : tone === 'green' ? 'text-emerald-700' : 'text-slate-800')}>
        {value}
      </div>
    </div>
  );
}
