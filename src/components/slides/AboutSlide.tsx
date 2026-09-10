"use client";

import { useState } from "react";
import Image from "next/image";
import type { SlideProps } from "../Deck";

export function AboutSlide({}: SlideProps) {
  const [showB30, setShowB30] = useState(false);
  return (
    <div className="slide" style={{ padding: 0 }}>
      {/* Semi-transparent overlay — ridges show through */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(30, 31, 56, 0.8)" }} />

      <div className="relative z-10 flex flex-col flex-1" style={{ padding: "80px 100px" }}>
        {/* Jumpsuit wordmark */}
        <Image
          src="/jumpsuit-wordmark.png"
          alt="Jumpsuit"
          width={200}
          height={40}
          style={{ marginBottom: "48px" }}
        />

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "60px", alignItems: "center" }}>
          {/* Left — who we are */}
          <div>
            <h2 className="type-billboard" style={{ marginBottom: "24px", lineHeight: 1.0, fontSize: "72px" }}>
              <span style={{ color: "var(--color-jumpsuit-gold)" }}>Independent</span><br />
              <span style={{ color: "var(--color-jumpsuit-gold)" }}>Together.</span>
            </h2>

            <p className="type-subhead" style={{ color: "rgba(255,255,255,0.55)", fontSize: "22px", marginBottom: "24px", maxWidth: "700px", lineHeight: 1.5 }}>
              Jumpsuit is an award-winning creative agency and future of work
              consultancy powered by the independent network. Our network is
              entrepreneurial, highly curated, and self-organizing. We are leaders
              in{" "}
              <span
                className="interactive"
                onClick={() => setShowB30(!showB30)}
                style={{
                  color: "var(--color-jumpsuit-gold)",
                  cursor: "pointer",
                  borderBottom: "1px dashed var(--color-jumpsuit-gold)",
                }}
              >
                Business 3.0
              </span>
              .
            </p>

            {showB30 && (
              <div
                className="glass"
                style={{
                  padding: "20px 24px",
                  marginBottom: "24px",
                  maxWidth: "700px",
                  borderLeft: "2px solid var(--color-jumpsuit-gold)",
                  animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-slab)",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}>
                  Business 3.0 is a living-systems approach to work &mdash; where
                  organizations grow like ecosystems instead of machines, scaling through
                  trust, contribution, and interdependence the way nature has for
                  billions of years.
                </p>
              </div>
            )}

            <p className="type-body" style={{ color: "rgba(255,255,255,0.45)", fontSize: "18px", maxWidth: "650px", lineHeight: 1.6 }}>
              In practice, that means ideas you didn&apos;t ask for, talent you
              couldn&apos;t access otherwise, and the kind of speed and agility that
              only comes from a self-organizing network. We&apos;ve been operating
              this way from Day 1 &mdash; because we believe the future of work
              isn&apos;t a bigger machine. It&apos;s a living system.
            </p>
          </div>

          {/* Right — people in the room */}
          <div>
            <span className="type-label" style={{ fontSize: "12px", color: "var(--color-jumpsuit-gold)", marginBottom: "20px", display: "block" }}>
              In the Room
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
              {[
                { name: "Nicole Ayres", role: "CEO", photo: "/team/nicole.jpg", bio: "Founder of Jumpsuit, obsessed with the future, and learning to become more present." },
                { name: "Jonathan Lapps", role: "Director of Client Success", photo: "/team/jonathan.jpg", bio: "Makes sure clients are happy with the team and the results while integrating his people-pleasing shadow." },
                { name: "Alex Land", role: "Account Director", photo: "/team/alex.jpg", bio: "Keeps everything moving, everyone aligned, and somehow remembers every detail you forgot you mentioned." },
                { name: "Levi Bethune", role: "Creative Director", photo: "/team/levi.png", bio: "Full stack creative. What can\u2019t this guy do? Seriously, we\u2019re still trying to figure it out." },
                { name: "Sas", role: "Director of Multidimensionality", photo: "/team/sasquatch.png", bio: "Sees what others can\u2019t. Bridges dimensions. Technically unverified but consistently right." },
                { name: "AI", role: "Live Knowledge Base", photo: "/team/ai.png", bio: "Knows the brief, the documents, and our ideas. You can play with him in and outside of the meeting. He will not take jobs from anyone." },
              ].map((person) => (
                <div
                  key={person.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    backgroundImage: person.photo ? `url(${person.photo})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: person.photo ? "transparent" : "var(--color-jumpsuit-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: person.name === "AI" ? "40px" : "52px",
                    fontWeight: 800,
                    color: person.photo ? "transparent" : "var(--color-jumpsuit-navy)",
                    marginBottom: "12px",
                    border: "2px solid rgba(255,255,255,0.1)",
                    overflow: "hidden",
                  }}>
                    {person.photo ? null : (person.name === "AI" ? "AI" : person.name.charAt(0))}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: "-0.02em",
                    marginBottom: "2px",
                  }}>
                    {person.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "var(--color-jumpsuit-gold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}>
                    {person.role}
                  </span>
                  <p style={{
                    fontFamily: "var(--font-slab)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.4,
                  }}>
                    {person.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
