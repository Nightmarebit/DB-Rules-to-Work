'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, RotateCcw, Shield, Lock, Train, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { decisionTree } from '@/data/decision-tree';
import { updateProgress, getProgress } from '@/lib/progress';
import type { DecisionNode } from '@/data/decision-tree';
import type { MeasureType } from '@/data/decision-tree';
import type { Locale } from '@/i18n/routing';

interface DecisionTreeProps {
  locale: Locale;
}

const MEASURE_ICONS: Record<MeasureType, typeof Shield> = {
  'uv-sperrung': Lock,
  'annäherungsstrecke': Train,
  'v11': Shield,
  forbidden: AlertTriangle,
};

const MEASURE_COLORS: Record<MeasureType, string> = {
  'uv-sperrung': 'border-db-yellow/40 bg-db-yellow/10 text-db-yellow',
  'annäherungsstrecke': 'border-db-green/40 bg-db-green/10 text-db-green',
  'v11': 'border-db-green/40 bg-db-green/10 text-db-green',
  forbidden: 'border-[#EC0016]/40 bg-[#EC0016]/10 text-[#EC0016]',
};

export function DecisionTree({ locale }: DecisionTreeProps) {
  const t = useTranslations('decision');
  const [history, setHistory] = useState<string[]>(['start']);
  const currentNode = useMemo(() => {
    const id = history[history.length - 1];
    return decisionTree.find((n) => n.id === id) ?? null;
  }, [history]);

  const breadcrumbLabels = useMemo(() => {
    return history.slice(0, -1).map((nodeId, i) => {
      const node = decisionTree.find((n) => n.id === nodeId);
      const nextId = history[i + 1];
      const opt = node?.options?.find((o) => o.nextNodeId === nextId);
      return opt ? ((opt.label as Record<string, string>)[locale] ?? opt.label.en) : null;
    }).filter(Boolean) as string[];
  }, [history, locale]);

  const handleAnswer = (nextNodeId: string) => {
    setHistory((h) => [...h, nextNodeId]);
  };

  const handleBack = () => {
    if (history.length > 1) setHistory((h) => h.slice(0, -1));
  };

  const handleRestart = () => {
    const node = decisionTree.find((n) => n.id === history[history.length - 1]);
    if (node?.type === 'result' && node.result) {
      const p = getProgress();
      const prev = p.decisionTreeResults ?? [];
      updateProgress('decisionTreeResults', [
        ...prev,
        { date: new Date().toISOString(), result: node.result.measure },
      ]);
    }
    setHistory(['start']);
  };

  if (!currentNode) return null;

  if (currentNode.type === 'result' && currentNode.result) {
    const r = currentNode.result;
    const getText = (o: Record<string, string>) => o[locale] ?? o.en;
    const getTextArr = (o: Record<string, string[]>) => o[locale] ?? o.en;
    const title = getText(r.title);
    const explanation = getText(r.explanation);
    const procedure = getTextArr(r.procedure);
    const Icon = MEASURE_ICONS[r.measure] ?? Shield;
    const colorClass = MEASURE_COLORS[r.measure] ?? MEASURE_COLORS['uv-sperrung'];

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        {breadcrumbLabels.length > 0 && (
          <nav className="flex flex-wrap items-center gap-1 text-xs text-db-gray-500">
            {breadcrumbLabels.map((label, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                <span className="max-w-[120px] truncate sm:max-w-none">{label}</span>
              </span>
            ))}
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card className={`overflow-hidden border-2 p-6 shadow-lg ${colorClass}`}>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-current/20">
                <Icon className="h-8 w-8" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-relaxed opacity-90">{explanation}</p>
                <div className="mt-4">
                  <h3 className="font-semibold">{t('procedure')}</h3>
                  <ol className="mt-2 list-inside list-decimal space-y-1 text-sm opacity-90">
                    {procedure.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <Button variant="secondary" size="lg" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4" /> {t('back')}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <Button variant="primary" size="lg" onClick={handleRestart} className="bg-[#EC0016] hover:bg-[#EC0016]/90">
              <RotateCcw className="h-4 w-4" /> {t('startOver')}
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = currentNode.question ? ((currentNode.question as Record<string, string>)[locale] ?? currentNode.question.en) : '';
  const options = currentNode.options ?? [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {breadcrumbLabels.length > 0 && (
        <nav className="flex flex-wrap items-center gap-1 text-xs text-db-gray-500">
          {breadcrumbLabels.map((label, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              <span className="max-w-[100px] truncate sm:max-w-[160px]">{label}</span>
            </span>
          ))}
        </nav>
      )}
      <div className="text-xs text-db-gray-500">
        {t('step')} {history.length}
      </div>
      <Card className="p-4 md:p-5">
        <h2 className="text-db-light font-semibold" style={{ fontSize: '20px' }}>
          {question}
        </h2>
        <ul className="mt-4 space-y-3">
          {options.map((opt, i) => (
            <li key={i}>
              <motion.button
                type="button"
                onClick={() => handleAnswer(opt.nextNodeId)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full min-h-[48px] rounded-xl border border-db-gray-600 bg-db-gray-800 py-3 px-4 text-left font-medium text-db-light transition hover:border-[#EC0016] hover:bg-db-gray-700 focus:ring-2 focus:ring-[#EC0016]"
              >
                {(opt.label as Record<string, string>)[locale] ?? opt.label.en}
              </motion.button>
            </li>
          ))}
        </ul>
      </Card>
      {history.length > 1 && (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
          <Button variant="ghost" size="md" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4" /> {t('back')}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
