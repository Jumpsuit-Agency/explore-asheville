"use client";

import { useEffect, useState } from "react";

/**
 * Registers the precache worker and reports where it has got to.
 *
 * The presenter's question before walking into a room with unknown wifi is
 * "is it actually cached yet?" — a spinner does not answer that, so this
 * counts real assets and then says so plainly and gets out of the way.
 */
export function OfflineReady() {
  const [state, setState] = useState<"idle" | "caching" | "ready">("idle");
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "precache-progress") {
        setState("caching");
        setDone(d.done);
        setTotal(d.total);
      }
      if (d.type === "precache-complete") {
        setDone(d.total);
        setTotal(d.total);
        setState("ready");
        // Say it, then stop taking up the corner.
        window.setTimeout(() => setDismissed(true), 4000);
      }
    };

    navigator.serviceWorker.addEventListener("message", onMessage);
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      // Already installed from a previous visit: nothing to announce.
      if (reg.active && !reg.installing) {
        setState("ready");
        setDismissed(true);
      }
    }).catch(() => {
      /* unsupported or blocked — the deck still works, just not offline */
    });

    return () => navigator.serviceWorker.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  // Running without a network is the state worth confirming on sight.
  if (offline) {
    return (
      <div className="offline-chip is-offline" role="status">
        Offline &middot; running from cache
      </div>
    );
  }

  if (dismissed || state === "idle") return null;

  return (
    <div className="offline-chip" role="status">
      {state === "ready" ? (
        <>Ready offline &middot; {total} assets cached</>
      ) : (
        <>
          Caching for offline &middot; {done}/{total}
          <span className="offline-chip-bar">
            <span style={{ width: total ? `${(done / total) * 100}%` : "0%" }} />
          </span>
        </>
      )}
    </div>
  );
}
