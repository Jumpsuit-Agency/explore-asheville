"use client";

import { useState, useRef, useEffect, useCallback, useMemo, useImperativeHandle, forwardRef } from "react";

// Stable session ID per browser tab — persists across slide changes
function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("advisor-session");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("advisor-session", id);
  }
  return id;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface CreativeAdvisorHandle {
  open: () => void;
}

interface CreativeAdvisorProps {
  slideId: string;
  slideTitle: string;
}

const SLIDE_STARTERS: Record<string, string> = {
  "title": "Why is Jumpsuit the right partner for Explore Asheville?",
  "about": "What makes Jumpsuit different from a traditional agency?",
  "assignment": "How does your rubric ensure these are actually big ideas?",
  "territories": "Why three ideas — and why is Territory 03 your pick?",
  "territory-1-desc": "How would 'Make Something of It' work for a specific segment?",
  "territory-1": "What would this look like for a family visiting in summer?",
  "territory-2-desc": "What makes 'Sounds Made Up' feel different from typical destination marketing?",
  "territory-2-creative": "How would the Moog partnership actually work?",
  "territory-3-desc": "How important is Sasquatch — could the campaign live without him?",
  "territory-3-sas-story": "What happens after Sasquatch is gone — does Asheville keep winning?",
  "territory-3-creative": "How does the follow-back social engine actually work?",
  "hero-film": "What's the production vision for this spot?",
  "rationale": "Why Territory 03 over Sounds Made Up?",
  "client-rubric": "How does this turn passive awareness into actual visits?",
  "closing": "What would working with Jumpsuit actually look like?",
};

export const CreativeAdvisor = forwardRef<CreativeAdvisorHandle, CreativeAdvisorProps>(function CreativeAdvisor({ slideId, slideTitle }, ref) {
  const sessionId = useMemo(() => getSessionId(), []);
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [pulseVisible, setPulseVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  // Focus input when panel opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Hide pulse after first open
  useEffect(() => {
    if (open) setPulseVisible(false);
  }, [open]);

  // Reset conversation when navigating to a new slide
  const prevSlideId = useRef(slideId);
  useEffect(() => {
    if (slideId !== prevSlideId.current) {
      prevSlideId.current = slideId;
      setMessages([]);
      setInput("");
      setStreaming(false);
    }
  }, [slideId]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setStreaming(true);

      // Add empty assistant message to stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      try {
        const res = await fetch("/api/advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            slideId,
            slideTitle,
            sessionId,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.role === "assistant") {
                      updated[updated.length - 1] = {
                        ...last,
                        content: last.content + parsed.text,
                      };
                    }
                    return updated;
                  });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant" && last.content === "") {
            updated[updated.length - 1] = {
              ...last,
              content: "Something went wrong. Try again?",
            };
          }
          return updated;
        });
      }

      setStreaming(false);
    },
    [messages, slideId, streaming]
  );

  const starter = SLIDE_STARTERS[slideId] || "What should I know about this slide?";

  return (
    <>
      {/* Floating AI face button */}
      <button
        onClick={() => setOpen(!open)}
        className="advisor-trigger"
        aria-label="Open AI advisor"
        style={{
          position: "absolute",
          bottom: "24px",
          left: "40px",
          zIndex: 45,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: open ? "2px solid var(--color-goldenrod)" : "2px solid rgba(255,255,255,0.2)",
          background: "rgba(30, 31, 56, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: open ? "0 0 20px rgba(254, 181, 44, 0.3)" : "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src="/team/ai.png"
          alt="AI Advisor"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: open ? 1 : 0.7,
            transition: "opacity 0.3s",
          }}
        />
        {pulseVisible && (
          <span
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: "2px solid var(--color-goldenrod)",
              animation: "advisor-pulse 2s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="advisor-panel"
          onKeyDown={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "90px",
            left: "40px",
            zIndex: 44,
            width: "480px",
            maxHeight: "740px",
            display: "flex",
            flexDirection: "column",
            background: "rgba(30, 31, 56, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            animation: "advisor-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <img src="/team/ai.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                AI
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Live Knowledge Base
              </p>
            </div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--color-goldenrod)",
                opacity: 0.6,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {slideTitle}
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                border: "none",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-slab)",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.5,
                  }}
                >
                  I know the brief, the documents, and every idea in this deck. Ask me anything.
                </p>
                <button
                  onClick={() => sendMessage(starter)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-goldenrod)",
                    background: "rgba(254,181,44,0.1)",
                    border: "1px solid rgba(254,181,44,0.25)",
                    borderRadius: "8px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    lineHeight: 1.4,
                    transition: "background 0.2s",
                  }}
                >
                  {starter}
                </button>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "90%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                    background:
                      msg.role === "user"
                        ? "var(--color-goldenrod)"
                        : "rgba(255,255,255,0.08)",
                    color: msg.role === "user" ? "var(--color-ridge-ink)" : "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    lineHeight: 1.55,
                    fontWeight: msg.role === "user" ? 600 : 400,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {streaming && i === messages.length - 1 && msg.role === "assistant" && msg.content === "" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ display: "flex", gap: "4px" }}>
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "var(--color-goldenrod)",
                              animation: `advisor-dot 1.2s ease-in-out ${d * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", fontSize: "12px" }}>
                        thinking
                      </span>
                    </span>
                  ) : (
                    <>
                      {msg.content}
                      {streaming && i === messages.length - 1 && msg.role === "assistant" && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "14px",
                            background: "var(--color-goldenrod)",
                            marginLeft: "2px",
                            animation: "advisor-blink 1s step-end infinite",
                            verticalAlign: "text-bottom",
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the campaign..."
              disabled={streaming}
              style={{
                flex: 1,
                padding: "10px 14px",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-goldenrod)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              style={{
                padding: "10px 16px",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 700,
                background: input.trim() && !streaming ? "var(--color-goldenrod)" : "rgba(255,255,255,0.1)",
                color: input.trim() && !streaming ? "var(--color-ridge-ink)" : "rgba(255,255,255,0.3)",
                border: "none",
                borderRadius: "8px",
                cursor: input.trim() && !streaming ? "pointer" : "default",
                transition: "all 0.2s",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
});
