'use client';

import { useState } from 'react';
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
  Check,
  Plus,
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
  { href: '/stores', label: 'Site Register', icon: Store, badge: 412 },
  { href: '/map', label: 'Estate Map', icon: Map },
  { href: '/programme', label: 'Delivery Funnel', icon: GitBranch },
  { href: '/financials', label: 'Financials', icon: PoundSterling },
  { href: '/insights', label: 'AI Intelligence', icon: Brain, ai: true },
  { href: '/sustainability', label: 'Sustainability', icon: Leaf },
  { href: '/contractors', label: 'Contractors', icon: Trophy },
  { href: '/documents', label: 'Document Hub', icon: FolderOpen },
  { href: '/reports', label: 'Reports & Exports', icon: FileBarChart },
];

const PROGRAMMES = [
  { id: 'refrig', label: 'Refrigeration Replacement', subtitle: 'National · 412 sites · 2025–29', live: true },
  { id: 'refresh', label: 'Store Refresh & Refit', subtitle: 'Phased rollout · 2026–30', live: false },
  { id: 'energy', label: 'Energy & LED Transition', subtitle: 'Estate-wide · 2027–31', live: false },
  { id: 'hvac', label: 'HVAC Compliance', subtitle: 'F-Gas & MEES · 2025–28', live: false },
  { id: 'me', label: 'M&E Asset Management', subtitle: 'Ongoing OPEX · All sites', live: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const [selectedProgramme, setSelectedProgramme] = useState(PROGRAMMES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="relative flex h-screen w-64 flex-col overflow-visible border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-4 py-4">
        <Link href="/" onClick={() => setDropdownOpen(false)}>
          <LogoFull variant="light" />
        </Link>
      </div>

      {/* Programme selector */}
      <div className="relative border-b border-slate-200 px-4 py-3">
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
        >
          <div className="min-w-0">
            <div className="truncate">{selectedProgramme.label}</div>
            <div className="truncate text-[11px] font-normal text-slate-400">{selectedProgramme.subtitle}</div>
          </div>
          <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-slate-400" />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute left-4 right-4 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Programmes</p>
            </div>
            {PROGRAMMES.map((prog) => (
              <button
                key={prog.id}
                onClick={() => { setSelectedProgramme(prog); setDropdownOpen(false); }}
                className={cn(
                  'flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-50',
                  !prog.live && 'opacity-60',
                )}
              >
                <div className="mt-1 flex-shrink-0">
                  {prog.id === selectedProgramme.id
                    ? <Check className="h-3.5 w-3.5 text-morrison-600" />
                    : <div className="h-3.5 w-3.5" />
                  }
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-slate-800">{prog.label}</span>
                    {prog.live
                      ? <span className="flex-shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">Live</span>
                      : <span className="flex-shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">Soon</span>
                    }
                  </div>
                  <p className="truncate text-xs text-slate-400">{prog.subtitle}</p>
                </div>
              </button>
            ))}
            <div className="border-t border-slate-100 px-3 py-2">
              <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-morrison-600 transition-colors hover:bg-morrison-50">
                <Plus className="h-3 w-3" /> Add programme
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" onClick={() => setDropdownOpen(false)}>
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
                <span className={cn('flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold', isActive ? 'bg-white/20 text-white' : 'bg-gold-500 text-morrison-900')}>
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
      <div className="space-y-1 border-t border-slate-200 p-3" onClick={() => setDropdownOpen(false)}>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
          <HelpCircle className="h-4 w-4" />
          <span>Help &amp; Support</span>
        </button>
      </div>

      {/* User profile */}
      <div className="border-t border-slate-200 p-4" onClick={() => setDropdownOpen(false)}>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-morrison-600 text-sm font-bold text-white">BJ</div>
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
