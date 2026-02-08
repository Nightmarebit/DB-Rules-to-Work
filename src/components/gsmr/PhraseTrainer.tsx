'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Volume2, Check, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { AudioButton } from '@/components/common/AudioButton';
import { speak } from '@/lib/audio';
import type { GSMRPhrase } from '@/data/gsmr-phrases';
import { updateProgress, getProgress } from '@/lib/progress';
import type { Locale } from '@/i18n/routing';

interface PhraseTrainerProps {
  phrase: GSMRPhrase;
  locale: Locale;
  onMarkPracticed?: () => void;
}

function splitPhrase(text: string): { type: 'text' | 'blank'; value: string }[] {
  const parts: { type: 'text' | 'blank'; value: string }[] = [];
  const re = /\[[^\]]+\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) });
    parts.push({ type: 'blank', value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export function PhraseTrainer({ phrase, locale, onMarkPracticed }: PhraseTrainerProps) {
  const t = useTranslations('gsmr');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [filled, setFilled] = useState<Record<number, string>>({});

  const practiced = (getProgress().gsmrPhrasesPracticed ?? []).includes(phrase.id);

  const getText = (o: Record<string, string>) => o[locale] ?? o.en ?? o.de;
  const scenario = getText(phrase.scenario);
  const phraseDe = phrase.phrase.de;

  const { parts, blanksOrdered } = useMemo(() => {
    const parts = splitPhrase(phraseDe);
    const blanksOrdered = phrase.blanks ?? [];
    return { parts, blanksOrdered };
  }, [phraseDe, phrase.blanks]);

  let blankIndex = 0;
  const handleFill = (index: number, value: string) => {
    setFilled((prev) => ({ ...prev, [index]: value }));
    setChecked(null);
  };

  const handleCheck = () => {
    setShowAnswer(true);
    const total = blanksOrdered.length;
    const filledCount = Object.keys(filled).length;
    setChecked(filledCount >= total ? true : null);
  };

  const handlePlay = () => speak(phrase.phrase.de, 'de');
  const handleMarkPracticed = () => {
    const p = getProgress();
    const list = p.gsmrPhrasesPracticed ?? [];
    if (list.includes(phrase.id)) return;
    updateProgress('gsmrPhrasesPracticed', [...list, phrase.id]);
    onMarkPracticed?.();
  };

  const pronunciation = locale === 'ru' ? phrase.pronunciation.ru : phrase.pronunciation.de;

  return (
    <Card className="p-4 shadow-lg md:p-6">
      <div className="mb-3 rounded-lg bg-db-gray-800 px-3 py-2 text-sm text-db-gray-400">
        {scenario}
      </div>
      <p className="mb-3 text-sm text-db-gray-500">{pronunciation}</p>

      <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {parts.map((part, i) =>
          part.type === 'text' ? (
            <span key={i} className="text-db-light">
              {part.value}
            </span>
          ) : (
            (() => {
              const b = blanksOrdered[blankIndex];
              const idx = blankIndex++;
              const hintLabel = b ? getText(b.hint) : '';
              const typeLabel = b ? b.type : '';
              return (
                <input
                  key={i}
                  type="text"
                  value={filled[idx] ?? ''}
                  onChange={(e) => handleFill(idx, e.target.value)}
                  placeholder={showHint ? typeLabel : '...'}
                  title={showHint ? hintLabel : undefined}
                  className="min-h-[48px] w-24 min-w-[80px] max-w-[140px] rounded-lg border border-db-gray-600 bg-db-gray-800 px-3 py-2 text-db-light placeholder-db-gray-500 focus:border-[#EC0016] focus:outline-none focus:ring-2 focus:ring-[#EC0016]/50 sm:w-28"
                  aria-label={hintLabel}
                />
              );
            })()
          )
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <AudioButton text={phrase.phrase.de} language="de-DE" />
        <Button variant="secondary" size="md" onClick={handlePlay}>
          <Volume2 className="h-4 w-4" aria-hidden /> {t('playPhrase')}
        </Button>
        <Button variant="ghost" size="md" onClick={() => setShowHint(!showHint)}>
          <HelpCircle className="h-4 w-4" aria-hidden /> {t('hint')}
        </Button>
        <Button variant="secondary" size="md" onClick={handleCheck}>
          <Check className="h-4 w-4" aria-hidden /> {t('check')}
        </Button>
        <Button variant="ghost" size="md" onClick={() => setShowAnswer(true)}>
          {t('showAnswer')}
        </Button>
        {checked === true && (
          <span className="flex items-center gap-1 text-db-green">
            <CheckCircle className="h-5 w-5" /> OK
          </span>
        )}
        {checked === false && (
          <span className="flex items-center gap-1 text-db-red">
            <XCircle className="h-5 w-5" />
          </span>
        )}
        {!practiced && (
          <Button
            variant="primary"
            size="md"
            onClick={handleMarkPracticed}
            className="bg-[#EC0016] hover:bg-[#EC0016]/90"
          >
            <Check className="h-4 w-4" aria-hidden /> {t('markPracticed')}
          </Button>
        )}
        {practiced && (
          <span className="flex items-center gap-1 rounded bg-db-green/20 px-2 py-1.5 text-sm text-db-green">
            <Check className="h-4 w-4" /> {t('practiced')}
          </span>
        )}
      </div>

      {showHint && blanksOrdered.length > 0 && (
        <div className="mt-3 rounded-lg border border-db-gray-600 bg-db-gray-800 p-3 text-sm">
          <p className="font-medium text-db-yellow">{t('blanksHint')}</p>
          <ul className="mt-1 list-inside list-disc text-db-gray-400">
            {blanksOrdered.map((b, i) => (
              <li key={i}>
                {b.type}: {(b.hint as Record<string, string>)[locale] ?? b.hint.en}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAnswer && (
        <div className="mt-3 rounded-lg border border-db-green/30 bg-db-green/10 p-3 text-sm text-db-light transition-opacity">
          <p className="font-medium text-db-green">{t('correctPhrase')}</p>
          <p className="mt-1">{phrase.phrase.de}</p>
        </div>
      )}
    </Card>
  );
}
