import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { LossClockCard } from '../components/lossClock/LossClockCard';
import { LossClockEditor } from '../components/lossClock/LossClockEditor';
import { Button } from '../components/ui/Button';
import { useLossClocks } from '../hooks/useLossClocks';
import type { LossClock } from '../types';

interface Props {
  onRegretFilter: () => void;
}

export function LossClockScreen({ onRegretFilter }: Props) {
  const { clocks, addClock, updateClock, removeClock } = useLossClocks();
  const [editing, setEditing] = useState<LossClock | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const hasClocks = clocks.length > 0;

  return (
    <Screen>
      <Header title="LOSS CLOCK" subtitle="Runway remaining" />

      <div className="px-4 space-y-4 mt-2">
        {!hasClocks && (
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-text-secondary text-sm leading-relaxed">
              Frame your deadlines as losses, not goals. Loss framing hits twice as hard.
              "Days of runway remaining" not "days until target."
            </p>
          </div>
        )}

        <div className="space-y-3">
          {clocks.map(clock => (
            <LossClockCard
              key={clock.id}
              clock={clock}
              onEdit={() => setEditing(clock)}
              onDelete={() => removeClock(clock.id)}
            />
          ))}
        </div>

        <Button variant="outline" fullWidth onClick={() => setShowAdd(true)}>
          + Add countdown
        </Button>

        <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
          <p className="text-text-secondary text-sm leading-relaxed mb-3">
            Not sure if this moment deserves your attention?
          </p>
          <button
            onClick={onRegretFilter}
            className="text-red-light text-sm font-semibold underline underline-offset-2 hover:text-white transition-colors"
          >
            Run the regret filter →
          </button>
        </div>
      </div>

      <div className="pb-4" />

      <LossClockEditor
        open={showAdd}
        onSave={(label, date) => { addClock(label, date); setShowAdd(false); }}
        onCancel={() => setShowAdd(false)}
      />
      {editing && (
        <LossClockEditor
          open={!!editing}
          initial={editing}
          onSave={(label, date) => { updateClock(editing.id, label, date); setEditing(null); }}
          onCancel={() => setEditing(null)}
        />
      )}
    </Screen>
  );
}
