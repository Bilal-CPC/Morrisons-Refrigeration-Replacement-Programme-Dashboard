const stages = [
  { label: 'Identification',  count: 412, color: '#1E293B' },
  { label: 'Feasibility',     count: 385, color: '#1A5B36' },
  { label: 'Design',          count: 341, color: '#2563EB' },
  { label: 'Tender',          count: 289, color: '#7C3AED' },
  { label: 'Award',           count: 254, color: '#0891B2' },
  { label: 'Construction',    count: 161, color: '#D97706' },
  { label: 'Commissioning',   count: 127, color: '#16A34A' },
  { label: 'Handover',        count: 127, color: '#16A34A' },
];

const MAX = stages[0].count;

export function DeliveryFunnel() {
  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Delivery Funnel</h2>
        <span className="section-label">Programme Stages</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1.5">
        {stages.map((stage, i) => {
          const pct = (stage.count / MAX) * 100;
          const prevCount = i > 0 ? stages[i - 1].count : stage.count;
          const dropped = prevCount - stage.count;

          return (
            <div key={stage.label} className="group">
              {/* Drop indicator */}
              {i > 0 && dropped > 0 && (
                <div className="flex items-center ml-[120px] mb-0.5">
                  <span className="text-xs text-slate-300 font-medium">↓</span>
                  <span className="text-xs text-slate-400 ml-1">-{dropped}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                {/* Stage label */}
                <div className="w-[112px] shrink-0 text-right">
                  <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {stage.label}
                  </span>
                </div>
                {/* Bar */}
                <div className="flex-1 h-7 bg-slate-100 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md flex items-center justify-end pr-2.5 bar-grow"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: stage.color,
                      animationDelay: `${i * 120}ms`,
                    }}
                  >
                    <span className="text-white text-xs font-bold">{stage.count}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">Conversion rate: Identification → Handover</span>
        <span className="text-sm font-bold text-emerald-600">
          {Math.round((stages[stages.length - 1].count / MAX) * 100)}%
        </span>
      </div>
    </div>
  );
}
