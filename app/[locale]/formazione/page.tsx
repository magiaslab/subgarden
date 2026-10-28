import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { TrainingForm } from '@/components/sections/TrainingForm';
import { buttonStyles } from '@/components/ui/Button';
import { SITE_URL, absoluteUrl, alternates, pick } from '@/lib/utils/metadata';

/*
 * Corso per installatori: chi vuole imparare a posare la subirrigazione SUBGarden,
 * giardiniere o no. La pagina porta al form (#richiesta), che scrive a info@.
 * Fatti presi dagli articoli usciti sui giornali (rete di installatori, formazione di
 * base, assistenza, macchina brevettata affidata all'installatore): niente date,
 * durate o prezzi finché non li decide SUBGarden.
 */
const TITLE: Record<string, string> = {
  it: 'Corso per installatori di subirrigazione',
  en: 'Subsurface irrigation installer training',
  de: 'Ausbildung zum Installateur für Unterflurbewässerung',
};
const DESCRIPTION: Record<string, string> = {
  it: 'Impara a posare la subirrigazione sotto i prati già fatti, con la macchina brevettata SUBGarden. Per giardinieri, ditte del verde e anche per chi parte da zero.',
  en: 'Learn to install subsurface irrigation under existing lawns with SUBGarden’s patented machine. For gardeners, landscaping firms and people starting from scratch.',
  de: 'Lernen Sie, Unterflurbewässerung unter bestehenden Rasen zu verlegen, mit der patentierten Maschine von SUBGarden. Für Gärtner, Gartenbaufirmen und Quereinsteiger.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const title = pick(TITLE, locale);
  return {
    title,
    description: pick(DESCRIPTION, locale),
    alternates: alternates('/formazione', locale),
    openGraph: {
      title,
      description: pick(DESCRIPTION, locale),
      url: absoluteUrl('/formazione', locale),
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: title }],
    },
  };
}

const AUDIENCE = ['gardener', 'related', 'beginner'] as const;
const LEARN = [1, 2, 3, 4, 5] as const;
const GIVE = [1, 2, 3, 4] as const;
const STEPS = [1, 2, 3] as const;
const FAQ = [1, 2, 3, 4, 5, 6] as const;

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('training');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('contact');
  const phone = tc('phone_value');
  const url = absoluteUrl('/formazione', locale as Locale);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: pick(TITLE, locale),
      description: pick(DESCRIPTION, locale),
      url,
      inLanguage: locale,
      provider: { '@type': 'Organization', name: 'SUBGarden', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      url,
      mainEntity: FAQ.map((i) => ({
        '@type': 'Question',
        name: t(`faq_${i}_q`),
        acceptedAnswer: { '@type': 'Answer', text: t(`faq_${i}_a`) },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('hero_eyebrow')}
          title={t('hero_title')}
          lead={t('hero_lead')}
          image={{ src: '/villa-mussio/DJI_0444.JPG' }}
          breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('training') }]}
        >
          <a href="#richiesta" className={buttonStyles({ size: 'lg', className: 'mt-8' })}>
            {t('hero_cta')}
          </a>
        </PageHero>

        {/* Perché: un mestiere che prima non c'era */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionIntro eyebrow={t('why_eyebrow')} title={t('why_title')} />
            <div className="type-body max-w-prose space-y-5 text-ink-muted lg:pt-10">
              <p>{t('why_text_1')}</p>
              <p>{t('why_text_2')}</p>
              <p>{t('why_text_3')}</p>
            </div>
          </div>
        </Section>

        {/* Per chi */}
        <Section tone="alt">
          <SectionIntro eyebrow={t('who_eyebrow')} title={t('who_title')} lead={t('who_lead')} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {AUDIENCE.map((a, i) => (
              <li key={a} className="rounded-media border-t-2 border-cta bg-surface-raised p-6 lg:p-8">
                <p className="type-eyebrow text-brand">0{i + 1}</p>
                <h3 className="type-h3 mt-3 text-ink">{t(`who_${a}_title`)}</h3>
                <p className="type-body mt-3 text-ink-muted">{t(`who_${a}_text`)}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Cosa impari e cosa ti diamo */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <SectionIntro eyebrow={t('learn_eyebrow')} title={t('learn_title')} />
              <ul className="mt-10 space-y-4">
                {LEARN.map((i) => (
                  <li key={i} className="type-body grid grid-cols-[1.25rem_1fr] gap-3 text-ink">
                    <span aria-hidden className="mt-2.5 block size-2 rounded-full bg-water" />
                    {t(`learn_${i}`)}
                  </li>
                ))}
              </ul>

              <h3 className="type-h3 mt-14 text-ink">{t('give_title')}</h3>
              <ul className="mt-6 space-y-4">
                {GIVE.map((i) => (
                  <li key={i} className="type-body grid grid-cols-[1.25rem_1fr] gap-3 text-ink">
                    <span aria-hidden className="mt-2.5 block size-2 rounded-full bg-cta" />
                    {t(`give_${i}`)}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="rounded-media relative aspect-[960/524] bg-surface-alt lg:sticky lg:top-28">
              <Image
                src="/Gemini_Generated_Image_reiwdqreiwdqreiw (1).png"
                alt={t('learn_image_alt')}
                fill
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
        </Section>

        {/* Come si parte */}
        <Section tone="inverse">
          <SectionIntro inverse eyebrow={t('steps_eyebrow')} title={t('steps_title')} />
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
            {STEPS.map((i) => (
              <li key={i} className="relative border-t border-ink-inverse/30 pt-6">
                <span aria-hidden className="absolute left-0 top-0 block size-[9px] -translate-y-1/2 rounded-full bg-cta" />
                <p className="type-eyebrow text-ink-inverse/80">0{i}</p>
                <h3 className="type-h3 mt-2 text-ink-inverse">{t(`step_${i}_title`)}</h3>
                <p className="type-body mt-3 text-ink-inverse/85">{t(`step_${i}_text`)}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Il form */}
        <Section id="richiesta" className="scroll-mt-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <SectionIntro eyebrow={t('form_eyebrow')} title={t('form_title')} lead={t('form_lead')} />
              <p className="type-body mt-8 text-ink-muted">
                {t('form_call')}{' '}
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  data-track-location="formazione"
                  className="inline-flex min-h-11 items-center text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
                >
                  {phone}
                </a>
              </p>
            </div>
            <div className="rounded-media bg-surface-raised p-6 sm:p-8 lg:p-12">
              <TrainingForm />
            </div>
          </div>
        </Section>

        {/* Domande */}
        <Section tone="alt">
          <SectionIntro eyebrow={t('faq_eyebrow')} title={t('faq_title')} />
          <ul className="mt-10 max-w-4xl border-t border-line-strong">
            {FAQ.map((i) => (
              <li key={i} className="border-b border-line">
                <details className="group">
                  <summary className="type-h3 flex [text-wrap:pretty] min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-6 text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                    <span>{t(`faq_${i}_q`)}</span>
                    <span
                      aria-hidden
                      className="relative mt-1 block size-6 shrink-0 text-brand before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                    />
                  </summary>
                  <p className="type-body max-w-prose pb-8 pr-12 text-ink-muted">{t(`faq_${i}_a`)}</p>
                </details>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
