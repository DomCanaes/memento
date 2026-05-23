import { useState } from 'react';
import { Button } from '../ui/Button';
import type { Signal, ReflectionEntry } from '../../types';

interface Props {
  signals: Signal[];
  onSubmit: (data: Omit<ReflectionEntry, 'id' | 'date' | 'submittedAt'>) => void;
}

export function ReflectionForm({ signals, onSubmit }: Props) {
  const [s1, setS1] = useState<boolean | null>(null);
  const [s2, setS2] = useState<boolean | null>(null);
  const [s3, setS3] = useState<boolean | null>(null);
  const [productiveHours, setProductiveHours] = useState(4);
  const [gratitude, setGratitude] = useState('');

  const sig = signals.slice(0, 3);
  const setters = [setS1, setS2, setS3];
  const values = [s1, s2, s3];

  function handleSubmit() {
    onSubmit({
      signal1Completed: s1 ?? false,
      signal2Completed: s2 ?? false,
      signal3Completed: s3 ?? false,
      productiveHours,
      gratitude: gratitude.trim(),
    });
  }

  const canSubmit = gratitude.trim().length > 0;

  return (
    <div className="space-y-6">
      {sig.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-text-muted uppercase tracking-widest">Signals completed?</p>
          {sig.map((s, i) => (
            <div key={s.id} className="bg-surface border border-border rounded-xl p-3 flex items-center justify-between">
              <p className="text-sm text-text-secondary flex-1 mr-3 truncate">{s.label}</p>
              <div className="flex gap-2">
                {[true, false].map(v => (
                  <button
                    key={String(v)}
                    onClick={() => setters[i](v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      values[i] === v
                        ? v ? 'bg-red-accent text-white' : 'bg-elevated text-red-dim border border-red-dim'
                        : 'bg-elevated text-text-muted hover:text-white'
                    }`}
                  >
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <p className="text-xs text-text-muted uppercase tracking-widest">Productive hours today</p>
          <span className="text-white font-mono font-bold">{productiveHours}h</span>
        </div>
        <input
          type="range"
          min={0}
          max={16}
          step={0.5}
          value={productiveHours}
          onChange={e => setProductiveHours(Number(e.target.value))}
        />
        <div className="flex justify-between text-xs text-text-muted">
          <span>0h wasted</span>
          <span>16h locked in</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-text-muted uppercase tracking-widest">One thing you're grateful for today</p>
        <p className="text-xs text-text-muted">Nothing to do with work.</p>
        <textarea
          value={gratitude}
          onChange={e => setGratitude(e.target.value)}
          placeholder="Something real. Not abstract."
          rows={3}
          className="w-full rounded-lg px-3 py-2.5 text-sm resize-none"
          maxLength={300}
        />
      </div>

      <Button fullWidth onClick={handleSubmit} disabled={!canSubmit}>
        Submit reflection
      </Button>
    </div>
  );
}
