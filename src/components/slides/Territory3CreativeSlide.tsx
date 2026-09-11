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
    format: "OOH / Ambient",
    audience: "All segments",
    market: "Drive markets, Transit, Fuel stations",
    items: [
      { type: "image", src: "/creative/t3-highway-billboard.png", alt: "Highway billboard — You Asked for a Sign", caption: "Meet people mid-journey — when they\u2019re already moving and open to suggestion. A message that doesn\u2019t feel like an ad feels like the universe answering. The kind of thing you photograph and text to someone." },
      { type: "image", src: "/creative/t3-gas-pump.png", alt: "Gas pump screen — You Have Enough Gas to Make It", caption: "Turn dead time into decision time. Ambient media in mundane moments makes the campaign feel omnipresent — like Asheville is finding them, not the other way around." },
      { type: "image", src: "/creative/t3-austin-billboard.png", alt: "Austin highway billboard — Nonstop to Asheville? Looks Like Another Sign.", caption: "Plant the sign in another city\u2019s skyline — right where the target audience already lives. The campaign crosses state lines, showing up where competitors aren\u2019t and narrating something that feels like it\u2019s already happening." },
      { type: "image", src: "/creative/t3-bus-station-signs.png", alt: "Bus station takeover — How Many Signs Do You Need?", caption: "Dominate a single location so completely that the concept becomes the environment. The volume is the message — the signs stack until ignoring them becomes the harder choice." },
      { type: "image", src: "/creative/t3-indy-sidewalk.png", alt: "Indianapolis sidewalk stencil — ASHEVILLE with arrow", caption: "Capture attention in another city with an unexpected sign in an unexpected moment. Guerrilla placement at high-traffic events puts the brand underfoot — impossible to miss, impossible to forget." },
    ],
  },
  {
    label: "Example 2",
    format: "Organic / UGC",
    audience: "All segments",
    market: "Social, Influencer, Community",
    items: [
      { type: "row", images: [
        { src: "/creative/t3-instagram-profile.png", alt: "Instagram profile — Asheville Is Following You" },
        { src: "/creative/t3-instagram-tshirt-v3.png", alt: "Instagram post — concert tee" },
        { src: "/creative/t3-instagram-cardinal.png", alt: "Instagram post — cardinal on porch" },
      ], note: "Flip the social playbook — instead of broadcasting, create content that feels like it\u2019s speaking directly to the viewer. The strategy is accumulation: every post adds another \u201Ccoincidence\u201D until the audience starts to feel like Asheville is choosing them." },
    ],
  },
  {
    label: "Example 3",
    format: "On-the-Ground / Hospitality",
    audience: "All segments — in-destination",
    market: "Hotels, Cafes, Shops, Streetscape",
    items: [
      { type: "image", src: "/creative/t3-welcome-touchpoints.png", alt: "In-destination welcome touchpoints — pillow cards, coffee sleeves, door hangers, street banners", caption: "Extend the campaign past the conversion point. Once they arrive, every local touchpoint reinforces the narrative — turning a visit into a payoff and a first-timer into an evangelist who tells the story back home." },
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
                <button className="ui-button" key={s.label} onClick={() => goToSection(i)} style={{
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

            <span className="type-label" style={{ fontSize: "10px", color: "var(--color-goldenrod)", marginBottom: "10px", display: "block" }}>Campaign Principles</span>

            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "6px" }}>
              1. Every touchpoint is a sign.
            </h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginBottom: "12px" }}>
              The media plan is the message. Paid media becomes plot — every ad, billboard, and retargeting hit is proof of the concept.
            </p>

            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "6px" }}>
              2. Send out a frequency, not just a message.
            </h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginBottom: "12px" }}>
              The campaign doesn&apos;t shout — it hums. Asheville keeps showing up until it feels like it&apos;s meant to.
            </p>

            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "6px" }}>
              3. Make the trip feel inevitable.
            </h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginBottom: "20px" }}>
              No hard sell needed. The signs keep stacking up until visiting doesn&apos;t feel like a choice — it feels like it was always going to happen.
            </p>

            <button type="button" className="ui-button ui-button-quiet" onClick={() => onNavigate?.("territories")} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600 }}>
              &larr; Back to Three Territories
            </button>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", height: "680px", position: "relative" }}>
            {section.items.length > 1 && (
              <button className="ui-button" onClick={() => setItemIdx((itemIdx - 1 + section.items.length) % section.items.length)} style={{ ...arrowStyle, left: "12px" }}>&larr;</button>
            )}

            {item.type === "image" ? (
              <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%", height: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <img src={item.src} alt={item.alt} style={{ maxWidth: "100%", maxHeight: "580px", objectFit: "contain", borderRadius: "8px" }} />
                {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%", flexShrink: 0 }}>{item.caption}</p>}
              </div>
            ) : item.type === "row" ? (
              <div key={`row-${sectionIdx}-${itemIdx}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <div style={{ display: "flex", gap: "12px", flex: 1, alignItems: "center", justifyContent: "center" }}>
                  {item.images.map((img, i) => img.src ? (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0, alignItems: "center" }}>
                      <img src={img.src} alt={img.alt} style={{ maxWidth: "100%", maxHeight: "540px", objectFit: "contain", borderRadius: "8px", display: "block" }} />
                      {img.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{img.caption}</p>}
                    </div>
                  ) : (
                    <div key={i} className="asset-placeholder" style={{ flex: 1, borderRadius: "8px", fontSize: "13px", minHeight: "300px" }}>{img.alt}</div>
                  ))}
                </div>
                {item.note && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%", margin: "0 auto" }}>{item.note}</p>}
              </div>
            ) : item.type === "placeholder" ? (
              <div key={item.label} className="asset-placeholder" style={{ width: "100%", minHeight: "400px", fontSize: "16px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                {item.label} — Coming Soon
              </div>
            ) : null}

            {section.items.length > 1 && (
              <button className="ui-button" onClick={() => setItemIdx((itemIdx + 1) % section.items.length)} style={{ ...arrowStyle, right: "12px" }}>&rarr;</button>
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
