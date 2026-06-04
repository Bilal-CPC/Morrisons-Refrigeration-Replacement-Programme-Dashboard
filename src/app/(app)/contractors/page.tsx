'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ShieldCheck, HardHat, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CONTRACTOR_SLAS, CONTRACTORS, STORES, STAGE_META, type ContractorSLA } from '@/lib/data';
import { cn } from '@/lib/utils';

const rankColour = ['bg-gold-500 text-morrison-900', 'bg-slate-300 text-slate-700', 'bg-amber-600 text-white'];

// Derived programme-level KPIs (no hardcoding)
const avgOnTime = Math.round(CONTRACTOR_SLAS.reduce((a, c) => a + c.onTime, 0) / CONTRACTOR_SLAS.length);
const avgSla = Math.round(CONTRACTOR_SLAS.reduce((a, c) => a + c.slaCompliance, 0) / CONTRACTOR_SLAS.length);
const totalIncidents = CONTRACTOR_SLAS.reduce((a, c) => a + c.safetyIncidents, 0);
const underReview = CONTRACTOR_SLAS.filter((c) => c.slaCompliance < 85).length;

function Sparkline({ data, colour }: { data: number[]; colour: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${28 - ((d - min) / range) * 24 - 2}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 28" className="h-6 w-20" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={colour} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContractorsPage() {
  const [selected, setSelected] = useState<ContractorSLA | null>(CONTRACTOR_SLAS[0]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Contractor Performance &amp; SLAs</h1>
        <p className="mt-1 text-sm text-slate-500">Delivery-partner KPIs, SLA compliance and supply-chain performance across the estate</p>
      </div>

      {/* Derived summary tiles */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: 'Active Contractors', value: `${CONTRACTOR_SLAS.length}`, color: 'text-slate-800', Icon: HardHat },
          { label: 'Avg On-Time', value: `${avgOnTime}%`, color: 'text-emerald-600', Icon: Clock },
          { label: 'Avg SLA Compliance', value: `${avgSla}%`, color: 'text-morrison-600', Icon: ShieldCheck },
          { label: 'Safety Incidents', value: `${totalIncidents}`, color: 'text-amber-600', Icon: AlertTriangle },
          { label: 'Under Review', value: `${underReview}`, color: 'text-red-600', Icon: AlertTriangle },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <s.Icon className={cn('mb-2 h-4 w-4', s.color)} />
            <p className={cn('text-2xl font-black', s.color)}>{s.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* SLA League table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-gold-500" /> SLA Scorecard — League Table
            </CardTitle>
            <Badge variant="outline">2025–26 season</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-[40px_1fr_70px_84px_70px_60px] gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span className="text-center">#</span>
              <span>Contractor</span>
              <span className="text-center">On-Time</span>
              <span className="text-center">Trend</span>
              <span className="text-center">SLA</span>
              <span className="text-center">Safety</span>
            </div>
            <div className="divide-y divide-slate-50">
              {CONTRACTOR_SLAS.map((c, i) => {
                const isSel = selected?.name === c.name;
                const otColour = c.onTime >= 90 ? '#16a34a' : c.onTime >= 80 ? '#d97706' : '#dc2626';
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelected(c)}
                    className={cn(
                      'grid w-full grid-cols-[40px_1fr_70px_84px_70px_60px] items-center gap-2 px-4 py-3 text-left transition-colors',
                      isSel ? 'bg-morrison-50' : 'hover:bg-slate-50',
                    )}
                  >
                    <span className="flex justify-center">
                      {i < 3 ? (
                        <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black', rankColour[i])}>{i + 1}</span>
                      ) : (
                        <span className="text-sm font-bold text-slate-400">{i + 1}</span>
                      )}
                    </span>
                    <span className={cn('text-sm font-bold', isSel ? 'text-morrison-800' : 'text-slate-800')}>{c.name}</span>
                    <span className="text-center text-sm font-bold" style={{ color: otColour }}>{c.onTime}%</span>
                    <span className="flex justify-center"><Sparkline data={c.trend} colour={otColour} /></span>
                    <span className="text-center text-sm font-semibold text-slate-600">{c.slaCompliance}%</span>
                    <span className="flex justify-center">
                      {c.safetyIncidents === 0 ? (
                        <Badge variant="green">0</Badge>
                      ) : (
                        <Badge variant="amber">{c.safetyIncidents}</Badge>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected contractor detail */}
        <Card className="overflow-hidden">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 py-4" style={{ background: '#0a2417' }}>
                  <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                  <p className="mt-0.5 text-xs text-white/50">{selected.regions.join(' · ')}</p>
                </div>
                <div className="space-y-4 p-5">
                  {/* SLA scorecard */}
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">SLA Scorecard</p>
                    <div className="space-y-2">
                      {[
                        { l: 'On-time delivery', v: selected.onTime, t: 90, unit: '%' },
                        { l: 'Quality score', v: selected.quality, t: 88, unit: '%' },
                        { l: 'SLA compliance', v: selected.slaCompliance, t: 90, unit: '%' },
                        { l: 'Capacity used', v: selected.capacity, t: 100, unit: '%' },
                      ].map((m) => {
                        const ok = m.v >= m.t;
                        return (
                          <div key={m.l}>
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="text-slate-600">{m.l}</span>
                              <span className={cn('font-bold', ok ? 'text-emerald-600' : 'text-amber-600')}>{m.v}{m.unit}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full" style={{ width: `${m.v}%`, background: ok ? '#16a34a' : '#d97706' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* secondary KPIs */}
                  <div className="grid grid-cols-3 gap-2">
                    <Kpi label="Defects/store" value={selected.defectRate.toFixed(1)} />
                    <Kpi label="Response" value={`${selected.responseDays}d`} />
                    <Kpi label="Incidents" value={`${selected.safetyIncidents}`} tone={selected.safetyIncidents > 0 ? 'amber' : 'green'} />
                  </div>

                  {/* Portfolio */}
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned Stores</p>
                    <div className="max-h-40 space-y-1 overflow-y-auto">
                      {STORES.filter((s) => s.contractor === selected.name).slice(0, 8).map((s) => (
                        <div key={s.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
                          <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: STAGE_META[s.stage].color }} />
                          <span className="flex items-center gap-1 truncate text-xs text-slate-700"><MapPin className="h-3 w-3 text-slate-300" />{s.name}</span>
                          <span className="ml-auto text-[10px] text-slate-400">{STAGE_META[s.stage].label}</span>
                        </div>
                      ))}
                      {STORES.filter((s) => s.contractor === selected.name).length === 0 && (
                        <p className="text-xs text-slate-400">No stores in the sampled register.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        SLA compliance blends on-time delivery, quality, safety and response performance against agreed contract targets. Cost variance vs agreed contract sum: {CONTRACTORS.map((c) => `${c.name.split(' ')[1]} ${c.costVariance > 0 ? '+' : ''}${c.costVariance}%`).join(' · ')}.
      </p>
    </div>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: 'amber' | 'green' }) {
  return (
    <div className={cn('rounded-lg p-2 text-center', tone === 'amber' ? 'bg-amber-50' : tone === 'green' ? 'bg-emerald-50' : 'bg-slate-50')}>
      <p className={cn('text-sm font-black', tone === 'amber' ? 'text-amber-600' : tone === 'green' ? 'text-emerald-600' : 'text-slate-800')}>{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}
