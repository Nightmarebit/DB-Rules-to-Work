import { terminology } from '@/data/terminology';
import { rules } from '@/data/rules';
import { gsmrPhrases } from '@/data/gsmr-phrases';
import type { Locale } from '@/i18n/routing';

export type SearchResultType = 'term' | 'rule' | 'phrase';

export interface SearchItem {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  text: string;
}

function getText(o: Record<string, string>, locale: Locale): string {
  return o[locale] ?? o.en ?? o.de ?? '';
}

export function buildSearchIndex(locale: Locale): SearchItem[] {
  const items: SearchItem[] = [];
  terminology.forEach((t) => {
    const title = getText(t as unknown as Record<string, string>, locale);
    const definition = getText(t.definition as unknown as Record<string, string>, locale);
    items.push({
      type: 'term',
      id: t.id,
      title,
      subtitle: t.pronunciation?.ru ?? '',
      href: `/terms#${t.id}`,
      text: `${title} ${definition}`.toLowerCase(),
    });
  });
  rules.forEach((r) => {
    const title = getText(r.title as unknown as Record<string, string>, locale);
    const explanation = r.explanation ? getText(r.explanation as unknown as Record<string, string>, locale) : '';
    const content = (r.content as Record<string, string[]>)[locale] ?? r.content.en ?? [];
    items.push({
      type: 'rule',
      id: r.id,
      title,
      subtitle: explanation.slice(0, 80),
      href: '/rules',
      text: `${title} ${explanation} ${content.join(' ')}`.toLowerCase(),
    });
  });
  gsmrPhrases.forEach((p) => {
    const title = getText(p.scenario as unknown as Record<string, string>, locale);
    const phrase = getText(p.phrase as unknown as Record<string, string>, locale);
    items.push({
      type: 'phrase',
      id: p.id,
      title,
      subtitle: phrase.slice(0, 60) + '…',
      href: '/gsmr',
      text: `${title} ${phrase}`.toLowerCase(),
    });
  });
  return items;
}

export function searchItems(index: SearchItem[], query: string, locale: Locale): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((item) => item.text.includes(q));
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const re = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark class="bg-db-yellow/40 text-db-dark rounded px-0.5">$1</mark>');
}

const RECENT_KEY = 'db-safelearn:recent-search';
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as string[];
    return Array.isArray(arr) ? arr.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  try {
    const prev = getRecentSearches().filter((q) => q !== query);
    const next = [query.trim(), ...prev].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
