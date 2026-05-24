interface Props {
  totalMonths: number;
  monthsLived: number;
}

export function MonthGrid({ totalMonths, monthsLived }: Props) {
  const COLS = totalMonths <= 120 ? 11 : 28;
  const blocks = Array.from({ length: totalMonths });

  return (
    <div className="px-4">
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {blocks.map((_, i) => {
          const lived = i < monthsLived;
          const current = i === monthsLived - 1;
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
              style={{ paddingBottom: '100%' }}
            />
          );
        })}
      </div>
    </div>
  );
}
