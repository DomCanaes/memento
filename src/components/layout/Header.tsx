import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export function Header({ title, subtitle, right }: Props) {
  return (
    <div className="px-4 pt-4 pb-2 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-black tracking-widest text-white uppercase">{title}</h1>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
      {right && <div className="ml-4 flex-shrink-0">{right}</div>}
    </div>
  );
}
