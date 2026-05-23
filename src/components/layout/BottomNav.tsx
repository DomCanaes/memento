import { Link, useLocation } from 'react-router-dom';

const TABS = [
  { path: '/', label: 'Home', icon: SkullIcon },
  { path: '/signals', label: 'Focus', icon: SignalIcon },
  { path: '/loss', label: 'Clock', icon: TimerIcon },
  { path: '/monk', label: 'Monk', icon: MonkIcon },
  { path: '/reflect', label: 'Reflect', icon: MoonIcon },
  { path: '/settings', label: 'Settings', icon: GearIcon },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border safe-bottom">
      <div className="flex items-stretch h-16">
        {TABS.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`
                flex-1 flex flex-col items-center justify-center gap-0.5
                transition-colors duration-150
                ${active ? 'text-red-accent' : 'text-text-muted hover:text-text-secondary'}
              `}
            >
              <Icon size={20} active={active} />
              <span className="text-[9px] font-medium tracking-wider uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface IconProps { size: number; active?: boolean; }

function SkullIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7.03 2 3 6.03 3 11c0 3.1 1.52 5.84 3.85 7.54L7 21h10l.15-2.46C19.48 16.84 21 14.1 21 11c0-4.97-4.03-9-9-9zm-3 14v-1H8v-1H7v-2h1v-1h1v-1h6v1h1v1h1v2h-1v1h-1v1H9zm1.5-4.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm3 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
    </svg>
  );
}

function SignalIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  );
}

function TimerIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function MonkIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}

function MoonIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function GearIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
