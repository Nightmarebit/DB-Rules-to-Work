'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { PhraseTrainer } from '@/components/gsmr/PhraseTrainer';
import { ProgressBar } from '@/components/common/ProgressBar';
import { gsmrPhrases } from '@/data/gsmr-phrases';
import { getProgress } from '@/lib/progress';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

export default function GSMRPage() {
  const t = useTranslations('gsmr');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const progress = getProgress();
  const practicedCount = (progress.gsmrPhrasesPracticed ?? []).length;
  const total = gsmrPhrases.length;
  const pct = total > 0 ? Math.round((practicedCount / total) * 100) : 0;

  const selected = selectedId ? gsmrPhrases.find((p) => p.id === selectedId) : null;

  const currentIndex = selectedId ? gsmrPhrases.findIndex((p) => p.id === selectedId) : -1;
  const phraseLabel = currentIndex >= 0 ? `${t('phrase')} ${currentIndex + 1} ${t('of')} ${total}` : '';

  if (selected) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 min-w-0">
        <Link href="/gsmr" className="inline-flex items-center gap-2 text-db-gray-400 hover:text-db-light">
          <ArrowLeft className="h-4 w-4" /> {tNav('gsmr')}
        </Link>
        <p className="text-sm font-medium text-db-gray-400">{phraseLabel}</p>
        <PhraseTrainer phrase={selected} locale={locale} onMarkPracticed={() => setSelectedId(null)} />
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="min-h-[48px] rounded-xl border border-db-gray-600 bg-db-gray-800 px-4 text-db-light hover:bg-db-gray-700"
        >
          {tCommon('back')} — {tNav('gsmr')}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 min-w-0">
      <section>
        <h1 className="break-words text-2xl font-bold text-db-light md:text-3xl">{tNav('gsmr')}</h1>
        <p className="mt-1 break-words text-db-gray-400">{t('subtitle')}</p>
      </section>
      <ProgressBar value={pct} max={100} label={t('subtitle')} showValue />
      <ul className="space-y-3">
        {gsmrPhrases.map((p) => {
          const practiced = progress.gsmrPhrasesPracticed.includes(p.id);
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelectedId(p.id)}
                className="w-full rounded-xl border border-db-gray-600 bg-db-gray-800 p-4 text-left transition hover:border-db-gray-500 hover:bg-db-gray-800/80"
              >
                <span className="font-medium text-db-light">{(p.scenario as Record<string, string>)[locale] ?? p.scenario.en}</span>
                {practiced && (
                  <span className="ml-2 rounded bg-db-green/20 px-2 py-0.5 text-xs text-db-green">
                    {t('practiced')}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
