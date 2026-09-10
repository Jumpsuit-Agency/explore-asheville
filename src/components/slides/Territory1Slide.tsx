"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

interface CarouselSection {
  label: string;
  format: string;
  dimension: string;
  examples: string[];
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
    format: "OOH Billboard",
    dimension: "Turn what they make into the marketing",
    examples: ["B3.0: Inspire a decentralized, self-organizing community to run with it."],
    audience: "Traveling Traditionalists, Experience Enthusiasts",
    market: "Atlanta, I-75/I-85 corridor",
    items: [
      { type: "image", src: "/creative/t1-atlanta-billboard.png", alt: "Atlanta billboard concept", caption: "Hero OOH concept. The headline IS the proof \u2014 real visitors, real creations, real stories turned into ads." },
      {
        type: "row",
        images: [
          { src: "/creative/wheel-4-marta-ooh.png", alt: "MARTA station OOH", caption: "OOH placements in cities where there\u2019s noticeable contrast. Experience Enthusiasts see something worth the drive." },
          { src: "/creative/avl-airport-bowl.png", alt: "AVL Airport OOH — bowl", caption: "Meets travelers at AVL with a dare disguised as a welcome. The bowl is proof someone else already took the leap." },
        ],
      },
      {
        type: "row",
        images: [
          { src: "/creative/wheel-2-museum.png", alt: "Museum of 1st Attempts", caption: "The campaign creates a launchpad for new events, pop-ups, and businesses built around making \u2014 each one extends the brand without a media buy." },
          { src: "/creative/coffee-cups-v2.png", alt: "Coffee shop — terrible cups", caption: "A local coffee shop becomes notorious for serving drinks in gloriously bad handmade cups. Playful co-creation turns a small business into a destination." },
        ],
      },
    ],
  },
  {
    label: "Example 2",
    format: "Print / Magazine Spread",
    dimension: "Turn what they make into the marketing",
    examples: ["B3.0: Inspire a decentralized, self-organizing community to run with it."],
    audience: "Energetic Families",
    market: "Garden & Gun, Southern Living",
    items: [
      { type: "image", src: "/creative/t1-make-contact.png", alt: "Print concept — make contact", caption: "Magazine spread for Garden & Gun / Southern Living. Positions Asheville as a place you make contact with, not just visit." },
      { type: "image", src: "/creative/fish-5-charleston-bus.png", alt: "Charleston bus wrap — the fish gets bigger", caption: "The media follows the family home. Instead of posting an ad to grab attention, the kid\u2019s whole school, friends, and family are talking about it \u2014 and every Charleston tourist is now considering Asheville as their next destination." },
      {
        type: "row",
        note: "Not ad copy \u2014 highlighting the sample experience",
        images: [
          { src: "/creative/fish-1-guide-chef.png", alt: "The guide called the chef.", caption: "Activates an underused tourism asset (fly fishing) and creates a bookable experience that partners can sell year-round." },
          { src: "/creative/fish-2-chef-special.png", alt: "The chef made a special.", caption: "Ties food and hospitality into a single narrative. Restaurants become co-marketers, not just vendors." },
        ],
      },
      {
        type: "row",
        note: "Not ad copy \u2014 highlighting the sample experience",
        images: [
          { src: "/creative/fish-3-hotel-experience.png", alt: "The hotel promoted the new experience.", caption: "Is that the same AI dad? Looks fishy." },
          { src: "/creative/fish-4-family-fishing.png", alt: "Another family went fishing.", caption: "Is that the same AI dad? Looks fishy." },
        ],
      },
    ],
  },
];

const arrowStyle: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "2px solid var(--color-grove-park)",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
  color: "var(--color-grove-park)",
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

export function Territory1Slide({ onNavigate }: SlideProps) {
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
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-grove-park)", marginBottom: "12px", display: "block" }}>
            Territory 01 &middot; Sample Creative
          </span>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}>
            ASHEVILLE.{" "}
            <span style={{ color: "var(--color-grove-park)" }}>MAKE SOMETHING OF IT.</span>
          </h2>
        </div>

        {/* Box + Content row */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "40px", alignItems: "center" }}>
          {/* Info box */}
          <div className="glass-light" style={{
            width: "340px",
            flexShrink: 0,
            padding: "32px 28px",
            borderLeft: "3px solid var(--color-grove-park)",
          }}>
            {/* Section tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              {SECTIONS.map((s, i) => (
                <button
                  className="interactive"
                  key={s.label}
                  onClick={() => goToSection(i)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: i === sectionIdx ? "var(--color-grove-park)" : "rgba(255,255,255,0.15)",
                    background: i === sectionIdx ? "var(--color-grove-park)" : "none",
                    color: i === sectionIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Format + Audience */}
            <div style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "20px",
            }}>
              <span style={{ display: "block", marginBottom: "4px" }}>
                <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{section.format}</span>
              </span>
              <span style={{ display: "block", marginBottom: "4px" }}>Audience: {section.audience}</span>
              <span style={{ display: "block" }}>Market: {section.market}</span>
            </div>

            {/* Campaign Principles */}
            <span className="type-label" style={{ fontSize: "10px", color: "var(--color-grove-park)", marginBottom: "12px", display: "block" }}>
              Campaign Principles
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                  What they make IS the ad.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                  Real visitor creations become the campaign. No stock photography, no staged moments.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                  The story follows them home.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                  The campaign shows up in their hometown, at their kid&apos;s school, on their neighbor&apos;s commute.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                  Local businesses become co-creators.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                  Coffee shops, guides, chefs, hotels — they&apos;re characters in the story, not vendors.
                </p>
              </div>
            </div>

            <span className="interactive" onClick={() => onNavigate?.("territories")}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.35)",
                cursor: "pointer",
              }}
            >
              &larr; Back to Three Territories
            </span>
          </div>

          {/* Right — content area with overlaid arrows */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            height: "100%",
            position: "relative",
          }}>
            {/* Left arrow */}
            {section.items.length > 1 && (
              <button
                onClick={() => setItemIdx((itemIdx - 1 + section.items.length) % section.items.length)}
                style={{ ...arrowStyle, left: "12px" }}
              >
                &larr;
              </button>
            )}

            {/* Content */}
            {item.type === "image" ? (
              <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                {item.caption && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%" }}>
                    {item.caption}
                  </p>
                )}
              </div>
            ) : item.type === "row" ? (
              <div
                key={`row-${sectionIdx}-${itemIdx}`}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                {item.note && (
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.4)",
                    textAlign: "center",
                  }}>
                    {item.note}
                  </span>
                )}
                <div style={{ display: "flex", gap: "12px", flex: 1 }}>
                {item.images.map((img, i) =>
                  img.src ? (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
                      <div style={{ borderRadius: "8px", overflow: "hidden", flex: 1 }}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </div>
                      {img.caption && (
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="asset-placeholder"
                      style={{ flex: 1, borderRadius: "8px", fontSize: "13px", minHeight: "300px" }}
                    >
                      {img.alt}
                    </div>
                  )
                )}
                </div>
              </div>
            ) : null}

            {/* Right arrow */}
            {section.items.length > 1 && (
              <button
                onClick={() => setItemIdx((itemIdx + 1) % section.items.length)}
                style={{ ...arrowStyle, right: "12px" }}
              >
                &rarr;
              </button>
            )}

            {/* Page counter */}
            {section.items.length > 1 && (
              <span style={{
                position: "absolute",
                bottom: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
              }}>
                {itemIdx + 1} / {section.items.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
