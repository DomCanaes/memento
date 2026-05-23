import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface Props {
  open: boolean;
  onDismiss: () => void;
}

export function FirstOpenModal({ open, onDismiss }: Props) {
  return (
    <Modal open={open} closable={false} title="MEMENTO MORI">
      <div className="space-y-5">
        <p className="text-red-light text-2xl font-black leading-tight">
          Remember that you will die.
        </p>

        <p className="text-text-secondary text-sm leading-relaxed">
          Only <span className="text-white font-semibold">3 in 10,000 people</span> reach 100.
          The average UK male lives 79 years — 948 months.
          You've already used some of them.
        </p>

        <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
          <p className="text-text-secondary text-sm leading-relaxed">
            Plan for average. Act like you have less.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mt-2">
            This app exists to make you feel that. Not as a metaphor. As a fact you live with every day.
          </p>
        </div>

        <p className="text-text-muted text-xs leading-relaxed">
          The sand is falling right now. It was falling while you slept, while you scrolled, while you hesitated. It will never stop.
        </p>

        <Button fullWidth onClick={onDismiss}>
          I understand. Show me the clock.
        </Button>
      </div>
    </Modal>
  );
}
