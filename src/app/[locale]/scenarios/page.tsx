'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { ScenarioCard } from '@/components/scenarios/ScenarioCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { scenarios } from '@/data/scenarios';
import { getProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

export default function ScenariosPage() {
  const t = useTranslations('scenarios');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const [index, setIndex] = useState(0);

  const progress = getProgress();
  const completedCount = progress.completedScenarios.length;
  const total = scenarios.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const currentScenario = useMemo(() => scenarios[index] ?? null, [index]);

  const handleNext = () => {
    if (index < scenarios.length - 1) setIndex((i) => i + 1);
    else setIndex(0);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-db-light md:text-3xl">{tNav('scenarios')}</h1>
        <p className="mt-1 text-db-gray-400">{t('subtitle')}</p>
      </section>
      <ProgressBar value={pct} max={100} label={t('subtitle')} showValue />
      <p className="text-sm text-db-gray-400">
        {t('of')} {index + 1} / {total}
      </p>
      {currentScenario ? (
        <ScenarioCard
          scenario={currentScenario}
          locale={locale}
          onNext={scenarios.length > 1 ? handleNext : undefined}
        />
      ) : null}
      {scenarios.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`min-h-[44px] min-w-[44px] shrink-0 rounded-lg px-3 text-sm font-medium ${
                i === index ? 'bg-db-red text-white' : 'bg-db-gray-800 text-db-gray-400 hover:bg-db-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
