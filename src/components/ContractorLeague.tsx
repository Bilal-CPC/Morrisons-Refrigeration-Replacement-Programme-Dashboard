import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Contractor {
  rank: number;
  name: string;
  stores: number;
  onTime: number;
  costVariance: number;
}

const contractors: Contractor[] = [
  { rank: 1, name: 'Contractor A', stores: 42, onTime: 96, costVariance: -2.1 },
  { rank: 2, name: 'Contractor C', stores: 29, onTime: 92, costVariance: -0.8 },
  { rank: 3, name: 'Contractor B', stores: 35, onTime: 89, costVariance: +1.2 },
  { rank: 4, name: 'Contractor D', stores: 12, onTime: 83, costVariance: +3.5 },
  { rank: 5, name: 'Contractor E', stores: 8,  onTime: 75, costVariance: +5.8 },
  { rank: 6, name: 'Contractor F', stores: 1,  onTime: 0,  costVariance: +12.4 },
];

const rankBadge = ['🥇', '🥈', '🥉'];

export function ContractorLeague() {
  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h2 className="section-title">Contractor Performance</h2>
        </div>
        <span className="section-label">League Table</span>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-[28px_1fr_40px_52px_64px] gap-2 px-2 mb-2">
        <span className="section-label text-center">#</span>
        <span className="section-label">Contractor</span>
        <span className="section-label text-center">Jobs</span>
        <span className="section-label text-right">On Time</span>
        <span className="section-label text-right">Cost Var.</span>
      </div>

      <div className="flex-1 flex flex-col gap-1.5">
        {contractors.map(c => {
          const isTop = c.rank === 1;
          return (
            <div
              key={c.rank}
              className={cn(
                'grid grid-cols-[28px_1fr_40px_52px_64px] gap-2 items-center px-2 py-2.5 rounded-xl border card-hover',
                isTop ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-transparent hover:border-slate-200'
              )}
            >
              <span className="text-center text-sm">
                {c.rank <= 3 ? rankBadge[c.rank - 1] : <span className="text-slate-400 font-bold text-xs">{c.rank}</span>}
              </span>
              <div>
                <div className={cn('text-xs font-bold', isTop ? 'text-emerald-800' : 'text-slate-800')}>
                  {c.name}
                </div>
              </div>
              <span className="text-center text-xs font-semibold text-slate-600">{c.stores}</span>
              <div className="text-right">
                <span className={cn('text-xs font-bold', c.onTime >= 90 ? 'text-emerald-600' : c.onTime >= 80 ? 'text-amber-600' : 'text-red-600')}>
                  {c.onTime}%
                </span>
              </div>
              <div className="flex items-center justify-end gap-1">
                {c.costVariance < 0 ? (
                  <TrendingDown className="w-3 h-3 text-emerald-500" />
                ) : c.costVariance === 0 ? (
                  <Minus className="w-3 h-3 text-slate-400" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-red-400" />
                )}
                <span className={cn(
                  'text-xs font-semibold',
                  c.costVariance < 0 ? 'text-emerald-600' : c.costVariance > 5 ? 'text-red-600' : 'text-amber-600'
                )}>
                  {c.costVariance > 0 ? '+' : ''}{c.costVariance}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          Ranked by on-time delivery. Cost variance vs. agreed contract sum.
        </p>
      </div>
    </div>
  );
}
