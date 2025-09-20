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
          `}
        </Script>
      </head>
      <body className="font-sans bg-main text-main">
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Header locale={locale as Locale} />
              <main className="flex-1 px-6 py-20">
                <div className="max-w-4xl mx-auto">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ErrorBoundary>
        <Script
          src="https://tinylytics.app/embed/K8VSZX9CKEUxD8rJu4tN.js"
          defer
        />
      </body>
    </html>
  );
}