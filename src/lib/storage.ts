import type {
  AppSettings,
  DailySignalLog,
  DoubterEntry,
  FranklAnchor,
  LossClock,
  MonkModeState,
  ReflectionEntry,
  VerdictEntry,
} from '../types';
import { DEFAULT_NOTIFICATION_SCHEDULE, DEFAULT_FRANKL_ANCHORS, MONK_MODE_DEFAULT_DAYS } from '../constants/defaults';

const KEYS = {
  settings: 'memento_settings',
  dailySignals: (date: string) => `memento_daily_signals_${date}`,
  monkMode: 'memento_monk_mode',
  lossClocks: 'memento_loss_clocks',
  reflections: 'memento_reflections',
  franklAnchors: 'memento_frankl_anchors',
  verdicts: 'memento_verdicts',
  verdictHighestStreak: 'memento_verdict_highest_streak',
  doubters: 'memento_doubters',
} as const;

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function getSettings(): AppSettings {
  return get<AppSettings>(KEYS.settings, {
    notificationSchedule: DEFAULT_NOTIFICATION_SCHEDULE,
    hasSeenFirstOpenModal: false,
    mementoMoriHistory: [],
  });
}

export function setSettings(s: AppSettings): void {
  set(KEYS.settings, s);
}

export function getDailySignals(date: string): DailySignalLog {
  return get<DailySignalLog>(KEYS.dailySignals(date), {
    date,
    signals: [],
    skippedCount: 0,
  });
}

export function setDailySignals(log: DailySignalLog): void {
  set(KEYS.dailySignals(log.date), log);
}

export function getMonkMode(): MonkModeState {
  return get<MonkModeState>(KEYS.monkMode, {
    isActive: false,
    startDate: null,
    targetDays: MONK_MODE_DEFAULT_DAYS,
    streak: 0,
    lastCheckinDate: null,
    brokeDates: [],
  });
}

export function setMonkMode(s: MonkModeState): void {
  set(KEYS.monkMode, s);
}

export function getLossClocks(): LossClock[] {
  return get<LossClock[]>(KEYS.lossClocks, []);
}

export function setLossClocks(clocks: LossClock[]): void {
  set(KEYS.lossClocks, clocks);
}

export function getReflections(): ReflectionEntry[] {
  return get<ReflectionEntry[]>(KEYS.reflections, []);
}

export function setReflections(entries: ReflectionEntry[]): void {
  set(KEYS.reflections, entries);
}

export function getFranklAnchors(): FranklAnchor[] {
  return get<FranklAnchor[]>(KEYS.franklAnchors, DEFAULT_FRANKL_ANCHORS);
}

export function setFranklAnchors(anchors: FranklAnchor[]): void {
  set(KEYS.franklAnchors, anchors);
}

export function getVerdicts(): VerdictEntry[] {
  return get<VerdictEntry[]>(KEYS.verdicts, []);
}

export function setVerdicts(entries: VerdictEntry[]): void {
  set(KEYS.verdicts, entries);
}

export function getHighestStreak(): number {
  return get<number>(KEYS.verdictHighestStreak, 0);
}

export function setHighestStreak(n: number): void {
  set(KEYS.verdictHighestStreak, n);
}

export function getDoubters(): DoubterEntry[] {
  return get<DoubterEntry[]>(KEYS.doubters, []);
}

export function setDoubters(entries: DoubterEntry[]): void {
  set(KEYS.doubters, entries);
}
