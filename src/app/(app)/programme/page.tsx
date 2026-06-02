import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FUNNEL } from '@/lib/data';

const MAX = FUNNEL[0].count;

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
              {[
                { stage: 'Design → Tender', days: 42, color: 'bg-blue-500' },
                { stage: 'Tender → Award', days: 28, color: 'bg-violet-500' },
                { stage: 'Award → Construction', days: 35, color: 'bg-amber-500' },
                { stage: 'Construction → Handover', days: 72, color: 'bg-emerald-500' },
              ].map((v) => (
                <div key={v.stage}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{v.stage}</span>
                    <span className="font-bold text-slate-700">{v.days} days avg</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${v.color}`} style={{ width: `${(v.days / 80) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
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
