import type { SlideProps } from "../Deck";

const PARAGRAPHS = [
  "Most destination campaigns try to convince people to visit.",
  "How Many Signs Do You Need? suggests they already know.",
  "Some places keep showing up in your life \u2014 in a song, on a tee shirt, in a conversation for the third time. Asheville is one of those places. Instead of making a case, we lean into the magnetism. The campaign treats the city as something that\u2019s already been calling.",
  "The \u201Csigns\u201D create a retargeting logic that works at every level \u2014 literal (billboards, ads, social) and figurative (coincidences, recommendations, dreams). Each touchpoint reinforces the feeling that Asheville isn\u2019t just an option. It\u2019s the one that won\u2019t leave you alone.",
  "The idea works because it turns passive awareness into active urgency. It\u2019s bold, a little mystical, and unmistakably Asheville \u2014 the kind of confidence no competitor would dare claim.",
  "At its heart, it reframes Asheville from a place you consider into a place that\u2019s been considering you.",
];

export function Territory3DescSlide({}: SlideProps) {
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
        <span
          className="type-label"
          style={{ fontSize: "12px", color: "var(--color-goldenrod)", marginBottom: "40px" }}
        >
          Territory 03 &middot; The Idea
        </span>

        <div style={{ maxWidth: "1100px", marginBottom: "56px" }}>
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: i === 0 || i === 1 ? "28px" : "22px",
                fontWeight: i === 1 ? 700 : 400,
                color: i === 1
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                marginBottom: i === 1 ? "28px" : "12px",
              }}
            >
              {p}
            </p>
          ))}
        </div>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "72px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          ASHEVILLE.{" "}
          <span style={{ color: "var(--color-goldenrod)" }}>
            HOW MANY SIGNS{" "}
            <br />
            DO YOU NEED?
          </span>
        </h2>
      </div>
    </div>
  );
}
