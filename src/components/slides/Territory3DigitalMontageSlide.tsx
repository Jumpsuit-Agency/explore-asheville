import type { SlideProps } from "../Deck";
import { AiImage } from "../AiImage";
import { SlideHeader } from "../SlideHeader";

const COLOR = "var(--color-goldenrod)";

const GRID: { src: string; alt: string }[] = [
  // Col 1
  { src: "/creative/t3-1111-mountain-night.webp", alt: "11:11 — Good. You noticed." },
  { src: "/creative/t3-nonstop-asheville-poster.webp", alt: "Nonstop to Asheville — BNA Nashville to AVL Asheville, 1 HR 12 MIN" },
  // Col 2
  { src: "/creative/t3-222-round-trip.webp", alt: "$222 Round Trip — At some point it stops being a coincidence" },
  { src: "/creative/t3-maps-light-traffic.webp", alt: "Maps — Asheville 4hr 52min, Light Traffic. Looks like another sign." },
  // Col 3
  { src: "/creative/t3-save-33-weekend.webp", alt: "Save 33% This Weekend — The universe is basically packing your bag" },
  { src: "/creative/t3-weather-feels-like.webp", alt: "Weather — 48° Clear. Feels like: You should be here." },
];

export function Territory3DigitalMontageSlide({}: SlideProps) {
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
          suffix="Digital"
        />

        {/* Montage: 3 cols of 2 + 1 tall column */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1.1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {/* Col 1 Top */}
          <div style={{ gridColumn: "1", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0s both" }}>
            <AiImage src={GRID[0].src} alt={GRID[0].alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {/* Col 1 Bottom */}
          <div style={{ gridColumn: "1", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.06s both" }}>
            <AiImage src={GRID[1].src} alt={GRID[1].alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          {/* Col 2 Top */}
          <div style={{ gridColumn: "2", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both" }}>
            <AiImage src={GRID[2].src} alt={GRID[2].alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {/* Col 2 Bottom */}
          <div style={{ gridColumn: "2", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both" }}>
            <AiImage src={GRID[3].src} alt={GRID[3].alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          {/* Col 3 Top */}
          <div style={{ gridColumn: "3", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both" }}>
            <AiImage src={GRID[4].src} alt={GRID[4].alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {/* Col 3 Bottom */}
          <div style={{ gridColumn: "3", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
            <AiImage src={GRID[5].src} alt={GRID[5].alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          {/* Col 4 — copy block, spans both rows */}
          <div style={{ gridColumn: "4", gridRow: "1 / 3", display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both" }}>
            {[
              "WHEN the time is right.",
              "WHEN the fare drops.",
              "WHEN the hotel deal appears.",
              "WHEN a nonstop opens up.",
              "WHEN Asheville is close.",
              "WHEN the weather cooperates.",
            ].map((line, i) => (
              <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
                <span style={{ color: COLOR }}>WHEN</span>{line.slice(4)}
              </p>
            ))}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 800, color: COLOR, lineHeight: 1.4, marginTop: "20px" }}>
              The sign comes first.<br />The ad just points at it.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
