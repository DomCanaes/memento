import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { minutesToHHMM } from '../../lib/time';

interface Props {
  open: boolean;
  originalMinutes: number;
  compressedMinutes: number;
  onAccept: () => void;
  onKeep: () => void;
}

export function HormoziCompressionPrompt({ open, originalMinutes, compressedMinutes, onAccept, onKeep }: Props) {
  return (
    <Modal open={open} closable={false} title="COMPRESS THE TIMELINE">
      <div className="space-y-5">
        <p className="text-text-secondary text-sm leading-relaxed">
          You said <span className="text-white font-semibold">{minutesToHHMM(originalMinutes)}</span>.
        </p>

        <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
          <p className="text-red-light font-bold text-base mb-1">
            Can you finish by <span className="text-white">{minutesToHHMM(compressedMinutes)}</span>?
          </p>
          <p className="text-text-secondary text-xs leading-relaxed">
            Compressed timelines force you to cut waste, skip perfectionism, and focus on what actually matters.
            Someone operating at this speed will be unrecognisable in a year.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button fullWidth onClick={onAccept}>
            Yes — I'll finish by {minutesToHHMM(compressedMinutes)}
          </Button>
          <Button variant="ghost" fullWidth onClick={onKeep}>
            Keep {minutesToHHMM(originalMinutes)} — I have a reason
          </Button>
        </div>
      </div>
    </Modal>
  );
}
