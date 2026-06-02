import { MorrisonsLogo } from './MorrisonsLogo';

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <MorrisonsLogo height={32} variant="icon" />
          <div>
            <p className="text-sm font-bold text-slate-700">CPC Systems 2.0</p>
            <p className="text-xs text-slate-400">Programme Management Platform</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400">
            F-Gas Transition Programme · National Refrigeration Replacement
          </p>
          <p className="text-xs text-slate-300 mt-0.5">
            All data shown is for demonstration purposes. CPC Systems © 2026
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 font-medium">Beyond spreadsheets.</p>
          <p className="text-xs text-slate-500 font-medium">Beyond SmartSheets.</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: '#1A5B36' }}>
            Intelligent programme management.
          </p>
        </div>
      </div>
    </footer>
  );
}
