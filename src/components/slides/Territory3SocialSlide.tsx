import type { SlideProps } from "../Deck";
import { AiImage } from "../AiImage";

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
          <AiImage
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
          <AiImage
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
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                You post a sunset. Asheville comments. You search for weekend flights. Asheville&apos;s already in your feed with a tarot pull that says &ldquo;go.&rdquo; A creator you follow goes to Asheville and comes back different &mdash; and now their audience is curious too.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                The account doesn&apos;t advertise. It documents signs. It collects them. It pulls cards, tracks synchronicities, replies to strangers&apos; weather posts with &ldquo;Feels like: you should be here.&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                The person behind this account isn&apos;t running a social strategy. They&apos;re running a frequency. And if you&apos;re paying attention, it starts to feel like Asheville is paying attention to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
