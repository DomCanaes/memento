import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  triggered?: 'manual' | 'skipped';
}

export function RegretFilterModal({ open, onClose, triggered = 'manual' }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="THE REGRET FILTER">
      <div className="space-y-5">
        {triggered === 'skipped' && (
          <div className="bg-red-ghost border border-red-dim rounded-xl p-3 mb-2">
            <p className="text-red-light text-xs font-semibold">You've skipped 2 or more signals today.</p>
          </div>
        )}

        <p className="text-white text-xl font-bold leading-snug">
          You might not make it to 80.
        </p>

        <p className="text-text-secondary text-sm leading-relaxed">
          But future you — even <span className="text-white font-medium">tomorrow's you</span> — is watching this moment. They'll remember this decision. They'll know what you chose when it mattered.
        </p>

        <div className="border-l-2 border-red-accent pl-4 py-1">
          <p className="text-text-secondary text-sm leading-relaxed italic">
            "At 80, looking back, will I regret not having done this?"
          </p>
          <p className="text-text-muted text-xs mt-1">— Jeff Bezos, Regret Minimisation Framework</p>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed">
          Old people stop caring about petty nonsense because they feel the clock. You feel it too, or you wouldn't be here.
        </p>

        <p className="text-white font-semibold text-sm">
          Will they respect this decision?
        </p>

        <div className="flex gap-3">
          <Button variant="ghost" fullWidth onClick={onClose}>
            No. I'm getting back to work.
          </Button>
        </div>
      </div>
    </Modal>
  );
}
