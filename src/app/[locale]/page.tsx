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
      <section className="section-spacing">
        <h1 className="text-display element-spacing">{t('title')}</h1>
        <p className="text-subtitle element-spacing">{t('subtitle')}</p>
        <p className="text-body mb-8 sm:mb-12">{t('description')}</p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span className="text-small opacity-70 font-medium">{t('findMeOn')}</span>
          <div className="flex gap-3 flex-wrap">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="container-link"
                aria-label={link.text}
              >
                <span className={link.icon}></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section>
          <h2 className="text-title element-spacing">{t('latestPosts')}</h2>
          <PostList posts={latestPosts} locale={locale} />
          <div className="mt-8 sm:mt-12">
            <Link href={`/${locale}/blog`} className="button-primary inline-flex items-center gap-2">
              {t('viewAllPosts')}
              <span className="i-ri-arrow-right-line" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}