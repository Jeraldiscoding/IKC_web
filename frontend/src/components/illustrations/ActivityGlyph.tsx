export function ActivityGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* sun */}
      <circle cx="34" cy="34" r="12" />
      <path d="M34 12v-6M34 62v-6M12 34H6M62 34h-6M18 18l-4-4M50 50l4 4M50 18l4-4M18 50l-4 4" />
      {/* building blocks */}
      <rect x="60" y="66" width="22" height="22" rx="3" />
      <rect x="84" y="66" width="22" height="22" rx="3" />
      <rect x="72" y="44" width="22" height="22" rx="3" />
    </svg>
  );
}
