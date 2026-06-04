import { Brain, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AI_INSIGHTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  WeatherRiskDiagram,
  SupplyChainFlow,
  ContractorCapacityHeatmap,
  ProgrammeSignalFeed,
  RiskTimeline,
} from '@/components/dashboard/ai-diagrams';

const severityConfig = {
  high: { border: 'border-red-200', bg: 'bg-red-50', icon: 'text-red-500', badge: 'red' as const },
  medium: { border: 'border-amber-200', bg: 'bg-amber-50', icon: 'text-amber-500', badge: 'amber' as const },
  low: { border: 'border-blue-200', bg: 'bg-blue-50', icon: 'text-blue-500', badge: 'blue' as const },
};

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
        {/* Live data-source signal strip */}
        <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
          {[
            { label: 'Supply Chain ERP', status: 'Connected' },
            { label: 'Weather Forecast API', status: 'Open-Meteo live' },
            { label: 'Contractor Capacity', status: 'Connected' },
            { label: 'Programme Data', status: 'Live' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-emerald-500" />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-700">{s.label}</p>
                <p className="text-[10px] text-emerald-600">{s.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bespoke intelligence diagrams */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeatherRiskDiagram />
        <SupplyChainFlow />
        <ContractorCapacityHeatmap />
        <ProgrammeSignalFeed />
      </div>
      <div className="mb-6">
        <RiskTimeline />
      </div>

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
