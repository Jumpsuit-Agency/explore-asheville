"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

interface Beat {
  label: string;
  headline: string;
  images: { src: string; alt: string }[];
  caption: string;
}

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
      { src: "/creative/t3-media-ai-answer.png", alt: "AI search answer explaining the Asheville Sasquatch campaign" },
      { src: "/creative/t3-sas-behind-all-signs.png", alt: "Collage showing Sasquatch hidden in every touchpoint" },
    ],
    caption: "Search spikes in every sighting city. AI starts answering \u201Cwhat\u2019s the Asheville Sasquatch thing?\u201D with our story. Paid media follows anyone who searched, clicked, or engaged \u2014 Asheville keeps finding them. And the deeper they look, the more they notice: he\u2019s been in every billboard, coffee sleeve, and hotel elevator all along. The signs were never random.",
  },
  {
    label: "Act 4",
    headline: "Sas returns to Asheville. Now he\u2019s the one spotting you.",
    images: [
      { src: "/creative/t3-sas-asheville-chronicle.png", alt: "The Asheville Chronicle front page \u2014 Sasquatch Makes It Back to Asheville" },
    ],
    caption: "After months on the road, he\u2019s spotted back on Asheville\u2019s streets. Only now he\u2019s not the one being hunted. The creature everyone was searching for flips the script \u2014 and the campaign gets its front page.",
  },
  {
    label: "Act 5",
    headline: "Explore Asheville officially hires Sas.",
    images: [
      { src: "/creative/t3-sas-head-of-lore.png", alt: "WLOS News 13 \u2014 Explore Asheville Hires Sasquatch as New Head of Lore" },
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
    caption: "He\u2019s not recruiting anymore \u2014 he\u2019s welcoming. Posting flyers downtown, greeting visitors, making content, pointing people toward what\u2019s real. The campaign gave Asheville a character. Asheville gave him a home.",
  },
  {
    label: "Act 7",
    headline: "But can Asheville really own Sasquatch?",
    images: [
      { src: "/creative/t3-nashvillenews-sighting.jpeg", alt: "@nashvillenews TikTok \u2014 Big Foot sighting in Tennessee, Asheville declines to comment" },
    ],
    caption: "No. But it becomes a mythology competitors can never borrow without it looking like they\u2019re taking Asheville\u2019s idea. In fact, we don\u2019t need Sas to stay in Asheville. It\u2019s better that he doesn\u2019t. Because every sighting somewhere else becomes another sign pointing back to us.",
  },
];

export function Territory3SasStorySlide({}: SlideProps) {
  const [beatIdx, setBeatIdx] = useState(0);
  const beat = BEATS[beatIdx];
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
              style={{ fontSize: "12px", color: COLOR }}
            >
              Territory 03 &middot; The Sasquatch Story
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
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

        {/* Image area */}
        <div
          style={{
            flex: 1,
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
            <button
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
                fontSize: "20px",
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
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "100%",
              maxHeight: "100%",
              animation: "child-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {beat.images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                style={{
                  maxHeight: beat.images.length === 1 ? "620px" : "580px",
                  maxWidth: beat.images.length === 1 ? "95%" : `${90 / beat.images.length}%`,
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>

          {!isLast && (
            <button
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
                fontSize: "20px",
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
              fontSize: "17px",
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
              <button
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
        </div>
      </div>
    </div>
  );
}
