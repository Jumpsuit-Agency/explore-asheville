import type { SlideProps } from "../Deck";

export function Territory2DescSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 120px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <span
            className="type-label"
            style={{ fontSize: "12px", color: "var(--color-french-broad)" }}
          >
            Territory 02 &middot; The Idea
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--color-french-broad)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              background: "rgba(75,139,190,0.15)",
              padding: "3px 10px",
              borderRadius: "4px",
            }}
          >
            Our Pick
          </span>
        </div>

        <div style={{ maxWidth: "1100px", marginBottom: "40px" }}>
          {/* Bold first line — blue */}
          <p style={{
            fontFamily: "var(--font-slab)",
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--color-french-broad)",
            lineHeight: 1.6,
            marginBottom: "12px",
          }}>
            Most destination campaigns tell people what to expect when they visit.
          </p>

          {/* Second line — bold white */}
          <p style={{
            fontFamily: "var(--font-slab)",
            fontSize: "26px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}>
            Sounds Made Up is about Asheville&apos;s unbelievable stories, including your own.
          </p>

          {/* Body */}
          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "12px" }}>
            A castle in the mountains. A drum circle that appears out of nowhere. Hidden restaurants, strange rituals, stories that get better every time they&apos;re told. Asheville is full of lore.
          </p>

          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "12px" }}>
            But so are you. You might just not know it yet.
          </p>

          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "12px" }}>
            What if Asheville is the inciting incident?
          </p>

          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "12px" }}>
            You lose track of time. You make something with your hands. You sing in public. You talk to strangers. You become a version of yourself that sounds a little made up, too.
          </p>

          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "20px" }}>
            The idea also builds on creative that&apos;s already working for Asheville: using sound design to show what the place feels like instead of simply saying it. Banjo strings, rushing water, crowd noise, footsteps, voices, laughter. You hear Asheville before anyone explains it.
          </p>

          {/* Poetic closing */}
          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
            The soundscape becomes the evidence.
          </p>
          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
            The lore becomes the invitation.
          </p>
          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "20px" }}>
            And your own story becomes the payoff.
          </p>

          <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            Because when something sounds made up, curiosity takes over.
          </p>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "64px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          ASHEVILLE.{" "}
          <span style={{ color: "var(--color-french-broad)" }}>
            SOUNDS MADE UP.
          </span>
        </h2>
      </div>
    </div>
  );
}
