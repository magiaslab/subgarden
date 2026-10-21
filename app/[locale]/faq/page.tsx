import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section } from '@/components/site/Section';
import { ButtonLink } from '@/components/ui/Button';
import { absoluteUrl, alternates } from '@/lib/utils/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await (getTranslations as any)({ locale, namespace: 'faq' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: alternates('/faq', locale),
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await (getTranslations as any)('faq');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('contact');
  const phone = tc('phone_value');

  const items = [
    'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8',
  ] as const;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    url: absoluteUrl('/faq', locale as Locale),
    mainEntity: items.map((key) => ({
      '@type': 'Question',
      name: t(`${key}_q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`${key}_a`) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('hero_eyebrow')}
          title={t('title')}
          lead={t('subtitle')}
          breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('faq') }]}
        />

        <Section>
          <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Domande: <details> nativi, aperti e chiusi da tastiera senza JavaScript */}
            <div className="lg:order-2">
              <ul className="border-t border-line-strong">
                {items.map((key) => (
                  <li key={key} className="border-b border-line">
                    <details className="group">
                      <summary className="type-h3 flex [text-wrap:pretty] min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-6 text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                        <span>{t(`${key}_q`)}</span>
                        <span
                          aria-hidden
                          className="relative mt-1 block size-6 shrink-0 text-brand before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                        />
                      </summary>
                      <p className="type-body max-w-prose pb-8 pr-12 text-ink-muted">{t(`${key}_a`)}</p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chi non trova la risposta: scrive o chiama */}
            <aside className="lg:order-1 lg:sticky lg:top-28 lg:self-start">
              <h2 className="type-h3 text-ink">{t('cta_text')}</h2>
              <p className="type-body mt-3 text-ink-muted">{t('cta_lead')}</p>
              <div className="mt-6 flex flex-col items-start gap-4">
                <ButtonLink href="/contatti" variant="secondary">
                  {t('cta_button')}
                </ButtonLink>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="type-ui inline-flex min-h-11 items-center text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
                >
                  {t('cta_call', { phone })}
                </a>
              </div>
            </aside>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
