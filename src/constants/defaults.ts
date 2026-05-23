import type { FranklAnchor, NotificationSchedule } from '../types';

export const DEFAULT_NOTIFICATION_SCHEDULE: NotificationSchedule = {
  morningSignalsTime: '06:30',
  eveningReflectionTime: '21:30',
  monkModeDailyTime: '07:00',
};

export const DEFAULT_FRANKL_ANCHORS: FranklAnchor[] = [
  { id: 'f1', name: 'Rachel', description: 'She believes in what you\'re building.' },
  { id: 'f2', name: 'Mum', description: 'Everything she sacrificed so you could be here.' },
  { id: 'f3', name: 'Dad', description: 'He\'s watching. Make him proud.' },
  { id: 'f4', name: 'Future me at 30', description: 'Will he look back at this moment with respect or regret?' },
];

export const DEFAULT_LOSS_CLOCKS = [
  { label: 'Parents leave the UK', targetDate: '' },
  { label: 'Agency income needed', targetDate: '' },
];

export const MONK_MODE_DEFAULT_DAYS = 90;
