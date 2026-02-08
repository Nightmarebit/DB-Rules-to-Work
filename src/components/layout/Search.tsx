'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import {
  buildSearchIndex,
  searchItems,
  getRecentSearches,
  saveRecentSearch,
  type SearchItem,
  type SearchResultType,
} from '@/lib/search';
import type { Locale } from '@/i18n/routing';

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-db-yellow/40 px-0.5 text-db-dark">
            {p}
          </mark>
        ) : (
          p
        )
      )}
    </>
  );
}

const TYPE_LABELS: Record<SearchResultType, string> = {
  term: 'nav.terms',
  rule: 'nav.rules',
  phrase: 'nav.gsmr',
};

export function Search() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => buildSearchIndex(locale), [locale]);
  const results = useMemo(() => searchItems(index, query, locale), [index, query, locale]);

  const grouped = useMemo(() => {
    const groups: Record<SearchResultType, SearchItem[]> = {
      term: [],
      rule: [],
      phrase: [],
    };
    results.forEach((item) => groups[item.type].push(item));
    return groups;
  }, [results]);

  useEffect(() => {
    if (open) {
      setRecent(getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSelect = (item: SearchItem) => {
    saveRecentSearch(query);
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-db-gray-400 hover:bg-db-gray-800 hover:text-db-light focus:outline-none focus:ring-2 focus:ring-[#EC0016]"
        aria-label={t('search')}
      >
        <SearchIcon className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-db-dark/80 backdrop-blur-sm"
          aria-modal
          role="dialog"
          aria-label={t('search')}
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto mt-8 max-w-xl rounded-xl border border-db-gray-700 bg-db-dark p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5 shrink-0 text-db-gray-500" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search')}
                className="min-h-[48px] flex-1 rounded-lg border border-db-gray-600 bg-db-gray-800 px-3 text-db-light placeholder-db-gray-500 focus:border-[#EC0016] focus:outline-none focus:ring-2 focus:ring-[#EC0016]/50"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-db-gray-400 hover:bg-db-gray-700 hover:text-db-light"
                aria-label={t('close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 max-h-[60vh] overflow-y-auto">
              {query.trim() ? (
                <>
                  {results.length === 0 ? (
                    <p className="py-4 text-center text-sm text-db-gray-500">Ничего не найдено</p>
                  ) : (
                    <div className="space-y-4">
                      {(['term', 'rule', 'phrase'] as const).map(
                        (type) =>
                          grouped[type].length > 0 && (
                            <div key={type}>
                              <p className="mb-2 text-xs font-semibold uppercase text-db-gray-500">
                                {tNav(TYPE_LABELS[type])}
                              </p>
                              <ul className="space-y-1">
                                {grouped[type].slice(0, 5).map((item) => (
                                  <li key={`${item.type}-${item.id}`}>
                                    <Link
                                      href={item.href}
                                      onClick={() => handleSelect(item)}
                                      className="block rounded-lg px-3 py-2 text-left text-sm text-db-light hover:bg-db-gray-800"
                                    >
                                      <Highlight text={item.title} query={query} /> —{' '}
                                      <span className="text-db-gray-400">
                                        <Highlight text={item.subtitle.slice(0, 50)} query={query} />
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                      )}
                    </div>
                  )}
                </>
              ) : (
                recent.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-db-gray-500">
                      Недавние запросы
                    </p>
                    <ul className="space-y-1">
                      {recent.map((q, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => setQuery(q)}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-db-gray-400 hover:bg-db-gray-800 hover:text-db-light"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
