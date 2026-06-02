import { X, CheckCircle2, Circle, AlertCircle, MapPin, Calendar, PoundSterling, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store } from '@/data/stores';
import { cn } from '@/lib/utils';

interface StoreDetailPanelProps {
  store: Store | null;
  onClose: () => void;
}

const statusColors = {
  Green: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', dot: 'bg-emerald-500' },
  Amber: { bg: 'bg-amber-100',   text: 'text-amber-700',   border: 'border-amber-300',   dot: 'bg-amber-500'   },
  Red:   { bg: 'bg-red-100',     text: 'text-red-700',     border: 'border-red-300',     dot: 'bg-red-500'     },
};

const stageColors: Record<string, string> = {
  Complete: '#16A34A', OnSite: '#D97706', Design: '#2563EB',
  Procurement: '#7C3AED', AtRisk: '#DC2626', NotStarted: '#94A3B8',
};

function fmt(n: number) {
  return '£' + (n / 1000).toFixed(0) + 'k';
}

export function StoreDetailPanel({ store, onClose }: StoreDetailPanelProps) {
  return (
    <AnimatePresence>
      {store && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col overflow-y-auto"
            initial={{ x: 440 }}
            animate={{ x: 0 }}
            exit={{ x: 440 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            {/* Header */}
            <div className="grain-overlay px-5 py-4 shrink-0" style={{ background: '#0D1F2D' }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">{store.id}</span>
                    <div
                      className={cn(
                        'text-xs font-bold px-2 py-0.5 rounded-full border',
                        statusColors[store.status].bg,
                        statusColors[store.status].text,
                        statusColors[store.status].border,
                      )}
                    >
                      {store.status}
                    </div>
                  </div>
                  <h2 className="text-white font-bold text-lg leading-tight">Morrisons {store.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400 text-xs">{store.city}</span>
                    <span className="text-slate-600 mx-1">·</span>
                    <div
                      className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: stageColors[store.stage] ?? '#94A3B8' }}
                    >
                      {store.stage === 'NotStarted' ? 'Not Started' : store.stage === 'OnSite' ? 'On Site' : store.stage}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors p-1 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-5">
              {/* Budget vs Forecast */}
              <section>
                <h3 className="section-label mb-3">Financial Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <PoundSterling className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500">Budget</span>
                    </div>
                    <div className="text-xl font-bold text-slate-800">{fmt(store.budget)}</div>
                  </div>
                  <div className={cn('rounded-xl p-3.5', store.forecast <= store.budget ? 'bg-emerald-50' : 'bg-red-50')}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <PoundSterling className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500">Forecast</span>
                    </div>
                    <div className={cn('text-xl font-bold', store.forecast <= store.budget ? 'text-emerald-700' : 'text-red-700')}>
                      {fmt(store.forecast)}
                    </div>
                    <div className={cn('text-xs font-semibold mt-0.5', store.forecast <= store.budget ? 'text-emerald-600' : 'text-red-600')}>
                      {store.forecast <= store.budget
                        ? `£${((store.budget - store.forecast) / 1000).toFixed(0)}k saving`
                        : `£${((store.forecast - store.budget) / 1000).toFixed(0)}k overrun`}
                    </div>
                  </div>
                </div>
              </section>

              {/* Timeline */}
              <section>
                <h3 className="section-label mb-3">Timeline</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Start Date', value: store.start },
                    { label: 'Completion', value: store.completion },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-slate-500 font-medium">{item.label}</div>
                        <div className="text-sm font-semibold text-slate-800 mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Milestones */}
              <section>
                <h3 className="section-label mb-3">Milestones</h3>
                <div className="flex flex-col gap-2">
                  {store.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {m.done ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" style={{ width: 18, height: 18 }} />
                      ) : m.active ? (
                        <AlertCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 animate-pulse" style={{ width: 18, height: 18 }} />
                      ) : (
                        <Circle className="w-4.5 h-4.5 text-slate-300 shrink-0" style={{ width: 18, height: 18 }} />
                      )}
                      <span className={cn(
                        'text-sm',
                        m.done ? 'text-slate-700 line-through' : m.active ? 'text-amber-700 font-semibold' : 'text-slate-400'
                      )}>
                        {m.label}
                      </span>
                      {m.active && (
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 ml-auto">
                          In Progress
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Risks */}
              {store.risks.length > 0 && (
                <section>
                  <h3 className="section-label mb-3">Key Risks</h3>
                  <div className="flex flex-col gap-2">
                    {store.risks.map((risk, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-100">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-red-700">{risk}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Project Team */}
              <section>
                <h3 className="section-label mb-3">Project Team</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { role: 'Project Manager', person: store.team.pm },
                    { role: 'Contractor',       person: store.team.contractor },
                    { role: 'Designer',         person: store.team.designer },
                  ].map(item => (
                    <div key={item.role} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-xs text-slate-500 font-medium">{item.role}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                          <Users className="w-3 h-3 text-slate-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{item.person}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
