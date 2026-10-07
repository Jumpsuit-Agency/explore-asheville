import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

export function Territory3CompostSlide({}: SlideProps) {
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
          Territory 03 &middot; Composting the Campaign
        </span>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: "1000px",
          }}
        >
          When Sas is done,{" "}
          <span style={{ color: COLOR }}>the story doesn&apos;t end.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "26px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "800px",
            marginTop: "32px",
          }}
        >
          Maybe a human steps into the role of Head of Lore. Maybe another
          mythical creature picks up where Sas left off. We don&apos;t know yet
          &mdash; and that&apos;s the point.
        </p>
        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "26px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "800px",
            marginTop: "24px",
          }}
        >
          Every version of the campaign feeds the next one. The character
          changes, but the mechanism stays:{" "}
          <span style={{ color: COLOR }}>
            the signs never stop.
          </span>
        </p>
        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "32px",
            fontWeight: 700,
            color: COLOR,
            lineHeight: 1.4,
            textAlign: "center",
            maxWidth: "800px",
            marginTop: "48px",
          }}
        >
          How many signs do you need?
        </p>
      </div>
    </div>
  );
}
