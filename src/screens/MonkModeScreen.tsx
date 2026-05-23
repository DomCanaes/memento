import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { MonkModeCounter } from '../components/monkMode/MonkModeCounter';
import { MonkModeStreak } from '../components/monkMode/MonkModeStreak';
import { MonkModeToggle } from '../components/monkMode/MonkModeToggle';
import { useMonkMode } from '../hooks/useMonkMode';

export function MonkModeScreen() {
  const { state, activate, deactivate } = useMonkMode();

  return (
    <Screen>
      <Header
        title="MONK MODE"
        subtitle={state.isActive ? 'Season of no. Build.' : 'Enter a season of no.'}
      />

      <div className="px-4 space-y-4 mt-2">
        {!state.isActive && (
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-text-secondary text-sm leading-relaxed">
              A defined period of ruthless focus. No new content, no distractions, no noise.
              Just building — every single day, until the clock runs out.
            </p>
            <p className="text-text-muted text-xs mt-2 leading-relaxed">
              If you break it, the counter resets. No negotiation. No partial credit.
            </p>
          </div>
        )}

        {state.isActive && <MonkModeCounter state={state} />}

        <MonkModeStreak streak={state.streak} brokeDates={state.brokeDates} />

        {state.isActive && (
          <div className="bg-red-ghost border border-red-dim rounded-xl p-4">
            <p className="text-red-light text-sm font-semibold mb-1">You're in a season of no.</p>
            <p className="text-text-secondary text-xs leading-relaxed">
              No scrolling. No new content. No distractions. Every day you don't build is a day you're choosing to fall behind.
            </p>
          </div>
        )}

        <MonkModeToggle isActive={state.isActive} onActivate={activate} onDeactivate={deactivate} />

        {state.brokeDates.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Break history</p>
            <div className="space-y-1">
              {state.brokeDates.slice(-5).map((d, i) => (
                <p key={i} className="text-xs text-text-muted font-mono">{d}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pb-4" />
    </Screen>
  );
}
