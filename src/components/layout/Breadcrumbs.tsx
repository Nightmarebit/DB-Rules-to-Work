'use client';

import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';

const pathToNavKey: Record<string, string> = {
  '': 'home',
  reference: 'reference',
  structure: 'structure',
  terms: 'terms',
  rules: 'rules',
  gsmr: 'gsmr',
  decision: 'decision',
  scenarios: 'scenarios',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const segments = pathname.split('/').filter(Boolean);
  const pathSegments = segments[0] && ['ru', 'de', 'en', 'ar', 'pl', 'ro', 'sq', 'uk'].includes(segments[0])
    ? segments.slice(1)
    : segments;

  const items: { href: string; label: string; isLast: boolean }[] = [
    { href: '/', label: t('home'), isLast: pathSegments.length === 0 },
  ];

  let href = '';
  pathSegments.forEach((seg, i) => {
    href += `/${seg}`;
    const isLast = i === pathSegments.length - 1;
    const label = t(pathToNavKey[seg] ?? seg);
    items.push({ href, label, isLast });
  });

  const displayItems = items;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0 overflow-hidden">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-db-gray-400">
        {displayItems.map((item, i) => (
          <li key={item.href} className="flex min-w-0 items-center gap-1">
            {i > 0 && (
              <ChevronRight className="h-4 w-4 shrink-0 text-db-gray-500" aria-hidden />
            )}
            {item.isLast ? (
              <span className="truncate font-medium text-[#EC0016]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-1 truncate hover:text-db-light focus:outline-none focus:ring-2 focus:ring-[#EC0016] focus:ring-offset-1 rounded"
              >
                {i === 0 ? (
                  <Home className="h-4 w-4 shrink-0" aria-hidden />
                ) : null}
                <span className="truncate">{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
