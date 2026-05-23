import { useState, useCallback } from 'react';
import { getDailySignals, setDailySignals } from '../lib/storage';
import { todayStr, compressDeadline } from '../lib/time';
import type { Signal, SignalStatus, DailySignalLog } from '../types';

function makeId() {
  return `sig_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function useSignals(onTwoSkipped?: () => void) {
  const today = todayStr();
  const [log, setLog] = useState<DailySignalLog>(() => getDailySignals(today));

  function save(updated: DailySignalLog) {
    setLog(updated);
    setDailySignals(updated);
  }

  const addSignal = useCallback((label: string, deadlineMinutes: number, isFiveMin: boolean) => {
    if (log.signals.length >= 3) return;
    const signal: Signal = {
      id: makeId(),
      label,
      deadlineMinutes,
      compressedMinutes: compressDeadline(deadlineMinutes),
      isFiveMin,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    save({ ...log, signals: [...log.signals, signal] });
  }, [log]);

  const updateStatus = useCallback((id: string, status: SignalStatus) => {
    const signals = log.signals.map(s => s.id === id ? { ...s, status } : s);
    const skippedCount = signals.filter(s => s.status === 'skipped').length;
    const updated = { ...log, signals, skippedCount };
    save(updated);
    if (skippedCount >= 2 && onTwoSkipped) {
      onTwoSkipped();
    }
  }, [log, onTwoSkipped]);

  const removeSignal = useCallback((id: string) => {
    const signals = log.signals.filter(s => s.id !== id);
    save({ ...log, signals, skippedCount: signals.filter(s => s.status === 'skipped').length });
  }, [log]);

  const resetToday = useCallback(() => {
    save({ date: today, signals: [], skippedCount: 0 });
  }, [today]);

  return { signals: log.signals, skippedCount: log.skippedCount, addSignal, updateStatus, removeSignal, resetToday };
}
