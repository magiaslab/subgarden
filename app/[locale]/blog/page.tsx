import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section } from '@/components/site/Section';
import { Link } from '@/lib/i18n/routing';
import { getPosts } from '@/lib/blog';
import { alternates, pick } from '@/lib/utils/metadata';

const TEXT: Record<string, { title: string; description: string; lead: string; empty: string }> = {
  it: {
    title: 'Blog: subirrigazione, acqua e giardini',
    description: 'Come funziona la subirrigazione, quanta acqua si risparmia e come si cura un prato in Toscana: articoli di SUBGarden.',
    lead: 'Subirrigazione, risparmio idrico e cura del giardino',
    empty: 'Nessun articolo al momento.',
  },
  en: {
    title: 'Blog: subsurface irrigation, water and gardens',
    description: 'How subsurface irrigation works, how much water it saves and how to care for a lawn in Tuscany: articles by SUBGarden (in Italian).',
    lead: 'Subsurface irrigation, water saving and garden care. Articles are in Italian.',
    empty: 'No articles yet.',
  },
  de: {
    title: 'Blog: Unterflurbewässerung, Wasser und Gärten',
    description: 'Wie Unterflurbewässerung funktioniert, wie viel Wasser sie spart und wie man in der Toskana einen Rasen pflegt: Artikel von SUBGarden (auf Italienisch).',
    lead: 'Unterflurbewässerung, Wassersparen und Gartenpflege. Die Artikel sind auf Italienisch.',
    empty: 'Noch keine Artikel.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = pick(TEXT, locale);
  return {
    title: t.title,
    description: t.description,
    alternates: alternates('/blog', locale),
  };
}

/*
 * Indice del blog come elenco editoriale: data, titolo, descrizione e, se c'è, la
 * copertina a destra. Righe separate da filetti, tutta la riga è il link.
 */
export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const posts = getPosts(locale);
  const t = pick(TEXT, locale);
  const tb = await getTranslations('blogPage');

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero eyebrow={tb('eyebrow')} title="Blog" lead={t.lead} />

        <Section tone="surface" aria-label={tb('list_label')}>
          {posts.length === 0 ? (
            <p className="type-lead text-ink-muted">{t.empty}</p>
          ) : (
            <ol className="border-t border-line">
              {posts.map((post) => (
                <li key={post.slug} lang={post.lang} className="border-b border-line">
                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                    className="group grid gap-6 py-8 md:grid-cols-[1fr_14rem] md:items-center md:gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:py-12"
                  >
                    <div>
                      <p className="type-small text-ink-muted">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(post.lang, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      </p>
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <h2 className="type-h3 text-ink transition-colors group-hover:text-brand lg:text-[1.875rem] lg:leading-tight">
                          {post.title}
                        </h2>
                        <ArrowUpRight aria-hidden className="mt-1 size-6 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="type-body mt-3 max-w-prose text-ink-muted">{post.description}</p>
                    </div>
                    {post.image && (
                      <span className="rounded-media relative order-first block aspect-3/2 bg-surface-alt md:order-none">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(min-width: 64rem) 20rem, (min-width: 48rem) 14rem, 100vw"
                          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                        />
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
