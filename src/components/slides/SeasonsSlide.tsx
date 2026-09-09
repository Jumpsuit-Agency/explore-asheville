import type { SlideProps } from "../Deck";

const SEASONS = [
  {
    name: "Spring",
    dates: "Mar — May",
    line: "Make a fresh start of it.",
    color: "var(--color-fiddlehead)",
    tone: "Renewal. Trails waking up. Wildflowers on the Parkway. You don't just visit — you start something.",
    executions: ["OOH: short-haul markets", "Social: time-lapse blooming", "CTV :15 — trail + brewery"],
  },
  {
    name: "Summer",
    dates: "Jun — Sep",
    line: "Make an adventure of it.",
    color: "var(--color-goldenrod)",
    tone: "Water. Mountains. Family. The French Broad is running. This is where families make traditions.",
    executions: ["Family CTV :30", "Energetic Families display", "Audio: Mountain Elder VO"],
  },
  {
    name: "Fall",
    dates: "Sep — Nov",
    line: "Make a tradition of it.",
    color: "var(--color-grove-park)",
    tone: "Color. Harvest. Return visits. The Blue Ridge in October — no photograph has ever captured it.",
    executions: ["Print: travel endemic", "CTV :15 — foliage + food", "Retargeting: past visitors"],
  },
  {
    name: "Holiday",
    dates: "Nov — Dec",
    line: "Make a gift of it.",
    color: "var(--color-french-broad)",
    tone: "The anti-gift holiday. Give an experience, not a thing. Asheville is the gift that doesn't fit in a box.",
    executions: ["Gift partnerships", "Social: anti-gift", "Email: \"Give them something\""],
  },
  {
    name: "Winter",
    dates: "Jan — Feb",
    line: "Make a getaway of it.",
    color: "var(--color-ridge-mid)",
    tone: "Quiet Asheville. Couples. Intimate, unhurried. The breweries have seats by the fire. The trails are empty.",
    executions: ["CTV :15 — fireside", "OOH: drive markets", "Paid search: winter trips"],
  },
];

export function SeasonsSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: "60px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
          Five Seasons
        </span>
        <h2 className="type-headline" style={{ marginTop: "12px", fontSize: "44px" }}>
          Every season has its own way of making.
        </h2>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", alignItems: "stretch" }}>
        {SEASONS.map((s) => (
          <div
            key={s.name}
            className="glass-light"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px",
              borderTop: `2px solid ${s.color}`,
            }}
          >
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "24px", fontWeight: 800, color: "white", marginBottom: "2px" }}>
              {s.name}
            </h3>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>
              {s.dates}
            </span>

            <p style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "19px", color: s.color, marginBottom: "16px", lineHeight: 1.25 }}>
              &ldquo;{s.line}&rdquo;
            </p>

            <p style={{ fontFamily: "var(--font-slab)", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, flex: 1, marginBottom: "16px" }}>
              {s.tone}
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
              <span className="type-label" style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", marginBottom: "6px", display: "block" }}>
                Executions
              </span>
              {s.executions.map((ex) => (
                <p key={ex} style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.35)", padding: "2px 0" }}>
                  {ex}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
