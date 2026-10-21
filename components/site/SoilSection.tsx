import { cn } from '@/lib/utils/cn';

export type SoilLegendItem = { label: string; text: string };

/*
 * Lo spaccato del terreno: prato, radici, ali gocciolanti viste in sezione (a passo
 * regolare) e l'acqua che sale per capillarità. Sostituisce le infografiche in PNG:
 * il testo sta nella legenda HTML, leggibile da tutti (e dai motori di ricerca).
 * ScrollMotion lo disegna per strati (data-draw: prima i tratti, poi gli strati).
 * I numeri nel disegno corrispondono alla legenda, nello stesso ordine.
 */
const PIPES = [110, 260, 410, 560, 710];
const PIPE_Y = 250;

export function SoilSection({
  title,
  legend,
  spacingLabel,
  className,
}: {
  title: string;
  /** Quattro voci: prato, radici, ala gocciolante, acqua. */
  legend: [SoilLegendItem, SoilLegendItem, SoilLegendItem, SoilLegendItem];
  /** Quota fra due ali, es. «33 cm»: solo se il dato è certo. */
  spacingLabel?: string;
  className?: string;
}) {
  const markers = [
    { x: 40, y: 58 },
    { x: 330, y: 170 },
    { x: PIPES[2] + 26, y: PIPE_Y + 34 },
    { x: PIPES[3] - 30, y: PIPE_Y - 70 },
  ];
  return (
    <figure className={cn('grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center', className)}>
      <svg
        viewBox="0 0 800 400"
        role="img"
        aria-labelledby="soil-title"
        data-draw
        className="w-full h-auto rounded-media bg-surface-raised"
      >
        <title id="soil-title">{title}</title>
        <defs>
          <linearGradient id="soil-earth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9b79c" />
            <stop offset="1" stopColor="#a8916f" />
          </linearGradient>
          <radialGradient id="soil-water" cx="0.5" cy="0.62" r="0.6">
            <stop offset="0" stopColor="var(--color-water)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--color-water)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Terra */}
        <rect data-layer x="0" y="70" width="800" height="330" fill="url(#soil-earth)" />
        {/* Bulbi d'acqua attorno alle ali: salgono verso le radici */}
        <g data-layer>
          {PIPES.map((x) => (
            <ellipse key={x} cx={x} cy={PIPE_Y - 30} rx="78" ry="96" fill="url(#soil-water)" />
          ))}
        </g>
        {/* Radici */}
        <g fill="none" stroke="#5b4630" strokeWidth="2" strokeLinecap="round" opacity="0.75">
          {Array.from({ length: 16 }, (_, i) => {
            const x = 25 + i * 50;
            return (
              <path
                key={i}
                data-stroke
                d={`M${x} 78 C ${x - 10} 120, ${x + 14} 150, ${x - 4} ${180 + (i % 3) * 18} M${x} 96 C ${x + 18} 118, ${x + 22} 132, ${x + 26} 150`}
              />
            );
          })}
        </g>
        {/* Prato */}
        <rect data-layer x="0" y="52" width="800" height="22" fill="var(--color-grass)" />
        <g data-layer stroke="var(--color-grass)" strokeWidth="3" strokeLinecap="round">
          {Array.from({ length: 80 }, (_, i) => {
            const x = 4 + i * 10;
            const h = 14 + ((i * 7) % 9);
            return <line key={i} x1={x} y1="56" x2={x + ((i % 2) * 4 - 2)} y2={56 - h} />;
          })}
        </g>
        {/* Ali gocciolanti in sezione */}
        <g>
          {PIPES.map((x) => (
            <g key={x}>
              <circle data-stroke cx={x} cy={PIPE_Y} r="11" fill="none" stroke="var(--color-rame-700)" strokeWidth="5" />
              <circle data-layer cx={x} cy={PIPE_Y} r="4" fill="var(--color-water)" />
            </g>
          ))}
        </g>
        {/* Quota fra due ali */}
        {spacingLabel && (
        <g data-layer fill="var(--color-ink)">
          <line x1={PIPES[0]} y1={PIPE_Y + 52} x2={PIPES[1]} y2={PIPE_Y + 52} stroke="var(--color-ink)" strokeWidth="1.5" />
          <line x1={PIPES[0]} y1={PIPE_Y + 44} x2={PIPES[0]} y2={PIPE_Y + 60} stroke="var(--color-ink)" strokeWidth="1.5" />
          <line x1={PIPES[1]} y1={PIPE_Y + 44} x2={PIPES[1]} y2={PIPE_Y + 60} stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x={(PIPES[0] + PIPES[1]) / 2} y={PIPE_Y + 82} textAnchor="middle" fontSize="20" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
            {spacingLabel}
          </text>
        </g>
        )}
        {/* Numeri della legenda */}
        <g data-layer>
          {markers.map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${m.y})`}>
              <circle r="15" fill="var(--color-ink)" />
              <text y="6" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--color-carta-50)" style={{ fontFamily: 'var(--font-display)' }}>
                {i + 1}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption>
        <ol className="space-y-5">
          {legend.map((item, i) => (
            <li key={item.label} className="grid grid-cols-[2rem_1fr] gap-3">
              <span aria-hidden className="type-ui flex size-8 items-center justify-center rounded-full bg-ink text-ink-inverse">
                {i + 1}
              </span>
              <div>
                <p className="type-h3 text-ink">{item.label}</p>
                <p className="type-body mt-1 text-ink-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
