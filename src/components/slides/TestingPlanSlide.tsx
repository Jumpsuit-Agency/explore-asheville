import type { SlideProps } from "../Deck";

const COLOR = "var(--color-goldenrod)";

/**
 * Card geometry borrowed from What's Next, so the plan reads as the detail
 * behind its first step ("Launch Signs on social. Immediately.").
 */
const STEPS = [
  {
    label: "Launch",
    title: "Put “Signs” on social with multiple messaging variants.",
    desc: "Several versions of the message go live at once — different signs for different audiences. We start right away, with real creative in front of real people.",
  },
  {
    label: "Learn",
    title: "Read the response in real time.",
    desc: "Engagement metrics, social listening, comments and shares show us which signs land, with whom, and why — evidence instead of assumption.",
  },
  {
    label: "Adapt",
    title: "Refine, repeat, and inform the larger launch.",
    desc: "Our social listening team adjusts the work and the strategy as we go. What wins on social shapes the fully-produced creative launch.",
  },
];

export function TestingPlanSlide({}: SlideProps) {
  return (
    <div className="slide slide-ink" style={{ padding: 0 }}>
      <div
        className="relative z-10"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 120px",
        }}
      >
        <span className="type-label" style={{ fontSize: "18px", color: COLOR, marginBottom: "18px" }}>
          Testing Plan
        </span>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "20px",
          }}
        >
          Learn in market, <span style={{ color: COLOR }}>not in a conference room.</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "22px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.55,
            maxWidth: "1300px",
            marginBottom: "40px",
          }}
        >
          We value speed-to-market. Starting on social means we can begin right away, and learn from
          real people looking at real creative in real time. That&rsquo;s far more valuable than
          spending months planning creative around assumptions &mdash; or worse, rushing it out.
        </p>

        <div style={{ display: "flex", gap: "32px", marginBottom: "44px" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                padding: "28px 24px",
                borderRadius: "12px",
                border: "1.5px solid rgba(254,181,44,0.25)",
                background: "rgba(254,181,44,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(254,181,44,0.55)",
                  marginBottom: "12px",
                }}
              >
                {String(i + 1).padStart(2, "0")} &middot; {s.label}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: COLOR,
                  lineHeight: 1.3,
                  marginBottom: "10px",
                }}
              >
                {s.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "26px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "1100px",
            margin: "0 auto",
            textWrap: "balance",
          }}
        >
          We start now, bring in our social listening experts, and{" "}
          <span style={{ color: COLOR, fontWeight: 600 }}>adjust the work and the strategy</span>{" "}
          along the way.
        </p>
      </div>
    </div>
  );
}
