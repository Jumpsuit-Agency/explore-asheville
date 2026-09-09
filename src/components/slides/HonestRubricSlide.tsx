import type { SlideProps } from "../Deck";

const SCORES = [
  {
    criterion: "Does it come from truth?",
    answer: "Yes",
    evidence: "Their own promise — creative, independent, collaborative — reframed as a verb.",
  },
  {
    criterion: "Does it flex?",
    answer: "Yes",
    evidence: "Crafts, music, food, stories, human connection \u2014 each audience finds their own version of making.",
  },
  {
    criterion: "Does it invite participation?",
    answer: "Yes",
    evidence: "It\u2019s an invitation. Make a bowl. Make a friend. Make a different version of yourself.",
  },
  {
    criterion: "Does it compound?",
    answer: "Yes",
    evidence: "Every execution adds to it. Year two is stronger — more people making it.",
  },
  {
    criterion: "Is it ownable?",
    answer: "Yes",
    evidence: "Only Asheville has the maker culture and creative independence to say this credibly.",
  },
];

export function HonestRubricSlide({}: SlideProps) {
  return (
    <div className="slide slide-deep" style={{ padding: "80px 100px" }}>

      <div className="relative z-10 flex flex-col flex-1">
        <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
          The Honest Rubric
        </span>

        <h2 className="type-headline" style={{ marginTop: "20px", marginBottom: "16px", fontSize: "52px" }}>
          Scoring our own work.
        </h2>
        <p className="type-subhead" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "48px", fontSize: "22px" }}>
          We set the criteria on slide three. Here&apos;s how we hold ourselves to it.
        </p>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          {SCORES.map((s, i) => (
            <div
              key={s.criterion}
              className="glass-light stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "340px 80px 1fr",
                gap: "24px",
                alignItems: "center",
                padding: "24px 32px",
              }}
            >
              <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 700, color: "white" }}>
                {s.criterion}
              </h4>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--color-fiddlehead)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {s.answer}
              </span>
              <p style={{ fontFamily: "var(--font-slab)", fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                {s.evidence}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
