import type { SlideProps } from "../Deck";

const COLOR = "var(--color-grove-park)";

const EXTENSIONS = [
  {
    prompt: "What if the campaign follows people home?",
    desc: "An accountant from Atlanta spends a weekend in Asheville and makes a terrible bowl. She posts it. Her coworkers roast her. Her daughter uses it for cereal. Three weeks later, a billboard on her commute features that bowl. Her office sees it. Her gym sees it. She becomes a local celebrity for the worst pottery in Peachtree Corners \u2014 and suddenly everyone she knows is curious about the place that did that to her.",
  },
  {
    prompt: "What if the locals become characters who know how to make contact?",
    desc: "The accountant\u2019s bowl didn\u2019t come from nowhere. A potter on Roberts Street taught her. But here\u2019s what the campaign does to that potter: she starts collaborating with the coffee shop next door, who now serves drinks in the worst cups from each class. The fishing guide partners with a chef \u2014 catch it, cook it, eat it becomes a bookable experience neither of them offered before. A hotel creates a \u201Cmake something\u201D package with three local makers. The campaign doesn\u2019t just market these businesses. It makes them more creative, more connected, and more alive. They\u2019re launching new products, building new partnerships, and becoming the kind of place people talk about \u2014 because the campaign gave them a reason to make contact with each other.",
  },
  {
    prompt: "What if the campaign never stops spreading?",
    desc: "The accountant goes home and tells the story. Her coworker books a trip. The cycle restarts \u2014 with new people, new businesses, new stories, and zero additional media spend. Every visitor feeds the next visitor. Every local collaboration creates the next experience. The campaign compounds because participation IS the distribution model. You don\u2019t scale it with budget. You scale it with people.",
  },
];

const B30 = {
  label: "B3.0 Activation",
  text: "This is where Jumpsuit operates differently. We come to Asheville. We sit down with the makers, the guides, the chefs, the shop owners. We teach them the framework, inspire new ideas, and help them see the collaborations hiding in plain sight. Then we get out of the way. The campaign doesn\u2019t need us to run it \u2014 it needs us to ignite it. Once the locals see themselves as the campaign, they don\u2019t stop.",
};

export function Territory1DescSlide({}: SlideProps) {
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
          Territory 01 &middot; Campaign Extensions
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
          How <span style={{ color: COLOR }}>Make Something of It</span> comes to life.
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
