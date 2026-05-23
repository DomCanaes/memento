import { useState, useCallback } from 'react';
import { getReflections, setReflections } from '../lib/storage';
import { todayStr } from '../lib/time';
import type { ReflectionEntry } from '../types';

function makeId() {
  return `ref_${Date.now()}`;
}

export function useReflection() {
  const [entries, setEntries] = useState<ReflectionEntry[]>(() => getReflections());

  const todayEntry = entries.find(e => e.date === todayStr()) ?? null;

  const addEntry = useCallback((data: Omit<ReflectionEntry, 'id' | 'date' | 'submittedAt'>) => {
    const entry: ReflectionEntry = {
      ...data,
      id: makeId(),
      date: todayStr(),
      submittedAt: new Date().toISOString(),
    };
    const updated = [...entries.filter(e => e.date !== todayStr()), entry];
    setEntries(updated);
    setReflections(updated);
    return entry;
  }, [entries]);

  return { entries, todayEntry, addEntry };
}
