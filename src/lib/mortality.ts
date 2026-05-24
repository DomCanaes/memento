import { DOB, LIFE_MONTHS, FREE_TIME_MONTHS, HOURS_PER_MONTH, PERCEIVED_BASE, PERCEIVED_DENOMINATOR } from '../constants/mortality';

export function getMonthsLived(): number {
  const birth = new Date(DOB);
  const now = new Date();
  // Count calendar months from birth month to current month, inclusive
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth()) + 1;
}

export function getAgeInYears(): number {
  const birth = new Date(DOB);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  const dayDiff = now.getDate() - birth.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) return years - 1;
  return years;
}

export function getAgeDecimal(): number {
  const birth = new Date(DOB);
  const now = new Date();
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  return (now.getTime() - birth.getTime()) / msPerYear;
}

export function getPerceivedPercent(): number {
  const age = getAgeDecimal();
  const clamped = Math.max(age, PERCEIVED_BASE);
  return Math.min(100, (Math.log(clamped / PERCEIVED_BASE) / PERCEIVED_DENOMINATOR) * 100);
}

export function getRemainingMonths(): number {
  return Math.max(0, LIFE_MONTHS - getMonthsLived());
}

export function getRemainingLifeHours(): number {
  return getRemainingMonths() * HOURS_PER_MONTH;
}

export function getFreeTimeMonthsUsed(): number {
  const monthsLived = getMonthsLived();
  return Math.min(FREE_TIME_MONTHS, Math.round((monthsLived / LIFE_MONTHS) * FREE_TIME_MONTHS));
}

export function getFreeTimeMonthsRemaining(): number {
  return Math.max(0, FREE_TIME_MONTHS - getFreeTimeMonthsUsed());
}
