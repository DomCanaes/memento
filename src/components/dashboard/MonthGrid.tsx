import { LIFE_MONTHS } from '../../constants/mortality';

interface Props {
  monthsLived: number;
}

export function MonthGrid({ monthsLived }: Props) {
  const COLS = 28;
  const blocks = Array.from({ length: LIFE_MONTHS });

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
