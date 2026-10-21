import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { alternates, pick, NOINDEX } from '@/lib/utils/metadata';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section } from '@/components/site/Section';

type LegalSection = { title: string; text?: string; items?: string[] };

const TITLE: Record<string, string> = {
  it: 'Privacy policy',
  en: 'Privacy policy',
  de: 'Datenschutzerklärung',
};

// Pagine legali: raggiungibili e seguite, ma fuori dall'indice e dalla sitemap.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    title: pick(TITLE, locale),
    alternates: alternates('/privacy', locale),
    robots: NOINDEX,
  };
}

/* Testo legale: apertura senza foto, poi il testo lungo in .prose-site. */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('legal');
  const sections = t.raw('privacy.sections') as LegalSection[];
  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero eyebrow={t('eyebrow')} title={t('privacy.title')} lead={t('privacy.lead')} />
        <Section tone="surface">
          <div className="prose-site type-body text-ink [&>section:first-child>h2]:mt-0">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.text && <p className="mt-4">{section.text}</p>}
                {section.items && (
                  <ul className="mt-4">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
