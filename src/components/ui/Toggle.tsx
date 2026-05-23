interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: Props) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-red-accent' : 'bg-elevated border border-border'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </div>
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </label>
  );
}
