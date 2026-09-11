"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

interface ScriptLine {
  dir: string;
  vis: string;
  vo?: string;
}

interface ScriptTab {
  label: string;
  subtitle: string;
  lines: ScriptLine[] | null;
}

const TABS: ScriptTab[] = [
  {
    label: ":60",
    subtitle: "Hero Spot",
    lines: null,
  },
  {
    label: ":30",
    subtitle: "Cut-Down",
    lines: null,
  },
  {
    label: ":15",
    subtitle: "Pre-Roll / Social",
    lines: null,
  },
  {
    label: "Winter",
    subtitle: "Seasonal Spot",
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
    label: "Radio",
    subtitle: "Audio Spot",
    lines: null,
  },
];

export function Territory2FilmSlide({}: SlideProps) {
  const [tabIdx, setTabIdx] = useState(3); // default to Winter (the one with content)

  const tab = TABS[tabIdx];

  return (
    <div className="slide slide-deep" style={{ padding: "60px 80px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "24px", marginBottom: "24px" }}>
        <span className="type-label" style={{ color: "var(--color-french-broad)" }}>
          Sounds Made Up &middot; Film &amp; Audio
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        {TABS.map((t, i) => (
          <button key={t.label} onClick={() => setTabIdx(i)} style={{
            fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, padding: "8px 18px", borderRadius: "20px",
            border: "1px solid", borderColor: i === tabIdx ? "var(--color-french-broad)" : "rgba(255,255,255,0.15)",
            background: i === tabIdx ? "var(--color-french-broad)" : "none",
            color: i === tabIdx ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {tab.lines ? (
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px" }}>
          {/* Left — video placeholder + production note */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="asset-placeholder"
              style={{ flex: 1, minHeight: "400px", marginBottom: "16px", fontSize: "16px" }}
            >
              {tab.label} {tab.subtitle} &mdash; Production Pending
            </div>
            <div className="glass-light" style={{ marginTop: "16px", padding: "16px 20px" }}>
              <span className="type-label" style={{ fontSize: "9px", color: "var(--color-french-broad)" }}>Production</span>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.5 }}>
                Sound-first filmmaking. Layered audio drives every frame — the place is heard before it&apos;s seen.
              </p>
            </div>
          </div>

          {/* Right — script */}
          <div style={{ overflow: "auto", paddingRight: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tab.lines.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "16px" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: s.dir === "FINAL" || s.dir === "SUPER"
                        ? "var(--color-french-broad)"
                        : "rgba(255,255,255,0.25)",
                      minWidth: "52px",
                      paddingTop: "4px",
                      flexShrink: 0,
                    }}
                  >
                    {s.dir}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-slab)",
                      fontSize: s.dir === "SUPER" ? "18px" : "15px",
                      fontWeight: s.dir === "SUPER" ? 800 : 400,
                      color: s.dir === "SUPER" ? "var(--color-french-broad)" : "rgba(255,255,255,0.45)",
                      lineHeight: 1.5,
                    }}>
                      {s.vis}
                    </p>
                    {s.vo && (
                      <p style={{ fontFamily: "var(--font-slab)", fontSize: "16px", fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginTop: "3px", lineHeight: 1.5 }}>
                        &ldquo;{s.vo}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Endline */}
              <div
                style={{
                  marginTop: "12px",
                  padding: "16px 24px",
                  background: "var(--color-french-broad)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "24px", color: "white" }}>
                  Asheville. Sounds Made Up.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Placeholder for tabs without scripts yet */
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            className="asset-placeholder"
            style={{ width: "80%", minHeight: "500px", fontSize: "18px" }}
          >
            {tab.label} &middot; {tab.subtitle} &mdash; Script Coming Soon
          </div>
        </div>
      )}
    </div>
  );
}
