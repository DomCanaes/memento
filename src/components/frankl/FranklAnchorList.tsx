import { useState } from 'react';
import { Button } from '../ui/Button';
import type { FranklAnchor } from '../../types';

interface Props {
  anchors: FranklAnchor[];
  onSave: (anchors: FranklAnchor[]) => void;
}

export function FranklAnchorList({ anchors, onSave }: Props) {
  const [editing, setEditing] = useState<FranklAnchor[]>(anchors);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  function addAnchor() {
    if (!newName.trim()) return;
    const updated = [...editing, { id: `fa_${Date.now()}`, name: newName.trim(), description: newDesc.trim() || undefined }];
    setEditing(updated);
    onSave(updated);
    setNewName('');
    setNewDesc('');
  }

  function removeAnchor(id: string) {
    const updated = editing.filter(a => a.id !== id);
    setEditing(updated);
    onSave(updated);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {editing.map(anchor => (
          <div key={anchor.id} className="bg-surface border border-border rounded-xl p-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{anchor.name}</p>
              {anchor.description && <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{anchor.description}</p>}
            </div>
            <button onClick={() => removeAnchor(anchor.id)} className="text-text-muted hover:text-red-light text-xs flex-shrink-0 px-1">✕</button>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
        <p className="text-xs text-text-muted uppercase tracking-widest">Add anchor</p>
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Name"
          className="w-full rounded-lg px-3 py-2 text-sm"
          maxLength={40}
        />
        <input
          type="text"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
          placeholder="Why they matter (optional)"
          className="w-full rounded-lg px-3 py-2 text-sm"
          maxLength={100}
        />
        <Button fullWidth onClick={addAnchor} disabled={!newName.trim()}>Add</Button>
      </div>
    </div>
  );
}
