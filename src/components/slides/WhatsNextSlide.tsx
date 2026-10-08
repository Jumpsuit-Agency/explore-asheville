import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

/**
 * Deliberately mirrors Why This Works, which sits immediately before it:
 * same eyebrow, same card geometry, same closing line underneath. The two
 * read as one argument — here is why it works, here is what we do Monday.
 */
const STEPS = [
  {
    title: "Launch “Signs” on social. Immediately.",
    desc: "Put the messaging in market now and learn from real-time insight rather than waiting on production.",
  },
  {
    title: "Activate the local community.",
    desc: "Businesses, artists and personalities become the content creators — the lore spreads because locals are telling it.",
  },
  {
    title: "Pop up in the drive markets.",
    desc: "Guerrilla marketing and activations in the immediate drive markets, aimed at same-week travelers.",
  },
];

export function WhatsNextSlide({}: SlideProps) {
  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
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
        <span className="type-label" style={{ fontSize: "18px", color: COLOR, marginBottom: "24px" }}>
          What&rsquo;s Next?
        </span>

        <div style={{ display: "flex", gap: "32px", marginBottom: "48px" }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "28px 24px",
                borderRadius: "12px",
                border: "1.5px solid rgba(254,181,44,0.25)",
                background: "rgba(254,181,44,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "rgba(254,181,44,0.55)",
                  marginBottom: "12px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
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
                {s.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "26px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          This creates a virtuous cycle of content and conversation that lays the groundwork for
          Spring. Fully-produced Spring creative then feels like it{" "}
          <span style={{ color: COLOR, fontWeight: 600 }}>belongs in the campaign</span>, and less
          like it&rsquo;s the launch.
        </p>
      </div>
    </div>
  );
}
