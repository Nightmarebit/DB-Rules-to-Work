'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ListOrdered,
  BookOpen,
  Shield,
  Radio,
  GitBranch,
  ClipboardList,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { HomeProgress } from '@/components/home/HomeProgress';

const sections = [
  { href: '/terms', icon: BookOpen, key: 'terms', descKey: 'termsDesc' },
  { href: '/rules', icon: Shield, key: 'rules', descKey: 'rulesDesc' },
  { href: '/gsmr', icon: Radio, key: 'gsmr', descKey: 'gsmrDesc' },
  { href: '/decision', icon: GitBranch, key: 'decision', descKey: 'decisionDesc' },
  { href: '/scenarios', icon: ClipboardList, key: 'scenarios', descKey: 'scenariosDesc' },
] as const;

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-db-light md:text-3xl">
          {t('welcome')}
        </h1>
        <p className="mt-1 text-db-gray-400">{t('subtitle')}</p>
      </section>

      <section className="rounded-xl border border-db-gray-600 bg-db-gray-800/80 p-4 md:p-5">
        <h2 className="text-lg font-semibold text-db-yellow">{t('guideIntro')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-db-gray-300">
          {t('guideText')}
        </p>
      </section>

      <Link
        href="/structure"
        className="block rounded-xl border-2 border-db-red/50 bg-db-red/10 p-4 transition-colors hover:border-db-red hover:bg-db-red/20 md:p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-db-red/30">
            <ListOrdered className="h-6 w-6 text-db-red" aria-hidden />
          </div>
          <div>
            <h2 className="font-semibold text-db-light">{t('structureTitle')}</h2>
            <p className="mt-0.5 text-sm text-db-gray-400">{t('structureHint')}</p>
          </div>
        </div>
      </Link>

      <HomeProgress />

      <section className="grid gap-4 sm:grid-cols-1">
        {sections.map(({ href, icon: Icon, key, descKey }) => (
          <Link key={key} href={href} className="block">
            <Card className="flex min-h-[80px] items-center gap-4 p-4 transition-colors hover:border-db-gray-600 hover:bg-db-gray-800 focus-within:ring-2 focus-within:ring-db-red md:p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-db-red/20 text-db-red">
                <Icon className="h-7 w-7" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-db-light">{t(`sections.${key}`)}</h3>
                <p className="text-sm text-db-gray-400">{t(`sections.${descKey}`)}</p>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
