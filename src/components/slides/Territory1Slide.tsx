"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";
import { useDeckAdvance, useDeckRetreat } from "../SlideSequence";
import { useCreativeStops } from "./useCreativeStops";

type CarouselItem =
  | { type: "image"; src: string; alt: string; caption?: string; imgStyle?: React.CSSProperties }
  | { type: "row"; images: { src: string; alt: string; caption?: string }[]; note?: string }
  | { type: "placeholder"; label: string };

interface Section { label: string; meta: string; items: CarouselItem[] }
interface ScriptLine { dir: string; vis: string; vo: string }
interface Script { title: string; lines: ScriptLine[] }

const COLOR = "var(--color-grove-park)";
const TAB_LABELS = ["By Audience", "By Platform", "By Market", "Scripts"];
/** Scripts is a label without a TABS entry — it renders scripts, not artwork. */
const SCRIPTS_TAB = TAB_LABELS.length - 1;

const TABS: { id: string; sections: Section[] }[] = [
  {
    id: "audience",
    sections: [
      {
        label: "Traveling Traditionalists",
        meta: "65\u201374 \u00B7 HHI $93K",
        items: [
          { type: "image", src: "/creative/t1-atlanta-billboard.webp", alt: "Atlanta billboard concept", caption: "Hero OOH concept. The headline IS the proof \u2014 real visitors, real creations, real stories turned into ads." },
        ],
      },
      {
        label: "Experience Enthusiasts",
        meta: "55\u201364 \u00B7 HHI $158K",
        items: [
          { type: "image", src: "/creative/wheel-4-marta-ooh.webp", alt: "MARTA station OOH", caption: "OOH placements in cities where there\u2019s noticeable contrast. Experience Enthusiasts see something worth the drive." },
          { type: "image", src: "/creative/wheel-2-museum.webp", alt: "Museum of 1st Attempts", caption: "The campaign creates a launchpad for new events, pop-ups, and businesses built around making \u2014 each one extends the brand without a media buy." },
        ],
      },
      {
        label: "Energetic Families",
        meta: "45\u201354 \u00B7 HHI $115K",
        items: [
          { type: "image", src: "/creative/t1-make-contact.webp", alt: "Print concept \u2014 make contact", caption: "Magazine spread for Garden & Gun / Southern Living. Positions Asheville as a place you make contact with, not just visit." },
          { type: "image", src: "/creative/fish-5-charleston-bus.webp", alt: "Charleston bus wrap", caption: "The media follows the family home. The kid\u2019s whole school, friends, and family are talking about it \u2014 and every Charleston tourist is now considering Asheville." },
          {
            type: "row",
            note: "Sample experience flow",
            images: [
              { src: "/creative/fish-1-guide-chef.webp", alt: "The guide called the chef.", caption: "Activates fly fishing as a bookable experience." },
              { src: "/creative/fish-2-chef-special.webp", alt: "The chef made a special.", caption: "Restaurants become co-marketers, not just vendors." },
            ],
          },
        ],
      },
      {
        label: "Value Seekers",
        meta: "35\u201344 \u00B7 HHI $88K",
        items: [
          { type: "image", src: "/creative/t1-instagram-value-seekers.webp", alt: "Instagram \u2014 Smoky fig old fashioned recipe", caption: "We were never into gatekeeping around here. Share the recipe, share the secret, send people home with something they can keep making. Value Seekers don\u2019t just want the experience \u2014 they want to take it with them.", imgStyle: { maxHeight: "75%", maxWidth: "45%" } },
          { type: "image", src: "/creative/t1-value-seekers-free.webp", alt: "The Best of Asheville Is Free", caption: "The best stuff doesn\u2019t cost anything. Mountain air, waterfalls, front-porch music, sunset views. The raw materials for a good trip are already here.", imgStyle: { maxHeight: "75%", maxWidth: "45%" } },
          { type: "image", src: "/creative/t1-value-seekers-return.webp", alt: "Make a Return to Yourself", caption: "More grounded. More connected. More alive. Make more than a memory \u2014 make a return to yourself." },
        ],
      },
    ],
  },
  {
    id: "platform",
    sections: [
      {
        label: "OOH",
        meta: "Billboards, Transit, Airport",
        items: [
          { type: "image", src: "/creative/t1-atlanta-billboard.webp", alt: "Atlanta billboard concept", caption: "Hero OOH concept. The headline IS the proof \u2014 real visitors, real creations, real stories turned into ads." },
          {
            type: "row",
            images: [
              { src: "/creative/wheel-4-marta-ooh.webp", alt: "MARTA station OOH", caption: "Experience Enthusiasts see something worth the drive." },
              { src: "/creative/avl-airport-bowl.webp", alt: "AVL Airport OOH \u2014 bowl", caption: "Meets travelers at AVL with a dare disguised as a welcome." },
            ],
          },
        ],
      },
      {
        label: "Print",
        meta: "Magazine, Editorial",
        items: [
          { type: "image", src: "/creative/t1-make-contact.webp", alt: "Print concept \u2014 make contact", caption: "Magazine spread for Garden & Gun / Southern Living. Positions Asheville as a place you make contact with, not just visit." },
        ],
      },
      {
        label: "Experiential",
        meta: "Pop-ups, Local Business, Events",
        items: [
          {
            type: "row",
            images: [
              { src: "/creative/wheel-2-museum.webp", alt: "Museum of 1st Attempts", caption: "Pop-ups and businesses built around making \u2014 each extends the brand without a media buy." },
              { src: "/creative/coffee-cups-v2.webp", alt: "Coffee shop \u2014 terrible cups", caption: "A local coffee shop becomes notorious for serving drinks in gloriously bad handmade cups." },
            ],
          },
        ],
      },
      {
        label: "Social",
        meta: "Instagram, TikTok, Reels",
        items: [
          { type: "image", src: "/creative/t1-instagram-profile.webp", alt: "Instagram profile — @exploreashevillenc", caption: "The profile becomes a living gallery of the campaign. Every post is proof someone made contact.", imgStyle: { maxHeight: "75%", maxWidth: "45%" } },
          { type: "image", src: "/creative/t1-instagram-value-seekers.webp", alt: "Instagram — Smoky fig old fashioned recipe", caption: "We were never into gatekeeping around here. Share the recipe, share the secret, send people home with something they can keep making.", imgStyle: { maxHeight: "75%", maxWidth: "45%" } },
        ],
      },
      {
        label: "Digital",
        meta: "Display, Programmatic",
        items: [
          { type: "image", src: "/creative/t1-value-seekers-free.webp", alt: "The Best of Asheville Is Free — digital display", caption: "Digital display ad targeting Value Seekers. The best stuff doesn\u2019t cost anything — mountain air, waterfalls, front-porch music, sunset views.", imgStyle: { maxHeight: "75%", maxWidth: "45%" } },
          { type: "image", src: "/creative/t1-value-seekers-return.webp", alt: "Make a Return to Yourself — digital display", caption: "More grounded. More connected. More alive. Make more than a memory \u2014 make a return to yourself." },
        ],
      },
    ],
  },
  {
    id: "market",
    sections: [
      {
        label: "Atlanta",
        meta: "I-75/I-85 corridor, MARTA",
        items: [
          { type: "image", src: "/creative/t1-atlanta-billboard.webp", alt: "Atlanta billboard concept", caption: "Hero OOH concept targeting the Atlanta drive market." },
          { type: "image", src: "/creative/wheel-4-marta-ooh.webp", alt: "MARTA station OOH", caption: "Transit placements in Atlanta\u2019s busiest corridors." },
        ],
      },
      {
        label: "Charleston",
        meta: "Competitor market",
        items: [
          { type: "image", src: "/creative/fish-5-charleston-bus.webp", alt: "Charleston bus wrap", caption: "The media follows the family home. Every Charleston tourist is now considering Asheville." },
        ],
      },
      {
        label: "Asheville",
        meta: "In-destination, Airport",
        items: [
          { type: "image", src: "/creative/avl-airport-bowl.webp", alt: "AVL Airport OOH \u2014 bowl", caption: "Meets travelers at AVL with a dare disguised as a welcome." },
          {
            type: "row",
            images: [
              { src: "/creative/wheel-2-museum.webp", alt: "Museum of 1st Attempts", caption: "In-destination activation." },
              { src: "/creative/coffee-cups-v2.webp", alt: "Coffee shop \u2014 terrible cups", caption: "Local business becomes a destination." },
            ],
          },
        ],
      },
      {
        label: "Other Drive Markets",
        meta: "Nashville, Charlotte, Greenville",
        items: [
          { type: "image", src: "/creative/t1-drive-market-billboard.webp", alt: "Drive market billboard — Close enough for a weekend", caption: "Close enough for a weekend. Far enough to come back different. Targets Nashville, Charlotte, and Greenville commuters on I-40 and I-26." },
        ],
      },
    ],
  },
];

