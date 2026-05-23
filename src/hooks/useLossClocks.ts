import { useState, useCallback } from 'react';
import { getLossClocks, setLossClocks } from '../lib/storage';
import type { LossClock } from '../types';

function makeId() {
  return `lc_${Date.now()}`;
}

export function useLossClocks() {
  const [clocks, setClocks] = useState<LossClock[]>(() => getLossClocks());

  function save(updated: LossClock[]) {
    setClocks(updated);
    setLossClocks(updated);
  }

  const addClock = useCallback((label: string, targetDate: string) => {
    const clock: LossClock = { id: makeId(), label, targetDate, createdAt: new Date().toISOString() };
    save([...clocks, clock]);
  }, [clocks]);

  const updateClock = useCallback((id: string, label: string, targetDate: string) => {
    save(clocks.map(c => c.id === id ? { ...c, label, targetDate } : c));
  }, [clocks]);

  const removeClock = useCallback((id: string) => {
    save(clocks.filter(c => c.id !== id));
  }, [clocks]);

  return { clocks, addClock, updateClock, removeClock };
}
