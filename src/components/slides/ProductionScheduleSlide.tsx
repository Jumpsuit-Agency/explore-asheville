"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";
import { useSlideSequence } from "../SlideSequence";

const COLOR = "var(--color-goldenrod)";

interface Phase {
  month: string;
  headline: string;
  philosophy: string;
  deliverables: string[];
  kicker?: string;
}

const PHASES: Phase[] = [
  {
    month: "November",
    headline: "Build the world.",
    philosophy: "Create the core system that everything else can generate from.",
    deliverables: [
      "Campaign identity + rules \u2014 visual system, copy system, what counts as a \u201Csign,\u201D tone spectrum from practical \u2192 uncanny \u2192 absurd",
      "Sign library \u2014 rainbow, tarot, 11:11, hotel deal, airfare drop, open calendar, weather, route time, friend recommendation, concert/event, Sasquatch sighting, local recommendation",
      "Dynamic creative templates \u2014 weather, airfare, hotel, calendar, maps, event, price drop, \u201Ccurrent conditions\u201D \u2014 so the media team can populate real data without redesigning every asset",
      "Asheville Started Following You \u2014 account identity, bio, initial posts, visual language, comment voice, rules for interacting, highlight structure: SIGNS / SIGHTINGS / LORE / 8:28 / SAS",
      "Sasquatch character bible \u2014 exact face/look, personality, what he does and doesn\u2019t do, how much we reveal, lore, visual consistency, eventual \u201CHead of Lore\u201D payoff",
    ],
  },
  {
    month: "December",
    headline: "The first signs appear.",
    philosophy: "This should feel subtle. Not \u201Ccampaign launch!\u201D More like: why am I suddenly seeing Asheville everywhere?",
    deliverables: [
      "11:11 digital units",
      "Weather-responsive creative",
      "Open-calendar ads",
      "Fare-drop / hotel-rate units",
      "Tarot social + rainbow content",
      "First \u201CAsheville Started Following You\u201D activity",
      "Small Sas clues: footprints, hands, silhouettes, reflections",
      "First sightings in drive markets",
      "Strange local recommendations beginning to surface",
    ],
    kicker: "The campaign should initially have plausible deniability.",
  },
  {
    month: "January",
    headline: "Signs multiply.",
    philosophy: "Now people start recognizing the pattern.",
    deliverables: [
      "Sequential paid-media journey \u2014 Sign 1: weather \u2192 Sign 2: fare \u2192 Sign 3: calendar \u2192 Sign 4: Sas \u2192 payoff: Okay. How many signs do you need?",
      "Dynamic DOOH",
      "City-specific signs \u2014 Indy / Nashville / Charlotte / Knoxville / Atlanta executions",
      "Airport creative",
      "Radio interruptions",
      "Search creative",
      "Creator/influencer \u201CI keep seeing Asheville\u201D content",
      "Interactive \u201Cpull your sign\u201D experience",
      "Maps/directions executions",
    ],
    kicker: "Begin documenting the campaign as though the signs themselves are newsworthy.",
  },
  {
    month: "February",
    headline: "Sas becomes impossible to ignore.",
    philosophy: "This is where the story gains a protagonist. A footprint. Then someone swears they saw him pumping gas in Knoxville. Then grainy footage. Then he\u2019s holding a sign. Then he appears in Asheville.",
    deliverables: [
      "Sas sighting films",
      "Local-news mock stories",
      "Social sightings",
      "Gas-station activation",
      "Roadside appearances + security-cam footage",
      "Influencer encounters",
      "\u201CSasquatch Believes in You\u201D",
      "People submitting sightings",
    ],
    kicker: "The campaign moves from \u201CAsheville is sending signs\u201D to \u201Csomeone may actually be sending them.\u201D",
  },
  {
    month: "March",
    headline: "Reveal the media buyer.",
    philosophy: "Sas has been behind it. He\u2019s been putting up signs. Buying media. Calling at 8:28. Leaving footprints. Following people. Trying to get everyone back to Asheville.",
    deliverables: [
      "\u201CWe found the guy behind the campaign.\u201D",
      "Sas at a laptop buying ads",
      "Sas installing posters + approving creative",
      "Sas on LinkedIn",
      "Sas\u2019s first-person social posts",
      "\u201CTurns out he\u2019s been the media buyer.\u201D",
      "Fake internal emails / Slack / approval notes",
      "Head of Lore job announcement teasers",
    ],
    kicker: "Now the campaign becomes self-aware.",
  },
  {
    month: "April\u2013May",
    headline: "Asheville starts answering back.",
    philosophy: "Once people arrive, the locals become the signs. This is where Business 3.0 becomes important.",
    deliverables: [
      "Coffee sleeves + hotel key cards",
      "Bartender napkins + receipt messages",
      "Storefront signs + trail markers",
      "Pottery cards + restaurant recommendations",
      "Local \u201Cyou have to go here next\u201D notes",
    ],
    kicker: "\u201CAsheville is following you\u201D becomes \u201CAsheville found you.\u201D Then visitors begin creating signs for the next person.",
  },
  {
    month: "Summer",
    headline: "Sas returns home.",
    philosophy: "He finally reaches Asheville. And now he starts discovering all the strange things there. Cardboard Man. Bigfoot Festival. Local legends. Artists. Weird roadside stuff. Music. People. The hunter becomes the tourist.",
    deliverables: [
      "Sas-discovers-Asheville content series",
      "Local legend collaborations",
      "Festival appearances + activations",
      "EXPLORE ASHEVILLE HIRES SASQUATCH AS HEAD OF LORE",
      "Sas becomes a durable platform \u2014 not a one-season gag",
    ],
    kicker: "Now Sas can host, create, recommend, and evolve \u2014 a living character for a living city.",
  },
  {
    month: "Fall",
    headline: "The signs worked.",
    philosophy: "Peak season. Leaf season. The biggest tourism window of the year \u2014 and Sas is Head of Lore for all of it. The campaign isn\u2019t pushing anymore. It\u2019s pulling. Visitors are creating signs for the next person. The flywheel is spinning.",
    deliverables: [
      "Sas\u2019s first official fall as Head of Lore \u2014 hosting, recommending, documenting peak season",
      "Seasonal sign library refresh \u2014 foliage, harvest, bonfire, flannel, cider",
      "Visitor-generated content becomes the campaign \u2014 people are now the signs",
      "\u201CAsheville Found You\u201D retrospective content \u2014 the journey from first sign to arrival",
      "Sas\u2019s Annual Report \u2014 sightings filed, signs posted, humans converted",
      "Limited-edition in-destination moments \u2014 fall-only key cards, trail markers",
      "Year-one measurement + earned media recap",
      "Optimize dynamic creative engine with 10 months of real data",
      "Expand to new fly/drive markets based on what worked",
      "Tease Year 2 \u2014 Sas starts getting job offers from other cities",
    ],
    kicker: "The campaign compounds. The character endures. Asheville becomes the place that found you first.",
  },
];

