'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  Home,
  FileText,
  ListOrdered,
  BookOpen,
  Shield,
  Radio,
  GitBranch,
  ClipboardList,
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, key: 'home' },
  { href: '/reference', icon: FileText, key: 'reference' },
  { href: '/structure', icon: ListOrdered, key: 'structure' },
  { href: '/terms', icon: BookOpen, key: 'terms' },
  { href: '/rules', icon: Shield, key: 'rules' },
  { href: '/gsmr', icon: Radio, key: 'gsmr' },
  { href: '/decision', icon: GitBranch, key: 'decision' },
  { href: '/scenarios', icon: ClipboardList, key: 'scenarios' },
] as const;

export function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-db-gray-700 bg-db-dark md:static md:w-56 md:shrink-0 md:border-t-0 md:border-r md:border-db-gray-700 md:py-4"
      aria-label="Main navigation"
    >
      <ul className="flex justify-around gap-1 px-2 py-2 md:flex-col md:justify-start md:gap-0 md:px-0">
        {navItems.map(({ href, icon: Icon, key }) => {
          const isActive =
            pathname === href ||
            (href !== '/' && pathname?.startsWith(href));
          return (
            <li key={key}>
              <Link
                href={href}
                className={`flex min-h-[48px] items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-db-red focus:ring-inset md:min-h-[44px] ${
                  isActive
                    ? 'bg-db-red/20 text-db-red'
                    : 'text-db-gray-300 hover:bg-db-gray-800 hover:text-db-light'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-6 w-6 shrink-0" aria-hidden />
                <span className="hidden md:inline">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
