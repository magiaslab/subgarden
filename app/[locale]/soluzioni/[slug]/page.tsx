import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { DripLine } from '@/components/site/DripLine';
import { ButtonLink } from '@/components/ui/Button';
import { ComparisonTableSection } from '@/components/sections/ComparisonTableSection';
import { Link } from '@/lib/i18n/routing';
import { solutions as solutionList } from '@/lib/solutions';
import { SITE_URL, absoluteUrl, alternates, pick } from '@/lib/utils/metadata';

// Tipi per card estese (giardini residenziali)
type CardItem = { iconIndex: number; title: string; body: string };

// Dati statici per le soluzioni (in futuro verranno dal CMS)
const solutions = {
  'giardini-residenziali': {
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

const TITLE_PREFIX: Record<string, string> = {
  it: 'Subirrigazione per ',
  en: 'Subsurface irrigation for ',
  de: 'Unterflurbewässerung: ',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const solution = (solutions as any)[slug];
  if (!solution) {
    return {};
  }
  const content = solution[locale] || solution.it;
  const name: string = locale === 'de' ? content.title : content.title.toLowerCase();
  return {
    title: pick(TITLE_PREFIX, locale) + name,
    description: content.description,
    alternates: alternates({ pathname: '/soluzioni/[slug]', params: { slug } }, locale),
  };
}

/*
 * Titolo mostrato nella pagina (h1): in italiano senza le maiuscole a ogni parola.
 * Il nome nei dati strutturati e nei metadati resta `content.title`.
 */
const HEADING: Record<string, Record<string, string>> = {
  'giardini-residenziali': { it: 'Giardini residenziali' },
  'parchi-pubblici': { it: 'Parchi pubblici e spazi verdi' },
  'campi-sportivi': { it: 'Campi sportivi e strutture ricreative' },
  'strutture-turistiche': { it: 'Strutture turistiche' },
};

/*
 * I numeri della soluzione, presi dai testi qui sopra (nessun dato nuovo). Il valore
 * grande è per l'occhio; la frase, con il numero dentro, è quella che leggono tutti.
 */
type Fact = { value: string; count?: string; text: string };
const FACTS: Record<string, Record<string, Fact[]>> = {
  'giardini-residenziali': {
    it: [
      { value: '70%', count: '70', text: 'Fino al 70% di acqua in meno rispetto all’irrigazione a pioggia.' },
      { value: '>90%', count: '90', text: 'Efficienza della distribuzione oltre il 90%, per capillarità.' },
    ],
    en: [
      { value: '70%', count: '70', text: 'Up to 70% less water than sprinkler irrigation.' },
      { value: '>90%', count: '90', text: 'Distribution efficiency above 90%, by capillarity.' },
    ],
    de: [
      { value: '70 %', count: '70', text: 'Bis zu 70 % weniger Wasser als mit Sprinklerbewässerung.' },
      { value: '>90 %', count: '90', text: 'Verteilungseffizienz über 90 %, durch Kapillarität.' },
    ],
  },
  'parchi-pubblici': {
    it: [
      { value: '50+ ha', count: '50', text: 'Da 500 m² a oltre 50 ettari con un unico sistema.' },
      { value: '40–50%', text: 'Dal 40 al 50% di costi annui in meno rispetto all’irrigazione a pioggia.' },
    ],
    en: [
      { value: '50+ ha', count: '50', text: 'From 500 m² to over 50 hectares with a single system.' },
      { value: '40–50%', text: '40 to 50% lower annual costs than sprinkler irrigation.' },
    ],
    de: [
      { value: '50+ ha', count: '50', text: 'Von 500 m² bis über 50 Hektar mit einem einzigen System.' },
      { value: '40–50 %', text: '40 bis 50 % geringere jährliche Kosten als mit Sprinklerbewässerung.' },
    ],
  },
  'campi-sportivi': {
    it: [
      { value: '>90%', count: '90', text: 'Efficienza idrica oltre il 90%, senza zone secche né allagate.' },
      { value: '70%', count: '70', text: 'Fino al 70% di tempo di manutenzione in meno rispetto ai sistemi tradizionali.' },
    ],
    en: [
      { value: '>90%', count: '90', text: 'Water efficiency above 90%, with no dry or flooded patches.' },
      { value: '70%', count: '70', text: 'Up to 70% less maintenance time than traditional systems.' },
    ],
    de: [
      { value: '>90 %', count: '90', text: 'Wassereffizienz über 90 %, ohne trockene oder überflutete Stellen.' },
      { value: '70 %', count: '70', text: 'Bis zu 70 % weniger Wartungszeit als bei herkömmlichen Systemen.' },
    ],
  },
  'strutture-turistiche': {
    it: [
      { value: '70%', count: '70', text: 'Fino al 70% di acqua in meno rispetto all’irrigazione a pioggia.' },
    ],
    en: [{ value: '70%', count: '70', text: 'Up to 70% less water than sprinkler irrigation.' }],
    de: [{ value: '70 %', count: '70', text: 'Bis zu 70 % weniger Wasser als mit Sprinklerbewässerung.' }],
  },
};

/** "70%" con count "70" → prima, numero che conta, dopo. */
function FactValue({ value, count }: { value: string; count?: string }) {
  const at = count ? value.indexOf(count) : -1;
  if (!count || at < 0) return <>{value}</>;
  return (
    <>
      {value.slice(0, at)}
      <span data-count={count}>{count}</span>
      {value.slice(at + count.length)}
    </>
  );
}

export default async function SoluzionePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const solution = (solutions as any)[slug];

  if (!solution) {
    notFound();
  }

  const content = solution[locale] || solution.it;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: content.description,
    url: absoluteUrl({ pathname: '/soluzioni/[slug]', params: { slug } }, locale as Locale),
    serviceType: 'Subirrigazione',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Toscana' },
  };

  const t = await getTranslations('solutionsPage');
  const tn = await getTranslations('nav');
  const ts = await getTranslations('operationalStrip');
  const lang = locale as 'it' | 'en' | 'de';
  const heading = HEADING[slug]?.[locale] ?? content.title;
  const facts = FACTS[slug]?.[locale] ?? FACTS[slug]?.it ?? [];
  const cards = content.cards as CardItem[];
  const others = solutionList.filter((s) => s.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('detail_eyebrow')}
          title={heading}
          lead={content.heroSubtitle ?? content.description}
          image={{ src: content.image }}
          breadcrumb={[
            { label: tn('home'), href: '/' },
            { label: tn('solutions'), href: '/soluzioni' },
            { label: heading },
          ]}
        >
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </PageHero>

        {/* I numeri sulla linea gocciolante, come nella home */}
        {facts.length > 0 && (
          <section aria-label={t('facts_label')} className="bg-surface py-14 lg:py-20">
            <div className="container-site">
              <DripLine drops={20} />
              <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {facts.map((f) => (
                  <li key={f.text} className="border-l border-line pl-5">
                    <p aria-hidden className="type-data mb-3 text-brand">
                      <FactValue value={f.value} count={f.count} />
                    </p>
                    <p className="type-body text-ink-muted">{f.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Cosa cambia: intestazione ferma a sinistra, voci numerate con filetti a destra */}
        <Section tone="surface" className="pt-4 md:pt-6 lg:pt-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionIntro eyebrow={t('features_eyebrow')} title={t('features_title')} lead={content.description} />
              </div>
            </div>
            <ol className="border-t border-line lg:col-span-7">
              {cards.map((card, i) => (
                <li key={card.title} className="grid gap-3 border-b border-line py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6 lg:py-10">
                  <span aria-hidden className="type-eyebrow pt-1.5 text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="type-h3 text-ink">{card.title}</h3>
                    <p className="type-body mt-3 max-w-prose text-ink-muted">{card.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* La foto grande, che si allarga ai bordi */}
        <figure data-expand className="relative aspect-4/3 overflow-hidden bg-surface-inverse sm:aspect-16/9 lg:aspect-[21/9]">
          <Image src={content.image} alt="" fill sizes="100vw" className="object-cover" data-parallax="0.1" />
        </figure>

        {/* I tre passi del lavoro */}
        <Section tone="inverse">
          <SectionIntro inverse eyebrow={t('method_eyebrow')} title={ts('title')} />
          <DripLine inverse drops={18} className="mt-12 lg:mt-16" />
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <p className="type-eyebrow text-ink-inverse/80">0{i}</p>
                <h3 className="type-h3 mt-2 text-ink-inverse">{ts(`step${i}_title`)}</h3>
                <p className="type-body mt-2 text-ink-inverse/85">{ts(`step${i}_desc`)}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/tecnologia" variant="inverse" className="mt-12">
            {t('tech_link')}
          </ButtonLink>
        </Section>

        <ComparisonTableSection eyebrow={t('compare_eyebrow')} />

        {/* Le altre soluzioni, come righe */}
        <Section tone="surface">
          <h2 className="type-h2 text-ink">{t('other_title')}</h2>
          <ul className="mt-10 border-t border-line">
            {others.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link
                  href={{ pathname: '/soluzioni/[slug]', params: { slug: s.slug } }}
                  className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-5 py-5 sm:grid-cols-[9rem_1fr_auto] lg:grid-cols-[12rem_1fr_1.2fr_auto] lg:gap-10 lg:py-7"
                >
                  <span className="rounded-media relative block aspect-4/3 bg-surface-alt">
                    <Image src={s.image} alt="" fill sizes="(min-width: 64rem) 12rem, 9rem" className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105" />
                  </span>
                  <span className="type-h3 text-ink transition-colors group-hover:text-brand">{s.title[lang] ?? s.title.it}</span>
                  <span className="type-body hidden text-ink-muted lg:block">{s.description[lang] ?? s.description.it}</span>
                  <ArrowUpRight aria-hidden className="size-6 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