export function ProductionScheduleSlide({}: SlideProps) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phase = PHASES[phaseIdx];

  // Forward walks the phases before leaving the slide.
  useSlideSequence(PHASES.length, phaseIdx, setPhaseIdx);
  const isFirst = phaseIdx === 0;
  const isLast = phaseIdx === PHASES.length - 1;

  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{ padding: "40px 60px", width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "16px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
            <span className="type-label" style={{ fontSize: "12px", color: COLOR }}>
              Territory 03 &middot; Production Schedule
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
              {phase.month}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "52px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {phase.headline}
          </h2>
        </div>

        {/* Content */}
        <div
          key={phaseIdx}
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "48px",
            overflow: "hidden",
          }}
        >
          {/* Left: philosophy */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "20px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.6,
              }}
            >
              {phase.philosophy}
            </p>
            {phase.kicker && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: COLOR,
                  lineHeight: 1.3,
                  marginTop: "24px",
                }}
              >
                {phase.kicker}
              </p>
            )}
          </div>

          {/* Right: deliverables */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {phase.deliverables.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: COLOR,
                      flexShrink: 0,
                      marginTop: "8px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
          <button className="ui-button"
            onClick={() => setPhaseIdx(phaseIdx - 1)}
            disabled={isFirst}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: `2px solid ${isFirst ? "rgba(255,255,255,0.15)" : COLOR}`,
              background: "rgba(0,0,0,0.5)",
              color: isFirst ? "rgba(255,255,255,0.2)" : COLOR,
              fontSize: "18px",
              cursor: isFirst ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &larr;
          </button>

          <div style={{ display: "flex", gap: "8px" }}>
            {PHASES.map((p, i) => (
              <button className="ui-button"
                key={i}
                onClick={() => setPhaseIdx(i)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: i === phaseIdx ? COLOR : "rgba(255,255,255,0.15)",
                  background: i === phaseIdx ? COLOR : "none",
                  color: i === phaseIdx ? "var(--color-ink)" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {p.month}
              </button>
            ))}
          </div>

          <button className="ui-button"
            onClick={() => setPhaseIdx(phaseIdx + 1)}
            disabled={isLast}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: `2px solid ${isLast ? "rgba(255,255,255,0.15)" : COLOR}`,
              background: "rgba(0,0,0,0.5)",
              color: isLast ? "rgba(255,255,255,0.2)" : COLOR,
              fontSize: "18px",
              cursor: isLast ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
