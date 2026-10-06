import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const GRID: { src: string; alt: string }[] = [
  // Col 1
  { src: "/creative/t3-1111-mountain-night.webp", alt: "11:11 — Good. You noticed." },
  { src: "/creative/t3-calendar-opening.webp", alt: "Calendar — Found an opening. Asheville All Weekend." },
  // Col 2
  { src: "/creative/t3-222-round-trip.webp", alt: "$222 Round Trip — At some point it stops being a coincidence" },
  { src: "/creative/t3-maps-light-traffic.webp", alt: "Maps — Asheville 4hr 52min, Light Traffic. Looks like another sign." },
  // Col 3
  { src: "/creative/t3-save-33-weekend.webp", alt: "Save 33% This Weekend — The universe is basically packing your bag" },
  { src: "/creative/t3-weather-feels-like.webp", alt: "Weather — 48° Clear. Feels like: You should be here." },
  // Col 4 — tall
  { src: "/creative/t3-instagram-full-profile.webp", alt: "Instagram — Asheville Started Following You — full profile" },
];

export function Territory3DigitalMontageSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{ padding: "48px 80px 40px", width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <span className="type-label" style={{ fontSize: "18px", color: COLOR }}>
              Territory 03
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 700,
                color: COLOR,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background: "rgba(254,181,44,0.15)",
                padding: "3px 10px",
                borderRadius: "4px",
              }}
            >
              Our Pick
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "48px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            The signs are everywhere.{" "}
            <span style={{ color: COLOR }}>And everything&apos;s a sign.</span>{" "}
            <span style={{ fontSize: "26px", fontWeight: 600, color: "rgba(255,255,255,0.35)", verticalAlign: "middle" }}>Digital</span>
          </h2>
        </div>

        {/* Montage: 3 cols of 2 + 1 tall column */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1.2fr",
            gridTemplateRows: "1fr 1fr",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {/* Col 1 Top */}
          <div style={{ gridColumn: "1", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0s both" }}>
            <img src={GRID[0].src} alt={GRID[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Col 1 Bottom */}
          <div style={{ gridColumn: "1", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.06s both" }}>
            <img src={GRID[1].src} alt={GRID[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Col 2 Top */}
          <div style={{ gridColumn: "2", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both" }}>
            <img src={GRID[2].src} alt={GRID[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Col 2 Bottom */}
          <div style={{ gridColumn: "2", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both" }}>
            <img src={GRID[3].src} alt={GRID[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Col 3 Top */}
          <div style={{ gridColumn: "3", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both" }}>
            <img src={GRID[4].src} alt={GRID[4].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Col 3 Bottom */}
          <div style={{ gridColumn: "3", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
            <img src={GRID[5].src} alt={GRID[5].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Col 4 — spans both rows */}
          <div style={{ gridColumn: "4", gridRow: "1 / 3", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both" }}>
            <img src={GRID[6].src} alt={GRID[6].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
