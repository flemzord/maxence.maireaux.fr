import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export type Locale = 'fr' | 'en';

export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export const languages = {
  fr: {
    code: 'fr',
    label: 'Français',
    locale: 'fr-FR',
    hrefLang: 'fr-FR',
    dir: 'ltr' as const,
  },
  en: {
    code: 'en',
    label: 'English',
    locale: 'en-US',
    hrefLang: 'en-US',
    dir: 'ltr' as const,
  },
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});