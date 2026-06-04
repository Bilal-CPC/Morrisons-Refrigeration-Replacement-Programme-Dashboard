'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Thermometer,
  Wind,
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus,
  Factory,
  Warehouse,
  Store as StoreIcon,
  Activity,
} from 'lucide-react';
import {
  WEATHER_REGIONS,
  SUPPLY_CHAIN,
  CONTRACTOR_SLAS,
  AI_INSIGHTS,
  type WeatherRegion,
} from '@/lib/data';
import { fetchRegionWeather, deriveWeatherRisk, type WeatherRiskLevel } from '@/lib/weather';
import { cn } from '@/lib/utils';

const RISK_COLOUR: Record<WeatherRiskLevel, string> = {
  low: '#16a34a',
  medium: '#d97706',
  high: '#dc2626',
};

// GB bounds shared with the estate map, for placing region nodes on the SVG.
const SW = { lat: 49.9, lon: -8.2 };
const NE = { lat: 58.8, lon: 1.9 };
const VB_W = 200;
const VB_H = 280;
const toXY = (lat: number, lon: number) => ({
  x: ((lon - SW.lon) / (NE.lon - SW.lon)) * VB_W,
  y: ((NE.lat - lat) / (NE.lat - SW.lat)) * VB_H,
});

// ─── Panel shell ────────────────────────────────────────────────────────────
function Panel({
  title,
  live,
  children,
  className,
}: {
  title: string;
  live?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm', className)}>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        {live && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {live}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── 1. Weather risk — geographic region diagram with live data ───────────────
type RegionState = WeatherRegion & { liveRisk: WeatherRiskLevel; isLive: boolean };

export function WeatherRiskDiagram() {
  const [regions, setRegions] = useState<RegionState[]>(
    WEATHER_REGIONS.map((r) => ({ ...r, liveRisk: r.risk, isLive: false })),
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [source, setSource] = useState<'live' | 'modelled'>('modelled');

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      WEATHER_REGIONS.map(async (r) => {
        const live = await fetchRegionWeather(r.lat, r.lon);
        if (live) {
          return {
            ...r,
            tempC: live.tempC,
            precip: live.precip,
            wind: live.wind,
            liveRisk: deriveWeatherRisk(live.tempC, live.precip, live.wind),
            isLive: true,
          };
        }
        return { ...r, liveRisk: r.risk, isLive: false };
      }),
    ).then((next) => {
      if (cancelled) return;
      setRegions(next);
      if (next.some((r) => r.isLive)) setSource('live');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const active = regions.find((r) => r.region === hovered) ?? null;

  return (
    <Panel title="Weather Risk · UK Regions" live={source === 'live' ? 'Open-Meteo live' : 'Modelled'}>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[180px_1fr]">
        {/* Geographic node map */}
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-[260px] w-full">
          {/* faint GB backdrop */}
          <path
            d="M95 18 C70 30 78 60 70 80 C60 100 78 120 72 140 C66 165 95 175 90 200 C85 225 110 240 120 255 C140 245 150 235 158 235 C170 235 175 220 165 205 C180 195 175 175 160 168 C172 150 160 135 145 132 C150 110 135 95 120 96 C128 70 118 45 110 30 Z"
            fill="#f1f5f9"
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          {regions.map((r) => {
            const { x, y } = toXY(r.lat, r.lon);
            const colour = RISK_COLOUR[r.liveRisk];
            const isHot = r.liveRisk === 'high';
            const isActive = hovered === r.region;
            return (
              <g
                key={r.region}
                onMouseEnter={() => setHovered(r.region)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {isHot && (
                  <circle cx={x} cy={y} r={10} fill={colour} opacity={0.25}>
                    <animate attributeName="r" values="7;13;7" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 7 : 5.5}
                  fill={colour}
                  stroke="#fff"
                  strokeWidth={1.5}
                  style={{ transition: 'r 0.15s' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Detail / list */}
        <div className="flex flex-col justify-center">
          {active ? (
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">{active.region}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                  style={{ background: RISK_COLOUR[active.liveRisk] }}
                >
                  {active.liveRisk} risk
                </span>
              </div>
              <div className="mb-2 grid grid-cols-3 gap-2">
                <Metric icon={Thermometer} label="Temp" value={`${active.tempC}°`} />
                <Metric icon={Droplets} label="Precip" value={`${active.precip.toFixed(1)}`} />
                <Metric icon={Wind} label="Wind" value={`${active.wind}`} />
              </div>
              <p className="text-xs text-slate-500">{active.note}</p>
              {active.storesAtRisk > 0 && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {active.storesAtRisk} store{active.storesAtRisk !== 1 ? 's' : ''} at risk
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              {(['high', 'medium', 'low'] as WeatherRiskLevel[]).map((lvl) => {
                const count = regions.filter((r) => r.liveRisk === lvl).length;
                return (
                  <div key={lvl} className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: RISK_COLOUR[lvl] }} />
                    <span className="capitalize text-slate-600">{lvl} risk</span>
                    <span className="ml-auto font-semibold text-slate-700">{count} region{count !== 1 ? 's' : ''}</span>
                  </div>
                );
              })}
              <p className="pt-1.5 text-[11px] text-slate-400">Hover a region for live conditions and delivery impact.</p>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-1.5 text-center">
      <Icon className="mx-auto mb-0.5 h-3 w-3 text-slate-400" />
      <p className="text-sm font-bold text-slate-800">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}

// ─── 2. Supply-chain lead-time flow ───────────────────────────────────────────
export function SupplyChainFlow() {
  const maxWeeks = Math.max(...SUPPLY_CHAIN.map((s) => s.leadWeeks));
  return (
    <Panel title="Supply Chain · Lead Times" live="ERP feed">
      {/* flow header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-50 px-4 py-2.5 text-[11px] font-semibold text-slate-400">
        <span className="flex items-center gap-1"><Factory className="h-3.5 w-3.5" /> Supplier</span>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="flex items-center gap-1"><Warehouse className="h-3.5 w-3.5" /> Depot</span>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="flex items-center gap-1"><StoreIcon className="h-3.5 w-3.5" /> Site</span>
      </div>
      <div className="space-y-2.5 p-4">
        {SUPPLY_CHAIN.map((s, i) => {
          const colour = s.status === 'Red' ? '#dc2626' : s.status === 'Amber' ? '#d97706' : '#16a34a';
          const Trend = s.trend === 'up' ? TrendingUp : s.trend === 'down' ? TrendingDown : Minus;
          return (
            <div key={s.material}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{s.material}</span>
                <span className="flex items-center gap-1.5">
                  <Trend className="h-3.5 w-3.5" style={{ color: colour }} />
                  <span className="font-bold" style={{ color: colour }}>{s.leadWeeks}w</span>
                  <span className="text-slate-400">vs {s.baselineWeeks}w</span>
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: colour }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s.leadWeeks / maxWeeks) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                />
              </div>
              {s.affectedStores > 0 && (
                <p className="mt-0.5 text-[10px] text-slate-400">{s.affectedStores} stores · {s.region}</p>
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

// ─── 3. Contractor capacity heatmap ───────────────────────────────────────────
const HEATMAP_REGIONS = ['Scotland', 'North East', 'North West', 'Yorkshire', 'Midlands', 'Wales', 'London & South', 'East', 'South West'];

export function ContractorCapacityHeatmap() {
  const [hover, setHover] = useState<{ c: string; r: string } | null>(null);
  return (
    <Panel title="Contractor Capacity · Region" live="Live">
      <div className="overflow-x-auto p-4">
        <div className="min-w-[440px]">
          {/* header */}
          <div className="mb-1 grid grid-cols-[90px_repeat(9,1fr)] gap-1">
            <span />
            {HEATMAP_REGIONS.map((r) => (
              <span key={r} className="truncate text-center text-[8px] font-semibold text-slate-400" title={r}>
                {r.split(' ')[0]}
              </span>
            ))}
          </div>
          {CONTRACTOR_SLAS.map((c) => (
            <div key={c.name} className="mb-1 grid grid-cols-[90px_repeat(9,1fr)] items-center gap-1">
              <span className="truncate text-[11px] font-semibold text-slate-600">{c.name}</span>
              {HEATMAP_REGIONS.map((r) => {
                const active = c.regions.includes(r);
                const intensity = active ? c.capacity / 100 : 0;
                const isHover = hover?.c === c.name && hover?.r === r;
                return (
                  <div
                    key={r}
                    onMouseEnter={() => active && setHover({ c: c.name, r })}
                    onMouseLeave={() => setHover(null)}
                    className="relative h-7 rounded"
                    style={{
                      background: active ? `rgba(0,122,51,${0.18 + intensity * 0.72})` : '#f1f5f9',
                      outline: isHover ? '2px solid #007a33' : 'none',
                      cursor: active ? 'pointer' : 'default',
                    }}
                  >
                    {active && (
                      <span className="flex h-full items-center justify-center text-[9px] font-bold text-white/90">
                        {c.capacity}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <p className="mt-2 text-[10px] text-slate-400">
            Cell shade = capacity utilisation where the contractor operates. Darker = closer to full capacity.
          </p>
        </div>
      </div>
    </Panel>
  );
}

// ─── 4. Programme signal feed ──────────────────────────────────────────────────
const FEED = [
  { t: 'just now', text: 'Compressor lead time updated to 6 weeks — Northern Region', sev: 'high' },
  { t: '14 min ago', text: 'Weather model refreshed — Scotland cold-snap probability ↑', sev: 'medium' },
  { t: '38 min ago', text: 'Contractor A capacity now 82% — within tolerance', sev: 'low' },
  { t: '1 hr ago', text: 'MRS-020 Hull Bransholme flagged: completion +3 weeks', sev: 'high' },
  { t: '2 hr ago', text: 'NW batch tender opportunity identified — est. £0.4m saving', sev: 'low' },
];
const sevDot: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-emerald-500' };

export function ProgrammeSignalFeed() {
  return (
    <Panel title="Programme Signal Feed" live="Streaming">
      <div className="divide-y divide-slate-50">
        {FEED.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-2.5 px-4 py-2.5"
          >
            <span className={cn('mt-1 h-2 w-2 flex-shrink-0 rounded-full', sevDot[f.sev], i === 0 && 'animate-pulse')} />
            <div className="min-w-0">
              <p className="text-xs leading-snug text-slate-700">{f.text}</p>
              <p className="mt-0.5 text-[10px] text-slate-400">{f.t}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ─── 5. Risk time-to-impact timeline ───────────────────────────────────────────
const WEEKS_MAX = 12;
// weeks-to-critical-path per insight (ordered to match AI_INSIGHTS)
const IMPACT_WEEKS = [3, 5, 8, 2, 10];
const sevColour: Record<string, string> = { high: '#dc2626', medium: '#d97706', low: '#2563eb' };

export function RiskTimeline() {
  const [hover, setHover] = useState<number | null>(null);
  const items = useMemo(
    () => AI_INSIGHTS.map((a, i) => ({ ...a, weeks: IMPACT_WEEKS[i] ?? 12 })),
    [],
  );
  return (
    <Panel title="Risk Time-to-Impact" live="Forecast">
      <div className="p-4">
        <div className="relative ml-1 mr-2">
          {/* axis */}
          <div className="mb-3 flex justify-between text-[10px] text-slate-400">
            {[0, 3, 6, 9, 12].map((w) => (
              <span key={w}>{w}w</span>
            ))}
          </div>
          <div className="relative space-y-2.5">
            {/* gridlines */}
            <div className="pointer-events-none absolute inset-0 flex justify-between">
              {[0, 1, 2, 3, 4].map((g) => (
                <span key={g} className="w-px bg-slate-100" />
              ))}
            </div>
            {items.map((it, i) => (
              <div
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="relative"
              >
                <motion.div
                  className="flex h-7 items-center rounded-md px-2"
                  style={{ background: `${sevColour[it.severity]}1a`, borderLeft: `3px solid ${sevColour[it.severity]}` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(it.weeks / WEEKS_MAX) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                >
                  <span className="truncate text-[10px] font-semibold" style={{ color: sevColour[it.severity] }}>
                    {it.tag}
                  </span>
                </motion.div>
                {hover === i && (
                  <div className="absolute left-0 top-8 z-10 w-64 rounded-lg border border-slate-200 bg-white p-2.5 text-[11px] text-slate-600 shadow-lg">
                    <span className="font-bold text-slate-800">{it.weeks} weeks to critical path</span>
                    <p className="mt-1 leading-snug">{it.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
            <Activity className="h-3 w-3" /> Bars show weeks until each risk reaches the critical path. Shorter = more urgent.
          </div>
        </div>
      </div>
    </Panel>
  );
}
