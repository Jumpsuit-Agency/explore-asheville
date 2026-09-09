import type { SlideProps } from "../Deck";

const PARAGRAPHS = [
  "Most destination campaigns ask people to come see what\u2019s already there.",
  "Make Something of It asks them to participate.",
  "Asheville is full of makers, musicians, chefs, artists, guides and people doing things with their hands. So instead of positioning the city as something to simply consume, we invite visitors to make contact with it \u2014 and make something of their own experience.",
  "That \u201Csomething\u201D might be literal: a bowl, a song, a meal.",
  "Or it might be less tangible: a connection, a memory, a new side of yourself.",
  "The idea works because it\u2019s both a brand promise and a creative system. It can flex across audiences, seasons and channels, while also opening the door to participation, local partnerships and self-organizing experiences.",
  "At its heart, it reframes Asheville from a place you visit into a place you take part in.",
];

export function Territory1DescSlide({}: SlideProps) {
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
          style={{ fontSize: "12px", color: "var(--color-grove-park)", marginBottom: "40px" }}
        >
          Territory 01 &middot; The Idea
        </span>

        <div style={{ maxWidth: "1100px", marginBottom: "56px" }}>
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: i === 0 || i === 1 ? "28px" : "22px",
                fontWeight: i === 0 || i === 1 ? 700 : 400,
                color: i === 0
                  ? "var(--color-grove-park)"
                  : i === 1
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                marginBottom: i === 1 || i === 4 ? "28px" : "12px",
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
          <span style={{ color: "var(--color-grove-park)" }}>
            MAKE SOMETHING OF IT.
          </span>
        </h2>
      </div>
    </div>
  );
}
