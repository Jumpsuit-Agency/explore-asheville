"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";
import { SlideHeader } from "../SlideHeader";
import { useSlideSequence } from "../SlideSequence";

const COLOR = "var(--color-goldenrod)";

/**
 * A screenplay line.
 *
 * Richer than the territory-two spots, which are all cut-to/visual/VO beats.
 * These two need a continuous voiceover read as prose, and the second one
 * breaks into a scene with named characters — so the shape is a small
 * screenplay vocabulary rather than a fixed three-column beat.
 */
type Line =
  | { kind: "direction"; text: string }
  | { kind: "vo"; text: string }
  | { kind: "slug"; text: string }
  | { kind: "action"; text: string }
  | { kind: "character"; who: string; paren?: string; text: string }
  | { kind: "super"; text: string };

interface Script {
  title: string;
  logline: string;
  production: string;
  lines: Line[];
}

const SCRIPTS: Script[] = [
  {
    title: "Doctors Still Prescribe It",
    logline: "A pharma parody that takes the historical fact literally.",
    production: "Stock and lifestyle coverage, cut to a pharmaceutical rhythm. The side-effects read is the performance — one breath, no cuts.",
    lines: [
      { kind: "direction", text: "VO over stock and lifestyle clips" },
      { kind: "vo", text: "Is your doctor telling you what signs to look for?" },
      { kind: "vo", text: "For those of us with acute burnoutivitis, the signs are everywhere." },
      { kind: "vo", text: "Ask your doctor about Asheville. It just takes one dose to feel its effects, and there’s no limit to how many times you can treat yourself." },
      { kind: "vo", text: "Over the counter? Yes, but also prescription-strength." },
      { kind: "vo", text: "10 out of 10 doctors’ spouses choose Asheville for their family getaways." },
      { kind: "action", text: "The legally required side-effects read — delivered in one unbroken breath, accelerating." },
      { kind: "vo", text: "Side effects include joy, increased childlike wonder, the opposite of a headache, a curious interest in unsolved mysteries, dizziness but the good kind, a surge of energy, a lump in your throat trying to find the words because the sheer beauty of what you’re looking at boggles the mind and there’s just no possible way that Brenda in accounting is going to understand this unless she visits herself but also that’s possible because oh my god we should totally have our company retreat here that’s a great idea." },
      { kind: "vo", text: "Ask your doctor about Asheville." },
      { kind: "super", text: "THE SIGNS ARE EVERYWHERE." },
    ],
  },
  {
    title: "Lore the Cryptids Envy",
    logline: "The narrator you have been listening to all along turns out to be Sasquatch.",
    production: "Warm handheld coverage of real Asheville for the voiceover, then a hard cut to a practical campfire build. The cryptids play it completely straight.",
    lines: [
      { kind: "direction", text: "Voiceover over clips of exciting life in Asheville" },
      { kind: "vo", text: "No no no, it’s not a trap. It’s not even a tourist trap. It’s just… Ugh, how do I say this? It’s just like, magical." },
      { kind: "vo", text: "It’s novel, but not kitschy. It’s friendly, but not gratuitous. It’s normal, but weird, ya know?" },
      { kind: "vo", text: "It feels like I’m drawn there, like I’m a missing puzzle piece to this place, and it needs me. Not that it’s incomplete, but that something new gets unlocked because I found it." },
      { kind: "slug", text: "CUT TO:" },
      { kind: "action", text: "A campfire surrounded by various cryptids — Mothman, Krampus, Yeti, Ogopogo." },
      { kind: "character", who: "Sasquatch", paren: "our narrator this whole time", text: "Guys, I’m telling you, I found it. You’re probably not going to believe me, but I know what I saw." },
      { kind: "character", who: "Mothman", text: "Wow, so are you going back?" },
      { kind: "character", who: "Sasquatch", paren: "scrawling “Visit Asheville” on a sandwich sign", text: "Oh for sure. I mean, it’s inevitable. The signs are literally everywhere." },
      { kind: "super", text: "THE SIGNS ARE EVERYWHERE." },
    ],
  },
];

