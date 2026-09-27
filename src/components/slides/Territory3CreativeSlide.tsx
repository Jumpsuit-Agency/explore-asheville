"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

type CarouselItem =
  | { type: "image"; src: string; alt: string; caption?: string; headline?: string; layout?: "side"; imgStyle?: React.CSSProperties }
  | { type: "row"; images: { src: string; alt: string; caption?: string }[]; note?: string }
  | { type: "placeholder"; label: string };

interface Section { label: string; meta: string; items: CarouselItem[] }
interface ScriptLine { dir: string; vis: string; vo: string }
interface Script { title: string; lines: ScriptLine[] | null }

const COLOR = "var(--color-goldenrod)";
const TAB_LABELS = ["By Audience", "By Platform", "By Market", "Scripts"];

const TABS: { id: string; sections: Section[] }[] = [
  {
    id: "audience",
    sections: [
      {
        label: "Value Seekers",
        meta: "35\u201344 \u00B7 HHI $88K",
        items: [
          { type: "image", src: "/creative/t3-highway-billboard.png", alt: "Highway billboard \u2014 You Asked for a Sign", caption: "A rainbow, a mountain vista, and a simple truth on the highway. For Traveling Traditionalists, the sign doesn\u2019t need to be clever \u2014 it just needs to feel like fate." },
          { type: "image", src: "/creative/t3-magic8ball-billboard.png", alt: "Highway billboard — Outlook Good, How Many Signs Do You Need?", caption: "A Magic 8-Ball on a highway billboard. The universe is answering \u2014 and the exit is two miles away." },
          { type: "image", src: "/creative/t3-crystal-billboard.png", alt: "Charlotte billboard — A Crystal-Clear Sign to Visit", caption: "Planted on I-77 in Charlotte. The crystals burst off the board \u2014 impossible to ignore, impossible to forget. The sign is the sign." },
        ],
      },
      {
        label: "Experience Enthusiasts",
        meta: "55\u201364 \u00B7 HHI $158K",
        items: [
          { type: "image", src: "/creative/t3-enthusiasts-tshirt.png", alt: "Nashville Scene spread — Now that's a big sign", caption: "The sign is standing right in front of you at a concert. A magazine spread that turns a stranger\u2019s t-shirt into a travel ad \u2014 placed in Nashville Scene, where the audience already lives." },
        ],
      },
      {
        label: "Traveling Traditionalists",
        meta: "65\u201374 \u00B7 HHI $93K",
        items: [
          { type: "image", src: "/creative/t3-traditionalists-ctv.png", alt: "Couple watching CTV ad — downtown Asheville winter scene with campaign banners: You Asked for a Sign, Some Signs Feel Familiar", caption: "A winter evening, a familiar couch, and a place that keeps showing up. CTV meets Traditionalists exactly where they are — at home, unhurried, ready to be moved by a place that feels like it\u2019s been waiting for them." },
        ],
      },
      {
        label: "Energetic Families",
        meta: "45\u201354 \u00B7 HHI $115K",
        items: [
          { type: "image", src: "/creative/t3-families-fishing.jpeg", alt: "Magazine spread \u2014 Dad cried. Sasquatch got the photo. French Broad River, Asheville NC. Sighting #278, Filed by the Head of Lore.", caption: "Dad cried. Sasquatch got the photo. A magazine spread that turns a family moment into a sighting \u2014 filed by the Head of Lore himself." },
        ],
      },
    ],
  },
  {
    id: "platform",
    sections: [
      {
        label: "Guerrilla",
        meta: "Sidewalk, Stencils, Stunts",
        items: [
          {
            type: "row",
            images: [
              { src: "/creative/t3-indy-bigfoot-wheatpaste.png", alt: "Bigfoot wheat-pasting Asheville signs in Indianapolis" },
              { src: "/creative/t3-indy-bigfoot-cardboard.png", alt: "Bigfoot holding cardboard Asheville sign at Crossroads of America" },
              { src: "/creative/t3-indy-bigfoot-stencil.png", alt: "Bigfoot stenciling Asheville on the sidewalk outside Lucas Oil Stadium" },
            ],
            note: "Sas goes on tour. Our Sasquatch hits key drive markets doing \u201Cgorilla marketing\u201D \u2014 wheat-pasting posters, holding cardboard signs, stenciling sidewalks outside stadiums. Every city gets its own sighting. Every sighting becomes content.",
          },
          {
            type: "row",
            images: [
              { src: "/creative/t3-bigfoot-news.png", alt: "WTHR news broadcast \u2014 The Weirdest Tourism Campaign of the Year Has Sasquatch Recruiting Visitors for Asheville" },
              { src: "/creative/t3-bigfoot-gas-news.png", alt: "WTHR news broadcast \u2014 Sasquatch Is Filling Up Knoxville to Send Drivers to Asheville" },
            ],
            note: "The sightings earn media. A hiker\u2019s photo goes viral. Local news picks it up. The campaign generates its own coverage \u2014 because a Sasquatch shaking a Magic 8-Ball on live TV is a story no newsroom can resist.",
          },
          {
            type: "row",
            images: [
              { src: "/creative/t3-sas-asheville-chronicle.png", alt: "The Asheville Chronicle front page \u2014 Sasquatch Makes It Back to Asheville" },
              { src: "/creative/t3-sas-behind-all-signs.png", alt: "Collage showing Sasquatch hidden in every touchpoint \u2014 billboards, airport living walls, downtown banners, hotel elevators, coffee sleeves, posters, construction signs" },
            ],
            note: "Sasquatch was behind all the signs all along \u2014 and now he\u2019s the one spotting you. After a series of roadside sightings and viral photos across drive markets, he\u2019s spotted back on Asheville\u2019s streets. The campaign becomes a story with a payoff. He\u2019s not the attraction. Asheville is. He just kept pointing people toward it until they finally showed up.",
          },
          {
            type: "image",
            src: "/creative/t3-sas-head-of-lore.png",
            alt: "WLOS News 13 broadcast \u2014 Explore Asheville Hires Sasquatch as New Head of Lore",
            caption: "The final act. After months of mysterious sightings, Explore Asheville makes it official: Sasquatch is hired as Head of Lore. The campaign earns its ultimate piece of media \u2014 a press conference, a badge, and a story every outlet in the region wants to run.",
          },
        ],
      },
      {
        label: "Social / UGC",
        meta: "Instagram, TikTok, Organic",
        items: [
          {
            type: "row",
            images: [
              { src: "/creative/t3-instagram-profile.png", alt: "Instagram profile \u2014 Asheville Is Following You" },
              { src: "/creative/t3-instagram-tshirt-v3.png", alt: "Instagram post \u2014 concert tee" },
              { src: "/creative/t3-instagram-cardinal.png", alt: "Instagram post \u2014 cardinal on porch" },
            ],
            note: "Sas isn\u2019t the only one delivering signs. The universe is. A follow notification, a stranger\u2019s t-shirt, a bird on your porch \u2014 the feed becomes a stream of evidence that Asheville is calling you personally. The social engine: anyone who tags a rainbow, a mountain, good food, live music \u2014 anything uniquely Asheville \u2014 triggers @ExploreAsheville to follow them. No DM. No ad. Just a follow. The sign finds you.",
          },
          {
            type: "image",
            src: "/creative/t3-real-ugc-asheville.png",
            alt: "Real Instagram story from Downtown Asheville \u2014 person walking in cardboard boxes",
            headline: "EVERY POST IS A SIGN.\nPeople who love Asheville don\u2019t just talk about it.\nThey point others toward it.",
            caption: "While building this pitch, a friend of Nicole\u2019s from Lexington posted this. How many signs do you need?",
            layout: "side",
          },
        ],
      },
      {
        label: "In-Destination",
        meta: "Hotels, Cafes, Shops, Streetscape",
        items: [
          { type: "image", src: "/creative/t3-in-destination-touchpoints-v2.png", alt: "In-destination branded touchpoints — key cards, luggage tags, coffee sleeves, matchbooks, postcards, hotel lobby screens", caption: "Once they arrive, every touchpoint confirms it: the signs worked. Key cards, luggage tags, coffee sleeves, matchbooks, postcards, and lobby screens turn the visit into a payoff — and a first-timer into an evangelist." },
          { type: "image", src: "/creative/t3-sas-believes-in-you.png", alt: "Sasquatch posting a 'Sasquatch Believes in You' flyer on a downtown Asheville bulletin board", caption: "Sas made it to Asheville too. He\u2019s not recruiting anymore \u2014 he\u2019s welcoming. A wheat-pasted flyer on a downtown bulletin board that turns the guerrilla campaign into an in-destination payoff." },
        ],
      },
      {
        label: "OOH / Ambient",
        meta: "Billboards, Gas Pumps, Transit",
        items: [
          { type: "image", src: "/creative/t3-highway-billboard.png", alt: "Highway billboard \u2014 You Asked for a Sign", caption: "Meet people mid-journey \u2014 when they\u2019re already moving and open to suggestion. A message that doesn\u2019t feel like an ad feels like the universe answering." },
          { type: "image", src: "/creative/t3-gas-pump.png", alt: "Gas pump screen \u2014 You Have Enough Gas to Make It", caption: "Turn dead time into decision time. Ambient media in mundane moments makes the campaign feel omnipresent." },
          { type: "image", src: "/creative/t3-austin-billboard.png", alt: "Austin highway billboard \u2014 Nonstop to Asheville? Looks Like Another Sign.", caption: "Plant the sign in another city\u2019s skyline \u2014 right where the target audience already lives." },
          { type: "image", src: "/creative/t3-bus-station-signs.png", alt: "Bus station takeover \u2014 How Many Signs Do You Need?", caption: "Dominate a single location so completely that the concept becomes the environment. The volume is the message." },
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
          { type: "image", src: "/creative/t3-austin-billboard.png", alt: "Austin highway billboard", caption: "Plant the sign in another city\u2019s skyline \u2014 right where the target audience already lives. The campaign crosses state lines." },
          { type: "image", src: "/creative/t3-airport-fresh-air.png", alt: "Airport living wall installation — The Fresh Air\u2019s Been Trying to Find You", caption: "A living wall takeover at the gate. Vines spill over the frame, nature breaks through the terminal \u2014 the fresh air found you before you even boarded." },
          { type: "image", src: "/creative/t3-atlanta-nature-billboard.png", alt: "Atlanta street-level billboard \u2014 Nature\u2019s Been Trying to Reach You", caption: "A living wall in the middle of Atlanta. Nature is literally breaking through the concrete to deliver the message." },
        ],
      },
      {
        label: "Drive Markets",
        meta: "Highway, Gas Stations, Transit",
        items: [
          { type: "image", src: "/creative/t3-highway-billboard.png", alt: "Highway billboard", caption: "Meet people mid-journey \u2014 when they\u2019re already moving and open to suggestion." },
          { type: "image", src: "/creative/t3-gas-pump.png", alt: "Gas pump screen", caption: "Turn dead time into decision time. Ambient media in mundane moments." },
          { type: "image", src: "/creative/t3-bus-station-signs.png", alt: "Bus station takeover", caption: "Dominate a single location so completely that the concept becomes the environment." },
        ],
      },
      {
        label: "In-Destination",
        meta: "Highway Approach, Arrival",
        items: [
          { type: "image", src: "/creative/t3-moving-interstate.png", alt: "Billboard — We're literally moving the interstate for you.", caption: "References the real I-26 construction \u2014 a fact everyone driving in already knows. Turns infrastructure into proof that Asheville is pulling you closer." },
          { type: "image", src: "/creative/t3-expect-delays.png", alt: "Billboard — Expect Delays. You'll want to stay a while.", caption: "Hijacks a road sign everyone dreads and turns it into an invitation. The construction cone is the sign. The delay is the point." },
          { type: "image", src: "/creative/t3-construction-sign.png", alt: "Construction site banner \u2014 This Is Your Sign to Look Ahead", caption: "Turn construction into campaign. A site barrier becomes a window to the mountains \u2014 \u201CThis is your sign to look ahead.\u201D The city\u2019s rebuilding is the sign." },
        ],
      },
    ],
  },
];

