import Link from 'next/link';
import {
  Store,
  CheckCircle2,
  Construction,
  Ruler,
  Clock,
  TrendingUp,
  CalendarCheck,
  ShoppingCart,
  ArrowRight,
  Brain,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CountUp } from '@/components/dashboard/count-up';
import { FGasCountdown } from '@/components/dashboard/fgas-countdown';
import { CompletionTrendChart, StageDonutChart, SpendTrendChart } from '@/components/dashboard/charts';
import { PROGRAMME, HEALTH, AI_INSIGHTS, STORES, RAG_META, STAGE_META, StoreStage } from '@/lib/data';
import { cn } from '@/lib/utils';

const kpis = [
  { label: 'Total Stores', value: PROGRAMME.totalStores, icon: Store, color: '#2563eb', bg: 'bg-blue-50' },
  { label: 'Completed', value: PROGRAMME.completed, icon: CheckCircle2, color: '#16a34a', bg: 'bg-emerald-50' },
  { label: 'On Site', value: PROGRAMME.onSite, icon: Construction, color: '#d97706', bg: 'bg-amber-50' },
  { label: 'In Design', value: PROGRAMME.inDesign, icon: Ruler, color: '#7c3aed', bg: 'bg-violet-50' },
  { label: 'In Procurement', value: PROGRAMME.inProcurement, icon: ShoppingCart, color: '#0891b2', bg: 'bg-cyan-50' },
  { label: 'Yet to Start', value: PROGRAMME.notStarted, icon: Clock, color: '#64748b', bg: 'bg-slate-100' },
];

const severityIcon = {
  high: 'text-red-500',
  medium: 'text-amber-500',
  low: 'text-blue-500',
};

export default function OverviewPage() {
  const stageLegend = (Object.keys(STAGE_META) as StoreStage[]).map((s) => ({
    label: STAGE_META[s].label,
    color: STAGE_META[s].color,
    count: STORES.filter((st) => st.stage === s).length,
  }));

  const recent = STORES.filter((s) => s.stage === 'OnSite' || s.stage === 'AtRisk').slice(0, 6);

  return (
    <div className="p-6">
      {/* Title row */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Programme Overview</h1>
            <Badge variant="green">Active Programme</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            National Refrigeration Replacement &amp; Compliance Programme · Forecast completion {PROGRAMME.forecastCompletion}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Programme completion</p>
          <p className="text-2xl font-black text-morrison-600">
            <CountUp to={PROGRAMME.completionPct} suffix="%" />
          </p>
        </div>
      </div>

      {/* F-Gas banner */}
      <div className="mb-6">
        <FGasCountdown />
      </div>

      {/* KPI tiles */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-4">
              <div className={cn('mb-3 flex h-9 w-9 items-center justify-center rounded-lg', kpi.bg)}>
                <Icon className="h-4.5 w-4.5" style={{ color: kpi.color, width: 18, height: 18 }} />
              </div>
              <div className="text-2xl font-black tracking-tight" style={{ color: kpi.color }}>
                <CountUp to={kpi.value} />
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">{kpi.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Delivery Trajectory</CardTitle>
            <Badge variant="outline">Last 11 months</Badge>
          </CardHeader>
          <CardContent>
            <CompletionTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stores by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <StageDonutChart />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {stageLegend.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: l.color }} />
                  <span className="text-xs text-slate-500">{l.label}</span>
                  <span className="ml-auto text-xs font-bold text-slate-700">{l.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health + Spend */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Programme Health</CardTitle>
            <Badge variant="outline">RAG</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {HEALTH.map((h) => {
              const meta = RAG_META[h.status];
              return (
                <div key={h.label} className="flex items-center gap-3 rounded-lg bg-slate-50 p-2.5">
                  <span className="relative flex h-3 w-3 flex-shrink-0">
                    <span className="h-3 w-3 rounded-full" style={{ background: meta.color }} />
                    {h.status === 'Red' && (
                      <span className="absolute inset-0 rounded-full" style={{ background: meta.color, animation: 'pulse-ring 2s ease-out infinite' }} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-800">{h.label}</span>
                      <span className={cn('text-[10px] font-bold uppercase tracking-wide', meta.text)}>{meta.label}</span>
                    </div>
                    <p className="truncate text-xs text-slate-500">{h.note}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Spend Profile</CardTitle>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Committed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Spend to date
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <SpendTrendChart />
          </CardContent>
        </Card>
      </div>

      {/* AI insights + recent stores */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-morrison-600" />
              AI Programme Intelligence
            </CardTitle>
            <Link href="/insights" className="flex items-center gap-1 text-xs font-semibold text-morrison-600 hover:text-morrison-700">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {AI_INSIGHTS.slice(0, 3).map((insight, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <AlertTriangle className={cn('mt-0.5 h-4 w-4 flex-shrink-0', severityIcon[insight.severity])} />
                <div className="min-w-0">
                  <p className="text-xs leading-relaxed text-slate-700">{insight.text}</p>
                  <Badge variant={insight.severity === 'high' ? 'red' : 'amber'} className="mt-1.5">
                    {insight.tag}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active &amp; At-Risk Stores</CardTitle>
            <Link href="/stores" className="flex items-center gap-1 text-xs font-semibold text-morrison-600 hover:text-morrison-700">
              Full register <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recent.map((s) => {
              const meta = STAGE_META[s.stage];
              return (
                <Link
                  key={s.id}
                  href="/stores"
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 transition-colors hover:border-morrison-200 hover:bg-morrison-50"
                >
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: meta.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{s.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {s.id} · {s.contractor}
                    </p>
                  </div>
                  <span className={cn('flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold', meta.bg, meta.text)}>
                    {meta.label}
                  </span>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
