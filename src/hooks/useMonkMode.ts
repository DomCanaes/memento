import { useState, useEffect } from 'react';
import { getMonkMode, setMonkMode } from '../lib/storage';
import { todayStr, daysBetween } from '../lib/time';
import type { MonkModeState } from '../types';
import { MONK_MODE_DEFAULT_DAYS } from '../constants/defaults';

export function useMonkMode() {
  const [state, setState] = useState<MonkModeState>(() => {
    const s = getMonkMode();
    return checkStreak(s);
  });

  // On every mount, verify streak integrity
  useEffect(() => {
    const checked = checkStreak(getMonkMode());
    setState(checked);
    setMonkMode(checked);
  }, []);

  function save(s: MonkModeState) {
    setState(s);
    setMonkMode(s);
  }

  function activate(targetDays = MONK_MODE_DEFAULT_DAYS) {
    const today = todayStr();
    save({
      isActive: true,
      startDate: today,
      targetDays,
      streak: 1,
      lastCheckinDate: today,
      brokeDates: state.brokeDates,
    });
  }

  function deactivate() {
    const today = todayStr();
    save({
      ...state,
      isActive: false,
      streak: 0,
      lastCheckinDate: null,
      brokeDates: [...state.brokeDates, today],
    });
  }

  function getDayNumber(): number {
    if (!state.startDate) return 0;
    return daysBetween(state.startDate, todayStr()) + 1;
  }

  return { state, activate, deactivate, getDayNumber };
}

function checkStreak(s: MonkModeState): MonkModeState {
  if (!s.isActive || !s.lastCheckinDate) return s;
  const today = todayStr();
  if (s.lastCheckinDate === today) return s;

  const gap = daysBetween(s.lastCheckinDate, today);
  if (gap === 1) {
    // Consecutive day — increment streak and update checkin
    return { ...s, streak: s.streak + 1, lastCheckinDate: today };
  } else if (gap > 1) {
    // Gap detected — break streak
    return {
      ...s,
      isActive: false,
      streak: 0,
      lastCheckinDate: null,
      brokeDates: [...s.brokeDates, today],
    };
  }
  return s;
}
