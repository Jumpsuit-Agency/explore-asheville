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
  | { type: "image"; src: string; alt: string; caption?: string; imgStyle?: React.CSSProperties }
  | { type: "row"; images: { src: string; alt: string; caption?: string }[]; note?: string }
  | { type: "placeholder"; label: string };

const SECTIONS: CarouselSection[] = [
  {
    label: "Example 1",
    format: "OOH / Streaming / Owned Platform",
    audience: "All segments",
    market: "Elevator, Airport, Transit",
    items: [
      {
        type: "row",
        images: [
          { src: "/creative/t2-elevator-ooh.png", alt: "Elevator OOH — waterfall", caption: "A QR code in a hotel elevator links to Asheville\u2019s real soundscape. The ad doesn\u2019t describe the place \u2014 it lets you hear it. Curiosity does the rest." },
          { src: "/creative/t2-chattanooga-airport.png", alt: "Chattanooga airport — handpan", caption: "Placed in a competitor\u2019s airport. The instrument is strange, the woman is real, and the headline is a dare. Asheville steals attention on someone else\u2019s turf." },
        ],
      },
      {
        type: "row",
        images: [
          { src: "/creative/t2-spotify-soundtrack.png", alt: "Spotify — Asheville Soundtrack", caption: "An album of real Asheville soundscapes on Spotify \u2014 rain, rivers, banjos, cicadas. Meets people where they already are: sleeping, meditating, working, traveling." },
          { src: "/creative/t2-youtube-waterfall.png", alt: "YouTube — 8 Hours of Waterfall Sounds", caption: "An 8-hour ambient video on YouTube. The brand becomes a utility \u2014 people fall asleep to Asheville before they ever decide to visit." },
        ],
      },
      { type: "image", src: "/creative/t2-sound-library.png", alt: "Sample Asheville — Sound Library", caption: "The campaign's owned platform: an open-source sound library where artists, visitors, and makers upload, remix, and create from Asheville's raw audio. Turns the audience into contributors and the brand into a living commons — every creation spreads the soundscape further.", imgStyle: { maxWidth: "50%", maxHeight: "55%" } },
    ],
  },
  {
    label: "Example 2",
    format: "Streaming / Audio",
    audience: "Experience Enthusiasts, Value Seekers",
    market: "Spotify, YouTube, Podcast platforms",
    items: [
      { type: "image", src: "/creative/t2-nashville-moog.png", alt: "Nashville OOH — Moog synthesizer", caption: "Planted on Broadway in Music City, right where Nashville defines what music sounds like. This ad quietly rewrites the origin story — Asheville didn't follow the music industry, it invented an instrument that changed it. The Moog isn't nostalgia. It's a claim." },
      { type: "image", src: "/creative/t2-airport-bigfoot.png", alt: "Airport OOH — According to locals", caption: "Placed in a competitor airport where every ad promises the expected. This one leans into Asheville's mythology — the kind of story travelers retell before they ever book. It doesn't sell a destination. It sells the feeling that something out there is worth finding." },
      { type: "image", src: "/creative/t2-sasquatch-search-party.png", alt: "Sasquatch Search Party — street poster", caption: "Built from Western North Carolina's real Sasquatch lore and festival culture, this turns the myth into something visitors can actually join. The knock, the call, the silence in the woods become both a self-organizing Asheville ritual and the sound of the campaign itself — spreading through YouTube, podcast, social, and the stories people tell afterward." },
      { type: "image", src: "/creative/t2-spotify-podcast.png", alt: "Spotify — Sounds Made Up podcast", caption: "A podcast that turns Asheville\u2019s lore into episodes: the Moog, Biltmore, handpan makers, Buckminster Fuller. Each story makes the place sound more unbelievable \u2014 and more real." },
      { type: "image", src: "/creative/t2-biltmore-castle.png", alt: "Biltmore — Rumor has it", caption: "Turns a world-famous landmark into a rumor. The framing makes Biltmore feel like a secret you stumbled into, not a tourist stop you Googled. It invites the viewer to discover rather than consume — and positions Asheville as a place where even the real things sound made up." },
      { type: "image", src: "/creative/t2-winter-banner.png", alt: "Winter banner — weekends cost less", caption: "Solves the oldest problem in destination marketing: off-season. Instead of discounting the brand, it weaponizes the insider tone — 'you didn't hear it from us' makes a budget play feel like a secret worth sharing. Extends the campaign into Q4 without breaking character." },
    ],
  },
  {
    label: "Example 3",
    format: "OOH / Competitor Markets",
    audience: "Energetic Families, Traveling Traditionalists",
    market: "Nashville, Greenville, competitor corridors",
    items: [
      { type: "image", src: "/creative/t2-nashville-whole-foods.png", alt: "Nashville — Whole Foods foraging", caption: "Placed outside a Whole Foods in Nashville. The contrast writes the headline \u2014 this family forages for real. Energetic Families see their next adventure; everyone else sees a story they want to tell." },
      { type: "image", src: "/creative/t2-nashville-airport-campfire.png", alt: "Nashville airport — he turned his phone off", caption: "Nashville airport travelers see someone who did the unthinkable. Three words that sound made up to anyone mid-scroll \u2014 and plant the seed for a different kind of trip." },
      { type: "image", src: "/creative/t2-greenville-billboard.png", alt: "Greenville billboard — chased waterfalls", caption: "Sitting above a Greenville shopping center, the ad reframes a routine weekend. Asheville isn\u2019t competing with Greenville \u2014 it\u2019s offering what Greenville can\u2019t." },
    ],
  },
];

