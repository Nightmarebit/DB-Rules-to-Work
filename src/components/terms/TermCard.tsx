'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Check, RotateCcw } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { AudioButton } from '@/components/terms/AudioButton';
import type { Term } from '@/data/terminology';
import { getProgress, updateProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

interface TermCardProps {
  term: Term;
  locale: Locale;
}

export function TermCard({ term, locale }: TermCardProps) {
  const t = useTranslations('common');
  const tTerms = useTranslations('terms');
  const [showDefinition, setShowDefinition] = useState(false);
  const progress = getProgress();
  const isLearned = progress.learnedTerms.includes(term.id);
  const isReview = progress.reviewTerms.includes(term.id);

  const termLabel = (term as unknown as Record<string, string>)[locale] ?? term.de;
  const pronunciation = term.pronunciation.ru;
  const definition = (term.definition as Record<string, string>)[locale] ?? term.definition.en;
  const operationalMeaning = (term.operationalMeaning as Record<string, string>)[locale] ?? term.operationalMeaning.en;

  const handleMarkLearned = () => {
    const p = getProgress();
    const next = p.learnedTerms.includes(term.id)
      ? p.learnedTerms.filter((id) => id !== term.id)
      : [...p.learnedTerms, term.id];
    const review = p.reviewTerms.filter((id) => id !== term.id);
    updateProgress('learnedTerms', next);
    updateProgress('reviewTerms', review);
  };

  const handleMarkReview = () => {
    const p = getProgress();
    const next = p.reviewTerms.includes(term.id)
      ? p.reviewTerms.filter((id) => id !== term.id)
      : [...p.reviewTerms, term.id];
    updateProgress('reviewTerms', next);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-db-light">{termLabel}</h3>
              <span className="rounded bg-db-gray-700 px-2 py-0.5 text-xs text-db-gray-400">
                {term.category}
              </span>
              {isLearned && (
                <span className="flex items-center gap-1 rounded bg-db-green/20 px-2 py-0.5 text-xs text-db-green">
                  <Check className="h-3 w-3" /> {t('learned')}
                </span>
              )}
              {isReview && !isLearned && (
                <span className="rounded bg-db-yellow/20 px-2 py-0.5 text-xs text-db-yellow">
                  {t('review')}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-db-gray-400">{pronunciation}</p>
          </div>
          <AudioButton text={term.de} lang="de" label={tTerms('pronounce')} />
        </div>

        <button
          type="button"
          onClick={() => setShowDefinition(!showDefinition)}
          className="mt-3 flex w-full items-center justify-between rounded-lg bg-db-gray-800 py-2 px-3 text-left text-sm font-medium text-db-light focus:ring-2 focus:ring-db-red"
        >
          {showDefinition ? tTerms('hideDefinition') : tTerms('showDefinition')}
          {showDefinition ? (
            <ChevronUp className="h-4 w-4" aria-hidden />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden />
          )}
        </button>

        {showDefinition && (
          <div className="mt-3 space-y-3 border-t border-db-gray-700 pt-3">
            <p className="text-sm text-db-gray-300">{definition}</p>
            <p className="text-sm text-db-yellow/90">{operationalMeaning}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={isLearned ? 'primary' : 'secondary'}
            size="md"
            onClick={handleMarkLearned}
          >
            <Check className="h-4 w-4" aria-hidden /> {t('learned')}
          </Button>
          <Button
            variant={isReview ? 'danger' : 'ghost'}
            size="md"
            onClick={handleMarkReview}
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> {t('review')}
          </Button>
        </div>
      </div>
    </Card>
  );
}
