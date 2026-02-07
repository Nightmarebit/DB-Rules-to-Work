'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Train } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('common');

  return (
    <header className="sticky top-0 z-50 border-b border-db-gray-700 bg-db-dark/95 backdrop-blur supports-[backdrop-filter]:bg-db-dark/80">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex min-h-[48px] min-w-[48px] items-center gap-2 text-db-light focus:outline-none focus:ring-2 focus:ring-db-red focus:ring-offset-2 focus:ring-offset-db-dark"
          aria-label={t('appName')}
        >
          <Train className="h-8 w-8 text-db-red" aria-hidden />
          <span className="hidden font-semibold sm:inline">{t('appName')}</span>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
