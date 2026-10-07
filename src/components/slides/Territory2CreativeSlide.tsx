"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";
import { AiImage } from "../AiImage";
import { useDeckAdvance, useDeckRetreat } from "../SlideSequence";
import { useCreativeStops } from "./useCreativeStops";
import { SlideHeader } from "../SlideHeader";

type CarouselItem =
  | { type: "image"; src: string; alt: string; caption?: string; imgStyle?: React.CSSProperties }
  | { type: "row"; images: { src: string; alt: string; caption?: string }[]; note?: string }
  | { type: "image-script"; src: string; alt: string; imgStyle?: React.CSSProperties; scriptTitle: string; scriptLines: { text: string; direction?: string }[] }
  | { type: "placeholder"; label: string };

interface Section { label: string; meta: string; items: CarouselItem[] }
interface ScriptLine { dir: string; vis: string; vo: string }
interface Script { title: string; lines: ScriptLine[] | null }

const COLOR = "var(--color-french-broad)";
const TAB_LABELS = ["By Audience", "By Platform", "By Market", "Scripts"];
/** Scripts is a label without a TABS entry — it renders scripts, not artwork. */
const SCRIPTS_TAB = TAB_LABELS.length - 1;

const TABS: { id: string; sections: Section[] }[] = [
  {
    id: "audience",
    sections: [
      {
        label: "Experience Enthusiasts",
        meta: "55\u201364 \u00B7 HHI $158K",
        items: [
          { type: "image", src: "/creative/t2-nashville-moog-v2.webp", alt: "Nashville Broadway billboard \u2014 Weird sounds started here", caption: "Planted on Broadway in Music City, right where Nashville defines what music sounds like. This ad quietly rewrites the origin story \u2014 Asheville didn\u2019t follow the music industry, it invented an instrument that changed it." },
          { type: "image", src: "/creative/t2-spotify-podcast.webp", alt: "Spotify \u2014 Sounds Made Up podcast", caption: "A podcast that turns Asheville\u2019s lore into episodes: the Moog, Biltmore, handpan makers, Buckminster Fuller. Each story makes the place sound more unbelievable \u2014 and more real." },
        ],
      },
      {
        label: "Traveling Traditionalists",
        meta: "65\u201374 \u00B7 HHI $93K",
        items: [
          { type: "image", src: "/creative/t3-nashville-medical-billboard.webp", alt: "Nashville medical district billboard \u2014 Doctors Used to Prescribe Asheville", caption: "Context is everything. Place a historical fact where it hits hardest \u2014 outside a medical center, surrounded by healthcare workers who understand burnout. The truth does the selling: doctors really did prescribe Asheville.", imgStyle: { maxHeight: "35%", maxWidth: "50%" } },
          { type: "image", src: "/creative/t2-biltmore-castle.webp", alt: "Biltmore \u2014 Rumor has it", caption: "Turns a world-famous landmark into a rumor. The framing makes Biltmore feel like a secret you stumbled into, not a tourist stop you Googled." },
        ],
      },
      {
        label: "Energetic Families",
        meta: "45\u201354 \u00B7 HHI $115K",
        items: [
          { type: "image", src: "/creative/t2-nashville-whole-foods.webp", alt: "Nashville \u2014 Whole Foods foraging", caption: "Placed outside a Whole Foods in Nashville. The contrast writes the headline \u2014 this family forages for real. Energetic Families see their next adventure." },
          { type: "image", src: "/creative/t2-nashville-airport-campfire.webp", alt: "Nashville airport \u2014 he turned his phone off", caption: "Nashville airport travelers see someone who did the unthinkable. Three words that sound made up to anyone mid-scroll." },
        ],
      },
      {
        label: "Value Seekers",
        meta: "35\u201344 \u00B7 HHI $88K",
        items: [
          { type: "image", src: "/creative/t2-winter-banner.webp", alt: "Winter banner \u2014 weekends cost less", caption: "Solves the oldest problem in destination marketing: off-season. Instead of discounting the brand, it weaponizes the insider tone \u2014 \u2018you didn\u2019t hear it from us\u2019 makes a budget play feel like a secret worth sharing." },
        ],
      },
    ],
  },
  {
    id: "platform",
    sections: [
      {
        label: "OOH",
        meta: "Billboards, Airport, Transit, Elevator",
        items: [
          { type: "image", src: "/creative/t2-airport-bigfoot.webp", alt: "Airport OOH \u2014 According to locals", caption: "Placed in a competitor airport where every ad promises the expected. This one leans into Asheville\u2019s mythology \u2014 the kind of story travelers retell before they ever book." },
          { type: "image", src: "/creative/t2-greenville-billboard.webp", alt: "Greenville billboard \u2014 chased waterfalls", caption: "Sitting above a Greenville shopping center, the ad reframes a routine weekend. Asheville isn\u2019t competing with Greenville \u2014 it\u2019s offering what Greenville can\u2019t." },
          {
            type: "row",
            images: [
              { src: "/creative/t2-elevator-ooh.webp", alt: "Elevator OOH \u2014 waterfall", caption: "A QR code in a hotel elevator links to Asheville\u2019s real soundscape." },
              { src: "/creative/t2-chattanooga-airport.webp", alt: "Chattanooga airport \u2014 handpan", caption: "Placed in a competitor\u2019s airport. The instrument is strange, the headline is a dare." },
            ],
          },
        ],
      },
      {
        label: "Social",
        meta: "Instagram, TikTok, Reels",
        items: [
          { type: "image-script", src: "/creative/t2-instagram-profile.webp", alt: "Instagram \u2014 @exploreashevillenc profile", imgStyle: { maxHeight: "100%", maxWidth: "420px" }, scriptTitle: "Sample Reel Script \u2014 Doctors Used to Prescribe Asheville", scriptLines: [
            { text: "We heard a rumor that doctors used to prescribe Asheville." },
            { text: "Thaaaat... sounded made up. But who knows, maybe." },
            { text: "So, we did some digging.", direction: "Quick cuts: old newspaper clipping, historic photo, creator asking a local historian." },
            { text: "Turns out, the rumor\u2019s true." },
            { text: "Which honestly makes a lot of sense now that I\u2019m here.", direction: "Cut to river, mountains, deep breath." },
            { text: "This is by no means medical advice, but I mean, I\u2019d prescribe it too." },
          ] },
        ],
      },
      {
        label: "Audio / Streaming",
        meta: "Spotify, YouTube, Podcast",
        items: [
          { type: "image", src: "/creative/t2-spotify-podcast.webp", alt: "Spotify \u2014 Sounds Made Up podcast", caption: "A podcast that turns Asheville\u2019s lore into episodes. Each story makes the place sound more unbelievable \u2014 and more real." },
          {
            type: "row",
            images: [
              { src: "/creative/t2-spotify-soundtrack.webp", alt: "Spotify \u2014 Asheville Soundtrack", caption: "An album of real Asheville soundscapes on Spotify \u2014 rain, rivers, banjos, cicadas." },
              { src: "/creative/t2-youtube-waterfall.webp", alt: "YouTube \u2014 8 Hours of Waterfall Sounds", caption: "An 8-hour ambient video. The brand becomes a utility \u2014 people fall asleep to Asheville before they ever decide to visit." },
            ],
          },
        ],
      },
      {
        label: "Experiential",
        meta: "Projections, Events, Activations",
        items: [
          { type: "image", src: "/creative/t2-sasquatch-projection.webp", alt: "Sasquatch projection — Some lore is told. Some lore is howled.", caption: "A building-scale projection turns downtown into a stage. The QR code teaches you the call. The lore isn\u2019t just told \u2014 it\u2019s performed.", imgStyle: { maxHeight: "60%", maxWidth: "50%" } },
          { type: "image", src: "/creative/t2-moog-experience.webp", alt: "Moog x Explore Asheville — Sounds Made Up installation", caption: "A partnership with Moog Music \u2014 Asheville\u2019s own synthesizer icon. Visitors twist real Asheville sounds through Moog hardware and make something no one\u2019s heard before. The brand that invented electronic music helps prove Asheville literally sounds made up." },
        ],
      },
      {
        label: "Digital",
        meta: "Display, Programmatic",
        items: [
          { type: "image", src: "/creative/t2-biltmore-castle.webp", alt: "Biltmore — Rumor has it", caption: "Turns a world-famous landmark into a rumor. The framing makes Biltmore feel like a secret you stumbled into, not a tourist stop you Googled." },
        ],
      },
    ],
  },
  {
    id: "market",
    sections: [
      {
        label: "Nashville",
        meta: "Drive market, Airport, Broadway",
        items: [
          { type: "image", src: "/creative/t2-nashville-moog-v2.webp", alt: "Nashville Broadway billboard", caption: "Planted on Broadway in Music City. Asheville didn\u2019t follow the music industry, it invented an instrument that changed it." },
          { type: "image", src: "/creative/t3-nashville-medical-billboard.webp", alt: "Nashville medical district billboard", caption: "Place a historical fact where it hits hardest \u2014 outside a medical center.", imgStyle: { maxHeight: "35%", maxWidth: "50%" } },
          { type: "image", src: "/creative/t2-nashville-whole-foods.webp", alt: "Nashville Whole Foods", caption: "The contrast writes the headline \u2014 this family forages for real." },
          { type: "image", src: "/creative/t2-nashville-airport-campfire.webp", alt: "Nashville airport", caption: "Nashville airport travelers see someone who did the unthinkable." },
        ],
      },
      {
        label: "Greenville",
        meta: "Competitor market",
        items: [
          { type: "image", src: "/creative/t2-greenville-billboard.webp", alt: "Greenville billboard \u2014 chased waterfalls", caption: "Asheville isn\u2019t competing with Greenville \u2014 it\u2019s offering what Greenville can\u2019t." },
        ],
      },
      {
        label: "Chattanooga",
        meta: "Competitor market, Airport",
        items: [
          { type: "image", src: "/creative/t2-chattanooga-airport.webp", alt: "Chattanooga airport \u2014 handpan", caption: "Placed in a competitor\u2019s airport. The instrument is strange, the headline is a dare. Asheville steals attention on someone else\u2019s turf." },
        ],
      },
      {
        label: "In-Destination",
        meta: "Hotels, Streetscape",
        items: [
          { type: "image", src: "/creative/t2-elevator-ooh.webp", alt: "Elevator OOH \u2014 waterfall", caption: "A QR code in a hotel elevator links to Asheville\u2019s real soundscape. The ad doesn\u2019t describe the place \u2014 it lets you hear it." },
        ],
      },
    ],
  },
];

