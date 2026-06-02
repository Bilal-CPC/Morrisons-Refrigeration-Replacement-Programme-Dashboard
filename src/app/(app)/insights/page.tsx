import { Brain, AlertTriangle, ArrowRight, Zap, RefreshCw, CloudRain, Truck, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AI_INSIGHTS } from '@/lib/data';
import { cn } from '@/lib/utils';

const severityConfig = {
  high: { border: 'border-red-200', bg: 'bg-red-50', icon: 'text-red-500', badge: 'red' as const },
  medium: { border: 'border-amber-200', bg: 'bg-amber-50', icon: 'text-amber-500', badge: 'amber' as const },
  low: { border: 'border-blue-200', bg: 'bg-blue-50', icon: 'text-blue-500', badge: 'blue' as const },
};

const sources = [
  { icon: Truck, label: 'Supply Chain ERP', status: 'Connected' },
  { icon: CloudRain, label: 'Weather Forecast API', status: 'Connected' },
  { icon: Users, label: 'Contractor Capacity', status: 'Connected' },
  { icon: Brain, label: 'Programme Data', status: 'Live' },
];

export default function InsightsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">AI Programme Intelligence</h1>
        <p className="mt-1 text-sm text-slate-500">
          Hidden AI integrating supply-chain, weather and programme signals to surface risk before it hits the critical path
        </p>
      </div>

      {/* Dark hero panel */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4" style={{ background: '#0a2417' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: '#ffc72c' }}>
              <Brain className="h-4.5 w-4.5" style={{ color: '#0a2417', width: 18, height: 18 }} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">CPC Systems AI</h2>
              <p className="text-xs text-white/50">Integrating contractor ERP, weather APIs &amp; supply-chain signals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <RefreshCw className="h-3 w-3" /> Updated 14 min ago
            </div>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ background: '#ffc72c', color: '#0a2417' }}>
              <Zap className="h-3 w-3" /> Generate Full Risk Report
            </button>
          </div>
        </div>
        {/* Data sources */}
        <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
          {sources.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <Icon className="h-4 w-4 text-morrison-600" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-700">{s.label}</p>
                  <p className="flex items-center gap-1 text-[10px] text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {s.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Insights list */}
      <div className="grid grid-cols-1 gap-3">
        {AI_INSIGHTS.map((insight, i) => {
          const cfg = severityConfig[insight.severity];
          return (
            <div key={i} className={cn('flex gap-3 rounded-xl border p-4 transition-shadow hover:shadow-sm', cfg.border, cfg.bg)}>
              <AlertTriangle className={cn('mt-0.5 h-4 w-4 flex-shrink-0', cfg.icon)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-slate-700">{insight.text}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={cfg.badge}>{insight.tag}</Badge>
                  <span className="text-xs text-slate-500">
                    {insight.stores} store{insight.stores !== 1 ? 's' : ''} affected
                  </span>
                </div>
              </div>
              <button className="mt-0.5 flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900">
                Detail <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-800 p-4 text-white">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
          <span className="text-sm font-semibold">3 stores auto-flagged for PM intervention</span>
        </div>
        <button className="flex items-center gap-1 text-xs text-white/60 transition-colors hover:text-white">
          View all flagged stores <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
