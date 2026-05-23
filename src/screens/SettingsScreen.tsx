import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { FranklAnchorList } from '../components/frankl/FranklAnchorList';
import { useFranklAnchors } from '../hooks/useFranklAnchors';
import { getSettings, setSettings } from '../lib/storage';
import type { NotificationSchedule } from '../types';

export function SettingsScreen() {
  const { anchors, save: saveAnchors } = useFranklAnchors();
  const [schedule, setSchedule] = useState<NotificationSchedule>(() => getSettings().notificationSchedule);
  const [permission, setPermission] = useState<NotificationPermission>(() =>
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [saved, setSaved] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  async function requestPermission() {
    if (!('Notification' in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  }

  function saveSchedule() {
    const s = getSettings();
    setSettings({ ...s, notificationSchedule: schedule });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function timeField(label: string, key: keyof NotificationSchedule) {
    return (
      <div>
        <label className="text-xs text-text-muted uppercase tracking-widest block mb-1.5">{label}</label>
        <input
          type="time"
          value={schedule[key]}
          onChange={e => setSchedule(prev => ({ ...prev, [key]: e.target.value }))}
          className="w-full rounded-lg px-3 py-2.5 text-sm font-mono"
        />
      </div>
    );
  }

  return (
    <Screen>
      <Header title="SETTINGS" />

      <div className="px-4 space-y-6 mt-2">
        {/* Notifications */}
        <div className="space-y-4">
          <p className="text-xs text-text-muted uppercase tracking-widest">Notifications</p>

          {permission !== 'granted' ? (
            <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
              <p className="text-text-secondary text-sm">
                Enable notifications to receive morning kickstarts, midday checks, and evening reflections.
              </p>
              {isIOS && !isStandalone && (
                <p className="text-warm text-xs leading-relaxed">
                  iOS: Tap <strong>Share → Add to Home Screen</strong> first, then enable notifications.
                </p>
              )}
              <Button fullWidth onClick={requestPermission} disabled={permission === 'denied'}>
                {permission === 'denied' ? 'Notifications blocked — enable in settings' : 'Enable notifications'}
              </Button>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-accent" />
                <span className="text-xs text-text-secondary">Notifications enabled</span>
              </div>
              {timeField('Morning kickstart', 'morningSignalsTime')}
              {timeField('Evening reflection', 'eveningReflectionTime')}
              {timeField('Monk mode daily (when active)', 'monkModeDailyTime')}
              <Button fullWidth onClick={saveSchedule}>
                {saved ? 'Saved ✓' : 'Save notification times'}
              </Button>
            </div>
          )}
        </div>

        {/* Frankl Anchors */}
        <div className="space-y-3">
          <p className="text-xs text-text-muted uppercase tracking-widest">Who you're doing this for</p>
          <FranklAnchorList anchors={anchors} onSave={saveAnchors} />
        </div>

        {/* Danger zone */}
        <div className="space-y-3">
          <p className="text-xs text-text-muted uppercase tracking-widest">Reset</p>
          <Button
            variant="danger"
            fullWidth
            onClick={() => {
              if (window.confirm('Reset all app data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Reset all data
          </Button>
        </div>

        <div className="pb-4" />
      </div>
    </Screen>
  );
}
