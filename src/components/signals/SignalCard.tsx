import type { Signal } from '../../types';
import { Badge } from '../ui/Badge';
import { minutesToHHMM } from '../../lib/time';

interface Props {
  signal: Signal;
  index: number;
  onDone: () => void;
  onSkip: () => void;
}

export function SignalCard({ signal, index, onDone, onSkip }: Props) {
  const isDone = signal.status === 'done';
  const isSkipped = signal.status === 'skipped';
  const isPending = signal.status === 'pending';

  return (
    <div
      className={`
        rounded-xl border p-4 transition-all
        ${isDone ? 'bg-surface border-border opacity-50' : isSkipped ? 'bg-surface border-red-dim opacity-50' : 'bg-surface border-border'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Index circle */}
        <div className={`
          w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5
          ${isDone ? 'bg-text-muted text-black' : isSkipped ? 'bg-red-ghost border border-red-dim text-red-dim' : 'bg-red-accent text-white'}
        `}>
          {isDone ? '✓' : isSkipped ? '✕' : index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-semibold text-sm ${isDone ? 'line-through text-text-muted' : isSkipped ? 'line-through text-text-muted' : 'text-white'}`}>
              {signal.label}
            </p>
            {signal.isFiveMin && isPending && (
              <Badge variant="now" pulse>DO IT NOW</Badge>
            )}
          </div>

          {isPending && (
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-xs text-text-muted">
                by <span className="text-text-secondary font-mono">{minutesToHHMM(signal.deadlineMinutes)}</span>
              </span>
              {signal.compressedMinutes !== signal.deadlineMinutes && (
                <span className="text-xs text-red-accent font-mono">
                  → compress to {minutesToHHMM(signal.compressedMinutes)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {isPending && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={onDone}
            className="flex-1 py-2 rounded-lg bg-elevated text-white text-xs font-semibold hover:bg-red-accent transition-colors"
          >
            Done
          </button>
          <button
            onClick={onSkip}
            className="flex-1 py-2 rounded-lg bg-elevated text-text-muted text-xs font-medium hover:bg-red-ghost hover:text-red-light transition-colors"
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
}
