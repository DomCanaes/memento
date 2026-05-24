import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { useVerdict } from '../hooks/useVerdict';
import type { VerdictOutcome } from '../types';

export function VerdictScreen() {
  const { todayEntry, last30, submit } = useVerdict();
  const [selected, setSelected] = useState<VerdictOutcome | null>(null);
  const [proof, setProof] = useState('');

  function handleSubmit() {
    if (!selected || !proof.trim()) return;
    submit(selected, proof);
    setSelected(null);
    setProof('');
  }

  const wonCount = last30.filter(d => d.entry?.outcome === 'won').length;
  const medCount = last30.filter(d => d.entry?.outcome === 'mediocrity').length;

  return (
    <Screen>
      <Header title="VERDICT" />

      <div className="px-4 space-y-6 mt-2">

        {/* Today */}
        {todayEntry ? (
          <div className={`rounded-xl border p-4 space-y-2 ${
            todayEntry.outcome === 'won'
              ? 'bg-red-ghost border-red-dim'
              : 'bg-surface border-border'
          }`}>
            <p className="text-xs text-text-muted uppercase tracking-widest">Today's verdict</p>
            <p className={`text-lg font-black uppercase tracking-widest ${
              todayEntry.outcome === 'won' ? 'text-red-light' : 'text-text-muted'
            }`}>
              {todayEntry.outcome === 'won' ? 'You won.' : 'Mediocrity won.'}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">"{todayEntry.proof}"</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Today</p>
              <p className="text-white font-bold text-base">Did you win today or did mediocrity win?</p>
              <p className="text-text-muted text-xs mt-1">You can't skip this. Pick a side and prove it.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelected('won')}
                className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all ${
                  selected === 'won'
                    ? 'bg-red-accent text-white'
                    : 'bg-elevated text-text-muted border border-border'
                }`}
              >
                I won
              </button>
              <button
                onClick={() => setSelected('mediocrity')}
                className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all ${
                  selected === 'mediocrity'
                    ? 'bg-elevated text-white border border-white'
                    : 'bg-elevated text-text-muted border border-border'
                }`}
              >
                Mediocrity won
              </button>
            </div>

            {selected && (
              <div className="space-y-3">
                <textarea
                  value={proof}
                  onChange={e => setProof(e.target.value)}
                  placeholder={
                    selected === 'won'
                      ? 'What did you do that proves it?'
                      : 'What did you let slip? Be honest.'
                  }
                  rows={3}
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-surface border border-border text-white placeholder:text-text-muted resize-none focus:outline-none focus:border-red-dim"
                />
                <Button fullWidth onClick={handleSubmit} disabled={!proof.trim()}>
                  Lock it in
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 30-day record */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted uppercase tracking-widest">Last 30 days</p>
            <p className="text-xs text-text-muted">
              <span className="text-red-light font-bold">{wonCount}W</span>
              {' · '}
              <span className="text-text-secondary">{medCount}L</span>
              {' · '}
              <span>{30 - wonCount - medCount} pending</span>
            </p>
          </div>

          <div className="grid grid-cols-10 gap-1">
            {last30.map(({ date, entry }) => (
              <div
                key={date}
                title={entry ? `${date}: ${entry.outcome === 'won' ? 'Won' : 'Mediocrity'}` : date}
                className={`rounded-sm aspect-square ${
                  !entry
                    ? 'bg-elevated'
                    : entry.outcome === 'won'
                    ? 'bg-red-accent'
                    : 'bg-surface border border-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Past entries */}
        {last30.filter(d => d.entry).length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-widest">The record</p>
            {[...last30].reverse().filter(d => d.entry).map(({ date, entry }) => (
              <div key={date} className="bg-surface border border-border rounded-lg px-3 py-2.5 flex gap-3 items-start">
                <span className={`text-xs font-black uppercase mt-0.5 shrink-0 ${
                  entry!.outcome === 'won' ? 'text-red-light' : 'text-text-muted'
                }`}>
                  {entry!.outcome === 'won' ? 'W' : 'L'}
                </span>
                <div className="min-w-0">
                  <p className="text-text-muted text-[10px] uppercase tracking-widest">{date}</p>
                  <p className="text-text-secondary text-xs leading-relaxed">"{entry!.proof}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pb-4" />
      </div>
    </Screen>
  );
}
