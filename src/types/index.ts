export type SignalStatus = 'pending' | 'done' | 'skipped';

export interface Signal {
  id: string;
  label: string;
  deadlineMinutes: number; // minutes since midnight
  compressedMinutes: number; // deadline - 240 mins, clamped to 0
  isFiveMin: boolean;
  status: SignalStatus;
  createdAt: string;
}

export interface DailySignalLog {
  date: string; // YYYY-MM-DD
  signals: Signal[];
  skippedCount: number;
}

export interface ReflectionEntry {
  id: string;
  date: string; // YYYY-MM-DD
  signal1Completed: boolean;
  signal2Completed: boolean;
  signal3Completed: boolean;
  productiveHours: number;
  gratitude: string;
  submittedAt: string;
}

export interface MonkModeState {
  isActive: boolean;
  startDate: string | null; // YYYY-MM-DD
  targetDays: number;
  streak: number;
  lastCheckinDate: string | null; // YYYY-MM-DD
  brokeDates: string[];
}

export interface LossClock {
  id: string;
  label: string;
  targetDate: string; // YYYY-MM-DD
  createdAt: string;
}

export interface FranklAnchor {
  id: string;
  name: string;
  description?: string;
}

export type NotificationType =
  | 'morning_signals'
  | 'midday_signals'
  | 'monk_mode_daily'
  | 'evening_reflection'
  | 'five_min_nag'
  | 'memento_mori';

export interface ScheduledNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  scheduledTime: number; // Unix ms
  fired: boolean;
}

export interface NotificationSchedule {
  morningSignalsTime: string; // HH:mm
  eveningReflectionTime: string; // HH:mm
  monkModeDailyTime: string; // HH:mm
}

export interface DoubterEntry {
  id: string;
  name: string;
  addedAt: string;
}

export interface VerdictEntry {
  id: string;
  date: string; // YYYY-MM-DD
  sacrifice: boolean;
  experiment: boolean;
  speed: boolean;
  sacrificeNote?: string;
  experimentNote?: string;
  speedNote?: string;
  submittedAt: string;
}

export interface AppSettings {
  notificationSchedule: NotificationSchedule;
  hasSeenFirstOpenModal: boolean;
  mementoMoriHistory: { promptIndex: number; shownAt: number }[];
}
