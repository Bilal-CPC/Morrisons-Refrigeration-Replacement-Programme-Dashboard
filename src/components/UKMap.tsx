import { useState } from 'react';
import { stores, Store, StoreStage } from '@/data/stores';

interface UKMapProps {
  onSelectStore: (store: Store) => void;
  selectedStoreId?: string;
}

const stageColors: Record<StoreStage, string> = {
  Complete: '#16A34A',
  OnSite: '#D97706',
  Design: '#2563EB',
  Procurement: '#7C3AED',
  AtRisk: '#DC2626',
  NotStarted: '#94A3B8',
};

const stageLabels: Record<StoreStage, string> = {
  Complete: 'Complete',
  OnSite: 'On Site',
  Design: 'In Design',
  Procurement: 'Procurement',
  AtRisk: 'At Risk',
  NotStarted: 'Not Started',
};

// Convert lat/lon to SVG coordinates
// UK lat: 49.8 – 60.9, lon: -8.2 – 2.0
function toSVG(lat: number, lon: number, w = 380, h = 560) {
  const x = ((lon + 8.2) / 10.2) * w;
  const y = ((60.9 - lat) / 11.1) * h;
  return { x, y };
}

// Simplified UK outline path (approximate polygon)
const UK_PATH = `
  M 190 10
  L 230 15 L 255 30 L 270 50 L 265 65 L 245 70
  L 260 90 L 268 110 L 255 125 L 240 128
  L 248 145 L 252 160 L 240 175 L 228 178
  L 235 195 L 238 215 L 225 228 L 215 230
  L 220 250 L 222 265 L 210 278 L 200 282
  L 185 275 L 175 280 L 168 295 L 158 302
  L 142 298 L 130 285 L 125 270 L 132 255
  L 140 245 L 135 228 L 128 215 L 130 200
  L 118 190 L 108 178 L 105 162 L 112 148
  L 120 138 L 115 120 L 100 110 L 88 95
  L 82 78 L 90 65 L 108 58 L 122 62
  L 130 50 L 138 35 L 152 22 L 168 12
  Z
`;

// Wales peninsula
const WALES_PATH = `
  M 100 295 L 90 310 L 78 328 L 72 348
  L 80 362 L 95 372 L 108 368 L 118 355
  L 122 340 L 118 322 L 110 308 Z
`;

// Cornwall peninsula
const CORNWALL_PATH = `
  M 88 480 L 70 495 L 55 510 L 45 525
  L 50 538 L 62 542 L 72 535 L 80 520
  L 88 505 Z
`;

export function UKMap({ onSelectStore, selectedStoreId }: UKMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const SVG_W = 380;
  const SVG_H = 560;

  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Live Programme Estate View</h2>
          <p className="text-xs text-slate-500 mt-0.5">412 Stores Nationwide · Click a store for details</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* Map */}
        <div className="flex-1 relative">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-full"
            style={{ maxHeight: 480 }}
          >
            {/* Ocean background */}
            <rect width={SVG_W} height={SVG_H} fill="#EFF6FF" rx={12} />
            {/* Grid lines */}
            {[0.2, 0.4, 0.6, 0.8].map(t => (
              <line key={t} x1={SVG_W * t} y1={0} x2={SVG_W * t} y2={SVG_H}
                stroke="#DBEAFE" strokeWidth={0.5} />
            ))}

            {/* UK mainland */}
            <path d={UK_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth={1.5} />
            {/* Wales */}
            <path d={WALES_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth={1.5} />
            {/* Cornwall */}
            <path d={CORNWALL_PATH} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth={1.5} />

            {/* Store pins */}
            {stores.map(store => {
              const { x, y } = toSVG(store.lat, store.lon, SVG_W, SVG_H);
              const color = stageColors[store.stage];
              const isSelected = store.id === selectedStoreId;
              const isHovered = store.id === hoveredId;
              const r = isSelected ? 7 : isHovered ? 6 : 5;

              return (
                <g key={store.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectStore(store)}
                  onMouseEnter={() => setHoveredId(store.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Pulse ring for at-risk */}
                  {store.stage === 'AtRisk' && (
                    <circle cx={x} cy={y} r={r + 4} fill={color} opacity={0.2}>
                      <animate attributeName="r" values={`${r+2};${r+8};${r+2}`} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Selection ring */}
                  {isSelected && (
                    <circle cx={x} cy={y} r={r + 3} fill="none" stroke={color} strokeWidth={2} opacity={0.6} />
                  )}
                  {/* Main dot */}
                  <circle
                    cx={x} cy={y} r={r}
                    fill={color}
                    stroke="white"
                    strokeWidth={isSelected || isHovered ? 2 : 1.5}
                    opacity={store.stage === 'NotStarted' ? 0.7 : 1}
                  />
                  {/* Tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x + 8} y={y - 16}
                        width={Math.max(store.name.length * 5.5 + 8, 80)}
                        height={22}
                        rx={4} fill="#1E293B" opacity={0.92}
                      />
                      <text x={x + 12} y={y - 1} fill="white" fontSize={9} fontWeight="600"
                        fontFamily="Inter, sans-serif">
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
        <div className="flex flex-col gap-2 justify-center shrink-0">
          {(Object.entries(stageLabels) as [StoreStage, string][]).map(([stage, label]) => {
            const count = stores.filter(s => s.stage === stage).length;
            return (
              <div key={stage} className="flex items-center gap-2 min-w-[110px]">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: stageColors[stage] }}
                />
                <span className="text-xs text-slate-600 font-medium">{label}</span>
                <span className="text-xs text-slate-400 ml-auto font-mono">{count}</span>
              </div>
            );
          })}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium">Total</p>
            <p className="text-lg font-bold text-slate-700">412</p>
          </div>
        </div>
      </div>
    </div>
  );
}
