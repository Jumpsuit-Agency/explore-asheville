"use client";

import type { SlideProps } from "../Deck";
import { AiImage } from "../AiImage";
import { useDeckAdvance, useDeckRetreat } from "../SlideSequence";
import { useCreativeStops } from "./useCreativeStops";
import { SlideHeader } from "../SlideHeader";

/**
 * Territory 03 in the Territory 01 creative layout (slide 6), for the
 * appendix. A curated subset of the T3 comps — enough to fill each tab, not
 * the full run already shown on the T3 slides.
 */
type CarouselItem =
  | { type: "image"; src: string; alt: string; caption?: string; imgStyle?: React.CSSProperties }
  | { type: "row"; images: { src: string; alt: string }[]; note?: string };

interface Section { label: string; meta: string; items: CarouselItem[] }

const COLOR = "var(--color-goldenrod)";
const TAB_LABELS = ["By Audience", "By Platform", "By Market"];
/** No Scripts tab here, so no script stops. */
const NO_SCRIPTS: { lines: null }[] = [];

const TABS: { id: string; sections: Section[] }[] = [
  {
    id: "audience",
    sections: [
      {
        label: "Value Seekers",
        meta: "35–44 · HHI $88K",
        items: [
          { type: "image", src: "/creative/t3-highway-billboard.webp", alt: "Highway billboard — You Asked for a Sign", caption: "A rainbow, a mountain vista, and a simple truth on the highway. For Value Seekers, the sign doesn’t need to be clever — it just needs to feel like fate." },
          { type: "image", src: "/creative/t3-magic8ball-billboard.webp", alt: "Highway billboard — Outlook Good, How Many Signs Do You Need?", caption: "A Magic 8-Ball on a highway billboard. The universe is answering — and the exit is two miles away." },
        ],
      },
      {
        label: "Experience Enthusiasts",
        meta: "55–64 · HHI $158K",
        items: [
          { type: "image", src: "/creative/t3-enthusiasts-tshirt.webp", alt: "Nashville Scene spread — Now that’s a big sign", caption: "The sign is standing right in front of you at a concert. A magazine spread that turns a stranger’s t-shirt into a travel ad — placed in Nashville Scene, where the audience already lives." },
        ],
      },
      {
        label: "Traveling Traditionalists",
        meta: "65–74 · HHI $93K",
        items: [
          { type: "image", src: "/creative/t3-traditionalists-ctv.webp", alt: "Couple watching CTV ad — downtown Asheville winter scene with campaign banners", caption: "A winter evening, a familiar couch, and a place that keeps showing up. CTV meets Traditionalists exactly where they are — at home, unhurried, ready to be moved." },
        ],
      },
      {
        label: "Energetic Families",
        meta: "45–54 · HHI $115K",
        items: [
          { type: "image", src: "/creative/t3-families-fishing.webp", alt: "Magazine spread — Dad cried. Sasquatch got the photo.", caption: "Dad cried. Sasquatch got the photo. A magazine spread that turns a family moment into a sighting — filed by the Head of Lore himself." },
        ],
      },
    ],
  },
  {
    id: "platform",
    sections: [
      {
        label: "OOH / Ambient",
        meta: "Billboards, Gas Pumps, Transit",
        items: [
          { type: "image", src: "/creative/t3-gas-pump.webp", alt: "Gas pump screen — You Have Enough Gas to Make It", caption: "Turn dead time into decision time. Ambient media in mundane moments makes the campaign feel omnipresent." },
          { type: "image", src: "/creative/t3-bus-station-signs.webp", alt: "Bus station takeover — How Many Signs Do You Need?", caption: "Dominate a single location so completely that the concept becomes the environment. The volume is the message." },
        ],
      },
      {
        label: "Social / UGC",
        meta: "Instagram, TikTok, Organic",
        items: [
          {
            type: "row",
            images: [
              { src: "/creative/t3-instagram-profile.webp", alt: "Instagram profile — Asheville Is Following You" },
              { src: "/creative/t3-instagram-tshirt-v3.webp", alt: "Instagram post — concert tee" },
              { src: "/creative/t3-instagram-cardinal.webp", alt: "Instagram post — cardinal on porch" },
            ],
            note: "Anyone who tags a rainbow, a mountain, good food, live music — anything uniquely Asheville — triggers @ExploreAsheville to follow them. No DM. No ad. Just a follow. The sign finds you.",
          },
        ],
      },
      {
        label: "Guerrilla",
        meta: "Sidewalk, Stencils, Stunts",
        items: [
          {
            type: "row",
            images: [
              { src: "/creative/t3-indy-bigfoot-wheatpaste.webp", alt: "Bigfoot wheat-pasting Asheville signs in Indianapolis" },
              { src: "/creative/t3-indy-bigfoot-cardboard.webp", alt: "Bigfoot holding cardboard Asheville sign at Crossroads of America" },
              { src: "/creative/t3-indy-bigfoot-stencil.webp", alt: "Bigfoot stenciling Asheville on the sidewalk outside Lucas Oil Stadium" },
            ],
            note: "Sas goes on tour — wheat-pasting posters, holding cardboard signs, stenciling sidewalks outside stadiums. Every city gets its own sighting. Every sighting becomes content.",
          },
        ],
      },
      {
        label: "In-Destination",
        meta: "Hotels, Cafes, Shops, Streetscape",
        items: [
          { type: "image", src: "/creative/t3-in-destination-touchpoints-v2.webp", alt: "In-destination branded touchpoints — key cards, luggage tags, coffee sleeves, matchbooks, postcards, hotel lobby screens", caption: "Once they arrive, every touchpoint confirms it: the signs worked. Key cards, luggage tags, coffee sleeves and lobby screens turn a first-timer into an evangelist." },
        ],
      },
    ],
  },
  {
    id: "market",
    sections: [
      {
        label: "Fly Markets",
        meta: "Austin, New Airport Routes",
        items: [
          { type: "image", src: "/creative/t3-austin-billboard.webp", alt: "Austin highway billboard — Nonstop to Asheville? Looks Like Another Sign.", caption: "Plant the sign in another city’s skyline — right where the target audience already lives." },
          { type: "image", src: "/creative/t3-airport-fresh-air.webp", alt: "Airport living wall installation — The Fresh Air’s Been Trying to Find You", caption: "A living wall takeover at the gate. The fresh air found you before you even boarded." },
        ],
      },
      {
        label: "Drive Markets",
        meta: "Charlotte, Highway, Gas Stations",
        items: [
          { type: "image", src: "/creative/t3-crystal-billboard.webp", alt: "Charlotte billboard — A Crystal-Clear Sign to Visit", caption: "Planted on I-77 in Charlotte. The crystals burst off the board — impossible to ignore, impossible to forget." },
          { type: "image", src: "/creative/t3-gas-pump.webp", alt: "Gas pump screen — You Have Enough Gas to Make It", caption: "Meet drivers mid-journey, when they’re already moving and open to suggestion." },
        ],
      },
      {
        label: "In-Destination",
        meta: "Highway Approach, Arrival",
        items: [
          { type: "image", src: "/creative/t3-moving-interstate.webp", alt: "Billboard — We’re literally moving the interstate for you.", caption: "References the real I-26 construction — a fact everyone driving in already knows. Turns infrastructure into proof that Asheville is pulling you closer." },
          { type: "image", src: "/creative/t3-expect-delays.webp", alt: "Billboard — Expect Delays. You’ll want to stay a while.", caption: "Hijacks a road sign everyone dreads and turns it into an invitation. The delay is the point." },
        ],
      },
    ],
  },
];

