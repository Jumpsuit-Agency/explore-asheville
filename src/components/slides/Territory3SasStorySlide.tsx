"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";
import { useSlideSequence } from "../SlideSequence";

const COLOR = "var(--color-goldenrod)";

interface Beat {
  label: string;
  headline: string;
  images: { src: string; alt: string }[];
  caption: string;
  heroLast?: boolean;
}

const BEAT_KICKERS: Record<number, string> = {
  0: "Something strange is happening in Asheville\u2019s drive markets.",
  1: "Turns out, Sasquatch has been behind the signs all along.",
  2: "The internet starts connecting the dots.",
  3: "And he\u2019s absolutely obsessed.",
  4: "Now he has resources and access.",
  5: "And the new Head of Lore gets to work.",
  6: "The legend moves on. The love for Asheville doesn\u2019t.",
};

const BEATS: Beat[] = [
  {
    label: "Act 1",
    headline: "The sightings begin. Social takes off.",
    images: [
      { src: "/creative/t3-indy-bigfoot-wheatpaste.png", alt: "Bigfoot wheat-pasting Asheville signs in Indianapolis" },
      { src: "/creative/t3-indy-bigfoot-cardboard.png", alt: "Bigfoot holding cardboard Asheville sign" },
      { src: "/creative/t3-indy-bigfoot-stencil.png", alt: "Bigfoot stenciling Asheville on the sidewalk" },
    ],
    caption: "A mysterious figure shows up in drive markets \u2014 wheat-pasting posters, holding cardboard signs, stenciling sidewalks. Nobody knows what it is yet. They just know it\u2019s weird enough to post.",
  },
  {
    label: "Act 2",
    headline: "Local media gets involved.",
    images: [
      { src: "/creative/t3-bigfoot-news.png", alt: "WTHR news broadcast \u2014 The Weirdest Tourism Campaign of the Year" },
      { src: "/creative/t3-bigfoot-gas-news.png", alt: "WTHR news broadcast \u2014 Sasquatch Is Filling Up Knoxville" },
    ],
    caption: "The posts catch newsrooms. A Sasquatch wheat-pasting tourism signs outside a stadium? That\u2019s a segment. The campaign starts generating its own earned media \u2014 no pitch required.",
  },
  {
    label: "Act 3",
    headline: "Digital captures the moment. And the easter egg.",
    images: [
      { src: "/creative/t3-media-search-results.png", alt: "Google search results for Sasquatch Asheville sign" },
      { src: "/creative/t3-chatgpt-sasquatch-answer.jpeg", alt: "ChatGPT answering 'what's the Sasquatch Asheville thing' with full campaign breakdown" },
      { src: "/creative/t3-sas-behind-all-signs.png", alt: "Collage showing Sasquatch hidden in every touchpoint" },
    ],
    heroLast: true,
    caption: "Search spikes in every sighting city. AI starts answering \u201Cwhat\u2019s the Asheville Sasquatch thing?\u201D with our story. Paid media follows anyone who searched, clicked, or engaged \u2014 Asheville keeps finding them. And the deeper they look, the more they notice: he\u2019s been in every billboard, coffee sleeve, and hotel elevator all along. The signs were never random.",
  },
  {
    label: "Act 4",
    headline: "Sas returns to Asheville. Now he\u2019s the one spotting you.",
    images: [
      { src: "/creative/t3-sas-asheville-chronicle.png", alt: "The Asheville Chronicle front page \u2014 Sasquatch Makes It Back to Asheville" },
      { src: "/creative/t3-sas-rarer-than-himself.png", alt: "Sas Found Something Rarer Than Himself — couple kissing at 50th anniversary, Sas peeking from behind stone wall" },
      { src: "/creative/t3-sas-ultimate-fish-story.png", alt: "The Ultimate Fish Story — Sasquatch fishing in Asheville" },
    ],
    caption: "The nature. The food. The people. The sunsets. He came back to Asheville and he can\u2019t stop staring.",
  },
  {
    label: "Act 5",
    headline: "Explore Asheville officially hires Sas.",
    images: [
      { src: "/creative/t3-sas-head-of-lore.png", alt: "WLOS News 13 \u2014 Explore Asheville Hires Sasquatch as New Head of Lore" },
      { src: "/creative/t3-bigfoot-festival-marion.png", alt: "WNC Bigfoot Festival Returns Near Asheville — Live from Marion, NC" },
    ],
    caption: "Explore Asheville officially hires Sas as their new Head of Lore. A press conference. A badge. A title nobody saw coming. Every outlet in the region runs it.",
  },
  {
    label: "Act 6",
    headline: "Sas on the job.",
    images: [
      { src: "/creative/t3-sas-believes-in-you.png", alt: "Sasquatch posting a Sasquatch Believes in You flyer on a downtown Asheville bulletin board" },
      { src: "/creative/t3-sas-podcast.png", alt: "Sasquatch hosting a talk show interview with a guest in a cardboard box costume" },
    ],
    caption: "He\u2019s posting flyers, crashing festivals, reviewing restaurants, hosting a podcast from an undisclosed location in the Blue Ridge. Every piece of content he makes is another sign pointing someone new to Asheville.",
  },
  {
    label: "Act 7",
    headline: "And when it\u2019s time to go?",
    images: [
      { src: "/creative/t3-nashvillenews-sighting.jpeg", alt: "@nashvillenews TikTok \u2014 Big Foot sighting in Tennessee, Asheville declines to comment" },
    ],
    caption: "That\u2019s okay. Explore Asheville hires a new Head of Lore. Human or otherwise. And if we do our job right, every time someone thinks of Sasquatch, they think of Asheville. And if Sasquatch does his job right, every time someone thinks of a rainbow, a mountain, a farm-to-table meal, a clay bowl, they think of Asheville.",
  },
];

