'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { TermCard } from '@/components/terms/TermCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { terminology } from '@/data/terminology';
import { getProgress } from '@/lib/progress';
import type { Term } from '@/data/terminology';
import type { Locale } from '@/i18n/routing';

type Category = Term['category'] | 'all';

const CATEGORY_KEYS: Record<Category, string> = {
  all: 'terms.filterAll',
  zones: 'terms.categoryZones',
  safety: 'terms.categorySafety',
  communication: 'terms.categoryCommunication',
  procedures: 'terms.categoryProcedures',
  equipment: 'terms.categoryEquipment',
};

export function TermList({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'default' | 'alpha'>('default');

  const progress = getProgress();
  const learnedCount = progress.learnedTerms.length;
  const total = terminology.length;
  const progressPct = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  const filtered = useMemo(() => {
    let list = terminology;
    if (category !== 'all') list = list.filter((term) => term.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (term) =>
          term.de.toLowerCase().includes(q) ||
          term.ru.toLowerCase().includes(q) ||
          term.en.toLowerCase().includes(q) ||
          term.ar.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'alpha') {
      list = [...list].sort((a, b) => a.de.localeCompare(b.de));
    }
    return list;
  }, [category, search, sortBy]);

  const categories: Category[] = ['all', 'zones', 'safety', 'communication', 'procedures', 'equipment'];

  return (
    <div className="mx-auto max-w-2xl space-y-6 min-w-0">
      <section>
        <h1 className="break-words text-2xl font-bold text-db-light md:text-3xl">{t('nav.terms')}</h1>
        <p className="mt-1 break-words text-db-gray-400">{t('terms.subtitle')}</p>
      </section>

      <ProgressBar value={progressPct} max={100} label={t('common.progress')} showValue />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-db-gray-500" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('common.search')}
            className="w-full rounded-xl border border-db-gray-600 bg-db-gray-800 py-3 pl-10 pr-4 text-db-light placeholder-db-gray-500 focus:border-db-red focus:ring-2 focus:ring-db-red/50"
            aria-label={t('common.search')}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="min-h-[48px] rounded-xl border border-db-gray-600 bg-db-gray-800 px-4 text-db-light focus:ring-2 focus:ring-db-red"
          aria-label="Category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t(CATEGORY_KEYS[cat])}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'default' | 'alpha')}
          className="min-h-[48px] rounded-xl border border-db-gray-600 bg-db-gray-800 px-4 text-db-light focus:ring-2 focus:ring-db-red"
          aria-label="Sort"
        >
          <option value="default">{t('terms.sortDefault')}</option>
          <option value="alpha">{t('terms.sortAlpha')}</option>
        </select>
      </div>

      <p className="text-sm text-db-gray-400">
        {filtered.length} {t('terms.of')} {total}
      </p>

      <ul className="space-y-4">
        {filtered.map((term) => (
          <li key={term.id} id={term.id}>
            <TermCard
              term={term}
              locale={locale}
              relatedTerms={
                term.relatedTerms?.map((id) => ({
                  id,
                  label: (terminology.find((t) => t.id === id) as unknown as Record<string, string>)?.[locale] ?? id,
                })) ?? []
              }
            />
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-db-gray-700 bg-db-gray-800 p-6 text-center text-db-gray-400">
          {t('terms.noResults')}
        </p>
      )}
    </div>
  );
}
