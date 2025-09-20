import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Locale } from '@/i18n';

export const getDateLocale = (locale: Locale) => locale === 'fr' ? fr : enUS;

export const formatDate = (date: string | Date, formatString: string, locale: Locale) => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return format(dateObject, formatString, { locale: getDateLocale(locale) });
};

export const formatPostDate = (date: string | Date, locale: Locale) => {
  return formatDate(date, 'PP', locale);
};

export const formatFullDate = (date: string | Date, locale: Locale) => {
  return formatDate(date, 'PPP', locale);
};

export const normalizeDate = (date: string | Date): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toISOString().split('T')[0];
};