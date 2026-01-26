import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Search, PencilRuler, FileText, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const titles: Record<string, string> = {
    it: 'Tecnologia SUBGarden - Ingegneria Rain Bird® XSF',
    en: 'SUBGarden Technology - Rain Bird® XSF Engineering',
    de: 'SUBGarden Technologie - Rain Bird® XSF Technik',
  };

  const descriptions: Record<string, string> = {
    it: 'Scopri l\'ingegneria avanzata Rain Bird® alla base di SUBGarden. Ala gocciolante XSF, schema a griglia 300x330mm e zero sprechi idrici.',
    en: 'Discover the advanced Rain Bird® engineering behind SUBGarden. XSF drip line, 300x330mm grid pattern, and zero water waste.',
    de: 'Entdecken Sie die fortschrittliche Rain Bird®-Technik hinter SUBGarden. XSF-Tropfleitung, 300x330mm Gittermuster und keine Wasserverschwendung.',
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
  const t = await (getTranslations as any)('process');

  const content = {
    it: {
      title: 'Tecnologia SUBGarden',
      subtitle: 'L\'ingegneria Rain Bird® al servizio del paesaggio',
      sections: [
        {
          title: 'Sistema di Installazione Brevettato',
          description:
            'Il nostro metodo di installazione è unico e brevettato: progettato per giardini esistenti, permette di inserire il sistema senza scavi invasivi o distruttivi. L\'installazione è veloce, pulita e preserva immediatamente l\'estetica del tuo spazio verde.',
          image: '/grassland-landscape-greening-environment-park-background.jpg',
        },
        {
          title: 'Ala Gocciolante Rain Bird XSF®',
          description:
            'Il cuore di SUBGarden è l\'ala gocciolante Rain Bird XSF, l\'unica sul mercato auto-compensante da 0.4 a 3.6 atm, auto-pulente e dotata di protezione brevettata antintrusione delle radici. Garantisce prestazioni costanti e durature nel tempo.',
          image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
        },
        {
          title: 'Progettazione a Griglia di Precisione',
          description:
            'Per un\'irrigazione uniforme, seguiamo uno schema rigoroso: spaziatura tra le linee di 300 mm e passo dei gocciolatori di 330 mm. Questa densità assicura che ogni centimetro del prato riceva l\'acqua necessaria senza zone d\'ombra.',
          image: '/stunning-spring-collage.jpg',
        },
        {
          title: 'Manutenzione e Zero Impatto',
          description:
            'Il sistema è completamente invisibile e silenzioso. Ogni zona è dotata di valvole di spurgo aria e flush dell\'acqua, permettendo una manutenzione semplice senza bagnare la superficie o disturbare la quiete del giardino.',
          image: '/green-park-view.jpg',
        },
      ],
    },
    en: {
      title: 'SUBGarden Technology',
      subtitle: 'Rain Bird® engineering at the service of the landscape',
      sections: [
        {
          title: 'Patented Installation System',
          description:
            'Our installation method is unique and patented: designed for existing gardens, it allows the system to be inserted without invasive or destructive excavations. Installation is fast, clean, and immediately preserves the aesthetics of your green space.',
          image: '/grassland-landscape-greening-environment-park-background.jpg',
        },
        {
          title: 'Rain Bird XSF® Drip Line',
          description:
            'The heart of SUBGarden is the Rain Bird XSF drip line, the only one on the market that is self-compensating from 0.4 to 3.6 atm, self-cleaning, and equipped with patented root intrusion protection.',
          image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
        },
        {
          title: 'Precision Grid Design',
          description:
            'For uniform irrigation, we follow a rigorous pattern: 300mm line spacing and 330mm emitter spacing. This ensures every inch of the lawn receives the necessary water.',
          image: '/stunning-spring-collage.jpg',
        },
        {
          title: 'Zero Impact Maintenance',
          description:
            'The system is completely invisible and silent. Each zone is equipped with air bleed and water flush valves, allowing for simple maintenance without wetting the surface or disturbing the garden\'s peace.',
          image: '/green-park-view.jpg',
        },
      ],
    },
    de: {
      title: 'SUBGarden Technologie',
      subtitle: 'Rain Bird® Technik im Dienste der Landschaft',
      sections: [
        {
          title: 'Patentiertes Installationssystem',
          description:
            'Unsere Installationsmethode ist einzigartig und patentiert: Sie wurde für bestehende Gärten entwickelt und ermöglicht die Installation des Systems ohne invasive oder zerstörerische Ausgrabungen. Die Installation ist schnell, sauber und bewahrt sofort die Ästhetik Ihrer Grünfläche.',
          image: '/grassland-landscape-greening-environment-park-background.jpg',
        },
        {
          title: 'Rain Bird XSF® Tropfleitung',
          description:
            'Das Herzstück von SUBGarden ist die Rain Bird XSF Tropfleitung, die einzige auf dem Markt, die von 0,4 bis 3,6 atm selbstkompensierend, selbstreinigend und mit patentiertem Wurzeindringschutz ausgestattet ist.',
          image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
        },
        {
          title: 'Präzisionsgitter-Design',
          description:
            'Für eine gleichmäßige Bewässerung folgen wir einem strengen Schema: 300 mm Leitungsabstand und 330 mm Tropferabstand.',
          image: '/stunning-spring-collage.jpg',
        },
        {
          title: 'Wartung ohne Beeinträchtigung',
          description:
            'Das System ist völlig unsichtbar und leise. Jede Zone ist mit Entlüftungs- und Spülventilen ausgestattet, was eine einfache Wartung ermöglicht, ohne die Oberfläche zu benetzen oder die Ruhe im Garten zu stören.',
          image: '/green-park-view.jpg',
        },
      ],
    },
  };

  const pageContent = (content as any)[locale] || content.it;

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

        <section className="py-20 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pageContent.sections.map((section: any, index: number) => (
                <MotionDiv
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden">
                    {section.image && (
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl">
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

        {/* Operational Method Section */}
        <section className="py-24 bg-[#F2F4F7] border-t border-gray-200/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-teal mb-4">{t('title')}</h2>
              <div className="w-24 h-1.5 bg-copper mx-auto"></div>
            </div>
            
            <div className="space-y-12">
              {[
                { step: 1, icon: Search, color: "text-blue-600", bgColor: "bg-blue-50" },
                { step: 2, icon: PencilRuler, color: "text-purple-600", bgColor: "bg-purple-50" },
                { step: 3, icon: FileText, color: "text-amber-600", bgColor: "bg-amber-50" },
                { step: 4, icon: Zap, color: "text-orange-600", bgColor: "bg-orange-50" },
                { step: 5, icon: ShieldCheck, color: "text-green-600", bgColor: "bg-green-50" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <MotionDiv 
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Step Number Background Decor */}
                    <div className="absolute -right-4 -bottom-4 text-9xl font-serif font-bold text-gray-50 group-hover:text-gray-100 transition-colors duration-500 select-none -z-0">
                      {item.step}
                    </div>

                    <div className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 relative z-10 shadow-sm",
                      item.bgColor
                    )}>
                      <Icon className={cn("w-10 h-10", item.color)} />
                    </div>

                    <div className="relative z-10 text-center md:text-left">
                      <div className="flex flex-col items-center md:items-start mb-4">
                        <span className="text-copper font-bold uppercase tracking-widest text-sm mb-1">Fase {item.step}</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-deep-teal">
                          {t(`step${item.step}`)}
                        </h3>
                      </div>
                      <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                        {t(`step${item.step}_desc`)}
                      </p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
