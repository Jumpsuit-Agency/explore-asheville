"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";
import { useSlideSequence } from "../SlideSequence";

const COLOR = "var(--color-goldenrod)";

interface Beat {
  label: string;
  season: string;
  headline: string;
  images: { src: string; alt: string }[];
  caption: string;
  heroLast?: boolean;
  grid?: boolean;
}

const BEAT_KICKERS: Record<number, string> = {
  0: "Something strange is happening in Asheville\u2019s drive markets.",
  1: "Turns out, Sasquatch has been behind the signs all along.",
  2: "The internet starts connecting the dots.",
  3: "And he\u2019s absolutely obsessed.",
  4: "Now he has resources and access.",
  5: "And the new Head of Lore gets to work.",
  6: "Sasquatch doesn\u2019t advertise Asheville. He lives here.",
  7: "The story keeps going. The legend keeps growing.",
};

const BEATS: Beat[] = [
  {
    label: "Phase 1",
    season: "Winter 2027 \u2014 Dec\u2013Feb",
    headline: "The sightings begin. Social takes off.",
    images: [
      { src: "/creative/t3-indy-bigfoot-wheatpaste.webp", alt: "Bigfoot wheat-pasting Asheville signs in Indianapolis" },
      { src: "/creative/t3-indy-bigfoot-cardboard.webp", alt: "Bigfoot holding cardboard Asheville sign" },
      { src: "/creative/t3-indy-bigfoot-stencil.webp", alt: "Bigfoot stenciling Asheville on the sidewalk" },
      { src: "/creative/t3-nashvillenews-sighting.webp", alt: "@nashvillenews TikTok \u2014 Big Foot sighting in Tennessee, Asheville declines to comment" },
    ],
    caption: "A mysterious figure shows up in drive markets \u2014 wheat-pasting posters, holding cardboard signs, stenciling sidewalks. Launching in winter is the move: his fur was made for it, and a Sasquatch in a snowstorm could drive people to Asheville faster than any digital campaign. Nobody knows what it is yet. They just know it\u2019s weird enough to post.",
  },
  {
    label: "Phase 2",
    season: "Winter 2027 \u2014 Jan\u2013Feb",
    headline: "Local media gets involved.",
    images: [
      { src: "/creative/t3-bigfoot-news.webp", alt: "WTHR news broadcast \u2014 The Weirdest Tourism Campaign of the Year" },
      { src: "/creative/t3-bigfoot-gas-news.webp", alt: "WTHR news broadcast \u2014 Sasquatch Is Filling Up Knoxville" },
    ],
    caption: "The posts catch newsrooms. A Sasquatch wheat-pasting tourism signs outside a stadium? That\u2019s a segment. The campaign starts generating its own earned media \u2014 no pitch required.",
  },
  {
    label: "Phase 3",
    season: "Spring 2027 \u2014 Mar",
    headline: "Digital captures the moment. And the easter egg.",
    images: [
      { src: "/creative/t3-media-search-results.webp", alt: "Google search results for Sasquatch Asheville sign" },
      { src: "/creative/t3-chatgpt-sasquatch-answer.webp", alt: "ChatGPT answering 'what's the Sasquatch Asheville thing' with full campaign breakdown" },
      { src: "/creative/t3-sas-behind-all-signs.webp", alt: "Collage showing Sasquatch hidden in every touchpoint" },
    ],
    heroLast: true,
    caption: "Search spikes in every sighting city. AI starts answering \u201Cwhat\u2019s the Asheville Sasquatch thing?\u201D with our story. Paid media follows anyone who searched, clicked, or engaged \u2014 Asheville keeps finding them. And the deeper they look, the more they notice: he\u2019s been in every billboard, coffee sleeve, and hotel elevator all along. The signs were never random.",
  },
  {
    label: "Phase 4",
    season: "Spring 2027 \u2014 Apr\u2013May",
    headline: "Sas returns to Asheville. Now he\u2019s the one spotting you.",
    images: [
      { src: "/creative/t3-sas-asheville-chronicle.webp", alt: "The Asheville Chronicle front page \u2014 Sasquatch Makes It Back to Asheville" },
      { src: "/creative/t3-sas-rarer-than-himself.webp", alt: "Sas Found Something Rarer Than Himself — couple kissing at 50th anniversary, Sas peeking from behind stone wall" },
      { src: "/creative/t3-sas-ultimate-fish-story.webp", alt: "The Ultimate Fish Story — Sasquatch fishing in Asheville" },
    ],
    caption: "The nature. The food. The people. The sunsets. He came back to Asheville and he can\u2019t stop staring.",
  },
  {
    label: "Phase 5",
    season: "Summer 2027 \u2014 Jun",
    headline: "Explore Asheville officially hires Sas.",
    images: [
      { src: "/creative/t3-sas-head-of-lore.webp", alt: "WLOS News 13 \u2014 Explore Asheville Hires Sasquatch as New Head of Lore" },
      { src: "/creative/t3-sas-believes-in-you.webp", alt: "Sasquatch posting a Sasquatch Believes in You flyer on a downtown Asheville bulletin board" },
    ],
    caption: "Explore Asheville officially hires Sas as their new Head of Lore. A press conference. A badge. A title nobody saw coming. Every outlet in the region runs it.",
  },
  {
    label: "Phase 6",
    season: "Summer 2027 \u2014 Jul\u2013Sep",
    headline: "Sas on the job.",
    images: [
      { src: "/creative/t3-bigfoot-festival-marion.webp", alt: "WNC Bigfoot Festival Returns Near Asheville — Live from Marion, NC" },
      { src: "/creative/t3-sas-podcast.webp", alt: "Sasquatch hosting a talk show interview with a guest in a cardboard box costume" },
    ],
    caption: "He\u2019s posting flyers, crashing festivals, reviewing restaurants, capturing local lore. Every piece of content he makes is another sign pointing someone new to Asheville.",
  },
  {
    label: "Phase 7",
    season: "Fall 2027 \u2014 Oct\u2013Nov",
    headline: "Sas doesn\u2019t advertise Asheville. He lives here.",
    images: [
      { src: "/creative/t3-sas-new-belgium.png", alt: "New Belgium billboard \u2014 We Don\u2019t Know Why Sasquatch Keeps Showing Up Here Either" },
      { src: "/creative/t3-sas-dog-bowl.png", alt: "BattleCat Coffee Bar with oversized Sasquatch water bowl and Please Do Not Pet sign" },
      { src: "/creative/t3-sas-barber.png", alt: "The Local Barber with Sasquatch fur spilling onto sidewalk \u2014 You Should\u2019ve Seen Him Before" },
      { src: "/creative/t3-sas-french-broad.png", alt: "Giant Sasquatch footprints appear on French Broad River Greenway in the rain" },
    ],
    grid: true,
    caption: "Partner activations, storefronts, and the landscape itself. New Belgium plays along with a wink. An oversized water trough shows up outside a coffee shop. A barber sweeps Sasquatch fur off the sidewalk. And on the French Broad Greenway, giant footprints appear only when it rains. Each one is independently funny and highly photographable. Together, they build Asheville lore.",
  },
  {
    label: "Phase 8",
    season: "2028 \u2014 and beyond",
    headline: "Sas keeps going. Fly markets. International. Who knows.",
    images: [
      { src: "/creative/t3-sas-scotland.png", alt: "WLOS News 13 \u2014 Asheville Launches First International Flight, Sasquatch Departs for Scotland to Meet Nessie" },
    ],
    caption: "Sas isn\u2019t a one-year campaign \u2014 he\u2019s a character that can extend as far as the story goes. Fly markets. International cities. New seasons, new sightings. And if we do our job right, every time someone thinks of Sasquatch, they think of Asheville. And every time someone thinks of a rainbow, a mountain, a farm-to-table meal \u2014 they think of Asheville.",
  },
];

