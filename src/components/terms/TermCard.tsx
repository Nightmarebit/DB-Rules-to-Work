'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { AudioButton } from '@/components/common/AudioButton';
import type { Term } from '@/data/terminology';
import { loadProgress, markTermLearned, markTermReview } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';
import type { UserProgress } from '@/lib/progress';

interface TermCardProps {
  term: Term;
  locale: Locale;
  relatedTerms?: { id: string; label: string }[];
}

export function TermCard({ term, locale, relatedTerms = [] }: TermCardProps) {
  const t = useTranslations('common');
  const tTerms = useTranslations('terms');
  const [showDefinition, setShowDefinition] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const isLearned = progress?.learnedTerms.includes(term.id) ?? false;
  const isReview = progress?.reviewTerms.includes(term.id) ?? false;

  const termLabel = (term as unknown as Record<string, string>)[locale] ?? term.de;
  const pronunciation = term.pronunciation.ru;
  const definition = (term.definition as Record<string, string>)[locale] ?? term.definition.en;
  const operationalMeaning = (term.operationalMeaning as Record<string, string>)[locale] ?? term.operationalMeaning.en;

  const handleMarkLearned = () => {
    markTermLearned(term.id);
    setProgress(loadProgress());
  };

  const handleMarkReview = () => {
    markTermReview(term.id);
    setProgress(loadProgress());
  };

  return (
    <Card className="overflow-hidden p-6 shadow-lg transition-shadow">
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
        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <p className="text-sm text-db-gray-400">{pronunciation}</p>
          <AudioButton text={term.de} language="de-DE" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowDefinition(!showDefinition)}
        className="mt-3 flex w-full items-center justify-between rounded-lg bg-db-gray-800 py-2 px-3 text-left text-sm font-medium text-db-light transition-colors focus:ring-2 focus:ring-[#EC0016]"
      >
        {showDefinition ? tTerms('hideDefinition') : tTerms('showDefinition')}
        {showDefinition ? (
          <ChevronUp className="h-4 w-4 shrink-0 transition-transform" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform" aria-hidden />
        )}
      </button>

      <AnimatePresence initial={false}>
        {showDefinition && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3 border-t border-db-gray-700 pt-3">
              <p className="text-sm text-db-gray-300">{definition}</p>
              <p className="text-sm text-db-yellow/90">{operationalMeaning}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {relatedTerms.length > 0 && (
        <div className="mt-4 border-t border-db-gray-700 pt-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-db-gray-500">
            {tTerms('relatedTerms')}
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-lg bg-db-gray-700/80 px-3 py-1.5 text-sm text-db-light transition-colors hover:bg-[#EC0016]/20 hover:text-[#EC0016] focus:outline-none focus:ring-2 focus:ring-[#EC0016]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant={isLearned ? 'primary' : 'secondary'}
          size="md"
          onClick={handleMarkLearned}
          className={`min-h-[48px] ${isLearned ? '!bg-db-green/20 !text-db-green hover:!bg-db-green/30 focus:!ring-db-green' : ''}`}
        >
          <Check className="h-4 w-4" aria-hidden /> ✅ {t('learned')}
        </Button>
        <Button
          variant={isReview ? 'danger' : 'ghost'}
          size="md"
          onClick={handleMarkReview}
          className="min-h-[48px]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> 🔄 {t('review')}
        </Button>
      </div>
    </Card>
  );
}
