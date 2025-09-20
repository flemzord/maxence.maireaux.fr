'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import siteConfig from '@/site-config';
import { Locale, locales, languages } from '@/i18n';
import { NavigationLink, SocialLink } from '@/types';

interface HeaderProps {
  locale: Locale;
}

interface ScrollState {
  isScrolled: boolean;
  isHidden: boolean;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    isHidden: false,
  });
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const lastY = lastScrollY.current;

    setScrollState(prev => {
      const newIsScrolled = currentScrollY > 20;
      let newIsHidden = prev.isHidden;

      if (currentScrollY < 150) {
        newIsHidden = false;
      } else if (currentScrollY - lastY > 150) {
        newIsHidden = true;
      } else if (lastY - currentScrollY > 150) {
        newIsHidden = false;
      }

      // Only update state if something changed
      if (prev.isScrolled !== newIsScrolled || prev.isHidden !== newIsHidden) {
        return { isScrolled: newIsScrolled, isHidden: newIsHidden };
      }
      return prev;
    });

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLanguageChange = useCallback((newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }, [pathname, router]);

  const navLinks = useMemo((): NavigationLink[] => [
    { id: 'blog', text: t('nav.blog'), href: `/${locale}/blog` },
    { id: 'projects', text: t('nav.projects'), href: `/${locale}/projects` },
  ], [t, locale]);

  const socialLinksHeader = useMemo((): SocialLink[] =>
    siteConfig.socialLinks.filter(link =>
      link.header === true || (typeof link.header === 'string' && link.header.length > 0)
    ), []
  );

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full h-15 sm:h-20 container-sm flex justify-between items-center transition-all duration-300 ${
          scrollState.isScrolled ? 'backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm' : 'bg-transparent'
        } ${scrollState.isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex items-center h-full">
          <Link href={`/${locale}`} className="mr-4 sm:mr-6 touch-target" aria-label="Home">
            <img
              width="28"
              height="28"
              className="sm:w-8 sm:h-8 rounded-full object-cover"
              src={siteConfig.header.logo.src}
              alt={siteConfig.header.logo.alt}
            />
          </Link>
          <nav className="hidden sm:flex flex-wrap gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`nav-link px-2 py-1 rounded-md ${pathname.includes(link.href) ? 'opacity-100 font-medium' : ''}`}
                aria-label={link.text}
                aria-current={pathname.includes(link.href) ? 'page' : undefined}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <button
            className="sm:hidden container-link"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isNavOpen}
          >
            <span className={`text-lg transition-transform duration-200 ${isNavOpen ? 'i-ri-close-line rotate-90' : 'i-ri-menu-2-fill'}`} />
          </button>
        </div>
        <div className="flex gap-x-2 sm:gap-x-4 items-center">
          <label className="hidden lg:flex items-center gap-x-2 text-xs uppercase tracking-wide opacity-70">
            <span>{t('languageSwitcher.label')}</span>
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent border border-current rounded px-2 py-1 text-sm focus-ring"
            >
              {locales.map((lng) => (
                <option key={lng} value={lng}>
                  {languages[lng].label}
                </option>
              ))}
            </select>
          </label>
          <div className="hidden sm:flex gap-x-2">
            {socialLinksHeader.map((link) => (
              <a
                key={link.text}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="container-link"
                aria-label={link.text}
              >
                <span className={typeof link.header === 'string' ? link.header : link.icon} />
              </a>
            ))}
          </div>
          <Link href={`/${locale}/rss.xml`} className="container-link" aria-label="RSS Feed">
            <span className="i-ri-rss-line" />
          </Link>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <nav
        className={`fixed h-screen z-50 left-0 top-0 w-80 max-w-[85vw] bg-main shadow-2xl transition-transform duration-300 ease-in-out sm:hidden ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-2">
            <img
              width="32"
              height="32"
              className="rounded-full object-cover"
              src={siteConfig.header.logo.src}
              alt={siteConfig.header.logo.alt}
            />
            <button
              className="container-link"
              onClick={() => setIsNavOpen(false)}
              aria-label="Close navigation menu"
            >
              <span className="i-ri-close-line text-lg" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`nav-link text-lg py-3 px-4 rounded-lg transition-all duration-200 ${
                  pathname.includes(link.href)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsNavOpen(false)}
                aria-current={pathname.includes(link.href) ? 'page' : undefined}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="mb-8">
            <label className="flex flex-col gap-3">
              <span className="text-sm font-medium opacity-70 uppercase tracking-wide">
                {t('languageSwitcher.label')}
              </span>
              <select
                value={locale}
                onChange={(e) => {
                  handleLanguageChange(e.target.value);
                  setIsNavOpen(false);
                }}
                className="bg-transparent border border-current rounded-lg px-3 py-2 text-base focus-ring"
              >
                {locales.map((lng) => (
                  <option key={lng} value={lng}>
                    {languages[lng].label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Social Links */}
          <div className="mt-auto">
            <p className="text-sm font-medium opacity-70 uppercase tracking-wide mb-4">
              Connect
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinksHeader.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="container-link"
                  aria-label={link.text}
                >
                  <span className={typeof link.header === 'string' ? link.header : link.icon} />
                </a>
              ))}
              <Link href={`/${locale}/rss.xml`} className="container-link" aria-label="RSS Feed">
                <span className="i-ri-rss-line" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-300"
          onClick={() => setIsNavOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}