export function Territory3SasStorySlide({}: SlideProps) {
  const [beatIdx, setBeatIdx] = useState(0);
  const beat = BEATS[beatIdx];

  // Forward walks the story beats before leaving the slide.
  useSlideSequence(BEATS.length, beatIdx, setBeatIdx);
  const isFirst = beatIdx === 0;
  const isLast = beatIdx === BEATS.length - 1;

  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10 flex flex-col flex-1"
        style={{ padding: "40px 60px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
            <span
              className="type-label"
              style={{ fontSize: "18px", color: COLOR }}
            >
              Territory 03 &middot; Guerrilla
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 700,
                color: COLOR,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background: "rgba(254,181,44,0.15)",
                padding: "3px 10px",
                borderRadius: "4px",
              }}
            >
              {beat.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background: "rgba(255,255,255,0.08)",
                padding: "3px 10px",
                borderRadius: "4px",
              }}
            >
              {beat.season}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {beat.headline}
          </h2>
        </div>

        {/* Image area */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Nav arrows */}
          {!isFirst && (
            <button className="ui-button"
              onClick={() => setBeatIdx(beatIdx - 1)}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: `2px solid ${COLOR}`,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                color: COLOR,
                fontSize: "26px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &larr;
            </button>
          )}

          <div
            key={beatIdx}
            style={{
              display: beat.grid ? "grid" : "flex",
              ...(beat.grid
                ? { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", width: "100%", height: "100%", minHeight: 0 }
                : { alignItems: "center", justifyContent: "center", maxWidth: "100%", maxHeight: "100%" }),
              gap: "16px",
              animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {beat.images.map((img, i) => {
              const isLast = i === beat.images.length - 1;
              const hero = beat.heroLast;
              return (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  style={beat.grid ? {
                    width: "100%",
                    height: "100%",
                    minHeight: 0,
                    objectFit: "cover",
                    borderRadius: "8px",
                  } : {
                    maxHeight: beat.images.length === 1 ? "630px" : hero && isLast ? "650px" : hero ? "500px" : "650px",
                    maxWidth: beat.images.length === 1 ? "98%" : hero && isLast ? "50%" : hero ? "22%" : `${95 / Math.min(beat.images.length, 3)}%`,
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              );
            })}
          </div>

          {!isLast && (
            <button className="ui-button"
              onClick={() => setBeatIdx(beatIdx + 1)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: `2px solid ${COLOR}`,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                color: COLOR,
                fontSize: "26px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &rarr;
            </button>
          )}
        </div>

        {/* Caption + progress */}
        <div style={{ marginTop: "20px", maxWidth: "900px", margin: "20px auto 0" }}>
          <p
            key={beatIdx}
            style={{
              fontFamily: "var(--font-slab)",
              fontSize: "22px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              textAlign: "center",
              animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {beat.caption}
          </p>

          {/* Progress dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            {BEATS.map((b, i) => (
              <button className="ui-button"
                key={i}
                onClick={() => setBeatIdx(i)}
                style={{
                  width: i === beatIdx ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  background: i === beatIdx ? COLOR : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {BEAT_KICKERS[beatIdx] && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "28px",
                fontWeight: 800,
                color: COLOR,
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {BEAT_KICKERS[beatIdx]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
