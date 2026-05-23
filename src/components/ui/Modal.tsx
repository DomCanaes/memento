import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
  closable?: boolean;
}

export function Modal({ open, onClose, children, title, closable = true }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={closable ? onClose : undefined}
      />
      <div className="relative z-10 w-full max-w-lg bg-surface border border-border rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        {title && (
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white tracking-widest uppercase">{title}</h2>
            {closable && onClose && (
              <button onClick={onClose} className="text-text-muted hover:text-white transition-colors text-xl leading-none">
                ×
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
