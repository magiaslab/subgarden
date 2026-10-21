import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { getPostBySlug, getAllSlugs, getPostLocales } from '@/lib/blog';
import { routing } from '@/lib/i18n/routing';
import { SITE_URL, absoluteUrl, alternates, NOINDEX } from '@/lib/utils/metadata';
import { ContactCTA } from '@/components/sections/ContactCTA';
import ReactMarkdown from 'react-markdown';

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="pt-20" lang={post.lang}>
        <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/stunning-spring-collage.jpg"
            alt=""
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
              <time
                dateTime={post.date}
                className="block text-sm text-white/80 mb-2"
              >
                {new Date(post.date).toLocaleDateString(post.lang, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                {post.title}
              </h1>
            </MotionDiv>
          </div>
        </section>

        <article className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose-blog"
            >
              <ReactMarkdown
                components={{
                  a: ({ href, children }) =>
                    href?.startsWith('/') ? (
                      <Link
                        href={href as any}
                        className="text-deep-teal font-medium hover:text-copper underline decoration-deep-teal/30 underline-offset-2 transition-colors"
                      >
                        {children}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-deep-teal font-medium hover:text-copper underline decoration-deep-teal/30 underline-offset-2 transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-serif font-bold text-deep-teal mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-serif font-bold text-deep-teal mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-5">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-deep-teal">
                      {children}
                    </strong>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-14 pt-8 border-t border-gray-100"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-deep-teal font-medium hover:text-copper transition-colors"
              >
                ← Tutti gli articoli
              </Link>
            </MotionDiv>
          </div>
        </article>
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