const SCRIPTS: Script[] = [
  {
    title: ":60 Spot",
    lines: [
      { dir: "OPEN ON", vis: "Mountain morning. Mist in the hollows. Hands working wood, clay, iron.", vo: "In Appalachia, making something out of what you have is practically a tradition." },
      { dir: "CUT TO", vis: "Downtown Asheville. A busker. A mural being painted. A kid watching.", vo: "So you can\u2019t do Asheville like you do other cities." },
      { dir: "CUT TO", vis: "A couple at a pottery wheel. Laughing. Terrible bowls.", vo: "You\u2019ve gotta make contact\u2014with something, someone, maybe even yourself." },
      { dir: "CUT TO", vis: "A family fishing in the French Broad. Dad teaching his daughter to cast.", vo: "And you can\u2019t leave Asheville the same way, either." },
      { dir: "CUT TO", vis: "A guide calling a chef. A chef plating a trout. A hotel lobby with a new experience on the counter.", vo: "Because proof you were here isn\u2019t the same as proof you were changed by it." },
      { dir: "CUT TO", vis: "Golden hour. The mountains do something impossible with the light.", vo: "And the best thing you make in Asheville might not be the thing you take home." },
      { dir: "FINAL", vis: "A hand touches a crooked bowl on a shelf. Smiles. Walks away.", vo: "It might be the little something you leave behind." },
      { dir: "SUPER", vis: "ASHEVILLE. MAKE SOMETHING OF IT.", vo: "" },
    ],
  },
  {
    title: ":30 Spot",
    lines: [
      { dir: "OPEN ON", vis: "A shelf of souvenirs. Magnets, mugs, keychains.", vo: "You can leave with proof you were here." },
      { dir: "CUT TO", vis: "Hands shaping clay. A family wading into a river.", vo: "Or proof you were changed by it." },
      { dir: "CUT TO", vis: "A local artisan teaching a visitor. Something passes between them.", vo: "And sometimes, proof it was changed by you." },
      { dir: "CUT TO", vis: "Golden hour on the Blue Ridge. A quiet moment.", vo: "Because the best thing about Asheville might not be what you take home." },
      { dir: "FINAL", vis: "A handmade bowl left on a potter\u2019s shelf. Still warm.", vo: "It might be what you leave behind." },
      { dir: "SUPER", vis: "ASHEVILLE. MAKE SOMETHING OF IT.", vo: "" },
    ],
  },
  {
    title: ":15 Spot",
    lines: [
      { dir: "OPEN ON", vis: "Quick cuts: Clay hits the wheel. A kid steps into a cold stream. Dad hesitates outside a bluegrass jam, then picks up a fiddle.", vo: "" },
      { dir: "", vis: "Trinket objects left behind on a shelf.", vo: "You can leave with proof you were here." },
      { dir: "", vis: "Hands covered in clay. A smile. Eye contact.", vo: "Or proof you were changed by it." },
      { dir: "SUPER", vis: "ASHEVILLE. MAKE SOMETHING OF IT.", vo: "" },
    ],
  },
];

