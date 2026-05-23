export function SandTimer() {
  return (
    <div className="flex justify-center items-center py-1">
      <svg
        viewBox="0 0 48 80"
        width="36"
        height="60"
        className="overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="top-clip">
            <polygon points="4,4 44,4 24,42" />
          </clipPath>
          <clipPath id="bot-clip">
            <polygon points="4,76 44,76 24,42" />
          </clipPath>
        </defs>

        {/* Hourglass outline */}
        <polygon
          points="4,4 44,4 24,42 44,76 4,76 24,42"
          fill="none"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Top sand — depletes */}
        <g clipPath="url(#top-clip)">
          <rect
            x="4" y="4" width="40" height="38"
            fill="#dc2626"
            fillOpacity="0.65"
            className="sand-timer-top"
            style={{ transformOrigin: '24px 4px' }}
          />
        </g>

        {/* Bottom sand — fills */}
        <g clipPath="url(#bot-clip)">
          <rect
            x="4" y="42" width="40" height="34"
            fill="#dc2626"
            fillOpacity="0.65"
            className="sand-timer-bot"
            style={{ transformOrigin: '24px 76px' }}
          />
        </g>

        {/* Falling particles at the neck */}
        <circle cx="24" cy="43" r="1" fill="#dc2626" className="sand-particle" />
        <circle cx="24" cy="43" r="0.7" fill="#dc2626" className="sand-particle" />
        <circle cx="24" cy="43" r="0.8" fill="#dc2626" className="sand-particle" />
      </svg>
    </div>
  );
}
