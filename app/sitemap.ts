import { MetadataRoute } from 'next';
import { routing } from '@/lib/i18n/routing';
import { getAllSlugs } from '@/lib/blog';

const solutions = ['giardini-residenziali', 'parchi-pubblici', 'campi-sportivi', 'strutture-turistiche'];
const cities = ['elba', 'maremma', 'livorno'];

// Path per locale (allineati a lib/i18n/routing.ts)
const paths: Record<string, Record<string, string>> = {
  tecnologia: { it: 'tecnologia', en: 'technology', de: 'technologie' },
  chiSiamo: { it: 'chi-siamo', en: 'about-us', de: 'ueber-uns' },
  soluzioni: { it: 'soluzioni', en: 'solutions', de: 'loesungen' },
  territorio: { it: 'territorio', en: 'territory', de: 'gebiet' },
  contatti: { it: 'contatti', en: 'contact', de: 'kontakt' },
  // portfolio: nascosto in attesa contenuti
  privacy: { it: 'privacy', en: 'privacy', de: 'datenschutz' },
  terms: { it: 'terms', en: 'terms', de: 'nutzungsbedingungen' },
  faq: { it: 'faq', en: 'faq', de: 'faq' },
  blog: { it: 'blog', en: 'blog', de: 'blog' },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';
  const baseDate = new Date();
  const routes: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    const loc = locale as 'it' | 'en' | 'de';

    routes.push({
      url: `${siteUrl}/${locale}`,
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 1,
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.tecnologia[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.chiSiamo[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.soluzioni[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    solutions.forEach((slug) => {
      routes.push({
        url: `${siteUrl}/${locale}/${paths.soluzioni[loc]}/${slug}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.territorio[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    cities.forEach((city) => {
      routes.push({
        url: `${siteUrl}/${locale}/${paths.territorio[loc]}/${city}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.contatti[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Portfolio nascosto in attesa contenuti
    // routes.push({ url: `${siteUrl}/${locale}/portfolio`, ... });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.privacy[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.terms[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.faq[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    routes.push({
      url: `${siteUrl}/${locale}/${paths.blog[loc]}`,
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Blog posts (slug from files)
  const postSlugs = getAllSlugs();
  routing.locales.forEach((locale) => {
    postSlugs.forEach((slug) => {
      routes.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
