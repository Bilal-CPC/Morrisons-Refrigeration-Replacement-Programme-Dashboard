import { FileBarChart, Download, FileText, Calendar, Building2, Leaf, PoundSterling } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RegionBarChart } from '@/components/dashboard/charts';

const reports = [
  { icon: Building2, label: 'Monthly Programme Board Pack', desc: 'Full executive summary across all 412 stores', updated: 'Generated 2 days ago', pages: 24 },
  { icon: PoundSterling, label: 'Cost & Commitment Report', desc: 'Spend, committed cost and forecast vs budget', updated: 'Generated 2 days ago', pages: 18 },
  { icon: Leaf, label: 'Carbon & Sustainability Report', desc: 'F-Gas compliance and Net Zero progress', updated: 'Generated 1 week ago', pages: 12 },
  { icon: FileText, label: 'Risk & Intervention Summary', desc: 'AI-flagged risks and mitigation actions', updated: 'Generated 14 min ago', pages: 9 },
];

export default function ReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Reports &amp; Exports</h1>
        <p className="mt-1 text-sm text-slate-500">One-click, board-ready reporting — always current, always on brand</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {reports.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.label} className="flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-morrison-50">
                  <Icon className="h-5 w-5 text-morrison-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">{r.label}</p>
                  <p className="truncate text-xs text-slate-500">{r.desc}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="h-3 w-3" /> {r.updated} · {r.pages} pages
                  </div>
                </div>
                <button className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-morrison-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-morrison-700">
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-4 w-4 text-morrison-600" /> Delivery by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegionBarChart />
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600" /> Complete
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> In Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-300" /> Not Started
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100">
            <Badge variant="gold">AI</Badge>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Custom Report Builder</p>
            <p className="text-xs text-slate-500">Ask the AI to assemble any view — &quot;show me all at-risk stores in the North over budget&quot;</p>
          </div>
        </div>
        <button className="rounded-lg bg-morrison-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-morrison-700">
          Build a report
        </button>
      </Card>
    </div>
  );
}
