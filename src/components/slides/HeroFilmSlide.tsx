import type { SlideProps } from "../Deck";

const SCRIPT = [
  { dir: "OPEN", vis: "Hands in clay. A wheel spinning. We don't see the face yet.", vo: "People ask what there is to do in Asheville." },
  { dir: "CUT TO", vis: "A chef at a farmers market. Real hands, real dirt on the carrots.", vo: "And that's always been the wrong question." },
  { dir: "CUT TO", vis: "Family at the French Broad. Kids skipping rocks. Dad trying. Missing.", vo: "The right question is: what are you going to make of it?" },
  { dir: "CUT TO", vis: "A woman on a trail at sunrise. Watching her breath in cold mountain air." },
  { dir: "CUT TO", vis: "The potter again. Small studio. Light through a dusty window.", vo: "Make a meal of it. Make a morning of it." },
  { dir: "CUT TO", vis: "Two friends at a brewery. One sketching the other on a napkin. Terrible. Perfect.", vo: "Make a terrible drawing of your best friend." },
  { dir: "CUT TO", vis: "Night. String lights. A couple slow-dancing on a patio. The band plays on.", vo: "Make a night you'll talk about for years." },
  { dir: "CUT TO", vis: "The potter pulls something off the wheel. Imperfect. Beautiful.", vo: "Asheville doesn't give you an experience." },
  { dir: "FINAL", vis: "Blue Ridge Mountains at golden hour. The light does something impossible.", vo: "It gives you the raw material to make one." },
];

export function HeroFilmSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: "60px 80px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "24px", marginBottom: "40px" }}>
        <span className="type-label" style={{ color: "var(--color-goldenrod)" }}>
          Hero Film
        </span>
        <span className="type-label" style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>
          :60 &middot; &ldquo;Raw Material&rdquo;
        </span>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px" }}>
        {/* Left — video placeholder + cuts */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="asset-placeholder"
            style={{ flex: 1, minHeight: "400px", marginBottom: "16px", fontSize: "16px" }}
          >
            :60 Hero Film — Production Pending
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="asset-placeholder" style={{ flex: 1, height: "56px", fontSize: "11px" }}>:30 Cut</div>
            <div className="asset-placeholder" style={{ flex: 1, height: "56px", fontSize: "11px" }}>:15 Cut</div>
          </div>
          <div className="glass-light" style={{ marginTop: "16px", padding: "16px 20px" }}>
            <span className="type-label" style={{ fontSize: "9px", color: "var(--color-fir)" }}>Production</span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.5 }}>
              Shot on location. Real people, real places. Mountain Elder VO.
              Genuine, layered, sense of place — never posed.
            </p>
          </div>
        </div>

        {/* Right — script in monospace/cinematic style */}
        <div style={{ overflow: "auto", paddingRight: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SCRIPT.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "16px" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: s.dir === "FINAL" ? "var(--color-goldenrod)" : "rgba(255,255,255,0.25)",
                    minWidth: "52px",
                    paddingTop: "4px",
                    flexShrink: 0,
                  }}
                >
                  {s.dir}
                </span>
                <div>
                  <p style={{ fontFamily: "var(--font-slab)", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
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
                background: "var(--color-goldenrod)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "24px", color: "#1E1F38" }}>
                Asheville. Make Something of It.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
