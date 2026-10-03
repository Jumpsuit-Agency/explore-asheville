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
          Territory 03 &middot; Guerrilla
        </span>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "72px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          But guerrilla marketing is really where the campaign{" "}
          <span style={{ color: COLOR }}>gets its legs.</span>
        </h2>
      </div>
    </div>
  );
}
