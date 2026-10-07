import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const GRID: { src: string; alt: string }[] = [
  { src: "/creative/t3-in-destination-flatlay.png", alt: "In-destination hospitality flat lay — coffee sleeves, key cards, matchbooks, luggage tags" },
  { src: "/creative/t3-expect-delays-billboard.png", alt: "Expect Delays. You'll Want to Stay a While. How Many Signs Do You Need? — highway billboard" },
  { src: "/creative/t3-ctv-holiday-tradition.png", alt: "CTV spot — This Is Your Sign to Start a Holiday Tradition — Asheville downtown winter scene" },
  { src: "/creative/t3-hotel-elevator-conference.png", alt: "Hotel elevator wrap — Stay an Extra Day or Two? Conference Today. Adventure Tomorrow?" },
];

export function Territory3InDestinationSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{ padding: "48px 80px 40px", width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <span className="type-label" style={{ fontSize: "12px", color: COLOR }}>
              Territory 03
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
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
            <span style={{ fontSize: "20px", fontWeight: 600, color: "rgba(255,255,255,0.35)", verticalAlign: "middle" }}>In-Destination</span>
          </h2>
        </div>

        {/* Content — 3 cols: top row = flat lay + CTV + elevator, bottom row = billboard wide + elevator cont. */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {/* Top left — flat lay */}
          <div style={{ gridColumn: "1", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0s both" }}>
            <img src={GRID[0].src} alt={GRID[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          </div>
          {/* Top middle — CTV */}
          <div style={{ gridColumn: "2", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}>
            <img src={GRID[2].src} alt={GRID[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Right — elevator/conference, spans both rows */}
          <div style={{ gridColumn: "3", gridRow: "1 / 3", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
            <img src={GRID[3].src} alt={GRID[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Bottom left+middle — billboard, spans 2 cols */}
          <div style={{ gridColumn: "1 / 3", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}>
            <img src={GRID[1].src} alt={GRID[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
