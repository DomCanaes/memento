import { useState, useCallback } from 'react';
import { getVerdicts, setVerdicts } from '../lib/storage';
import { todayStr } from '../lib/time';
import type { VerdictEntry, VerdictOutcome } from '../types';

export function useVerdict() {
  const [entries, setEntries] = useState<VerdictEntry[]>(() => getVerdicts());

  const today = todayStr();
  const todayEntry = entries.find(e => e.date === today) ?? null;

  const submit = useCallback((outcome: VerdictOutcome, proof: string) => {
    const entry: VerdictEntry = {
      id: `${Date.now()}`,
      date: today,
      outcome,
      proof: proof.trim(),
      submittedAt: new Date().toISOString(),
    };
    const updated = [...entries.filter(e => e.date !== today), entry];
    setEntries(updated);
    setVerdicts(updated);
  }, [entries, today]);

  const last30 = (() => {
    const days: { date: string; entry: VerdictEntry | null }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      days.push({ date: dateStr, entry: entries.find(e => e.date === dateStr) ?? null });
    }
    return days;
  })();

  return { todayEntry, last30, submit };
}
