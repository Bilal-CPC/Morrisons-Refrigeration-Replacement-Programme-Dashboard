import { PoundSterling, TrendingDown, TrendingUp, Receipt, Banknote, PiggyBank } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CountUp } from '@/components/dashboard/count-up';
import { SpendTrendChart } from '@/components/dashboard/charts';
import { FGasCountdown } from '@/components/dashboard/fgas-countdown';

const summary = [
  { label: 'Approved Budget', value: 50, icon: PoundSterling, color: '#1e293b', sub: 'Total approved programme', tone: 'bg-slate-100' },
  { label: 'Forecast Final Cost', value: 47, icon: TrendingDown, color: '#16a34a', sub: '£3m below budget', tone: 'bg-emerald-50' },
  { label: 'Spend to Date', value: 22, icon: Receipt, color: '#2563eb', sub: '44% expended', tone: 'bg-blue-50' },
  { label: 'Committed Spend', value: 34, icon: Banknote, color: '#d97706', sub: '68% committed', tone: 'bg-amber-50' },
  { label: 'Forecast Savings', value: 3, icon: PiggyBank, color: '#16a34a', sub: 'Procurement efficiencies', tone: 'bg-emerald-50' },
];

const bars = [
  { label: 'Approved Budget', value: '£50.0m', pct: 100, color: '#1e293b' },
  { label: 'Forecast Final Cost', value: '£47.0m', pct: 94, color: '#16a34a' },
  { label: 'Committed Spend', value: '£34.0m', pct: 68, color: '#d97706' },
  { label: 'Spend to Date', value: '£22.0m', pct: 44, color: '#2563eb' },
];

export default function FinancialsPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Financial Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Live cost control across the £50m capital programme</p>
        </div>
        <Badge variant="green">Cost Performance Index 1.06 · Under budget</Badge>
      </div>

      <div className="mb-6">
        <FGasCountdown />
      </div>

      {/* Summary tiles */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4">
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${s.tone}`}>
                <Icon className="h-[18px] w-[18px]" style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-black" style={{ color: s.color }}>
                <CountUp to={s.value} prefix="£" suffix="m" />
              </div>
              <p className="mt-1 text-xs font-medium text-slate-700">{s.label}</p>
              <p className="text-[11px] text-slate-400">{s.sub}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Forecast</CardTitle>
            <Badge variant="green">£3m saving</Badge>
          </CardHeader>
          <CardContent className="space-y-4 py-5">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">{b.label}</span>
                  <span className="text-sm font-bold" style={{ color: b.color }}>
                    {b.value}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 p-3">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-700">
                Forecast £3m saving driven by procurement &amp; design efficiencies across the estate.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend Profile</CardTitle>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Committed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Spend
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <SpendTrendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
