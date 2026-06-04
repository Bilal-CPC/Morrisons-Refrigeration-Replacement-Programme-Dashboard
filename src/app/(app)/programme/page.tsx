import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FUNNEL, STORES, STAGE_VELOCITY } from '@/lib/data';
import { StageProgressionChart } from '@/components/dashboard/charts';

const MAX = FUNNEL[0].count;
const atRisk = STORES.filter((s) => s.stage === 'AtRisk').length;
const velColour = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500'];

export default function ProgrammePage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Delivery Funnel</h1>
        <p className="mt-1 text-sm text-slate-500">Projects flowing through every stage of the CPC delivery lifecycle</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Programme Stages</CardTitle>
            <Badge variant="outline">8 stages</Badge>
          </CardHeader>
          <CardContent className="space-y-2 py-6">
            {FUNNEL.map((stage, i) => {
              const pct = (stage.count / MAX) * 100;
              const dropped = i > 0 ? FUNNEL[i - 1].count - stage.count : 0;
              return (
                <div key={stage.stage}>
                  {i > 0 && dropped > 0 && (
                    <div className="mb-0.5 ml-[136px] flex items-center gap-1 text-xs text-slate-300">
                      ↓ <span className="text-slate-400">−{dropped}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="w-32 flex-shrink-0 text-right text-sm font-medium text-slate-600">{stage.stage}</span>
                    <div className="h-8 flex-1 overflow-hidden rounded-md bg-slate-100">
                      <div
                        className="flex h-full items-center justify-end rounded-md pr-3"
                        style={{ width: `${pct}%`, background: stage.color }}
                      >
                        <span className="text-sm font-bold text-white">{stage.count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-5xl font-black text-morrison-600">
                  {Math.round((FUNNEL[FUNNEL.length - 1].count / MAX) * 100)}%
                </p>
                <p className="mt-2 text-sm text-slate-500">Identification → Handover</p>
              </div>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                <Row label="Entered programme" value="412" />
                <Row label="Reached construction" value="161" />
                <Row label="Handed over" value="127" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Stage Velocity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {STAGE_VELOCITY.map((v, i) => {
                const slow = v.days > v.target;
                return (
                  <div key={v.stage}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{v.stage}</span>
                      <span className={slow ? 'font-bold text-amber-600' : 'font-bold text-slate-700'}>
                        {v.days}d {slow ? `(+${v.days - v.target} vs target)` : '(on target)'}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${velColour[i]}`} style={{ width: `${(v.days / 80) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stage progression over time + bottleneck overlay */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stage Progression Over Time</CardTitle>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> In design+</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Construction+</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Handed over</span>
            </div>
          </CardHeader>
          <CardContent><StageProgressionChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Bottlenecks &amp; Risk</CardTitle></CardHeader>
          <CardContent className="space-y-3 py-5">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-bold text-amber-700">Slowest transition</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-700">Award → Construction</p>
              <p className="text-[11px] text-amber-600">35 days avg · 7 days over target — contractor mobilisation</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-bold text-red-700">{atRisk} stores at risk of stage delay</p>
              <p className="mt-0.5 text-[11px] text-red-600">Supply-chain &amp; resource pressure in the Northern region</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Largest drop-off is Tender → Construction (128 sites still upstream) — the focus for acceleration.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}
