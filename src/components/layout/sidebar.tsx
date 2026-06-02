'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Map,
  GitBranch,
  PoundSterling,
  Brain,
  Leaf,
  Trophy,
  FolderOpen,
  FileBarChart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronsUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoFull } from '@/components/logo';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  ai?: boolean;
}

const navItems: NavItem[] = [
  { href: '/overview', label: 'Overview', icon: LayoutDashboard },
  { href: '/stores', label: 'Store Register', icon: Store, badge: 412 },
  { href: '/map', label: 'Estate Map', icon: Map },
  { href: '/programme', label: 'Delivery Funnel', icon: GitBranch },
  { href: '/financials', label: 'Financials', icon: PoundSterling },
  { href: '/insights', label: 'AI Intelligence', icon: Brain, ai: true },
  { href: '/sustainability', label: 'Sustainability', icon: Leaf },
  { href: '/contractors', label: 'Contractors', icon: Trophy },
  { href: '/documents', label: 'Document Hub', icon: FolderOpen },
  { href: '/reports', label: 'Reports & Exports', icon: FileBarChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col overflow-hidden border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-4 py-4">
        <Link href="/">
          <LogoFull variant="light" />
        </Link>
      </div>

      {/* Programme selector */}
      <div className="border-b border-slate-200 px-4 py-3">
        <button className="flex w-full items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100">
          <div className="min-w-0">
            <div className="truncate">Refrigeration Transition</div>
            <div className="truncate text-[11px] font-normal text-slate-400">National Programme · 2025–29</div>
          </div>
          <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-slate-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-morrison-600 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {isActive && <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-morrison-700" />}
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    'flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-gold-500 text-morrison-900',
                  )}
                >
                  {item.badge}
                </span>
              )}
              {item.ai && (
                <span className="flex-shrink-0 rounded-full bg-gold-100 px-2 py-0.5 text-xs font-bold text-gold-600">AI</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-1 border-t border-slate-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
          <HelpCircle className="h-4 w-4" />
          <span>Help & Docs</span>
        </button>
      </div>

      {/* User profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-morrison-600 text-sm font-bold text-white">
            BJ
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">Bilal Jamil</p>
            <p className="truncate text-xs text-slate-500">Programme Director, CPC</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </Link>
      </div>
    </aside>
  );
}
