'use client';

import { useMemo, useState } from 'react';
import {
  Camera,
  ClipboardList,
  FileText,
  HardHat,
  AlertTriangle,
  PoundSterling,
  MessageSquare,
  BarChart3,
  Search,
  Download,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DOCUMENT_FILES, type DocType } from '@/lib/data';
import { cn } from '@/lib/utils';

const docCats: { icon: React.ElementType; label: string; count: string; color: string; bg: string; type: DocType }[] = [
  { icon: Camera, label: 'Handover Photos', count: '2,847 files', color: '#7c3aed', bg: 'bg-violet-50', type: 'Handover' },
  { icon: ClipboardList, label: 'Snagging Register', count: '127 registers', color: '#d97706', bg: 'bg-amber-50', type: 'Snagging' },
  { icon: FileText, label: 'Tender Documents', count: '254 packages', color: '#0891b2', bg: 'bg-cyan-50', type: 'Tender' },
  { icon: HardHat, label: 'Site Progress Reports', count: '1,032 reports', color: '#16a34a', bg: 'bg-emerald-50', type: 'Progress' },
  { icon: AlertTriangle, label: 'Risk Register', count: '412 registers', color: '#dc2626', bg: 'bg-red-50', type: 'Risk' },
  { icon: PoundSterling, label: 'Cost Reports', count: '508 reports', color: '#2563eb', bg: 'bg-blue-50', type: 'Cost' },
  { icon: MessageSquare, label: 'Meeting Minutes', count: '3,218 files', color: '#1a5b36', bg: 'bg-morrison-50', type: 'Minutes' },
  { icon: BarChart3, label: 'Programme Reports', count: '97 reports', color: '#64748b', bg: 'bg-slate-100', type: 'Report' },
];

const typeBadge: Record<DocType, string> = {
  Handover: 'bg-violet-100 text-violet-700',
  Snagging: 'bg-amber-100 text-amber-700',
  Tender: 'bg-cyan-100 text-cyan-700',
  Progress: 'bg-emerald-100 text-emerald-700',
  Risk: 'bg-red-100 text-red-700',
  Cost: 'bg-blue-100 text-blue-700',
  Minutes: 'bg-morrison-100 text-morrison-700',
  Report: 'bg-slate-100 text-slate-600',
};

export default function DocumentsPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<DocType | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCUMENT_FILES.filter((d) => {
      if (type && d.type !== type) return false;
      if (!q) return true;
      return [d.name, d.store, d.contractor, d.id].some((f) => f.toLowerCase().includes(q));
    });
  }, [query, type]);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Document Hub</h1>
          <p className="mt-1 text-sm text-slate-500">Secure, centralised programme documentation · 7,963 total files</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, stores, contractors…"
            className="w-72 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-morrison-400"
          />
        </div>
      </div>

      {/* Category quick-filter tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {docCats.map((doc) => {
          const Icon = doc.icon;
          const active = type === doc.type;
          return (
            <button
              key={doc.label}
              onClick={() => setType(active ? null : doc.type)}
              className={cn(
                'rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md',
                active ? 'border-morrison-300 bg-morrison-50 shadow-sm' : 'border-slate-200 bg-white',
              )}
            >
              <div className={cn('mb-2 flex h-9 w-9 items-center justify-center rounded-lg', doc.bg)}>
                <Icon className="h-4 w-4" style={{ color: doc.color }} />
              </div>
              <p className="truncate text-xs font-bold text-slate-800">{doc.label}</p>
              <p className="mt-0.5 text-[10px] text-slate-400">{doc.count}</p>
            </button>
          );
        })}
      </div>

      {/* Document list */}
      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h3 className="text-sm font-bold text-slate-900">
            Recent documents {type && <span className="text-slate-400">· {type}</span>}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{filtered.length} shown</span>
            {(type || query) && (
              <button onClick={() => { setType(null); setQuery(''); }} className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900">
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_90px_140px_90px_70px_36px] gap-2 border-b border-slate-100 bg-slate-50 px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>Document</span>
          <span>Type</span>
          <span>Store</span>
          <span>Date</span>
          <span className="text-right">Size</span>
          <span />
        </div>
        <div className="divide-y divide-slate-50">
          {filtered.map((d) => (
            <div key={d.id} className="grid grid-cols-[1fr_90px_140px_90px_70px_36px] items-center gap-2 px-5 py-3 hover:bg-slate-50">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{d.name}</p>
                <p className="text-[10px] text-slate-400">{d.id} · {d.version} · {d.contractor}</p>
              </div>
              <span className={cn('w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold', typeBadge[d.type])}>{d.type}</span>
              <span className="truncate text-xs text-slate-500">{d.store}</span>
              <span className="text-xs text-slate-500">{d.date}</span>
              <span className="text-right text-xs text-slate-400">{d.size}</span>
              <button className="flex justify-center text-slate-300 hover:text-morrison-600"><Download className="h-3.5 w-3.5" /></button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-slate-400">No documents match your search.</p>
          )}
        </div>
      </Card>

      <p className="mt-4 text-xs text-slate-400">
        Secure document storage · ISO 27001 compliant · Role-based access control · Full version history &amp; audit trail
      </p>
    </div>
  );
}
