'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Factory,
  Warehouse,
  Store as StoreIcon,
  Activity,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  Droplets,
  TriangleAlert,
  Flame,
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

// ─── 1. Weather risk — live weather dashboard (cold = blue, heat = red) ───────
type RegionState = WeatherRegion & { liveRisk: WeatherRiskLevel; isLive: boolean };

// Temperature → colour ramp, deep blue (cold) through teal/amber to deep red (hot).
const TEMP_STOPS: [number, [number, number, number]][] = [
  [-5, [30, 58, 138]],   // deep blue
  [2, [37, 99, 235]],    // blue
  [8, [56, 189, 248]],   // sky
  [14, [20, 184, 166]],  // teal
  [19, [132, 204, 22]],  // lime
  [24, [245, 158, 11]],  // amber
  [29, [249, 115, 22]],  // orange
  [33, [239, 68, 68]],   // red
  [38, [185, 28, 28]],   // deep red
];

function tempColour(t: number): string {
  if (t <= TEMP_STOPS[0][0]) return `rgb(${TEMP_STOPS[0][1].join(',')})`;
  const last = TEMP_STOPS[TEMP_STOPS.length - 1];
  if (t >= last[0]) return `rgb(${last[1].join(',')})`;
  for (let i = 0; i < TEMP_STOPS.length - 1; i++) {
    const [t0, c0] = TEMP_STOPS[i];
    const [t1, c1] = TEMP_STOPS[i + 1];
    if (t >= t0 && t <= t1) {
      const f = (t - t0) / (t1 - t0);
      const ch = c0.map((c, k) => Math.round(c + (c1[k] - c) * f));
      return `rgb(${ch.join(',')})`;
    }
  }
  return `rgb(${last[1].join(',')})`;
}

function weatherIcon(temp: number, precip: number, wind: number): React.ElementType {
  if (precip >= 2) return CloudRain;
  if (temp <= 2) return Snowflake;
  if (temp >= 30) return Flame;
  if (temp >= 23) return Sun;
  if (wind >= 28) return Wind;
  if (temp >= 15) return CloudSun;
  return Cloud;
}

export function WeatherRiskDiagram() {
  const [source, setSource] = useState<'live' | 'modelled'>('modelled');
  const [regions, setRegions] = useState<RegionState[]>(
    WEATHER_REGIONS.map((r) => ({ ...r, liveRisk: r.risk, isLive: false })),
  );

  // Live weather via Open-Meteo; graceful fallback to the modelled heatwave data.
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
    return () => { cancelled = true; };
  }, []);

  const alerts = regions.filter((r) => r.liveRisk === 'high');
  const totalAtRisk = regions.reduce((s, r) => s + r.storesAtRisk, 0);
  const hottest = regions.reduce((a, b) => (b.tempC > a.tempC ? b : a), regions[0]);
  const headline =
    hottest.tempC >= 30
      ? `Extreme heat warning — ${hottest.tempC}°C peak`
      : alerts.length > 0
        ? `${alerts.length} region${alerts.length !== 1 ? 's' : ''} on weather alert`
        : 'No active weather alerts';

  return (
    <Panel title="Weather Risk · UK Regions" live={source === 'live' ? 'Open-Meteo live' : 'Modelled'}>
      <div className="p-4">
        {/* Featured alert banner */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3"
              style={{ background: 'linear-gradient(90deg,#b91c1c,#ef4444)' }}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">{headline}</p>
                <p className="truncate text-xs text-white/80">
                  {alerts.map((a) => a.region).join(', ')} · refrigeration plant under thermal load
                </p>
              </div>
              <div className="hidden flex-shrink-0 text-right sm:block">
                <p className="text-lg font-black leading-none text-white">{totalAtRisk}</p>
                <p className="text-[10px] text-white/70">stores at risk</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Region weather cards */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {regions.map((r, i) => {
            const colour = tempColour(r.tempC);
            const Icon = weatherIcon(r.tempC, r.precip, r.wind);
            const atRisk = r.storesAtRisk > 0;
            return (
              <motion.div
                key={r.region}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="relative overflow-hidden rounded-xl border border-slate-100 p-3"
                style={{ background: `linear-gradient(160deg, ${colour}14, #ffffff 70%)` }}
              >
                {/* Flip-up warning ribbon for at-risk regions */}
                <AnimatePresence>
                  {r.liveRisk === 'high' && (
                    <motion.span
                      initial={{ opacity: 0, y: 6, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
                      className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white shadow-sm"
                    >
                      <TriangleAlert className="h-2.5 w-2.5" /> Alert
                    </motion.span>
                  )}
                </AnimatePresence>

                <div className="mb-1.5 flex items-center gap-1.5">
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color: colour }} />
                  <span className="truncate text-[11px] font-bold text-slate-700">{r.region}</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-black leading-none" style={{ color: colour }}>
                    {r.tempC}°
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2.5 text-[10px] text-slate-400">
                  <span className="flex items-center gap-0.5"><Wind className="h-2.5 w-2.5" />{r.wind}</span>
                  <span className="flex items-center gap-0.5"><Droplets className="h-2.5 w-2.5" />{r.precip.toFixed(1)}</span>
                </div>
                {atRisk && (
                  <p className="mt-1.5 truncate text-[10px] font-semibold" style={{ color: colour }}>
                    {r.storesAtRisk} store{r.storesAtRisk !== 1 ? 's' : ''} at risk
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Temperature legend (cold → hot) */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold text-blue-600">Cold</span>
          <div
            className="h-2 flex-1 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgb(30,58,138), rgb(56,189,248), rgb(20,184,166), rgb(245,158,11), rgb(239,68,68), rgb(185,28,28))',
            }}
          />
          <span className="text-[10px] font-semibold text-red-600">Heat</span>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Colour reflects ambient temperature — extreme heat and cold both stress refrigeration commissioning.
          {source === 'modelled' && ' Showing modelled heatwave scenario.'}
        </p>
      </div>
    </Panel>
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
                  className="flex h-7 items-center gap-1.5 rounded-md px-2"
                  style={{ background: `${sevColour[it.severity]}18` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(it.weeks / WEEKS_MAX) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: sevColour[it.severity] }} />
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
