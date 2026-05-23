import { set as idbSet, get as idbGet } from 'idb-keyval';
import type { ScheduledNotification, NotificationType, AppSettings, MonkModeState, DailySignalLog } from '../types';
import { MEMENTO_PROMPTS } from '../constants/memento-prompts';
import { nextOccurrenceMs, hoursUntilEndOfDay } from './time';

const IDB_QUEUE_KEY = 'notification_queue';

function makeId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function makeNotif(
  type: NotificationType,
  title: string,
  body: string,
  scheduledTime: number,
): ScheduledNotification {
  return { id: makeId(), type, title, body, scheduledTime, fired: false };
}

function pickMementoPrompts(history: AppSettings['mementoMoriHistory']): ScheduledNotification[] {
  const now = Date.now();
  const cutoff = now - 48 * 60 * 60 * 1000;
  const recentIndices = new Set(history.filter(h => h.shownAt > cutoff).map(h => h.promptIndex));
  const available = MEMENTO_PROMPTS.map((_, i) => i).filter(i => !recentIndices.has(i));
  if (available.length === 0) return [];

  // Pick 2 random prompts at random times today
  const today = new Date();
  const endOfDay = new Date(today);
  endOfDay.setHours(22, 0, 0, 0);
  const startWindow = Math.max(now + 30 * 60 * 1000, new Date(today).setHours(9, 0, 0, 0));

  const notifs: ScheduledNotification[] = [];
  const picked = new Set<number>();

  for (let i = 0; i < 2 && available.length > picked.size; i++) {
    let idx: number;
    do { idx = available[Math.floor(Math.random() * available.length)]; } while (picked.has(idx));
    picked.add(idx);
    const timeRange = Math.max(0, endOfDay.getTime() - startWindow);
    const fireAt = startWindow + Math.random() * timeRange * (i === 0 ? 0.45 : 1);
    if (fireAt > now) {
      notifs.push(makeNotif('memento_mori', 'MEMENTO', MEMENTO_PROMPTS[idx], fireAt));
    }
  }
  return notifs;
}

export async function buildAndSaveNotificationQueue(
  settings: AppSettings,
  monkMode: MonkModeState,
  todaySignals: DailySignalLog,
): Promise<void> {
  const queue: ScheduledNotification[] = [];
  const sched = settings.notificationSchedule;

  queue.push(makeNotif('morning_signals', 'MEMENTO', 'What are your 3 signals today?', nextOccurrenceMs(sched.morningSignalsTime)));

  const pending = todaySignals.signals.filter(s => s.status === 'pending').length;
  const hrs = hoursUntilEndOfDay();
  if (pending > 0) {
    queue.push(makeNotif('midday_signals', 'MEMENTO', `${pending} signal${pending > 1 ? 's' : ''} remaining. ${hrs} hours of daylight left.`, nextOccurrenceMs('13:00')));
  }

  if (monkMode.isActive) {
    const dayNum = monkMode.streak + 1;
    queue.push(makeNotif('monk_mode_daily', 'MONK MODE', `Season of no. Day ${dayNum}. Build.`, nextOccurrenceMs(sched.monkModeDailyTime)));
  }

  queue.push(makeNotif('evening_reflection', 'MEMENTO', "Day's over. How did you spend it?", nextOccurrenceMs(sched.eveningReflectionTime)));

  const fiveMinPending = todaySignals.signals.find(s => s.isFiveMin && s.status === 'pending');
  if (fiveMinPending) {
    for (let i = 1; i <= 6; i++) {
      const fireAt = Date.now() + i * 15 * 60 * 1000;
      queue.push(makeNotif('five_min_nag', 'DO IT NOW', `${fiveMinPending.label} — stop deferring.`, fireAt));
    }
  }

  queue.push(...pickMementoPrompts(settings.mementoMoriHistory));

  await idbSet(IDB_QUEUE_KEY, queue);
}

export async function getNotificationQueue(): Promise<ScheduledNotification[]> {
  return (await idbGet<ScheduledNotification[]>(IDB_QUEUE_KEY)) ?? [];
}

export async function markNotificationFired(id: string): Promise<void> {
  const queue = await getNotificationQueue();
  const updated = queue.map(n => n.id === id ? { ...n, fired: true } : n);
  await idbSet(IDB_QUEUE_KEY, updated);
}

export async function checkAndFireNotifications(): Promise<void> {
  if (Notification.permission !== 'granted') return;
  const queue = await getNotificationQueue();
  const now = Date.now();
  let changed = false;

  for (const notif of queue) {
    if (!notif.fired && notif.scheduledTime <= now) {
      new Notification(notif.title, { body: notif.body, icon: '/icons/icon-192.png', tag: notif.id });
      notif.fired = true;
      changed = true;
    }
  }

  if (changed) {
    await idbSet(IDB_QUEUE_KEY, queue);
  }
}