const PRINCIPLES = [
  { title: "What they make IS the ad.", desc: "Real visitor creations become the campaign. No stock photography, no staged moments." },
  { title: "The story follows them home.", desc: "The campaign shows up in their hometown, at their kid\u2019s school, on their neighbor\u2019s commute." },
  { title: "Local businesses become co-creators.", desc: "Coffee shops, guides, chefs, hotels \u2014 they\u2019re characters in the story, not vendors." },
];

const arrowStyle: React.CSSProperties = {
  width: "44px", height: "44px", borderRadius: "50%",
  border: "2px solid var(--color-grove-park)",
  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
  color: "var(--color-grove-park)", fontSize: "24px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  position: "absolute" as const, top: "50%", transform: "translateY(-50%)", zIndex: 30,
};

export function Territory1Slide({ onNavigate }: SlideProps) {
  // One cursor over every tab -> section -> item, so the deck's forward key
  // walks the whole tree and hands off to the next slide at the end.
  const { tabIdx, sectionIdx, itemIdx, scriptIdx, changeTab, changeSection, changeScript } =
    useCreativeStops(TABS, SCRIPTS, SCRIPTS_TAB);

  const isScripts = tabIdx === SCRIPTS_TAB;
  const tab = !isScripts ? TABS[tabIdx] : null;
  const section = tab ? tab.sections[sectionIdx] : null;
  const items = section ? section.items : [];
  const advance = useDeckAdvance();
  const retreat = useDeckRetreat();
  // Whether there is a carousel to page. The stage advances either way —
  // on a single comp the click carries the deck to the next stop — so this
  // only governs the back arrow, the counter, and whether the forward arrow
  // is permanent or waits for hover.
  const canPage = items.length > 1;
  const item = items[itemIdx];
  const script = SCRIPTS[scriptIdx];

  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1 min-h-0" style={{ padding: "60px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
            <span className="type-label" style={{ fontSize: "18px", color: COLOR }}>
              Territory 01
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "var(--color-grove-park)", color: "white" }}>T1</span>
              <button className="ui-button" onClick={() => onNavigate?.("territory-2-creative")} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}>T2</button>
              <button className="ui-button" onClick={() => onNavigate?.("territory-3-desc")} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}>T3</button>
            </div>
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "44px", fontWeight: 800, color: "white", lineHeight: 1.02, letterSpacing: "-0.03em" }}>
            ASHEVILLE. <span style={{ color: COLOR }}>MAKE SOMETHING OF IT.</span>
          </h2>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
          {TAB_LABELS.map((label, i) => (
            <button className="ui-button pill" key={label} onClick={() => changeTab(i)} style={{
              borderColor: i === tabIdx ? COLOR : "rgba(255,255,255,0.15)",
              background: i === tabIdx ? COLOR : "none",
              color: i === tabIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {isScripts ? (
          <>
            {/* Script selector */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {SCRIPTS.map((s, i) => (
                <button className="ui-button" key={s.title} onClick={() => changeScript(i)} style={{
                  fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700,
                  padding: "5px 14px", borderRadius: "20px", border: "2px solid",
                  borderColor: i === scriptIdx ? COLOR : "rgba(255,255,255,0.15)",
                  background: i === scriptIdx ? COLOR : "none",
                  color: i === scriptIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", transition: "all 0.2s",
                }}>{s.title}</button>
              ))}
            </div>

            {/* Script layout */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="asset-placeholder" style={{ flex: 1, minHeight: "360px", marginBottom: "16px", fontSize: "22px" }}>
                  {script.title} &mdash; Production Pending
                </div>
                <div className="glass-light" style={{ padding: "16px 20px" }}>
                  <span className="type-label" style={{ fontSize: "16px", color: COLOR }}>Production</span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.5 }}>
                    Shot on location. Real people, real places. Genuine, layered, sense of place &mdash; never posed.
                  </p>
                </div>
              </div>
              <div style={{ overflow: "auto", paddingRight: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {script.lines.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "16px" }}>
                      <span style={{
                        fontFamily: "monospace", fontSize: "16px", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        color: s.dir === "FINAL" || s.dir === "SUPER" ? COLOR : "rgba(255,255,255,0.25)",
                        minWidth: "52px", paddingTop: "4px", flexShrink: 0,
                      }}>{s.dir}</span>
                      <div>
                        <p style={{
                          fontFamily: "var(--font-slab)",
                          fontSize: s.dir === "SUPER" ? "18px" : "15px",
                          fontWeight: s.dir === "SUPER" ? 800 : 400,
                          color: s.dir === "SUPER" ? COLOR : "rgba(255,255,255,0.45)",
                          lineHeight: 1.5,
                        }}>{s.vis}</p>
                        {s.vo && (
                          <p style={{ fontFamily: "var(--font-slab)", fontSize: "22px", fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginTop: "3px", lineHeight: 1.5 }}>
                            &ldquo;{s.vo}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: "12px", padding: "16px 24px", background: COLOR, borderRadius: "8px", textAlign: "center" }}>
                    <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "24px", color: "white" }}>
                      Asheville. Make Something of It.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Creative tabs */
          <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "36px", alignItems: "stretch" }}>
            {/* Sidebar */}
            <div className="glass-light" style={{ width: "470px", flexShrink: 0, padding: "24px 20px", borderLeft: `3px solid ${COLOR}`, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                {tab?.sections.map((s, i) => (
                  <button className="ui-button pill pill-sm" key={s.label} onClick={() => changeSection(i)} style={{
                    borderColor: i === sectionIdx ? COLOR : "rgba(255,255,255,0.15)",
                    background: i === sectionIdx ? COLOR : "none",
                    color: i === sectionIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>{s.label}</button>
                ))}
              </div>

              {section && (
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "18px", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
                  <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{section.label}</span>
                  <span style={{ display: "block" }}>{section.meta}</span>
                </div>
              )}

              <span className="type-label" style={{ fontSize: "16px", color: COLOR, marginBottom: "8px", display: "block" }}>Campaign Principles</span>
              <div data-scroll-region style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", flex: 1, minHeight: 0, overflowY: "auto" }}>
                {PRINCIPLES.map((p, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <button type="button" className="ui-button ui-button-quiet" onClick={() => onNavigate?.("territories")} style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 600 }}>
                &larr; Back to Three Territories
              </button>
            </div>

            {/* Carousel */}
            {/* The artwork pages the carousel. Deliberately not role="button":
                it is a surface, not a control, and the keyboard path is the
                deck's own forward step rather than a focus stop here. */}
            <div
              className={`carousel-stage carousel-stage-grove`}
              onClick={advance}
              style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}
            >
              {items.length > 1 && (
                <button className="ui-button" onClick={(e) => { e.stopPropagation(); retreat(); }} style={{ ...arrowStyle, left: "12px" }}>&larr;</button>
              )}

              {item?.type === "image" ? (
                <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  <img src={item.src} alt={item.alt} style={{ maxWidth: "100%", maxHeight: "85%", objectFit: "contain", borderRadius: "8px", ...item.imgStyle }} />
                  {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%" }}>{item.caption}</p>}
                </div>
              ) : item?.type === "row" ? (
                <div key={`row-${tabIdx}-${sectionIdx}-${itemIdx}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  {item.note && <span style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 600, fontStyle: "italic", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{item.note}</span>}
                  <div style={{ display: "flex", gap: "12px", flex: 1 }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
                        <div style={{ borderRadius: "8px", overflow: "hidden", flex: 1 }}>
                          <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </div>
                        {img.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{img.caption}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : item?.type === "placeholder" ? (
                <div key={item.label} className="asset-placeholder" style={{ width: "100%", minHeight: "400px", fontSize: "22px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  {item.label}
                </div>
              ) : null}

              <button
                className={`ui-button${canPage ? "" : " stage-advance"}`}
                onClick={(e) => { e.stopPropagation(); advance(); }}
                style={{ ...arrowStyle, right: "12px" }}
              >&rarr;</button>
              {items.length > 1 && (
                <span style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                  {itemIdx + 1} / {items.length}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
