import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

const EXTENSIONS = [
  {
    prompt: "What if Asheville starts to feel like a synchronicity. A sign.",
    desc: "Once you see it, you start seeing it everywhere. A cheap flight. A long weekend opening up. A rainbow. A friend who just got back. A billboard. An Asheville Instagram account that started following you. Is it the algorithm or the universe conspiring?",
  },
  {
    prompt: "What if visitors get in on it?",
    desc: "Hotel key cards. Coffee sleeves. Storefronts. Murals. Hotel elevators. Even the interstate construction zone gets in on it. Signs show up in the places people stay, eat, shop, walk, drive and explore \u2014 each one adding another little nudge, wink or confirmation that Asheville is exactly where they\u2019re supposed to be. Is it word of mouth, or is the whole city in on it?",
  },
  {
    prompt: "What if visitors start to get the cosmic joke?",
    desc: "Asheville keeps showing up because people who live there and visit there love it. When you love a place, you spot it everywhere \u2014 a bumper sticker, a friend\u2019s Instagram, a stranger\u2019s t-shirt. And once you see enough signs, you stop noticing them and start making them.",
  },
];

export function Territory3DescSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 120px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <span
            className="type-label"
            style={{ fontSize: "18px", color: COLOR }}
          >
            Territory 03 &middot; Campaign Principles
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: 700,
              color: COLOR,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              background: "rgba(254,181,44,0.15)",
              padding: "3px 10px",
              borderRadius: "4px",
            }}
          >
            Our Pick
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          How <span style={{ color: COLOR }}>How Many Signs Do You Need?</span> comes to life.
        </h2>

        <div style={{ display: "flex", gap: "48px", flex: 1, minHeight: 0 }}>
          {/* Left: extensions */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {EXTENSIONS.map((ext, i) => (
              <div key={i}>
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "21px",
                  fontWeight: 700,
                  color: COLOR,
                  lineHeight: 1.4,
                  marginBottom: "8px",
                }}>
                  {ext.prompt}
                </p>
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "20px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                }}>
                  {ext.desc}
                </p>
              </div>
            ))}

            {/* The tee-up */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "34px",
                fontWeight: 800,
                color: COLOR,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginTop: "auto",
              }}
            >
              The campaign that makes visiting Asheville feel inevitable.
            </p>
          </div>

          {/* Right: principles as pill blocks */}
          <div style={{ width: "340px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px", justifyContent: "flex-start" }}>
            {[
              { title: "Every touchpoint is a sign.", desc: "The media plan becomes part of the idea. Every ad, billboard, search result and retargeting hit feels less like advertising \u2014 and more like Asheville finding you." },
              { title: "Love is the engine.", desc: "People who love Asheville can\u2019t help talking about it. Their recommendations, stories, photos and invitations become signs of their own." },
              { title: "Visitors become the campaign.", desc: "Fall for Asheville and you start sending signs back into the world. The cosmic joke is that eventually, there is no campaign. Just people pointing people toward Asheville." },
            ].map((p, i) => (
              <div key={i} style={{
                padding: "20px 24px",
                borderRadius: "10px",
                border: `1.5px solid rgba(254,181,44,0.3)`,
                background: "rgba(254,181,44,0.06)",
              }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 800, color: COLOR, lineHeight: 1.3, marginBottom: "6px" }}>
                  {p.title}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
