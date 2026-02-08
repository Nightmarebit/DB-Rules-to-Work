'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/common/Card';
import { Check, X } from 'lucide-react';
import type { Scenario } from '@/data/scenarios';
import { updateProgress, getProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

interface ScenarioCardProps {
  scenario: Scenario;
  locale: Locale;
  onNext?: () => void;
}

export function ScenarioCard({ scenario, locale, onNext }: ScenarioCardProps) {
  const t = useTranslations('scenarios');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const getText = (o: Record<string, string>) => o[locale] ?? o.en;
  const situationText = getText(scenario.situationText);
  const question = getText(scenario.question);
  const options = scenario.options;
  const explanation = getText(scenario.explanation);

  const handleAnswer = (optionId: string) => {
    if (selectedId !== null) return;
    const option = options.find((o) => o.id === optionId);
    if (!option) return;
    setSelectedId(optionId);
    setShowExplanation(true);
    const p = getProgress();
    const completed = p.completedScenarios ?? {};
    if (!completed[scenario.id]) {
      updateProgress('completedScenarios', { ...completed, [scenario.id]: true });
    }
    const key = `${scenario.id}-${optionId}`;
    updateProgress('correctAnswers', { ...(p.correctAnswers ?? {}), [key]: option.isCorrect });
  };

  const selectedOption = selectedId ? options.find((o) => o.id === selectedId) : null;
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <Card className="overflow-hidden p-6 shadow-lg">
      <div className="rounded-xl border border-db-gray-600 bg-db-gray-800/50 p-4">
        <h2 className="text-lg font-semibold text-db-light">{getText(scenario.title)}</h2>
        <p className="mt-2 text-sm leading-relaxed text-db-gray-300">{situationText}</p>
      </div>

      <p className="mt-4 text-xl font-medium text-db-light" style={{ fontSize: '20px' }}>
        {question}
      </p>

      <ul className="mt-4 space-y-3">
        {options.map((opt) => {
          const chosen = selectedId === opt.id;
          const correct = opt.isCorrect;
          const showResult = selectedId !== null;
          const isWrong = chosen && !correct;

          return (
            <motion.li
              key={opt.id}
              initial={false}
              animate={
                isWrong
                  ? { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.4 } }
                  : {}
              }
            >
              <button
                type="button"
                onClick={() => handleAnswer(opt.id)}
                disabled={selectedId !== null}
                className={`flex min-h-[48px] w-full items-center justify-between rounded-xl border py-3 px-4 text-left text-sm font-medium transition disabled:pointer-events-none ${
                  showResult
                    ? correct
                      ? 'border-db-green bg-db-green/10 text-db-green'
                      : chosen
                        ? 'border-[#EC0016] bg-[#EC0016]/10 text-[#EC0016]'
                        : 'border-db-gray-600 bg-db-gray-800/50 text-db-gray-400'
                    : 'border-db-gray-600 hover:border-db-gray-500 hover:bg-db-gray-800/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  {showResult && chosen && (
                    correct ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, duration: 0.25 }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <X className="h-5 w-5" />
                    )
                  )}
                  {(opt.text as Record<string, string>)[locale] ?? opt.text.en}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-db-yellow/30 bg-db-yellow/10 p-4 text-sm text-db-gray-300">
              <p className="font-medium text-db-yellow">{t('explanation')}</p>
              <p className="mt-2 leading-relaxed">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showExplanation && onNext && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 min-h-[48px] w-full rounded-xl bg-[#EC0016] py-3 px-4 font-medium text-white hover:bg-[#EC0016]/90"
        >
          {t('next')}
        </motion.button>
      )}
    </Card>
  );
}
