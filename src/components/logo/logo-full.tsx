import { cn } from '@/lib/utils';

interface LogoFullProps {
  className?: string;
  variant?: 'light' | 'dark';
  showCoBrand?: boolean;
  height?: number;
}

export function LogoFull({
  className,
  variant = 'light',
  showCoBrand = true,
  height = 40,
}: LogoFullProps) {
  const cpcColor = variant === 'dark' ? '#ffffff' : '#1a5b36';
  const subColor = variant === 'dark' ? 'rgba(255,255,255,0.55)' : '#64748b';
  const divColor = variant === 'dark' ? 'rgba(255,255,255,0.2)' : '#e2e8f0';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cdn.freelogovectors.net/wp-content/uploads/2023/11/morrisons_logo-freelogovectors.net_-640x400.png"
        alt="Morrisons"
        style={{ height, width: 'auto', display: 'block' }}
      />
      {showCoBrand && (
        <>
          <span className="h-7 w-px flex-shrink-0" style={{ background: divColor }} />
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
