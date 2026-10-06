import type { NextConfig } from "next";

/**
 * Static assets were being served `max-age=0, must-revalidate`, so every visit
 * re-fetched every image — including the presenter's second load. The creative
 * is content-stable and content-named, so it can be cached hard.
 *
 * The service worker is deliberately NOT cached: it is the one file that has to
 * be allowed to change, or a stale worker pins an old precache forever.
 */
const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path(creative|team)/:file*",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/:file(ridge-bg\\.webp|jumpsuit-wordmark\\.webp|favicon\\.ico)",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/asset-manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
