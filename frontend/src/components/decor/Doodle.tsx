export type DoodleName =
  | "squiggle"
  | "wave"
  | "star"
  | "spark"
  | "burst"
  | "dots"
  | "rainbow"
  | "path"
  | "loop";

/**
 * Small childlike crayon doodles used as ambient section decoration. They pick
 * up the round-cap, currentColor vocabulary already set by ActivityGlyph, so
 * colour is set by the caller with a `text-*` utility and opacity with `/NN`.
 *
 * Purely decorative: aria-hidden, non-interactive. Vary the motif, colour,
 * position and size between sections so the page never reads as one stamped
 * template — a squiggle bottom-left in one band, a star cluster top-right in the
 * next. Keep them light enough that they frame the content, never crowd it.
 */
export function Doodle({
  name,
  className = "",
}: {
  name: DoodleName;
  className?: string;
}) {
  const stroke = {
    className,
    "aria-hidden": true,
    focusable: "false" as const,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "squiggle":
      return (
        <svg viewBox="0 0 120 34" {...stroke}>
          <path d="M6 17c11-19 21 19 32 0s21-19 32 0 21 19 32 0" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 120 22" {...stroke} strokeWidth={3.5}>
          <path d="M4 12C24 -2 44 20 64 9S104 -1 116 13" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" {...stroke}>
          <path d="M50 8l11 31h32L67 58l10 32-27-20-27 20 10-32L9 39h32Z" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 100 100" {...stroke}>
          <path d="M50 8c4 28 14 38 42 42-28 4-38 14-42 42-4-28-14-38-42-42 28-4 38-14 42-42Z" />
        </svg>
      );
    case "burst":
      // A little six-ray sparkle burst — three lines crossing at the centre.
      return (
        <svg viewBox="0 0 60 60" {...stroke}>
          <path d="M30 6v48M11 18l38 24M49 18L11 42" />
        </svg>
      );
    case "dots":
      // Confetti: a few filled dots of varying size. Fill, not stroke.
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          aria-hidden
          focusable="false"
          fill="currentColor"
        >
          <circle cx="14" cy="22" r="6" />
          <circle cx="44" cy="12" r="4" />
          <circle cx="34" cy="44" r="5" />
          <circle cx="54" cy="40" r="3" />
        </svg>
      );
    case "rainbow":
      return (
        <svg viewBox="0 0 100 60" {...stroke}>
          <path d="M12 54a38 38 0 0 1 76 0" />
          <path d="M26 54a24 24 0 0 1 48 0" />
          <path d="M40 54a10 10 0 0 1 20 0" />
        </svg>
      );
    case "path":
      return (
        <svg viewBox="0 0 120 60" {...stroke} strokeDasharray="1 12">
          <path d="M6 46C34 6 86 54 114 14" />
        </svg>
      );
    case "loop":
      return (
        <svg viewBox="0 0 100 100" {...stroke}>
          <path d="M50 12c22 0 38 16 36 38-2 20-20 34-40 30-16-3-28-19-24-36 3-13 15-22 28-20 10 2 17 11 15 21-2 7-9 12-16 10" />
        </svg>
      );
  }
}
