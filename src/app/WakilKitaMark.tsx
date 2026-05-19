export function WakilKitaMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="1" y="1" width="38" height="38" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 14 L12 27 L16 20 L20 27 L24 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <line x1="28" y1="14" x2="28" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="28" y1="21" x2="34" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <line x1="28" y1="21" x2="34" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function P105LineMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="48"
      viewBox="0 0 360 48"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 36 C60 32 120 24 180 28 C240 32 300 40 360 36"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.20"
        fill="none"
      />
      <path
        d="M0 26 C80 22 140 14 200 18 C260 22 310 30 360 26"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.13"
        fill="none"
      />
      <path
        d="M0 43 C70 40 160 36 230 39 C290 42 340 46 360 44"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.08"
        fill="none"
      />
    </svg>
  );
}
