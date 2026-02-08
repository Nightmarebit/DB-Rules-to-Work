'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ScenarioCard } from '@/components/scenarios/ScenarioCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { scenarios } from '@/data/scenarios';
import { getProgress, resetScenariosProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

export default function ScenariosPage() {
  const t = useTranslations('scenarios');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(() => getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, [index]);

  const total = scenarios.length;
  const completedCount = Object.keys(progress.completedScenarios ?? {}).length;
  const correctAnswers = progress.correctAnswers ?? {};
  const correctCount = Object.values(correctAnswers).filter(Boolean).length;
  const answeredCount = Object.keys(correctAnswers).length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const currentScenario = useMemo(() => scenarios[index] ?? null, [index]);

  const handleNext = () => {
    if (index < scenarios.length - 1) setIndex((i) => i + 1);
    else setIndex(0);
    setProgress(getProgress());
  };

  const handleStartOver = () => {
    resetScenariosProgress();
    setProgress(getProgress());
    setIndex(0);
  };

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-6 min-w-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <section>
        <h1 className="break-words text-2xl font-bold text-db-light md:text-3xl">
          {tNav('scenarios')}
        </h1>
        <p className="mt-1 break-words text-db-gray-400">{t('subtitle')}</p>
      </section>

      <div className="space-y-1">
        <p className="text-sm font-medium text-db-gray-400">
          {t('scenarioLabel')} {index + 1} {t('of')} {total}
        </p>
        <ProgressBar value={pct} max={100} showValue />
      </div>

      {answeredCount > 0 && (
        <p className="text-sm text-db-light">
          {t('scoreCorrect', { correct: correctCount, total: answeredCount })}
        </p>
      )}

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
            <motion.button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`min-h-[44px] min-w-[44px] shrink-0 rounded-lg px-3 text-sm font-medium ${
                i === index ? 'bg-[#EC0016] text-white' : 'bg-db-gray-800 text-db-gray-400 hover:bg-db-gray-700'
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      )}

      <motion.button
        type="button"
        onClick={handleStartOver}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="min-h-[48px] w-full rounded-xl border border-db-gray-600 bg-db-gray-800 px-4 font-medium text-db-light hover:bg-db-gray-700"
      >
        {t('startOver')}
      </motion.button>
    </motion.div>
  );
}
