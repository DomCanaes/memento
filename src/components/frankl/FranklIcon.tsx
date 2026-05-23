interface Props {
  onClick: () => void;
}

export function FranklIcon({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Who are you doing this for?"
      className="fixed bottom-[80px] right-4 z-30 w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center shadow-lg hover:border-red-accent transition-colors"
      style={{ bottom: `calc(72px + env(safe-area-inset-bottom) + 12px)` }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}
