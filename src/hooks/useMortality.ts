import { useMemo } from 'react';
import {
  getMonthsLived,
  getAgeInYears,
  getPerceivedPercent,
  getRemainingMonths,
  getRemainingLifeHours,
} from '../lib/mortality';

export function useMortality() {
  return useMemo(() => ({
    monthsLived: getMonthsLived(),
    ageInYears: getAgeInYears(),
    perceivedPercent: getPerceivedPercent(),
    remainingMonths: getRemainingMonths(),
    remainingLifeHours: getRemainingLifeHours(),
  }), []);
}
