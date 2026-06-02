'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, PoundSterling, Calendar, HardHat } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STORES, STAGE_META, RAG_META, Store, StoreStage } from '@/lib/data';
import { cn, formatGBP } from '@/lib/utils';

const SVG_W = 460;
const SVG_H = 640;

// lat/lon → svg coords (UK bounds)
function toSVG(lat: number, lon: number) {
  const x = ((lon + 8.2) / 10.2) * SVG_W;
  const y = ((60.9 - lat) / 11.1) * SVG_H;
  return { x, y };
}

const UK_PATH = `M 230 12 L 278 18 L 308 36 L 295 60 L 318 78 L 305 96 L 320 118 L 295 140
  L 300 165 L 285 185 L 292 205 L 270 225 L 278 248 L 255 268 L 262 295 L 235 315
  L 245 340 L 222 360 L 215 385 L 192 400 L 178 388 L 188 360 L 168 335
  L 176 308 L 152 290 L 162 262 L 140 245 L 150 218 L 130 198 L 142 170
  L 122 150 L 135 122 L 115 100 L 130 72 L 158 58 L 185 40 L 205 22 Z`;
const WALES_PATH = `M 130 330 L 108 350 L 95 378 L 108 402 L 135 408 L 152 388 L 148 358 L 138 338 Z`;
const SCOTLAND_HIGHLANDS = `M 200 22 L 175 10 L 150 22 L 165 45 L 195 40 Z`;

export default function MapPage() {
  const [selected, setSelected] = useState<Store | null>(STORES[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Live Estate View</h1>
        <p className="mt-1 text-sm text-slate-500">412 stores nationwide · click any store to drill into its programme</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Map */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h3 className="text-sm font-bold text-slate-900">National Programme Map</h3>
            <Badge variant="green">
              <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </Badge>
          </div>
          <div className="flex gap-4 p-5">
            <div className="relative flex-1">
              <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="h-auto w-full" style={{ maxHeight: 560 }}>
                <rect width={SVG_W} height={SVG_H} fill="#eff6ff" rx={12} />
                {[0.25, 0.5, 0.75].map((t) => (
                  <line key={t} x1={SVG_W * t} y1={0} x2={SVG_W * t} y2={SVG_H} stroke="#dbeafe" strokeWidth={0.5} />
                ))}
                <path d={UK_PATH} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth={1.5} />
                <path d={WALES_PATH} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth={1.5} />
                <path d={SCOTLAND_HIGHLANDS} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth={1.5} />

                {STORES.map((store) => {
                  const { x, y } = toSVG(store.lat, store.lon);
                  const color = STAGE_META[store.stage].color;
                  const isSel = selected?.id === store.id;
                  const isHov = hovered === store.id;
                  const r = isSel ? 7 : isHov ? 6 : 5;
                  return (
                    <g
                      key={store.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelected(store)}
                      onMouseEnter={() => setHovered(store.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {store.stage === 'AtRisk' && (
                        <circle cx={x} cy={y} r={r + 3} fill={color} opacity={0.25}>
                          <animate attributeName="r" values={`${r};${r + 7};${r}`} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {isSel && <circle cx={x} cy={y} r={r + 3} fill="none" stroke={color} strokeWidth={2} opacity={0.5} />}
                      <circle cx={x} cy={y} r={r} fill={color} stroke="white" strokeWidth={isSel || isHov ? 2 : 1.5} />
                      {isHov && (
                        <g>
                          <rect x={x + 9} y={y - 17} width={store.name.length * 5.4 + 12} height={22} rx={4} fill="#0a2417" opacity={0.95} />
                          <text x={x + 15} y={y - 2} fill="white" fontSize={9} fontWeight={600}>
                            {store.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex w-32 flex-shrink-0 flex-col justify-center gap-2.5">
              {(Object.keys(STAGE_META) as StoreStage[]).map((stage) => {
                const count = STORES.filter((s) => s.stage === stage).length;
                return (
                  <div key={stage} className="flex items-center gap-2">
                    <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: STAGE_META[stage].color }} />
                    <span className="text-xs font-medium text-slate-600">{STAGE_META[stage].label}</span>
                    <span className="ml-auto font-mono text-xs text-slate-400">{count}</span>
                  </div>
                );
              })}
              <div className="mt-2 border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-400">Total estate</p>
                <p className="text-2xl font-black text-slate-800">412</p>
              </div>
            </div>
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
