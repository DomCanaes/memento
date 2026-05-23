import type { LossClock } from '../../types';
import { formatCountdown, daysBetween, todayStr } from '../../lib/time';

interface Props {
  clock: LossClock;
  onEdit: () => void;
  onDelete: () => void;
}

export function LossClockCard({ clock, onEdit, onDelete }: Props) {
  const days = clock.targetDate ? daysBetween(todayStr(), clock.targetDate) : null;
  const isUrgent = days !== null && days <= 30;
  const isPast = days !== null && days < 0;

  return (
    <div className={`rounded-xl border p-4 ${isUrgent && !isPast ? 'border-red-dim bg-red-ghost' : 'border-border bg-surface'}`}>
      <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Runway remaining</p>
      <p className="text-white font-semibold text-base leading-snug">{clock.label}</p>

      {clock.targetDate ? (
        <p className={`text-2xl font-black mt-2 font-mono ${isUrgent && !isPast ? 'text-red-light' : isPast ? 'text-text-muted' : 'text-white'}`}>
          {isPast ? 'EXPIRED' : formatCountdown(clock.targetDate)}
        </p>
      ) : (
        <p className="text-text-muted text-sm mt-2 italic">No date set</p>
      )}

      <div className="flex gap-2 mt-3">
        <button onClick={onEdit} className="text-xs text-text-muted hover:text-white transition-colors px-2 py-1 rounded hover:bg-elevated">Edit</button>
        <button onClick={onDelete} className="text-xs text-red-dim hover:text-red-light transition-colors px-2 py-1 rounded hover:bg-red-ghost">Remove</button>
      </div>
    </div>
  );
}
