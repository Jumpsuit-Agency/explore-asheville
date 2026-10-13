import type { SlideProps } from "../Deck";

/**
 * Territory 03 in the Territory 01 extensions layout (slide 5), for the
 * appendix — so all three territories can be read side by side in one format.
 */
const COLOR = "var(--color-goldenrod)";

const EXTENSIONS = [
  {
    prompt: "What if Asheville starts to feel like a synchronicity—a sign?",
    desc: "Once you see it, you start seeing it everywhere. A cheap flight. A long weekend opening up. A rainbow. A friend who just got back. A billboard. An Asheville Instagram account that started following you. Is it the algorithm or the universe conspiring?",
  },
  {
    prompt: "What if locals get in on it?",
    desc: "Hotel key cards. Coffee sleeves. Storefronts. Murals. Hotel elevators. Even the interstate construction zone gets in on it. Signs show up in the places people stay, eat, shop, walk, drive and explore — each one adding another little nudge, wink or confirmation that Asheville is exactly where they’re supposed to be. Is it word of mouth, or is the whole city in on it?",
  },
  {
    prompt: "What if visitors start to get the cosmic joke?",
    desc: "Asheville keeps showing up because people who live there and visit there love it. When you love a place, you spot it everywhere — a bumper sticker, a friend’s Instagram, a stranger’s t-shirt. And once you see enough signs, you stop noticing them and start making them.",
  },
];

const B30 = {
  label: "B3.0 Activation",
  text: "We teach local businesses to extend the signs — coffee sleeves, key cards, secret menus, storefront messages. The city becomes the media plan. No one needs to be told to participate. They just do.",
};

export function AppendixT3DescSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 120px",
        }}
      >
        <span
          className="type-label"
          style={{ fontSize: "18px", color: COLOR, marginBottom: "18px" }}
        >
          Territory 03 &middot; Campaign Extensions
        </span>

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

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "1000px", marginBottom: "18px" }}>
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
                fontSize: "21px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.5,
              }}>
                {ext.desc}
              </p>
            </div>
          ))}
        </div>

        {/* B3.0 block */}
        <div
          style={{
            maxWidth: "1000px",
            padding: "18px 26px",
            borderLeft: `3px solid ${COLOR}`,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <span className="type-label" style={{ fontSize: "16px", color: COLOR, marginBottom: "10px", display: "block" }}>
            {B30.label}
          </span>
          <p style={{
            fontFamily: "var(--font-slab)",
            fontSize: "22px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}>
            {B30.text}
          </p>
        </div>
      </div>
    </div>
  );
}
