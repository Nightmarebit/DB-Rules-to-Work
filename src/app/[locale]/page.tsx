'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import {
  ListOrdered,
  BookOpen,
  Shield,
  Radio,
  GitBranch,
  ClipboardList,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { loadProgress, getProgressWithPercentage, getSectionProgress } from '@/lib/progress';
import { terminology } from '@/data/terminology';
import { gsmrPhrases } from '@/data/gsmr-phrases';
import { scenarios } from '@/data/scenarios';
import type { SectionKey } from '@/lib/progress';

const sections: { href: string; icon: typeof BookOpen; key: SectionKey; descKey: string }[] = [
  { href: '/terms', icon: BookOpen, key: 'terms', descKey: 'termsDesc' },
  { href: '/rules', icon: Shield, key: 'rules', descKey: 'rulesDesc' },
  { href: '/gsmr', icon: Radio, key: 'gsmr', descKey: 'gsmrDesc' },
  { href: '/decision', icon: GitBranch, key: 'decision', descKey: 'decisionDesc' },
  { href: '/scenarios', icon: ClipboardList, key: 'scenarios', descKey: 'scenariosDesc' },
];

export default function HomePage() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [percentage, setPercentage] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<Record<SectionKey, number> | null>(null);

  useEffect(() => {
    const p = loadProgress();
    setPercentage(getProgressWithPercentage().percentage);
    setSectionProgress(
      p
        ? getSectionProgress(p, {
            terms: terminology.length,
            gsmr: gsmrPhrases.length,
            scenarios: scenarios.length,
          })
        : null
    );
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-8 min-w-0">
      <section>
        <h1 className="break-words text-2xl font-bold text-db-light md:text-3xl">
          {t('welcome')}
        </h1>
        <p className="mt-1 break-words text-db-gray-400">{t('subtitle')}</p>
      </section>

      <section aria-label={tCommon('progress')}>
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-db-gray-400">
            {tCommon('learned')}: {percentage}%
          </span>
        </div>
        <ProgressBar value={percentage} showValue={false} />
      </section>

      <section className="rounded-xl border border-db-gray-600 bg-db-gray-800/80 p-4 md:p-5">
        <h2 className="text-lg font-semibold text-db-yellow">{t('guideIntro')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-db-gray-300">{t('guideText')}</p>
      </section>

      <Link
        href="/structure"
        className="block rounded-xl border-2 border-[#EC0016]/50 bg-[#EC0016]/10 p-4 transition-colors hover:border-[#EC0016] hover:bg-[#EC0016]/20 md:p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EC0016]/30">
            <ListOrdered className="h-6 w-6 text-[#EC0016]" aria-hidden />
          </div>
          <div>
            <h2 className="font-semibold text-db-light">{t('structureTitle')}</h2>
            <p className="mt-0.5 text-sm text-db-gray-400">{t('structureHint')}</p>
          </div>
        </div>
      </Link>

      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {sections.map(({ href, icon: Icon, key, descKey }) => {
          const pct = sectionProgress?.[key] ?? 0;
          return (
            <Link key={key} href={href} className="block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#EC0016] focus:ring-offset-2 focus:ring-offset-db-dark">
              <Card className="flex min-h-[200px] flex-col justify-between overflow-hidden p-5 shadow-lg transition-colors hover:border-db-gray-600 hover:bg-db-gray-800 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EC0016]/20 text-[#EC0016]">
                    <Icon className="h-12 w-12" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-semibold text-db-light">{t(`sections.${key}`)}</h3>
                    <p className="mt-1 text-sm text-db-gray-400">{t(`sections.${descKey}`)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressBar value={pct} showValue label="" className="mt-2" />
                </div>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
