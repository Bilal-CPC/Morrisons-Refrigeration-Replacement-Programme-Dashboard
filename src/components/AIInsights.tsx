import { Brain, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Insight {
  severity: 'high' | 'medium' | 'low';
  text: string;
  tag: string;
  stores?: number;
}

const insights: Insight[] = [
  {
    severity: 'high',
    text: 'Supply chain pressure identified in Northern Region — compressor unit lead times extended to 6 weeks. 12 upcoming project starts at risk.',
    tag: 'Supply Chain',
    stores: 12,
  },
  {
    severity: 'high',
    text: 'Contractor resource availability risk affecting 12 stores in Yorkshire and Humber region. Recommend proactive subcontractor engagement.',
    tag: 'Resource',
    stores: 12,
  },
  {
    severity: 'medium',
    text: 'Temporary refrigeration requirements likely to increase overall programme cost by £1.2m. 8 stores currently using hire units beyond planned duration.',
    tag: 'Cost Risk',
    stores: 8,
  },
  {
    severity: 'high',
    text: 'Store MRS-147 (Hull Bransholme) forecast to exceed planned completion date by 3 weeks. HV isolation works overrunning — escalation recommended.',
    tag: 'Programme Risk',
    stores: 1,
  },
  {
    severity: 'medium',
    text: 'Weather modelling indicates elevated risk of cold snap in Scotland Q4 2026, potentially affecting 7 stores in commissioning phase. Contingency planning advised.',
    tag: 'Weather Signal',
    stores: 7,
  },
];

const severityConfig = {
  high:   { border: 'border-red-200',    bg: 'bg-red-50',    icon: 'text-red-500',    badge: 'bg-red-100 text-red-700'    },
  medium: { border: 'border-amber-200',  bg: 'bg-amber-50',  icon: 'text-amber-500',  badge: 'bg-amber-100 text-amber-700' },
  low:    { border: 'border-blue-200',   bg: 'bg-blue-50',   icon: 'text-blue-500',   badge: 'bg-blue-100 text-blue-700'   },
};

export function AIInsights() {
  return (
    <div className="card overflow-hidden">
      {/* Dark header */}
      <div className="grain-overlay px-5 py-4" style={{ background: '#0D1F2D' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FFC72C' }}>
              <Brain className="w-4 h-4" style={{ color: '#0D1F2D' }} />
            </div>
            <div>
              <h2 className="text-white font-bold text-base leading-none">AI Programme Intelligence</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Powered by CPC Systems AI · Integrating contractor ERP data, weather APIs &amp; supply chain signals
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <RefreshCw className="w-3 h-3" />
              <span>Updated 14 min ago</span>
            </div>
            <button
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: '#FFC72C', color: '#0D1F2D' }}
            >
              <Zap className="w-3 h-3" />
              Generate Full Risk Report
            </button>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-3">
          {insights.map((insight, i) => {
            const cfg = severityConfig[insight.severity];
            return (
              <div
                key={i}
                className={cn('flex gap-3 p-3.5 rounded-xl border transition-all hover:shadow-sm card-in', cfg.border, cfg.bg)}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <AlertTriangle className={cn('w-4 h-4 shrink-0 mt-0.5', cfg.icon)} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-relaxed">{insight.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', cfg.badge)}>
                      {insight.tag}
                    </span>
                    {insight.stores && insight.stores > 0 && (
                      <span className="text-xs text-slate-500">
                        {insight.stores} store{insight.stores !== 1 ? 's' : ''} affected
                      </span>
                    )}
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mt-0.5">
                  <span>Detail</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer bar */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-800 text-white">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-sm font-semibold">3 stores auto-flagged for PM intervention</span>
          </div>
          <button className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
            View all flagged stores <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
