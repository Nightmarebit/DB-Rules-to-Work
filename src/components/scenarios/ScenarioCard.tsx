'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
    if (!p.completedScenarios.includes(scenario.id)) {
      updateProgress('completedScenarios', [...p.completedScenarios, scenario.id]);
    }
    const key = `${scenario.id}-${optionId}`;
    updateProgress('correctAnswers', { ...p.correctAnswers, [key]: option.isCorrect });
  };

  const selectedOption = selectedId ? options.find((o) => o.id === selectedId) : null;
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <Card className="p-4 md:p-5">
      <h2 className="text-lg font-semibold text-db-light">{getText(scenario.title)}</h2>
      <p className="mt-2 text-sm text-db-gray-400">{situationText}</p>
      <p className="mt-3 font-medium text-db-light">{question}</p>
      <ul className="mt-3 space-y-2">
        {options.map((opt) => {
          const chosen = selectedId === opt.id;
          const correct = opt.isCorrect;
          const showResult = selectedId !== null;
          const style = showResult
            ? correct
              ? 'border-db-green bg-db-green/10 text-db-green'
              : chosen && !correct
                ? 'border-db-red bg-db-red/10 text-db-red'
                : 'border-db-gray-600'
            : 'border-db-gray-600 hover:border-db-gray-500';

          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => handleAnswer(opt.id)}
                disabled={selectedId !== null}
                className={`w-full min-h-[48px] rounded-xl border py-3 px-4 text-left text-sm font-medium transition disabled:pointer-events-none ${style}`}
              >
                <span className="flex items-center gap-2">
                  {showResult && chosen && (correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />)}
                  {(opt.text as Record<string, string>)[locale] ?? opt.text.en}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {showExplanation && (
        <div className="mt-4 rounded-lg border border-db-yellow/30 bg-db-yellow/10 p-3 text-sm text-db-gray-300">
          <p className="font-medium text-db-yellow">{t('explanation')}</p>
          <p className="mt-1">{explanation}</p>
        </div>
      )}
      {showExplanation && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="mt-4 min-h-[48px] w-full rounded-xl bg-db-red py-3 px-4 font-medium text-white hover:bg-db-red/90"
        >
          {t('next')}
        </button>
      )}
    </Card>
  );
}
