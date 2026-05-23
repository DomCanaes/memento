import { useState } from 'react';
import { HormoziCompressionPrompt } from './HormoziCompressionPrompt';
import { Button } from '../ui/Button';
import { HHMMToMinutes, compressDeadline } from '../../lib/time';

interface Props {
  onAdd: (label: string, deadlineMinutes: number, isFiveMin: boolean) => void;
  signalCount: number;
}

export function SignalInput({ onAdd, signalCount }: Props) {
  const [label, setLabel] = useState('');
  const [deadlineHHMM, setDeadlineHHMM] = useState('23:59');
  const [isFiveMin, setIsFiveMin] = useState(false);
  const [showCompression, setShowCompression] = useState(false);
  const [pendingMinutes, setPendingMinutes] = useState(0);

  if (signalCount >= 3) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    const mins = HHMMToMinutes(deadlineHHMM);
    const compressed = compressDeadline(mins);
    if (compressed !== mins && !isFiveMin) {
      setPendingMinutes(mins);
      setShowCompression(true);
    } else {
      commit(mins, isFiveMin);
    }
  }

  function commit(mins: number, fiveMin: boolean) {
    onAdd(label.trim(), mins, fiveMin);
    setLabel('');
    setDeadlineHHMM('23:59');
    setIsFiveMin(false);
    setShowCompression(false);
  }

  const compressed = compressDeadline(HHMMToMinutes(deadlineHHMM));

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-4 space-y-3">
        <p className="text-xs text-text-muted uppercase tracking-widest">Signal {signalCount + 1}</p>

        <input
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="What must get done today?"
          className="w-full bg-elevated rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-text-muted border border-border focus:border-red-accent"
          maxLength={80}
        />

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-text-muted block mb-1">Hard deadline</label>
            <input
              type="time"
              value={deadlineHHMM}
              onChange={e => setDeadlineHHMM(e.target.value)}
              className="w-full bg-elevated rounded-lg px-3 py-2 text-sm text-white border border-border focus:border-red-accent font-mono"
            />
          </div>
          <label className="flex flex-col items-center gap-1 cursor-pointer mt-4">
            <input
              type="checkbox"
              checked={isFiveMin}
              onChange={e => setIsFiveMin(e.target.checked)}
              className="w-4 h-4 accent-red-600"
            />
            <span className="text-[10px] text-text-muted text-center leading-tight">&lt;5 min</span>
          </label>
        </div>

        <Button type="submit" fullWidth disabled={!label.trim()}>
          Add signal {signalCount + 1} of 3
        </Button>
      </form>

      <HormoziCompressionPrompt
        open={showCompression}
        originalMinutes={pendingMinutes}
        compressedMinutes={compressed}
        onAccept={() => commit(compressed, false)}
        onKeep={() => commit(pendingMinutes, false)}
      />
    </>
  );
}
