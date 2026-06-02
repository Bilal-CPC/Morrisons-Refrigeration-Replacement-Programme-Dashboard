import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CONTRACTORS } from '@/lib/data';
import { cn } from '@/lib/utils';

const rankColour = [
  'bg-gold-500 text-morrison-900',
  'bg-slate-300 text-slate-700',
  'bg-amber-600 text-white',
];

export default function ContractorsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Contractor Performance</h1>
        <p className="mt-1 text-sm text-slate-500">Delivery partner league table — ranked by on-time delivery</p>
      </div>

      {/* Summary tiles */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Active Contractors', value: '6', color: 'text-slate-800' },
          { label: 'Avg On-Time', value: '89%', color: 'text-emerald-600' },
          { label: 'Top Performer', value: 'Contractor A', color: 'text-morrison-600', small: true },
          { label: 'Under Review', value: '2', color: 'text-red-600' },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className={cn('font-black', s.small ? 'text-lg' : 'text-2xl', s.color)}>{s.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-gold-500" /> League Table
          </CardTitle>
          <Badge variant="outline">2025–26 season</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-[50px_1fr_90px_90px_110px_90px] gap-3 border-b border-slate-100 bg-slate-50 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span className="text-center">Rank</span>
            <span>Contractor</span>
            <span className="text-center">Stores</span>
            <span className="text-right">On Time</span>
            <span className="text-right">Cost Var.</span>
            <span className="text-center">Status</span>
          </div>
          <div className="divide-y divide-slate-50">
            {CONTRACTORS.map((c) => {
              const isTop = c.rank === 1;
              const statusVariant = c.onTime >= 90 ? 'green' : c.onTime >= 80 ? 'amber' : 'red';
              const statusLabel = c.onTime >= 90 ? 'Excellent' : c.onTime >= 80 ? 'Good' : 'Review';
              return (
                <div
                  key={c.rank}
                  className={cn('grid grid-cols-[50px_1fr_90px_90px_110px_90px] items-center gap-3 px-5 py-3.5', isTop && 'bg-morrison-50')}
                >
                  <span className="flex justify-center">
                    {c.rank <= 3 ? (
                      <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-black', rankColour[c.rank - 1])}>
                        {c.rank}
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-slate-400">{c.rank}</span>
                    )}
                  </span>
                  <span className={cn('text-sm font-bold', isTop ? 'text-morrison-800' : 'text-slate-800')}>{c.name}</span>
                  <span className="text-center text-sm font-semibold text-slate-600">{c.stores}</span>
                  <span className={cn('text-right text-sm font-bold', c.onTime >= 90 ? 'text-emerald-600' : c.onTime >= 80 ? 'text-amber-600' : 'text-red-600')}>
                    {c.onTime}%
                  </span>
                  <span className="flex items-center justify-end gap-1">
                    {c.costVariance < 0 ? (
                      <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                    ) : c.costVariance === 0 ? (
                      <Minus className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <TrendingUp className="h-3.5 w-3.5 text-red-400" />
                    )}
                    <span className={cn('text-sm font-semibold', c.costVariance < 0 ? 'text-emerald-600' : c.costVariance > 5 ? 'text-red-600' : 'text-amber-600')}>
                      {c.costVariance > 0 ? '+' : ''}
                      {c.costVariance}%
                    </span>
                  </span>
                  <span className="flex justify-center">
                    <Badge variant={statusVariant}>{statusLabel}</Badge>
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <p className="mt-3 text-xs text-slate-400">
        Ranked by on-time delivery performance. Cost variance measured against agreed contract sum across all assigned stores.
      </p>
    </div>
  );
}