const SCRIPTS: Script[] = [
  {
    title: "Winter",
    lines: [
      { dir: "VO", vis: "", vo: "Asheville\u2019s always giving you signs." },
      { dir: "", vis: "", vo: "But in the winter, they get harder to miss." },
      { dir: "", vis: "", vo: "Your calendar opens up." },
      { dir: "", vis: "", vo: "A nonstop flight drops in price." },
      { dir: "", vis: "", vo: "The hotel you love has a room." },
      { dir: "", vis: "", vo: "111." },
      { dir: "", vis: "", vo: "The restaurant you follow has a table." },
      { dir: "", vis: "", vo: "The class you bookmarked has plenty of space." },
      { dir: "", vis: "", vo: "Even the forecast looks suspiciously perfect." },
      { dir: "", vis: "", vo: "The road is empty." },
      { dir: "", vis: "", vo: "The trail is too." },
      { dir: "", vis: "", vo: "You get the table." },
      { dir: "", vis: "", vo: "And the view." },
      { dir: "_", vis: "Far across the ridge, barely distinguishable from the trees, a large silhouette moves once\u2026 then disappears. One of them squints:", vo: "" },
      { dir: "PARTNER", vis: "", vo: "Did you\u2014" },
      { dir: "OTHER", vis: "", vo: "Yeah." },
      { dir: "", vis: "", vo: "At some point\u2026" },
      { dir: "", vis: "", vo: "How many signs do you need?" },
      { dir: "SUPER", vis: "ASHEVILLE. HOW MANY SIGNS DO YOU NEED?", vo: "" },
    ],
  },
  { title: ":60 Spot", lines: null },
  { title: ":30 Spot", lines: null },
  { title: ":15 Spot", lines: null },
  {
    title: "Radio",
    lines: [
      { dir: "_", vis: "Weird Asheville Radio: Sas is the media buyer.", vo: "" },
      { dir: "", vis: "", vo: "Once Sas becomes Head of Lore, we realize he\u2019s been buying the radio ads too. And they\u2019re\u2026 not normal." },
      { dir: "", vis: "", vo: "" },
      { dir: "_", vis: "Sample spots:", vo: "" },
      { dir: "SPOT 1", vis: "A MiniMoog tone plays.", vo: "\u201CThis sound was made in Asheville. So was this one. And this one. Come make yours.\u201D" },
      { dir: "SPOT 2", vis: "Calm pharma-ad voice.", vo: "\u201CDoctors have been prescribing Asheville since 1899. Ask your doctor if Asheville is right for you.\u201D" },
      { dir: "SPOT 3", vis: "Sas filing a field report.", vo: "\u201CHuman sighting number 413. Couple crying at an overlook. Cause unknown. Probably the view.\u201D" },
    ],
  },
];

