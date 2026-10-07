import type { SlideProps } from "../Deck";
import { SlideHeader } from "../SlideHeader";

const COLOR = "var(--color-goldenrod)";

const EXTENSIONS = [
  {
    prompt: "What if Asheville starts to feel like a synchronicity. A sign.",
    desc: "Once you see it, you start seeing it everywhere. A cheap flight. A long weekend opening up. A rainbow. A friend who just got back. A billboard. An Asheville Instagram account that started following you. Is it the algorithm or the universe conspiring?",
  },
  {
    prompt: "What if locals get in on it?",
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
          padding: "48px 80px 40px",
        }}
      >
        <SlideHeader
          color={COLOR}
          eyebrow="Territory 03"
          eyebrowSuffix="Campaign Principles"
          chips={[{ label: "Our Pick" }]}
          title={
            <>
              How <span style={{ color: COLOR }}>“How Many Signs Do You Need?”</span> comes to life.
            </>
          }
        />

        <div style={{ display: "flex", gap: "48px", flex: 1, minHeight: 0, alignItems: "center" }}>
          {/* Left: principles stacked */}
          <div style={{ width: "320px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
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

          {/* Right: extensions */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
            {EXTENSIONS.map((ext, i) => (
              <div key={i}>
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: COLOR,
                  lineHeight: 1.4,
                  marginBottom: "4px",
                }}>
                  {ext.prompt}
                </p>
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.45,
                }}>
                  {ext.desc}
                </p>
              </div>
            ))}

            {/* B3.0 block */}
            <div
              style={{
                padding: "14px 22px",
                borderLeft: `3px solid ${COLOR}`,
                background: "rgba(254,181,44,0.04)",
                borderRadius: "0 8px 8px 0",
              }}
            >
              <span className="type-label" style={{ fontSize: "14px", color: COLOR, marginBottom: "6px", display: "block" }}>
                B3.0 Activation
              </span>
              <p style={{
                fontFamily: "var(--font-slab)",
                fontSize: "18px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}>
                We teach local businesses to extend the signs &mdash; coffee sleeves, key cards, secret menus, storefront messages. The city becomes the media plan. No one needs to be told to participate. They just do.
              </p>
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "26px",
                fontWeight: 800,
                color: COLOR,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              The campaign that makes visiting Asheville feel inevitable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
