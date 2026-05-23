/// <reference lib="WebWorker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { get as idbGet, set as idbSet } from 'idb-keyval';

declare const self: ServiceWorkerGlobalScope;

interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  scheduledTime: number;
  fired: boolean;
}

self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

async function checkAndFireNotifications() {
  const queue = (await idbGet<ScheduledNotification[]>('notification_queue')) ?? [];
  const now = Date.now();
  let changed = false;

  for (const notif of queue) {
    if (!notif.fired && notif.scheduledTime <= now) {
      try {
        await self.registration.showNotification(notif.title, {
          body: notif.body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: notif.id,
        });
        notif.fired = true;
        changed = true;
      } catch {
        // permission revoked
      }
    }
  }

  if (changed) {
    await idbSet('notification_queue', queue);
  }
}

self.addEventListener('install', () => {
  setInterval(() => { checkAndFireNotifications(); }, 60_000);
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  setInterval(() => { checkAndFireNotifications(); }, 60_000);
});

self.addEventListener('periodicsync', (event) => {
  const e = event as unknown as { tag: string; waitUntil: (p: Promise<unknown>) => void };
  if (e.tag === 'check-notifications') {
    e.waitUntil(checkAndFireNotifications());
  }
});

self.addEventListener('message', (event: MessageEvent) => {
  if (event.data?.type === 'CHECK_NOTIFICATIONS') checkAndFireNotifications();
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return (client as WindowClient).focus();
      }
      return self.clients.openWindow('/');
    })
  );
});
