import type { SlideProps } from "../Deck";

const PROOF_POINTS = [
  {
    label: "Their Promise, as an Instruction",
    body: "\"Creative, independent, collaborative, open.\" \"Drawn together to stand out.\" We turned their own words into a verb.",
    source: "Storytelling Foundation, p. 5",
    color: "var(--color-goldenrod)",
  },
  {
    label: "Their Archetypes, Activated",
    body: "The Quest and Cinderella archetypes both live inside \"make something of it\" — every visitor arrives with raw material and leaves transformed.",
    source: "Storytelling Foundation, pp. 7-9",
    color: "var(--color-french-broad)",
  },
  {
    label: "Four Segments, One Line",
    body: "Enthusiasts: \"Make a bucket-list moment.\" Traditionalists: \"Make a tradition.\" Families: \"Make a memory.\" Value Seekers: \"Make the most of it.\"",
    source: "MMGY Visitor Profiles",
    color: "var(--color-fiddlehead)",
  },
  {
    label: "Cultural Position",
    body: "Maker movement, craft economy, DIY culture — Asheville is already synonymous with making. We named a position that already exists.",
    color: "var(--color-grove-park)",
  },
  {
    label: "Competitive Edge",
    body: "Other destinations describe. This one instructs. Active, not passive. Verb energy. Ownable — try putting it on another city. It doesn't land.",
    color: "var(--color-ridge-mid)",
  },
  {
    label: "The Paradox, Resolved",
    body: "\"Drawn together to stand out.\" Making is personal and shareable at the same time. The campaign's paradox IS Asheville's paradox.",
    source: "Storytelling Foundation, p. 13",
    color: "var(--color-biltmore)",
  },
];

export function WhyItWorksSlide({}: SlideProps) {
  return (
    <div className="slide slide-cream" style={{ padding: "80px 100px" }}>
      <span className="type-label" style={{ color: "var(--color-blue-ridge)" }}>
        Why It Works
      </span>

      <h2 className="type-headline" style={{ marginTop: "16px", marginBottom: "48px", fontSize: "52px", color: "#1E1F38" }}>
        We didn&apos;t invent new language.<br />
        <span style={{ color: "var(--color-blue-ridge)" }}>We activated yours.</span>
      </h2>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", alignItems: "start" }}>
        {PROOF_POINTS.map((p) => (
          <div
            key={p.label}
            style={{
              padding: "28px",
              background: "white",
              borderRadius: "12px",
              borderTop: `2px solid ${p.color}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 700, color: p.color, marginBottom: "10px" }}>
              {p.label}
            </h4>
            <p style={{ fontFamily: "var(--font-slab)", fontSize: "15px", color: "#4a4a4a", lineHeight: 1.6 }}>
              {p.body}
            </p>
            {p.source && (
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#999", marginTop: "12px", display: "block" }}>
                {p.source}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
