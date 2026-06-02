import { MorrisonsLogo } from './MorrisonsLogo';

export function Header() {
  return (
    <header className="grain-overlay" style={{ background: '#0D1F2D' }}>
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Morrisons branding */}
          <div className="flex items-center gap-5">
            <div className="bg-white rounded-lg p-2.5 shadow-lg">
              <MorrisonsLogo height={48} variant="full" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight tracking-tight">
                Refrigeration Transition Programme
              </h1>
              <p className="text-slate-400 text-xs mt-0.5 font-medium tracking-wide">
                National Refrigeration Replacement &amp; F-Gas Compliance Programme
              </p>
            </div>
          </div>

          {/* Right: CPC branding + live indicator */}
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-slate-400 text-xs font-medium">Programme managed by</p>
              <p className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                CPC Systems
              </p>
              <p className="text-slate-500 text-xs">Programme Management Platform</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-semibold">LIVE</span>
              </div>
              <span className="text-slate-500 text-xs">
                Updated: 2 Jun 2026 · 09:14
              </span>
            </div>
          </div>
        </div>

        {/* Programme subtitle bar */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-slate-300 text-sm font-medium">
            Morrisons Refrigeration Transition Programme ·{' '}
            <span className="text-slate-400 font-normal">
              Delivering complete programme visibility — beyond spreadsheets, beyond SmartSheets
            </span>
          </p>
          <div className="hidden sm:flex items-center gap-4">
            {[
              { label: 'Programme', value: '31% Complete' },
              { label: 'On Site', value: '34 Stores' },
              { label: 'Budget', value: '£50m' },
            ].map(item => (
              <div key={item.label} className="text-right">
                <div className="text-white text-sm font-bold leading-none">{item.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
