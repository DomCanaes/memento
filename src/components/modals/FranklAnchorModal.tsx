import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { FranklAnchor } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
  anchors: FranklAnchor[];
}

export function FranklAnchorModal({ open, onClose, anchors }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="WHO ARE YOU DOING THIS FOR?">
      <div className="space-y-5">
        <p className="text-text-secondary text-sm leading-relaxed">
          Viktor Frankl observed that the concentration camp survivors weren't the strongest. They were the ones who had a specific reason to keep going.
        </p>

        <div className="space-y-3">
          {anchors.map(anchor => (
            <div key={anchor.id} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white font-bold text-base">{anchor.name}</p>
              {anchor.description && (
                <p className="text-text-secondary text-sm mt-1 leading-relaxed">{anchor.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
          <p className="text-text-secondary text-sm leading-relaxed">
            These people are real. Their belief in you is real. Every hour you waste is an hour you can't give back to them.
          </p>
        </div>

        <Button fullWidth onClick={onClose}>
          Back to work.
        </Button>
      </div>
    </Modal>
  );
}
