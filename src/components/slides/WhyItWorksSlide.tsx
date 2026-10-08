import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const POINTS = [
  {
    title: "It puts heads in beds.",
    desc: "Every touchpoint \u2014 every sign, every sighting, every Sas appearance \u2014 is designed to move someone from curious to booked. The campaign doesn\u2019t just build awareness. It builds intent.",
  },
  {
    title: "A story people want to tell.",
    desc: "A Sasquatch wheat-pasting posters generates press, social, and search without a media buy. The campaign creates its own earned media engine.",
  },
  {
    title: "It compounds over time.",
    desc: "Sas isn\u2019t a flight. He\u2019s a character with a story arc that extends across seasons, markets, and platforms. Every phase builds on the last.",
  },
  {
    title: "It makes Asheville the main character.",
    desc: "Sas doesn\u2019t steal the show \u2014 he points people toward it. The mountains, the food, the people, the weirdness. He\u2019s the sign. Asheville is the destination.",
  },
];

export function WhyItWorksSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 120px",
        }}
      >
        <span
          className="type-label"
          style={{ fontSize: "18px", color: COLOR, marginBottom: "24px" }}
        >
          Why This Works
        </span>

        <div style={{ display: "flex", gap: "32px", marginBottom: "48px" }}>
          {POINTS.map((p, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "28px 24px",
                borderRadius: "12px",
                border: "1.5px solid rgba(254,181,44,0.25)",
                background: "rgba(254,181,44,0.05)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: COLOR,
                  lineHeight: 1.3,
                  marginBottom: "10px",
                }}
              >
                {p.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-slab)",
              fontSize: "32px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            And it works because{" "}
            <span style={{ color: COLOR, fontWeight: 700 }}>
              it&apos;s art.
            </span>
          </p>
          <p
            style={{
              fontFamily: "var(--font-slab)",
              fontSize: "28px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.5,
              maxWidth: "800px",
              margin: "20px auto 0",
            }}
          >
            This is Asheville. A city built by Appalachian artists, makers, and
            misfits. Why would we sell it with anything less than art?
          </p>
        </div>
      </div>
    </div>
  );
}
