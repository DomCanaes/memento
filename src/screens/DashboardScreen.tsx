import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { MonthGrid } from '../components/dashboard/MonthGrid';
import { PerceivedProgressBar } from '../components/dashboard/PerceivedProgressBar';
import { SandTimer } from '../components/dashboard/SandTimer';
import { GratitudeAnchor } from '../components/dashboard/GratitudeAnchor';
import { useMortality } from '../hooks/useMortality';
import { LIFE_MONTHS, FREE_TIME_MONTHS } from '../constants/mortality';

type Tab = 'life' | 'free';

export function DashboardScreen() {
  const { monthsLived, ageInYears, perceivedPercent, remainingMonths, freeTimeUsed, freeTimeRemaining } = useMortality();
  const [tab, setTab] = useState<Tab>('life');

  return (
    <Screen>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <h1 className="text-xl font-black tracking-widest text-white uppercase">MEMENTO</h1>
          <p className="text-xs text-text-muted mt-0.5">Remember that you will die.</p>
        </div>
        <SandTimer />
      </div>

      {/* Stat block */}
      <div className="px-4 mb-4">
        {tab === 'life' ? (
          <div className="bg-red-ghost border border-red-dim rounded-xl p-3">
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="text-white font-bold">{monthsLived}</span> months lived.{' '}
              <span className="text-red-light font-bold">{remainingMonths}</span> months remaining — if you're lucky.
            </p>
            <p className="text-text-muted text-xs mt-1">
              {LIFE_MONTHS} total months. {((monthsLived / LIFE_MONTHS) * 100).toFixed(1)}% of the grid is behind you.
            </p>
          </div>
        ) : (
          <div className="bg-red-ghost border border-red-dim rounded-xl p-3">
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="text-red-light font-bold">{freeTimeUsed}</span> months of free time already gone.{' '}
              <span className="text-white font-bold">{freeTimeRemaining}</span> months left to build, love, and actually live.
            </p>
            <p className="text-text-muted text-xs mt-1">
              {FREE_TIME_MONTHS} months of real time in a full life. Sleep, work, and admin eat the rest.
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="px-4 mb-3 flex gap-2">
        <button
          onClick={() => setTab('life')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
            tab === 'life'
              ? 'bg-red-accent text-white'
              : 'bg-elevated text-text-muted'
          }`}
        >
          Time left
        </button>
        <button
          onClick={() => setTab('free')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
            tab === 'free'
              ? 'bg-red-accent text-white'
              : 'bg-elevated text-text-muted'
          }`}
        >
          Free time
        </button>
      </div>

      {/* Grid */}
      {tab === 'life' ? (
        <MonthGrid totalMonths={LIFE_MONTHS} monthsLived={monthsLived} />
      ) : (
        <MonthGrid totalMonths={FREE_TIME_MONTHS} monthsLived={freeTimeUsed} />
      )}

      <div className="mt-5 space-y-4">
        <PerceivedProgressBar ageInYears={ageInYears} perceivedPercent={perceivedPercent} />
        <GratitudeAnchor />
      </div>

      <div className="pb-4" />
    </Screen>
  );
}
