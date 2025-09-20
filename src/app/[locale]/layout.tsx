import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, locales, languages } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import siteConfig from '@/site-config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={languages[locale as Locale].dir} className={`${inter.variable} ${mono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              const theme = localStorage.getItem('theme') || 'auto';
              if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          `}
        </Script>
        {/* Language detection and redirect script for static export */}
        <Script id="locale-redirect" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/fr') && !window.location.pathname.startsWith('/en')) {
              const browserLang = navigator.language.slice(0, 2);
              const supportedLang = ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
              window.location.replace('/' + supportedLang + window.location.pathname);
            }
            
            // Handle unhandled promise rejections
            window.addEventListener('unhandledrejection', function(event) {
              if (event.reason && event.reason.toString().includes('Event')) {
                event.preventDefault();
              }
            });
            
            // Handle link preload errors
            document.addEventListener('DOMContentLoaded', function() {
              const links = document.querySelectorAll('link[rel="preload"]');
              links.forEach(link => {
                link.addEventListener('error', function(e) {
                  e.preventDefault();
                });
              });
            });
          `}
        </Script>
      </head>
      <body className="font-sans bg-main text-main">
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Header locale={locale as Locale} />
              <main className="flex-1 pt-20 sm:pt-24 pb-12">
                <div className="container-content container-sm">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}