export function GratitudeAnchor() {
  return (
    <div className="px-4">
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-warm text-xs font-semibold uppercase tracking-widest mb-2">Right now</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          You're here. <span className="text-white font-medium">Rachel</span> is here.
          {' '}<span className="text-white font-medium">Your parents</span> are here.
          None of that is guaranteed tomorrow.
        </p>
        <p className="text-text-muted text-xs mt-2 leading-relaxed">
          The same clock that terrifies you is the one that makes this — all of this — matter.
        </p>
      </div>
    </div>
  );
}
