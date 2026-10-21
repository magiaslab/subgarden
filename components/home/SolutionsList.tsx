import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Section, SectionIntro } from '@/components/site/Section';
import { ButtonLink } from '@/components/ui/Button';
import { solutions } from '@/lib/solutions';

/** Le quattro soluzioni come righe: foto, nome, una frase, tutta la riga è il link. */
export function SolutionsList() {
  const t = useTranslations('home');
  const ts = useTranslations('solutionsPreview');
  const locale = useLocale() as 'it' | 'en' | 'de';
  return (
    <Section tone="surface">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionIntro eyebrow={t('solutions_eyebrow')} title={ts('title')} lead={ts('subtitle')} />
        <ButtonLink href="/soluzioni" variant="secondary" className="self-start lg:self-auto">
          {ts('view_all')}
        </ButtonLink>
      </div>
      <ul className="mt-12 border-t border-line lg:mt-16">
        {solutions.map((s) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={{ pathname: '/soluzioni/[slug]', params: { slug: s.slug } }}
              className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-5 py-5 sm:grid-cols-[9rem_1fr_auto] lg:grid-cols-[12rem_1fr_1.2fr_auto] lg:gap-10 lg:py-7"
            >
              <span className="rounded-media relative block aspect-4/3 bg-surface-alt">
                <Image src={decodeURIComponent(s.image)} alt="" fill sizes="(min-width: 64rem) 12rem, 9rem" className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105" />
              </span>
              <span className="type-h3 text-ink transition-colors group-hover:text-brand">{s.title[locale] ?? s.title.it}</span>
              <span className="type-body hidden text-ink-muted lg:block">{s.description[locale] ?? s.description.it}</span>
              <ArrowUpRight aria-hidden className="size-6 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
