'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Volume2, Check, HelpCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { speak } from '@/lib/audio';
import type { GSMRPhrase } from '@/data/gsmr-phrases';
import { updateProgress, getProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

interface PhraseTrainerProps {
  phrase: GSMRPhrase;
  locale: Locale;
  onMarkPracticed?: () => void;
}

export function PhraseTrainer({ phrase, locale, onMarkPracticed }: PhraseTrainerProps) {
  const t = useTranslations('gsmr');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filled, setFilled] = useState<Record<number, string>>({});
  const practiced = getProgress().gsmrPhrasesPracticed.includes(phrase.id);

  const getText = (o: Record<string, string>) => o[locale] ?? o.en;
  const scenario = getText(phrase.scenario);
  const phraseText = getText(phrase.phrase);
  const pronunciation = locale === 'ru' ? phrase.pronunciation.ru : phrase.pronunciation.de;

  const handlePlay = () => speak(phrase.phrase.de, 'de');
  const handleMarkPracticed = () => {
    const p = getProgress();
    if (p.gsmrPhrasesPracticed.includes(phrase.id)) return;
    updateProgress('gsmrPhrasesPracticed', [...p.gsmrPhrasesPracticed, phrase.id]);
    onMarkPracticed?.();
  };

  return (
    <Card className="p-4 md:p-5">
      <div className="mb-3 rounded-lg bg-db-gray-800 px-3 py-2 text-sm text-db-gray-400">
        {scenario}
      </div>
      <p className="text-db-gray-400 text-xs mb-2">{phrase.pronunciation.de}</p>
      <p className="text-db-light font-medium">{phraseText}</p>
      <p className="mt-1 text-sm text-db-gray-500">{pronunciation}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" size="md" onClick={handlePlay}>
          <Volume2 className="h-4 w-4" aria-hidden /> {t('playPhrase')}
        </Button>
        <Button variant="ghost" size="md" onClick={() => setShowHint(!showHint)}>
          <HelpCircle className="h-4 w-4" aria-hidden /> {t('hint')}
        </Button>
        <Button variant="ghost" size="md" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? t('hideAnswer') : t('showAnswer')}
        </Button>
        {!practiced && (
          <Button variant="primary" size="md" onClick={handleMarkPracticed}>
            <Check className="h-4 w-4" aria-hidden /> {t('markPracticed')}
          </Button>
        )}
        {practiced && (
          <span className="flex items-center gap-1 rounded bg-db-green/20 px-2 py-1.5 text-sm text-db-green">
            <Check className="h-4 w-4" /> {t('practiced')}
          </span>
        )}
      </div>

      {showHint && phrase.blanks && phrase.blanks.length > 0 && (
        <div className="mt-3 rounded-lg border border-db-gray-600 bg-db-gray-800 p-3 text-sm">
          <p className="font-medium text-db-yellow">{t('blanksHint')}</p>
          <ul className="mt-1 list-inside list-disc text-db-gray-400">
            {phrase.blanks.map((b, i) => (
              <li key={i}>{(b.hint as Record<string, string>)[locale] ?? b.hint.en}</li>
            ))}
          </ul>
        </div>
      )}

      {showAnswer && (
        <div className="mt-3 rounded-lg border border-db-green/30 bg-db-green/10 p-3 text-sm text-db-light">
          <p className="font-medium text-db-green">{t('correctPhrase')}</p>
          <p className="mt-1">{phrase.phrase.de}</p>
        </div>
      )}
    </Card>
  );
}
