"use client";

import { useState } from "react";
import Image from "next/image";
import type { SlideProps } from "../Deck";

export function ClosingSlide({ onOpenAdvisor }: SlideProps) {
  const [showSas, setShowSas] = useState(false);

  return (
    <div className="slide" style={{ padding: 0 }}>
      {/* Semi-transparent overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(30, 31, 56, 0.85)" }} />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 100px",
          textAlign: "center",
        }}
      >
        {/* Jumpsuit wordmark */}
        <Image
          src="/jumpsuit-wordmark.png"
          alt="Jumpsuit"
          width={200}
          height={40}
          style={{ position: "absolute", top: "80px", left: "100px" }}
        />

        {/* Headline */}
        <h2
          className="type-billboard"
          style={{
            fontSize: "64px",
            lineHeight: 1.05,
            marginBottom: "32px",
            color: "white",
          }}
        >
          We have <span style={{ color: "var(--color-goldenrod)" }}>award-winning</span> humans.<br />
          And an{" "}
          <span
            onClick={() => setShowSas(true)}
            style={{
              color: "var(--color-goldenrod)",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationThickness: "2px",
            }}
          >
            award-accepting
          </span>{" "}
          Sasquatch.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-slab)",
            fontSize: "36px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "56px",
            fontStyle: "italic",
          }}
        >
          How many signs do you need?
        </p>

        {/* Two CTA cards */}
        <div style={{ display: "flex", gap: "48px", alignItems: "stretch" }}>
          {/* Contact Jonathan */}
          <div
            className="glass"
            style={{
              padding: "36px 44px",
              borderRadius: "16px",
              textAlign: "left",
              width: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              className="type-label"
              style={{
                fontSize: "11px",
                color: "var(--color-goldenrod)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Let&apos;s Talk
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/team/jonathan.jpg"
                  alt="Jonathan Lapps"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "2px",
                  }}
                >
                  Jonathan Lapps
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Director of Client Success
                </p>
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "18px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              <a
                href="mailto:jonathan@jumpsuitagency.com"
                style={{ color: "var(--color-goldenrod)", textDecoration: "none" }}
              >
                jonathan@jumpsuitagency.com
              </a>
              <br />
              <a
                href="tel:5132526492"
                style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
              >
                513-252-6492
              </a>
            </p>
          </div>

          {/* Play with AI */}
          <div
            className="glass"
            onClick={() => onOpenAdvisor?.()}
            style={{
              padding: "36px 44px",
              borderRadius: "16px",
              textAlign: "left",
              width: "400px",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "border-color 0.3s",
              borderColor: "rgba(254,181,44,0.25)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-goldenrod)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(254,181,44,0.25)"; }}
          >
            <span
              className="type-label"
              style={{
                fontSize: "11px",
                color: "var(--color-goldenrod)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Keep Exploring
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid var(--color-goldenrod)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/team/ai.png"
                  alt="AI Advisor"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "2px",
                  }}
                >
                  Play with our AI
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Live Knowledge Base
                </p>
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "18px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              Click the AI on any slide.<br />
              It knows everything in this deck.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.25)",
            marginTop: "56px",
          }}
        >
          Jumpsuit &middot; Independent Together &middot; jumpsuitagency.com
        </p>
      </div>

      {/* Sas ADDY easter egg modal */}
      {showSas && (
        <div
          onClick={() => setShowSas(false)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            animation: "child-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <div style={{ position: "relative", maxWidth: "600px" }}>
            <img
              src="/team/sas-addy.jpg"
              alt="Sas accepting a Gold ADDY at the American Advertising Federation"
              style={{
                width: "100%",
                borderRadius: "16px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-slab)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                marginTop: "16px",
                fontStyle: "italic",
              }}
            >
              Sas accepting a Gold ADDY. As one does.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
