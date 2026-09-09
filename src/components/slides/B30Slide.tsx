import type { SlideProps } from "../Deck";

const IDEAS = [
  {
    territory: "Sounds Made Up",
    name: "Sample Asheville",
    color: "var(--color-french-broad)",
    desc: "Build a living public library of real Asheville sounds: rivers, kitchens, workshops, porches, venues, voices, tools, streets, stories. Musicians, DJs, producers, and visitors can sample and remix those sounds and contribute new work back into the commons \u2014 spreading across social, Spotify, and beyond.",
  },
  {
    territory: "Make Something of It",
    name: "Open Source Asheville",
    color: "var(--color-grove-park)",
    desc: "Release Asheville source material into the commons: archival images, patterns, recipes, phrases, stories, craft forms, natural textures. Local artists, chefs, designers, makers, filmmakers, musicians, and visitors remix that material into new work that spreads outward socially.",
  },
  {
    territory: "How Many Signs Do You Need?",
    name: "Send a Sign",
    color: "var(--color-goldenrod)",
    desc: "Locals, artists, businesses, musicians, makers, residents, and guides create small Asheville \u201Csigns\u201D and send them outward into the world. Handwritten letters, objects, posters, postcards, songs, cryptic invitations, artifacts, or unexpected digital moments that make Asheville keep showing up outside Asheville.",
  },
];

export function B30Slide({}: SlideProps) {
  return (
    <div className="slide" style={{ padding: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(30, 31, 56, 0.88)" }} />

      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 100px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="type-label" style={{ color: "var(--color-jumpsuit-gold)", marginBottom: "16px", fontSize: "14px", display: "block" }}>
            Business 3.0 Lens
          </span>
          <h2 className="type-billboard" style={{ fontSize: "56px" }}>
            Campaigns that{" "}
            <span style={{ color: "var(--color-jumpsuit-gold)" }}>self-organize.</span>
          </h2>
          <p className="type-subhead" style={{ color: "rgba(255,255,255,0.45)", fontSize: "22px", marginTop: "12px", maxWidth: "1100px" }}>
            Each platform has a B3.0 activation built in &mdash; decentralized, self-organizing
            networks where the community creates the campaign and spreads it outward through social.
          </p>
        </div>

        {/* Three idea cards */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", alignItems: "stretch" }}>
          {IDEAS.map((idea) => (
            <div
              key={idea.name}
              className="glass-light"
              style={{
                padding: "32px 28px",
                borderTop: `3px solid ${idea.color}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="type-label" style={{ fontSize: "10px", color: idea.color, marginBottom: "12px" }}>
                {idea.territory}
              </span>
              <h3 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "28px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}>
                {idea.name}
              </h3>
              <p style={{
                fontFamily: "var(--font-slab)",
                fontSize: "16px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                flex: 1,
              }}>
                {idea.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
