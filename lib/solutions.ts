export const solutions = [
  {
    slug: 'giardini-residenziali',
    title: {
      it: 'Giardini Residenziali',
      en: 'Residential Gardens',
      de: 'Wohngebiete',
    },
    description: {
      it: 'Subirrigazione per ville e residenze: risparmio idrico e installazione non invasiva che mantiene il manto erboso intatto.',
      en: 'Sub-irrigation for villas and residences: water saving and non-invasive installation that keeps your lawn intact.',
      de: 'Unterflurbewässerung für Villen und Wohnanlagen: Wassersparen und nicht-invasive Installation mit intaktem Rasen.',
    },
    image: '/giardini%20residenziali.jpg',
  },
  {
    slug: 'parchi-pubblici',
    title: {
      it: 'Parchi Pubblici',
      en: 'Public Parks',
      de: 'Öffentliche Parks',
    },
    description: {
      it: 'Sistemi efficienti per la gestione di grandi aree verdi urbane.',
      en: 'Efficient systems for managing large urban green areas.',
      de: 'Effiziente Systeme für die Verwaltung großer städtischer Grünflächen.',
    },
    image: '/parco%20pubblico.jpg',
  },
  {
    slug: 'campi-sportivi',
    title: {
      it: 'Campi Sportivi',
      en: 'Sports Fields',
      de: 'Sportplätze',
    },
    description: {
      it: 'Manti erbosi perfetti e performanti per ogni disciplina sportiva.',
      en: 'Perfect and high-performance turf for every sporting discipline.',
      de: 'Perfekter und leistungsstarker Rasen für jede Sportdisziplin.',
    },
    image: '/impianto%20sortivo.jpg',
  },
  {
    slug: 'strutture-turistiche',
    title: {
      it: 'Strutture Turistiche',
      en: 'Tourism & Hospitality',
      de: 'Tourismus & Beherbergung',
    },
    description: {
      it: 'Subirrigazione per hotel, resort, B&B e agriturismi: giardini curati, risparmio idrico ed energetico e immagine sempre al top.',
      en: 'Sub-irrigation for hotels, resorts, B&Bs and agritourism: well-kept gardens, water and energy saving, and a premium image.',
      de: 'Unterflurbewässerung für Hotels, Resorts, B&Bs und Agritourismus: gepflegte Gärten, Wasser- und Energieeinsparung.',
    },
    image: '/hotel2.jpeg',
  },
] as const;

export type SolutionSlug = (typeof solutions)[number]['slug'];
