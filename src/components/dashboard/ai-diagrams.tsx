'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
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

// ─── 1. Weather risk — Leaflet map with animated flip-up warning cards ────────
type RegionState = WeatherRegion & { liveRisk: WeatherRiskLevel; isLive: boolean };

export function WeatherRiskDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [source, setSource] = useState<'live' | 'modelled'>('modelled');
  const [regions, setRegions] = useState<RegionState[]>(
    WEATHER_REGIONS.map((r) => ({ ...r, liveRisk: r.risk, isLive: false })),
  );

  // Fetch live weather via Open-Meteo; falls back to mock on any failure
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

  // Build (or rebuild) Leaflet map whenever region data updates
  useEffect(() => {
    if (!containerRef.current) return;
    // Destroy any existing instance first
    if (mapInstanceRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapInstanceRef.current as any).remove();
      mapInstanceRef.current = null;
    }

    import('leaflet').then((L) => {
      if (!containerRef.current || mapInstanceRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 13 }).addTo(map);

      const UK_BOUNDS = L.latLngBounds([49.9, -8.2], [58.8, 1.9]);
      map.fitBounds(UK_BOUNDS, { padding: [20, 20] });
      requestAnimationFrame(() => {
        map.invalidateSize();
        map.fitBounds(UK_BOUNDS, { padding: [20, 20] });
      });

      regions.forEach((r, idx) => {
        const colour = RISK_COLOUR[r.liveRisk];
        const isHigh = r.liveRisk === 'high';
        const isMedium = r.liveRisk === 'medium';
        const delay = idx * 100;

        const pulseEl = isHigh
          ? `<div class="wx-pulse" style="background:${colour};animation-delay:${delay}ms"></div>`
          : '';

        const warnEl = (isHigh || isMedium)
          ? `<div class="wx-warn wx-warn-${r.liveRisk}" style="animation-delay:${delay + 200}ms">&#9888; ${r.region.split(/[\s,]/)[0]}</div>`
          : '';

        const icon = L.divIcon({
          className: '',
          html: `<div class="wx-root">${pulseEl}${warnEl}<div class="wx-dot" style="background:${colour}"></div></div>`,
          iconSize: [110, 56],
          iconAnchor: [55, 56],
        });

        L.marker([r.lat, r.lon], { icon })
          .bindTooltip(
            `<b>${r.region}</b><br>&#127777; ${r.tempC}°C &nbsp;&#128167; ${r.precip.toFixed(1)}mm &nbsp;&#128168; ${r.wind}km/h<br>${r.storesAtRisk > 0 ? `&#9888; ${r.storesAtRisk} stores at delivery risk` : '&#10003; No active delivery impact'}`,
            { direction: 'top', className: 'wx-tip' },
          )
          .addTo(map);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [regions]);

  return (
    <Panel title="Weather Risk · UK Regions" live={source === 'live' ? 'Open-Meteo live' : 'Modelled'}>
      <style>{`
        .wx-root { position:relative; display:flex; flex-direction:column; align-items:center; }
        .wx-dot { width:13px; height:13px; border-radius:50%; border:2.5px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.4); position:relative; z-index:2; }
        .wx-pulse {
          position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          width:28px; height:28px; border-radius:50%; z-index:1;
          animation:wxPulse 2.2s ease-out infinite;
        }
        .wx-warn {
          position:absolute; bottom:17px; left:50%; transform:translateX(-50%);
          background:white; border-radius:5px; padding:2px 7px; white-space:nowrap;
          font-size:9px; font-weight:700; z-index:3; pointer-events:none;
          box-shadow:0 3px 10px rgba(0,0,0,0.18);
          animation:wxFlipUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .wx-warn-high { color:#dc2626; border:1px solid #fca5a5; }
        .wx-warn-medium { color:#d97706; border:1px solid #fde68a; }
        @keyframes wxFlipUp {
          from { opacity:0; transform:translateX(-50%) translateY(8px) scale(0.75); }
          to   { opacity:1; transform:translateX(-50%) translateY(0)   scale(1);    }
        }
        @keyframes wxPulse {
          0%,100% { opacity:0.4; transform:translateX(-50%) scale(1);   }
          60%     { opacity:0;   transform:translateX(-50%) scale(2.4); }
        }
        .leaflet-tooltip.wx-tip {
          background:#0a2417 !important; color:white !important; border:none !important;
          border-radius:6px !important; font-size:11px !important; padding:5px 9px !important;
          white-space:nowrap !important; box-shadow:0 4px 12px rgba(0,0,0,0.3) !important;
        }
        .leaflet-tooltip.wx-tip::before { display:none !important; }
      `}</style>
      <div ref={containerRef} style={{ height: 340, width: '100%', borderRadius: '0 0 12px 12px' }} />
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
