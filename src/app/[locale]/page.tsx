import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n';
import Link from 'next/link';
import { getLatestPosts } from '@/lib/posts';
import PostList from '@/components/PostList';
import siteConfig from '@/site-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: 'Maxence Maireaux',
    description: isEn
      ? 'Former infra engineer, now VP of Engineering. I write about engineering leadership, tooling, and building products.'
      : 'Ancien ingénieur infra, aujourd\'hui VP Engineering. J\'explore la tech, le produit et la culture engineering.',
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const latestPosts = await getLatestPosts(locale, 5);

  return (
    <>
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl opacity-70 mb-6">{t('subtitle')}</p>
        <p className="text-lg mb-8">{t('description')}</p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="opacity-70">{t('findMeOn')}</span>
            <div className="flex gap-4">
              {siteConfig.socialLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  aria-label={link.text}
                >
                  <span className={link.icon}></span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {latestPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('latestPosts')}</h2>
          <PostList posts={latestPosts} locale={locale} />
          <div className="mt-8">
            <Link href={`/${locale}/blog`} className="prose-link">
              {t('viewAllPosts')}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}