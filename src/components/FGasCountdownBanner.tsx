import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const DEADLINE = new Date('2029-11-08T00:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function FGasCountdownBanner() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full border-b"
      style={{ background: '#7C2D12', borderColor: '#9A3412' }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 py-2.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-orange-300 shrink-0" />
          <span className="text-orange-100 text-sm font-semibold">
            F-Gas Compliance Deadline
          </span>
          <span className="text-orange-300 text-xs hidden sm:inline">
            · HFC Phase-Down — Refrigeration Systems Upgrade Required
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
          <TimeUnit value={time.days} label="days" />
          <Colon />
          <TimeUnit value={time.hours} label="hrs" />
          <Colon />
          <TimeUnit value={time.minutes} label="min" />
          <Colon />
          <TimeUnit value={time.seconds} label="sec" />
          <span className="text-orange-300 text-xs font-medium ml-1">remaining</span>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[2.5rem]">
      <span className="text-white text-base leading-none">{pad(value)}</span>
      <span className="text-orange-400 text-[9px] font-normal leading-none mt-0.5">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="text-orange-400 countdown-tick pb-1">:</span>;
}
