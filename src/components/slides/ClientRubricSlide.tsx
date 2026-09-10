"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const CRITERIA = [
  { name: "Increase intent to visit", desc: "Among four target visitor profiles" },
  { name: "Improve brand favorability", desc: "vs. Charleston, Savannah, Greenville, Chattanooga" },
  { name: "Demonstrate range", desc: "Across audiences, seasons, and channels" },
  { name: "Stay authentically Asheville", desc: "Built on what makes the city real" },
];

const TERRITORIES = [
  {
    name: "Make Something\nof It",
    color: "var(--color-grove-park)",
    scores: [true, true, true, true],
    rationale: [
      "Make a bowl. Make a friend. Make a memory you didn\u2019t plan. The verb pulls visitors toward experiences, not itineraries.",
      "Asheville is where you do things, not just see things. Competitors offer scenery. This offers transformation.",
      "Crafts, music, food, stories, connection \u2014 every audience finds their own version of making. It never repeats.",
      "Rooted in Asheville\u2019s real maker culture \u2014 potters, musicians, chefs, storytellers. Not invented, amplified.",
    ],
  },
  {
    name: "Sounds\nMade Up",
    color: "var(--color-french-broad)",
    scores: [true, true, true, true],
    recommended: true,
    rationale: [
      "Creates curiosity \u2014 if it sounds made up, you have to go hear it for yourself.",
      "The lore, the sounds, the stories \u2014 positions Asheville as deeper than any competitor\u2019s surface charm.",
      "Every season has its own soundscape and stories. Nature, craft, music, local legend \u2014 content never runs dry.",
      "Banjos on porches, waterfalls no one posted, restaurants that \u201Cdon\u2019t exist\u201D \u2014 this is how Asheville actually works.",
    ],
  },
  {
    name: "How Many Signs\nDo You Need?",
    color: "var(--color-goldenrod)",
    scores: [true, true, true, true],
    rationale: [
      "Turns passive awareness into active urgency. If Asheville keeps showing up, there\u2019s a reason.",
      "Reframes Asheville from \u201Cone of many options\u201D to \u201Cthe one that won\u2019t leave you alone.\u201D Bold positioning.",
      "Works as retargeting, OOH, social, audio, long-form \u2014 the question adapts to any format or moment.",
      "Mystical, magnetic, a little weird. That\u2019s not a marketing invention \u2014 that\u2019s Asheville\u2019s actual reputation.",
    ],
  },
];

export function ClientRubricSlide({}: SlideProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 100px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="type-label" style={{ color: "var(--color-goldenrod)", marginBottom: "16px", fontSize: "14px", display: "block" }}>
            Against Your Criteria
          </span>
          <h2 className="type-billboard" style={{ fontSize: "64px" }}>
            How each idea delivers on{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>what matters to you.</span>
          </h2>
        </div>

        {/* Rubric table */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr 1fr 1fr",
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
                  gridTemplateColumns: "260px 1fr 1fr 1fr",
                  gap: "0",
                  padding: isOpen ? "18px 0 14px" : "24px 0",
                  borderBottom: i < CRITERIA.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 700, color: "white" }}>
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
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "15px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                    {c.desc}
                  </p>
                </div>
                {TERRITORIES.map((t, ti) => (
                  <div key={t.name + c.name} style={{ textAlign: "center" }}>
                    <span style={{
                      fontSize: "32px",
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
            gridTemplateColumns: "260px 1fr 1fr 1fr",
            gap: "0",
            paddingTop: "24px",
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
