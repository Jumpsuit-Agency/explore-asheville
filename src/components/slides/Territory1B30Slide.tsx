"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

interface ArcStep {
  step: string;
  src: string;
}

interface ArcExample {
  seed: string;
  arc: ArcStep[];
}

const EXAMPLES: ArcExample[] = [
  {
    seed: "The sky",
    arc: [
      { step: "A visitor finds a moment worth making something of.", src: "/creative/chain-1-moment.png" },
      { step: "The visitor leaves the moment behind.", src: "/creative/chain-2-secret.png" },
      { step: "A local turns it into a ritual.", src: "/creative/chain-3-ritual.png" },
      { step: "A business turns the ritual into an experience.", src: "/creative/chain-4-experience.png" },
      { step: "An artist turns the experience into the next ad.", src: "/creative/arc-5-winter-poster.png" },
    ],
  },
  {
    seed: "The wheel",
    arc: [],
  },
  {
    seed: "The handpan",
    arc: [],
  },
];

export function Territory1B30Slide({}: SlideProps) {
  const [activeExample, setActiveExample] = useState(0);
  const [fullscreen, setFullscreen] = useState<number | null>(null);

  const arc = EXAMPLES[activeExample].arc;

  return (
    <div className="slide" style={{ padding: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(30, 31, 56, 0.92)" }} />

      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "50px 100px 40px" }}>
        {/* Top — Label + Headline + Setup */}
        <div style={{ marginBottom: "6px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-grove-park)", marginBottom: "8px", display: "block" }}>
            Territory 01 &middot; Business 3.0 Lens
          </span>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "44px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "10px",
          }}>
            HOW THIS COULD{" "}
            <span style={{ color: "var(--color-grove-park)" }}>COME ALIVE.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-slab)",
            fontSize: "15px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.55,
            maxWidth: "800px",
          }}>
            Business 3.0 starts with a question, not a plan. Instead of defining
            Asheville from the center, we create the conditions for visitors, locals,
            makers and businesses to shape it together.
          </p>
        </div>

        {/* Hero Question */}
        <div style={{
          padding: "16px 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "16px",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "42px",
            fontWeight: 800,
            color: "var(--color-grove-park)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}>
            WHAT IF EVERYONE WHO TOUCHED ASHEVILLE<br />
            COULD HELP SHAPE WHAT ASHEVILLE BECOMES?
          </p>
        </div>

        {/* Toggle buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.seed}
              onClick={() => { setActiveExample(i); setFullscreen(null); }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 700,
                color: i === activeExample ? "white" : "rgba(255,255,255,0.4)",
                background: i === activeExample ? "var(--color-grove-park)" : "rgba(255,255,255,0.06)",
                border: i === activeExample ? "none" : "1px solid rgba(255,255,255,0.1)",
                padding: "8px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              {ex.seed}
            </button>
          ))}
        </div>

        {/* Arc image strip */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minHeight: 0,
        }}>
          {arc.length > 0 ? arc.map((c, i) => (
            <div key={c.src} style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
              {i > 0 && (
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--color-grove-park)",
                  flexShrink: 0,
                }}>
                  &rarr;
                </span>
              )}
              <div
                onClick={() => setFullscreen(i)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  cursor: "pointer",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                }}
              >
                <img
                  src={c.src}
                  alt={c.step}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    aspectRatio: "16/9",
                    animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px 8px 6px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                }}>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.3,
                  }}>
                    {c.step}
                  </span>
                </div>
              </div>
            </div>
          )) : (
            <div className="asset-placeholder" style={{ flex: 1, height: "200px", fontSize: "16px" }}>
              Creative — Coming Soon
            </div>
          )}
        </div>

        {/* Payoff */}
        <div style={{
          borderLeft: "3px solid var(--color-grove-park)",
          paddingLeft: "20px",
          marginTop: "16px",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}>
            ASHEVILLE MAKES THE MOMENT.
            SOMEONE MAKES SOMETHING OF IT.
            SOMEONE ELSE MAKES SOMETHING OF THAT.{" "}
            <span style={{ color: "var(--color-grove-park)" }}>THE BEST OF IT BECOMES THE AD.</span>
          </p>
        </div>
      </div>

      {/* Fullscreen image overlay */}
      {fullscreen !== null && arc.length > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 60px",
            animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--color-grove-park)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "8px",
          }}>
            {EXAMPLES[activeExample].seed} &middot; Step {fullscreen + 1} of {arc.length}
          </span>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "24px",
            fontWeight: 800,
            color: "white",
            marginBottom: "24px",
            textAlign: "center",
          }}>
            {arc[fullscreen].step}
          </p>

          <img
            key={arc[fullscreen].src}
            src={arc[fullscreen].src}
            alt={arc[fullscreen].step}
            style={{
              maxWidth: "90%",
              maxHeight: "60%",
              objectFit: "contain",
              borderRadius: "8px",
              animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "24px" }}>
            <button
              onClick={() => setFullscreen(fullscreen > 0 ? fullscreen - 1 : arc.length - 1)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &larr;
            </button>
            {fullscreen < arc.length - 1 ? (
              <button
                onClick={() => setFullscreen(fullscreen + 1)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                  background: "var(--color-grove-park)",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Pretend it&apos;s linear &rarr;
              </button>
            ) : (
              <button
                onClick={() => setFullscreen(null)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                  background: "var(--color-grove-park)",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Back to slide
              </button>
            )}
            <button
              onClick={() => setFullscreen(fullscreen < arc.length - 1 ? fullscreen + 1 : 0)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
