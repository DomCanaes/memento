import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { useVerdict } from '../hooks/useVerdict';
import type { VerdictEntry } from '../types';

const VIRTUES = [
  {
    key: 'sacrifice' as const,
    noteKey: 'sacrificeNote' as const,
    label: 'SACRIFICE',
    prompt: 'I said no to something I wanted to say yes to.',
    notePlaceholder: 'What did you sacrifice?',
    definition:
      'Saying no to something every single part of you wanted to say yes to. Comfort, lust, distraction — you chose the mission over the moment. That feeling of wanting to say yes and saying no anyway? That is the work. That is where discipline is built.',
  },
  {
    key: 'experiment' as const,
    noteKey: 'experimentNote' as const,
    label: 'EXPERIMENT',
    prompt: 'I went out there and tried something.',
    notePlaceholder: 'What did you attempt?',
    definition:
      "Go out and make a fool of yourself. Everything you want is on the other side of that embarrassment. You don't experiment because you're scared of what people think — but the faster you experiment, the closer you get to everything you want. Get comfortable with looking stupid. Live it. Enjoy it. Everyone who won't will be stuck exactly where they are.",
  },
  {
    key: 'speed' as const,
    noteKey: 'speedNote' as const,
    label: 'SPEED',
    prompt: 'I moved fast today.',
    notePlaceholder: 'How did you move fast?',
    definition:
      'Speed is the cure for everything. Every second you do not move fast, you are dissatisfying God, yourself, and everyone you care about. Momentum compounds. Hesitation does not. Move before you are ready. The longer you wait, the more you pay.',
  },
] as const;

function isGreenDay(e: VerdictEntry): boolean {
  return e.sacrifice && e.experiment && e.speed;
}

