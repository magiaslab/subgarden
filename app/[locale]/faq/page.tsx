import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await (getTranslations as any)('faq');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/faq`,
      languages: {
        it: `${siteUrl}/it/faq`,
        en: `${siteUrl}/en/faq`,
        de: `${siteUrl}/de/faq`,
      },
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await (getTranslations as any)('faq');

  const items = [
    'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8',
  ] as const;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/stunning-spring-collage.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light italic max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </MotionDiv>
          </div>
        </section>

        <div className="py-16 md:py-24 bg-[#F2F4F7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {items.map((key, index) => (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <details className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 list-none cursor-pointer px-6 py-5 font-serif font-semibold text-deep-teal text-lg hover:bg-gray-50/80 transition-colors">
                      <span className="pr-4">{t(`${key}_q`)}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-deep-teal/10 flex items-center justify-center text-deep-teal group-open:rotate-180 transition-transform">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-5 pt-0 text-gray-700 leading-relaxed border-t border-gray-50">
                      <p className="pt-4">{t(`${key}_a`)}</p>
                    </div>
                  </details>
                </MotionDiv>
              ))}
            </div>

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 mb-6">{t('cta_text')}</p>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 rounded-xl bg-deep-teal px-8 py-4 text-white font-semibold hover:bg-deep-teal/90 transition-colors"
              >
                {t('cta_button')}
              </Link>
            </MotionDiv>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
