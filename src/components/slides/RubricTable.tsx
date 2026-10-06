"use client";

import { useState } from "react";

/**
 * The two rubric slides ran back to back with the same job and six quiet
 * differences — first column 200px against 260px, criterion names 22px against
 * 26px, score glyphs 28px against 32px, different row padding, different totals
 * padding, differently hard-wrapped column headers. Nothing was wrong on either
 * slide alone; together they made the deck lurch between two near-identical
 * tables.
 *
 * One component now renders both, so congruence is structural rather than
 * something two files have to agree about.
 */

export type Score = boolean | "?";

export interface Criterion {
  name: string;
  desc: string;
}

export interface RubricTerritory {
  name: string;
  color: string;
  scores: Score[];
  recommended?: boolean;
  rationale: string[];
}

/** Held constant so both tables start at the same y and share a row rhythm. */
const NAME_COL = "320px";
const COLUMNS = `${NAME_COL} 1fr 1fr 1fr`;
/** Reserved so a one-line and a two-line column header can't shift the rows. */
const HEADER_MIN_HEIGHT = "104px";

export function RubricTable({
  criteria,
  territories,
}: {
  criteria: Criterion[];
  territories: RubricTerritory[];
}) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: COLUMNS,
          gap: "0",
          minHeight: HEADER_MIN_HEIGHT,
          alignItems: "end",
          marginBottom: "4px",
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div />
        {territories.map((t) => (
          <div key={t.name} style={{ textAlign: "center", padding: "0 12px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "24px",
                fontWeight: 800,
                color: t.color,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {t.name}
            </p>
            {t.recommended && (
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: t.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  background: "rgba(254,181,44,0.15)",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginTop: "8px",
                }}
              >
                Our Pick
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Criteria */}
      {criteria.map((c, i) => {
        const isOpen = expandedRow === i;
        return (
          <button
            key={c.name}
            type="button"
            className="ui-disclose"
            aria-expanded={isOpen}
            onClick={() => setExpandedRow(isOpen ? null : i)}
            style={{
              display: "grid",
              gridTemplateColumns: COLUMNS,
              gap: "0",
              // Constant. Padding that shrank on open moved the row's own
              // content under the pointer mid-click.
              padding: "4px 0",
              borderBottom:
                i < criteria.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderRadius: "4px",
              width: "100%",
              alignItems: "start",
            }}
          >
            <div style={{ paddingRight: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.2,
                    textAlign: "left",
                  }}
                >
                  {c.name}
                </p>
                <span className="disclose-marker" aria-hidden="true">
                  &#10095;
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "2px",
                  textAlign: "left",
                  lineHeight: 1.35,
                }}
              >
                {c.desc}
              </p>
            </div>

            {territories.map((t, ti) => (
              <div key={t.name + c.name} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "30px",
                    color:
                      t.scores[i] === "?"
                        ? "var(--color-goldenrod)"
                        : t.scores[i]
                        ? "var(--color-fiddlehead)"
                        : "rgba(255,255,255,0.15)",
                  }}
                >
                  {t.scores[i] === "?" ? "?" : t.scores[i] ? "✓" : "✗"}
                </span>
                {/* Always in layout, so opening a row never shifts the rows
                    beneath it. Hidden from AT until revealed. */}
                <p
                  className="disclose-reserved"
                  style={{
                    fontFamily: "var(--font-slab)",
                    fontSize: "17px",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.3,
                    marginTop: "6px",
                    padding: "0 16px",
                    textAlign: "center",
                    transitionDelay: `${ti * 50}ms`,
                  }}
                >
                  {t.rationale[i]}
                </p>
              </div>
            ))}
          </button>
        );
      })}

      {/* Score */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: COLUMNS,
          gap: "0",
          paddingTop: "14px",
          marginTop: "4px",
          borderTop: "2px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          className="type-label"
          style={{ color: "rgba(255,255,255,0.4)", alignSelf: "center" }}
        >
          Score
        </span>
        {territories.map((t) => (
          <div key={t.name} style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: t.recommended ? "44px" : "38px",
                fontWeight: 800,
                color: t.color,
              }}
            >
              {t.scores.filter((sc) => sc === true).length}/{t.scores.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
