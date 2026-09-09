import type { SlideProps } from "../Deck";

const LINES = [
  "A castle in the mountains.",
  "A place where the road IS the destination.",
  "You joining a drum circle, foraging for dinner, and forgetting what day it is.",
];

export function Territory2Slide({}: SlideProps) {
  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px 120px",
        }}
      >
        {/* Label */}
        <span className="type-label" style={{ fontSize: "12px", color: "var(--color-french-broad)", marginBottom: "40px" }}>
          Territory 02
        </span>

        {/* Poetic copy — scene descriptions */}
        <div style={{ marginBottom: "48px", maxWidth: "1200px" }}>
          {LINES.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "30px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.55,
                marginBottom: "8px",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* The Big Idea */}
        <div>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "80px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}>
            ASHEVILLE.{" "}
            <span style={{ color: "var(--color-french-broad)" }}>
              SOUNDS MADE UP.
            </span>
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "32px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            marginTop: "16px",
          }}>
            It isn&apos;t.
          </p>
        </div>
      </div>
    </div>
  );
}
