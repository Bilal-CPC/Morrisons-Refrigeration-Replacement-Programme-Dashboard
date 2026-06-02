/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

interface LogoFullProps {
  className?: string;
  /** light = for white backgrounds; dark = for dark backgrounds (white CPC text) */
  variant?: 'light' | 'dark';
  /** show the "· CPC Platform" co-brand label next to the Morrisons mark */
  showCoBrand?: boolean;
  height?: number;
}

/**
 * Official Morrisons logo (public/morrisons-logo.png) paired with a small
 * CPC platform co-brand label. Drop the supplied PNG into /public as
 * `morrisons-logo.png` and it renders here automatically.
 */
export function LogoFull({ className, variant = 'light', showCoBrand = true, height = 40 }: LogoFullProps) {
  const cpcColor = variant === 'dark' ? '#ffffff' : '#1a5b36';
  const subColor = variant === 'dark' ? 'rgba(255,255,255,0.55)' : '#64748b';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src="/morrisons-logo.png"
        alt="Morrisons"
        style={{ height, width: 'auto' }}
        className="flex-shrink-0 object-contain"
      />
      {showCoBrand && (
        <>
          <span className="h-7 w-px flex-shrink-0" style={{ background: variant === 'dark' ? 'rgba(255,255,255,0.2)' : '#e2e8f0' }} />
          <div className="leading-none">
            <div className="text-[14px] font-extrabold tracking-tight" style={{ color: cpcColor }}>
              CPC
            </div>
            <div className="text-[9px] font-medium tracking-wide" style={{ color: subColor }}>
              Programme Platform
            </div>
          </div>
        </>
      )}
    </div>
  );
}
