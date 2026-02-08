'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { DecisionTree } from '@/components/decision/DecisionTree';
import { getProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

const RESULT_LABELS: Record<string, string> = {
  'uv-sperrung': 'UV-Sperrung',
  'annäherungsstrecke': 'Annäherungsstrecke',
  v11: 'V11',
  forbidden: '—',
};

export default function DecisionPage() {
  const t = useTranslations('decision');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const progress = getProgress();
  const history = progress.decisionTreeResults ?? [];

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-6 min-w-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <section>
        <h1 className="break-words text-2xl font-bold text-db-light md:text-3xl">{tNav('decision')}</h1>
        <p className="mt-1 break-words text-db-gray-400">{t('subtitle')}</p>
      </section>
      <DecisionTree locale={locale} />
      {history.length > 0 && (
        <section className="rounded-xl border border-db-gray-700 bg-db-gray-800/50 p-4">
          <h2 className="text-sm font-semibold text-db-gray-400">{t('historyLabel')}</h2>
          <ul className="mt-2 space-y-1 text-sm text-db-gray-300">
            {[...history].reverse().slice(0, 10).map((item, i) => (
              <li key={i}>
                {new Date(item.date).toLocaleDateString(locale)} — {RESULT_LABELS[item.result] ?? item.result}
              </li>
            ))}
          </ul>
        </section>
      )}
    </motion.div>
  );
}
