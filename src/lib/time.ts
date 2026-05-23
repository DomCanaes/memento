export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

export function minutesToHHMM(minutes: number): string {
  const clamped = Math.max(0, Math.min(1439, minutes));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function HHMMToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export function compressDeadline(deadlineMinutes: number): number {
  return Math.max(0, deadlineMinutes - 240); // 4 hours earlier, clamped to midnight
}

export function nextOccurrenceMs(hhmm: string): number {
  const now = new Date();
  const [h, m] = hhmm.split(':').map(Number);
  const candidate = new Date(now);
  candidate.setHours(h ?? 0, m ?? 0, 0, 0);
  if (candidate.getTime() <= now.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate.getTime();
}

export function formatCountdown(targetDate: string): string {
  const days = daysBetween(todayStr(), targetDate);
  if (days < 0) return 'Deadline passed';
  if (days === 0) return 'Today';
  if (days === 1) return '1 day';
  return `${days} days`;
}

export function hoursUntilEndOfDay(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  return Math.max(0, Math.round((midnight.getTime() - now.getTime()) / 3600000));
}
