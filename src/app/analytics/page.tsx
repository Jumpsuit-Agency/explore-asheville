"use client";

import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  session_id: string;
  slide_id: string;
  slide_title: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface Session {
  id: string;
  firstSeen: string;
  lastSeen: string;
  slides: Set<string>;
  messages: LogEntry[];
}

export default function AnalyticsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"sessions" | "questions" | "slides">("sessions");
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const fetchLogs = async (key: string) => {
    setLoading(true);
    const res = await fetch(`/api/analytics?key=${key}`);
    if (!res.ok) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLogs(data);
    setAuthed(true);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs(password);
  };

  // Group logs into sessions
  const sessions: Session[] = (() => {
    const map = new Map<string, Session>();
    // Logs are desc, reverse to build chronologically
    const sorted = [...logs].reverse();
    for (const log of sorted) {
      let session = map.get(log.session_id);
      if (!session) {
        session = {
          id: log.session_id,
          firstSeen: log.created_at,
          lastSeen: log.created_at,
          slides: new Set(),
          messages: [],
        };
        map.set(log.session_id, session);
      }
      session.lastSeen = log.created_at;
      session.slides.add(log.slide_id);
      session.messages.push(log);
    }
    // Return most recent first
    return Array.from(map.values()).reverse();
  })();

  // All user questions
  const userQuestions = logs.filter((l) => l.role === "user");

  // Slide engagement counts
  const slideCounts: { slide: string; title: string; count: number }[] = (() => {
    const map = new Map<string, { title: string; count: number }>();
    for (const log of logs) {
      if (log.role === "user") {
        const existing = map.get(log.slide_id);
        if (existing) {
          existing.count++;
        } else {
          map.set(log.slide_id, { title: log.slide_title || log.slide_id, count: 1 });
        }
      }
    }
    return Array.from(map.entries())
      .map(([slide, data]) => ({ slide, title: data.title, count: data.count }))
      .sort((a, b) => b.count - a.count);
  })();

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#1E1F38",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "40px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1
            style={{
              fontFamily: "system-ui",
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
            }}
          >
            Jumpsuit Analytics
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              padding: "10px 14px",
              fontSize: "14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              outline: "none",
              fontFamily: "system-ui",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "13px",
              fontWeight: 700,
              background: "#FEB52C",
              color: "#1E1F38",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "system-ui",
            }}
          >
            View Analytics
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#1E1F38", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "system-ui" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1E1F38", padding: "40px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
            Explore Asheville — AI Analytics
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            {sessions.length} session{sessions.length !== 1 ? "s" : ""} · {userQuestions.length} question{userQuestions.length !== 1 ? "s" : ""} · {slideCounts.length} slide{slideCounts.length !== 1 ? "s" : ""} engaged
          </p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
          {(["sessions", "questions", "slides"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: view === tab ? "#FEB52C" : "rgba(255,255,255,0.08)",
                color: view === tab ? "#1E1F38" : "rgba(255,255,255,0.6)",
                textTransform: "capitalize",
                fontFamily: "system-ui",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sessions view */}
        {view === "sessions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sessions.length === 0 && (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>No sessions yet. Data will appear once clients use the AI.</p>
            )}
            {sessions.map((session) => {
              const userMsgs = session.messages.filter((m) => m.role === "user");
              const isExpanded = expandedSession === session.id;
              return (
                <div
                  key={session.id}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "4px" }}>
                        {formatTime(session.firstSeen)}
                      </p>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                        {userMsgs.length} question{userMsgs.length !== 1 ? "s" : ""} · {session.slides.size} slide{session.slides.size !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>
                      {isExpanded ? "\u25B2" : "\u25BC"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {session.messages.map((msg) => (
                        <div
                          key={msg.id}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            background: msg.role === "user" ? "rgba(254,181,44,0.12)" : "rgba(255,255,255,0.04)",
                            borderLeft: msg.role === "user" ? "3px solid #FEB52C" : "3px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: msg.role === "user" ? "#FEB52C" : "rgba(255,255,255,0.3)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}>
                              {msg.role === "user" ? "Client" : "AI"} · {msg.slide_title || msg.slide_id}
                            </span>
                            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                          <p style={{
                            fontSize: "13px",
                            color: msg.role === "user" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                            lineHeight: 1.5,
                            whiteSpace: "pre-wrap",
                          }}>
                            {msg.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Questions view */}
        {view === "questions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {userQuestions.length === 0 && (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>No questions yet.</p>
            )}
            {userQuestions.map((q) => (
              <div
                key={q.id}
                style={{
                  padding: "14px 18px",
                  background: "rgba(254,181,44,0.08)",
                  border: "1px solid rgba(254,181,44,0.15)",
                  borderRadius: "10px",
                }}
              >
                <p style={{ fontSize: "14px", color: "white", lineHeight: 1.5, marginBottom: "6px" }}>
                  {q.content}
                </p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                  {q.slide_title || q.slide_id} · {formatTime(q.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Slides view */}
        {view === "slides" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {slideCounts.length === 0 && (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>No slide engagement yet.</p>
            )}
            {slideCounts.map((s) => (
              <div
                key={s.slide}
                style={{
                  padding: "14px 18px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{s.title}</p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{s.slide}</p>
                </div>
                <div style={{
                  padding: "6px 14px",
                  background: "rgba(254,181,44,0.15)",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FEB52C",
                }}>
                  {s.count}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
