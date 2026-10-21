import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const tones = {
  surface: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  raised: 'bg-surface-raised text-ink',
  inverse: 'bg-surface-inverse text-ink-inverse',
} as const;

/** Sezione di pagina: fondo, ritmo verticale e contenitore (docs/DESIGN-SYSTEM.md § 2). */
export function Section({
  tone = 'surface',
  className,
  innerClassName,
  children,
  as: Tag = 'section',
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: keyof typeof tones;
  innerClassName?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
}) {
  return (
    <Tag className={cn(tones[tone], 'py-16 md:py-20 lg:py-28', className)} {...props}>
      <div className={cn('container-site', innerClassName)}>{children}</div>
    </Tag>
  );
}

/**
 * Apertura di sezione: occhiello, titolo e attacco, allineati a sinistra. La linea
 * gocciolante sopra l'occhiello è il segno del sito.
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  className,
  titleAs: Title = 'h2',
  inverse = false,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  titleAs?: 'h1' | 'h2';
  inverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn('max-w-3xl', className)}>
      {eyebrow && (
        <p className={cn('type-eyebrow mb-4 flex items-center gap-3', inverse ? 'text-ink-inverse/80' : 'text-brand')}>
          <span aria-hidden className={cn('inline-block h-px w-8', inverse ? 'bg-ink-inverse/50' : 'bg-cta')} />
          {eyebrow}
        </p>
      )}
      <Title className={cn(Title === 'h1' ? 'type-h1' : 'type-h2', inverse ? 'text-ink-inverse' : 'text-ink')}>{title}</Title>
      {lead && <p className={cn('type-lead mt-5', inverse ? 'text-ink-inverse/85' : 'text-ink-muted')}>{lead}</p>}
      {children}
    </header>
  );
}
