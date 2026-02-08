'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Mobile: one button opening dropdown */}
      <div className="flex md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={isPending}
          className="flex min-h-[44px] items-center gap-1.5 rounded-lg bg-db-gray-800 px-3 py-2 text-db-light focus:outline-none focus:ring-2 focus:ring-[#EC0016] focus:ring-offset-2 focus:ring-offset-db-dark disabled:opacity-50"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label="Выбрать язык"
        >
          <Globe className="h-5 w-5 shrink-0 text-db-gray-400" aria-hidden />
          <span className="font-medium">{localeLabels[locale] ?? locale}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-db-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </div>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border border-db-gray-600 bg-db-dark py-1 shadow-xl md:hidden"
          role="listbox"
        >
          {(Object.keys(localeLabels) as Array<keyof typeof localeLabels>).map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={locale === loc}
              onClick={() => switchLocale(loc)}
              disabled={isPending}
              className={`flex w-full min-h-[44px] items-center justify-center px-4 py-2 text-base font-medium transition-colors focus:outline-none focus:bg-db-gray-700 ${
                locale === loc ? 'bg-[#EC0016] text-white' : 'text-db-light hover:bg-db-gray-800'
              }`}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}

      {/* Desktop: inline buttons */}
      <div className="hidden flex-wrap items-center gap-1.5 rounded-lg bg-db-gray-800 p-1.5 md:flex">
        <Globe className="ml-0.5 h-5 w-5 shrink-0 text-db-gray-200" aria-hidden />
        {(Object.keys(localeLabels) as Array<keyof typeof localeLabels>).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            disabled={isPending}
            className={`min-h-[44px] min-w-[44px] rounded-md px-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#EC0016] focus:ring-offset-2 focus:ring-offset-db-dark disabled:opacity-50 ${
              locale === loc ? 'bg-[#EC0016] text-white' : 'bg-db-gray-700 text-db-light hover:bg-db-gray-600'
            }`}
            aria-label={`Switch to ${localeLabels[loc]}`}
            aria-current={locale === loc ? 'true' : undefined}
          >
            {localeLabels[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
