import type { ReflectionEntry } from '../../types';

interface Props {
  entries: ReflectionEntry[];
}

export function ReflectionHistory({ entries }: Props) {
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted uppercase tracking-widest px-1">Past reflections</p>
      {sorted.map(entry => {
        const completed = [entry.signal1Completed, entry.signal2Completed, entry.signal3Completed].filter(Boolean).length;
        return (
          <div key={entry.id} className="bg-surface border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-text-muted font-mono">{entry.date}</span>
              <span className="text-xs text-text-secondary">{completed}/3 signals</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-text-muted">Productive:</span>
              <span className="text-xs text-white font-mono">{entry.productiveHours}h</span>
              <div className="flex-1 h-1 bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-red-accent rounded-full" style={{ width: `${(entry.productiveHours / 16) * 100}%` }} />
              </div>
            </div>
            {entry.gratitude && (
              <p className="text-text-muted text-xs leading-relaxed italic">"{entry.gratitude}"</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
