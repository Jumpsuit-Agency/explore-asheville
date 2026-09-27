import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const COLUMNS = [
  {
    number: "01",
    title: "Sas hits a city.\nSearch spikes.",
    image: "/creative/t3-media-search-results.png",
    imageAlt: "Mock Google search results for Sasquatch Asheville sign",
    desc: "Each sighting seeds organic search demand in that DMA \u2014 \u201CAsheville Sasquatch,\u201D \u201Cweird Asheville billboard,\u201D \u201CAsheville bigfoot.\u201D We buy those keywords the moment he arrives. The guerrilla calendar is the media plan.",
  },
  {
    number: "02",
    title: "Curiosity becomes\nconversion.",
    image: "/creative/t3-media-ai-answer.png",
    imageAlt: "Mock AI search answer about the Asheville Sasquatch campaign",
    desc: "Anyone who searches, visits, or engages gets retargeted with the next act. First they see awareness. Then they see \u201Che\u2019s back in Asheville.\u201D Then they see a booking CTA. The media mirrors the story arc.",
  },
  {
    number: "03",
    title: "Earned + paid\ncompound.",
    image: "/creative/t3-media-sighting-map.png",
    imageAlt: "Map showing sighting cities with search volume spikes radiating from each",
    desc: "Local news coverage in each sighting city means paid search rides on organic buzz. Lower CPCs, higher relevance, and AI search results that start answering \u201Cwhat\u2019s the Asheville Sasquatch thing?\u201D with our story.",
  },
];

export function Territory3MediaEngineSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10 flex flex-col flex-1"
        style={{ padding: "60px 80px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "12px" }}>
          <span
            className="type-label"
            style={{ fontSize: "12px", color: COLOR, marginBottom: "12px", display: "block" }}
          >
            Territory 03 &middot; Media Strategy
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "52px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Every sighting is a{" "}
            <span style={{ color: COLOR }}>search moment.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-slab)",
              fontSize: "18px",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.5,
              marginTop: "12px",
              maxWidth: "800px",
            }}
          >
            The guerrilla campaign isn&apos;t just creative. It&apos;s a demand generation engine that tells you exactly where, when, and what to buy in digital.
          </p>
        </div>

        {/* Three columns */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            alignItems: "stretch",
            marginTop: "20px",
          }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.number}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Image placeholder */}
              <div
                className="asset-placeholder"
                style={{
                  height: "340px",
                  borderRadius: "0",
                  border: "none",
                  borderBottom: `2px solid ${COLOR}`,
                  flexShrink: 0,
                  overflow: "hidden",
                  padding: 0,
                }}
              >
                <img
                  src={col.image}
                  alt={col.imageAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.style.display = "flex";
                      target.parentElement.style.alignItems = "center";
                      target.parentElement.style.justifyContent = "center";
                      target.parentElement.style.fontSize = "13px";
                      target.parentElement.textContent = col.imageAlt;
                    }
                  }}
                />
              </div>

              {/* Text */}
              <div
                style={{
                  padding: "24px 20px",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: COLOR,
                    }}
                  >
                    {col.number}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "white",
                      lineHeight: 1.25,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {col.title}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.5,
                  }}
                >
                  {col.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
