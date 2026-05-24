interface Props {
  totalMonths: number;
  monthsLived: number;
}

export function MonthGrid({ totalMonths, monthsLived }: Props) {
  const COLS = 28;
  const blocks = Array.from({ length: totalMonths });
  const remaining = totalMonths - monthsLived;

  return (
    <div className="px-4">
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {blocks.map((_, i) => {
          const lived = i < monthsLived;
          const current = i === monthsLived - 1;

          let opacity = 1;
          if (!lived) {
            const fadeProgress = (i - monthsLived) / Math.max(1, remaining - 1);
            opacity = Math.max(0.12, 1 - fadeProgress * 0.88);
          }

          return (
            <div
              key={i}
              className={`
                month-block rounded-[1px]
                ${lived
                  ? current
                    ? 'bg-red-accent animate-pulse-red'
                    : 'bg-red-dim opacity-70'
                  : 'bg-elevated'
                }
              `}
              style={{ paddingBottom: '100%', opacity: lived ? undefined : opacity }}
            />
          );
        })}
      </div>
      <p className="text-text-muted text-[10px] mt-2 text-center tracking-wide">
        These blocks aren't guaranteed.
      </p>
    </div>
  );
}
