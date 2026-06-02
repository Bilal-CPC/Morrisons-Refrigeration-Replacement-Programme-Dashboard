import { useEffect, useRef, useState } from 'react';
import { Store, CheckCircle2, Construction, Ruler, ShoppingCart, Clock, TrendingUp, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPITile {
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  isPercent?: boolean;
  isText?: boolean;
}

const tiles: KPITile[] = [
  { label: 'Total Stores in Programme', value: 412, icon: Store, color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE' },
  { label: 'Projects Completed', value: 127, icon: CheckCircle2, color: '#16A34A', bgColor: '#F0FDF4', borderColor: '#BBF7D0' },
  { label: 'Projects On Site', value: 34, icon: Construction, color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A' },
  { label: 'Projects in Design', value: 52, icon: Ruler, color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE' },
  { label: 'Projects in Procurement', value: 41, icon: ShoppingCart, color: '#0891B2', bgColor: '#ECFEFF', borderColor: '#A5F3FC' },
  { label: 'Projects Yet to Start', value: 158, icon: Clock, color: '#94A3B8', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
  { label: 'Programme Completion', value: 31, suffix: '%', icon: TrendingUp, color: '#16A34A', bgColor: '#F0FDF4', borderColor: '#BBF7D0', isPercent: true },
  { label: 'Forecast Completion', value: 0, icon: CalendarCheck, color: '#1A5B36', bgColor: '#F0FDF4', borderColor: '#BBF7D0', isText: true },
];

function CountUp({ to, duration = 1000, suffix = '', prefix = '' }: { to: number; duration?: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

function ProgressRing({ percent, color, size = 56 }: { percent: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={5} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
      />
    </svg>
  );
}

export function KPIGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Programme Overview</h2>
        <span className="section-label">Live as of 2 June 2026</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {tiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className={cn('card card-hover card-in p-4 relative overflow-hidden')}
              style={{
                borderLeft: `4px solid ${tile.borderColor}`,
                animationDelay: `${i * 60}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tile.bgColor }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: tile.color, width: 18, height: 18 }} />
                </div>
                {tile.isPercent && (
                  <ProgressRing percent={tile.value as number} color={tile.color} size={48} />
                )}
              </div>
              <div className="mt-3">
                <div
                  className="text-2xl font-bold leading-none tracking-tight"
                  style={{ color: tile.color }}
                >
                  {tile.isText ? (
                    <span className="text-lg">Q4 2029</span>
                  ) : (
                    <CountUp
                      to={tile.value as number}
                      suffix={tile.suffix ?? ''}
                      prefix={tile.prefix ?? ''}
                      duration={900 + i * 80}
                    />
                  )}
                </div>
                <p className="text-slate-500 text-xs font-medium mt-1.5 leading-snug">{tile.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
