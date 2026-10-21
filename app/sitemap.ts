import { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';
import { routing } from '@/lib/i18n/routing';
import { getAllSlugs, getPostLocales } from '@/lib/blog';
import { solutions } from '@/lib/solutions';
import { absoluteUrl, alternates } from '@/lib/utils/metadata';

const cities = ['elba', 'maremma', 'livorno'];

type Href = Parameters<typeof absoluteUrl>[0];
type Entry = {
  href: Href;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  locales?: readonly Locale[];
};

// Solo pagine indicizzabili: privacy, termini e portfolio sono noindex e restano fuori.
// Gli indirizzi vengono dal routing di next-intl, così gli slug tradotti non divergono.
const pages: Entry[] = [
  { href: '/', priority: 1, changeFrequency: 'weekly' },
  { href: '/tecnologia', priority: 0.8, changeFrequency: 'monthly' },
  { href: '/chi-siamo', priority: 0.8, changeFrequency: 'monthly' },
  { href: '/soluzioni', priority: 0.8, changeFrequency: 'monthly' },
  ...solutions.map((s): Entry => ({
    href: { pathname: '/soluzioni/[slug]', params: { slug: s.slug } },
    priority: 0.7,
    changeFrequency: 'monthly',
  })),
  { href: '/territorio', priority: 0.7, changeFrequency: 'monthly' },
  ...cities.map((city): Entry => ({
    href: { pathname: '/territorio/[city]', params: { city } },
    priority: 0.6,
    changeFrequency: 'monthly',
  })),
  { href: '/contatti', priority: 0.8, changeFrequency: 'monthly' },
  { href: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { href: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  // Articoli: solo nelle lingue in cui esistono davvero.
  ...getAllSlugs().map((slug): Entry => ({
    href: { pathname: '/blog/[slug]', params: { slug } },
    priority: 0.6,
    changeFrequency: 'monthly',
    locales: getPostLocales(slug, routing.locales) as Locale[],
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap(({ href, priority, changeFrequency, locales = routing.locales }) => {
    const languages = alternates(href, locales[0], locales)?.languages as Record<string, string>;
    return locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
