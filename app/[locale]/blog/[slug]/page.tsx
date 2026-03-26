import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
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
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.subgarden.it';

  return {
    title: `${post.title} | Blog SUBGarden`,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: {
        it: `${siteUrl}/it/blog/${slug}`,
        en: `${siteUrl}/en/blog/${slug}`,
        de: `${siteUrl}/de/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-20">
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
                {new Date(post.date).toLocaleDateString('it-IT', {
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
