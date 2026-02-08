'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

const localeLabels: Record<string, string> = {
  de: 'DE',
  en: 'EN',
  ru: 'RU',
  ar: 'AR',
  pl: 'PL',
  ro: 'RO',
  sq: 'SQ',
  uk: 'UK',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-db-gray-800 p-1.5">
      <Globe className="ml-0.5 h-5 w-5 shrink-0 text-db-gray-200" aria-hidden />
      {(Object.keys(localeLabels) as Array<keyof typeof localeLabels>).map(
        (loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            disabled={isPending}
            className={`min-h-[48px] min-w-[48px] rounded-md px-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-db-red focus:ring-offset-2 focus:ring-offset-db-dark disabled:opacity-50 ${
              locale === loc
                ? 'bg-db-red text-white'
                : 'bg-db-gray-700 text-db-light hover:bg-db-gray-600'
            }`}
            aria-label={`Switch to ${localeLabels[loc]}`}
            aria-current={locale === loc ? 'true' : undefined}
          >
            {localeLabels[loc]}
          </button>
        )
      )}
    </div>
  );
}
