import { cn } from '@/lib/utils';

type RAGStatus = 'green' | 'amber' | 'red';

interface HealthItem {
  label: string;
  status: RAGStatus;
  note: string;
}

const items: HealthItem[] = [
  { label: 'Safety', status: 'green', note: 'Zero reportable incidents this period' },
  { label: 'Programme', status: 'amber', note: 'Northern region 2 wks behind plan' },
  { label: 'Cost', status: 'green', note: 'Forecast savings of £3m maintained' },
  { label: 'Risk', status: 'amber', note: '3 stores escalated for intervention' },
  { label: 'Sustainability', status: 'green', note: '18,700 tCO₂e saved to date' },
  { label: 'Supply Chain', status: 'red', note: 'Compressor units: 6-week lead time' },
];

const statusConfig: Record<RAGStatus, { bg: string; ring: string; pulse: string; text: string; label: string }> = {
  green:  { bg: '#16A34A', ring: '#BBF7D0', pulse: 'pulse-dot-green',  text: 'text-emerald-700', label: 'On Track'  },
  amber:  { bg: '#D97706', ring: '#FDE68A', pulse: 'pulse-dot-amber',  text: 'text-amber-700',   label: 'Attention' },
  red:    { bg: '#DC2626', ring: '#FECACA', pulse: 'pulse-dot-red',    text: 'text-red-700',     label: 'At Risk'   },
};

export function ProgrammeHealth() {
  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Programme Health</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
          RAG Status
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 flex-1">
        {items.map(item => {
          const cfg = statusConfig[item.status];
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              {/* Pulsing dot */}
              <div className="relative shrink-0">
                <div
                  className={cn('w-3.5 h-3.5 rounded-full relative', cfg.pulse)}
                  style={{ backgroundColor: cfg.bg }}
                />
              </div>

              {/* Label + note */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                  <span
                    className={cn('text-xs font-bold uppercase tracking-wide shrink-0', cfg.text)}
                    style={{ fontSize: '10px' }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{item.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
        {(['green', 'amber', 'red'] as RAGStatus[]).map(s => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusConfig[s].bg }} />
            <span className="text-xs text-slate-500">{statusConfig[s].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
