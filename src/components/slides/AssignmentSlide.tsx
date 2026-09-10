"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const RUBRIC = [
  { name: "Sticky", test: "Is it memorable?" },
  { name: "Scalable", test: "Does it work across channels?" },
  { name: "Relatable", test: "Does it hit a human truth?" },
  { name: "Differentiated", test: "Is it ownable?" },
  { name: "On Equity", test: "Does it feel like the brand?" },
];

const CLIENT_CRITERIA = [
  { name: "Increase intent to visit", detail: "Among Explore Asheville\u2019s four target visitor profiles." },
  { name: "Improve brand favorability", detail: "vs. Charleston, Savannah, Greenville, and Chattanooga." },
  { name: "Demonstrate range", detail: "Show how the idea evolves across audiences, seasons, and channels." },
  { name: "Stay authentically Asheville", detail: "Build on what makes the city real, not what makes it marketable." },
];

export function AssignmentSlide({}: SlideProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="slide slide-deep" style={{ padding: "60px 80px" }}>
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
            The Assignment
          </span>
          <h2 className="type-billboard" style={{ marginTop: "12px", fontSize: "64px" }}>
            Find a big, ownable{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>Asheville idea.</span>
          </h2>
        </div>

        {/* Objectives */}
        <div style={{ display: "flex", gap: "32px", marginBottom: "32px" }}>
          <div style={{ flex: 1, display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-goldenrod)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "rgba(254,181,44,0.12)",
              padding: "4px 10px",
              borderRadius: "4px",
              flexShrink: 0,
              marginTop: "2px",
            }}>
              Primary
            </span>
            <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.6)", lineHeight: 1.45 }}>
              Increase intent to visit among Explore Asheville&apos;s four target audience
              visitor profiles and convert into visitors.
            </p>
          </div>
          <div style={{ flex: 1, display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-french-broad)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "rgba(155,209,214,0.12)",
              padding: "4px 10px",
              borderRadius: "4px",
              flexShrink: 0,
              marginTop: "2px",
            }}>
              Secondary
            </span>
            <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.6)", lineHeight: 1.45 }}>
              Improve brand favorability versus Asheville&apos;s comp set, including
              Charleston, SC; Savannah, GA; Greenville, SC; and Chattanooga, TN.
            </p>
          </div>
        </div>

        {/* Two clickable boxes side by side */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", alignItems: "stretch" }}>

          {/* How WE evaluate Big Ideas */}
          <div
            className="glass-light interactive"
            onClick={() => setLeftOpen(!leftOpen)}
            style={{
              padding: leftOpen ? "32px 32px" : "48px 40px",
              borderTop: "3px solid var(--color-goldenrod)",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "background 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {!leftOpen ? (
              /* Collapsed — bold, fills the space */
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h3 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "var(--color-goldenrod)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}>
                  How We Evaluate Big Ideas
                </h3>
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "200px",
                    fontWeight: 900,
                    color: "var(--color-goldenrod)",
                    opacity: 0.08,
                    position: "absolute",
                    right: "-10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    lineHeight: 1,
                  }}>
                    5
                  </span>
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "22px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, maxWidth: "500px", position: "relative" }}>
                    Every idea has to pass five tests before it leaves the room.
                    If it can&apos;t survive all five, it&apos;s not a Big Idea &mdash; it&apos;s a tagline.
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--color-goldenrod)", opacity: 0.5, position: "relative" }}>
                  Click to reveal &rarr;
                </span>
              </div>
            ) : (
              /* Expanded — the five tests */
              <>
                <h3 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--color-goldenrod)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}>
                  How We Evaluate Big Ideas
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                  {RUBRIC.map((r, i) => (
                    <div
                      key={r.name}
                      style={{
                        padding: "14px 18px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "8px",
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        animation: `child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms both`,
                      }}
                    >
                      <span style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "28px",
                        fontWeight: 800,
                        color: "var(--color-goldenrod)",
                        opacity: 0.3,
                        lineHeight: 1,
                        width: "32px",
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </span>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "white" }}>
                          {r.name}
                        </h4>
                        <p style={{ fontFamily: "var(--font-slab)", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                          {r.test}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* How YOU'LL evaluate them */}
          <div
            className="glass-light interactive"
            onClick={() => setRightOpen(!rightOpen)}
            style={{
              padding: rightOpen ? "32px 32px" : "48px 40px",
              borderTop: "3px solid var(--color-french-broad)",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "background 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {!rightOpen ? (
              /* Collapsed — bold, fills the space */
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h3 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "var(--color-french-broad)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}>
                  How You&apos;ll Evaluate Them
                </h3>
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "200px",
                    fontWeight: 900,
                    color: "var(--color-french-broad)",
                    opacity: 0.08,
                    position: "absolute",
                    right: "-10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    lineHeight: 1,
                  }}>
                    4
                  </span>
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "22px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, maxWidth: "500px", position: "relative" }}>
                    Attract higher-value travelers who stay longer, explore more,
                    and spend more &mdash; while staying authentically Asheville.
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--color-french-broad)", opacity: 0.5, position: "relative" }}>
                  Click to reveal &rarr;
                </span>
              </div>
            ) : (
              /* Expanded — the four criteria */
              <>
                <h3 style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--color-french-broad)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}>
                  How You&apos;ll Evaluate Them
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {CLIENT_CRITERIA.map((c, i) => (
                    <div
                      key={c.name}
                      style={{
                        padding: "16px 20px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "8px",
                        animation: `child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms both`,
                      }}
                    >
                      <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                        {c.name}
                      </h4>
                      <p style={{ fontFamily: "var(--font-slab)", fontSize: "15px", color: "rgba(255,255,255,0.4)" }}>
                        {c.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
