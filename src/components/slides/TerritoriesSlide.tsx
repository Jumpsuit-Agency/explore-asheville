"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const TERRITORIES = [
  {
    number: "01",
    hook: "Invite them\nto participate.",
    subtext: "Instead of just visit.",
    bigIdea: "Make Something of It.",
    slideIndex: 4,  // territory-1-desc
    color: "var(--color-grove-park)",
    pitch: [
      "You can visit a place and leave with photos.",
      "Or you can leave with evidence you made contact with it.",
      "A crooked bowl you made. A song you learned to play. A part of yourself you hadn\u2019t heard from in a while.",
      "The best thing you make in Asheville might not be the thing you take home.",
    ],
  },
  {
    number: "02",
    hook: "Fill them\nwith awe.",
    subtext: "Instead of just information.",
    bigIdea: "Sounds Made Up.",
    slideIndex: 7,  // territory-2-desc
    color: "var(--color-french-broad)",
    recommended: true,
    pitch: [
      "A castle in the mountains.",
      "A place where the road IS the destination.",
      "You joining a drum circle, foraging for dinner, and forgetting what day it is.",
      "Heading home with a story that turns into lore.",
    ],
  },
  {
    number: "03",
    hook: "Send out\na frequency.",
    subtext: "Instead of just a message.",
    bigIdea: "How Many Signs Do You Need?",
    slideIndex: 9,  // territory-3-desc
    color: "var(--color-goldenrod)",
    pitch: [
      "Some places you visit. And some places have been visiting you.",
      "In a song. On a tee shirt. In a dream. In an ad.",
      "In a conversation for the third time.",
      "At some point, you have to wonder if it\u2019s still a coincidence.",
    ],
  },
];

export function TerritoriesSlide({ onNavigate }: SlideProps) {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <div className="slide slide-clear" style={{ padding: 0 }}>
      {/* Gradient for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(30,31,56,0.6) 0%, rgba(30,31,56,0.4) 30%, rgba(30,31,56,0.5) 70%, rgba(30,31,56,0.8) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "80px 100px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span
            className="type-label"
            style={{ color: "var(--color-goldenrod)", marginBottom: "16px", fontSize: "14px", display: "block" }}
          >
            Three Territories
          </span>
          <h2 className="type-billboard" style={{ fontSize: "64px" }}>
            Three platforms.{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>Three ways in.</span>
          </h2>
          <p className="type-subhead" style={{ color: "rgba(255,255,255,0.45)", marginTop: "16px", fontSize: "24px" }}>
            Each explores a different way to attract someone to Asheville.
          </p>
        </div>

        {/* Three territory cards with flip */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "28px", alignItems: "stretch" }}>
          {TERRITORIES.map((t) => {
            const isFlipped = flipped === t.number;
            return (
              <div
                key={t.number}
                style={{ perspective: "1200px", cursor: "pointer" }}
                onClick={() => setFlipped(isFlipped ? null : t.number)}
              >
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}>
                  {/* FRONT */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "40px 36px",
                    borderRadius: "12px",
                    border: t.recommended
                      ? `2px solid ${t.color}`
                      : "1px solid rgba(255,255,255,0.12)",
                    background: t.recommended
                      ? "rgba(254,181,44,0.08)"
                      : "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}>
                    {t.recommended && (
                      <span
                        className="type-label"
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "24px",
                          fontSize: "10px",
                          color: t.color,
                          background: "rgba(254,181,44,0.15)",
                          padding: "4px 10px",
                          borderRadius: "4px",
                        }}
                      >
                        Our Pick
                      </span>
                    )}

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "12px" }}>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 800,
                        fontSize: "36px",
                        color: "white",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        whiteSpace: "pre-line",
                      }}>
                        {t.hook}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-slab)",
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.35)",
                        fontStyle: "italic",
                      }}>
                        {t.subtext}
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "42px",
                        fontWeight: 800,
                        color: "white",
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        marginBottom: "4px",
                      }}>
                        Asheville.
                      </p>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "42px",
                        fontWeight: 800,
                        color: t.color,
                        marginBottom: "16px",
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                      }}>
                        {t.bigIdea}
                      </p>
                      <span style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.4)",
                      }}>
                        Flip to see the pitch &rarr;
                      </span>
                    </div>
                  </div>

                  {/* BACK */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "36px 32px",
                    borderRadius: "12px",
                    border: `2px solid ${t.color}`,
                    background: "rgba(30, 31, 56, 0.95)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}>
                    <div>
                      <span className="type-label" style={{ fontSize: "10px", color: t.color, marginBottom: "24px", display: "block" }}>
                        Territory {t.number}
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
                        {t.pitch.map((line, i) => (
                          <p key={i} style={{
                            fontFamily: "var(--font-slab)",
                            fontSize: "22px",
                            color: "rgba(255,255,255,0.65)",
                            lineHeight: 1.5,
                          }}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: "40px" }}>
                      <h3 style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "32px",
                        fontWeight: 800,
                        color: t.color,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        marginBottom: "20px",
                      }}>
                        Asheville.<br />{t.bigIdea}
                      </h3>
                      <span
                        onClick={(e) => { e.stopPropagation(); onNavigate?.(t.slideIndex); }}
                        style={{
                          display: "inline-block",
                          fontFamily: "var(--font-sans)",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: t.color,
                          border: `1px solid ${t.color}`,
                          padding: "10px 20px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Explore the Big Idea &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
