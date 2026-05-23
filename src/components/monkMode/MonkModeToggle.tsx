import { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { MONK_MODE_DEFAULT_DAYS } from '../../constants/defaults';

interface Props {
  isActive: boolean;
  onActivate: (days: number) => void;
  onDeactivate: () => void;
}

export function MonkModeToggle({ isActive, onActivate, onDeactivate }: Props) {
  const [showActivate, setShowActivate] = useState(false);
  const [showBreak, setShowBreak] = useState(false);
  const [days, setDays] = useState(MONK_MODE_DEFAULT_DAYS);

  if (isActive) {
    return (
      <>
        <button
          onClick={() => setShowBreak(true)}
          className="w-full py-3 rounded-xl border border-red-dim text-red-dim text-sm font-medium hover:bg-red-ghost transition-colors"
        >
          End monk mode
        </button>

        <Modal open={showBreak} onClose={() => setShowBreak(false)} title="BREAK MONK MODE?">
          <div className="space-y-4">
            <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
              <p className="text-red-light font-bold mb-1">You broke it.</p>
              <p className="text-text-secondary text-sm leading-relaxed">
                The clock resets. Start again or quit — there's no middle ground.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" fullWidth onClick={() => setShowBreak(false)}>Keep going</Button>
              <Button variant="danger" fullWidth onClick={() => { onDeactivate(); setShowBreak(false); }}>
                End it
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button fullWidth onClick={() => setShowActivate(true)}>
        Activate monk mode
      </Button>

      <Modal open={showActivate} onClose={() => setShowActivate(false)} title="ENTER MONK MODE">
        <div className="space-y-4">
          <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
            <p className="text-text-secondary text-sm leading-relaxed">
              A season of no. No scrolling, no new content, no distractions. Build.
            </p>
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-widest block mb-2">
              Duration: <span className="text-white font-mono">{days} days</span>
            </label>
            <input
              type="range"
              min="30"
              max="365"
              step="5"
              value={days}
              onChange={e => setDays(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>30d</span><span>90d</span><span>180d</span><span>365d</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="ghost" fullWidth onClick={() => setShowActivate(false)}>Cancel</Button>
            <Button fullWidth onClick={() => { onActivate(days); setShowActivate(false); }}>
              Begin — {days} days
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
