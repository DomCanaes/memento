interface Props {
  ageInYears: number;
  perceivedPercent: number;
}

export function PerceivedProgressBar({ ageInYears, perceivedPercent }: Props) {
  const pct = Math.min(100, Math.max(0, perceivedPercent));
  const yearsLived = Math.round(ageInYears);
  const yearsRemaining = 79 - yearsLived;

  return (
    <div className="px-4">
      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-xs text-text-muted uppercase tracking-widest">Your life already feels half over.</span>
          <span className="text-xs text-red-light font-mono font-bold">{pct.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-elevated rounded-full overflow-hidden">
          <div className="h-full bg-red-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-text-muted text-xs mt-1.5 leading-snug">
          Time accelerates. The next {yearsRemaining} years will feel shorter than the last {yearsLived}.
        </p>
      </div>
    </div>
  );
}
