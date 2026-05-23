import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  red?: boolean;
}

export function Card({ children, className = '', onClick, red }: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl p-4
        ${red ? 'bg-red-ghost border border-red-dim' : 'bg-surface border border-border'}
        ${onClick ? 'cursor-pointer hover:border-red-accent transition-colors' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
