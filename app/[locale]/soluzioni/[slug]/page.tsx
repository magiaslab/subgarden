import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionDiv } from '@/components/ui/Motion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { OperationalMethodStrip } from '@/components/sections/OperationalMethodStrip';
import { ComparisonTableSection } from '@/components/sections/ComparisonTableSection';
import Image from 'next/image';
import {
  Droplets,
  Zap,
  Smartphone,
  Layers,
  BadgeCheck,
  Leaf,
  Maximize,
  LayoutDashboard,
  TrendingDown,
  Footprints,
  Grid,
  Target,
  Clock,
  Settings2,
} from 'lucide-react';

// Tipi per card estese (giardini residenziali)
type CardItem = { iconIndex: number; title: string; body: string };

// Dati statici per le soluzioni (in futuro verranno dal CMS)
const solutions = {
  'giardini-residenziali': {
    icons: [Droplets, Layers, Zap, Smartphone, Leaf],
    it: {
      title: 'Giardini Residenziali',
      description:
        'Subirrigazione per giardini privati e residenziali: risparmio idrico fino al 70% e installazione non invasiva che mantiene il manto erboso intatto.',
      heroSubtitle:
        'Subirrigazione per giardini privati e residenziali. Massimo risparmio idrico e installazione non invasiva: il manto erboso resta intatto, senza scavi distruttivi.',
      image: '/giardini%20residenziali.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Risparmio idrico fino al 70%',
          body: 'L\'acqua arriva solo alle radici, in profondità. Niente evaporazione né ruscellamento in superficie: rispetto all\'irrigazione a pioggia si riducono drasticamente gli sprechi. Distribuzione uniforme per capillarità, con efficienza superiore al 90%.',
        },
        {
          iconIndex: 1,
          title: 'Installazione non invasiva, manto intatto',
          body: 'Il nostro sistema brevettato si installa in giardini già esistenti senza distruggere il prato. Nessuno scavo invasivo: il manto erboso resta intatto e il giardino è subito utilizzabile. Intervento rapido, pulito e rispettoso del verde che hai già.',
        },
        {
          iconIndex: 2,
          title: 'Manutenzione minima',
          body: 'Sistema automatizzato con programmazione e allarmi preventivi. Controlli ridotti al minimo e massima tranquillità grazie alla tecnologia affidabile e alla bassa pressione richiesta.',
        },
        {
          iconIndex: 3,
          title: 'Controllo completo via app',
          body: 'Gestisci irrigazione e programmi da smartphone con l\'app dedicata per iOS e Android. Avvio e stop a distanza, monitoraggio del funzionamento e notifiche in tempo reale: il tuo giardino sempre sotto controllo, ovunque tu sia.',
        },
        {
          iconIndex: 4,
          title: 'Adattabile a terreno e vegetazione',
          body: 'Funziona su qualsiasi tipo di terreno e con ogni essenza: prati, aiuole, siepi. La flessibilità del sistema permette di progettare soluzioni su misura per il tuo spazio verde.',
        },
      ] as CardItem[],
    },
    en: {
      title: 'Residential Gardens',
      description:
        'Sub-irrigation for private and residential gardens: up to 70% water saving and non-invasive installation that keeps your lawn intact.',
      heroSubtitle:
        'Sub-irrigation for private and residential gardens. Maximum water saving and non-invasive installation: your lawn stays intact, with no destructive digging.',
      image: '/giardini%20residenziali.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Water saving up to 70%',
          body: 'Water reaches only the roots, deep in the soil. No surface evaporation or runoff: compared to sprinkler irrigation, waste is drastically reduced. Uniform distribution by capillarity, with over 90% efficiency.',
        },
        {
          iconIndex: 1,
          title: 'Non-invasive installation, lawn intact',
          body: 'Our patented system installs in existing gardens without destroying the lawn. No invasive digging: the turf stays intact and the garden is ready to use right away. Quick, clean work that respects the greenery you already have.',
        },
        {
          iconIndex: 2,
          title: 'Minimal maintenance',
          body: 'Automated system with scheduling and preventive alerts. Minimal checks required and peace of mind thanks to reliable technology and low pressure requirements.',
        },
        {
          iconIndex: 3,
          title: 'Full control via app',
          body: 'Manage irrigation and schedules from your smartphone with the dedicated app for iOS and Android. Remote start and stop, operation monitoring and real-time notifications: your garden always under control, wherever you are.',
        },
        {
          iconIndex: 4,
          title: 'Adaptable to soil and vegetation',
          body: 'Works on any soil type and with every plant: lawns, flower beds, hedges. The system\'s flexibility allows tailored solutions for your green space.',
        },
      ] as CardItem[],
    },
    de: {
      title: 'Wohngebiete',
      description:
        'Unterflurbewässerung für private und Wohn-Gärten: bis zu 70% Wassereinsparung und nicht-invasive Installation mit intaktem Rasen.',
      heroSubtitle:
        'Unterflurbewässerung für private Gärten und Wohnanlagen. Maximale Wassereinsparung und nicht-invasive Installation: Der Rasen bleibt intakt, ohne zerstörerische Eingriffe.',
      image: '/giardini%20residenziali.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Wassereinsparung bis zu 70%',
          body: 'Wasser gelangt nur zu den Wurzeln in die Tiefe. Keine Oberflächenverdunstung, kein Oberflächenabfluss: Im Vergleich zur Sprinklerbewässerung wird die Verschwendung drastisch reduziert. Gleichmäßige Verteilung durch Kapillarität, mit über 90% Effizienz.',
        },
        {
          iconIndex: 1,
          title: 'Nicht-invasive Installation, Rasen intakt',
          body: 'Unser patentiertes System wird in bestehenden Gärten installiert, ohne den Rasen zu zerstören. Kein invasives Graben: Der Rasen bleibt intakt und der Garten sofort nutzbar. Schneller, sauberer Eingriff mit Respekt für Ihr bestehendes Grün.',
        },
        {
          iconIndex: 2,
          title: 'Minimaler Wartungsaufwand',
          body: 'Automatisiertes System mit Programmierung und präventiven Warnungen. Kontrollen auf ein Minimum reduziert und maximale Ruhe dank zuverlässiger Technik und geringem Druckbedarf.',
        },
        {
          iconIndex: 3,
          title: 'Vollständige Steuerung per App',
          body: 'Bewässerung und Programme bequem per Smartphone mit der App für iOS und Android verwalten. Start und Stopp aus der Ferne, Überwachung und Echtzeit-Benachrichtigungen: Ihr Garten immer unter Kontrolle, wo auch immer Sie sind.',
        },
        {
          iconIndex: 4,
          title: 'Anpassbar an Boden und Vegetation',
          body: 'Einsetzbar auf jedem Bodentyp und mit jeder Bepflanzung: Rasen, Beete, Hecken. Die Flexibilität des Systems ermöglicht maßgeschneiderte Lösungen für Ihren Garten.',
        },
      ] as CardItem[],
    },
  },
  'parchi-pubblici': {
    icons: [Maximize, LayoutDashboard, TrendingDown, Leaf, Footprints],
    it: {
      title: 'Parchi Pubblici e Spazi Verdi',
      description: 'Soluzione professionale e scalabile per spazi verdi pubblici, parchi urbani e aree ricreative. Risparmio idrico e riduzione costi con controllo centralizzato.',
      heroSubtitle:
        'Subirrigazione per parchi urbani e aree ricreative. Scalabile da 500 mq a 50+ ettari, con risparmio idrico e riduzione dei costi operativi fino al 50%. Controllo centralizzato e installazione non invasiva.',
      image: '/parco%20pubblico.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Scalabilità per grandi aree',
          body: 'Dai 500 mq ai 50+ ettari: un unico sistema adattabile a parchi urbani, giardini pubblici e aree ricreative. Progettazione modulare e gestione centralizzata per massimizzare efficienza e risparmio idrico su ogni superficie.',
        },
        {
          iconIndex: 1,
          title: 'Monitoraggio centralizzato',
          body: 'Dashboard dedicata per il controllo in tempo reale di zone e programmi. Supervisione da remoto, allarmi e report: gestione semplificata anche di impianti molto estesi senza dispendio di risorse.',
        },
        {
          iconIndex: 2,
          title: 'Riduzione costi operativi',
          body: 'Fino al 40-50% di riduzione dei costi annui rispetto all\'irrigazione a pioggia: meno acqua, meno manutenzione, meno sprechi. Investimento che si ripaga nel tempo grazie all\'efficienza del sistema.',
        },
        {
          iconIndex: 3,
          title: 'Sostenibilità e conformità',
          body: 'Sostenibilità ambientale certificata e piena conformità alle normative per il verde pubblico. Soluzione ideale per appalti e bandi che richiedono efficienza idrica e riduzione dell\'impatto.',
        },
        {
          iconIndex: 4,
          title: 'Resistenza e integrazione',
          body: 'Resistenza al calpestio e alle condizioni atmosferiche estreme. Integrazione con i sistemi di gestione comunali esistenti per un inserimento senza strappi nell\'operatività quotidiana.',
        },
      ] as CardItem[],
    },
    en: {
      title: 'Public Parks and Green Spaces',
      description: 'Professional and scalable solution for public green spaces, urban parks, and recreational areas. Water saving and cost reduction with centralized control.',
      heroSubtitle:
        'Sub-irrigation for urban parks and recreational areas. Scalable from 500 sqm to 50+ hectares, with water saving and up to 50% reduction in operational costs. Centralized control and non-invasive installation.',
      image: '/parco%20pubblico.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Scalability for large areas',
          body: 'From 500 sqm to 50+ hectares: a single system adaptable to urban parks, public gardens and recreational areas. Modular design and centralized management for maximum efficiency and water saving on any scale.',
        },
        {
          iconIndex: 1,
          title: 'Centralized monitoring',
          body: 'Dedicated dashboard for real-time control of zones and schedules. Remote supervision, alerts and reports: simplified management of large installations without wasting resources.',
        },
        {
          iconIndex: 2,
          title: 'Operational cost reduction',
          body: 'Up to 40-50% reduction in annual costs compared to sprinkler irrigation: less water, less maintenance, less waste. An investment that pays for itself over time thanks to system efficiency.',
        },
        {
          iconIndex: 3,
          title: 'Sustainability and compliance',
          body: 'Certified environmental sustainability and full compliance with regulations for public green spaces. Ideal for tenders and projects requiring water efficiency and reduced impact.',
        },
        {
          iconIndex: 4,
          title: 'Durability and integration',
          body: 'Resistance to foot traffic and extreme weather. Integration with existing municipal management systems for seamless adoption in day-to-day operations.',
        },
      ] as CardItem[],
    },
    de: {
      title: 'Öffentliche Parks und Grünflächen',
      description: 'Professionelle und skalierbare Lösung für öffentliche Grünflächen, Stadtparks und Erholungsgebiete. Wassersparen und Kostensenkung mit zentraler Steuerung.',
      heroSubtitle:
        'Unterflurbewässerung für Stadtparks und Erholungsflächen. Skalierbar von 500 m² bis 50+ Hektar, mit Wassereinsparung und bis zu 50% geringeren Betriebskosten. Zentrale Steuerung und nicht-invasive Installation.',
      image: '/parco%20pubblico.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Skalierbarkeit für große Flächen',
          body: 'Von 500 m² bis 50+ Hektar: ein einziges System für Stadtparks, öffentliche Gärten und Erholungsgebiete. Modulare Planung und zentrale Steuerung für maximale Effizienz und Wassereinsparung.',
        },
        {
          iconIndex: 1,
          title: 'Zentrale Überwachung',
          body: 'Dediziertes Dashboard für Echtzeitkontrolle von Zonen und Programmen. Fernüberwachung, Alarme und Berichte: vereinfachte Verwaltung auch großer Anlagen ohne Ressourcenverschwendung.',
        },
        {
          iconIndex: 2,
          title: 'Senkung der Betriebskosten',
          body: 'Bis zu 40-50% geringere jährliche Kosten im Vergleich zur Sprinklerbewässerung: weniger Wasser, weniger Wartung, weniger Verschwendung. Eine Investition, die sich durch die Systemeffizienz amortisiert.',
        },
        {
          iconIndex: 3,
          title: 'Nachhaltigkeit und Konformität',
          body: 'Zertifizierte Umweltnachhaltigkeit und volle Einhaltung der Vorschriften für öffentliches Grün. Ideal für Ausschreibungen mit Anforderungen an Wassereffizienz und geringe Umweltauswirkungen.',
        },
        {
          iconIndex: 4,
          title: 'Widerstandsfähigkeit und Integration',
          body: 'Beständigkeit bei Trittbelastung und extremen Wetterbedingungen. Integration in bestehende kommunale Managementsysteme für eine nahtlose Einbindung in den Betriebsalltag.',
        },
      ] as CardItem[],
    },
  },
  'campi-sportivi': {
    icons: [Grid, Footprints, Target, Clock, Settings2],
    it: {
      title: 'Campi Sportivi e Strutture Ricreative',
      description:
        'Sistema ottimizzato per campi da calcio, golf, tennis e altre strutture sportive. Manto uniforme tutto l\'anno, risparmio idrico e manutenzione ridotta.',
      heroSubtitle:
        'Subirrigazione per campi da calcio, golf, tennis e strutture sportive. Irrigazione uniforme senza zone secche o allagate, resistenza al calpestio intensivo e riduzione della manutenzione fino al 70%.',
      image: '/impianto%20sortivo.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Irrigazione uniforme',
          body: 'Distribuzione omogenea su grandi superfici: niente zone secche né allagate. Il manto erboso resta uniforme e performante in ogni punto, con efficienza idrica superiore al 90% e massima qualità del gioco.',
        },
        {
          iconIndex: 1,
          title: 'Resistenza al calpestio',
          body: 'Progettato per carichi intensivi e sollecitazioni meccaniche. Ideale per campi da calcio, golf, tennis e ogni struttura soggetta a uso continuativo: il sistema resta invisibile e integro sotto il prato.',
        },
        {
          iconIndex: 2,
          title: 'Controllo zone e programmazione',
          body: 'Programmazione differenziata per zone (campo, bordi, aree ombre). Controllo preciso di tempi e portate per adattare l\'irrigazione alle esigenze di ogni superficie e ridurre al minimo gli sprechi.',
        },
        {
          iconIndex: 3,
          title: 'Manutenzione ridotta',
          body: 'Fino al 70% di riduzione dei tempi di manutenzione rispetto ai sistemi tradizionali. Automazione, bassa pressione e componenti affidabili: meno interventi in campo e costi gestionali contenuti.',
        },
        {
          iconIndex: 4,
          title: 'Compatibilità e certificazioni',
          body: 'Compatibile con sistemi di drenaggio e aerazione esistenti. Soluzione adatta a impianti sportivi professionistici e in linea con le certificazioni richieste per i manti di gioco.',
        },
      ] as CardItem[],
    },
    en: {
      title: 'Sports Fields and Recreational Facilities',
      description: 'Optimized system for football, golf, tennis and other sports facilities. Uniform turf year-round, water saving and reduced maintenance.',
      heroSubtitle:
        'Sub-irrigation for football pitches, golf courses, tennis courts and sports facilities. Uniform irrigation without dry or flooded areas, resistance to intensive use and up to 70% less maintenance.',
      image: '/impianto%20sortivo.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Uniform irrigation',
          body: 'Even distribution over large surfaces: no dry or flooded patches. Turf stays uniform and high-performing across the whole area, with over 90% water efficiency and top playing quality.',
        },
        {
          iconIndex: 1,
          title: 'Traffic resistance',
          body: 'Designed for intensive use and mechanical stress. Ideal for football, golf, tennis and any facility in constant use: the system stays invisible and intact under the turf.',
        },
        {
          iconIndex: 2,
          title: 'Zone control and scheduling',
          body: 'Differentiated programming by zone (pitch, edges, shaded areas). Precise control of timing and flow to match irrigation to each area and minimise waste.',
        },
        {
          iconIndex: 3,
          title: 'Reduced maintenance',
          body: 'Up to 70% less maintenance time compared to traditional systems. Automation, low pressure and reliable components: fewer interventions and lower running costs.',
        },
        {
          iconIndex: 4,
          title: 'Compatibility and certifications',
          body: 'Compatible with existing drainage and aeration systems. Suitable for professional sports facilities and in line with certifications required for playing surfaces.',
        },
      ] as CardItem[],
    },
    de: {
      title: 'Sportplätze und Freizeiteinrichtungen',
      description: 'Optimiertes System für Fußball-, Golf-, Tennis- und andere Sportanlagen. Gleichmäßiger Rasen ganzjährig, Wassereinsparung und weniger Wartung.',
      heroSubtitle:
        'Unterflurbewässerung für Fußballplätze, Golfplätze, Tennisplätze und Sportanlagen. Gleichmäßige Bewässerung ohne trockene oder überflutete Zonen, hohe Belastbarkeit und bis zu 70% weniger Wartung.',
      image: '/impianto%20sortivo.jpg',
      cards: [
        {
          iconIndex: 0,
          title: 'Gleichmäßige Bewässerung',
          body: 'Homogene Verteilung auf großen Flächen: weder trockene noch überflutete Bereiche. Der Rasen bleibt gleichmäßig und leistungsfähig, mit über 90% Wassereffizienz und hoher Spielfeldqualität.',
        },
        {
          iconIndex: 1,
          title: 'Trittfestigkeit',
          body: 'Konzipiert für intensive Nutzung und mechanische Belastung. Ideal für Fußball, Golf, Tennis und alle stark genutzten Anlagen: Das System bleibt unsichtbar und intakt unter dem Rasen.',
        },
        {
          iconIndex: 2,
          title: 'Zonensteuerung und Programmierung',
          body: 'Differenzierte Programmierung nach Zonen (Spielfeld, Ränder, Schattenbereiche). Präzise Steuerung von Zeit und Durchfluss für angepasste Bewässerung und minimalen Verschwendung.',
        },
        {
          iconIndex: 3,
          title: 'Geringerer Wartungsaufwand',
          body: 'Bis zu 70% weniger Wartungszeit im Vergleich zu herkömmlichen Systemen. Automatisierung, niedriger Druck und zuverlässige Komponenten: weniger Eingriffe und geringere Betriebskosten.',
        },
        {
          iconIndex: 4,
          title: 'Kompatibilität und Zertifizierungen',
          body: 'Kompatibel mit bestehenden Drainage- und Belüftungssystemen. Geeignet für professionelle Sportanlagen und konform mit den Anforderungen an Spielflächen.',
        },
      ] as CardItem[],
    },
  },
  'strutture-turistiche': {
    icons: [Leaf, Droplets, Zap, LayoutDashboard, BadgeCheck],
    it: {
      title: 'Strutture Turistiche',
      description:
        'Subirrigazione per hotel, resort, B&B e agriturismi: giardini sempre curati, risparmio idrico ed energetico e immagine di qualità per gli ospiti.',
      heroSubtitle:
        'Migliora i giardini della tua struttura con la subirrigazione SUBGarden: fino al 70% di risparmio idrico, installazione non invasiva e verde impeccabile tutto l\'anno. Ideale per hotel, resort, B&B e agriturismi.',
      image: '/hotel2.jpeg',
      cards: [
        {
          iconIndex: 0,
          title: 'Risparmio idrico ed energetico',
          body: 'Fino al 70% di risparmio idrico rispetto all\'irrigazione a pioggia e riduzione dei consumi energetici grazie alla bassa pressione. Meno costi in bolletta e minore impatto ambientale: un vantaggio concreto per la gestione della struttura.',
        },
        {
          iconIndex: 1,
          title: 'Giardini sempre curati',
          body: 'Prato e aree verdi uniformi e in salute tutto l\'anno, senza zone secche o allagate. L\'irrigazione in profondità garantisce un aspetto impeccabile che valorizza l\'immagine della struttura e l\'esperienza degli ospiti.',
        },
        {
          iconIndex: 2,
          title: 'Installazione non invasiva',
          body: 'Il sistema si installa in giardini già esistenti senza scavare o danneggiare il manto. Ideale per strutture già operative: intervento rapido, pulito e senza disagi per l\'attività. Il verde resta utilizzabile subito dopo i lavori.',
        },
        {
          iconIndex: 3,
          title: 'Gestione e automazione',
          body: 'Programmazione e controllo da remoto con l\'app dedicata. Gestisci l\'irrigazione in base alla stagione e all’occupazione, con allarmi e monitoraggio: meno tempo in manutenzione e massima efficienza.',
        },
        {
          iconIndex: 4,
          title: 'Sostenibilità e valore',
          body: 'Riduci l’impronta idrica e valorizza l’offerta della struttura con un sistema sostenibile certificato. Un plus per gli ospiti attenti all’ambiente e per bandi o certificazioni green (es. Ecolabel, Green Key).',
        },
      ] as CardItem[],
    },
    en: {
      title: 'Tourism & Hospitality',
      description:
        'Sub-irrigation for hotels, resorts, B&Bs and agritourism: well-kept gardens, water and energy saving, and a premium image for guests.',
      heroSubtitle:
        'Upgrade your property\'s gardens with SUBGarden sub-irrigation: up to 70% water saving, non-invasive installation and flawless greenery year-round. Ideal for hotels, resorts, B&Bs and agritourism.',
      image: '/hotel2.jpeg',
      cards: [
        {
          iconIndex: 0,
          title: 'Water and energy saving',
          body: 'Up to 70% water saving compared to sprinkler irrigation and lower energy use thanks to low pressure. Lower bills and a smaller environmental footprint: a real advantage for property management.',
        },
        {
          iconIndex: 1,
          title: 'Gardens always well-kept',
          body: 'Lawn and green areas even and healthy year-round, with no dry or flooded patches. Deep irrigation ensures a flawless look that enhances the property\'s image and your guests\' experience.',
        },
        {
          iconIndex: 2,
          title: 'Non-invasive installation',
          body: 'The system installs in existing gardens without digging or damaging the turf. Ideal for properties already in operation: quick, clean work with minimal disruption. The garden is ready to use right after installation.',
        },
        {
          iconIndex: 3,
          title: 'Management and automation',
          body: 'Scheduling and remote control with the dedicated app. Manage irrigation by season and occupancy, with alerts and monitoring: less time on maintenance and maximum efficiency.',
        },
        {
          iconIndex: 4,
          title: 'Sustainability and value',
          body: 'Reduce water footprint and strengthen your offering with a certified sustainable system. A plus for eco-conscious guests and for green certifications or tenders (e.g. Ecolabel, Green Key).',
        },
      ] as CardItem[],
    },
    de: {
      title: 'Tourismus & Beherbergung',
      description:
        'Unterflurbewässerung für Hotels, Resorts, B&Bs und Agritourismus: gepflegte Gärten, Wasser- und Energieeinsparung und ein hochwertiges Image für Gäste.',
      heroSubtitle:
        'Verbessern Sie die Gärten Ihrer Unterkunft mit SUBGarden Unterflurbewässerung: bis zu 70% Wassereinsparung, nicht-invasive Installation und makelloses Grün das ganze Jahr. Ideal für Hotels, Resorts, B&Bs und Agritourismus.',
      image: '/hotel2.jpeg',
      cards: [
        {
          iconIndex: 0,
          title: 'Wasser- und Energieeinsparung',
          body: 'Bis zu 70% Wassereinsparung im Vergleich zur Sprinklerbewässerung und geringerer Energieverbrauch durch niedrigen Druck. Geringere Kosten und weniger Umweltauswirkungen: ein klarer Vorteil für das Betriebsmanagement.',
        },
        {
          iconIndex: 1,
          title: 'Gärten immer gepflegt',
          body: 'Rasen und Grünflächen ganzjährig gleichmäßig und gesund, ohne trockene oder überflutete Bereiche. Die Tiefenbewässerung sorgt für ein makelloses Erscheinungsbild, das das Image der Unterkunft und das Gästeerlebnis aufwertet.',
        },
        {
          iconIndex: 2,
          title: 'Nicht-invasive Installation',
          body: 'Das System wird in bestehenden Gärten ohne Graben oder Schäden am Rasen installiert. Ideal für bereits betriebene Unterkünfte: schnelle, saubere Arbeiten ohne nennenswerte Störungen. Der Garten ist direkt nach der Installation nutzbar.',
        },
        {
          iconIndex: 3,
          title: 'Steuerung und Automatisierung',
          body: 'Programmierung und Fernsteuerung mit der dedizierten App. Steuern Sie die Bewässerung nach Saison und Auslastung, mit Alarmen und Überwachung: weniger Zeit für die Wartung und maximale Effizienz.',
        },
        {
          iconIndex: 4,
          title: 'Nachhaltigkeit und Mehrwert',
          body: 'Reduzieren Sie den Wasser-Fußabdruck und stärken Sie Ihr Angebot mit einem zertifizierten nachhaltigen System. Ein Plus für umweltbewusste Gäste und für grüne Zertifizierungen oder Ausschreibungen (z. B. Ecolabel, Green Key).',
        },
      ] as CardItem[],
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = (solutions as any)[slug];

  if (!solution) {
    return {};
  }

  const content = solution[locale] || solution.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.subgarden.it';

  return {
    title: `${content.title} - SUBGarden`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/soluzioni/${slug}`,
      languages: {
        it: `${siteUrl}/it/soluzioni/${slug}`,
        en: `${siteUrl}/en/solutions/${slug}`,
        de: `${siteUrl}/de/loesungen/${slug}`,
      },
    },
  };
}

export default async function SoluzionePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const solution = (solutions as any)[slug];

  if (!solution) {
    notFound();
  }

  const content = solution[locale] || solution.it;
  const icons = solution.icons;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.subgarden.it';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: content.description,
    provider: {
      '@type': 'Organization',
      name: 'SUBGarden',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'State',
      name: 'Toscana',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src={content.image || "/rustic-patio-with-deck-furniture-vegetation.jpg"}
            alt={content.title}
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
              <Badge variant="outline" className="mb-4 bg-white/10 border-white/30 text-white">
                Soluzione
              </Badge>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 font-light italic">
                {(content as any).heroSubtitle ?? content.description}
              </p>
            </MotionDiv>
          </div>
        </section>

        <section className="py-20 bg-[#F2F4F7]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {content.image && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 rounded-xl overflow-hidden shadow-2xl relative h-[400px] w-full"
              >
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </MotionDiv>
            )}
            <h2 className="text-3xl font-serif font-bold text-deep-teal mb-10">
              Caratteristiche Principali
            </h2>

            {'cards' in content && Array.isArray((content as any).cards) ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {((content as any).cards as CardItem[]).map((card, index) => {
                  const Icon = icons[card.iconIndex] ?? BadgeCheck;
                  const accentStyles = [
                    'bg-sky-500/15 text-sky-700',
                    'bg-copper/20 text-copper',
                    'bg-amber-500/15 text-amber-700',
                    'bg-violet-500/15 text-violet-700',
                    'bg-emerald-600/15 text-emerald-700',
                  ];
                  const accent = accentStyles[card.iconIndex % accentStyles.length];
                  return (
                    <MotionDiv
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <Card className="h-full border-white/80 shadow-xl hover:shadow-2xl hover:border-copper/30 transition-all duration-300 overflow-hidden rounded-3xl p-8 md:p-10">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-deep-teal/5 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />
                        <CardHeader className="relative flex flex-row items-start gap-4 mb-2">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${accent}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <CardTitle className="text-xl md:text-2xl font-serif font-bold text-deep-teal mt-0">
                            {card.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative pt-2 pb-6">
                          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                            {card.body}
                          </p>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.features.map((feature: string, index: number) => {
                  const Icon = icons[index] || BadgeCheck;
                  return (
                    <MotionDiv
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="group hover:border-copper/50 transition-all duration-300 shadow-xl hover:shadow-2xl h-full border-white/50 p-0 overflow-hidden">
                        <CardContent className="p-8 flex flex-col items-center md:items-start text-center md:text-left h-full">
                          <div className="mb-8 p-4 rounded-2xl bg-[#F2F4F7] group-hover:bg-copper group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-inner">
                            <Icon className="w-8 h-8 text-deep-teal group-hover:text-white" />
                          </div>
                          <p className="text-lg text-gray-700 leading-relaxed font-medium group-hover:text-deep-teal transition-colors duration-300">{feature}</p>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <OperationalMethodStrip />
        <ComparisonTableSection />

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
