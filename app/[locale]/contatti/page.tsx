import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section } from '@/components/site/Section';
import { ContactForm } from '@/components/sections/ContactForm';
import { Link } from '@/lib/i18n/routing';
import { alternates, pick } from '@/lib/utils/metadata';

const TITLE: Record<string, string> = {
  it: 'Contatti e sopralluogo a San Vincenzo e in Toscana',
  en: 'Contact and site visit in San Vincenzo and Tuscany',
  de: 'Kontakt und Besichtigung in San Vincenzo und der Toskana',
};
const DESCRIPTION: Record<string, string> = {
  it: 'Chiedi un sopralluogo gratuito per la subirrigazione del tuo giardino: veniamo a vedere il prato, l’acqua disponibile e ti diciamo se conviene. San Vincenzo e tutta la Toscana.',
  en: 'Ask for a free site visit for your garden’s subsurface irrigation: we look at the lawn and the water supply and tell you whether it is worth it. San Vincenzo and all of Tuscany.',
  de: 'Fordern Sie eine kostenlose Besichtigung für die Unterflurbewässerung Ihres Gartens an: Wir prüfen Rasen und Wasserversorgung und sagen Ihnen, ob es sich lohnt. San Vincenzo und die ganze Toskana.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    title: pick(TITLE, locale),
    description: pick(DESCRIPTION, locale),
    alternates: alternates('/contatti', locale),
  };
}

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Via%20Pitagora%203%2C%2057027%20San%20Vincenzo%20(LI)';
const MAPS_EMBED = 'https://www.google.com/maps?q=Via%20Pitagora%203%2C%2057027%20San%20Vincenzo%20(LI)&output=embed';

const linkClass =
  'inline-flex min-h-11 items-center text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('contact');
  const tn = await getTranslations('nav');
  const phone = t('phone_value');
  const email = t('email_value');

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('hero_eyebrow')}
          title={t('hero_title')}
          lead={t('hero_lead')}
          breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('contact') }]}
        />

        <Section>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            {/* Recapiti veri: telefono ed email cliccabili, sede, orari */}
            <div>
              <h2 className="type-h2 text-ink">{t('info_title')}</h2>
              <dl className="mt-8 border-t border-line">
                <div className="border-b border-line py-5">
                  <dt className="type-eyebrow text-ink-muted">{t('phone_label')}</dt>
                  <dd className="type-h3 mt-1">
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className={linkClass}>
                      {phone}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-line py-5">
                  <dt className="type-eyebrow text-ink-muted">{t('email_label')}</dt>
                  <dd className="type-h3 mt-1 break-words">
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-line py-5">
                  <dt className="type-eyebrow text-ink-muted">{t('address_label')}</dt>
                  <dd className="type-body mt-2 text-ink">{t('address_value')}</dd>
                </div>
                <div className="border-b border-line py-5">
                  <dt className="type-eyebrow text-ink-muted">{t('hours_label')}</dt>
                  <dd className="type-body mt-2 text-ink">{t('hours_value')}</dd>
                </div>
              </dl>
              <p className="type-body mt-8 text-ink-muted">
                {t('faq_before_form')}{' '}
                <Link href="/faq" className="text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2">
                  {t('faq_link_text')}
                </Link>
              </p>
            </div>

            {/* Il form, su una superficie bianca */}
            <div className="rounded-media bg-surface-raised p-6 sm:p-8 lg:p-12">
              <h2 className="type-h2 text-ink">{t('form_title')}</h2>
              <p className="type-body mt-3 max-w-prose text-ink-muted">{t('form_lead')}</p>
              <ContactForm className="mt-8" />
            </div>
          </div>
        </Section>

        {/* La sede sulla mappa */}
        <Section tone="alt">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="type-h2 text-ink">{t('map_title')}</h2>
              <p className="type-lead mt-4 text-ink-muted">{t('map_lead')}</p>
            </div>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={`type-ui ${linkClass}`}>
              {t('map_link')}
              <span className="sr-only"> {t('new_tab')}</span>
            </a>
          </div>
          <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-[var(--radius-media)] bg-surface md:aspect-21/9">
            <iframe
              src={MAPS_EMBED}
              title={t('map_iframe_title')}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
