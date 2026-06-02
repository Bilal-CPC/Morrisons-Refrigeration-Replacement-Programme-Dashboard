interface MorrisonsLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  height?: number;
}

export function MorrisonsLogo({ className = '', variant = 'full', height = 56 }: MorrisonsLogoProps) {
  const green = '#1A5B36';
  const yellow = '#FFC72C';
  const scale = height / 110;
  const w = variant === 'full' ? Math.round(280 * scale) : Math.round(100 * scale);
  const h = height;

  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox={variant === 'full' ? '0 0 280 110' : '0 0 100 80'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Morrisons"
    >
      {/* Sunflower symbol */}
      <g transform="translate(50,42)">
        {/* Petals — 9 leaf shapes radiating in a fan */}
        {[
          { angle: -80, rx: 6, ry: 14 },
          { angle: -60, rx: 6, ry: 15 },
          { angle: -40, rx: 6, ry: 16 },
          { angle: -20, rx: 5.5, ry: 15 },
          { angle: 0,   rx: 5.5, ry: 16 },
          { angle: 20,  rx: 5.5, ry: 15 },
          { angle: 40,  rx: 6, ry: 16 },
          { angle: 60,  rx: 6, ry: 15 },
          { angle: 80,  rx: 6, ry: 14 },
        ].map((p, i) => (
          <ellipse
            key={i}
            cx={0}
            cy={-20}
            rx={p.rx}
            ry={p.ry}
            fill={yellow}
            transform={`rotate(${p.angle})`}
          />
        ))}
        {/* Two small dot circles */}
        <circle cx={-14} cy={-6} r={4} fill={yellow} />
        <circle cx={14}  cy={-6} r={4} fill={yellow} />
        {/* Stem dot — dark green */}
        <circle cx={0} cy={2} r={5} fill={green} />
      </g>

      {variant === 'full' && (
        <>
          {/* "Morrisons" wordmark */}
          <text
            x="140"
            y="88"
            textAnchor="middle"
            fill={green}
            fontSize="32"
            fontWeight="800"
            fontFamily="'Arial Rounded MT Bold', 'Arial Black', Arial, sans-serif"
            letterSpacing="-0.5"
          >
            Morrisons
          </text>
          {/* "Since 1899" */}
          <text
            x="140"
            y="104"
            textAnchor="middle"
            fill={green}
            fontSize="11"
            fontWeight="500"
            fontFamily="Arial, sans-serif"
            letterSpacing="0.5"
          >
            Since 1899
          </text>
        </>
      )}
    </svg>
  );
}
