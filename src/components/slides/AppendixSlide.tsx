import type { SlideProps } from "../Deck";

export function AppendixSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "96px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Appendix
        </h2>
      </div>
    </div>
  );
}
