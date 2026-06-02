import { Leaf, Zap, PoundSterling, Store } from 'lucide-react';

const metrics = [
  {
    icon: Leaf,
    value: '18,700',
    unit: 'tCO₂e',
    label: 'Carbon Saved',
    sub: 'vs. legacy R404a systems',
    color: '#16A34A',
    bg: '#F0FDF4',
  },
  {
    icon: Zap,
    value: '12%',
    unit: '',
    label: 'Energy Reduction',
    sub: 'Average per converted store',
    color: '#CA8A04',
    bg: '#FEFCE8',
  },
  {
    icon: PoundSterling,
    value: '£7.3m',
    unit: '',
    label: 'Annual Cost Saving',
    sub: 'Projected energy bill reduction',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: Store,
    value: '127',
    unit: '/ 412',
    label: 'Stores Converted',
    sub: '31% of estate transitioned',
    color: '#1A5B36',
    bg: '#F0FDF4',
    progress: 31,
  },
];

export function SustainabilityPanel() {
  return (
    <div className="card p-5 flex flex-col h-full" style={{ borderTop: '3px solid #16A34A' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <h2 className="section-title">Carbon &amp; Sustainability</h2>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          On Target
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-xl p-3.5 card-hover"
              style={{ backgroundColor: m.bg }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5"
                style={{ backgroundColor: m.color + '20' }}
              >
                <Icon className="w-4 h-4" style={{ color: m.color }} />
              </div>
              <div className="text-xl font-bold leading-none" style={{ color: m.color }}>
                {m.value}
                {m.unit && <span className="text-sm font-medium ml-0.5">{m.unit}</span>}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">{m.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{m.sub}</div>
              {m.progress !== undefined && (
                <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.progress}%`, backgroundColor: m.color }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 leading-relaxed">
          All replacement units comply with EU F-Gas Regulation. Programme aligned to Morrisons Net Zero 2035 commitment.
        </p>
      </div>
    </div>
  );
}