const arrowStyle: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "2px solid var(--color-french-broad)",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
  color: "var(--color-french-broad)",
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

export function Territory2CreativeSlide({ onNavigate }: SlideProps) {
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
          <span className="type-label" style={{ fontSize: "12px", color: "var(--color-french-broad)", marginBottom: "12px", display: "block" }}>
            Territory 02 &middot; Sample Creative
          </span>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "56px", fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            ASHEVILLE.{" "}
            <span style={{ color: "var(--color-french-broad)" }}>SOUNDS MADE UP.</span>
          </h2>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "40px", alignItems: "center" }}>
          <div className="glass-light" style={{ width: "340px", flexShrink: 0, padding: "32px 28px", borderLeft: "3px solid var(--color-french-broad)" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              {SECTIONS.map((s, i) => (
                <button className="interactive" key={s.label} onClick={() => goToSection(i)} style={{
                  fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, padding: "6px 14px", borderRadius: "20px",
                  border: "1px solid", borderColor: i === sectionIdx ? "var(--color-french-broad)" : "rgba(255,255,255,0.15)",
                  background: i === sectionIdx ? "var(--color-french-broad)" : "none",
                  color: i === sectionIdx ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
                }}>{s.label}</button>
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
              <span style={{ display: "block", marginBottom: "4px" }}><span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{section.format}</span></span>
              <span style={{ display: "block", marginBottom: "4px" }}>Audience: {section.audience}</span>
              <span style={{ display: "block" }}>Market: {section.market}</span>
            </div>

            <span className="type-label" style={{ fontSize: "10px", color: "var(--color-french-broad)", marginBottom: "12px", display: "block" }}>Campaign Principles</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                  The soundscape IS the proof.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                  Banjo strings, rushing water, crowd noise — you hear Asheville before anyone explains it.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                  The lore spreads itself.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                  Stories that sound made up get retold. Every visitor leaves with one, and the telling becomes the marketing.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                  The stranger you become is the story.
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                  The campaign doesn&apos;t just sell Asheville&apos;s lore — it promises yours. You sang in public. You foraged dinner. You sound a little made up now, too.
                </p>
              </div>
            </div>

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
                <img src={item.src} alt={item.alt} style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain", borderRadius: "8px", ...item.imgStyle }} />
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
