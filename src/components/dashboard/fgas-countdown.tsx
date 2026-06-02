'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PROGRAMME } from '@/lib/data';

const DEADLINE = new Date(PROGRAMME.fGasDeadline);

function getTimeLeft() {
  const diff = DEADLINE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function FGasCountdown({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
        <span className="text-xs font-semibold text-amber-700">
          F-Gas deadline: {time ? time.days.toLocaleString() : '—'} days
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-3"
      style={{ background: '#7c2d12', borderColor: '#9a3412' }}
    >
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-orange-300" />
        <div>
          <span className="text-sm font-bold text-orange-50">F-Gas Compliance Deadline</span>
          <span className="ml-2 hidden text-xs text-orange-300 sm:inline">
            HFC phase-down — refrigeration systems upgrade required
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 font-mono">
        {[
          { v: time?.days ?? 0, l: 'days', big: true },
          { v: time?.hours ?? 0, l: 'hrs' },
          { v: time?.minutes ?? 0, l: 'min' },
          { v: time?.seconds ?? 0, l: 'sec' },
        ].map((u) => (
          <div key={u.l} className="flex min-w-[2.5rem] flex-col items-center">
            <span className="text-base font-bold leading-none text-white">
              {u.big ? (time?.days ?? 0).toLocaleString() : pad(u.v)}
            </span>
            <span className="mt-0.5 text-[9px] font-normal text-orange-400">{u.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
