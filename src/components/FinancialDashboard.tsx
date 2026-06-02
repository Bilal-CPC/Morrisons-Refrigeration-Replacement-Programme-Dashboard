import { PoundSterling, TrendingDown, TrendingUp, Banknote, Receipt } from 'lucide-react';

interface FinRow {
  label: string;
  value: string;
  pct: number;
  color: string;
  icon: React.ElementType;
  sub?: string;
}

const rows: FinRow[] = [
  { label: 'Approved Budget',     value: '£50.0m', pct: 100,  color: '#1E293B', icon: PoundSterling, sub: 'Total approved programme budget' },
  { label: 'Forecast Final Cost', value: '£47.0m', pct: 94,   color: '#16A34A', icon: TrendingDown, sub: '£3.0m below budget — tracking well' },
  { label: 'Spend to Date',       value: '£22.0m', pct: 44,   color: '#2563EB', icon: Receipt,      sub: '44% of approved budget expended' },
  { label: 'Committed Spend',     value: '£34.0m', pct: 68,   color: '#D97706', icon: Banknote,     sub: 'Orders placed + site costs committed' },
  { label: 'Forecast Savings',    value: '£3.0m',  pct: 6,    color: '#16A34A', icon: TrendingUp,   sub: 'Procurement & design efficiencies' },
];

const summary = [
  { label: 'Budget', value: '£50m', sub: 'Approved' },
  { label: 'Forecast', value: '£47m', sub: 'Final Cost', positive: true },
  { label: 'Savings', value: '£3m', sub: 'Projected', positive: true },
  { label: 'Spent', value: '£22m', sub: 'To Date' },
];

export function FinancialDashboard() {
  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Financial Dashboard</h2>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          £3m Savings Forecast
        </span>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {summary.map(s => (
          <div key={s.label} className="text-center p-2.5 bg-slate-50 rounded-lg">
            <div className={`text-lg font-bold leading-none ${s.positive ? 'text-emerald-600' : 'text-slate-800'}`}>
              {s.value}
            </div>
            <div className="text-slate-400 text-xs mt-1">{s.sub}</div>
            <div className="text-slate-600 text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="flex-1 flex flex-col gap-3.5">
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <div key={row.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: row.color }} />
                  <span className="text-xs font-semibold text-slate-700">{row.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{row.pct}%</span>
                  <span className="text-sm font-bold" style={{ color: row.color }}>{row.value}</span>
                </div>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bar-grow"
                  style={{
                    width: `${row.pct}%`,
                    backgroundColor: row.color,
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              </div>
              {row.sub && (
                <p className="text-xs text-slate-400 mt-1">{row.sub}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">Cost Performance Index</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-emerald-600">1.06</span>
          <span className="text-xs text-slate-400">(Under budget)</span>
        </div>
      </div>
    </div>
  );
}
