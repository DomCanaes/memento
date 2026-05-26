import { useState, useMemo, useCallback } from 'react';
import { getVerdicts, setVerdicts, getHighestStreak, setHighestStreak } from '../lib/storage';
import { todayStr } from '../lib/time';
import type { VerdictEntry } from '../types';

function isGreenDay(e: VerdictEntry): boolean {
  return e.sacrifice && e.experiment && e.speed;
}

function calculateStreak(entries: VerdictEntry[]): number {
  const today = todayStr();
  const todayEntry = entries.find(e => e.date === today);

  const d = new Date();
  let streak = 0;

  if (todayEntry && isGreenDay(todayEntry)) {
    streak = 1;
    d.setDate(d.getDate() - 1);
  } else {
    d.setDate(d.getDate() - 1);
  }

  while (streak < 3650) {
    const dateStr = d.toISOString().slice(0, 10);
    const entry = entries.find(e => e.date === dateStr);
    if (!entry || !isGreenDay(entry)) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }

  return streak;
}

export function useVerdict() {
  const [entries, setEntries] = useState<VerdictEntry[]>(() => getVerdicts());
  const [highestStreak, setHighestStreakLocal] = useState<number>(() => getHighestStreak());

  const today = todayStr();
  const todayEntry = entries.find(e => e.date === today) ?? null;
  const currentStreak = useMemo(() => calculateStreak(entries), [entries]);

  const submit = useCallback((
    sacrifice: boolean,
    experiment: boolean,
    speed: boolean,
    notes: { sacrificeNote?: string; experimentNote?: string; speedNote?: string },
  ) => {
    const entry: VerdictEntry = {
      id: `${Date.now()}`,
      date: today,
      sacrifice,
      experiment,
      speed,
      ...notes,
      submittedAt: new Date().toISOString(),
    };
    const updated = [...entries.filter(e => e.date !== today), entry];
    setEntries(updated);
    setVerdicts(updated);

    const newStreak = calculateStreak(updated);
    if (newStreak > highestStreak) {
      setHighestStreakLocal(newStreak);
      setHighestStreak(newStreak);
    }
  }, [entries, today, highestStreak]);

  const last30 = useMemo(() => {
    const days: { date: string; entry: VerdictEntry | null }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      days.push({ date: dateStr, entry: entries.find(e => e.date === dateStr) ?? null });
    }
    return days;
  }, [entries]);

  return { todayEntry, last30, submit, currentStreak, highestStreak };
}
