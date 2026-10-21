import { cn } from '@/lib/utils/cn';

/**
 * La linea gocciolante (docs/DESIGN-SYSTEM.md § 1): un filetto con i gocciolatori a
 * passo regolare. ScrollMotion la scopre da sinistra e fa uscire le gocce una dopo
 * l'altra (data-line, data-drop). Decorativa: nascosta agli screen reader.
 */
export function DripLine({
  drops = 12,
  inverse = false,
  className,
}: {
  drops?: number;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden data-line className={cn('relative flex h-3 items-center justify-between', className)}>
      <span className={cn('absolute inset-x-0 top-1/2 h-px -translate-y-1/2', inverse ? 'bg-ink-inverse/40' : 'bg-line')} />
      {Array.from({ length: drops }, (_, i) => (
        <span
          key={i}
          data-drop
          className={cn('relative block size-[7px] rounded-full', inverse ? 'bg-ink-inverse/80' : 'bg-water')}
        />
      ))}
    </div>
  );
}
