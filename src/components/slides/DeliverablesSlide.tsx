"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const FORMATS = [
  "Social content suite (static and motion)",
  "Display / programmatic banners",
  "One audience-specific edit or concept",
  "OOH concept",
  "Print concept",
  "Audio concept",
];

export function DeliverablesSlide({}: SlideProps) {
  const [wildOpen, setWildOpen] = useState(false);

  return (
    <div className="slide slide-deep" style={{ padding: "60px 80px" }}>
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
            The Assignment
          </span>
          <h2 className="type-billboard" style={{ marginTop: "12px", fontSize: "56px" }}>
            Show us the idea&apos;s{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>range.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-slab)", fontSize: "22px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: "16px", maxWidth: "1100px" }}>
            Pick whichever formats best fit the strength of the concept.
            Not all are required &mdash; but each should include visuals, specific copy,
            and the strategy behind it.
          </p>
        </div>

        {/* Two columns */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", alignItems: "stretch" }}>

          {/* Left — Formats */}
          <div
            className="glass-light"
            style={{
              padding: "36px 36px",
              borderTop: "3px solid var(--color-goldenrod)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{
              fontFamily: "var(--font-sans)",
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--color-goldenrod)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}>
              Formats
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              {FORMATS.map((f, i) => (
                <div
                  key={f}
                  style={{
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "8px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "center",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "var(--color-goldenrod)",
                    opacity: 0.25,
                    lineHeight: 1,
                    width: "28px",
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 600, color: "white" }}>
                    {f}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bring It to Life */}
          <div
            className="glass-light"
            onClick={() => setWildOpen(!wildOpen)}
            style={{
              padding: "36px 36px",
              borderTop: "3px solid var(--color-fiddlehead)",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <h3 style={{
              fontFamily: "var(--font-sans)",
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--color-fiddlehead)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}>
              Bring It to Life
            </h3>

            {!wildOpen ? (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ position: "relative" }}>
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "22px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, position: "relative" }}>
                    Beyond the core deliverables, show us how you&apos;d extend this platform
                    in ways that <span style={{ color: "var(--color-fiddlehead)", fontWeight: 600 }}>surprise us.</span>
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--color-fiddlehead)", opacity: 0.5 }}>
                  Click to read the full brief &rarr;
                </span>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.55,
                  animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}>
                  This could be an unexpected take within a familiar medium, or something
                  that breaks from traditional media entirely. Show us how your big idea
                  could create real visibility and engagement for the Asheville area beyond
                  standard advertising units, building interest and anticipation ahead of a visit.
                </p>
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                  animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) 100ms both",
                }}>
                  No prescribed format. This is a chance to showcase strategic imagination
                  and craft &mdash; and a meaningful part of how they&apos;ll think about fit
                  with their long-term creative partner.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
