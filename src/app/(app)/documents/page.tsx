import {
  Camera,
  ClipboardList,
  FileText,
  HardHat,
  AlertTriangle,
  PoundSterling,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const docs = [
  { icon: Camera, label: 'Handover Photos', count: '2,847 files', color: '#7c3aed', bg: 'bg-violet-50' },
  { icon: ClipboardList, label: 'Snagging Register', count: '127 registers', color: '#d97706', bg: 'bg-amber-50' },
  { icon: FileText, label: 'Tender Documents', count: '254 packages', color: '#0891b2', bg: 'bg-cyan-50' },
  { icon: HardHat, label: 'Site Progress Reports', count: '1,032 reports', color: '#16a34a', bg: 'bg-emerald-50' },
  { icon: AlertTriangle, label: 'Risk Register', count: '412 registers', color: '#dc2626', bg: 'bg-red-50' },
  { icon: PoundSterling, label: 'Cost Reports', count: '508 reports', color: '#2563eb', bg: 'bg-blue-50' },
  { icon: MessageSquare, label: 'Meeting Minutes', count: '3,218 files', color: '#1a5b36', bg: 'bg-morrison-50' },
  { icon: BarChart3, label: 'Programme Reports', count: '97 reports', color: '#64748b', bg: 'bg-slate-100' },
];

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Document Hub</h1>
          <p className="mt-1 text-sm text-slate-500">Secure, centralised programme documentation · 7,963 total files</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {docs.map((doc) => {
          const Icon = doc.icon;
          return (
            <Card key={doc.label} className="group cursor-pointer p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${doc.bg}`}>
                <Icon className="h-5 w-5" style={{ color: doc.color }} />
              </div>
              <p className="text-sm font-bold text-slate-800">{doc.label}</p>
              <p className="mt-0.5 text-xs text-slate-400">{doc.count}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-morrison-600 opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Secure document storage · ISO 27001 compliant · Role-based access control · Full version history &amp; audit trail
      </p>
    </div>
  );
}
