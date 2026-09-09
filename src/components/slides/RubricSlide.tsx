import type { SlideProps } from "../Deck";

const CLIENT_ASKS = [
  "Campaign concept / big idea",
  "Tagline or thematic line",
  "Television — :60, :30, :15",
  "Radio — :60, :30",
  "Print / OOH",
  "Digital / Social creative",
  "Bring It to Life activation",
];

const JUMPSUIT_CRITERIA = [
  { q: "Does it come from truth?", d: "Rooted in the brand's own language." },
  { q: "Does it flex?", d: "Works across audiences, seasons, markets, channels." },
  { q: "Does it invite participation?", d: "Generates action, not just awareness." },
  { q: "Does it compound?", d: "Gets stronger with every execution." },
  { q: "Is it ownable?", d: "Only this brand could say it." },
];

export function RubricSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: "80px 100px" }}>
      <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
        The Rubric
      </span>

      <h2 className="type-headline" style={{ marginTop: "20px", marginBottom: "60px", fontSize: "48px" }}>
        Your deliverables. Our criteria.
      </h2>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "start" }}>
        {/* Left — what they asked for */}
        <div>
          <span className="type-label" style={{ color: "var(--color-grove-park)", fontSize: "11px", marginBottom: "24px", display: "block" }}>
            What you asked for
          </span>
          <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {CLIENT_ASKS.map((item) => (
              <div
                key={item}
                className="glass-light"
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-grove-park)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.85)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Jumpsuit criteria */}
        <div>
          <span className="type-label" style={{ color: "var(--color-french-broad)", fontSize: "11px", marginBottom: "24px", display: "block" }}>
            How Jumpsuit evaluates Big Ideas
          </span>
          <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {JUMPSUIT_CRITERIA.map((c, i) => (
              <div key={c.q} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.06)",
                  lineHeight: 1,
                  minWidth: "48px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                    {c.q}
                  </h4>
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "17px", color: "rgba(255,255,255,0.45)" }}>
                    {c.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
