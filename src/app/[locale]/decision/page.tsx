'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { DecisionTree } from '@/components/decision/DecisionTree';
import type { Locale } from '@/i18n/routing';

export default function DecisionPage() {
  const t = useTranslations('decision');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-db-light md:text-3xl">{tNav('decision')}</h1>
        <p className="mt-1 text-db-gray-400">{t('subtitle')}</p>
      </section>
      <DecisionTree locale={locale} />
    </div>
  );
}