const SCRIPTS: Script[] = [
  {
    title: "Winter",
    lines: [
      { dir: "OPEN ON", vis: "Snow dusting the Blue Ridge. Bare branches. A quieter downtown. Breath visible in the cold.", vo: "You know, they say Asheville gets quieter in winter." },
      { dir: "CUT TO", vis: "A couple walking an empty trail. A cabin porch at golden hour. Steam rising from mugs.", vo: "Making it a really good time to visit." },
      { dir: "CUT TO", vis: "Wind through bare hardwoods. A frozen waterfall. A creek running under ice.", vo: "But according to the locals, winter\u2019s when you really start hearing things." },
      { dir: "CUT TO", vis: "A river rushing louder without the canopy. Birds sharper in the cold air. Snow crunching underfoot.", vo: "With less leaves, you better hear the sounds of nature." },
      { dir: "CUT TO", vis: "A blacksmith hammering. A potter at the wheel. A luthier bending wood. Workshops glowing warm.", vo: "With more time on their hands, you better hear the makers." },
      { dir: "CUT TO", vis: "Darkness. Woods. A strange knock echoes. Then another.", vo: "And that sound? Rumor has it we have a Bigfoot in the Blue Ridge." },
      { dir: "CUT TO", vis: "A group of strangers learning the Sasquatch call. Laughing. Trying again. Heading into the trees.", vo: "Which is how we got a group of folks learning to call him." },
      { dir: "SUPER", vis: "ASHEVILLE. SOUNDS MADE UP.", vo: "Hear for yourself this winter." },
    ],
  },
  {
    title: ":60 Spot",
    lines: [
      { dir: "OPEN ON", vis: "A chunk of snow falls off a tree branch in the foreground of a beautiful winter landscape.", vo: "They say Asheville gets so quiet in the winter you can hear the snow settle." },
      { dir: "CUT TO", vis: "Smoke rises from a cabin in the snow.", vo: "Rumor has it, a cabin in the Blue Ridge Mountains can fix anything." },
      { dir: "CUT TO", vis: "The family\u2019s hiking shoes narrowly miss a massive frozen footprint. A kid\u2019s shoe lands perfectly in the center of it.", vo: "Off the record, but you can hike the same trails as cryptids and legends." },
      { dir: "CUT TO", vis: "The family rounds the bend on a trail, revealing a beautiful waterfall.", vo: "Depends on who you ask, but if you follow the footprints, you\u2019ll find magic." },
      { dir: "CUT TO", vis: "The family attending a ceramics class.", vo: "Allegedly, the makers in this town want you to create." },
      { dir: "CUT TO", vis: "An older woman unwraps a gift, tears in her eyes.", vo: "Off the record, the ceramics you make here have special powers." },
      { dir: "CUT TO", vis: "A couple of elder millennials leave The Burger Bar. Look closely at the reflection in the door \u2014 Bigfoot is walking up.", vo: "No one\u2019s gonna believe you, but Bigfoot is a regular at The Burger Bar." },
      { dir: "SUPER", vis: "SOUNDS MADE UP. IT\u2019S ASHEVILLE.", vo: "" },
    ],
  },
  {
    title: ":30 Spot",
    lines: [
      { dir: "OPEN ON", vis: "A chunk of snow falls off a tree branch in the foreground of a beautiful winter landscape.", vo: "They say Asheville gets so quiet in the winter you can hear the snow settle." },
      { dir: "CUT TO", vis: "Smoke rises from a cabin in the snow.", vo: "Rumor has it, a cabin in the Blue Ridge Mountains can fix anything." },
      { dir: "CUT TO", vis: "The family\u2019s hiking shoes narrowly miss a massive frozen footprint. A kid\u2019s shoe lands perfectly in the center of it.", vo: "Off the record, but you can hike the same trails as cryptids and legends." },
      { dir: "CUT TO", vis: "The family rounds the bend on a trail, revealing a beautiful waterfall.", vo: "Depends on who you ask, but if you follow the footprints, you\u2019ll find magic." },
      { dir: "SUPER", vis: "SOUNDS MADE UP. IT\u2019S ASHEVILLE.", vo: "" },
    ],
  },
  {
    title: ":15 Spot",
    lines: [
      { dir: "OPEN ON", vis: "A chunk of snow falls off a tree branch in the foreground of a beautiful winter landscape.", vo: "They say Asheville gets so quiet in the winter you can hear the snow settle." },
      { dir: "CUT TO", vis: "Smoke rises from a cabin in the snow.", vo: "Rumor has it, a cabin in the Blue Ridge Mountains can fix anything." },
      { dir: "CUT TO", vis: "A couple of elder millennials leave The Burger Bar. Look closely at the reflection in the door \u2014 Bigfoot is walking up.", vo: "No one\u2019s gonna believe you, but Bigfoot is a regular at The Burger Bar." },
      { dir: "SUPER", vis: "SOUNDS MADE UP. IT\u2019S ASHEVILLE.", vo: "" },
    ],
  },
];

