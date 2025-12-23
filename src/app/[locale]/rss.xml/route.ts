import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { Locale } from '@/i18n';
import siteConfig from '@/site-config';

import { locales } from '@/i18n';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params as { locale: Locale };
  const posts = await getAllPosts(locale);
  const siteUrl = 'https://maxence.maireaux.fr';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.author.name}</title>
    <link>${siteUrl}/${locale}</link>
    <description>${locale === 'fr' ? siteConfig.description.fr : siteConfig.description.en}</description>
    <language>${locale}</language>
    <atom:link href="${siteUrl}/${locale}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/${locale}/blog/${post.slug}</link>
      <description>${escapeXml(post.description || '')}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/${locale}/blog/${post.slug}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}