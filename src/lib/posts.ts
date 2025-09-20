import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Locale } from '@/i18n';
import { Post } from '@/types';
import { normalizeDate } from './date';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function getPostFiles(locale: Locale): string[] {
  try {
    const localePath = path.join(postsDirectory, locale);

    if (!fs.existsSync(localePath)) {
      return [];
    }

    return fs.readdirSync(localePath).filter(file =>
      file.endsWith('.md') || file.endsWith('.mdx')
    );
  } catch (error) {
    console.error(`Error reading post files for locale ${locale}:`, error);
    return [];
  }
}

function parsePostFile(fileName: string, locale: Locale): Post | null {
  try {
    const slug = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(postsDirectory, locale, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title && !slug) {
      console.warn(`Post ${fileName} missing title`);
      return null;
    }

    return {
      slug,
      title: data.title || slug,
      date: data.date ? normalizeDate(data.date) : normalizeDate(new Date()),
      description: data.description,
      tag: data.tag,
      lang: data.lang || locale,
      translationKey: data.translationKey,
      content,
    };
  } catch (error) {
    console.error(`Error parsing post ${fileName}:`, error);
    return null;
  }
}

export async function getAllPosts(locale: Locale): Promise<Post[]> {
  const files = getPostFiles(locale);

  const posts = files
    .map(fileName => parsePostFile(fileName, locale))
    .filter((post): post is Post => post !== null);

  // Sort posts by date descending
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getLatestPosts(locale: Locale, limit: number = 5): Promise<Post[]> {
  const posts = await getAllPosts(locale);
  return posts.slice(0, limit);
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<Post | null> {
  try {
    const mdPath = path.join(postsDirectory, locale, `${slug}.md`);
    const mdxPath = path.join(postsDirectory, locale, `${slug}.mdx`);

    let fileName: string;
    if (fs.existsSync(mdPath)) {
      fileName = `${slug}.md`;
    } else if (fs.existsSync(mdxPath)) {
      fileName = `${slug}.mdx`;
    } else {
      return null;
    }

    return parsePostFile(fileName, locale);
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

export async function getTranslatedPost(locale: Locale, translationKey: string): Promise<Post | null> {
  const posts = await getAllPosts(locale);
  return posts.find(post => post.translationKey === translationKey) || null;
}