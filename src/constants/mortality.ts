export const DOB = '2006-01-09';
export const MAX_AGE = 79;
export const LIFE_MONTHS = MAX_AGE * 12; // 948
export const HOURS_PER_MONTH = 730;

// Perceived life formula: ln(max(age,5)/5) / ln(79/5) * 100
// Gives ~50% at age 20, 100% at 79, 0% at 5
export const PERCEIVED_BASE = 5;
export const PERCEIVED_DENOMINATOR = Math.log(MAX_AGE / PERCEIVED_BASE);

// Free time: months across a full life not consumed by sleep, work, admin, commute, obligations
// Based on Bartlett allocation: 111 months free out of 948 total
export const FREE_TIME_MONTHS = 111;
