import type { SlideProps } from "../Deck";
import { AiImage } from "../AiImage";
import { SlideHeader } from "../SlideHeader";

const COLOR = "var(--color-goldenrod)";

const GRID: { src: string; alt: string }[] = [
  // Col 1
  { src: "/creative/t3-highway-billboard.webp", alt: "Highway billboard — You Asked for a Sign" },
  { src: "/creative/t3-austin-billboard.webp", alt: "Austin billboard — Nonstop to Asheville" },
  // Col 2
  { src: "/creative/t3-airport-fresh-air.webp", alt: "Airport living wall — The Fresh Air Found You" },
  { src: "/creative/t3-bus-station-signs.webp", alt: "Bus station takeover" },
  // Col 3 — tall
  { src: "/creative/t3-gas-pump.webp", alt: "Gas pump screen — You Have Enough Gas" },
];

export function Territory3MontageSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10 slide-frame"
        style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <SlideHeader
          color={COLOR}
          eyebrow="Territory 03"
          chips={[{ label: "Our Pick" }]}
          title={
            <>
              The signs are everywhere.{" "}
              <span style={{ color: COLOR }}>And everything&apos;s a sign.</span>
            </>
          }
          suffix="OOH"
        />

        {/* Montage: 3 cols of 2 + 1 tall column */}
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
          {/* Col 1 Top */}
          <div style={{ gridColumn: "1", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0s both" }}>
            <AiImage src={GRID[0].src} alt={GRID[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Col 1 Bottom */}
          <div style={{ gridColumn: "1", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.06s both" }}>
            <AiImage src={GRID[1].src} alt={GRID[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Col 2 Top */}
          <div style={{ gridColumn: "2", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both" }}>
            <AiImage src={GRID[2].src} alt={GRID[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Col 2 Bottom */}
          <div style={{ gridColumn: "2", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both" }}>
            <AiImage src={GRID[3].src} alt={GRID[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Col 3 — spans both rows */}
          <div style={{ gridColumn: "3", gridRow: "1 / 3", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both" }}>
            <AiImage src={GRID[4].src} alt={GRID[4].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

        </div>
      </div>
    </div>
  );
}