export function VerdictScreen() {
  const { todayEntry, last30, submit, currentStreak, highestStreak } = useVerdict();

  const [sacrifice, setSacrifice] = useState(false);
  const [experiment, setExperiment] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [sacrificeNote, setSacrificeNote] = useState('');
  const [experimentNote, setExperimentNote] = useState('');
  const [speedNote, setSpeedNote] = useState('');
  const [expandedDef, setExpandedDef] = useState<string | null>(null);

  const stateMap = {
    sacrifice: { checked: sacrifice, setChecked: setSacrifice, note: sacrificeNote, setNote: setSacrificeNote },
    experiment: { checked: experiment, setChecked: setExperiment, note: experimentNote, setNote: setExperimentNote },
    speed: { checked: speed, setChecked: setSpeed, note: speedNote, setNote: setSpeedNote },
  };

  function handleSubmit() {
    submit(sacrifice, experiment, speed, {
      sacrificeNote: sacrificeNote.trim() || undefined,
      experimentNote: experimentNote.trim() || undefined,
      speedNote: speedNote.trim() || undefined,
    });
  }

  function toggleDef(key: string) {
    setExpandedDef(prev => (prev === key ? null : key));
  }

  const greenCount = last30.filter(d => d.entry && isGreenDay(d.entry)).length;
  const allThree = sacrifice && experiment && speed;

  return (
    <Screen>
      <Header title="VERDICT" />

      <div className="px-4 space-y-6 mt-2">

        {/* Streak */}
        <div className="flex gap-3">
          <div className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-center">
            <p className="text-text-muted text-[10px] uppercase tracking-widest">Streak</p>
            <p className="text-white font-black text-3xl leading-none mt-1">{currentStreak}</p>
            <p className="text-text-muted text-[10px] mt-1">days</p>
          </div>
          <div className="flex-1 bg-surface border border-red-dim rounded-xl px-4 py-3 text-center">
            <p className="text-text-muted text-[10px] uppercase tracking-widest">Best ever</p>
            <p className="text-red-light font-black text-3xl leading-none mt-1">{highestStreak}</p>
            <p className="text-text-muted text-[10px] mt-1">to beat</p>
          </div>
        </div>

        {/* Fear reminder */}
        <div className="border-l-2 border-red-accent pl-4 space-y-1">
          <p className="text-red-light text-xs font-black uppercase tracking-widest">Normal is the fear.</p>
          <p className="text-text-secondary text-xs leading-relaxed">
            One life. Either you do the work now, or you work a 9-5 until you're too old to care.
            Both are hard. You already chose yours.
          </p>
        </div>

        {/* Today */}
        {todayEntry ? (
          <div className={`rounded-xl border p-4 space-y-3 ${
            isGreenDay(todayEntry) ? 'bg-red-ghost border-red-dim' : 'bg-surface border-border'
          }`}>
            <p className="text-xs text-text-muted uppercase tracking-widest">Today — locked</p>
            <div className="space-y-2">
              {VIRTUES.map(v => {
                const hit = todayEntry[v.key];
                const note = todayEntry[v.noteKey];
                return (
                  <div key={v.key} className="flex items-start gap-3">
                    <span className={`text-sm mt-0.5 font-bold ${hit ? 'text-red-light' : 'text-text-muted'}`}>
                      {hit ? '✓' : '✗'}
                    </span>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-widest ${hit ? 'text-white' : 'text-text-muted'}`}>
                        {v.label}
                      </p>
                      {note && <p className="text-text-secondary text-xs mt-0.5">"{note}"</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {VIRTUES.map(v => {
              const { checked, setChecked, note, setNote } = stateMap[v.key];
              const isExpanded = expandedDef === v.key;
              return (
                <div key={v.key} className="bg-surface border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChecked(!checked)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        checked ? 'bg-red-accent border-red-accent' : 'border-border'
                      }`}>
                        {checked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-black uppercase tracking-widest">{v.label}</p>
                        <p className="text-text-muted text-xs">{v.prompt}</p>
                      </div>
                    </button>
                    <button
                      onClick={() => toggleDef(v.key)}
                      className={`text-xs border rounded px-2 py-1 transition-colors flex-shrink-0 ${
                        isExpanded
                          ? 'border-red-dim text-red-light'
                          : 'border-border text-text-muted hover:text-white'
                      }`}
                    >
                      ?
                    </button>
                  </div>

                  {isExpanded && (
                    <p className="text-text-secondary text-xs leading-relaxed border-t border-border pt-3">
                      {v.definition}
                    </p>
                  )}

                  {checked && (
                    <input
                      type="text"
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      placeholder={v.notePlaceholder}
                      className="w-full rounded-lg px-3 py-2 text-sm bg-elevated border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-red-dim"
                    />
                  )}
                </div>
              );
            })}

            <Button fullWidth onClick={handleSubmit}>
              {allThree ? 'Lock it in — all three' : 'Lock it in'}
            </Button>
          </div>
        )}

        {/* 30-day grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted uppercase tracking-widest">Last 30 days</p>
            <p className="text-xs text-text-muted">
              <span className="text-red-light font-bold">{greenCount}</span>
              {' / 30'}
            </p>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {last30.map(({ date, entry }) => {
              const green = entry && isGreenDay(entry);
              return (
                <div
                  key={date}
                  className={`rounded-sm aspect-square ${
                    !entry
                      ? 'bg-elevated'
                      : green
                      ? 'bg-red-accent'
                      : 'bg-surface border border-border'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Past entries */}
        {last30.some(d => d.entry) && (
          <div className="space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-widest">The record</p>
            {[...last30].reverse().filter(d => d.entry).map(({ date, entry }) => {
              const green = isGreenDay(entry!);
              return (
                <div key={date} className="bg-surface border border-border rounded-lg px-3 py-2.5 flex gap-3 items-start">
                  <span className={`text-xs font-black uppercase mt-0.5 shrink-0 ${green ? 'text-red-light' : 'text-text-muted'}`}>
                    {green ? 'WIN' : 'NO'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-text-muted text-[10px] uppercase tracking-widest">{date}</p>
                    <div className="flex gap-2 mt-1">
                      {VIRTUES.map(v => (
                        <span
                          key={v.key}
                          className={`text-[10px] uppercase tracking-widest font-bold ${
                            entry![v.key] ? 'text-white' : 'text-text-muted line-through'
                          }`}
                        >
                          {v.label.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                    {(entry!.sacrificeNote || entry!.experimentNote || entry!.speedNote) && (
                      <div className="mt-1.5 space-y-0.5">
                        {entry!.sacrificeNote && <p className="text-text-secondary text-xs">"{entry!.sacrificeNote}"</p>}
                        {entry!.experimentNote && <p className="text-text-secondary text-xs">"{entry!.experimentNote}"</p>}
                        {entry!.speedNote && <p className="text-text-secondary text-xs">"{entry!.speedNote}"</p>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pb-4" />
      </div>
    </Screen>
  );
}
