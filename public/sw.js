/**
 * Offline precache for the deck.
 *
 * The room's wifi is an unknown. Opening the deck once on the presenting
 * machine pulls every referenced asset into a cache, after which the whole
 * thing runs with the network unplugged — all slides, every comp.
 *
 * Deliberately hand-rolled rather than a framework: the entire requirement is
 * "install a known list, then serve cache-first", and a worker that is easy to
 * read is one that can be debugged an hour before a pitch.
 */
const VERSION = "ea-deck-v1";
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;

/** Told to the page so it can show real progress rather than a spinner. */
function broadcast(message) {
  self.clients.matchAll({ includeUncontrolled: true }).then((cs) =>
    cs.forEach((c) => c.postMessage(message))
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(ASSETS);
      let list = [];
      try {
        const res = await fetch("/asset-manifest.json", { cache: "no-store" });
        list = await res.json();
      } catch {
        // No manifest means no precache; runtime caching below still applies.
      }

      // Sequential-ish in small batches: a hotel connection handles six
      // parallel requests better than ninety, and progress stays truthful.
      const BATCH = 6;
      let done = 0;
      for (let i = 0; i < list.length; i += BATCH) {
        await Promise.all(
          list.slice(i, i + BATCH).map(async (url) => {
            try {
              const res = await fetch(url, { cache: "reload" });
              if (res.ok) await cache.put(url, res.clone());
            } catch {
              // One missing comp must not abort the whole install.
            } finally {
              done++;
            }
          })
        );
        broadcast({ type: "precache-progress", done, total: list.length });
      }

      // The document itself, so a cold offline start has something to open.
      try {
        const shell = await caches.open(SHELL);
        await shell.add(new Request("/", { cache: "reload" }));
      } catch {
        /* navigation preload will fall back to the network */
      }

      broadcast({ type: "precache-complete", total: list.length });
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // The advisor and analytics talk to live services; never serve those stale.
  if (url.pathname.startsWith("/api/")) return;

  // Navigations: network first so a deploy is picked up, cache as the
  // fallback that makes an offline cold start work at all.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const shell = await caches.open(SHELL);
          shell.put("/", fresh.clone());
          return fresh;
        } catch {
          return (await caches.match("/")) || Response.error();
        }
      })()
    );
    return;
  }

  // Everything else — images, chunks, fonts — cache first. These are either
  // content-named or immutable, so a hit is always correct and always instant.
  event.respondWith(
    (async () => {
      const hit = await caches.match(request);
      if (hit) return hit;
      try {
        const res = await fetch(request);
        if (res.ok && res.type === "basic") {
          const cache = await caches.open(ASSETS);
          cache.put(request, res.clone());
        }
        return res;
      } catch {
        return hit || Response.error();
      }
    })()
  );
});
