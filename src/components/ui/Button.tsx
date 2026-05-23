import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'danger' | 'outline';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-red-accent text-white hover:bg-red-light active:bg-red-dim',
  ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-elevated',
  danger: 'bg-red-ghost border border-red-dim text-red-light hover:bg-red-dim',
  outline: 'bg-transparent border border-border text-text-secondary hover:border-red-accent hover:text-white',
};

export function Button({ variant = 'primary', children, fullWidth, className = '', ...props }: Props) {
  return (
    <button
      className={`
        flex items-center justify-center gap-2
        px-4 py-3 rounded-lg font-medium text-sm
        transition-colors duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
