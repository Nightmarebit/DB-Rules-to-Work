export interface UserProgress {
  learnedTerms: string[];
  reviewTerms: string[];
  completedScenarios: Record<string, boolean>;
  lastVisit: string;
  // backward compat
  gsmrPhrasesPracticed?: string[];
  decisionTreeResults?: { date: string; result: string }[];
  correctAnswers?: Record<string, boolean>;
}

const STORAGE_KEY = 'db-safelearn:progress';

const DEFAULT_PROGRESS: UserProgress = {
  learnedTerms: [],
  reviewTerms: [],
  completedScenarios: {},
  lastVisit: new Date().toISOString(),
  gsmrPhrasesPracticed: [],
};

function migrateCompletedScenarios(
  raw: unknown
): Record<string, boolean> {
  if (Array.isArray(raw)) {
    return Object.fromEntries((raw as string[]).map((id) => [id, true]));
  }
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as Record<string, boolean>;
  }
  return {};
}

export function loadProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const completedScenarios = migrateCompletedScenarios(parsed.completedScenarios);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedScenarios,
      lastVisit: (parsed.lastVisit as string) ?? new Date().toISOString(),
    } as UserProgress;
  } catch {
    return null;
  }
}

export function saveProgress(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  const current = loadProgress() ?? { ...DEFAULT_PROGRESS };
  const next = {
    ...current,
    [key]: value,
    lastVisit: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota or disabled
  }
}

export function markTermLearned(termId: string): void {
  const p = loadProgress() ?? { ...DEFAULT_PROGRESS };
  const learnedTerms = p.learnedTerms.includes(termId)
    ? p.learnedTerms
    : [...p.learnedTerms, termId];
  const reviewTerms = p.reviewTerms.filter((id) => id !== termId);
  const next = { ...p, learnedTerms, reviewTerms, lastVisit: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }
}

export function markTermReview(termId: string): void {
  const p = loadProgress() ?? { ...DEFAULT_PROGRESS };
  const reviewTerms = p.reviewTerms.includes(termId)
    ? p.reviewTerms
    : [...p.reviewTerms, termId];
  const learnedTerms = p.learnedTerms.filter((id) => id !== termId);
  const next = { ...p, learnedTerms, reviewTerms, lastVisit: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }
}

const TERMS_TOTAL = 20;
const SCENARIOS_TOTAL = 5;

export function calculatePercentage(): number {
  const p = loadProgress();
  if (!p) return 0;
  const termsPct =
    TERMS_TOTAL > 0 ? (p.learnedTerms.length / TERMS_TOTAL) * 100 : 0;
  const scenariosCount = Object.keys(p.completedScenarios ?? {}).length;
  const scenariosPct =
    SCENARIOS_TOTAL > 0 ? (scenariosCount / SCENARIOS_TOTAL) * 100 : 0;
  return Math.round(Math.min(100, (termsPct + scenariosPct) / 2));
}

// Backward compat for existing consumers (safe for SSR: no window access)
export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };
  try {
    return loadProgress() ?? { ...DEFAULT_PROGRESS };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function updateProgress<K extends keyof UserProgress>(
  key: K,
  value: UserProgress[K]
): void {
  saveProgress(key, value);
}

export function calculateCompletionPercentage(progress: UserProgress): number {
  const termsPct =
    TERMS_TOTAL > 0
      ? (progress.learnedTerms.length / TERMS_TOTAL) * 100
      : 0;
  const scenariosCount = Object.keys(progress.completedScenarios ?? {}).length;
  const scenariosPct =
    SCENARIOS_TOTAL > 0 ? (scenariosCount / SCENARIOS_TOTAL) * 100 : 0;
  const gsmrTotal = 5;
  const gsmrPct =
    gsmrTotal > 0 && progress.gsmrPhrasesPracticed
      ? (progress.gsmrPhrasesPracticed.length / gsmrTotal) * 100
      : 0;
  const decisionPct =
    progress.decisionTreeResults?.length ? 100 : 0;
  return Math.round(
    Math.min(
      100,
      termsPct * 0.3 + scenariosPct * 0.3 + gsmrPct * 0.2 + decisionPct * 0.2
    )
  );
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...DEFAULT_PROGRESS,
      lastVisit: new Date().toISOString(),
    }));
  } catch {
    // ignore
  }
}

export function resetScenariosProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadProgress() ?? { ...DEFAULT_PROGRESS };
    const next = {
      ...current,
      completedScenarios: {},
      correctAnswers: {},
      lastVisit: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getProgressWithPercentage(): UserProgress & { percentage: number } {
  const progress = getProgress();
  const percentage = Math.min(100, calculateCompletionPercentage(progress));
  return { ...progress, percentage };
}

export type SectionKey = 'terms' | 'rules' | 'gsmr' | 'decision' | 'scenarios';

/** Section totals (import from data to avoid circular deps; caller can pass counts). */
export function getSectionProgress(
  progress: UserProgress,
  counts: { terms: number; gsmr: number; scenarios: number }
): Record<SectionKey, number> {
  const termsPct =
    counts.terms > 0
      ? Math.round((progress.learnedTerms.length / counts.terms) * 100)
      : 0;
  const gsmrList = progress.gsmrPhrasesPracticed ?? [];
  const gsmrPct =
    counts.gsmr > 0 ? Math.round((gsmrList.length / counts.gsmr) * 100) : 0;
  const scenariosPct =
    counts.scenarios > 0 && progress.completedScenarios
      ? Math.round(
          (Object.keys(progress.completedScenarios).length / counts.scenarios) * 100
        )
      : 0;
  const decisionPct = progress.decisionTreeResults?.length ? 100 : 0;
  return {
    terms: Math.min(100, termsPct),
    rules: 0,
    gsmr: Math.min(100, gsmrPct),
    decision: decisionPct,
    scenarios: Math.min(100, scenariosPct),
  };
}
