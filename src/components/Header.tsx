'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
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
        className={`fixed top-0 z-50 w-full h-20 px-6 flex justify-between items-center transition-all ${
          scrollState.isScrolled ? 'backdrop-blur-sm bg-white/80 dark:bg-gray-900/80' : 'bg-transparent'
        } ${scrollState.isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex items-center h-full">
          <Link href={`/${locale}`} className="mr-6" aria-label="Home">
            <img
              width="32"
              height="32"
              src={siteConfig.header.logo.src}
              alt={siteConfig.header.logo.alt}
            />
          </Link>
          <nav className="hidden sm:flex flex-wrap gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="nav-link"
                aria-label={link.text}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <button
            className="sm:hidden h-full flex items-center"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Menu"
          >
            <span className="i-ri-menu-2-fill text-xl" />
          </button>
        </div>
        <div className="flex gap-x-6 items-center">
          <label className="hidden sm:flex items-center gap-x-2 text-xs uppercase tracking-wide opacity-70">
            <span>{t('languageSwitcher.label')}</span>
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent border border-current rounded px-2 py-1 text-sm"
            >
              {locales.map((lng) => (
                <option key={lng} value={lng}>
                  {languages[lng].label}
                </option>
              ))}
            </select>
          </label>
          {socialLinksHeader.map((link) => (
            <a
              key={link.text}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label={link.text}
            >
              <span className={typeof link.header === 'string' ? link.header : link.icon} />
            </a>
          ))}
          <Link href={`/${locale}/rss.xml`} className="nav-link" aria-label="RSS">
            <span className="i-ri-rss-line" />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <nav
        className={`fixed h-screen z-50 left-0 top-0 min-w-[32vw] max-w-[50vw] bg-main p-6 text-lg flex flex-col gap-5 transition-transform sm:hidden ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="nav-link"
            onClick={() => setIsNavOpen(false)}
          >
            {link.text}
          </Link>
        ))}
        <label className="flex flex-col gap-2 text-sm">
          <span>{t('languageSwitcher.label')}</span>
          <select
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-transparent border border-current rounded px-2 py-1"
          >
            {locales.map((lng) => (
              <option key={lng} value={lng}>
                {languages[lng].label}
              </option>
            ))}
          </select>
        </label>
      </nav>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </>
  );
}