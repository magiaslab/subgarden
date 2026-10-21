import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') && f !== 'README.md');
  const posts: PostMeta[] = files.map((filename) => {
    const slug = getSlugFromFilename(filename);
    const fullPath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(raw);
    return {
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || '',
      date: (data.date as string) || '',
      image: (data.image as string) || undefined,
    };
  });
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  // percorso diretto (senza array + ciclo): così Turbopack traccia solo
  // content/blog e non tutto il progetto (public compreso) nella funzione server
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    date: (data.date as string) || '',
    image: (data.image as string) || undefined,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => getSlugFromFilename(f));
}
