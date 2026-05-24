import { useMemo } from 'react';
import {
  getMonthsLived,
  getAgeInYears,
  getPerceivedPercent,
  getRemainingMonths,
  getRemainingLifeHours,
  getFreeTimeMonthsUsed,
  getFreeTimeMonthsRemaining,
} from '../lib/mortality';

export function useMortality() {
  return useMemo(() => ({
    monthsLived: getMonthsLived(),
    ageInYears: getAgeInYears(),
    perceivedPercent: getPerceivedPercent(),
    remainingMonths: getRemainingMonths(),
    remainingLifeHours: getRemainingLifeHours(),
    freeTimeUsed: getFreeTimeMonthsUsed(),
    freeTimeRemaining: getFreeTimeMonthsRemaining(),
  }), []);
}
