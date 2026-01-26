import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ContactForm } from '@/components/sections/ContactForm';
import { Card, CardContent } from '@/components/ui/Card';
import { MotionDiv } from '@/components/ui/Motion';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const titles: Record<string, string> = {
    it: 'Contatti - Richiedi un Progetto SUBGarden | San Vincenzo',
    en: 'Contact Us - Request a SUBGarden Project | San Vincenzo',
    de: 'Kontakt - SUBGarden Projekt anfragen | San Vincenzo',
  };

  return {
    title: titles[locale] || titles.it,
    description: 'Contatta SUBGarden per un sopralluogo gratuito a San Vincenzo e in tutta la Toscana. Esperti in subirrigazione di lusso.',
    alternates: {
      canonical: `${siteUrl}/${locale}/contatti`,
      languages: {
        it: `${siteUrl}/it/contatti`,
        en: `${siteUrl}/en/contact`,
        de: `${siteUrl}/de/kontakt`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await (getTranslations as any)('contact');

  const contactInfo = [
    {
      icon: MapPin,
      label: t('address_label'),
      value: t('address_value'),
      link: 'https://www.google.com/maps/search/?api=1&query=Corso+Italia+45+San+Vincenzo+LI',
    },
    {
      icon: Phone,
      label: t('phone_label'),
      value: t('phone_value'),
      link: `tel:${t('phone_value').replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: t('email_label'),
      value: t('email_value'),
      link: `mailto:${t('email_value')}`,
    },
    {
      icon: Clock,
      label: t('hours_label'),
      value: t('hours_value'),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/spring-nature-outdoors-backgrounds-fresh.jpg"
            alt="Contatti SUBGarden"
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
                {t('title')}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 font-light italic">
                {t('subtitle')}
              </p>
            </MotionDiv>
          </div>
        </section>

        <section className="py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-3xl font-serif font-bold text-deep-teal mb-8">
                  {t('info_title')}
                </h2>
                {contactInfo.map((info, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-white shadow-lg hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-deep-teal/5 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-copper" />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">
                            {info.label}
                          </p>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-lg font-medium text-deep-teal hover:text-copper transition-colors"
                              target={info.icon === MapPin ? '_blank' : undefined}
                              rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-lg font-medium text-deep-teal">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </MotionDiv>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm isSection={false} hideHeader={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-deep-teal mb-4">La Nostra Sede</h2>
              <p className="text-xl text-gray-600">Vieni a trovarci a San Vincenzo, nel cuore della costa toscana</p>
              <div className="w-24 h-1.5 bg-copper mx-auto mt-6"></div>
            </div>

            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F2F4F7] h-[500px] relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2912.421444123456!2d10.538123456789!3d43.09123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d619abcdefghij%3A0x1234567890abcdef!2sCorso%20Italia%2C%2045%2C%2057027%20San%20Vincenzo%20LI!5e0!3m2!1sit!2sit!4v1234567890123!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - SUBGarden Office"
              ></iframe>
            </MotionDiv>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
