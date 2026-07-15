export type DoodleName =
  | "squiggle"
  | "rainbow"
  | "spark"
  | "path"
  | "loop"
  | "star";

/**
 * Small childlike crayon doodles used as ambient section decoration. They pick
 * up the round-cap, currentColor stroke vocabulary already set by ActivityGlyph,
 * so colour is set by the caller with a `text-*` utility and opacity with `/NN`.
 *
 * Purely decorative: aria-hidden, non-interactive. Keep them low-opacity and to
 * one or two per section — they should frame the content, never crowd it.
 */
export function Doodle({
  name,
  className = "",
}: {
  name: DoodleName;
  className?: string;
}) {
  const common = {
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
        <svg viewBox="0 0 120 40" {...common}>
          <path d="M6 20c12-20 22 20 34 0s22-20 34 0 22 20 34 0" />
        </svg>
      );
    case "rainbow":
      return (
        <svg viewBox="0 0 100 60" {...common}>
          <path d="M12 54a38 38 0 0 1 76 0" />
          <path d="M26 54a24 24 0 0 1 48 0" />
          <path d="M40 54a10 10 0 0 1 20 0" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M50 8c4 28 14 38 42 42-28 4-38 14-42 42-4-28-14-38-42-42 28-4 38-14 42-42Z" />
        </svg>
      );
    case "path":
      return (
        <svg viewBox="0 0 120 60" {...common} strokeDasharray="1 12">
          <path d="M6 46C34 6 86 54 114 14" />
        </svg>
      );
    case "loop":
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M50 12c22 0 38 16 36 38-2 20-20 34-40 30-16-3-28-19-24-36 3-13 15-22 28-20 10 2 17 11 15 21-2 7-9 12-16 10" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M50 10l11 26 28 2-21 18 7 27-25-15-25 15 7-27-21-18 28-2Z" />
        </svg>
      );
  }
}
