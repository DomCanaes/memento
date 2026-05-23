interface Props {
  streak: number;
  brokeDates: string[];
}

export function MonkModeStreak({ streak, brokeDates }: Props) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Current streak</p>
          <p className="text-white font-black text-3xl">{streak} <span className="text-text-muted text-base font-medium">days</span></p>
        </div>
        {brokeDates.length > 0 && (
          <div className="text-right">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Breaks</p>
            <p className="text-red-dim font-bold text-xl">{brokeDates.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}
