'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { RuleCard } from '@/components/rules/RuleCard';
import { rules } from '@/data/rules';
import type { RuleCategory } from '@/data/rules';
import type { Locale } from '@/i18n/routing';

const categoryLabels: Record<RuleCategory, string> = {
  v11: 'categoryV11',
  'uv-sperrung': 'categoryUV',
  annäherungsstrecke: 'categoryAnnaherung',
  forbidden: 'categoryForbidden',
  golden: 'categoryGolden',
  'common-mistakes': 'categoryMistakes',
  oberleitung: 'categoryOberleitung',
  abstand: 'categoryAbstand',
  kleidung: 'categoryKleidung',
};

export default function RulesPage() {
  const t = useTranslations('rules');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const [category, setCategory] = useState<RuleCategory | 'all'>('all');

  const filtered = category === 'all' ? rules : rules.filter((r) => r.category === category);
  const categories: (RuleCategory | 'all')[] = [
  'all', 'v11', 'uv-sperrung', 'annäherungsstrecke', 'forbidden', 'golden',
  'oberleitung', 'abstand', 'kleidung', 'common-mistakes',
];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-db-light md:text-3xl">{tNav('rules')}</h1>
        <p className="mt-1 text-db-gray-400">{t('subtitle')}</p>
      </section>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as RuleCategory | 'all')}
        className="min-h-[48px] w-full rounded-xl border border-db-gray-600 bg-db-gray-800 px-4 text-db-light focus:ring-2 focus:ring-db-red sm:w-auto"
        aria-label="Category"
      >
        <option value="all">{t('filterAll')}</option>
        {categories.filter((c) => c !== 'all').map((c) => (
          <option key={c} value={c}>
            {t(categoryLabels[c as RuleCategory])}
          </option>
        ))}
      </select>
      <ul className="space-y-4">
        {filtered.map((rule) => (
          <li key={rule.id}>
            <RuleCard rule={rule} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}
