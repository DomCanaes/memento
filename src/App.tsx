import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/layout/BottomNav';
import { FirstOpenModal } from './components/modals/FirstOpenModal';
import { RegretFilterModal } from './components/modals/RegretFilterModal';
import { FranklAnchorModal } from './components/modals/FranklAnchorModal';
import { FranklIcon } from './components/frankl/FranklIcon';
import { DashboardScreen } from './screens/DashboardScreen';
import { SignalsScreen } from './screens/SignalsScreen';
import { LossClockScreen } from './screens/LossClockScreen';
import { MonkModeScreen } from './screens/MonkModeScreen';
import { ReflectionScreen } from './screens/ReflectionScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { VerdictScreen } from './screens/VerdictScreen';
import { ListScreen } from './screens/ListScreen';
import { useFirstOpen } from './hooks/useFirstOpen';
import { useFranklAnchors } from './hooks/useFranklAnchors';
import { useMonkMode } from './hooks/useMonkMode';
import { useNotificationScheduler } from './hooks/useNotificationScheduler';

function AppInner() {
  const { show: showFirstOpen, dismiss: dismissFirstOpen } = useFirstOpen();
  const { anchors } = useFranklAnchors();
  const { state: monkMode } = useMonkMode();
  const [showRegret, setShowRegret] = useState(false);
  const [regretTrigger, setRegretTrigger] = useState<'manual' | 'skipped'>('manual');
  const [showFrankl, setShowFrankl] = useState(false);

  useNotificationScheduler(monkMode);

  function handleTwoSkipped() {
    setRegretTrigger('skipped');
    setShowRegret(true);
  }

  function handleRegretFilter() {
    setRegretTrigger('manual');
    setShowRegret(true);
  }

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/signals" element={<SignalsScreen onTwoSkipped={handleTwoSkipped} />} />
          <Route path="/loss" element={<LossClockScreen onRegretFilter={handleRegretFilter} />} />
          <Route path="/monk" element={<MonkModeScreen />} />
          <Route path="/reflect" element={<ReflectionScreen />} />
          <Route path="/verdict" element={<VerdictScreen />} />
          <Route path="/list" element={<ListScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </div>

      <BottomNav />
      <FranklIcon onClick={() => setShowFrankl(true)} />

      <FirstOpenModal open={showFirstOpen} onDismiss={dismissFirstOpen} />
      <RegretFilterModal open={showRegret} onClose={() => setShowRegret(false)} triggered={regretTrigger} />
      <FranklAnchorModal open={showFrankl} onClose={() => setShowFrankl(false)} anchors={anchors} />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  );
}
