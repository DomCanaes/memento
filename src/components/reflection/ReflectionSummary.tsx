import type { ReflectionEntry } from '../../types';

interface Props {
  entry: ReflectionEntry;
  remainingLifeHours: number;
}

export function ReflectionSummary({ entry, remainingLifeHours }: Props) {
  const wasted = 16 - entry.productiveHours;
  const wastedLabel = wasted <= 0 ? 'none wasted' : `${wasted}h burned on noise`;
  const remainingFmt = remainingLifeHours.toLocaleString();

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Loss framing */}
      <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
        <p className="text-red-light text-sm leading-relaxed">
          You burned <span className="font-bold text-white">{wastedLabel}</span> today.
          {wasted > 0 && (
            <> That's {wasted} hours of your remaining{' '}
              <span className="font-mono font-bold text-white">{remainingFmt}</span> you don't get back.
            </>
          )}
        </p>
      </div>

      {/* Gratitude — immediate counterweight */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <p className="text-xs text-warm uppercase tracking-widest mb-2">But today you had this</p>
        <p className="text-white text-sm leading-relaxed">{entry.gratitude}</p>
      </div>

      {/* Signal summary */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <p className="text-xs text-text-muted uppercase tracking-widest mb-3">Signals</p>
        {[entry.signal1Completed, entry.signal2Completed, entry.signal3Completed].map((done, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${done ? 'bg-red-accent' : 'bg-elevated border border-border'}`}>
              {done ? '✓' : ''}
            </div>
            <span className={`text-sm ${done ? 'text-text-secondary' : 'text-text-muted'}`}>
              Signal {i + 1} — {done ? 'completed' : 'not completed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
