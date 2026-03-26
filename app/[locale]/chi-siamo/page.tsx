import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import { VillaMussioGallery } from '@/components/sections/VillaMussioGallery';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.subgarden.it';

  const titles: Record<string, string> = {
    it: 'Chi Siamo - La Mia Storia e la Visione SUBGarden | Fausto Favilli',
    en: 'About Us - My Story and the SUBGarden Vision | Fausto Favilli',
    de: 'Über Uns - Meine Geschichte und die SUBGarden Vision | Fausto Favilli',
  };

  return {
    title: titles[locale] || titles.it,
    alternates: {
      canonical: `${siteUrl}/${locale}/chi-siamo`,
      languages: {
        it: `${siteUrl}/it/chi-siamo`,
        en: `${siteUrl}/en/about-us`,
        de: `${siteUrl}/de/ueber-uns`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await (getTranslations as any)('aboutPage');

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/villa-mussio/DJI_0001.JPG"
            alt="About SUBGarden"
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
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                {t('hero_title')}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 font-light italic">
                {t('hero_subtitle')}
              </p>
            </MotionDiv>
          </div>
        </section>

        {/* Roots Section */}
        <section className="py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <MotionDiv
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/villa-mussio/20210703_085226.jpg"
                  alt="Le radici - Fausto Favilli e la natura"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-copper mb-4">
                  1990 — L&apos;Inizio
                </h2>
                <h3 className="text-4xl font-serif font-bold text-deep-teal mb-8">
                  {t('roots_title')}
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {t('roots_text')}
                </p>
                <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-copper italic text-gray-600 text-lg mb-8">
                  &quot;Mi sono innamorato della purezza delle piante e della loro resiliente capacità di esistere, semplicemente.&quot;
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('roots_ancient_text')}
                </p>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Philosophy Expanded Section */}
        <section className="py-24 bg-deep-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                {t('philosophy_expanded_title')}
              </h2>
              <div className="w-24 h-1 bg-copper mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg opacity-90 leading-relaxed">
              <p>{t('philosophy_expanded_text1')}</p>
              <p>{t('philosophy_expanded_text2')}</p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <Image src="/villa-mussio/20210914_090312.jpg" alt="Paesaggio prestato - Villa Mussio" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <Image src="/villa-mussio/20210703_092804.jpg" alt="Giardino empatico" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <Image src="/villa-mussio/DJI_0203.JPG" alt="Orizzonte Toscana" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Case History Section */}
        <section className="py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:order-2"
              >
                <VillaMussioGallery caption={t('gallery_villa_mussio')} />
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:order-1"
              >
                <h3 className="text-4xl font-serif font-bold text-deep-teal mb-8">
                  {t('case_history_title')}
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {t('case_history_text')}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-copper pl-6">
                  {t('case_history_focus')}
                </p>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-12 md:p-20 rounded-3xl shadow-xl border border-gray-100"
            >
              <h3 className="text-4xl font-serif font-bold text-deep-teal mb-8">
                {t('innovation_title')}
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
                {t('innovation_text')}
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-serif font-bold text-copper">30+</span>
                  <span className="text-gray-500 uppercase tracking-widest text-sm">Anni di Esperienza</span>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-serif font-bold text-copper">100%</span>
                  <span className="text-gray-500 uppercase tracking-widest text-sm">Non Invasivo</span>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-serif font-bold text-copper">Brevettato</span>
                  <span className="text-gray-500 uppercase tracking-widest text-sm">Sistema SUBGarden</span>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