const PRINCIPLES = [
  { title: "The lore spreads itself.", desc: "Stories that sound made up get retold. Every visitor leaves with one, and the telling becomes the marketing." },
  { title: "The businesses create lore on purpose.", desc: "Secret menus, hidden legends, moonlit drum circles \u2014 locals build experiences that generate stories worth retelling." },
  { title: "You can\u2019t fake it.", desc: "The stories work because they\u2019re real. People can feel the difference between a campaign and a place that\u2019s actually like this." },
];

const arrowStyle: React.CSSProperties = {
  width: "44px", height: "44px", borderRadius: "50%",
  border: "2px solid var(--color-french-broad)",
  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
  color: "var(--color-french-broad)", fontSize: "24px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  position: "absolute" as const, top: "50%", transform: "translateY(-50%)", zIndex: 30,
};

export function Territory2CreativeSlide({ onNavigate }: SlideProps) {
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
      <div className="relative z-10 flex flex-col flex-1 min-h-0 slide-frame" style={{}}>
        <SlideHeader
          color={COLOR}
          eyebrow="Territory 02"
          title={
            <>
              ASHEVILLE. <span style={{ color: COLOR }}>SOUNDS MADE UP.</span>
            </>
          }
          nav={
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="ui-button" onClick={() => onNavigate?.("territory-1")} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, padding: "4px 11px", borderRadius: "5px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}>T1</button>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, padding: "4px 11px", borderRadius: "5px", background: COLOR, color: "#1E1F38" }}>T2</span>
              <button className="ui-button" onClick={() => onNavigate?.("territory-3-desc")} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, padding: "4px 11px", borderRadius: "5px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}>T3</button>
            </div>
          }
        />

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
          {TAB_LABELS.map((label, i) => (
            <button className="ui-button pill" key={label} onClick={() => changeTab(i)} style={{
              borderColor: i === tabIdx ? COLOR : "rgba(255,255,255,0.15)",
              background: i === tabIdx ? COLOR : "none",
              color: i === tabIdx ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {isScripts ? (
          <>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {SCRIPTS.map((s, i) => (
                <button className="ui-button" key={s.title} onClick={() => changeScript(i)} style={{
                  fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700,
                  padding: "5px 14px", borderRadius: "20px", border: "2px solid",
                  borderColor: i === scriptIdx ? COLOR : "rgba(255,255,255,0.15)",
                  background: i === scriptIdx ? COLOR : "none",
                  color: i === scriptIdx ? "white" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", transition: "all 0.2s",
                }}>{s.title}</button>
              ))}
            </div>

            {script.lines ? (
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="asset-placeholder" style={{ flex: 1, minHeight: "360px", marginBottom: "16px", fontSize: "22px" }}>
                    {script.title} &mdash; Production Pending
                  </div>
                  <div className="glass-light" style={{ padding: "16px 20px" }}>
                    <span className="type-label" style={{ fontSize: "16px", color: COLOR }}>Production</span>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.5 }}>
                      Sound-first filmmaking. Layered audio drives every frame &mdash; the place is heard before it&apos;s seen.
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
                        Asheville. Sounds Made Up.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="asset-placeholder" style={{ width: "80%", minHeight: "500px", fontSize: "24px" }}>
                  {script.title} &mdash; Script Coming Soon
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "36px", alignItems: "stretch" }}>
            <div className="glass-light" style={{ width: "470px", flexShrink: 0, padding: "24px 20px", borderLeft: `3px solid ${COLOR}`, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                {tab?.sections.map((s, i) => (
                  <button className="ui-button pill pill-sm" key={s.label} onClick={() => changeSection(i)} style={{
                    borderColor: i === sectionIdx ? COLOR : "rgba(255,255,255,0.15)",
                    background: i === sectionIdx ? COLOR : "none",
                    color: i === sectionIdx ? "white" : "rgba(255,255,255,0.5)",
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

            {/* The artwork pages the carousel. Deliberately not role="button":
                it is a surface, not a control, and the keyboard path is the
                deck's own forward step rather than a focus stop here. */}
            <div
              className={`carousel-stage carousel-stage-french`}
              onClick={advance}
              style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}
            >
              {items.length > 1 && (
                <button className="ui-button" onClick={(e) => { e.stopPropagation(); retreat(); }} style={{ ...arrowStyle, left: "12px" }}>&larr;</button>
              )}

              {item?.type === "image" ? (
                <div key={item.src} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "100%", maxHeight: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  <AiImage src={item.src} alt={item.alt} style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain", borderRadius: "8px", ...item.imgStyle }} />
                  {item.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "20px", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, maxWidth: "90%" }}>{item.caption}</p>}
                </div>
              ) : item?.type === "row" ? (
                <div key={`row-${tabIdx}-${sectionIdx}-${itemIdx}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  {item.note && <span style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 600, fontStyle: "italic", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{item.note}</span>}
                  <div style={{ display: "flex", gap: "12px", flex: 1 }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
                        <div style={{ borderRadius: "8px", overflow: "hidden", flex: 1 }}>
                          <AiImage src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </div>
                        {img.caption && <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{img.caption}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : item?.type === "image-script" ? (
                <div key={item.src} style={{ display: "flex", gap: "32px", alignItems: "flex-start", width: "100%", height: "100%", animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both", padding: "20px 40px" }}>
                  <AiImage src={item.src} alt={item.alt} style={{ objectFit: "contain", borderRadius: "8px", flexShrink: 0, ...item.imgStyle }} />
                  <div className="glass-light" style={{ flex: 0, minWidth: "320px", maxWidth: "360px", padding: "24px 28px", borderLeft: `3px solid ${COLOR}`, overflow: "auto", maxHeight: "100%" }}>
                    <span className="type-label" style={{ fontSize: "16px", color: COLOR, marginBottom: "16px", display: "block" }}>{item.scriptTitle}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {item.scriptLines.map((line, i) => (
                        <div key={i}>
                          {line.direction && (
                            <p style={{ fontFamily: "monospace", fontSize: "18px", color: "rgba(255,255,255,0.25)", marginBottom: "4px", fontStyle: "italic" }}>
                              [{line.direction}]
                            </p>
                          )}
                          <p style={{ fontFamily: "var(--font-slab)", fontSize: "21px", fontStyle: "italic", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                            &ldquo;{line.text}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
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
