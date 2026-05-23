import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  scrollable?: boolean;
}

export function Screen({ children, className = '', scrollable = true }: Props) {
  return (
    <div
      className={`
        flex flex-col h-full bg-black
        safe-top pb-nav
        ${scrollable ? 'overflow-y-auto' : 'overflow-hidden'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
