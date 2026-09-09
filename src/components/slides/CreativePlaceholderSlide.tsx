import type { SlideProps } from "../Deck";

interface CreativePlaceholderProps extends SlideProps {
  territory: string;
  territoryColor: string;
  slots: { label: string; desc: string }[];
}

export function CreativePlaceholderSlide({ territory, territoryColor, slots }: CreativePlaceholderProps) {
  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 100px" }}>
        <div style={{ marginBottom: "48px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: territoryColor, marginBottom: "12px", display: "block" }}>
            {territory} &middot; Sample Creative
          </span>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}>
            What this looks like{" "}
            <span style={{ color: territoryColor }}>in the wild.</span>
          </h2>
        </div>

        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(${slots.length}, 1fr)`,
          gap: "24px",
          alignItems: "stretch",
        }}>
          {slots.map((slot) => (
            <div
              key={slot.label}
              className="asset-placeholder"
              style={{
                flexDirection: "column",
                gap: "12px",
                padding: "40px 32px",
                borderColor: `color-mix(in srgb, ${territoryColor} 30%, transparent)`,
              }}
            >
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 700,
                color: territoryColor,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}>
                {slot.label}
              </span>
              <span style={{
                fontFamily: "var(--font-slab)",
                fontSize: "16px",
                color: "rgba(255,255,255,0.3)",
                textTransform: "none",
                letterSpacing: "0",
                textAlign: "center",
                maxWidth: "280px",
                lineHeight: 1.5,
              }}>
                {slot.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
