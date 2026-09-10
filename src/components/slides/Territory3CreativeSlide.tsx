"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

interface CarouselSection {
  label: string;
  format: string;
  audience: string;
  market: string;
  items: CarouselItem[];
}

type CarouselItem =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "row"; images: { src: string; alt: string; caption?: string }[]; note?: string }
  | { type: "placeholder"; label: string };

const SECTIONS: CarouselSection[] = [
  {
    label: "Example 1",
    format: "Digital / Retargeting",
    audience: "All segments",
    market: "Programmatic, Social, Search",
    items: [
      { type: "placeholder", label: "Digital / Retargeting Creative" },
    ],
  },
  {
    label: "Example 2",
    format: "Ambient / Guerrilla",
    audience: "Energetic Families, Value Seekers",
    market: "Street-level, Events, Partnerships",
    items: [
      { type: "placeholder", label: "Ambient / Guerrilla Creative" },
    ],
  },
];

const arrowStyle: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "2px solid var(--color-goldenrod)",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
  color: "var(--color-goldenrod)",
  fontSize: "18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 30,
};

export function Territory3CreativeSlide({ onNavigate }: SlideProps) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const section = SECTIONS[sectionIdx];
  const item = section.items[itemIdx];

  const goToSection = (i: number) => {
    setSectionIdx(i);
    setItemIdx(0);
  };

  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1 min-h-0" style={{ padding: "80px 100px" }}>
        <div style={{ marginBottom: "40px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-goldenrod)", marginBottom: "12px", display: "block" }}>
            Territory 03 &middot; Sample Creative
          </span>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "56px", fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            ASHEVILLE.{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>HOW MANY SIGNS DO YOU NEED?</span>
          </h2>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "40px", alignItems: "center" }}>
          <div className="glass-light" style={{ width: "340px", flexShrink: 0, padding: "32px 28px", borderLeft: "3px solid var(--color-goldenrod)" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              {SECTIONS.map((s, i) => (
                <button className="interactive" key={s.label} onClick={() => goToSection(i)} style={{
                  fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, padding: "6px 14px", borderRadius: "20px",
                  border: "1px solid", borderColor: i === sectionIdx ? "var(--color-goldenrod)" : "rgba(255,255,255,0.15)",
                  background: i === sectionIdx ? "var(--color-goldenrod)" : "none",
                  color: i === sectionIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
                }}>{s.label}</button>
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
              <span style={{ display: "block", marginBottom: "4px" }}><span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{section.format}</span></span>
              <span style={{ display: "block", marginBottom: "4px" }}>Audience: {section.audience}</span>
              <span style={{ display: "block" }}>Market: {section.market}</span>
            </div>

            <span className="type-label" style={{ fontSize: "10px", color: "var(--color-goldenrod)", marginBottom: "10px", display: "block" }}>Strategy</span>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "16px" }}>
              Send out a frequency, not just a message
            </h3>

            <span className="type-label" style={{ fontSize: "10px", color: "var(--color-goldenrod)", marginBottom: "10px", display: "block" }}>Business 3.0</span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 800, color: "white", lineHeight: 1.3, marginBottom: "20px" }}>
              Turn every touchpoint into a sign — until visiting feels like destiny.
            </p>

            <span className="interactive" onClick={() => onNavigate?.("territories")} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>
              &larr; Back to Three Territories
            </span>
          </div>

          <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", height: "100%", position: "relative" }}>
            {section.items.length > 1 && (
              <button onClick={() => setItemIdx((itemIdx - 1 + section.items.length) % section.items.length)} style={{ ...arrowStyle, left: "12px" }}>&larr;</button>
            )}

            {item.type === "image" ? (
              <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <img src={item.src} alt={item.alt} style={{ maxWidth: "100%", maxHeight: "85%", objectFit: "contain", borderRadius: "8px" }} />
                {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%" }}>{item.caption}</p>}
              </div>
            ) : item.type === "row" ? (
              <div key={`row-${sectionIdx}-${itemIdx}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                {item.note && <span style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 600, fontStyle: "italic", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{item.note}</span>}
                <div style={{ display: "flex", gap: "12px", flex: 1 }}>
                  {item.images.map((img, i) => img.src ? (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
                      <div style={{ borderRadius: "8px", overflow: "hidden", flex: 1 }}><img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
                      {img.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{img.caption}</p>}
                    </div>
                  ) : (
                    <div key={i} className="asset-placeholder" style={{ flex: 1, borderRadius: "8px", fontSize: "13px", minHeight: "300px" }}>{img.alt}</div>
                  ))}
                </div>
              </div>
            ) : item.type === "placeholder" ? (
              <div key={item.label} className="asset-placeholder" style={{ width: "100%", minHeight: "400px", fontSize: "16px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                {item.label} — Coming Soon
              </div>
            ) : null}

            {section.items.length > 1 && (
              <button onClick={() => setItemIdx((itemIdx + 1) % section.items.length)} style={{ ...arrowStyle, right: "12px" }}>&rarr;</button>
            )}
            {section.items.length > 1 && (
              <span style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                {itemIdx + 1} / {section.items.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
