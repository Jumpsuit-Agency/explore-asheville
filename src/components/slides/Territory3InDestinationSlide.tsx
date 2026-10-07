import type { SlideProps } from "../Deck";
import { AiImage } from "../AiImage";
import { SlideHeader } from "../SlideHeader";

const COLOR = "var(--color-goldenrod)";

const GRID: { src: string; alt: string }[] = [
  { src: "/creative/t3-in-destination-flatlay.webp", alt: "In-destination hospitality flat lay — coffee sleeves, key cards, matchbooks, luggage tags" },
  { src: "/creative/t3-expect-delays-billboard.webp", alt: "Expect Delays. You'll Want to Stay a While. How Many Signs Do You Need? — highway billboard" },
  { src: "/creative/t3-ctv-holiday-tradition.webp", alt: "CTV spot — This Is Your Sign to Start a Holiday Tradition — Asheville downtown winter scene" },
  { src: "/creative/t3-hotel-elevator-conference.webp", alt: "Hotel elevator wrap — Stay an Extra Day or Two? Conference Today. Adventure Tomorrow?" },
];

export function Territory3InDestinationSlide({}: SlideProps) {
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
          suffix="In-Destination"
        />

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
            <AiImage src={GRID[0].src} alt={GRID[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          </div>
          {/* Top middle — CTV */}
          <div style={{ gridColumn: "2", gridRow: "1", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}>
            <AiImage src={GRID[2].src} alt={GRID[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Right — elevator/conference, spans both rows */}
          <div style={{ gridColumn: "3", gridRow: "1 / 3", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
            <AiImage src={GRID[3].src} alt={GRID[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Bottom left+middle — billboard, spans 2 cols */}
          <div style={{ gridColumn: "1 / 3", gridRow: "2", borderRadius: "6px", overflow: "hidden", animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both" }}>
            <AiImage src={GRID[1].src} alt={GRID[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
