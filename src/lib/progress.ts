import { getItem, setItem } from './storage';

export interface UserProgress {
  learnedTerms: string[];
  reviewTerms: string[];
  completedScenarios: string[];
  correctAnswers: Record<string, boolean>;
  decisionTreeResults: { date: string; result: string }[];
  gsmrPhrasesPracticed: string[];
  lastVisit: string;
}

const DEFAULT_PROGRESS: UserProgress = {
  learnedTerms: [],
  reviewTerms: [],
  completedScenarios: [],
  correctAnswers: {},
  decisionTreeResults: [],
  gsmrPhrasesPracticed: [],
  lastVisit: new Date().toISOString(),
};

const STORAGE_KEY = 'progress';

export function getProgress(): UserProgress {
  return getItem<UserProgress>(STORAGE_KEY, DEFAULT_PROGRESS);
}

export function updateProgress<K extends keyof UserProgress>(
  key: K,
  value: UserProgress[K]
): void {
  const current = getProgress();
  setItem(STORAGE_KEY, {
    ...current,
    [key]: value,
    lastVisit: new Date().toISOString(),
  });
}

export function calculateCompletionPercentage(progress: UserProgress): number {
  if (typeof window === 'undefined') return 0;
  const termsTotal = 20;
  const scenariosTotal = 5;
  const gsmrTotal = 5;
  const termsPct =
    termsTotal > 0
      ? (progress.learnedTerms.length / termsTotal) * 100
      : 0;
  const scenariosPct =
    scenariosTotal > 0
      ? (progress.completedScenarios.length / scenariosTotal) * 100
      : 0;
  const gsmrPct =
    gsmrTotal > 0
      ? (progress.gsmrPhrasesPracticed.length / gsmrTotal) * 100
      : 0;
  const decisionPct =
    progress.decisionTreeResults.length > 0 ? 100 : 0;
  return Math.round(
    termsPct * 0.3 + scenariosPct * 0.3 + gsmrPct * 0.2 + decisionPct * 0.2
  );
}

export function resetProgress(): void {
  setItem(STORAGE_KEY, {
    ...DEFAULT_PROGRESS,
    lastVisit: new Date().toISOString(),
  });
}

// For use in components: returns progress with computed percentage (client-only)
export function getProgressWithPercentage(): UserProgress & { percentage: number } {
  const progress = getProgress();
  const percentage = Math.min(
    100,
    calculateCompletionPercentage(progress)
  );
  return { ...progress, percentage };
}
