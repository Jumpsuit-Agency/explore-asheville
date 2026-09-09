import type { SlideProps } from "../Deck";

const WHEEL_IMAGES = [
  { src: "/creative/wheel-2-museum.png", alt: "Now Open: The Museum of 1st Attempts." },
  { src: "/creative/wheel-3-coffee-cups.png", alt: "The coffee's good. The cups are terrible. (Made by visitors)" },
  { src: "/creative/wheel-4-marta-ooh.png", alt: "Made by a finance team, Q4. MARTA OOH in Atlanta." },
  { src: "/creative/arc-5-airport-ooh.png", alt: "Made by an accountant from Atlanta. Airport OOH at AVL." },
];

export function Territory1CreativeSlide(_props: SlideProps) {
  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div style={{ position: "relative", zIndex: 10, padding: "60px 80px", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-grove-park)", marginBottom: "12px", display: "block" }}>
            Make Something of It &middot; The Wheel
          </span>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "42px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}>
            One bowl.{" "}
            <span style={{ color: "var(--color-grove-park)" }}>A whole story.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "16px",
          flex: 1,
          minHeight: 0,
        }}>
          {WHEEL_IMAGES.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                minHeight: 0,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
