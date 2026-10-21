import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

/*
 * Un articolo è `content/blog/<slug>.md` (italiano, la lingua originale). Le traduzioni
 * stanno accanto come `<slug>.en.md` e `<slug>.de.md`, con lo stesso slug: finché una
 * traduzione manca, la pagina in quella lingua mostra il testo italiano, non è indicizzata
 * e non compare nella sitemap né nell'hreflang.
 */
const SOURCE_LOCALE = 'it';
const TRANSLATED = /\.([a-z]{2})\.md$/;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  /** Lingua del testo restituito: diversa da quella chiesta se manca la traduzione. */
  lang: string;
};

export type Post = PostMeta & {
  content: string;
};

function filePath(slug: string, locale: string): string {
  // percorso diretto (senza array + ciclo): così Turbopack traccia solo
  // content/blog e non tutto il progetto (public compreso) nella funzione server
  return locale === SOURCE_LOCALE
    ? path.join(BLOG_DIR, `${slug}.md`)
    : path.join(BLOG_DIR, `${slug}.${locale}.md`);
}

function read(slug: string, locale: string): Post | null {
  const fullPath = filePath(slug, locale);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf-8'));
  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    date: (data.date as string) || '',
    image: (data.image as string) || undefined,
    lang: locale,
    content,
  };
}

/** L'articolo nella lingua chiesta, o in italiano se la traduzione non c'è. */
export function getPostBySlug(slug: string, locale: string = SOURCE_LOCALE): Post | null {
  return (locale !== SOURCE_LOCALE && read(slug, locale)) || read(slug, SOURCE_LOCALE);
}

/** Le lingue in cui l'articolo esiste davvero (l'italiano sempre). */
export function getPostLocales(slug: string, locales: readonly string[]): string[] {
  return locales.filter((l) => l === SOURCE_LOCALE || fs.existsSync(filePath(slug, l)));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md' && !TRANSLATED.test(f))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getPosts(locale: string = SOURCE_LOCALE): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is Post => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}
