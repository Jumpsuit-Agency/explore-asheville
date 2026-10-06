"use client";

import type { SlideProps } from "../Deck";
import { RubricTable, type Score } from "./RubricTable";

const CRITERIA = [
  { name: "Increase intent to visit", desc: "Among four target visitor profiles" },
  { name: "Improve brand favorability", desc: "vs. Charleston, Savannah, Greenville, Chattanooga" },
  { name: "Demonstrate range", desc: "Across audiences, seasons, and channels" },
  { name: "Stay authentically Asheville", desc: "Built on what makes the city real" },
];

const TERRITORIES: {
  name: string;
  color: string;
  scores: Score[];
  recommended?: boolean;
  rationale: string[];
}[] = [
  {
    name: "Make Something of It",
    color: "var(--color-grove-park)",
    scores: [true, true, true, true],
    rationale: [
      "Make a bowl. Make a friend. Make a memory you didn\u2019t plan. The verb pulls visitors toward experiences, not itineraries.",
      "Asheville is where you do things, not just see things. Competitors offer scenery. This offers transformation.",
      "Crafts, music, food, stories, connection \u2014 every audience finds their own version of making. It never repeats.",
      "Rooted in Asheville\u2019s real maker culture \u2014 potters, musicians, chefs, storytellers. Not invented, amplified.",
    ],
  },
  {
    name: "Sounds Made Up",
    color: "var(--color-french-broad)",
    scores: [true, true, true, true],
    rationale: [
      "Creates curiosity \u2014 if it sounds made up, you have to go hear it for yourself.",
      "The lore, the sounds, the stories \u2014 positions Asheville as deeper than any competitor\u2019s surface charm.",
      "Every season has its own soundscape and stories. Nature, craft, music, local legend \u2014 content never runs dry.",
      "Banjos on porches, waterfalls no one posted, restaurants that \u201Cdon\u2019t exist\u201D \u2014 this is how Asheville actually works.",
    ],
  },
  {
    name: "How Many Signs Do You Need?",
    color: "var(--color-goldenrod)",
    scores: [true, true, true, true],
    recommended: true,
    rationale: [
      "Turns passive awareness into active urgency. If Asheville keeps showing up, there\u2019s a reason.",
      "Reframes Asheville from \u201Cone of many options\u201D to \u201Cthe one that won\u2019t leave you alone.\u201D Bold positioning.",
      "Works as retargeting, OOH, social, audio, long-form \u2014 the question adapts to any format or moment.",
      "Mystical, magnetic, a little weird. That\u2019s not a marketing invention \u2014 that\u2019s Asheville\u2019s actual reputation.",
    ],
  },
];

export function ClientRubricSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "32px 100px" }}>
        {/* Fixed height so a one-line and a two-line headline both leave the
            table starting at the same y — these two slides run back to back. */}
        <div style={{ height: "190px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "10px" }}>
          <span className="type-label" style={{ color: "var(--color-goldenrod)", marginBottom: "16px", fontSize: "18px", display: "block" }}>
            Against Your Criteria
          </span>
          <h2 className="type-billboard" style={{ fontSize: "64px" }}>
            How each idea delivers on{" "}
            <span style={{ color: "var(--color-goldenrod)" }}>what matters to you.</span>
          </h2>
        </div>

        <RubricTable criteria={CRITERIA} territories={TERRITORIES} />
      </div>
    </div>
  );
}
