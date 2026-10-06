"use client";

import type { SlideProps } from "../Deck";
import { RubricTable, type Score } from "./RubricTable";

const CRITERIA = [
  { name: "Sticky", desc: "Is it memorable?" },
  { name: "Scalable", desc: "Does it work across channels?" },
  { name: "Relatable", desc: "Does it hit a human truth?" },
  { name: "Differentiated", desc: "Is it ownable?" },
  { name: "On Equity", desc: "Does it feel like the brand?" },
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
    scores: ["?", true, true, true, true],
    rationale: [
      "You don\u2019t forget the place where you made something with your hands, heard a song that changed you, or met someone who saw you.",
      "Making a bowl, making music, making contact with a stranger \u2014 each version works in any format, for any audience.",
      "Everyone wants to come home from a trip different than they left. This names that desire.",
      "Charleston has charm. Savannah has beauty. Only Asheville has a culture that hands you the clay and says: your move.",
      "Makers, musicians, storytellers \u2014 this is what Asheville actually is. The campaign just says it out loud.",
    ],
  },
  {
    name: "Sounds Made Up",
    color: "var(--color-french-broad)",
    scores: [true, true, true, true, true],
    rationale: [
      "The phrase sticks because it\u2019s playful and true \u2014 half the best things in Asheville really do sound made up.",
      "Works as audio, video, social, OOH \u2014 the sounds of nature, craft, and local stories flex everywhere.",
      "Everyone has described a travel moment that \u201Csounds made up.\u201D It names a universal feeling.",
      "No other destination can claim both the lore and the literal soundscape \u2014 banjos, waterfalls, stories.",
      "Authentic and a little weird. That\u2019s Asheville\u2019s actual brand, not a marketing invention.",
    ],
  },
  {
    name: "How Many Signs Do You Need?",
    color: "var(--color-goldenrod)",
    scores: [true, true, true, true, true],
    recommended: true,
    rationale: [
      "The question lingers. It\u2019s the kind of line people repeat to friends planning a trip.",
      "Works as a billboard, a social caption, a 60-second spot, a bumper sticker. The format is the message.",
      "Everyone has a place that keeps showing up in their life. This names that feeling.",
      "No other destination is brave enough to say \u201Cyou already know.\u201D This is pure Asheville confidence.",
      "Mystical, magnetic, a little weird \u2014 that\u2019s Asheville\u2019s actual reputation, turned into a dare.",
    ],
  },
];

export function RationaleSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "32px 100px" }}>
        {/* Fixed height so a one-line and a two-line headline both leave the
            table starting at the same y — these two slides run back to back. */}
        <div style={{ height: "190px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "10px" }}>
          <span className="type-label" style={{ color: "var(--color-goldenrod)", marginBottom: "16px", fontSize: "18px", display: "block" }}>
            Our Recommendation
          </span>
          <h2 className="type-billboard" style={{ fontSize: "64px" }}>
            All three ideas are strong.<br />
            <span style={{ color: "var(--color-goldenrod)" }}>One is built to get everyone talking.</span>
          </h2>
        </div>

        <RubricTable criteria={CRITERIA} territories={TERRITORIES} />
      </div>
    </div>
  );
}
