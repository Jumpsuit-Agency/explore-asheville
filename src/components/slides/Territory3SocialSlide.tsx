import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const GRID: { src: string; alt: string }[] = [
  { src: "/creative/t3-instagram-profile-v2.png", alt: "Instagram — exploreashevillenc — Asheville follows you, 68.4K followers" },
  { src: "/creative/t3-hermit-tarot.png", alt: "The Hermit tarot card — Some signs point inward. Asheville." },
];

export function Territory3SocialSlide({}: SlideProps) {
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
            <span style={{ fontSize: "20px", fontWeight: 600, color: "rgba(255,255,255,0.35)", verticalAlign: "middle" }}>Social</span>
          </h2>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            overflow: "hidden",
          }}
        >
          <img
            src={GRID[0].src}
            alt={GRID[0].alt}
            style={{
              maxHeight: "100%",
              maxWidth: "30%",
              objectFit: "contain",
              borderRadius: "6px",
              animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0s both",
            }}
          />
          <img
            src={GRID[1].src}
            alt={GRID[1].alt}
            style={{
              maxHeight: "100%",
              maxWidth: "30%",
              objectFit: "contain",
              borderRadius: "6px",
              animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
            }}
          />
          {/* Copy section */}
          <div
            style={{
              maxWidth: "32%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
              animation: "child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
            }}
          >
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
              Asheville doesn&apos;t wait to be discovered.<br />
              <span style={{ color: COLOR }}>It follows you first.</span>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { bold: "Proactive, not reactive.", rest: "Asheville follows creators, comments on posts, shows up in threads before anyone asks." },
                { bold: "Content that documents, not advertises.", rest: "Original series, tarot pulls, sign collections, local lore \u2014 every post is a reason to look twice." },
                { bold: "Creator + influencer partnerships.", rest: "Voices seeding the campaign into culture, not just feeds." },
                { bold: "An absolutely obsessed community manager.", rest: "Commenting on tour dates, weather posts, flight deals, sunset photos \u2014 pointing out signs in the wild that nobody else would catch." },
              ].map((item, i) => (
                <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{item.bold}</span>{" "}{item.rest}
                </p>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 800, color: COLOR, lineHeight: 1.3, marginTop: "4px" }}>
              Someone behind this account is completely obsessed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
