'use client';

import { useLocale, type Locale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';

const locales: { code: Locale; label: string }[] = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

/*
 * Tre link veri al posto di un menu a tendina: si leggono a colpo d'occhio, funzionano
 * da tastiera e li seguono anche i motori di ricerca. Con i params lo slug resta lo
 * stesso e cambia solo il segmento tradotto (/it/soluzioni/x → /en/solutions/x).
 */
export function LanguageSwitcher({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <ul className={cn('flex items-center gap-1', className)} aria-label="Lingua / Language / Sprache">
      {locales.map((l) => {
        const current = l.code === locale;
        return (
          <li key={l.code}>
            <Link
              href={{ pathname, params } as never}
              locale={l.code}
              hrefLang={l.code}
              lang={l.code}
              aria-current={current ? 'true' : undefined}
              title={l.label}
              className={cn(
                'type-ui inline-flex min-h-11 min-w-9 items-center justify-center rounded-[var(--radius-control)] px-1.5 text-[0.8125rem] uppercase tracking-wide transition-colors',
                inverse
                  ? current
                    ? 'text-ink-inverse underline underline-offset-4'
                    : 'text-ink-inverse/75 hover:text-ink-inverse'
                  : current
                    ? 'text-brand underline underline-offset-4'
                    : 'text-ink-muted hover:text-brand',
              )}
            >
              <span className="sr-only">{l.label}</span>
              <span aria-hidden>{l.code}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
