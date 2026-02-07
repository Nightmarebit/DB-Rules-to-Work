'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import type { RuleItem } from '@/data/rules';
import type { Locale } from '@/i18n/routing';

interface RuleCardProps {
  rule: RuleItem;
  locale: Locale;
}

const severityIcons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const severityClass = {
  warning: 'text-db-yellow border-db-yellow/30',
  info: 'text-db-gray-400 border-db-gray-600',
  success: 'text-db-green border-db-green/30',
};

export function RuleCard({ rule, locale }: RuleCardProps) {
  const t = useTranslations('rules');
  const [open, setOpen] = useState(false);
  const Icon = severityIcons[rule.severity ?? 'info'];
  const styleClass = severityClass[rule.severity ?? 'info'];
  const title = (rule.title as Record<string, string>)[locale] ?? rule.title.en;
  const items = (rule.content as Record<string, string[]>)[locale] ?? rule.content.en;
  const explanation = rule.explanation
    ? (rule.explanation as Record<string, string>)[locale] ?? rule.explanation.en
    : null;

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-3 border-l-4 bg-db-gray-800/50 p-4 text-left ${styleClass}`}
      >
        <span className="flex items-center gap-2 font-semibold text-db-light">
          <Icon className="h-5 w-5 shrink-0" aria-hidden />
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-db-gray-500" aria-hidden />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-db-gray-500" aria-hidden />
        )}
      </button>
      {open && (
        <div className="border-t border-db-gray-700 p-4">
          {explanation && (
            <div className="mb-3 rounded-lg bg-db-gray-700/50 px-3 py-2">
              <span className="text-xs font-medium uppercase tracking-wide text-db-gray-500">
                {t('explanationLabel')}
              </span>
              <p className="mt-1 text-sm leading-relaxed text-db-gray-300">
                {explanation}
              </p>
            </div>
          )}
          <ul>
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-db-gray-300">
              <span className="text-db-gray-500">•</span>
              <span>{item}</span>
            </li>
          ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
