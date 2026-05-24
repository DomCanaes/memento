import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { useDoubters } from '../hooks/useDoubters';

export function ListScreen() {
  const { doubters, add, remove } = useDoubters();
  const [name, setName] = useState('');

  function handleAdd() {
    if (!name.trim()) return;
    add(name);
    setName('');
  }

  return (
    <Screen>
      <Header title="THE LIST" />

      <div className="px-4 space-y-6 mt-2">

        {/* Add */}
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Add a name"
            className="flex-1 rounded-lg px-3 py-2.5 text-sm bg-surface border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-red-dim"
          />
          <Button onClick={handleAdd} disabled={!name.trim()}>Add</Button>
        </div>

        {/* List */}
        {doubters.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-8">No one on the list yet.</p>
        ) : (
          <div className="space-y-2">
            {doubters.map((d, i) => (
              <div key={d.id} className="bg-surface border border-border rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-xs font-mono w-4">{i + 1}</span>
                  <span className="text-white font-medium">{d.name}</span>
                </div>
                <button
                  onClick={() => remove(d.id)}
                  className="text-text-muted text-xs hover:text-red-light transition-colors"
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Brutal footer */}
        {doubters.length > 0 && (
          <div className="border-t border-border pt-6 pb-4 space-y-1 text-center">
            <p className="text-red-light font-black text-base uppercase tracking-widest">
              They're all laughing at you.
            </p>
            <p className="text-text-muted text-sm">
              Every single one of them thinks they're better than you.
            </p>
            <p className="text-text-muted text-sm">
              Prove them wrong. That's the only response that matters.
            </p>
          </div>
        )}

        <div className="pb-4" />
      </div>
    </Screen>
  );
}
