"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const SCRIPTS = [
  {
    title: ":15 Spot",
    lines: [
      { dir: "OPEN ON", vis: "Quick cuts: Clay hits the wheel. A kid steps into a cold stream. Dad hesitates outside a bluegrass jam, then picks up a fiddle.", vo: "" },
      { dir: "", vis: "Trinket objects left behind on a shelf.", vo: "You can leave with proof you were here." },
      { dir: "", vis: "Hands covered in clay. A smile. Eye contact.", vo: "Or proof you were changed by it." },
      { dir: "SUPER", vis: "ASHEVILLE. MAKE SOMETHING OF IT.", vo: "" },
    ],
  },
  {
    title: ":30 Spot",
    lines: [
      { dir: "OPEN ON", vis: "A shelf of souvenirs. Magnets, mugs, keychains.", vo: "You can leave with proof you were here." },
      { dir: "CUT TO", vis: "Hands shaping clay. A family wading into a river.", vo: "Or proof you were changed by it." },
      { dir: "CUT TO", vis: "A local artisan teaching a visitor. Something passes between them.", vo: "And sometimes, proof it was changed by you." },
      { dir: "CUT TO", vis: "Golden hour on the Blue Ridge. A quiet moment.", vo: "Because the best thing about Asheville might not be what you take home." },
      { dir: "FINAL", vis: "A handmade bowl left on a potter\u2019s shelf. Still warm.", vo: "It might be what you leave behind." },
      { dir: "SUPER", vis: "ASHEVILLE. MAKE SOMETHING OF IT.", vo: "" },
    ],
  },
  {
    title: ":60 Spot",
    lines: [
      { dir: "OPEN ON", vis: "Mountain morning. Mist in the hollows. Hands working wood, clay, iron.", vo: "In Appalachia, making something out of what you have is practically a tradition." },
      { dir: "CUT TO", vis: "Downtown Asheville. A busker. A mural being painted. A kid watching.", vo: "So you can\u2019t do Asheville like you do other cities." },
      { dir: "CUT TO", vis: "A couple at a pottery wheel. Laughing. Terrible bowls.", vo: "You\u2019ve gotta make contact\u2014with something, someone, maybe even yourself." },
      { dir: "CUT TO", vis: "A family fishing in the French Broad. Dad teaching his daughter to cast.", vo: "And you can\u2019t leave Asheville the same way, either." },
      { dir: "CUT TO", vis: "A guide calling a chef. A chef plating a trout. A hotel lobby with a new experience on the counter.", vo: "Because proof you were here isn\u2019t the same as proof you were changed by it." },
      { dir: "CUT TO", vis: "Golden hour. The mountains do something impossible with the light.", vo: "And the best thing you make in Asheville might not be the thing you take home." },
      { dir: "FINAL", vis: "A hand touches a crooked bowl on a shelf. Smiles. Walks away.", vo: "It might be the little something you leave behind." },
      { dir: "SUPER", vis: "ASHEVILLE. MAKE SOMETHING OF IT.", vo: "" },
    ],
  },
];

export function Territory1FilmSlide({}: SlideProps) {
  const [scriptIdx, setScriptIdx] = useState(2); // default to :60
  const script = SCRIPTS[scriptIdx];

  return (
    <div className="slide slide-ink" style={{ padding: "60px 80px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "24px", marginBottom: "40px" }}>
        <span className="type-label" style={{ color: "var(--color-grove-park)" }}>
          Make Something of It &middot; Film
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {SCRIPTS.map((s, i) => (
            <button
              className="ui-button"
              key={s.title}
              onClick={() => setScriptIdx(i)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 700,
                padding: "5px 14px",
                borderRadius: "20px",
                border: "2px solid",
                borderColor: i === scriptIdx ? "var(--color-grove-park)" : "rgba(255,255,255,0.15)",
                background: i === scriptIdx ? "var(--color-grove-park)" : "none",
                color: i === scriptIdx ? "var(--color-ink)" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px" }}>
        {/* Left — video placeholder + cuts */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="asset-placeholder"
            style={{ flex: 1, minHeight: "400px", marginBottom: "16px", fontSize: "16px" }}
          >
            {script.title} &mdash; Production Pending
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="asset-placeholder" style={{ flex: 1, height: "56px", fontSize: "11px" }}>:30 Cut</div>
            <div className="asset-placeholder" style={{ flex: 1, height: "56px", fontSize: "11px" }}>:15 Cut</div>
          </div>
          <div className="glass-light" style={{ marginTop: "16px", padding: "16px 20px" }}>
            <span className="type-label" style={{ fontSize: "9px", color: "var(--color-grove-park)" }}>Production</span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.5 }}>
              Shot on location. Real people, real places. Genuine, layered, sense of place — never posed.
            </p>
          </div>
        </div>

        {/* Right — script */}
        <div style={{ overflow: "auto", paddingRight: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {script.lines.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "16px" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: s.dir === "FINAL" || s.dir === "SUPER"
                      ? "var(--color-grove-park)"
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
                    color: s.dir === "SUPER" ? "var(--color-grove-park)" : "rgba(255,255,255,0.45)",
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
                background: "var(--color-grove-park)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "24px", color: "white" }}>
                Asheville. Make Something of It.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
