import type { SlideProps } from "../Deck";

const ACTIVATIONS = [
  {
    channel: "OOH",
    line: "Make something of it.",
    detail: "Market-specific billboards paired with single arresting images \u2014 hands on clay, a stranger sharing a meal, a songwriter mid-verse.",
    placeholder: "Billboard designs — 3 markets",
    color: "var(--color-goldenrod)",
  },
  {
    channel: "CTV / OLV",
    line: "Hero :30 + seasonal :15s",
    detail: "Cut-downs tailored to each season. Spring = trails. Summer = water. Fall = color. Winter = quiet.",
    placeholder: "Video cuts per season",
    color: "var(--color-blue-ridge)",
  },
  {
    channel: "Social",
    line: "What did you make of it?",
    detail: "UGC campaign. Visitors share what they made \u2014 a bowl, a friendship, a song, a version of themselves they didn\u2019t expect. The content IS the campaign.",
    placeholder: "Social templates + UGC kit",
    color: "var(--color-grove-park)",
  },
  {
    channel: "Display",
    line: "Dynamic creative by segment",
    detail: "Programmatic banners by audience. Enthusiasts see adventure. Traditionalists see heritage. Families see togetherness.",
    placeholder: "Banners — 4 segments x 5 seasons",
    color: "var(--color-fiddlehead)",
  },
  {
    channel: "Radio / Audio",
    line: "Mountain Elder voice",
    detail: "Warm, grounded, wry. Not a hard sell. A quiet invitation from someone who lives there.",
    placeholder: ":60 + :30 scripts",
    color: "var(--color-french-broad)",
  },
  {
    channel: "Print",
    line: "The raw material spread",
    detail: "Full-page in travel endemic. Hero photography — layered, genuine — with a single line.",
    placeholder: "Print ads — 2 variations",
    color: "var(--color-biltmore)",
  },
];

export function ActivationsSlide({}: SlideProps) {
  return (
    <div className="slide slide-deep" style={{ padding: "60px 80px" }}>
      <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
        Cross-Platform Activations
      </span>

      <h2 className="type-headline" style={{ marginTop: "12px", marginBottom: "40px", fontSize: "44px" }}>
        One platform. Every channel.
      </h2>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", alignItems: "stretch" }}>
        {ACTIVATIONS.map((a) => (
          <div
            key={a.channel}
            className="glass-light"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "28px 24px",
              borderTop: `2px solid ${a.color}`,
            }}
          >
            <span className="type-label" style={{ fontSize: "10px", color: a.color, marginBottom: "12px" }}>
              {a.channel}
            </span>
            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 700, color: "white", marginBottom: "10px", lineHeight: 1.2 }}>
              {a.line}
            </h4>
            <p style={{ fontFamily: "var(--font-slab)", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, flex: 1, marginBottom: "16px" }}>
              {a.detail}
            </p>
            <div className="asset-placeholder" style={{ height: "48px", fontSize: "10px" }}>
              {a.placeholder}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