export function Territory3ScriptsSlide({}: SlideProps) {
  const [idx, setIdx] = useState(0);
  // Each script is a stop, so one forward key walks both before the deck moves on.
  useSlideSequence(SCRIPTS.length, idx, setIdx);
  const script = SCRIPTS[idx];

  return (
    <div className="slide slide-deep" style={{ padding: 0 }}>
      <div className="relative z-10 flex flex-col flex-1 min-h-0 slide-frame">
        <SlideHeader
          color={COLOR}
          eyebrow="Territory 03"
          eyebrowSuffix="Broadcast"
          chips={[{ label: "Our Pick", tone: "quiet" }]}
          title={
            <>
              The signs are everywhere. <span style={{ color: COLOR }}>Even in the ad break.</span>
            </>
          }
        />

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexShrink: 0 }}>
          {SCRIPTS.map((s, i) => (
            <button
              className="ui-button"
              key={s.title}
              onClick={() => setIdx(i)}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700,
                padding: "5px 14px", borderRadius: "20px", border: "2px solid",
                borderColor: i === idx ? COLOR : "rgba(255,255,255,0.15)",
                background: i === idx ? COLOR : "none",
                color: i === idx ? "#1E1F38" : "rgba(255,255,255,0.5)",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div className="glass-light" style={{ flex: 1, padding: "32px 34px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="type-label" style={{ fontSize: "18px", color: COLOR }}>Production</span>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "25px", color: "rgba(255,255,255,0.55)", marginTop: "14px", lineHeight: 1.45 }}>
                {script.production}
              </p>
            </div>
          </div>

          <div data-scroll-region style={{ overflowY: "auto", paddingRight: "14px", minHeight: 0 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "19px", fontStyle: "italic", color: "rgba(255,255,255,0.4)", marginBottom: "18px", lineHeight: 1.45 }}>
              {script.logline}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {script.lines.map((l, i) => {
                if (l.kind === "direction")
                  return (
                    <p key={i} style={{ fontFamily: "monospace", fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.3)" }}>
                      [{l.text}]
                    </p>
                  );
                if (l.kind === "slug")
                  return (
                    <p key={i} style={{ fontFamily: "monospace", fontSize: "17px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: COLOR, marginTop: "8px" }}>
                      {l.text}
                    </p>
                  );
                if (l.kind === "action")
                  return (
                    <p key={i} style={{ fontFamily: "var(--font-slab)", fontSize: "17px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                      {l.text}
                    </p>
                  );
                if (l.kind === "character")
                  return (
                    <div key={i} style={{ paddingLeft: "20px", borderLeft: `2px solid ${COLOR}` }}>
                      <p style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: COLOR }}>
                        {l.who}
                        {l.paren && (
                          <span style={{ textTransform: "none", fontWeight: 400, letterSpacing: 0, color: "rgba(255,255,255,0.35)" }}> ({l.paren})</span>
                        )}
                      </p>
                      <p style={{ fontFamily: "var(--font-slab)", fontSize: "21px", fontStyle: "italic", color: "rgba(255,255,255,0.82)", lineHeight: 1.5, marginTop: "2px" }}>
                        &ldquo;{l.text}&rdquo;
                      </p>
                    </div>
                  );
                if (l.kind === "super")
                  return (
                    <div key={i} style={{ marginTop: "10px", padding: "16px 24px", background: COLOR, borderRadius: "8px", textAlign: "center" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.01em", color: "#1E1F38" }}>
                        {l.text}
                      </span>
                    </div>
                  );
                return (
                  <p key={i} style={{ fontFamily: "var(--font-slab)", fontSize: "21px", fontStyle: "italic", color: "rgba(255,255,255,0.82)", lineHeight: 1.55 }}>
                    &ldquo;{l.text}&rdquo;
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
