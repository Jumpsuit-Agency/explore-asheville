"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const CRITERIA = [
  { name: "Sticky", desc: "Is it memorable?" },
  { name: "Scalable", desc: "Does it work across channels?" },
  { name: "Relatable", desc: "Does it hit a human truth?" },
  { name: "Differentiated", desc: "Is it ownable?" },
  { name: "On Equity", desc: "Does it feel like the brand?" },
];

const TERRITORIES = [
  {
    name: "Make Something of It",
    color: "var(--color-grove-park)",
    scores: [true, true, true, true, true],
    rationale: [
      "You don\u2019t forget the place where you made something with your hands, heard a song that changed you, or met someone who saw you.",
      "Making a bowl, making music, making contact with a stranger \u2014 each version works in any format, for any audience.",
      "Everyone wants to come home from a trip different than they left. This names that desire.",
      "Charleston has charm. Savannah has beauty. Only Asheville has a culture that hands you the clay and says: your move.",
      "Makers, musicians, storytellers \u2014 this is what Asheville actually is. The campaign just says it out loud.",
    ],
  },
  {
    name: "Sounds Made Up",
    color: "var(--color-french-broad)",
    scores: [true, true, true, true, true],
    recommended: true,
    rationale: [
      "The phrase sticks because it\u2019s playful and true \u2014 half the best things in Asheville really do sound made up.",
      "Works as audio, video, social, OOH \u2014 the sounds of nature, craft, and local stories flex everywhere.",
      "Everyone has described a travel moment that \u201Csounds made up.\u201D It names a universal feeling.",
      "No other destination can claim both the lore and the literal soundscape \u2014 banjos, waterfalls, stories.",
      "Authentic and a little weird. That\u2019s Asheville\u2019s actual brand, not a marketing invention.",
    ],
  },
  {
    name: "How Many Signs\nDo You Need?",
    color: "var(--color-goldenrod)",
    scores: [true, true, true, true, true],
    rationale: [
      "The question lingers. It\u2019s the kind of line people repeat to friends planning a trip.",
      "Works as a billboard, a social caption, a 60-second spot, a bumper sticker. The format is the message.",
      "Everyone has a place that keeps showing up in their life. This names that feeling.",
      "No other destination is brave enough to say \u201Cyou already know.\u201D This is pure Asheville confidence.",
      "Mystical, magnetic, a little weird \u2014 that\u2019s Asheville\u2019s actual reputation, turned into a dare.",
    ],
  },
];

export function RationaleSlide({}: SlideProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 100px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="type-label" style={{ color: "var(--color-goldenrod)", marginBottom: "16px", fontSize: "14px", display: "block" }}>
            Our Recommendation
          </span>
          <h2 className="type-billboard" style={{ fontSize: "64px" }}>
            All three ideas are strong.<br />
            <span style={{ color: "var(--color-goldenrod)" }}>One is built to win.</span>
          </h2>
        </div>

        {/* Rubric table */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 1fr 1fr",
            gap: "0",
            marginBottom: "4px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div />
            {TERRITORIES.map((t) => (
              <div key={t.name} style={{ textAlign: "center", padding: "0 12px" }}>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: t.recommended ? "22px" : "18px",
                  fontWeight: t.recommended ? 800 : 700,
                  color: t.color,
                  lineHeight: 1.15,
                  whiteSpace: "pre-line",
                  letterSpacing: "-0.01em",
                }}>
                  {t.name}
                </p>
                {t.recommended && (
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: t.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    background: "rgba(254,181,44,0.15)",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginTop: "8px",
                  }}>
                    Our Pick
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Criteria rows */}
          {CRITERIA.map((c, i) => {
            const isOpen = expandedRow === i;
            return (
              <div
                key={c.name}
                className="interactive"
                onClick={() => setExpandedRow(isOpen ? null : i)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 1fr 1fr",
                  gap: "0",
                  padding: isOpen ? "16px 0 12px" : "20px 0",
                  borderBottom: i < CRITERIA.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "white" }}>
                      {c.name}
                    </p>
                    <span style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.25)",
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}>
                      &#9654;
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                    {c.desc}
                  </p>
                </div>
                {TERRITORIES.map((t, ti) => (
                  <div key={t.name + c.name} style={{ textAlign: "center" }}>
                    <span style={{
                      fontSize: "28px",
                      color: t.scores[i] ? "var(--color-fiddlehead)" : "rgba(255,255,255,0.15)",
                    }}>
                      {t.scores[i] ? "\u2713" : "\u2717"}
                    </span>
                    {isOpen && (
                      <p style={{
                        fontFamily: "var(--font-slab)",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.4,
                        marginTop: "6px",
                        padding: "0 16px",
                        textAlign: "center",
                        animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
                        animationDelay: `${ti * 50}ms`,
                      }}>
                        {t.rationale[i]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Score totals */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 1fr 1fr",
            gap: "0",
            paddingTop: "20px",
            borderTop: "2px solid rgba(255,255,255,0.15)",
            marginTop: "4px",
            alignItems: "center",
          }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Score
            </p>
            {TERRITORIES.map((t) => (
              <div key={t.name + "-score"} style={{ textAlign: "center" }}>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: t.recommended ? "48px" : "36px",
                  fontWeight: 800,
                  color: t.color,
                  letterSpacing: "-0.02em",
                }}>
                  {t.scores.filter(Boolean).length}/{t.scores.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
