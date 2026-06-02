'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Search, Bell, Download } from 'lucide-react';

const LABELS: Record<string, string> = {
  '/overview': 'Overview',
  '/stores': 'Store Register',
  '/map': 'Estate Map',
  '/programme': 'Delivery Funnel',
  '/financials': 'Financials',
  '/insights': 'AI Intelligence',
  '/sustainability': 'Sustainability',
  '/contractors': 'Contractors',
  '/documents': 'Document Hub',
  '/reports': 'Reports & Exports',
};

export function Topbar() {
  const pathname = usePathname();
  const current = LABELS[pathname] ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-14 flex-shrink-0 items-center gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur-sm">
      {/* Breadcrumbs */}
      <nav className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
        <Link href="/overview" className="truncate text-slate-500 transition-colors hover:text-slate-700">
          Refrigeration Transition Programme
        </Link>
        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
        <span className="truncate font-semibold text-slate-900">{current}</span>
      </nav>

      {/* Right actions */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <button className="flex w-52 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400 transition-all hover:border-slate-300 hover:bg-white">
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Search or ask…</span>
          <kbd className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">⌘K</kbd>
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
        </button>

        <button className="flex h-9 items-center gap-1.5 rounded-lg bg-morrison-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-morrison-700">
          <Download className="h-3.5 w-3.5" />
          Export
        </button>
      </div>
    </header>
  );
}
