'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Train } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Search } from './Search';

export function Header() {
  const t = useTranslations('common');

  return (
    <header className="sticky top-0 z-50 border-b border-db-gray-700 bg-db-dark/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-db-dark/80">
      <div className="mx-auto flex min-h-14 max-w-4xl items-start justify-between gap-4 px-4 pb-2 pt-3 md:h-14 md:items-center md:py-0">
        <Link
          href="/"
          className="flex min-h-[48px] min-w-[48px] items-center gap-2 text-db-light focus:outline-none focus:ring-2 focus:ring-db-red focus:ring-offset-2 focus:ring-offset-db-dark"
          aria-label={t('appName')}
        >
          <Train className="h-8 w-8 text-db-red" aria-hidden />
          <span className="hidden font-semibold sm:inline">{t('appName')}</span>
        </Link>
        <div className="flex min-w-0 items-center gap-1 self-start md:shrink-0 md:gap-2">
          <Search />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
