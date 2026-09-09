import type { SlideProps } from "../Deck";

const SIGNS = [
  "In a song.",
  "On a tee shirt.",
  "In a dream.",
  "In an ad.",
  "In a conversation for the third time.",
];

export function Territory3Slide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-goldenrod)" }}>
            Territory 03
          </span>
        </div>

        {/* Opening lines */}
        <p style={{
          fontFamily: "var(--font-slab)",
          fontSize: "30px",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.55,
          marginBottom: "8px",
          maxWidth: "1200px",
        }}>
          Some places you visit. And some places have been visiting you.
        </p>

        {/* The signs — stacked, building rhythm */}
        <div style={{ marginBottom: "8px" }}>
          {SIGNS.map((sign, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "30px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.55,
              }}
            >
              {sign}
            </p>
          ))}
        </div>

        {/* The turn */}
        <p style={{
          fontFamily: "var(--font-slab)",
          fontSize: "30px",
          color: "rgba(255,255,255,0.4)",
          fontStyle: "italic",
          marginBottom: "60px",
        }}>
          At some point, you have to wonder if it&apos;s still a coincidence.
        </p>

        {/* The Big Idea — massive */}
        <h2 style={{
          fontFamily: "var(--font-sans)",
          fontSize: "80px",
          fontWeight: 800,
          color: "white",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
        }}>
          ASHEVILLE.{" "}
          <span style={{ color: "var(--color-goldenrod)" }}>
            HOW MANY SIGNS<br />DO YOU NEED?
          </span>
        </h2>
      </div>
    </div>
  );
}
