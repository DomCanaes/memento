import type { MonkModeState } from '../../types';
import { daysBetween, todayStr } from '../../lib/time';

interface Props {
  state: MonkModeState;
}

export function MonkModeCounter({ state }: Props) {
  if (!state.isActive || !state.startDate) return null;

  const dayNumber = daysBetween(state.startDate, todayStr()) + 1;
  const daysRemaining = Math.max(0, state.targetDays - dayNumber + 1);
  const pct = Math.min(100, (dayNumber / state.targetDays) * 100);

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-xs text-text-muted uppercase tracking-widest mb-3">Progress</p>

      <div className="text-center mb-4">
        <span className="text-6xl font-black text-white">{dayNumber}</span>
        <span className="text-text-muted text-lg ml-2">/ {state.targetDays}</span>
        <p className="text-text-secondary text-sm mt-1">{daysRemaining} days of focused building remain.</p>
      </div>

      <div className="h-2 bg-elevated rounded-full overflow-hidden">
        <div className="h-full bg-red-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-text-muted">Start</span>
        <span className="text-xs text-red-accent font-mono">{pct.toFixed(1)}%</span>
        <span className="text-xs text-text-muted">{state.targetDays} days</span>
      </div>
    </div>
  );
}
