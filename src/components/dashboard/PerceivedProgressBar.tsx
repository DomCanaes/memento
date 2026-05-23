interface Props {
  ageInYears: number;
  perceivedPercent: number;
}

export function PerceivedProgressBar({ ageInYears, perceivedPercent }: Props) {
  const pct = Math.min(100, Math.max(0, perceivedPercent));
  const chronoPct = (ageInYears / 79) * 100;

  return (
    <div className="px-4 space-y-3">
      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-xs text-text-muted uppercase tracking-widest">Chronological</span>
          <span className="text-xs text-text-secondary font-mono">Age {ageInYears} — {chronoPct.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
          <div className="h-full bg-text-muted rounded-full" style={{ width: `${chronoPct}%` }} />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-xs text-text-muted uppercase tracking-widest">Perceived life</span>
          <span className="text-xs text-red-light font-mono font-bold">{pct.toFixed(1)}% elapsed</span>
        </div>
        <div className="h-2 bg-elevated rounded-full overflow-hidden">
          <div className="h-full bg-red-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-text-muted text-xs mt-1.5 leading-snug">
          Each year ahead will feel shorter than any year behind you.
        </p>
      </div>
    </div>
  );
}
