import { Leaf, Zap, PoundSterling, Store } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CountUp } from '@/components/dashboard/count-up';
import { SUSTAINABILITY_BY_REGION } from '@/lib/data';

const maxCarbon = Math.max(...SUSTAINABILITY_BY_REGION.map((r) => r.carbon));

const metrics = [
  { icon: Leaf, value: 18700, label: 'Carbon Saved', unit: 'tCO₂e', sub: 'vs. legacy R404a systems', color: '#16a34a', bg: 'bg-emerald-50' },
  { icon: Zap, value: 12, label: 'Energy Reduction', unit: '%', sub: 'Average per converted store', color: '#ca8a04', bg: 'bg-amber-50' },
  { icon: PoundSterling, value: 7.3, label: 'Annual Cost Saving', unit: 'm', prefix: '£', sub: 'Projected energy bill reduction', color: '#2563eb', bg: 'bg-blue-50', decimals: 1 },
  { icon: Store, value: 127, label: 'Stores Converted', unit: ' / 412', sub: '31% of estate transitioned', color: '#1a5b36', bg: 'bg-morrison-50', progress: 31 },
];

export default function SustainabilityPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Carbon &amp; Sustainability</h1>
          <p className="mt-1 text-sm text-slate-500">Environmental performance across the refrigeration transition programme</p>
        </div>
        <Badge variant="green">Aligned to Net Zero 2035</Badge>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="p-5" style={{ borderTop: `3px solid ${m.color}` }}>
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${m.bg}`}>
                <Icon className="h-5 w-5" style={{ color: m.color }} />
              </div>
              <div className="text-2xl font-black leading-none" style={{ color: m.color }}>
                <CountUp to={m.value} prefix={m.prefix ?? ''} decimals={m.decimals ?? 0} />
                <span className="text-base font-semibold">{m.unit}</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-slate-700">{m.label}</p>
              <p className="text-xs text-slate-500">{m.sub}</p>
              {m.progress !== undefined && (
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${m.progress}%`, background: m.color }} />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Reduction Trajectory</CardTitle>
            <Badge variant="outline">Cumulative</Badge>
          </CardHeader>
          <CardContent className="py-5">
            <div className="space-y-3">
              {[
                { year: '2025', saved: 6200, pct: 33 },
                { year: '2026', saved: 18700, pct: 100 },
                { year: '2027 (f)', saved: 34500, pct: 100, forecast: true },
                { year: '2028 (f)', saved: 48000, pct: 100, forecast: true },
                { year: '2029 (f)', saved: 61000, pct: 100, forecast: true },
              ].map((r) => (
                <div key={r.year}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className={r.forecast ? 'text-slate-400' : 'font-semibold text-slate-700'}>{r.year}</span>
                    <span className="font-bold text-emerald-600">{r.saved.toLocaleString()} tCO₂e</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(r.saved / 61000) * 100}%`, background: r.forecast ? '#86efac' : '#16a34a' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance &amp; Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 py-5">
            {[
              { label: 'EU F-Gas Regulation', status: 'Compliant', note: 'All replacement units use low-GWP refrigerant' },
              { label: 'Net Zero 2035 Commitment', status: 'On Track', note: '31% of estate transitioned' },
              { label: 'Energy Performance (MEES)', status: 'Compliant', note: 'Average 12% energy reduction per store' },
              { label: 'Refrigerant Leak Monitoring', status: 'Active', note: 'Continuous BMS monitoring on converted stores' },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800">{c.label}</span>
                    <Badge variant="green">{c.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{c.note}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Regional breakdown + F-Gas conversion tracker */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Saved by Region</CardTitle>
            <Badge variant="outline">tCO₂e</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5 py-5">
            {SUSTAINABILITY_BY_REGION.map((r) => (
              <div key={r.region}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-slate-600">{r.region}</span>
                  <span className="font-bold text-emerald-600">{r.carbon.toLocaleString()}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(r.carbon / maxCarbon) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>F-Gas Conversion by Region</CardTitle>
            <Badge variant="green">Low-GWP transition</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5 py-5">
            {SUSTAINABILITY_BY_REGION.map((r) => {
              const pct = Math.round((r.converted / r.total) * 100);
              return (
                <div key={r.region} className="flex items-center gap-3">
                  <span className="w-28 flex-shrink-0 truncate text-xs text-slate-600">{r.region}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-morrison-600" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-20 flex-shrink-0 text-right text-xs font-semibold text-slate-700">{r.converted}/{r.total} · {pct}%</span>
                </div>
              );
            })}
            <p className="pt-1 text-[11px] text-slate-400">
              Converted stores run low-GWP refrigerant with continuous leak monitoring — the core of F-Gas compliance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
