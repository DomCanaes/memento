import { useEffect } from 'react';
import { buildAndSaveNotificationQueue, checkAndFireNotifications } from '../lib/notifications';
import { getSettings, getDailySignals } from '../lib/storage';
import { todayStr } from '../lib/time';
import type { MonkModeState } from '../types';

export function useNotificationScheduler(monkMode: MonkModeState) {
  useEffect(() => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;

    const settings = getSettings();
    const todaySignals = getDailySignals(todayStr());

    buildAndSaveNotificationQueue(settings, monkMode, todaySignals);

    // Also check immediately for any overdue notifications
    checkAndFireNotifications();

    // Re-check every minute (foreground fallback)
    const intervalId = setInterval(() => {
      checkAndFireNotifications();
    }, 60 * 1000);

    // Notify SW to also check
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_NOTIFICATIONS' });
    }

    // Register periodic background sync if available
    if ('serviceWorker' in navigator && 'periodicSync' in (window as unknown as { ServiceWorkerRegistration?: unknown })) {
      navigator.serviceWorker.ready.then(reg => {
        const regWithSync = reg as unknown as { periodicSync?: { register: (tag: string, opts: { minInterval: number }) => Promise<void>; getTags: () => Promise<string[]> } };
        if (regWithSync.periodicSync) {
          regWithSync.periodicSync.register('check-notifications', { minInterval: 60 * 1000 }).catch(() => {});
        }
      });
    }

    return () => clearInterval(intervalId);
  }, [monkMode.isActive, monkMode.streak]);
}
