// Custom MealLedger wordmark + glyph.
// Intentionally distinct from the USDA CACFP program logo to avoid
// trademark conflicts.

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  color?: string;
}

export default function Logo({ size = 34, showWordmark = true, color }: LogoProps) {
  return (
    <span className="logo" style={color ? { color } : undefined}>
      <svg
        className="logo-mark"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Plate ring */}
        <circle cx="32" cy="32" r="28" fill="#0d2b54" />
        <circle cx="32" cy="34" r="17" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        {/* Leaf */}
        <path
          d="M32 17 C 23 17, 21 27, 26 31 C 31 35, 36 34, 40 29 C 44 24, 41 17, 32 17 Z"
          fill="#7cb342"
        />
        <path
          d="M28 28 Q 32 24 38 22"
          stroke="#5e8d2e"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Fork tine (yellow accent) */}
        <rect x="30" y="40" width="4" height="11" rx="1.5" fill="#fdd835" />
      </svg>
      {showWordmark && <span>MealLedger</span>}
    </span>
  );
}
