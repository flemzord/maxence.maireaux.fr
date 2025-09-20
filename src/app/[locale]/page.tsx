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
      : 'Ancien ingénieur infra, aujourd\'hui VP of Engineering. J\'explore la tech, le produit et la culture engineering.',
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const latestPosts = await getLatestPosts(locale, 5);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
                <span className="i-ri-code-line"></span>
                VP of Engineering
              </div>
              <h1 className="hero-title mb-6">{t('title')}</h1>
              <p className="hero-subtitle mb-6">{t('subtitle')}</p>
              <p className="text-body mb-8 max-w-2xl">{t('description')}</p>

              <div className="flex items-center gap-3 mb-8">
                {siteConfig.socialLinks.slice(0, 4).map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-hero"
                    aria-label={link.text}
                  >
                    <span className={link.icon}></span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:flex-shrink-0">
              <div className="hero-avatar-container">
                <img
                  src="/maxence.jpg"
                  alt="Maxence Maireaux"
                  className="hero-avatar"
                  width="200"
                  height="200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="section-spacing">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-title mb-2">{t('latestPosts')}</h2>
              <p className="text-body opacity-70">Découvrez mes derniers articles sur la tech et l'engineering</p>
            </div>
            <Link href={`/${locale}/blog`} className="hidden sm:inline-flex button-secondary items-center gap-2">
              Voir tout
              <span className="i-ri-arrow-right-line" />
            </Link>
          </div>
          <PostList posts={latestPosts} locale={locale} />
          <div className="mt-8 sm:mt-12 sm:hidden">
            <Link href={`/${locale}/blog`} className="button-primary inline-flex items-center gap-2 w-full justify-center">
              {t('viewAllPosts')}
              <span className="i-ri-arrow-right-line" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}