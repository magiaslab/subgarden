import { MetadataRoute } from 'next';
import { routing } from '@/lib/i18n/routing';

const solutions = ['giardini-residenziali', 'parchi-pubblici', 'campi-sportivi'];
const cities = ['elba', 'maremma', 'livorno'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';
  const baseDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // Homepage per ogni lingua
  routing.locales.forEach((locale) => {
    routes.push({
      url: `${siteUrl}/${locale}`,
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 1,
    });

    // Pagina tecnologia
    routes.push({
      url: `${siteUrl}/${locale}/tecnologia`,
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Soluzioni
    solutions.forEach((slug) => {
      routes.push({
        url: `${siteUrl}/${locale}/soluzioni/${slug}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Local SEO
    cities.forEach((city) => {
      routes.push({
        url: `${siteUrl}/${locale}/local/${city}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