const PRINCIPLES = [
  { title: "Every touchpoint is a sign.", desc: "The media plan becomes part of the idea. Every ad, billboard, search result and retargeting hit feels less like advertising — and more like Asheville finding you." },
  { title: "Love is the engine.", desc: "People who love Asheville can’t help talking about it. Their recommendations, stories, photos and invitations become signs of their own." },
  { title: "Visitors become the campaign.", desc: "Fall for Asheville and you start sending signs back into the world. The cosmic joke is that eventually, there is no campaign. Just people pointing people toward Asheville." },
];

const arrowStyle: React.CSSProperties = {
  width: "44px", height: "44px", borderRadius: "50%",
  border: "2px solid var(--color-goldenrod)",
  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
  color: "var(--color-goldenrod)", fontSize: "24px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  position: "absolute" as const, top: "50%", transform: "translateY(-50%)", zIndex: 30,
};

export function AppendixT3CreativeSlide({ onNavigate }: SlideProps) {
  // One cursor over every tab -> section -> item, so the deck's forward key
  // walks the whole tree and hands off to the next slide at the end.
  const { tabIdx, sectionIdx, itemIdx, changeTab, changeSection } =
    useCreativeStops(TABS, NO_SCRIPTS, TAB_LABELS.length);

  const tab = TABS[tabIdx];
  const section = tab.sections[sectionIdx];
  const items = section.items;
  const advance = useDeckAdvance();
  const retreat = useDeckRetreat();
  // On a single comp the stage click carries the deck to the next stop, so
  // this only governs the back arrow, the counter, and the forward arrow.
  const canPage = items.length > 1;
  const item = items[itemIdx];

  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1 min-h-0 slide-frame" style={{}}>
        <SlideHeader
          color={COLOR}
          eyebrow="Territory 03"
          title={
            <>
              ASHEVILLE. <span style={{ color: COLOR }}>HOW MANY SIGNS DO YOU NEED?</span>
            </>
          }
          nav={
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="ui-button" onClick={() => onNavigate?.("territory-1")} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, padding: "4px 11px", borderRadius: "5px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}>T1</button>
              <button className="ui-button" onClick={() => onNavigate?.("territory-2-creative")} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, padding: "4px 11px", borderRadius: "5px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}>T2</button>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, padding: "4px 11px", borderRadius: "5px", background: COLOR, color: "#1E1F38" }}>T3</span>
            </div>
          }
        />

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

        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "36px", alignItems: "stretch" }}>
          {/* Sidebar */}
          <div className="glass-light" style={{ width: "470px", flexShrink: 0, padding: "24px 20px", borderLeft: `3px solid ${COLOR}`, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
              {tab.sections.map((s, i) => (
                <button className="ui-button pill pill-sm" key={s.label} onClick={() => changeSection(i)} style={{
                  borderColor: i === sectionIdx ? COLOR : "rgba(255,255,255,0.15)",
                  background: i === sectionIdx ? COLOR : "none",
                  color: i === sectionIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", transition: "all 0.2s",
                }}>{s.label}</button>
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-sans)", fontSize: "18px", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
              <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{section.label}</span>
              <span style={{ display: "block" }}>{section.meta}</span>
            </div>

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
            className="carousel-stage carousel-stage-gold"
            onClick={advance}
            style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}
          >
            {canPage && (
              <button className="ui-button" onClick={(e) => { e.stopPropagation(); retreat(); }} style={{ ...arrowStyle, left: "12px" }}>&larr;</button>
            )}

            {item?.type === "image" ? (
              <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <AiImage src={item.src} alt={item.alt} style={{ maxWidth: "100%", maxHeight: "580px", objectFit: "contain", borderRadius: "8px", ...item.imgStyle }} />
                {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%" }}>{item.caption}</p>}
              </div>
            ) : item?.type === "row" ? (
              <div key={`row-${tabIdx}-${sectionIdx}-${itemIdx}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <div style={{ display: "flex", gap: "12px", flex: 1, alignItems: "center", justifyContent: "center" }}>
                  {item.images.map((img, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, alignItems: "center" }}>
                      <AiImage src={img.src} alt={img.alt} style={{ maxWidth: "100%", maxHeight: "540px", objectFit: "contain", borderRadius: "8px", display: "block" }} />
                    </div>
                  ))}
                </div>
                {item.note && <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%", margin: "0 auto" }}>{item.note}</p>}
              </div>
            ) : null}

            <button
              className={`ui-button${canPage ? "" : " stage-advance"}`}
              onClick={(e) => { e.stopPropagation(); advance(); }}
              style={{ ...arrowStyle, right: "12px" }}
            >&rarr;</button>
            {canPage && (
              <span style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                {itemIdx + 1} / {items.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
