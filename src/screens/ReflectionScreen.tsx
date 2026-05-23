import { useState } from 'react';
import { Screen } from '../components/layout/Screen';
import { Header } from '../components/layout/Header';
import { ReflectionForm } from '../components/reflection/ReflectionForm';
import { ReflectionSummary } from '../components/reflection/ReflectionSummary';
import { ReflectionHistory } from '../components/reflection/ReflectionHistory';
import { useReflection } from '../hooks/useReflection';
import { useSignals } from '../hooks/useSignals';
import { useMortality } from '../hooks/useMortality';
import type { ReflectionEntry } from '../types';

export function ReflectionScreen() {
  const { entries, todayEntry, addEntry } = useReflection();
  const { signals } = useSignals();
  const { remainingLifeHours } = useMortality();
  const [submitted, setSubmitted] = useState<ReflectionEntry | null>(null);

  const currentEntry = submitted ?? todayEntry;

  function handleSubmit(data: Omit<ReflectionEntry, 'id' | 'date' | 'submittedAt'>) {
    const entry = addEntry(data);
    setSubmitted(entry);
  }

  return (
    <Screen>
      <Header
        title="REFLECTION"
        subtitle={currentEntry ? 'Day logged.' : '60 seconds. Three questions.'}
      />

      <div className="px-4 space-y-4 mt-2">
        {currentEntry ? (
          <ReflectionSummary entry={currentEntry} remainingLifeHours={remainingLifeHours} />
        ) : (
          <ReflectionForm signals={signals} onSubmit={handleSubmit} />
        )}

        {entries.length > 1 && (
          <div className="mt-6">
            <ReflectionHistory entries={entries.filter(e => e !== currentEntry)} />
          </div>
        )}
      </div>

      <div className="pb-4" />
    </Screen>
  );
}
