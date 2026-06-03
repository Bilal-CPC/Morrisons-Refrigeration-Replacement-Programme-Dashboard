'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Search,
  Bell,
  Download,
  AlertTriangle,
  PoundSterling,
  ShieldCheck,
  Clock,
  TrendingUp,
  Activity,
} from 'lucide-react';

const LABELS: Record<string, string> = {
  '/overview': 'Overview',
  '/stores': 'Site Register',
  '/map': 'Estate Map',
  '/programme': 'Delivery Funnel',
  '/financials': 'Financials',
  '/insights': 'AI Intelligence',
  '/sustainability': 'Sustainability',
  '/contractors': 'Contractors',
  '/documents': 'Document Hub',
  '/reports': 'Reports & Exports',
};

// PMO status indicators — always visible regardless of active page
const PMO_STATUS = [
  {
    icon: Activity,
    label: 'Schedule',
    value: 'Amber',
    detail: 'Northern region 2 wks behind',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    dot: 'bg-amber-500',
    border: 'border-amber-200',
  },
  {
    icon: PoundSterling,
    label: 'Cost',
    value: '£22m / £50m',
    detail: '£3m saving forecast',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
  },
  {
    icon: AlertTriangle,
    label: 'Risks',
    value: '3 Active',
    detail: '1 critical · 2 amber',
    color: 'text-red-700',
    bg: 'bg-red-50',
    dot: 'bg-red-500',
    border: 'border-red-200',
  },
  {
    icon: ShieldCheck,
    label: 'Safety',
    value: 'Green',
    detail: 'Zero reportable incidents',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
  },
  {
    icon: TrendingUp,
    label: 'Completion',
    value: '31%',
    detail: '127 of 412 sites',
    color: 'text-morrison-700',
    bg: 'bg-morrison-50',
    dot: 'bg-morrison-600',
    border: 'border-morrison-200',
  },
  {
    icon: Clock,
    label: 'F-Gas Deadline',
    value: '1,279 days',
    detail: '8 November 2029',
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    dot: 'bg-slate-400',
    border: 'border-slate-200',
  },
];

export function Topbar() {
  const pathname = usePathname();
  const current = LABELS[pathname] ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex-shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      {/* Row 1: breadcrumbs + search + actions */}
      <div className="flex h-13 items-center gap-4 px-6 py-2.5">
        <nav className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
          <Link href="/overview" className="truncate text-slate-400 transition-colors hover:text-slate-600">
            Morrisons Capital Programmes
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
          <Link href="/overview" className="truncate text-slate-400 transition-colors hover:text-slate-600">
            Refrigeration Replacement
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
          <span className="truncate font-semibold text-slate-900">{current}</span>
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button className="flex w-44 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400 transition-all hover:border-slate-300 hover:bg-white">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left text-xs">Search or ask…</span>
            <kbd className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">⌘K</kbd>
          </button>

          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          <button className="flex h-8 items-center gap-1.5 rounded-lg bg-morrison-600 px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-morrison-700">
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>

      {/* Row 2: PMO status strip — always visible */}
      <div className="flex items-stretch overflow-x-auto border-t border-slate-100 bg-slate-50/80">
        {PMO_STATUS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`flex flex-shrink-0 items-center gap-2 border-r border-slate-200 px-4 py-2 ${i === 0 ? 'border-l-0' : ''}`}
            >
              <span className={`h-2 w-2 flex-shrink-0 rounded-full ${s.dot}`} />
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{s.label}</span>
                  <span className={`text-xs font-bold ${s.color}`}>{s.value}</span>
                </div>
                <p className="text-[10px] text-slate-400">{s.detail}</p>
              </div>
            </div>
          );
        })}

        {/* Live indicator */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-1.5 px-4">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[10px] font-semibold text-slate-400">Live · Updated just now</span>
        </div>
      </div>
    </header>
  );
}
