import { defineRouting } from 'next-intl/routing';

export const locales = ['ru', 'de', 'en', 'ar', 'pl', 'ro', 'sq', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  localePrefix: 'always',
});
