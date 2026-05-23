import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { SignalCard } from '../components/signals/SignalCard';
import { SignalInput } from '../components/signals/SignalInput';
import { useSignals } from '../hooks/useSignals';

interface Props {
  onTwoSkipped: () => void;
}

export function SignalsScreen({ onTwoSkipped }: Props) {
  const { signals, addSignal, updateStatus } = useSignals(onTwoSkipped);

  const pending = signals.filter(s => s.status === 'pending').length;
  const subtitle = signals.length === 0
    ? 'What moves the needle today?'
    : `${pending} remaining — everything else is noise`;

  return (
    <Screen>
      <Header title="3 SIGNALS" subtitle={subtitle} />

      <div className="px-4 space-y-4 mt-2">
        {signals.length === 0 && (
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-text-secondary text-sm leading-relaxed">
              80% of your results come from 20% of your actions.
              Name the 3 things that matter most today — and nothing else.
            </p>
            <p className="text-text-muted text-xs mt-2 leading-relaxed">
              New videos, articles, messages not about these 3 things — noise.
              If it's not on this list, it doesn't exist today.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {signals.map((s, i) => (
            <SignalCard
              key={s.id}
              signal={s}
              index={i}
              onDone={() => updateStatus(s.id, 'done')}
              onSkip={() => updateStatus(s.id, 'skipped')}
            />
          ))}
        </div>

        {signals.length < 3 && (
          <SignalInput onAdd={addSignal} signalCount={signals.length} />
        )}

        {signals.length === 3 && signals.every(s => s.status !== 'pending') && (
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-text-secondary text-sm">
              {signals.every(s => s.status === 'done')
                ? "3 for 3. That's how it's done."
                : 'Day done. Reflect on what slipped.'}
            </p>
          </div>
        )}
      </div>

      <div className="pb-4" />
    </Screen>
  );
}
