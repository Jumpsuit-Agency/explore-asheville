"use client";

import { useState } from "react";
import type { SlideProps } from "../Deck";

const TEAM = [
  { name: "Nicole Ayres", role: "CEO", bio: "Founder of Jumpsuit. Systems thinker, brand strategist, and the person who believed a small team with a sharp idea could outpitch anyone." },
  { name: "Levi Bethune", role: "Creative Director", bio: "Turns strategy into something you can see, hear, and feel. The creative vision across every execution." },
  { name: "Jonathan Lapps", role: "Director of Client Success", bio: "The relationship between idea and impact. Ensures the work doesn't just launch — it lands and compounds." },
  { name: "Alex Land", role: "Account Manager", bio: "Connective tissue. Keeps work moving, details right, communication clear between our team and yours." },
];

const CACHED = [
  {
    prompt: "Experience Enthusiasts, Charlotte, February",
    output: {
      headline: "Make a winter trail of it.",
      social: [
        "The mountains are quieter in February. Your boots are louder. Make something of it.",
        "Skip the crowded slopes. Find the trail no one posted about. Make a discovery of it.",
        "Cold air. Hot coffee. A view that earns both. Make a morning of it.",
      ],
      ooh: "Make a getaway of it. Asheville is closer than you think.",
    },
  },
  {
    prompt: "Energetic Families, Atlanta, Summer",
    output: {
      headline: "Make a splash of it.",
      social: [
        "The French Broad doesn't care how old you are. Everybody floats. Make a family day of it.",
        "They'll remember the tubing. You'll remember the quiet after bedtime. Make a night of it.",
        "Pack light. Plan loose. Let the mountains decide. Make an adventure of it.",
      ],
      ooh: "Make an adventure of it. The mountains are calling your whole crew.",
    },
  },
  {
    prompt: "Traveling Traditionalists, Raleigh, Fall",
    output: {
      headline: "Make a tradition of it.",
      social: [
        "Same winery, same view, different vintage. Some things get better. Make a tradition of it.",
        "Your favorite overlook is still there. The colors aren't. They're better. Make a drive of it.",
        "Three generations at one table. Asheville-grown, family-style. Make a meal of it.",
      ],
      ooh: "Make a tradition of it. The Blue Ridge remembers you, too.",
    },
  },
];

type AIOutput = { headline: string; social: string[]; ooh: string };

export function TeamSlide({}: SlideProps) {
  const [aiActive, setAiActive] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState<AIOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!aiInput.trim()) return;
    setLoading(true);

    const cached = CACHED.find((ex) =>
      aiInput.toLowerCase().includes(ex.prompt.toLowerCase().split(",")[0].trim().toLowerCase())
    );

    try {
      if (!navigator.onLine) throw new Error("offline");

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiInput }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error("API error");
      setAiOutput(await res.json());
    } catch {
      setAiOutput(cached?.output || CACHED[0].output);
    } finally {
      setLoading(false);
    }
  };

  if (aiActive) {
    return (
      <div className="slide slide-ink" style={{ padding: "60px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
          <button
            onClick={() => { setAiActive(false); setAiOutput(null); setAiInput(""); }}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "6px 14px", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "12px", cursor: "pointer" }}
          >
            &larr; Team
          </button>
          <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "28px", fontWeight: 800, color: "var(--color-goldenrod)" }}>
            One Invitation, Infinite Ways to Make
          </h3>
        </div>

        <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.4)", marginBottom: "24px" }}>
          Name an audience, a market, and a season. Watch the platform generate.
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {CACHED.map((ex) => (
            <button
              key={ex.prompt}
              onClick={() => setAiInput(ex.prompt)}
              className="glass-light"
              style={{ padding: "8px 16px", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", fontSize: "13px" }}
            >
              {ex.prompt}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
          <input
            className="ai-input"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g., Value Seekers, Nashville, Winter"
            style={{ flex: 1 }}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "0 36px",
              background: "var(--color-goldenrod)",
              color: "#1E1F38",
              border: "none",
              borderRadius: "8px",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "..." : "Generate"}
          </button>
        </div>

        {aiOutput && (
          <div className="glass" style={{ flex: 1, padding: "36px", overflow: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              <div>
                <span className="type-label" style={{ fontSize: "10px", color: "var(--color-goldenrod)", marginBottom: "8px", display: "block" }}>Headline</span>
                <p style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "36px", color: "white", lineHeight: 1.15, marginBottom: "32px" }}>
                  {aiOutput.headline}
                </p>
                <span className="type-label" style={{ fontSize: "10px", color: "var(--color-grove-park)", marginBottom: "8px", display: "block" }}>OOH</span>
                <p style={{ fontFamily: "var(--font-slab)", fontSize: "20px", color: "rgba(255,255,255,0.6)" }}>
                  {aiOutput.ooh}
                </p>
              </div>
              <div>
                <span className="type-label" style={{ fontSize: "10px", color: "var(--color-fiddlehead)", marginBottom: "12px", display: "block" }}>Social</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {aiOutput.social.map((line, i) => (
                    <div key={i} className="glass-light" style={{ padding: "16px 20px" }}>
                      <p style={{ fontFamily: "var(--font-slab)", fontSize: "17px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                AI-generated &middot; Not pre-written work
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="slide" style={{ padding: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(3, 33, 84, 0.85)" }} />

      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 80px" }}>
        <span className="type-label" style={{ color: "var(--color-jumpsuit-gold)" }}>
          The Team
        </span>
        <h2 className="type-headline" style={{ marginTop: "16px", marginBottom: "48px", fontSize: "48px" }}>
          Who&apos;s in the room.
        </h2>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", alignItems: "start" }}>
          {TEAM.map((m) => (
            <div key={m.name} className="glass-light" style={{ padding: "28px 24px" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 800,
                color: "rgba(255,255,255,0.2)", marginBottom: "16px",
              }}>
                {m.name.charAt(0)}
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                {m.name}
              </h3>
              <span className="type-label" style={{ fontSize: "9px", color: "var(--color-jumpsuit-gold)", marginBottom: "12px", display: "block" }}>
                {m.role}
              </span>
              <p style={{ fontFamily: "var(--font-slab)", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                {m.bio}
              </p>
            </div>
          ))}

          {/* AI teammate */}
          <div
            className="glass-light"
            style={{ padding: "28px 24px", borderLeft: "2px solid var(--color-jumpsuit-gold)", cursor: "pointer" }}
            onClick={() => setAiActive(true)}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "var(--color-jumpsuit-gold)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 800,
              color: "var(--color-jumpsuit-navy)", marginBottom: "16px",
            }}>
              AI
            </div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
              Claude
            </h3>
            <span className="type-label" style={{ fontSize: "9px", color: "var(--color-jumpsuit-gold)", marginBottom: "12px", display: "block" }}>
              AI Creative Engine
            </span>
            <p style={{ fontFamily: "var(--font-slab)", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: "16px" }}>
              Trained on the Storytelling Foundation, MMGY segmentation, and our platform. Generates on-brand copy live.
            </p>
            <span style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "var(--color-jumpsuit-gold)",
              color: "var(--color-jumpsuit-navy)",
              borderRadius: "6px",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              Try it live &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
