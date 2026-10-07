import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

export function Territory3GuerillaIntroSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <span
          className="type-label"
          style={{ fontSize: "18px", color: COLOR, marginBottom: "24px" }}
        >
          Territory 03 &middot; Campaign Extension
        </span>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "64px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: "1000px",
          }}
        >
          What if someone&apos;s been behind all the signs the entire time?
        </h2>
        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "28px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "800px",
            marginTop: "32px",
          }}
        >
          Someone so obsessed with Asheville they couldn&apos;t help themselves.{" "}
          <span style={{ color: COLOR }}>And now they&apos;re ready to be seen.</span>
        </p>
      </div>
    </div>
  );
}
