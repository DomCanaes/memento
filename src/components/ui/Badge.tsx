import type { ReactNode } from 'react';

type Variant = 'red' | 'muted' | 'now';

interface Props {
  children: ReactNode;
  variant?: Variant;
  pulse?: boolean;
}

const styles: Record<Variant, string> = {
  red: 'bg-red-accent text-white text-xs font-bold px-2 py-0.5 rounded',
  muted: 'bg-elevated text-text-muted text-xs font-medium px-2 py-0.5 rounded border border-border',
  now: 'bg-red-accent text-white text-xs font-black px-2 py-0.5 rounded tracking-wider',
};

export function Badge({ children, variant = 'red', pulse }: Props) {
  return (
    <span className={`inline-flex items-center ${styles[variant]} ${pulse ? 'animate-pulse-red' : ''}`}>
      {children}
    </span>
  );
}
