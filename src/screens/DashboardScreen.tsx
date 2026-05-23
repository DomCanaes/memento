import { Screen } from '../components/layout/Screen';
import { MonthGrid } from '../components/dashboard/MonthGrid';
import { PerceivedProgressBar } from '../components/dashboard/PerceivedProgressBar';
import { SandTimer } from '../components/dashboard/SandTimer';
import { GratitudeAnchor } from '../components/dashboard/GratitudeAnchor';
import { useMortality } from '../hooks/useMortality';
import { LIFE_MONTHS } from '../constants/mortality';

export function DashboardScreen() {
  const { monthsLived, ageInYears, perceivedPercent, remainingMonths } = useMortality();

  return (
    <Screen>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <h1 className="text-xl font-black tracking-widest text-white uppercase">MEMENTO</h1>
          <p className="text-xs text-text-muted mt-0.5">Remember that you will die.</p>
        </div>
        <SandTimer />
      </div>

      <div className="px-4 mb-4">
        <div className="bg-red-ghost border border-red-dim rounded-xl p-3">
          <p className="text-text-secondary text-sm leading-relaxed">
            <span className="text-white font-bold">{monthsLived}</span> months lived.{' '}
            <span className="text-red-light font-bold">{remainingMonths}</span> months remaining — if you're average.
          </p>
          <p className="text-text-muted text-xs mt-1">
            {LIFE_MONTHS} total months. {((monthsLived / LIFE_MONTHS) * 100).toFixed(1)}% of the grid is behind you.
          </p>
        </div>
      </div>

      <MonthGrid monthsLived={monthsLived} />

      <div className="mt-5 space-y-4">
        <PerceivedProgressBar ageInYears={ageInYears} perceivedPercent={perceivedPercent} />
        <GratitudeAnchor />
      </div>

      <div className="pb-4" />
    </Screen>
  );
}
