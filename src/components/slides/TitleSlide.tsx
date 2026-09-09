import Image from "next/image";
import type { SlideProps } from "../Deck";

export function TitleSlide({}: SlideProps) {
  return (
    <div className="slide slide-clear" style={{ padding: 0 }}>
      {/* Gentle gradient for text legibility at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(30,31,56,0.4) 80%, rgba(30,31,56,0.7) 100%)",
        }}
      />

      {/* Content — bottom-anchored */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 100px 100px",
        }}
      >
        {/* Jumpsuit wordmark — top left, matching About slide */}
        <Image
          src="/jumpsuit-wordmark.png"
          alt="Jumpsuit"
          width={200}
          height={40}
        />

        {/* Bottom-anchored content */}
        <div>
          <span
            className="type-label"
            style={{ color: "var(--color-goldenrod)", marginBottom: "20px", fontSize: "14px", display: "block" }}
          >
            A Creative Campaign Platform
          </span>

          <h1 className="type-massive" style={{ marginBottom: "24px" }}>
            Explore<br />Asheville
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ width: "60px", height: "2px", background: "var(--color-goldenrod)" }} />
            <span className="type-body" style={{ color: "rgba(255,255,255,0.6)", fontSize: "20px" }}>
              Presented by Jumpsuit &middot; October 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
