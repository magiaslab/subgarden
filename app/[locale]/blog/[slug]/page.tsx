import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Link } from '@/lib/i18n/routing';
import { getPostBySlug, getAllSlugs, getPostLocales } from '@/lib/blog';
import { routing } from '@/lib/i18n/routing';
import { SITE_URL, absoluteUrl, alternates, NOINDEX } from '@/lib/utils/metadata';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  const href = { pathname: '/blog/[slug]' as const, params: { slug } };
  const locales = getPostLocales(slug, routing.locales) as Locale[];
  const translated = post.lang === locale;
  return {
    title: post.title,
    description: post.description,
    // Senza traduzione la pagina è una copia dell'italiano: canonical e hreflang
    // indicano solo le versioni vere, e questa non si indicizza.
    alternates: alternates(href, translated ? locale : (post.lang as Locale), locales),
    ...(!translated && { robots: NOINDEX }),
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.lang,
    url: absoluteUrl({ pathname: '/blog/[slug]', params: { slug } }, post.lang as Locale),
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const tb = await getTranslations('blogPage');
  const tn = await getTranslations('nav');
  const date = new Date(post.date).toLocaleDateString(post.lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  /*
   * Articolo: apertura senza foto (titolo e attacco), copertina grande se c'è, poi il
   * testo in .prose-site. Le voci dell'interfaccia (briciole, avviso, ritorno) restano
   * nella lingua del sito; il testo dell'articolo è nella sua (lang={post.lang}).
   */
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main id="contenuto" lang={post.lang}>
        <PageHero
          eyebrow={tb('eyebrow')}
          title={post.title}
          lead={post.description}
          breadcrumb={[
            { label: tn('home'), href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        >
          <p className="type-small text-ink-muted">
            <time dateTime={post.date}>{date}</time>
          </p>
          {post.lang !== locale && (
            <p lang={locale} className="type-small mt-4 border-l-2 border-cta pl-4 text-ink-muted">
              {tb('only_italian')}
            </p>
          )}
        </PageHero>

        <article className="bg-surface pb-20 pt-12 lg:pb-28 lg:pt-16">
          {post.image && (
            <figure className="container-site">
              <div className="rounded-media relative aspect-16/9 bg-surface-alt">
                <Image src={post.image} alt="" fill sizes="(min-width: 80rem) 75rem, 100vw" className="object-cover" />
              </div>
            </figure>
          )}
          <div className="container-site mt-12 lg:mt-16">
            <div className="prose-site type-body mx-auto text-ink lg:ml-[16.666%]">
              <ReactMarkdown
                components={{
                  a: ({ href, children }) =>
                    href?.startsWith('/') ? (
                      <Link href={href as any}>{children}</Link>
                    ) : (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            <div lang={locale} className="mx-auto mt-16 max-w-[68ch] border-t border-line pt-8 lg:ml-[16.666%]">
              <Link
                href="/blog"
                className="type-ui inline-flex min-h-11 items-center gap-2 text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
              >
                <span aria-hidden>←</span> {tb('back')}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
