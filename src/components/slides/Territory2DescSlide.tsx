import type { SlideProps } from "../Deck";

const COLOR = "var(--color-french-broad)";

const EXTENSIONS = [
  {
    prompt: "What if every visitor leaves with a story nobody believes?",
    desc: "A couple from Nashville visits Asheville for the weekend. They stumble into a drum circle in a parking lot. They forage for dinner with a stranger. They hear an instrument they can\u2019t name and record a video that gets 40,000 views because nobody believes it\u2019s real. They go home and tell the story at a dinner party. Three couples at the table book trips within a month \u2014 because the story sounded made up, and they needed to see for themselves.",
  },
  {
    prompt: "What if the businesses start creating lore on purpose?",
    desc: "Moog Music \u2014 born in Asheville \u2014 partners with the campaign to let visitors twist real local sounds through synthesizers and make something no one\u2019s heard before. A building-scale Sasquatch projection lights up downtown at dusk, teaching crowds the call. A restaurant starts a secret menu you can only find by asking a local. A hotel hides a handwritten note in every room with a different Asheville legend. They\u2019re not waiting for the campaign to feature them. They\u2019re generating lore \u2014 new stories, new rituals, new reasons for people to come back and say \u201Cyou\u2019re not going to believe this.\u201D",
  },
  {
    prompt: "What if the lore never stops compounding?",
    desc: "The Nashville couple tells the story. Their friends visit and come home with a different story. Those friends tell their friends. Each story is unique, each one sounds made up, and each one is a free impression the campaign never had to buy. The lore compounds because it\u2019s real \u2014 and real stories travel further than ads. You don\u2019t scale this with media spend. You scale it with experiences worth retelling.",
  },
];

const B30 = {
  label: "B3.0 Activation",
  text: "Jumpsuit comes to Asheville and works with the businesses directly. We help them see the lore they\u2019re already sitting on \u2014 the weird history, the unexplained traditions, the stories regulars tell but nobody\u2019s ever put on a menu. We teach them to create new rituals, package new myths, and collaborate with each other to build experiences that generate stories on purpose. Then we step back. The lore doesn\u2019t need a campaign manager. It needs a spark.",
};

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
        <span
          className="type-label"
          style={{ fontSize: "12px", color: COLOR, marginBottom: "32px" }}
        >
          Territory 02 &middot; Campaign Extensions
        </span>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          How <span style={{ color: COLOR }}>Sounds Made Up</span> comes to life.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "1000px", marginBottom: "40px" }}>
          {EXTENSIONS.map((ext, i) => (
            <div key={i}>
              <p style={{
                fontFamily: "var(--font-slab)",
                fontSize: "22px",
                fontWeight: 700,
                color: COLOR,
                lineHeight: 1.4,
                marginBottom: "8px",
              }}>
                {ext.prompt}
              </p>
              <p style={{
                fontFamily: "var(--font-slab)",
                fontSize: "18px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
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
            padding: "24px 28px",
            borderLeft: `3px solid ${COLOR}`,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <span className="type-label" style={{ fontSize: "10px", color: COLOR, marginBottom: "10px", display: "block" }}>
            {B30.label}
          </span>
          <p style={{
            fontFamily: "var(--font-slab)",
            fontSize: "17px",
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
