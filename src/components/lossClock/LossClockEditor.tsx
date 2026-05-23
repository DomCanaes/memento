import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { LossClock } from '../../types';

interface Props {
  open: boolean;
  initial?: LossClock;
  onSave: (label: string, targetDate: string) => void;
  onCancel: () => void;
}

export function LossClockEditor({ open, initial, onSave, onCancel }: Props) {
  const [label, setLabel] = useState(initial?.label ?? '');
  const [targetDate, setTargetDate] = useState(initial?.targetDate ?? '');

  function handleSave() {
    if (!label.trim()) return;
    onSave(label.trim(), targetDate);
    setLabel('');
    setTargetDate('');
  }

  return (
    <Modal open={open} onClose={onCancel} title={initial ? 'EDIT COUNTDOWN' : 'ADD COUNTDOWN'}>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-text-muted uppercase tracking-widest block mb-1.5">What's the deadline?</label>
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="e.g. Parents leave the UK"
            className="w-full rounded-lg px-3 py-2.5 text-sm"
            maxLength={60}
          />
        </div>

        <div>
          <label className="text-xs text-text-muted uppercase tracking-widest block mb-1.5">Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm font-mono"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="ghost" fullWidth onClick={onCancel}>Cancel</Button>
          <Button fullWidth onClick={handleSave} disabled={!label.trim()}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}
