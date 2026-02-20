export const solutions = [
  {
    slug: 'giardini-residenziali',
    title: {
      it: 'Giardini Residenziali',
      en: 'Residential Gardens',
      de: 'Wohngebiete',
    },
    description: {
      it: 'Soluzioni di subirrigazione di lusso per ville e residenze private.',
      en: 'Luxury sub-irrigation solutions for villas and private residences.',
      de: 'Luxus-Unterflurbewässerungslösungen für Villen und Privatresidenzen.',
    },
    image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
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
    image: '/green-park-view.jpg',
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
    image: '/grassland-landscape-greening-environment-park-background.jpg',
  },
] as const;

export type SolutionSlug = (typeof solutions)[number]['slug'];
