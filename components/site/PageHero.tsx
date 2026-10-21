import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';

export type Crumb = { label: string; href?: React.ComponentProps<typeof Link>['href'] };

/*
 * Apertura delle pagine interne (docs/DESIGN-SYSTEM.md § 3): occhiello, H1, attacco,
 * allineati a sinistra. Con la foto: velatura verde scura come l'hero della home e
 * testo chiaro; senza foto: fondo surface-alt. È l'LCP: niente animazioni
 * (data-no-motion). Le briciole sono un <nav> con l'ultima voce in aria-current.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  breadcrumb,
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Foto di fondo: alt vuoto se decorativa (il titolo dice già tutto). */
  image?: { src: string; alt?: string; position?: string };
  breadcrumb?: Crumb[];
  className?: string;
  /** Contenuto extra sotto l'attacco (es. un pulsante o una riga di dati). */
  children?: React.ReactNode;
}) {
  const onPhoto = Boolean(image);
  return (
    <section
      data-no-motion
      className={cn(
        'relative isolate overflow-hidden',
        onPhoto
          ? 'flex min-h-[70svh] items-end bg-surface-inverse text-ink-inverse lg:min-h-[78svh]'
          : 'bg-surface-alt text-ink',
        className,
      )}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_61_50/0.6)_0%,rgb(31_61_50/0.2)_38%,rgb(20_40_32/0.8)_78%,rgb(20_40_32/0.92)_100%)]"
          />
          {/* Lato del testo più scuro: occhiello e briciole restano leggibili anche su foto chiare */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(20_40_32/0.55)_0%,rgb(20_40_32/0.3)_50%,transparent_80%)]"
          />
        </>
      )}

      <div className={cn('container-site w-full', onPhoto ? 'pb-14 pt-32 lg:pb-20' : 'pb-14 pt-32 lg:pb-20 lg:pt-40')}>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className={cn('type-small flex flex-wrap items-center gap-x-2 gap-y-1', onPhoto ? 'text-ink-inverse/85' : 'text-ink-muted')}>
              {breadcrumb.map((c, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <li key={i} className="flex items-center gap-2">
                    {c.href && !last ? (
                      <Link
                        href={c.href}
                        className={cn(
                          'inline-flex min-h-11 items-center underline decoration-1 underline-offset-[0.3em] hover:decoration-2',
                          onPhoto ? 'text-ink-inverse' : 'text-brand',
                        )}
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current={last ? 'page' : undefined}>{c.label}</span>
                    )}
                    {!last && <span aria-hidden>/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className={cn('type-eyebrow mb-6 flex items-center gap-3', onPhoto ? 'text-ink-inverse/85' : 'text-brand')}>
            <span aria-hidden className="inline-block h-px w-8 bg-cta" />
            {eyebrow}
          </p>
        )}
        <h1 className={cn('type-h1 max-w-[18ch]', onPhoto ? 'text-ink-inverse' : 'text-ink')}>{title}</h1>
        {lead && (
          <p className={cn('type-lead mt-6 max-w-2xl', onPhoto ? 'text-ink-inverse/90' : 'text-ink-muted')}>{lead}</p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
