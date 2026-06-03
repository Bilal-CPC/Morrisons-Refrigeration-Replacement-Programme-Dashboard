import { cn } from '@/lib/utils';

interface LogoFullProps {
  className?: string;
  variant?: 'light' | 'dark';
  showCoBrand?: boolean;
  height?: number;
}

// Accurate SVG recreation of the Morrisons logo from the official brand asset.
// The sunflower symbol: 9 golden petal ellipses fanned upward + 2 inner golden
// dots + 1 dark-green stem circle. Wordmark: "Morrisons" + "Since 1899".
function MorrisonsSymbol({ height = 40 }: { height: number }) {
  // Symbol only (no wordmark) — for use next to text
  const w = Math.round(height * 0.72);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 72 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Morrisons"
    >
      {/* 9 petals fanned around centre point (cx=36, cy=58) */}
      {/* Each petal: elongated ellipse rx=6.5 ry=19, translated up then rotated */}
      {/* Angles from 12 o'clock: 0, ±22, ±44, ±66, ±88 */}
      {[
        { angle: 0,   rx: 6.5, ry: 20, dist: 22 },
        { angle: -22, rx: 6,   ry: 19, dist: 21 },
        { angle:  22, rx: 6,   ry: 19, dist: 21 },
        { angle: -44, rx: 5.8, ry: 18, dist: 20 },
        { angle:  44, rx: 5.8, ry: 18, dist: 20 },
        { angle: -66, rx: 5.5, ry: 17, dist: 19 },
        { angle:  66, rx: 5.5, ry: 17, dist: 19 },
        { angle: -88, rx: 5.2, ry: 16, dist: 18 },
        { angle:  88, rx: 5.2, ry: 16, dist: 18 },
      ].map((p, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={0}
          rx={p.rx}
          ry={p.ry}
          fill="#FFC72C"
          transform={`translate(36,58) rotate(${p.angle}) translate(0,-${p.dist})`}
        />
      ))}

      {/* Two inner golden dots between inner and outer petal rings */}
      <circle cx={0} cy={0} r={4.2} fill="#FFC72C"
        transform="translate(36,58) rotate(-33) translate(0,-13)" />
      <circle cx={0} cy={0} r={4.2} fill="#FFC72C"
        transform="translate(36,58) rotate(33) translate(0,-13)" />

      {/* Dark-green stem circle */}
      <circle cx={36} cy={58} r={5} fill="#1A5B36" />

      {/* "Morrisons" wordmark — bold rounded font */}
      <text
        x={36}
        y={83}
        textAnchor="middle"
        fontFamily="'Arial Rounded MT Bold', 'Nunito', 'Varela Round', Arial, sans-serif"
        fontWeight="900"
        fontSize="21"
        fill="#1A5B36"
        letterSpacing="-0.3"
      >
        Morrisons
      </text>

      {/* "Since 1899" */}
      <text
        x={36}
        y={95}
        textAnchor="middle"
        fontFamily="'Arial Rounded MT Bold', Arial, sans-serif"
        fontWeight="600"
        fontSize="9.5"
        fill="#1A5B36"
      >
        Since 1899
      </text>
    </svg>
  );
}

export function LogoFull({
  className,
  variant = 'light',
  showCoBrand = true,
  height = 40,
}: LogoFullProps) {
  const cpcColor  = variant === 'dark' ? '#ffffff' : '#1a5b36';
  const subColor  = variant === 'dark' ? 'rgba(255,255,255,0.55)' : '#64748b';
  const divColor  = variant === 'dark' ? 'rgba(255,255,255,0.2)' : '#e2e8f0';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <MorrisonsSymbol height={height} />
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
