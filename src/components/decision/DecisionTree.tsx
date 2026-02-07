'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { decisionTree } from '@/data/decision-tree';
import { updateProgress, getProgress } from '@/lib/progress';
import type { DecisionNode } from '@/data/decision-tree';
import type { Locale } from '@/i18n/routing';

interface DecisionTreeProps {
  locale: Locale;
}

export function DecisionTree({ locale }: DecisionTreeProps) {
  const t = useTranslations('decision');
  const [history, setHistory] = useState<string[]>(['start']);
  const currentNode = useMemo(() => {
    const id = history[history.length - 1];
    return decisionTree.find((n) => n.id === id) ?? null;
  }, [history]);

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
      updateProgress('decisionTreeResults', [
        ...p.decisionTreeResults,
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

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="overflow-hidden border-db-green/30 bg-db-green/5 p-4 md:p-5">
          <div className="flex items-center gap-2 text-db-green">
            <Shield className="h-6 w-6" aria-hidden />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <p className="mt-3 text-db-gray-300">{explanation}</p>
          <div className="mt-4">
            <h3 className="font-semibold text-db-light">{t('procedure')}</h3>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-db-gray-400">
              {procedure.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </Card>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="lg" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4" /> {t('back')}
          </Button>
          <Button variant="primary" size="lg" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" /> {t('startOver')}
          </Button>
        </div>
      </div>
    );
  }

  const question = currentNode.question ? ((currentNode.question as Record<string, string>)[locale] ?? currentNode.question.en) : '';
  const options = currentNode.options ?? [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-xs text-db-gray-500">
        {t('step')} {history.length}
      </div>
      <Card className="p-4 md:p-5">
        <h2 className="text-lg font-semibold text-db-light md:text-xl">{question}</h2>
        <ul className="mt-4 space-y-3">
          {options.map((opt, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleAnswer(opt.nextNodeId)}
                className="w-full min-h-[48px] rounded-xl border border-db-gray-600 bg-db-gray-800 py-3 px-4 text-left font-medium text-db-light transition hover:border-db-red hover:bg-db-gray-700 focus:ring-2 focus:ring-db-red"
              >
                {(opt.label as Record<string, string>)[locale] ?? opt.label.en}
              </button>
            </li>
          ))}
        </ul>
      </Card>
      {history.length > 1 && (
        <Button variant="ghost" size="md" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" /> {t('back')}
        </Button>
      )}
    </div>
  );
}
