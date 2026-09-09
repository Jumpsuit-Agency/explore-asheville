import type { SlideProps } from "../Deck";

const AUDIENCES = [
  {
    name: "Experience Enthusiasts",
    age: "55\u201364 \u00B7 HHI $158K",
    imageDesc: "Asheville tee shirt on the stranger in front of you at a concert",
    color: "var(--color-goldenrod)",
  },
  {
    name: "Traveling Traditionalists",
    age: "65\u201374 \u00B7 HHI $93K",
    imageDesc: "Asheville bumper sticker on car in front of you",
    color: "var(--color-french-broad)",
  },
  {
    name: "Energetic Families",
    age: "45\u201354 \u00B7 HHI $115K",
    imageDesc: "The family calendar with one suspiciously empty weekend",
    color: "var(--color-fiddlehead)",
  },
  {
    name: "Value Seekers",
    age: "35\u201344 \u00B7 HHI $88K",
    imageDesc: "The flight price that drops the day you check again",
    color: "var(--color-grove-park)",
  },
];

export function Territory3AudienceSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 100px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-goldenrod)", marginBottom: "12px", display: "block" }}>
            How Many Signs Do You Need? &middot; By Audience
          </span>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}>
            Every audience has{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>their own signs.</span>
          </h2>
        </div>

        {/* Four audience cards */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          alignItems: "stretch",
        }}>
          {AUDIENCES.map((a) => (
            <div
              key={a.name}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                border: `1px solid rgba(255,255,255,0.1)`,
                overflow: "hidden",
              }}
            >
              {/* Key visual placeholder */}
              <div
                className="asset-placeholder"
                style={{
                  height: "300px",
                  borderRadius: "0",
                  border: "none",
                  borderBottom: `2px solid ${a.color}`,
                  fontSize: "11px",
                  flexShrink: 0,
                  flexDirection: "column",
                  padding: "24px",
                  gap: "8px",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "none",
                  letterSpacing: "0",
                  textAlign: "center",
                  lineHeight: 1.4,
                  maxWidth: "240px",
                }}>
                  {a.imageDesc}
                </span>
              </div>

              {/* Audience info + tagline */}
              <div style={{
                padding: "24px 20px",
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
              }}>
                <div>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: a.color,
                    marginBottom: "2px",
                  }}>
                    {a.name}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.3)",
                  }}>
                    {a.age}
                  </p>
                </div>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--color-goldenrod)",
                  lineHeight: 1.2,
                  marginTop: "16px",
                }}>
                  How many signs<br />do you need?
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
