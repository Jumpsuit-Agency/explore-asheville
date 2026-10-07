import type { ReactNode } from "react";

/**
 * The one header every content slide wears.
 *
 * These headers had drifted apart slide by slide: the eyebrow was 18px on five
 * slides and 12px on two, chips were 16px or 10px, the headline 48, 56 or 64,
 * and horizontal padding ranged from 60px to 120px — so the left edge and the
 * type both jumped as you clicked through. Putting the scale in one place is
 * the only way it stays put.
 *
 * The territory accent is still passed in, because that is the one thing that
 * is genuinely meant to differ.
 */
export interface HeaderChip {
  label: string;
  /**
   * `accent` (the default) is the accent-tinted pill the deck already used
   * for "Our Pick"; `solid` fills with the accent for a phase marker; `quiet`
   * is the neutral pill for metadata like a date range.
   */
  tone?: "accent" | "solid" | "quiet";
}

interface Props {
  color: string;
  /** "Territory 03" — the constant half of the eyebrow. */
  eyebrow: string;
  /** Appended after a middot: "Territory 03 · Guerrilla". */
  eyebrowSuffix?: string;
  chips?: HeaderChip[];
  title: ReactNode;
  /** Small muted word trailing the headline — "OOH", "Digital", "Social". */
  suffix?: string;
  /** Right-hand slot, used by the T1/T2/T3 territory switcher. */
  nav?: ReactNode;
}

export function SlideHeader({ color, eyebrow, eyebrowSuffix, chips, title, suffix, nav }: Props) {
  return (
    <header className="slide-header">
      <div className="slide-header-eyebrow">
        <span className="type-label slide-header-kicker" style={{ color }}>
          {eyebrow}
          {eyebrowSuffix ? ` · ${eyebrowSuffix}` : ""}
        </span>
        {chips?.map((c) => {
          if (c.tone === "solid")
            return (
              <span key={c.label} className="slide-header-chip" style={{ background: color, color: "#1E1F38" }}>
                {c.label}
              </span>
            );
          if (c.tone === "quiet")
            return (
              <span key={c.label} className="slide-header-chip slide-header-chip-quiet">
                {c.label}
              </span>
            );
          return (
            <span
              key={c.label}
              className="slide-header-chip"
              style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
            >
              {c.label}
            </span>
          );
        })}
        {nav}
      </div>
      <h2 className="slide-header-title">
        {title}
        {suffix && <span className="slide-header-suffix">{suffix}</span>}
      </h2>
    </header>
  );
}
