'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ListOrdered, ArrowRight } from 'lucide-react';
import { Card } from '@/components/common/Card';

type Step = { key: string; linkHref?: string; linkKey: string };
const steps: Step[] = [
  { key: 'step1', linkHref: '/rules', linkKey: 'step1Link' },
  { key: 'step2', linkHref: '/decision', linkKey: 'step2Link' },
  { key: 'step3', linkKey: 'step3Link' },
  { key: 'step4', linkHref: '/gsmr', linkKey: 'step4Link' },
];

export default function StructurePage() {
  const t = useTranslations('structure');
  const tNav = useTranslations('nav');

  return (
    <div className="mx-auto max-w-2xl space-y-6 min-w-0">
      <section className="min-w-0">
        <h1 className="flex flex-wrap items-center gap-2 break-words text-2xl font-bold text-db-light md:text-3xl">
          <ListOrdered className="h-8 w-8 shrink-0 text-db-red" aria-hidden />
          {t('title')}
        </h1>
        <p className="mt-1 break-words text-db-gray-400">{t('subtitle')}</p>
      </section>

      <ul className="space-y-4">
        {steps.map(({ key, linkHref, linkKey }, i) => (
          <li key={key}>
            <Card className="overflow-hidden border-l-4 border-l-db-red bg-db-gray-800/50">
              <div className="flex items-start gap-4 p-4 md:p-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-db-red text-lg font-bold text-white"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h2 className="break-words font-semibold text-db-light">{t(`${key}Title`)}</h2>
                  <p className="mt-1 break-words text-sm leading-relaxed text-db-gray-300">
                    {t(`${key}Text`)}
                  </p>
                  {linkHref && (
                    <Link
                      href={linkHref}
                      className="mt-3 inline-flex flex-wrap items-center gap-1.5 break-words text-sm font-medium text-db-red hover:underline"
                    >
                      {t(linkKey)}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-db-gray-500">
        {t('footer')}{' '}
        <Link href="/" className="font-medium text-db-red hover:underline">
          {tNav('home')}
        </Link>
      </p>
    </div>
  );
}
