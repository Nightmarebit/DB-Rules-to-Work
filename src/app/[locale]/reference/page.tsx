'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import { gsmrPhrases } from '@/data/gsmr-phrases';
import type { Locale } from '@/i18n/routing';

const KEY_NUMBERS = [
  { value: '500 m', descRu: 'Минимальная видимость для V11', descEn: 'Min. visibility for V11' },
  { value: '200 км/ч', descRu: '> 200 км/ч — только UV-Sperrung', descEn: '> 200 km/h — UV-Sperrung only' },
  { value: '15 сек', descRu: 'Время реакции / отход в убежище', descEn: 'Reaction time / move to refuge' },
  { value: 'V11', descRu: 'Сертификат для самоконтроля на пути', descEn: 'Certification for self-protection on track' },
  { value: 'LÜ-Sendung', descRu: 'Сообщение об освобождении пути', descEn: 'Track-clear message' },
] as const;

const RULES_SUMMARY = [
  { ru: 'Запрос у Fdl (диспетчер) перед выходом на путь. Freigabe обязательно.', en: 'Request Fdl (signaller) before entering track. Freigabe required.' },
  { ru: 'Видимость < 500 м или туман → V11 запрещён, только UV-Sperrung.', en: 'Visibility < 500 m or fog → V11 forbidden, UV-Sperrung only.' },
  { ru: 'Внутренний путь (поезда с двух сторон) → только UV-Sperrung.', en: 'Inner track (trains both sides) → UV-Sperrung only.' },
  { ru: 'Без сертификата V11 → Annäherungsstrecke или UV-Sperrung.', en: 'Without V11 → Annäherungsstrecke or UV-Sperrung.' },
  { ru: 'После работ — LÜ-Sendung, путь открыт только после разрешения Fdl.', en: 'After work — LÜ-Sendung, track open only after Fdl clearance.' },
] as const;

export default function ReferencePage() {
  const t = useTranslations('reference');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const isRu = locale === 'ru';

  const getText = (o: Record<string, string>) => o[locale] ?? o.en ?? o.de;

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-8 min-w-0 print:max-w-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 no-print">
        <section>
          <h1 className="break-words text-2xl font-bold text-db-light md:text-3xl">{t('title')}</h1>
          <p className="mt-1 text-sm text-db-gray-400">{t('printHint')}</p>
        </section>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[48px] items-center gap-2 rounded-xl border border-db-gray-600 bg-db-gray-800 px-4 text-db-light hover:bg-db-gray-700"
        >
          <Printer className="h-5 w-5" /> {t('printHint')}
        </button>
      </div>
      <div className="print-only hidden text-center text-2xl font-bold">
        {tNav('reference')} — DB SafeLearn
      </div>

      <section className="rounded-xl border border-db-gray-700 bg-db-gray-800/50 p-4 print:break-inside-avoid">
        <h2 className="text-lg font-semibold text-[#EC0016]">{t('keyNumbers')}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {KEY_NUMBERS.map((item, i) => (
            <li key={i} className="flex justify-between gap-4">
              <span className="font-mono font-semibold text-db-light">{item.value}</span>
              <span className="text-db-gray-300">{isRu ? item.descRu : item.descEn}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-db-gray-700 bg-db-gray-800/50 p-4 print:break-inside-avoid">
        <h2 className="text-lg font-semibold text-[#EC0016]">{t('rulesSummary')}</h2>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-db-gray-300">
          {RULES_SUMMARY.map((item, i) => (
            <li key={i}>{isRu ? item.ru : item.en}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-db-gray-700 bg-db-gray-800/50 p-4 print:break-inside-avoid">
        <h2 className="text-lg font-semibold text-[#EC0016]">{t('gsmrQuick')}</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {gsmrPhrases.slice(0, 5).map((p) => (
            <li key={p.id}>
              <span className="font-medium text-db-light">{getText(p.scenario as Record<string, string>)}</span>
              <p className="mt-0.5 font-mono text-db-gray-400">{p.phrase.de}</p>
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}
