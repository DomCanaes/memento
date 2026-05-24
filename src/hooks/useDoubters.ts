import { useState, useCallback } from 'react';
import { getDoubters, setDoubters } from '../lib/storage';
import type { DoubterEntry } from '../types';

export function useDoubters() {
  const [doubters, setLocal] = useState<DoubterEntry[]>(() => getDoubters());

  const add = useCallback((name: string) => {
    const entry: DoubterEntry = {
      id: `${Date.now()}`,
      name: name.trim(),
      addedAt: new Date().toISOString(),
    };
    const updated = [...doubters, entry];
    setLocal(updated);
    setDoubters(updated);
  }, [doubters]);

  const remove = useCallback((id: string) => {
    const updated = doubters.filter(d => d.id !== id);
    setLocal(updated);
    setDoubters(updated);
  }, [doubters]);

  return { doubters, add, remove };
}
