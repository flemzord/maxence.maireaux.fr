import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n';
import { getAllPosts } from '@/lib/posts';
import PostList from '@/components/PostList';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Blog - Maxence Maireaux' : 'Blog - Maxence Maireaux',
    description: isEn
      ? 'A complete list of blog posts published on the site.'
      : 'Tous les articles publiés sur le site.',
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const tStates = await getTranslations('states');
  const posts = await getAllPosts(locale);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg opacity-70 mb-8">{t('description')}</p>

      {posts.length > 0 ? (
        <PostList posts={posts} locale={locale} />
      ) : (
        <p className="opacity-60">{tStates('empty')}</p>
      )}
    </>
  );
}