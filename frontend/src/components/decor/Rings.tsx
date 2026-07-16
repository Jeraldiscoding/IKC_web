/**
 * Concentric ring motif — a calm, geometric decoration (not a childlike doodle).
 * Stroke is currentColor, so colour comes from a `text-*` utility and opacity
 * from `/NN`. Purely decorative: aria-hidden, non-interactive.
 */
export function Rings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="100" cy="100" r="34" strokeWidth="2" />
      <circle cx="100" cy="100" r="60" strokeWidth="2" />
      <circle cx="100" cy="100" r="86" strokeWidth="2" strokeDasharray="2 10" />
    </svg>
  );
}