const beatArrow: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: `2px solid ${COLOR}`,
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
  color: COLOR,
  fontSize: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.2s",
};

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

        {/* Two columns: the beat's narrative holds the left, the artwork the
            right. Centring a single tall phone left the copy stranded under a
            wide empty band. */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "48px", alignItems: "stretch" }}>

          {/* Narrative */}
          <div style={{ width: "34%", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p
              key={beatIdx}
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "26px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.55,
                animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              {beat.caption}
            </p>

            {BEAT_KICKERS[beatIdx] && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "30px",
                  fontWeight: 800,
                  color: COLOR,
                  lineHeight: 1.2,
                  marginTop: "24px",
                }}
              >
                {BEAT_KICKERS[beatIdx]}
              </p>
            )}

            {/* Beat controls: prev, the run of beats, next — kept together so
                the arrows read as part of this story rather than floating in
                the space beside the artwork. */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginTop: "36px" }}>
              <button
                className="ui-button"
                onClick={() => setBeatIdx(beatIdx - 1)}
                disabled={isFirst}
                aria-label="Previous beat"
                style={{ ...beatArrow, opacity: isFirst ? 0.25 : 1 }}
              >
                &larr;
              </button>

              <div style={{ display: "flex", gap: "8px" }}>
                {BEATS.map((b, i) => (
                  <button
                    className="ui-button"
                    key={i}
                    onClick={() => setBeatIdx(i)}
                    aria-label={`Beat ${i + 1}`}
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

              <button
                className="ui-button"
                onClick={() => setBeatIdx(beatIdx + 1)}
                disabled={isLast}
                aria-label="Next beat"
                style={{ ...beatArrow, opacity: isLast ? 0.25 : 1 }}
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Artwork */}
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

            <div
              key={beatIdx}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100%",
                maxHeight: "100%",
                animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              {beat.images.map((img, i) => {
                const isLastImg = i === beat.images.length - 1;
                const hero = beat.heroLast;
                return (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    style={{
                      maxHeight: beat.images.length === 1 ? "760px" : hero && isLastImg ? "700px" : hero ? "540px" : "700px",
                      maxWidth: beat.images.length === 1 ? "92%" : hero && isLastImg ? "50%" : hero ? "22%" : `${92 / beat.images.length}%`,
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
