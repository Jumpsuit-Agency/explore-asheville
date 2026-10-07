import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const ACTIVATIONS = [
  {
    src: "/creative/t3-sas-new-belgium.png",
    alt: "New Belgium billboard — We Don't Know Why Sasquatch Keeps Showing Up Here Either",
    title: "New Belgium — Partner Activation",
    desc: "The brewery plays along with a wink. Sasquatch keeps showing up at their taproom. Apparently he drinks local.",
  },
  {
    src: "/creative/t3-sas-dog-bowl.png",
    alt: "BattleCat Coffee Bar with oversized Sasquatch water bowl and Please Do Not Pet sign",
    title: "The Dog Bowl — Street Installation",
    desc: "An oversized trough labeled SASQUATCH sits outside a coffee shop next to the regular dog bowls. Please do not pet.",
  },
  {
    src: "/creative/t3-sas-barber.png",
    alt: "The Local Barber with Sasquatch fur spilling onto sidewalk — You Should've Seen Him Before",
    title: "The Haircut — Storefront Takeover",
    desc: "A mountain of coarse brown hair spills onto the sidewalk. The window reads: SASQUATCH GOT A HAIRCUT. YOU SHOULD'VE SEEN HIM BEFORE.",
  },
  {
    src: "/creative/t3-sas-french-broad.png",
    alt: "Giant Sasquatch footprints appear on French Broad River Greenway in the rain",
    title: "French Broad Footprints — Landscape",
    desc: "Hydrophobic footprints on the greenway — invisible when dry, revealed by rain. The weather itself becomes a sign.",
  },
];

export function Territory3ActivationsSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "48px 72px 40px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "20px", flexShrink: 0 }}>
          <span className="type-label" style={{ fontSize: "12px", color: COLOR, marginBottom: "12px", display: "block" }}>
            Territory 03 &middot; Phase 6 Continued
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "42px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Sas doesn&apos;t advertise Asheville.{" "}
            <span style={{ color: COLOR }}>He lives here.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "10px",
            }}
          >
            Partner activations, landmarks, storefronts, and the landscape itself.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {ACTIVATIONS.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                border: "1.5px solid rgba(254,181,44,0.15)",
                background: "rgba(254,181,44,0.04)",
                overflow: "hidden",
                animation: `child-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both`,
              }}
            >
              <img
                src={a.src}
                alt={a.alt}
                style={{
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "12px 14px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 800,
                    color: COLOR,
                    lineHeight: 1.3,
                    marginBottom: "4px",
                  }}
                >
                  {a.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.4,
                  }}
                >
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Kicker */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            marginTop: "16px",
            flexShrink: 0,
          }}
        >
          Each one independently funny and highly photographable. Together, they build Asheville lore.
        </p>
      </div>
    </div>
  );
}
