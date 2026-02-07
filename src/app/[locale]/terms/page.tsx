'use client';

import { useLocale } from 'next-intl';
import { TermList } from '@/components/terms/TermList';
import type { Locale } from '@/i18n/routing';

export default function TermsPage() {
  const locale = useLocale() as Locale;
  return <TermList locale={locale} />;
}
