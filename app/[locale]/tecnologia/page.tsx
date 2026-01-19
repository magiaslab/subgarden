import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const titles: Record<string, string> = {
    it: 'Tecnologia SUBGarden - Sistema di Subirrigazione Innovativo',
    en: 'SUBGarden Technology - Innovative Sub-Irrigation System',
    de: 'SUBGarden Technologie - Innovatives Unterflurbewässerungssystem',
  };

  const descriptions: Record<string, string> = {
    it: 'Scopri la tecnologia avanzata alla base del sistema di subirrigazione SUBGarden. Efficienza, sostenibilità e precisione per il tuo giardino.',
    en: 'Discover the advanced technology behind the SUBGarden sub-irrigation system. Efficiency, sustainability and precision for your garden.',
    de: 'Entdecken Sie die fortschrittliche Technologie hinter dem SUBGarden Unterflurbewässerungssystem. Effizienz, Nachhaltigkeit und Präzision für Ihren Garten.',
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${siteUrl}/${locale}/tecnologia`,
      languages: {
        it: `${siteUrl}/it/tecnologia`,
        en: `${siteUrl}/en/tecnologia`,
        de: `${siteUrl}/de/tecnologia`,
      },
    },
  };
}

export default async function TecnologiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = {
    it: {
      title: 'Tecnologia SUBGarden',
      subtitle: 'Innovazione al servizio del tuo giardino',
      sections: [
        {
          title: 'Sistema Modulare Avanzato',
          description:
            'Il sistema SUBGarden utilizza un approccio modulare che si adatta perfettamente a qualsiasi tipo di giardino, dal piccolo spazio urbano al grande parco. Componenti standardizzati garantiscono facilità di installazione e manutenzione, mentre la flessibilità del sistema permette personalizzazioni su misura.',
          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        },
        {
          title: 'Controllo Intelligente IoT',
          description:
            'Grazie all\'integrazione con sensori avanzati di umidità, temperatura e pH, il sistema monitora costantemente le condizioni del terreno e regola l\'irrigazione in modo automatico. L\'app mobile ti permette di controllare e programmare l\'irrigazione da remoto, con notifiche in tempo reale.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        },
        {
          title: 'Efficienza Idrica Massima',
          description:
            'La distribuzione diretta alle radici elimina sprechi per evaporazione e ruscellamento, garantendo un utilizzo ottimale dell\'acqua con risparmi fino al 60% rispetto all\'irrigazione tradizionale. Il sistema è progettato per massimizzare l\'assorbimento radicale.',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
        },
        {
          title: 'Installazione Professionale Certificata',
          description:
            'Il nostro team di esperti certificati garantisce un\'installazione precisa e personalizzata, rispettando le caratteristiche uniche del tuo spazio verde. Offriamo consulenza progettuale, installazione chiavi in mano e formazione per la gestione del sistema.',
          image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        },
      ],
    },
    en: {
      title: 'SUBGarden Technology',
      subtitle: 'Innovation at the service of your garden',
      sections: [
        {
          title: 'Modular System',
          description:
            'The SUBGarden system uses a modular approach that adapts perfectly to any type of garden, from small urban spaces to large parks.',
        },
        {
          title: 'Smart Control',
          description:
            'Thanks to integration with advanced sensors, the system constantly monitors soil conditions and automatically adjusts irrigation.',
        },
        {
          title: 'Water Efficiency',
          description:
            'Direct distribution to roots eliminates waste and ensures optimal water use, with savings of up to 60%.',
        },
        {
          title: 'Professional Installation',
          description:
            'Our team of experts ensures precise and customized installation, respecting the unique characteristics of your green space.',
        },
      ],
    },
    de: {
      title: 'SUBGarden Technologie',
      subtitle: 'Innovation im Dienste Ihres Gartens',
      sections: [
        {
          title: 'Modulares System',
          description:
            'Das SUBGarden-System verwendet einen modularen Ansatz, der sich perfekt an jeden Gartentyp anpasst, von kleinen urbanen Räumen bis hin zu großen Parks.',
        },
        {
          title: 'Intelligente Steuerung',
          description:
            'Dank der Integration fortschrittlicher Sensoren überwacht das System ständig die Bodenbedingungen und passt die Bewässerung automatisch an.',
        },
        {
          title: 'Wassereffizienz',
          description:
            'Die direkte Verteilung an die Wurzeln eliminiert Verschwendung und gewährleistet eine optimale Wassernutzung mit Einsparungen von bis zu 60%.',
        },
        {
          title: 'Professionelle Installation',
          description:
            'Unser Expertenteam gewährleistet eine präzise und maßgeschneiderte Installation unter Berücksichtigung der einzigartigen Eigenschaften Ihres Grüns.',
        },
      ],
    },
  };

  const pageContent = content[locale as keyof typeof content] || content.it;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-deep-teal to-stone-grey text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              {pageContent.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {pageContent.subtitle}
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pageContent.sections.map((section, index) => (
                <MotionDiv
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden">
                    {section.image && (
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/60 to-transparent" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl text-deep-teal">
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{section.description}</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