const PRINCIPLES = [
  { title: "Every touchpoint is a sign.", desc: "The media plan becomes part of the idea. Every ad, billboard, search result and retargeting hit feels less like advertising \u2014 and more like Asheville finding you." },
  { title: "Love is the engine.", desc: "People who love Asheville can\u2019t help talking about it. Their recommendations, stories, photos and invitations become signs of their own. We don\u2019t manufacture the affection. We give it somewhere to go." },
  { title: "Visitors become the campaign.", desc: "Fall for Asheville and you start sending signs back into the world: a story to a friend, a saved post, a recommendation, a reason to go. The cosmic joke is that eventually, there is no campaign. Just people pointing people toward Asheville." },
];

const arrowStyle: React.CSSProperties = {
  width: "44px", height: "44px", borderRadius: "50%",
  border: "2px solid var(--color-goldenrod)",
  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
  color: "var(--color-goldenrod)", fontSize: "18px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  position: "absolute" as const, top: "50%", transform: "translateY(-50%)", zIndex: 10,
};

export function Territory3CreativeSlide({ onNavigate }: SlideProps) {
  const [tabIdx, setTabIdx] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [scriptIdx, setScriptIdx] = useState(0);

  const changeTab = (i: number) => { setTabIdx(i); setSectionIdx(0); setItemIdx(0); };
  const changeSection = (i: number) => { setSectionIdx(i); setItemIdx(0); };

  const isScripts = tabIdx === 3;
  const tab = !isScripts ? TABS[tabIdx] : null;
  const section = tab ? tab.sections[sectionIdx] : null;
  const items = section ? section.items : [];
  const item = items[itemIdx];
  const script = SCRIPTS[scriptIdx];

  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "60px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "16px" }}>
          <span className="type-label" style={{ fontSize: "12px", color: COLOR, marginBottom: "8px", display: "block" }}>
            Territory 03
          </span>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "48px", fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            ASHEVILLE. <span style={{ color: COLOR }}>HOW MANY SIGNS DO YOU NEED?</span>
          </h2>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
          {TAB_LABELS.map((label, i) => (
            <button key={label} onClick={() => changeTab(i)} style={{
              fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700,
              padding: "6px 16px", borderRadius: "20px", border: "1px solid",
              borderColor: i === tabIdx ? COLOR : "rgba(255,255,255,0.15)",
              background: i === tabIdx ? COLOR : "none",
              color: i === tabIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {isScripts ? (
          <>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {SCRIPTS.map((s, i) => (
                <button key={s.title} onClick={() => setScriptIdx(i)} style={{
                  fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700,
                  padding: "5px 14px", borderRadius: "20px", border: "2px solid",
                  borderColor: i === scriptIdx ? COLOR : "rgba(255,255,255,0.15)",
                  background: i === scriptIdx ? COLOR : "none",
                  color: i === scriptIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", transition: "all 0.2s",
                }}>{s.title}</button>
              ))}
            </div>

            {script.lines ? (
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="asset-placeholder" style={{ flex: 1, minHeight: "360px", marginBottom: "16px", fontSize: "16px" }}>
                    {script.title} &mdash; Production Pending
                  </div>
                  <div className="glass-light" style={{ padding: "16px 20px" }}>
                    <span className="type-label" style={{ fontSize: "9px", color: COLOR }}>Production</span>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.5 }}>
                      The signs become the story. Every touchpoint is a moment in the narrative &mdash; discovered, not delivered.
                    </p>
                  </div>
                </div>
                <div style={{ overflow: "auto", paddingRight: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {script.lines.map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: "16px" }}>
                        <span style={{
                          fontFamily: "monospace", fontSize: "10px", fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "0.05em",
                          color: s.dir === "FINAL" || s.dir === "SUPER" || s.dir === "_" ? COLOR : "rgba(255,255,255,0.25)",
                          minWidth: "52px", paddingTop: "4px", flexShrink: 0,
                        }}>{s.dir === "_" ? "" : s.dir}</span>
                        <div>
                          <p style={{
                            fontFamily: "var(--font-slab)",
                            fontSize: s.dir === "SUPER" ? "18px" : "15px",
                            fontWeight: s.dir === "SUPER" ? 800 : 400,
                            color: s.dir === "SUPER" || s.dir === "_" ? COLOR : "rgba(255,255,255,0.45)",
                            lineHeight: 1.5,
                          }}>{s.vis}</p>
                          {s.vo && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontStyle: "italic", color: "rgba(255,255,255,0.3)", lineHeight: 1.5, marginTop: "2px" }}>{s.vo}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="asset-placeholder" style={{ width: "80%", minHeight: "500px", fontSize: "16px" }}>
                  {script.title} &mdash; Coming Soon
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", gap: "36px", alignItems: "stretch" }}>
            <div className="glass-light" style={{ width: "320px", flexShrink: 0, padding: "24px 20px", borderLeft: `3px solid ${COLOR}`, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                {tab?.sections.map((s, i) => (
                  <button key={s.label} onClick={() => changeSection(i)} style={{
                    fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700,
                    padding: "5px 12px", borderRadius: "20px", border: "1px solid",
                    borderColor: i === sectionIdx ? COLOR : "rgba(255,255,255,0.15)",
                    background: i === sectionIdx ? COLOR : "none",
                    color: i === sectionIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>{s.label}</button>
                ))}
              </div>

              {section && (
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
                  <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{section.label}</span>
                  <span style={{ display: "block" }}>{section.meta}</span>
                </div>
              )}

              <span className="type-label" style={{ fontSize: "10px", color: COLOR, marginBottom: "12px", display: "block" }}>Campaign Principles</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", flex: 1 }}>
                {PRINCIPLES.map((p, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <span onClick={() => onNavigate?.(3)} style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>
                &larr; Back to Three Territories
              </span>
            </div>

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
              {items.length > 1 && (
                <button onClick={() => setItemIdx((itemIdx - 1 + items.length) % items.length)} style={{ ...arrowStyle, left: "12px" }}>&larr;</button>
              )}

              {item?.type === "image" && item.layout === "side" ? (
                <div key={item.src} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "40px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  <img src={item.src} alt={item.alt} style={{ maxWidth: "45%", maxHeight: "600px", objectFit: "contain", borderRadius: "8px", ...item.imgStyle }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                    {item.headline && <p style={{ fontFamily: "var(--font-sans)", fontSize: "24px", fontWeight: 800, color: "white", lineHeight: 1.3, whiteSpace: "pre-line" }}>{item.headline}</p>}
                    {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item.caption}</p>}
                  </div>
                </div>
              ) : item?.type === "image" ? (
                <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  {item.headline && <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.3, maxWidth: "90%", whiteSpace: "pre-line" }}>{item.headline}</p>}
                  <img src={item.src} alt={item.alt} style={{ maxWidth: "100%", maxHeight: item.headline ? "460px" : "580px", objectFit: "contain", borderRadius: "8px", ...item.imgStyle }} />
                  {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%" }}>{item.caption}</p>}
                </div>
              ) : item?.type === "row" ? (
                <div key={`row-${tabIdx}-${sectionIdx}-${itemIdx}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  <div style={{ display: "flex", gap: "12px", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0, alignItems: "center" }}>
                        <img src={img.src} alt={img.alt} style={{ maxWidth: "100%", maxHeight: "540px", objectFit: "contain", borderRadius: "8px", display: "block" }} />
                        {img.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{img.caption}</p>}
                      </div>
                    ))}
                  </div>
                  {item.note && <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%", margin: "0 auto" }}>{item.note}</p>}
                </div>
              ) : item?.type === "placeholder" ? (
                <div key={item.label} className="asset-placeholder" style={{ width: "100%", minHeight: "400px", fontSize: "16px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  {item.label}
                </div>
              ) : null}

              {items.length > 1 && (
                <button onClick={() => setItemIdx((itemIdx + 1) % items.length)} style={{ ...arrowStyle, right: "12px" }}>&rarr;</button>
              )}
              {items.length > 1 && (
                <span style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
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
